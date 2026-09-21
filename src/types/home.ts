/**
 * Shapes for Home's own static content blocks (CLAUDE.md #11). These are
 * page-config content, not CMS collections — unlike Insight/CaseStudy in
 * content.ts, they don't map to a planned Sanity schema, but are still
 * kept as typed data (src/lib/data/*.ts) rather than inline in components
 * so real copy stays out of JSX per CLAUDE.md #17.
 */

export interface Service {
  name: string;
  tagline: string;
  body: string;
  tags: string[];
  ctaLabel: string;
  href: string;
}

export interface MethodStage {
  number: string;
  title: string;
  description: string;
}

export interface Audience {
  name: string;
  tagline: string;
  body: string;
  tags: string[];
  ctaLabel: string;
  href: string;
  accent: "terracotta" | "green";
}

/** A "Casos destacados" preview entry (used by Home and by each service
 * page's single "Caso destacado") — lighter than the full CaseStudy page
 * shape, and not always 1:1 with a single case (see Home's "Sector
 * público"). `body` takes a single string or several paragraphs. */
export interface HomeCaseHighlight {
  name: string;
  tagline: string;
  body?: string | string[];
  ctaLabel: string;
  href: string;
  /** Real photo, when one has actually been supplied — optional on
   * purpose (CasePreview falls back to the usual CaseImagePlaceholder
   * when it's absent, e.g. Home's "Sector público"). Rendered with
   * next/image's `fill` inside a fixed aspect-[4/3] box — no intrinsic
   * width/height needed. */
  image?: { src: string; alt: string };
}
