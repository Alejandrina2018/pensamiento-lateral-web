import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

// Verbatim from content/final-copy.md — Home / Pensamiento Lateral. Same four
// paragraphs as before, redistributed: a lead paragraph with more weight,
// the next two as two blocks side by side on desktop (single column on
// mobile), and a closing line set apart by a rule. No copy changed.
export default function AboutSection() {
  return (
    <section className="bg-(--color-blue-tint)">
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Pensamiento Lateral</Eyebrow>
          <h2 className="mt-4 text-display-lg font-semibold text-slate">
            Miradas distintas para problemas complejos.
          </h2>

          <p className="mt-8 max-w-(--measure) text-lg leading-relaxed font-medium text-slate/90 md:text-xl">
            Somos una consultora de investigación y datos que desde hace más de 15 años trabaja con empresas,
            organismos públicos e instituciones para interpretar contextos, analizar información y transformar
            evidencia en decisiones y acciones concretas.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
            <p className="leading-relaxed text-slate/80">
              Combinamos experiencia en investigación, análisis de datos, mejora de procesos y desarrollos
              tecnológicos para abordar cada desafío desde múltiples perspectivas. No partimos de una solución
              predefinida: partimos del problema, de las preguntas correctas y de la información disponible.
            </p>
            <p className="leading-relaxed text-slate/80">
              Trabajamos de manera cercana y flexible, involucrándonos en cada proyecto desde la comprensión inicial
              hasta la construcción de herramientas, recomendaciones o soluciones que puedan ponerse en práctica.
            </p>
          </div>

          <p className="mt-10 max-w-(--measure) border-t border-slate/15 pt-8 leading-relaxed text-slate/80">
            Nuestro equipo reúne perfiles de investigación, sociología, marketing, datos, inteligencia de negocios y
            tecnología, con una mirada común: encontrar sentido donde hay complejidad y convertirlo en conocimiento
            útil para actuar.
          </p>
        </div>
      </Container>
    </section>
  );
}
