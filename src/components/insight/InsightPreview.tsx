import Link from "next/link";
import type { Author } from "@/types/content";
import { isInsightPublished } from "@/lib/data/insights";

/** Only what this component actually reads — title, excerpt, category,
 * and author name/role. A full `Insight` (with `bio`, `filterCategories`,
 * etc.) satisfies this structurally, so Home's static data still works
 * unchanged; a Sanity listing item doesn't need to fabricate a `bio` it
 * never fetched just to satisfy a wider type. */
export type InsightPreviewData = {
  title: string;
  slug: string;
  excerpt: string;
  body?: string;
  author: Pick<Author, "name" | "role">;
  displayCategory: string;
};

type InsightPreviewProps = {
  insight: InsightPreviewData;
  index: number;
  featured?: boolean;
};

/** Title-forward editorial row (CLAUDE.md #16) — title leads, category
 * trails in small caps. Discrete numbering ties it to the same editorial
 * motif as Servicios/Método. `featured` gives the first article more
 * space/scale, never a card treatment. The "Leer artículo" CTA only
 * renders once the article has an approved body (a real /insights/[slug]
 * page to send someone to) — until then this is a preview, not a link. */
export default function InsightPreview({ insight, index, featured = false }: InsightPreviewProps) {
  const published = isInsightPublished(insight);
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={`border-t border-sand ${featured ? "py-12 md:py-16" : "py-8 md:py-10"}`}>
      <div className={`flex gap-5 ${featured ? "md:gap-10" : "md:gap-8"}`}>
        <span
          aria-hidden="true"
          className={`shrink-0 font-semibold text-slate/45 ${featured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"}`}
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h3
            className={`font-semibold text-balance text-slate ${
              featured ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
            }`}
          >
            {insight.title}
          </h3>
          <p
            className={`mt-3 max-w-(--measure) leading-relaxed text-slate/80 ${
              featured ? "text-lg" : "text-base"
            }`}
          >
            {insight.excerpt}
          </p>
          <p className="mt-4 text-sm uppercase tracking-wide text-slate/50">
            {insight.author.name} · {insight.displayCategory}
          </p>
          {published && (
            <Link
              href={`/insights/${insight.slug}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-slate"
            >
              Leer artículo
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
