import { Link } from "react-router-dom";
import { Server, Shield, Layers, Cloud, BookOpen, FileText, ExternalLink, ChevronRight, Code2 } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

interface GuideLink {
  label: string;
  slug: string;
}

interface DocSection {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  guides: GuideLink[];
}

const docSections: DocSection[] = [
  {
    icon: Server,
    title: "Server Management",
    desc: "Everything from provisioning a new server to navigating its detail sections, managing SSH access, and the full server user guide.",
    guides: [
      { label: "Creating a server", slug: "server-management/creating-a-server" },
      { label: "Server detail sections", slug: "server-management/server-detail-sections" },
      { label: "Access & SSH", slug: "server-management/access-and-ssh" },
      { label: "Server user guide", slug: "server-management/server-user-guide" },
    ],
  },
  {
    icon: Layers,
    title: "Backup, Caching & Cronjob",
    desc: "The seven backup types, Redis and Varnish caching configuration, and scheduled tasks at the server and application level.",
    guides: [
      { label: "Backups", slug: "backup-caching-cronjob/backups" },
      { label: "Caching (Redis & Varnish)", slug: "backup-caching-cronjob/caching" },
      { label: "Cronjobs", slug: "backup-caching-cronjob/cronjobs" },
    ],
  },
  {
    icon: Shield,
    title: "Firewall, Health Alerts & Other Services",
    desc: "Firewall management, health alerts, the supporting software catalogue, and discount rules that apply across your account.",
    guides: [
      { label: "Firewall", slug: "firewall-health-other/firewall" },
      { label: "Health alerts", slug: "firewall-health-other/health-alerts" },
      { label: "Other services", slug: "firewall-health-other/other-services" },
      { label: "Discount rules", slug: "firewall-health-other/discount-rules" },
    ],
  },
  {
    icon: FileText,
    title: "Application Documentation",
    desc: "The complete reference for every application-level tab — from creating an app to its security, logs, file manager, and backup & restore.",
    guides: [
      { label: "Creating an application", slug: "applications/creating-an-application" },
      { label: "Access", slug: "applications/access" },
      { label: "Services", slug: "applications/services" },
      { label: "Settings", slug: "applications/settings" },
      { label: "Domains", slug: "applications/domains" },
      { label: "File manager", slug: "applications/file-manager" },
      { label: "Logs", slug: "applications/logs" },
      { label: "Security", slug: "applications/security" },
      { label: "Backup & restore", slug: "applications/backup-and-restore" },
    ],
  },
];

export default function DocsPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Documentation — Server, Application & Feature Guides"
        description="Complete documentation for SharkCluster: server management, backups, caching, cronjobs, firewall, health alerts, discounts, other services, and full application-level guides."
        path="/docs"
        keywords={["SharkCluster documentation", "server management guide", "application docs", "backup guide", "firewall configuration", "VPS documentation"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Documentation", path: "/docs" }]}
      />
      <PageHero
        eyebrow="Documentation"
        title="Guides for every"
        highlight="feature and operation"
        description="Complete reference documentation for SharkCluster — from server creation to application deployment, backups to security, and everything in between."
        icon={BookOpen}
      />

      <section className="section pt-8">
        <div className="container-px">
          <div ref={ref} className="grid gap-6 lg:grid-cols-2">
            {docSections.map((doc, i) => (
              <div
                key={doc.title}
                className={`reveal ${visible ? "is-visible" : ""} flex flex-col rounded-2xl border border-ink-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-lg`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <doc.icon className="h-7 w-7" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-ink-900">{doc.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{doc.desc}</p>
                  </div>
                </div>

                <ul className="mt-5 divide-y divide-ink-100 border-t border-ink-100">
                  {doc.guides.map((guide) => (
                    <li key={guide.slug}>
                      <a
                        href={`/docs/${guide.slug}`}
                        className="group/guide flex items-center justify-between gap-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:text-brand-600"
                      >
                        <span>{guide.label}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-ink-300 transition-all group-hover/guide:text-brand-500 group-hover/guide:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* API reference */}
          <div className={`reveal ${visible ? "is-visible" : ""} mt-8`}>
            <Link
              to="/docs/api"
              className="card-hover group mx-auto flex max-w-2xl flex-col items-start gap-4 p-6 sm:flex-row sm:items-center"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <Code2 className="h-7 w-7" />
              </span>
              <span className="flex-1">
                <span className="block font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-brand-600">
                  API Reference
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-500">
                  Drive servers, applications, databases and registries from your own tooling — endpoints, parameters
                  and sample requests.
                </span>
              </span>
              <ChevronRight className="hidden h-5 w-5 shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500 sm:block" />
            </Link>
          </div>

          {/* External resources */}
          <div className={`reveal ${visible ? "is-visible" : ""} mt-8`}>
            <div className="mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 p-6 text-center">
              <Cloud className="mx-auto h-10 w-10 text-brand-500" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Application Panel</h3>
              <p className="mt-2 text-sm text-ink-600">
                Ready to get hands-on? Access the SharkCluster control panel to manage your servers and applications.
              </p>
              <a
                href="https://cloud.sharkcluster.com"
                className="btn-primary mt-5"
              >
                Open cloud.sharkcluster.com
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
