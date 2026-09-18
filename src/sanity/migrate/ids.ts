function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Deterministic, stable document IDs — type + the existing slug (or a
 * slugified key when there isn't one, e.g. press items). Re-running the
 * migration script always resolves to the same IDs, which is what makes
 * `createOrReplace` safe to run more than once (point 13.A — idempotent).
 */
export const documentId = {
  author: (slug: string) => `author-${slug}`,
  insight: (slug: string) => `insight-${slug}`,
  caseStudy: (slug: string) => `case-${slug}`,
  pressItem: (title: string) => `press-${slugify(title)}`,
};
