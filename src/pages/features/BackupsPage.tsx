import { Link } from "react-router-dom";
import {
  RefreshCw, Server, Layers, Shield, Activity, ArrowRight, Check,
  HardDriveDownload, Archive, Copy, Database, Cloud, Clock,
  RotateCcw, FileArchive, Box, ChevronRight, HardDrive, TrendingDown, Camera,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const backupTypes = [
  { icon: Clock, title: "Auto Backup", desc: "Whole server on the provider's schedule — recovers from losing the server" },
  { icon: Camera, title: "Snapshot", desc: "Whole server on demand — recovers from a change you want to undo" },
  { icon: FileArchive, title: "Server Image", desc: "Reusable template — recovers by building more servers like this one" },
  { icon: HardDriveDownload, title: "Custom Backup", desc: "Nominated paths only — recovers from losing specific files" },
  { icon: Box, title: "Portable Backup", desc: "Movable format — recovers by moving provider or leaving" },
  { icon: Archive, title: "Full Server Backup", desc: "Everything, panel-managed — recovers from most situations" },
  { icon: Copy, title: "Clone", desc: "A running copy — recovers by testing or scaling out to a new server" },
];

const featureRows = [
  {
    icon: HardDriveDownload,
    tag: "Storage",
    title: "Free local, optional offsite",
    desc: "Local backups are stored on your server and are free. Offsite backups are uploaded to object storage and the local copy is then deleted — so an offsite backup exists in exactly one place. This is the only type that survives server loss.",
    points: [
      "Local backups — free, stored on the server",
      "Offsite backups — $0.04 per GB, uploaded to object storage",
      "Offsite is a move, not a copy — the server-side archive is removed after upload",
      "Offsite restore downloads first, then restores from the downloaded copy",
    ],
    mock: "storage",
    reverse: false,
  },
  {
    icon: Clock,
    tag: "Retention",
    title: "Retention & scheduling that thinks ahead",
    desc: "Full server backups support configurable retention with auto-delete tracking. Schedule options include Manual, Daily, Weekly, 14 Days, and Monthly. The panel recommends a 7-day retention floor minimum.",
    points: [
      "Named backups with Created At and Auto Delete On dates",
      "Frequency: Manual, Daily, Weekly, 14 Days, Monthly",
      "Configurable retention count with 7-day floor recommendation",
      "Restore, rollback, delete, and permanent-delete actions",
    ],
    mock: "retention",
    reverse: true,
  },
  {
    icon: Database,
    tag: "App-Level",
    title: "Application-level backups with finer control",
    desc: "Each application has its own backup system with finer-grained control. Backups include a zip of the app root (including dotfiles like .env) and a database dump. Restore takes a safety backup first.",
    points: [
      "Full Backup, Code Only, or Database Only scope options",
      "Max 5 backups kept per application",
      "Pre-restore safety backup taken automatically before overwriting",
      "Scheduled backups with Daily, Weekly, 14 Days, or Monthly frequency",
    ],
    mock: "appbackup",
    reverse: false,
  },
  {
    icon: RotateCcw,
    tag: "Recovery",
    title: "Restore with a safety net",
    desc: "Every restore path is designed so a failed recovery doesn't make things worse. Application restores take a safety backup before overwriting. Offsite restores download first, then restore from the local copy. You always have a way back.",
    points: [
      "Pre-restore safety backup before any overwrite",
      "Offsite restore downloads first, then restores locally",
      "Rollback to any named backup in one click",
      "Permanent-delete for when you truly want it gone",
    ],
    mock: "restore",
    reverse: true,
  },
];

const stats = [
  { value: "7", label: "Backup types" },
  { value: "$0.04", label: "Per GB offsite" },
  { value: "5", label: "App backups per app" },
  { value: "Free", label: "Local backups" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Caching (Redis & Varnish)", path: "/features/caching", icon: Layers },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
  { title: "Health Alerts & Monitoring", path: "/features/monitoring", icon: Activity },
];

function MockPanel({ type }: { type: string }) {
  if (type === "storage") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <HardDriveDownload className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Backup Storage</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Active</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <HardDrive className="h-4 w-4 text-ink-400" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Local backup</p>
                <p className="text-[10px] text-ink-400">On-server · Free</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600">Free</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border-2 border-brand-500 bg-brand-50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <Cloud className="h-4 w-4 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Offsite backup</p>
                <p className="text-[10px] text-brand-600">Object storage · $0.04/GB</p>
              </div>
            </div>
            <span className="text-xs font-bold text-brand-700">$0.04/GB</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <TrendingDown className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">Offsite is a move — local copy deleted after upload</span>
        </div>
      </div>
    );
  }

  if (type === "retention") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Backup Schedule</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "daily-full", freq: "Daily", auto: "Auto-delete in 7d", color: "bg-emerald-100 text-emerald-700" },
            { name: "weekly-snapshot", freq: "Weekly", auto: "Auto-delete in 30d", color: "bg-blue-100 text-blue-700" },
            { name: "manual-clone", freq: "Manual", auto: "No auto-delete", color: "bg-amber-100 text-amber-700" },
          ].map((b) => (
            <div key={b.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Archive className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{b.name}</p>
                  <p className="text-[10px] text-ink-400">{b.auto}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${b.color}`}>{b.freq}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">7-day retention floor recommended</p>
      </div>
    );
  }

  if (type === "appbackup") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Database className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">App Backups — laravel-shop</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "Full Backup", scope: "Code + Database", color: "bg-emerald-100 text-emerald-700" },
            { name: "Code Only", scope: "App root zip", color: "bg-blue-100 text-blue-700" },
            { name: "Database Only", scope: "SQL dump", color: "bg-amber-100 text-amber-700" },
          ].map((b) => (
            <div key={b.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <FileArchive className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{b.name}</p>
                  <p className="text-[10px] text-ink-400">{b.scope}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${b.color}`}>Ready</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-brand-600" />
          <span className="text-xs font-medium text-brand-700">Safety backup taken before restore</span>
        </div>
      </div>
    );
  }

  // restore
  return (
    <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg">
      <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono text-xs text-ink-400">restore: full-server-backup</span>
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed">
        <p className="text-amber-400">$ restore --backup daily-full-0820</p>
        <p className="text-ink-400">Taking safety backup before overwrite...</p>
        <p className="text-emerald-400">✓ Safety backup saved</p>
        <p className="text-ink-400">Downloading from offsite storage...</p>
        <p className="text-emerald-400">✓ 2.4 GB downloaded</p>
        <p className="text-ink-400">Restoring files and database...</p>
        <p className="text-emerald-400">✓ Restore complete — 3m 42s</p>
        <p className="mt-2 text-emerald-400">$ <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" /></p>
      </div>
    </div>
  );
}

