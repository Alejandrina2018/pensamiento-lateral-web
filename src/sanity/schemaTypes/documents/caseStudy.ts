import { defineField, defineType } from "sanity";
import { seoFields } from "../fields/seoFields";

export default defineType({
  name: "caseStudy",
  title: "Caso",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "client", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      // Only used to suggest a value when the editor clicks "Generate" —
      // never regenerated automatically when client/headline change
      // later (Sanity's default behavior already matches this). Kept
      // manually editable: `client` alone isn't guaranteed unique long
      // term (more than one case for the same client is plausible).
      options: {
        source: "client",
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document?._id.replace(/^drafts\./, "");
          const params = { draft: `drafts.${id}`, published: id, slug };
          const query = `!defined(*[!(_id in [$draft, $published]) && _type == "caseStudy" && slug.current == $slug][0]._id)`;
          return client.fetch(query, params);
        },
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "listingHeadline",
      title: "Título en el listado (/casos)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "listingExcerpt",
      title: "Resumen en el listado",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "detailHeadline",
      title: "Título en la página del caso",
      type: "string",
      group: "content",
      description: "Puede ser distinto al título del listado.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "challenge",
      title: "El desafío",
      type: "array",
      group: "content",
      of: [{ type: "block", styles: [], lists: [] }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "approach",
      title: "Nuestro abordaje",
      type: "array",
      group: "content",
      of: [{ type: "block", styles: [], lists: [] }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatWeDid",
      title: "Qué hicimos",
      type: "array",
      group: "content",
      // Mixed array: plain paragraphs (`block`) and/or titled sub-blocks
      // (`namedBlock`), in any order/combination — replaces the current
      // CaseWhatWeDid union (paragraphs | list) without a discriminator.
      // Array order is preserved exactly as entered.
      of: [{ type: "block", styles: [], lists: [] }, { type: "namedBlock" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "evidence",
      title: "De la evidencia a la acción",
      type: "array",
      group: "content",
      of: [{ type: "block", styles: [], lists: [] }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({ name: "finalQuestion", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({ name: "finalBody", type: "text", rows: 2, group: "content" }),
    defineField({ name: "ctaLabel", type: "string", group: "content", initialValue: "Hablemos" }),
    defineField({ name: "ctaHref", type: "string", group: "content", initialValue: "/contacto" }),

    defineField({
      name: "featuredImage",
      title: "Imagen principal",
      type: "imageWithAlt",
      group: "content",
      // Not required yet — no real case photography exists. Warning
      // only, so it never blocks Publish (approved decision).
      validation: (Rule) => Rule.warning("Recomendado: agregar una imagen real cuando esté disponible."),
    }),
    defineField({
      name: "additionalImages",
      title: "Imágenes adicionales",
      type: "array",
      group: "content",
      of: [{ type: "imageWithAlt" }],
    }),

    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      group: "content",
      description: "Posición en /casos. No depende del orden de creación en Sanity.",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    ...seoFields,
  ],
  orderings: [
    {
      title: "Orden",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "listingHeadline", subtitle: "client", media: "featuredImage" },
  },
});
