import { Database, GitBranch, Cloud, Server, ArrowRight, Check } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    icon: Cloud,
    number: "01",
    title: "Choose Your Provider & Plan",
    desc: "Compare plans across multiple cloud providers side-by-side. Pick the region, specs, and price that fit your project — all in one view.",
  },
  {
    icon: Server,
    number: "02",
    title: "Deploy Your Server",
    desc: "Fresh install, Git deploy, Docker image, ZIP upload, or custom migration. Your server is provisioned and configured automatically.",
  },
  {
    icon: GitBranch,
    number: "03",
    title: "Create Applications",
    desc: "Add as many apps as you need — Laravel, WordPress, Node, Python, Docker. Each gets its own domain, SSL, database, and staging environment.",
  },
  {
    icon: Database,
    number: "04",
    title: "Go Live with Confidence",
    desc: "Point your domain, issue free SSL, set up backups and health alerts. Your dedicated DevOps manager is on standby if you need help.",
  },
];

export default function HowItWorks() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="section relative overflow-hidden">
      <div className="container-px">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
          <span className="eyebrow">
            <Server className="h-4 w-4" />
            How It Works
          </span>
          <h2 className="mt-5 heading-lg">From zero to production in four steps</h2>
          <p className="mt-4 text-body">
            No DevOps degree required. SharkCluster handles provisioning, configuration, and deployment —
            you pick the plan, deploy the code, and go live.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-200 via-brand-300 to-brand-200 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`reveal ${visible ? "is-visible" : ""} relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`lg:[direction:ltr] ${i % 2 === 1 ? "lg:pl-12" : "lg:pr-12 lg:text-right"}`}>
                  <div className={`flex items-start gap-4 ${i % 2 === 1 ? "" : "lg:flex-row-reverse lg:text-right"}`}>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                      <step.icon className="h-7 w-7" />
                    </div>
                    <div className={i % 2 === 1 ? "" : "lg:text-right"}>
                      <span className="font-display text-sm font-bold text-brand-500">{step.number}</span>
                      <h3 className="font-display text-xl font-bold text-ink-900">{step.title}</h3>
                      <p className="mt-2 text-body-sm">{step.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block" />
              </div>
            ))}
          </div>
        </div>

        <div className={`reveal ${visible ? "is-visible" : ""} mt-14 text-center`}>
          <a href="https://cloud.sharkcluster.com/register" className="btn-primary btn-lg">
            Get Started Now
            <ArrowRight className="h-5 w-5" />
          </a>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["No credit card required", "No lock-in contracts", "Cancel anytime"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-ink-500">
                <Check className="h-4 w-4 text-brand-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
