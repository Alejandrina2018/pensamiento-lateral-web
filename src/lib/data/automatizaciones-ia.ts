import type { CapabilityItem } from "@/types/service";
import type { HomeCaseHighlight, MethodStage } from "@/types/home";

// Verbatim from content/final-copy.md — <!-- ROUTE: /automatizaciones-ia -->

export const AUTOMATIZACIONES_HERO = {
  eyebrow: "Automatizaciones e IA",
  title: "Tecnología para hacer más simples y eficientes los procesos.",
  body: "Aplicamos automatización e inteligencia artificial para reducir tareas repetitivas, agilizar operaciones y ampliar las capacidades de los equipos.",
  ctaLabel: "Hablemos de tu proyecto",
  ctaHref: "/contacto",
};

export const AUTOMATIZACIONES_CONTEXT = {
  title: "La tecnología como herramienta",
  paragraphs: [
    "No partimos de una solución tecnológica predefinida. Analizamos el proceso, identificamos fricciones y evaluamos dónde la automatización o la inteligencia artificial pueden generar una mejora concreta.",
    "Diseñamos soluciones que se integran al trabajo cotidiano de los equipos para ahorrar tiempo, ordenar información y facilitar la gestión.",
  ],
};

// No dedicated section title/intro precedes these in final-copy.md — they
// follow the context block directly.
export const AUTOMATIZACIONES_CAPABILITIES: CapabilityItem[] = [
  {
    name: "Automatización de procesos",
    body: "Revisamos tareas repetitivas, circuitos manuales y flujos de información para identificar oportunidades de automatización que reduzcan tiempos y errores.",
  },
  {
    name: "Asistentes internos",
    body: "Desarrollamos asistentes que ayudan a los equipos a consultar información, acceder al conocimiento interno y resolver tareas de manera más ágil.",
  },
  {
    name: "Agentes conversacionales",
    body: "Diseñamos agentes para acompañar procesos de atención, ventas, posventa o gestión, integrando información y respuestas de manera consistente.",
  },
  {
    name: "IA aplicada a datos",
    body: "Utilizamos inteligencia artificial para facilitar la exploración, interpretación y consulta de información, especialmente cuando los datos están distribuidos en múltiples fuentes.",
  },
  {
    name: "Soluciones a medida",
    body: "Combinamos automatización, análisis y desarrollo tecnológico para construir herramientas adaptadas a procesos y necesidades específicas.",
  },
];

export const AUTOMATIZACIONES_PROCESS_TITLE = "Cómo trabajamos";

export const AUTOMATIZACIONES_PROCESS: MethodStage[] = [
  {
    number: "01",
    title: "Diagnosticamos los procesos",
    description:
      "Analizamos cómo funcionan hoy, dónde están las fricciones y qué tareas consumen más tiempo, generan más errores o tienen mayor impacto en costos y recursos.",
  },
  {
    number: "02",
    title: "Priorizamos oportunidades",
    description: "Evaluamos qué puede automatizarse, qué impacto tendría y dónde conviene empezar para generar mejoras concretas.",
  },
  {
    number: "03",
    title: "Diseñamos la solución",
    description: "Definimos el flujo, las integraciones y la herramienta más adecuada para resolver el problema de forma simple y escalable.",
  },
  {
    number: "04",
    title: "Implementamos y capacitamos",
    description:
      "Ponemos la solución en funcionamiento, acompañamos la adopción y capacitamos al equipo para que pueda gestionarla con autonomía.",
  },
];

export const AUTOMATIZACIONES_CASE: HomeCaseHighlight = {
  name: "Suono",
  tagline: "Automatizar la escucha para transformar la posventa en una oportunidad de relación y crecimiento",
  body: [
    "Desarrollamos una solución que acompaña la experiencia del cliente después de la compra, facilita el onboarding, potencia oportunidades de venta cruzada y convierte las conversaciones en información útil para los equipos.",
    "La tecnología permitió sistematizar un proceso que demandaba tiempo operativo y, al mismo tiempo, fortalecer la satisfacción del cliente, mejorar el vínculo con la marca e impulsar la fidelización.",
  ],
  ctaLabel: "Ver caso completo",
  href: "/casos/suono",
  // Same real photo (and alt text) already used for Suono everywhere else
  // it appears — Home, /investigacion — reused here rather than
  // duplicated (CLAUDE.md #8: no invented assets, and site-wide criterion
  // that every Suono appearance uses this same meeting photo). Already a
  // native 4:3 (768×576), the exact box CasePreview renders it in.
  image: { src: "/images/casos/suono.jpeg", alt: "Equipo de trabajo reunido, analizando información en una sala de reuniones" },
};

// None of final-copy.md's 3 related titles for this page exist in the
// /insights data yet — the section is intentionally omitted (CLAUDE.md #34).
export const AUTOMATIZACIONES_RELATED_SLUGS: string[] = [];

export const AUTOMATIZACIONES_FINAL_CTA = {
  title: "¿Qué proceso podrías hacer más simple?",
  body: "Realizá una consulta de diagnóstico. Podemos ayudarte a identificar oportunidades y definir qué soluciones tiene sentido implementar.",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};
