import { MONTHS_ES } from "./formatPublicationMonth";

/**
 * "2026-03-10" or "2026-03-10T12:00:00Z" -> "10 de marzo de 2026" — used
 * for Insight.publicationDate (datetime) and mediaCoverage.publicationDate
 * (date), both of which carry a real calendar day, unlike Press's
 * month-only field. Reads UTC date parts specifically so a plain "date"
 * value (no time component) never shifts a day backwards/forwards under a
 * non-UTC server timezone.
 */
export function formatFullDate(value: string): string {
  const date = new Date(value);
  const day = date.getUTCDate();
  const month = MONTHS_ES[date.getUTCMonth()].toLowerCase();
  const year = date.getUTCFullYear();
  return `${day} de ${month} de ${year}`;
}
