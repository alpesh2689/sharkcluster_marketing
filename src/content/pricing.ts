/**
 * Prices the marketing site states outside the live catalogue.
 *
 * Plan-tier pricing used to live here. It is gone: the product does not bill a
 * plan fee, and /pricing now reads real rates from GET /public/plans, so there
 * is nothing left to hardcode. Server prices must never be added back here.
 *
 * TODO_CONFIRM — owner: pricing lead. OFFSITE_PER_GB's source of truth is the
 * admin setting `admin_settings.backupGbAmountUsd`, read by
 * backend/server/helper/backupCalculation.js: getBackupPricePerGb(). That
 * helper has NO default in code — it falls back to 0 — so this rate cannot be
 * derived from the codebase and must come from the business.
 */

/** Offsite backup storage, per GB per month. Local backups are free. */
export const OFFSITE_PER_GB = "TODO_CONFIRM";
