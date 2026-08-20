import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Boxes, Code, FileCode, Layers, Check } from "lucide-react";

const categories = [
  {
    name: "PHP Frameworks",
    icon: FileCode,
    apps: [
      { name: "Laravel", versions: "9, 10, 11, 12, 13", desc: "Elegant PHP framework for web artisans" },
      { name: "WordPress", versions: "Latest", desc: "The world's most popular CMS" },
      { name: "Magento", versions: "Latest", desc: "Powerful ecommerce platform" },
      { name: "Open Journal Systems", versions: "2.4.8 – 3.3.0", desc: "Open-source journal management" },
    ],
  },
  {
    name: "JavaScript & Node.js",
    icon: Code,
    apps: [
      { name: "Node.js / Express", versions: "16, 18, 20", desc: "Fast, minimalist web framework" },
      { name: "Next.js", versions: "Latest", desc: "React framework for production" },
      { name: "MERN Stack", versions: "Latest", desc: "MongoDB, Express, React, Node" },
      { name: "Angular", versions: "Latest", desc: "Platform for mobile and desktop" },
      { name: "Svelte", versions: "Latest", desc: "Cybernetically enhanced web apps" },
      { name: "Strapi", versions: "Latest", desc: "Headless CMS" },
    ],
  },
  {
    name: "Python",
    icon: Layers,
    apps: [
      { name: "Django", versions: "3.11, 3.12, 3.13", desc: "The web framework for perfectionists with deadlines" },
      { name: "Flask", versions: "3.11, 3.12, 3.13", desc: "Lightweight Python web framework" },
    ],
  },
  {
    name: "Other Stacks",
    icon: Boxes,
    apps: [
      { name: "Ruby on Rails", versions: "Latest", desc: "Full-stack Ruby web framework" },
      { name: ".NET", versions: "Latest", desc: "Microsoft's cross-platform framework" },
      { name: "Docker", versions: "Any image", desc: "Run any containerized application" },
      { name: "Plain HTML/CSS/JS", versions: "—", desc: "Static sites and vanilla web apps" },
    ],
  },
];

const databases = [
  { name: "MySQL", desc: "Default for most PHP apps" },
  { name: "PostgreSQL", desc: "Advanced relational database" },
  { name: "MongoDB", desc: "Document storage for MERN" },
  { name: "SQLite", desc: "File-based, for small apps" },
];

export default function SupportedAppsPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Supported Apps — Laravel, WordPress, Magento, Node.js, Docker & More"
        description="Deploy any PHP, Node.js, Python, Ruby, .NET, or Docker application. SharkCluster supports Laravel, WordPress, Magento, Next.js, Django, Flask, Docker, and more with automatic database binding."
        path="/supported-apps"
        keywords={["supported apps", "Laravel hosting", "WordPress hosting", "Magento hosting", "Node.js hosting", "Docker hosting", "Django hosting", "supported frameworks"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Supported Apps", path: "/supported-apps" }]}
      />
      <PageHero
        eyebrow="Supported Apps"
        title="Deploy any stack"
        highlight="in minutes"
        description="From Laravel to WordPress, Node.js to Python, Docker to .NET — SharkCluster supports the technologies you already use. Each app gets automatic database binding, free SSL, and a staging environment."
        icon={Boxes}
      />

      <section className="section pt-8">
        <div className="container-px">
          <div ref={ref} className="space-y-12">
            {categories.map((category, ci) => (
              <div key={category.name} className={`reveal ${visible ? "is-visible" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <category.icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-display text-2xl font-bold text-ink-900">{category.name}</h2>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.apps.map((app, i) => (
                    <div
                      key={app.name}
                      className={`reveal ${visible ? "is-visible" : ""} card-hover group p-5`}
                      style={{ transitionDelay: `${(ci * 4 + i) * 50}ms` }}
                    >
                      <h3 className="font-display text-base font-bold text-ink-900">{app.name}</h3>
                      <p className="mt-1 text-sm text-ink-500">{app.desc}</p>
                      {app.versions !== "—" && app.versions !== "Latest" && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {app.versions.split(", ").map((v) => (
                            <span key={v} className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-600">
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                      {(app.versions === "Latest" || app.versions === "—" || app.versions === "Any image") && (
                        <div className="mt-3">
                          <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-600">
                            {app.versions}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Databases */}
          <div className={`reveal ${visible ? "is-visible" : ""} mt-16`}>
            <h2 className="font-display text-2xl font-bold text-ink-900">Supported Databases</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {databases.map((db) => (
                <div key={db.name} className="card-hover p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                      <Check className="h-3 w-3" />
                    </span>
                    <h3 className="font-display text-sm font-bold text-ink-900">{db.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-ink-500">{db.desc}</p>
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
