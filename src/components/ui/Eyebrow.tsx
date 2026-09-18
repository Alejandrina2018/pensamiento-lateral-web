import type { ElementType, ReactNode } from "react";

type EyebrowProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/** Small caps label (CLAUDE.md #4 editorial rhythm). Defaults to a <p>, but
 * accepts `as="h2"` etc. for cases where the eyebrow text is itself the
 * section's semantic heading — visual size and heading level are
 * independent, so this keeps heading hierarchy correct (CLAUDE.md #25). */
export default function Eyebrow({ as: Tag = "p", children, className = "" }: EyebrowProps) {
  return (
    <Tag className={`text-sm font-medium uppercase tracking-widest text-slate/60 ${className}`}>
      {children}
    </Tag>
  );
}
