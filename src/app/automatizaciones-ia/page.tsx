import type { Metadata } from "next";
import ServiceHero from "@/components/service/ServiceHero";
import ContextIntro from "@/components/service/ContextIntro";
import CapabilityList from "@/components/service/CapabilityList";
import ProcessTimeline from "@/components/service/ProcessTimeline";
import CasePreview from "@/components/case/CasePreview";
import RelatedArticles from "@/components/insight/RelatedArticles";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import FlowLine from "@/components/visualizations/FlowLine";
import { getPublishedInsights } from "@/lib/data/insights";
import {
  AUTOMATIZACIONES_HERO,
  AUTOMATIZACIONES_CONTEXT,
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

export default function AutomatizacionesIaPage() {
  // No slug from final-copy.md's related list for this page exists in the
  // published insights yet — getPublishedInsights([]) resolves to [] and
  // RelatedArticles renders nothing.
  const relatedInsights = getPublishedInsights(AUTOMATIZACIONES_RELATED_SLUGS);

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

      <ContextIntro title={AUTOMATIZACIONES_CONTEXT.title} paragraphs={AUTOMATIZACIONES_CONTEXT.paragraphs} />

      {/* No dedicated section title in final-copy.md — these five areas
          follow the context block directly. */}
      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <CapabilityList items={AUTOMATIZACIONES_CAPABILITIES} columns={2} />
        </Container>
      </section>

      <ProcessTimeline title={AUTOMATIZACIONES_PROCESS_TITLE} stages={AUTOMATIZACIONES_PROCESS} />

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
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
      />
    </>
  );
}
