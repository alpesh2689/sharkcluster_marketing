import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Boxes, Code, FileCode, Layers, Check, ArrowRight, ChevronRight,
  Database, Server, Shield, GitBranch, Search, Cloud, Terminal,
  Zap, Package, HardDrive, Container, Boxes as BoxesIcon, Sparkles,
  Filter, LayoutGrid,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

interface AppEntry {
  name: string;
  category: string;
  versions: string;
  desc: string;
  badge?: string;
}

const allApps: AppEntry[] = [
  { name: "Laravel", category: "PHP", versions: "9 – 13", desc: "Elegant PHP framework for web artisans", badge: "Popular" },
  { name: "WordPress", category: "PHP", versions: "Latest", desc: "The world's most popular CMS", badge: "Popular" },
  { name: "Magento", category: "PHP", versions: "Latest", desc: "Powerful ecommerce platform" },
  { name: "Open Journal Systems", category: "PHP", versions: "2.4.8 – 3.3.0", desc: "Open-source journal management" },
  { name: "Node.js / Express", category: "JavaScript", versions: "16, 18, 20", desc: "Fast, minimalist web framework", badge: "Popular" },
  { name: "Next.js", category: "JavaScript", versions: "Latest", desc: "React framework for production" },
  { name: "MERN Stack", category: "JavaScript", versions: "Latest", desc: "MongoDB, Express, React, Node" },
  { name: "Angular", category: "JavaScript", versions: "Latest", desc: "Platform for mobile and desktop" },
  { name: "Svelte", category: "JavaScript", versions: "Latest", desc: "Cybernetically enhanced web apps" },
  { name: "Strapi", category: "JavaScript", versions: "Latest", desc: "Headless CMS" },
  { name: "Django", category: "Python", versions: "3.11 – 3.13", desc: "The web framework for perfectionists with deadlines" },
  { name: "Flask", category: "Python", versions: "3.11 – 3.13", desc: "Lightweight Python web framework" },
  { name: "Ruby on Rails", category: "Other", versions: "Latest", desc: "Full-stack Ruby web framework" },
  { name: ".NET", category: "Other", versions: "Latest", desc: "Microsoft's cross-platform framework" },
  { name: "Docker", category: "Other", versions: "Any image", desc: "Run any containerized application", badge: "Flexible" },
  { name: "Plain HTML/CSS/JS", category: "Other", versions: "—", desc: "Static sites and vanilla web apps" },
];

const categories = [
  { name: "All", icon: LayoutGrid },
  { name: "PHP", icon: FileCode },
  { name: "JavaScript", icon: Code },
  { name: "Python", icon: Layers },
  { name: "Other", icon: Boxes },
];

const databases = [
  { name: "MySQL", desc: "Default for most PHP apps", color: "bg-brand-50 text-brand-600" },
  { name: "PostgreSQL", desc: "Advanced relational database", color: "bg-blue-50 text-blue-600" },
  { name: "MongoDB", desc: "Document storage for MERN", color: "bg-emerald-50 text-emerald-600" },
  { name: "SQLite", desc: "File-based, for small apps", color: "bg-amber-50 text-amber-600" },
];

const deploySteps = [
  { icon: Search, title: "Pick your stack", desc: "Choose from PHP, Node.js, Python, Ruby, .NET, or Docker." },
  { icon: Database, title: "Database auto-wired", desc: "The panel creates the database, user, and credentials — no manual setup." },
  { icon: Shield, title: "SSL & firewall", desc: "Free Let's Encrypt certificate and closed-by-default firewall, automatically." },
  { icon: ArrowRight, title: "Deploy", desc: "Your app is live with a domain, database, and staging environment." },
];

const stats = [
  { value: "16+", label: "Supported stacks" },
  { value: "4", label: "Database engines" },
  { value: "5", label: "Deploy methods" },
  { value: "∞", label: "Apps per server" },
];

