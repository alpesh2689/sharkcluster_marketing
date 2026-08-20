import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { GraduationCap, ArrowRight, TrendingUp, Users, Server, Shield, Database } from "lucide-react";

type CaseStudy = {
  title: string;
  excerpt: string;
  company: string;
  industry: string;
  metric: string;
  icon: typeof Users;
  tags: string[];
};

const caseStudies: CaseStudy[] = [];

export default function CaseStudiesPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title="Case Studies — Real Customer Success Stories"
        description="Read how agencies, ecommerce stores, consulting firms, and startups use SharkCluster to cut costs, handle traffic spikes, self-host business apps, and keep data private."
        path="/case-studies"
        keywords={["SharkCluster case studies", "hosting success stories", "cloud hosting case study", "agency hosting case study", "ecommerce hosting case study"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }]}
      />
      <PageHero
        eyebrow="Case Studies"
        title="Real stories from"
        highlight="real customers"
        description="See how agencies, ecommerce stores, consulting firms, and startups use SharkCluster to cut costs, handle traffic, self-host apps, and keep data private."
        icon={GraduationCap}
      />

      <section className="section pt-8">
        <div className="container-px">
          {caseStudies.length > 0 ? (
            <div ref={ref} className="grid gap-6 lg:grid-cols-2">
              {caseStudies.map((cs, i) => (
                <article
                  key={cs.title}
                  className={`reveal ${visible ? "is-visible" : ""} card-hover group flex flex-col p-7`}
                  style={{ transitionDelay: `${(i % 2) * 100}ms` }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all group-hover:bg-brand-500 group-hover:text-white">
                      <cs.icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">{cs.metric}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-600 transition-colors">{cs.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{cs.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-ink-100 pt-4">
                    {cs.tags.map((tag) => (
                      <span key={tag} className="rounded-lg bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-ink-400">{cs.company} · {cs.industry}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-transform group-hover:translate-x-0.5">
                      Read story <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-16 text-center`}>
              <GraduationCap className="mx-auto h-10 w-10 text-ink-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Case studies coming soon</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                We're collecting customer success stories covering migrations, traffic scaling, self-hosted apps, and cost optimization. Check back shortly for the first case studies.
              </p>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
