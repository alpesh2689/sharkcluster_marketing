import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { Users, MessageSquareText, Github, Star, ArrowRight } from "lucide-react";

type CommunityLink = {
  icon: typeof Users;
  title: string;
  desc: string;
  members: string;
  to: string;
};

type Stat = {
  value: string;
  label: string;
};

const communityLinks: CommunityLink[] = [];

const stats: Stat[] = [];

export default function CommunityPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Community — Join the SharkCluster Community"
        description="Connect with the SharkCluster community on Discord, GitHub, and our Agency Partner Network. Share knowledge, request features, and grow together."
        path="/community"
        keywords={["SharkCluster community", "hosting community", "DevOps community", "Discord server", "open source hosting"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Community", path: "/community" }]}
      />
      <PageHero
        eyebrow="Community"
        title="Join the"
        highlight="SharkCluster community"
        description="Connect with developers, agencies, and businesses using SharkCluster. Share knowledge, request features, and grow together."
        icon={Users}
      />

      <section className="section pt-8">
        <div className="container-px">
          {communityLinks.length > 0 ? (
            <>
              <div ref={ref} className="grid gap-5 sm:grid-cols-2">
                {communityLinks.map((link, i) => (
                  <div
                    key={link.title}
                    className={`reveal ${visible ? "is-visible" : ""} card-hover group flex items-start gap-4 p-6`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all group-hover:bg-brand-500 group-hover:text-white">
                      <link.icon className="h-6 w-6" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-bold text-ink-900">{link.title}</h3>
                        <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-medium text-ink-600">{link.members}</span>
                      </div>
                      <p className="mt-2 text-sm text-ink-500">{link.desc}</p>
                      <a href={link.to} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                        Join now
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {stats.length > 0 && (
                <div className={`reveal ${visible ? "is-visible" : ""} mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4`}>
                  {stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`reveal ${visible ? "is-visible" : ""} rounded-2xl border border-ink-200 bg-white p-5 text-center shadow-sm`}
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <div className="font-display text-3xl font-extrabold gradient-text">{stat.value}</div>
                      <div className="mt-1 text-sm text-ink-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-16 text-center`}>
              <Users className="mx-auto h-10 w-10 text-ink-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Community channels coming soon</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                We're setting up Discord, GitHub, and our Agency Partner Network. Check back shortly for links to join the SharkCluster community.
              </p>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
