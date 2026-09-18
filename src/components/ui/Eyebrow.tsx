import type { ElementType, ReactNode } from "react";

type EyebrowProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/** Small caps label (CLAUDE.md #4 editorial rhythm). Defaults to a <p>, but
 * accepts `as="h2"` etc. for cases where the eyebrow text is itself the
 * section's semantic heading — visual size and heading level are
 * independent, so this keeps heading hierarchy correct (CLAUDE.md #25).
 * `className` replaces the default color (e.g. CTASection's inverted
 * variant) rather than stacking with it — two same-specificity text-color
 * utilities would otherwise race in the generated stylesheet. */
export default function Eyebrow({ as: Tag = "p", children, className }: EyebrowProps) {
  return (
    <Tag className={`text-sm font-medium uppercase tracking-widest ${className || "text-slate/60"}`}>
      {children}
    </Tag>
  );
}
