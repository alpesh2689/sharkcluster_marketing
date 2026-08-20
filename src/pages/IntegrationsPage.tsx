import { Link } from "react-router-dom";
import {
  GitBranch, GitMerge, GitPullRequest,
  Boxes, Package, Container,
  Database, Table, FileBox, FileText,
  Cloud, Globe, Network,
  HardDrive,
  CreditCard,
  Server,
  ArrowRight,
  Check, ChevronRight,
  Shield,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { OFFSITE_PER_GB } from "@/content/pricing";

const stats = [
  { value: "13", label: "Live integrations" },
  { value: "7", label: "Categories" },
  { value: "0", label: "Vaporware" },
  { value: "100%", label: "Ready to use" },
];

const categories = [
  { icon: GitBranch, title: "Source Control", desc: "GitHub, GitLab, Bitbucket — deploy with scoped deploy keys" },
  { icon: Container, title: "Containers & Registries", desc: "Docker and SharkCluster Container Registry" },
  { icon: Database, title: "Databases", desc: "MySQL, PostgreSQL, MongoDB, SQLite" },
  { icon: Globe, title: "Edge & DNS", desc: "Cloudflare and Let's Encrypt" },
  { icon: HardDrive, title: "Storage", desc: "S3-compatible object storage for offsite backups" },
  { icon: CreditCard, title: "Payments", desc: "Razorpay for Indian customers — cards, UPI, netbanking" },
  { icon: Server, title: "Platforms", desc: "Self-hosted Supabase deployed from the panel" },
];

const featureRows = [
  {
    icon: GitBranch,
    tag: "Source Control",
    title: "Deploy from GitHub, GitLab, or Bitbucket",
    desc: "Deploy from any of the three major Git providers with scoped deploy keys or access tokens. The panel generates an SSH deploy key scoped to a single repository — safer than a full-account access token.",
    points: [
      "GitHub — deploy from repos with scoped deploy keys",
      "GitLab — deploy from repos with scoped deploy keys",
      "Bitbucket — deploy from repos with scoped deploy keys",
      "Per-repo scoping — not your whole account",
    ],
    mock: "git",
    reverse: false,
  },
  {
    icon: Database,
    tag: "Databases",
    title: "Four database engines, auto-wired",
    desc: "MySQL, PostgreSQL, MongoDB, and SQLite — created and wired into your application automatically. The panel creates the database, a user, and a password, and wires them into the application's configuration.",
    points: [
      "MySQL — default for most PHP applications",
      "PostgreSQL — advanced relational database",
      "MongoDB — document storage for MERN-stack apps",
      "SQLite — file-based for small or single-user apps",
    ],
    mock: "databases",
    reverse: true,
  },
  {
    icon: Globe,
    tag: "Edge & DNS",
    title: "Cloudflare and Let's Encrypt, built in",
    desc: "Cloudflare integration as a per-domain add-on: DNS, CDN, edge proxy, WAF, caching, origin protection, and analytics. Let's Encrypt for free SSL certificates provisioned and renewed automatically.",
    points: [
      "Cloudflare — DNS, CDN, WAF, caching, origin protection, analytics",
      "Let's Encrypt — free SSL provisioned and renewed automatically",
      "Per-domain Cloudflare subscription with trial period",
      "DCV Delegation for SSL auto-renewal",
    ],
    mock: "edge",
    reverse: false,
  },
  {
    icon: HardDrive,
    tag: "Storage",
    title: "S3-compatible offsite backup storage",
    desc: "Offsite backups upload to any S3-compatible object storage endpoint. The local copy is deleted after upload, so an offsite backup exists in exactly one place — the only type that survives server loss.",
    points: [
      "Any S3-compatible endpoint",
      `Offsite backups at ${OFFSITE_PER_GB} per GB`,
      "Local copy deleted after upload",
      "The only backup type that survives server loss",
    ],
    mock: "storage",
    reverse: true,
  },
];

const relatedFeatures = [
  { title: "Deployment", path: "/features/deployment", icon: GitBranch },
  { title: "Databases", path: "/features/databases", icon: Database },
  { title: "Domains & SSL", path: "/features/domains-ssl", icon: Globe },
  { title: "Backups & Recovery", path: "/features/backups", icon: HardDrive },
];

function MockPanel({ type }: { type: string }) {
  if (type === "integrations") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Network className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Verified Integrations</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">13 live</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "GitHub", cat: "Source Control", icon: GitPullRequest },
            { name: "GitLab", cat: "Source Control", icon: GitMerge },
            { name: "Bitbucket", cat: "Source Control", icon: GitBranch },
            { name: "Docker", cat: "Containers", icon: Boxes },
            { name: "Cloudflare", cat: "Edge & DNS", icon: Cloud },
            { name: "Let's Encrypt", cat: "Edge & DNS", icon: Network },
            { name: "S3 Storage", cat: "Storage", icon: HardDrive },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <item.icon className="h-4 w-4 text-ink-500" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{item.name}</p>
                  <p className="text-[10px] text-ink-400">{item.cat}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                <Check className="h-3 w-3" />
                Verified
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Every integration on this page is one you can use today</p>
      </div>
    );
  }

  if (type === "git") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Connect Git Repository</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "GitHub", desc: "github.com", selected: true, icon: GitPullRequest },
            { name: "GitLab", desc: "gitlab.com", selected: false, icon: GitMerge },
            { name: "Bitbucket", desc: "bitbucket.org", selected: false, icon: GitBranch },
          ].map((provider) => (
            <div
              key={provider.name}
              className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
                provider.selected ? "border-brand-500 bg-brand-50" : "border-ink-100 bg-ink-50/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <provider.icon className="h-4 w-4 text-ink-500" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{provider.name}</p>
                  <p className="font-mono text-[10px] text-ink-400">{provider.desc}</p>
                </div>
              </div>
              {provider.selected ? (
                <span className="flex items-center gap-1 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">
                  <Check className="h-3 w-3" />
                  Selected
                </span>
              ) : (
                <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-bold uppercase text-ink-400">Choose</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-ink-100 bg-ink-50/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-500">Deploy Key</span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
              <Check className="h-3 w-3" />
              Scoped
            </span>
          </div>
          <p className="mt-1.5 font-mono text-[10px] text-ink-400">ssh-rsa AAAA•••••••••• repo:acme/web</p>
          <p className="mt-1 text-[10px] text-ink-400">Scoped to a single repository — not your whole account</p>
        </div>
      </div>
    );
  }

  if (type === "databases") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Database className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Create Database</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { name: "MySQL", desc: "Default for PHP", icon: Database, selected: true },
            { name: "PostgreSQL", desc: "Advanced relational", icon: Table, selected: false },
            { name: "MongoDB", desc: "Document storage", icon: FileBox, selected: false },
            { name: "SQLite", desc: "File-based", icon: FileText, selected: false },
          ].map((db) => (
            <div
              key={db.name}
              className={`rounded-lg border px-3 py-2.5 ${
                db.selected ? "border-brand-500 bg-brand-50" : "border-ink-100 bg-ink-50/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <db.icon className={`h-4 w-4 ${db.selected ? "text-brand-600" : "text-ink-400"}`} />
                <span className="text-sm font-semibold text-ink-900">{db.name}</span>
              </div>
              <p className="mt-1 text-[10px] text-ink-400">{db.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-2 border-t border-ink-100 pt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-500">Database</span>
            <span className="font-mono font-semibold text-ink-800">acme_prod</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-500">User</span>
            <span className="font-mono font-semibold text-ink-800">acme_user</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-500">Password</span>
            <span className="font-mono font-semibold text-ink-800">••••••••••</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Auto-wired into application config</span>
        </div>
      </div>
    );
  }

  if (type === "edge") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <Globe className="h-4 w-4 text-brand-600" />
          <span className="text-sm font-semibold text-ink-900">Edge & SSL</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <Cloud className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Cloudflare</p>
                <p className="text-[10px] text-ink-400">DNS · CDN · WAF · Caching</p>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
              <Check className="h-3 w-3" />
              Active
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <Shield className="h-4 w-4 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Let's Encrypt SSL</p>
                <p className="text-[10px] text-ink-400">Free · auto-renewed</p>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
              <Check className="h-3 w-3" />
              Issued
            </span>
          </div>
        </div>
        <div className="mt-3 rounded-lg border border-ink-100 bg-ink-50/50 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-500">Certificate</span>
            <span className="font-mono text-ink-700">acme.com</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs">
            <span className="text-ink-500">Expires</span>
            <span className="font-semibold text-ink-800">in 60 days</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs">
            <span className="text-ink-500">Renewal</span>
            <span className="font-semibold text-emerald-600">DCV Delegation</span>
          </div>
        </div>
      </div>
    );
  }

  // storage
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <HardDrive className="h-4 w-4 text-brand-600" />
        <span className="text-sm font-semibold text-ink-900">S3 Backup Storage</span>
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
          <span className="text-xs font-semibold text-ink-500">Endpoint</span>
          <span className="font-mono text-xs text-ink-800">s3.us-east-2.amazonaws.com</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
          <span className="text-xs font-semibold text-ink-500">Bucket</span>
          <span className="font-mono text-xs text-ink-800">sharkcluster-backups</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
          <span className="text-xs font-semibold text-ink-500">Access Key</span>
          <span className="font-mono text-xs text-ink-800">AKIA••••••••</span>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-ink-100 bg-ink-50/50 p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink-500">Last Backup</span>
          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
            <Check className="h-3 w-3" />
            Uploaded
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-200">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
        </div>
        <p className="mt-2 text-[10px] text-ink-400">Local copy deleted after upload — offsite only</p>
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Integrations — Live, Verified Connections"
        description="Every integration listed here is live today — GitHub, GitLab, Bitbucket, Docker, Cloudflare, S3, MySQL, PostgreSQL, MongoDB, SQLite, Razorpay, Let's Encrypt, and Supabase. No vaporware."
        path="/integrations"
        keywords={["integrations", "GitHub integration", "GitLab integration", "Docker hosting", "Cloudflare integration", "Razorpay", "Supabase hosting", "S3 backups", "Let's Encrypt SSL"]}
        faqSchema={[
          { q: "Are all listed integrations actually implemented?", a: "Yes. Every integration on this page is live today. If it is listed here, it works. If it is not listed here, it does not exist yet." },
          { q: "Why are some integrations missing from the list?", a: "We only list integrations the panel actually drives. We would rather show a shorter list of integrations that work than a longer list of ones that do not." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Integrations", path: "/integrations" },
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
                <Network className="h-4 w-4" />
                Integrations
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Every connection <br />
                <span className="gradient-text">actually implemented</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                The list is short because it is real. Each integration is one the panel actually drives — not a logo
                we licensed. If it is listed here, it works today.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Connect Your Stack
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <MockPanel type="integrations" />
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

      {/* Categories grid */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Network className="h-4 w-4" />
              Categories
            </span>
            <h2 className="mt-5 heading-lg">Seven categories, thirteen integrations</h2>
            <p className="mt-4 text-body">
              Every integration listed here works today. No vaporware — if it is listed here, it works.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <div
                key={cat.title}
                className={`reveal ${visible ? "is-visible" : ""} group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <cat.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">{cat.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{cat.desc}</p>
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

      {/* Highlight section */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-8 lg:p-10`}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700">
                  <Check className="h-3.5 w-3.5" />
                  Honesty
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">Why the list is short</h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                  We could list more names, but we will not put up a logo we cannot drive. Each integration here is one
                  the panel actually runs — not a badge we licensed. A short honest list beats a long logo wall.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    "Every integration listed is live today",
                    "Nothing here is a roadmap item",
                    "A short honest list beats a long logo wall",
                  ].map((point) => (
                    <div key={point} className="rounded-xl border border-ink-200/80 bg-white/80 p-3">
                      <Check className="h-4 w-4 text-brand-600" />
                      <p className="mt-2 text-xs font-semibold leading-snug text-ink-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related features grid */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Network className="h-4 w-4" /> Related features</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Built around your stack</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">Pair these integrations with the features that put them to work.</p>
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
