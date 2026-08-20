import { Link } from "react-router-dom";
import { Server, GitBranch, Database, RefreshCw, Activity, Terminal, Layers, Zap, Network, Boxes, Gauge, Cloud, Check, ArrowRight, Cpu, Package, Shield, Users, Receipt } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const featureSections = [
  {
    id: "server-management",
    icon: Server,
    title: "Full Server Lifecycle Management",
    description: "Create, monitor, scale, clone, and tear down servers — all from one panel. Every step is visible, every action logged.",
    features: [
      { icon: Cloud, title: "5 Deployment Methods", desc: "Fresh install, Git deploy, Docker image, ZIP upload, or custom migration — choose how your server starts." },
      { icon: Activity, title: "Live Monitoring", desc: "CPU, memory, disk, and network graphs with bandwidth tracking against your plan allowance." },
      { icon: Server, title: "One-Click Scaling", desc: "Resize your server with new pricing shown before you commit. Scale up when traffic grows." },
      { icon: Gauge, title: "Config Drift Detection", desc: "Live Configuration reads actual running state from the machine, surfacing drift from saved config." },
    ],
  },
  {
    id: "backups",
    icon: RefreshCw,
    title: "7 Backup Types for Every Failure Scenario",
    description: "Not seven ways to do the same thing — seven purpose-built mechanisms, each answering a different failure scenario.",
    features: [
      { icon: RefreshCw, title: "Auto Backups", desc: "Provider-native scheduled backups, toggled active or disabled. Marked 'Best Value' where the provider charges for them." },
      { icon: Layers, title: "Snapshots & Images", desc: "On-demand point-in-time snapshots and reusable server image templates with auto-scheduling." },
      { icon: Database, title: "Portable Backups", desc: "The only type designed to leave the provider — for migrating away or building elsewhere." },
      { icon: Server, title: "Clone Server", desc: "Full server duplication with optional different sizing, and a pre-commit cost confirmation." },
    ],
  },
  {
    id: "deployment",
    icon: GitBranch,
    title: "Deploy from Git, ZIP, or Docker",
    description: "Connect GitHub, GitLab, or Bitbucket with scoped deploy keys. Upload a ZIP, pull a Docker image, or start fresh.",
    features: [
      { icon: GitBranch, title: "Scoped Deploy Keys", desc: "Panel-generated SSH keys scoped to a single repository — safer than a full-account access token." },
      { icon: Boxes, title: "Docker Host Support", desc: "Run containers with configurable CPU, memory limits, and private registry credentials." },
      { icon: Terminal, title: "Deployment Scripts", desc: "Per-app build, migration, and cache steps that run automatically on every deploy." },
      { icon: Layers, title: "Staging Environments", desc: "Create a full copy of any application to test changes before touching production." },
    ],
  },
  {
    id: "caching",
    icon: Zap,
    title: "Two-Layer Caching: Redis & Varnish",
    description: "Redis caches inside your application; Varnish caches in front of your web server. Complementary, not competing.",
    features: [
      { icon: Zap, title: "Redis Memory Management", desc: "Max memory ceiling with eviction policy control — noeviction for queues, LRU/LFU for pure cache." },
      { icon: Gauge, title: "Live Config Detection", desc: "Reads actual running Redis config from the machine, surfacing drift from saved panel config." },
      { icon: Terminal, title: "In-Panel VCL Editing", desc: "Fetch currently-running VCL, upload a custom .vcl file — real caching logic expressed directly." },
      { icon: Activity, title: "Varnish Grace Periods", desc: "Serves slightly-stale content during an app outage instead of showing errors to visitors." },
    ],
  },
  {
    id: "multi-provider",
    icon: Cloud,
    title: "Multi-Provider by Design",
    description: "Compare plans across multiple cloud providers side-by-side. No vendor lock-in, transparent billing.",
    features: [
      { icon: Cloud, title: "Side-by-Side Comparison", desc: "Price, specs, and location for multiple providers in one view at server creation time." },
      { icon: Gauge, title: "Transparent Billing", desc: "Hourly, prepaid, or usage-based — each provider's billing model handled transparently." },
      { icon: Database, title: "Portable Backups", desc: "The only backup type designed to leave a provider — for migration or exit." },
      { icon: RefreshCw, title: "No Lock-In", desc: "Switch providers without rewriting your stack. Your apps, databases, and configs move with you." },
    ],
  },
  {
    id: "container-registry",
    icon: Package,
    title: "Container Registry",
    description: "Private Docker registries with repositories, tags, and image history — managed from the same panel as your servers. Push from CI, pull onto your servers, no third party in the path.",
    features: [
      { icon: Package, title: "Private Registries", desc: "Multiple isolated registries with repositories, tags and image history — managed from the same panel as your servers." },
      { icon: GitBranch, title: "Push, Pull & Version", desc: "Standard Docker registry API — any client works. Tag images for versioning and rollback." },
      { icon: Layers, title: "Docker Host Integration", desc: "Applications deployed via Docker pull from your private registry using panel-configured credentials." },
      { icon: Gauge, title: "Storage & Cleanup", desc: "Per-registry storage quotas with live usage tracking, plus retention rules that prune old tags automatically." },
    ],
  },
  // TODO_CONFIRM: confirm engine list with product team before naming engines here
  {
    id: "databases",
    icon: Database,
    title: "Databases for Every Application",
    description: "Created and wired into your application automatically — no manual credential setup. Import, export, and manage from a web database manager.",
    features: [
      { icon: Database, title: "Auto Database Binding", desc: "Panel creates the database, user, and password, then wires them into your app's config — no manual setup." },
      { icon: Terminal, title: "Web Database Manager", desc: "Launch phpMyAdmin or phpPgAdmin on demand — direct access to tables, queries, and exports." },
      { icon: RefreshCw, title: "Import & Export", desc: "Upload .zip or .gz dump files straight into your application's database. One-click export." },
    ],
  },
  // TODO_CONFIRM: confirm engine list with product team before naming engines here
  {
    id: "managed-database-clusters",
    icon: Database,
    title: "Managed Database Clusters",
    description: "Standalone database clusters that outlive any single server. Shared across applications, with reusable parameter groups, automated backups, and connection management.",
    features: [
      { icon: Server, title: "Survives Server Loss", desc: "Data persists even if the server it started on is destroyed — applications reconnect from a new server." },
      { icon: Layers, title: "Reusable Parameter Groups", desc: "Named, versioned bundles of engine settings — define once, apply across clusters. Roll back to undo." },
      { icon: RefreshCw, title: "Automated Backups", desc: "Scheduled, retained, and restorable from the panel — no scripts. Configurable retention so old backups age out." },
      { icon: Database, title: "Connection Management", desc: "Database users, permissions, and connection strings — managed from the panel, no CLI required." },
    ],
  },
];

