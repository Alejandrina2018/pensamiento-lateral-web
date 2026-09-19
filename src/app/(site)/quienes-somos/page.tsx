import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RichText from "@/components/ui/RichText";
import PrincipleList from "@/components/service/PrincipleList";
import TeamMember from "@/components/team/TeamMember";
import PressItem from "@/components/press/PressItem";
import {
  QUIENES_SOMOS_INTRO,
  QUIENES_SOMOS_APPROACH,
  QUIENES_SOMOS_PRINCIPLES,
  QUIENES_SOMOS_EVOLUTION,
  QUIENES_SOMOS_TEAM,
  QUIENES_SOMOS_PRESS,
} from "@/lib/data/quienes-somos";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PRESS_ITEMS_QUERY } from "@/sanity/lib/queries";
import { CACHE_TAGS } from "@/sanity/lib/tags";
import { formatPublicationMonth } from "@/sanity/lib/formatPublicationMonth";
import type { PressItemResult } from "@/sanity/lib/types";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE") — description reuses the approved opening paragraph.
export const metadata: Metadata = {
  title: "Quiénes somos — Pensamiento Lateral",
  description: QUIENES_SOMOS_INTRO.paragraphs[0],
};

export default async function QuienesSomosPage() {
  // PL en la prensa — first content cut over to Sanity (published
  // perspective only). Everything else on this page is still the
  // approved static copy from src/lib/data/quienes-somos.ts.
  const pressItems = await sanityFetch<PressItemResult[]>({
    query: PRESS_ITEMS_QUERY,
    tags: [CACHE_TAGS.press],
  });

  return (
    <>
      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <Eyebrow>Quiénes somos</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-display-lg font-semibold text-balance text-slate">
            {QUIENES_SOMOS_INTRO.title}
          </h1>
          <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
            {QUIENES_SOMOS_INTRO.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <Eyebrow as="h2">{QUIENES_SOMOS_APPROACH.title}</Eyebrow>
          <h3 className="mt-4 text-display-md font-semibold text-slate">{QUIENES_SOMOS_APPROACH.subtitle}</h3>
          <div className="mt-6 flex max-w-(--measure) flex-col gap-4 text-lg leading-relaxed text-slate/80">
            {QUIENES_SOMOS_APPROACH.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12">
            <PrincipleList principles={QUIENES_SOMOS_PRINCIPLES} />
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-20 md:py-28">
          <h2 className="max-w-3xl text-display-md font-semibold text-balance text-slate">
            {QUIENES_SOMOS_EVOLUTION.title}
          </h2>
          <div className="mt-8 flex max-w-(--measure) flex-col gap-6 text-lg leading-relaxed text-slate/80">
            {QUIENES_SOMOS_EVOLUTION.paragraphs.map((paragraph, i) => (
              <RichText key={i} text={paragraph} />
            ))}
          </div>
          <p className="mt-12 text-lg font-medium text-slate/70">{QUIENES_SOMOS_EVOLUTION.leadIn}</p>
          <p className="mt-4 max-w-4xl text-display-xl font-semibold text-balance text-slate">
            {QUIENES_SOMOS_EVOLUTION.closingStatement}
          </p>
        </Container>
      </section>

      <section className="bg-sand/40">
        <Container className="py-20 md:py-28">
          <Eyebrow as="h2">{QUIENES_SOMOS_TEAM.title}</Eyebrow>
          <h3 className="mt-4 max-w-2xl text-display-md font-semibold text-balance text-slate">
            {QUIENES_SOMOS_TEAM.subtitle}
          </h3>
          <p className="mt-6 max-w-(--measure) text-lg leading-relaxed text-slate/80">{QUIENES_SOMOS_TEAM.intro}</p>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            {QUIENES_SOMOS_TEAM.members.map((author) => (
              <TeamMember key={author.name} author={author} />
            ))}
          </div>
        </Container>
      </section>

      <section id="prensa" className="bg-cream">
        <Container className="py-20 md:py-28">
          <Eyebrow as="h2">{QUIENES_SOMOS_PRESS.title}</Eyebrow>
          <h3 className="mt-4 text-display-md font-semibold text-slate">{QUIENES_SOMOS_PRESS.subtitle}</h3>
          <div className="mt-10">
            {pressItems.map((item) => (
              <PressItem
                key={item._id}
                item={{
                  title: item.title,
                  publication: item.publication,
                  date: formatPublicationMonth(item.publicationMonth),
                  excerpt: item.excerpt,
                  externalUrl: item.url,
                }}
              />
            ))}
          </div>
          {/* allPressCtaLabel stays in the data for when a /prensa
              destination exists — no CTA without an action (approved
              correction), so it isn't rendered here. */}
        </Container>
      </section>
    </>
  );
}
