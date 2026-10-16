import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

type ReportDownloadProps = {
  url: string;
  title: string;
  description?: string;
};

/** "Informe completo" — a horizontal editorial block, not a boxed/
 * featured card (CLAUDE.md #4). Caller only renders this when a PDF is
 * actually attached. */
export default function ReportDownload({ url, title, description }: ReportDownloadProps) {
  return (
    <section className="bg-sand/40">
      <Container className="py-16 md:py-20">
        <Eyebrow as="h2">Informe completo</Eyebrow>
        <h3 className="mt-4 max-w-2xl text-display-md font-semibold text-balance text-slate">{title}</h3>
        {description && <p className="mt-4 max-w-(--measure) leading-relaxed text-slate/80">{description}</p>}
        <div className="mt-8">
          <Button href={url} target="_blank" rel="noopener noreferrer">
            Descargar informe completo
          </Button>
        </div>
      </Container>
    </section>
  );
}
