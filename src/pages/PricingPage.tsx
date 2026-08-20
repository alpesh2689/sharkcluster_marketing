import { ArrowRight, Sparkles, Server, RefreshCw, UserCog, Shield, Database, Cloud, CircleHelp as HelpCircle, ReceiptText, Layers, Wallet, FileText } from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "react-router-dom";
import PlanConfigurator from "@/components/pricing/PlanConfigurator";
import AddonPricing from "@/components/pricing/AddonPricing";
import { useEffect, useMemo, useState } from "react";
import { fetchPublicPlans, API_CONFIGURED, type PublicPlan } from "@/lib/api";
import { pricePlans, formatPrice } from "@/lib/planShaping";


const includedFree = [
  { icon: RefreshCw, label: "Unlimited free migrations" },
  { icon: Shield, label: "Free SSL certificates" },
  { icon: Server, label: "Free local backups" },
  { icon: Database, label: "Managed databases" },
  { icon: Cloud, label: "Multi-provider support" },
  { icon: UserCog, label: "Dedicated DevOps manager" },
];

// NOTE: answers below restate the trial terms in prose. If src/content/trial.ts
// changes, re-read these — they will not update themselves.
const pricingFaqSchema = [
  { q: "How much does SharkCluster cost?", a: "There are three plans — Starter for a single site or small app, Business for teams running multiple apps, and custom pricing for Enterprise. See the pricing table for current rates. Cloud provider server costs are billed separately at the provider's own rates." },
  { q: "Do you require a credit card to sign up?", a: "No. You can sign up and explore the panel with no credit card required. There are no lock-in contracts — you can cancel anytime." },
  { q: "Are there hidden fees?", a: "No. You pay the catalogue rate for the servers you run — there is no separate platform fee added on top. Optional add-ons, such as offsite backup storage, are charged only if you use them and appear as their own invoice lines." },
  { q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes are prorated based on your billing cycle." },
];

/**
 * Sample monthly invoice.
 *
 * Line items mirror what the billing cycle actually generates — server charges
 * per provider, backup storage, Cloudflare, registry — and credit applied
 * against the total. There is deliberately NO "plan fee" line: the product does
 * not issue one. SharkCluster's margin is inside the server selling price,
 * which is what "no markup on top" means.
 *
 * Server amounts come from the live catalogue so the example can never quote a
 * price the customer would not actually be charged.
 */
function BillingMock() {
  const [plans, setPlans] = useState<PublicPlan[]>([]);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    const controller = new AbortController();
    fetchPublicPlans(controller.signal)
      .then(setPlans)
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const priced = useMemo(() => pricePlans(plans, "USD"), [plans]);

  // Two servers on different providers — the whole point of the panel is that
  // they arrive on one invoice.
  const picks = useMemo(() => {
    const byProvider = new Map<string, ReturnType<typeof pricePlans>[number]>();
    for (const p of priced) {
      if ((p.memory_gb ?? 0) < 4) continue;
      const existing = byProvider.get(p.provider);
      if (!existing || p.price < existing.price) byProvider.set(p.provider, p);
    }
    return [...byProvider.values()].sort((a, b) => b.price - a.price).slice(0, 2);
  }, [priced]);

  const CREDIT = 10;
  const serverTotal = picks.reduce((sum, p) => sum + p.price, 0);
  const total = Math.max(serverTotal - CREDIT, 0);

  const rows =
    picks.length > 0
      ? [
          ...picks.map((p) => ({
            label: `${p.provider_name} server`,
            desc: [p.vcpus ? `${p.vcpus} vCPU` : null, p.memory_gb ? `${p.memory_gb}GB` : null,
                   p.region_city || p.region].filter(Boolean).join(" · "),
            amount: formatPrice(p.price, "USD"),
            color: "text-ink-900",
          })),
          { label: "Account credit", desc: "Applied", amount: `-${formatPrice(CREDIT, "USD")}`, color: "text-emerald-600" },
        ]
      : [];

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <ReceiptText className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Monthly Invoice</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
          Example
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="space-y-2.5">
          {[
            { label: "Server charges", desc: "Per server, at catalogue rates" },
            { label: "Backup storage", desc: "Offsite, per GB used" },
            { label: "Cloudflare", desc: "Per domain, per period" },
            { label: "Account credit", desc: "Applied against the total" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold text-ink-900">{row.label}</p>
                <p className="text-[10px] text-ink-400">{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {rows.map((row) => (
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
            <span className="font-mono text-sm font-bold text-brand-700">{formatPrice(total, "USD")}</span>
          </div>
        </div>
      )}

      <p className="mt-3 text-center text-[10px] text-ink-400">
        Every provider on one invoice — at catalogue rates, with no fee added on top
      </p>
    </div>
  );
}

export default function PricingPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Pricing — Simple, Transparent Cloud Hosting Plans"
        description="Simple pricing with no hidden fees — Starter, Business and custom Enterprise plans. Every plan includes free local backups, free SSL, and unlimited apps per server. Cloud provider costs billed separately."
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

      {/* Server plan configurator — real catalogue pricing, same flow as the
          panel's quick create form. */}
      <section className="section pt-8">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <Server className="h-4 w-4" />
              Server pricing
            </span>
            <h2 className="mt-5 heading-lg">Price your server</h2>
            <p className="mt-4 text-body">
              Choose how much memory you need and where it should run. These are the live catalogue
              rates — the same plans and prices you'll see in the panel when you create the server.
            </p>
          </div>

          <div className="mt-12">
            <PlanConfigurator />
          </div>
        </div>
      </section>

      {/* How billing works */}
      <section className="section pt-0">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl`}>
            <div className="mb-8 text-center">
              <span className="eyebrow">
                <ReceiptText className="h-4 w-4" />
                Billing
              </span>
              <h2 className="mt-5 heading-lg">How billing works</h2>
              <p className="mt-4 text-body">
                You pay for the servers you run, at the rates shown above, plus any add-ons you actually use.
                There is no separate platform charge stacked on top. Here is exactly what lands on an invoice.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink-200 bg-white p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <ReceiptText className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink-900">What you actually pay for</h3>
                </div>
                <p className="text-sm leading-relaxed text-ink-500">
                  Servers, billed at the catalogue rate you saw before you created them, and any add-ons you use.
                  There is no separate plan or platform fee on the invoice — the panel, automation, migrations,
                  SSL and support are not billed as line items.
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
                  <Link to="/cloud-providers" className="font-medium text-brand-600 underline-offset-2 hover:underline">Compare providers &rarr;</Link>
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
                  You can add credit to your account and apply it toward any invoice — server costs and add-ons
                  alike. Credit is applied automatically when an invoice is generated, and shows as its own line.
                </p>
              </div>

              <AddonPricing />
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
                      <Link to="/who-we-serve/india" className="font-medium text-brand-600 underline-offset-2 hover:underline">Learn more about India billing &rarr;</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-ink-400">
              Container Registry and Managed Database clusters are billed separately from server costs, and appear
              as their own invoice lines.
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
              <Link to="/faq" className="btn-secondary">View FAQ</Link>
              <Link to="/contact" className="btn-primary">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
