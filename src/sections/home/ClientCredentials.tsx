import Image from "next/image";
import Container from "@/components/ui/Container";
import { CLIENT_LOGOS } from "@/lib/data/clients";

// Verbatim from content/final-copy.md — Home / Credenciales.
// Real logo files replace the sober typographic placeholders (design-review
// round). Rendered in grayscale + reduced opacity, all at the same fixed
// height regardless of source aspect ratio — a deliberately uniform,
// unsaturated "trust bar" so sixteen different brand colors never compete
// with each other or with the heading (CLAUDE.md #35: sobria, not a splash
// of mixed brand color). Not using `narrow` anymore: this many logos need
// more room to breathe than the original six short text names did.
//
// Second design-review round adds 7 more logos (16 total). The row is
// capped at max-w-5xl/6xl — narrower than the section's own 1360px
// container — so it reads as a deliberate, centered composition instead of
// stretching thin edge-to-edge; wrapping is the intended layout (no
// carousel/slider), so gaps step up with viewport instead of holding one
// fixed value that would either crowd mobile or leave desktop sparse.
export default function ClientCredentials() {
  return (
    <section className="bg-sand/60">
      <Container className="flex flex-col items-center gap-10 py-16 text-center md:py-20">
        <h2 className="max-w-3xl text-display-md font-semibold text-slate">
          Más de 15 años transformando evidencia en decisiones que generan impacto.
        </h2>

        <ul className="flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-7 md:max-w-5xl md:gap-x-12 md:gap-y-9 lg:max-w-6xl lg:gap-x-14 lg:gap-y-10">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.name} className="flex h-8 items-center md:h-9 lg:h-11">
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
