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

/* ----------------------------------------------------------------- plans -- */

/**
 * Public plan catalogue — GET /public/plans.
 *
 * Selling prices only. The authenticated /common-plans returns the same rows
 * plus provider_cost_*, which must never reach a browser.
 */

export interface PublicPlan {
  id: string;
  provider: string;
  provider_name: string;
  region: string | null;
  region_city: string | null;
  region_country: string | null;
  plan_code: string | null;
  plan_name: string | null;
  vcpus: number | null;
  memory_gb: number | null;
  disk_gb: number | null;
  disk_type: string | null;
  bandwidth_tb: number | null;
  price_monthly_usd: string | number | null;
  price_monthly_inr: string | number | null;
  price_hourly_usd: string | number | null;
  price_hourly_inr: string | number | null;
}

export interface PublicProvider {
  id: string;
  name: string;
  slug: string;
  status: string;
}

export async function fetchPublicPlans(signal?: AbortSignal): Promise<PublicPlan[]> {
  if (!API_CONFIGURED) return [];
  const body = await getJson<{ success: boolean; data: PublicPlan[] }>("/public/plans", signal);
  return body.success && Array.isArray(body.data) ? body.data : [];
}

export async function fetchActiveProviders(signal?: AbortSignal): Promise<PublicProvider[]> {
  if (!API_CONFIGURED) return [];
  const body = await getJson<{ result: boolean; data: PublicProvider[] }>(
    "/api/providers/active",
    signal,
  );
  if (!body.result || !Array.isArray(body.data)) return [];
  // The endpoint also returns commission fields; take only what the page needs
  // so nothing commercial ends up in the client bundle or the DOM.
  return body.data.map(({ id, name, slug, status }) => ({ id, name, slug, status }));
}

/* ------------------------------------------------------------- add-ons -- */

/**
 * Public add-on rates — GET /public/addon-pricing.
 *
 * Mirrors what the billing cycle can actually charge: offsite backup per GB
 * (admin_settings) and active service_pricing rows. Block storage volumes are
 * absent because nothing bills them.
 */

export interface AddonService {
  service_code: string;
  service_name: string;
  service_category: string | null;
  monthly_price_usd: string | number | null;
  monthly_price_inr: string | number | null;
  trial_days: number | null;
}

export interface AddonPricing {
  offsite_backup_per_gb: { usd: string | number | null; inr: string | number | null };
  services: AddonService[];
}

export async function fetchAddonPricing(signal?: AbortSignal): Promise<AddonPricing | null> {
  if (!API_CONFIGURED) return null;
  const body = await getJson<{ success: boolean; data: AddonPricing }>(
    "/public/addon-pricing",
    signal,
  );
  return body.success && body.data ? body.data : null;
}
