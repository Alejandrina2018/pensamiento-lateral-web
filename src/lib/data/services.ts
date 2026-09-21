import type { Service } from "@/types/home";

// Verbatim from content/final-copy.md — "Tres áreas de servicio" (Home).
// Investigación's `body` has one small deviation: trimmed by a few words
// (design-review round, Fase 1 Home) so its visual length sits closer to
// Datos/Automatizaciones' — explicitly requested ("que los párrafos tengan
// una extensión similar"), sense fully preserved, not a rewrite.
export const SERVICES: Service[] = [
  {
    name: "Investigación",
    tagline: "Entender qué pasa y por qué.",
    body: "Diseñamos estudios sobre personas, mercados y organizaciones. Integramos metodologías cualitativas y cuantitativas para identificar patrones, tensiones y oportunidades más allá del dato.",
    tags: [
      "Investigación de mercado",
      "Opinión pública",
      "Estudios de marca",
      "Experiencia y satisfacción",
      "Investigación social",
      "UX",
    ],
    ctaLabel: "Conocer más",
    href: "/investigacion",
  },
  {
    name: "Datos",
    tagline: "Convertir datos en conocimiento.",
    body: "Ordenamos, normalizamos, integramos y analizamos datos para convertirlos en indicadores y herramientas que faciliten la lectura, el seguimiento y la toma de decisiones.",
    tags: [
      "Análisis de datos",
      "Normalización e integración",
      "KPIs",
      "Dashboards",
      "Power BI",
      "Data Governance",
    ],
    ctaLabel: "Conocer más",
    href: "/datos",
  },
  {
    name: "Automatizaciones e IA",
    tagline: "Hacer más simples y eficientes los procesos.",
    body: "Revisamos, ordenamos y automatizamos procesos para reducir tareas repetitivas, agilizar operaciones y ampliar capacidades, incorporando tecnología e inteligencia artificial cuando aportan valor.",
    tags: ["Automatización de procesos", "Asistentes", "Agentes", "IA aplicada", "Soluciones a medida"],
    ctaLabel: "Conocer más",
    href: "/automatizaciones-ia",
  },
];
