import type { MethodStage } from "@/types/home";
import type { PressItem } from "@/types/content";
import { AUTHORS } from "./authors";

// Verbatim from content/final-copy.md — <!-- ROUTE: /quienes-somos -->

export const QUIENES_SOMOS_INTRO = {
  title: "Miradas distintas para problemas complejos.",
  paragraphs: [
    "Somos una consultora de investigación y datos que desde hace más de 15 años trabaja con empresas, organismos públicos e instituciones para interpretar contextos, analizar información y transformar evidencia en decisiones y acciones concretas.",
    "Combinamos perfiles de investigación, sociología, marketing, datos, inteligencia de negocios y tecnología para abordar cada desafío desde múltiples perspectivas.",
  ],
};

export const QUIENES_SOMOS_APPROACH = {
  title: "Nuestra forma de trabajar",
  subtitle: "Rigor para analizar. Flexibilidad para resolver.",
  intro: [
    "Creemos que los problemas complejos no se resuelven aplicando fórmulas generales. Requieren entender el contexto, hacer las preguntas correctas y combinar las capacidades necesarias para cada desafío.",
    "Por eso trabajamos junto a nuestros clientes desde la definición del problema hasta la construcción de recomendaciones, herramientas o soluciones que puedan ponerse en práctica.",
  ],
};

export const QUIENES_SOMOS_PRINCIPLES: MethodStage[] = [
  {
    number: "01",
    title: "Experiencia",
    description: "Más de 15 años trabajando sobre problemas de investigación, información y gestión.",
  },
  {
    number: "02",
    title: "Mirada interdisciplinaria",
    description: "Integramos investigación, negocios, datos y tecnología para construir una lectura más completa.",
  },
  {
    number: "03",
    title: "Rigurosidad",
    description:
      "Trabajamos con metodologías y criterios sólidos, cuidando la calidad de la información en cada etapa.",
  },
  {
    number: "04",
    title: "Cercanía",
    description:
      "Nos involucramos en cada proyecto y trabajamos junto a los equipos para comprender el negocio y construir recomendaciones alineadas con lo que realmente puede ponerse en práctica.",
  },
  {
    number: "05",
    title: "Orientación a la acción",
    description: "Buscamos que cada investigación, análisis o desarrollo aporte algo concreto a la decisión.",
  },
];

export const QUIENES_SOMOS_EVOLUTION = {
  title: "Una consultora que evoluciona con los problemas que necesita resolver",
  paragraphs: [
    "Pensamiento Lateral nació como un puente entre consumidores y ciudadanos y quienes necesitan tomar decisiones.",
    "Con el tiempo fuimos ampliando nuestras capacidades a medida que los desafíos de nuestros clientes requerían nuevas respuestas, sin perder una mirada cercana sobre lo que ocurre en cada contexto, en cada territorio y en cada **“metro cuadrado”**.",
    "La investigación nos enseñó a escuchar, preguntar y comprender. Los datos nos permitieron integrar información, dimensionar fenómenos y descubrir relaciones que no siempre son evidentes. La tecnología amplió exponencialmente nuestra capacidad para analizar información, agilizar procesos y desarrollar herramientas adaptadas a las necesidades de cada cliente.",
  ],
  leadIn: "Hoy, cada estudio y cada análisis parte de una misma idea:",
  closingStatement: "No investigamos para describir. Investigamos para actuar.",
};

export const QUIENES_SOMOS_TEAM = {
  title: "Nuestro equipo",
  subtitle: "Distintas disciplinas. Una misma forma de mirar los problemas.",
  intro:
    "Pensamiento Lateral reúne perfiles de investigación, sociología, marketing, ciencia de datos, inteligencia de negocios y tecnología que trabajan de manera integrada según las necesidades de cada proyecto.",
  members: [AUTHORS.alejandrina, AUTHORS.angeles],
};

export const QUIENES_SOMOS_PRESS = {
  title: "PL en la prensa",
  subtitle: "Pensamiento Lateral también en los medios",
  items: [
    {
      title: "La generación Silver ya mueve US$ 3,25 billones y obliga a las empresas a repensar cómo venden",
      publication: "Revista Mercado",
      date: "Septiembre 2026",
      excerpt:
        "Un análisis sobre cómo está cambiando la relación con la tecnología, el consumo y las marcas entre los mayores de 50, y por qué el desafío ya no pasa sólo por el acceso digital sino por la autonomía.",
    },
    {
      title: "Cuatro arquetipos de la Generación Silver frente a la tecnología",
      publication: "La Gaceta",
      date: "Septiembre 2026",
      excerpt:
        "La edad no alcanza para explicar la relación de los Silver con la tecnología. El análisis identifica cuatro perfiles según autonomía, confianza y comportamiento digital.",
    },
  ] satisfies PressItem[],
  allPressCtaLabel: "Ver todas las apariciones en prensa",
};
