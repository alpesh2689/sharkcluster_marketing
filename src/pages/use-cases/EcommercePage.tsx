import { Link } from "react-router-dom";
import {
  ShoppingCart, Server, Zap, Shield, RefreshCw, Activity, Cloud,
  Check, ArrowRight, ChevronRight, Database, Gauge, Layers, Lock, Network,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "2", label: "Caching layers (Redis + Varnish)" },
  { value: "1-Click", label: "Server scaling" },
  { value: "7", label: "Backup types" },
  { value: "∞", label: "Free migrations" },
];

const benefits = [
  {
    icon: Zap,
    title: "Two-Layer Caching",
    desc: "Redis for session and query caching, Varnish for full HTTP response caching. Grace periods serve stale content during outages instead of errors.",
  },
  {
    icon: Server,
    title: "One-Click Scaling",
    desc: "Resize your server when traffic spikes. New pricing shown before you commit. Handle Black Friday without breaking a sweat.",
  },
  {
    icon: Shield,
    title: "Free SSL & Security",
    desc: "Free Let's Encrypt certificates, closed-by-default firewall, and security audit logs. See scanning and brute-force attempts in real time.",
  },
  {
    icon: RefreshCw,
    title: "Free Store Migrations",
    desc: "Moving from another host? We migrate your entire store — files, database, configurations — for free, unlimited times.",
  },
  {
    icon: Cloud,
    title: "Cloudflare Protection",
    desc: "WAF rules block malicious traffic before it reaches your server, edge caching absorbs load surges, and origin protection hides your VPS from direct attack.",
  },
  {
    icon: Activity,
    title: "Health Alerts",
    desc: "Proactive monitoring for CPU, memory, disk, and failed services. Know before things break — not after your customers tell you.",
  },
];

const featureRows = [
  {
    icon: Zap,
    tag: "Caching",
    title: "Two-layer caching for store speed",
    desc: "Redis handles session and query caching — the fast data layer. Varnish handles full HTTP response caching — the edge layer. Grace periods serve slightly-stale content during backend outages instead of showing errors to your customers.",
    points: [
      "Redis — sessions, queries, and computed values",
      "Varnish — full HTTP response caching with VCL editing",
      "Grace periods serve stale content during outages",
      "Two layers mean your store stays fast even under load",
    ],
    mock: "caching",
    reverse: false,
  },
  {
    icon: Server,
    tag: "Scaling",
    title: "Handle traffic spikes without downtime",
    desc: "Resize your server with one click when traffic spikes. New pricing is shown before you commit — no surprise bills. Black Friday, product launches, viral moments — your store stays up when it matters most.",
    points: [
      "One-click server resize — new pricing shown first",
      "Scale up for traffic, scale down when it passes",
      "No downtime during resize operations",
      "Handle Black Friday without breaking a sweat",
    ],
    mock: "scaling",
    reverse: true,
  },
  {
    icon: Shield,
    tag: "Security",
    title: "Free SSL, firewall, and audit logs",
    desc: "Free Let's Encrypt certificates keep your store encrypted. A closed-by-default firewall blocks everything you don't explicitly open. The security audit log shows every request — so you can see scanning and brute-force attempts in real time.",
    points: [
      "Free Let's Encrypt SSL — or Cloudflare integration",
      "Closed-by-default firewall with UFW",
      "Security audit log — every request parsed",
      "Cloudflare WAF blocks malicious traffic at the edge",
    ],
    mock: "security",
    reverse: false,
  },
  {
    icon: RefreshCw,
    tag: "Migrations",
    title: "We move your store for free",
    desc: "Moving from another host? We migrate your entire store — files, database, configurations, SSL — for free. Unlimited times. Zero-downtime where possible. You focus on the launch, we handle the move.",
    points: [
      "Full store migration — files, database, configs",
      "Unlimited migrations — no per-store fee",
      "Zero-downtime migrations where possible",
      "From cPanel, WP Engine, Shopify, or anywhere else",
    ],
    mock: "migration",
    reverse: true,
  },
];

