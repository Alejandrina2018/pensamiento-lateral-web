import type { ConnectionIntroData } from "@/types/audience";
import WordConnections from "@/components/visualizations/WordConnections";

/**
 * The lead-in for Empresas/Instituciones' "mirada integral" argument. No
 * section wrapper of its own — it shares one continuous <section> with the
 * challenges list that follows it (final-copy.md doesn't separate them).
 * Left-aligned, contained reading width (approved direction). The diagram
 * is decorative and hidden on mobile to keep the page's reading rhythm.
 */
export default function ConnectionIntro({ title, paragraphs, words, layout, accent }: ConnectionIntroData) {
  return (
    <div className="md:flex md:items-start md:gap-16">
      <div className="max-w-(--measure)">
        <h2 className="text-display-md font-semibold text-slate">{title}</h2>
        <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-slate/80">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="mt-10 hidden shrink-0 md:mt-2 md:block md:h-40 md:w-80">
        <WordConnections words={words} layout={layout} accent={accent} className="h-full w-full" />
      </div>
    </div>
  );
}
