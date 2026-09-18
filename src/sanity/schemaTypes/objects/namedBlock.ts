import { defineField, defineType } from "sanity";

/**
 * One named sub-block inside CaseStudy.whatWeDid (e.g. Suono's "El
 * posicionamiento de la marca"). Lives alongside plain `block` entries in
 * the same array — see caseStudy.ts — instead of a `kind` discriminator,
 * so a case can freely mix or use either shape exactly like the current
 * static CaseWhatWeDid union, without forcing one form site-wide.
 */
export default defineType({
  name: "namedBlock",
  title: "Bloque con título",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block", styles: [], lists: [] }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
