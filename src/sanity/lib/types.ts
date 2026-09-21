import type { PortableTextBlock } from "sanity";

/** Result shapes for the GROQ queries in queries.ts. Distinct from
 * src/types/content.ts (the static site's current types) on purpose —
 * these mirror the Sanity documents themselves (slug as an object,
 * author as an expanded reference, etc.) and are not used by any page
 * yet. Nothing here changes what the frontend reads today. */

export type SanityImage = {
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type SanityAuthor = {
  _id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  image?: SanityImage;
  linkedin?: string;
  order: number;
};

export type InsightListItem = {
  _id: string;
  title: string;
  slug: string | null;
  excerpt: string;
  displayCategory: string;
  filterCategories: string[];
  featured: boolean;
  /** Informative only — never the sort key (see INSIGHTS_QUERY). */
  publicationDate: string | null;
  /** The listing's sort key (order asc) — mirrors Author/CaseStudy/PressItem. */
  order: number;
  author: Pick<SanityAuthor, "name" | "role" | "image">;
  /** published && defined(body) && defined(slug.current) — computed in
   * the query itself (see INSIGHT_HAS_ARTICLE_PROJECTION), never stored. */
  hasArticle: boolean;
};

export type InsightArticle = InsightListItem & {
  body: PortableTextBlock[];
  author: Pick<SanityAuthor, "name" | "role" | "bio" | "image" | "linkedin">;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
  canonicalOverride?: string;
};

export type NamedBlock = { _type: "namedBlock"; _key: string; title: string; body: PortableTextBlock[] };
export type WhatWeDidItem = PortableTextBlock | NamedBlock;

export type CaseStudyListItem = {
  _id: string;
  client: string;
  slug: string;
  listingHeadline: string;
  listingExcerpt: string;
  featuredImage?: SanityImage;
  order: number;
};

export type CaseStudyDetail = CaseStudyListItem & {
  detailHeadline: string;
  challenge: PortableTextBlock[];
  approach: PortableTextBlock[];
  whatWeDid: WhatWeDidItem[];
  evidence: PortableTextBlock[];
  finalQuestion: string;
  finalBody?: string;
  /** The detail page's own closing CTA — distinct from the listing row's
   * fixed "Ver caso" link (see CASE_STUDY_LIST_PROJECTION). */
  ctaLabel: string;
  ctaHref: string;
  additionalImages?: SanityImage[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
  canonicalOverride?: string;
};

export type PressItemResult = {
  _id: string;
  title: string;
  publication: string;
  /** YYYY-MM — format for display with formatPublicationMonth(), never
   * shown raw (no invented day). */
  publicationMonth: string;
  excerpt: string;
  url?: string;
  logo?: SanityImage;
  order: number;
};
