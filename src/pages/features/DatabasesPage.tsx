import { Link } from "react-router-dom";
import {
  Database, Server, GitBranch, Shield, RefreshCw, Table, Import, Download,
  Boxes, ArrowRight, Check, ChevronRight, FileBox, FileText, Box,
  HardDrive, Settings, Activity,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const engines = [
  { icon: Database, title: "MySQL", desc: "The default for most PHP applications — auto-created and wired in" },
  { icon: Table, title: "PostgreSQL", desc: "Advanced relational database — auto-created and wired in" },
  { icon: FileBox, title: "MongoDB", desc: "Document storage, typical for MERN-stack applications" },
  { icon: FileText, title: "SQLite", desc: "File-based, fine for small or single-user apps" },
  { icon: Box, title: "None", desc: "For static sites or apps using an external database" },
];

const featureRows = [
  {
    icon: Database,
    tag: "Binding",
    title: "Automatic database binding",
    desc: "When you create an application, the panel creates the database, a user, and a password, and wires them into the application's configuration. Credentials appear on the application's page — you never set them by hand.",
    points: [
      "MySQL — the default for most PHP applications",
      "PostgreSQL — for apps that need it",
      "MongoDB — document storage, typical for MERN",
      "SQLite — file-based, fine for small or single-user apps",
      "None — for static sites or apps using an external database",
    ],
    mock: "binding",
    reverse: false,
  },
  {
    icon: Table,
    tag: "Web Manager",
    title: "Web database manager, on demand",
    desc: "Launch a web client directly from the panel — installed on demand the first time you use it. MongoDB has no web client here, but MySQL and PostgreSQL do.",
    points: [
      "MySQL/MariaDB → phpMyAdmin",
      "PostgreSQL → phpPgAdmin",
      "Installed on first use — opens in a new tab",
      "Direct access to tables, queries, and exports",
    ],
    mock: "manager",
    reverse: true,
  },
  {
    icon: Download,
    tag: "Import",
    title: "Import with live progress",
    desc: "A dedicated import service handles database imports — not just a file upload. The panel reports live progress as the import runs, and status plus any errors surface directly in the application view so you know exactly what happened without digging through logs.",
    points: [
      "Dedicated import service — not a plain file upload",
      "Live progress reported in the panel as the import runs",
      "Supported formats: .zip and .gz database dumps",
      "Status and errors surfaced in the application view",
    ],
    mock: "import",
    reverse: false,
  },
  {
    icon: RefreshCw,
    tag: "Switching",
    title: "Changing databases, three options",
    desc: "Three options: choose an existing database on the server, create a new one and bind it in a single step, or repoint the application at a different database. Relinking changes what the app reads and writes immediately.",
    points: [
      "Choose Existing Database — pick one already on the server",
      "Add New Database — create and bind in one step",
      "Change Database — repoint to a different database",
      "Old database is not deleted — app just stops using it",
    ],
    mock: "switching",
    reverse: true,
  },
];

const stats = [
  { value: "4", label: "Database engines" },
  { value: "0", label: "Manual credentials" },
  { value: "2", label: "Web managers (phpMyAdmin, phpPgAdmin)" },
  { value: "1", label: "Click to import" },
];

const relatedFeatures = [
  { title: "Managed Database Clusters", path: "/features/managed-databases", icon: Boxes },
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Deployment", path: "/features/deployment", icon: GitBranch },
  { title: "Backups & Recovery", path: "/features/backups", icon: RefreshCw },
];

function MockPanel({ type }: { type: string }) {
  if (type === "binding") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Database className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Database Binding</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Auto</span>
        </div>
        <div className="space-y-2.5">
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-xs font-semibold text-ink-500">Engine</p>
            <div className="mt-1.5 flex items-center gap-2">
              <Database className="h-3.5 w-3.5 text-brand-600" />
              <span className="text-sm font-bold text-ink-900">MySQL</span>
            </div>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-xs font-semibold text-ink-500">Database</p>
            <p className="text-sm font-mono font-bold text-ink-900">app_prod_db</p>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-xs font-semibold text-ink-500">User</p>
            <p className="text-sm font-mono font-bold text-ink-900">app_user_8f3a</p>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-xs font-semibold text-ink-500">Password</p>
            <p className="text-sm font-mono font-bold text-ink-900">••••••••••••</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Wired into application config</span>
        </div>
      </div>
    );
  }

  if (type === "manager") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Settings className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Web Database Manager</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <Database className="h-4 w-4 text-ink-400" />
              <div>
                <p className="text-sm font-semibold text-ink-900">phpMyAdmin</p>
                <p className="text-[10px] text-ink-400">MySQL / MariaDB</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Ready</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <Table className="h-4 w-4 text-ink-400" />
              <div>
                <p className="text-sm font-semibold text-ink-900">phpPgAdmin</p>
                <p className="text-[10px] text-ink-400">PostgreSQL</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">Install</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <FileBox className="h-4 w-4 text-ink-400" />
              <div>
                <p className="text-sm font-semibold text-ink-900">MongoDB</p>
                <p className="text-[10px] text-ink-400">No web client</p>
              </div>
            </div>
            <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-bold uppercase text-ink-400">N/A</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2">
          <ArrowRight className="h-3.5 w-3.5 text-brand-600" />
          <span className="text-xs font-medium text-brand-700">Opens in a new tab on first use</span>
        </div>
      </div>
    );
  }

  if (type === "import") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Download className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Import Database</span>
          </div>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">Running</span>
        </div>
        <div className="rounded-lg border-2 border-dashed border-ink-200 bg-ink-50/50 px-4 py-5 text-center">
          <Download className="mx-auto h-5 w-5 text-ink-400" />
          <p className="mt-1.5 text-xs font-semibold text-ink-700">backup_dump.sql.gz</p>
          <p className="text-[10px] text-ink-400">.zip or .gz only</p>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-700">Importing…</span>
            <span className="font-bold text-brand-600">67%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full w-[67%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all" />
          </div>
        </div>
        <div className="mt-3 space-y-1.5 border-t border-ink-100 pt-3">
          <div className="flex items-center gap-2 text-xs">
            <Check className="h-3 w-3 text-emerald-600" />
            <span className="text-ink-500">File validated</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Activity className="h-3 w-3 text-brand-600" />
            <span className="text-ink-500">Restoring 1,284 of 1,920 rows…</span>
          </div>
        </div>
      </div>
    );
  }

  // switching
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <RefreshCw className="h-4 w-4 text-brand-600" />
        <span className="text-sm font-semibold text-ink-900">Change Database</span>
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center justify-between rounded-lg border-2 border-brand-500 bg-brand-50 px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <Database className="h-4 w-4 text-brand-600" />
            <div>
              <p className="text-sm font-bold text-ink-900">Current binding</p>
              <p className="text-[10px] text-ink-500">app_prod_db · MySQL</p>
            </div>
          </div>
          <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Active</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <HardDrive className="h-4 w-4 text-ink-400" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Choose Existing</p>
              <p className="text-[10px] text-ink-400">Pick one already on the server</p>
            </div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-ink-300" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <Database className="h-4 w-4 text-ink-400" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Add New</p>
              <p className="text-[10px] text-ink-400">Create and bind in one step</p>
            </div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-ink-300" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <RefreshCw className="h-4 w-4 text-ink-400" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Change Database</p>
              <p className="text-[10px] text-ink-400">Repoint to a different database</p>
            </div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-ink-300" />
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Old database is not deleted — app just stops using it</p>
    </div>
  );
}

