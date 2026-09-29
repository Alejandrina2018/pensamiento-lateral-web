import type { Metadata } from "next";
import ServiceHero from "@/components/service/ServiceHero";
import CapabilityList from "@/components/service/CapabilityList";
import ProcessTimeline from "@/components/service/ProcessTimeline";
import CasePreview from "@/components/case/CasePreview";
import RelatedArticles from "@/components/insight/RelatedArticles";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import FlowLine from "@/components/visualizations/FlowLine";
import { getRelatedInsights } from "@/sanity/lib/relatedInsights";
import {
  AUTOMATIZACIONES_HERO,
  AUTOMATIZACIONES_CAPABILITIES,
  AUTOMATIZACIONES_PROCESS_TITLE,
  AUTOMATIZACIONES_PROCESS,
  AUTOMATIZACIONES_CASE,
  AUTOMATIZACIONES_RELATED_SLUGS,
  AUTOMATIZACIONES_FINAL_CTA,
} from "@/lib/data/automatizaciones-ia";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE") — description reuses the approved hero body for now.
export const metadata: Metadata = {
  title: `${AUTOMATIZACIONES_HERO.eyebrow} — Pensamiento Lateral`,
  description: AUTOMATIZACIONES_HERO.body,
};

export default async function AutomatizacionesIaPage() {
  // No slug from final-copy.md's related list for this page exists in the
  // published insights yet — getRelatedInsights([]) short-circuits to []
  // and RelatedArticles renders nothing.
  const relatedInsights = await getRelatedInsights(AUTOMATIZACIONES_RELATED_SLUGS);

  return (
    <>
      <ServiceHero
        eyebrow={AUTOMATIZACIONES_HERO.eyebrow}
        title={AUTOMATIZACIONES_HERO.title}
        body={AUTOMATIZACIONES_HERO.body}
        ctaLabel={AUTOMATIZACIONES_HERO.ctaLabel}
        ctaHref={AUTOMATIZACIONES_HERO.ctaHref}
        visual={<FlowLine className="h-full w-full" />}
        compactVisual
        columnWidthClass="max-w-2xl md:max-w-3xl"
      />

      {/* "La tecnología como herramienta" (ContextIntro,
          AUTOMATIZACIONES_CONTEXT — still in
          src/lib/data/automatizaciones-ia.ts, kept for rollback) was
          removed from render here: design-review pass to get to the
          team's bios / concrete service content faster. That section was
          bg-sand/40, sitting between the cream Hero and this cream
          section — removing it put two cream sections back to back, so
          this one moves to sand. No dedicated section title in
          final-copy.md — these five areas follow the context block
          directly.

          A second design-review pass caught the *next* seam: ProcessTimeline
          (bg-slate) sat between this section and Caso destacado, so the
          first pass left Caso destacado at its original bg-cream — safe
          against ProcessTimeline's slate, but that meant it landed on the
          same bg-cream as the CTA right after it (Artículos relacionados
          doesn't render on this page — AUTOMATIZACIONES_RELATED_SLUGS is
          empty, see lib/data/automatizaciones-ia.ts — so Caso destacado and
          the CTA are directly adjacent in production). Caso destacado
          below now moves to sand instead: Hero(cream) → this
          section(sand) → Cómo trabajamos(slate) → Caso destacado(sand) →
          CTA(cream, default). If AUTOMATIZACIONES_RELATED_SLUGS ever gets
          real content, Artículos relacionados will render bg-cream
          (default) between them — differing from Caso destacado(sand) but
          matching the CTA(cream) right after it, so that seam would need
          re-checking then. */}
      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <CapabilityList items={AUTOMATIZACIONES_CAPABILITIES} columns={2} />
        </Container>
      </section>

      <ProcessTimeline title={AUTOMATIZACIONES_PROCESS_TITLE} stages={AUTOMATIZACIONES_PROCESS} />

      {/* Bottom padding trimmed (pb-28→pb-14 desktop) to close the gap to
          the CTA below, paired with CTASection's own `compactTop` — same
          reasoning and same values already used for /datos's Caso
          destacado → CTA transition. Top padding (gap to "Cómo
          trabajamos" above) is untouched — not part of this request.
          bg-sand (not cream, see the section-order comment above): keeps
          this from fusing with the CTA right below it, which defaults to
          bg-cream and isn't changed here (see that comment for why). */}
      <section className="bg-sand/40">
        <Container className="pt-20 pb-10 md:pt-28 md:pb-14">
          <Eyebrow as="h2">Caso destacado</Eyebrow>
          <div className="mt-8">
            <CasePreview caseItem={AUTOMATIZACIONES_CASE} />
          </div>
        </Container>
      </section>

      <RelatedArticles insights={relatedInsights} />

      <CTASection
        title={AUTOMATIZACIONES_FINAL_CTA.title}
        body={AUTOMATIZACIONES_FINAL_CTA.body}
        primaryAction={
          <Button href={AUTOMATIZACIONES_FINAL_CTA.ctaHref}>{AUTOMATIZACIONES_FINAL_CTA.ctaLabel}</Button>
        }
        wide
        compactTop
      />
    </>
  );
}
