/**
 * Region latency estimates and the "Recommended" grouping.
 *
 * Ported from the panel (componets/Common/PlanSelector.jsx). These are NOT
 * measured pings — they are a lookup of typical latency from the visitor's
 * continent to each region, which is why every figure is shown with a "~".
 * The panel does the same thing, so the marketing page and the create-server
 * form recommend the same regions to the same visitor.
 *
 * The panel also adds ±5ms of random jitter for effect. That is deliberately
 * NOT ported: a number that changes on every page load, for no reason, is worse
 * than a stable estimate.
 */

/** Canonical region names, matching the panel's normalizeRegion(). */
export type CanonicalRegion =
  | "India" | "Singapore" | "Japan" | "UK" | "Germany"
  | "Netherlands" | "USA" | "Canada" | "Australia";

/** A provider's region string → one canonical name. Mirrors normalizeRegion(). */
/** Country code → canonical region, the last-resort fallback. */
const REGION_BY_COUNTRY: Record<string, CanonicalRegion> = {
  IN: "India", SG: "Singapore", JP: "Japan", GB: "UK", UK: "UK",
  DE: "Germany", AT: "Germany", NL: "Netherlands",
  US: "USA", CA: "Canada", AU: "Australia", NZ: "Australia",
};

/**
 * Resolve a region to a canonical name, preferring the provider's region string
 * and falling back to the city, then the country. A provider can label the same
 * place any way it likes, so all three are tried before giving up.
 */
export function resolveRegion(
  regionKey: string | null | undefined,
  city: string | null | undefined,
  country: string | null | undefined,
): string {
  for (const candidate of [regionKey, city]) {
    const resolved = normalizeRegion(candidate);
    if (resolved !== "Unknown" && resolved !== candidate) return resolved;
  }
  const byCountry = REGION_BY_COUNTRY[(country ?? "").toUpperCase()];
  if (byCountry) return byCountry;
  return normalizeRegion(regionKey ?? city);
}

export function normalizeRegion(raw: string | null | undefined): string {
  if (!raw) return "Unknown";
  const r = raw.toLowerCase();
  if (r.includes("india") || r.includes("blr") || r.includes("bangalore") || r.includes("mumbai") || r.includes("bom")
    || r.includes("ahmedabad") || r.includes("delhi") || r.includes("chennai") || r.includes("hyderabad")
    || r.includes("pune") || r.includes("noida") || /(^|[^a-z])in([^a-z]|$)/.test(r)) return "India";
  if (r.includes("singapore") || r.includes("sgp")) return "Singapore";
  if (r.includes("uk") || r.includes("united kingdom") || r.includes("lon") || r.includes("london")) return "UK";
  if (r.includes("germany") || r.includes("fra") || r.includes("frankfurt") || r.includes("european union") || r.includes("nuremberg")) return "Germany";
  if (r.includes("netherlands") || r.includes("ams") || r.includes("amsterdam")) return "Netherlands";
  if (r.includes("usa") || r.includes("new york") || r.includes("nyc") || r.includes("sfo") || r.includes("san francisco") || r.includes("united states")) return "USA";
  if (r.includes("canada") || r.includes("toronto") || r.includes("tor")) return "Canada";
  if (r.includes("australia") || r.includes("sydney") || r.includes("syd")) return "Australia";
  if (r.includes("japan") || r.includes("tokyo")) return "Japan";
  return raw;
}

type LatencyTable = Record<string, number>;

const FROM_ASIA: LatencyTable = {
  India: 35, Singapore: 65, Japan: 110, Australia: 140,
  UK: 145, Germany: 150, Netherlands: 140, USA: 230, Canada: 240,
};
const FROM_EUROPE: LatencyTable = {
  UK: 15, Germany: 20, Netherlands: 15, USA: 90, Canada: 95,
  India: 140, Singapore: 160, Japan: 220, Australia: 250,
};
const FROM_OCEANIA: LatencyTable = {
  Australia: 25, Singapore: 95, Japan: 110, India: 140,
  USA: 160, Canada: 170, UK: 250, Germany: 260, Netherlands: 250,
};
/** Default, matching the panel's base table (Americas / everywhere else). */
const FROM_AMERICAS: LatencyTable = {
  USA: 20, Canada: 30, UK: 85, Germany: 95, Netherlands: 90,
  India: 210, Singapore: 230, Japan: 140, Australia: 170,
};

const ASIA = ["IN", "SG", "JP", "CN", "KR", "ID", "MY", "PH", "TH", "VN"];
const EUROPE = ["GB", "DE", "NL", "FR", "IT", "ES", "PL", "SE", "NO", "FI", "DK", "IE"];
const OCEANIA = ["AU", "NZ"];

export function latencyTableFor(country: string | null): LatencyTable {
  const c = (country ?? "").toUpperCase();
  if (ASIA.includes(c)) return FROM_ASIA;
  if (EUROPE.includes(c)) return FROM_EUROPE;
  if (OCEANIA.includes(c)) return FROM_OCEANIA;
  return FROM_AMERICAS;
}

/** Same free geo lookup the panel uses. Best-effort — never blocks rendering. */
export async function detectCountry(signal?: AbortSignal): Promise<string | null> {
  try {
    const res = await fetch("https://api.country.is/", { signal });
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string };
    return data.country ?? null;
  } catch {
    return null;
  }
}

/** The two lowest-latency regions for this visitor, shown under "Recommended". */
export function recommendedRegions(table: LatencyTable): string[] {
  return Object.entries(table)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 2)
    .map(([region]) => region);
}

/** ISO-3166 alpha-2 → flag emoji. No image assets, no network request. */
export function flagEmoji(code: string | null | undefined): string {
  if (!code || code.length !== 2) return "🌐";
  const cc = code.toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return "🌐";
  return String.fromCodePoint(...[...cc].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65));
}
