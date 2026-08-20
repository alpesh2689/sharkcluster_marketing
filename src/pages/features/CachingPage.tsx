import { Link } from "react-router-dom";
import {
  Zap, Server, Database, Terminal, Shield, Activity, Gauge, Layers,
  ArrowRight, Check, Globe, Settings, ChevronRight, HardDrive,
  TrendingDown, Cpu, RefreshCw, FileCode, AlertTriangle,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const cacheTypes = [
  { icon: Database, title: "Redis", desc: "Application-level caching — queries, sessions, computed values" },
  { icon: Globe, title: "Varnish", desc: "HTTP response caching — whole pages served without hitting your app" },
  { icon: Settings, title: "VCL Editing", desc: "Fetch running VCL, upload custom .vcl files, compile errors shown" },
  { icon: Activity, title: "Drift Detection", desc: "Live config read from machine, compared to saved panel config" },
];

const featureRows = [
  {
    icon: Database,
    tag: "Redis",
    title: "Redis — application-level caching",
    desc: "Redis sits behind your application and caches whatever your code stores — queries, sessions, computed values. The single most consequential setting is the eviction policy, and the panel explains which to choose.",
    points: [
      "noeviction — rejects writes when full (correct for queues/sessions)",
      "LRU/LFU — evicts old entries (correct for a pure cache)",
      "Persistence toggle — on for sessions/queues, off for pure cache (faster)",
      "Max Memory ceiling configurable",
      "Connection info exposed for app-side wiring",
    ],
    mock: "redis",
    reverse: false,
  },
  {
    icon: Globe,
    tag: "Varnish",
    title: "Varnish — HTTP response caching",
    desc: "Varnish sits in front of your web server and caches whole HTTP responses. No app changes needed. The Default Grace setting serves slightly-stale content during an app outage instead of showing errors.",
    points: [
      "Full port architecture exposed — public Listen Port to Varnish to Backend Port",
      "Server Type selector (Nginx/Apache) for correct configuration",
      "Cache Size, Default TTL, and Default Grace configurable",
      "Connect Timeout and First Byte Timeout tuning",
      "Purge ACL — CIDR-restricted, controls who can trigger cache purge",
    ],
    mock: "varnish",
    reverse: true,
  },
  {
    icon: Settings,
    tag: "VCL",
    title: "In-panel VCL editing",
    desc: "Direct VCL editing in the panel — fetch the currently-running VCL, upload a custom .vcl file to replace the default. This is where real caching logic is expressed: cookie handling, path exclusions, device variation.",
    points: [
      "Fetch currently-running VCL from the server",
      "Upload custom .vcl files",
      "Per-source logs: NCSA access, backend errors, systemd/journalctl",
      "VCL compile failure logs shown directly",
    ],
    mock: "vcl",
    reverse: false,
  },
  {
    icon: Activity,
    tag: "Drift",
    title: "Live configuration drift detection",
    desc: "Live Configuration on Server reads the actual running config from the machine — distinct from the last-saved panel config. This surfaces drift from manual edits before it causes an outage.",
    points: [
      "Reads actual running Redis config from the machine",
      "Compares to last-saved panel config",
      "Surfaces drift from manual SSH edits",
      "A specific, callable-out differentiator across the platform",
    ],
    mock: "drift",
    reverse: true,
  },
];

const stats = [
  { value: "2", label: "Caching layers" },
  { value: "5", label: "Eviction policies" },
  { value: "1", label: "Click VCL edit" },
  { value: "0", label: "Silent drift" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Backups & Recovery", path: "/features/backups", icon: Database },
  { title: "Health Alerts & Monitoring", path: "/features/monitoring", icon: Activity },
  { title: "Deployment", path: "/features/deployment", icon: Terminal },
];

function MockPanel({ type }: { type: string }) {
  if (type === "redis") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Database className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Redis Config</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Running</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-medium text-ink-500">Eviction Policy</span>
            <span className="rounded-md bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700">allkeys-lru</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-medium text-ink-500">Max Memory</span>
            <span className="text-xs font-bold text-ink-900">2 GB</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-medium text-ink-500">Persistence</span>
            <span className="flex items-center gap-2">
              <span className="text-xs font-bold text-ink-900">On</span>
              <span className="relative inline-flex h-4 w-7 items-center rounded-full bg-brand-500">
                <span className="absolute right-0.5 h-3 w-3 rounded-full bg-white" />
              </span>
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Config matches panel — no drift</span>
        </div>
      </div>
    );
  }

  if (type === "varnish") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Globe className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Varnish Config</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Running</span>
        </div>
        <div className="space-y-2.5">
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Port Architecture</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
              <span className="rounded bg-blue-100 px-1.5 py-0.5 text-blue-700">:80</span>
              <ArrowRight className="h-3 w-3 text-ink-400" />
              <span className="rounded bg-brand-100 px-1.5 py-0.5 text-brand-700">Varnish :6081</span>
              <ArrowRight className="h-3 w-3 text-ink-400" />
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700">:8080</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-medium text-ink-500">Cache Size</span>
            <span className="text-xs font-bold text-ink-900">1 GB</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-medium text-ink-500">Default TTL</span>
            <span className="text-xs font-bold text-ink-900">120s</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-medium text-ink-500">Default Grace</span>
            <span className="text-xs font-bold text-ink-900">300s</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <Gauge className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">Grace serves stale content during outages</span>
        </div>
      </div>
    );
  }

  if (type === "vcl") {
    return (
      <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg">
        <div className="flex items-center justify-between border-b border-ink-700 bg-ink-800 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-brand-400" />
            <span className="font-mono text-xs text-ink-300">default.vcl</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded bg-ink-700 px-2 py-1 text-[10px] font-bold text-ink-300">Fetch</span>
            <span className="rounded bg-brand-500 px-2 py-1 text-[10px] font-bold text-white">Upload</span>
          </div>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed">
          <p className="text-ink-500">vcl 4.1;</p>
          <p className="mt-1 text-ink-400">backend default {`{`}</p>
          <p className="text-ink-300">  .host = "127.0.0.1";</p>
          <p className="text-ink-300">  .port = "8080";</p>
          <p className="text-ink-400">{`}`}</p>
          <p className="mt-1 text-ink-400">sub vcl_recv {`{`}</p>
          <p className="text-emerald-400">  if (req.url ~ "/api/") {`{`}</p>
          <p className="text-emerald-400">    return (pass);</p>
          <p className="text-emerald-400">  {`}`}</p>
          <p className="text-ink-400">{`}`}</p>
          <p className="mt-2 text-emerald-400">$ <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" /></p>
        </div>
      </div>
    );
  }

  // drift
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <AlertTriangle className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Config Drift</span>
        </div>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">2 Drifted</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Panel Config</p>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs"><span className="text-ink-500">Max Memory</span><span className="font-semibold text-ink-800">2 GB</span></div>
            <div className="flex items-center justify-between text-xs"><span className="text-ink-500">Eviction</span><span className="font-semibold text-ink-800">allkeys-lru</span></div>
          </div>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-600">Live Config</p>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs"><span className="text-ink-500">Max Memory</span><span className="font-semibold text-amber-700">4 GB</span></div>
            <div className="flex items-center justify-between text-xs"><span className="text-ink-500">Eviction</span><span className="font-semibold text-ink-800">noeviction</span></div>
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">maxmemory changed via SSH</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">maxmemory-policy changed via SSH</span>
        </div>
      </div>
    </div>
  );
}

