import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

type ServiceHeroProps = {
  eyebrow: string;
  title: string;
  /** Empresas/Instituciones have two paragraphs; the service pages have one. */
  body: string | string[];
  ctaLabel: string;
  ctaHref: string;
  visual: ReactNode;
  /** Automatizaciones e IA reads calmer: the visual takes less width/opacity
   * so it never competes with the headline (CLAUDE.md #5, #28). */
  compactVisual?: boolean;
  /** Width of the text column (and so the H1's wrap width). Widen it for a
   * long title instead of shrinking the display scale, so the three hero
   * titles keep the same perceived weight (approved consistency pass). */
  columnWidthClass?: string;
};

/** Shared hero for the three service pages — same mechanics as Home's Hero
 * (visual bounded to the container, not the viewport) at one step down in
 * scale (`display-lg` vs Home's `display-xl`), single CTA. The visual
 * itself is swapped per page. */
export default function ServiceHero({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  visual,
  compactVisual = false,
  columnWidthClass = "max-w-2xl",
}: ServiceHeroProps) {
  return (
    <section className="overflow-hidden bg-cream">
      <Container className="relative py-20 md:py-28">
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-full opacity-20 md:opacity-70 ${
            compactVisual ? "md:w-[38%]" : "md:w-[50%]"
          }`}
          aria-hidden="true"
        >
          {visual}
        </div>

        <div className={`relative ${columnWidthClass}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-display-lg font-semibold text-balance text-slate">{title}</h1>
          <div className="mt-6 flex max-w-(--measure-narrow) flex-col gap-4 text-lg text-slate/80">
            {(Array.isArray(body) ? body : [body]).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