export default function BackupsPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Backups & Recovery — 7 Backup Types for Every Scenario"
        description="Seven purpose-built backup types: auto backups, snapshots, server images, custom path backups, portable backups, full server backups, and cloning. Free local backups. Offsite storage at $0.04 per GB."
        path="/features/backups"
        keywords={["server backup", "VPS backup", "backup types", "offsite backup", "snapshot", "server image", "portable backup", "disaster recovery"]}
        faqSchema={[
          { q: "How many backup types does SharkCluster offer?", a: "SharkCluster offers seven backup types: auto backups, snapshots, server images, custom path backups, portable backups, full server backups, and cloning. Each solves a different failure scenario." },
          { q: "Are backups free on SharkCluster?", a: "Yes, local backups are free. Offsite backup storage to object storage is available at $0.04 per GB, and is the only type that survives server loss." },
          { q: "What is a portable backup?", a: "A portable backup stores your server in a movable format designed to leave the provider. It's for migrating to another provider or building a new server elsewhere." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Backups & Recovery", path: "/features/backups" },
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
                <RefreshCw className="h-4 w-4" />
                Backups & Recovery
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Seven backup types <br />
                <span className="gradient-text">for every failure scenario</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Not seven ways to do the same thing — seven purpose-built mechanisms, each answering a different
                failure scenario. Free local backups included. Offsite storage available at $0.04 per GB.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Protect Your Servers
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="storage" />
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

      {/* Backup types grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Archive className="h-4 w-4" />
              Backup Types
            </span>
            <h2 className="mt-5 heading-lg">Seven mechanisms, seven scenarios</h2>
            <p className="mt-4 text-body">
              Each backup type captures different data, lives in a different place, and recovers you from a different
              kind of failure. Understanding which to use when is the difference between a 5-minute recovery and a
              lost weekend.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {backupTypes.map((method, i) => (
              <div
                key={method.title}
                className={`reveal ${visible ? "is-visible" : ""} group relative flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <method.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{method.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{method.desc}</p>
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

      {/* Pricing and next steps */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <HardDrive className="h-3.5 w-3.5" />
                  Storage that scales with you
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Backup storage, priced simply</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Local backups are free and stored on your server. Offsite backups are uploaded to object storage at
                  $0.04 per GB — and the local copy is deleted after upload, so an offsite backup exists in exactly
                  one place. This is the only backup type that survives server loss.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Free local backups", "$0.04/GB offsite", "Auto-delete by retention"].map((point) => (
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
                    <Cloud className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Offsite usage</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">120 GB stored</span>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-700">50 GB used</span>
                  <span className="text-ink-500">70 GB remaining</span>
                </div>
                <div className="mt-5 space-y-2.5 border-t border-ink-100 pt-4">
                  <div className="flex items-center justify-between text-xs"><span className="text-ink-500">Local backups</span><span className="font-semibold text-emerald-600">Free</span></div>
                  <div className="flex items-center justify-between text-xs"><span className="text-ink-500">Offsite rate</span><span className="font-semibold text-ink-800">$0.04/GB</span></div>
                  <div className="flex items-center justify-between text-xs"><span className="text-ink-500">Monthly estimate</span><span className="font-bold text-brand-700">$4.80/mo</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Layers className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your backups</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair backups with the tools that keep your applications fast, secure, and resilient.</p>
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
