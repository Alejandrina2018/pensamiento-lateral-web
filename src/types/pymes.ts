/** Shapes for /servicios-para-pymes — a lead-generation page, not one of
 * the three service pages, so it gets its own small types rather than
 * stretching CapabilityItem/Service to fit a different content shape. */

/** One of the three Pymes solutions. Deliberately not built on the
 * existing `Service` type (home.ts) — that type's `ctaHref` assumes a
 * dedicated page per service, which these solutions don't have yet; here
 * every CTA points to /contacto (approved). */
export interface PymesSolution {
  number: string;
  name: string;
  tagline: string;
  body: string;
  tags: string[];
  ctaLabel: string;
  ctaHref: string;
}

/** A "problema → solución" row for the orientation block. */
export interface PymesOrientadorItem {
  problem: string;
  solution: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
