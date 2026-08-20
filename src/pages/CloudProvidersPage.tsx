import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Cloud, Check, ArrowRight, Globe, Server, Zap, Shield, RefreshCw, CreditCard } from "lucide-react";

const providers = [
  {
    name: "DigitalOcean",
    regions: "12 datacenters",
    billing: "Hourly + monthly invoice",
    billingIcon: Zap,
    desc: "Reliable SSD cloud servers with a simple pricing model. Great for most workloads.",
    badge: "Popular",
    comingSoon: false,
    accent: "blue",
  },
  {
    name: "OVHcloud",
    regions: "Europe & beyond",
    billing: "Prepaid",
    billingIcon: CreditCard,
    desc: "European infrastructure with strong data sovereignty and competitive pricing.",
    badge: "Sovereign",
    comingSoon: false,
    accent: "emerald",
  },
  {
    name: "Contabo",
    regions: "Global",
    billing: "Prepaid",
    billingIcon: CreditCard,
    desc: "Generous specs at budget-friendly prices. Excellent value for RAM-heavy workloads.",
    badge: "Best value",
    comingSoon: false,
    accent: "amber",
  },
  {
    name: "Vultr",
    regions: "23 locations",
    billing: "Usage-based",
    billingIcon: RefreshCw,
    desc: "High-performance SSD servers across 23 global locations with flexible billing.",
    badge: "Coming Soon",
    comingSoon: true,
    accent: "slate",
  },
  {
    name: "Hetzner",
    regions: "EU & US",
    billing: "Usage-based",
    billingIcon: RefreshCw,
    desc: "German engineering at unbeatable price-to-performance ratios. Popular with developers.",
    badge: "Coming Soon",
    comingSoon: true,
    accent: "slate",
  },
];

