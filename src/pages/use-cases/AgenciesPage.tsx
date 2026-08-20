import { Link } from "react-router-dom";
import {
  Users, Server, Shield, RefreshCw, Lock, UserCog, Check, ArrowRight,
  ChevronRight, Layers, Globe, GitBranch, Boxes, Handshake, Server as ServerIcon,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "∞", label: "Client sites per server" },
  { value: "0", label: "Per-seat or per-site fees" },
  { value: "∞", label: "Free migrations" },
  { value: "100%", label: "Data on your VPS" },
];

const benefits = [
  {
    icon: Layers,
    title: "Unlimited Client Sites",
    desc: "Run as many client sites and apps as your server can hold. No per-site pricing, no artificial limits — just your server and your clients.",
  },
  {
    icon: UserCog,
    title: "Dedicated DevOps Manager",
    desc: "A real engineer who knows your setup and helps with architecture, scaling, and client migrations — not a tier-1 agent reading a script.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Free Migrations",
    desc: "Moving clients from another host? We migrate their sites and apps for free, as many times as you need — no migration tax.",
  },
  {
    icon: Shield,
    title: "Per-Client Security",
    desc: "Each client gets isolated apps, scoped deploy keys, and their own firewall rules. One compromised client site doesn't take down the rest.",
  },
  {
    icon: Lock,
    title: "White-Label Ready",
    desc: "Your clients see your brand, not ours. Manage everything from one panel while keeping each client's data separate and private.",
  },
  {
    icon: GitBranch,
    title: "Git Deploy for Every Client",
    desc: "Every client site can deploy from Git with scoped keys. Set up CI pipelines per client without sharing credentials across projects.",
  },
];

const featureRows = [
  {
    icon: Layers,
    tag: "Multi-Client",
    title: "Unlimited client sites on one server",
    desc: "Run every client site from a single server — WordPress, Laravel, Node, whatever the stack. No per-site licensing, no per-seat fees. Your server, your clients, your margins.",
    points: [
      "Unlimited applications per server",
      "PHP, Node.js, Python, Docker — all supported",
      "Each app gets its own domain, SSL, and database",
      "Isolate clients without isolating yourself from efficiency",
    ],
    mock: "clients",
    reverse: false,
  },
  {
    icon: UserCog,
    tag: "DevOps Manager",
    title: "A real engineer on your side",
    desc: "Your dedicated DevOps manager knows your setup and helps with client onboarding, architecture decisions, and troubleshooting. Not a ticket queue — a person who answers.",
    points: [
      "Dedicated DevOps manager included on Business plans",
      "Help with scaling, architecture, and client migrations",
      "Real engineers, not tier-1 agents",
      "Priority expert support for when clients are breathing down your neck",
    ],
    mock: "manager",
    reverse: true,
  },
  {
    icon: RefreshCw,
    tag: "Migrations",
    title: "Move clients for free, unlimited times",
    desc: "Taking on a client hosted elsewhere? We migrate their entire site — files, database, configurations — for free. No migration tax, no limit on how many times.",
    points: [
      "Full site migrations — files, database, configs",
      "Unlimited migrations, no per-site fee",
      "Zero-downtime migrations where possible",
      "We handle the heavy lifting, you handle the client relationship",
    ],
    mock: "migration",
    reverse: false,
  },
  {
    icon: Shield,
    tag: "Isolation",
    title: "Per-client security without per-client overhead",
    desc: "Each client's apps are isolated with their own deploy keys, firewall rules, and databases. A compromised client site stays contained — it doesn't cascade to every other client on the server.",
    points: [
      "Scoped SSH deploy keys per client repo",
      "Per-app firewall rules and security boundaries",
      "Closed-by-default firewall posture",
      "Security audit log shows every request across all client sites",
    ],
    mock: "security",
    reverse: true,
  },
];

const relatedFeatures = [
  { title: "Teams & Permissions", path: "/features/teams", icon: Users },
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Deployment", path: "/features/deployment", icon: GitBranch },
  { title: "Partners", path: "/partners", icon: Handshake },
];

const faqSchema = [
  { q: "Can I host unlimited client sites on SharkCluster?", a: "Yes, SharkCluster allows unlimited applications per server with no per-site or per-seat fees. You can run as many client sites as your server resources allow." },
  { q: "Does SharkCluster offer white-label hosting for agencies?", a: "The Agency Partner Program includes white-label hosting options, volume discounts, and a dedicated partner manager. The program is coming soon." },
  { q: "Are migrations really free for agencies?", a: "Yes, we migrate your client sites for free, unlimited times. There is no per-site migration fee and no cap on the number of migrations." },
];

