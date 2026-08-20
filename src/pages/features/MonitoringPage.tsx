import { Link } from "react-router-dom";
import {
  Activity, Server, Database, RefreshCw, Shield, AlertTriangle, Gauge,
  Cpu, ArrowRight, Check, Bell, Calendar, ChevronRight, HardDrive,
  TrendingUp, Clock, Monitor,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const monitoredMetrics = [
  { icon: Cpu, title: "CPU Usage", desc: "Default 90% — fires on sustained load above threshold" },
  { icon: HardDrive, title: "RAM Usage", desc: "Default 90% — Linux counts disk cache as used memory" },
  { icon: Database, title: "Disk Usage", desc: "Default 90%, recommended 80% — most valuable change you can make" },
  { icon: AlertTriangle, title: "Failed Services", desc: "Default 1 — intentionally strict, a single crash is worth knowing" },
];

const featureRows = [
  {
    icon: Activity,
    tag: "Uptime",
    title: "Application uptime monitoring",
    desc: "SharkCluster pings your application URL on your chosen interval. An alert is triggered after the configured number of consecutive failures. You receive an email and an in-app notification.",
    points: [
      "Check interval: 5, 10, 15, 30, or 60 minutes",
      "Failure threshold: 1st failure, 2 consecutive, or 3 consecutive",
      "Recovery notification — tells you when the site comes back up",
      "Repeat down-alerts suppressed for one hour to avoid spam",
      "Requires a primary domain to be set first",
    ],
    mock: "uptime",
    reverse: false,
  },
  {
    icon: Bell,
    tag: "Alerts",
    title: "Alert routing & triage",
    desc: "Alerts surface in multiple places: the Monitoring dashboard with graphs, the Failed Services panel, and the underlying CPU/memory/disk graphs. A built-in triage table tells you what to check when each metric fires.",
    points: [
      "Email and in-app bell notification",
      "Two-tier permissions: view thresholds vs manage thresholds",
      "Recent Alerts log with metric, value, threshold, severity, and time",
      "Value-vs-threshold shown side by side — near-miss vs real breach",
    ],
    mock: "alerts",
    reverse: true,
  },
  {
    icon: Gauge,
    tag: "Tuning",
    title: "Built-in tuning guidance",
    desc: "The panel doesn't just expose the threshold — it tells you what to set it to and why. Alert-fatigue guidance is included: don't set thresholds so low they fire constantly — an ignored alert is worse than no alert.",
    points: [
      "Disk at 80% — the single most valuable change on this page",
      "RAM alerts need interpretation — check swap, not raw percentage",
      "Failed-services threshold of 1 is intentionally strict",
      "Alert-fatigue guidance: don't set thresholds too low",
    ],
    mock: "tuning",
    reverse: false,
  },
  {
    icon: Calendar,
    tag: "Maintenance",
    title: "Provider maintenance notifications",
    desc: "Cloud providers schedule maintenance windows that can affect your servers — reboots, network blips, or temporary unavailability. The panel surfaces these scheduled events so you can plan around them rather than discovering them mid-incident.",
    points: [
      "Scheduled maintenance events surfaced in the panel",
      "Affected servers identified before the window",
      "Email and in-app notification ahead of time",
      "Planned vs unplanned events distinguished",
    ],
    mock: "maintenance",
    reverse: true,
  },
];

const stats = [
  { value: "4", label: "Monitored metrics" },
  { value: "5", label: "Check intervals" },
  { value: "1hr", label: "Alert suppression" },
  { value: "0", label: "Silent failures" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
  { title: "Backups & Recovery", path: "/features/backups", icon: RefreshCw },
  { title: "Caching", path: "/features/caching", icon: Cpu },
];

function MockPanel({ type }: { type: string }) {
  if (type === "alerts") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Bell className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Recent Alerts</span>
          </div>
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase text-red-700">2 active</span>
        </div>
        <div className="space-y-2.5">
          {[
            { metric: "Disk Usage", value: "92%", threshold: "80%", sev: "Critical", color: "bg-red-100 text-red-700", bar: "bg-red-500", w: "w-[92%]" },
            { metric: "CPU Usage", value: "94%", threshold: "90%", sev: "Warning", color: "bg-amber-100 text-amber-700", bar: "bg-amber-500", w: "w-[94%]" },
            { metric: "RAM Usage", value: "61%", threshold: "90%", sev: "OK", color: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500", w: "w-[61%]" },
          ].map((a) => (
            <div key={a.metric} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-700">{a.metric}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${a.color}`}>{a.sev}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[10px]">
                <span className="font-bold text-ink-900">{a.value}</span>
                <span className="text-ink-400">/ {a.threshold}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-200">
                <div className={`h-full rounded-full ${a.bar} ${a.w}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-ink-50 px-3 py-2">
          <Clock className="h-3.5 w-3.5 text-ink-400" />
          <span className="text-[10px] font-medium text-ink-500">Repeat down-alerts suppressed for 1 hour</span>
        </div>
      </div>
    );
  }

  if (type === "uptime") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Activity className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Uptime Monitor</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Up</span>
        </div>
        <div className="space-y-3">
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase text-ink-400">URL</p>
            <p className="mt-0.5 font-mono text-xs font-semibold text-ink-900">https://api.sharkcluster.com</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase text-ink-400">Interval</p>
              <p className="mt-0.5 text-sm font-bold text-ink-900">5 min</p>
            </div>
            <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase text-ink-400">Threshold</p>
              <p className="mt-0.5 text-sm font-bold text-ink-900">2 consecutive</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">Last check passed — 2 min ago</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "tuning") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Gauge className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Threshold Tuning</span>
        </div>
        <div className="space-y-4">
          {[
            { label: "Disk Usage", val: 80, max: 100, color: "bg-brand-500", note: "Recommended 80% — not 90%" },
            { label: "CPU Usage", val: 90, max: 100, color: "bg-amber-500", note: "Default 90%" },
            { label: "Failed Services", val: 1, max: 5, color: "bg-red-500", note: "Strict — 1 crash fires" },
          ].map((t) => (
            <div key={t.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink-700">{t.label}</span>
                <span className="font-bold text-ink-900">{t.val}{t.max === 100 ? "%" : ""}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
                <div className={`h-full rounded-full ${t.color}`} style={{ width: `${(t.val / t.max) * 100}%` }} />
              </div>
              <p className="mt-1 text-[10px] text-ink-400">{t.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
          <span className="text-[10px] font-medium leading-snug text-amber-700">Don't set thresholds too low — an ignored alert is worse than no alert.</span>
        </div>
      </div>
    );
  }

  // maintenance
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Calendar className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Scheduled Maintenance</span>
        </div>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">Planned</span>
      </div>
      <div className="space-y-2.5">
        {[
          { date: "Aug 24, 03:00 UTC", server: "prod-web-01", event: "Network maintenance", sev: "Planned", color: "bg-blue-100 text-blue-700" },
          { date: "Aug 26, 10:00 UTC", server: "db-primary", event: "Reboot window", sev: "Planned", color: "bg-blue-100 text-blue-700" },
          { date: "Aug 20, 14:32 UTC", server: "prod-web-02", event: "Unexpected reboot", sev: "Unplanned", color: "bg-amber-100 text-amber-700" },
        ].map((m) => (
          <div key={m.date} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-900">{m.event}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${m.color}`}>{m.sev}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-[10px] text-ink-500">
              <Server className="h-3 w-3" />
              <span className="font-mono">{m.server}</span>
              <span className="text-ink-300">·</span>
              <Clock className="h-3 w-3" />
              <span>{m.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MonitoringPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Health Alerts & Monitoring — Proactive Server Monitoring"
        description="Threshold-based alerting on CPU, memory, disk, and failed services. Uptime monitoring for applications. Configurable check intervals and failure thresholds. Nothing fails silently."
        path="/features/monitoring"
        keywords={["server monitoring", "health alerts", "uptime monitoring", "CPU monitoring", "disk usage alerts", "server health", "proactive monitoring"]}
        faqSchema={[
          { q: "What metrics does SharkCluster monitor?", a: "SharkCluster monitors CPU usage, RAM usage, disk usage, and failed services with configurable thresholds. Application-level uptime monitoring pings your URLs on your chosen interval." },
          { q: "How do health alerts work?", a: "Health alerts fire when a metric exceeds its configured threshold. You receive an email and in-app notification. Repeat down-alerts are suppressed for one hour to avoid spam." },
          { q: "What is the recommended disk usage threshold?", a: "SharkCluster recommends setting the disk threshold at 80%, not the 90% default. A full disk fails silently in ways that mimic unrelated bugs — broken uploads, stalled logs, database write refusals." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Monitoring", path: "/features/monitoring" },
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
                <Activity className="h-4 w-4" />
                Monitoring
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Proactive health alerts <br />
                <span className="gradient-text">before things break</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Threshold-based alerting on four server metrics — off by default, one toggle turns it on. Application
                uptime monitoring pings your URLs. Nothing fails silently.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Monitor Your Servers
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="alerts" />
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

      {/* Monitored metrics grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Gauge className="h-4 w-4" />
              Metrics
            </span>
            <h2 className="mt-5 heading-lg">Four metrics, four thresholds</h2>
            <p className="mt-4 text-body">
              Each metric has a configurable threshold with sensible defaults. The disk threshold is recommended at 80%
              — a full disk fails silently in ways that mimic unrelated bugs.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {monitoredMetrics.map((metric, i) => (
              <div
                key={metric.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex flex-col items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 4) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <metric.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{metric.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{metric.desc}</p>
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

      {/* Highlight section — Metrics history */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <TrendingUp className="h-3.5 w-3.5" />
                  History
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Metrics history that tells a story</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Historical graphs aren't just for the last hour. Metrics history is retained so you can look back at
                  trends — spot a slow memory leak, correlate a spike with a deploy, or confirm a problem is resolved
                  and not just quiet.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["CPU, memory, disk, and network history retained", "Selectable time windows for trend analysis", "Correlate spikes with deployments or maintenance"].map((point) => (
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
                    <TrendingUp className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Metrics History</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Last 24h</span>
                </div>
                <div className="mt-5 flex items-end justify-between gap-1.5 h-32">
                  {[
                    [40, 55, 48, 62, 58, 70, 65, 78, 72, 85, 80, 92],
                  ].flat().map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand-400 to-brand-600" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-700">CPU trend</span>
                  <span className="text-ink-500">Peak 92%</span>
                </div>
                <div className="mt-4 flex gap-2 border-t border-ink-100 pt-4">
                  {["1h", "6h", "24h", "7d", "30d"].map((w) => (
                    <span key={w} className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${w === "24h" ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-500"}`}>{w}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Activity className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your server</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair monitoring with the tools that keep your applications fast, secure, and resilient.</p>
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
