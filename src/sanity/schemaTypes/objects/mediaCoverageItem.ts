import { defineField, defineType } from "sanity";

/**
 * One external media mention of an Insight — editors add as many as
 * exist, in any order (no single "external publication" field: an
 * investigación can appear in several outlets). Array order in Sanity
 * Studio is the display order, same convention as CaseStudy.additionalImages.
 */
export default defineType({
  name: "mediaCoverageItem",
  title: "Repercusión en medios",
  type: "object",
  fields: [
    defineField({ name: "mediaName", title: "Medio", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "articleTitle",
      title: "Título de la nota",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Enlace a la publicación",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "publicationDate", title: "Fecha de publicación", type: "date" }),
  ],
  preview: {
    select: { title: "articleTitle", subtitle: "mediaName" },
  },
});
