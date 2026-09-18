import type { Metadata } from "next";
import ServiceHero from "@/components/service/ServiceHero";
import ContextIntro from "@/components/service/ContextIntro";
import CapabilityList from "@/components/service/CapabilityList";
import StructuredIndex from "@/components/service/StructuredIndex";
import CasePreview from "@/components/case/CasePreview";
import RelatedArticles from "@/components/insight/RelatedArticles";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import DataPattern from "@/components/visualizations/DataPattern";
import { getPublishedInsights } from "@/lib/data/insights";
import {
  DATOS_HERO,
  DATOS_CONTEXT,
  DATOS_CAPABILITIES_INTRO,
  DATOS_CAPABILITIES,
  DATOS_OUTPUTS,
  DATOS_CASE,
  DATOS_RELATED_SLUGS,
  DATOS_FINAL_CTA,
} from "@/lib/data/datos";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE") — description reuses the approved hero body for now.
export const metadata: Metadata = {
  title: `${DATOS_HERO.eyebrow} — Pensamiento Lateral`,
  description: DATOS_HERO.body,
};

export default function DatosPage() {
  const relatedInsights = getPublishedInsights(DATOS_RELATED_SLUGS);

  return (
    <>
      <ServiceHero
        eyebrow={DATOS_HERO.eyebrow}
        title={DATOS_HERO.title}
        body={DATOS_HERO.body}
        ctaLabel={DATOS_HERO.ctaLabel}
        ctaHref={DATOS_HERO.ctaHref}
        visual={<DataPattern variant="grid-only" className="h-full w-full" />}
      />

      <ContextIntro title={DATOS_CONTEXT.title} paragraphs={DATOS_CONTEXT.paragraphs} />

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <Eyebrow as="h2">{DATOS_CAPABILITIES_INTRO.title}</Eyebrow>
          <p className="mt-4 max-w-(--measure) text-lg text-slate/80">{DATOS_CAPABILITIES_INTRO.body}</p>
          <div className="mt-12">
            <CapabilityList items={DATOS_CAPABILITIES} columns={2} />
          </div>
        </Container>
      </section>

      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <h2 className="text-display-md font-semibold text-slate">{DATOS_OUTPUTS.title}</h2>
          <p className="mt-4 max-w-(--measure) text-lg text-slate/80">{DATOS_OUTPUTS.body}</p>
          <p className="mt-8 text-sm font-medium uppercase tracking-widest text-slate/60">{DATOS_OUTPUTS.label}</p>
          <div className="mt-4 max-w-3xl">
            <StructuredIndex terms={DATOS_OUTPUTS.terms} />
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <Eyebrow as="h2">Caso destacado</Eyebrow>
          <div className="mt-8">
            <CasePreview caseItem={DATOS_CASE} />
          </div>
        </Container>
      </section>

      <RelatedArticles insights={relatedInsights} />

      <CTASection
        title={DATOS_FINAL_CTA.title}
        body={DATOS_FINAL_CTA.body}
        primaryAction={<Button href={DATOS_FINAL_CTA.ctaHref}>{DATOS_FINAL_CTA.ctaLabel}</Button>}
      />
    </>
  );
}
