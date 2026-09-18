import type { Insight } from "@/types/content";
import { AUTHORS } from "./authors";

// Verbatim from content/final-copy.md — "Insights" (/insights route, 5 of
// its 7 articles so far — the other 2 aren't referenced by any page yet).
// displayCategory is the exact label from final-copy.md; filterCategories
// is the approved mapping onto CLAUDE.md #16's generic filter buckets —
// the two are deliberately different taxonomies.
// Slugs are provisional (final-copy.md doesn't specify /insights/[slug]
// values yet) — generated from the title, not part of the approved copy.
const CONECTADOS: Insight = {
  title: "Conectados, pero no siempre autónomos: el nuevo desafío digital de la Generación Silver",
  slug: "conectados-pero-no-siempre-autonomos",
  excerpt:
    "La mayoría de las personas Silver ya está conectada. El desafío para las empresas empieza cuando preguntamos cuánto de su vida digital pueden resolver realmente solas.",
  author: AUTHORS.alejandrina,
  displayCategory: "Tendencias y segmentos",
  filterCategories: ["Tendencias"],
};

const CONSUMIDORES_NO_DISENAR: Insight = {
  title: "Los consumidores no tienen que diseñar la solución: tienen que ayudarnos a entender el problema",
  slug: "consumidores-no-tienen-que-disenar-la-solucion",
  excerpt:
    "Escuchar al consumidor no significa pedirle que imagine el producto del futuro, sino comprender necesidades, frustraciones y oportunidades que todavía no están resueltas.",
  author: AUTHORS.alejandrina,
  displayCategory: "Investigación e innovación",
  filterCategories: ["Investigación", "Clientes y marcas"],
};

const MAS_DATOS_NO_GARANTIZA: Insight = {
  title: "Tener más datos no garantiza tomar mejores decisiones",
  slug: "mas-datos-no-garantiza-mejores-decisiones",
  excerpt:
    "El desafío ya no es acceder a información, sino saber qué mirar, asegurar su calidad, conectar distintas fuentes y convertir los datos en conocimiento útil.",
  author: AUTHORS.alejandrina,
  displayCategory: "Datos y gestión",
  filterCategories: ["Datos"],
};

const CLIENTE_NO_DICE: Insight = {
  title: "Cuando el cliente no dice lo que realmente piensa",
  slug: "cuando-el-cliente-no-dice-lo-que-realmente-piensa",
  excerpt:
    "La forma en que preguntamos —y quién hace la pregunta— puede modificar las respuestas y cambiar lo que una organización cree saber sobre sus clientes.",
  author: AUTHORS.alejandrina,
  displayCategory: "Investigación",
  filterCategories: ["Investigación"],
};

const LO_QUE_LOS_DATOS_NO_DICEN: Insight = {
  title: "Lo que los datos no dicen: por qué todavía necesitamos escuchar a las personas",
  slug: "lo-que-los-datos-no-dicen",
  excerpt:
    "Medir permite saber qué está pasando. Comprender por qué sucede requiere profundizar en motivaciones, tensiones, experiencias y significados.",
  author: AUTHORS.alejandrina,
  displayCategory: "Investigación",
  filterCategories: ["Investigación"],
};

/** Every article we have real, approved copy for. Mirrors what a "published"
 * Sanity query would return — pages should filter/reference this list by
 * slug, never hardcode article text inline. */
export const INSIGHTS: Insight[] = [
  CONECTADOS,
  CONSUMIDORES_NO_DISENAR,
  MAS_DATOS_NO_GARANTIZA,
  CLIENTE_NO_DICE,
  LO_QUE_LOS_DATOS_NO_DICEN,
];

// Home / Insights (first 3 of 7 — see content/final-copy.md's Home section).
export const HOME_INSIGHTS: Insight[] = [CONECTADOS, CONSUMIDORES_NO_DISENAR, MAS_DATOS_NO_GARANTIZA];

/**
 * Resolves slugs to published articles, silently dropping any slug that
 * isn't in INSIGHTS yet — the same shape a Sanity query filtered to
 * published docs would return. Callers (e.g. "Artículos relacionados")
 * should render nothing for an empty result, never a placeholder.
 */
export function getPublishedInsights(slugs: string[]): Insight[] {
  return slugs
    .map((slug) => INSIGHTS.find((insight) => insight.slug === slug))
    .filter((insight): insight is Insight => Boolean(insight));
}
