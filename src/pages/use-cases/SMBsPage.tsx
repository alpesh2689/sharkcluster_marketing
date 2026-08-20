import { Link } from "react-router-dom";
import {
  Building2, Server, Shield, RefreshCw, Lock, UserCog, Check, ArrowRight,
  ChevronRight, Boxes, Receipt, Ticket, FileSpreadsheet, Database, Activity,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "0", label: "Per-seat or per-agent fees" },
  { value: "4", label: "App categories" },
  { value: "∞", label: "Users & agents" },
  { value: "100%", label: "Data on your VPS" },
];

const benefits = [
  {
    icon: Lock,
    title: "Your Data Stays Private",
    desc: "Every app, database, and file lives on your VPS. Your business data never touches a third-party server. Only you have access.",
  },
  {
    icon: Receipt,
    title: "No Per-Seat Fees",
    desc: "Open-source apps mean unlimited users, agents, and clients. No SaaS per-seat pricing model that scales with your headcount.",
  },
  {
    icon: UserCog,
    title: "Dedicated DevOps Manager",
    desc: "A real human engineer who knows your setup and helps with architecture, scaling, and troubleshooting — not a tier-1 agent reading a script.",
  },
  {
    icon: Shield,
    title: "Security by Default",
    desc: "Closed-by-default firewall, scoped deploy keys, localhost-bound services. Security guidance baked into every setting.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Free Migrations",
    desc: "Moving from another host? We migrate your sites and applications for free, as many times as you need.",
  },
  {
    icon: Database,
    title: "Auto-Configured Databases",
    desc: "Each app gets its database created and wired in automatically. MySQL, PostgreSQL, MongoDB — no manual setup.",
  },
];

const featureRows = [
  {
    icon: Boxes,
    tag: "ERP",
    title: "Run your entire business on one server",
    desc: "ERP systems like ERPNext and Odoo on your own VPS. Inventory, HR, accounting, CRM — your operational data never leaves your server. No per-seat SaaS fees eating your margins.",
    points: [
      "ERPNext, Odoo, Frappe, Dolibarr supported",
      "Inventory, HR, accounting, CRM built-in",
      "Unlimited users — no per-seat licensing",
      "Database created and wired in automatically",
    ],
    mock: "erp",
    reverse: false,
  },
  {
    icon: Ticket,
    tag: "Helpdesk",
    title: "Helpdesk & ticketing — no per-agent pricing",
    desc: "Customer support, ticket routing, and SLA management — self-hosted and fully under your control. No per-agent pricing. Add as many agents as your business needs.",
    points: [
      "Zammad, osTicket, FreeScout, UVDesk",
      "Unlimited agents — no per-agent fees",
      "Email & chat integration",
      "SLA management and custom workflows",
    ],
    mock: "helpdesk",
    reverse: true,
  },
  {
    icon: FileSpreadsheet,
    tag: "Invoicing",
    title: "Invoicing & billing — financial data stays private",
    desc: "Generate invoices, track payments, and manage clients with open-source invoicing apps. Your financial data stays on your VPS — never on a third-party SaaS that could change its pricing overnight.",
    points: [
      "Invoice Ninja, Crater, InvoicePlane, Akaunting",
      "Recurring invoicing and payment tracking",
      "Client portal and multi-currency support",
      "Financial data stays private on your server",
    ],
    mock: "invoicing",
    reverse: false,
  },
  {
    icon: Shield,
    tag: "Security",
    title: "Security baked in, not bolted on",
    desc: "Closed-by-default firewall, scoped deploy keys, localhost-bound services, sandboxed file manager, and security audit logs. We don't just expose the switch — we tell you which way to flip it.",
    points: [
      "Closed-by-default firewall with UFW",
      "Scoped SSH deploy keys per repository",
      "Localhost-bound services by default",
      "Security audit log shows every request",
    ],
    mock: "security",
    reverse: true,
  },
];

const relatedFeatures = [
  { title: "Self-Hosted Apps", path: "/self-hosted-apps", icon: Boxes },
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Backups & Recovery", path: "/features/backups", icon: RefreshCw },
  { title: "Firewall & Security", path: "/features/firewall", icon: Shield },
];

const faqSchema = [
  { q: "Can I run ERP and business apps on SharkCluster?", a: "Yes, SharkCluster supports self-hosted ERP systems like ERPNext and Odoo, helpdesk tools like Zammad and osTicket, and invoicing apps like Invoice Ninja — all on your own VPS." },
  { q: "Is self-hosting business apps cheaper than SaaS?", a: "Yes. Open-source self-hosted apps have no per-seat or per-agent licensing fees. You pay only for your server, regardless of how many users or agents you have." },
  { q: "Is my business data secure when self-hosting?", a: "Yes. Your data lives entirely on the VPS you choose. SharkCluster never stores your application data on its own infrastructure. The panel communicates with your server over SSH to manage it." },
];

