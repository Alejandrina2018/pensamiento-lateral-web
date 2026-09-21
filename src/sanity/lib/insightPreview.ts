import type { InsightPreviewData } from "@/components/insight/InsightPreview";
import type { InsightListItem } from "./types";

/**
 * Maps a Sanity Insight listing result onto exactly what InsightPreview
 * reads. `body` is always left undefined here: none of these queries fetch
 * article bodies, so this alone is what keeps every teaser's "Leer
 * artículo" link and any /insights/[slug] reference suppressed (see
 * isInsightPublished). `author.bio` isn't fetched by the list projection
 * either (InsightPreview never shows it) and isn't fabricated to satisfy a
 * wider type — the prop type only asks for name/role.
 */
export function toInsightPreviewData(item: InsightListItem): InsightPreviewData {
  return {
    title: item.title,
    slug: item.slug ?? "",
    excerpt: item.excerpt,
    body: undefined,
    author: { name: item.author.name, role: item.author.role },
    displayCategory: item.displayCategory,
  };
}
