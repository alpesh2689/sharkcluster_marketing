import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronLeft, FileText } from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import NotFoundPage from "@/pages/NotFoundPage";
import { findGuide, isPublished, DOC_GUIDES } from "@/content/docsGuides";

/** Anchor id for a heading, stable across renders. */
function headingId(heading: string, i: number) {
  const slug = heading.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
  return slug ? `${slug}-${i}` : `section-${i}`;
}

export default function DocGuidePage() {
  const { category, slug } = useParams();
  const guide = findGuide(category, slug);

  // A guide with no content yet must not be indexed — an empty page ranking for
  // its own title is worse than not ranking at all.
  const published = guide ? isPublished(guide) : false;
  useEffect(() => {
    if (published) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [published]);

  // An unknown slug is a genuine 404, not a docs page.
  if (!guide) return <NotFoundPage />;

  const related = DOC_GUIDES.filter((g) => g.category === guide.category && g.slug !== guide.slug);

  return (
    <>
      <Seo
        title={`${guide.title} — Documentation`}
        description={guide.description}
        path={`/docs/${guide.category}/${guide.slug}`}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/docs" },
          { name: guide.title, path: `/docs/${guide.category}/${guide.slug}` },
        ]}
      />

      <section className="relative overflow-hidden pb-10 pt-28 lg:pt-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute inset-0 hero-glow" />
        </div>
        <div className="container-px">
          <Link
            to="/docs"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-400 transition-colors hover:text-brand-600"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Documentation
          </Link>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 max-w-2xl text-body">{guide.description}</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-px">
          <div className="flex flex-col gap-10 lg:flex-row">
            <article className="min-w-0 flex-1">
              {published ? (
                <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-10">
                  {guide.sections.map((section, i) => (
                    <div key={i}>
                      <h2
                        id={headingId(section.heading, i)}
                        className="mt-10 scroll-mt-24 font-display text-2xl font-bold tracking-tight text-ink-900 first:mt-0"
                      >
                        {section.heading}
                      </h2>
                      <p className="mt-4 text-[17px] leading-[1.8] text-ink-700">{section.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-16 text-center">
                  <FileText className="mx-auto h-10 w-10 text-ink-300" />
                  <h2 className="mt-4 font-display text-xl font-bold text-ink-900">
                    This guide is being written
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">
                    It isn't published yet. In the meantime the API reference and the rest of the
                    documentation hub may cover what you need — or ask support and we'll walk you through it.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <Link to="/docs" className="btn-primary">
                      <BookOpen className="h-4 w-4" />
                      Documentation hub
                    </Link>
                    <Link to="/contact" className="btn-secondary">
                      Ask a question
                    </Link>
                  </div>
                </div>
              )}

              <Link to="/docs" className="btn-secondary mt-8">
                <ArrowLeft className="h-4 w-4" />
                All documentation
              </Link>
            </article>

            {related.length > 0 && (
              <aside className="w-full shrink-0 lg:w-64">
                <div className="sticky top-24">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-ink-400">In this section</h2>
                  <ul className="mt-3 space-y-1 border-l border-ink-200">
                    {related.map((g) => (
                      <li key={g.slug}>
                        <Link
                          to={`/docs/${g.category}/${g.slug}`}
                          className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-600"
                        >
                          {g.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
