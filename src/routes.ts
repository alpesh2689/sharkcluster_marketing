/**
 * Every route the site serves, in one place.
 *
 * `App.tsx` renders from this list and `scripts/generate-sitemap.mjs` reads it,
 * so a new page cannot be added to one and forgotten in the other — which is
 * how ten routes went missing from the sitemap twice.
 *
 * `sitemap: false` marks a route that must NOT be indexed: redirects, the 404,
 * and dynamic detail routes whose real URLs come from the CMS at runtime.
 */

export interface RouteMeta {
  path: string;
  /** Include in public/sitemap.xml. */
  sitemap: boolean;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
}

export const ROUTES: RouteMeta[] = [
  { path: "/", sitemap: true, changefreq: "weekly", priority: 1.0 },

  // Platform
  { path: "/features", sitemap: true, changefreq: "monthly", priority: 0.9 },
  { path: "/features/server-management", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/backups", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/deployment", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/caching", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/firewall", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/monitoring", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/domains-ssl", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/databases", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/cronjobs", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/other-services", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/container-registry", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/managed-databases", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/teams", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/billing", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/features/infracaptain", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/features/self-hosted-supabase", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/integrations", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/self-hosted-apps", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/supported-apps", sitemap: true, changefreq: "monthly", priority: 0.8 },

  // Providers
  { path: "/cloud-providers", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/cloud-providers/digitalocean", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/cloud-providers/contabo", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/cloud-providers/ovhcloud", sitemap: true, changefreq: "monthly", priority: 0.7 },

  // Segments
  { path: "/who-we-serve/india", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/who-we-serve/agencies", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/who-we-serve/global", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/who-we-serve/developers", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/who-we-serve/smb", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/who-we-serve/ecommerce", sitemap: true, changefreq: "monthly", priority: 0.8 },

  // Commercial
  { path: "/pricing", sitemap: true, changefreq: "monthly", priority: 0.9 },
  { path: "/security", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/how-it-works", sitemap: true, changefreq: "monthly", priority: 0.8 },
  { path: "/partners", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/compare", sitemap: true, changefreq: "monthly", priority: 0.8 },

  // Resources
  { path: "/docs", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/docs/api", sitemap: true, changefreq: "weekly", priority: 0.7 },
  { path: "/blog", sitemap: true, changefreq: "weekly", priority: 0.7 },
  { path: "/product-updates", sitemap: true, changefreq: "weekly", priority: 0.7 },
  { path: "/case-studies", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/video-library", sitemap: true, changefreq: "monthly", priority: 0.6 },
  { path: "/community", sitemap: true, changefreq: "monthly", priority: 0.6 },
  { path: "/reviews", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/demo", sitemap: true, changefreq: "monthly", priority: 0.7 },
  { path: "/faq", sitemap: true, changefreq: "monthly", priority: 0.7 },

  // Company
  { path: "/about", sitemap: true, changefreq: "monthly", priority: 0.6 },
  { path: "/contact", sitemap: true, changefreq: "monthly", priority: 0.6 },

  // Legal
  { path: "/legal/privacy", sitemap: true, changefreq: "yearly", priority: 0.3 },
  { path: "/legal/terms", sitemap: true, changefreq: "yearly", priority: 0.3 },
  { path: "/legal/refund", sitemap: true, changefreq: "yearly", priority: 0.3 },
  // /legal/sla is intentionally excluded — robots.txt disallows it until its
  // figures are approved. See docs/marketing plan §2.7.
  { path: "/legal/sla", sitemap: false },

  // Dynamic detail routes — real URLs come from the CMS, not this list.
  { path: "/blog/:slug", sitemap: false },
  { path: "/docs/api/:slug", sitemap: false },

  // Redirects and the catch-all must never be indexed.
  { path: "/refund-policy", sitemap: false },
  { path: "*", sitemap: false },
];

export const SITEMAP_ROUTES = ROUTES.filter((r) => r.sitemap);
