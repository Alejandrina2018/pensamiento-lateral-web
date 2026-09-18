import { Fragment, type ElementType } from "react";

type RichTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

/**
 * Renders a string that may contain `**bold**` markdown-lite segments,
 * preserving the emphasis the approved copy already carries (several case
 * paragraphs bold specific phrases) instead of flattening it to plain text.
 */
export default function RichText({ text, as: Tag = "p", className }: RichTextProps) {
  const parts = text.split(/(\*\*.+?\*\*)/g);

  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </Tag>
  );
}