function MockPanel({ type }: { type: string }) {
  if (type === "clients") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Layers className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Client Sites</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">12 active</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "Acme Corp", stack: "Laravel · PHP 8.2", status: "Live", color: "bg-emerald-100 text-emerald-700" },
            { name: "Globex Store", stack: "WordPress · Nginx", status: "Live", color: "bg-emerald-100 text-emerald-700" },
            { name: "Initech Blog", stack: "Node.js · React", status: "Staging", color: "bg-amber-100 text-amber-700" },
            { name: "Umbrella API", stack: "Docker · Python", status: "Live", color: "bg-emerald-100 text-emerald-700" },
          ].map((client) => (
            <div key={client.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Globe className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{client.name}</p>
                  <p className="text-[10px] text-ink-400">{client.stack}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${client.color}`}>{client.status}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Unlimited client sites — no per-site fees</p>
      </div>
    );
  }

  if (type === "manager") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <UserCog className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">DevOps Manager</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Assigned</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-700">RK</span>
          <div>
            <p className="text-sm font-semibold text-ink-900">Rahul Khanna</p>
            <p className="text-[10px] text-ink-400">Senior DevOps Engineer</p>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {[
            { task: "Client onboarding call", time: "Today 14:00", icon: Users, color: "bg-brand-50 text-brand-600" },
            { task: "Globex migration plan", time: "Tomorrow", icon: RefreshCw, color: "bg-blue-50 text-blue-600" },
            { task: "Acme scaling review", time: "Fri", icon: Server, color: "bg-emerald-50 text-emerald-600" },
          ].map((item) => (
            <div key={item.task} className="flex items-center gap-2.5 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.color}`}>
                <item.icon className="h-3.5 w-3.5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-900">{item.task}</p>
                <p className="text-[10px] text-ink-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">A real engineer — not a ticket queue</p>
      </div>
    );
  }

  if (type === "migration") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <RefreshCw className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Migration Queue</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Free</span>
        </div>
        <div className="space-y-2.5">
          {[
            { client: "Globex Store", from: "cPanel", progress: "Files", pct: "45%", color: "bg-amber-100 text-amber-700" },
            { client: "Initech Blog", from: "WP Engine", progress: "Database", pct: "80%", color: "bg-blue-100 text-blue-700" },
            { client: "Umbrella API", from: "Heroku", progress: "Complete", pct: "100%", color: "bg-emerald-100 text-emerald-700" },
          ].map((mig) => (
            <div key={mig.client} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-900">{mig.client}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${mig.color}`}>{mig.progress}</span>
              </div>
              <p className="mt-0.5 text-[10px] text-ink-400">From {mig.from}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600" style={{ width: mig.pct }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Unlimited migrations — no per-site fee</p>
      </div>
    );
  }

  // security
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Shield className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Client Isolation</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Isolated</span>
      </div>
      <div className="space-y-2.5">
        {[
          { client: "Acme Corp", apps: "3 apps", keys: "2 deploy keys", color: "bg-brand-50 text-brand-600" },
          { client: "Globex Store", apps: "1 app", keys: "1 deploy key", color: "bg-blue-50 text-blue-600" },
          { client: "Initech Blog", apps: "2 apps", keys: "1 deploy key", color: "bg-emerald-50 text-emerald-600" },
        ].map((client) => (
          <div key={client.client} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${client.color}`}>
                <Lock className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{client.client}</p>
                <p className="text-[10px] text-ink-400">{client.apps} · {client.keys}</p>
              </div>
            </div>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-3 w-3" />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">One compromised site stays contained</p>
    </div>
  );
}

export default function AgenciesPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Hosting for Agencies — Unlimited Client Sites on One Server"
        description="Run unlimited client sites on your own VPS with SharkCluster. Free migrations, dedicated DevOps manager, per-client isolation, and white-label ready. No per-site fees — your server, your clients, your margins."
        path="/who-we-serve/agencies"
        keywords={["agency hosting", "client site hosting", "multi-client VPS", "white-label hosting", "agency partner program", "unlimited client sites"]}
        faqSchema={faqSchema}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "For Agencies", path: "/who-we-serve/agencies" },
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
                For Agencies
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Unlimited client sites <br />
                <span className="gradient-text">on one server</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Run every client site from a single VPS — WordPress, Laravel, Node, whatever the stack. No per-site
                fees, no per-seat licensing. Free migrations, a dedicated DevOps manager, and per-client isolation
                that keeps one compromised site from taking down the rest.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/partners" className="btn-secondary btn-lg w-full sm:w-auto">
                  Partner Program
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="clients" />
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
              <Users className="h-4 w-4" />
              Why Agencies
            </span>
            <h2 className="mt-5 heading-lg">Built for the agency workflow</h2>
            <p className="mt-4 text-body">
              Everything you need to manage client sites efficiently — with the control, isolation, and support
              that keeps clients happy and your margins intact.
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
                  <Handshake className="h-3.5 w-3.5" />
                  Agency Partner Program
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Your server. Your clients. Your margins.</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  No per-site fees mean your margins stay yours. Run unlimited client sites on one VPS, migrate
                  clients for free, and get a dedicated DevOps manager who helps you scale. The Agency Partner
                  Program adds volume discounts and co-marketing — coming soon.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Unlimited client sites — no per-site fees",
                    "Free migrations — no per-site migration tax",
                    "Per-client isolation — one breach stays contained",
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
                    <span className="text-sm font-bold text-ink-900">SaaS vs SharkCluster</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Monthly cost</span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-lg border border-red-100 bg-red-50/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-red-700">SaaS per-site</span>
                      <span className="text-sm font-bold text-red-700">$20/site</span>
                    </div>
                    <p className="mt-1 text-[10px] text-red-500">30 client sites × $20 = $600/mo</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-red-100">
                      <div className="h-full w-[95%] rounded-full bg-red-400" />
                    </div>
                  </div>
                  <div className="rounded-lg border-2 border-brand-500 bg-brand-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-700">SharkCluster VPS</span>
                      <span className="text-sm font-bold text-brand-700">One server</span>
                    </div>
                    <p className="mt-1 text-[10px] text-brand-600">Unlimited client sites — flat cost</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100">
                      <div className="h-full w-[8%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">No per-site fees — the cost stays flat as you add clients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><ServerIcon className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your agency</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                Pair unlimited client sites with the tools that keep them fast, secure, and manageable.
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
