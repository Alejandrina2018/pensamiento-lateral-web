import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { SERVICES } from "@/lib/data/services";

// Verbatim from content/final-copy.md — Home / Tres áreas de servicio.
// Investigación and Datos get the full editorial treatment (CLAUDE.md #12);
// Automatizaciones e IA shares the same rail+content rhythm (not a
// leftover row) but at a smaller scale — positioning, not lesser capability.
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

        <div className="mt-12 flex flex-col divide-y divide-sand md:mt-20">
          {[investigacion, datos].map((service, i) => (
            <div key={service.name} className="grid gap-4 py-10 md:grid-cols-12 md:gap-10 md:py-12">
              <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:items-start md:gap-3">
                <span className="text-3xl font-semibold text-slate/15 md:text-5xl" aria-hidden="true">
                  0{i + 1}
                </span>
                <p className="text-sm font-medium uppercase tracking-widest text-terracotta">{service.name}</p>
              </div>
              <div className="flex flex-col gap-4 md:col-span-9">
                <h3 className="text-display-md font-semibold text-slate">{service.tagline}</h3>
                <p className="max-w-(--measure) leading-relaxed text-slate/80">{service.body}</p>
                <p className="text-sm leading-relaxed text-slate/60">{service.tags.join(" · ")}</p>
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

          <div className="grid gap-4 py-10 md:grid-cols-12 md:gap-10 md:py-12">
            <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:items-start md:gap-3">
              <span className="text-3xl font-semibold text-slate/15 md:text-5xl" aria-hidden="true">
                03
              </span>
              <p className="text-sm font-medium uppercase tracking-widest text-terracotta">{automatizaciones.name}</p>
            </div>
            <div className="flex flex-col gap-4 md:col-span-9">
              <h3 className="text-3xl font-semibold text-slate md:text-4xl">{automatizaciones.tagline}</h3>
              <p className="max-w-(--measure) leading-relaxed text-slate/80">{automatizaciones.body}</p>
              <p className="text-sm leading-relaxed text-slate/60">{automatizaciones.tags.join(" · ")}</p>
              <Link
                href={automatizaciones.href}
                className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-medium text-terracotta hover:text-slate"
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
