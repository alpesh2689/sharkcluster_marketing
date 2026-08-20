import { Link } from "react-router-dom";
import {
  Server, Shield, GitBranch, Database, Globe, Lock, Boxes, ArrowRight,
  Check, ChevronRight, HardDrive, Zap, KeyRound, Radio, Power,
  TrendingDown, Settings, RefreshCw,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stackComponents = [
  { icon: Database, title: "Postgres", desc: "Full Postgres database with row-level security and realtime subscriptions" },
  { icon: KeyRound, title: "Auth", desc: "Email/password, OAuth, magic links — built-in authentication" },
  { icon: HardDrive, title: "Storage", desc: "File storage with signed URLs and access control" },
  { icon: Radio, title: "Realtime", desc: "Realtime subscriptions on database changes" },
  { icon: Zap, title: "Edge Functions", desc: "Serverless TypeScript functions running on your VPS" },
];

const featureRows = [
  {
    icon: Boxes,
    tag: "Install",
    title: "One-click install on your own VPS",
    desc: "The managed-platform installer handles the entire Supabase stack — Postgres, Auth, Storage, Realtime, and Edge Functions — and stands it up on a VPS you already control. No docker-compose file to write, no environment variables to puzzle out, no reverse proxy to configure by hand. You pick the server, click install, and the panel does the rest.",
    points: [
      "Full Supabase stack installed in one click — Postgres, Auth, Storage, Realtime, Edge Functions",
      "Runs on a VPS you already control — no new account, no new vendor",
      "No docker-compose or env setup to manage by hand",
      "Install status and progress visible in the panel",
    ],
    mock: "install",
    reverse: false,
  },
  {
    icon: Power,
    tag: "Lifecycle",
    title: "Lifecycle management from the panel",
    desc: "Once installed, the panel manages the platform's lifecycle — start, stop, restart, update, and health checks — the same way it manages any other service on your server. You do not SSH in to restart Postgres or pull a new image.",
    points: [
      "Start, stop, and restart the platform from the panel",
      "Updates managed through the panel — no manual image pulls",
      "Health checks surface platform status alongside your other services",
    ],
    mock: "lifecycle",
    reverse: true,
  },
  {
    icon: Globe,
    tag: "Domain",
    title: "Domain and SSL wiring, automatic",
    desc: "Point a domain at your Supabase instance and the panel wires up the reverse proxy and SSL certificate automatically. The Studio, the API, and the database each get the subdomains they need, with Let's Encrypt certificates provisioned and renewed without intervention.",
    points: [
      "Reverse proxy configured automatically on install",
      "Subdomains for Studio, API, and database wired by the panel",
      "Let's Encrypt SSL provisioned and renewed automatically",
    ],
    mock: "domain",
    reverse: false,
  },
  {
    icon: Lock,
    tag: "Secrets",
    title: "Secret management, not plaintext env files",
    desc: "Supabase needs secrets — JWT signing keys, service role keys, anon keys, Postgres credentials, and SMTP passwords. The installer generates and stores them, and the panel surfaces them where you need them without leaving them in a plaintext env file you have to chase down. Rotate a secret and the panel propagates it to the services that depend on it.",
    points: [
      "Secrets generated on install — JWT, service role, anon keys, Postgres credentials",
      "Stored and surfaced by the panel, not left in a plaintext env file",
      "Rotate a secret and dependent services pick up the new value",
    ],
    mock: "secrets",
    reverse: true,
  },
];

const stats = [
  { value: "1", label: "Click to install" },
  { value: "5", label: "Stack components (Postgres, Auth, Storage, Realtime, Edge Functions)" },
  { value: "0", label: "Per-row pricing" },
  { value: "0", label: "Third parties with your data" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Databases", path: "/features/databases", icon: Database },
  { title: "Domains & SSL", path: "/features/domains-ssl", icon: Globe },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
];

function MockPanel({ type }: { type: string }) {
  if (type === "install") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Boxes className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Installing Supabase</span>
          </div>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">In progress</span>
        </div>
        <div className="space-y-2">
          {[
            { icon: Database, name: "Postgres", status: "done" },
            { icon: KeyRound, name: "Auth", status: "done" },
            { icon: HardDrive, name: "Storage", status: "done" },
            { icon: Radio, name: "Realtime", status: "active" },
            { icon: Zap, name: "Edge Functions", status: "pending" },
          ].map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <c.icon className="h-4 w-4 text-ink-400" />
                <span className="text-sm font-semibold text-ink-900">{c.name}</span>
              </div>
              {c.status === "done" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-3 w-3" />
                </span>
              )}
              {c.status === "active" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                </span>
              )}
              {c.status === "pending" && (
                <span className="h-2 w-2 rounded-full bg-ink-200" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-ink-500">Progress</span>
            <span className="font-bold text-ink-900">60%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-200">
            <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "lifecycle") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Power className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Platform Lifecycle</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Running</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-1.5 rounded-lg border border-ink-200 bg-ink-50/50 px-3 py-2 text-xs font-semibold text-ink-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700">
            <Power className="h-3.5 w-3.5" /> Start
          </button>
          <button className="flex items-center justify-center gap-1.5 rounded-lg border border-ink-200 bg-ink-50/50 px-3 py-2 text-xs font-semibold text-ink-700 transition-colors hover:bg-red-50 hover:text-red-700">
            <Power className="h-3.5 w-3.5" /> Stop
          </button>
          <button className="flex items-center justify-center gap-1.5 rounded-lg border border-ink-200 bg-ink-50/50 px-3 py-2 text-xs font-semibold text-ink-700 transition-colors hover:bg-amber-50 hover:text-amber-700">
            <RefreshCw className="h-3.5 w-3.5" /> Restart
          </button>
          <button className="flex items-center justify-center gap-1.5 rounded-lg border border-ink-200 bg-ink-50/50 px-3 py-2 text-xs font-semibold text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700">
            <Settings className="h-3.5 w-3.5" /> Update
          </button>
        </div>
        <div className="mt-4 space-y-2 border-t border-ink-100 pt-3">
          {[
            { name: "Postgres", status: "healthy" },
            { name: "Auth", status: "healthy" },
            { name: "Storage", status: "healthy" },
            { name: "Realtime", status: "healthy" },
            { name: "Edge Functions", status: "healthy" },
          ].map((c) => (
            <div key={c.name} className="flex items-center justify-between text-xs">
              <span className="font-medium text-ink-500">{c.name}</span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "domain") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Globe className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Domain Configuration</span>
        </div>
        <div className="space-y-2.5">
          {[
            { sub: "studio", url: "studio.example.com", label: "Studio" },
            { sub: "api", url: "api.example.com", label: "API" },
            { sub: "db", url: "db.example.com", label: "Database" },
          ].map((d) => (
            <div key={d.sub} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{d.label}</p>
                  <p className="font-mono text-[10px] text-ink-400">{d.url}</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Wired</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Lock className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Let's Encrypt SSL — provisioned & auto-renewing</span>
        </div>
      </div>
    );
  }

  // secrets
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <Lock className="h-4 w-4 text-brand-600" />
        <span className="text-sm font-semibold text-ink-900">Secret Management</span>
      </div>
      <div className="space-y-2">
        {[
          { name: "JWT Signing Key", value: "eyJhbGciOiJIUzI1••••••••", propagated: true },
          { name: "Service Role Key", value: "eyJhbGciOiJIUzI1••••••••", propagated: true },
          { name: "Anon Key", value: "eyJhbGciOiJIUzI1••••••••", propagated: true },
          { name: "Postgres Password", value: "••••••••••••••••", propagated: false },
        ].map((s) => (
          <div key={s.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <KeyRound className="h-4 w-4 text-ink-400" />
              <div>
                <p className="text-sm font-semibold text-ink-900">{s.name}</p>
                <p className="font-mono text-[10px] text-ink-400">{s.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {s.propagated ? (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-600">
                  <Check className="h-3 w-3" /> Synced
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-amber-600">
                  <RefreshCw className="h-3 w-3 animate-spin" /> Propagating
                </span>
              )}
              <button className="flex h-6 w-6 items-center justify-center rounded-md border border-ink-200 text-ink-400 transition-colors hover:bg-brand-50 hover:text-brand-600">
                <RefreshCw className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Secrets stored by the panel — never left in plaintext env files</p>
    </div>
  );
}

export default function SelfHostedSupabasePage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Self-Hosted Supabase — Run Your Own on a VPS"
        description="One-click Supabase install on your own VPS with lifecycle management, domain and SSL wiring, and secret management. Your data on your server — no per-row pricing, no vendor lock-in."
        path="/features/self-hosted-supabase"
        keywords={["self-hosted supabase", "supabase hosting", "run your own supabase", "supabase vps", "supabase install", "managed platform installer", "open source backend"]}
        faqSchema={[
          { q: "Can I run my own Supabase on a VPS?", a: "Yes. SharkCluster's managed-platform installer installs Supabase on your own VPS in one click, with lifecycle management, domain and SSL wiring, and secret management handled from the panel." },
          { q: "Do I pay per row or per request?", a: "No. Because Supabase runs on your own server, you pay for the server — not per row, per request, or per concurrent connection. There is no usage-based pricing layered on top." },
          { q: "Is my data on my own server?", a: "Yes. The entire Supabase stack — Postgres, Auth, Storage, Realtime, and Edge Functions — runs on your VPS. Your data never touches SharkCluster's infrastructure." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Self-Hosted Supabase", path: "/features/self-hosted-supabase" },
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
                Self-Hosted Supabase
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Run your own Supabase <br />
                <span className="gradient-text">on your own VPS</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Supabase is an open-source backend platform — Postgres, Auth, Storage, Realtime, and Edge
                Functions in one stack. SharkCluster's managed-platform installer puts the whole thing on your
                VPS in one click, with lifecycle, domain, and secret management handled from the panel.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Install Supabase
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="install" />
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

      {/* Supabase stack grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Boxes className="h-4 w-4" />
              Supabase Stack
            </span>
            <h2 className="mt-5 heading-lg">The full Supabase stack on your VPS</h2>
            <p className="mt-4 text-body">
              The managed-platform installer handles the entire Supabase stack — Postgres, Auth, Storage,
              Realtime, and Edge Functions — and stands it up on a VPS you already control. No docker-compose
              file to write, no environment variables to puzzle out, no reverse proxy to configure by hand.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stackComponents.map((component, i) => (
              <div
                key={component.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <component.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{component.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{component.desc}</p>
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

      {/* Highlight section — pricing */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <TrendingDown className="h-3.5 w-3.5" />
                  Pricing
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Your data on your server, no per-row pricing</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Hosted Supabase charges per row, per request, and per concurrent connection. Self-hosted
                  Supabase on your VPS charges you for the server — and nothing else. The database, the auth
                  users, the storage objects, and the realtime connections all live on hardware you control.
                  Scale by resizing the server, not by upgrading a pricing tier.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["No per-row, per-request, or per-connection pricing — you pay for the server", "All data — Postgres, Auth, Storage, Realtime — lives on your VPS", "Scale by resizing the server, not by upgrading a vendor tier"].map((point) => (
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
                    <TrendingDown className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Cost Comparison</span>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-3.5">
                    <p className="text-xs font-semibold text-red-600">Hosted Supabase</p>
                    <p className="mt-1 text-sm font-bold text-ink-900">Per-row pricing</p>
                    <p className="mt-1 text-[10px] text-ink-500">Billed per row, per request, per concurrent connection</p>
                  </div>
                  <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-3.5">
                    <p className="text-xs font-semibold text-emerald-600">Self-Hosted on VPS</p>
                    <p className="mt-1 text-sm font-bold text-ink-900">Flat server cost</p>
                    <p className="mt-1 text-[10px] text-ink-500">Pay for the server — no usage-based pricing on top</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Boxes className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your stack</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair self-hosted Supabase with the tools that keep your platform fast, secure, and resilient.</p>
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
