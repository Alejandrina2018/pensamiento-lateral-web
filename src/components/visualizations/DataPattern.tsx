type Point = { x: number; y: number; r: number };
type Line = [Point, Point];

const VIEW_BOX = "0 0 560 400";

// All coordinates below are deterministic (no Math.random — would mismatch
// between server and client render).

// --- scatter-to-grid (default — Home's Hero, CLAUDE.md #7) ---------------
// Left side: an irregular scatter. Right side: the same idea snapped to a
// grid, with thin lines joining neighbors — "dispersión → patrón", never a
// hub-and-spoke network (CLAUDE.md #5).
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

const GRID_CONNECTIONS: Line[] = [];
for (let row = 0; row < GRID_ROWS; row++) {
  for (let col = 0; col < GRID_COLS; col++) {
    const current = ORDERED[gridIndex(col, row)];
    if (col < GRID_COLS - 1) GRID_CONNECTIONS.push([current, ORDERED[gridIndex(col + 1, row)]]);
    if (row < GRID_ROWS - 1) GRID_CONNECTIONS.push([current, ORDERED[gridIndex(col, row + 1)]]);
  }
}

// Every 5th grid point reads as "active" (terracotta) — used by the
// grid-only / Datos variant to suggest a read/selected indicator, never a
// fabricated metric (CLAUDE.md #6).
const ACTIVE_GRID_INDEXES = new Set(ORDERED.map((_, i) => i).filter((i) => i % 5 === 2));

// --- cluster (Investigación) ----------------------------------------------
// Points settle into a few loose, organic clusters instead of a grid —
// listening → grouping → interpretation, not segmentation or a diagram.
// Each cluster has one accent point (an emerging insight) and only short
// connections within itself — no cross-cluster lines, so it never reads as
// a network.
const CLUSTER_CENTERS = [
  { x: 110, y: 90 },
  { x: 340, y: 70 },
  { x: 180, y: 260 },
  { x: 420, y: 240 },
];
const POINTS_PER_CLUSTER = 6;

const CLUSTERS: Point[][] = CLUSTER_CENTERS.map((center, c) =>
  Array.from({ length: POINTS_PER_CLUSTER }, (_, i) => {
    const angle = ((c * 97 + i * 61) % 360) * (Math.PI / 180);
    const radius = 14 + ((c * 13 + i * 9) % 26);
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius * 0.8,
      r: 2 + (i % 2),
    };
  })
);

const CLUSTER_CONNECTIONS: Line[] = CLUSTERS.flatMap((cluster) => [
  [cluster[0], cluster[1]],
  [cluster[1], cluster[2]],
]);

// --- territory (Instituciones) --------------------------------------------
// 4 zones with deliberately different point densities — some areas denser
// than others — and no connecting lines at all, so it reads as "zones with
// differences" rather than a map, a GIS layer, or a network. A few points
// per zone read as green ("escucha activa"), never a real metric.
const ZONES = [
  { x: 100, y: 90, count: 11, radius: 55 },
  { x: 340, y: 70, count: 5, radius: 40 },
  { x: 180, y: 260, count: 8, radius: 50 },
  { x: 420, y: 230, count: 4, radius: 35 },
];

const TERRITORY: Point[] = ZONES.flatMap((zone, z) =>
  Array.from({ length: zone.count }, (_, i) => {
    const angle = ((z * 97 + i * 61) % 360) * (Math.PI / 180);
    const radius = zone.radius * (0.2 + ((z * 13 + i * 9) % 80) / 100);
    return {
      x: zone.x + Math.cos(angle) * radius,
      y: zone.y + Math.sin(angle) * radius * 0.85,
      r: 2 + (i % 2),
    };
  })
);

// A faint city-block grid behind the territory dots, for Impacto Cercano's
// "manzana por manzana" — still abstract (no real streets/parcels), just a
// quiet rectilinear texture, always secondary to the content around it.
const BLOCK_GRID_COLS = 9;
const BLOCK_GRID_ROWS = 7;
const BLOCK_GRID_LINES: Line[] = [
  ...Array.from({ length: BLOCK_GRID_COLS + 1 }, (_, i) => {
    const x = (i / BLOCK_GRID_COLS) * 560;
    return [
      { x, y: 0, r: 0 },
      { x, y: 400, r: 0 },
    ] as Line;
  }),
  ...Array.from({ length: BLOCK_GRID_ROWS + 1 }, (_, i) => {
    const y = (i / BLOCK_GRID_ROWS) * 400;
    return [
      { x: 0, y, r: 0 },
      { x: 560, y, r: 0 },
    ] as Line;
  }),
];

