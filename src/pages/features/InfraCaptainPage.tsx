import { Link } from "react-router-dom";
import { Radar, Server, Activity, ArrowRight, Check, ChevronRight, Users, Monitor, ToggleRight, ExternalLink, ShieldCheck, Cpu, HardDrive, Network, TriangleAlert as AlertTriangle, Bell, Gauge, Lock, Layers, Zap } from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "1", label: "Toggle to connect" },
  { value: "0", label: "Agents to install" },
  { value: "2", label: "Separate permissions" },
  { value: "1", label: "Login — not two" },
];

const featureRows = [
  {
    icon: ToggleRight,
    tag: "Connection",
    title: "Enable at creation, or connect later",
    desc: "InfraCaptain appears as an add-on in the server creation flow, and any existing server can be connected from its InfraCaptain tab afterwards. The panel handles provisioning the connection; you see a live connected/inactive status.",
    points: [
      "Enable during server creation — one toggle",
      "Or connect an existing server from its InfraCaptain tab",
      "Live connected/inactive status shown in the panel",
      "No agent to install by hand",
    ],
    mock: "connection",
    reverse: false,
  },
  {
    icon: ExternalLink,
    tag: "Access",
    title: "One dashboard, opened from the panel",
    desc: "The server's InfraCaptain view opens directly from SharkCluster with your session carried across, so you are not logging in twice. No second set of credentials to manage or store.",
    points: [
      "Session carried across — no second login",
      "Opens directly from the server's InfraCaptain tab",
      "No second set of credentials to manage",
      "Deep links back to SharkCluster for server actions",
    ],
    mock: "access",
    reverse: true,
  },
  {
    icon: ShieldCheck,
    tag: "Permissions",
    title: "Gated by its own permissions",
    desc: "Install and configure are two separate team permissions. A team member can be allowed to see connection status without being allowed to change the integration, and neither implies access to anything else on the server.",
    points: [
      "Install and configure are separate permissions",
      "View status without allowing changes",
      "Neither permission grants access to anything else on the server",
      "Granular per-team-member control",
    ],
    mock: "permissions",
    reverse: false,
    link: { to: "/features/teams", label: "See how team permissions work" },
  },
  {
    icon: Activity,
    tag: "When to use it",
    title: "When you actually need it",
    desc: "SharkCluster's built-in monitoring covers CPU, memory, disk, network and uptime alerts, and for most single-server setups that is enough. InfraCaptain is for teams that want deeper infrastructure analysis across a fleet.",
    points: [
      "Built-in monitoring covers CPU, memory, disk, network, uptime",
      "Enough for most single-server setups",
      "InfraCaptain is for deeper analysis across a fleet",
      "Use both — built-in alerts fire regardless of InfraCaptain",
    ],
    mock: "fleet",
    reverse: true,
    link: { to: "/features/monitoring", label: "See built-in monitoring" },
  },
];

const comparison = [
  { feature: "CPU, memory, disk graphs", builtin: true, infracaptain: true },
  { feature: "Uptime pings", builtin: true, infracaptain: true },
  { feature: "Threshold-based alerts", builtin: true, infracaptain: true },
  { feature: "Email + in-app notifications", builtin: true, infracaptain: true },
  { feature: "Cross-server fleet analysis", builtin: false, infracaptain: true },
  { feature: "Historical trend correlation", builtin: false, infracaptain: true },
  { feature: "Custom dashboards & views", builtin: false, infracaptain: true },
  { feature: "No extra cost", builtin: true, infracaptain: false },
];

const relatedFeatures = [
  { title: "Monitoring", path: "/features/monitoring", icon: Activity },
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Teams", path: "/features/teams", icon: Users },
  { title: "Firewall & Security", path: "/features/firewall", icon: ShieldCheck },
];

