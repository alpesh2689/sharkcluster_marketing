import { Link } from "react-router-dom";
import {
  Receipt, Server, Shield, GitBranch, Users, RefreshCw, ArrowRight, Check,
  ChevronRight, Layers, Wallet, CreditCard, Upload, TrendingUp, AlertTriangle,
  FileText, Clock,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const billingFeatures = [
  { icon: Layers, title: "Unified Invoice", desc: "Hourly, prepaid, and usage-based charges reconciled into one monthly invoice" },
  { icon: Wallet, title: "Account Credit", desc: "Credit balance and notes applied against invoices automatically" },
  { icon: CreditCard, title: "Autopay", desc: "Save a card and we charge it automatically when an invoice is issued" },
  { icon: Upload, title: "Manual Payment", desc: "Bank transfer with proof upload and verification — no autopay required" },
  { icon: Receipt, title: "GST & TDS", desc: "CGST, SGST, IGST broken out per invoice — TDS certificate tracking" },
  { icon: TrendingUp, title: "Cost Visibility", desc: "Scaling and cloning show new pricing before you confirm — no surprises" },
];

const featureRows = [
  {
    icon: Layers,
    tag: "Unified",
    title: "One invoice, every provider",
    desc: "Each cloud provider bills differently — DigitalOcean hourly, Contabo prepaid, Vultr usage-based. SharkCluster reconciles all of them into a single monthly invoice. You see one line item per server and add-on, not a separate bill per provider, and the underlying provider billing model is handled underneath so you do not have to reason about it.",
    points: [
      "Hourly billing reconciled into a single monthly invoice",
      "Prepaid balances tracked and applied against usage",
      "Usage-based charges surfaced as line items, not surprises",
      "One invoice per month — not one per provider",
    ],
    mock: "invoice",
    reverse: false,
  },
  {
    icon: CreditCard,
    tag: "Autopay",
    title: "Autopay with retry and honest warnings",
    desc: "Save a card and we charge it automatically when an invoice is issued. If a charge fails, we retry on a schedule before taking further action. State plainly: repeated autopay failure leads to suspension of your servers and services. Keep a valid card on file or pay manually before the due date to avoid this.",
    points: [
      "Saved card charged automatically on invoice issue",
      "Retry schedule on failed charges before further action",
      "Repeated failure leads to suspension — keep a valid card on file",
      "Pay manually before the due date to avoid autopay dependency",
    ],
    mock: "autopay",
    reverse: true,
  },
  {
    icon: Upload,
    tag: "Manual",
    title: "Manual payment and proof upload",
    desc: "Pay by bank transfer and upload your payment receipt. We reconcile the proof against the invoice before marking it paid — the invoice stays open until verification completes, so you can see the status at every step.",
    points: [
      "Bank transfer with proof upload and verification",
      "Invoice stays open until proof is reconciled",
      "Payment status visible at every step",
      "No autopay required — manual payment is a first-class path",
    ],
    mock: "manual",
    reverse: false,
  },
  {
    icon: Receipt,
    tag: "India",
    title: "GST and TDS for India",
    desc: "Invoices for India include CGST, SGST, and IGST as applicable, broken out by tax component. You can record a TDS section and rate against a payment, and track the TDS certificate so your tax filings are complete.",
    points: [
      "CGST, SGST, and IGST broken out per invoice",
      "TDS section and rate recordable against payments",
      "TDS certificate tracking for tax filings",
      "GST-compliant invoices for Indian businesses",
    ],
    mock: "gst",
    reverse: true,
  },
];

const stats = [
  { value: "1", label: "Invoice per month" },
  { value: "3", label: "Billing models reconciled" },
  { value: "2", label: "Payment methods (autopay, manual)" },
  { value: "GST", label: "TDS for India" },
];

const relatedFeatures = [
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Teams & Permissions", path: "/features/teams", icon: Users },
  { title: "Backups & Recovery", path: "/features/backups", icon: RefreshCw },
  { title: "Deployment", path: "/features/deployment", icon: GitBranch },
];

function MockPanel({ type }: { type: string }) {
  if (type === "invoice") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <FileText className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Invoice #INV-2024-08</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Issued</span>
        </div>
        <div className="space-y-2">
          {[
            { label: "prod-web-01 · DigitalOcean", sub: "Hourly", amount: "$24.00" },
            { label: "db-cluster-02 · Contabo", sub: "Prepaid", amount: "$18.00" },
            { label: "cache-01 · Vultr", sub: "Usage-based", amount: "$6.50" },
            { label: "Block storage · 160 GB", sub: "Add-on", amount: "$3.20" },
          ].map((line) => (
            <div key={line.label} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div>
                <p className="text-xs font-semibold text-ink-900">{line.label}</p>
                <p className="text-[10px] font-medium text-ink-400">{line.sub}</p>
              </div>
              <span className="text-sm font-bold text-ink-900">{line.amount}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2.5">
          <span className="text-xs font-bold uppercase tracking-wide text-brand-700">Total due</span>
          <span className="text-base font-extrabold text-brand-700">$51.70</span>
        </div>
      </div>
    );
  }

  if (type === "autopay") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <CreditCard className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Autopay</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Active</span>
        </div>
        <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-10 items-center justify-center rounded bg-ink-900 text-[8px] font-bold text-white">VISA</span>
              <div>
                <p className="text-sm font-semibold text-ink-900">•••• 4242</p>
                <p className="text-[10px] text-ink-400">Expires 08/27</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600">Charged</span>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-ink-400" />
              <span className="text-xs font-medium text-ink-500">Retry schedule</span>
            </div>
            <span className="text-xs font-semibold text-ink-700">3 attempts · 2 days apart</span>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">Repeated failure leads to suspension — keep a valid card on file</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "manual") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Upload className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Manual Payment</span>
          </div>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">Pending</span>
        </div>
        <div className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-500">Invoice #INV-2024-08</span>
            <span className="text-sm font-bold text-ink-900">$51.70</span>
          </div>
        </div>
        <div className="mt-3 rounded-lg border-2 border-dashed border-ink-200 bg-ink-50/30 p-4 text-center">
          <Upload className="mx-auto h-6 w-6 text-ink-300" />
          <p className="mt-2 text-xs font-semibold text-ink-600">Upload payment receipt</p>
          <p className="text-[10px] text-ink-400">Bank transfer proof — PDF, PNG, or JPG</p>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
          <Clock className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">Invoice stays open until proof is reconciled</span>
        </div>
      </div>
    );
  }

  // gst
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Receipt className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">GST & TDS</span>
        </div>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">India</span>
      </div>
      <div className="space-y-2">
        {[
          { label: "CGST", rate: "9%", amount: "$4.65" },
          { label: "SGST", rate: "9%", amount: "$4.65" },
          { label: "IGST", rate: "—", amount: "—" },
        ].map((tax) => (
          <div key={tax.label} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-ink-900">{tax.label}</p>
              <p className="text-[10px] font-medium text-ink-400">Rate {tax.rate}</p>
            </div>
            <span className="text-sm font-bold text-ink-900">{tax.amount}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-ink-100 bg-ink-50/50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-ink-400" />
            <span className="text-xs font-semibold text-ink-700">TDS certificate</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Tracked</span>
        </div>
        <p className="mt-1.5 text-[10px] text-ink-400">Section 194C · Rate 2%</p>
      </div>
    </div>
  );
}

export default function BillingPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Billing & Invoicing — One Invoice Across Every Provider"
        description="One monthly invoice covering your plan, servers across every provider, and add-ons. Hourly, prepaid and usage-based billing reconciled into a single auditable invoice, with autopay, credit, manual payment, and GST/TDS for India."
        path="/features/billing"
        keywords={["unified invoicing", "cloud hosting billing", "multi-provider billing", "GST billing", "TDS billing", "autopay", "account credit", "invoice audit", "India hosting billing"]}
        faqSchema={[
          { q: "How does billing work across multiple cloud providers?", a: "SharkCluster reconciles each provider's billing model — hourly, prepaid, or usage-based — into a single monthly invoice. You see one line item per server and add-on, not a separate bill per provider." },
          { q: "What happens if an autopay charge fails?", a: "We retry the charge on a schedule. If repeated attempts fail, your account is suspended. You can avoid this by keeping a valid card on file or by paying manually before the due date." },
          { q: "Can I pay by bank transfer?", a: "Yes. Bank transfer is supported with proof upload and verification — you upload your payment receipt and we reconcile it against the invoice before marking it paid." },
          { q: "Does SharkCluster support GST and TDS for India?", a: "Yes. Invoices include CGST/SGST/IGST as applicable, and you can record a TDS section and rate with certificate tracking for your tax filings." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Billing & Invoicing", path: "/features/billing" },
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
                <Receipt className="h-4 w-4" />
                Billing & Invoicing
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Billing you can <br />
                <span className="gradient-text">actually audit</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                One invoice covering your plan, your servers across every provider, and your add-ons — with the
                provider's own billing model handled underneath.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  View Your Invoice
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="invoice" />
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

      {/* Billing features grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Receipt className="h-4 w-4" />
              Billing
            </span>
            <h2 className="mt-5 heading-lg">One invoice, every provider, every line item</h2>
            <p className="mt-4 text-body">
              Each cloud provider bills differently — DigitalOcean hourly, Contabo prepaid, Vultr usage-based.
              SharkCluster reconciles all of them into a single monthly invoice. You see one line item per server
              and add-on, not a separate bill per provider.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {billingFeatures.map((feature, i) => (
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

      {/* Cost visibility highlight */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Cost Visibility
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Cost visibility before you commit</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Scaling a server or cloning it shows the new pricing before you confirm — not after. You see the
                  delta against your current invoice, so a scaling decision never becomes a surprise on next month's bill.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Scaling operations show new pricing before confirmation", "Clone operations show the additional cost upfront", "Delta against current invoice visible before you commit"].map((point) => (
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
                    <TrendingUp className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-ink-900">Cost Preview</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Scaling</span>
                </div>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
                    <span className="text-xs font-semibold text-ink-500">Current cost</span>
                    <span className="text-sm font-bold text-ink-900">$24.00/mo</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border-2 border-brand-500 bg-brand-50 px-3 py-2.5">
                    <span className="text-xs font-semibold text-brand-600">New cost</span>
                    <span className="text-sm font-bold text-brand-700">$48.00/mo</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-amber-700">Delta</span>
                  <span className="text-sm font-extrabold text-amber-700">+$24.00/mo</span>
                </div>
                <p className="mt-3 text-center text-[10px] text-ink-400">Shown before you commit — no surprises</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Shield className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your billing</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair billing with the tools that keep your infrastructure organized, recoverable, and deployable.</p>
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
