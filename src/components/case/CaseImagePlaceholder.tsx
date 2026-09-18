type CaseImagePlaceholderProps = {
  label: string;
};

/** Placeholder for a case's featured image, styled as part of the visual
 * system (diagonal rule pattern, brand tokens) rather than a stock photo
 * or a fabricated dashboard/result (CLAUDE.md #6). Swap for a real
 * `next/image` once assets are supplied. */
export default function CaseImagePlaceholder({ label }: CaseImagePlaceholderProps) {
  return (
    <div
      className="relative flex aspect-[4/3] items-end overflow-hidden border border-sand bg-sand/40 p-4"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-slate) 0, var(--color-slate) 1px, transparent 1px, transparent 14px)",
        backgroundBlendMode: "overlay",
      }}
      role="img"
      aria-label={`Imagen del caso ${label} — pendiente`}
    >
      <span className="text-xs uppercase tracking-widest text-slate/50">TODO — imagen pendiente</span>
    </div>
  );
}
