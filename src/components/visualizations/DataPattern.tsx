type Point = { x: number; y: number; r: number };

// Deterministic (no Math.random — would mismatch between server and client
// render). Left side: an irregular scatter. Right side: the same count of
// points snapped to a grid, with thin lines joining neighbors — the
// "dispersión → patrón" idea from CLAUDE.md #7, not a hub-and-spoke network
// (CLAUDE.md #5 rules out anything reading as an AI/neural-net cliché).
const SCATTERED: Point[] = Array.from({ length: 16 }, (_, i) => {
  const angle = ((i * 53) % 360) * (Math.PI / 180);
  const radius = 30 + ((i * 17) % 70);
  return {
    x: 120 + Math.cos(angle) * radius,
    y: 160 + Math.sin(angle) * radius * 0.7,
    r: 2 + (i % 3),
  };
});

const GRID_COLS = 5;
const GRID_ROWS = 4;
const GRID_ORIGIN = { x: 340, y: 90 };
const GRID_GAP = 42;

const ORDERED: Point[] = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => ({
  x: GRID_ORIGIN.x + (i % GRID_COLS) * GRID_GAP,
  y: GRID_ORIGIN.y + Math.floor(i / GRID_COLS) * GRID_GAP,
  r: 2.5,
}));

function gridIndex(col: number, row: number) {
  return row * GRID_COLS + col;
}

const CONNECTIONS: Array<[Point, Point]> = [];
for (let row = 0; row < GRID_ROWS; row++) {
  for (let col = 0; col < GRID_COLS; col++) {
    const current = ORDERED[gridIndex(col, row)];
    if (col < GRID_COLS - 1) CONNECTIONS.push([current, ORDERED[gridIndex(col + 1, row)]]);
    if (row < GRID_ROWS - 1) CONNECTIONS.push([current, ORDERED[gridIndex(col, row + 1)]]);
  }
}

/** Hero's data-driven visual (CLAUDE.md #7): scattered points settling
 * into an organized grid, connected by thin drawn lines. Pure SVG + CSS,
 * no client JS. Motion respects prefers-reduced-motion globally. */
export default function DataPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 400"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {CONNECTIONS.map(([a, b], i) => (
        <line
          key={`line-${i}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          pathLength={1}
          className="pl-draw"
          stroke="var(--color-terracotta)"
          strokeOpacity={0.35}
          strokeWidth={1}
          style={{ animationDelay: `${150 + i * 18}ms` }}
        />
      ))}

      {SCATTERED.map((p, i) => (
        <circle
          key={`scattered-${i}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          className="pl-settle"
          fill="var(--color-blue)"
          style={{ animationDelay: `${i * 30}ms` }}
        />
      ))}

      {ORDERED.map((p, i) => (
        <circle
          key={`ordered-${i}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          className="pl-settle"
          fill="var(--color-slate)"
          style={{ animationDelay: `${300 + i * 20}ms` }}
        />
      ))}
    </svg>
  );
}
