import { Link } from "react-router-dom";
import {
  Radar, Server, Activity, ArrowRight, Check, ChevronRight,
  Users, Monitor, ToggleRight, ExternalLink, ShieldCheck,
  Lock, Layers, Brain, Shield, FileLock, Clock, Cpu, AlertTriangle,
  Sparkles, MessageSquare, TrendingUp, Zap,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "47", label: "Signals checked per minute" },
  { value: "<0.1%", label: "Agent CPU overhead" },
  { value: "60s", label: "From zero to monitored" },
  { value: "1", label: "Toggle to connect" },
];

const featureRows = [
  {
    icon: Brain,
    tag: "Captain AI",
    title: "AI that already knows your server",
    desc: "Generic AI makes you the context layer — you paste logs, explain your stack, and still get guesses. InfraCaptain's Captain AI already knows the patterns, state changes, and history of your server, so one question produces a real answer with server context attached.",
    points: [
      "Root cause identified in one message — not 25 minutes of back-and-forth",
      "Server context already attached: process state, history, config",
      "Ask in plain English, get answers grounded in your server's actual data",
      "No need to paste logs or explain your stack",
    ],
    mock: "ai",
    reverse: false,
  },
  {
    icon: Activity,
    tag: "Signal Detection",
    title: "Beyond uptime — silent failures caught early",
    desc: "Traditional uptime checks ask one question: are you alive? InfraCaptain keeps asking better questions and remembers the answers. It detects runaway processes, missed cron jobs, disk growth patterns, SSL hostname mismatches, and brute-force attempts before they become incidents.",
    points: [
      "Runaway process detection — flags jobs running 23 min when normal is 90s",
      "Missed cron alerts — knows when backup.sh last ran and when it stopped",
      "Disk growth projection — predicts fill date from current growth pattern",
      "SSL hostname mismatch and cert expiry warnings with lead time to fix",
    ],
    mock: "signals",
    reverse: true,
  },
  {
    icon: Shield,
    tag: "Security Monitoring",
    title: "Security that doesn't need a separate tool",
    desc: "InfraCaptain watches your server posture continuously — you don't have to remember to run scans at the worst possible moment. It detects SSH brute-force patterns, hidden processes, unauthorized port openings, and file integrity changes in real time.",
    points: [
      "Brute-force detection — 12 failed SSH attempts in 5 minutes from one IP",
      "Hidden process alerts — processes starting with a dot, a common malware tactic",
      "File integrity monitoring — SHA-256 hash comparison on /etc/passwd, SSH keys, configs",
      "AI security scoring with prioritized fix lists for your exact configuration",
    ],
    mock: "security",
    reverse: false,
  },
  {
    icon: ToggleRight,
    tag: "Integration",
    title: "Connected through SharkCluster, not bolted on",
    desc: "InfraCaptain appears as an add-on in the server creation flow, and any existing server can be connected from its InfraCaptain tab. The panel provisions the connection and carries your session across — no second login, no separate credentials, no agent to install by hand.",
    points: [
      "Enable during server creation — one toggle",
      "Or connect an existing server from its InfraCaptain tab",
      "Session carried across — no second login or credential set",
      "Install and configure are separate team permissions",
    ],
    mock: "connection",
    reverse: true,
    link: { to: "/features/teams", label: "See how team permissions work" },
  },
];

