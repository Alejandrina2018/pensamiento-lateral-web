import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyLayout from "@/components/case/CaseStudyLayout";
import DataPattern from "@/components/visualizations/DataPattern";
import type { CaseStudy } from "@/types/content";
import { ZURICH_CASE } from "@/lib/data/casos/zurich";
import { SUONO_CASE } from "@/lib/data/casos/suono";
import { IMPACTO_CERCANO_CASE } from "@/lib/data/casos/impacto-cercano";
import { GCBA_VIOLENCIA_GENERO_CASE } from "@/lib/data/casos/gcba-violencia-genero";
import { BANCO_PROVINCIA_CASE } from "@/lib/data/casos/banco-provincia";

const CASES: Record<string, CaseStudy> = {
  [ZURICH_CASE.slug]: ZURICH_CASE,
  [SUONO_CASE.slug]: SUONO_CASE,
  [IMPACTO_CERCANO_CASE.slug]: IMPACTO_CERCANO_CASE,
  [GCBA_VIOLENCIA_GENERO_CASE.slug]: GCBA_VIOLENCIA_GENERO_CASE,
  [BANCO_PROVINCIA_CASE.slug]: BANCO_PROVINCIA_CASE,
};

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = CASES[slug];
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.client} — Pensamiento Lateral`,
    description: caseStudy.challenge[0],
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = CASES[slug];
  if (!caseStudy) notFound();

  // Per-case quiet background texture, approved individually — never a
  // dominant hero graphic (CLAUDE.md #6). Suono, Banco Provincia and GCBA
  // carry no visual at all; GCBA also drops the numbered "Qué hicimos"
  // reading for a fully plain one, matching its sober subject matter.
  if (caseStudy.slug === "zurich") {
    return <CaseStudyLayout caseStudy={caseStudy} visual={<DataPattern variant="grid-only" className="h-full w-full" />} />;
  }

  if (caseStudy.slug === "impacto-cercano") {
    return (
      <CaseStudyLayout
        caseStudy={caseStudy}
        visual={<DataPattern variant="territory" gridOverlay className="h-full w-full" />}
      />
    );
  }

  if (caseStudy.slug === "gcba-violencia-genero") {
    return <CaseStudyLayout caseStudy={caseStudy} whatWeDidStyle="plain" />;
  }

  return <CaseStudyLayout caseStudy={caseStudy} />;
}
