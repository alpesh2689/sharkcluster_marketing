import { Link } from "react-router-dom";
import {
  Globe, Server, Shield, RefreshCw, Database, Lock, UserCog,
  Receipt, Check, ArrowRight, ChevronRight, MapPin, Clock,
  Cloud, Building2, CreditCard, FileText, Headset, Zap,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "IST", label: "Business hours support" },
  { value: "1+", label: "India datacenter regions" },
  { value: "₹0", label: "Per-seat or per-agent fees" },
  { value: "100%", label: "Data on your VPS" },
];

const benefits = [
  {
    icon: Lock,
    title: "Data Residency",
    desc: "Choose providers with India datacenters to keep your data within the country for compliance and performance.",
  },
  {
    icon: UserCog,
    title: "Local Support Hours",
    desc: "Our support team and dedicated DevOps managers are available during IST business hours — not just US time zones.",
  },
  {
    icon: Server,
    title: "Self-Hosted Business Apps",
    desc: "Run ERP, helpdesk, and invoicing on your own VPS — no SaaS per-seat fees, no data leaving your server.",
  },
  {
    icon: RefreshCw,
    title: "Free Migrations",
    desc: "Moving from an Indian host? We migrate your sites and applications for free, unlimited times.",
  },
  {
    icon: Receipt,
    title: "GST-Compliant Invoicing",
    desc: "Invoices issued with correct CGST, SGST and IGST treatment, and TDS handling with section and rate recorded — so your CA gets what they need without a spreadsheet in between.",
  },
  {
    icon: Cloud,
    title: "Multi-Provider Choice",
    desc: "Compare plans across providers with India datacenters side-by-side, and deploy where it makes sense for latency and price.",
  },
];

const featureRows = [
  {
    icon: MapPin,
    tag: "Data Residency",
    title: "Host where your data belongs — in India",
    desc: "SharkCluster supports cloud providers with datacenters in India, so you can keep your data within the country for compliance, latency, and peace of mind. Compare providers side-by-side and deploy where your customers are.",
    points: [
      "DigitalOcean Bangalore datacenter available",
      "Compare plans across providers in one view",
      "No vendor lock-in — switch providers without rewriting your stack",
      "Portable backups move between providers easily",
    ],
    mock: "datacenter",
    reverse: false,
  },
  {
    icon: Clock,
    tag: "IST Support",
    title: "Real engineers during your working hours",
    desc: "Our support team operates across time zones including IST business hours. Your dedicated DevOps manager is available when you are — not at 3am your time. Real engineers who know your setup, not tier-1 agents reading a script.",
    points: [
      "Support during IST business hours, not just US time zones",
      "Dedicated DevOps manager who knows your infrastructure",
      "Real engineers, not tier-1 agents",
      "Help with scaling, architecture, and migrations",
    ],
    mock: "support",
    reverse: true,
  },
  {
    icon: Receipt,
    tag: "GST & TDS",
    title: "Invoices your CA will actually thank you for",
    desc: "Invoices are issued with the correct CGST, SGST and IGST treatment, and TDS handling with section and rate recorded. No spreadsheet in between, no back-and-forth at month-end — your finance team gets what they need from the invoice itself.",
    points: [
      "CGST, SGST and IGST treatment applied correctly",
      "TDS deduction support with section and rate recorded",
      "One consolidated invoice across every provider",
      "Pay by UPI or card — methods that work for Indian businesses",
    ],
    mock: "invoice",
    reverse: false,
  },
  {
    icon: Server,
    tag: "Self-Hosted",
    title: "Run your business apps — no per-seat fees",
    desc: "Run ERPNext, Odoo, Zammad, Invoice Ninja and more on your own VPS. Your operational data never leaves your server. Unlimited users, unlimited agents, unlimited clients — no SaaS per-seat pricing model.",
    points: [
      "ERP systems — ERPNext, Odoo on your VPS",
      "Helpdesk & ticketing — no per-agent pricing",
      "Invoicing & billing — financial data stays private",
      "Database created and wired in automatically",
    ],
    mock: "apps",
    reverse: true,
  },
];

const relatedFeatures = [
  { title: "Self-Hosted Apps", path: "/self-hosted-apps", icon: Server },
  { title: "Cloud Providers", path: "/cloud-providers", icon: Cloud },
  { title: "Free Migrations", path: "/features/deployment", icon: RefreshCw },
  { title: "Teams & Permissions", path: "/features/teams", icon: UserCog },
];

const faqSchema = [
  { q: "Does SharkCluster offer local data hosting for India?", a: "Yes, SharkCluster supports cloud providers with datacenters in India, allowing you to keep your data within the country for data residency compliance." },
  { q: "Is there local support for Indian customers?", a: "Yes, our support team operates across time zones including IST business hours. Your dedicated DevOps manager is available during your working hours." },
  { q: "Are invoices GST-compliant for Indian businesses?", a: "Yes. Invoices are issued with correct CGST, SGST and IGST treatment, and TDS handling with section and rate recorded — so your finance team gets what they need without a spreadsheet in between." },
];

