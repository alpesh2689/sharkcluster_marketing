import { Link } from "react-router-dom";
import {
  Globe, Server, Shield, RefreshCw, Lock, UserCog, Check, ArrowRight,
  ChevronRight, Cloud, MapPin, Database, Network, Activity,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "40+", label: "Datacenter locations" },
  { value: "3", label: "Live cloud providers" },
  { value: "0", label: "Vendor lock-in" },
  { value: "100%", label: "Data on your VPS" },
];

const benefits = [
  {
    icon: Cloud,
    title: "Dozens of Global Datacenters",
    desc: "DigitalOcean, OVHcloud, and Contabo — compare and deploy across regions from one panel. Vultr and Hetzner coming soon.",
  },
  {
    icon: Server,
    title: "Multi-Region Management",
    desc: "Manage servers in different regions from a single dashboard. Each server gets its own monitoring, backups, and firewall.",
  },
  {
    icon: Lock,
    title: "Data Sovereignty",
    desc: "Choose where your data lives. Deploy in specific regions for GDPR, data residency, or latency optimization.",
  },
  {
    icon: UserCog,
    title: "Dedicated DevOps Manager",
    desc: "A real engineer who knows your global setup and helps with cross-region architecture and scaling.",
  },
  {
    icon: RefreshCw,
    title: "Portable Backups",
    desc: "Move between providers and regions easily. Your backups aren't trapped — you can leave whenever you want.",
  },
  {
    icon: Network,
    title: "No Vendor Lock-In",
    desc: "Switch providers without rewriting your stack. Compare plans side-by-side and deploy where it makes sense.",
  },
];

const featureRows = [
  {
    icon: MapPin,
    tag: "Global Reach",
    title: "Deploy anywhere in the world",
    desc: "Compare plans across providers with datacenters spanning the globe — from North America to Europe to Asia Pacific. Pick the region that gives your users the lowest latency, and deploy in minutes.",
    points: [
      "DigitalOcean — 12 datacenters across 6 continents",
      "OVHcloud — Europe and beyond",
      "Contabo — global, prepaid",
      "Vultr and Hetzner coming soon",
    ],
    mock: "regions",
    reverse: false,
  },
  {
    icon: Server,
    tag: "Multi-Region",
    title: "One panel for every region",
    desc: "Manage servers across different providers and regions from a single dashboard. Each server gets its own monitoring, backups, firewall, and health alerts — no context switching between provider consoles.",
    points: [
      "Single dashboard for all servers and providers",
      "Per-server monitoring, backups, and firewall",
      "Timezone-aware health alerts",
      "Cross-region architecture support",
    ],
    mock: "servers",
    reverse: true,
  },
  {
    icon: Lock,
    tag: "Data Sovereignty",
    title: "Choose where your data lives",
    desc: "Data residency isn't just a compliance checkbox — it's where your data physically sits. Deploy in specific regions for GDPR, local data laws, or simply to keep data close to your users.",
    points: [
      "Deploy in EU for GDPR compliance",
      "Keep data in-country for residency requirements",
      "Choose regions for latency optimization",
      "Your data stays on your VPS — we never store it",
    ],
    mock: "sovereignty",
    reverse: false,
  },
  {
    icon: RefreshCw,
    tag: "Portability",
    title: "Leave whenever you want",
    desc: "Portable backups mean you're never trapped. Move between providers and regions without rewriting your stack. Compare plans side-by-side and switch when the price or performance makes sense.",
    points: [
      "Portable backups move between providers",
      "No vendor lock-in — switch anytime",
      "Compare plans side-by-side before you deploy",
      "Same panel, same workflow, different provider",
    ],
    mock: "portability",
    reverse: true,
  },
];

const relatedFeatures = [
  { title: "Cloud Providers", path: "/cloud-providers", icon: Cloud },
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Backups & Recovery", path: "/features/backups", icon: RefreshCw },
  { title: "Monitoring", path: "/features/monitoring", icon: Activity },
];

const faqSchema = [
  { q: "Can I deploy servers in multiple regions with SharkCluster?", a: "Yes, SharkCluster supports cloud providers with datacenters across dozens of global locations. You can deploy servers in different regions and manage them all from one panel." },
  { q: "Does SharkCluster work for international teams?", a: "Yes, SharkCluster is designed for global teams with multi-region deployment, timezone-aware monitoring, and support across business hours worldwide." },
  { q: "Can I move my servers between providers?", a: "Yes. Portable backups let you move between providers without rewriting your stack. There is no vendor lock-in — you can switch providers whenever it makes sense." },
];

