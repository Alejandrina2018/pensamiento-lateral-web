import type { CaseStudy } from "@/types/content";

// Verbatim from content/final-copy.md — <!-- ROUTE: /casos/impacto-cercano -->
export const IMPACTO_CERCANO_CASE: CaseStudy = {
  client: "Impacto Cercano · AMBA",
  title: "Comprender el territorio para orientar acciones de impacto local",
  slug: "impacto-cercano",
  challenge: [
    "Las ciudades y los barrios no son realidades homogéneas. Dentro de un mismo territorio conviven experiencias, demandas, percepciones y prioridades diferentes que muchas veces se pierden cuando se analizan sólo a partir de promedios generales.",
    "El desafío fue construir una lectura profunda de distintas localidades del AMBA que permitiera comprender cómo viven los vecinos su barrio, qué problemáticas reconocen, qué valoran y dónde existen oportunidades concretas de intervención.",
  ],
  approach: [
    "Desarrollamos **Impacto Cercano**, un modelo que integra investigación, análisis de datos, escucha territorial y georreferenciación para transformar información en una herramienta de planificación y acción para los municipios.",
    "El objetivo no era solamente relevar demandas, sino identificar de manera proactiva oportunidades de intervención más allá de las problemáticas generales: acciones concretas y cercanas capaces de mejorar la experiencia cotidiana de los vecinos y orientar mejor las decisiones municipales.",
  ],
  whatWeDid: {
    kind: "list",
    items: [
      {
        title: "Escuchamos cualitativamente a los vecinos",
        body: "Exploramos qué valoraban de su barrio, cuáles eran sus principales preocupaciones y qué expectativas tenían sobre su entorno.",
      },
      {
        title: "Identificamos diferencias dentro del territorio",
        body: "Detectamos problemáticas y oportunidades específicas manzana por manzana, construyendo mapas territoriales para visualizar dónde ocurría cada fenómeno.",
      },
      {
        title: "Priorizamos oportunidades de intervención",
        body: "Organizamos la información para distinguir qué temas requerían mayor atención y dónde una acción concreta podía generar mayor impacto.",
      },
      {
        title: "Analizamos el vínculo con el barrio",
        body: "Exploramos aspectos asociados a identidad y pertenencia para identificar también los activos sobre los que podía construirse una estrategia de transformación.",
      },
    ],
  },
  evidence: [
    "El modelo permitió pasar de una lectura general del territorio a una lógica de **intervenciones más precisas, localizadas y conectadas con la experiencia cotidiana de las personas**.",
    "La escucha dejó de ser sólo diagnóstico para convertirse en una herramienta que ayuda a decidir **qué hacer, dónde hacerlo y sobre qué problemáticas actuar primero**.",
  ],
  finalQuestion: "¿Necesitás priorizar acciones territoriales en función de lo que realmente importa?",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};
