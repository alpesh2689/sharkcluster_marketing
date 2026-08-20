import { ShieldCheck, Lock, KeyRound, Eye, Network, Server, AlertTriangle, FileWarning } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const securityFeatures = [
  {
    icon: Network,
    title: "Closed-by-Default Firewall",
    desc: "Nothing is reachable unless you explicitly open it. UFW rules managed from the panel, pushed to the server, and synced to match.",
  },
  {
    icon: KeyRound,
    title: "Scoped Deploy Keys",
    desc: "Use panel-generated deploy keys scoped to a single repository — safer than a full-account access token. SSH keys are masked in the UI.",
  },
  {
    icon: Lock,
    title: "Localhost-Bound Services",
    desc: "Redis, RabbitMQ, OpenSearch — all guided to bind to localhost by default. Expose only what truly needs exposing, with firewall rules.",
  },
  {
    icon: Eye,
    title: "Security Audit Log",
    desc: "Every request that reaches your application is parsed and readable. See scanning, probing, and brute-force attempts — and act on them.",
  },
  {
    icon: AlertTriangle,
    title: "Proactive Alerts",
    desc: "Failed logins, cron failures, disk thresholds — monitored and surfaced before they become outages. Nothing fails silently.",
  },
  {
    icon: FileWarning,
    title: "Sandboxed File Manager",
    desc: "Edit files in the browser — scoped to your application root, with editing restricted to htdocs. The server refuses any path outside it.",
  },
];

export default function Security() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="security" className="section relative overflow-hidden bg-ink-50/50">
      <div className="absolute inset-0 -z-10 dot-pattern opacity-40" />

      <div className="container-px">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
          <span className="eyebrow">
            <ShieldCheck className="h-4 w-4" />
            Security First
          </span>
          <h2 className="mt-5 heading-lg">
            Security baked into every layer
          </h2>
          <p className="mt-4 text-body">
            We don't just expose the security switch — we tell you which way to flip it. From firewall defaults to
            credential separation, SharkCluster ships with opinionated security guidance at every step.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className={`reveal ${visible ? "is-visible" : ""} card-hover group p-6`}
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                <feature.icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="font-display text-base font-bold text-ink-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className={`reveal ${visible ? "is-visible" : ""} mt-12`}>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-ink-200 bg-white p-6 text-center sm:flex-row sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
              <Server className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-base font-bold text-ink-900">
                Your VPS. Your data. Your rules.
              </h3>
              <p className="mt-1 text-sm text-ink-600">
                Every application, database, and file lives on your server. We never have access to your data — only you do.
              </p>
            </div>
            <a href="https://cloud.sharkcluster.com/register" className="btn-primary whitespace-nowrap">
              Start Securely
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
