import type { Metadata } from "next";
import ServiceHero from "@/components/service/ServiceHero";
import ContextIntro from "@/components/service/ContextIntro";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import TagList from "@/components/ui/TagList";
import RichText from "@/components/ui/RichText";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTASection from "@/components/ui/CTASection";
import {
  PYMES_HERO,
  PYMES_DECISIONS,
  PYMES_SOLUTIONS,
  PYMES_ORIENTADOR,
  PYMES_EXPERIENCE,
  PYMES_FAQ,
  PYMES_FINAL_CTA,
} from "@/lib/data/pymes";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE") — description reuses the approved hero's first paragraph.
export const metadata: Metadata = {
  title: `${PYMES_HERO.eyebrow} — Pensamiento Lateral`,
  description: PYMES_HERO.body[0],
};

export default function ServiciosParaPymesPage() {
  return (
    <>
      <ServiceHero
        eyebrow={PYMES_HERO.eyebrow}
        title={PYMES_HERO.title}
        body={PYMES_HERO.body}
        ctaLabel={PYMES_HERO.ctaLabel}
        ctaHref={PYMES_HERO.ctaHref}
        columnWidthClass="max-w-2xl md:max-w-4xl"
      />

      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <h2 className="text-display-md font-semibold text-slate">{PYMES_DECISIONS.title}</h2>
          <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
            {PYMES_DECISIONS.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-col divide-y divide-sand border-t border-sand">
            {PYMES_DECISIONS.questions.map((question) => (
              <p key={question} className="py-6 text-2xl font-semibold text-balance text-slate md:text-3xl">
                {question}
              </p>
            ))}
          </div>

          <p className="mt-10 max-w-(--measure) text-lg leading-relaxed text-slate/80">{PYMES_DECISIONS.closing}</p>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <div className="flex flex-col divide-y divide-sand border-t border-sand">
            {PYMES_SOLUTIONS.map((solution) => (
              <div key={solution.name} className="grid gap-4 py-12 md:grid-cols-12 md:gap-10 md:py-16">
                <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:items-start md:gap-3">
                  <span className="text-3xl font-semibold text-slate/15 md:text-5xl" aria-hidden="true">
                    {solution.number}
                  </span>
                  <h2 className="text-sm font-medium uppercase tracking-widest text-slate/60">{solution.name}</h2>
                </div>
                <div className="flex flex-col gap-4 md:col-span-9">
                  <h3 className="text-display-md font-semibold text-slate">{solution.tagline}</h3>
                  <RichText text={solution.body} className="max-w-(--measure) leading-relaxed text-slate/80" />
                  <TagList tags={solution.tags} />
                  <div className="mt-2">
                    <Button href={solution.ctaHref}>{solution.ctaLabel}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <h2 className="text-display-md font-semibold text-slate">{PYMES_ORIENTADOR.title}</h2>
          <h3 className="mt-4 max-w-(--measure) text-xl font-medium text-slate/70">{PYMES_ORIENTADOR.subtitle}</h3>

          <div className="mt-12 flex flex-col divide-y divide-sand border-t border-sand">
            {PYMES_ORIENTADOR.items.map((item) => (
              <div key={item.problem} className="flex flex-col gap-3 py-8 md:flex-row md:items-center md:gap-8">
                <p className="text-lg text-slate/80 md:flex-1">{item.problem}</p>
                <div className="flex items-center gap-3 md:shrink-0">
                  <span aria-hidden="true" className="text-slate/40">
                    →
                  </span>
                  <p className="text-xl font-semibold text-terracotta">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-(--measure) text-lg leading-relaxed text-slate/80">{PYMES_ORIENTADOR.closing}</p>
          <div className="mt-6">
            <Button href={PYMES_ORIENTADOR.ctaHref}>{PYMES_ORIENTADOR.ctaLabel}</Button>
          </div>
        </Container>
      </section>

      <ContextIntro title={PYMES_EXPERIENCE.title} paragraphs={PYMES_EXPERIENCE.paragraphs} />

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <Eyebrow as="h2">Preguntas frecuentes</Eyebrow>
          <div className="mt-10">
            <FAQAccordion items={PYMES_FAQ} />
          </div>
        </Container>
      </section>

      <CTASection
        title={PYMES_FINAL_CTA.title}
        body={PYMES_FINAL_CTA.body}
        primaryAction={<Button href={PYMES_FINAL_CTA.ctaHref}>{PYMES_FINAL_CTA.ctaLabel}</Button>}
      />
    </>
  );
}
