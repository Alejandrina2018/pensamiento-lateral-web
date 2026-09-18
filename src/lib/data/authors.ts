import type { Author } from "@/types/content";

// Verbatim from content/final-copy.md — "Nuestro equipo" (/quienes-somos).
// LinkedIn URLs and photos are pending (see final-copy.md's "CONTENIDO
// PENDIENTE" list) — left undefined rather than invented.
export const AUTHORS: Record<"alejandrina" | "angeles", Author> = {
  alejandrina: {
    name: "Alejandrina Chichizola",
    role: "Co-fundadora · Investigación y estrategia",
    bio: "Directora de Investigación, con más de 15 años de experiencia en investigación de mercado, opinión pública y análisis de comportamiento. Trabaja en la intersección entre consumidores, ciudadanía y toma de decisiones, acompañando a empresas e instituciones en desafíos vinculados con marca, experiencia, territorio y estrategia. Es Magíster en Marketing y Comunicación por la Universidad de San Andrés y miembro de organizaciones profesionales como SAIMO y ESOMAR.",
  },
  angeles: {
    name: "Ángeles Calandri",
    role: "Co-fundadora · Datos y analítica",
    bio: "Directora de Datos, especializada en proyectos que integran investigación, analítica avanzada e inteligencia artificial. Su trayectoria combina investigación social y de mercado, evaluación de políticas públicas y desarrollo de soluciones basadas en evidencia. Además, se desempeña como consultora del Programa de las Naciones Unidas para el Desarrollo (PNUD) en proyectos vinculados con gobernabilidad democrática. Es Magíster en Datos por el ITBA.",
  },
};
