import Container from "@/components/ui/Container";
import CasePreview from "@/components/case/CasePreview";
import { HOME_CASE_HIGHLIGHTS } from "@/lib/data/cases";

// Verbatim from content/final-copy.md — Home / Cuando el conocimiento se convierte en acción.
// Top padding is intentionally lighter than the site's usual py-24/py-32:
// this section shares its cream background with AudienceSplit right above
// it (no color change marks the boundary), so the two sections' full
// paddings stacked read as one oversized, continuity-breaking gap. Bottom
// padding stays full — it hands off into AboutSection's blue-tint
// background, where a real section break benefits from the usual air.
export default function FeaturedCases() {
  return (
    <section id="casos" className="bg-cream">
      <Container className="pt-12 pb-24 md:pt-16 md:pb-32">
        <h2 className="text-display-lg font-semibold text-slate">Cuando el conocimiento se convierte en acción</h2>
        <p className="mt-4 max-w-(--measure) text-lg text-slate/80">
          Problemas distintos, abordajes a medida y un mismo objetivo: transformar información en herramientas para
          decidir y actuar mejor.
        </p>

        <div className="mt-8">
          {HOME_CASE_HIGHLIGHTS.map((caseItem, i) => (
            <CasePreview key={caseItem.name} caseItem={caseItem} reversed={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
