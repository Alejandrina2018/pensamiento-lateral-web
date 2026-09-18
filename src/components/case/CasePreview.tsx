import Link from "next/link";
import type { HomeCaseHighlight } from "@/types/home";
import CaseImagePlaceholder from "./CaseImagePlaceholder";

type CasePreviewProps = {
  caseItem: HomeCaseHighlight;
  reversed?: boolean;
  /** Extra vertical air and a step up in tagline scale — /casos' approved
   * way of giving Impacto Cercano more presence without reordering the
   * list or shrinking any other case (CLAUDE.md #4, #15). */
  emphasized?: boolean;
};

/** One row of an editorial case list — never a card (CLAUDE.md #4, #15). */
export default function CasePreview({ caseItem, reversed = false, emphasized = false }: CasePreviewProps) {
  return (
    <div
      className={`grid items-center gap-8 border-t border-sand md:grid-cols-12 md:gap-10 ${
        emphasized ? "py-16 md:py-20" : "py-12"
      } ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="md:col-span-5">
        <CaseImagePlaceholder label={caseItem.name} />
      </div>

      {/* Kept wider than the image (7/12 vs 5/12) so a real photo, map, or
          dashboard fragment never outweighs the headline (CLAUDE.md #6). */}
      <div className="flex flex-col gap-4 md:col-span-7">
        <h3 className="text-2xl font-semibold text-slate">{caseItem.name}</h3>
        <p className={`font-semibold text-slate ${emphasized ? "text-display-lg" : "text-display-md"}`}>
          {caseItem.tagline}
        </p>
        {(Array.isArray(caseItem.body) ? caseItem.body : caseItem.body ? [caseItem.body] : []).map((paragraph, i) => (
          <p key={i} className="max-w-(--measure) leading-relaxed text-slate/80">
            {paragraph}
          </p>
        ))}
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
