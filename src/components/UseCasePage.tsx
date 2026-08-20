import { Link } from "react-router-dom";
import { Check, ArrowRight, Users, Target, Zap, Shield, Server, Cloud, Code, Database, ChevronRight } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";

export interface UseCaseProps {
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
  benefits: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; points?: string[]; link?: { href: string; label: string } }[];
  features: { title: string; desc: string }[];
  testimonial?: { quote: string; author: string; role: string };
}

export default function UseCasePage({
  seo,
  eyebrow,
  title,
  highlight,
  description,
  icon: Icon,
  benefits,
  features,
  testimonial,
}: UseCaseProps) {
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
          { name: eyebrow, path: seo.path },
        ]}
      />
      <PageHero eyebrow={eyebrow} title={title} highlight={highlight} description={description} icon={Icon} />

      {/* Benefits */}
      <section className="section pt-8">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl text-center`}>
            <h2 className="heading-lg">Why teams choose SharkCluster</h2>
            <p className="mt-4 text-body">Built for the way you work — with the control, security, and support you need.</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className={`reveal ${visible ? "is-visible" : ""} card-hover group p-6`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-base font-bold text-ink-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{benefit.desc}</p>
                {benefit.points && (
                  <ul className="mt-3 space-y-1.5">
                    {benefit.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-xs text-ink-600">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {benefit.link && (
                  <Link
                    to={benefit.link.href}
                    className="group/link mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                  >
                    {benefit.link.label}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features list */}
      <section className="section bg-ink-50/50 pt-0">
        <div className="container-px">
          <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl`}>
            <h2 className="heading-lg">Everything included</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`reveal ${visible ? "is-visible" : ""} flex items-start gap-3 rounded-xl border border-ink-200 bg-white p-5`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <Check className="h-3 w-3" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">{feature.title}</h3>
                    <p className="mt-1 text-sm text-ink-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="section pt-0">
          <div className="container-px">
            <div className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-3xl`}>
              <div className="rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-white p-8">
                <p className="text-lg leading-relaxed text-ink-800">"{testimonial.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-700">
                    {testimonial.author.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{testimonial.author}</p>
                    <p className="text-xs text-ink-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
