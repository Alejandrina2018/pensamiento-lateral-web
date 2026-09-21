import { groq } from "next-sanity";

/**
 * Shared projection for the teaser/article distinction: `hasArticle` is
 * computed here, on every query that lists Insights, exactly as
 * `published && defined(body) && defined(slug.current)`. "published" is
 * implicit — a draft-only document is already invisible on the
 * `publishedClient` (see client.ts), and still evaluates correctly on
 * the `draftsClient` for preview. Never stored as a field (point 5 of
 * the approved architecture: no second source of truth).
 */
const INSIGHT_LIST_PROJECTION = groq`{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  displayCategory,
  filterCategories,
  featured,
  publicationDate,
  order,
  "author": author->{ name, role, image },
  "hasArticle": defined(body) && count(body) > 0 && defined(slug.current)
}`;

/**
 * /insights — every published Insight, teaser-only ones included.
 *
 * Ordering is the explicit `order` field only (1-7, set by the migration
 * to match the approved array order in lib/data/insights.ts) — same
 * pattern as Author/CaseStudy/PressItem. `publicationDate` is informative
 * only and never a sort key or fallback: an editorial order shouldn't
 * silently depend on document creation time or an unset date field.
 */
export const INSIGHTS_QUERY = groq`
  *[_type == "insight"] | order(order asc)
  ${INSIGHT_LIST_PROJECTION}
`;

/** /insights?categoria=$categoria — same list and ordering, filtered server-side. */
export const INSIGHTS_BY_CATEGORY_QUERY = groq`
  *[_type == "insight" && $categoria in filterCategories] | order(order asc)
  ${INSIGHT_LIST_PROJECTION}
`;

/**
 * Home's "Insights" section — the first 3 by editorial order, matching
 * exactly what the old HOME_INSIGHTS (a literal slice of the first 3 of
 * INSIGHTS) selected. Not `featured == true`: no Insight document is
 * curated with that flag today, so relying on it here would silently
 * show 0 items instead of preserving the approved curation.
 */
export const HOME_INSIGHTS_QUERY = groq`
  *[_type == "insight"] | order(order asc)[0...3]
  ${INSIGHT_LIST_PROJECTION}
`;

/**
 * "Artículos relacionados" on the 5 service/audience pages — fetches by
 * an explicit slug list (each page's own *_RELATED_SLUGS, still a TS
 * constant: editorial page config, not CMS content). Sanity gives no
 * ordering guarantee for an `in` filter, so callers must reorder the
 * result to match their own slugs array — never rely on `order asc`
 * here, it would silently override each page's own curation.
 */
export const INSIGHTS_BY_SLUGS_QUERY = groq`
  *[_type == "insight" && slug.current in $slugs]
  ${INSIGHT_LIST_PROJECTION}
`;

/**
 * /insights/[slug] — requires body AND slug, so a teaser that was
 * published prematurely (or a slug typed in before the body existed)
 * still resolves to nothing here and the route 404s, same as the
 * current static `isInsightPublished()` gate.
 */
export const INSIGHT_BY_SLUG_QUERY = groq`
  *[_type == "insight" && slug.current == $slug && defined(body) && count(body) > 0][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    displayCategory,
    filterCategories,
    featured,
    publicationDate,
    "author": author->{ name, role, bio, image, linkedin },
    seoTitle,
    seoDescription,
    ogImage,
    canonicalOverride,
    "hasArticle": true
  }
`;

/** generateStaticParams for /insights/[slug] — same gate as above. */
export const INSIGHT_SLUGS_QUERY = groq`
  *[_type == "insight" && defined(body) && count(body) > 0 && defined(slug.current)]{
    "slug": slug.current
  }
`;

/**
 * Only what /casos' listing actually reads. ctaLabel/ctaHref are
 * deliberately excluded here: on the caseStudy document those fields are
 * the detail page's own closing CTA ("Hablemos" → /contacto — see
 * CASE_STUDY_BY_SLUG_QUERY), not the listing row's "Ver caso" link, which
 * is fixed UI copy pointing at /casos/<slug> and isn't stored as
 * per-document content at all.
 */
const CASE_STUDY_LIST_PROJECTION = groq`{
  _id,
  client,
  "slug": slug.current,
  listingHeadline,
  listingExcerpt,
  featuredImage,
  order
}`;

/** /casos */
export const CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(order asc)
  ${CASE_STUDY_LIST_PROJECTION}
`;

/**
 * By an explicit slug list — for placements that reuse a subset of real
 * cases with their own selection/order (e.g. /empresas, /instituciones'
 * case sections), instead of duplicating listingHeadline/listingExcerpt
 * as static copy. Sanity gives no ordering guarantee for `in`, so callers
 * must reorder the result to match their own slugs array — never rely on
 * `order asc` here, it's /casos' own editorial order, not necessarily a
 * given page's curation.
 */
export const CASE_STUDIES_BY_SLUGS_QUERY = groq`
  *[_type == "caseStudy" && slug.current in $slugs]
  ${CASE_STUDY_LIST_PROJECTION}
`;

/** /casos/[slug] */
export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    client,
    "slug": slug.current,
    listingHeadline,
    listingExcerpt,
    detailHeadline,
    challenge,
    approach,
    whatWeDid,
    evidence,
    finalQuestion,
    finalBody,
    ctaLabel,
    ctaHref,
    featuredImage,
    additionalImages,
    order,
    seoTitle,
    seoDescription,
    ogImage,
    canonicalOverride
  }
`;

/** generateStaticParams for /casos/[slug] */
export const CASE_STUDY_SLUGS_QUERY = groq`
  *[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }
`;

/** /quienes-somos → equipo */
export const AUTHORS_QUERY = groq`
  *[_type == "author"] | order(order asc){
    _id, name, "slug": slug.current, role, bio, image, linkedin, order
  }
`;

/** /quienes-somos → PL en la prensa. Ordered by the explicit `order`
 * field (never creation order — point 7 of the Press cutover). */
export const PRESS_ITEMS_QUERY = groq`
  *[_type == "pressItem"] | order(order asc){
    _id, title, publication, publicationMonth, excerpt, url, logo, order
  }
`;
