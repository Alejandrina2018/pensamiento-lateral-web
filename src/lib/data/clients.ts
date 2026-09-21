export interface ClientLogo {
  name: string;
  src: string;
  /** Intrinsic file dimensions, for next/image — keeps each logo's own
   * aspect ratio instead of stretching it into a fixed box. */
  width: number;
  height: number;
}

// Real logo files supplied by the client (design-review round, Fase 1 —
// replaces the sober typographic placeholders used while no assets
// existed yet). Background removed and trimmed from the supplied files;
// no logo invented or sourced elsewhere (CLAUDE.md #8).
//
// Second round (design-review PDF) adds 7 more, extracted from the
// client's own PDF and processed the same way: transparent background,
// trimmed to content. No client removed — none of these duplicate an
// existing entry.
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Banco Nación", src: "/images/logos/banco-nacion.png", width: 206, height: 78 },
  { name: "Banco Provincia", src: "/images/logos/banco-provincia.png", width: 328, height: 107 },
  { name: "Zurich", src: "/images/logos/zurich.png", width: 250, height: 65 },
  { name: "GCBA", src: "/images/logos/gcba.png", width: 295, height: 96 },
  { name: "Suono", src: "/images/logos/suono.png", width: 217, height: 55 },
  { name: "Natura", src: "/images/logos/natura.png", width: 294, height: 222 },
  { name: "Ministerio de Justicia y Derechos Humanos", src: "/images/logos/ministerio-justicia-ddhh.png", width: 375, height: 108 },
  { name: "Nidera", src: "/images/logos/nidera.png", width: 292, height: 125 },
  { name: "OIM — ONU Migración", src: "/images/logos/oim.png", width: 312, height: 118 },
  { name: "HSBC", src: "/images/logos/hsbc.png", width: 415, height: 270 },
  { name: "UTN — Universidad Tecnológica Nacional", src: "/images/logos/utn.png", width: 548, height: 190 },
  { name: "Ministerio de Salud — Presidencia de la Nación", src: "/images/logos/ministerio-salud.png", width: 411, height: 121 },
  { name: "PNUD — Programa de las Naciones Unidas para el Desarrollo", src: "/images/logos/undp.png", width: 82, height: 169 },
  { name: "CARBAP", src: "/images/logos/carbap.png", width: 225, height: 224 },
  { name: "Libertad y Progreso", src: "/images/logos/libertad-y-progreso.png", width: 300, height: 108 },
  { name: "American Express", src: "/images/logos/american-express.png", width: 346, height: 104 },
];
