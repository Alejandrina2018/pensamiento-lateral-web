import type { CapabilityItem } from "@/types/service";
import type { ConnectionIntroData } from "@/types/audience";

// Verbatim from content/final-copy.md — <!-- ROUTE: /empresas -->

export const EMPRESAS_HERO = {
  eyebrow: "Empresas",
  title: "Conocimiento para impulsar el crecimiento.",
  body: [
    "Acompañamos a empresas que necesitan conocer mejor a sus clientes y mercados, poner en valor sus datos y mejorar procesos para tomar decisiones con mayor evidencia.",
    "Combinamos investigación, análisis y tecnología según las necesidades de cada desafío, integrándonos a los equipos para transformar información en oportunidades y herramientas concretas de gestión.",
  ],
  ctaLabel: "Hablemos de tu desafío",
  ctaHref: "/contacto",
};

// Words used in the hero visual — all appear in the hero copy above.
export const EMPRESAS_HERO_WORDS = ["clientes", "mercados", "marca", "datos", "gestión"];

// "Decisiones complejas necesitan una mirada integral" + the 6 desafíos —
// one continuous section in final-copy.md, kept that way here.
export const EMPRESAS_CONNECTION: ConnectionIntroData = {
  title: "Decisiones complejas necesitan una mirada integral",
  paragraphs: [
    "Los desafíos de una organización rara vez pertenecen a una sola área. Una oportunidad comercial puede requerir entender al consumidor, revisar datos internos, analizar la competencia y detectar procesos que necesitan mejorar.",
    "Trabajamos de manera transversal para conectar esas distintas fuentes de conocimiento y construir una mirada más completa del negocio.",
  ],
  words: ["consumidor", "marca", "datos", "competencia", "procesos"],
  layout: "converge",
  accent: "terracotta",
};

export const EMPRESAS_CHALLENGES: CapabilityItem[] = [
  {
    name: "Entender clientes y consumidores",
    body: "Comprendemos necesidades, comportamientos, expectativas y barreras para detectar oportunidades de crecimiento, mejora y diferenciación.",
  },
  {
    name: "Fortalecer marcas y propuestas de valor",
    body: "Analizamos posicionamiento, atributos, diferenciación y oportunidades frente a la competencia.",
  },
  {
    name: "Mejorar la experiencia",
    body: "Identificamos fricciones y oportunidades a lo largo del customer journey.",
  },
  {
    name: "Convertir datos en herramientas de gestión",
    body: "Ordenamos, integramos y analizamos información para construir indicadores y dashboards que faciliten la toma de decisiones.",
  },
  {
    name: "Mejorar procesos",
    body: "Revisamos circuitos de trabajo para simplificar, ordenar y automatizar cuando tiene sentido.",
  },
  {
    name: "Detectar nuevas oportunidades",
    body: "Identificamos segmentos, necesidades, mercados y espacios de innovación con potencial de crecimiento.",
  },
];

export const EMPRESAS_CAPABILITY_SUMMARY_TITLE = "Cómo podemos acompañarte";

export const EMPRESAS_CAPABILITY_SUMMARY: CapabilityItem[] = [
  {
    name: "Investigación",
    tags: ["Investigación de mercado", "Marca", "Segmentación", "Customer experience", "UX", "Satisfacción"],
  },
  {
    name: "Datos",
    tags: ["Normalización", "Integración", "KPIs", "Dashboards", "Power BI", "Data Governance"],
  },
  {
    name: "Mejora de procesos y automatización",
    tags: ["Diagnóstico de procesos", "Automatización", "Asistentes", "Agentes", "IA aplicada"],
  },
];

export const EMPRESAS_CASES_TITLE = "Distintos desafíos. Resultados concretos.";

/**
 * Selection and order only — this page's own curation (CLAUDE.md-approved:
 * Zurich, Suono, Banco Provincia, in this order). The actual client name/
 * tagline shown for each no longer lives here: they were verbatim
 * duplicates of the caseStudy documents' listingHeadline/listingExcerpt in
 * Sanity, so /empresas now fetches them by slug instead (see
 * getCasesBySlugs in src/sanity/lib/relatedCases.ts) — one source per case,
 * never two copies to keep in sync.
 */
export const EMPRESAS_CASE_SLUGS = ["zurich", "suono", "banco-provincia"];

export const EMPRESAS_SECTORS = {
  title: "Experiencia en distintos sectores",
  body: "Acompañamos desde empresas medianas en procesos de profesionalización hasta grandes organizaciones que necesitan profundizar el conocimiento de sus clientes, fortalecer sus marcas, ordenar información o mejorar su gestión.",
  terms: [
    "Banca y servicios financieros",
    "Consumo",
    "Sector agropecuario",
    "Tecnología",
    "Retail",
    "Seguros",
    "Turismo",
    "Empresas medianas en procesos de profesionalización",
  ],
};

export const EMPRESAS_RELATED_SLUGS = [
  "mas-datos-no-garantiza-mejores-decisiones",
  "lo-que-los-datos-no-dicen",
  "cuando-el-cliente-no-dice-lo-que-realmente-piensa",
];

export const EMPRESAS_FINAL_CTA = {
  title: "¿Qué desafío necesitás resolver?",
  body: "Podemos ayudarte a definir el abordaje y combinar las capacidades necesarias para avanzar.",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};
