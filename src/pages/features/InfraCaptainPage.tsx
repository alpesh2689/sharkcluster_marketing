// TODO_CONFIRM — pricing and exact feature scope of the InfraCaptain platform itself are not yet approved.
import { Link } from "react-router-dom";
import {
  Radar, Server, Activity, ArrowRight, Check, ChevronRight,
  Users, Monitor, ToggleRight, ExternalLink, ShieldCheck,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const sections = [
  {
    icon: ToggleRight,
    tag: "Connection",
    heading: "Enable at creation, or connect later",
    body: "InfraCaptain appears as an add-on in the server creation flow, and any existing server can be connected from its InfraCaptain tab afterwards. The panel handles provisioning the connection; you see a live connected/inactive status.",
    points: [
      "Enable during server creation — one toggle",
      "Or connect an existing server from its InfraCaptain tab",
      "Live connected/inactive status shown in the panel",
      "No agent to install by hand",
    ],
  },
  {
    icon: ExternalLink,
    tag: "Access",
    heading: "One dashboard, opened from the panel",
    body: "The server's InfraCaptain view opens directly from SharkCluster with your session carried across, so you are not logging in twice.",
    points: [
      "Session carried across — no second login",
      "Opens directly from the server's InfraCaptain tab",
      "No second set of credentials to manage",
    ],
  },
  {
    icon: ShieldCheck,
    tag: "Permissions",
    heading: "Gated by its own permissions",
    body: "Install and configure are two separate team permissions. A team member can be allowed to see connection status without being allowed to change the integration, and neither implies access to anything else on the server.",
    points: [
      "Install and configure are separate permissions",
      "View status without allowing changes",
      "Neither permission grants access to anything else on the server",
    ],
    link: { to: "/features/teams", label: "See how team permissions work" },
  },
  {
    icon: Activity,
    tag: "When to use it",
    heading: "When you actually need it",
    body: "SharkCluster's built-in monitoring covers CPU, memory, disk, network and uptime alerts, and for most single-server setups that is enough. InfraCaptain is for teams that want deeper infrastructure analysis across a fleet.",
    points: [
      "Built-in monitoring covers CPU, memory, disk, network, uptime",
      "Enough for most single-server setups",
      "InfraCaptain is for deeper analysis across a fleet",
    ],
    link: { to: "/features/monitoring", label: "See built-in monitoring" },
  },
];

const relatedFeatures = [
  { title: "Monitoring", path: "/features/monitoring", icon: Activity },
  { title: "Server Management", path: "/features/server-management", icon: Server },
  { title: "Teams", path: "/features/teams", icon: Users },
];

export default function InfraCaptainPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="InfraCaptain Integration — Deeper Infrastructure Insight"
        description="Connect SharkCluster to InfraCaptain for deeper infrastructure analysis across a fleet. Enable at server creation or connect an existing server — no agent to install, no second login."
        path="/features/infracaptain"
        keywords={["InfraCaptain", "infrastructure monitoring", "fleet monitoring", "server monitoring integration", "infrastructure analysis"]}
        faqSchema={[
          { q: "What is InfraCaptain?", a: "InfraCaptain is an infrastructure monitoring and management platform that SharkCluster connects to directly. You enable it when you create a server, or connect an existing server from its InfraCaptain tab." },
          { q: "Do I need to install an agent?", a: "No. The panel handles provisioning the connection. You see a live connected or inactive status in SharkCluster." },
          { q: "Do I need separate InfraCaptain credentials?", a: "No. Your session is carried across from SharkCluster, so you are not logging in twice." },
          { q: "Who can install or configure InfraCaptain?", a: "Install and configure are two separate team permissions. A team member can see connection status without being allowed to change the integration, and neither implies access to anything else on the server." },
        ]}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "InfraCaptain", path: "/features/infracaptain" },
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
                <Radar className="h-4 w-4" />
                InfraCaptain Integration
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Deeper infrastructure insight, <br />
                <span className="gradient-text">one toggle away</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                InfraCaptain is an infrastructure monitoring and management platform SharkCluster connects to directly.
                Enable it when you create a server, or connect an existing one from its detail page — no agent to
                install by hand, no second set of credentials to manage.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Connect InfraCaptain
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/features/monitoring" className="btn-secondary btn-lg w-full sm:w-auto">
                  See Built-in Monitoring
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Radar className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-ink-900">InfraCaptain</span>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                    <Check className="h-3 w-3" />
                    Connected
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
                    <span className="text-xs font-semibold text-ink-500">Server</span>
                    <span className="font-mono text-xs font-semibold text-ink-900">prod-web-01</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
                    <span className="text-xs font-semibold text-ink-500">Status</span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Live
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
                    <span className="text-xs font-semibold text-ink-500">Connection</span>
                    <span className="text-xs font-semibold text-ink-900">Provisioned by panel</span>
                  </div>
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2.5 text-xs font-bold text-brand-700 transition-colors hover:bg-brand-100">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open in InfraCaptain
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="section">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <span className="eyebrow">
              <Radar className="h-4 w-4" />
              How it works
            </span>
            <h2 className="mt-5 heading-lg">Connected, not bolted on</h2>
            <p className="mt-4 text-body">
              InfraCaptain is not a logo on a page. The panel provisions the connection, carries your session across,
              and gates every action behind its own permissions.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            {sections.map((s, i) => (
              <div
                key={s.heading}
                className={`reveal ${visible ? "is-visible" : ""} rounded-2xl border border-ink-200 bg-white p-6 sm:p-8`}
                style={{ transitionDelay: `${(i % 4) * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                      {s.tag}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold text-ink-900">{s.heading}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
                    <ul className="mt-4 space-y-2">
                      {s.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-sm text-ink-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                    {s.link && (
                      <Link
                        to={s.link.to}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                      >
                        {s.link.label}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related features */}
      <section className="section pt-0">
        <div className="container-px">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="eyebrow"><Monitor className="h-4 w-4" /> Related features</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Pair it with the rest</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                InfraCaptain sits alongside the tools that keep your servers observable and your team in control.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
