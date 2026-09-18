import type { Insight } from "@/types/content";
import { AUTHORS } from "./authors";

// Verbatim from content/final-copy.md — "Insights" (Home, first 3 of 7).
// displayCategory is the exact label from final-copy.md; filterCategories
// is the approved mapping onto CLAUDE.md #16's generic filter buckets —
// the two are deliberately different taxonomies.
// Slugs are provisional (final-copy.md doesn't specify /insights/[slug]
// values yet) — generated from the title, not part of the approved copy.
export const HOME_INSIGHTS: Insight[] = [
  {
    title: "Conectados, pero no siempre autónomos: el nuevo desafío digital de la Generación Silver",
    slug: "conectados-pero-no-siempre-autonomos",
    excerpt:
      "La mayoría de las personas Silver ya está conectada. El desafío para las empresas empieza cuando preguntamos cuánto de su vida digital pueden resolver realmente solas.",
    author: AUTHORS.alejandrina,
    displayCategory: "Tendencias y segmentos",
    filterCategories: ["Tendencias"],
  },
  {
    title: "Los consumidores no tienen que diseñar la solución: tienen que ayudarnos a entender el problema",
    slug: "consumidores-no-tienen-que-disenar-la-solucion",
    excerpt:
      "Escuchar al consumidor no significa pedirle que imagine el producto del futuro, sino comprender necesidades, frustraciones y oportunidades que todavía no están resueltas.",
    author: AUTHORS.alejandrina,
    displayCategory: "Investigación e innovación",
    filterCategories: ["Investigación", "Clientes y marcas"],
  },
  {
    title: "Tener más datos no garantiza tomar mejores decisiones",
    slug: "mas-datos-no-garantiza-mejores-decisiones",
    excerpt:
      "El desafío ya no es acceder a información, sino saber qué mirar, asegurar su calidad, conectar distintas fuentes y convertir los datos en conocimiento útil.",
    author: AUTHORS.alejandrina,
    displayCategory: "Datos y gestión",
    filterCategories: ["Datos"],
  },
];
