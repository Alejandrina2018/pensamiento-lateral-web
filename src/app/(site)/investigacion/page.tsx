import type { Metadata } from "next";
import ServiceHero from "@/components/service/ServiceHero";
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

      {/* "Investigar es hacer mejores preguntas" (ContextIntro,
          INVESTIGACION_CONTEXT — still in src/lib/data/investigacion.ts,
          kept for rollback) was removed from render here: design-review
          pass to get to the team's bios / concrete service content
          faster. That section was bg-sand/40, sitting between the cream
          Hero and this cream section — removing it put two cream
          sections back to back. Recomposed the backgrounds for
          everything below (not just this one seam) so cream/sand keeps
          strictly alternating all the way to the end of the page —
          including Artículos relacionados and the closing CTA, which
          both default to bg-cream and would otherwise fuse with
          whatever bg-cream section sits next to them (a second
          design-review pass caught this): Hero(cream) → this
          section(sand) → Cómo investigamos(cream) → Del hallazgo a la
          acción(sand) → Caso destacado(cream) →
          Artículos relacionados(sand, via RelatedArticles' `background`
          prop) → CTA(cream, default). */}
      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <h2 className="text-display-md font-semibold text-slate">{INVESTIGACION_CAPABILITIES_INTRO.title}</h2>
          <p className="mt-4 max-w-(--measure) text-lg text-slate/80">{INVESTIGACION_CAPABILITIES_INTRO.body}</p>
          <div className="mt-12">
            <CapabilityList items={INVESTIGACION_CAPABILITIES} columns={2} />
          </div>
        </Container>
      </section>

      <section className="bg-cream">
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
          used to share a background with no rule between them (the two
          full py-* paddings stacked into a much bigger gap than the page's
          other section transitions); a later pass split them onto
          different backgrounds (sand/cream) to keep the page's closing
          sections from fusing, but kept this same tightened padding since
          the gap itself was still the right size. TagList (a single
          unconstrained line) is unchanged. */}
      <section className="bg-sand/40">
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
          before Artículos relacionados shrinks the same way. bg-cream
          (not sand, see the section-order comment above Investigación
          para distintos desafíos): differs from Del hallazgo a la
          acción(sand) above it and from Artículos relacionados(sand)
          below it, so it still reads as its own block on both sides. */}
      <section className="bg-cream">
        <Container className="pt-10 pb-10 md:pt-14 md:pb-14">
          <Eyebrow as="h2">Caso destacado</Eyebrow>
          <div className="mt-8">
            <CasePreview caseItem={INVESTIGACION_CASE} />
          </div>
        </Container>
      </section>

      <RelatedArticles insights={relatedInsights} compact background="sand" />

      <CTASection
        title={INVESTIGACION_FINAL_CTA.title}
        body={INVESTIGACION_FINAL_CTA.body}
        primaryAction={<Button href={INVESTIGACION_FINAL_CTA.ctaHref}>{INVESTIGACION_FINAL_CTA.ctaLabel}</Button>}
        wide
      />
    </>
  );
}
