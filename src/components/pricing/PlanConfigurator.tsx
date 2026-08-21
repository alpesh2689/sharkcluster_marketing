import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle, Check, Headset, Loader2, RefreshCw, ShieldCheck, Sparkles, HardDrive,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { fetchPublicPlans, API_CONFIGURED, type PublicPlan } from "@/lib/api";
import {
  CONTINENTS, formatPrice, formatRam, pricePlans, ramTiers, regionOptions,
  selectPlans, vcpuOptions,
  type Continent, type Currency, type PlanCard, type PricedPlan,
} from "@/lib/planShaping";
import {
  detectCountry, flagEmoji, latencyTableFor, recommendedRegions, resolveRegion,
} from "@/lib/regionLatency";

/**
 * Server plan configurator.
 *
 * Mirrors the panel's create-server flow: RAM → workload → region → the three
 * plan cards and the comparison table, built by the same selection rules (see
 * src/lib/planShaping.ts). A visitor should be quoted here exactly what they
 * are quoted in the panel.
 *
 * Prices, RAM tiers, regions and vCPU options are all derived from
 * GET /public/plans — nothing about the catalogue is hardcoded here.
 *
 * Latency figures are deliberately absent: the panel measures them from the
 * signed-in user's browser, and a fixed number here would be wrong for most.
 */

const INCLUDED = [
  { icon: Headset, label: "Dedicated DevOps on every plan" },
  { icon: RefreshCw, label: "Free migration" },
  { icon: HardDrive, label: "Free local backup" },
  { icon: ShieldCheck, label: "24/7 monitoring" },
];

type Workload = "web" | "batch";

function specs(plan: PricedPlan) {
  return [
    { label: "RAM", value: plan.memory_gb ? `${plan.memory_gb} GB` : "—" },
    { label: "vCPU", value: plan.vcpus ? `${plan.vcpus} cores` : "—" },
    { label: "Storage", value: plan.disk_gb ? `${plan.disk_gb} GB` : "—" },
    { label: "Storage type", value: plan.disk_type?.toUpperCase() || "—" },
    { label: "Bandwidth", value: plan.bandwidth_tb ? `${plan.bandwidth_tb} TB` : "Unlimited traffic" },
  ];
}