type Variant = "scatter-to-grid" | "cluster" | "grid-only" | "territory";

function Dot({ point, fill, delay }: { point: Point; fill: string; delay: number }) {
  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={point.r}
      className="pl-settle"
      fill={fill}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

function ConnectorLine({ line, delay }: { line: Line; delay: number }) {
  const [a, b] = line;
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      pathLength={1}
      className="pl-draw"
      stroke="var(--color-terracotta)"
      strokeOpacity={0.35}
      strokeWidth={1}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

/** Hero's data-driven visual (CLAUDE.md #7). Pure SVG + CSS, no client JS.
 * Motion respects prefers-reduced-motion globally.
 *
 * - "scatter-to-grid" (default, Home): dispersion settling into order.
 * - "cluster" (Investigación): organic groupings, listening/interpretation.
 * - "grid-only" (Datos): already-structured, a few points read as active.
 * - "territory" (Instituciones): zones of different point density, no
 *   connecting lines — never a map or GIS layer. */
export default function DataPattern({
  className = "",
  variant = "scatter-to-grid",
  gridOverlay = false,
}: {
  className?: string;
  variant?: Variant;
  /** Only meaningful for "territory" — adds the faint block-grid texture
   * (Impacto Cercano's extra depth vs. Instituciones' plainer version). */
  gridOverlay?: boolean;
}) {
  if (variant === "territory") {
    return (
      <svg viewBox={VIEW_BOX} className={className} aria-hidden="true" focusable="false">
        {gridOverlay &&
          BLOCK_GRID_LINES.map(([a, b], i) => (
            <line key={`block-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--color-slate)" strokeOpacity={0.08} strokeWidth={1} />
          ))}
        {TERRITORY.map((p, i) => (
          <Dot
            key={`territory-${i}`}
            point={p}
            fill={i % 4 === 0 ? "var(--color-green)" : "var(--color-slate)"}
            delay={i * 25}
          />
        ))}
      </svg>
    );
  }

  if (variant === "cluster") {
    return (
      <svg viewBox={VIEW_BOX} className={className} aria-hidden="true" focusable="false">
        {CLUSTER_CONNECTIONS.map((line, i) => (
          <ConnectorLine key={`line-${i}`} line={line} delay={150 + i * 25} />
        ))}
        {CLUSTERS.flatMap((cluster, c) =>
          cluster.map((p, i) => (
            <Dot
              key={`c${c}-${i}`}
              point={p}
              fill={i === 0 ? "var(--color-terracotta)" : "var(--color-blue)"}
              delay={c * 90 + i * 30}
            />
          ))
        )}
      </svg>
    );
  }

  if (variant === "grid-only") {
    return (
      <svg viewBox={VIEW_BOX} className={className} aria-hidden="true" focusable="false">
        {GRID_CONNECTIONS.map((line, i) => (
          <ConnectorLine key={`line-${i}`} line={line} delay={100 + i * 15} />
        ))}
        {ORDERED.map((p, i) => (
          <Dot
            key={`ordered-${i}`}
            point={p}
            fill={ACTIVE_GRID_INDEXES.has(i) ? "var(--color-terracotta)" : "var(--color-slate)"}
            delay={i * 20}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true" focusable="false">
      {GRID_CONNECTIONS.map((line, i) => (
        <ConnectorLine key={`line-${i}`} line={line} delay={150 + i * 18} />
      ))}
      {SCATTERED.map((p, i) => (
        <Dot key={`scattered-${i}`} point={p} fill="var(--color-blue)" delay={i * 30} />
      ))}
      {ORDERED.map((p, i) => (
        <Dot key={`ordered-${i}`} point={p} fill="var(--color-slate)" delay={300 + i * 20} />
      ))}
    </svg>
  );
}
