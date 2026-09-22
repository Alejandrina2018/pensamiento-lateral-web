import type { CapabilityItem } from "@/types/service";
import type { HomeCaseHighlight } from "@/types/home";

// Verbatim from content/final-copy.md — <!-- ROUTE: /datos -->

export const DATOS_HERO = {
  eyebrow: "Datos",
  title: "Convertir datos en conocimiento.",
  body: "Trabajamos sobre información dispersa, incompleta o difícil de interpretar para transformarla en una base confiable para la gestión y la toma de decisiones.",
  ctaLabel: "Hablemos de tu proyecto",
  ctaHref: "/contacto",
};

export const DATOS_CONTEXT = {
  title: "Dar valor a los datos",
  paragraphs: [
    "Tener información no siempre significa poder utilizarla.",
    "Muchas organizaciones cuentan con múltiples fuentes, sistemas y reportes, pero sin una estructura que permita integrarlos, compararlos y convertirlos en conocimiento útil.",
    "Ordenamos, normalizamos, integramos y analizamos datos para construir una visión más clara de lo que está pasando y desarrollar indicadores y herramientas que faciliten el seguimiento y la gestión.",
  ],
};

export const DATOS_CAPABILITIES_INTRO = {
  title: "Datos para distintos desafíos",
  body: "Trabajamos sobre todo el ciclo de la información, desde su calidad y organización hasta el análisis y la construcción de herramientas para la gestión.",
};

export const DATOS_CAPABILITIES: CapabilityItem[] = [
  {
    name: "Normalización e integración de datos",
    body: "Ordenamos, limpiamos y unificamos información proveniente de distintas fuentes para construir una base consistente, comparable y confiable.",
  },
  {
    name: "Análisis de datos",
    body: "Exploramos la información para identificar patrones, relaciones, desvíos y oportunidades que permitan comprender mejor lo que está pasando.",
  },
  {
    name: "Indicadores y KPIs",
    body: "Definimos indicadores alineados con los objetivos de la organización para facilitar el seguimiento y la toma de decisiones.",
  },
  {
    name: "Dashboards y Business Intelligence",
    body: "Construimos tableros claros y dinámicos que permiten visualizar, explorar y comparar información de manera ágil.",
  },
  {
    name: "Data Governance",
    body: "Definimos criterios, procesos y reglas que ayudan a mejorar la calidad, consistencia y trazabilidad de la información.",
  },
  {
    name: "Datos para mejorar procesos",
    body: "Analizamos cómo circula y se utiliza la información para detectar duplicaciones, tareas manuales, fricciones y oportunidades de mejora.",
  },
];

export const DATOS_OUTPUTS = {
  title: "De los datos a herramientas de gestión",
  body: "El valor aparece cuando la información se convierte en algo que la organización puede utilizar para agilizar la gestión, decidir con menor incertidumbre y mejorar resultados.",
  label: "Según el proyecto, desarrollamos:",
  terms: [
    "Bases normalizadas",
    "Modelos de datos",
    "KPIs",
    "Dashboards",
    "Tableros de gestión",
    "Reportes automatizados",
    "Matrices de seguimiento",
    "Alertas",
    "Modelos de segmentación",
    "Recomendaciones de mejora",
  ],
};

export const DATOS_CASE: HomeCaseHighlight = {
  name: "Zurich",
  tagline: "De información dispersa a una herramienta para la gestión",
  body: [
    "Integramos, ordenamos y analizamos información proveniente de distintas fuentes para construir indicadores y tableros que permitieran una lectura más clara, ágil y consistente de la gestión.",
    "El trabajo permitió centralizar información, mejorar el seguimiento de los principales indicadores y facilitar el acceso a datos relevantes para la toma de decisiones.",
  ],
  ctaLabel: "Ver caso completo",
  href: "/casos/zurich",
  // Same real photo (and alt text) already used for Zurich on Home and
  // now /investigacion's Suono case — reused here rather than duplicated
  // (CLAUDE.md #8: no invented assets). Already a native landscape crop
  // that reads clearly at CasePreview's aspect-[4/3] box.
  image: { src: "/images/casos/zurich.jpeg", alt: "Tablero de indicadores en una notebook, sobre una mesa de trabajo" },
};

// Only the article that already exists in the /insights data (CLAUDE.md
// #34). The other 2 titles from final-copy.md aren't published yet.
export const DATOS_RELATED_SLUGS = ["mas-datos-no-garantiza-mejores-decisiones"];

export const DATOS_FINAL_CTA = {
  title: "¿Estás dando verdadero valor a tus datos?",
  body: "Podemos ayudarte a transformar información dispersa en herramientas útiles para la gestión.",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};
