import type { CapabilityItem } from "@/types/service";
import TagList from "@/components/ui/TagList";

type CapabilityListProps = {
  items: CapabilityItem[];
  /** 3 columns is for exactly-3-item lists (one per column — the
   * methodology blocks, or a body-less "Cómo podemos acompañarte"
   * capability summary); 2 uses a flowing multi-column layout so an odd
   * item count never leaves a dangling empty cell. Neither uses cards,
   * boxes, radius or shadow — differentiation is typographic only. */
  columns?: 2 | 3;
  /** "rail" adds a thin left rule down the whole list (Instituciones'
   * desafíos, echoing "capas de información") instead of per-item cards. */
  variant?: "plain" | "rail";
};

export default function CapabilityList({ items, columns = 2, variant = "plain" }: CapabilityListProps) {
  if (columns === 3) {
    return (
      <div className="grid gap-10 border-t border-sand pt-10 md:grid-cols-3 md:divide-x md:divide-sand">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col gap-3 md:px-8 md:first:pl-0 md:last:pr-0">
            <h3 className="text-lg font-semibold text-slate">{item.name}</h3>
            {item.body && <p className="leading-relaxed text-slate/80">{item.body}</p>}
            {item.tags && <TagList tags={item.tags} />}
          </div>
        ))}
      </div>
    );
  }

  const railClasses = "border-l border-green/30 pt-2 pl-6 md:pl-10";
  const plainClasses = "border-t border-sand pt-10";

  return (
    <div className={`md:columns-2 md:gap-10 ${variant === "rail" ? railClasses : plainClasses}`}>
      {items.map((item) => (
        <div key={item.name} className="mb-10 flex flex-col gap-3 break-inside-avoid-column">
          <h3 className="text-lg font-semibold text-slate">{item.name}</h3>
          {item.body && <p className="leading-relaxed text-slate/80">{item.body}</p>}
          {item.tags && <TagList tags={item.tags} />}
        </div>
      ))}
    </div>
  );
}
