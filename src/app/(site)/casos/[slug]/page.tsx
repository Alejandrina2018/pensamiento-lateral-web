import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toPlainText } from "@portabletext/react";
import CaseStudyLayout from "@/components/case/CaseStudyLayout";
import DataPattern from "@/components/visualizations/DataPattern";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CASE_STUDY_BY_SLUG_QUERY, CASE_STUDY_SLUGS_QUERY } from "@/sanity/lib/queries";
import { CACHE_TAGS } from "@/sanity/lib/tags";
import type { CaseStudyDetail } from "@/sanity/lib/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: CASE_STUDY_SLUGS_QUERY,
    tags: [CACHE_TAGS.cases],
  });
  return slugs.map(({ slug }) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getCaseStudy(slug: string): Promise<CaseStudyDetail | null> {
  return sanityFetch<CaseStudyDetail | null>({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
    tags: [CACHE_TAGS.cases],
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.client} — Pensamiento Lateral`,
    // First paragraph only, matching the previous static behavior —
    // toPlainText() (the sanctioned Portable Text → string utility, never
    // a hand-rolled conversion) takes an array, so this wraps just the
    // first block rather than the whole `challenge`.
    description: caseStudy.challenge[0] ? toPlainText([caseStudy.challenge[0]]) : undefined,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  // Not found and unpublished behave identically: CASE_STUDY_BY_SLUG_QUERY
  // runs on the published-perspective client, so a draft-only document
  // simply never matches — no separate "is it published" check needed,
  // and no fallback to the old TS data either way.
  if (!caseStudy) notFound();

  const layoutData = {
    client: caseStudy.client,
    title: caseStudy.detailHeadline,
    challenge: caseStudy.challenge,
    approach: caseStudy.approach,
    whatWeDid: caseStudy.whatWeDid,
    evidence: caseStudy.evidence,
    finalQuestion: caseStudy.finalQuestion,
    finalBody: caseStudy.finalBody,
    ctaLabel: caseStudy.ctaLabel,
    ctaHref: caseStudy.ctaHref,
  };

  // Per-case quiet background texture, approved individually — never a
  // dominant hero graphic (CLAUDE.md #6). Suono, Banco Provincia and GCBA
  // carry no visual at all; GCBA also drops the numbered "Qué hicimos"
  // reading for a fully plain one, matching its sober subject matter.
  // Keyed on the route's own slug (never reassigned — condition 14), not
  // on any Sanity field.
  if (slug === "zurich") {
    return <CaseStudyLayout caseStudy={layoutData} visual={<DataPattern variant="grid-only" className="h-full w-full" />} />;
  }

  if (slug === "impacto-cercano") {
    return (
      <CaseStudyLayout
        caseStudy={layoutData}
        visual={<DataPattern variant="territory" gridOverlay className="h-full w-full" />}
      />
    );
  }

  if (slug === "gcba-violencia-genero") {
    return <CaseStudyLayout caseStudy={layoutData} whatWeDidStyle="plain" />;
  }

  return <CaseStudyLayout caseStudy={layoutData} />;
}
