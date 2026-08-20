import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, BookOpen, Calendar, Loader2, Search, User } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { useReveal } from "@/hooks/useReveal";
import { fetchBlogs, resolveAsset, API_CONFIGURED, type BlogSummary } from "@/lib/api";
import { formatDate } from "@/lib/format";

/**
 * Posts come from the product's blog CMS (GET /get/blogs), not from copy held
 * in this repo — the admin blog editor is the single place a post is written.
 */

export default function BlogPage() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [posts, setPosts] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(API_CONFIGURED);
  const [failed, setFailed] = useState(false);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!API_CONFIGURED) return;
    const controller = new AbortController();
    fetchBlogs(controller.signal)
      .then(setPosts)
      .catch((err: Error) => {
        if (err.name !== "AbortError") setFailed(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(posts.map((p) => p.category).filter((c): c is string => !!c))],
    [posts],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => {
      const inCategory = category === "All" || post.category === category;
      const inSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        (post.excerpt ?? "").toLowerCase().includes(term);
      return inCategory && inSearch;
    });
  }, [posts, category, query]);

  return (
    <>
      <Seo
        title="Blog — Insights on Hosting, DevOps & Self-Hosting"
        description="Expert insights on managed cloud hosting, server management, caching, backups, self-hosted business apps, and DevOps best practices from the SharkCluster team."
        path="/blog"
        keywords={["cloud hosting blog", "DevOps blog", "server management tips", "self-hosting guide", "VPS tutorials", "backup strategies"]}
        breadcrumbSchema={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
      />
      <PageHero
        eyebrow="Blog"
        title="Insights on hosting,"
        highlight="DevOps & self-hosting"
        description="Engineering deep-dives, product updates, and infrastructure guides from the SharkCluster team."
        icon={BookOpen}
      />

      {/* Search */}
      {posts.length > 0 && (
        <section className="pt-2">
          <div className="container-px">
            <div className="relative mx-auto max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                className="w-full rounded-xl border border-ink-200 bg-white py-3.5 pl-12 pr-4 text-base shadow-sm transition-all placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
              />
            </div>

            {categories.length > 1 && (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                      category === cat
                        ? "bg-brand-500 text-white shadow-sm shadow-brand-500/25"
                        : "border border-ink-200 bg-white text-ink-600 hover:border-brand-200 hover:text-brand-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section pt-10">
        <div className="container-px">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
              <span className="sr-only">Loading articles</span>
            </div>
          ) : failed ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-16 text-center">
              <AlertCircle className="mx-auto h-10 w-10 text-ink-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Articles didn't load</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Something went wrong reaching the blog. Please refresh, or try again shortly.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-16 text-center`}>
              <BookOpen className="mx-auto h-10 w-10 text-ink-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">
                {posts.length === 0 ? "Articles coming soon" : "No matching articles"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {posts.length === 0
                  ? "We're working on in-depth guides covering backups, caching, deployment, monitoring, and self-hosting. Check back shortly for the first posts."
                  : "Try a different search term or category."}
              </p>
            </div>
          ) : (
            <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => {
                const cover = resolveAsset(post.cover_image);
                return (
                  <article
                    key={post.id}
                    className={`reveal ${visible ? "is-visible" : ""}`}
                    style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                  >
                    <Link to={`/blog/${post.slug}`} className="card-hover group flex h-full flex-col overflow-hidden">
                      {cover ? (
                        <div className="h-44 overflow-hidden bg-ink-100">
                          <img
                            src={cover}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="flex h-44 items-center justify-center bg-gradient-to-br from-brand-50 via-brand-100/60 to-white">
                          <BookOpen className="h-12 w-12 text-brand-300" strokeWidth={1.5} />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col p-6">
                        {post.category && (
                          <span className="mb-3 self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                            {post.category}
                          </span>
                        )}
                        <h3 className="font-display text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-600">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
                        )}

                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-100 pt-4 text-xs text-ink-400">
                          <div className="flex min-w-0 flex-wrap items-center gap-3">
                            {post.author && (
                              <span className="flex items-center gap-1 truncate">
                                <User className="h-3.5 w-3.5 shrink-0" />
                                {post.author}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 shrink-0" />
                              {formatDate(post.published_at ?? post.created_at)}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-500" />
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
