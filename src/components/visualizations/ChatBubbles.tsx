type ChatBubblesProps = {
  className?: string;
};

/**
 * Two overlapping speech-bubble outlines — /contacto's own visual
 * (design-review redesign, reference image approved by the client).
 * Thin strokes only, no fill: cream for the back bubble, terracotta for
 * the front one, echoing the page's own two CTAs (WhatsApp/Escribinos)
 * without literally depicting either. Pure SVG + CSS, no client JS; the
 * draw-in motion uses the site's global `pl-draw` keyframe, which
 * already respects `prefers-reduced-motion` (see globals.css).
 */
export default function ChatBubbles({ className = "" }: ChatBubblesProps) {
  return (
    <svg viewBox="-6 -6 408 328" className={className} aria-hidden="true" focusable="false">
      <path
        d="M 92,0 H 178 A 92,92 0 0 1 270,92 V 93 A 92,92 0 0 1 178,185 H 76.4 L 30.5,223 L 42.4,185 H 92 A 92,92 0 0 1 0,93 V 92 A 92,92 0 0 1 92,0 Z"
        fill="none"
        stroke="var(--color-cream)"
        strokeOpacity={0.75}
        strokeWidth={2}
        pathLength={1}
        className="pl-draw"
      />
      <path
        d="M 227,95 H 303 A 87,87 0 0 1 390,182 V 183 A 87,87 0 0 1 303,270 H 362 L 316.1,310 L 328,270 H 227 A 87,87 0 0 1 140,183 V 182 A 87,87 0 0 1 227,95 Z"
        fill="none"
        stroke="var(--color-terracotta)"
        strokeWidth={2}
        pathLength={1}
        className="pl-draw"
        style={{ animationDelay: "150ms" }}
      />
    </svg>
  );
}
