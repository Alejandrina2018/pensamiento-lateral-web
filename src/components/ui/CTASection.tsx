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
}: CTASectionProps) {
  return (
    <section id={id} className={inverted ? "bg-slate text-cream" : "bg-cream text-slate"}>
      <Container narrow className="flex flex-col items-start gap-6 py-24 md:py-32">
        {eyebrow && (
          <Eyebrow className={inverted ? "text-cream/60" : undefined}>{eyebrow}</Eyebrow>
        )}
        <h2 className="text-display-lg font-semibold">{title}</h2>
        {body && <p className={`max-w-(--measure-narrow) text-lg ${inverted ? "text-cream/80" : "text-slate/80"}`}>{body}</p>}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </Container>
    </section>
  );
}
