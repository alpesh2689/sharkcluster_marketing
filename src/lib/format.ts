/** Shared formatting helpers for content pulled from the backend. */

/** "12 March 2026" style long date. Empty string for missing or invalid input. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
