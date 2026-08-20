/**
 * Plan selection, ported from the panel's PlanSelector (frontend
 * componets/Common/PlanSelector.jsx).
 *
 * The marketing page must produce the SAME three cards and the same table the
 * customer will see in the create-server form, or the price they were quoted
 * changes when they sign up. The rules below mirror that file deliberately —
 * including the 0.25GB match tolerance, the 96GB+ bucket, and the 2x cap on the
 * Best Value card. If PlanSelector changes, this has to change with it.
 */
import type { PublicPlan } from "@/lib/api";

export type Currency = "USD" | "INR";

export const CONTINENTS = ["Asia", "Europe", "America", "Australia"] as const;
export type Continent = (typeof CONTINENTS)[number];

const CONTINENT_BY_COUNTRY: Record<string, Continent> = {
  IN: "Asia", SG: "Asia", JP: "Asia", KR: "Asia", HK: "Asia", ID: "Asia", AE: "Asia", IL: "Asia",
  DE: "Europe", NL: "Europe", GB: "Europe", UK: "Europe", FR: "Europe", PL: "Europe",
  FI: "Europe", ES: "Europe", IT: "Europe", SE: "Europe", AT: "Europe", IE: "Europe",
  US: "America", CA: "America", BR: "America", MX: "America", CL: "America",
  AU: "Australia", NZ: "Australia",
};

/** A plan row with its price resolved for the chosen currency. */
export interface PricedPlan extends PublicPlan {
  price: number;
  hourly: number;
  uid: string;
  /** Card label: "✨ Recommended" | "Best Value" | "Exact match" | "Also available". */
  reason?: string;
  /** e.g. "+2GB RAM, +2 vCPU extra". */
  extraSpecsText?: string | null;
}

/** A card: the plan, plus the same plan in other regions for the dropdown. */
export interface PlanCard {
  basePlan: PricedPlan;
  subPlans: PricedPlan[];
}

const num = (v: string | number | null | undefined): number => {
  const n = typeof v === "string" ? parseFloat(v) : v ?? 0;
  return Number.isFinite(n) ? (n as number) : 0;
};

export const currencySymbol = (c: Currency) => (c === "INR" ? "₹" : "$");