function HeroMock() {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Boxes className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">App Catalogue</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">16+ stacks</span>
      </div>
      <div className="space-y-2">
        {[
          { name: "Laravel", cat: "PHP", versions: "9 – 13", icon: FileCode, color: "bg-brand-50 text-brand-600", badge: "Popular" },
          { name: "Node.js", cat: "JavaScript", versions: "16, 18, 20", icon: Code, color: "bg-blue-50 text-blue-600", badge: "Popular" },
          { name: "Django", cat: "Python", versions: "3.11 – 3.13", icon: Layers, color: "bg-emerald-50 text-emerald-600" },
          { name: "Docker", cat: "Other", versions: "Any image", icon: Container, color: "bg-amber-50 text-amber-600", badge: "Flexible" },
        ].map((app) => (
          <div key={app.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5 transition-colors hover:border-brand-200 hover:bg-brand-50/30">
            <div className="flex items-center gap-2.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${app.color}`}>
                <app.icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{app.name}</p>
                <p className="text-[10px] text-ink-400">{app.cat} · v{app.versions}</p>
              </div>
            </div>
            {app.badge ? (
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">{app.badge}</span>
            ) : (
              <Check className="h-4 w-4 text-emerald-500" />
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">Pick a stack — database auto-wired, SSL included</p>
    </div>
  );
}

export default function SupportedAppsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { ref, visible } = useReveal<HTMLDivElement>();

  const filteredApps = useMemo(() => {
    return allApps.filter((app) => {
      const matchesCategory = activeCategory === "All" || app.category === activeCategory;
      const matchesSearch = search === "" || app.name.toLowerCase().includes(search.toLowerCase()) || app.desc.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Seo
        title="Supported Apps — Laravel, WordPress, Magento, Node.js, Docker & More"
        description="Deploy any PHP, Node.js, Python, Ruby, .NET, or Docker application. SharkCluster supports Laravel, WordPress, Magento, Next.js, Django, Flask, Docker, and more with automatic database binding."
        path="/supported-apps"
        keywords={["supported apps", "Laravel hosting", "WordPress hosting", "Magento hosting", "Node.js hosting", "Docker hosting", "Django hosting", "supported frameworks"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Supported Apps", path: "/supported-apps" }]}
      />

      {/* Split hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-300/15 blur-3xl" />
          <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-blue-300/10 blur-3xl" />
        </div>
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
                <Boxes className="h-4 w-4" />
                Supported Apps
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Deploy any stack <br />
                <span className="gradient-text">in minutes</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                From Laravel to WordPress, Node.js to Python, Docker to .NET — SharkCluster supports the
                technologies you already use. Each app gets automatic database binding, free SSL, and a
                staging environment. Filter and search below to find your stack.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/self-hosted-apps" className="btn-secondary btn-lg w-full sm:w-auto">
                  Self-Hosted Business Apps
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <HeroMock />
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

      {/* Interactive app catalogue */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Sparkles className="h-4 w-4" />
              App Catalogue
            </span>
            <h2 className="mt-5 heading-lg">Find your stack</h2>
            <p className="mt-4 text-body">
              Filter by category or search by name. Every stack gets its database created and wired in
              automatically — no manual credential setup.
            </p>
          </div>

          {/* Search bar */}
          <div className="mx-auto mt-10 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search apps, frameworks, stacks..."
                className="w-full rounded-xl border border-ink-200 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-ink-900 shadow-sm transition-all placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.name
                    ? "border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/20"
                    : "border-ink-200 bg-white text-ink-600 hover:border-brand-200 hover:bg-brand-50/50 hover:text-brand-700"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.name}
              </button>
            ))}
          </div>

          {/* App grid */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app, i) => (
              <div
                key={app.name}
                className={`reveal ${visible ? "is-visible" : ""} group relative flex flex-col rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      {app.category === "PHP" ? <FileCode className="h-5 w-5" /> : app.category === "JavaScript" ? <Code className="h-5 w-5" /> : app.category === "Python" ? <Layers className="h-5 w-5" /> : app.name === "Docker" ? <Container className="h-5 w-5" /> : <Boxes className="h-5 w-5" />}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-ink-900">{app.name}</h3>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{app.category}</p>
                    </div>
                  </div>
                  {app.badge && (
                    <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                      {app.badge}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{app.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                  <div className="flex flex-wrap gap-1">
                    {app.versions !== "—" && app.versions !== "Latest" && app.versions !== "Any image" && (
                      app.versions.split(", ").map((v) => (
                        <span key={v} className="rounded-md bg-ink-100 px-2 py-0.5 text-[10px] font-semibold text-ink-600">
                          {v}
                        </span>
                      ))
                    )}
                    {(app.versions === "Latest" || app.versions === "—" || app.versions === "Any image") && (
                      <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-600">
                        {app.versions}
                      </span>
                    )}
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                    <Check className="h-4 w-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredApps.length === 0 && (
            <div className="mt-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-400">
                <Search className="h-8 w-8" />
              </div>
              <p className="mt-4 font-display text-lg font-bold text-ink-900">No apps found</p>
              <p className="mt-1 text-sm text-ink-500">Try a different search or category filter.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="btn-secondary mt-5"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How deployment works */}
      <section className="section bg-ink-50/40 pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl`}>
            <div className="text-center">
              <span className="eyebrow">
                <Terminal className="h-4 w-4" />
                How It Works
              </span>
              <h2 className="mt-5 heading-lg">From pick to deploy in four steps</h2>
              <p className="mt-4 text-body">
                No config files, no manual database setup. Pick your stack and the panel handles the rest.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {deploySteps.map((step, i) => (
                <div
                  key={step.title}
                  className={`reveal ${visible ? "is-visible" : ""} relative rounded-2xl border border-ink-200 bg-white p-6`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="absolute right-4 top-4 font-display text-2xl font-extrabold text-ink-100">
                    {i + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Databases */}
      <section className="section pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl`}>
            <div className="text-center">
              <span className="eyebrow">
                <Database className="h-4 w-4" />
                Databases
              </span>
              <h2 className="mt-5 heading-lg">Four database engines, auto-wired</h2>
              <p className="mt-4 text-body">
                The panel creates the database, user, and password, then wires them into your app's config
                automatically. No manual credential setup — ever.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {databases.map((db, i) => (
                <div
                  key={db.name}
                  className={`reveal ${visible ? "is-visible" : ""} group rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${db.color} transition-transform group-hover:scale-110`}>
                    <Database className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-sm font-bold text-ink-900">{db.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{db.desc}</p>
                  <div className="mt-3 flex items-center gap-1.5 border-t border-ink-100 pt-3">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-[10px] font-semibold text-ink-600">Auto-created & wired in</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
