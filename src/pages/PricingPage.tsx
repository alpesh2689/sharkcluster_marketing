import { Check, ArrowRight, Sparkles, Server, RefreshCw, UserCog, Shield, Database, Cloud, CircleHelp as HelpCircle, ReceiptText, Layers, Wallet, PackagePlus, FileText, ChevronRight, Boxes } from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for a single site or small app",
    price: "$11",
    period: "/mo",
    features: [
      "1 server included",
      "Unlimited applications",
      "Free local backups",
      "Free SSL certificates",
      "In-browser SSH terminal",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Business",
    desc: "For growing teams running multiple apps",
    price: "$29",
    period: "/mo",
    features: [
      "Everything in Starter, plus:",
      "Unlimited free migrations",
      "Dedicated DevOps manager",
      "Priority expert support",
      "Staging environments",
      "Health alerts & monitoring",
      "Free self-hosted business apps",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    desc: "For agencies and high-volume workloads",
    price: "Custom",
    period: "",
    features: [
      "Everything in Business, plus:",
      "Multi-server management",
      "Team permissions & roles",
      "Offsite backup storage",
      "Custom service catalogue",
      "SLA & dedicated support",
      "Volume discounts",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const includedFree = [
  { icon: RefreshCw, label: "Unlimited free migrations" },
  { icon: Shield, label: "Free SSL certificates" },
  { icon: Server, label: "Free local backups" },
  { icon: Database, label: "Managed databases" },
  { icon: Cloud, label: "Multi-provider support" },
  { icon: UserCog, label: "Dedicated DevOps manager" },
];

const pricingFaqSchema = [
  { q: "How much does SharkCluster cost?", a: "SharkCluster plans start at $11/month for Starter, $29/month for Business (which includes a dedicated DevOps manager and free migrations), and custom pricing for Enterprise. Cloud provider costs are billed separately at provider rates." },
  { q: "Do you require a credit card to sign up?", a: "No. You can sign up and explore the panel with no credit card required. There are no lock-in contracts — you can cancel anytime." },
  { q: "Are there hidden fees?", a: "No. Your SharkCluster plan fee is transparent. Cloud provider server costs are billed separately at the provider's rates. Optional add-ons like offsite backup storage are clearly priced per GB." },
  { q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes are prorated based on your billing cycle." },
];

function BillingMock() {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <ReceiptText className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Monthly Invoice</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Transparent</span>
      </div>
      <div className="space-y-2.5">
        {[
          { label: "SharkCluster Business", desc: "Plan fee", amount: "$29.00", color: "text-ink-900" },
          { label: "DigitalOcean server", desc: "4 vCPU · 8GB · NYC", amount: "$48.00", color: "text-ink-900" },
          { label: "Offsite backup storage", desc: "20 GB", amount: "$4.00", color: "text-ink-900" },
          { label: "Account credit", desc: "Applied", amount: "-$10.00", color: "text-emerald-600" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div>
              <p className="text-sm font-semibold text-ink-900">{row.label}</p>
              <p className="text-[10px] text-ink-400">{row.desc}</p>
            </div>
            <span className={`font-mono text-sm font-bold ${row.color}`}>{row.amount}</span>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-lg border-2 border-brand-200 bg-brand-50 px-3 py-2.5">
          <p className="text-sm font-bold text-ink-900">Total</p>
          <span className="font-mono text-sm font-bold text-brand-700">$71.00</span>
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">One invoice — plan fee + server costs, no markup</p>
    </div>
  );
}

export default function PricingPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Pricing — Simple, Transparent Cloud Hosting Plans"
        description="Simple pricing with no hidden fees. Starter at $11/mo, Business at $29/mo with dedicated DevOps manager, or custom Enterprise pricing. Every plan includes free backups, SSL, and unlimited apps."
        path="/pricing"
        keywords={["cloud hosting pricing", "VPS hosting cost", "managed hosting plans", "server management pricing", "dedicated devops manager"]}
        faqSchema={pricingFaqSchema}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]}
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
                <Sparkles className="h-4 w-4" />
                Simple Pricing
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Choose your <br />
                <span className="gradient-text">perfect plan</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Transparent pricing with no hidden fees. Every plan includes free backups, free SSL, and
                unlimited apps. Cloud provider costs are billed separately at provider rates — no markup.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/contact" className="btn-secondary btn-lg w-full sm:w-auto">
                  Talk to Sales
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <BillingMock />
            </div>
          </div>
        </div>
      </section>

      {/* Included free bar */}
      <div className="container-px pb-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-ink-200 bg-ink-50/50 p-5">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-ink-400">
            Included free with every plan
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {includedFree.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium text-ink-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <section className="section pt-8">
        <div className="container-px">
          <div ref={ref} className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`reveal ${visible ? "is-visible" : ""} relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-brand-300 bg-white shadow-2xl shadow-brand-500/15 lg:-translate-y-3"
                    : "border-ink-200 bg-white shadow-sm hover:border-brand-200 hover:shadow-lg"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-brand-500/30">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="font-display text-xl font-bold text-ink-900">{plan.name}</h3>
                  <p className="mt-1 text-sm text-ink-500">{plan.desc}</p>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold text-ink-900">{plan.price}</span>
                  <span className="text-sm font-medium text-ink-400">{plan.period}</span>
                </div>

                <a
                  href={plan.name === "Enterprise" ? "/contact" : "https://cloud.sharkcluster.com/register"}
                  className={`mt-6 ${plan.highlighted ? "btn-primary" : "btn-secondary"} w-full justify-center`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>

                <ul className="mt-6 space-y-3 border-t border-ink-100 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className={feature.endsWith(":") ? "font-semibold text-ink-800" : "text-ink-600"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className={`reveal ${visible ? "is-visible" : ""} mt-8 text-center text-sm text-ink-400`}>
            All plans have no lock-in contracts. No credit card required to get started. Cloud provider costs billed separately.
          </p>
        </div>
      </section>

      {/* How billing works */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl`}>
            <div className="mb-8 text-center">
              <span className="eyebrow">
                <ReceiptText className="h-4 w-4" />
                Billing
              </span>
              <h2 className="mt-5 heading-lg">How billing works</h2>
              <p className="mt-4 text-body">
                Your SharkCluster plan fee covers the control panel, automation, and support — it does not include
                the underlying cloud servers. Here is exactly what you are paying for, and what is billed separately.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink-200 bg-white p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <ReceiptText className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink-900">Plan fee vs. server costs</h3>
                </div>
                <p className="text-sm leading-relaxed text-ink-500">
                  The SharkCluster plan fee is separate from cloud provider server costs. Servers are billed at the
                  provider's own rates and passed through to your invoice with no markup. The plan fee covers the
                  panel, automation, migrations, SSL, and support.
                </p>
              </div>

              <div className="rounded-2xl border border-ink-200 bg-white p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Layers className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink-900">Provider billing models</h3>
                </div>
                <p className="text-sm leading-relaxed text-ink-500">
                  Providers bill differently — hourly, prepaid, or usage-based — and the panel handles each model
                  transparently so you always know what you owe before you deploy.{" "}
                  <a href="/cloud-providers" className="font-medium text-brand-600 underline-offset-2 hover:underline">Compare providers &rarr;</a>
                </p>
              </div>

              <div className="rounded-2xl border border-ink-200 bg-white p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Wallet className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink-900">Account credit</h3>
                </div>
                <p className="text-sm leading-relaxed text-ink-500">
                  You can add credit to your account and apply it toward any invoice — plan fees, server costs, and
                  add-ons alike. Credit is applied automatically when an invoice is generated.
                </p>
              </div>

              <div className="rounded-2xl border border-ink-200 bg-white p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <PackagePlus className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink-900">Optional add-ons</h3>
                </div>
                <ul className="space-y-2 text-sm text-ink-500">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-500">&bull;</span>
                    <span>Offsite backup storage — priced per GB (TODO_CONFIRM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-500">&bull;</span>
                    <span>Cloudflare integration — priced per domain (TODO_CONFIRM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-500">&bull;</span>
                    <span>Block storage volumes — priced per GB (TODO_CONFIRM)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-ink-200 bg-ink-50/50 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink-900">GST-compliant invoicing (India)</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">
                      Indian customers receive GST-compliant invoices with TDS handling built in.{" "}
                      <a href="/who-we-serve/india" className="font-medium text-brand-600 underline-offset-2 hover:underline">Learn more about India billing &rarr;</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-ink-400">
              Container Registry and Managed Databases are priced separately from plan fees and server costs (TODO_CONFIRM).
            </p>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="section pt-0">
        <div className="container-px">
          <div className="mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 p-8 text-center">
            <HelpCircle className="mx-auto h-10 w-10 text-brand-500" />
            <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Still have questions about pricing?</h3>
            <p className="mt-2 text-body-sm">Check our full FAQ or talk to our team — we're happy to help you find the right plan.</p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/faq" className="btn-secondary">View FAQ</a>
              <a href="/contact" className="btn-primary">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
