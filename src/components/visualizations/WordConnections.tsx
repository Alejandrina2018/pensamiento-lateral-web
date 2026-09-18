type Layout = "converge" | "layers";
type Accent = "terracotta" | "green";

const ACCENT_VAR: Record<Accent, string> = {
  terracotta: "var(--color-terracotta)",
  green: "var(--color-green)",
};

// Hand-placed, irregular positions — deliberately not a symmetric circle or
// grid, so it never reads as an org chart or a Venn diagram. Only 4 of the
// 10 possible pairs are connected ("conexiones parciales e irregulares").
// `anchor: "end"` on the right-most point makes its label grow leftward,
// so longer words (e.g. "competencia") never run past the viewBox edge.
const CONVERGE_VIEW_WIDTH = 600;
const CONVERGE_VIEW_HEIGHT = 280;
const CONVERGE_POSITIONS: Array<{ x: number; y: number; anchor?: "start" | "end" }> = [
  { x: 30, y: 50 },
  { x: 250, y: 24 },
  { x: CONVERGE_VIEW_WIDTH - 30, y: 110, anchor: "end" },
  { x: 90, y: 200 },
  { x: 330, y: 246 },
];
const CONVERGE_CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
];

const LAYER_Y_STEP = 54;
const LAYER_X_OFFSETS = [10, 46, 0, 64];

type WordConnectionsProps = {
  words: string[];
  layout: Layout;
  accent: Accent;
  className?: string;
};

/**
 * A small typographic diagram built only from words that already appear in
 * the page's own approved copy — it supports the text, it doesn't add new
 * text (CLAUDE.md #34 in spirit). Two layouts:
 * - "converge": words scattered irregularly with a few thin, partial
 *   connecting lines — no closed shape, no hub-and-spoke (Empresas).
 * - "layers": words stacked as offset horizontal lines with a short rule
 *   under each — no connecting lines, no conclusion added (Instituciones).
 */
export default function WordConnections({ words, layout, accent, className = "" }: WordConnectionsProps) {
  const stroke = ACCENT_VAR[accent];

  if (layout === "layers") {
    const height = words.length * LAYER_Y_STEP + 20;
    return (
      <svg viewBox={`0 0 320 ${height}`} className={className} aria-hidden="true" focusable="false">
        {words.map((word, i) => {
          const x = LAYER_X_OFFSETS[i % LAYER_X_OFFSETS.length];
          const y = 30 + i * LAYER_Y_STEP;
          return (
            <g key={word} className="pl-settle" style={{ animationDelay: `${i * 120}ms` }}>
              <text x={x} y={y} fontSize={22} fontWeight={600} fill="var(--color-slate)">
                {word}
              </text>
              <line
                x1={x}
                y1={y + 12}
                x2={x + word.length * 11 + 6}
                y2={y + 12}
                stroke={stroke}
                strokeOpacity={0.4}
                strokeWidth={1.5}
              />
            </g>
          );
        })}
      </svg>
    );
  }

  const positions = CONVERGE_POSITIONS.slice(0, words.length);

  return (
    <svg
      viewBox={`0 0 ${CONVERGE_VIEW_WIDTH} ${CONVERGE_VIEW_HEIGHT}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {CONVERGE_CONNECTIONS.filter(([a, b]) => a < positions.length && b < positions.length).map(([a, b], i) => (
        <line
          key={`line-${i}`}
          x1={positions[a].x}
          y1={positions[a].y}
          x2={positions[b].x}
          y2={positions[b].y}
          pathLength={1}
          className="pl-draw"
          stroke={stroke}
          strokeOpacity={0.2}
          strokeWidth={0.75}
          style={{ animationDelay: `${150 + i * 90}ms` }}
        />
      ))}
      {words.map((word, i) => {
        const p = positions[i];
        if (!p) return null;
        return (
          <text
            key={word}
            x={p.x}
            y={p.y}
            textAnchor={p.anchor ?? "start"}
            fontSize={22}
            fontWeight={600}
            fill="var(--color-slate)"
            className="pl-settle"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            {word}
          </text>
        );
      })}
    </svg>
  );
}
