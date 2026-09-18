import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import DataPattern from "@/components/visualizations/DataPattern";

// Verbatim from content/final-copy.md — Home / Hero.
// The data pattern is bounded to the same max-width container as the text
// (rather than the full viewport) so the gap between them stays consistent
// instead of growing on very wide desktop screens.
export default function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <Container className="relative py-24 md:py-36">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-30 md:w-[55%] md:opacity-80"
          aria-hidden="true"
        >
          <DataPattern className="h-full w-full" />
        </div>

        <div className="relative max-w-2xl">
          <h1 className="text-display-xl font-semibold text-balance text-slate">
            Comprender para la acción.
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
      </Container>
    </section>
  );
}
