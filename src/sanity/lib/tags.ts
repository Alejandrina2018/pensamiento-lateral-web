/** Next.js cache tags, one per content type — shared between the pages
 * that fetch this data (passed as `tags` to sanityFetch) and the
 * revalidation webhook (src/app/api/revalidate), so both sides always
 * agree on the tag names. */
export const CACHE_TAGS = {
  insights: "insights",
  cases: "cases",
  authors: "authors",
  press: "press",
} as const;
