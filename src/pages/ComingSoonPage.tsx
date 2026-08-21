import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";

/**
 * Placeholder for pages that are built but not ready to open.
 *
 * The routes stay live so existing links and search results do not hard-404,
 * but the pages are removed from the nav, the footer and the sitemap, and are
 * marked noindex — an empty page ranking for its own name is worse than not
 * ranking at all.
 *
 * The real page components are still in the repo. Restoring one is a two-line
 * change: point its route back at the original component and flip
 * `sitemap: true` in src/routes.ts.
 */

interface ComingSoonPageProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  path: string;
  /** Somewhere genuinely useful to go instead. */
  alternatives?: { label: string; to: string }[];
}

export default function ComingSoonPage({
  eyebrow,
  title,
  highlight,
  description,
  path,
  alternatives = [],
}: ComingSoonPageProps) {
  // Not indexable while there is nothing here.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <>
      <Seo title={`${title} — Coming Soon`} description={description} path={path} />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={description}
        icon={Clock}
        primaryCta={{ label: "Back to home", to: "/" }}
        secondaryCta={{ label: "Talk to us", to: "/contact" }}
      />

      <section className="section pt-4">
        <div className="container-px">
          <div className="mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
              <Clock className="h-4 w-4" />
              Coming soon
            </span>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-500">
              We would rather ship this with something real in it than put up a placeholder. It is
              not live yet — if you need it now, get in touch and we will help directly.
            </p>

            {alternatives.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-400">
                  In the meantime
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {alternatives.map((alt) => (
                    <Link
                      key={alt.to}
                      to={alt.to}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition-all hover:border-brand-300 hover:text-brand-600"
                    >
                      {alt.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link to="/" className="btn-secondary mt-8">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
