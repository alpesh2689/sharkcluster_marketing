import { Link } from "react-router-dom";
import {
  Network, Server, Shield, Activity, RefreshCw, Clock, Terminal, Boxes,
  ArrowRight, Check, ChevronRight, Calendar, AppWindow, AlertTriangle,
  Play, Pause, Settings,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const cronjobFeatures = [
  { icon: Server, title: "Server Cronjobs", desc: "Whole server scope — housekeeping and cross-app tasks" },
  { icon: AppWindow, title: "Application Cronjobs", desc: "One app scope — defaults to app root, migrates with the app" },
  { icon: Terminal, title: "Three Command Types", desc: "Shell, Python, and Custom commands" },
  { icon: Calendar, title: "Flexible Scheduling", desc: "Basic presets or advanced cron expressions" },
];

const featureRows = [
  {
    icon: Calendar,
    tag: "Scheduling",
    title: "Flexible scheduling — basic or advanced",
    desc: "Choose from basic presets or use advanced cron fields for exact timing a preset can't express. Pre-save validation blocks jobs that wouldn't run.",
    points: [
      "Basic presets: Every Hour, Day, Week, Month",
      "Advanced: raw cron fields (minute, hour, month, weekday)",
      "Job Name, Type, Command, Schedule, Working Directory",
      "Pre-save validation — blocks missing fields and invalid schedules",
    ],
    mock: "schedule",
    reverse: false,
  },
  {
    icon: AppWindow,
    tag: "App-Level",
    title: "Application cronjobs that migrate with the app",
    desc: "Application-level jobs default their working directory to the app root and migrate/clone with that application automatically. Put a job on the application it belongs to — it migrates with the app.",
    points: [
      "Application Cronjob — one app scope, defaults to app root",
      "Working directory defaults to app root",
      "Migrates and clones with the application automatically",
      "Server Cronjob — whole server scope, set working directory explicitly",
    ],
    mock: "appcron",
    reverse: true,
  },
  {
    icon: Activity,
    tag: "Monitoring",
    title: "Lifecycle & monitoring — no silent failures",
    desc: "Start/Stop without deleting the definition — useful for suspending a suspect job. Failures roll up into Monitoring → Cron Job Failures, because cron is silent by nature.",
    points: [
      "Status: Active, Stopped, Unknown",
      "Start/Stop toggle without deleting the definition",
      "Search by job name, bulk actions with guards",
      "Failures roll up to the Monitoring dashboard",
    ],
    mock: "lifecycle",
    reverse: false,
  },
  {
    icon: Terminal,
    tag: "Guidance",
    title: "Built-in operational guidance",
    desc: "The panel surfaces the most common cron pitfalls directly: use absolute paths (cron runs with a minimal environment), set Working Directory explicitly, redirect output, and stagger heavy jobs.",
    points: [
      "Use absolute paths — no PATH, no aliases under cron",
      "Set Working Directory when relative paths are involved",
      "Redirect output so failures leave a trace",
      "Stagger heavy jobs so they don't compete for disk/CPU",
    ],
    mock: "guidance",
    reverse: true,
  },
];

const stats = [
  { value: "2", label: "Scopes (server & app)" },
  { value: "3", label: "Command types (Shell, Python, Custom)" },
  { value: "2", label: "Schedule modes (Basic & Advanced)" },
  { value: "0", label: "Silent failures" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Health Alerts & Monitoring", path: "/features/monitoring", icon: Activity },
  { title: "Backups & Recovery", path: "/features/backups", icon: RefreshCw },
  { title: "Other Services", path: "/features/other-services", icon: Boxes },
];

function MockPanel({ type }: { type: string }) {
  if (type === "cron") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Clock className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">New Cronjob</span>
          </div>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">Create</span>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-ink-500">Job Name</p>
            <div className="mt-1 rounded-lg border border-ink-200 bg-ink-50/50 px-3 py-2 text-sm text-ink-800">nightly-backup</div>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink-500">Type</p>
            <div className="mt-1 flex gap-2">
              {[
                { label: "Shell", active: true },
                { label: "Python", active: false },
                { label: "Custom", active: false },
              ].map((t) => (
                <span
                  key={t.label}
                  className={`flex-1 rounded-lg border px-3 py-1.5 text-center text-xs font-semibold ${
                    t.active
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-ink-200 bg-white text-ink-500"
                  }`}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink-500">Command</p>
            <div className="mt-1 rounded-lg border border-ink-200 bg-ink-900 px-3 py-2 font-mono text-xs text-emerald-400">
              /usr/local/bin/backup.sh --full
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink-500">Schedule</p>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50/50 px-3 py-2">
              <Calendar className="h-3.5 w-3.5 text-brand-600" />
              <span className="text-sm font-semibold text-ink-800">Every Day · 02:00</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "schedule") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Schedule</span>
        </div>
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-ink-500">Basic Presets</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Every Hour", active: false },
              { label: "Every Day", active: true },
              { label: "Every Week", active: false },
              { label: "Every Month", active: false },
            ].map((p) => (
              <div
                key={p.label}
                className={`rounded-lg border px-3 py-2 text-center text-xs font-semibold ${
                  p.active
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-ink-200 bg-white text-ink-500"
                }`}
              >
                {p.label}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-ink-500">Advanced — Cron Fields</p>
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { f: "Min", v: "0" },
              { f: "Hour", v: "2" },
              { f: "Day", v: "*" },
              { f: "Mon", v: "*" },
              { f: "Wk", v: "*" },
            ].map((c) => (
              <div key={c.f} className="rounded-lg border border-ink-200 bg-ink-50/50 p-2 text-center">
                <p className="text-[10px] font-semibold uppercase text-ink-400">{c.f}</p>
                <p className="font-mono text-sm font-bold text-ink-900">{c.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="font-mono text-xs font-medium text-emerald-700">0 2 * * * — valid schedule</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "appcron") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <AppWindow className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Application Cronjobs</span>
        </div>
        <div className="space-y-2">
          {[
            { app: "api-gateway", dir: "/var/www/api", status: "Active", color: "bg-emerald-100 text-emerald-700" },
            { app: "web-frontend", dir: "/var/www/web", status: "Active", color: "bg-emerald-100 text-emerald-700" },
            { app: "worker-queue", dir: "/var/www/worker", status: "Stopped", color: "bg-ink-200 text-ink-600" },
            { app: "analytics", dir: "/var/www/analytics", status: "Active", color: "bg-emerald-100 text-emerald-700" },
          ].map((job) => (
            <div key={job.app} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <AppWindow className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{job.app}</p>
                  <p className="font-mono text-[10px] text-ink-400">{job.dir}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${job.color}`}>{job.status}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Working directory defaults to app root · migrates with app</p>
      </div>
    );
  }

  if (type === "lifecycle") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Cronjob Lifecycle</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "nightly-backup", status: "Active", icon: Play, color: "text-emerald-600", bg: "bg-emerald-50" },
            { name: "log-rotate", status: "Active", icon: Play, color: "text-emerald-600", bg: "bg-emerald-50" },
            { name: "db-cleanup", status: "Stopped", icon: Pause, color: "text-ink-500", bg: "bg-ink-100" },
          ].map((job) => (
            <div key={job.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${job.bg} ${job.color}`}>
                  <job.icon className="h-3.5 w-3.5" />
                </span>
                <p className="text-sm font-semibold text-ink-900">{job.name}</p>
              </div>
              <span className={`text-xs font-bold uppercase ${job.color}`}>{job.status}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-600" />
          <div>
            <p className="text-xs font-bold text-red-700">Cron Job Failures</p>
            <p className="text-[10px] text-red-600">db-cleanup failed 3× — rolled up to Monitoring</p>
          </div>
        </div>
      </div>
    );
  }

  // guidance — terminal style
  return (
    <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg">
      <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono text-xs text-ink-400">cron — common pitfalls</span>
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed">
        <p className="text-amber-400"># Pitfall: relative paths</p>
        <p className="text-ink-400">$ ./backup.sh</p>
        <p className="text-red-400">→ not found — cron has no PATH</p>
        <p className="mt-2 text-emerald-400"># Fix: absolute paths</p>
        <p className="text-ink-300">/usr/local/bin/backup.sh</p>
        <p className="mt-2 text-amber-400"># Pitfall: silent failures</p>
        <p className="text-ink-400">$ /usr/local/bin/backup.sh</p>
        <p className="text-red-400">→ no output, no trace</p>
        <p className="mt-2 text-emerald-400"># Fix: redirect output</p>
        <p className="text-ink-300">/usr/local/bin/backup.sh &gt;&gt; /var/log/backup.log 2&gt;&amp;1</p>
        <p className="mt-2 text-emerald-400">$ <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" /></p>
      </div>
    </div>
  );
}

export default function CronjobsPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Cronjob Scheduling — Server & Application-Level Scheduled Tasks"
        description="Server-level and application-level scheduled tasks with basic presets or advanced cron expressions. Shell, Python, and custom command support. Failures roll up to monitoring."
        path="/features/cronjobs"
        keywords={["cronjob scheduling", "cron jobs", "scheduled tasks", "server automation", "task scheduling", "crontab management"]}
        faqSchema={[
          { q: "What types of cronjobs can I create on SharkCluster?", a: "SharkCluster supports Shell, Python, and Custom command types for both server-level and application-level scheduled tasks, with basic presets or advanced cron expressions." },
          { q: "What is the difference between server and application cronjobs?", a: "Server cronjobs run at the whole-server scope for housekeeping and cross-app tasks. Application cronjobs run at the app scope with the working directory defaulting to app root, and they migrate/clone with that application automatically." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Cronjobs", path: "/features/cronjobs" },
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
                <Clock className="h-4 w-4" />
                Cronjobs
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Scheduled tasks <br />
                <span className="gradient-text">at server and app level</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Server-level and application-level scheduling for shell, Python, and custom commands. Basic
                presets or advanced cron expressions. Failures roll up to monitoring — cron's silent failures
                are surfaced.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Schedule a Task
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="cron" />
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

      {/* Cronjob features grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Clock className="h-4 w-4" />
              Scheduling
            </span>
            <h2 className="mt-5 heading-lg">Two scopes, same form</h2>
            <p className="mt-4 text-body">
              Server-level jobs handle housekeeping and cross-app tasks. Application-level jobs default their
              working directory to the app root and migrate/clone with that application automatically.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cronjobFeatures.map((feature, i) => (
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

      {/* Highlight section — cron pitfalls */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Cron Pitfalls
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Cron is silent — we surface the failures</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Cron runs with a minimal environment — no PATH, no aliases, no shell profile. The panel
                  surfaces the most common pitfalls directly, so you don't discover them at 3am when a job
                  silently stops running.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Absolute paths — cron has no PATH or aliases", "Redirect output so failures leave a trace", "Stagger heavy jobs to avoid resource contention"].map((point) => (
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
                    <Settings className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Common Pitfalls</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Top mistakes</span>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { mistake: "Relative paths", fix: "Use absolute paths" },
                    { mistake: "No output redirect", fix: "Redirect to log file" },
                    { mistake: "Jobs overlap", fix: "Stagger heavy jobs" },
                    { mistake: "Missing env vars", fix: "Set in command directly" },
                  ].map((p) => (
                    <div key={p.mistake} className="flex items-center justify-between text-xs">
                      <span className="text-red-600 line-through">{p.mistake}</span>
                      <span className="font-semibold text-emerald-700">{p.fix}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Network className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your cronjobs</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair cronjob scheduling with the tools that keep your applications fast, secure, and resilient.</p>
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
