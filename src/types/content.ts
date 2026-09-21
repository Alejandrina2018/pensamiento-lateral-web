/**
 * Content shapes for CMS-authored types, mirrored from the Sanity schemas
 * planned in CLAUDE.md #17 so the static content used now can move to
 * Sanity later without reshaping components.
 */

export interface Author {
  name: string;
  role: string;
  bio: string;
  /** Resolved, ready-to-render image — never a raw Sanity asset
   * reference. Optional: TeamMember falls back to the usual placeholder
   * when absent. */
  image?: { src: string; alt: string };
  linkedin?: string;
}

/**
 * The 5 generic buckets used by the Insights filter UI (CLAUDE.md #16).
 * Distinct from `Insight.displayCategory`, which is the specific,
 * verbatim label shown under each article — the two are intentionally
 * not the same taxonomy (see content/final-copy.md categorization).
 */
export type InsightFilterCategory =
  | "Investigación"
  | "Datos"
  | "Clientes y marcas"
  | "Opinión pública y territorio"
  | "Tendencias";

export interface Insight {
  title: string;
  slug: string;
  excerpt: string;
  /** Full article body — pending approved copy for most articles (see
   * content/final-copy.md's "CONTENIDO PENDIENTE"); left unset rather than invented. */
  body?: string;
  author: Author;
  /** Verbatim category label shown under the article — never rewritten. */
  displayCategory: string;
  /** One or more generic buckets this article matches in the filter UI. */
  filterCategories: InsightFilterCategory[];
  /** Not yet supplied for the initial articles — left unset rather than invented. */
  publicationDate?: string;
  featured?: boolean;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

/**
 * "Qué hicimos" isn't the same shape for every case — some are plain
 * paragraphs (Zurich), others are a short list of named sub-blocks (the
 * other 4). CaseStudyLayout renders either without forcing empty sections.
 */
export type CaseWhatWeDid =
  | { kind: "paragraphs"; items: string[] }
  | { kind: "list"; items: Array<{ title: string; body: string }> };

export interface CaseStudy {
  client: string;
  /** This case's own detail-page headline — not the /casos listing tagline. */
  title: string;
  slug: string;
  challenge: string[];
  approach: string[];
  whatWeDid: CaseWhatWeDid;
  evidence: string[];
  finalQuestion: string;
  /** Not every case has closing body copy before the CTA — optional. */
  finalBody?: string;
  ctaLabel: string;
  ctaHref: string;
  featuredImage?: string;
  logo?: string;
}

export interface PressItem {
  title: string;
  publication: string;
  date: string;
  excerpt: string;
  /** Not yet supplied (final-copy.md's "CONTENIDO PENDIENTE") — rendered as
   * plain text, never a dead link, until a real URL exists. */
  externalUrl?: string;
  logo?: string;
}
