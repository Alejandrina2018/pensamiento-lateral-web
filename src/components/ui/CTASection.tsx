import type { ReactNode } from "react";
import Container from "./Container";
import Eyebrow from "./Eyebrow";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  id?: string;
  inverted?: boolean;
  /** Extra vertical air for a standalone CTA page (/contacto) so it reads
   * as an intentional destination, not a leftover section. Default
   * (false) keeps every existing usage's padding unchanged. */
  spacious?: boolean;
  /** /contacto is the only page where this CTA is the entire page — there
   * `title` must be the page's H1. Every other usage is one section among
   * several and keeps the default H2. */
  headingLevel?: "h1" | "h2";
  /** Default (false) keeps every existing usage's narrow Container
   * unchanged. /investigacion's design-review pass found the final CTA
   * reading as a small column lost inside the page's usual, much wider
   * Container — `wide` uses the standard (non-narrow) Container instead,
   * with the content itself kept to an 8/12 column so it doesn't stretch
   * edge to edge. */
  wide?: boolean;
  /** Default (false) keeps every existing usage's top padding unchanged
   * (overrides `spacious` too, though the two aren't used together in
   * practice). Only /datos uses this — first pass reduced pt-24/pt-32
   * to pt-12/pt-16 (paired with RelatedArticles' `compactBottom`, ~120px
   * total gap); a second design-review pass found that still too much
   * and tightened it further to pt-8/pt-10 (~80px paired total, see
   * commit message). Bottom is untouched everywhere; still only
   * relevant on /datos. */
  compactTop?: boolean;
  /** Optional decorative visual, shown beside the content on desktop/
   * tablet and below it on mobile (never hidden — CLAUDE.md #24, #28).
   * Default (undefined) keeps every existing usage exactly as-is: only
   * /contacto passes one. When present, the Container widens past its
   * usual narrow measure so there's room for both columns; `wide`'s own
   * grid layout is unrelated and takes precedence if both were ever
   * passed together (not done in practice). */
  visual?: ReactNode;
};

/** Generic closing CTA block (CLAUDE.md #37) — used by Home's Contacto and
 * reusable on internal pages later. */
export default function CTASection({
  eyebrow,
  title,
  body,
  primaryAction,
  secondaryAction,
  id,
  inverted = false,
  spacious = false,
  headingLevel = "h2",
  wide = false,
  compactTop = false,
  visual,
}: CTASectionProps) {
  const Heading = headingLevel;
  const hasVisual = Boolean(visual);
  const topPadding = compactTop ? "pt-8 md:pt-10" : spacious ? "pt-32 md:pt-48" : "pt-24 md:pt-32";
  const bottomPadding = spacious ? "pb-32 md:pb-48" : "pb-24 md:pb-32";

  const content = (
    <>
      {eyebrow && (
        <Eyebrow className={inverted ? "text-cream/60" : undefined}>{eyebrow}</Eyebrow>
      )}
      <Heading className="text-display-lg font-semibold">{title}</Heading>
      {body && <p className={`max-w-(--measure-narrow) text-lg ${inverted ? "text-cream/80" : "text-slate/80"}`}>{body}</p>}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </>
  );

  return (
    <section id={id} className={`overflow-hidden ${inverted ? "bg-slate text-cream" : "bg-cream text-slate"}`}>
      <Container
        narrow={!wide && !hasVisual}
        className={`${wide || hasVisual ? "" : "flex flex-col items-start gap-6"} ${topPadding} ${bottomPadding}`}
      >
        {wide ? (
          <div className="grid gap-6 md:grid-cols-12">
            <div className="flex flex-col items-start gap-6 md:col-span-8">{content}</div>
          </div>
        ) : hasVisual ? (
          <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-16">
            <div className="flex w-full max-w-lg flex-col items-start gap-6">{content}</div>
            <div className="w-full max-w-[280px] shrink-0 md:max-w-none md:flex-1 md:pl-8">{visual}</div>
          </div>
        ) : (
          content
        )}
      </Container>
    </section>
  );
}
