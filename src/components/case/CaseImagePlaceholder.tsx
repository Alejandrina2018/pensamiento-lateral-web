type CaseImagePlaceholderProps = {
  label: string;
  /** "landscape" (4:3, default) for case/project imagery, "portrait" (3:4)
   * for a team headshot. */
  aspect?: "landscape" | "portrait";
  /** Controls the visible placeholder text and the aria-label phrasing. */
  kind?: "image" | "photo";
};

const ASPECT_CLASS = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
};

const LABEL_TEXT = {
  image: "TODO — imagen pendiente",
  photo: "TODO — foto pendiente",
};

/** Placeholder for a case's featured image or a team member's photo, styled
 * as part of the visual system (diagonal rule pattern, brand tokens)
 * rather than a stock photo, illustration, or fabricated result (CLAUDE.md
 * #6). Swap for a real `next/image` once assets are supplied — same slot,
 * same aspect ratio, no layout change needed. */
export default function CaseImagePlaceholder({
  label,
  aspect = "landscape",
  kind = "image",
}: CaseImagePlaceholderProps) {
  return (
    <div
      className={`relative flex ${ASPECT_CLASS[aspect]} items-end overflow-hidden border border-sand bg-sand/40 p-4`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-slate) 0, var(--color-slate) 1px, transparent 1px, transparent 14px)",
        backgroundBlendMode: "overlay",
      }}
      role="img"
      aria-label={`${kind === "photo" ? "Foto de" : "Imagen del caso"} ${label} — pendiente`}
    >
      <span className="text-xs uppercase tracking-widest text-slate/75">{LABEL_TEXT[kind]}</span>
    </div>
  );
}