function MockPanel({ type }: { type: string }) {
  if (type === "hero") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Radar className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">InfraCaptain</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
            <Check className="h-3 w-3" />
            Connected
          </span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-semibold text-ink-500">Server</span>
            <span className="font-mono text-xs font-semibold text-ink-900">prod-web-01</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-semibold text-ink-500">Status</span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-semibold text-ink-500">Connection</span>
            <span className="text-xs font-semibold text-ink-900">Provisioned by panel</span>
          </div>
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2.5 text-xs font-bold text-brand-700 transition-colors hover:bg-brand-100">
          <ExternalLink className="h-3.5 w-3.5" />
          Open in InfraCaptain
        </button>
      </div>
    );
  }

  if (type === "connection") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <ToggleRight className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Server Creation</span>
          </div>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">Step 4 of 5</span>
        </div>
        <div className="space-y-3">
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase text-ink-400">Server name</p>
            <p className="mt-0.5 font-mono text-xs font-semibold text-ink-900">prod-web-01</p>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase text-ink-400">Provider</p>
            <p className="mt-0.5 text-xs font-semibold text-ink-900">DigitalOcean · 4 vCPU · 8GB</p>
          </div>
          <div className="flex items-center justify-between rounded-lg border-2 border-brand-500 bg-brand-50 px-3 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                <Radar className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink-900">InfraCaptain</p>
                <p className="text-[10px] text-ink-500">Fleet monitoring & analysis</p>
              </div>
            </div>
            <div className="flex h-6 w-11 items-center justify-end rounded-full bg-brand-500 px-0.5">
              <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">Connection will be provisioned automatically</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "access") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <ExternalLink className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">InfraCaptain Tab</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
            <Check className="h-3 w-3" />
            Session active
          </span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Server className="h-3.5 w-3.5 text-ink-400" />
              <span className="text-xs font-semibold text-ink-900">prod-web-01</span>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Connected</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Server className="h-3.5 w-3.5 text-ink-400" />
              <span className="text-xs font-semibold text-ink-900">db-primary</span>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Connected</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Server className="h-3.5 w-3.5 text-ink-400" />
              <span className="text-xs font-semibold text-ink-900">staging-api</span>
            </div>
            <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-bold text-ink-500">Inactive</span>
          </div>
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-600">
          <ExternalLink className="h-3.5 w-3.5" />
          Open Dashboard — no second login
        </button>
      </div>
    );
  }

  if (type === "permissions") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Lock className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Team Permissions</span>
          </div>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">InfraCaptain</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "Alice (Admin)", install: true, config: true, color: "bg-emerald-100 text-emerald-700" },
            { name: "Bob (DevOps)", install: true, config: false, color: "bg-amber-100 text-amber-700" },
            { name: "Carol (Developer)", install: false, config: false, color: "bg-ink-100 text-ink-500" },
          ].map((m) => (
            <div key={m.name} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700">
                    {m.name.charAt(0)}
                  </span>
                  <span className="text-xs font-semibold text-ink-900">{m.name}</span>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${m.color}`}>
                  {m.install && m.config ? "Full" : m.install ? "Install only" : "View only"}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-[10px]">
                <span className={`flex items-center gap-1 ${m.install ? "text-emerald-600" : "text-ink-400"}`}>
                  <Check className="h-3 w-3" /> Install
                </span>
                <span className={`flex items-center gap-1 ${m.config ? "text-emerald-600" : "text-ink-400"}`}>
                  <Check className="h-3 w-3" /> Configure
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-[10px] font-medium text-blue-700">Neither permission grants server access</span>
        </div>
      </div>
    );
  }

  // fleet
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Radar className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Fleet Overview</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">4 servers</span>
      </div>
      <div className="space-y-2.5">
        {[
          { name: "prod-web-01", cpu: 34, mem: 62, status: "Healthy", color: "bg-emerald-500", statusColor: "bg-emerald-100 text-emerald-700" },
          { name: "prod-web-02", cpu: 78, mem: 71, status: "Warning", color: "bg-amber-500", statusColor: "bg-amber-100 text-amber-700" },
          { name: "db-primary", cpu: 45, mem: 88, status: "Warning", color: "bg-amber-500", statusColor: "bg-amber-100 text-amber-700" },
          { name: "staging-api", cpu: 12, mem: 28, status: "Healthy", color: "bg-emerald-500", statusColor: "bg-emerald-100 text-emerald-700" },
        ].map((s) => (
          <div key={s.name} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-3.5 w-3.5 text-ink-400" />
                <span className="font-mono text-xs font-semibold text-ink-900">{s.name}</span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${s.statusColor}`}>{s.status}</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between text-[10px] text-ink-400">
                  <span>CPU</span><span className="font-bold text-ink-600">{s.cpu}%</span>
                </div>
                <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-ink-200">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.cpu}%` }} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-[10px] text-ink-400">
                  <span>Mem</span><span className="font-bold text-ink-600">{s.mem}%</span>
                </div>
                <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-ink-200">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.mem}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Cross-server analysis — spot patterns across the fleet</p>
    </div>
  );
}

