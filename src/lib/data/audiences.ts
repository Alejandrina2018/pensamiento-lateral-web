import type { Audience } from "@/types/home";

// Verbatim from content/final-copy.md — "Distintos desafíos. Un mismo enfoque." (Home).
export const AUDIENCES: Audience[] = [
  {
    name: "Empresas",
    tagline: "Conocimiento para impulsar el crecimiento.",
    body: "Acompañamos a empresas en desafíos vinculados con sus clientes, sus marcas, sus mercados y su gestión. Integramos investigación y datos para detectar oportunidades, mejorar procesos y desarrollar herramientas que faciliten la toma de decisiones.",
    tags: [
      "Consumidores y clientes",
      "Marca y posicionamiento",
      "Experiencia y satisfacción",
      "Datos y gestión",
      "Mejora de procesos",
    ],
    ctaLabel: "Ver soluciones para empresas",
    href: "/empresas",
    accent: "terracotta",
  },
  {
    name: "Instituciones",
    tagline: "Comprender realidades complejas para generar impacto.",
    body: "Trabajamos con organismos públicos, fundaciones, ONG y otras instituciones para abordar problemáticas sociales, ciudadanas y territoriales. Generamos evidencia que permite interpretar esas realidades y transformarla en información útil para diseñar, implementar y evaluar acciones.",
    tags: ["Opinión pública", "Investigación social", "Territorio", "Evaluación", "Datos para la gestión"],
    ctaLabel: "Ver soluciones para instituciones",
    href: "/instituciones",
    accent: "green",
  },
];
