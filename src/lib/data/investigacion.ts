import type { CapabilityItem } from "@/types/service";
import type { HomeCaseHighlight } from "@/types/home";

// Verbatim from content/final-copy.md — <!-- ROUTE: /investigacion -->

export const INVESTIGACION_HERO = {
  eyebrow: "Investigación",
  title: "Entender qué pasa. Comprender por qué.",
  body: "Investigamos personas, mercados y organizaciones para interpretar comportamientos, revelar qué hay detrás de los datos y detectar oportunidades que ayuden a tomar mejores decisiones.",
  ctaLabel: "Hablemos de tu proyecto",
  ctaHref: "/contacto",
};

export const INVESTIGACION_CONTEXT = {
  title: "Investigar es hacer mejores preguntas",
  paragraphs: [
    "Los datos pueden mostrar qué está pasando. La investigación permite entender por qué sucede, qué significa para las personas y qué oportunidades pueden existir detrás de esos comportamientos.",
    "Diseñamos cada estudio a partir del problema que necesita resolver la organización. Combinamos metodologías cualitativas y cuantitativas, distintas fuentes de información y múltiples perspectivas de análisis para construir una mirada profunda del contexto.",
  ],
};

export const INVESTIGACION_CAPABILITIES_INTRO = {
  title: "Investigación para distintos desafíos",
  body: "Cada organización tiene preguntas diferentes. Diseñamos estudios para interpretar lo que está pasando, detectar oportunidades y generar evidencia útil para decidir.",
};

export const INVESTIGACION_CAPABILITIES: CapabilityItem[] = [
  {
    name: "Consumidores y clientes",
    body: "Analizamos necesidades, expectativas, comportamientos y barreras para detectar oportunidades de crecimiento, mejora y diferenciación.",
  },
  {
    name: "Marca y posicionamiento",
    body: "Estudiamos cómo se construye la relación con una marca, qué lugar ocupa en la mente de las personas y qué atributos fortalecen o debilitan su posicionamiento.",
  },
  {
    name: "Experiencia y satisfacción",
    body: "Investigamos los distintos momentos de relación con clientes y usuarios para identificar fricciones, expectativas y oportunidades de mejora.",
  },
  {
    name: "Productos y servicios",
    body: "Exploramos necesidades, conceptos, propuestas y experiencias para acompañar el desarrollo, la evolución o la validación de productos y servicios.",
  },
  {
    name: "Opinión pública e investigación social",
    body: "Analizamos percepciones, demandas y comportamientos para abordar problemáticas sociales, ciudadanas y territoriales y generar evidencia para la toma de decisiones.",
  },
  {
    name: "UX y experiencia digital",
    body: "Investigamos cómo las personas interactúan con productos y servicios digitales para detectar barreras de uso, necesidades y oportunidades de mejora.",
  },
];

export const INVESTIGACION_METHODOLOGY_INTRO = {
  title: "Cómo investigamos",
  subtitle: "Elegimos el enfoque según el desafío",
  body: "Cada problema requiere una forma distinta de ser abordado. Combinamos metodologías, fuentes y herramientas para construir una mirada más completa y generar evidencia relevante.",
};

export const INVESTIGACION_METHODOLOGIES: CapabilityItem[] = [
  {
    name: "Cualitativo",
    body: "Profundizamos en motivaciones, percepciones, experiencias y significados para entender lo que hay detrás de los comportamientos.",
    tags: ["Focus groups", "Entrevistas en profundidad", "Etnografía", "Comunidades"],
  },
  {
    name: "Cuantitativo",
    body: "Medimos comportamientos, actitudes y percepciones para dimensionar fenómenos, identificar patrones y comparar segmentos.",
    tags: [
      "Encuestas",
      "Tracking",
      "Estudios de satisfacción",
      "Segmentación",
      "Evaluación de conceptos",
      "Análisis estadístico",
      "Análisis electoral",
    ],
  },
  {
    name: "Metodologías digitales y nuevas herramientas",
    body: "Incorporamos recursos digitales y tecnología cuando permiten ampliar la escucha, agilizar procesos o enriquecer el análisis.",
    tags: ["Investigación online", "Comunidades digitales", "Social listening", "Herramientas de IA aplicadas a investigación"],
  },
];

export const INVESTIGACION_OUTRO = {
  title: "Del hallazgo a la acción",
  paragraphs: [
    "La investigación cobra valor cuando ayuda a decidir qué hacer.",
    "Analizamos e integramos los hallazgos para transformarlos en oportunidades, recomendaciones y herramientas concretas que puedan orientar decisiones de negocio, gestión, comunicación o diseño de políticas públicas.",
  ],
  tags: [
    "Territorios de posicionamiento",
    "Segmentaciones",
    "Customer journeys",
    "Mapas competitivos",
    "Recomendaciones de experiencia",
    "Oportunidades de innovación",
    "Mapas de abordaje territorial",
    "Priorización de oportunidades",
    "Líneas de acción",
  ],
};

export const INVESTIGACION_CASE: HomeCaseHighlight = {
  name: "Suono",
  tagline: "De entender la marca a detectar nuevas oportunidades de crecimiento",
  body: [
    "Desarrollamos un estudio integral para conocer cómo se construía la relación de los consumidores con la marca, qué atributos valoraban, cómo validaban sus decisiones de compra y qué oportunidades existían en posicionamiento, canales y experiencia.",
    "Los resultados se transformaron en insumos concretos para marketing y distintas áreas del negocio.",
  ],
  ctaLabel: "Ver caso completo",
  href: "/casos/suono",
};

// Only articles that already exist in the /insights data (CLAUDE.md #34 —
// no inventing slugs). final-copy.md's list here is 3/3 published.
export const INVESTIGACION_RELATED_SLUGS = [
  "lo-que-los-datos-no-dicen",
  "cuando-el-cliente-no-dice-lo-que-realmente-piensa",
  "consumidores-no-tienen-que-disenar-la-solucion",
];

export const INVESTIGACION_FINAL_CTA = {
  title: "¿Qué necesitás comprender mejor?",
  body: "Contanos qué desafío, mercado, audiencia o problemática necesitás investigar. Podemos ayudarte a definir el abordaje y generar la evidencia necesaria para tomar mejores decisiones.",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};
