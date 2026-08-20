import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

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

export default function Pricing() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-300/15 blur-3xl" />
      </div>

      <div className="container-px">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
          <span className="eyebrow">
            <Sparkles className="h-4 w-4" />
            Simple Pricing
          </span>
          <h2 className="mt-5 heading-lg">Choose your perfect plan</h2>
          <p className="mt-4 text-body">
            Transparent pricing with no hidden fees. Every plan includes free local backups, free SSL, and unlimited apps.
            Cloud provider costs are billed separately at provider rates.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
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
                href={plan.name === "Enterprise" ? "#contact" : "https://cloud.sharkcluster.com/register"}
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
          All plans have no lock-in contracts. No credit card required to get started.
        </p>
      </div>
    </section>
  );
}
