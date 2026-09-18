import { defineField, defineType } from "sanity";
import { seoFields } from "../fields/seoFields";

const FILTER_CATEGORIES = [
  "Investigación",
  "Datos",
  "Clientes y marcas",
  "Opinión pública y territorio",
  "Tendencias",
];

/**
 * A single document type covers both the teaser (title/excerpt/author/
 * categories only) and the full article — a teaser is just an Insight
 * whose `body` hasn't been written yet, not a different kind of content.
 *
 * `hasArticle` (computed everywhere it's needed, never stored) is:
 *   published && defined(body) && defined(slug.current)
 * "published" itself is never a field here — it's Sanity's own draft/
 * publish state (see src/sanity/lib/client.ts's two clients). This
 * document only guarantees the other two conditions can be checked.
 */
export default defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      description: "Solo obligatorio cuando el artículo tiene cuerpo completo (ver validación).",
      // Required only once `body` is non-empty — a teaser-only Insight
      // can exist and show in /insights without ever having a slug.
      validation: (Rule) =>
        Rule.custom((slug, context) => {
          const body = (context.document as { body?: unknown[] } | undefined)?.body;
          const hasBody = Array.isArray(body) && body.length > 0;
          if (hasBody && !slug?.current) {
            return "El slug es obligatorio una vez que el artículo tiene cuerpo completo";
          }
          return true;
        }),
    }),
    defineField({
      name: "excerpt",
      title: "Bajada",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "body",
      title: "Cuerpo del artículo",
      type: "array",
      group: "content",
      of: [{ type: "block" }, { type: "imageWithAlt" }],
      description: "Vacío = el Insight sigue siendo solo teaser en /insights, sin página propia.",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayCategory",
      title: "Categoría (texto libre, verbatim)",
      type: "string",
      group: "content",
      description: 'Etiqueta exacta a mostrar, ej. "Investigación e innovación". No es lo mismo que las categorías de filtro.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filterCategories",
      title: "Categorías de filtro",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { list: FILTER_CATEGORIES },
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
    defineField({ name: "publicationDate", type: "datetime", group: "content" }),
    defineField({ name: "featured", type: "boolean", initialValue: false, group: "content" }),
    defineField({ name: "featuredImage", title: "Imagen destacada", type: "imageWithAlt", group: "content" }),
    ...seoFields,
  ],
  orderings: [
    {
      title: "Fecha de publicación",
      name: "publicationDateDesc",
      by: [{ field: "publicationDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", authorName: "author.name", bodyLength: "body.length", slug: "slug.current" },
    prepare({ title, authorName, bodyLength, slug }) {
      const hasArticle = Boolean(bodyLength) && Boolean(slug);
      return {
        title,
        subtitle: `${hasArticle ? "Artículo completo" : "Solo teaser"}${authorName ? ` · ${authorName}` : ""}`,
      };
    },
  },
});
