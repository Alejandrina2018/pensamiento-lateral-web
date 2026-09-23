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
import { getRelatedInsights } from "@/sanity/lib/relatedInsights";
import { getCasesBySlugs } from "@/sanity/lib/relatedCases";
import { urlFor } from "@/sanity/lib/image";
import type { CaseStudyListItem } from "@/sanity/lib/types";
import type { HomeCaseHighlight } from "@/types/home";
import {
  INSTITUCIONES_HERO,
  INSTITUCIONES_CONNECTION,
  INSTITUCIONES_CHALLENGES,
  INSTITUCIONES_CAPABILITY_SUMMARY_TITLE,
  INSTITUCIONES_CAPABILITY_SUMMARY,
  INSTITUCIONES_CASES_TITLE,
  INSTITUCIONES_CASE_SLUGS,
  INSTITUCIONES_RELATED_SLUGS,
  INSTITUCIONES_FINAL_CTA,
} from "@/lib/data/instituciones";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE") — description reuses the approved hero's first paragraph.
export const metadata: Metadata = {
  title: `${INSTITUCIONES_HERO.eyebrow} — Pensamiento Lateral`,
  description: INSTITUCIONES_HERO.body[0],
};

// Local fallback while these two cases don't have a Sanity featuredImage
// yet — keyed by the caseStudy's own `slug` (stable identifier, not the
// display name). Remove an entry once its Sanity featuredImage is set;
// toCaseImage already prefers Sanity first, so nothing else changes.
const LOCAL_CASE_IMAGE_FALLBACK: Record<string, { src: string; alt: string }> = {
  "impacto-cercano": {
    src: "/images/casos/impacto-cercano.jpg",
    alt: "Mujeres mayores conversando y compartiendo un momento en un encuentro comunitario",
  },
  "gcba-violencia-genero": {
    src: "/images/casos/gcba-violencia-genero.jpg",
    alt: "Fachada de un edificio institucional en la Ciudad de Buenos Aires",
  },
};

/** Resolves a case image with three tiers, in order: Sanity
 * `featuredImage` (asset + optional hotspot — Sanity's own crop already
 * respects the hotspot) → a local fallback file for the two cases that
 * don't have one in Sanity yet → undefined, which makes CasePreview fall
 * back to its usual CaseImagePlaceholder. Never hardcodes a photo inside
 * CasePreview itself. */
function toCaseImage(caseItem: CaseStudyListItem): { src: string; alt: string } | undefined {
  if (caseItem.featuredImage?.asset) {
    return {
      src: urlFor(caseItem.featuredImage).width(1200).height(900).fit("crop").url(),
      alt: caseItem.featuredImage.alt || caseItem.client,
    };
  }
  return LOCAL_CASE_IMAGE_FALLBACK[caseItem.slug];
}

export default async function InstitucionesPage() {
  const relatedInsights = await getRelatedInsights(INSTITUCIONES_RELATED_SLUGS);
  // "Ver caso" is fixed listing-row UI, not per-document Sanity content —
  // same reasoning as /casos' own listing cutover.
  const institucionesCases: HomeCaseHighlight[] = (await getCasesBySlugs(INSTITUCIONES_CASE_SLUGS)).map((c) => ({
    name: c.client,
    tagline: c.listingHeadline,
    body: c.listingExcerpt,
    ctaLabel: "Ver caso",
    href: `/casos/${c.slug}`,
    image: toCaseImage(c),
  }));
  const [impactoCercano, gcba] = institucionesCases;

  return (
    <>
      <ServiceHero
        eyebrow={INSTITUCIONES_HERO.eyebrow}
        title={INSTITUCIONES_HERO.title}
        body={INSTITUCIONES_HERO.body}
        ctaLabel={INSTITUCIONES_HERO.ctaLabel}
        ctaHref={INSTITUCIONES_HERO.ctaHref}
        visual={<DataPattern variant="map" className="h-full w-full" />}
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

      {/* Bottom padding trimmed (pb-28→pb-14 desktop) to close the gap to
          Casos below, paired with that section's own trimmed top padding —
          same reasoning and same values already used for /datos and
          /automatizaciones-ia. Top padding (gap to "Comprender para
          intervenir mejor" above) is untouched — not part of this
          request. */}
      <section className="bg-cream">
        <Container className="pt-20 pb-10 md:pt-28 md:pb-14">
          <Eyebrow as="h2">{INSTITUCIONES_CAPABILITY_SUMMARY_TITLE}</Eyebrow>
          <div className="mt-8">
            <CapabilityList items={INSTITUCIONES_CAPABILITY_SUMMARY} columns={3} />
          </div>
        </Container>
      </section>

      {/* Both top and bottom padding trimmed — top closes the gap to
          "Cómo podemos acompañarte" above, bottom closes the gap to
          Artículos relacionados below (paired with its own `compact` +
          `compactBottom` props). Internal spacing between the two case
          rows is untouched. */}
      <section className="bg-cream">
        <Container className="py-10 md:py-14">
          <h2 className="text-display-md font-semibold text-slate">{INSTITUCIONES_CASES_TITLE}</h2>
          {/* Impacto Cercano goes first with extra room — it's PL's own
              model — purely through order and spacing, no new labels or
              metrics (approved direction). */}
          {impactoCercano && (
            <div className="mt-10">
              <CasePreview caseItem={impactoCercano} />
            </div>
          )}
          {gcba && (
            <div className="mt-4">
              <CasePreview caseItem={gcba} reversed />
            </div>
          )}
        </Container>
      </section>

      <RelatedArticles insights={relatedInsights} compact compactBottom />

      <CTASection
        title={INSTITUCIONES_FINAL_CTA.title}
        body={INSTITUCIONES_FINAL_CTA.body}
        primaryAction={<Button href={INSTITUCIONES_FINAL_CTA.ctaHref}>{INSTITUCIONES_FINAL_CTA.ctaLabel}</Button>}
        wide
        compactTop
      />
    </>
  );
}
