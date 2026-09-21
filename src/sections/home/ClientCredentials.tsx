import Image from "next/image";
import Container from "@/components/ui/Container";
import { CLIENT_LOGOS } from "@/lib/data/clients";

// Verbatim from content/final-copy.md — Home / Credenciales.
// Real logo files replace the sober typographic placeholders (design-review
// round). Rendered in grayscale + reduced opacity, all at the same fixed
// height regardless of source aspect ratio — a deliberately uniform,
// unsaturated "trust bar" so nine different brand colors never compete with
// each other or with the heading (CLAUDE.md #35: sobria, not a splash of
// mixed brand color). Not using `narrow` anymore: nine logos need more room
// to breathe than the original six short text names did.
export default function ClientCredentials() {
  return (
    <section className="bg-sand/60">
      <Container className="flex flex-col items-center gap-10 py-16 text-center md:py-20">
        <h2 className="max-w-3xl text-display-md font-semibold text-slate">
          Más de 15 años transformando evidencia en decisiones que generan impacto.
        </h2>

        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.name} className="flex h-8 items-center md:h-10">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-full w-auto object-contain opacity-70 grayscale"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
