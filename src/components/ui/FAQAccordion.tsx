import type { FAQItem } from "@/types/pymes";

type FAQAccordionProps = {
  items: FAQItem[];
};

/** Native <details>/<summary> per question — every answer is already in
 * the DOM (no JS required for indexing), keyboard-operable and focusable
 * for free, and independent per item (no exclusive-open behavior, per
 * approved direction). Same mechanics as the header's "Servicios"
 * dropdown, just styled as a plain question list instead of a menu — a
 * thin rule and a discreet +/− indicator, never a boxed card. */
export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="flex flex-col divide-y divide-sand border-t border-sand">
      {items.map((item) => (
        <details key={item.question} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-slate marker:content-none [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-xl font-normal text-slate/50 transition-transform duration-(--duration-base) group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-(--measure) leading-relaxed text-slate/80">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
