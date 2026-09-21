// Same coordinate space as DataPattern's default "scatter-to-grid" variant
// (viewBox 0 0 560 400, grid centered around x:424 y:153) so this overlays
// precisely on top of it without any extra alignment math at each call site.
const VIEW_BOX = "0 0 560 400";

/**
 * A magnifying glass framing the Hero's ordered grid — "comprender" made
 * literal: once the scattered points settle into a pattern (DataPattern's
 * existing animation), a lens arrives to focus on it. Pure SVG + CSS
 * (CLAUDE.md #7), drawn with the same .pl-draw technique already used for
 * DataPattern's connector lines, timed to start once the grid dots have
 * finished settling. Respects prefers-reduced-motion globally.
 */
export default function HeroLens({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true" focusable="false">
      <circle
        cx="424"
        cy="153"
        r="95"
        fill="none"
        stroke="var(--color-slate)"
        strokeWidth="3"
        strokeOpacity="0.55"
        pathLength={1}
        className="pl-draw"
        style={{ animationDelay: "650ms" }}
      />
      <line
        x1="491"
        y1="220"
        x2="528"
        y2="257"
        stroke="var(--color-slate)"
        strokeWidth="5"
        strokeOpacity="0.55"
        strokeLinecap="round"
        pathLength={1}
        className="pl-draw"
        style={{ animationDelay: "750ms" }}
      />
    </svg>
  );
}
