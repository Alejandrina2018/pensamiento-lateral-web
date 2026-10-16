import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CASE_STUDY_SLUGS_QUERY, INSIGHT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { CACHE_TAGS } from "@/sanity/lib/tags";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Every public route under src/app/(site) except /casos/[slug] and
// /insights/[slug], both appended below from Sanity so a new case or
// article shows up here without a code change.
const STATIC_ROUTES = [
  "/",
  "/quienes-somos",
  "/investigacion",
  "/datos",
  "/automatizaciones-ia",
  "/empresas",
  "/instituciones",
  "/casos",
  "/insights",
  "/servicios-para-pymes",
  "/contacto",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseSlugs = await sanityFetch<{ slug: string }[]>({
    query: CASE_STUDY_SLUGS_QUERY,
    tags: [CACHE_TAGS.cases],
  });

  const insightSlugs = await sanityFetch<{ slug: string }[]>({
    query: INSIGHT_SLUGS_QUERY,
    tags: [CACHE_TAGS.insights],
  });

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }));

  const caseEntries = caseSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/casos/${slug}`,
  }));

  const insightEntries = insightSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/insights/${slug}`,
  }));

  return [...staticEntries, ...caseEntries, ...insightEntries];
}