const relatedFeatures = [
  { title: "Caching", path: "/features/caching", icon: Zap },
  { title: "Deployment", path: "/features/deployment", icon: Server },
  { title: "Backups & Recovery", path: "/features/backups", icon: RefreshCw },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
];

const faqSchema = [
  { q: "Can I host Magento on SharkCluster?", a: "Yes, SharkCluster supports Magento deployment with Apache or Nginx, MySQL database, and Redis caching for optimal performance." },
  { q: "How does SharkCluster handle traffic spikes for ecommerce?", a: "SharkCluster offers two-layer caching (Redis + Varnish), one-click server scaling, and Varnish grace periods that serve slightly-stale content during backend outages instead of showing errors." },
  { q: "Are store migrations really free?", a: "Yes, we migrate your entire store — files, database, configurations — for free, unlimited times. There is no per-store migration fee." },
];

function MockPanel({ type }: { type: string }) {
  if (type === "caching") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Zap className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Cache Performance</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Fast</span>
        </div>
        <div className="space-y-2.5">
          {[
            // No hit rates or latencies here — they would be invented. The panel
            // shows what each layer does, which is the actual selling point.
            { layer: "Varnish (Edge)", hit: "Full-page cache", ms: "Layer 1", color: "bg-brand-50 text-brand-600" },
            { layer: "Redis (Sessions)", hit: "Sessions & objects", ms: "Layer 2", color: "bg-blue-50 text-blue-600" },
            { layer: "Database", hit: "Origin — only on a miss", ms: "Origin", color: "bg-amber-50 text-amber-600" },
          ].map((c) => (
            <div key={c.layer} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${c.color}`}>
                  <Zap className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{c.layer}</p>
                  <p className="text-[10px] text-ink-400">{c.hit}</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{c.ms}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Two layers — your store stays fast under load</span>
        </div>
      </div>
    );
  }

  if (type === "scaling") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Gauge className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Server Scaling</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">1-Click</span>
        </div>
        <div className="space-y-2.5">
          {[
            { plan: "2 vCPU · 4GB", price: "$24/mo", current: true, color: "border-2 border-brand-500 bg-brand-50" },
            { plan: "4 vCPU · 8GB", price: "$48/mo", current: false, color: "border border-ink-200 bg-ink-50/50" },
            { plan: "8 vCPU · 16GB", price: "$96/mo", current: false, color: "border border-ink-200 bg-ink-50/50" },
          ].map((p) => (
            <div key={p.plan} className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${p.color}`}>
              <div className="flex items-center gap-2.5">
                <Server className="h-4 w-4 text-ink-400" />
                <p className="text-sm font-semibold text-ink-900">{p.plan}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-ink-700">{p.price}</span>
                {p.current && <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Current</span>}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">New pricing shown before you commit</p>
      </div>
    );
  }

  if (type === "security") {
    return (
      <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg">
        <div className="flex items-center justify-between border-b border-ink-700 bg-ink-800 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-ink-200">Security Audit Log</span>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-400">Live</span>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed">
          {[
            { code: "200", method: "GET", path: "/checkout", color: "text-emerald-400" },
            { code: "404", method: "GET", path: "/.env", color: "text-amber-400" },
            { code: "401", method: "POST", path: "/api/login", color: "text-amber-400" },
            { code: "200", method: "GET", path: "/cart", color: "text-emerald-400" },
            { code: "403", method: "POST", path: "/wp-admin", color: "text-red-400" },
          ].map((entry, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <span className={`font-bold ${entry.color}`}>{entry.code}</span>
              <span className="text-ink-400">{entry.method}</span>
              <span className="truncate text-ink-300">{entry.path}</span>
              <span className="ml-auto text-[10px] text-ink-500">203.0.113.{i + 4}</span>
            </div>
          ))}
          <p className="mt-2 text-emerald-400">$ <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" /></p>
        </div>
      </div>
    );
  }

  // migration
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <RefreshCw className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Store Migration</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Free</span>
      </div>
      <div className="space-y-2.5">
        {[
          { store: "Acme Store", from: "cPanel", progress: "Files", pct: "45%", color: "bg-amber-100 text-amber-700" },
          { store: "Globex Shop", from: "WP Engine", progress: "Database", pct: "80%", color: "bg-blue-100 text-blue-700" },
          { store: "Initech Mart", from: "Shopify", progress: "Complete", pct: "100%", color: "bg-emerald-100 text-emerald-700" },
        ].map((mig) => (
          <div key={mig.store} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-900">{mig.store}</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${mig.color}`}>{mig.progress}</span>
            </div>
            <p className="mt-0.5 text-[10px] text-ink-400">From {mig.from}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600" style={{ width: mig.pct }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Unlimited migrations — no per-store fee</p>
    </div>
  );
}

export default function EcommercePage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Ecommerce Hosting — Fast, Secure Online Stores on Your VPS"
        description="Host Magento, WooCommerce, and other ecommerce platforms on your own VPS with Redis caching, Varnish edge caching, free SSL, health alerts, and unlimited free migrations. Handle traffic spikes without downtime."
        path="/who-we-serve/ecommerce"
        keywords={["ecommerce hosting", "Magento hosting", "WooCommerce hosting", "online store hosting", "ecommerce VPS", "fast ecommerce hosting"]}
        faqSchema={faqSchema}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "For Ecommerce", path: "/who-we-serve/ecommerce" },
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
                <ShoppingCart className="h-4 w-4" />
                For Ecommerce
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Fast, secure stores <br />
                <span className="gradient-text">on your own VPS</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Host Magento, WooCommerce, and other ecommerce platforms with Redis caching, Varnish edge caching,
                free SSL, and health alerts. Handle traffic spikes without downtime — with unlimited free migrations
                and a dedicated DevOps manager.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/features/caching" className="btn-secondary btn-lg w-full sm:w-auto">
                  Explore Caching
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="caching" />
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

      {/* Benefits grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <ShoppingCart className="h-4 w-4" />
              Why Ecommerce
            </span>
            <h2 className="mt-5 heading-lg">Built for stores that need to stay up</h2>
            <p className="mt-4 text-body">
              Two-layer caching, one-click scaling, free SSL, and health alerts — everything your store needs to
              handle traffic spikes without downtime.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className={`reveal ${visible ? "is-visible" : ""} group relative flex flex-col rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-sm font-bold text-ink-900">{benefit.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{benefit.desc}</p>
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
                  <Activity className="h-3.5 w-3.5" />
                  Stay Up
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Your store stays up when it matters most</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Two-layer caching keeps your store fast. One-click scaling handles traffic spikes. Varnish grace
                  periods serve stale content during backend outages instead of errors. Free SSL, health alerts,
                  and unlimited migrations — everything your store needs.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Redis + Varnish — two caching layers",
                    "1-click scaling — handle traffic spikes",
                    "Grace periods — stale content, not errors",
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
                    <Network className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Traffic Spike</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Black Friday</span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-lg border border-red-100 bg-red-50/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-red-700">Without caching</span>
                      <span className="text-sm font-bold text-red-700">5xx errors</span>
                    </div>
                    <p className="mt-1 text-[10px] text-red-500">Backend overwhelmed — checkout fails</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-red-100">
                      <div className="h-full w-[95%] rounded-full bg-red-400" />
                    </div>
                  </div>
                  <div className="rounded-lg border-2 border-brand-500 bg-brand-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-700">With caching</span>
                      <span className="text-sm font-bold text-brand-700">8ms response</span>
                    </div>
                    <p className="mt-1 text-[10px] text-brand-600">Varnish serves cached pages — checkout works</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100">
                      <div className="h-full w-[12%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">Varnish absorbs the spike — store stays up</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Server className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your store</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                Pair caching and scaling with the tools that keep your store fast, secure, and resilient.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedFeatures.map((rf) => (
                <Link
                  key={rf.title}
                  to={rf.path}
                  className="group rounded-2xl border border-ink-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <rf.icon className="h-4 w-4" />
                    </span>
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
