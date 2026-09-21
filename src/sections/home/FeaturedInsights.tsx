import Container from "@/components/ui/Container";
import InsightPreview from "@/components/insight/InsightPreview";
import { sanityFetch } from "@/sanity/lib/fetch";
import { HOME_INSIGHTS_QUERY } from "@/sanity/lib/queries";
import { CACHE_TAGS } from "@/sanity/lib/tags";
import type { InsightListItem } from "@/sanity/lib/types";
import { toInsightPreviewData } from "@/sanity/lib/insightPreview";

// Verbatim from content/final-copy.md — Home / Insights (first 3 of 7).
// The 3 shown are the first 3 by editorial order (order asc [0...3]) —
// the same selection HOME_INSIGHTS used to hardcode as a literal slice of
// the first 3 entries of INSIGHTS, now computed from Sanity instead.
export default async function FeaturedInsights() {
  const items = await sanityFetch<InsightListItem[]>({
    query: HOME_INSIGHTS_QUERY,
    tags: [CACHE_TAGS.insights],
  });

  return (
    <section id="insights" className="bg-cream">
      <Container className="py-24 md:py-32">
        <h2 className="text-display-lg font-semibold text-slate">Insights</h2>
        <p className="mt-4 max-w-(--measure) text-lg text-slate/80">
          Análisis, reflexiones y aprendizajes que surgen de investigaciones propias y del análisis de tendencias.
        </p>

        <div className="mt-8">
          {items.map((item, i) => (
            <InsightPreview key={item._id} insight={toInsightPreviewData(item)} index={i} featured={i === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}
