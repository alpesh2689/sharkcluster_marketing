import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle, BookOpen, Check, ChevronDown, Code2, Copy, Database, LifeBuoy,
  Loader2, Package, Search, Server, X,
} from "lucide-react";
import Seo from "@/components/Seo";
import { useReveal } from "@/hooks/useReveal";
import { fetchApiDocs, API_CONFIGURED, type ApiEndpoint, type ApiSection, type HttpMethod } from "@/lib/api";
import { API_DOCS_INTRO } from "@/content/apiDocsIntro";

/**
 * API reference at /docs/api and /docs/api/:slug.
 *
 * A static Introduction (src/content/apiDocsIntro.ts) is rendered ahead of the
 * sections the backend returns from GET /get_api_docs, which admins edit. The
 * slug in the URL addresses either a section or a single endpoint, so any
 * endpoint is linkable.
 */

const METHOD_STYLES: Record<HttpMethod, string> = {
  GET: "bg-blue-100 text-blue-700",
  POST: "bg-emerald-100 text-emerald-700",
  PUT: "bg-amber-100 text-amber-700",
  PATCH: "bg-amber-100 text-amber-700",
  DELETE: "bg-rose-100 text-rose-700",
};

const CONCEPT_ICONS = [Server, Code2, Database, Package];

/** Endpoint paths are stored inconsistently — some lead with "/", some do not. */
function fullUrl(path: string): string {
  const base = API_DOCS_INTRO.baseUrl.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        void navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }}
      aria-label={label}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all ${
        copied
          ? "border-emerald-200 bg-emerald-50 text-emerald-600"
          : "border-ink-200 bg-white text-ink-400 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
      }`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function CodePanel({
  code,
  label,
  tone,
}: {
  code: string;
  label: string;
  tone: "request" | "success" | "failure";
}) {
  const [copied, setCopied] = useState(false);
  const dot =
    tone === "success" ? "bg-emerald-400" : tone === "failure" ? "bg-rose-400" : "bg-brand-400";
  const codeColor =
    tone === "success" ? "text-emerald-300" : tone === "failure" ? "text-rose-300" : "text-brand-200";

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`h-2 w-2 rounded-full ${dot}`} />
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-500">{label}</h3>
        </div>
        <button
          onClick={() => {
            void navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          }}
          aria-label={`Copy ${label}`}
          className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="max-h-[420px] overflow-auto rounded-2xl border border-ink-800 bg-ink-950 p-5">
        <code className={`font-mono text-[13px] leading-relaxed ${codeColor}`}>{code}</code>
      </pre>
    </section>
  );
}

export default function ApiDocsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [sections, setSections] = useState<ApiSection[]>([]);
  const [loading, setLoading] = useState(API_CONFIGURED);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [responseTab, setResponseTab] = useState<"success" | "failure">("success");

  useEffect(() => {
    if (!API_CONFIGURED) return;
    const controller = new AbortController();
    fetchApiDocs(controller.signal)
      .then(setSections)
      .catch((err: Error) => {
        if (err.name !== "AbortError") setFailed(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  // Resolve the URL slug against sections first, then endpoints.
  const { activeSection, activeEndpoint } = useMemo(() => {
    if (!slug || slug === API_DOCS_INTRO.slug) {
      return { activeSection: null as ApiSection | null, activeEndpoint: null as ApiEndpoint | null };
    }
    for (const section of sections) {
      const endpoint = section.endpoints?.find((e) => e.slug === slug);
      if (endpoint) return { activeSection: section, activeEndpoint: endpoint };
    }
    const section = sections.find((s) => s.slug === slug || s.id === slug) ?? null;
    return { activeSection: section, activeEndpoint: null as ApiEndpoint | null };
  }, [slug, sections]);

  const showIntro = !activeSection && !activeEndpoint;

  useEffect(() => {
    setResponseTab("success");
  }, [slug]);

  const filteredSections = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return sections;
    return sections
      .map((section) => ({
        ...section,
        endpoints: (section.endpoints ?? []).filter(
          (e) =>
            e.name.toLowerCase().includes(term) ||
            (e.description ?? "").toLowerCase().includes(term) ||
            e.path.toLowerCase().includes(term),
        ),
      }))
      .filter((s) => s.title.toLowerCase().includes(term) || (s.endpoints?.length ?? 0) > 0);
  }, [sections, query]);

  const go = (to: string) => {
    navigate(to);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const introMatchesSearch =
    !query.trim() || API_DOCS_INTRO.title.toLowerCase().includes(query.trim().toLowerCase());

  const seo = activeEndpoint
    ? {
        title: `${activeEndpoint.name} — API Reference`,
        description:
          activeEndpoint.description ||
          `${activeEndpoint.method} ${activeEndpoint.path} — SharkCluster API reference.`,
        path: `/docs/api/${activeEndpoint.slug}`,
      }
    : activeSection
      ? {
          title: `${activeSection.title} — API Reference`,
          description: activeSection.description || `${activeSection.title} endpoints in the SharkCluster API.`,
          path: `/docs/api/${activeSection.slug}`,
        }
      : {
          title: "API Reference — Manage SharkCluster Programmatically",
          description:
            "The SharkCluster API reference: drive servers, applications, databases and container registries from your own tooling.",
          path: "/docs/api",
        };

  return (
    <>
      <Seo
        {...seo}
        keywords={["SharkCluster API", "hosting API", "server management API", "API reference", "REST API"]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/docs" },
          { name: "API Reference", path: "/docs/api" },
        ]}
      />

      <div className="pt-16 lg:pt-18">
        {/* Toolbar */}
        <div className="sticky top-16 z-30 border-b border-ink-200 bg-white/90 backdrop-blur-lg lg:top-18">
          <div className="container-px flex h-16 items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn-ghost shrink-0 lg:hidden"
              aria-label="Open the API reference menu"
            >
              <BookOpen className="h-5 w-5" />
            </button>

            <Link
              to="/docs"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-ink-500 transition-colors hover:text-brand-600 sm:flex"
            >
              <BookOpen className="h-4 w-4" />
              Docs
            </Link>
            <span className="hidden text-ink-300 sm:inline">/</span>
            <span className="hidden shrink-0 text-sm font-semibold text-ink-900 sm:inline">API Reference</span>

            <div className="relative ml-auto w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <label htmlFor="api-docs-search" className="sr-only">
                Search the API reference
              </label>
              <input
                id="api-docs-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search endpoints…"
                className="w-full rounded-xl border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm transition-all placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
          </div>
        </div>

        <div className="container-px flex gap-8">
          {/* Sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-ink-200 bg-white p-6 transition-transform duration-300 lg:sticky lg:top-[8.5rem] lg:z-auto lg:h-[calc(100vh-10rem)] lg:w-64 lg:shrink-0 lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:p-0 lg:pt-8 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-5 flex items-center justify-between lg:hidden">
              <span className="font-display font-bold text-ink-900">API Reference</span>
              <button onClick={() => setSidebarOpen(false)} className="btn-ghost" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-6">
              {introMatchesSearch && (
                <button
                  onClick={() => go("/docs/api")}
                  className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm font-bold uppercase tracking-wider transition-colors ${
                    showIntro ? "text-brand-600" : "text-ink-400 hover:text-brand-600"
                  }`}
                >
                  {API_DOCS_INTRO.title}
                </button>
              )}

              {filteredSections.map((section) => {
                const isCollapsed = collapsed[section.id] ?? false;
                const endpoints = section.endpoints ?? [];
                return (
                  <div key={section.id}>
                    <div className="flex items-center justify-between gap-1 rounded-lg px-3 py-1 transition-colors hover:bg-ink-50">
                      <button
                        onClick={() => go(`/docs/api/${section.slug}`)}
                        className={`flex-1 text-left text-sm font-bold uppercase tracking-wider transition-colors ${
                          activeSection?.id === section.id && !activeEndpoint
                            ? "text-brand-600"
                            : "text-ink-400 hover:text-brand-600"
                        }`}
                      >
                        {section.title}
                      </button>
                      {endpoints.length > 0 && (
                        <button
                          onClick={() => setCollapsed((prev) => ({ ...prev, [section.id]: !isCollapsed }))}
                          aria-label={isCollapsed ? `Expand ${section.title}` : `Collapse ${section.title}`}
                          className="p-1 text-ink-400 transition-colors hover:text-brand-600"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
                          />
                        </button>
                      )}
                    </div>

                    {endpoints.length > 0 && !isCollapsed && (
                      <ul className="ml-3 mt-1 space-y-0.5 border-l border-ink-200">
                        {endpoints.map((endpoint) => (
                          <li key={endpoint.id}>
                            <button
                              onClick={() => go(`/docs/api/${endpoint.slug}`)}
                              className={`-ml-px block w-full border-l-2 py-1.5 pl-4 pr-2 text-left text-[13px] transition-all ${
                                activeEndpoint?.id === endpoint.id
                                  ? "border-brand-500 bg-brand-50 font-semibold text-brand-600"
                                  : "border-transparent text-ink-500 hover:border-brand-200 hover:bg-brand-50/50 hover:text-brand-600"
                              }`}
                            >
                              {endpoint.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}

              {!loading && filteredSections.length === 0 && !introMatchesSearch && (
                <p className="px-3 text-sm text-ink-400">No matching endpoints.</p>
              )}
            </nav>
          </aside>

          {/* Content */}
          <main className="min-w-0 flex-1 py-10 lg:py-12">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
                <span className="sr-only">Loading the API reference</span>
              </div>
            ) : activeEndpoint ? (
              <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      METHOD_STYLES[activeEndpoint.method] ?? METHOD_STYLES.POST
                    }`}
                  >
                    {activeEndpoint.method}
                  </span>
                  <code className="truncate rounded-full bg-ink-100 px-3 py-1 font-mono text-sm text-ink-600">
                    {activeEndpoint.path}
                  </code>
                </div>

                <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                  {activeEndpoint.name}
                </h1>
                {activeEndpoint.description && (
                  <p className="mt-4 max-w-3xl text-body">{activeEndpoint.description}</p>
                )}

                {/* Request URL */}
                <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-ink-400">Request URL</h2>
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-50 p-3">
                    <span
                      className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                        METHOD_STYLES[activeEndpoint.method] ?? METHOD_STYLES.POST
                      }`}
                    >
                      {activeEndpoint.method}
                    </span>
                    <code className="min-w-0 flex-1 truncate font-mono text-sm text-ink-600">
                      {fullUrl(activeEndpoint.path)}
                    </code>
                    <CopyButton text={fullUrl(activeEndpoint.path)} label="Copy the request URL" />
                  </div>
                </div>

                {/* Parameters */}
                {(activeEndpoint.parameters?.length ?? 0) > 0 && (
                  <div className="mt-10">
                    <h2 className="font-display text-xl font-bold text-ink-900">Request parameters</h2>
                    <div className="mt-4 overflow-x-auto rounded-2xl border border-ink-200 bg-white shadow-sm">
                      <table className="w-full min-w-[520px] border-collapse text-left">
                        <thead>
                          <tr className="border-b border-ink-200 bg-ink-50">
                            <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink-500">Parameter</th>
                            <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink-500">Type</th>
                            <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink-500">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-ink-100">
                          {activeEndpoint.parameters?.map((param) => (
                            <tr key={param.name} className="transition-colors hover:bg-ink-50/50">
                              <td className="px-5 py-4 align-top">
                                <code className="rounded bg-brand-50 px-1.5 py-0.5 font-mono text-sm font-semibold text-brand-600">
                                  {param.name}
                                </code>
                                {param.required && (
                                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-rose-500">
                                    Required
                                  </div>
                                )}
                              </td>
                              <td className="px-5 py-4 align-top">
                                <span className="rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 font-mono text-xs text-ink-500">
                                  {param.type}
                                </span>
                              </td>
                              <td className="px-5 py-4 align-top text-sm leading-relaxed text-ink-600">
                                {param.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Samples */}
                <div className="mt-10 space-y-8">
                  {activeEndpoint.request_sample && (
                    <CodePanel code={activeEndpoint.request_sample} label="Request sample" tone="request" />
                  )}

                  {(activeEndpoint.response_success || activeEndpoint.response_failure) && (
                    <div>
                      <div className="mb-3 flex gap-1 rounded-xl border border-ink-200 bg-ink-50 p-1">
                        {activeEndpoint.response_success && (
                          <button
                            onClick={() => setResponseTab("success")}
                            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                              responseTab === "success"
                                ? "bg-white text-ink-900 shadow-sm"
                                : "text-ink-500 hover:text-ink-700"
                            }`}
                          >
                            Success
                          </button>
                        )}
                        {activeEndpoint.response_failure && (
                          <button
                            onClick={() => setResponseTab("failure")}
                            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                              responseTab === "failure"
                                ? "bg-white text-ink-900 shadow-sm"
                                : "text-ink-500 hover:text-ink-700"
                            }`}
                          >
                            Failure
                          </button>
                        )}
                      </div>
                      {responseTab === "success" && activeEndpoint.response_success && (
                        <CodePanel code={activeEndpoint.response_success} label="Response" tone="success" />
                      )}
                      {responseTab === "failure" && activeEndpoint.response_failure && (
                        <CodePanel code={activeEndpoint.response_failure} label="Response" tone="failure" />
                      )}
                    </div>
                  )}
                </div>

                {/* Help */}
                <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-brand-200 bg-brand-50/60 p-6 sm:flex-row sm:items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/25">
                    <LifeBuoy className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-ink-900">Stuck on an integration?</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">
                      Raise a ticket from the panel with the endpoint and the response you got back — it reaches an
                      engineer with your server already attached.
                    </p>
                  </div>
                  <Link to="/contact" className="btn-secondary shrink-0">
                    Contact us
                  </Link>
                </div>
              </div>
            ) : activeSection ? (
              <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
                <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                  {activeSection.title}
                </h1>
                {activeSection.description && (
                  <p className="mt-4 max-w-3xl text-body">{activeSection.description}</p>
                )}

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {(activeSection.endpoints ?? []).map((endpoint) => (
                    <Link
                      key={endpoint.id}
                      to={`/docs/api/${endpoint.slug}`}
                      className="card-hover group flex flex-col gap-2 p-5"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                            METHOD_STYLES[endpoint.method] ?? METHOD_STYLES.POST
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="truncate font-mono text-xs text-ink-500">{endpoint.path}</code>
                      </div>
                      <h2 className="font-display font-bold text-ink-900 transition-colors group-hover:text-brand-600">
                        {endpoint.name}
                      </h2>
                      {endpoint.description && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-ink-500">{endpoint.description}</p>
                      )}
                    </Link>
                  ))}
                </div>

                {(activeSection.endpoints?.length ?? 0) === 0 && (
                  <p className="mt-8 text-ink-500">No endpoints are documented in this section yet.</p>
                )}
              </div>
            ) : (
              /* Introduction */
              <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
                <span className="eyebrow">
                  <Code2 className="h-4 w-4" />
                  API Reference
                </span>
                <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
                  {API_DOCS_INTRO.title}
                </h1>
                <p className="mt-5 max-w-3xl text-body">{API_DOCS_INTRO.description}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-ink-400">Base URL</h2>
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-ink-100 bg-ink-50 p-3">
                      <code className="min-w-0 flex-1 truncate font-mono text-sm text-ink-600">
                        {API_DOCS_INTRO.baseUrl}
                      </code>
                      <CopyButton text={API_DOCS_INTRO.baseUrl} label="Copy the base URL" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-ink-400">Authentication</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{API_DOCS_INTRO.authentication}</p>
                  </div>
                </div>

                <div className="mt-12 grid gap-10 md:grid-cols-2">
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink-900">Getting started</h2>
                    <ol className="mt-5 space-y-5">
                      {API_DOCS_INTRO.gettingStarted.map((step, i) => (
                        <li key={step.title} className="flex gap-4">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600">
                            {i + 1}
                          </span>
                          <span>
                            <span className="block font-semibold text-ink-900">{step.title}</span>
                            <span className="mt-1 block text-sm leading-relaxed text-ink-500">{step.text}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h2 className="font-display text-xl font-bold text-ink-900">Core concepts</h2>
                    <div className="mt-5 space-y-5">
                      {API_DOCS_INTRO.coreConcepts.map((concept, i) => {
                        const Icon = CONCEPT_ICONS[i % CONCEPT_ICONS.length];
                        return (
                          <div key={concept.title} className="flex gap-4">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-ink-500">
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <span>
                              <span className="block font-semibold text-ink-900">{concept.title}</span>
                              <span className="mt-1 block text-sm leading-relaxed text-ink-500">{concept.text}</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {(failed || !API_CONFIGURED) && (
                  <div className="mt-12 flex items-start gap-4 rounded-2xl border border-ink-200 bg-ink-50/50 p-6">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-ink-400" />
                    <div>
                      <h3 className="font-semibold text-ink-900">The endpoint reference isn't loading</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">
                        {API_CONFIGURED
                          ? "We couldn't reach the documentation service. Please refresh, or try again shortly."
                          : "This environment has no API backend configured, so only the introduction is available."}
                      </p>
                    </div>
                  </div>
                )}

                {!failed && API_CONFIGURED && sections.length > 0 && (
                  <div className="mt-12">
                    <h2 className="font-display text-xl font-bold text-ink-900">Reference</h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {sections.map((section) => (
                        <Link
                          key={section.id}
                          to={`/docs/api/${section.slug}`}
                          className="card-hover group flex items-center justify-between gap-3 p-5"
                        >
                          <span>
                            <span className="block font-display font-bold text-ink-900 transition-colors group-hover:text-brand-600">
                              {section.title}
                            </span>
                            <span className="mt-0.5 block text-sm text-ink-500">
                              {section.endpoints?.length ?? 0} endpoint
                              {(section.endpoints?.length ?? 0) === 1 ? "" : "s"}
                            </span>
                          </span>
                          <Code2 className="h-5 w-5 shrink-0 text-ink-300 transition-colors group-hover:text-brand-500" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
