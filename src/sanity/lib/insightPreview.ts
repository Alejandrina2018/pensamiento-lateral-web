import type { InsightPreviewData } from "@/components/insight/InsightPreview";
import type { InsightListItem } from "./types";

/**
 * Maps a Sanity Insight listing result onto exactly what InsightPreview
 * reads. `hasArticle` is passed straight through from the query's own
 * projection (published && defined(body) && defined(slug.current)) — the
 * single source of truth for whether "Leer artículo" and any
 * /insights/[slug] link should render. `author.bio` isn't fetched by the
 * list projection either (InsightPreview never shows it) and isn't
 * fabricated to satisfy a wider type — the prop type only asks for
 * name/role.
 */
export function toInsightPreviewData(item: InsightListItem): InsightPreviewData {
  return {
    title: item.title,
    slug: item.slug ?? "",
    excerpt: item.excerpt,
    hasArticle: item.hasArticle,
    author: { name: item.author.name, role: item.author.role },
    displayCategory: item.displayCategory,
  };
}
