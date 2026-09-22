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
}: CTASectionProps) {
  const Heading = headingLevel;

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
    <section id={id} className={inverted ? "bg-slate text-cream" : "bg-cream text-slate"}>
      <Container
        narrow={!wide}
        className={`${wide ? "" : "flex flex-col items-start gap-6"} ${spacious ? "py-32 md:py-48" : "py-24 md:py-32"}`}
      >
        {wide ? (
          <div className="grid gap-6 md:grid-cols-12">
            <div className="flex flex-col items-start gap-6 md:col-span-8">{content}</div>
          </div>
        ) : (
          content
        )}
      </Container>
    </section>
  );
}