function PlanCardView({
  card, currency, index,
}: { card: PlanCard; currency: Currency; index: number }) {
  const [regionUid, setRegionUid] = useState(card.basePlan.uid);
  useEffect(() => setRegionUid(card.basePlan.uid), [card.basePlan.uid]);

  const shown = card.subPlans.find((p) => p.uid === regionUid) ?? card.basePlan;
  // Highlight the Recommended card wherever it lands, not whatever is first.
  const featured = card.basePlan.reason === "✨ Recommended" || (index === 0 && !card.basePlan.reason);
  const hourly = shown.hourly > 0;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg ${
        featured ? "border-brand-500" : "border-ink-200"
      }`}
    >
      <div
        className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider ${
          featured ? "bg-brand-500 text-white" : "bg-ink-900 text-ink-300"
        }`}
      >
        <span className="flex items-center gap-1.5">
          {featured && <Sparkles className="h-3 w-3" />}
          {card.basePlan.reason ?? "Also available"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-display text-lg font-bold text-ink-900">{shown.provider_name}</h4>
            {shown.plan_name && (
              <p className="truncate font-mono text-xs text-ink-400">{shown.plan_name}</p>
            )}
          </div>
          {card.subPlans.length > 1 ? (
            <>
              <label htmlFor={`region-${card.basePlan.uid}`} className="sr-only">
                Region for {shown.provider_name}
              </label>
              <select
                id={`region-${card.basePlan.uid}`}
                value={regionUid}
                onChange={(e) => setRegionUid(e.target.value)}
                className="max-w-[9rem] shrink-0 rounded-lg border border-ink-200 bg-ink-50 px-2 py-1 text-xs text-ink-700 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
              >
                {card.subPlans.map((p) => (
                  <option key={p.uid} value={p.uid}>
                    {p.region_city || p.region}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <span className="shrink-0 rounded-lg border border-ink-200 bg-ink-50 px-2 py-1 text-xs text-ink-600">
              {shown.region_city || shown.region}
            </span>
          )}
        </div>

        <p className="mt-3 font-display text-3xl font-extrabold text-brand-600">
          {formatPrice(shown.price, currency)}
          <span className="text-sm font-semibold text-ink-400"> /mo</span>
        </p>
        {card.basePlan.extraSpecsText && (
          <p className="mt-1 text-xs font-semibold text-emerald-600">
            ↗ {card.basePlan.extraSpecsText}
          </p>
        )}

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink-100 pt-4">
          {specs(shown).map((row) => (
            <div key={row.label}>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{row.label}</dt>
              <dd className="mt-0.5 font-mono text-sm text-ink-800">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4">
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
              hourly ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {hourly ? "Hourly · cancel anytime" : "Monthly commitment"}
          </span>
          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            {hourly
              ? "Billed per hour, prorated. Destroy anytime — pay only for the hours used."
              : "Billed monthly. You can cancel your server at any time."}
          </p>
        </div>

        {/* mt-auto on the wrapper, not the button: it pins the CTA to the bottom
            so buttons line up across cards of differing content height, while
            pt-5 guarantees a gap. Putting spacing on the anchor itself fought
            with .btn-primary's own padding. */}
        <div className="mt-auto pt-5">
          <a
            href="https://cloud.sharkcluster.com/register"
            className={`w-full ${featured ? "btn-primary" : "btn-secondary"}`}
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PlanConfigurator() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [raw, setRaw] = useState<PublicPlan[]>([]);
  const [loading, setLoading] = useState(API_CONFIGURED);
  const [failed, setFailed] = useState(false);

  const [currency, setCurrency] = useState<Currency>("USD");
  const [workload, setWorkload] = useState<Workload>("web");
  const [ramIndex, setRamIndex] = useState(0);
  const [continent, setContinent] = useState<Continent | "All" | "Recommended">("Recommended");
  const [regionKey, setRegionKey] = useState<string | null>(null);
  const [advanced, setAdvanced] = useState(false);
  const [vcpu, setVcpu] = useState<number | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    const controller = new AbortController();
    fetchPublicPlans(controller.signal)
      .then(setRaw)
      .catch((err: Error) => {
        if (err.name !== "AbortError") setFailed(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  // Best-effort geo lookup so the recommended regions match what the panel
  // would recommend to this same visitor. Never blocks rendering.
  useEffect(() => {
    const controller = new AbortController();
    void detectCountry(controller.signal).then(setCountry);
    return () => controller.abort();
  }, []);

  const latency = useMemo(() => latencyTableFor(country), [country]);
  const recommended = useMemo(() => recommendedRegions(latency), [latency]);

  const priced = useMemo(() => pricePlans(raw, currency), [raw, currency]);
  const tiers = useMemo(() => ramTiers(priced), [priced]);
  const regions = useMemo(() => regionOptions(priced), [priced]);

  useEffect(() => {
    if (tiers.length > 0) setRamIndex((i) => Math.min(i || 2, tiers.length - 1));
  }, [tiers.length]);

  const ram = tiers[ramIndex] ?? 0;
  const vcpus = useMemo(() => vcpuOptions(priced, ram), [priced, ram]);

  // A vCPU choice that no plan offers at the new RAM tier must not silently
  // filter everything out.
  useEffect(() => {
    if (vcpu !== null && !vcpus.includes(vcpu)) setVcpu(null);
  }, [vcpus, vcpu]);

  // Each region carries its canonical name so latency and the Recommended
  // grouping can be looked up the same way the panel does it.
  const decorated = useMemo(
    () =>
      regions.map((r) => {
        const canonical = resolveRegion(r.key, r.label, r.country);
        return { ...r, canonical, latencyMs: latency[canonical] ?? null };
      }),
    [regions, latency],
  );

  const visibleRegions = useMemo(() => {
    if (continent === "Recommended") {
      const picks = decorated.filter((r) => recommended.includes(r.canonical));
      return picks.length > 0 ? picks : decorated;
    }
    if (continent === "All") return decorated;
    return decorated.filter((r) => r.continent === continent);
  }, [decorated, continent, recommended]);

  useEffect(() => {
    if (regionKey && !visibleRegions.some((r) => r.key === regionKey)) setRegionKey(null);
  }, [visibleRegions, regionKey]);

  // Batch workloads are latency-tolerant, so price across all regions.
  const effectiveRegion = workload === "batch" ? null : regionKey;

  const { cards, tablePlans, alternativeRegions } = useMemo(
    () => selectPlans(priced, ram, effectiveRegion, advanced ? vcpu : null),
    [priced, ram, effectiveRegion, advanced, vcpu],
  );

  const availableContinents = useMemo(() => {
    const present = new Set(regions.map((r) => r.continent));
    return CONTINENTS.filter((c) => present.has(c));
  }, [regions]);

  const regionLabel = effectiveRegion
    ? regions.find((r) => r.key === effectiveRegion)?.label ?? effectiveRegion
    : "all regions";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <span className="sr-only">Loading plans</span>
      </div>
    );
  }

  if (failed || priced.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-ink-50/50 px-8 py-14 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-ink-300" />
        <h3 className="mt-4 font-display text-xl font-bold text-ink-900">
          Live plan pricing isn't available right now
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">
          {API_CONFIGURED
            ? "We couldn't load the plan catalogue. Please refresh, or open the panel to see current pricing."
            : "This environment has no API backend configured."}
        </p>
        <a href="https://cloud.sharkcluster.com/register" className="btn-primary mt-7">
          Open the panel
        </a>
      </div>
    );
  }

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} space-y-5`}>
      {/* RAM */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label htmlFor="ram-slider" className="font-display text-sm font-bold text-ink-900">
            RAM
          </label>
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-ink-500">
              <input
                type="checkbox"
                checked={advanced}
                onChange={(e) => setAdvanced(e.target.checked)}
                className="h-4 w-4 accent-brand-500"
              />
              Advanced vCPU options
            </label>
            <div className="flex items-center gap-1 rounded-lg border border-ink-200 bg-ink-50 p-0.5">
              {(["USD", "INR"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                    currency === c ? "bg-white text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <input
          id="ram-slider"
          type="range"
          min={0}
          max={Math.max(tiers.length - 1, 0)}
          step={1}
          value={ramIndex}
          onChange={(e) => setRamIndex(Number(e.target.value))}
          aria-valuetext={`${formatRam(ram)} RAM`}
          className="mt-5 w-full accent-brand-500"
        />
        <div className="mt-2 flex justify-between text-[10px] font-medium text-ink-400">
          {tiers.map((t, i) => (
            <span
              key={t}
              className={[
                i === ramIndex ? "font-bold text-brand-600" : "",
                tiers.length > 8 && i % 2 === 1 ? "hidden sm:inline" : "",
              ].join(" ")}
            >
              {formatRam(t)}
            </span>
          ))}
        </div>

        {advanced && vcpus.length > 0 && (
          <div className="mt-5 border-t border-ink-100 pt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-400">vCPU</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setVcpu(null)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all ${
                  vcpu === null ? "border-brand-500 bg-brand-50 text-brand-700" : "border-ink-200 text-ink-600"
                }`}
              >
                Any
              </button>
              {vcpus.map((v) => (
                <button
                  key={v}
                  onClick={() => setVcpu(v)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all ${
                    vcpu === v ? "border-brand-500 bg-brand-50 text-brand-700" : "border-ink-200 text-ink-600"
                  }`}
                >
                  {v} cores
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Workload */}
      <div>
        <h3 className="mb-3 font-display text-sm font-bold text-ink-900">
          Latency &amp; region preference
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { key: "web" as Workload, title: "Website / App", desc: "Customer-facing — latency matters" },
            { key: "batch" as Workload, title: "Backend / Batch / Backup", desc: "Not user-facing — latency tolerant" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setWorkload(opt.key)}
              aria-pressed={workload === opt.key}
              className={`rounded-2xl border p-5 text-left transition-all ${
                workload === opt.key
                  ? "border-brand-500 bg-brand-50/60 ring-1 ring-brand-400/30"
                  : "border-ink-200 bg-white hover:border-brand-200"
              }`}
            >
              <p className={`font-semibold ${workload === opt.key ? "text-brand-700" : "text-ink-900"}`}>
                {opt.title}
              </p>
              <p className="mt-1 text-sm text-ink-500">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Region */}
      {workload === "web" && (
        <div>
          <h3 className="mb-3 font-display text-sm font-bold text-ink-900">Select region</h3>
          <div className="flex flex-wrap gap-1 border-b border-ink-200 pb-px">
            {(["Recommended", "All", ...availableContinents] as (Continent | "All" | "Recommended")[]).map((c) => (
              <button
                key={c}
                onClick={() => setContinent(c)}
                className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold transition-colors ${
                  continent === c
                    ? "border-brand-500 text-brand-600"
                    : "border-transparent text-ink-500 hover:text-ink-800"
                }`}
              >
                {c === "Recommended" ? "✨ Recommended" : c === "All" ? "All regions" : c}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setRegionKey(null)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                regionKey === null
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-ink-200 bg-white text-ink-600 hover:border-brand-200"
              }`}
            >
              Any region
            </button>
            {visibleRegions.map((r) => (
              <button
                key={r.key}
                onClick={() => setRegionKey(r.key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  regionKey === r.key
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-ink-200 bg-white text-ink-600 hover:border-brand-200"
                }`}
              >
                <span className="mr-1.5" aria-hidden="true">{flagEmoji(r.country)}</span>
                {r.label}
                {r.latencyMs != null && (
                  <span
                    className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      r.latencyMs < 100
                        ? "bg-emerald-100 text-emerald-700"
                        : r.latencyMs < 160
                          ? "bg-amber-100 text-amber-700"
                          : "bg-ink-100 text-ink-500"
                    }`}
                  >
                    ~{r.latencyMs}ms
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-400">
            Latency figures are typical estimates from your location, not a live measurement —
            the panel shows the same numbers when you create the server.
          </p>
        </div>
      )}

      {/* Results */}
      <div className="pt-2">
        <h3 className="font-display text-lg font-bold text-ink-900">
          Available plans in {regionLabel}{" "}
          <span className="text-ink-400">({formatRam(ram)} RAM)</span>
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {INCLUDED.map((item) => (
            <span key={item.label} className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
              <item.icon className="h-3.5 w-3.5 text-brand-500" />
              {item.label}
            </span>
          ))}
        </div>

        {cards.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-ink-200 bg-ink-50/50 px-6 py-12 text-center">
            <p className="font-semibold text-ink-700">
              No plans at {formatRam(ram)} in {regionLabel}
            </p>
            {alternativeRegions.length > 0 ? (
              <p className="mt-1 text-sm text-ink-500">
                This size is available in {alternativeRegions.join(", ")}.
              </p>
            ) : (
              <p className="mt-1 text-sm text-ink-500">Try a different RAM tier or region.</p>
            )}
          </div>
        ) : (
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {cards.map((card, i) => (
              <PlanCardView key={card.basePlan.uid} card={card} currency={currency} index={i} />
            ))}
          </div>
        )}

        {/* Comparison table */}
        {tablePlans.length > 0 && (
          <div className="mt-8">
            <h4 className="font-display text-sm font-bold text-ink-900">
              Every other {formatRam(ram)} plan in {regionLabel}
            </h4>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-ink-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                    <th className="px-4 py-3 font-bold">Provider</th>
                    <th className="px-4 py-3 font-bold">Region</th>
                    <th className="px-4 py-3 font-bold">vCPU</th>
                    <th className="px-4 py-3 font-bold">Storage</th>
                    <th className="px-4 py-3 text-right font-bold">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {tablePlans.map((p) => (
                    <tr key={p.uid} className="transition-colors hover:bg-ink-50/60">
                      <td className="px-4 py-3">
                        <span className="font-semibold text-ink-900">{p.provider_name}</span>
                        {p.plan_name && (
                          <span className="block font-mono text-[11px] text-ink-400">{p.plan_name}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-ink-600">{p.region_city || p.region}</td>
                      <td className="px-4 py-3 font-mono text-ink-700">{p.vcpus ?? "—"}</td>
                      <td className="px-4 py-3 font-mono text-ink-700">
                        {p.disk_gb ? `${p.disk_gb} GB` : "—"}
                        {p.disk_type ? ` ${p.disk_type.toUpperCase()}` : ""}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-ink-900">
                        {formatPrice(p.price, currency)}
                        <span className="text-xs font-normal text-ink-400">/mo</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink-400">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
          Live catalogue rates for the region shown — what you see is what is billed, with no
          platform fee added on top. Any promotional discount is applied at checkout, before you confirm.
        </p>
      </div>
    </div>
  );
}
