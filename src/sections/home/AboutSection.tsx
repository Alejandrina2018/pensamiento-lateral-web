import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

// Verbatim from content/final-copy.md — Home / Pensamiento Lateral.
// The quiet editorial break: no data graphics, just typography and space,
// on a soft blue tint (a mix of the existing palette, not a new hue).
export default function AboutSection() {
  return (
    <section className="bg-(--color-blue-tint)">
      <Container narrow className="py-24 md:py-32">
        <Eyebrow>Pensamiento Lateral</Eyebrow>
        <h2 className="mt-4 text-display-lg font-semibold text-slate">
          Miradas distintas para problemas complejos.
        </h2>
        <div className="mt-8 flex flex-col gap-6 text-lg text-slate/80">
          <p>
            Somos una consultora de investigación y datos que desde hace más de 15 años trabaja con empresas,
            organismos públicos e instituciones para interpretar contextos, analizar información y transformar
            evidencia en decisiones y acciones concretas.
          </p>
          <p>
            Combinamos experiencia en investigación, análisis de datos, mejora de procesos y desarrollos
            tecnológicos para abordar cada desafío desde múltiples perspectivas. No partimos de una solución
            predefinida: partimos del problema, de las preguntas correctas y de la información disponible.
          </p>
          <p>
            Trabajamos de manera cercana y flexible, involucrándonos en cada proyecto desde la comprensión inicial
            hasta la construcción de herramientas, recomendaciones o soluciones que puedan ponerse en práctica.
          </p>
          <p>
            Nuestro equipo reúne perfiles de investigación, sociología, marketing, datos, inteligencia de negocios y
            tecnología, con una mirada común: encontrar sentido donde hay complejidad y convertirlo en conocimiento
            útil para actuar.
          </p>
        </div>
      </Container>
    </section>
  );
}