const comparison = [
  { feature: "CPU, memory, disk graphs", builtin: true, infracaptain: true },
  { feature: "Uptime pings", builtin: true, infracaptain: true },
  { feature: "Threshold-based alerts", builtin: true, infracaptain: true },
  { feature: "Email + in-app notifications", builtin: true, infracaptain: true },
  { feature: "AI root-cause analysis (Captain AI)", builtin: false, infracaptain: true },
  { feature: "47 signals checked per minute", builtin: false, infracaptain: true },
  { feature: "Security monitoring (brute force, file integrity)", builtin: false, infracaptain: true },
  { feature: "SSL certificate & hostname monitoring", builtin: false, infracaptain: true },
  { feature: "Missed cron & runaway process detection", builtin: false, infracaptain: true },
  { feature: "Cross-server fleet analysis", builtin: false, infracaptain: true },
  { feature: "AI security scoring with fix lists", builtin: false, infracaptain: true },
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
            <span className="text-xs font-semibold text-ink-500">Signals</span>
            <span className="text-xs font-bold text-brand-600">47 / min</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className="text-xs font-semibold text-ink-500">Status</span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2.5 text-xs font-bold text-brand-700 transition-colors hover:bg-brand-100">
          <ExternalLink className="h-3.5 w-3.5" />
          Open in InfraCaptain
        </button>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Brain className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Captain AI</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">
            <Sparkles className="h-3 w-3" />
            Context attached
          </span>
        </div>
        <div className="space-y-3">
          <div className="rounded-lg rounded-br-sm border border-ink-200 bg-ink-50/50 px-3 py-2.5">
            <p className="text-xs text-ink-600">Why did disk usage spike on prod-web-01 last night?</p>
          </div>
          <div className="rounded-lg rounded-bl-sm border border-brand-200 bg-brand-50 px-3 py-2.5">
            <p className="text-xs font-medium leading-relaxed text-ink-700">
              Log rotation broke on Apr 9 — nginx access logs accumulated 4.2GB over 3 days. The logrotate config
              references a path that no longer exists after the last deploy. I've attached the relevant config diff
              and the specific process writing temp files.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-medium text-emerald-700">Root cause identified in one message</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-ink-100 bg-ink-50/30 px-3 py-2">
          <MessageSquare className="h-3.5 w-3.5 text-ink-400" />
          <span className="text-[10px] text-ink-400">Ask anything — it already knows your server</span>
        </div>
      </div>
    );
  }

  if (type === "signals") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Activity className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Live Signals</span>
          </div>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">2 flagged</span>
        </div>
        <div className="space-y-2.5">
          {[
            { icon: AlertTriangle, label: "job_processor.py", detail: "Running 23 min. Normal is 90s. Runaway process.", color: "border-amber-200 bg-amber-50/50", iconColor: "text-amber-600" },
            { icon: Clock, label: "backup.sh cron", detail: "Missed Apr 10, 11, 12. Last good run: Apr 9.", color: "border-red-200 bg-red-50/50", iconColor: "text-red-600" },
            { icon: Cpu, label: "Disk · /", detail: "60.4% used. Projected fill date: Apr 24.", color: "border-amber-200 bg-amber-50/50", iconColor: "text-amber-600" },
            { icon: ShieldCheck, label: "MongoDB", detail: "Running normally. Expected port exposure.", color: "border-emerald-200 bg-emerald-50/50", iconColor: "text-emerald-600" },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg border px-3 py-2.5 ${s.color}`}>
              <div className="flex items-center gap-2">
                <s.icon className={`h-3.5 w-3.5 shrink-0 ${s.iconColor}`} />
                <span className="font-mono text-xs font-semibold text-ink-900">{s.label}</span>
              </div>
              <p className="mt-1 pl-5 text-[10px] leading-relaxed text-ink-500">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "security") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Shield className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Security Score</span>
          </div>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">B+ · 78</span>
        </div>
        <div className="space-y-2.5">
          {[
            { icon: Shield, label: "SSH brute-force", detail: "12 failed attempts in 5 min from 1 IP", color: "border-red-200 bg-red-50/50", iconColor: "text-red-600" },
            { icon: AlertTriangle, label: "Hidden process", detail: ".cache/.sysupd — process started with dot prefix", color: "border-red-200 bg-red-50/50", iconColor: "text-red-600" },
            { icon: FileLock, label: "File integrity", detail: "/etc/passwd unchanged · SSH keys unchanged", color: "border-emerald-200 bg-emerald-50/50", iconColor: "text-emerald-600" },
            { icon: Lock, label: "SSL · devr.scholar9.com", detail: "Hostname mismatch — visitors see browser warning", color: "border-amber-200 bg-amber-50/50", iconColor: "text-amber-600" },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg border px-3 py-2.5 ${s.color}`}>
              <div className="flex items-center gap-2">
                <s.icon className={`h-3.5 w-3.5 shrink-0 ${s.iconColor}`} />
                <span className="text-xs font-semibold text-ink-900">{s.label}</span>
              </div>
              <p className="mt-1 pl-5 text-[10px] leading-relaxed text-ink-500">{s.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2">
          <Brain className="h-3.5 w-3.5 text-brand-600" />
          <span className="text-[10px] font-medium text-brand-700">AI fix list: 3 prioritized actions for your config</span>
        </div>
      </div>
    );
  }

  // connection
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
              <p className="text-[10px] text-ink-500">47 signals · Captain AI · Security scoring</p>
            </div>
          </div>
          <div className="flex h-6 w-11 items-center justify-end rounded-full bg-brand-500 px-0.5">
            <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Connection provisioned — no agent to install</span>
        </div>
      </div>
    </div>
  );
}

