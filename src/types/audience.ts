/** Shapes for /empresas and /instituciones — audience pages, not service
 * pages (CLAUDE.md #14). */

export interface ConnectionIntroData {
  title: string;
  paragraphs: string[];
  /** Only words that literally appear in this page's approved copy. */
  words: string[];
  layout: "converge" | "layers";
  accent: "terracotta" | "green";
}

/** A single-line case reference (client + its approved headline, linked) —
 * lighter than CasePreview, used where the copy itself has no case body. */
export interface CompactCaseItem {
  name: string;
  tagline: string;
  href: string;
}
