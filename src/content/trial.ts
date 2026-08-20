/**
 * Trial and contract terms, stated identically everywhere.
 *
 * Previously duplicated across ten files, which is how two pages ended up
 * describing the same offer differently.
 *
 * TODO_CONFIRM — owner: pricing lead. Confirm the exact offer before launch.
 */

/** Full strapline, for hero and CTA strips. */
export const TRIAL_TERMS = "No credit card required · No lock-in contracts · Cancel anytime";

/** Single clause, for feature bullets and badges. */
export const TRIAL_SHORT = "No credit card required";

/** The three clauses separately, where a page renders them as a list. */
export const TRIAL_POINTS = [
  "No credit card required",
  "No lock-in contracts",
  "Cancel anytime",
] as const;
