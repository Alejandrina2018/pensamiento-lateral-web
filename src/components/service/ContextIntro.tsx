import Container from "@/components/ui/Container";

type ContextIntroProps = {
  title: string;
  paragraphs: string[];
};

/** The editorial "breather" block each service page opens its argument
 * with ("Investigar es hacer mejores preguntas", etc.) — left-aligned,
 * contained reading width, never centered (approved direction). */
export default function ContextIntro({ title, paragraphs }: ContextIntroProps) {
  return (
    <section className="bg-sand/40">
      <Container className="py-20 md:py-28">
        <div className="max-w-(--measure)">
          <h2 className="text-display-md font-semibold text-slate">{title}</h2>
          <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-slate/80">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
