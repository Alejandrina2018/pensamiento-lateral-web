import type { CaseStudy } from "@/types/content";

// Verbatim from content/final-copy.md — <!-- ROUTE: /casos/banco-provincia -->
export const BANCO_PROVINCIA_CASE: CaseStudy = {
  client: "Banco Provincia",
  title: "Comprender la experiencia para diseñar mejores soluciones",
  slug: "banco-provincia",
  challenge: [
    "En servicios financieros, muchas veces las barreras no están sólo en el producto, sino en la forma en que las personas lo comprenden, lo usan y se relacionan con él.",
    "El desafío fue comprender en profundidad la experiencia de los usuarios, detectar necesidades, dificultades y expectativas, e identificar oportunidades para mejorar productos, servicios y puntos de contacto.",
  ],
  approach: [
    "Llevamos adelante estudios cualitativos centrados en la experiencia de distintos segmentos de usuarios para conocer cómo atravesaban los diferentes momentos de interacción con el banco, qué obstáculos encontraban y qué factores facilitaban o dificultaban el uso de los servicios.",
    "El objetivo fue ir más allá de la evaluación general y comprender **qué ocurría en cada etapa de la experiencia y por qué**.",
  ],
  whatWeDid: {
    kind: "list",
    items: [
      {
        title: "Escuchamos a los usuarios",
        body: "Profundizamos en sus experiencias, necesidades, expectativas y formas de relacionarse con los servicios financieros.",
      },
      {
        title: "Reconstruimos la experiencia",
        body: "Analizamos los distintos momentos del recorrido para identificar puntos de fricción, dudas y oportunidades de mejora.",
      },
      {
        title: "Identificamos barreras",
        body: "Detectamos aspectos vinculados con comprensión, uso, accesibilidad y confianza que podían afectar la experiencia.",
      },
      {
        title: "Tradujimos los hallazgos en oportunidades",
        body: "Organizamos la evidencia para orientar mejoras concretas en productos, servicios y puntos de contacto.",
      },
    ],
  },
  evidence: [
    "La investigación permitió transformar experiencias individuales en una lectura más amplia sobre necesidades, barreras y oportunidades.",
    "Los hallazgos aportaron evidencia para orientar decisiones vinculadas con la experiencia y facilitar el diseño de soluciones alineadas con las necesidades reales de las personas.",
  ],
  finalQuestion: "¿Necesitás comprender mejor la experiencia de tus clientes o usuarios?",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};