export default function DatabasesPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Managed Databases — MySQL, PostgreSQL, MongoDB, SQLite"
        description="Multi-engine database support with auto-generated credentials, web database manager, import/export tools, and per-application database binding. Managed Database clusters available separately."
        path="/features/databases"
        keywords={["managed databases", "MySQL hosting", "PostgreSQL hosting", "MongoDB hosting", "database management", "SQLite", "web database manager"]}
        faqSchema={[
          { q: "Which database engines does SharkCluster support?", a: "SharkCluster supports MySQL, PostgreSQL, MongoDB, and SQLite. The panel creates the database, a user, and a password, and wires them into your application's configuration automatically." },
          { q: "Can I manage my database from the panel?", a: "Yes, SharkCluster provides a web database manager — phpMyAdmin for MySQL/MariaDB and phpPgAdmin for PostgreSQL — installed on demand and opened in a new tab." },
          { q: "Can I import a database dump?", a: "Yes, you can upload .zip or .gz dump files directly into your application's database from the Access tab. The panel refuses any other file format." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Databases", path: "/features/databases" },
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
                Databases
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Multi-engine databases <br />
                <span className="gradient-text">managed automatically</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                MySQL, PostgreSQL, MongoDB, and SQLite — created and wired into your application automatically.
                Import, export, and manage from a web database manager. No manual credential setup.
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
              <MockPanel type="binding" />
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

      {/* Database engines grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Database className="h-4 w-4" />
              Engines
            </span>
            <h2 className="mt-5 heading-lg">Four engines, auto-wired</h2>
            <p className="mt-4 text-body">
              When you create an application, the panel creates the database, a user, and a password, and wires them
              into the application's configuration. Credentials appear on the application's page — you never set them
              by hand.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {engines.map((engine, i) => (
              <div
                key={engine.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <engine.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{engine.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{engine.desc}</p>
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
                  <Boxes className="h-3.5 w-3.5" />
                  Managed Clusters
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Per-app databases vs Managed clusters</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Every application gets a database created and wired in automatically — that is a per-app database,
                  owned by that one application. Managed Database clusters are a separate product: standalone clusters
                  that can outlive a server, be shared across applications, and carry their own parameter groups,
                  backups, and access controls.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Per-app: auto-created, owned by one application", "Managed cluster: standalone, shared, survives server loss", "Both managed from the same panel — no separate tools"].map((point) => (
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
                    <Boxes className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Database Comparison</span>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Per-app database</p>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-emerald-600" /><span className="text-ink-600">Auto-created with the app</span></div>
                      <div className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-emerald-600" /><span className="text-ink-600">Owned by one application</span></div>
                      <div className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-emerald-600" /><span className="text-ink-600">Credentials auto-wired</span></div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-brand-200 bg-brand-50 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Managed cluster</p>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-brand-600" /><span className="text-ink-700">Standalone — outlives servers</span></div>
                      <div className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-brand-600" /><span className="text-ink-700">Shared across applications</span></div>
                      <div className="flex items-center gap-2 text-xs"><Check className="h-3 w-3 text-brand-600" /><span className="text-ink-700">Own backups & parameter groups</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Database className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your databases</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair database management with the tools that keep your applications fast, secure, and resilient.</p>
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