const accentMap: Record<string, { bg: string; text: string; hoverBg: string; badge: string }> = {
  brand: { bg: "bg-brand-50", text: "text-brand-600", hoverBg: "group-hover:bg-brand-500", badge: "bg-brand-100 text-brand-700" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", hoverBg: "group-hover:bg-blue-500", badge: "bg-blue-100 text-blue-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", hoverBg: "group-hover:bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", hoverBg: "group-hover:bg-amber-500", badge: "bg-amber-100 text-amber-700" },
  slate: { bg: "bg-ink-100", text: "text-ink-400", hoverBg: "group-hover:bg-ink-400", badge: "bg-ink-100 text-ink-500" },
};

const billingModels = [
  {
    icon: Zap,
    title: "Hourly",
    desc: "Billed as you use, added to your monthly invoice.",
    examples: "DigitalOcean",
  },
  {
    icon: CreditCard,
    title: "Prepaid",
    desc: "Collected before the server is created.",
    examples: "Contabo, OVHcloud",
  },
  {
    icon: RefreshCw,
    title: "Usage-based",
    desc: "Billed on your monthly invoice based on consumption.",
    examples: "Vultr, Hetzner — coming soon",
  },
];

const comparisonFeatures = [
  { label: "Billing model", digitalocean: "Hourly + monthly", ovhcloud: "Prepaid", contabo: "Prepaid" },
  { label: "Datacenter regions", digitalocean: "12 regions", ovhcloud: "Europe & global", contabo: "11 datacenters" },
  { label: "Best for", digitalocean: "Most workloads", ovhcloud: "Compliance & EU", contabo: "RAM-heavy workloads" },
  { label: "Status", digitalocean: "Available", ovhcloud: "Available", contabo: "Available" },
];

export default function CloudProvidersPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Cloud Providers — Compare DigitalOcean, Contabo, OVH, Vultr & More"
        description="Compare cloud provider plans side-by-side in one view. SharkCluster supports DigitalOcean, Contabo, and OVHcloud, with Vultr and Hetzner coming soon. Transparent billing — no vendor lock-in."
        path="/cloud-providers"
        keywords={["cloud providers", "DigitalOcean hosting", "Contabo hosting", "OVHcloud hosting", "Vultr hosting", "Hetzner hosting", "cloud provider comparison"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Cloud Providers", path: "/cloud-providers" }]}
      />
      <PageHero
        eyebrow="Cloud Providers"
        title="Compare cloud providers"
        highlight="side-by-side"
        description="No vendor lock-in. SharkCluster lets you compare plans across multiple cloud providers in one view — price, specs, and location — so you always get the best deal. Different billing models handled transparently."
        icon={Cloud}
      />

      {/* Provider cards */}
      <section className="section pt-8">
        <div className="container-px">
          <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider, i) => {
              const accent = accentMap[provider.accent];
              return (
                <div
                  key={provider.name}
                  className={`reveal ${visible ? "is-visible" : ""} group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 ${
                    provider.comingSoon
                      ? "border-ink-200 opacity-75"
                      : "border-ink-200 shadow-sm hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
                  }`}
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                >
                  {/* Accent bar */}
                  {!provider.comingSoon && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  )}

                  <div className="mb-4 flex items-center justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${accent.bg} ${accent.text} ${!provider.comingSoon ? accent.hoverBg + " group-hover:text-white" : ""}`}>
                      <Cloud className="h-6 w-6" />
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${accent.badge}`}>
                      {provider.badge}
                    </span>
                  </div>

                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-ink-900">{provider.name}</h3>
                    {provider.comingSoon && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-ink-400">{provider.regions}</p>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{provider.desc}</p>

                  <div className="mt-4 flex items-center gap-2 border-t border-ink-100 pt-4">
                    {provider.comingSoon ? (
                      <span className="text-sm font-medium text-ink-400">Integration in progress</span>
                    ) : (
                      <>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm font-medium text-ink-600">{provider.billing}</span>
                      </>
                    )}
                  </div>

                  {!provider.comingSoon && (
                    <a
                      href={`/cloud-providers/${provider.name.toLowerCase()}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                    >
                      {`Explore ${provider.name}`}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Globe className="h-4 w-4" />
              At a Glance
            </span>
            <h2 className="mt-5 heading-lg">Compare providers at a glance</h2>
            <p className="mt-4 text-body">
              Every provider handles billing and regions differently. Here's how they stack up — so you can pick the right one before you deploy.
            </p>
          </div>

          <div className={`reveal ${visible ? "is-visible" : ""} mt-10 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50/50">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">Feature</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-brand-600">DigitalOcean</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">OVHcloud</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">Contabo</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 1 ? "bg-ink-50/30" : ""}>
                      <td className="px-5 py-4 text-sm font-semibold text-ink-700">{row.label}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-brand-700">{row.digitalocean}</td>
                      <td className="px-5 py-4 text-sm text-ink-600">{row.ovhcloud}</td>
                      <td className="px-5 py-4 text-sm text-ink-600">{row.contabo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Billing models */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <CreditCard className="h-4 w-4" />
              Transparent Billing
            </span>
            <h2 className="mt-5 heading-lg">Transparent billing, no surprises</h2>
            <p className="mt-4 text-body">
              Providers bill differently — hourly, prepaid, or usage-based. SharkCluster handles each model transparently so you always know what you owe before you deploy.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {billingModels.map((model, i) => (
              <div
                key={model.title}
                className={`reveal ${visible ? "is-visible" : ""} group rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:border-brand-200 hover:shadow-lg`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <model.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-ink-900">{model.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{model.desc}</p>
                <p className="mt-3 text-xs font-medium text-ink-400">{model.examples}</p>
              </div>
            ))}
          </div>

          {/* Bottom banner */}
          <div className={`reveal ${visible ? "is-visible" : ""} mt-10`}>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-ink-200 bg-white p-6 text-center sm:flex-row sm:text-left">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                <Server className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-base font-bold text-ink-900">
                  Switch providers without rewriting your stack
                </h3>
                <p className="mt-1 text-sm text-ink-600">
                  Portable backups and unified management mean you're never locked in. Move between providers whenever you want.
                </p>
              </div>
              <a href="https://cloud.sharkcluster.com/register" className="btn-primary whitespace-nowrap">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
