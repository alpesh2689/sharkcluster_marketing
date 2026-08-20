import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertCircle, ArrowLeft, Calendar, Check, ChevronLeft, Clock, Copy, Loader2, Quote, Tag,
} from "lucide-react";
import Seo from "@/components/Seo";
import FinalCTA from "@/components/FinalCTA";
import { fetchBlogBySlug, fetchBlogs, resolveAsset, API_CONFIGURED, type BlogPost, type BlogSummary } from "@/lib/api";
import { parseBlocks, readingTime, headingId, type ContentBlock } from "@/lib/blogBlocks";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import { formatDate } from "@/lib/format";

/* ------------------------------------------------------------- blocks -- */

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-2xl border border-ink-800 bg-ink-950">
      <div className="flex items-center justify-between border-b border-ink-800 bg-ink-900 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </span>
          {language && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{language}</span>
          )}
        </div>
        <button
          onClick={copy}
          aria-label="Copy code"
          className="rounded-lg p-1.5 text-ink-400 opacity-0 transition-all hover:bg-white/10 hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-5">
        <code className="font-mono text-[13px] leading-relaxed text-ink-100">{code}</code>
      </pre>
    </div>
  );
}

function BlockRenderer({ block, index }: { block: ContentBlock; index: number }) {
  switch (block.type) {
    case "heading": {
      const level = Math.min(Math.max(block.level ?? 2, 2), 4);
      const content = block.content ?? "";
      const Tag = `h${level}` as "h2" | "h3" | "h4";
      const size =
        level === 2
          ? "font-display text-2xl font-bold sm:text-3xl mt-12 mb-5"
          : level === 3
            ? "font-display text-xl font-bold sm:text-2xl mt-10 mb-4"
            : "font-display text-lg font-bold sm:text-xl mt-8 mb-3";
      return (
        <Tag id={headingId(content, index)} className={`scroll-mt-24 tracking-tight text-ink-900 ${size}`}>
          {content}
        </Tag>
      );
    }

    case "paragraph":
      return <p className="mb-6 text-[17px] leading-[1.8] text-ink-700">{block.content}</p>;

    case "code":
      return <CodeBlock code={block.code ?? block.content ?? ""} language={block.language} />;

    case "html":
      return (
        <div
          className="my-6 text-[17px] leading-[1.8] text-ink-700 [&_a]:text-brand-600 [&_a]:underline [&_code]:rounded [&_code]:bg-ink-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[15px] [&_h2]:font-display [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink-900 [&_h3]:font-display [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink-900 [&_li]:mb-2 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_strong]:font-semibold [&_strong]:text-ink-900 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.html ?? block.content ?? "") }}
        />
      );

    case "image": {
      const src = resolveAsset(block.src ?? block.url);
      if (!src) return null;
      return (
        <figure className="my-10">
          <div className="overflow-hidden rounded-2xl border border-ink-200 bg-ink-50">
            <img src={src} alt={block.alt ?? ""} loading="lazy" className="w-full object-cover" />
          </div>
          {block.alt && (
            <figcaption className="mt-3 text-center text-sm text-ink-500">{block.alt}</figcaption>
          )}
        </figure>
      );
    }

    case "list": {
      const ordered = block.listType === "ordered";
      const items = block.items ?? [];
      if (items.length === 0) return null;
      if (ordered) {
        return (
          <ol className="mb-6 list-decimal space-y-3 pl-6 text-[17px] leading-[1.8] text-ink-700 marker:font-semibold marker:text-ink-400">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="mb-6 space-y-3 text-[17px] leading-[1.8] text-ink-700">
          {items.map((item, i) => (
            <li key={i} className="relative pl-7">
              <span className="absolute left-0 top-[11px] flex h-4 w-4 items-center justify-center rounded-full bg-brand-50">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    }

    case "quote":
      return (
        <blockquote className="my-10 rounded-r-2xl border-l-4 border-brand-500 bg-brand-50/50 py-6 pl-6 pr-5">
          <Quote className="h-7 w-7 text-brand-200" />
          <p className="mt-3 text-xl italic leading-relaxed text-ink-800">{block.content}</p>
          {block.author && (
            <cite className="mt-4 flex items-center gap-2 text-sm font-semibold not-italic text-ink-600">
              <span className="h-px w-6 bg-ink-300" />
              {block.author}
            </cite>
          )}
        </blockquote>
      );

    default:
      return null;
  }
}

/* -------------------------------------------------------------- share -- */

const SHARE_TARGETS = [
  { name: "X", build: (u: string, t: string) => `https://x.com/intent/tweet?text=${t}&url=${u}`, path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "LinkedIn", build: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "Facebook", build: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}`, path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
];

function SocialShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    void navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs font-bold uppercase tracking-wider text-ink-400">Share</span>
      {SHARE_TARGETS.map((target) => (
        <a
          key={target.name}
          href={target.build(encodedUrl, encodedTitle)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${target.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink-200 text-ink-400 transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={target.path} />
          </svg>
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link to this article"
        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
          copied
            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
            : "border-ink-200 text-ink-400 hover:bg-ink-50 hover:text-ink-600"
        }`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* --------------------------------------------------------------- page -- */

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    setLoading(true);
    setNotFound(false);

    Promise.all([
      fetchBlogBySlug(slug, controller.signal),
      fetchBlogs(controller.signal).catch(() => [] as BlogSummary[]),
    ])
      .then(([found, all]) => {
        if (!found) {
          setNotFound(true);
          return;
        }
        setPost(found);
        // Same category first, then anything else, so the rail is never empty.
        const others = all.filter((p) => p.slug !== slug);
        const sameCategory = others.filter((p) => p.category && p.category === found.category);
        const rest = others.filter((p) => !sameCategory.includes(p));
        setRelated([...sameCategory, ...rest].slice(0, 3));
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setNotFound(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <p className="text-sm font-medium text-ink-400">Loading article…</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <Seo
          title="Article Not Found"
          description="The article you're looking for doesn't exist or has been removed."
          path={`/blog/${slug}`}
        />
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100">
            <AlertCircle className="h-8 w-8 text-ink-300" />
          </span>
          <h1 className="mt-6 font-display text-2xl font-bold text-ink-900">Article not found</h1>
          <p className="mt-2 max-w-md text-ink-500">
            {API_CONFIGURED
              ? "This article doesn't exist or has been removed."
              : "The blog isn't reachable from this environment."}
          </p>
          <Link to="/blog" className="btn-primary mt-8">
            <ArrowLeft className="h-4 w-4" />
            Back to the blog
          </Link>
        </div>
      </>
    );
  }

  const blocks = parseBlocks(post.content);
  const minutes = readingTime(blocks);
  const cover = resolveAsset(post.cover_image);
  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://sharkcluster.com/blog/${slug}`;
  const toc = blocks
    .map((block, i) => ({ block, i }))
    .filter((entry): entry is { block: Extract<ContentBlock, { type: "heading" }>; i: number } =>
      entry.block.type === "heading" && !!entry.block.content);

  return (
    <>
      <Seo
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || `Read ${post.title} on the SharkCluster blog.`}
        path={`/blog/${post.slug}`}
        type="article"
        image={cover ?? undefined}
        keywords={post.meta_keywords ? post.meta_keywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined}
        breadcrumbSchema={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 lg:pt-32">
        {cover ? (
          <div className="absolute inset-0 -z-10">
            <img src={cover} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/75 to-ink-950/55" />
          </div>
        ) : (
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 grid-pattern" />
            <div className="absolute inset-0 hero-glow" />
          </div>
        )}

        <div className="container-px">
          <Link
            to="/blog"
            className={`group mb-7 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              cover ? "text-white/70 hover:text-white" : "text-ink-400 hover:text-brand-600"
            }`}
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to the blog
          </Link>

          <div className="max-w-3xl">
            {post.category && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                  cover
                    ? "border border-white/20 bg-white/10 text-white"
                    : "border border-brand-200 bg-brand-50 text-brand-700"
                }`}
              >
                <Tag className="h-3 w-3" />
                {post.category}
              </span>
            )}
            <h1
              className={`mt-5 font-display text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl ${
                cover ? "text-white" : "text-ink-900"
              }`}
            >
              {post.title}
            </h1>
            <div
              className={`mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${
                cover ? "text-white/70" : "text-ink-500"
              }`}
            >
              {post.author && (
                <span className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                  {post.author}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at ?? post.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {minutes} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-20">
        <div className="container-px">
          <div className="flex flex-col gap-10 lg:flex-row">
            <article className="min-w-0 flex-1">
              {blocks.length > 0 ? (
                <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-10">
                  {blocks.map((block, i) => (
                    <BlockRenderer key={i} block={block} index={i} />
                  ))}

                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink-100 pt-6">
                    <span className="text-xs font-medium text-ink-300">End of article</span>
                    <SocialShare url={shareUrl} title={post.title} />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-ink-200 bg-white px-8 py-16 text-center shadow-sm">
                  <AlertCircle className="mx-auto h-8 w-8 text-ink-300" />
                  <p className="mt-4 font-semibold text-ink-600">No content yet</p>
                  <p className="mt-1 text-sm text-ink-400">This article has no content blocks.</p>
                </div>
              )}

              <Link to="/blog" className="btn-secondary mt-8">
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>
            </article>

            {/* Rail */}
            <aside className="w-full shrink-0 lg:w-72">
              <div className="sticky top-24 space-y-8">
                {toc.length > 1 && (
                  <nav aria-label="On this page">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-ink-400">On this page</h2>
                    <ul className="mt-3 space-y-1 border-l border-ink-200">
                      {toc.map(({ block, i }) => (
                        <li key={i}>
                          <a
                            href={`#${headingId(block.content ?? "", i)}`}
                            className={`-ml-px block border-l-2 border-transparent py-1.5 text-sm text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-600 ${
                              (block.level ?? 2) > 2 ? "pl-6" : "pl-4"
                            }`}
                          >
                            {block.content}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {related.length > 0 && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-ink-400">Related articles</h2>
                    <div className="mt-3 space-y-3">
                      {related.map((item) => {
                        const thumb = resolveAsset(item.cover_image);
                        return (
                          <Link
                            key={item.id}
                            to={`/blog/${item.slug}`}
                            className="card-hover group flex gap-3 overflow-hidden p-3"
                          >
                            <span className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-100">
                              {thumb ? (
                                <img src={thumb} alt="" loading="lazy" className="h-full w-full object-cover" />
                              ) : (
                                <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
                                  <Tag className="h-5 w-5 text-brand-300" />
                                </span>
                              )}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="line-clamp-2 block text-sm font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-600">
                                {item.title}
                              </span>
                              <span className="mt-1.5 flex items-center gap-1 text-xs text-ink-400">
                                <Calendar className="h-3 w-3" />
                                {formatDate(item.published_at ?? item.created_at)}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
