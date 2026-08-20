import { Link } from "react-router-dom";
import {
  Server, GitBranch, Database, RefreshCw, Terminal, Shield, Zap, Cloud,
  Layers, Activity, Gauge, ArrowRight, Check, Cpu, HardDrive,
  Network, Lock, ChevronRight, Monitor, TrendingUp, KeyRound,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const deploymentMethods = [
  { icon: Cloud, title: "Fresh Install", desc: "Choose frontend, backend, database & web server" },
  { icon: GitBranch, title: "Git Deploy", desc: "Clone & deploy from GitHub, GitLab, or Bitbucket" },
  { icon: HardDrive, title: "Upload ZIP", desc: "Upload existing source code directly" },
  { icon: Layers, title: "Custom Migration", desc: "Bring an existing site from another host" },
  { icon: Cpu, title: "Docker Host", desc: "Run containers with CPU, memory & registry config" },
  { icon: Terminal, title: "Blank Server", desc: "Configure everything manually" },
];

const featureRows = [
  {
    icon: Activity,
    tag: "Monitoring",
    title: "Live monitoring dashboard",
    desc: "Every server gets a real-time dashboard with resource graphs, service health panels, and system reports. Bandwidth is tracked against your plan allowance, and every panel is timestamped.",
    points: [
      "CPU, memory, disk & network graphs over selectable windows",
      "Service Health panel — running, failed, failed logins, last boot",
      "Bandwidth & monthly usage tracked against plan allowance",
      "System reports tied to Health Alert thresholds",
    ],
    mock: "dashboard",
    reverse: false,
  },
  {
    icon: TrendingUp,
    tag: "Scaling",
    title: "One-click scaling with cost preview",
    desc: "Resize your server when traffic grows. The current plan snapshot shows vCPU, memory, storage, bandwidth, and price. New pricing is shown before you commit, so you always know what you're paying.",
    points: [
      "Current plan snapshot with specs and price",
      "Resize options with new price shown before commit",
      "Scale-up and scale-down support (provider-dependent)",
    ],
    mock: "scaling",
    reverse: true,
  },
  {
    icon: KeyRound,
    tag: "Access",
    title: "SSH key management, built secure",
    desc: "Full SSH key lifecycle with security built in. Public keys are masked in the UI to prevent shoulder-surfing. Three independently-gated permissions let admins grant terminal access without granting key management.",
    points: [
      "Generate keypairs — private key shown once, copy immediately",
      "Upload existing public keys — private key never touches the panel",
      "Delete keys with confirmation — instantly revokes access",
      "Manageability states — Panel, Partially Manageable, Root",
    ],
    mock: "ssh",
    reverse: false,
  },
  {
    icon: Terminal,
    tag: "Terminal",
    title: "In-browser SSH terminal",
    desc: "A sandboxed shell in your browser — no local client needed. Sessions are scoped with expiring tokens rather than a permanently-open connection, and terminal access is gated separately from SSH key management.",
    points: [
      "No local SSH client required",
      "Session-scoped expiring tokens",
      "Separate permission from key management",
      "Works across every supported provider",
    ],
    mock: "terminal",
    reverse: true,
  },
];

const stats = [
  { value: "5", label: "Deployment methods" },
  { value: "4", label: "Live resource graphs" },
  { value: "3", label: "Independent access permissions" },
  { value: "1", label: "Panel for every provider" },
];

const relatedFeatures = [
  { title: "Backups & Recovery", path: "/features/backups", icon: RefreshCw },
  { title: "Git & Docker Deployment", path: "/features/deployment", icon: GitBranch },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
  { title: "Health Alerts & Monitoring", path: "/features/monitoring", icon: Activity },
];

function MockPanel({ type }: { type: string }) {
  if (type === "dashboard") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Monitor className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Server Health</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "CPU", val: "34%", color: "bg-brand-500", w: "w-[34%]" },
            { label: "Memory", val: "61%", color: "bg-blue-500", w: "w-[61%]" },
            { label: "Disk", val: "48%", color: "bg-emerald-500", w: "w-[48%]" },
            { label: "Network", val: "12%", color: "bg-amber-500", w: "w-[12%]" },
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
          <span className="text-xs font-medium text-emerald-700">All services running</span>
        </div>
      </div>
    );
  }

  if (type === "scaling") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Resize Server</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-ink-500">Current Plan</p>
              <p className="text-sm font-bold text-ink-900">2 vCPU · 4 GB · 80 GB</p>
            </div>
            <span className="text-sm font-bold text-ink-900">$24/mo</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border-2 border-brand-500 bg-brand-50 px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-brand-600">New Plan</p>
              <p className="text-sm font-bold text-ink-900">4 vCPU · 8 GB · 160 GB</p>
            </div>
            <span className="text-sm font-bold text-brand-700">$48/mo</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">+$24/mo — price shown before you commit</span>
        </div>
      </div>
    );
  }

  if (type === "ssh") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">SSH Keys</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "prod-deploy-key", perm: "Full access", color: "bg-emerald-100 text-emerald-700" },
            { name: "ci-pipeline", perm: "Deploy only", color: "bg-blue-100 text-blue-700" },
            { name: "dev-terminal", perm: "Console only", color: "bg-amber-100 text-amber-700" },
          ].map((key) => (
            <div key={key.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <KeyRound className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{key.name}</p>
                  <p className="font-mono text-[10px] text-ink-400">ssh-rsa AAAA••••••••••</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${key.color}`}>{key.perm}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Public keys masked to prevent shoulder-surfing</p>
      </div>
    );
  }

  // terminal
  return (
    <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg">
      <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono text-xs text-ink-400">root@server: ~</span>
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed">
        <p className="text-emerald-400">$ ssh root@prod-server</p>
        <p className="text-ink-400">Welcome to Ubuntu 22.04 LTS</p>
        <p className="text-ink-400">Last login: Thu Aug 20 09:14:22</p>
        <p className="mt-2 text-emerald-400">$ systemctl status nginx</p>
        <p className="text-ink-300">● nginx.service - high performance web server</p>
        <p className="text-emerald-400">   Active: <span className="text-emerald-400">active (running)</span></p>
        <p className="mt-2 text-emerald-400">$ <span className="inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" /></p>
      </div>
    </div>
  );
}

export default function ServerManagementPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Server Management — Full Lifecycle Control of Every VPS"
        description="Create, monitor, scale, clone, and manage servers from one panel. Five deployment methods, live resource graphs, one-click scaling, config drift detection, and SSH key management."
        path="/features/server-management"
        keywords={["server management", "VPS management", "server monitoring", "server scaling", "SSH key management", "server lifecycle"]}
        faqSchema={[
          { q: "How many deployment methods does SharkCluster offer?", a: "SharkCluster offers five server deployment methods: fresh installation, deploy from Git repository, upload ZIP, custom migration, and Docker host." },
          { q: "Can I scale my server after creation?", a: "Yes, you can resize your server at any time from the Scaling section, with the new price shown before you commit. Scaling triggers a provider-required reboot." },
          { q: "Does SharkCluster support SSH key management?", a: "Yes, SharkCluster provides full SSH key management with masked public keys, generate-or-upload options, and granular permissions for view, upload, and console access." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Server Management", path: "/features/server-management" },
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
                <Server className="h-4 w-4" />
                Server Management
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Full server lifecycle <br />
                <span className="gradient-text">in one panel</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Create, monitor, scale, clone, and tear down servers — all from one panel. Every step visible,
                every action logged, with five deployment methods to choose from.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Launch Your Server
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="dashboard" />
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

      {/* Deployment methods grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Cloud className="h-4 w-4" />
              Deployment
            </span>
            <h2 className="mt-5 heading-lg">Five ways to deploy a server</h2>
            <p className="mt-4 text-body">
              Whether you're starting fresh, bringing existing code, or running containers, SharkCluster has a
              deployment method for you. Each configures the stack automatically — you don't touch a config file.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deploymentMethods.map((method, i) => (
              <div
                key={method.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
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

      {/* Storage and next steps */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <HardDrive className="h-3.5 w-3.5" />
                  Storage that scales with you
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Keep your server flexible</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Included root storage is bundled with your plan. Attach separately-billed block storage when you need more,
                  with an auto-configure option that formats and mounts automatically.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Included root storage", "Auto-configure volumes", "Custom filesystem & mount point"].map((point) => (
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
                    <HardDrive className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Storage overview</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">240 GB total</span>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-700">140 GB in use</span>
                  <span className="text-ink-500">100 GB available</span>
                </div>
                <div className="mt-5 space-y-2.5 border-t border-ink-100 pt-4">
                  <div className="flex items-center justify-between text-xs"><span className="text-ink-500">Root volume</span><span className="font-semibold text-ink-800">80 GB</span></div>
                  <div className="flex items-center justify-between text-xs"><span className="text-ink-500">Attached volume</span><span className="font-semibold text-ink-800">160 GB</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Network className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your server</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair server management with the tools that keep your applications fast, secure, and resilient.</p>
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