function MockPanel({ type }: { type: string }) {
  if (type === "datacenter") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <MapPin className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">India Datacenters</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
        </div>
        <div className="space-y-2.5">
          {[
            { provider: "DigitalOcean", city: "Bangalore", code: "BLR1", latency: "12ms", color: "bg-brand-50 text-brand-600" },
            { provider: "OVHcloud", city: "Mumbai", code: "Coming soon", latency: "—", color: "bg-ink-100 text-ink-500" },
            { provider: "Contabo", city: "Delhi NCR", code: "Coming soon", latency: "—", color: "bg-ink-100 text-ink-500" },
          ].map((dc) => (
            <div key={dc.provider} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${dc.color}`}>
                  <Cloud className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{dc.provider}</p>
                  <p className="text-[10px] text-ink-400">{dc.city} · {dc.code}</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-ink-700">{dc.latency}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Keep your data within India for compliance</p>
      </div>
    );
  }

  if (type === "support") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Headset className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Support Hours</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">IST</span>
        </div>
        <div className="space-y-2.5">
          {[
            { day: "Mon — Fri", hours: "9:00 — 18:00 IST", status: "Online", color: "bg-emerald-100 text-emerald-700" },
            { day: "Saturday", hours: "10:00 — 14:00 IST", status: "Online", color: "bg-emerald-100 text-emerald-700" },
            { day: "Sunday", hours: "Emergency only", status: "On-call", color: "bg-amber-100 text-amber-700" },
          ].map((slot) => (
            <div key={slot.day} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{slot.day}</p>
                  <p className="text-[10px] text-ink-400">{slot.hours}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${slot.color}`}>{slot.status}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2">
          <UserCog className="h-3.5 w-3.5 text-brand-600" />
          <span className="text-xs font-medium text-brand-700">Dedicated DevOps manager — real engineer</span>
        </div>
      </div>
    );
  }

  if (type === "invoice") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <FileText className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Tax Invoice</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">GST</span>
        </div>
        <div className="space-y-2">
          {[
            { label: "CGST", rate: "9%", amount: "₹2,160", color: "text-ink-700" },
            { label: "SGST", rate: "9%", amount: "₹2,160", color: "text-ink-700" },
            { label: "IGST", rate: "—", amount: "₹0", color: "text-ink-400" },
            { label: "TDS (s.194)", rate: "2%", amount: "₹480", color: "text-ink-700" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Receipt className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{row.label}</p>
                  <p className="text-[10px] text-ink-400">Rate: {row.rate}</p>
                </div>
              </div>
              <span className={`font-mono text-sm font-bold ${row.color}`}>{row.amount}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <CreditCard className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Pay by UPI or card — CA-ready invoice</span>
        </div>
      </div>
    );
  }

  // apps
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Server className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Business Apps</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Self-Hosted</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "ERP", val: "ERPNext · Odoo", icon: Building2, color: "bg-brand-50 text-brand-600" },
          { label: "Helpdesk", val: "Zammad · osTicket", icon: Headset, color: "bg-blue-50 text-blue-600" },
          { label: "Invoicing", val: "Invoice Ninja", icon: Receipt, color: "bg-emerald-50 text-emerald-600" },
          { label: "Productivity", val: "Nextcloud · BookStack", icon: FileText, color: "bg-amber-50 text-amber-600" },
        ].map((app) => (
          <div key={app.label} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
            <div className="flex items-center gap-2">
              <span className={`flex h-6 w-6 items-center justify-center rounded-md ${app.color}`}>
                <app.icon className="h-3 w-3" />
              </span>
              <span className="text-xs font-medium text-ink-500">{app.label}</span>
            </div>
            <p className="mt-2 text-[11px] font-semibold leading-snug text-ink-900">{app.val}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
        <Check className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-xs font-medium text-emerald-700">Unlimited users — no per-seat fees</span>
      </div>
    </div>
  );
}

export default function IndiaPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Cloud Hosting for India — Local Data, Local Support"
        description="SharkCluster for India: host on your own VPS with local data residency, local support hours, and self-hosted business apps. Free migrations, dedicated DevOps manager, and no per-seat fees."
        path="/who-we-serve/india"
        keywords={["India cloud hosting", "VPS hosting India", "local data hosting India", "Indian hosting provider", "self-hosted apps India", "GST compliant invoicing"]}
        faqSchema={faqSchema}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "For India", path: "/who-we-serve/india" },
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
                <Globe className="h-4 w-4" />
                For India
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Cloud hosting built <br />
                <span className="gradient-text">for India</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Host on your own VPS with local data residency, support during IST business hours, and
                self-hosted business apps. Free migrations, a dedicated DevOps manager, and no per-seat fees —
                with GST-compliant invoicing that your CA will thank you for.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="datacenter" />
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
              <Zap className="h-4 w-4" />
              Why India
            </span>
            <h2 className="mt-5 heading-lg">Built for the way Indian teams work</h2>
            <p className="mt-4 text-body">
              Local data residency, support during your hours, and self-hosted business apps — with the control,
              security, and compliance you need.
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
                  Why India
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Your data in India. Your apps on your VPS.</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Choose providers with India datacenters to keep your data within the country. Run your business
                  apps on your own VPS — no third-party SaaS holding sensitive information, no per-seat licensing.
                  GST-compliant invoicing keeps your finance team happy.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Data residency — keep your data within India",
                    "IST business hours support from real engineers",
                    "GST-compliant invoices with TDS handling",
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
                    <Database className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">SaaS vs Self-Hosted</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Monthly cost</span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-lg border border-red-100 bg-red-50/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-red-700">SaaS (per-seat)</span>
                      <span className="text-sm font-bold text-red-700">₹1,200/seat</span>
                    </div>
                    <p className="mt-1 text-[10px] text-red-500">50 users × ₹1,200 = ₹60,000/mo</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-red-100">
                      <div className="h-full w-[95%] rounded-full bg-red-400" />
                    </div>
                  </div>
                  <div className="rounded-lg border-2 border-brand-500 bg-brand-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-700">Self-Hosted VPS</span>
                      <span className="text-sm font-bold text-brand-700">₹2,000/mo</span>
                    </div>
                    <p className="mt-1 text-[10px] text-brand-600">Unlimited users — flat cost</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100">
                      <div className="h-full w-[8%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">Save ₹58,000/mo — no per-seat fees</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Server className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your India setup</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                Pair local data residency with the tools that keep your apps fast, secure, and resilient.
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
