import { Link } from "react-router-dom";
import {
  Code, GitBranch, Terminal, Server, Database, Shield, Check, ArrowRight,
  ChevronRight, Layers, Gauge, Package, Users, Zap, Boxes, RefreshCw,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "5", label: "Deployment methods" },
  { value: "∞", label: "Apps per server" },
  { value: "0", label: "Per-seat fees" },
  { value: "100%", label: "Root access" },
];

const benefits = [
  {
    icon: GitBranch,
    title: "Git Deploy with Scoped Keys",
    desc: "Panel-generated deploy keys scoped to a single repo — safer than a full-account token. Supports GitHub, GitLab, and Bitbucket.",
  },
  {
    icon: Terminal,
    title: "In-Browser SSH Terminal",
    desc: "A sandboxed shell in your browser — no local client needed. Session-scoped with expiring tokens, not a permanently-open connection.",
  },
  {
    icon: Layers,
    title: "Docker Host Support",
    desc: "Run containers with configurable CPU, memory, ports, and private registry credentials. Your choice of image and tag.",
  },
  {
    icon: Gauge,
    title: "Config Drift Detection",
    desc: "Live Configuration reads actual running state from the machine, surfacing drift from saved panel config before it causes an outage.",
  },
  {
    icon: Package,
    title: "Private Container Registry",
    desc: "Push private Docker images from CI with robot accounts, then deploy them to your servers — all from one panel, no third-party registry.",
  },
  {
    icon: Users,
    title: "Teams & Permissions",
    desc: "Give every teammate their own login with access scoped per server and per application. No shared credentials.",
  },
];

const featureRows = [
  {
    icon: GitBranch,
    tag: "Git Deploy",
    title: "Deploy from Git with scoped keys",
    desc: "Panel-generated deploy keys are scoped to a single repository — safer than a full-account access token. Connect GitHub, GitLab, or Bitbucket and deploy on every push, or trigger manually.",
    points: [
      "Scoped deploy keys — one repo, not your whole account",
      "GitHub, GitLab, and Bitbucket support",
      "Per-app deployment scripts for build, migration, and cache steps",
      "One-click staging environments for every application",
    ],
    mock: "git",
    reverse: false,
  },
  {
    icon: Terminal,
    tag: "SSH Terminal",
    title: "A real terminal in your browser",
    desc: "No local SSH client, no key management on your laptop. A sandboxed shell in your browser, session-scoped with expiring tokens. Full root access when you need it — because you know what you're doing.",
    points: [
      "In-browser SSH terminal — no local client needed",
      "Session-scoped with expiring tokens",
      "Full SSH key management — generate, upload, delete",
      "Public keys masked in the UI to prevent shoulder-surfing",
    ],
    mock: "terminal",
    reverse: true,
  },
  {
    icon: Layers,
    tag: "Docker",
    title: "Run containers your way",
    desc: "Docker host deployment with configurable images, tags, ports, CPU limits, memory limits, and private registry credentials. Your choice of image, your choice of resources.",
    points: [
      "Configurable CPU and memory limits",
      "Custom ports and environment variables",
      "Private registry credentials for private images",
      "Deploy from your own Container Registry — no third party",
    ],
    mock: "docker",
    reverse: false,
  },
  {
    icon: Gauge,
    tag: "Config Drift",
    title: "See what's actually running",
    desc: "Live Configuration reads the actual running state off the machine and shows you where it has drifted from what the panel thinks. Most panels show you the form they saved. We think the difference is the whole point.",
    points: [
      "Live Configuration reads actual running state",
      "Surfaces drift from saved panel config",
      "Catches manual edits before they cause outages",
      "Honest monitoring — not a pretty form hiding reality",
    ],
    mock: "drift",
    reverse: true,
  },
];

const relatedFeatures = [
  { title: "Container Registry", path: "/features/container-registry", icon: Package },
  { title: "Teams & Permissions", path: "/features/teams", icon: Users },
  { title: "Deployment", path: "/features/deployment", icon: GitBranch },
  { title: "Databases", path: "/features/databases", icon: Database },
];

const faqSchema = [
  { q: "Can I deploy from Git on SharkCluster?", a: "Yes, SharkCluster supports deploying from GitHub, GitLab, and Bitbucket using scoped deploy keys that are safer than full-account access tokens." },
  { q: "Does SharkCluster provide SSH access?", a: "Yes, SharkCluster provides full SSH key management and an in-browser SSH terminal. You can generate keypairs, upload existing public keys, and manage granular permissions per server." },
  { q: "Can I run Docker containers on SharkCluster?", a: "Yes, SharkCluster supports Docker host deployment with configurable images, tags, ports, CPU limits, memory limits, and private registry credentials." },
];

