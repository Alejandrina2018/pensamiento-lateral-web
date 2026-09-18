import Container from "@/components/ui/Container";
import { CLIENTS } from "@/lib/data/clients";

// Verbatim from content/final-copy.md — Home / Credenciales.
export default function ClientCredentials() {
  return (
    <section className="bg-sand/60">
      <Container narrow className="flex flex-col items-center gap-10 py-16 text-center md:py-20">
        <h2 className="text-display-md font-semibold text-slate">
          Más de 15 años transformando evidencia en decisiones que generan impacto.
        </h2>

        {/* No logo assets yet (CLAUDE.md #8) — sober typographic placeholders. */}
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-5 md:gap-x-8">
          {CLIENTS.map((name, i) => (
            <li key={name} className="flex items-center gap-5 md:gap-8">
              <span className="text-base font-semibold uppercase tracking-widest text-slate md:text-lg">
                {name}
              </span>
              {i < CLIENTS.length - 1 && (
                <span aria-hidden="true" className="text-slate/25">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
