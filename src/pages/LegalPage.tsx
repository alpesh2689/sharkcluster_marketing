import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface LegalPageProps {
  title: string;
  description: string;
  path: string;
  sections: { heading: string; body: string; link?: { to: string; label: string } }[];
}

export default function LegalPage({ title, description, path, sections }: LegalPageProps) {
  return (
    <>
      <Seo
        title={`${title} — SharkCluster`}
        description={description}
        path={path}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: title, path }]}
      />
      <PageHero
        eyebrow="Legal"
        title={title}
        description={description}
        icon={FileText}
      />

      <section className="section pt-8 pb-20">
        <div className="container-px">
          <div className="mx-auto max-w-3xl space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-display text-xl font-bold text-ink-900">{section.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-600">{section.body}</p>
                {section.link && (
                  <Link
                    to={section.link.to}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                  >
                    {section.link.label}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
            <div className="border-t border-ink-200 pt-8">
              <p className="text-sm text-ink-400">
                Last updated: August 2026. Questions about this policy? Contact us at legal@sharkcluster.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