export function formatPrice(value: number, currency: Currency): string {
  return `${currencySymbol(currency)}${value.toLocaleString(currency === "INR" ? "en-IN" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatRam(gb: number): string {
  if (gb >= 96) return "96GB+";
  return gb < 1 ? `${gb.toFixed(2)}GB` : `${gb}GB`;
}

/**
 * Price the catalogue for a currency and drop anything unsellable.
 *
 * Plans with no region are excluded, matching PlanSelector — a plan the panel
 * cannot place in a region is not something a customer can buy.
 */
export function pricePlans(plans: PublicPlan[], currency: Currency): PricedPlan[] {
  return plans
    .filter((p) => (p.region ?? "").trim() !== "")
    .map((p, i) => ({
      ...p,
      uid: `${p.id}_${(p.region ?? String(i)).replace(/\s+/g, "-")}`,
      price: num(currency === "INR" ? p.price_monthly_inr : p.price_monthly_usd),
      hourly: num(currency === "INR" ? p.price_hourly_inr : p.price_hourly_usd),
    }))
    .filter((p) => p.price > 0);
}

/** RAM tiers present in the catalogue, capped at 96 (96+ collapses to one tier). */
export function ramTiers(plans: PricedPlan[]): number[] {
  const tiers = [...new Set(plans.map((p) => num(p.memory_gb)))]
    .filter((r) => r > 0 && r <= 96)
    .sort((a, b) => a - b);
  return tiers;
}

/** PlanSelector's tolerance: within 0.25GB is the same tier; 96 means "96 or more". */
const ramMatches = (planGb: number, ram: number) =>
  ram >= 96 ? planGb >= 96 : Math.abs(planGb - ram) < 0.25;

export interface RegionOption {
  key: string;
  label: string;
  country: string | null;
  continent: Continent | "Other";
}

export function regionOptions(plans: PricedPlan[]): RegionOption[] {
  const byKey = new Map<string, RegionOption>();
  for (const p of plans) {
    const key = p.region ?? "";
    if (!key || byKey.has(key)) continue;
    const country = (p.region_country ?? "").toUpperCase() || null;
    byKey.set(key, {
      key,
      label: p.region_city || p.region || key,
      country,
      continent: (country && CONTINENT_BY_COUNTRY[country]) || "Other",
    });
  }
  return [...byKey.values()].sort((a, b) => a.label.localeCompare(b.label));
}

const samePlan = (a: PricedPlan | null, b: PricedPlan | null) =>
  !!a && !!b && ((!!a.plan_code && a.plan_code === b.plan_code) ||
    (a.plan_name === b.plan_name && a.provider === b.provider));

const cheapest = (list: PricedPlan[]) =>
  list.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));

function extraSpecs(plan: PricedPlan, ram: number, vcpu: number | null): string | null {
  const out: string[] = [];
  const gb = num(plan.memory_gb);
  if (vcpu && num(plan.vcpus) > vcpu) out.push(`+${num(plan.vcpus) - vcpu} vCPU`);
  if (gb > ram + 0.25) out.push(`+${Math.round(gb - ram)}GB RAM`);
  return out.length ? `${out.join(", ")} extra` : null;
}

export interface SelectionResult {
  cards: PlanCard[];
  /** Remaining plans at this exact tier, for the comparison table. */
  tablePlans: PricedPlan[];
  /** Regions that DO have this RAM tier, when the chosen one does not. */
  alternativeRegions: string[];
}

/**
 * The three top cards and the comparison table, exactly as PlanSelector builds
 * them: cheapest exact match, cheapest that meets-or-exceeds, and the cheapest
 * upgrade worth showing — then padded to three from what is left.
 */
export function selectPlans(
  priced: PricedPlan[],
  ram: number,
  regionKey: string | null,
  vcpu: number | null,
): SelectionResult {
  const regional = regionKey ? priced.filter((p) => p.region === regionKey) : priced;

  const vcpuOk = (p: PricedPlan, exact: boolean) =>
    !vcpu ? true : exact ? num(p.vcpus) === vcpu : num(p.vcpus) >= vcpu;

  // 1. Exact match — same tier, cheapest.
  const exactMatches = regional.filter((p) => vcpuOk(p, true) && ramMatches(num(p.memory_gb), ram));
  const exactPlan: PricedPlan | null = exactMatches.length ? { ...cheapest(exactMatches) } : null;
  if (exactPlan) exactPlan.reason = "Exact match";

  // 2. Recommended — cheapest that meets or exceeds what was asked for.
  let budgetPlan: PricedPlan | null = null;
  const meetsSpecs = regional.filter((p) => vcpuOk(p, false) && num(p.memory_gb) >= ram - 0.1);
  if (meetsSpecs.length) {
    const cheapestMeets = cheapest(meetsSpecs);
    if (!exactPlan || !samePlan(cheapestMeets, exactPlan)) {
      budgetPlan = { ...cheapestMeets, reason: "✨ Recommended" };
      budgetPlan.extraSpecsText = extraSpecs(budgetPlan, ram, vcpu);
    } else if (exactPlan) {
      exactPlan.reason = "✨ Recommended";
    }
  }

  // 3. Best Value — cheapest genuine upgrade, capped at 2x the baseline so the
  //    card never suggests something absurdly more expensive.
  let benefitPlan: PricedPlan | null = null;
  const benefitCandidates = regional.filter((p) => {
    if (samePlan(p, exactPlan) || samePlan(p, budgetPlan)) return false;
    const moreRam = num(p.memory_gb) > ram + 0.25;
    const moreVcpu = vcpu ? num(p.vcpus) > vcpu : false;
    return moreRam || moreVcpu;
  });
  const baseline = budgetPlan?.price ?? exactPlan?.price ?? null;
  const reasonable = baseline
    ? benefitCandidates.filter((p) => p.price <= baseline * 2)
    : benefitCandidates;
  if (reasonable.length) {
    benefitPlan = { ...cheapest(reasonable), reason: "Best Value" };
    benefitPlan.extraSpecsText = extraSpecs(benefitPlan, ram, vcpu);
  }

  // 4. Order: Recommended, Best Value, Exact — then pad to three.
  const selected = [budgetPlan, benefitPlan, exactPlan].filter(Boolean) as PricedPlan[];
  if (selected.length < 3) {
    const rest = regional
      .filter(
        (p) =>
          num(p.memory_gb) >= ram - 0.25 &&
          vcpuOk(p, false) &&
          !selected.some((sel) => samePlan(sel, p)),
      )
      .sort((a, b) => a.price - b.price);

    for (const p of rest) {
      if (selected.length >= 3) break;
      if (selected.some((sel) => samePlan(sel, p))) continue;
      selected.push({ ...p, reason: "Also available", extraSpecsText: extraSpecs(p, ram, vcpu) });
    }
  }

  // 4b. Display order. PlanSelector builds the array as
  //     [budget, benefit, exact] and relies on budget usually being present.
  //     When the cheapest-that-meets-specs IS the exact match, budget is null
  //     and the array leads with Best Value — so order by label instead, and
  //     let the Recommended card be the highlighted one.
  const REASON_ORDER = ["✨ Recommended", "Best Value", "Exact match", "Also available"];
  selected.sort(
    (a, b) => REASON_ORDER.indexOf(a.reason ?? "") - REASON_ORDER.indexOf(b.reason ?? ""),
  );

  // 5. Each card carries the same plan in its other regions, for the dropdown.
  const cards: PlanCard[] = selected.map((sel) => {
    const subPlans = priced
      .filter((p) => p.provider === sel.provider && p.plan_code === sel.plan_code)
      .sort((a, b) => {
        if (a.uid === sel.uid) return -1;
        if (b.uid === sel.uid) return 1;
        if (regionKey) {
          const aActive = a.region === regionKey;
          const bActive = b.region === regionKey;
          if (aActive !== bActive) return aActive ? -1 : 1;
        }
        return a.price - b.price;
      });
    return { basePlan: sel, subPlans: subPlans.length ? subPlans : [sel] };
  });

  // 6. The table: everything else at this exact tier, cheapest first.
  const tablePlans = regional
    .filter((p) => {
      if (selected.some((sel) => sel.provider === p.provider && sel.plan_code === p.plan_code)) {
        return false;
      }
      return ramMatches(num(p.memory_gb), ram) && vcpuOk(p, true);
    })
    .map((p) => ({ ...p, extraSpecsText: extraSpecs(p, ram, vcpu) }))
    .sort((a, b) => a.price - b.price);

  // 7. If this region has nothing at this tier, name the regions that do.
  let alternativeRegions: string[] = [];
  if (regionKey && cards.length === 0) {
    alternativeRegions = [
      ...new Set(
        priced
          .filter((p) => ramMatches(num(p.memory_gb), ram))
          .map((p) => p.region_city || p.region || "")
          .filter(Boolean),
      ),
    ].slice(0, 6);
  }

  return { cards, tablePlans, alternativeRegions };
}

/** vCPU counts available at a RAM tier, for the Advanced option. */
export function vcpuOptions(priced: PricedPlan[], ram: number): number[] {
  return [
    ...new Set(
      priced.filter((p) => ramMatches(num(p.memory_gb), ram)).map((p) => num(p.vcpus)).filter((v) => v > 0),
    ),
  ].sort((a, b) => a - b);
}
