import type { Metadata } from "next";
import ServiceHero from "@/components/service/ServiceHero";
import ConnectionIntro from "@/components/service/ConnectionIntro";
import CapabilityList from "@/components/service/CapabilityList";
import CompactCaseList from "@/components/case/CompactCaseList";
import RelatedArticles from "@/components/insight/RelatedArticles";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import TagList from "@/components/ui/TagList";
import WordConnections from "@/components/visualizations/WordConnections";
import { getRelatedInsights } from "@/sanity/lib/relatedInsights";
import {
  EMPRESAS_HERO,
  EMPRESAS_HERO_WORDS,
  EMPRESAS_CONNECTION,
  EMPRESAS_CHALLENGES,
  EMPRESAS_CAPABILITY_SUMMARY_TITLE,
  EMPRESAS_CAPABILITY_SUMMARY,
  EMPRESAS_CASES_TITLE,
  EMPRESAS_CASES,
  EMPRESAS_SECTORS,
  EMPRESAS_RELATED_SLUGS,
  EMPRESAS_FINAL_CTA,
} from "@/lib/data/empresas";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE") — description reuses the approved hero's first paragraph.
export const metadata: Metadata = {
  title: `${EMPRESAS_HERO.eyebrow} — Pensamiento Lateral`,
  description: EMPRESAS_HERO.body[0],
};

export default async function EmpresasPage() {
  const relatedInsights = await getRelatedInsights(EMPRESAS_RELATED_SLUGS);

  return (
    <>
      <ServiceHero
        eyebrow={EMPRESAS_HERO.eyebrow}
        title={EMPRESAS_HERO.title}
        body={EMPRESAS_HERO.body}
        ctaLabel={EMPRESAS_HERO.ctaLabel}
        ctaHref={EMPRESAS_HERO.ctaHref}
        visual={<WordConnections words={EMPRESAS_HERO_WORDS} layout="converge" accent="terracotta" className="h-full w-full" />}
      />

      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <ConnectionIntro {...EMPRESAS_CONNECTION} />
          <div className="mt-16">
            <CapabilityList items={EMPRESAS_CHALLENGES} columns={2} />
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <Eyebrow as="h2">{EMPRESAS_CAPABILITY_SUMMARY_TITLE}</Eyebrow>
          <div className="mt-8">
            <CapabilityList items={EMPRESAS_CAPABILITY_SUMMARY} columns={3} />
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <h2 className="text-display-md font-semibold text-slate">{EMPRESAS_CASES_TITLE}</h2>
          <div className="mt-8">
            <CompactCaseList items={EMPRESAS_CASES} />
          </div>
        </Container>
      </section>

      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <h2 className="text-display-md font-semibold text-slate">{EMPRESAS_SECTORS.title}</h2>
          <p className="mt-4 max-w-(--measure) text-lg text-slate/80">{EMPRESAS_SECTORS.body}</p>
          <div className="mt-6">
            <TagList tags={EMPRESAS_SECTORS.terms} />
          </div>
        </Container>
      </section>

      <RelatedArticles insights={relatedInsights} />

      <CTASection
        title={EMPRESAS_FINAL_CTA.title}
        body={EMPRESAS_FINAL_CTA.body}
        primaryAction={<Button href={EMPRESAS_FINAL_CTA.ctaHref}>{EMPRESAS_FINAL_CTA.ctaLabel}</Button>}
      />
    </>
  );
}
