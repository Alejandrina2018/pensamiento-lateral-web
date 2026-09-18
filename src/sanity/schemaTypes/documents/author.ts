import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Autor/a",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "role", title: "Rol", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "bio", title: "Bio", type: "text", validation: (Rule) => Rule.required() }),
    defineField({
      name: "image",
      title: "Foto",
      type: "imageWithAlt",
      // Not required yet — no real photos exist. Warning only, so it
      // never blocks Publish (approved decision).
      validation: (Rule) => Rule.warning("Recomendado: agregar una foto real cuando esté disponible."),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Posición en el equipo (Quiénes somos). No depende de la fecha de creación.",
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
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
