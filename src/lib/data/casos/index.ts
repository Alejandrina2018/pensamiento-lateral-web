import type { HomeCaseHighlight } from "@/types/home";

// Verbatim from content/final-copy.md — <!-- ROUTE: /casos -->
// Taglines/bodies here are the /casos LISTING copy — distinct from each
// case's own detail-page headline in src/lib/data/casos/<slug>.ts. Order
// matches final-copy.md exactly (never reordered for visual reasons).

export const CASOS_INTRO = {
  title: "Problemas reales. Evidencia aplicada. Resultados concretos.",
  body: "Cada proyecto parte de una pregunta distinta. Combinamos investigación, datos y tecnología para comprender el problema, encontrar oportunidades y construir herramientas que permitan actuar.",
};

export const CASOS_LISTING: HomeCaseHighlight[] = [
  {
    name: "Zurich",
    tagline: "De información dispersa a una herramienta para la gestión.",
    body: "Integramos distintas fuentes de información y desarrollamos indicadores y tableros para facilitar el seguimiento y la toma de decisiones.",
    ctaLabel: "Ver caso",
    href: "/casos/zurich",
  },
  {
    name: "Suono",
    tagline: "De comprender al consumidor a encontrar nuevas oportunidades de crecimiento.",
    body: "Un estudio integral de marca y consumidores que permitió identificar oportunidades en posicionamiento, experiencia, canales y estrategia de negocio.",
    ctaLabel: "Ver caso",
    href: "/casos/suono",
  },
  {
    name: "Impacto Cercano · AMBA",
    tagline: "Comprender el territorio para orientar acciones de impacto local.",
    body: "Investigación, escucha territorial, datos y georreferenciación para identificar prioridades y orientar intervenciones más precisas.",
    ctaLabel: "Ver caso",
    href: "/casos/impacto-cercano",
  },
  {
    name: "Gobierno de la Ciudad de Buenos Aires",
    tagline: "Relevar: el primer paso para combatir la violencia de género en el AMBA.",
    body: "Una investigación social face to face que permitió dimensionar la problemática y generar evidencia para políticas y campañas de concientización.",
    ctaLabel: "Ver caso",
    href: "/casos/gcba-violencia-genero",
  },
  {
    name: "Banco Provincia",
    tagline: "Comprender la experiencia para diseñar mejores soluciones.",
    body: "Estudios cualitativos con distintos segmentos de usuarios para identificar necesidades, barreras y oportunidades de mejora en la experiencia.",
    ctaLabel: "Ver caso",
    href: "/casos/banco-provincia",
  },
];
