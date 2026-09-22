import type { Metadata } from "next";
import ServiceHero from "@/components/service/ServiceHero";
import ContextIntro from "@/components/service/ContextIntro";
import CapabilityList from "@/components/service/CapabilityList";
import CasePreview from "@/components/case/CasePreview";
import RelatedArticles from "@/components/insight/RelatedArticles";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import TagList from "@/components/ui/TagList";
import DataPattern from "@/components/visualizations/DataPattern";
import { getRelatedInsights } from "@/sanity/lib/relatedInsights";
import {
  INVESTIGACION_HERO,
  INVESTIGACION_CONTEXT,
  INVESTIGACION_CAPABILITIES_INTRO,
  INVESTIGACION_CAPABILITIES,
  INVESTIGACION_METHODOLOGY_INTRO,
  INVESTIGACION_METHODOLOGIES,
  INVESTIGACION_OUTRO,
  INVESTIGACION_CASE,
  INVESTIGACION_RELATED_SLUGS,
  INVESTIGACION_FINAL_CTA,
} from "@/lib/data/investigacion";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE") — description reuses the approved hero body for now.
export const metadata: Metadata = {
  title: `${INVESTIGACION_HERO.eyebrow} — Pensamiento Lateral`,
  description: INVESTIGACION_HERO.body,
};

export default async function InvestigacionPage() {
  const relatedInsights = await getRelatedInsights(INVESTIGACION_RELATED_SLUGS);

  return (
    <>
      <ServiceHero
        eyebrow={INVESTIGACION_HERO.eyebrow}
        title={INVESTIGACION_HERO.title}
        body={INVESTIGACION_HERO.body}
        ctaLabel={INVESTIGACION_HERO.ctaLabel}
        ctaHref={INVESTIGACION_HERO.ctaHref}
        visual={<DataPattern variant="cluster" className="h-full w-full" />}
      />

      <ContextIntro title={INVESTIGACION_CONTEXT.title} paragraphs={INVESTIGACION_CONTEXT.paragraphs} wide />

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <h2 className="text-display-md font-semibold text-slate">{INVESTIGACION_CAPABILITIES_INTRO.title}</h2>
          <p className="mt-4 max-w-(--measure) text-lg text-slate/80">{INVESTIGACION_CAPABILITIES_INTRO.body}</p>
          <div className="mt-12">
            <CapabilityList items={INVESTIGACION_CAPABILITIES} columns={2} />
          </div>
        </Container>
      </section>

      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <Eyebrow as="h2">{INVESTIGACION_METHODOLOGY_INTRO.title}</Eyebrow>
          <h3 className="mt-4 text-display-md font-semibold text-slate">
            {INVESTIGACION_METHODOLOGY_INTRO.subtitle}
          </h3>
          <p className="mt-4 max-w-(--measure) text-lg text-slate/80">{INVESTIGACION_METHODOLOGY_INTRO.body}</p>
          <div className="mt-12">
            <CapabilityList items={INVESTIGACION_METHODOLOGIES} columns={3} />
          </div>
        </Container>
      </section>

      {/* Design-review pass: paragraphs widened from a lone max-w-(--measure)
          block to the same md:col-span-8 grid used by ContextIntro's `wide`
          variant, so this reads as part of the same width system as the
          rest of the page instead of a narrower one-off. Bottom padding
          trimmed (py-24 → pt-24/pb-12) — this section and Caso destacado
          are both bg-cream with no rule between them, and the two full
          py-* paddings stacked into a much bigger gap than the page's other
          section transitions. TagList (a single unconstrained line) is
          unchanged. */}
      <section className="bg-cream">
        <Container className="pt-20 pb-10 md:pt-24 md:pb-14">
          <h2 className="text-display-md font-semibold text-slate">{INVESTIGACION_OUTRO.title}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-12">
            <div className="flex flex-col gap-4 text-lg leading-relaxed text-slate/80 md:col-span-8">
              {INVESTIGACION_OUTRO.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <TagList tags={INVESTIGACION_OUTRO.tags} />
          </div>
        </Container>
      </section>

      {/* Top padding trimmed to match Del hallazgo a la acción's reduced
          bottom above (same reasoning); bottom trimmed too, matched by
          RelatedArticles' own `compact` top padding below, so the gap
          before Artículos relacionados shrinks the same way. */}
      <section className="bg-cream">
        <Container className="pt-10 pb-10 md:pt-14 md:pb-14">
          <Eyebrow as="h2">Caso destacado</Eyebrow>
          <div className="mt-8">
            <CasePreview caseItem={INVESTIGACION_CASE} />
          </div>
        </Container>
      </section>

      <RelatedArticles insights={relatedInsights} compact />

      <CTASection
        title={INVESTIGACION_FINAL_CTA.title}
        body={INVESTIGACION_FINAL_CTA.body}
        primaryAction={<Button href={INVESTIGACION_FINAL_CTA.ctaHref}>{INVESTIGACION_FINAL_CTA.ctaLabel}</Button>}
        wide
      />
    </>
  );
}
