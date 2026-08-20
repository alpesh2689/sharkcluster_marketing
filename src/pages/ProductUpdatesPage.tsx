import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { FileText, Calendar, Check, Zap, Shield, Server, RefreshCw, Activity, Database, Cloud, Boxes } from "lucide-react";

type Update = {
  date: string;
  title: string;
  category: string;
  desc: string;
  icon: typeof Activity;
  badge: string;
};

const updates: Update[] = [];

// TODO_CONFIRM — candidate entries awaiting verification before publishing.
// Each must be confirmed as actually shipped before rendering on the page.
const TODO_CONFIRM: Update[] = [
  {
    date: "Aug 2026",
    title: "Config Drift Detection for Redis & Varnish",
    category: "New Feature",
    desc: "Live Configuration now reads actual running Redis and Varnish config from the machine, surfacing drift from saved panel config before it causes an outage.",
    icon: Activity,
    badge: "New",
  },
  {
    date: "Aug 2026",
    title: "Scoped Deploy Keys for Git Deployment",
    category: "Security",
    desc: "Panel-generated SSH deploy keys scoped to a single repository — safer than a full-account access token. Supports GitHub, GitLab, and Bitbucket.",
    icon: Shield,
    badge: "New",
  },
  {
    date: "Jul 2026",
    title: "7 Backup Types with Retention Controls",
    category: "Backups",
    desc: "Auto backups, snapshots, server images, custom path backups, portable backups, full server backups, and cloning — each with configurable retention.",
    icon: RefreshCw,
    badge: "Enhancement",
  },
  {
    date: "Jul 2026",
    title: "In-Panel VCL Editing for Varnish",
    category: "Caching",
    desc: "Fetch currently-running VCL from the server and upload custom .vcl files directly from the panel. No SSH required.",
    icon: Zap,
    badge: "New",
  },
  {
    date: "Jul 2026",
    title: "Self-Hosted Business Apps Catalogue", // TODO_CONFIRM — unverified; confirm which apps are actually supported before publishing.
    category: "Self-Hosting",
    desc: "Deploy ERPNext, Odoo, Zammad, osTicket, Invoice Ninja, and more on a supported stack, with the database created and wired in automatically. Each app gets free SSL.",
    icon: Boxes,
    badge: "New",
  },
  {
    date: "Jun 2026",
    title: "Multi-Provider Plan Comparison",
    category: "Platform",
    desc: "Compare DigitalOcean, Contabo, OVH, Vultr, and Hetzner plans side-by-side at server creation time. Price, specs, and location in one view.",
    icon: Cloud,
    badge: "Enhancement",
  },
  {
    date: "Jun 2026",
    title: "Sandboxed File Manager with Monaco Editor",
    category: "Security",
    desc: "Edit files in the browser — scoped to your application root, with editing restricted to htdocs. Server-enforced boundaries, not just UI-hidden.",
    icon: Server,
    badge: "New",
  },
  {
    date: "May 2026",
    title: "Health Alerts with Tuning Guidance",
    category: "Monitoring",
    desc: "Threshold-based alerting on CPU, RAM, disk, and failed services. Built-in guidance recommends disk at 80% and explains alert fatigue.",
    icon: Activity,
    badge: "Enhancement",
  },
  {
    date: "May 2026",
    title: "Managed Databases: MongoDB & SQLite Support",
    category: "Databases",
    desc: "MongoDB and SQLite now supported alongside MySQL and PostgreSQL. Auto-generated credentials wired into your app automatically.",
    icon: Database,
    badge: "New",
  },
];

export default function ProductUpdatesPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Product Updates — Latest Platform Changes & New Features"
        description="Stay up to date with the latest SharkCluster platform updates: config drift detection, scoped deploy keys, 7 backup types, VCL editing, self-hosted apps, multi-provider comparison, and more."
        path="/product-updates"
        keywords={["SharkCluster updates", "platform changelog", "new features", "product updates", "hosting platform updates"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Product Updates", path: "/product-updates" }]}
      />
      <PageHero
        eyebrow="Product Updates"
        title="What's new"
        highlight="on SharkCluster"
        description="Stay up to date with the latest platform changes, new features, and enhancements. We ship continuously — here's everything that's landed recently."
        icon={FileText}
      />

      <section className="section pt-8">
        <div className="container-px">
          {updates.length > 0 ? (
            <div ref={ref} className="mx-auto max-w-3xl space-y-4">
              {updates.map((update, i) => (
                <div
                  key={update.title}
                  className={`reveal ${visible ? "is-visible" : ""} card-hover group p-6`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <update.icon className="h-5.5 w-5.5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs text-ink-400">
                          <Calendar className="h-3 w-3" />
                          {update.date}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          update.badge === "New" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {update.badge}
                        </span>
                        <span className="text-xs font-medium text-ink-400">{update.category}</span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold text-ink-900">{update.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">{update.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-16 text-center`}>
              <FileText className="mx-auto h-10 w-10 text-ink-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Updates coming soon</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                We're preparing the first batch of product update entries. Check back shortly for the latest platform changes and new features.
              </p>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
