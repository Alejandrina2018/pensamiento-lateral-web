import type { MethodStage } from "@/types/home";

type PrincipleListProps = {
  principles: MethodStage[];
};

/**
 * "Nuestra forma de trabajar" — a manifesto, not a features list. Single
 * column always (no grid), each principle separated by a thin rule, no
 * cards/icons/boxes. Deliberately not the Método/ProcessTimeline spine —
 * that motif reads as "sequence of steps"; this reads as "standing
 * principles", so it stays a plain vertical list.
 */
export default function PrincipleList({ principles }: PrincipleListProps) {
  return (
    <ol className="flex flex-col divide-y divide-sand border-t border-sand">
      {principles.map((principle) => (
        <li key={principle.number} className="flex gap-6 py-8 md:gap-10">
          <span className="shrink-0 text-2xl font-semibold text-slate/25 md:text-3xl" aria-hidden="true">
            {principle.number}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-slate md:text-2xl">{principle.title}</h3>
            <p className="mt-2 max-w-(--measure) leading-relaxed text-slate/80">{principle.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
