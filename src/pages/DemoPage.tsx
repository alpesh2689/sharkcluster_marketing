import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Video, Play, ArrowRight, Check, Monitor, Server, Database, Shield, GitBranch, Zap, RefreshCw } from "lucide-react";

const demoFeatures = [
  { icon: Server, title: "Server Creation", desc: "Watch a server go from zero to running in under 5 minutes" },
  { icon: GitBranch, title: "Git Deployment", desc: "Deploy from GitHub with scoped deploy keys" },
  { icon: Database, title: "Database Management", desc: "Auto-created databases wired into your app" },
  { icon: Shield, title: "Firewall Setup", desc: "Closed-by-default firewall with country rules" },
  { icon: Zap, title: "Caching", desc: "Redis and Varnish configuration in the panel" },
  { icon: RefreshCw, title: "Backups", desc: "All 7 backup types and when to use each" },
];

export default function DemoPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Demo — See SharkCluster in Action"
        description="Watch a live demo of SharkCluster: server creation, Git deployment, database management, firewall setup, caching, and backups. See the platform before you get started."
        path="/demo"
        keywords={["SharkCluster demo", "cloud hosting demo", "VPS panel demo", "server management demo", "platform walkthrough"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Demo", path: "/demo" }]}
      />
      <PageHero
        eyebrow="Demo"
        title="See SharkCluster"
        highlight="in action"
        description="Watch the platform in action — server creation, Git deployment, database management, firewall setup, caching, and backups. Then get started to try it yourself."
        icon={Video}
      />

      <section className="section pt-8">
        <div className="container-px">
          {/* Main demo video */}
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-4xl`}>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-ink-200 bg-gradient-to-br from-brand-500 to-brand-700 shadow-2xl shadow-brand-500/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30">
                  <Play className="h-8 w-8 fill-white text-white transition-transform group-hover:scale-110" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="rounded-lg bg-black/40 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                  Full Platform Walkthrough · 15:42
                </span>
              </div>
            </div>
          </div>

          {/* Feature demos */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {demoFeatures.map((feature, i) => (
              <div
                key={feature.title}
                className={`reveal ${visible ? "is-visible" : ""} card-hover group cursor-pointer overflow-hidden`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-ink-800 to-ink-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-white/25">
                      <Play className="h-5 w-5 fill-white text-white" />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <feature.icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-sm font-bold text-ink-900">{feature.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-ink-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`reveal ${visible ? "is-visible" : ""} mt-12 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-white p-8 text-center`}>
            <h3 className="font-display text-xl font-bold text-ink-900">Ready to try it yourself?</h3>
            <p className="mt-2 text-body-sm">Get started with no credit card required — no lock-in contracts.</p>
            <a href="https://cloud.sharkcluster.com/register" className="btn-primary mt-5">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
