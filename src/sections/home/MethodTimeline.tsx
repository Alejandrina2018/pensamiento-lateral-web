import Container from "@/components/ui/Container";
import { METHOD_STAGES } from "@/lib/data/method";

// Verbatim from content/final-copy.md — Home / De los datos a la acción.
// All 5 stages are always in the DOM and visible — no hover-gated or
// JS-revealed text (CLAUDE.md #13). The connecting line/markers are pure
// CSS; no scripting involved.
export default function MethodTimeline() {
  return (
    <section id="metodo" className="bg-slate text-cream">
      <Container className="py-24 md:py-32">
        <h2 className="text-display-lg font-semibold">De los datos a la acción</h2>
        <p className="mt-4 max-w-(--measure) text-lg text-cream/80">
          Un enfoque integral que combina investigación, análisis y tecnología para transformar conocimiento en
          decisiones y resultados.
        </p>

        <ol className="mt-16 flex flex-col gap-12 border-l border-cream/20 pl-8 md:mt-24 md:flex-row md:gap-8 md:border-l-0 md:border-t md:pl-0 md:pt-10">
          {METHOD_STAGES.map((stage) => (
            <li key={stage.number} className="relative flex-1">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(2rem+2px)] top-1 h-1.5 w-1.5 rounded-full bg-terracotta md:-top-[calc(2.5rem+2px)] md:left-0"
              />
              <p className="text-number-lg font-semibold text-cream/25">{stage.number}</p>
              <h3 className="mt-1 text-xl font-semibold">{stage.title}</h3>
              <p className="mt-2 max-w-(--measure-narrow) text-sm text-cream/70">{stage.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
