import type { CapabilityItem } from "@/types/service";
import type { ConnectionIntroData } from "@/types/audience";

// Verbatim from content/final-copy.md — <!-- ROUTE: /instituciones -->

export const INSTITUCIONES_HERO = {
  eyebrow: "Instituciones",
  title: "Evidencia para comprender realidades complejas y generar impacto.",
  body: [
    "Trabajamos con organismos públicos, fundaciones, ONG e instituciones que necesitan comprender problemáticas sociales, ciudadanas y territoriales para diseñar, implementar y evaluar mejores acciones.",
    "Combinamos investigación, análisis de datos y herramientas tecnológicas para transformar información en conocimiento útil para la gestión.",
  ],
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};

// "Comprender para intervenir mejor" + the 6 desafíos — one continuous
// section in final-copy.md, kept that way here.
//
// The 6 words below are a visual/conceptual diagram label set, not body
// copy — the paragraph text itself is untouched. 5 of the 6 appear
// literally on this page (percepciones/comportamientos/datos/contexto in
// this paragraph, expectativas in "Opinión pública y electoral" below);
// "Necesidades" doesn't appear verbatim anywhere in /instituciones' copy —
// flagged to and explicitly approved by the client to include anyway as a
// diagram label (design-review pass, 2026-09-22).
export const INSTITUCIONES_CONNECTION: ConnectionIntroData = {
  title: "Comprender para intervenir mejor",
  paragraphs: [
    "Las problemáticas públicas y sociales rara vez tienen una sola explicación. Requieren integrar percepciones, comportamientos, datos y contexto para interpretar qué está pasando y dónde conviene actuar.",
    "Diseñamos abordajes que permiten escuchar, medir, analizar y priorizar, generando evidencia que ayude a orientar decisiones y acciones en territorio.",
  ],
  words: ["Percepciones", "Necesidades", "Expectativas", "Comportamientos", "Datos", "Contexto"],
  layout: "network",
  accent: "green",
};

export const INSTITUCIONES_CHALLENGES: CapabilityItem[] = [
  {
    name: "Opinión pública y electoral",
    body: "Analizamos percepciones, expectativas y demandas para comprender qué está pasando, identificar los factores que influyen en la construcción de las opiniones y evaluar posibles caminos de acción.",
  },
  {
    name: "Investigación social",
    body: "Estudiamos problemáticas, comportamientos y experiencias para comprender fenómenos sociales y generar evidencia que ayude a diseñar mejores intervenciones.",
  },
  {
    name: "Territorio",
    body: "Integramos investigación, datos y georreferenciación para detectar diferencias entre zonas, identificar prioridades y orientar estrategias de abordaje territorial, fortaleciendo la cercanía y la escucha activa de los vecinos.",
  },
  {
    name: "Evaluación",
    body: "Diseñamos herramientas para medir resultados, analizar impactos y detectar oportunidades de mejora en programas, políticas e iniciativas.",
  },
  {
    name: "Datos para la gestión",
    body: "Ordenamos, integramos y analizamos información para construir indicadores y herramientas que faciliten el seguimiento y orienten las decisiones y acciones de los equipos de gestión.",
  },
  {
    name: "Escucha y participación",
    body: "Diseñamos mecanismos para relevar de manera sistemática la voz de ciudadanos, comunidades y actores clave y convertirla en insumos útiles para la gestión.",
  },
];

export const INSTITUCIONES_CAPABILITY_SUMMARY_TITLE = "Cómo podemos acompañarte";

export const INSTITUCIONES_CAPABILITY_SUMMARY: CapabilityItem[] = [
  {
    name: "Investigación",
    tags: ["Opinión pública", "Investigación electoral", "Investigación social", "Territorio", "Evaluación", "Participación"],
  },
  {
    name: "Datos",
    tags: ["Normalización", "Integración", "KPIs", "Dashboards", "Georreferenciación", "Tableros de gestión"],
  },
  {
    name: "Tecnología",
    tags: ["Automatización", "Formularios territoriales", "Sistemas de escucha", "Asistentes", "IA aplicada"],
  },
];

export const INSTITUCIONES_CASES_TITLE = "Casos";

/**
 * Selection and order only — this page's own curation (Impacto Cercano
 * first with extra room, then GCBA — CLAUDE.md-approved). The client
 * name/tagline/body shown for each no longer live here: they were verbatim
 * duplicates of the caseStudy documents' listingHeadline/listingExcerpt in
 * Sanity, so /instituciones now fetches them by slug instead (see
 * getCasesBySlugs in src/sanity/lib/relatedCases.ts) — one source per case,
 * never two copies to keep in sync.
 */
export const INSTITUCIONES_CASE_SLUGS = ["impacto-cercano", "gcba-violencia-genero"];

// Only the article that already exists in the /insights data (CLAUDE.md
// #34). The other 2 titles from final-copy.md aren't published yet.
export const INSTITUCIONES_RELATED_SLUGS = ["por-que-los-promedios-no-alcanzan"];

export const INSTITUCIONES_FINAL_CTA = {
  title: "¿Qué necesitás comprender para intervenir mejor?",
  body: "Podemos ayudarte a definir el abordaje, generar evidencia y construir herramientas útiles para orientar decisiones y acciones.",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};
