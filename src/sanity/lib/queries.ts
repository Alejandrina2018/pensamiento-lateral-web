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
  "author": author->{ name, role, image },
  "hasArticle": defined(body) && count(body) > 0 && defined(slug.current)
}`;

/** /insights — every published Insight, teaser-only ones included. */
export const INSIGHTS_QUERY = groq`
  *[_type == "insight"] | order(coalesce(publicationDate, _createdAt) desc)
  ${INSIGHT_LIST_PROJECTION}
`;

/** /insights?categoria=$categoria — same list, filtered server-side. */
export const INSIGHTS_BY_CATEGORY_QUERY = groq`
  *[_type == "insight" && $categoria in filterCategories] | order(coalesce(publicationDate, _createdAt) desc)
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

const CASE_STUDY_LIST_PROJECTION = groq`{
  _id,
  client,
  "slug": slug.current,
  listingHeadline,
  listingExcerpt,
  featuredImage,
  ctaLabel,
  ctaHref,
  order
}`;

/** /casos */
export const CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(order asc)
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

/** /quienes-somos → PL en la prensa */
export const PRESS_ITEMS_QUERY = groq`
  *[_type == "pressItem"] | order(order asc){
    _id, title, publication, date, excerpt, url, logo, order
  }
`;
