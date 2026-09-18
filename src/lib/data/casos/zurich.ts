import type { CaseStudy } from "@/types/content";

// Verbatim from content/final-copy.md — <!-- ROUTE: /casos/zurich -->
export const ZURICH_CASE: CaseStudy = {
  client: "Zurich",
  title: "De reportes a decisiones más ágiles",
  slug: "zurich",
  challenge: [
    "En muchas organizaciones, la información existe, pero no necesariamente está preparada para decidir.",
    "Zurich contaba con múltiples fuentes de datos y procesos de reporting que requerían integración y trabajo manual. La información estaba disponible, pero su fragmentación dificultaba construir una lectura clara, consistente y oportuna de la gestión.",
    "El desafío fue transformar ese conjunto de datos en una herramienta que permitiera a los equipos seguir lo que estaba pasando, detectar desvíos y acceder a información relevante con mayor autonomía.",
  ],
  approach: [
    "Trabajamos sobre todo el recorrido de la información: desde la integración de las distintas fuentes hasta la definición de indicadores y su visualización.",
    "El objetivo no era simplemente desarrollar un dashboard, sino construir una lógica de información que facilitara la lectura del negocio y pudiera sostenerse en el tiempo.",
  ],
  whatWeDid: {
    kind: "paragraphs",
    items: [
      "Integramos distintas fuentes de información en un único entorno, definimos y estructuramos indicadores, desarrollamos tableros interactivos en Power BI y automatizamos parte del proceso de reporting.",
      "Los tableros permitieron no sólo visualizar resultados, sino también explorarlos, compararlos y comprenderlos en contexto.",
    ],
  },
  evidence: [
    "Los equipos pudieron seguir la evolución de los principales indicadores, detectar desvíos con mayor rapidez, profundizar en la información y contar con una base más confiable para sus decisiones.",
  ],
  finalQuestion: "¿Tenés información pero todavía cuesta convertirla en una herramienta para gestionar?",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};
