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
        <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
          {CLIENTS.map((name, i) => (
            <li key={name} className="flex items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-widest text-slate/70">{name}</span>
              {i < CLIENTS.length - 1 && (
                <span aria-hidden="true" className="text-slate/30">
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
