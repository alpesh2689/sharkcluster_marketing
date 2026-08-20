import { Link } from "react-router-dom";
import {
  Users, Server, Shield, GitBranch, Database, Layers, ArrowRight, Check,
  ChevronRight, Building2, Lock, KeyRound, AppWindow, History, UserPlus,
  Settings,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const teamFeatures = [
  { icon: Building2, title: "Organizations", desc: "Top-level account that owns your servers, applications, and billing" },
  { icon: Users, title: "Teams & Roles", desc: "Group members, scope access, assign admin/developer/read-only roles" },
  { icon: Lock, title: "Per-Server Permissions", desc: "Full or scoped access — control which panel sections a member sees" },
  { icon: AppWindow, title: "Per-App Permissions", desc: "Down to a single app — deploy to one without seeing the others" },
  { icon: KeyRound, title: "Sub-User Accounts", desc: "Restricted server-level accounts with their own credentials and SSH keys" },
];

const featureRows = [
  {
    icon: Building2,
    tag: "Organization",
    title: "Organizations — the top-level account",
    desc: "Your account is an organization — the top-level grouping that owns your servers, applications, and billing. Within it, you manage members, create teams, and decide who can reach what. Everything lives under one organization, but not everyone in it sees everything.",
    points: [
      "Organization is the top-level account that owns your infrastructure",
      "Member management with invite and removal by email",
      "Billing and ownership stay with the organization, not individuals",
      "One organization can hold many teams and many servers",
    ],
    mock: "org",
    reverse: false,
  },
  {
    icon: Users,
    tag: "Teams",
    title: "Teams and roles — reusable groupings",
    desc: "Group members into teams and scope each team's access to specific servers and applications. A team is a reusable grouping — 'frontend devs', 'agency clients', 'on-call engineers' — with a shared access level. Roles within a team control what members can do: admin, developer, or read-only.",
    points: [
      "Create teams and assign members to them",
      "Scope each team to specific servers and applications",
      "Roles: admin, developer, read-only",
      "Reassign a member between teams without recreating their login",
    ],
    mock: "teams",
    reverse: true,
  },
  {
    icon: Lock,
    tag: "Permissions",
    title: "Per-server and per-application permissions",
    desc: "Control which panel sections a member sees. Grant SFTP without database access. Restrict who can deploy or delete. Permissions are scoped per server and per application, so a teammate can deploy to one app on a server without seeing the others — or you can grant full server access to a senior engineer.",
    points: [
      "Per-server access control — full or scoped",
      "Per-application access control — down to a single app",
      "Section-level visibility — show SFTP, hide databases, restrict deploy and delete",
      "Grant SFTP without database access, or database access without deploy rights",
    ],
    mock: "permissions",
    reverse: false,
  },
  {
    icon: KeyRound,
    tag: "Sub-Users",
    title: "Sub-user accounts with instant revocation",
    desc: "Restricted server-level accounts for teammates who need to log into a server but should not control it. A sub-user gets their own credentials and SSH keys for a specific server, without access to the panel's management functions. Revoke a sub-user and their server access ends immediately.",
    points: [
      "Restricted server-level accounts, separate from panel admin",
      "Per-server credentials and SSH keys",
      "No access to panel management functions — server access only",
      "Revoke instantly when someone leaves",
    ],
    mock: "subuser",
    reverse: true,
  },
];

const stats = [
  { value: "3", label: "Roles (admin, developer, read-only)" },
  { value: "2", label: "Access levels (per-server, per-app)" },
  { value: "0", label: "Shared credentials" },
  { value: "1", label: "Click to revoke" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
  { title: "Deployment", path: "/features/deployment", icon: GitBranch },
  { title: "Databases", path: "/features/databases", icon: Database },
];

function MockPanel({ type }: { type: string }) {
  if (type === "permissions") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Lock className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Permissions Matrix</span>
          </div>
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">Scoped</span>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-lg border border-ink-200 bg-ink-50 px-2.5 py-1 text-xs font-semibold text-ink-700">Server: prod-web-01</span>
          <span className="rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">App: storefront</span>
        </div>
        <div className="space-y-2">
          {[
            { label: "SFTP / File access", on: true },
            { label: "Databases", on: false },
            { label: "Deploy", on: true },
            { label: "Delete", on: false },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <span className="text-sm font-medium text-ink-700">{row.label}</span>
              <span className={`flex h-5 w-9 items-center rounded-full px-0.5 transition-colors ${row.on ? "bg-brand-500" : "bg-ink-200"}`}>
                <span className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${row.on ? "translate-x-4" : "translate-x-0"}`} />
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Section-level visibility — show SFTP, hide databases</p>
      </div>
    );
  }

  if (type === "org") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Building2 className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">Acme Inc.</p>
              <p className="text-[10px] font-medium text-ink-400">Organization · 4 members</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-1 rounded-lg bg-brand-500 px-2.5 py-1 text-xs font-semibold text-white">
            <UserPlus className="h-3.5 w-3.5" />
            Invite
          </button>
        </div>
        <div className="space-y-2">
          {[
            { name: "you@acme.com", role: "Admin", color: "bg-brand-100 text-brand-700" },
            { name: "dev@acme.com", role: "Developer", color: "bg-blue-100 text-blue-700" },
            { name: "client@acme.com", role: "Read-only", color: "bg-ink-100 text-ink-600" },
          ].map((m) => (
            <div key={m.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-600">
                  {m.name[0].toUpperCase()}
                </span>
                <span className="text-sm font-medium text-ink-800">{m.name}</span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${m.color}`}>{m.role}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Billing and ownership stay with the organization</p>
      </div>
    );
  }

  if (type === "teams") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Teams</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "Frontend Devs", count: 3, role: "Developer", scope: "storefront", color: "bg-blue-100 text-blue-700" },
            { name: "Agency Clients", count: 2, role: "Read-only", scope: "marketing", color: "bg-ink-100 text-ink-600" },
            { name: "On-Call", count: 4, role: "Admin", scope: "prod-web-01", color: "bg-brand-100 text-brand-700" },
          ].map((t) => (
            <div key={t.name} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink-900">{t.name}</span>
                <span className="text-xs font-medium text-ink-500">{t.count} members</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${t.color}`}>{t.role}</span>
                <span className="rounded-lg border border-ink-200 bg-white px-2 py-0.5 text-[10px] font-medium text-ink-600">scope: {t.scope}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Reusable groupings — scope each team to specific servers and apps</p>
      </div>
    );
  }

  // subuser
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <KeyRound className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Sub-User Accounts</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Server-only</span>
      </div>
      <div className="space-y-2">
        {[
          { name: "deploy-bot", server: "prod-web-01", key: "ssh-rsa AAAA••••", active: true },
          { name: "ci-runner", server: "prod-web-02", key: "ssh-ed25519 BBB••••", active: true },
          { name: "temp-dev", server: "staging-01", key: "ssh-rsa CCCC••••", active: false },
        ].map((u) => (
          <div key={u.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <KeyRound className="h-4 w-4 text-ink-400" />
              <div>
                <p className="text-sm font-semibold text-ink-900">{u.name}</p>
                <p className="font-mono text-[10px] text-ink-400">{u.key}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-ink-200 bg-white px-2 py-0.5 text-[10px] font-medium text-ink-600">{u.server}</span>
              {u.active ? (
                <button className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold uppercase text-red-600">Revoke</button>
              ) : (
                <span className="rounded-md bg-ink-100 px-2 py-1 text-[10px] font-bold uppercase text-ink-500">Revoked</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Revoke instantly — server access ends immediately</p>
    </div>
  );
}

export default function TeamsPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Teams & Permissions — Per-Server, Per-App Access Control"
        description="Organizations, teams, and granular per-server and per-application permissions. Give each person their own login with access scoped to exactly what they need — no shared credentials, every action attributable."
        path="/features/teams"
        keywords={["team permissions", "server access control", "organizations", "multi-user hosting", "per-app permissions", "sub-user accounts", "audit trail", "team management"]}
        faqSchema={[
          { q: "Can my team access servers without sharing my login?", a: "Yes. SharkCluster supports organizations, teams, and per-server and per-app permissions, so each teammate gets their own login with access scoped to exactly what they need — no shared credentials." },
          { q: "How granular are the permissions?", a: "Permissions can be scoped per server and per application, down to which panel sections a member sees. You can grant SFTP without database access, or restrict who can deploy or delete — each person sees only what they need." },
          { q: "What is the difference between an organization and a team?", a: "An organization is the top-level account. Within it, you create teams and assign members, then scope each team's access to specific servers and applications. A team is a grouping of members with shared access." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Teams & Permissions", path: "/features/teams" },
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
                <Users className="h-4 w-4" />
                Teams & Permissions
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Give access without <br />
                <span className="gradient-text">giving away control</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Your developer needs to deploy. Your client needs to see uptime. Neither needs your password.
                Organizations, teams and granular per-server permissions let you hand out exactly the access each person needs.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Invite Your Team
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="permissions" />
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

      {/* Team features grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Users className="h-4 w-4" />
              Access Control
            </span>
            <h2 className="mt-5 heading-lg">Access scoped to exactly what each person needs</h2>
            <p className="mt-4 text-body">
              Your developer needs to deploy. Your client needs to see uptime. Neither needs your password. Organizations,
              teams, and granular per-server and per-application permissions let you hand out exactly the access each person needs.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamFeatures.map((feature, i) => (
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

      {/* Highlight section — Audit Trail */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <History className="h-3.5 w-3.5" />
                  Audit Trail
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Every action tied to a person</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Because every teammate logs in as themselves, every deployment, configuration change, and SSH session is
                  attributable to a person — not a shared account. The audit trail records who did what, so you can investigate
                  after the fact rather than guessing which shared login made a change.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Every action tied to a named user, not a shared account", "Audit trail for deployments, configuration changes, and SSH sessions", "Revoke access instantly when someone leaves"].map((point) => (
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
                    <History className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Audit Log</span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    { user: "dev@acme.com", action: "Deployed storefront", time: "2m ago" },
                    { user: "you@acme.com", action: "Changed Nginx config", time: "14m ago" },
                    { user: "ci-runner", action: "SSH session ended", time: "1h ago" },
                    { user: "client@acme.com", action: "Viewed uptime", time: "3h ago" },
                  ].map((log) => (
                    <div key={log.action} className="flex items-center justify-between border-b border-ink-100 pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="text-xs font-semibold text-ink-800">{log.action}</p>
                        <p className="text-[10px] text-ink-400">{log.user}</p>
                      </div>
                      <span className="text-[10px] font-medium text-ink-400">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Settings className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your team</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair team permissions with the tools that keep your applications fast, secure, and resilient.</p>
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
