import { Link } from "react-router-dom";
import {
  Package, Server, GitBranch, Database, Layers, Tag, Bot, KeyRound,
  HardDrive, RefreshCw, Users, ArrowRight, Check, ChevronRight,
  Settings, AlertTriangle, Activity,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const registryFeatures = [
  { icon: Package, title: "Private Registries", desc: "Multiple isolated registries, each independently managed" },
  { icon: Layers, title: "Repositories", desc: "Organise repositories within a registry by name" },
  { icon: Tag, title: "Tags & History", desc: "Browse tags and image history for any repository" },
  { icon: Bot, title: "Robot Accounts", desc: "Non-human identities scoped to specific repositories for CI" },
  { icon: KeyRound, title: "Access Tokens", desc: "Short-lived tokens with read, write, or admin permissions" },
  { icon: Users, title: "Permissions", desc: "Per-repository read, write, and admin for users, teams, and robots" },
];

const featureRows = [
  {
    icon: Bot,
    tag: "CI",
    title: "Robot accounts for CI pipelines",
    desc: "Robot accounts are non-human identities scoped to specific repositories, so a pipeline never carries a personal credential. When someone leaves the team, their access is revoked — the robot account keeps running.",
    points: [
      "Per-repository scope — a pipeline can only touch what it needs",
      "Revoke a robot account without disrupting people or other pipelines",
      "Separate from user accounts — no shared personal credentials in CI",
    ],
    mock: "robot",
    reverse: false,
  },
  {
    icon: KeyRound,
    tag: "Tokens",
    title: "Scoped access tokens",
    desc: "Short-lived tokens with defined permissions, issued and revoked from the panel. Use them for temporary access, service-to-service authentication, or time-boxed CI runs.",
    points: [
      "Short-lived with configurable expiry",
      "Defined permissions — read, write, or admin",
      "Issued and revoked from the panel, no CLI required",
    ],
    mock: "tokens",
    reverse: true,
  },
  {
    icon: HardDrive,
    tag: "Storage",
    title: "Storage quotas and usage tracking",
    desc: "Quotas per registry with live usage tracking and history, so storage growth is visible before it becomes a bill. The panel shows how much space each repository consumes and warns you as you approach the limit.",
    points: [
      "Configurable storage quota per registry",
      "Live usage tracking with historical trends",
      "Per-repository breakdown of storage consumption",
      "Warnings before the quota is reached",
    ],
    mock: "storage",
    reverse: false,
  },
  {
    icon: RefreshCw,
    tag: "Retention",
    title: "Retention and auto-delete rules",
    desc: "Rules that prune old tags automatically; without them a registry grows forever. The trade-off is honest: aggressive retention can delete an image you still need to roll back to. Configure retention to match your rollback window, not to keep storage tidy at all costs.",
    points: [
      "Auto-delete rules that prune old tags on a schedule",
      "Configurable retention count or age per repository",
      "Honest trade-off — aggressive retention can remove a rollback image",
      "Set retention to match your rollback window, not just storage limits",
    ],
    mock: "retention",
    reverse: true,
  },
];

const stats = [
  { value: "0", label: "Third parties in the path" },
  { value: "3", label: "Access levels (read/write/admin)" },
  { value: "1", label: "Click to push from CI" },
  { value: "Auto", label: "Retention rules" },
];

const relatedFeatures = [
  { title: "Deployment", path: "/features/deployment", icon: GitBranch },
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Teams", path: "/features/teams", icon: Users },
  { title: "Backups & Recovery", path: "/features/backups", icon: Database },
];

function MockPanel({ type }: { type: string }) {
  if (type === "registry") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Package className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Registry Browser</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Private</span>
        </div>
        <div className="space-y-3">
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
            <p className="text-xs font-bold text-ink-900">prod-registry</p>
            <div className="mt-2 space-y-1.5">
              {[
                { repo: "frontend", tag: "v2.4.1", color: "bg-emerald-100 text-emerald-700" },
                { repo: "api-server", tag: "v1.8.0", color: "bg-blue-100 text-blue-700" },
                { repo: "worker", tag: "latest", color: "bg-amber-100 text-amber-700" },
              ].map((r) => (
                <div key={r.repo} className="flex items-center justify-between rounded-md bg-white px-2.5 py-1.5">
                  <span className="font-mono text-xs text-ink-700">{r.repo}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${r.color}`}>{r.tag}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
            <p className="text-xs font-bold text-ink-900">staging-registry</p>
            <div className="mt-2 space-y-1.5">
              {[
                { repo: "frontend", tag: "v2.4.0-rc.2", color: "bg-purple-100 text-purple-700" },
                { repo: "api-server", tag: "v1.7.9", color: "bg-blue-100 text-blue-700" },
              ].map((r) => (
                <div key={r.repo} className="flex items-center justify-between rounded-md bg-white px-2.5 py-1.5">
                  <span className="font-mono text-xs text-ink-700">{r.repo}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${r.color}`}>{r.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "robot") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Bot className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Robot Accounts</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "ci-pipeline-prod", scope: "prod-registry/frontend", status: "Active", color: "bg-emerald-100 text-emerald-700" },
            { name: "ci-pipeline-api", scope: "prod-registry/api-server", status: "Active", color: "bg-emerald-100 text-emerald-700" },
            { name: "staging-deploy", scope: "staging-registry/*", status: "Revoked", color: "bg-red-100 text-red-700" },
          ].map((robot) => (
            <div key={robot.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Bot className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{robot.name}</p>
                  <p className="font-mono text-[10px] text-ink-400">{robot.scope}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${robot.color}`}>{robot.status}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Scoped to repositories — no personal credentials in CI</p>
      </div>
    );
  }

  if (type === "tokens") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Access Tokens</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "deploy-token", perm: "Write", expiry: "Expires in 2h 14m", color: "bg-blue-100 text-blue-700", urgent: false },
            { name: "read-only-audit", perm: "Read", expiry: "Expires in 5d 3h", color: "bg-emerald-100 text-emerald-700", urgent: false },
            { name: "admin-temp", perm: "Admin", expiry: "Expires in 18m", color: "bg-amber-100 text-amber-700", urgent: true },
          ].map((token) => (
            <div key={token.name} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <KeyRound className="h-4 w-4 text-ink-400" />
                  <p className="text-sm font-semibold text-ink-900">{token.name}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${token.color}`}>{token.perm}</span>
              </div>
              <p className={`mt-1.5 text-[10px] font-medium ${token.urgent ? "text-amber-600" : "text-ink-400"}`}>
                {token.expiry}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Short-lived, scoped, revocable from the panel</p>
      </div>
    );
  }

  if (type === "storage") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-brand-600" />
            <span className="text-sm font-semibold text-ink-900">Storage Usage</span>
          </div>
          <span className="text-xs font-semibold text-ink-400">100 GB quota</span>
        </div>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-brand-700">72 GB in use</span>
          <span className="text-ink-500">28 GB available</span>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">Approaching quota — 72% used</span>
        </div>
        <div className="mt-4 space-y-2 border-t border-ink-100 pt-3">
          {[
            { repo: "frontend", size: "28 GB", w: "w-[39%]" },
            { repo: "api-server", size: "22 GB", w: "w-[31%]" },
            { repo: "worker", size: "14 GB", w: "w-[19%]" },
            { repo: "scheduler", size: "8 GB", w: "w-[11%]" },
          ].map((r) => (
            <div key={r.repo} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className={`h-1.5 w-8 rounded-full bg-brand-500 ${r.w}`} />
                <span className="text-ink-500">{r.repo}</span>
              </div>
              <span className="font-semibold text-ink-800">{r.size}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // retention
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <RefreshCw className="h-4 w-4 text-brand-600" />
        <span className="text-sm font-semibold text-ink-900">Retention Rules</span>
      </div>
      <div className="space-y-2.5">
        {[
          { repo: "frontend", rule: "Keep last 10 tags", schedule: "Daily at 02:00", color: "bg-emerald-100 text-emerald-700" },
          { repo: "api-server", rule: "Keep tags < 30 days", schedule: "Weekly", color: "bg-blue-100 text-blue-700" },
          { repo: "worker", rule: "Keep last 5 tags", schedule: "Daily at 03:00", color: "bg-amber-100 text-amber-700" },
        ].map((rule) => (
          <div key={rule.repo} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-900">{rule.repo}</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${rule.color}`}>Auto</span>
            </div>
            <p className="mt-1 text-xs text-ink-600">{rule.rule}</p>
            <p className="mt-0.5 text-[10px] text-ink-400">{rule.schedule}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-lg bg-ink-50 px-3 py-2">
        <Settings className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" />
        <p className="text-[10px] leading-relaxed text-ink-500">Set retention to match your rollback window — aggressive rules can delete an image you still need.</p>
      </div>
    </div>
  );
}

export default function ContainerRegistryPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Container Registry — Private Docker Image Storage on Your VPS"
        description="Push private images from CI, pull them onto your servers, and never hand your containers to a third party. Registries, repositories, robot accounts and retention policies — in the same panel that runs your infrastructure."
        path="/features/container-registry"
        keywords={["container registry", "private docker registry", "docker image storage", "VPS registry", "self-hosted registry", "robot accounts", "container retention"]}
        faqSchema={[
          { q: "Can I host private Docker images?", a: "Yes. SharkCluster runs a private container registry on your own server. You push images from your CI pipeline, pull them onto your servers, and your images never pass through a third-party service." },
          { q: "How do robot accounts differ from access tokens?", a: "Robot accounts are non-human identities scoped to specific repositories — a pipeline uses them instead of a personal credential. Access tokens are short-lived credentials issued to a human or service for authentication. Robot accounts survive person-level changes; tokens expire." },
          { q: "What happens when I hit my storage quota?", a: "Each registry has a configurable storage quota with live usage tracking. When you approach the limit, the panel warns you before it becomes a problem. You can raise the quota, delete old tags, or set up auto-delete retention rules to reclaim space automatically." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Container Registry", path: "/features/container-registry" },
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
                <Package className="h-4 w-4" />
                Container Registry
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Your own private <br />
                <span className="gradient-text">container registry</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Push private images from CI, pull them onto your servers, and never hand your containers to a third
                party. Registries, repositories, robot accounts and retention policies — in the same panel that runs
                your infrastructure.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Store Your Images
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="registry" />
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

      {/* Registry features grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Package className="h-4 w-4" />
              Registry
            </span>
            <h2 className="mt-5 heading-lg">Everything a registry needs</h2>
            <p className="mt-4 text-body">
              Create registries, organise repositories within them, and browse tags and image history — all from the
              panel. Each registry is isolated and addressable by repository and tag, just like any Docker registry,
              but it lives on your infrastructure.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {registryFeatures.map((feature, i) => (
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

      {/* Highlight section — shared registries */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <Users className="h-3.5 w-3.5" />
                  Organizations
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Shared registries across your team</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Shared registries across a team with member management and an activity log. See who pushed what,
                  when a robot account was created or revoked, and which permissions changed.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Shared registries across a team or organisation",
                    "Member management with role assignment",
                    "Activity log tracking pushes, pulls, permission changes, and robot account lifecycle",
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
                    <span className="text-sm font-bold text-ink-900">Activity Log</span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    { action: "Pushed", target: "frontend:v2.4.1", user: "ci-pipeline-prod", time: "2m ago", color: "bg-emerald-100 text-emerald-700" },
                    { action: "Pull", target: "api-server:v1.8.0", user: "prod-server-01", time: "8m ago", color: "bg-blue-100 text-blue-700" },
                    { action: "Robot created", target: "staging-deploy", user: "admin@team", time: "1h ago", color: "bg-purple-100 text-purple-700" },
                    { action: "Permission changed", target: "worker repo", user: "admin@team", time: "3h ago", color: "bg-amber-100 text-amber-700" },
                    { action: "Robot revoked", target: "old-ci-bot", user: "admin@team", time: "5h ago", color: "bg-red-100 text-red-700" },
                  ].map((event) => (
                    <div key={event.target + event.time} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${event.color}`}>{event.action}</span>
                        <div>
                          <p className="text-xs font-semibold text-ink-800">{event.target}</p>
                          <p className="text-[10px] text-ink-400">by {event.user}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-ink-400">{event.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related features */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Package className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your registry</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair your container registry with the tools that deploy, manage, and protect your infrastructure.</p>
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
