import { sanityFetch } from "./fetch";
import { CASE_STUDIES_BY_SLUGS_QUERY } from "./queries";
import { CACHE_TAGS } from "./tags";
import type { CaseStudyListItem } from "./types";

/**
 * Fetches published caseStudy documents by an explicit slug list (a
 * page's own case-selection config, still a TS constant — see
 * lib/data/<page>.ts) and returns them in exactly that array's order.
 * Sanity's `in` filter gives no ordering guarantee, so this always
 * reorders client-side rather than trusting `order asc` — that field is
 * /casos' editorial order, not necessarily this page's curation.
 *
 * A configured slug with no published match is never filled in from the
 * old static case copy (no TS fallback) — it's reported via
 * console.error so it isn't missed in build/server logs, and simply
 * omitted from the returned list, so the page still renders correctly
 * with whatever cases are actually published instead of failing the
 * whole page for one missing/unpublished case.
 */
export async function getCasesBySlugs(slugs: string[]): Promise<CaseStudyListItem[]> {
  if (slugs.length === 0) return [];

  const items = await sanityFetch<CaseStudyListItem[]>({
    query: CASE_STUDIES_BY_SLUGS_QUERY,
    params: { slugs },
    tags: [CACHE_TAGS.cases],
  });

  const result: CaseStudyListItem[] = [];
  for (const slug of slugs) {
    const match = items.find((item) => item.slug === slug);
    if (match) {
      result.push(match);
    } else {
      console.error(
        `[cases] El slug configurado "${slug}" no tiene un caseStudy publicado en Sanity. Se omite de la sección — sin fallback a datos estáticos.`,
      );
    }
  }
  return result;
}
