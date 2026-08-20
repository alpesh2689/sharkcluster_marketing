import { Link } from "react-router-dom";
import {
  Database, Server, RefreshCw, Shield, Layers, GitBranch, Activity,
  Settings, KeyRound, ArrowRight, Check, ChevronRight, HardDrive,
  TrendingUp, Clock, Monitor,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const clusterFeatures = [
  { icon: Database, title: "Standalone Clusters", desc: "Not tied to any single app — shared across multiple applications" },
  { icon: Server, title: "Survives Server Loss", desc: "Data persists even if the server it started on is destroyed" },
  { icon: Settings, title: "Parameter Groups", desc: "Reusable named sets of engine settings — apply across clusters" },
  { icon: RefreshCw, title: "Automated Backups", desc: "Scheduled, retained, restorable from the panel — no scripts" },
  { icon: KeyRound, title: "Connection Management", desc: "Database users, permissions, and connection strings" },
];

const featureRows = [
  {
    icon: Settings,
    tag: "Parameters",
    title: "Parameter groups — tune once, apply everywhere",
    desc: "Tune engine configuration as reusable named sets and apply them across clusters. A parameter group is a versioned bundle of engine settings — connection limits, memory, query timeouts — that you define once and attach to any cluster. Change a group and every cluster using it picks up the new values; roll back the group to undo.",
    points: [
      "Named, reusable parameter sets — define once, apply to many clusters",
      "Engine-specific settings: connection limits, memory, timeouts, and more",
      "Versioned — roll back a parameter group to a previous configuration",
      "Apply changes without touching the applications that depend on the cluster",
    ],
    mock: "params",
    reverse: false,
  },
  {
    icon: RefreshCw,
    tag: "Backups",
    title: "Automated backups, no scripts required",
    desc: "Backups for a cluster are scheduled, retained, and restorable from the panel — no cron jobs to maintain and no scripts to write. Restore a cluster to a point in time when you need to roll back, without depending on any one server's backup.",
    points: [
      "Scheduled, platform-managed backups — no manual scripts",
      "Configurable retention so old backups age out automatically",
      "Point-in-time restore for rollbacks",
      "Backups stored separately from the cluster itself",
    ],
    mock: "backups",
    reverse: true,
  },
  {
    icon: KeyRound,
    tag: "Access",
    title: "Connection and access management",
    desc: "Manage database users, their permissions, and the connection details applications use to reach the cluster. Create users scoped to specific databases, rotate credentials, and hand applications a connection string instead of a raw password.",
    points: [
      "Database users with per-database permissions",
      "Rotate credentials without rewriting application config",
      "Connection details surfaced in the panel for each cluster",
      "Separate access for humans, services, and robot accounts",
    ],
    mock: "access",
    reverse: false,
  },
  {
    icon: Activity,
    tag: "Monitoring",
    title: "Monitoring and logs from the panel",
    desc: "Engine logs and cluster health are visible in the panel — you do not need to SSH in to read a slow query log or check connection count. Health covers CPU, memory, connections, and storage; logs cover engine-level events and errors.",
    points: [
      "Engine logs readable from the panel — no SSH required",
      "Cluster health: CPU, memory, connections, and storage",
      "Slow query and error logs surfaced alongside the cluster",
      "History retained so you can investigate after the fact",
    ],
    mock: "monitoring",
    reverse: true,
  },
];

const stats = [
  { value: "2", label: "Engines (Postgres, MySQL)" },
  { value: "0", label: "Servers required to survive" },
  { value: "Auto", label: "Backups scheduled" },
  { value: "1", label: "Parameter group = many clusters" },
];

const relatedFeatures = [
  { title: "Databases (per-app)", path: "/features/databases", icon: Layers },
  { title: "Backups & Recovery", path: "/features/backups", icon: RefreshCw },
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
];

function MockPanel({ type }: { type: string }) {
  if (type === "cluster") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Database className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">prod-cluster-01</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Healthy</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
            <p className="text-xs font-medium text-ink-500">Engine</p>
            <p className="mt-0.5 text-sm font-bold text-ink-900">PostgreSQL 16</p>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
            <p className="text-xs font-medium text-ink-500">Connected Apps</p>
            <p className="mt-0.5 text-sm font-bold text-ink-900">3 applications</p>
          </div>
        </div>
        <div className="mt-3 rounded-lg border border-ink-100 bg-ink-50/50 p-3">
          <p className="text-xs font-medium text-ink-500">Connection String</p>
          <p className="mt-1 font-mono text-[11px] text-ink-700">postgres://db-user@cluster-01.internal:5432/app</p>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Survives server loss</span>
        </div>
      </div>
    );
  }

  if (type === "params") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-brand-600" />
            <span className="text-sm font-semibold text-ink-900">pg-tuning-prod</span>
          </div>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">v3</span>
        </div>
        <div className="space-y-2.5">
          {[
            { label: "max_connections", val: "200", color: "bg-brand-500", w: "w-[80%]" },
            { label: "shared_buffers", val: "4 GB", color: "bg-blue-500", w: "w-[60%]" },
            { label: "statement_timeout", val: "30s", color: "bg-amber-500", w: "w-[45%]" },
          ].map((p) => (
            <div key={p.label} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-medium text-ink-600">{p.label}</span>
                <span className="font-bold text-ink-900">{p.val}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-200">
                <div className={`h-full rounded-full ${p.color} ${p.w}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-brand-600" />
          <span className="text-xs font-medium text-brand-700">Applied to 4 clusters</span>
        </div>
      </div>
    );
  }

  if (type === "backups") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-brand-600" />
            <span className="text-sm font-semibold text-ink-900">Backup Schedule</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Auto</span>
        </div>
        <div className="space-y-2">
          {[
            { time: "Today 03:00", size: "2.4 GB", status: "Latest", color: "bg-emerald-100 text-emerald-700" },
            { time: "Yesterday 03:00", size: "2.3 GB", status: "Retained", color: "bg-blue-100 text-blue-700" },
            { time: "2 days ago", size: "2.3 GB", status: "Retained", color: "bg-blue-100 text-blue-700" },
          ].map((b) => (
            <div key={b.time} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{b.time}</p>
                  <p className="text-[10px] text-ink-400">{b.size}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${b.color}`}>{b.status}</span>
            </div>
          ))}
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-3 py-2 text-xs font-bold text-white">
          <RefreshCw className="h-3.5 w-3.5" />
          Restore from backup
        </button>
      </div>
    );
  }

  if (type === "access") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Database Users</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "app-service", perm: "Read/Write", db: "app_db", color: "bg-emerald-100 text-emerald-700" },
            { name: "analytics-ro", perm: "Read only", db: "app_db", color: "bg-blue-100 text-blue-700" },
            { name: "migrator-bot", perm: "DDL", db: "app_db", color: "bg-amber-100 text-amber-700" },
          ].map((u) => (
            <div key={u.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <KeyRound className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{u.name}</p>
                  <p className="font-mono text-[10px] text-ink-400">db: {u.db}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${u.color}`}>{u.perm}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-ink-100 bg-ink-50/50 p-3">
          <p className="text-xs font-medium text-ink-500">Connection String</p>
          <p className="mt-1 font-mono text-[11px] text-ink-700">postgres://app-service@cluster-01:5432/app_db</p>
        </div>
      </div>
    );
  }

  // monitoring
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Activity className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Cluster Health</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "CPU", val: "41%", color: "bg-brand-500", w: "w-[41%]" },
          { label: "Memory", val: "67%", color: "bg-blue-500", w: "w-[67%]" },
          { label: "Connections", val: "28%", color: "bg-emerald-500", w: "w-[28%]" },
          { label: "Storage", val: "53%", color: "bg-amber-500", w: "w-[53%]" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-ink-500">{m.label}</span>
              <span className="font-bold text-ink-900">{m.val}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-200">
              <div className={`h-full rounded-full ${m.color} ${m.w}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
        <Check className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-xs font-medium text-emerald-700">All metrics nominal</span>
      </div>
    </div>
  );
}

export default function ManagedDatabasesPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Managed Databases — Clusters That Outlive Your Servers"
        description="Managed Database clusters are a separate product from per-app databases. Shared across applications, built to survive server loss, with parameter groups, automated backups, and connection management."
        path="/features/managed-databases"
        keywords={["managed databases", "database clusters", "managed postgres", "managed mysql", "database parameter groups", "managed database backups", "shared database cluster"]}
        faqSchema={[
          { q: "What is the difference between per-app databases and Managed Databases?", a: "Every application gets a database created and wired in automatically — that is a per-app database, tied to that application. Managed Database clusters are a separate product: standalone clusters that can outlive a server, be shared across applications, and carry their own parameter groups, backups, and access controls." },
          { q: "When should I choose a Managed Database cluster over a per-app database?", a: "Choose a per-app database when a single application owns its data. Choose a Managed Database cluster when several applications share one database, when the database must survive the server it started on, or when you need parameter groups and managed backups independent of any one app." },
          { q: "Can a Managed Database survive a server loss?", a: "Yes. Because clusters are separate from any single server, your database persists even if the server it was originally attached to is destroyed. Applications reconnect to the cluster from a new server." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Managed Databases", path: "/features/managed-databases" },
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
                <Database className="h-4 w-4" />
                Managed Databases
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Database clusters that <br />
                <span className="gradient-text">outlive your servers</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                A database that several applications share, or that must survive the server it started on, needs to
                be managed separately. Managed Database clusters give you exactly that — with parameter groups,
                automated backups, and connection management.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Create a Database
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="cluster" />
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

      {/* Cluster features grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Database className="h-4 w-4" />
              Clusters
            </span>
            <h2 className="mt-5 heading-lg">Not per-app databases — standalone clusters</h2>
            <p className="mt-4 text-body">
              Every application gets a database created and wired in automatically — that is a per-app database,
              owned by that one application. A Managed Database cluster is standalone: it does not belong to any
              single app, it can be shared across several, and it is built to survive the server it started on.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clusterFeatures.map((feature, i) => (
              <div
                key={feature.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <feature.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{feature.desc}</p>
                </div>
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
                  <Layers className="h-3.5 w-3.5" />
                  Per-App vs Managed
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Two database products, one panel</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Per-app databases are created automatically and owned by one application. Managed Database clusters
                  are standalone, shared across apps, and built to survive server loss. Use a per-app database when
                  one app owns its data; use a cluster when the data outlives an app or a server.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Per-app: auto-created, owned by one application",
                    "Managed cluster: standalone, shared, survives server loss",
                    "Both managed from the same panel — no separate tools",
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
                    <Activity className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Cluster Health</span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { label: "CPU", val: "41%", w: "w-[41%]" },
                    { label: "Memory", val: "67%", w: "w-[67%]" },
                    { label: "Connections", val: "28%", w: "w-[28%]" },
                    { label: "Storage", val: "53%", w: "w-[53%]" },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-ink-500">{m.label}</span>
                        <span className="font-bold text-ink-900">{m.val}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
                        <div className={`h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 ${m.w}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Database className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your databases</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair Managed Databases with the tools that keep your applications fast, secure, and resilient.</p>
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
