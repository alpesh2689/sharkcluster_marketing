import { useEffect, useState } from "react";
import { PackagePlus } from "lucide-react";
import { fetchAddonPricing, API_CONFIGURED, type AddonPricing as Addons } from "@/lib/api";
import { formatPrice, type Currency } from "@/lib/planShaping";

/**
 * Optional add-on rates, read from GET /public/addon-pricing.
 *
 * Every entry corresponds to a line the billing cycle can actually generate:
 *   offsite backup  -> admin_settings.backupGbAmount{Usd,Inr}, per GB
 *   the rest        -> active service_pricing rows, per month
 *
 * Block storage volumes used to be listed here and are not: nothing in the
 * product bills them. Do not add them back without a billing line to point at.
 */

const toNumber = (v: string | number | null | undefined): number | null => {
  const n = typeof v === "string" ? parseFloat(v) : v;
  return typeof n === "number" && Number.isFinite(n) && n > 0 ? n : null;
};

export default function AddonPricing({ currency = "USD" }: { currency?: Currency }) {
  const [addons, setAddons] = useState<Addons | null>(null);
  const [loaded, setLoaded] = useState(!API_CONFIGURED);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    const controller = new AbortController();
    fetchAddonPricing(controller.signal)
      .then(setAddons)
      .catch(() => undefined)
      .finally(() => setLoaded(true));
    return () => controller.abort();
  }, []);

  const backupRate = toNumber(
    currency === "INR" ? addons?.offsite_backup_per_gb.inr : addons?.offsite_backup_per_gb.usd,
  );

  const services = (addons?.services ?? [])
    .map((s) => ({
      ...s,
      amount: toNumber(currency === "INR" ? s.monthly_price_inr : s.monthly_price_usd),
    }))
    .filter((s) => s.amount !== null);

  const rows: { label: string; rate: string | null }[] = [
    {
      label: "Offsite backup storage",
      rate: backupRate ? `${formatPrice(backupRate, currency)} per GB / month` : null,
    },
    ...services.map((s) => ({
      label: s.service_name,
      rate: `${formatPrice(s.amount as number, currency)} / month`,
    })),
  ];

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <PackagePlus className="h-5 w-5" />
        </span>
        <h3 className="font-display text-base font-bold text-ink-900">Optional add-ons</h3>
      </div>

      <p className="mb-3 text-sm leading-relaxed text-ink-500">
        Charged only if you use them, on the same invoice as your servers.
      </p>

      <ul className="space-y-2 text-sm">
        {rows.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between gap-3 border-b border-ink-100 pb-2 last:border-0 last:pb-0">
            <span className="text-ink-600">{row.label}</span>
            <span className="shrink-0 font-mono text-xs font-semibold text-ink-900">
              {row.rate ?? (loaded ? "See panel" : "…")}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-ink-400">
        Local backups are free. Only offsite copies use billed storage.
      </p>
    </div>
  );
}
