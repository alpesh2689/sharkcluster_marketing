import { Link } from "react-router-dom";
import {
  Server, GitBranch, Database, RefreshCw, Activity, Terminal, Layers, Zap,
  Network, Boxes, Gauge, Cloud, Check, ArrowRight, Cpu, Package, Shield,
  Users, Receipt, ChevronRight, Lock, Play, HardDrive, Copy, FileCode,
  Sparkles, Boxes as BoxesIcon,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "12", label: "Platform capabilities" },
  { value: "7", label: "Backup types" },
  { value: "5", label: "Deployment methods" },
  { value: "∞", label: "Apps per server" },
];

const platformCapabilities = [
  { icon: Server, title: "Server Management", path: "/features/server-management", desc: "Full lifecycle control", badge: "Core" },
  { icon: RefreshCw, title: "Backups & Recovery", path: "/features/backups", desc: "7 backup types", badge: "Free" },
  { icon: GitBranch, title: "Deployment", path: "/features/deployment", desc: "Git, ZIP & Docker" },
  { icon: Zap, title: "Caching", path: "/features/caching", desc: "Redis & Varnish" },
  { icon: Activity, title: "Monitoring", path: "/features/monitoring", desc: "Health alerts" },
  { icon: Shield, title: "Firewall & Security", path: "/features/firewall", desc: "Closed by default" },
  { icon: Package, title: "Container Registry", path: "/features/container-registry", desc: "Private Docker images" },
  { icon: Database, title: "Databases", path: "/features/databases", desc: "Auto-wired per application" },
  { icon: Database, title: "Managed DB Clusters", path: "/features/managed-databases", desc: "Clusters that outlive servers" },
  { icon: Users, title: "Teams & Permissions", path: "/features/teams", desc: "Per-server, per-app access" },
  { icon: Receipt, title: "Billing & Invoicing", path: "/features/billing", desc: "One invoice, every provider" },
  { icon: Boxes, title: "Self-Hosted Supabase", path: "/features/self-hosted-supabase", desc: "Run your own on a VPS", badge: "New" },
];

const featureSections = [
  {
    id: "server-management",
    icon: Server,
    tag: "Server Management",
    title: "Full server lifecycle management",
    desc: "Create, monitor, scale, clone, and tear down servers — all from one panel. Every step is visible, every action logged.",
    points: [
      "5 deployment methods — fresh, Git, Docker, ZIP, or migration",
      "Live monitoring — CPU, memory, disk, and network graphs",
      "One-click scaling with new pricing shown before you commit",
      "Config drift detection reads actual running state",
    ],
    mock: "server",
    reverse: false,
  },
  {
    id: "backups",
    icon: RefreshCw,
    tag: "Backups",
    title: "7 backup types for every failure scenario",
    desc: "Not seven ways to do the same thing — seven purpose-built mechanisms, each answering a different failure scenario.",
    points: [
      "Auto backups — provider-native scheduled, toggled on/off",
      "Snapshots & images — on-demand with auto-scheduling",
      "Portable backups — the only type designed to leave the provider",
      "Clone server — full duplication with optional different sizing",
    ],
    mock: "backups",
    reverse: true,
  },
  {
    id: "deployment",
    icon: GitBranch,
    tag: "Deployment",
    title: "Deploy from Git, ZIP, or Docker",
    desc: "Connect GitHub, GitLab, or Bitbucket with scoped deploy keys. Upload a ZIP, pull a Docker image, or start fresh.",
    points: [
      "Scoped deploy keys — safer than full-account tokens",
      "Docker host support with configurable CPU and memory",
      "Per-app deployment scripts — build, migrate, cache",
      "One-click staging environments for every application",
    ],
    mock: "deployment",
    reverse: false,
  },
  {
    id: "caching",
    icon: Zap,
    tag: "Caching",
    title: "Two-layer caching: Redis & Varnish",
    desc: "Redis caches inside your application; Varnish caches in front of your web server. Complementary, not competing.",
    points: [
      "Redis memory management with eviction policy control",
      "Live config detection reads actual running Redis config",
      "In-panel VCL editing — fetch and upload custom .vcl files",
      "Varnish grace periods serve stale content during outages",
    ],
    mock: "caching",
    reverse: true,
  },
  {
    id: "multi-provider",
    icon: Cloud,
    tag: "Multi-Provider",
    title: "Multi-provider by design",
    desc: "Compare plans across multiple cloud providers side-by-side. No vendor lock-in, transparent billing.",
    points: [
      "Side-by-side comparison — price, specs, and location",
      "Transparent billing — hourly, prepaid, or usage-based",
      "Portable backups designed to leave a provider",
      "No lock-in — switch providers without rewriting your stack",
    ],
    mock: "provider",
    reverse: false,
  },
  {
    id: "container-registry",
    icon: Package,
    tag: "Container Registry",
    title: "Private container registry in-panel",
    desc: "Push private Docker images from CI with robot accounts, then deploy them to your servers — all from one panel, no third-party registry.",
    points: [
      "Multiple isolated registries with repositories and tags",
      "Standard Docker registry API — any client works",
      "Docker host integration pulls from your private registry",
      "Per-registry storage quotas with retention rules",
    ],
    mock: "registry",
    reverse: true,
  },
];

