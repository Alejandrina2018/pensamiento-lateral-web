import type { HomeCaseHighlight } from "@/types/home";

// Verbatim from content/final-copy.md — "Cuando el conocimiento se convierte en acción" (Home).
// "Sector público" groups the GCBA and Impacto Cercano cases; its CTA goes to
// /instituciones, not a filtered /casos view (confirmed by the client).
export const HOME_CASE_HIGHLIGHTS: HomeCaseHighlight[] = [
  {
    name: "Zurich",
    tagline: "De información dispersa a una herramienta para la gestión.",
    ctaLabel: "Ver caso",
    href: "/casos/zurich",
  },
  {
    name: "Suono",
    tagline: "De conocer la marca a encontrar nuevas oportunidades de crecimiento.",
    ctaLabel: "Ver caso",
    href: "/casos/suono",
  },
  {
    name: "Sector público",
    tagline: "Comprender el territorio para orientar la acción.",
    body: "Investigación y análisis para detectar problemáticas, interpretar percepciones y necesidades ciudadanas y transformar esa evidencia en herramientas para la gestión.",
    ctaLabel: "Ver casos de instituciones",
    href: "/instituciones",
  },
];
