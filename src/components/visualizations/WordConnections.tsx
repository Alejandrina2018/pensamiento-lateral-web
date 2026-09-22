type Layout = "converge" | "layers" | "network";
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

// Hand-placed, irregular — same spirit as "converge" but sized for exactly
// the 6 dimensions Instituciones' "Comprender para intervenir mejor" reads
// as a system (percepciones, necesidades, expectativas, comportamientos ↔
// datos, contexto). Each word gets a small node dot instead of a line
// running through its letters; only 5 of the 15 possible pairs are drawn
// ("conexiones sutiles", never a fully meshed graph). Datos/Contexto sit
// slightly larger — the two synthesizing anchors the other four connect
// into — everything else stays legible at the same weight.
const NETWORK_VIEW_WIDTH = 600;
const NETWORK_VIEW_HEIGHT = 300;
const NETWORK_POSITIONS: Array<{
  x: number;
  y: number;
  anchor?: "start" | "end";
  dot: { x: number; y: number };
  emphasis?: boolean;
}> = [
  { x: 30, y: 50, dot: { x: 16, y: 44 } },
  { x: 230, y: 26, dot: { x: 216, y: 20 } },
  { x: 570, y: 76, anchor: "end", dot: { x: 584, y: 70 } },
  { x: 40, y: 236, dot: { x: 26, y: 230 } },
  { x: 300, y: 160, dot: { x: 286, y: 154 }, emphasis: true },
  { x: 560, y: 250, anchor: "end", dot: { x: 574, y: 244 }, emphasis: true },
];
const NETWORK_CONNECTIONS: Array<[number, number]> = [
  [0, 4],
  [1, 4],
  [3, 4],
  [2, 5],
  [4, 5],
];

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
 *   under each — no connecting lines, no conclusion added.
 * - "network": a small node-and-line diagram — every word gets a dot,
 *   only a handful of pairs connect, two words read slightly larger as
 *   the system's anchors (Instituciones' "Comprender para intervenir
 *   mejor").
 */
export default function WordConnections({ words, layout, accent, className = "" }: WordConnectionsProps) {
  const stroke = ACCENT_VAR[accent];

  if (layout === "network") {
    const positions = NETWORK_POSITIONS.slice(0, words.length);

    return (
      <svg
        viewBox={`0 0 ${NETWORK_VIEW_WIDTH} ${NETWORK_VIEW_HEIGHT}`}
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        {NETWORK_CONNECTIONS.filter(([a, b]) => a < positions.length && b < positions.length).map(([a, b], i) => (
          <line
            key={`network-line-${i}`}
            x1={positions[a].dot.x}
            y1={positions[a].dot.y}
            x2={positions[b].dot.x}
            y2={positions[b].dot.y}
            pathLength={1}
            className="pl-draw"
            stroke={stroke}
            strokeOpacity={0.3}
            strokeWidth={1}
            style={{ animationDelay: `${150 + i * 90}ms` }}
          />
        ))}
        {words.map((word, i) => {
          const p = positions[i];
          if (!p) return null;
          return (
            <g key={word} className="pl-settle" style={{ animationDelay: `${250 + i * 90}ms` }}>
              <circle cx={p.dot.x} cy={p.dot.y} r={p.emphasis ? 4 : 3} fill={stroke} opacity={p.emphasis ? 0.9 : 0.6} />
              <text
                x={p.x}
                y={p.y}
                textAnchor={p.anchor ?? "start"}
                fontSize={p.emphasis ? 27 : 19}
                fontWeight={p.emphasis ? 700 : 600}
                fill="var(--color-slate)"
              >
                {word}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

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
