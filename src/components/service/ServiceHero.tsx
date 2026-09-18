import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

type ServiceHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  visual: ReactNode;
  /** Automatizaciones e IA reads calmer: the visual takes less width/opacity
   * so it never competes with the headline (CLAUDE.md #5, #28). */
  compactVisual?: boolean;
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

        <div className="relative max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-display-lg font-semibold text-balance text-slate">{title}</h1>
          <p className="mt-6 max-w-(--measure-narrow) text-lg text-slate/80">{body}</p>
          <div className="mt-10">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
