import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { formatFullDate } from "@/sanity/lib/formatFullDate";
import type { MediaCoverageItem } from "@/sanity/lib/types";

type MediaCoverageListProps = {
  items: MediaCoverageItem[];
};

/** "Este análisis en los medios" — same editorial, title-forward row
 * language as PressItem (CLAUDE.md #19: no pared de logos), adapted for a
 * per-article list instead of a sitewide "PL en la prensa" feed: no
 * excerpt field exists here, and the CTA is "Ver publicación" rather than
 * "Leer nota". Caller only renders this when the array is non-empty. */
export default function MediaCoverageList({ items }: MediaCoverageListProps) {
  return (
    <section className="bg-cream">
      <Container className="py-16 md:py-20">
        <Eyebrow as="h2">Este análisis en los medios</Eyebrow>

        <div className="mt-8 flex flex-col divide-y divide-sand border-t border-sand">
          {items.map((item) => (
            <article key={item._key} className="py-8">
              <h3 className="text-xl font-semibold text-balance text-slate md:text-2xl">{item.articleTitle}</h3>
              <p className="mt-3 text-sm uppercase tracking-wide text-slate/70">
                {item.mediaName}
                {item.publicationDate ? ` · ${formatFullDate(item.publicationDate)}` : ""}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-slate"
              >
                Ver publicación
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
