import Link from "next/link";
import type { Insight } from "@/types/content";

type InsightPreviewProps = {
  insight: Insight;
};

/** Title-forward editorial row (CLAUDE.md #16) — title leads, category
 * trails in small caps. No thumbnail: typography and space carry it. */
export default function InsightPreview({ insight }: InsightPreviewProps) {
  return (
    <article className="border-t border-sand py-10">
      <h3 className="text-2xl font-semibold text-slate md:text-3xl">{insight.title}</h3>
      <p className="mt-3 max-w-(--measure) text-slate/80">{insight.excerpt}</p>
      <p className="mt-4 text-sm uppercase tracking-wide text-slate/50">
        {insight.author.name} · {insight.displayCategory}
      </p>
      <Link
        href={`/insights/${insight.slug}`}
        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-slate"
      >
        Leer artículo
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
