import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/insight/ArticleLayout";
import { sanityFetch } from "@/sanity/lib/fetch";
import { INSIGHT_BY_SLUG_QUERY, INSIGHT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { CACHE_TAGS } from "@/sanity/lib/tags";
import { getAutoRelatedInsights } from "@/sanity/lib/relatedInsights";
import { urlFor } from "@/sanity/lib/image";
import type { InsightArticle, SanityImage } from "@/sanity/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: INSIGHT_SLUGS_QUERY,
    tags: [CACHE_TAGS.insights],
  });
  return slugs.map(({ slug }) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getInsight(slug: string): Promise<InsightArticle | null> {
  return sanityFetch<InsightArticle | null>({
    query: INSIGHT_BY_SLUG_QUERY,
    params: { slug },
    tags: [CACHE_TAGS.insights],
  });
}

function canonicalFor(insight: InsightArticle): string {
  return insight.canonicalOverride || `${SITE_URL}/insights/${insight.slug}`;
}

function ogImageFor(insight: InsightArticle): SanityImage | undefined {
  return insight.ogImage ?? insight.featuredImage;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return {};

  const title = insight.seoTitle || `${insight.title} — Pensamiento Lateral`;
  const description = insight.seoDescription || insight.excerpt;
  const canonical = canonicalFor(insight);
  const imageSource = ogImageFor(insight);
  const ogImageUrl = imageSource?.asset ? urlFor(imageSource).width(1200).height(630).fit("crop").url() : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      authors: [insight.author.name],
      ...(insight.publicationDate ? { publishedTime: insight.publicationDate } : {}),
      ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  // Not found and unpublished behave identically, same as /casos/[slug]:
  // INSIGHT_BY_SLUG_QUERY runs on the published-perspective client, so a
  // draft-only or teaser-only document simply never matches here —
  // notFound() renders Next's real 404 (correct status code), no
  // fallback to static copy.
  if (!insight) notFound();

  const relatedInsights = await getAutoRelatedInsights(insight.slug, insight.filterCategories);

  const canonical = canonicalFor(insight);
  const imageSource = ogImageFor(insight);
  const jsonLdImageUrl = imageSource?.asset
    ? urlFor(imageSource).width(1200).height(630).fit("crop").url()
    : undefined;

  // Article JSON-LD (CLAUDE.md #28) — author/headline/description/
  // publisher always present (guaranteed by the schema); image/
  // datePublished only when the document actually has them, never
  // fabricated. No `logo` on publisher: no real Pensamiento Lateral logo
  // asset exists yet (CLAUDE.md #6 — never fabricate one).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    author: { "@type": "Person", name: insight.author.name },
    publisher: { "@type": "Organization", name: "Pensamiento Lateral", url: SITE_URL },
    mainEntityOfPage: canonical,
    ...(insight.publicationDate ? { datePublished: insight.publicationDate } : {}),
    ...(jsonLdImageUrl ? { image: jsonLdImageUrl } : {}),
  };

  return (
    <>
      {/* < escaping prevents a literal "</script>" inside any
          editor-entered string (title, excerpt) from closing the tag
          early — JSON.stringify alone doesn't escape "<". */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ArticleLayout insight={insight} relatedInsights={relatedInsights} />
    </>
  );
}
