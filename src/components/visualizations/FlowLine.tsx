const NODE_COUNT = 5;
const LINE_Y = 100;
const START_X = 40;
const END_X = 520;
const STEP = (END_X - START_X) / (NODE_COUNT - 1);
const NODE_SIZE = 11;
// The middle node reads as where automation/AI adds value — a single,
// quiet accent, not the identity of the whole visual (CLAUDE.md #5, #28).
const ACCENT_INDEX = 2;

const NODES = Array.from({ length: NODE_COUNT }, (_, i) => ({ x: START_X + i * STEP, y: LINE_Y }));

/** Automatizaciones e IA's hero visual: one straight flow line with square
 * nodes — process → connection → simplification. Deliberately a single
 * path, never a branching/mesh topology, so it can't read as a network or
 * neural-net diagram. Pure SVG + CSS, one-time draw/settle on load (same
 * motion vocabulary as DataPattern), no continuous or looping animation. */
export default function FlowLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 200" className={className} aria-hidden="true" focusable="false">
      <line
        x1={START_X}
        y1={LINE_Y}
        x2={END_X}
        y2={LINE_Y}
        pathLength={1}
        className="pl-draw"
        stroke="var(--color-slate)"
        strokeOpacity={0.3}
        strokeWidth={1}
      />
      {NODES.map((node, i) => (
        <rect
          key={i}
          x={node.x - NODE_SIZE / 2}
          y={node.y - NODE_SIZE / 2}
          width={NODE_SIZE}
          height={NODE_SIZE}
          className="pl-settle"
          fill={i === ACCENT_INDEX ? "var(--color-terracotta)" : "var(--color-slate)"}
          style={{ animationDelay: `${250 + i * 140}ms` }}
        />
      ))}
    </svg>
  );
}
