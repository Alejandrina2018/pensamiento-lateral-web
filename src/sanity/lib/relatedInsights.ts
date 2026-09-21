import type { InsightPreviewData } from "@/components/insight/InsightPreview";
import { sanityFetch } from "./fetch";
import { INSIGHTS_BY_SLUGS_QUERY } from "./queries";
import { CACHE_TAGS } from "./tags";
import type { InsightListItem } from "./types";
import { toInsightPreviewData } from "./insightPreview";

/**
 * Fetches the published Insights for a page's *_RELATED_SLUGS (editorial
 * page config, still a TS constant — see lib/data/<page>.ts) and returns
 * them in exactly that array's order. Sanity's `in` filter gives no
 * ordering guarantee, so this always reorders client-side rather than
 * trusting `order asc` — that field is the /insights editorial order, not
 * necessarily this page's curation. A slug with no published match is
 * silently dropped, same as the old getPublishedInsights().
 */
export async function getRelatedInsights(slugs: string[]): Promise<InsightPreviewData[]> {
  if (slugs.length === 0) return [];

  const items = await sanityFetch<InsightListItem[]>({
    query: INSIGHTS_BY_SLUGS_QUERY,
    params: { slugs },
    tags: [CACHE_TAGS.insights],
  });

  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is InsightListItem => Boolean(item))
    .map(toInsightPreviewData);
}
