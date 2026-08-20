import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  primaryCta?: { label: string; to?: string; href?: string };
  secondaryCta?: { label: string; to?: string; href?: string };
}

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  icon: Icon,
  primaryCta = { label: "Get Started", href: "https://cloud.sharkcluster.com/register" },
  secondaryCta = { label: "View Pricing", to: "/pricing" },
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-300/15 blur-3xl" />
      </div>

      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <span className="animate-fade-in-down inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
            {Icon && <Icon className="h-4 w-4" />}
            {eyebrow}
          </span>
          <h1 className="animate-fade-in-up mt-5 heading-xl">
            {title}
            {highlight && (
              <>
                <br />
                <span className="gradient-text">{highlight}</span>
              </>
            )}
          </h1>
          <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-body" style={{ animationDelay: "0.1s" }}>
            {description}
          </p>
          <div className="animate-fade-in-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "0.2s" }}>
            {primaryCta.href ? (
              <a href={primaryCta.href} className="btn-primary btn-lg w-full sm:w-auto">
                {primaryCta.label}
                <ArrowRight className="h-5 w-5" />
              </a>
            ) : (
              <Link to={primaryCta.to!} className="btn-primary btn-lg w-full sm:w-auto">
                {primaryCta.label}
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
            {secondaryCta.href ? (
              <a href={secondaryCta.href} className="btn-secondary btn-lg w-full sm:w-auto">
                {secondaryCta.label}
              </a>
            ) : (
              <Link to={secondaryCta.to!} className="btn-secondary btn-lg w-full sm:w-auto">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
