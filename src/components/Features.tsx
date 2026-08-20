import { Server, ShieldCheck, Database, GitBranch, Cloud, Terminal, Activity, Layers, Zap, RefreshCw, HardDrive, Lock, Network, Boxes, Cpu, FileCode, Gauge } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { OFFSITE_PER_GB } from "@/content/pricing";

export default function Features() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const features = [
    {
      icon: Server,
      title: "Full Server Lifecycle",
      desc: "Create, monitor, scale, clone, and tear down servers — all from one panel. Every step visible, every action logged.",
      points: ["5 deployment methods", "Live resource graphs", "One-click scaling"],
    },
    {
      icon: GitBranch,
      title: "Deploy from Git, ZIP, or Docker",
      desc: "Connect GitHub, GitLab, or Bitbucket with scoped deploy keys. Upload a ZIP, pull a Docker image, or start fresh — your choice.",
      points: ["Deploy keys (safer than tokens)", "Auto dependency install", "Per-app deployment scripts"],
    },
    {
      icon: Database,
      title: "Managed Databases",
      desc: "MySQL, PostgreSQL, MongoDB, and SQLite — created and wired into your app automatically. Import, export, and manage from the panel.",
      points: ["Multi-engine support", "Web database manager", "Auto-generated credentials"],
    },
    {
      icon: RefreshCw,
      title: "7 Backup Types",
      desc: "Auto backups, snapshots, server images, custom path backups, portable backups, full server backups, and cloning — each solving a different failure scenario.",
      points: ["Free local backups", `Offsite storage — ${OFFSITE_PER_GB}/GB`, "Pre-restore safety backup"],
    },
    {
      icon: Activity,
      title: "Proactive Health Alerts",
      desc: "Configurable CPU, memory, disk, and failed-service thresholds. Get notified before things break, not after.",
      points: ["Email + in-app alerts", "Configurable thresholds", "Alert-fatigue guidance built in"],
    },
    {
      icon: ShieldCheck,
      title: "Firewall Management",
      desc: "Panel-driven UFW control with inbound/outbound rules, country-based filtering, and a closed-by-default posture.",
      points: ["TCP/UDP/ICMP support", "CIDR & country rules", "Bulk rule management"],
    },
    {
      icon: Terminal,
      title: "In-Browser SSH Terminal",
      desc: "A sandboxed shell in your browser — no local client needed. Plus per-server SSH key management with masked public keys.",
      points: ["Session-scoped access", "Generate or upload keys", "Granular permissions"],
    },
    {
      icon: Layers,
      title: "Staging Environments",
      desc: "Create a full copy of any application to test changes before touching production. Clone apps across servers instantly.",
      points: ["One-click staging", "Cross-server cloning", "Independent domains & SSL"],
    },
    {
      icon: Zap,
      title: "Redis & Varnish Caching",
      desc: "Two complementary caching layers — Redis for application-level caching, Varnish for full HTTP response caching with custom VCL editing.",
      points: ["Live config drift detection", "Eviction policy control", "In-panel VCL editor"],
    },
    {
      icon: Network,
      title: "Cronjob Scheduling",
      desc: "Server-level and application-level scheduled tasks with basic presets or advanced cron expressions. Failures roll up to monitoring.",
      points: ["Shell, Python & custom", "Basic & advanced modes", "Failure tracking"],
    },
    {
      icon: Boxes,
      title: "Other Services Catalogue",
      desc: "Install RabbitMQ, OpenSearch, Elasticsearch, SMTP relay, Fail2Ban, ClamAV, FFmpeg and more — managed entirely from the panel.",
      points: ["One-click install", "Per-service logs", "Separate admin & app credentials"],
    },
    {
      icon: Gauge,
      title: "Config Drift Detection",
      desc: "Live Configuration reads actual running state from the machine, surfacing drift from your saved panel config before it causes an outage.",
      points: ["Redis & Varnish live config", "Firewall rule sync", "Never fail silently"],
    },
  ];

  return (
    <section id="features" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 dot-pattern opacity-50" />

      <div className="container-px">
        <div
          ref={ref}
          className={`reveal ${visible ? "is-visible" : ""} relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-10 text-center shadow-sm sm:px-12 sm:py-12`}
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-brand-300/10 blur-3xl" />
          <div className="relative">
            <span className="eyebrow">
              <Cpu className="h-4 w-4" />
              Powerful Features
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
              Everything you need to run <span className="text-brand-600">production workloads</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-body">
              From server creation to scaling, backups to security, caching to monitoring — SharkCluster puts the entire
              server lifecycle in one panel, with expert guidance built into every setting.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`reveal ${visible ? "is-visible" : ""} card-hover group p-6`}
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{feature.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-ink-600">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                      <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
