import { Link } from "react-router-dom";
import { Check, ArrowRight, ChevronRight, Sparkles, Network } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

export interface FeatureDetailProps {
  seo: {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    faqSchema?: { q: string; a: string }[];
  };
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  sections: {
    heading: string;
    body: string;
    points?: string[];
  }[];
  relatedFeatures?: { title: string; path: string; icon: React.ComponentType<{ className?: string }> }[];
  primaryCta?: { label: string; to?: string; href?: string };
  secondaryCta?: { label: string; to?: string; href?: string };
}

export default function FeatureDetail({
  seo,
  eyebrow,
  title,
  highlight,
  description,
  icon: Icon,
  sections,
  relatedFeatures = [],
  primaryCta,
  secondaryCta,
}: FeatureDetailProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        keywords={seo.keywords}
        faqSchema={seo.faqSchema}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: title, path: seo.path },
        ]}
      />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={description}
        icon={Icon}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />

      <section className="section pt-8">
        <div className="container-px">
          <div className="mx-auto max-w-5xl">
            {/* Spotlight intro card */}
            <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mt-8 relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-white p-8`}>
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
              <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-brand-300/10 blur-3xl" />
              <div className="relative flex items-start gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                  <Icon className="h-7 w-7" />
                </span>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                    <Sparkles className="h-3 w-3" />
                    {eyebrow}
                  </span>
                  <p className="mt-3 text-lg leading-relaxed text-ink-800">{description}</p>
                </div>
              </div>
            </div>

            {/* Section cards */}
            <div className="mt-10 space-y-6">
              {sections.map((section, i) => (
                <div
                  key={i}
                  className={`reveal ${visible ? "is-visible" : ""} group rounded-2xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:border-brand-200 hover:shadow-lg`}
                  style={{ transitionDelay: `${(i % 2) * 80}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <span className="font-display text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <h2 className="font-display text-xl font-bold text-ink-900">{section.heading}</h2>
                  </div>
                  <p className="mt-4 text-body-sm leading-relaxed text-ink-600">{section.body}</p>
                  {section.points && (
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {section.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 rounded-lg bg-ink-50/60 px-3 py-2.5">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-sm leading-snug text-ink-700">{point}</span>
                        </li>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Related features — card grid */}
            {relatedFeatures.length > 0 && (
              <div className="mt-14 border-t border-ink-200 pt-8">
                <div className="text-center">
                  <span className="eyebrow">
                    <Network className="h-4 w-4" />
                    Keep building
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Everything around this feature</h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                    Pair this with the tools that keep your applications fast, secure, and resilient.
                  </p>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
            )}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