function MockPanel({ type }: { type: string }) {
  if (type === "erp") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Boxes className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">ERP Dashboard</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Running</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Inventory", val: "1,284 items", icon: Boxes, color: "bg-brand-50 text-brand-600" },
            { label: "HR", val: "47 staff", icon: Building2, color: "bg-blue-50 text-blue-600" },
            { label: "Accounting", val: "$84.2k", icon: FileSpreadsheet, color: "bg-emerald-50 text-emerald-600" },
            { label: "CRM", val: "312 leads", icon: Receipt, color: "bg-amber-50 text-amber-600" },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
              <div className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-md ${m.color}`}>
                  <m.icon className="h-3 w-3" />
                </span>
                <span className="text-xs font-medium text-ink-500">{m.label}</span>
              </div>
              <p className="mt-2 text-sm font-bold text-ink-900">{m.val}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">All modules synced on your VPS</span>
        </div>
      </div>
    );
  }

  if (type === "helpdesk") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Ticket className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Helpdesk Tickets</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Unlimited Agents</span>
        </div>
        <div className="space-y-2">
          {[
            { id: "#1042", subj: "Login page not loading", sla: "2h", slaColor: "bg-red-100 text-red-700" },
            { id: "#1041", subj: "Invoice export failing", sla: "4h", slaColor: "bg-amber-100 text-amber-700" },
            { id: "#1040", subj: "Password reset request", sla: "Met", slaColor: "bg-emerald-100 text-emerald-700" },
          ].map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Ticket className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{t.id}</p>
                  <p className="text-[10px] text-ink-400">{t.subj}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${t.slaColor}`}>SLA {t.sla}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">No per-agent pricing — add as many as you need</p>
      </div>
    );
  }

  if (type === "invoicing") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <FileSpreadsheet className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Invoices</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Private</span>
        </div>
        <div className="space-y-2">
          {[
            { id: "INV-2024-089", client: "Acme Corp", amount: "$4,200", status: "Paid", statusColor: "bg-emerald-100 text-emerald-700" },
            { id: "INV-2024-088", client: "Globex LLC", amount: "$1,850", status: "Pending", statusColor: "bg-amber-100 text-amber-700" },
            { id: "INV-2024-087", client: "Initech", amount: "$3,100", status: "Overdue", statusColor: "bg-red-100 text-red-700" },
          ].map((inv) => (
            <div key={inv.id} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{inv.id}</p>
                  <p className="text-[10px] text-ink-400">{inv.client}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-ink-900">{inv.amount}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${inv.statusColor}`}>{inv.status}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Financial data stays on your VPS — never on ours</p>
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
          <span className="text-sm font-semibold text-ink-900">Security Layers</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">7 active</span>
      </div>
      <div className="space-y-2">
        {[
          { label: "Firewall", desc: "UFW, closed by default", icon: Shield, color: "bg-brand-50 text-brand-600" },
          { label: "SSH Keys", desc: "Scoped, masked, managed", icon: Lock, color: "bg-blue-50 text-blue-600" },
          { label: "Services", desc: "Localhost-bound by default", icon: Server, color: "bg-emerald-50 text-emerald-600" },
          { label: "Monitoring", desc: "Health alerts & audit logs", icon: Activity, color: "bg-amber-50 text-amber-600" },
        ].map((layer) => (
          <div key={layer.label} className="flex items-center gap-2.5 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${layer.color}`}>
              <layer.icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-ink-900">{layer.label}</p>
              <p className="truncate text-[10px] text-ink-500">{layer.desc}</p>
            </div>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-2.5 w-2.5" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SMBsPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Hosting for Small & Medium Businesses — Secure Self-Hosted Apps"
        description="Run ERP, helpdesk, ticketing, and invoicing systems on your own VPS. Your business data stays on your server — secure, private, and fully under your control. No per-seat SaaS fees."
        path="/who-we-serve/smb"
        keywords={["SMB hosting", "small business hosting", "self-hosted ERP", "self-hosted business apps", "VPS for business", "secure business hosting"]}
        faqSchema={faqSchema}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "For SMBs", path: "/who-we-serve/smb" },
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
                <Building2 className="h-4 w-4" />
                For SMBs
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Run your business <br />
                <span className="gradient-text">on your own server</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                ERP, helpdesk, ticketing, invoicing — run the tools your business depends on, on infrastructure you
                control. No third-party SaaS holding your data. No per-seat licensing. Everything private, with a
                dedicated DevOps manager by your side.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/self-hosted-apps" className="btn-secondary btn-lg w-full sm:w-auto">
                  Explore Apps
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="erp" />
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
              <Building2 className="h-4 w-4" />
              Why SMBs
            </span>
            <h2 className="mt-5 heading-lg">Built for the way small businesses run</h2>
            <p className="mt-4 text-body">
              Self-hosted business apps with the control, security, and support you need — and none of the per-seat
              fees that scale with your headcount.
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
                  <Lock className="h-3.5 w-3.5" />
                  Why Self-Host
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Your data stays on your VPS</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Every app, database, and file lives on your server. We never store your data on our infrastructure —
                  only you have access. Open-source apps mean unlimited users, unlimited agents, unlimited clients.
                  No SaaS per-seat pricing model.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Your data stays on your VPS — we never store it",
                    "No per-seat licensing — unlimited users, agents, clients",
                    "Full server control — root access, SSH keys, firewall",
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
                    <Server className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">SaaS vs Self-Hosted</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Monthly cost</span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-lg border border-red-100 bg-red-50/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-red-700">SaaS (per-seat)</span>
                      <span className="text-sm font-bold text-red-700">$15/seat</span>
                    </div>
                    <p className="mt-1 text-[10px] text-red-500">50 agents × $15 = $750/mo</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-red-100">
                      <div className="h-full w-[95%] rounded-full bg-red-400" />
                    </div>
                  </div>
                  <div className="rounded-lg border-2 border-brand-500 bg-brand-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-700">Self-Hosted VPS</span>
                      <span className="text-sm font-bold text-brand-700">$24/mo</span>
                    </div>
                    <p className="mt-1 text-[10px] text-brand-600">Unlimited agents — flat cost</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100">
                      <div className="h-full w-[12%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">Save $726/mo — no per-seat fees</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Server className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your business apps</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                Pair self-hosted apps with the tools that keep them fast, secure, and resilient.
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