export default function CachingPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Caching — Redis & Varnish Two-Layer Caching"
        description="Redis for application-level caching and Varnish for HTTP response caching. Eviction policy control, live config drift detection, in-panel VCL editing, and grace periods for outage resilience."
        path="/features/caching"
        keywords={["Redis caching", "Varnish caching", "HTTP caching", "VCL editing", "cache eviction policy", "application caching", "edge caching"]}
        faqSchema={[
          { q: "What caching options does SharkCluster support?", a: "SharkCluster supports two complementary caching layers: Redis for application-level caching (queries, sessions, computed values) and Varnish for full HTTP response caching in front of your web server." },
          { q: "Can I edit Varnish VCL files in the panel?", a: "Yes, SharkCluster provides in-panel VCL editing. You can fetch the currently-running VCL and upload a custom .vcl file to replace the default." },
          { q: "What is config drift detection in caching?", a: "Live Configuration on Server reads the actual running Redis or Varnish config from the machine and compares it to the last-saved panel config, surfacing any drift from manual edits." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Caching", path: "/features/caching" },
        ]}
      />

      {/* Split hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-300/15 blur-3xl" />
        </div>
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
                <Zap className="h-4 w-4" />
                Caching
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Two-layer caching <br />
                <span className="gradient-text">Redis & Varnish</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Redis caches inside your application; Varnish caches in front of your web server. Complementary, not
                competing. Many servers run both for maximum performance.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Speed Up Your App
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="redis" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-ink-200 bg-ink-50/50">
        <div className="container-px py-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-extrabold text-brand-600 sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-ink-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cache types grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Layers className="h-4 w-4" />
              Cache Types
            </span>
            <h2 className="mt-5 heading-lg">Two complementary caching layers</h2>
            <p className="mt-4 text-body">
              Redis sits behind your application and caches whatever your code stores. Varnish sits in front of your
              web server and caches whole HTTP responses. Many servers run both for maximum performance.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cacheTypes.map((ct, i) => (
              <div
                key={ct.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex flex-col rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 4) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <ct.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-sm font-bold text-ink-900">{ct.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{ct.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating feature rows with mockups */}
      {featureRows.map((row) => (
        <section key={row.title} className="section pt-0">
          <div className="container-px">
            <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${row.reverse ? "lg:grid-flow-col-dense" : ""}`}>
              <div className={row.reverse ? "lg:col-start-2" : ""}>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  <row.icon className="h-3.5 w-3.5" />
                  {row.tag}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{row.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-600">{row.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {row.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-ink-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative ${row.reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/20 to-blue-200/10 blur-2xl" />
                <MockPanel type={row.mock} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Highlight section */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <Zap className="h-3.5 w-3.5" />
                  Performance
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Many servers run both</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Redis and Varnish are complementary, not competing. Redis handles application-level caching while
                  Varnish handles HTTP-level caching. Running both gives you two layers of speed — your app serves
                  fewer requests, and the requests it does serve are faster.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Redis: queries, sessions, computed values cached in memory",
                    "Varnish: full HTTP responses served without touching your app",
                    "Grace periods keep content served during backend outages",
                  ].map((point) => (
                    <div key={point} className="rounded-xl border border-ink-200/80 bg-white/80 p-3">
                      <Check className="h-4 w-4 text-brand-600" />
                      <p className="mt-2 text-xs font-semibold leading-snug text-ink-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Cache Architecture</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Request flow</span>
                </div>
                <div className="mt-5 space-y-2.5">
                  {[
                    { label: "Client", sub: "Browser request", color: "bg-blue-100 text-blue-700" },
                    { label: "Varnish", sub: "HTTP cache layer", color: "bg-brand-100 text-brand-700" },
                    { label: "Nginx", sub: "Web server", color: "bg-emerald-100 text-emerald-700" },
                    { label: "App", sub: "Your application", color: "bg-purple-100 text-purple-700" },
                    { label: "Redis", sub: "App cache layer", color: "bg-amber-100 text-amber-700" },
                  ].map((node, i, arr) => (
                    <div key={node.label}>
                      <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold ${node.color}`}>
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-ink-900">{node.label}</p>
                            <p className="text-[10px] text-ink-400">{node.sub}</p>
                          </div>
                        </div>
                        {i < arr.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-ink-300" />
                        )}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="ml-5 h-2 w-px bg-ink-200" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related features */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><RefreshCw className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your cache</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair caching with the tools that keep your applications fast, secure, and resilient.</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedFeatures.map((rf) => (
                <Link
                  key={rf.title}
                  to={rf.path}
                  className="group rounded-2xl border border-ink-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white"><rf.icon className="h-4 w-4" /></span>
                    <ChevronRight className="h-4 w-4 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-ink-800">{rf.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
