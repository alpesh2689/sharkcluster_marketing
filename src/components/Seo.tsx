import { useEffect } from "react";

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  image?: string;
  faqSchema?: { q: string; a: string; link?: { href: string; label: string } }[];
  breadcrumbSchema?: { name: string; path: string }[];
}

const SITE_NAME = "SharkCluster";
const SITE_URL = "https://sharkcluster.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-default.svg`;

function setMeta(attr: string, key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

export default function Seo({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  image = DEFAULT_IMAGE,
  faqSchema,
  breadcrumbSchema,
}: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    setMeta("name", "description", description);
    if (keywords.length) setMeta("name", "keywords", keywords.join(", "));

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image", image);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    setLink("canonical", url);

    // Organization JSON-LD (always present)
    setJsonLd("ld-organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      sameAs: [],
    });

    // WebSite JSON-LD with SearchAction
    setJsonLd("ld-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });

    // Breadcrumb JSON-LD
    const crumbs = breadcrumbSchema ?? [{ name: "Home", path: "/" }, { name: title, path }];
    setJsonLd("ld-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    });

    // FAQ JSON-LD for AEO
    if (faqSchema && faqSchema.length) {
      setJsonLd("ld-faq", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSchema.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      });
    } else {
      removeJsonLd("ld-faq");
    }

    return () => {
      removeJsonLd("ld-faq");
    };
  }, [fullTitle, description, url, type, image, keywords, faqSchema, breadcrumbSchema, title]);

  return null;
}
