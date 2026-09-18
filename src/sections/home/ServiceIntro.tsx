import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { SERVICES } from "@/lib/data/services";

// Verbatim from content/final-copy.md — Home / Tres áreas de servicio.
// Investigación and Datos get the full editorial treatment (CLAUDE.md #12);
// Automatizaciones e IA is a compact full-width band, not a smaller card —
// same typographic quality, less vertical real estate.
export default function ServiceIntro() {
  const [investigacion, datos, automatizaciones] = SERVICES;

  return (
    <section id="servicios" className="bg-cream">
      <Container className="py-24 md:py-32">
        <Eyebrow as="h2">Tres áreas de servicio</Eyebrow>
        <p className="mt-4 max-w-(--measure) text-lg text-slate/80">
          Combinamos investigación, datos y tecnología para interpretar el contexto, darle sentido a la información
          y transformarla en herramientas concretas para actuar.
        </p>

        <div className="mt-16 flex flex-col divide-y divide-sand">
          {[investigacion, datos].map((service) => (
            <div key={service.name} className="grid gap-6 py-14 md:grid-cols-12 md:gap-10">
              <p className="text-sm font-medium uppercase tracking-widest text-slate/60 md:col-span-3">
                {service.name}
              </p>
              <div className="flex flex-col gap-4 md:col-span-9">
                <h3 className="text-display-md font-semibold text-slate">{service.tagline}</h3>
                <p className="max-w-(--measure) text-slate/80">{service.body}</p>
                <p className="text-sm text-slate/60">{service.tags.join(" · ")}</p>
                <Link
                  href={service.href}
                  className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-medium text-terracotta hover:text-slate"
                >
                  {service.ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 border-t border-sand py-10 md:grid-cols-12 md:items-baseline md:gap-10">
          <p className="text-sm font-medium uppercase tracking-widest text-slate/60 md:col-span-3">
            {automatizaciones.name}
          </p>
          <div className="flex flex-col gap-3 md:col-span-9">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <h3 className="text-2xl font-semibold text-slate">{automatizaciones.tagline}</h3>
              <p className="max-w-(--measure) text-sm text-slate/70">{automatizaciones.body}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="text-sm text-slate/50">{automatizaciones.tags.join(" · ")}</p>
              <Link
                href={automatizaciones.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-slate"
              >
                {automatizaciones.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
