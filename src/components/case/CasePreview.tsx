import Link from "next/link";
import type { HomeCaseHighlight } from "@/types/home";
import CaseImagePlaceholder from "./CaseImagePlaceholder";

type CasePreviewProps = {
  caseItem: HomeCaseHighlight;
  reversed?: boolean;
};

/** One row of an editorial case list — never a card (CLAUDE.md #4, #15). */
export default function CasePreview({ caseItem, reversed = false }: CasePreviewProps) {
  return (
    <div
      className={`grid items-center gap-8 border-t border-sand py-12 md:grid-cols-2 md:gap-16 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <CaseImagePlaceholder label={caseItem.name} />

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-slate">{caseItem.name}</h3>
        <p className="text-display-md font-semibold text-slate">{caseItem.tagline}</p>
        {caseItem.body && <p className="max-w-(--measure) text-slate/80">{caseItem.body}</p>}
        <Link
          href={caseItem.href}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-terracotta hover:text-slate"
        >
          {caseItem.ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
