import { Link } from "react-router-dom";
import {
  ArrowRight, Award, Globe, Heart, Lightbulb, Rocket, Server, Shield, Users,
  Check, Boxes, Cloud, Database, RefreshCw, Activity, Zap, Lock, Code,
  GitBranch, Terminal, Gauge, Headset, MapPin, Building2, Sparkles,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "7", label: "Backup types" },
  { value: "5", label: "Deployment methods" },
// Live provider count must match the cards on /cloud-providers, which currently
// lists three: DigitalOcean, OVHcloud and Contabo. Vultr and Hetzner are flagged
// Coming Soon and do not count.
// TODO_CONFIRM — owner: product. SharkCluster's own infrastructure IS a real
// provisioning path (backend controller/serverMaster.js, the sharkcluster-pending
// admin queue) but is not listed on /cloud-providers. If it should be offered,
// add the card there first — then this count becomes 4 everywhere.
  { value: "3", label: "Live cloud providers" },
  { value: "∞", label: "Apps per server" },
];

const values = [
  {
    icon: Rocket,
    title: "Innovation First",
    desc: "Live Configuration reads the actual running state off the machine and shows you where it has drifted from what the panel thinks. Most panels show you the form they saved. We think the difference is the whole point.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    desc: "Your data should be on your server, not ours. Closed-by-default firewalls, repository-scoped deploy keys, and localhost-bound services aren't features here — they're the baseline you start from.",
  },
  {
    icon: Users,
    title: "Customer Obsession",
    desc: "Support that understands servers, not scripts. A dedicated DevOps manager who knows your setup, rather than a tier-1 agent working through a playbook they can't deviate from.",
  },
  {
    icon: Globe,
    title: "Global Mindset",
    desc: "Compare providers and regions side by side before you commit, and keep the freedom to leave. Portable backups exist precisely so that moving away from us stays possible.",
  },
  {
    icon: Heart,
    title: "Transparency",
    desc: "We surface what other panels hide — manageability states after root access, provider-held versus portable backups, cron's silent failures. Honest pricing and clear docs, no black boxes.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Every setting ships with best-practice guidance. We don't just expose the switch — we tell you which way to flip it and why, from Redis eviction policies to setting disk alerts at 80%.",
  },
];

const timeline = [
  {
    phase: "The Frustration",
    title: "Cloud infrastructure was broken",
    desc: "Every engineering team we knew spent weeks configuring servers instead of building products. Managed hosting had stopped being honest — panels hid what they couldn't control, backups were one generic button, and support was a tier-1 agent reading a script.",
    icon: Gauge,
  },
  {
    phase: "The Decision",
    title: "Build the platform we wished existed",
    desc: "The reach of the major cloud providers with the simplicity of a managed panel, and none of the pretending. A panel that surfaces what it can't guarantee — manageability states, config drift, silent cron failures.",
    icon: Lightbulb,
  },
  {
    phase: "The Principle",
    title: "Your data stays on your VPS",
    desc: "We never store your application data. The panel talks to your server over SSH and manages it — that is the whole relationship. You get the tools, the guidance and the support; you keep the control, the privacy and the data.",
    icon: Lock,
  },
  {
    phase: "Today",
    title: "Built by Coreway Solution",
    desc: "Headquartered in Ahmedabad, Gujarat, India, with a distributed team spanning multiple time zones — because infrastructure never sleeps. Seven backup types, five deployment methods, four live cloud providers, and unlimited apps per server.",
    icon: Building2,
  },
];

const differences = [
  {
    icon: Gauge,
    label: "Config Drift Detection",
    desc: "We read actual running state, not the saved form",
    others: "Show you the form they saved",
    us: "Show you what's actually running",
  },
  {
    icon: RefreshCw,
    label: "Backup Types",
    desc: "Seven types mapped to specific failure modes",
    others: "One generic backup button",
    us: "Seven types for every scenario",
  },
  {
    icon: Lock,
    label: "Data Residency",
    desc: "Your data lives on your VPS — never on ours",
    others: "Your data on their servers",
    us: "Your data on your VPS",
  },
  {
    icon: Users,
    label: "Support",
    desc: "A dedicated DevOps manager who knows your setup",
    others: "Tier-1 agent reading a script",
    us: "Real engineer who knows your infra",
  },
];

