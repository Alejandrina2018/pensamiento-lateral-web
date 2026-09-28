import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

// Verbatim from content/final-copy.md — Home / Hero.
// Visual: the client's own approved conceptual image (design-review round,
// Fase 2) — scattered data points converging, through an ordered pattern,
// into a single focused finding. Replaces the previous SVG dot-pattern +
// lens overlay as the hero's main visual, in a real two-column layout
// (not an absolutely-positioned, low-opacity background watermark
// anymore) so it reads as the primary asset, not decoration. `priority`
// since this is almost certainly the page's LCP element.
//
// The text column widens from 5/12 to 8/12 only from lg: (1024px) up
// (design-review pass, "Mejores datos, mejores decisiones." restored as
// the historic H1): at text-display-xl's desktop size the 5/12 column
// forced a 4-line break ("Mejores" / "datos," / "mejores" / "decisiones.");
// 8/12 fits it on the intended 2 lines ("Mejores datos," / "mejores
// decisiones.") at the H1's unchanged font-size, so nothing needed
// shrinking. Tablet (md:, 768–1023px) keeps the original 5/7 split — its
// own multi-line wrap already reads fine at that size, and widening it too
// would shrink the visual much more than it needs to be there.
export default function Hero() {
  return (
    <section className="bg-cream">
      <Container className="py-24 md:py-36">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5 lg:col-span-8">
            <h1 className="text-display-xl font-semibold text-balance text-slate">
              Mejores datos, mejores decisiones.
            </h1>
            <p className="mt-6 max-w-(--measure-narrow) text-lg text-slate/80">
              Investigación y datos para comprender contextos, encontrar oportunidades y transformar evidencia en
              acciones.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#servicios">Conocé nuestros servicios</Button>
              <Button href="#contacto" variant="secondary">
                Hablemos
              </Button>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-4">
            <Image
              src="/images/hero/comprender-para-la-accion.jpg"
              alt="Datos dispersos que se ordenan en un patrón y convergen en un hallazgo — comprender para la acción"
              width={1672}
              height={941}
              priority
              sizes="(min-width: 768px) 58vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
