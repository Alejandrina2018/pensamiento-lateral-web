import { defineField, defineType } from "sanity";

/**
 * No `published`/`publicado` field on purpose (approved decision) —
 * public visibility depends only on Sanity's native Publish/Unpublish,
 * same as every other document type here.
 */
export default defineType({
  name: "pressItem",
  title: "Nota de prensa",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "publication", title: "Medio", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", title: "Bajada", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({
      name: "url",
      title: "URL de la nota",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "logo", title: "Logo / imagen", type: "imageWithAlt" }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Posición en Quiénes somos → PL en la prensa. No depende del orden de creación en Sanity.",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: "Orden",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publication", media: "logo" },
  },
});
