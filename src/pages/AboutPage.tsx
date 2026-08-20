import { Link } from "react-router-dom";
import {
  ArrowRight, Award, Globe, Heart, Lightbulb, Rocket, Server, Shield, Users,
  Check, Boxes, Cloud, Database, RefreshCw, Activity, Zap,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

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

const stats = [
  { value: "7", label: "Backup types" },
  { value: "5", label: "Deployment methods" },
  { value: "4", label: "Live cloud providers" },
  { value: "∞", label: "Apps per server" },
];

const platformHighlights = [
  { icon: Boxes, label: "Self-Hosted Apps", desc: "ERP, helpdesk, invoicing on your VPS" },
  { icon: Cloud, label: "Multi-Provider", desc: "Compare and deploy across providers" },
  { icon: Database, label: "Managed Databases", desc: "Clusters that outlive servers" },
  { icon: RefreshCw, label: "Portable Backups", desc: "Move between providers freely" },
  { icon: Activity, label: "Health Monitoring", desc: "Know before things break" },
  { icon: Zap, label: "Two-Layer Caching", desc: "Redis + Varnish for speed" },
];

function PlatformMock() {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Server className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-900">Platform Overview</span>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Live</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {platformHighlights.map((item) => (
          <div key={item.label} className="rounded-lg border border-ink-100 bg-ink-50/50 p-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <item.icon className="h-3.5 w-3.5" />
              </span>
              <p className="text-xs font-semibold text-ink-900">{item.label}</p>
            </div>
            <p className="mt-1.5 text-[10px] leading-snug text-ink-500">{item.desc}</p>
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

export default function AboutPage() {
  const hero = useReveal<HTMLDivElement>();
  const story = useReveal<HTMLDivElement>();
  const valuesHead = useReveal<HTMLDivElement>();
  const valuesGrid = useReveal<HTMLDivElement>();
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
              <Link to="/contact" className="btn-primary btn-lg mt-8">
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <PlatformMock />
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

      {/* Our story */}
      <section className="section bg-ink-50/40 py-16 lg:py-20">
        <div className="container-px">
          <div ref={story.ref} className={`reveal ${story.visible ? "is-visible" : ""} max-w-3xl`}>
            <h2 className="heading-lg">
              Our <span className="gradient-text">story</span>
            </h2>
            <div className="mt-8 space-y-5 text-body">
              <p>
                SharkCluster was born from a frustration shared by every engineering team we knew — cloud
                infrastructure was either too complex, too expensive, or both. We watched capable teams spend
                weeks configuring servers instead of building their products.
              </p>
              <p>
                Managed hosting was supposed to solve that, and had mostly stopped being honest about it.
                Panels hid what they couldn't control. Backups were one generic button. Support was a tier-1
                agent reading a script. And your data sat on someone else's server, behind per-seat pricing.
              </p>
              <p>
                So we set out to build the platform we wished existed: the reach of the major cloud providers
                with the simplicity of a managed panel, and none of the pretending. A panel that surfaces what
                it can't guarantee — manageability states, config drift, silent cron failures. Seven backup
                types, each mapped to a specific way things go wrong. Guidance baked into every setting rather
                than buried in docs nobody reads.
              </p>
              <p>
                Your data lives on your VPS. We never store it — the panel talks to your server over SSH and
                manages it, and that is the whole relationship. You get the tools, the guidance and the
                support; you keep the control, the privacy and the data.
              </p>
              <p>
                SharkCluster is built and operated by{" "}
                <span className="font-semibold text-ink-800">Coreway Solution</span>, headquartered in
                Ahmedabad, Gujarat, India, with a distributed team spanning multiple time zones — because
                infrastructure never sleeps.
              </p>
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
                className={`reveal ${valuesGrid.visible ? "is-visible" : ""} card-hover group p-8`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
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

      {/* Careers CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="container-px">
          <div
            ref={careers.ref}
            className={`reveal ${careers.visible ? "is-visible" : ""} relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-brand-50/40 p-10 text-center shadow-sm lg:p-16`}
          >
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
      </section>

      <FinalCTA />
    </>
  );
}
