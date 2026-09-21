import type { ReactNode } from "react";
import type { PortableTextBlock } from "sanity";
import { PortableText } from "@portabletext/react";
import type { NamedBlock, WhatWeDidItem } from "@/sanity/lib/types";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import CTASection from "@/components/ui/CTASection";

/** Everything this layout actually renders, sourced from a published
 * Sanity caseStudy document (see CASE_STUDY_BY_SLUG_QUERY) — challenge/
 * approach/evidence/whatWeDid are Portable Text, rendered with
 * @portabletext/react rather than converted to strings/HTML by hand. */
type CaseStudyLayoutData = {
  client: string;
  title: string;
  challenge: PortableTextBlock[];
  approach: PortableTextBlock[];
  whatWeDid: WhatWeDidItem[];
  evidence: PortableTextBlock[];
  finalQuestion: string;
  finalBody?: string;
  ctaLabel: string;
  ctaHref: string;
};

type CaseStudyLayoutProps = {
  caseStudy: CaseStudyLayoutData;
  /** Quiet background texture behind the opening block — never a full
   * hero graphic. Omit entirely for cases that call for no decoration
   * (GCBA). */
  visual?: ReactNode;
  /** GCBA's "Qué hicimos" stays completely plain — no numerals, no
   * connecting line — per its explicit sobriety requirement. Every other
   * list-style case gets the numbered "sequence" reading. */
  whatWeDidStyle?: "sequence" | "plain";
};

function isNamedBlock(item: WhatWeDidItem): item is NamedBlock {
  return item._type === "namedBlock";
}

type WhatWeDidGroup = { kind: "paragraphs"; blocks: PortableTextBlock[] } | { kind: "list"; items: NamedBlock[] };

/**
 * `whatWeDid` is a mixed array (plain Portable Text blocks and/or
 * namedBlocks) that must render in its original order without losing
 * content. Every one of the 5 migrated cases is actually homogeneous
 * (all-paragraphs or all-namedBlock, matching the old paragraphs|list
 * union 1:1), so grouping consecutive same-kind items reproduces exactly
 * today's single-branch rendering for real content, while still doing the
 * structurally correct thing — nothing dropped, order preserved — if a
 * case ever mixes both.
 */
function groupWhatWeDid(items: WhatWeDidItem[]): WhatWeDidGroup[] {
  const groups: WhatWeDidGroup[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (isNamedBlock(item)) {
      if (last?.kind === "list") last.items.push(item);
      else groups.push({ kind: "list", items: [item] });
    } else if (last?.kind === "paragraphs") {
      last.blocks.push(item);
    } else {
      groups.push({ kind: "paragraphs", blocks: [item] });
    }
  }
  return groups;
}

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
            <PortableText value={caseStudy.challenge} />
          </div>
        </Container>
      </section>

      <section className="bg-sand/40">
        <Container className="py-16 md:py-20">
          <h2 className="text-display-md font-semibold text-slate">Nuestro abordaje</h2>
          <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
            <PortableText value={caseStudy.approach} />
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-16 md:py-20">
          <h2 className="text-display-md font-semibold text-slate">Qué hicimos</h2>

          {groupWhatWeDid(caseStudy.whatWeDid).map((group, gi) =>
            group.kind === "paragraphs" ? (
              <div
                key={gi}
                className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80"
              >
                <PortableText value={group.blocks} />
              </div>
            ) : whatWeDidStyle === "plain" ? (
              <div key={gi} className="mt-8 flex flex-col gap-8">
                {group.items.map((item) => (
                  <div key={item._key}>
                    <h3 className="text-lg font-semibold text-slate">{item.title}</h3>
                    <div className="mt-2 max-w-(--measure) leading-relaxed text-slate/80">
                      <PortableText value={item.body} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ol key={gi} className="mt-8 flex flex-col gap-8 border-l border-sand pl-6 md:pl-10">
                {group.items.map((item, i) => (
                  <li key={item._key} className="flex gap-4">
                    <span className="shrink-0 pt-1 text-sm font-semibold text-slate/40" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate">{item.title}</h3>
                      <div className="mt-2 max-w-(--measure) leading-relaxed text-slate/80">
                        <PortableText value={item.body} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            ),
          )}
        </Container>
      </section>

      <section className="bg-sand/40">
        <Container className="py-16 md:py-20">
          <h2 className="text-display-md font-semibold text-slate">De la evidencia a la acción</h2>
          <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
            <PortableText value={caseStudy.evidence} />
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