function HeroMock() {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Cpu className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Platform Overview</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">All included</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Server, label: "Server Mgmt", val: "5 methods", color: "bg-brand-50 text-brand-600" },
          { icon: RefreshCw, label: "Backups", val: "7 types", color: "bg-blue-50 text-blue-600" },
          { icon: GitBranch, label: "Deployment", val: "Git+Docker", color: "bg-emerald-50 text-emerald-600" },
          { icon: Zap, label: "Caching", val: "2 layers", color: "bg-amber-50 text-amber-600" },
          { icon: Shield, label: "Firewall", val: "UFW", color: "bg-red-50 text-red-600" },
          { icon: Activity, label: "Monitoring", val: "24/7", color: "bg-purple-50 text-purple-600" },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3 transition-colors hover:border-brand-200 hover:bg-brand-50/30">
            <div className="flex items-center justify-between">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.color}`}>
                <item.icon className="h-3.5 w-3.5" />
              </span>
              <span className="font-mono text-[10px] font-bold text-brand-600">{item.val}</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-ink-900">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
        <Check className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-xs font-medium text-emerald-700">Every capability built into every plan — no upsells</span>
      </div>
    </div>
  );
}

function FeatureMock({ type }: { type: string }) {
  if (type === "server") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Server className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Server Dashboard</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Healthy</span>
        </div>
        <div className="space-y-2.5">
          {[
            { label: "CPU", val: "34%", pct: "34%", color: "from-brand-400 to-brand-600" },
            { label: "Memory", val: "62%", pct: "62%", color: "from-blue-400 to-blue-600" },
            { label: "Disk", val: "41%", pct: "41%", color: "from-emerald-400 to-emerald-600" },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-500">{m.label}</span>
                <span className="font-mono text-xs font-bold text-ink-900">{m.val}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
                <div className={`h-full rounded-full bg-gradient-to-r ${m.color}`} style={{ width: m.pct }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Live monitoring — know before things break</p>
      </div>
    );
  }

  if (type === "backups") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <RefreshCw className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">7 Backup Types</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Free</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "Auto Backups", desc: "Provider-native scheduled", icon: RefreshCw, color: "bg-brand-50 text-brand-600" },
            { name: "Snapshots", desc: "On-demand point-in-time", icon: Layers, color: "bg-blue-50 text-blue-600" },
            { name: "Portable Backups", desc: "Designed to leave the provider", icon: HardDrive, color: "bg-emerald-50 text-emerald-600" },
            { name: "Clone Server", desc: "Full duplication with resize", icon: Copy, color: "bg-amber-50 text-amber-600" },
          ].map((b) => (
            <div key={b.name} className="flex items-center gap-2.5 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${b.color}`}>
                <b.icon className="h-3.5 w-3.5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-900">{b.name}</p>
                <p className="text-[10px] text-ink-400">{b.desc}</p>
              </div>
              <Check className="h-4 w-4 text-emerald-500" />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Each type solves a different failure scenario</p>
      </div>
    );
  }

  if (type === "deployment") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <GitBranch className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Deployment Methods</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">5 methods</span>
        </div>
        <div className="space-y-2">
          {[
            { method: "Git Deploy", icon: GitBranch, color: "bg-brand-50 text-brand-600" },
            { method: "Docker Image", icon: Layers, color: "bg-blue-50 text-blue-600" },
            { method: "ZIP Upload", icon: HardDrive, color: "bg-emerald-50 text-emerald-600" },
            { method: "Fresh Install", icon: Cloud, color: "bg-amber-50 text-amber-600" },
            { method: "Migration", icon: RefreshCw, color: "bg-purple-50 text-purple-600" },
          ].map((m) => (
            <div key={m.method} className="flex items-center gap-2.5 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${m.color}`}>
                <m.icon className="h-3.5 w-3.5" />
              </span>
              <p className="flex-1 text-sm font-semibold text-ink-900">{m.method}</p>
              <Check className="h-4 w-4 text-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
            { layer: "Varnish (Edge)", hit: "94.2%", ms: "8ms", color: "bg-brand-50 text-brand-600" },
            { layer: "Redis (Sessions)", hit: "99.1%", ms: "2ms", color: "bg-blue-50 text-blue-600" },
            { layer: "Database", hit: "—", ms: "45ms", color: "bg-amber-50 text-amber-600" },
          ].map((c) => (
            <div key={c.layer} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${c.color}`}>
                  <Zap className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{c.layer}</p>
                  <p className="text-[10px] text-ink-400">Hit rate: {c.hit}</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-ink-700">{c.ms}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Two layers — fast even under load</span>
        </div>
      </div>
    );
  }

  if (type === "provider") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Cloud className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Compare Providers</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">No lock-in</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "DigitalOcean", spec: "4 vCPU · 8GB · NYC", price: "$48/mo", color: "bg-brand-50 text-brand-600" },
            { name: "Contabo", spec: "4 vCPU · 8GB · DEL", price: "$18/mo", color: "bg-blue-50 text-blue-600" },
            { name: "OVHcloud", spec: "4 vCPU · 8GB · FRA", price: "$22/mo", color: "bg-emerald-50 text-emerald-600" },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${p.color}`}>
                  <Cloud className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{p.name}</p>
                  <p className="text-[10px] text-ink-400">{p.spec}</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-ink-700">{p.price}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Compare side-by-side — pick what fits</p>
      </div>
    );
  }

  // registry
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Package className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Private Registry</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">In-panel</span>
      </div>
      <div className="space-y-2.5">
        {[
            { repo: "acme/web", tags: "12 tags", size: "1.2 GB", color: "bg-brand-50 text-brand-600" },
            { repo: "acme/api", tags: "8 tags", size: "640 MB", color: "bg-blue-50 text-blue-600" },
            { repo: "acme/worker", tags: "4 tags", size: "210 MB", color: "bg-emerald-50 text-emerald-600" },
        ].map((r) => (
          <div key={r.repo} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${r.color}`}>
                  <Package className="h-3.5 w-3.5" />
                </span>
                <p className="font-mono text-sm font-semibold text-ink-900">{r.repo}</p>
              </div>
              <span className="font-mono text-[10px] text-ink-400">{r.size}</span>
            </div>
            <p className="mt-1 pl-9 text-[10px] text-ink-400">{r.tags}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Push from CI, deploy to servers — no third party</p>
    </div>
  );
}

export default function FeaturesPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Features — Server Management, Backups, Caching & More"
        description="Explore SharkCluster's full feature set: server lifecycle management, 7 backup types, Git & Docker deployment, Redis & Varnish caching, health alerts, firewall, and multi-provider support."
        path="/features"
        keywords={["server management", "cloud hosting features", "backup types", "Redis caching", "Varnish caching", "VPS management panel", "Git deployment", "Docker hosting"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Features", path: "/features" }]}
      />

      {/* Split hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-300/15 blur-3xl" />
          <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-blue-300/10 blur-3xl" />
        </div>
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
                <Cpu className="h-4 w-4" />
                Powerful Features
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Everything you need to run <br />
                <span className="gradient-text">production workloads</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                From server creation to scaling, backups to security, caching to monitoring — SharkCluster puts
                the entire server lifecycle in one panel, with expert guidance built into every setting. No
                add-ons, no upsells — every capability in every plan.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <HeroMock />
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

      {/* Platform capabilities grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Sparkles className="h-4 w-4" />
              Platform Capabilities
            </span>
            <h2 className="mt-5 heading-lg">Twelve capabilities, one panel</h2>
            <p className="mt-4 text-body">
              Every capability is built into every plan — no add-ons, no upsells. Click any card to dive into the details.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platformCapabilities.map((cap, i) => (
              <Link
                key={cap.title}
                to={cap.path}
                className={`reveal ${visible ? "is-visible" : ""} group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <cap.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-bold text-ink-900">{cap.title}</h3>
                    {cap.badge && (
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                        {cap.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-500">{cap.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature deep-dives with mockups */}
      {featureSections.map((section) => (
        <section key={section.id} id={section.id} className="section pt-0">
          <div className="container-px">
            <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${section.reverse ? "lg:grid-flow-col-dense" : ""}`}>
              <div className={section.reverse ? "lg:col-start-2" : ""}>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  <section.icon className="h-3.5 w-3.5" />
                  {section.tag}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{section.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-600">{section.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-ink-700">{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`#${section.id}`}
                  className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  Learn more
                  <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                </Link>
              </div>
              <div className={`relative ${section.reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/20 to-blue-200/10 blur-2xl" />
                <FeatureMock type={section.mock} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <FinalCTA />
    </>
  );
}
