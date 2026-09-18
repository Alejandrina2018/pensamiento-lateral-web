import type { PortableTextBlock } from "sanity";

/**
 * Converts the `**bold**` markdown-lite spans already used across the
 * static case-study copy (see src/components/ui/RichText.tsx, which
 * parses the same syntax for JSX) into real Portable Text spans/marks —
 * done once, programmatically, here, rather than retyped by hand, so the
 * 11 approved bold spans can't drift from final-copy.md during
 * migration.
 */
export function textToBlock(text: string, keyPrefix: string): PortableTextBlock {
  const parts = text.split(/(\*\*.+?\*\*)/g).filter((part) => part.length > 0);

  return {
    _type: "block",
    _key: `${keyPrefix}-b`,
    style: "normal",
    markDefs: [],
    children: parts.map((part, i) => {
      const isBold = part.startsWith("**") && part.endsWith("**");
      return {
        _type: "span",
        _key: `${keyPrefix}-s${i}`,
        text: isBold ? part.slice(2, -2) : part,
        marks: isBold ? ["strong"] : [],
      };
    }),
  };
}

export function paragraphsToBlocks(paragraphs: string[], keyPrefix: string): PortableTextBlock[] {
  return paragraphs.map((p, i) => textToBlock(p, `${keyPrefix}-${i}`));
}
