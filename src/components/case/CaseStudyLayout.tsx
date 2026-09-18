import type { ReactNode } from "react";
import type { CaseStudy } from "@/types/content";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import RichText from "@/components/ui/RichText";
import CTASection from "@/components/ui/CTASection";

type CaseStudyLayoutProps = {
  caseStudy: CaseStudy;
  /** Quiet background texture behind the opening block — never a full
   * hero graphic. Omit entirely for cases that call for no decoration
   * (GCBA). */
  visual?: ReactNode;
  /** GCBA's "Qué hicimos" stays completely plain — no numerals, no
   * connecting line — per its explicit sobriety requirement. Every other
   * list-style case gets the numbered "sequence" reading. */
  whatWeDidStyle?: "sequence" | "plain";
};

/**
 * Shared template for /casos/[slug]. Every section but "El desafío" /
 * "Nuestro abordaje" / "De la evidencia a la acción" is structurally
 * flexible: "Qué hicimos" renders either plain paragraphs or a short list
 * of named sub-blocks depending on what that case's copy actually has, and
 * the closing question only shows a body paragraph when one exists. No
 * section is ever forced to appear empty.
 */
export default function CaseStudyLayout({ caseStudy, visual, whatWeDidStyle = "sequence" }: CaseStudyLayoutProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        {visual && (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-15 md:w-1/2 md:opacity-25" aria-hidden="true">
            {visual}
          </div>
        )}
        <Container className="relative py-16 md:py-20">
          <Eyebrow>{caseStudy.client}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-display-lg font-semibold text-balance text-slate">
            {caseStudy.title}
          </h1>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-16 md:py-20">
          <h2 className="text-display-md font-semibold text-slate">El desafío</h2>
          <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
            {caseStudy.challenge.map((paragraph, i) => (
              <RichText key={i} text={paragraph} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand/40">
        <Container className="py-16 md:py-20">
          <h2 className="text-display-md font-semibold text-slate">Nuestro abordaje</h2>
          <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
            {caseStudy.approach.map((paragraph, i) => (
              <RichText key={i} text={paragraph} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-16 md:py-20">
          <h2 className="text-display-md font-semibold text-slate">Qué hicimos</h2>

          {caseStudy.whatWeDid.kind === "paragraphs" ? (
            <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
              {caseStudy.whatWeDid.items.map((paragraph, i) => (
                <RichText key={i} text={paragraph} />
              ))}
            </div>
          ) : whatWeDidStyle === "plain" ? (
            <div className="mt-8 flex flex-col gap-8">
              {caseStudy.whatWeDid.items.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold text-slate">{item.title}</h3>
                  <RichText text={item.body} className="mt-2 max-w-(--measure) leading-relaxed text-slate/80" />
                </div>
              ))}
            </div>
          ) : (
            <ol className="mt-8 flex flex-col gap-8 border-l border-sand pl-6 md:pl-10">
              {caseStudy.whatWeDid.items.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="shrink-0 pt-1 text-sm font-semibold text-slate/40" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate">{item.title}</h3>
                    <RichText text={item.body} className="mt-2 max-w-(--measure) leading-relaxed text-slate/80" />
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </section>

      <section className="bg-sand/40">
        <Container className="py-16 md:py-20">
          <h2 className="text-display-md font-semibold text-slate">De la evidencia a la acción</h2>
          <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
            {caseStudy.evidence.map((paragraph, i) => (
              <RichText key={i} text={paragraph} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title={caseStudy.finalQuestion}
        body={caseStudy.finalBody}
        primaryAction={<Button href={caseStudy.ctaHref}>{caseStudy.ctaLabel}</Button>}
      />
    </>
  );
}