export default function InfraCaptainPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="InfraCaptain Integration — Deeper Infrastructure Insight"
        description="Connect SharkCluster to InfraCaptain for deeper infrastructure analysis across a fleet. Enable at server creation or connect an existing server — no agent to install, no second login."
        path="/features/infracaptain"
        keywords={["InfraCaptain", "infrastructure monitoring", "fleet monitoring", "server monitoring integration", "infrastructure analysis"]}
        faqSchema={[
          { q: "What is InfraCaptain?", a: "InfraCaptain is an infrastructure monitoring and management platform that SharkCluster connects to directly. You enable it when you create a server, or connect an existing server from its InfraCaptain tab." },
          { q: "Do I need to install an agent?", a: "No. The panel handles provisioning the connection. You see a live connected or inactive status in SharkCluster." },
          { q: "Do I need separate InfraCaptain credentials?", a: "No. Your session is carried across from SharkCluster, so you are not logging in twice." },
          { q: "Who can install or configure InfraCaptain?", a: "Install and configure are two separate team permissions. A team member can see connection status without being allowed to change the integration, and neither implies access to anything else on the server." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "InfraCaptain", path: "/features/infracaptain" },
        ]}
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
                <Radar className="h-4 w-4" />
                InfraCaptain Integration
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Deeper infrastructure insight, <br />
                <span className="gradient-text">one toggle away</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                InfraCaptain is an infrastructure monitoring and management platform SharkCluster connects to directly.
                Enable it when you create a server, or connect an existing one from its detail page — no agent to
                install by hand, no second set of credentials to manage.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Connect InfraCaptain
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/features/monitoring" className="btn-secondary btn-lg w-full sm:w-auto">
                  See Built-in Monitoring
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="hero" />
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

      {/* Alternating feature rows with mockups */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Radar className="h-4 w-4" />
              How it works
            </span>
            <h2 className="mt-5 heading-lg">Connected, not bolted on</h2>
            <p className="mt-4 text-body">
              InfraCaptain is not a logo on a page. The panel provisions the connection, carries your session across,
              and gates every action behind its own permissions.
            </p>
          </div>
        </div>
      </section>

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
                {row.link && (
                  <Link
                    to={row.link.to}
                    className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                  >
                    {row.link.label}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                )}
              </div>
              <div className={`relative ${row.reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/20 to-blue-200/10 blur-2xl" />
                <MockPanel type={row.mock} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison section — built-in vs InfraCaptain */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Layers className="h-4 w-4" />
              Built-in vs InfraCaptain
            </span>
            <h2 className="mt-5 heading-lg">Which one do you need?</h2>
            <p className="mt-4 text-body">
              SharkCluster's built-in monitoring is enough for most single-server setups. InfraCaptain adds
              cross-server fleet analysis, historical trend correlation, and custom dashboards. Use both —
              built-in alerts fire regardless.
            </p>
          </div>

          <div className={`reveal ${visible ? "is-visible" : ""} mt-10 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50/50">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">Capability</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-brand-600">Built-in</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">InfraCaptain</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 1 ? "bg-ink-50/30" : ""}>
                      <td className="px-5 py-4 text-sm font-semibold text-ink-700">{row.feature}</td>
                      <td className="px-5 py-4">
                        {row.builtin ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="text-ink-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {row.infracaptain ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="text-ink-300">Add-on</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Related features */}
      <section className="section pt-0">
        <div className="container-px">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Monitor className="h-4 w-4" /> Related features</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Pair it with the rest</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                InfraCaptain sits alongside the tools that keep your servers observable and your team in control.
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