export default function InfraCaptainPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="InfraCaptain Integration — AI-Powered Server Monitoring & Security"
        description="Connect SharkCluster to InfraCaptain for AI-powered infrastructure monitoring. Captain AI knows your server context, checks 47 signals per minute, detects silent failures, and monitors security — no agent to install, no second login."
        path="/features/infracaptain"
        keywords={["InfraCaptain", "infrastructure monitoring", "AI server monitoring", "fleet monitoring", "server security monitoring", "Captain AI", "infrastructure analysis", "silent failure detection"]}
        faqSchema={[
          { q: "What is InfraCaptain?", a: "InfraCaptain is a proactive infrastructure monitoring platform with AI-powered alerts. It checks 47 signals every minute, detects silent failures before they impact users, and includes Captain AI that already knows your server context so you get real answers in one message. SharkCluster connects to it directly — enable at server creation or connect an existing server from its InfraCaptain tab." },
          { q: "Do I need to install an agent?", a: "No. When you enable InfraCaptain through SharkCluster, the panel handles provisioning the connection. You see a live connected or inactive status in SharkCluster — no agent to install by hand." },
          { q: "Do I need separate InfraCaptain credentials?", a: "No. Your session is carried across from SharkCluster, so you are not logging in twice. No second set of credentials to manage." },
          { q: "What does InfraCaptain monitor that built-in monitoring doesn't?", a: "SharkCluster's built-in monitoring covers CPU, memory, disk, network, and uptime alerts. InfraCaptain adds 47 signals per minute, Captain AI for root-cause analysis, security monitoring (brute-force detection, file integrity, SSL monitoring), runaway process and missed cron detection, cross-server fleet analysis, and AI security scoring." },
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
                Your server is talking. <br />
                <span className="gradient-text">Is anyone listening?</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Every server emits signals every minute — memory trends, failed cron jobs, process changes, growing
                disks, SSL problems, and security warnings. InfraCaptain collects that context, understands it with
                Captain AI, and tells you what matters before your users feel the impact.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Connect InfraCaptain
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="https://infracaptain.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-lg w-full sm:w-auto"
                >
                  Visit InfraCaptain
                  <ExternalLink className="h-5 w-5" />
                </a>
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
              What InfraCaptain does
            </span>
            <h2 className="mt-5 heading-lg">More than uptime checks</h2>
            <p className="mt-4 text-body">
              Traditional monitoring asks "are you alive?" InfraCaptain keeps asking better questions — and remembers
              the answers. Captain AI already knows your server, so you get real answers, not guesses.
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
              SharkCluster's built-in monitoring covers the basics — CPU, memory, disk, network, and uptime alerts.
              InfraCaptain adds AI-powered analysis, 47 signals per minute, security monitoring, and cross-server
              fleet insight. Use both — built-in alerts fire regardless.
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

      {/* InfraCaptain link banner */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl`}>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 text-center sm:flex-row sm:text-left">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                <Radar className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-base font-bold text-ink-900">
                  Learn more about InfraCaptain
                </h3>
                <p className="mt-1 text-sm text-ink-600">
                  Visit the InfraCaptain website for full feature details, pricing, and documentation.
                </p>
              </div>
              <a
                href="https://infracaptain.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary whitespace-nowrap"
              >
                Visit Site
                <ExternalLink className="h-4 w-4" />
              </a>
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
