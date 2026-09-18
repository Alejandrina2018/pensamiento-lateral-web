import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import CasePreview from "@/components/case/CasePreview";
import { CASOS_INTRO, CASOS_LISTING } from "@/lib/data/casos";

export const metadata: Metadata = {
  title: "Casos — Pensamiento Lateral",
  description: CASOS_INTRO.body,
};

export default function CasosPage() {
  return (
    <>
      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <Eyebrow>Casos</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-display-lg font-semibold text-balance text-slate">
            {CASOS_INTRO.title}
          </h1>
          <p className="mt-6 max-w-(--measure) text-lg leading-relaxed text-slate/80">{CASOS_INTRO.body}</p>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="pb-20 md:pb-28">
          {/* Visually hidden — reuses the page's own "Casos" label (already
              shown as the eyebrow above) so each case's H3 is correctly
              subordinated to an H2 instead of jumping straight from H1
              (audit finding); no new copy. */}
          <h2 className="sr-only">Casos</h2>
          {CASOS_LISTING.map((caseItem, i) => (
            <CasePreview
              key={caseItem.name}
              caseItem={caseItem}
              reversed={i % 2 === 1}
              emphasized={caseItem.name === "Impacto Cercano · AMBA"}
            />
          ))}
        </Container>
      </section>
    </>
  );
}
