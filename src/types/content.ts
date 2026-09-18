/**
 * Content shapes for CMS-authored types, mirrored from the Sanity schemas
 * planned in CLAUDE.md #17 so the static content used now can move to
 * Sanity later without reshaping components.
 */

export interface Author {
  name: string;
  role: string;
  bio: string;
  image?: string;
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

export interface CaseStudy {
  client: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  logo?: string;
  challenge?: string;
  approach?: string;
  whatWeDid?: string;
  action?: string;
  impact?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface PressItem {
  title: string;
  publication: string;
  date: string;
  excerpt: string;
  externalUrl: string;
  logo?: string;
}
