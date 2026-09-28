import Link from "next/link";
import Container from "@/components/ui/Container";
import { AUDIENCES } from "@/lib/data/audiences";

const ACCENT_TEXT = { terracotta: "text-terracotta", green: "text-green" } as const;
const ACCENT_BORDER = { terracotta: "border-terracotta", green: "border-green" } as const;

// Verbatim from content/final-copy.md — Home / Distintos desafíos. Un mismo enfoque.
// Shared neutral (cream) base for both panels — differentiated by a top
// rule + accent color per territory, not by saturated background blocks
// (approved direction: sober over bold).
//
// Bottom padding is intentionally lighter than the site's usual py-24/
// py-32 (design-review pass): this section shares its cream background
// with FeaturedCases right below it (no color change marks the
// boundary), and FeaturedCases' own top padding is reduced to match —
// see that section's comment. Top padding stays full: MethodTimeline
// right above is a full-bleed dark section, a real color break that
// benefits from the usual air.
export default function AudienceSplit() {
  return (
    <section className="bg-cream">
      <Container className="pt-24 pb-12 md:pt-32 md:pb-16">
        <h2 className="text-display-lg font-semibold text-slate">Distintos desafíos. Un mismo enfoque.</h2>
        <p className="mt-4 max-w-(--measure) text-lg text-slate/80">
          Trabajamos con organizaciones que necesitan interpretar mejor su contexto, poner en valor sus datos y
          convertir información en acciones.
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-sand">
          {AUDIENCES.map((audience) => (
            <div
              key={audience.name}
              className={`flex flex-col gap-4 border-t-2 pt-8 md:px-10 md:pt-10 ${ACCENT_BORDER[audience.accent]}`}
            >
              <p className={`text-sm font-medium uppercase tracking-widest ${ACCENT_TEXT[audience.accent]}`}>
                {audience.name}
              </p>
              <h3 className="text-display-md font-semibold text-slate">{audience.tagline}</h3>
              <p className="max-w-(--measure) text-slate/80">{audience.body}</p>
              <p className="text-sm text-slate/70">{audience.tags.join(" · ")}</p>
              <Link
                href={audience.href}
                className={`mt-2 inline-flex w-fit items-center gap-2 text-sm font-medium hover:text-slate ${ACCENT_TEXT[audience.accent]}`}
              >
                {audience.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
