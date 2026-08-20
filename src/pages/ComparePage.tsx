import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Check, X, ArrowRight, TrendingUp, Shield, Server, RefreshCw, Users, Zap, DollarSign, Clock, RefreshCcw } from "lucide-react";

const competitors = [
  {
    name: "SharkCluster",
    // Competitors charge a panel fee on top of the server. SharkCluster does
    // not — verified against the billing cycle: invoices carry server, backup,
    // Cloudflare and registry lines, never a plan fee. See /pricing.
    price: "No platform fee",
    features: { freeBackups: true, freeMigrations: true, devopsManager: true, selfHostedApps: true, unlimitedApps: true, multiProvider: true, configDrift: true, vclEditing: true, scopedDeployKeys: true, noPerSeat: true },
    highlighted: true,
  },
  {
    name: "Cloudways",
    price: "$11/mo+",
    features: { freeBackups: false, freeMigrations: true, devopsManager: false, selfHostedApps: false, unlimitedApps: true, multiProvider: true, configDrift: false, vclEditing: false, scopedDeployKeys: false, noPerSeat: true },
  },
  {
    name: "RunCloud",
    price: "$10/mo+",
    features: { freeBackups: false, freeMigrations: false, devopsManager: false, selfHostedApps: false, unlimitedApps: true, multiProvider: true, configDrift: false, vclEditing: false, scopedDeployKeys: false, noPerSeat: true },
  },
  {
    name: "ServerPilot",
    price: "$10/mo+",
    features: { freeBackups: false, freeMigrations: false, devopsManager: false, selfHostedApps: false, unlimitedApps: true, multiProvider: false, configDrift: false, vclEditing: false, scopedDeployKeys: false, noPerSeat: true },
  },
];

const features = [
  { key: "freeBackups", label: "Free Local Backups" },
  { key: "freeMigrations", label: "Unlimited Free Migrations" },
  { key: "devopsManager", label: "Dedicated DevOps Manager" },
  { key: "selfHostedApps", label: "Free Self-Hosted Business Apps" },
  { key: "unlimitedApps", label: "Unlimited Apps Per Server" },
  { key: "multiProvider", label: "Multi-Provider Comparison" },
  { key: "configDrift", label: "Config Drift Detection" },
  { key: "vclEditing", label: "In-Panel VCL Editing" },
  { key: "scopedDeployKeys", label: "Scoped Deploy Keys" },
  { key: "noPerSeat", label: "No Per-Seat Pricing" },
];

export default function ComparePage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="SharkCluster vs Competitors — Compare Cloud Hosting Platforms"
        description="Compare SharkCluster vs Cloudways, RunCloud, and ServerPilot. Free local backups, dedicated DevOps manager, config drift detection, scoped deploy keys, and self-hosted business apps included."
        path="/compare"
        keywords={["SharkCluster vs Cloudways", "cloud hosting comparison", "RunCloud alternative", "ServerPilot alternative", "VPS management panel comparison"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }]}
      />
      <PageHero
        eyebrow="Compare"
        title="SharkCluster vs"
        highlight="the competition"
        description="See how SharkCluster stacks up against other managed cloud hosting platforms. Free local backups, dedicated DevOps manager, config drift detection, and self-hosted business apps — included, not add-ons."
        icon={TrendingUp}
      />

      <section className="section pt-8">
        <div className="container-px">
          {/* Comparison table */}
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} overflow-x-auto`}>
            <table className="w-full min-w-[768px] border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left text-sm font-bold text-ink-900">Feature</th>
                  {competitors.map((c) => (
                    <th key={c.name} className={`p-4 text-center ${c.highlighted ? "rounded-t-xl bg-brand-50" : ""}`}>
                      <span className={`block font-display text-base font-bold ${c.highlighted ? "text-brand-700" : "text-ink-900"}`}>{c.name}</span>
                      <span className={`block text-sm ${c.highlighted ? "text-brand-600" : "text-ink-400"}`}>{c.price}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr key={feature.key} className={i % 2 === 0 ? "bg-ink-50/30" : ""}>
                    <td className="p-4 text-sm font-medium text-ink-700">{feature.label}</td>
                    {competitors.map((c) => (
                      <td key={c.name} className={`p-4 text-center ${c.highlighted ? "bg-brand-50/50" : ""}`}>
                        {c.features[feature.key as keyof typeof c.features] ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-500">
                            <X className="h-4 w-4" />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verification notice */}
          <div className={`reveal ${visible ? "is-visible" : ""} mt-6 flex flex-col gap-3 rounded-2xl border border-ink-200 bg-ink-50/50 p-5 sm:flex-row sm:items-center sm:justify-between`}>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  Verified as of <span className="text-brand-600">TODO_CONFIRM</span>
                </p>
                <p className="text-xs text-ink-500">
                  Competitor features are checked periodically against public documentation. Figures may change — confirm directly with the provider before deciding.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-500 sm:self-auto">
              <RefreshCcw className="h-3.5 w-3.5" />
              Checked periodically
            </span>
          </div>

          {/* Key differentiators */}
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Security by Default", desc: "Closed-by-default firewall, scoped deploy keys, localhost-bound services — not add-ons." },
              { icon: Server, title: "Your Data, Your VPS", desc: "Your application data never touches our infrastructure. The panel manages via SSH — that's it." },
              { icon: Users, title: "Real DevOps Manager", desc: "A dedicated human engineer who knows your setup — not a tier-1 agent reading a script." },
              { icon: Zap, title: "Config Drift Detection", desc: "Live Configuration reads actual running state, surfacing drift before outages." },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`reveal ${visible ? "is-visible" : ""} card-hover group p-6`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-base font-bold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