const team = [
  { name: "Coreway Solution", role: "Founder & Operator", initials: "CS", icon: Building2 },
  { name: "DevOps Team", role: "Distributed, multi-timezone", initials: "DT", icon: Headset },
  { name: "Engineering", role: "Panel & automation", initials: "EN", icon: Code },
  { name: "Support", role: "IST business hours & beyond", initials: "SP", icon: Users },
];

const platformHighlights = [
  { icon: Boxes, label: "Self-Hosted Apps", desc: "ERP, helpdesk, invoicing on your VPS", val: "4 categories" },
  { icon: Cloud, label: "Multi-Provider", desc: "Compare and deploy across providers", val: "4 live" },
  { icon: Database, label: "Managed Databases", desc: "Clusters that outlive servers", val: "4 engines" },
  { icon: RefreshCw, label: "Portable Backups", desc: "Move between providers freely", val: "7 types" },
  { icon: Activity, label: "Health Monitoring", desc: "Know before things break", val: "24/7 alerts" },
  { icon: Zap, label: "Two-Layer Caching", desc: "Redis + Varnish for speed", val: "2 layers" },
];

function HeroMock() {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Server className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Platform at a Glance</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {platformHighlights.map((item) => (
          <div key={item.label} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3 transition-colors hover:border-brand-200 hover:bg-brand-50/30">
            <div className="flex items-center justify-between">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <item.icon className="h-3.5 w-3.5" />
              </span>
              <span className="font-mono text-[10px] font-bold text-brand-600">{item.val}</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-ink-900">{item.label}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-ink-500">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
        <Check className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-xs font-medium text-emerald-700">Your data stays on your VPS — we never store it</span>
      </div>
    </div>
  );
}

function DifferenceMock() {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Gauge className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">How We're Different</span>
        </div>
        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-700">Honest</span>
      </div>
      <div className="space-y-3">
        {differences.map((diff) => (
          <div key={diff.label} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <diff.icon className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-semibold text-ink-900">{diff.label}</p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-red-100 bg-red-50/40 px-2.5 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wide text-red-500">Others</p>
                <p className="mt-0.5 text-[11px] leading-snug text-ink-600">{diff.others}</p>
              </div>
              <div className="rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-2">
                <p className="text-[9px] font-bold uppercase tracking-wide text-brand-600">SharkCluster</p>
                <p className="mt-0.5 text-[11px] leading-snug text-ink-800">{diff.us}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const hero = useReveal<HTMLDivElement>();
  const story = useReveal<HTMLDivElement>();
  const valuesHead = useReveal<HTMLDivElement>();
  const valuesGrid = useReveal<HTMLDivElement>();
  const difference = useReveal<HTMLDivElement>();
  const teamReveal = useReveal<HTMLDivElement>();
  const careers = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="About SharkCluster — Managed Cloud Hosting, Done Right"
        description="SharkCluster is a managed cloud hosting platform built by Coreway Solution on a simple principle: your data stays on your VPS. We provide the tools, the guidance, and the support — you keep control."
        path="/about"
        keywords={["about SharkCluster", "cloud hosting company", "managed hosting platform", "VPS management", "Coreway Solution"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
      />

      {/* Hero — split layout */}
      <section className="relative overflow-hidden pb-16 pt-28 lg:pt-36">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-300/15 blur-3xl" />
          <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-blue-300/10 blur-3xl" />
        </div>

        <div className="container-px">
          <div
            ref={hero.ref}
            className={`reveal ${hero.visible ? "is-visible" : ""} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}
          >
            <div>
              <span className="eyebrow">
                <Server className="h-4 w-4" />
                About Us
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-ink-900 sm:text-5xl">
                Powering the <br />
                <span className="gradient-text">next generation</span> of cloud infrastructure
              </h1>
              <p className="mt-6 text-body">
                SharkCluster was founded with a simple mission: make production-grade cloud infrastructure
                accessible to every business. We combine powerful automation, honest monitoring, and support
                from engineers who actually run servers — so you can deploy and scale with confidence, on
                infrastructure that stays yours.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary btn-lg">
                  Get in Touch
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/how-it-works" className="btn-secondary btn-lg">
                  See How It Works
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
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-extrabold text-brand-600 sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-ink-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our story — timeline */}
      <section className="section">
        <div className="container-px">
          <div ref={story.ref} className={`reveal ${story.visible ? "is-visible" : ""} mx-auto max-w-3xl`}>
            <div className="text-center">
              <span className="eyebrow">
                <Sparkles className="h-4 w-4" />
                Our Story
              </span>
              <h2 className="mt-5 heading-lg">
                How we got <span className="gradient-text">here</span>
              </h2>
              <p className="mt-4 text-body">
                From a shared frustration to a platform that tells the truth about your infrastructure.
              </p>
            </div>

            <div className="mt-14 space-y-0">
              {timeline.map((item, i) => (
                <div key={item.phase} className="relative flex gap-6 pb-12 last:pb-0">
                  {/* Vertical line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-6 top-16 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-brand-300 to-ink-200" />
                  )}
                  {/* Icon */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                    <item.icon className="h-6 w-6" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600">{item.phase}</span>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How we're different */}
      <section className="section bg-ink-50/40 pt-0">
        <div className="container-px">
          <div ref={difference.ref} className={`reveal ${difference.visible ? "is-visible" : ""}`}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="eyebrow">
                  <Gauge className="h-4 w-4" />
                  Why We're Different
                </span>
                <h2 className="mt-5 heading-lg">
                  We tell the truth <br />
                  <span className="gradient-text">about your infrastructure</span>
                </h2>
                <p className="mt-4 text-body">
                  Most panels show you the form they saved and hope reality matches. We read the actual running
                  state, surface what we can't guarantee, and give you seven backup types instead of one generic
                  button. Here's what that looks like in practice.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Config drift detection — see what's actually running",
                    "Seven backup types — not one generic button",
                    "Your data on your VPS — never on ours",
                    "A real DevOps manager — not a script reader",
                  ].map((point) => (
                    <div key={point} className="rounded-xl border border-ink-200/80 bg-white/80 p-3">
                      <Check className="h-4 w-4 text-brand-600" />
                      <p className="mt-2 text-xs font-semibold leading-snug text-ink-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/20 to-blue-200/10 blur-2xl" />
                <DifferenceMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section pt-16 lg:pt-20">
        <div className="container-px">
          <div
            ref={valuesHead.ref}
            className={`reveal ${valuesHead.visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}
          >
            <span className="eyebrow">
              <Lightbulb className="h-4 w-4" />
              Our Values
            </span>
            <h2 className="mt-5 heading-lg">
              What drives <span className="gradient-text">us</span>
            </h2>
            <p className="mt-4 text-body">
              Six principles that shape every decision we make — from feature design to support conversations.
            </p>
          </div>

          <div
            ref={valuesGrid.ref}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value, i) => (
              <div
                key={value.title}
                className={`reveal ${valuesGrid.visible ? "is-visible" : ""} card-hover group relative p-8`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink-900">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-ink-50/40 pt-0">
        <div className="container-px">
          <div ref={teamReveal.ref} className={`reveal ${teamReveal.visible ? "is-visible" : ""}`}>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">
                <Users className="h-4 w-4" />
                The Team
              </span>
              <h2 className="mt-5 heading-lg">
                Built by people who <span className="gradient-text">run servers</span>
              </h2>
              <p className="mt-4 text-body">
                A distributed team spanning multiple time zones — because infrastructure never sleeps.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, i) => (
                <div
                  key={member.name}
                  className={`reveal ${teamReveal.visible ? "is-visible" : ""} group flex flex-col items-center rounded-2xl border border-ink-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10`}
                  style={{ transitionDelay: `${(i % 4) * 80}ms` }}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/20 transition-transform duration-300 group-hover:scale-110">
                    <member.icon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink-900">{member.name}</h3>
                  <p className="mt-1 text-xs text-ink-500">{member.role}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 rounded-2xl border border-ink-200 bg-white p-4 text-center">
              <MapPin className="h-4 w-4 text-brand-600" />
              <p className="text-sm text-ink-600">
                Headquartered in <span className="font-semibold text-ink-900">Ahmedabad, Gujarat, India</span> — with a distributed team across multiple time zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="container-px">
          <div
            ref={careers.ref}
            className={`reveal ${careers.visible ? "is-visible" : ""} relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-brand-50/40 p-10 text-center shadow-sm lg:p-16`}
          >
            <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-brand-300/15 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-blue-300/10 blur-3xl" />
            <div className="relative">
              <h2 className="heading-lg">
                Join us in shaping <br className="hidden sm:block" />
                <span className="gradient-text">the future of cloud</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body">
                We're always looking for talented people who share our passion for building great
                infrastructure.
              </p>
              <Link to="/contact" className="btn-primary btn-lg mt-9">
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
