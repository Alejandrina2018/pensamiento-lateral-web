import Link from "next/link";
import type { InsightPreviewData } from "@/components/insight/InsightPreview";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { isInsightPublished } from "@/lib/data/insights";

type RelatedArticlesProps = {
  insights: InsightPreviewData[];
  /** Default (false) keeps every existing page's top padding unchanged.
   * /investigacion's design-review pass found a large gap above this
   * section (on top of Caso destacado's own trimmed bottom padding) —
   * `compact` reduces only the top; bottom is untouched everywhere. */
  compact?: boolean;
  /** Default (false) keeps every existing page's bottom padding
   * unchanged. /datos's design-review pass found the gap before the
   * final CTA too wide, contributed to by both this section's bottom
   * padding and CTASection's own top padding (its `compactTop`) —
   * `compactBottom` reduces only this side. */
  compactBottom?: boolean;
  /** Default (false) keeps the single-article layout exactly as it is
   * everywhere else (including /instituciones, which also currently has
   * exactly one published related Insight). /datos's design-review pass
   * found that lone article — capped at max-w-(--measure) — reading much
   * narrower than Caso destacado above it, even though this section's
   * own Container was already full-width. `wideSingle` widens only the
   * article itself (title + byline) to md:col-span-8, matching the width
   * used elsewhere on that page; the excerpt keeps its own
   * max-w-(--measure) so its lines don't stretch. Only relevant when
   * there's exactly one insight — ignored for 2-3. */
  wideSingle?: boolean;
};

const GRID_COLS = { 2: "md:grid-cols-2", 3: "md:grid-cols-3" } as const;

/**
 * "Artículos relacionados" — only ever renders articles that are actually
 * published (see lib/data/insights.ts's getPublishedInsights). 0 articles
 * renders nothing (no placeholder, no "próximamente", no dead link); 1
 * gets a wider editorial treatment; 2-3 sit in columns divided by a rule.
 * This is also how it should behave once Sanity is wired in: the section's
 * presence follows from what the query actually returns.
 */
export default function RelatedArticles({
  insights,
  compact = false,
  compactBottom = false,
  wideSingle = false,
}: RelatedArticlesProps) {
  if (insights.length === 0) return null;

  const isSingle = insights.length === 1;

  return (
    <section className="bg-cream">
      <Container
        className={`${compactBottom ? "pb-10 md:pb-14" : "pb-20 md:pb-24"} ${
          compact ? "pt-10 md:pt-14" : "pt-20 md:pt-24"
        }`}
      >
        <Eyebrow as="h2">Artículos relacionados</Eyebrow>

        <div
          className={`mt-8 grid gap-x-10 gap-y-10 border-t border-sand pt-10 ${
            isSingle
              ? wideSingle
                ? "md:grid-cols-12"
                : ""
              : `${GRID_COLS[insights.length as 2 | 3]} md:divide-x md:divide-sand`
          }`}
        >
          {insights.map((insight) => (
            <article
              key={insight.slug}
              className={
                isSingle
                  ? wideSingle
                    ? "md:col-span-8"
                    : "max-w-(--measure)"
                  : "md:px-8 md:first:pl-0 md:last:pr-0"
              }
            >
              <h3 className={`font-semibold text-slate ${isSingle ? "text-2xl md:text-3xl" : "text-xl"}`}>
                {isInsightPublished(insight) ? (
                  <Link href={`/insights/${insight.slug}`} className="hover:text-terracotta">
                    {insight.title}
                  </Link>
                ) : (
                  insight.title
                )}
              </h3>
              {isSingle && (
                <p className="mt-3 max-w-(--measure) leading-relaxed text-slate/80">{insight.excerpt}</p>
              )}
              <p className="mt-3 text-sm uppercase tracking-wide text-slate/50">
                {insight.author.name} · {insight.displayCategory}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
