import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Globe2, Receipt, Server, Timer } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { fetchPublicPlans, API_CONFIGURED, type PublicPlan } from "@/lib/api";
import { formatPrice, pricePlans } from "@/lib/planShaping";

/**
 * Homepage pricing teaser.
 *
 * Replaces the old three-tier card block, which advertised plan names and
 * prices the product does not actually bill. What it sells instead is the thing
 * that IS true and is the real differentiator: you pick a server from a live
 * multi-provider catalogue at catalogue rates, and everything lands on one
 * invoice.
 *
 * The "from" price is read from the same catalogue the configurator uses, so it
 * can never quote a number the customer would not be charged. With no API
 * reachable the section still renders — just without the figure.
 */

const POINTS = [
  { icon: Globe2, title: "Compare providers side by side", desc: "One panel, every connected provider and region — price and specs in the same view." },
  { icon: Timer, title: "Hourly where the provider offers it", desc: "Prorated and destroyable anytime, so a test server costs what it ran for." },
  { icon: Receipt, title: "One invoice for everything", desc: "Servers across providers, backups and add-ons reconciled into a single monthly bill." },
  { icon: Check, title: "No fee added on top", desc: "You pay catalogue rates. There is no separate platform charge stacked on the server price." },
];

export default function PricingTeaser() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [plans, setPlans] = useState<PublicPlan[]>([]);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    const controller = new AbortController();
    fetchPublicPlans(controller.signal)
      .then(setPlans)
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const { from, regionCount, providerCount } = useMemo(() => {
    const priced = pricePlans(plans, "USD");
    if (priced.length === 0) return { from: null, regionCount: 0, providerCount: 0 };
    return {
      from: priced.reduce((min, p) => (p.price < min.price ? p : min)),
      regionCount: new Set(priced.map((p) => p.region)).size,
      providerCount: new Set(priced.map((p) => p.provider)).size,
    };
  }, [plans]);

  return (
    <section className="section bg-ink-50/50">
      <div className="container-px">
        <div
          ref={ref}
          className={`reveal ${visible ? "is-visible" : ""} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}
        >
          <div>
            <span className="eyebrow">
              <Server className="h-4 w-4" />
              Pricing
            </span>
            <h2 className="mt-5 heading-lg">
              Price your server
              <br />
              <span className="gradient-text">before you sign up</span>
            </h2>
            <p className="mt-5 text-body">
              No quote form, no sales call. Choose how much memory you need and where it should run,
              and see the real plans and prices available there — the same ones you'll see in the
              panel when you create the server.
            </p>

            {from && (
              <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-sm font-semibold text-ink-500">Servers from</span>
                <span className="font-display text-4xl font-extrabold text-brand-600">
                  {formatPrice(from.price, "USD")}
                  <span className="text-base font-semibold text-ink-400">/mo</span>
                </span>
                {providerCount > 0 && regionCount > 0 && (
                  <span className="text-sm text-ink-400">
                    across {providerCount} provider{providerCount === 1 ? "" : "s"} and{" "}
                    {regionCount} region{regionCount === 1 ? "" : "s"}
                  </span>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/pricing" className="btn-primary btn-lg">
                See live pricing
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/cloud-providers" className="btn-secondary btn-lg">
                Compare providers
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {POINTS.map((point, i) => (
              <div
                key={point.title}
                className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-lg"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <point.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink-900">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
