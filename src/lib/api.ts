/**
 * SharkCluster backend client.
 *
 * Two public, unauthenticated endpoints back the marketing site:
 *   GET /get/blogs        — published posts        (controller/blog.js)
 *   GET /get/blogs/:slug  — one post with content
 *   GET /get_api_docs     — API reference sections (controller/apiDocs.js)
 *
 * VITE_API_URL is optional on purpose. With no backend configured the pages
 * that use this render their empty states rather than throwing — a preview
 * deploy without secrets should still build and browse.
 */

const RAW_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

/**
 * In dev, go through the Vite proxy (see vite.config.ts). Calling the backend
 * directly from localhost gets a 500 — its CORS allowlist does not include the
 * dev server's origin. In a production build the site is served from an allowed
 * origin, so the direct URL is used.
 */
export const API_BASE = import.meta.env.DEV && RAW_BASE ? "/backend" : RAW_BASE;
export const API_CONFIGURED = RAW_BASE.length > 0;

/** Absolute origin of the backend, for building asset URLs the proxy does not cover. */
export const API_ORIGIN = RAW_BASE;

/** Absolute URLs pass through; backend-relative paths get the API origin. */
export function resolveAsset(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { accept: "application/json" },
    signal,
  });
  if (!res.ok) throw new Error(`${path} responded ${res.status}`);
  return (await res.json()) as T;
}

/* ---------------------------------------------------------------- blogs -- */

export interface BlogSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  published_at: string | null;
  created_at?: string | null;
}

export interface BlogPost extends BlogSummary {
  /** JSON-encoded ContentBlock[] as written by the admin blog editor. */
  content: string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
}

interface ListResponse<T> {
  result: boolean;
  message?: string;
  data: T;
}

export async function fetchBlogs(signal?: AbortSignal): Promise<BlogSummary[]> {
  if (!API_CONFIGURED) return [];
  const body = await getJson<ListResponse<BlogSummary[]>>("/get/blogs", signal);
  return body.result && Array.isArray(body.data) ? body.data : [];
}

/** Resolves to null for a slug the backend does not know. */
export async function fetchBlogBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<BlogPost | null> {
  if (!API_CONFIGURED) return null;
  const res = await fetch(`${API_BASE}/get/blogs/${encodeURIComponent(slug)}`, {
    headers: { accept: "application/json" },
    signal,
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`/get/blogs/${slug} responded ${res.status}`);
  const body = (await res.json()) as ListResponse<BlogPost>;
  return body.result && body.data ? body.data : null;
}

/* ------------------------------------------------------------ api docs -- */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiParameter {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

export interface ApiEndpoint {
  id: string;
  slug: string;
  name: string;
  method: HttpMethod;
  path: string;
  description?: string | null;
  parameters?: ApiParameter[] | null;
  request_sample?: string | null;
  response_success?: string | null;
  response_failure?: string | null;
  order?: number;
}

export interface ApiSection {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  order?: number;
  endpoints?: ApiEndpoint[] | null;
}

/** `/get_api_docs` returns the section array directly, not a {result,data} envelope. */
export async function fetchApiDocs(signal?: AbortSignal): Promise<ApiSection[]> {
  if (!API_CONFIGURED) return [];
  const data = await getJson<ApiSection[]>("/get_api_docs", signal);
  return Array.isArray(data) ? data : [];
}
