import type { Metadata } from "next";
import ServiceHero from "@/components/service/ServiceHero";
import ConnectionIntro from "@/components/service/ConnectionIntro";
import CapabilityList from "@/components/service/CapabilityList";
import CasePreview from "@/components/case/CasePreview";
import RelatedArticles from "@/components/insight/RelatedArticles";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import DataPattern from "@/components/visualizations/DataPattern";
import { getPublishedInsights } from "@/lib/data/insights";
import {
  INSTITUCIONES_HERO,
  INSTITUCIONES_CONNECTION,
  INSTITUCIONES_CHALLENGES,
  INSTITUCIONES_CAPABILITY_SUMMARY_TITLE,
  INSTITUCIONES_CAPABILITY_SUMMARY,
  INSTITUCIONES_CASES_TITLE,
  INSTITUCIONES_CASES,
  INSTITUCIONES_RELATED_SLUGS,
  INSTITUCIONES_FINAL_CTA,
} from "@/lib/data/instituciones";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE") — description reuses the approved hero's first paragraph.
export const metadata: Metadata = {
  title: `${INSTITUCIONES_HERO.eyebrow} — Pensamiento Lateral`,
  description: INSTITUCIONES_HERO.body[0],
};

export default function InstitucionesPage() {
  const relatedInsights = getPublishedInsights(INSTITUCIONES_RELATED_SLUGS);
  const [impactoCercano, gcba] = INSTITUCIONES_CASES;

  return (
    <>
      <ServiceHero
        eyebrow={INSTITUCIONES_HERO.eyebrow}
        title={INSTITUCIONES_HERO.title}
        body={INSTITUCIONES_HERO.body}
        ctaLabel={INSTITUCIONES_HERO.ctaLabel}
        ctaHref={INSTITUCIONES_HERO.ctaHref}
        visual={<DataPattern variant="territory" className="h-full w-full" />}
        columnWidthClass="max-w-2xl md:max-w-4xl"
      />

      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <ConnectionIntro {...INSTITUCIONES_CONNECTION} />
          <div className="mt-16">
            <CapabilityList items={INSTITUCIONES_CHALLENGES} columns={2} variant="rail" />
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <Eyebrow as="h2">{INSTITUCIONES_CAPABILITY_SUMMARY_TITLE}</Eyebrow>
          <div className="mt-8">
            <CapabilityList items={INSTITUCIONES_CAPABILITY_SUMMARY} columns={3} />
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <h2 className="text-display-md font-semibold text-slate">{INSTITUCIONES_CASES_TITLE}</h2>
          {/* Impacto Cercano goes first with extra room — it's PL's own
              model — purely through order and spacing, no new labels or
              metrics (approved direction). */}
          <div className="mt-10">
            <CasePreview caseItem={impactoCercano} />
          </div>
          <div className="mt-4">
            <CasePreview caseItem={gcba} reversed />
          </div>
        </Container>
      </section>

      <RelatedArticles insights={relatedInsights} />

      <CTASection
        title={INSTITUCIONES_FINAL_CTA.title}
        body={INSTITUCIONES_FINAL_CTA.body}
        primaryAction={<Button href={INSTITUCIONES_FINAL_CTA.ctaHref}>{INSTITUCIONES_FINAL_CTA.ctaLabel}</Button>}
      />
    </>
  );
}
