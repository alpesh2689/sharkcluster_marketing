import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { useReveal } from "@/hooks/useReveal";
import { FileText, ChevronRight, Shield, Lock, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface LegalPageProps {
  title: string;
  description: string;
  path: string;
  sections: { heading: string; body: string; link?: { to: string; label: string } }[];
}

export default function LegalPage({ title, description, path, sections }: LegalPageProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <>
      <Seo
        title={`${title} — SharkCluster`}
        description={description}
        path={path}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: title, path }]}
      />

      {/* Split hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-300/15 blur-3xl" />
        </div>
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
                <FileText className="h-4 w-4" />
                Legal
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">{description}</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/30 to-blue-200/20 blur-2xl" />
              <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Shield className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-ink-900">Your Data</span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">Protected</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Data residency", desc: "Your data stays on your VPS", icon: Lock, color: "bg-brand-50 text-brand-600" },
                    { label: "SSH-only access", desc: "Panel talks over SSH — nothing more", icon: Shield, color: "bg-blue-50 text-blue-600" },
                    { label: "No app data stored", desc: "We never store your application data", icon: Check, color: "bg-emerald-50 text-emerald-600" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5 rounded-lg border border-ink-100 bg-ink-50/50 px-3 py-2.5">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.color}`}>
                        <item.icon className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{item.label}</p>
                        <p className="text-[10px] text-ink-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-center text-[10px] text-ink-400">Your server. Your data. Your control.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content with sidebar */}
      <section className="section pt-8 pb-20">
        <div className="container-px">
          <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-5xl`}>
            <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
              {/* Table of contents */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-2xl border border-ink-200 bg-white p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-400">On this page</p>
                  <nav className="space-y-1">
                    {sections.map((section, i) => (
                      <a
                        key={i}
                        href={`#section-${i}`}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                      >
                        {section.heading}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Sections */}
              <div className="space-y-6">
                {sections.map((section, i) => (
                  <div
                    key={i}
                    id={`section-${i}`}
                    className="rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:border-brand-200 hover:shadow-lg sm:p-8"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 font-display text-sm font-bold text-brand-600">
                        {i + 1}
                      </span>
                      <h2 className="font-display text-xl font-bold text-ink-900">{section.heading}</h2>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-ink-600">{section.body}</p>
                    {section.link && (
                      <Link
                        to={section.link.to}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                      >
                        {section.link.label}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                ))}
                <div className="rounded-2xl border border-ink-100 bg-ink-50/50 p-6">
                  <p className="text-sm text-ink-400">
                    Last updated: August 2026. Questions about this policy? Contact us at{" "}
                    <a href="mailto:legal@sharkcluster.com" className="font-medium text-brand-600 hover:underline">legal@sharkcluster.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
