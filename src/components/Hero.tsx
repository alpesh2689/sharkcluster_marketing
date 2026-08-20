import { Link } from "react-router-dom";
import { ArrowRight, Check, Server, Shield, Database, GitBranch, Activity } from "lucide-react";

const trustPoints = [
  { icon: Shield, text: "Your data stays on your VPS" },
  { icon: Database, text: "Free self-hosted business apps" },
  { icon: Server, text: "Unlimited apps per server" },
];

const dashboardPills = [
  { icon: Activity, label: "CPU", value: "24%", color: "text-emerald-500" },
  { icon: Database, label: "Memory", value: "41%", color: "text-brand-500" },
  { icon: Server, label: "Disk", value: "18%", color: "text-amber-500" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 lg:pt-36">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-brand-400/15 blur-3xl" />
      </div>

      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          {/* Announcement pill */}
          <div className="animate-fade-in-down mb-6 flex justify-center">
            <Link
              to="/self-hosted-apps"
              className="group inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-1.5 text-sm font-medium text-brand-700 backdrop-blur-sm transition-colors hover:bg-brand-100"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              New: Free self-hosted ERP, helpdesk & invoicing
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <h1 className="animate-fade-in-up heading-xl">
            Managed cloud hosting
            <br />
            <span className="gradient-text">built for your business</span>
          </h1>

          <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-body" style={{ animationDelay: "0.1s" }}>
            Deploy servers and applications on your own VPS in minutes. Run ERP, helpdesk, ticketing and
            invoicing systems where your data stays on your server — not someone else's. Free local backups,
            unlimited migrations, and a dedicated DevOps manager included.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "0.2s" }}>
            <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link to="/how-it-works" className="btn-secondary btn-lg w-full sm:w-auto">
              See How It Works
            </Link>
          </div>

          <p className="animate-fade-in-up mt-4 text-sm text-ink-400" style={{ animationDelay: "0.3s" }}>
            No credit card required · No lock-in contracts · Cancel anytime
          </p>

          {/* Trust points */}
          <div className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3" style={{ animationDelay: "0.4s" }}>
            {trustPoints.map((point) => (
              <div key={point.text} className="flex items-center gap-2 text-sm font-medium text-ink-600">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <Check className="h-3 w-3" />
                </span>
                {point.text}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="animate-scale-in mx-auto mt-16 max-w-5xl" style={{ animationDelay: "0.5s" }}>
          <div className="relative">
            {/* Glow behind */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-500/10 via-brand-400/5 to-transparent blur-2xl" />

            {/* Browser frame */}
            <div className="relative overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl shadow-brand-500/10">
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="mx-auto flex max-w-xs items-center justify-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1 text-xs text-ink-400">
                    <Shield className="h-3 w-3 text-emerald-500" />
                    cloud.sharkcluster.com
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="grid grid-cols-12 gap-0">
                {/* Sidebar */}
                <div className="col-span-3 hidden border-r border-ink-100 bg-ink-50/50 p-4 sm:block">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500">
                      <Server className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-sm font-bold text-ink-900">SharkCluster</span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { icon: Server, label: "Servers", active: true },
                      { icon: Activity, label: "Monitoring" },
                      { icon: Database, label: "Databases" },
                      { icon: GitBranch, label: "Applications" },
                      { icon: Shield, label: "Firewall" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                          item.active ? "bg-brand-100 font-semibold text-brand-700" : "text-ink-500"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main panel */}
                <div className="col-span-12 p-5 sm:col-span-9">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink-900">Server Overview</h3>
                      <p className="text-sm text-ink-400">prod-web-01 · Running</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Healthy
                    </span>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {dashboardPills.map((pill) => (
                      <div key={pill.label} className="card p-3">
                        <div className="flex items-center gap-1.5 text-xs text-ink-400">
                          <pill.icon className={`h-3.5 w-3.5 ${pill.color}`} />
                          {pill.label}
                        </div>
                        <div className="mt-1 font-display text-xl font-bold text-ink-900">{pill.value}</div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
                          <div
                            className={`h-full rounded-full ${
                              pill.color.includes("emerald")
                                ? "bg-emerald-500"
                                : pill.color.includes("brand")
                                  ? "bg-brand-500"
                                  : "bg-amber-500"
                            }`}
                            style={{ width: pill.value }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder */}
                  <div className="card mt-3 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink-700">Traffic (24h)</span>
                      <span className="text-xs text-ink-400">Updated just now</span>
                    </div>
                    <div className="flex h-24 items-end gap-1.5">
                      {[35, 42, 28, 55, 48, 62, 38, 70, 52, 65, 45, 58, 72, 50, 68, 40, 75, 60, 80, 55, 68, 72, 58, 65].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-brand-500/40 to-brand-500"
                            style={{ height: `${h}%` }}
                          />
                        ),
                      )}
                    </div>
                  </div>

                  {/* Apps row */}
                  <div className="mt-3 flex items-center gap-2 overflow-hidden">
                    {["Laravel API", "WordPress", "ERP System", "Helpdesk"].map((app, i) => (
                      <div
                        key={app}
                        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium ${
                          i === 0
                            ? "border-brand-200 bg-brand-50 text-brand-700"
                            : "border-ink-200 bg-white text-ink-600"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-brand-500" : "bg-ink-300"}`} />
                        {app}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
