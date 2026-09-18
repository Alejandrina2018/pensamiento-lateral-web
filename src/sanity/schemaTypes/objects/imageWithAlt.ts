import { defineField, defineType } from "sanity";

/**
 * Shared image object (CLAUDE.md #26/#28 — real alt text, no layout
 * shift). Never required itself at the object level — individual
 * document fields decide whether the image is required (none are, for
 * now; see each document's own field definition). `alt` only becomes
 * required once an asset is actually attached, so an empty image field
 * never blocks Publish, but a half-finished one (image with no alt)
 * does.
 */
export default defineType({
  name: "imageWithAlt",
  title: "Imagen",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "string",
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          const hasAsset = Boolean((context.parent as { asset?: unknown } | undefined)?.asset);
          if (hasAsset && !alt) return "Obligatorio una vez que hay una imagen cargada";
          return true;
        }),
    }),
    defineField({
      name: "caption",
      title: "Epígrafe",
      type: "string",
    }),
  ],
});
