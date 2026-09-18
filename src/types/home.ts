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

/** A Home "Casos destacados" entry — lighter than the full CaseStudy page
 * shape, and not always 1:1 with a single case (see "Sector público"). */
export interface HomeCaseHighlight {
  name: string;
  tagline: string;
  body?: string;
  ctaLabel: string;
  href: string;
}
