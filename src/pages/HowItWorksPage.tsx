import { Database, GitBranch, Cloud, Server, Check, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    icon: Cloud,
    number: "01",
    title: "Choose Your Provider & Plan",
    desc: "Compare plans across multiple cloud providers side-by-side. Pick the region, specs, and price that fit your project — all in one view.",
    details: [
      "Compare DigitalOcean, Contabo, and OVHcloud side-by-side",
      "RAM slider filters matching plans live",
      "Region picker with datacenter selection",
      "Transparent billing — hourly, prepaid, or usage-based",
    ],
  },
  {
    icon: Server,
    number: "02",
    title: "Deploy Your Server",
    desc: "Fresh install, Git deploy, Docker image, ZIP upload, or custom migration. Your server is provisioned and configured automatically.",
    details: [
      "5 deployment methods to choose from",
      "Choose your stack: PHP, Node.js, Python, Ruby, .NET, Docker",
      "Select web server (Apache or Nginx) and database engine",
      "Automated install pipeline with visible progress log",
    ],
  },
  {
    icon: GitBranch,
    number: "03",
    title: "Create Applications",
    desc: "Add as many apps as you need — Laravel, WordPress, Node, Python, Docker. Each gets its own domain, SSL, database, and staging environment.",
    details: [
      "Unlimited applications per server",
      "Git deploy with scoped deploy keys (safer than tokens)",
      "Docker image support with configurable resources",
      "One-click staging environments for testing",
    ],
  },
  {
    icon: Database,
    number: "04",
    title: "Go Live with Confidence",
    desc: "Point your domain, issue free SSL, set up backups and health alerts. Your dedicated DevOps manager is on standby if you need help.",
    details: [
      "Free Let's Encrypt SSL or Cloudflare integration",
      "Set up backups — 7 types for every scenario",
      "Configure health alerts for CPU, RAM, disk, services",
      "Dedicated DevOps manager included on Business plans",
    ],
  },
];

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
      <PageHero
        eyebrow="How It Works"
        title="From zero to production"
        highlight="in four steps"
        description="No DevOps degree required. SharkCluster handles provisioning, configuration, and deployment — you pick the plan, deploy the code, and go live."
        icon={Server}
      />

      <section className="section">
        <div className="container-px">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={ref}
                className={`reveal ${visible ? "is-visible" : ""} grid items-center gap-8 lg:grid-cols-2`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Number + icon */}
                <div className={`flex items-center gap-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-brand-500 text-white shadow-xl shadow-brand-500/30">
                    <step.icon className="h-10 w-10" />
                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white font-display text-sm font-bold text-brand-600 shadow-md">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink-900">{step.title}</h2>
                    <p className="mt-2 text-body-sm">{step.desc}</p>
                  </div>
                </div>

                {/* Details */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="card p-6">
                    <ul className="space-y-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3 text-sm text-ink-600">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                            <Check className="h-3 w-3" />
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
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

      <FinalCTA />
    </>
  );
}
