import type { PressItem as PressItemType } from "@/types/content";

type PressItemProps = {
  item: PressItemType;
};

/** An external press mention — title leads (in quotes, as the source
 * headline), publication · date in smaller type below it, then the
 * bajada, then "Leer nota". Order is deliberate: publication/date never
 * sits above the title (approved direction). "Leer nota" is plain text
 * until a real URL exists, never a dead link. */
export default function PressItem({ item }: PressItemProps) {
  return (
    <article className="border-t border-sand py-8">
      <h3 className="text-2xl font-semibold text-balance text-slate md:text-3xl">
        &ldquo;{item.title}&rdquo;
      </h3>
      <p className="mt-3 text-sm uppercase tracking-wide text-slate/50">
        {item.publication} · {item.date}
      </p>
      <p className="mt-4 max-w-(--measure) leading-relaxed text-slate/80">{item.excerpt}</p>
      {item.externalUrl ? (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-slate"
        >
          Leer nota
          <span aria-hidden="true">→</span>
        </a>
      ) : (
        <p className="mt-4 text-sm font-medium text-slate/40">Leer nota</p>
      )}
    </article>
  );
}
