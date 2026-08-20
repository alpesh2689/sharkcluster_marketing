import { RefreshCw, UserCog, HardDriveDownload, GitCompare, ShieldCheck, Headset, Gauge, Network } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const benefits = [
  {
    icon: HardDriveDownload,
    title: "Free Local Backups",
    desc: "Local backups are included at no cost. Auto backups, snapshots, server images, and full server backups — all free. Offsite storage is billed per GB if you need it.",
    badge: "Included",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Free Migrations",
    desc: "Moving from another host? We migrate your sites and applications for free, as many times as you need. No hidden fees, no migration caps.",
    badge: "Unlimited",
  },
  {
    icon: UserCog,
    title: "Dedicated DevOps Manager",
    desc: "Every account gets a dedicated DevOps manager — a real human who knows your setup and helps with architecture, scaling, and troubleshooting.",
    badge: "Personal",
  },
  {
    icon: GitCompare,
    title: "Multi-Provider by Design",
    desc: "Compare plans across DigitalOcean, Contabo, OVH, and more — side-by-side, in one view. Choose the provider that fits your budget and region.",
    badge: "No lock-in",
  },
  {
    icon: ShieldCheck,
    title: "Security by Default",
    desc: "Closed-by-default firewall, masked SSH keys, scoped deploy keys, localhost-bound services. Security guidance is baked into every setting.",
    badge: "Hardened",
  },
  {
    icon: Headset,
    title: "Expert Support, Not Tier 1",
    desc: "Our support team understands servers, not just scripts. Real engineers who can help with Nginx configs, VCL rules, and database tuning.",
    badge: "Real engineers",
  },
  {
    icon: Gauge,
    title: "Built-in Best Practices",
    desc: "The panel doesn't just expose the switch — it tells you which way to flip it. Retention floors, eviction policies, disk thresholds, all explained.",
    badge: "Guided",
  },
  {
    icon: Network,
    title: "Unlimited Apps Per Server",
    desc: "Host as many applications as your server can handle. Each app gets its own domain, SSL, database, and staging environment — no per-app fees.",
    badge: "No limits",
  },
];

export default function WhySharkCluster() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="section relative overflow-hidden bg-ink-900 text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="container-px">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3.5 py-1.5 text-sm font-semibold text-brand-300">
            <ShieldCheck className="h-4 w-4" />
            Why SharkCluster
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Everything included. Nothing hidden.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300">
            Other hosts charge for backups, migrations, and support. We include them — because your success is our business.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className={`reveal ${visible ? "is-visible" : ""} group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-400/30 hover:bg-white/[0.06]`}
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <benefit.icon className="h-5.5 w-5.5" />
                </span>
                <span className="rounded-full border border-brand-400/20 bg-brand-500/10 px-2.5 py-0.5 text-xs font-semibold text-brand-300">
                  {benefit.badge}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-white">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
