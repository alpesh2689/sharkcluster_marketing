/**
 * Generates public/sitemap.xml from src/routes.ts.
 *
 * Runs as part of `npm run build`, so the sitemap cannot drift from the route
 * table — it has silently gone stale twice when maintained by hand.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const SITE = "https://sharkcluster.com";

// routes.ts is TypeScript, but the shape we need is plain data — parse the
// entries out rather than pulling in a TS loader just for a build script.
const src = readFileSync(resolve(here, "../src/routes.ts"), "utf8");

const entries = [...src.matchAll(
  /\{\s*path:\s*"([^"]+)",\s*sitemap:\s*(true|false)(?:,\s*changefreq:\s*"([^"]+)")?(?:,\s*priority:\s*([\d.]+))?\s*\}/g,
)]
  .filter(([, , sitemap]) => sitemap === "true")
  .map(([, path, , changefreq = "monthly", priority = "0.5"]) => ({ path, changefreq, priority }));

if (entries.length === 0) {
  console.error("generate-sitemap: parsed 0 routes from src/routes.ts — refusing to write an empty sitemap.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map(
    (e) =>
      `  <url><loc>${SITE}${e.path === "/" ? "/" : e.path}</loc>` +
      `<lastmod>${today}</lastmod>` +
      `<changefreq>${e.changefreq}</changefreq>` +
      `<priority>${e.priority}</priority></url>`,
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve(here, "../public/sitemap.xml"), xml);
console.log(`generate-sitemap: wrote ${entries.length} URLs`);
