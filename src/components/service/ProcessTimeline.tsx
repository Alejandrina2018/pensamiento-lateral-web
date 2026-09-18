import Container from "@/components/ui/Container";
import type { MethodStage } from "@/types/home";

type ProcessTimelineProps = {
  title: string;
  stages: MethodStage[];
};

/** Same mechanics as Home's Método (CLAUDE.md #13): every stage's full text
 * is always in the DOM — a real <ol>, no hover-gated content — with a
 * CSS-only connecting line/markers. Used for Automatizaciones e IA's
 * 4-stage "Cómo trabajamos", a distinct process from Home's 5-stage method. */
export default function ProcessTimeline({ title, stages }: ProcessTimelineProps) {
  return (
    <section className="bg-slate text-cream">
      <Container className="py-20 md:py-28">
        <h2 className="text-display-lg font-semibold">{title}</h2>

        {/* Stays stacked through tablet (834px) — 4 columns that early get
            too narrow for the longer stage descriptions; switches to a row
            only at lg (1024px+), where there's enough width per column. */}
        <ol className="mt-16 flex flex-col gap-12 border-l border-cream/20 pl-8 md:mt-20 lg:flex-row lg:gap-8 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-10">
          {stages.map((stage) => (
            <li key={stage.number} className="relative flex-1">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(2rem+2px)] top-1 h-1.5 w-1.5 rounded-full bg-terracotta lg:-top-[calc(2.5rem+2px)] lg:left-0"
              />
              <p aria-hidden="true" className="text-number-lg font-semibold text-cream/40">
                {stage.number}
              </p>
              <h3 className="mt-1 text-xl font-semibold">{stage.title}</h3>
              <p className="mt-2 max-w-(--measure-narrow) text-sm leading-relaxed text-cream/85 md:text-base">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
