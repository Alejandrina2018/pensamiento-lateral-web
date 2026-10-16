import { PortableText } from "@portabletext/react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CTASection from "@/components/ui/CTASection";
import MediaCoverageList from "@/components/insight/MediaCoverageList";
import ReportDownload from "@/components/insight/ReportDownload";
import RelatedArticles from "@/components/insight/RelatedArticles";
import type { InsightPreviewData } from "@/components/insight/InsightPreview";
import { formatFullDate } from "@/sanity/lib/formatFullDate";
import { getContactEmail } from "@/lib/env";
import type { InsightArticle } from "@/sanity/lib/types";

type ArticleLayoutProps = {
  insight: InsightArticle;
  relatedInsights: InsightPreviewData[];
};

/**
 * Shared template for /insights/[slug] (CLAUDE.md #37's ArticleLayout).
 * Section order after the body is fixed per the approved architecture:
 * repercusiones en medios → informe completo → relacionados → CTA final.
 * Every optional block (media coverage, report, related) renders nothing
 * when its data is empty — an Insight with none of the three looks
 * exactly like a plain article, no empty section, no placeholder.
 */
export default function ArticleLayout({ insight, relatedInsights }: ArticleLayoutProps) {
  const email = getContactEmail();
  const hasMediaCoverage = Boolean(insight.mediaCoverage && insight.mediaCoverage.length > 0);
  const reportUrl = insight.reportPdf?.asset?.url;

  return (
    <>
      <section className="bg-cream">
        <Container className="pt-20 md:pt-28 pb-12 md:pb-16">
          <Eyebrow as="p">{insight.displayCategory}</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-display-lg font-semibold text-balance text-slate">{insight.title}</h1>
          <p className="mt-6 max-w-(--measure) text-lg leading-relaxed text-slate/80">{insight.excerpt}</p>
          <p className="mt-6 text-sm uppercase tracking-wide text-slate/70">
            {insight.author.name} · {insight.author.role}
            {insight.publicationDate ? ` · ${formatFullDate(insight.publicationDate)}` : ""}
          </p>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="pb-20 md:pb-28">
          <div className="flex max-w-(--measure) flex-col gap-5 text-lg leading-relaxed text-slate/80">
            <PortableText value={insight.body} />
          </div>
        </Container>
      </section>

      {hasMediaCoverage && <MediaCoverageList items={insight.mediaCoverage!} />}

      {reportUrl && (
        <ReportDownload
          url={reportUrl}
          title={insight.reportTitle || "Informe completo"}
          description={insight.reportDescription}
        />
      )}

      <RelatedArticles insights={relatedInsights} />

      {/* Same approved copy as /contacto (CLAUDE.md #21) — no new CTA
          copy was approved for this placement, so this reuses it verbatim
          as a smaller, in-flow closing section rather than inventing a
          new line. */}
      <CTASection
        title="Hablemos"
        body="Contanos cómo podemos ayudar a tu equipo."
        primaryAction={<WhatsAppButton label="WhatsApp" />}
        secondaryAction={
          email ? (
            <Button href={`mailto:${email}`} variant="secondary">
              Escribinos
            </Button>
          ) : null
        }
      />
    </>
  );
}
