const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

/**
 * "2026-09" -> "Septiembre 2026" — the exact display format the
 * approved copy uses (final-copy.md never gives a day for press dates).
 * Never fabricates a day; throws on malformed input rather than
 * guessing, since a Press item failing schema validation shouldn't
 * silently render a wrong date instead.
 */
export function formatPublicationMonth(value: string): string {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (!match) {
    throw new Error(`Invalid publicationMonth "${value}" — expected "YYYY-MM"`);
  }
  const [, year, month] = match;
  return `${MONTHS_ES[Number(month) - 1]} ${year}`;
}
