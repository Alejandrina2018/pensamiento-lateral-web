import Container from "@/components/ui/Container";
import CasePreview from "@/components/case/CasePreview";
import { HOME_CASE_HIGHLIGHTS } from "@/lib/data/cases";

// Verbatim from content/final-copy.md — Home / Cuando el conocimiento se convierte en acción.
export default function FeaturedCases() {
  return (
    <section id="casos" className="bg-cream">
      <Container className="py-24 md:py-32">
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
