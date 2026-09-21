import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import CasePreview from "@/components/case/CasePreview";
import { CASOS_INTRO } from "@/lib/data/casos";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import { CACHE_TAGS } from "@/sanity/lib/tags";
import type { CaseStudyListItem } from "@/sanity/lib/types";

// CASOS_INTRO is the page's own static intro copy (title/body) — not a
// caso — so it stays as approved static content, same as Insights' page
// intro and Quiénes somos' team-section heading. Only the 5 case entries
// themselves move to Sanity.
export const metadata: Metadata = {
  title: "Casos — Pensamiento Lateral",
  description: CASOS_INTRO.body,
};

export default async function CasosPage() {
  const cases = await sanityFetch<CaseStudyListItem[]>({
    query: CASE_STUDIES_QUERY,
    tags: [CACHE_TAGS.cases],
  });

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
          {cases.map((caseItem, i) => (
            <CasePreview
              key={caseItem._id}
              // "Ver caso" and the /casos/<slug> href are fixed listing-row
              // UI, not per-document Sanity content (see the note on
              // CASE_STUDY_LIST_PROJECTION) — never sourced from the
              // detail page's own ctaLabel/ctaHref ("Hablemos" → /contacto).
              caseItem={{
                name: caseItem.client,
                tagline: caseItem.listingHeadline,
                body: caseItem.listingExcerpt,
                ctaLabel: "Ver caso",
                href: `/casos/${caseItem.slug}`,
              }}
              reversed={i % 2 === 1}
              emphasized={caseItem.client === "Impacto Cercano · AMBA"}
            />
          ))}
        </Container>
      </section>
    </>
  );
}
