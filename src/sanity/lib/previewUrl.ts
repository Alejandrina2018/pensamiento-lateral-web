/**
 * Where "Preview" should open for a given document — one rule per type,
 * per the approved architecture (point 11). An Insight without a
 * published article yet (no body/slug) previews on the listing, not on
 * a route that doesn't exist — so an editor can preview a teaser before
 * it has an article at all.
 */

type PreviewableDoc = {
  _type: string;
  slug?: { current?: string } | null;
  body?: unknown[] | null;
};

export function resolvePreviewPath(doc: PreviewableDoc): string {
  switch (doc._type) {
    case "insight": {
      const hasArticle = Boolean(doc.slug?.current) && Array.isArray(doc.body) && doc.body.length > 0;
      return hasArticle ? `/insights/${doc.slug!.current}` : "/insights";
    }
    case "caseStudy":
      return doc.slug?.current ? `/casos/${doc.slug.current}` : "/casos";
    case "author":
    case "pressItem":
      return "/quienes-somos";
    default:
      return "/";
  }
}
