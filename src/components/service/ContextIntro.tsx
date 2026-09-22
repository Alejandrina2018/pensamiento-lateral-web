import Container from "@/components/ui/Container";

type ContextIntroProps = {
  title: string;
  paragraphs: string[];
  /** Default (false) keeps every existing page's exact layout: the whole
   * block capped at --measure. /investigacion's design-review pass found
   * that block reading as a narrow column isolated inside the page's
   * usual, much wider Container — `wide` widens the block itself to an
   * 8/12 grid column (comparable to the hero and sections around it)
   * while paragraphs keep their own comfortable reading length inside
   * it, instead of stretching to the block's full new width. */
  wide?: boolean;
};

/** The editorial "breather" block each service page opens its argument
 * with ("Investigar es hacer mejores preguntas", etc.) — left-aligned,
 * contained reading width, never centered (approved direction). */
export default function ContextIntro({ title, paragraphs, wide = false }: ContextIntroProps) {
  const content = (
    <>
      <h2 className="text-display-md font-semibold text-slate">{title}</h2>
      <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </>
  );

  return (
    <section className="bg-sand/40">
      <Container className="py-20 md:py-28">
        {wide ? (
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">{content}</div>
          </div>
        ) : (
          <div className="max-w-(--measure)">{content}</div>
        )}
      </Container>
    </section>
  );
}
