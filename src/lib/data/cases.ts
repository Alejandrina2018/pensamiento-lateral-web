import type { HomeCaseHighlight } from "@/types/home";

// Verbatim from content/final-copy.md — "Cuando el conocimiento se convierte en acción" (Home).
// "Sector público" groups the GCBA and Impacto Cercano cases; its CTA goes to
// /instituciones, not a filtered /casos view (confirmed by the client).
//
// Deliberate fixed editorial curation, not a pending Sanity migration: this
// is the one Home section that intentionally stays hand-authored even
// though /casos itself reads the same underlying cases from Sanity
// (CASE_STUDIES_QUERY). "Sector público" has no Sanity counterpart — it's
// a Home-only grouping of two separate caseStudy documents under one
// block, with its own body copy and a CTA that doesn't point at either
// case individually — so it can't be derived automatically from Sanity's
// flat case list without inventing a data model just for this one section.
// Revisit only if the client asks to change which cases are featured here.
export const HOME_CASE_HIGHLIGHTS: HomeCaseHighlight[] = [
  {
    name: "Zurich",
    tagline: "De información dispersa a una herramienta para la gestión.",
    ctaLabel: "Ver caso",
    href: "/casos/zurich",
    image: { src: "/images/casos/zurich.jpeg", alt: "Tablero de indicadores en una notebook, sobre una mesa de trabajo" },
  },
  {
    name: "Suono",
    tagline: "De conocer la marca a encontrar nuevas oportunidades de crecimiento.",
    ctaLabel: "Ver caso",
    href: "/casos/suono",
    image: { src: "/images/casos/suono.jpeg", alt: "Equipo de trabajo reunido, analizando información en una sala de reuniones" },
  },
  {
    name: "Sector público",
    tagline: "Comprender el territorio para orientar la acción.",
    body: "Investigación y análisis para detectar problemáticas, interpretar percepciones y necesidades ciudadanas y transformar esa evidencia en herramientas para la gestión.",
    ctaLabel: "Ver casos de instituciones",
    href: "/instituciones",
    // Banco de la Nación Argentina — real Argentine public-building photo
    // supplied by the client (design-review round, Fase 2), replacing the
    // placeholder that stood in for the earlier, explicitly-rejected
    // generic international reference (see git history).
    image: { src: "/images/casos/sector-publico.jpg", alt: "Fachada del edificio del Banco de la Nación Argentina" },
  },
];
