import { defineField } from "sanity";
import type { FieldDefinition } from "sanity";

/**
 * Shared SEO fields (CLAUDE.md #27/#28 groundwork) — spread into a
 * document's `fields` array, not a standalone object type, since there's
 * no shared editorial meaning beyond "these travel together." The public
 * SEO layer itself (metadata generation, canonical resolution, JSON-LD)
 * is explicitly not implemented yet — this only makes sure the schema
 * can carry the values once that phase starts, per the approved Sanity
 * architecture.
 */
export const seoFields: FieldDefinition[] = [
  defineField({
    name: "seoTitle",
    title: "SEO — Title override",
    type: "string",
    group: "seo",
  }),
  defineField({
    name: "seoDescription",
    title: "SEO — Meta description",
    type: "text",
    rows: 2,
    group: "seo",
  }),
  defineField({
    name: "ogImage",
    title: "SEO — Open Graph image",
    type: "imageWithAlt",
    group: "seo",
  }),
  defineField({
    name: "canonicalOverride",
    title: "SEO — Canonical URL override",
    type: "url",
    validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    group: "seo",
  }),
];
