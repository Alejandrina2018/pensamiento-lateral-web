import Link from "next/link";
import type { CompactCaseItem } from "@/types/audience";

type CompactCaseListProps = {
  items: CompactCaseItem[];
};

/**
 * A one-line-per-case list — client name + its approved headline as the
 * link, nothing else. Used where the copy itself has no case body (CLAUDE.md
 * #14 point 2): no extra category label, no image, no invented text — the
 * differentiation between cases comes only from their own content.
 */
export default function CompactCaseList({ items }: CompactCaseListProps) {
  return (
    <ul className="divide-y divide-sand border-t border-sand">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className="group flex flex-col gap-1 py-8 md:flex-row md:items-baseline md:gap-8"
          >
            <span className="text-sm font-medium uppercase tracking-widest text-slate/60 md:w-44 md:shrink-0">
              {item.name}
            </span>
            <span className="text-xl font-semibold text-slate group-hover:text-terracotta md:text-2xl">
              {item.tagline} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
