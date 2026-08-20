import { Link } from "react-router-dom";
import { Cloud, Check, ArrowRight, ArrowLeft, Server, Globe, Zap, Shield, RefreshCw, CreditCard, MapPin } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import type { LucideIcon } from "lucide-react";

export interface CloudProviderProps {
  seo: {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    faqSchema?: { q: string; a: string }[];
  };
  providerName: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  icon: LucideIcon;
  billingModel: string;
  billingIcon?: LucideIcon;
  regions: string;
  tagline: string;
  strengths: { icon: LucideIcon; title: string; desc: string }[];
  datacenters: { region: string; locations: string[] }[];
  planNote: string;
}

export default function CloudProviderPage({
  seo,
  providerName,
  eyebrow,
  title,
  highlight,
  description,
  icon: Icon,
  billingModel,
  billingIcon: BillingIcon = CreditCard,
  regions,
  tagline,
  strengths,
  datacenters,
  planNote,
}: CloudProviderProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const quickFacts = [
    { icon: BillingIcon, label: "Billing Model", value: billingModel },
    { icon: Globe, label: "Regions", value: regions },
    { icon: Cloud, label: "Status", value: "Available now" },
  ];

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
          { name: "Cloud Providers", path: "/cloud-providers" },
          { name: providerName, path: seo.path },
        ]}
      />
      <PageHero eyebrow={eyebrow} title={title} highlight={highlight} description={description} icon={Icon} />

      <section className="section pt-8">
        <div className="container-px">
          <div className="mx-auto max-w-5xl">
            <Link to="/cloud-providers" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700">
              <ArrowLeft className="h-4 w-4" />
              All Cloud Providers
            </Link>

            {/* Quick facts */}
            <div ref={ref} className="mt-8 grid gap-4 sm:grid-cols-3">
              {quickFacts.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`reveal ${visible ? "is-visible" : ""} group rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:border-brand-200 hover:shadow-lg`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <fact.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-400">{fact.label}</p>
                  <p className="mt-1 text-sm font-bold text-ink-900">{fact.value}</p>
                </div>
              ))}
            </div>

            {/* Tagline / overview */}
            <div className={`reveal ${visible ? "is-visible" : ""} mt-8 relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-white p-8`}>
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-200/20 blur-3xl" />
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-lg leading-relaxed text-ink-800">{tagline}</p>
              </div>
            </div>

            {/* Strengths */}
            <div className="mt-14">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Zap className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-bold text-ink-900">
                  Why host {providerName} with SharkCluster
                </h2>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {strengths.map((strength, i) => (
                  <div
                    key={strength.title}
                    className={`reveal ${visible ? "is-visible" : ""} group rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:border-brand-200 hover:shadow-lg`}
                    style={{ transitionDelay: `${(i % 2) * 80}ms` }}
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <strength.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-ink-900">{strength.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{strength.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Datacenters */}
            <div className="mt-14">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MapPin className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-bold text-ink-900">Datacenter regions</h2>
              </div>
              <p className="mt-3 text-body">
                {providerName} datacenters available through SharkCluster. Pick the region closest to your users —
                the panel handles provisioning and wiring automatically.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {datacenters.map((dc, i) => (
                  <div
                    key={dc.region}
                    className={`reveal ${visible ? "is-visible" : ""} group rounded-xl border border-ink-200 bg-white p-5 transition-all duration-300 hover:border-emerald-200 hover:shadow-md`}
                    style={{ transitionDelay: `${(i % 3) * 60}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-3 w-3" />
                      </span>
                      <h3 className="font-display text-sm font-bold text-ink-900">{dc.region}</h3>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {dc.locations.map((loc) => (
                        <li key={loc} className="flex items-center gap-2 text-sm text-ink-600">
                          <span className="h-1 w-1 rounded-full bg-emerald-400" />
                          {loc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan note */}
            <div className={`reveal ${visible ? "is-visible" : ""} mt-14 relative overflow-hidden rounded-2xl border border-ink-200 bg-ink-50/50 p-8`}>
              <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-brand-200/15 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <CreditCard className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink-900">Plans and pricing</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">{planNote}</p>
                <Link to="/pricing" className="btn-primary mt-5">
                  Compare plans
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Cross-link to other providers */}
            <div className="mt-12 border-t border-ink-200 pt-8">
              <div className="flex flex-col gap-4 rounded-2xl border border-ink-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink-900">Other cloud providers</h3>
                  <p className="mt-1 text-sm text-ink-500">
                    Compare {providerName} against the other providers SharkCluster supports.
                  </p>
                </div>
                <Link to="/cloud-providers" className="btn-secondary whitespace-nowrap">
                  Compare all providers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
