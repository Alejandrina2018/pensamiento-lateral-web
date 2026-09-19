import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import InsightPreview from "@/components/insight/InsightPreview";
import { sanityFetch } from "@/sanity/lib/fetch";
import { INSIGHTS_QUERY, INSIGHTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { CACHE_TAGS } from "@/sanity/lib/tags";
import type { InsightListItem } from "@/sanity/lib/types";
import type { Insight, InsightFilterCategory } from "@/types/content";

// Verbatim from content/final-copy.md — <!-- ROUTE: /insights -->
const INTRO = "Análisis, reflexiones y aprendizajes que surgen de investigaciones propias y del análisis de tendencias.";

// "Filtros de interfaz" — same order as final-copy.md.
const FILTERS: Array<{ label: string; value: InsightFilterCategory | "Todos" }> = [
  { label: "Todos", value: "Todos" },
  { label: "Investigación", value: "Investigación" },
  { label: "Datos", value: "Datos" },
  { label: "Clientes y marcas", value: "Clientes y marcas" },
  { label: "Opinión pública y territorio", value: "Opinión pública y territorio" },
  { label: "Tendencias", value: "Tendencias" },
];

export const metadata: Metadata = {
  title: "Insights — Pensamiento Lateral",
  description: INTRO,
};

type PageProps = {
  searchParams: Promise<{ categoria?: string }>;
};

// Sanity's SanityAuthor list projection for Insight only selects name/role/
// image (see INSIGHT_LIST_PROJECTION) — bio isn't fetched since InsightPreview
// never displays it here; the Insight/Author types require it, so it's
// filled with an empty string at this mapping boundary rather than fetched
// for nothing.
function toInsight(item: InsightListItem): Insight {
  return {
    title: item.title,
    slug: item.slug ?? "",
    excerpt: item.excerpt,
    // Never set from this teaser-listing query — see CLAUDE.md #12: none of
    // the 7 migrated Insights have an approved body yet, so `body` stays
    // undefined and isInsightPublished() correctly withholds the "Leer
    // artículo" link/CTA and any /insights/[slug] reference.
    body: undefined,
    author: { name: item.author.name, role: item.author.role, bio: "" },
    displayCategory: item.displayCategory,
    // The schema's filterCategories options list is the same closed set as
    // InsightFilterCategory (see CLAUDE.md #16 / insight.ts's FILTER_CATEGORIES).
    filterCategories: item.filterCategories as InsightFilterCategory[],
  };
}

// Server-rendered filtering (a plain link per filter, no client JS) keeps
// every article's full content crawlable regardless of which filter is
// selected — consistent with the rest of the site's minimal-JS approach.
export default async function InsightsPage({ searchParams }: PageProps) {
  const { categoria } = await searchParams;
  const active = FILTERS.some((f) => f.value === categoria) ? (categoria as InsightFilterCategory | "Todos") : "Todos";

  const items = await sanityFetch<InsightListItem[]>(
    active === "Todos"
      ? { query: INSIGHTS_QUERY, tags: [CACHE_TAGS.insights] }
      : { query: INSIGHTS_BY_CATEGORY_QUERY, params: { categoria: active }, tags: [CACHE_TAGS.insights] },
  );

  return (
    <>
      <section className="bg-cream">
        <Container className="pt-20 md:pt-28">
          <h1 className="max-w-3xl text-display-lg font-semibold text-balance text-slate">Insights</h1>
          <p className="mt-6 max-w-(--measure) text-lg leading-relaxed text-slate/80">{INTRO}</p>

          <nav aria-label="Filtrar por categoría" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-sand pt-6">
            {FILTERS.map((filter) => {
              const isActive = filter.value === active;
              const href = filter.value === "Todos" ? "/insights" : `/insights?categoria=${encodeURIComponent(filter.value)}`;
              return (
                <Link
                  key={filter.value}
                  href={href}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-sm font-medium uppercase tracking-widest ${
                    isActive ? "text-terracotta" : "text-slate/60 hover:text-slate"
                  }`}
                >
                  {filter.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="pb-20 md:pb-28">
          {/* Visually hidden — reuses the page's own "Insights" title so
              each article's H3 is correctly subordinated to an H2 instead
              of jumping straight from H1; no new copy. */}
          <h2 className="sr-only">Insights</h2>
          <div className="mt-4">
            {items.map((item, i) => (
              <InsightPreview key={item._id} insight={toInsight(item)} index={i} featured={i === 0} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