const platformCapabilities = [
  { icon: Server, title: "Server Management", path: "/features/server-management", desc: "Full lifecycle control", badge: "Core" },
  { icon: RefreshCw, title: "Backups & Recovery", path: "/features/backups", desc: "7 backup types", badge: "Free" },
  { icon: GitBranch, title: "Deployment", path: "/features/deployment", desc: "Git, ZIP & Docker" },
  { icon: Zap, title: "Caching", path: "/features/caching", desc: "Redis & Varnish" },
  { icon: Activity, title: "Monitoring", path: "/features/monitoring", desc: "Health alerts" },
  { icon: Shield, title: "Firewall & Security", path: "/features/firewall", desc: "Closed by default" },
  { icon: Package, title: "Container Registry", path: "/features/container-registry", desc: "Private Docker images" },
  { icon: Database, title: "Databases", path: "/features/databases", desc: "Auto-wired per application" },
  { icon: Database, title: "Managed Database Clusters", path: "/features/managed-databases", desc: "Clusters that outlive servers" },
  { icon: Users, title: "Teams & Permissions", path: "/features/teams", desc: "Per-server, per-app access" },
  { icon: Receipt, title: "Billing & Invoicing", path: "/features/billing", desc: "One invoice, every provider" },
  { icon: Boxes, title: "Self-Hosted Supabase", path: "/features/self-hosted-supabase", desc: "Run your own on a VPS", badge: "New" },
];

export default function FeaturesPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Features — Server Management, Backups, Caching & More"
        description="Explore SharkCluster's full feature set: server lifecycle management, 7 backup types, Git & Docker deployment, Redis & Varnish caching, health alerts, firewall, and multi-provider support."
        path="/features"
        keywords={["server management", "cloud hosting features", "backup types", "Redis caching", "Varnish caching", "VPS management panel", "Git deployment", "Docker hosting"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Features", path: "/features" }]}
      />
      <PageHero
        eyebrow="Powerful Features"
        title="Everything you need to run"
        highlight="production workloads"
        description="From server creation to scaling, backups to security, caching to monitoring — SharkCluster puts the entire server lifecycle in one panel, with expert guidance built into every setting."
        icon={Cpu}
      />

      {/* Platform capabilities grid */}
      <section className="section pt-8">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Cpu className="h-4 w-4" />
              Platform Capabilities
            </span>
            <h2 className="mt-5 heading-lg">Twelve capabilities, one panel</h2>
            <p className="mt-4 text-body">
              Every capability is built into every plan — no add-ons, no upsells. Click any card to dive into the details.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platformCapabilities.map((cap, i) => (
              <Link
                key={cap.title}
                to={cap.path}
                className={`reveal ${visible ? "is-visible" : ""} group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <cap.icon className="h-5.5 w-5.5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-bold text-ink-900">{cap.title}</h3>
                    {cap.badge && (
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                        {cap.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-500">{cap.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature deep-dives */}
      {featureSections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`section ${idx % 2 === 1 ? "relative overflow-hidden bg-ink-50/50" : ""}`}
        >
          {idx % 2 === 1 && <div className="absolute inset-0 -z-10 dot-pattern opacity-30" />}
          <div className="container-px">
            <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
                <section.icon className="h-4 w-4" />
                {section.title.split(":")[0]}
              </span>
              <h2 className="mt-5 heading-lg">{section.title}</h2>
              <p className="mt-4 text-body">{section.description}</p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {section.features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`reveal ${visible ? "is-visible" : ""} group rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:border-brand-200 hover:shadow-lg`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <feature.icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-ink-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <FinalCTA />
    </>
  );
}