function MockPanel({ type }: { type: string }) {
  if (type === "git") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <GitBranch className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Git Deploy</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Connected</span>
        </div>
        <div className="space-y-2.5">
          {[
            { repo: "acme/web", branch: "main", key: "prod-deploy", status: "Deployed", color: "bg-emerald-100 text-emerald-700" },
            { repo: "acme/api", branch: "develop", key: "ci-pipeline", status: "Ready", color: "bg-blue-100 text-blue-700" },
            { repo: "acme/blog", branch: "main", key: "blog-deploy", status: "Deployed", color: "bg-emerald-100 text-emerald-700" },
          ].map((repo) => (
            <div key={repo.repo} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-900">{repo.repo}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${repo.color}`}>{repo.status}</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-ink-400">{repo.branch} · key: {repo.key}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Scoped keys — one repo, not your whole account</p>
      </div>
    );
  }

  if (type === "terminal") {
    return (
      <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-lg">
        <div className="flex items-center justify-between border-b border-ink-700 bg-ink-800 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-brand-400" />
            <span className="text-sm font-semibold text-ink-200">SSH Terminal</span>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-400">Connected</span>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed">
          {[
            { cmd: "$", text: "ssh root@prod-us-east", color: "text-ink-300" },
            { cmd: ">", text: "systemctl status nginx", color: "text-brand-400" },
            { cmd: "", text: "● nginx.service — active (running)", color: "text-emerald-400" },
            { cmd: ">", text: "tail -f /var/log/syslog", color: "text-brand-400" },
            { cmd: "", text: "Aug 20 14:32:01 nginx: request handled", color: "text-ink-400" },
          ].map((line, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              {line.cmd && <span className="text-brand-400">{line.cmd}</span>}
              <span className={line.color}>{line.text}</span>
            </div>
          ))}
          <p className="mt-2 text-brand-400">$ <span className="inline-block h-3.5 w-2 animate-pulse bg-brand-400 align-middle" /></p>
        </div>
      </div>
    );
  }

  if (type === "docker") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Layers className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Docker Host</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Running</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "api-gateway", image: "acme/api:latest", cpu: "2 cores", mem: "1GB", color: "bg-brand-50 text-brand-600" },
            { name: "worker-bg", image: "acme/worker:v2", cpu: "1 core", mem: "512MB", color: "bg-blue-50 text-blue-600" },
            { name: "redis-cache", image: "redis:7-alpine", cpu: "0.5 core", mem: "256MB", color: "bg-emerald-50 text-emerald-600" },
          ].map((c) => (
            <div key={c.name} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-900">{c.name}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${c.color}`}>Up</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-ink-400">{c.image}</p>
              <p className="mt-0.5 text-[10px] text-ink-400">{c.cpu} · {c.mem}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Your image, your resources, your registry</p>
      </div>
    );
  }

  // drift
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Gauge className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Live Configuration</span>
        </div>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">Drift detected</span>
      </div>
      <div className="space-y-2.5">
        {[
          { setting: "Redis maxmemory", panel: "256mb", live: "512mb", drifted: true },
          { setting: "Nginx worker_procs", panel: "4", live: "4", drifted: false },
          { setting: "PHP memory_limit", panel: "256M", live: "512M", drifted: true },
          { setting: "MySQL max_connections", panel: "100", live: "100", drifted: false },
        ].map((row) => (
          <div key={row.setting} className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${row.drifted ? "border-amber-200 bg-amber-50/50" : "border-ink-100 bg-ink-50/50"}`}>
            <div className="flex items-center gap-2.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${row.drifted ? "bg-amber-100 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                {row.drifted ? <Zap className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{row.setting}</p>
                <p className="font-mono text-[10px] text-ink-400">panel: {row.panel} → live: {row.live}</p>
              </div>
            </div>
            {row.drifted && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">Drift</span>}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Reads actual running state — not the saved form</p>
    </div>
  );
}

export default function DevelopersPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Hosting for Developers — Deploy Code with Git, Docker & Full SSH Access"
        description="Deploy from Git with scoped deploy keys, run Docker containers, edit VCL files, manage SSH keys, and get a real terminal in your browser. Full control for developers who know what they're doing."
        path="/who-we-serve/developers"
        keywords={["developer hosting", "git deployment", "Docker hosting", "SSH access", "VPS for developers", "Laravel hosting", "Node.js hosting"]}
        faqSchema={faqSchema}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "For Developers", path: "/who-we-serve/developers" },
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
                <Code className="h-4 w-4" />
                For Developers
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Deploy code <br />
                <span className="gradient-text">your way</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Git deploy with scoped keys, Docker containers, in-browser SSH terminal, VCL editing, and full root
                access when you need it. Config drift detection that reads actual running state. Built for
                developers who want control without the overhead.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/features/deployment" className="btn-secondary btn-lg w-full sm:w-auto">
                  Explore Deployment
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="terminal" />
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
              <Code className="h-4 w-4" />
              Why Developers
            </span>
            <h2 className="mt-5 heading-lg">Built for developers who want control</h2>
            <p className="mt-4 text-body">
              The tools you actually use — Git, Docker, SSH, real config — without the panels that hide what matters.
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
                  <Shield className="h-3.5 w-3.5" />
                  Full Control
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Your server. Your root. Your rules.</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Full SSH access, real terminal, scoped deploy keys, Docker with your own resources, and config
                  drift detection that reads what's actually running. No black boxes, no hidden abstractions —
                  just the tools you need and the control you want.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Full root access — in-browser SSH terminal",
                    "Scoped deploy keys — safer than tokens",
                    "Config drift detection — see what's real",
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
                    <Boxes className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Deployment Methods</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">5 total</span>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { label: "Git Deploy", icon: GitBranch, color: "bg-brand-50 text-brand-600" },
                    { label: "Docker Image", icon: Layers, color: "bg-blue-50 text-blue-600" },
                    { label: "ZIP Upload", icon: Package, color: "bg-emerald-50 text-emerald-600" },
                    { label: "Fresh Install", icon: Server, color: "bg-amber-50 text-amber-600" },
                    { label: "Migration", icon: RefreshCw, color: "bg-purple-50 text-purple-600" },
                  ].map((method) => (
                    <div key={method.label} className="flex items-center gap-2.5 rounded-lg border border-ink-100 bg-ink-50/50 px-2.5 py-2">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${method.color}`}>
                        <method.icon className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-xs font-semibold text-ink-900">{method.label}</p>
                      <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Code className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your dev workflow</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                Pair Git deploy and Docker with the tools that keep your stack fast, secure, and observable.
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
