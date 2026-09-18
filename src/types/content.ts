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

export type InsightCategory =
  | "Investigación"
  | "Datos"
  | "Clientes y marcas"
  | "Opinión pública y territorio"
  | "Tendencias";

export interface Insight {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: Author;
  category: InsightCategory;
  publicationDate: string;
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
