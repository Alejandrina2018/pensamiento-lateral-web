import Container from "@/components/ui/Container";
import InsightPreview from "@/components/insight/InsightPreview";
import { HOME_INSIGHTS } from "@/lib/data/insights";

// Verbatim from content/final-copy.md — Home / Insights (first 3 of 7).
export default function FeaturedInsights() {
  return (
    <section id="insights" className="bg-cream">
      <Container className="py-24 md:py-32">
        <h2 className="text-display-lg font-semibold text-slate">Insights</h2>
        <p className="mt-4 max-w-(--measure) text-lg text-slate/80">
          Análisis, reflexiones y aprendizajes que surgen de investigaciones propias y del análisis de tendencias.
        </p>

        <div className="mt-8">
          {HOME_INSIGHTS.map((insight) => (
            <InsightPreview key={insight.slug} insight={insight} />
          ))}
        </div>
      </Container>
    </section>
  );
}
