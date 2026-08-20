import {
  Database, GitBranch, Cloud, Server, Check, ArrowRight, Boxes, Layers,
  Shield, RefreshCw, Zap, Globe, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { TRIAL_POINTS } from "@/content/trial";

const steps = [
  {
    icon: Cloud,
    number: "01",
    tag: "Choose",
    title: "Choose Your Provider & Plan",
    desc: "Compare plans across multiple cloud providers side-by-side. Pick the region, specs, and price that fit your project — all in one view.",
    details: [
      "Compare DigitalOcean, Contabo, and OVHcloud side-by-side",
      "RAM slider filters matching plans live",
      "Region picker with datacenter selection",
      "Transparent billing — hourly, prepaid, or usage-based",
    ],
    mock: "provider",
  },
  {
    icon: Server,
    number: "02",
    tag: "Deploy",
    title: "Deploy Your Server",
    desc: "Fresh install, Git deploy, Docker image, ZIP upload, or custom migration. Your server is provisioned and configured automatically.",
    details: [
      "5 deployment methods to choose from",
      "Choose your stack: PHP, Node.js, Python, Docker",
      "Select web server (Apache or Nginx) and database engine",
      "Automated install pipeline with visible progress log",
    ],
    mock: "deploy",
  },
  {
    icon: GitBranch,
    number: "03",
    tag: "Create",
    title: "Create Applications",
    desc: "Add as many apps as you need — Laravel, WordPress, Node, Python, Docker. Each gets its own domain, SSL, database, and staging environment.",
    details: [
      "Unlimited applications per server",
      "Git deploy with scoped deploy keys (safer than tokens)",
      "Docker image support with configurable resources",
      "One-click staging environments for testing",
    ],
    mock: "apps",
  },
  {
    icon: Database,
    number: "04",
    tag: "Go Live",
    title: "Go Live with Confidence",
    desc: "Point your domain, issue free SSL, set up backups and health alerts. Your dedicated DevOps manager is on standby if you need help.",
    details: [
      "Free Let's Encrypt SSL or Cloudflare integration",
      "Set up backups — 7 types for every scenario",
      "Configure health alerts for CPU, RAM, disk, services",
      "Dedicated DevOps manager included on Business plans",
    ],
    mock: "golive",
  },
];

function StepMock({ type }: { type: string }) {
  if (type === "provider") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Cloud className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Compare Providers</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">3 plans</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "DigitalOcean", spec: "4 vCPU · 8GB · NYC", price: "$48/mo", color: "bg-brand-50 text-brand-600" },
            { name: "Contabo", spec: "4 vCPU · 8GB · DEL", price: "$18/mo", color: "bg-blue-50 text-blue-600" },
            { name: "OVHcloud", spec: "4 vCPU · 8GB · FRA", price: "$22/mo", color: "bg-emerald-50 text-emerald-600" },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${p.color}`}>
                  <Cloud className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{p.name}</p>
                  <p className="text-[10px] text-ink-400">{p.spec}</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-ink-700">{p.price}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Compare side-by-side — pick what fits</p>
      </div>
    );
  }

  if (type === "deploy") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Server className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Deployment</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">5 methods</span>
        </div>
        <div className="space-y-2">
          {[
            { method: "Git Deploy", icon: GitBranch, color: "bg-brand-50 text-brand-600" },
            { method: "Docker Image", icon: Layers, color: "bg-blue-50 text-blue-600" },
            { method: "ZIP Upload", icon: Boxes, color: "bg-emerald-50 text-emerald-600" },
            { method: "Fresh Install", icon: Server, color: "bg-amber-50 text-amber-600" },
            { method: "Migration", icon: RefreshCw, color: "bg-purple-50 text-purple-600" },
          ].map((m) => (
            <div key={m.method} className="flex items-center gap-2.5 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${m.color}`}>
                <m.icon className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-semibold text-ink-900">{m.method}</p>
              <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-2.5 w-2.5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "apps") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <GitBranch className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink-900">Applications</span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Unlimited</span>
        </div>
        <div className="space-y-2.5">
          {[
            { name: "acme-web", stack: "Laravel · PHP 8.2", domain: "acme.com", color: "bg-brand-50 text-brand-600" },
            { name: "acme-api", stack: "Node.js · Express", domain: "api.acme.com", color: "bg-blue-50 text-blue-600" },
            { name: "acme-blog", stack: "WordPress · Nginx", domain: "blog.acme.com", color: "bg-emerald-50 text-emerald-600" },
          ].map((app) => (
            <div key={app.name} className="rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-900">{app.name}</p>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
              </div>
              <p className="mt-0.5 text-[10px] text-ink-400">{app.stack} · {app.domain}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-ink-400">Each app gets its own domain, SSL, and database</p>
      </div>
    );
  }

  // golive
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Shield className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Go Live Checklist</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Ready</span>
      </div>
      <div className="space-y-2">
        {[
          { task: "Domain pointed", icon: Globe, color: "bg-brand-50 text-brand-600" },
          { task: "SSL issued (Let's Encrypt)", icon: Shield, color: "bg-blue-50 text-blue-600" },
          { task: "Backups configured", icon: RefreshCw, color: "bg-emerald-50 text-emerald-600" },
          { task: "Health alerts set", icon: Zap, color: "bg-amber-50 text-amber-600" },
        ].map((item) => (
          <div key={item.task} className="flex items-center gap-2.5 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
            <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.color}`}>
              <item.icon className="h-3.5 w-3.5" />
            </span>
            <p className="flex-1 text-sm font-semibold text-ink-900">{item.task}</p>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-3 w-3" />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-ink-400">DevOps manager on standby — included on Business</p>
    </div>
  );
}

export default function HowItWorksPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="How It Works — From Zero to Production in 4 Steps"
        description="Deploy servers and applications in minutes. Compare providers, choose a plan, deploy your stack, create apps with domains and SSL, and go live with backups and monitoring — no DevOps degree required."
        path="/how-it-works"
        keywords={["how to deploy a server", "VPS setup guide", "cloud hosting tutorial", "deploy from git", "server provisioning", "application deployment"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }]}
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
                <Server className="h-4 w-4" />
                How It Works
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                From zero to production <br />
                <span className="gradient-text">in four steps</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                No DevOps degree required. SharkCluster handles provisioning, configuration, and deployment — you
                pick the plan, deploy the code, and go live. Compare providers, deploy your stack, create apps
                with domains and SSL, and set up backups and monitoring in minutes.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/pricing" className="btn-secondary btn-lg w-full sm:w-auto">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <StepMock type="provider" />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container-px">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={ref}
                className={`reveal ${visible ? "is-visible" : ""} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-xl shadow-brand-500/30">
                      <step.icon className="h-8 w-8" />
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white font-display text-xs font-bold text-brand-600 shadow-md">
                        {step.number}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {step.tag}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{step.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-600">{step.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm text-ink-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/20 to-blue-200/10 blur-2xl" />
                  <StepMock type={step.mock} />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`reveal ${visible ? "is-visible" : ""} mt-16 text-center`}>
            <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </a>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {TRIAL_POINTS.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-ink-500">
                  <Check className="h-4 w-4 text-brand-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
