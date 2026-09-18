import type { PymesSolution, PymesOrientadorItem, FAQItem } from "@/types/pymes";

// Verbatim from content/final-copy.md — <!-- ROUTE: /servicios-para-pymes -->

export const PYMES_HERO = {
  eyebrow: "Servicios para Pymes",
  title: "Información clara para tomar mejores decisiones y hacer crecer tu negocio",
  body: [
    "Ayudamos a empresas medianas y pequeñas a comprender mejor a sus clientes y mercados, ordenar sus datos y mejorar procesos para crecer con mayor claridad y eficiencia.",
    "Combinamos investigación, análisis de datos y tecnología con soluciones adaptadas a los tiempos, necesidades y recursos de una Pyme.",
  ],
  ctaLabel: "Contanos qué necesitás resolver",
  ctaHref: "/contacto",
};

export const PYMES_DECISIONS = {
  title: "Cada decisión cuenta",
  intro: [
    "En una Pyme, una decisión equivocada puede tener un impacto directo en ventas, costos y rentabilidad.",
    "Muchas empresas tienen información, clientes y experiencia acumulada, pero necesitan responder preguntas concretas:",
  ],
  questions: [
    "¿Por qué no están funcionando las ventas?",
    "¿Qué valoran realmente nuestros clientes?",
    "¿Qué deberíamos medir para saber si estamos creciendo?",
    "¿Dónde estamos perdiendo tiempo o recursos?",
    "¿Qué procesos convendría mejorar o automatizar?",
  ],
  closing:
    "No siempre hace falta un gran proyecto. A veces hace falta hacer la pregunta correcta y contar con la información necesaria para responderla.",
};

export const PYMES_SOLUTIONS: PymesSolution[] = [
  {
    number: "01",
    name: "Investigación Express",
    tagline: "Entender antes de decidir",
    body: "Investigaciones ágiles y a medida para responder preguntas concretas sobre clientes, mercado, marca, productos o decisiones comerciales. Diseñamos estudios con tiempos y alcances definidos para generar información confiable sin necesidad de desarrollar procesos largos o complejos.",
    tags: ["Clientes", "Mercado", "Marca", "Competencia", "Productos", "Oportunidades comerciales"],
    ctaLabel: "Conocer más",
    ctaHref: "/contacto",
  },
  {
    number: "02",
    name: "Tablero de Gestión Pyme",
    tagline: "Ver lo que importa para decidir mejor",
    body: "Tener datos no significa tener información útil. Ordenamos las distintas fuentes del negocio, definimos los indicadores realmente relevantes y los transformamos en un tablero simple que permite entender qué está pasando sin depender de múltiples planillas y reportes. El objetivo no es tener más métricas. Es **tener las métricas que ayudan a gestionar**.",
    tags: ["Ventas", "Rentabilidad", "Costos", "Clientes", "Marketing", "Operaciones", "Objetivos"],
    ctaLabel: "Conocer más",
    ctaHref: "/contacto",
  },
  {
    number: "03",
    name: "Mejora de procesos y automatización",
    tagline: "Hacer más simple lo que hoy consume tiempo y recursos",
    body: "Analizamos cómo trabaja la empresa para identificar tareas repetitivas, circuitos manuales, duplicaciones y procesos que pueden simplificarse. Cuando aporta valor, incorporamos automatización e inteligencia artificial para ahorrar tiempo, mejorar la experiencia del cliente o ampliar la capacidad del equipo.",
    tags: ["Ventas", "Atención al cliente", "Posventa", "Marketing", "Gestión interna", "Consulta de información"],
    ctaLabel: "Realizar una consulta de diagnóstico",
    ctaHref: "/contacto",
  },
];

export const PYMES_ORIENTADOR = {
  title: "¿Por dónde empezar?",
  subtitle: "Depende del problema que hoy necesitás resolver",
  items: [
    { problem: "Necesito conocer mejor a mis clientes o mi mercado", solution: "Investigación Express" },
    { problem: "Tengo información, pero no sé qué mirar ni cómo seguir el negocio", solution: "Tablero de Gestión Pyme" },
    {
      problem: "Mi equipo pierde tiempo en tareas repetitivas o procesos manuales",
      solution: "Diagnóstico de procesos y automatización",
    },
  ] satisfies PymesOrientadorItem[],
  closing: "Si todavía no sabés cuál es el punto de partida, podemos ayudarte a identificarlo.",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};

export const PYMES_EXPERIENCE = {
  title: "Experiencia aplicada a empresas en crecimiento",
  paragraphs: [
    "Pensamiento Lateral trabaja desde hace más de 15 años en investigación, datos y mejora de procesos.",
    "Adaptamos esa experiencia a las necesidades de empresas medianas y pequeñas, con proyectos concretos, equipos cercanos y soluciones que puedan ponerse en práctica sin agregar complejidad innecesaria.",
  ],
};

export const PYMES_FAQ: FAQItem[] = [
  {
    question: "¿Vale la pena hacer investigación de mercado si tengo una Pyme?",
    answer:
      "Sí. Una investigación acotada puede ayudar a validar una decisión antes de invertir, entender por qué algo no está funcionando o detectar oportunidades de crecimiento.",
  },
  {
    question: "¿Qué es una Investigación Express?",
    answer:
      "Es un estudio diseñado para responder una pregunta concreta con tiempos y alcance definidos, manteniendo rigurosidad metodológica.",
  },
  {
    question: "¿La investigación de mercado sirve solamente para marketing?",
    answer:
      "No. También puede aportar información para ventas, estrategia comercial, desarrollo de productos, experiencia del cliente y planificación del crecimiento.",
  },
  {
    question: "Tengo datos, pero no me sirven para decidir. ¿Qué me falta?",
    answer:
      "Muchas veces el problema no es la cantidad de información, sino la falta de integración, criterios comunes o indicadores que permitan interpretarla.",
  },
  {
    question: "¿Qué métricas debería mirar una Pyme?",
    answer:
      "Depende del modelo de negocio y de sus objetivos. El desafío es identificar pocos indicadores realmente relevantes para entender desempeño, ventas, costos, rentabilidad y clientes.",
  },
  {
    question: "¿Qué es un Tablero de Gestión Pyme?",
    answer:
      "Es una herramienta que concentra los principales indicadores del negocio en una única visualización para facilitar el seguimiento y la toma de decisiones.",
  },
  {
    question: "¿Necesito saber de datos o tecnología para utilizarlo?",
    answer: "No. El tablero está pensado para usuarios de negocio y debe ser simple, visual y fácil de interpretar.",
  },
  {
    question: "¿Cómo sé qué procesos debería automatizar?",
    answer:
      "Conviene empezar por tareas repetitivas, procesos que demandan muchas horas, generan errores o requieren trasladar información manualmente entre distintas herramientas.",
  },
  {
    question: "¿La inteligencia artificial es sólo para empresas grandes?",
    answer:
      "No. Pero tampoco todos los problemas necesitan IA. Primero identificamos qué queremos mejorar y luego evaluamos cuál es la herramienta adecuada.",
  },
  {
    question: "¿Por dónde conviene empezar?",
    answer:
      "Por el problema que hoy tiene mayor impacto en el negocio. Puede ser conocer mejor al cliente, ordenar información o revisar un proceso que consume demasiados recursos.",
  },
];

export const PYMES_FINAL_CTA = {
  title: "¿Qué necesitás resolver hoy?",
  body: "No hace falta que sepas qué servicio necesitás. Contanos cuál es el problema, qué decisión necesitás tomar o qué proceso querés mejorar.",
  ctaLabel: "Hablemos",
  ctaHref: "/contacto",
};
