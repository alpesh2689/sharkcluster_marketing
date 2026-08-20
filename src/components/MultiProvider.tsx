import { Link } from "react-router-dom";
import { Cloud, Check, ArrowRight, Globe } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const providers = [
  { name: "DigitalOcean", regions: "12 datacenters", billing: "Hourly + monthly invoice" },
  { name: "Contabo", regions: "Global", billing: "Prepaid" },
  { name: "OVH", regions: "Europe & beyond", billing: "Prepaid" },
  { name: "Vultr", regions: "23 locations", billing: "Usage-based" },
  { name: "Hetzner", regions: "EU & US", billing: "Usage-based" },
];

export default function MultiProvider() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="providers" className="section relative overflow-hidden">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: content */}
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
            <span className="eyebrow">
              <Globe className="h-4 w-4" />
              Multi-Provider
            </span>
            <h2 className="mt-5 heading-lg">
              Compare cloud providers
              <br />
              <span className="gradient-text">side-by-side</span>
            </h2>
            <p className="mt-4 text-body">
              No vendor lock-in. SharkCluster lets you compare plans across multiple cloud providers in one view —
              price, specs, and location — so you always get the best deal. Different billing models handled
              transparently, whether it's hourly, prepaid, or usage-based.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Side-by-side plan comparison across providers",
                "Transparent billing — hourly, prepaid, or usage-based",
                "Switch providers without rewriting your stack",
                "Portable backups for easy migration",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-ink-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-base">{point}</span>
                </li>
              ))}
            </ul>

            <Link to="/pricing" className="btn-primary mt-8">
              See Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: provider cards */}
          <div className={`reveal ${visible ? "is-visible" : ""} relative`}>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-500/10 to-transparent blur-2xl" />
            <div className="relative grid gap-3 sm:grid-cols-2">
              {providers.map((provider, i) => (
                <div
                  key={provider.name}
                  className="card-hover p-5"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Cloud className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm font-bold text-ink-900">{provider.name}</span>
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-ink-400">{provider.regions}</p>
                    <p className="text-xs font-medium text-ink-600">{provider.billing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