function MockPanel({ type }: { type: string }) {
  if (type === "regions") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <MapPin className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Global Regions</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">40+ DCs</span>
        </div>
        <div className="space-y-2.5">
          {[
            { region: "North America", dcs: "8 datacenters", provider: "DO · Contabo", color: "bg-brand-50 text-brand-600" },
            { region: "Europe", dcs: "12 datacenters", provider: "DO · OVH · Contabo", color: "bg-blue-50 text-blue-600" },
            { region: "Asia Pacific", dcs: "6 datacenters", provider: "DO · Contabo", color: "bg-emerald-50 text-emerald-600" },
            { region: "India", dcs: "1 datacenter", provider: "DO (BLR1)", color: "bg-amber-50 text-amber-600" },
          ].map((r) => (
            <div key={r.region} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${r.color}`}>
                  <Globe className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{r.region}</p>
                  <p className="text-[10px] text-ink-400">{r.provider}</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-ink-700">{r.dcs}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Compare and deploy across all regions</p>
      </div>
    );
  }

  if (type === "servers") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Server className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Multi-Region Servers</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">All managed</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "prod-us-east", region: "NYC · DigitalOcean", status: "Healthy", color: "bg-emerald-100 text-emerald-700" },
            { name: "prod-eu-west", region: "FRA · OVHcloud", status: "Healthy", color: "bg-emerald-100 text-emerald-700" },
            { name: "prod-ap-south", region: "BLR · DigitalOcean", status: "Alert", color: "bg-amber-100 text-amber-700" },
            { name: "staging-eu", region: "LON · Contabo", status: "Healthy", color: "bg-emerald-100 text-emerald-700" },
          ].map((srv) => (
            <div key={srv.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Server className="h-4 w-4 text-ink-400" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{srv.name}</p>
                  <p className="text-[10px] text-ink-400">{srv.region}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${srv.color}`}>{srv.status}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">One panel for every region and provider</p>
      </div>
    );
  }

  if (type === "sovereignty") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Lock className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Data Sovereignty</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Your VPS</span>
        </div>
        <div className="space-y-2.5">
          {[
            { law: "GDPR", region: "EU datacenters", icon: Shield, color: "bg-blue-50 text-blue-600" },
            { law: "Data Residency", region: "In-country hosting", icon: MapPin, color: "bg-emerald-50 text-emerald-600" },
            { law: "Latency", region: "Closest region to users", icon: Activity, color: "bg-amber-50 text-amber-600" },
          ].map((item) => (
            <div key={item.law} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.color}`}>
                  <item.icon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{item.law}</p>
                  <p className="text-[10px] text-ink-400">{item.region}</p>
                </div>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-3 w-3" />
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Choose where your data physically lives</p>
      </div>
    );
  }

  // portability
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <RefreshCw className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Portable Backups</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">No lock-in</span>
      </div>
      <div className="space-y-2.5">
        {[
          { from: "DigitalOcean NYC", to: "OVHcloud FRA", status: "Migrated", color: "bg-emerald-100 text-emerald-700" },
          { from: "Contabo DEL", to: "DigitalOcean BLR", status: "Ready", color: "bg-blue-100 text-blue-700" },
          { from: "OVHcloud LON", to: "DigitalOcean AMS", status: "Ready", color: "bg-blue-100 text-blue-700" },
        ].map((mig) => (
          <div key={mig.from} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-900">{mig.from}</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${mig.color}`}>{mig.status}</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-ink-400">
              <ArrowRight className="h-3 w-3" />
              <span>{mig.to}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Move between providers — no rewrite needed</p>
    </div>
  );
}

export default function GlobalPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Global Cloud Hosting — Worldwide Infrastructure, One Panel"
        description="Deploy servers across dozens of global datacenters with SharkCluster. Compare providers side-by-side, run self-hosted apps, and keep your data on your VPS — anywhere in the world. No vendor lock-in."
        path="/who-we-serve/global"
        keywords={["global cloud hosting", "worldwide VPS hosting", "international hosting", "multi-region hosting", "global server management", "data sovereignty hosting"]}
        faqSchema={faqSchema}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "For Global", path: "/who-we-serve/global" },
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
                For Global
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Worldwide infrastructure, <br />
                <span className="gradient-text">one panel</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                Deploy servers across dozens of global datacenters. Compare providers side-by-side, run self-hosted
                apps, and keep your data on your VPS — anywhere in the world. No vendor lock-in, portable backups,
                and a dedicated DevOps manager for cross-region architecture.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/cloud-providers" className="btn-secondary btn-lg w-full sm:w-auto">
                  Compare Providers
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="regions" />
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
              <Globe className="h-4 w-4" />
              Why Global
            </span>
            <h2 className="mt-5 heading-lg">Built for worldwide deployment</h2>
            <p className="mt-4 text-body">
              Deploy anywhere, manage from one place, and keep the freedom to leave. Global infrastructure with
              local control.
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
                  <Globe className="h-3.5 w-3.5" />
                  No Lock-In
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Deploy anywhere. Leave anytime.</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  Compare providers side-by-side, deploy in the region that makes sense, and move when it doesn't.
                  Portable backups mean you're never trapped. Your data stays on your VPS — we never store it.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "40+ datacenter locations across 3 providers",
                    "Portable backups move between providers",
                    "No vendor lock-in — switch anytime",
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
                    <span className="text-sm font-bold text-ink-900">Provider Comparison</span>
                  </div>
                  <span className="text-xs font-semibold text-ink-400">Side-by-side</span>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { name: "DigitalOcean", regions: "12 DCs", model: "Hourly", color: "bg-brand-50 text-brand-600" },
                    { name: "OVHcloud", regions: "8 DCs", model: "Hourly", color: "bg-blue-50 text-blue-600" },
                    { name: "Contabo", regions: "11 DCs", model: "Prepaid", color: "bg-emerald-50 text-emerald-600" },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${p.color}`}>
                          <Cloud className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{p.name}</p>
                          <p className="text-[10px] text-ink-400">{p.regions} · {p.model}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-ink-300" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">Compare before you deploy — no lock-in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Server className="h-4 w-4" /> Keep building</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around your global setup</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                Pair global deployment with the tools that keep your servers fast, secure, and portable.
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
