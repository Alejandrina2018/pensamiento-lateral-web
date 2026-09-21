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
import { AUTHORS_QUERY, PRESS_ITEMS_QUERY } from "@/sanity/lib/queries";
import { CACHE_TAGS } from "@/sanity/lib/tags";
import { formatPublicationMonth } from "@/sanity/lib/formatPublicationMonth";
import { urlFor } from "@/sanity/lib/image";
import type { PressItemResult, SanityAuthor } from "@/sanity/lib/types";

// TODO: dedicated SEO copy is pending (content/final-copy.md's "CONTENIDO
// PENDIENTE") — description reuses the approved opening paragraph.
export const metadata: Metadata = {
  title: "Quiénes somos — Pensamiento Lateral",
  description: QUIENES_SOMOS_INTRO.paragraphs[0],
};

/** Resolves a Sanity author's `image` (asset + optional hotspot) into a
 * ready-to-render URL, cropped to the 4:3 box TeamMember actually uses —
 * hotspot-aware, so a tall portrait upload still keeps the face in frame.
 * Returns undefined when no image asset is attached yet, so TeamMember
 * falls back to its usual placeholder instead of breaking. */
function toAuthorImage(author: SanityAuthor): { src: string; alt: string } | undefined {
  if (!author.image?.asset) return undefined;
  return {
    src: urlFor(author.image).width(1200).height(900).fit("crop").url(),
    alt: author.image.alt || `Foto de ${author.name}`,
  };
}

export default async function QuienesSomosPage() {
  // PL en la prensa and the team — cut over to Sanity (published
  // perspective only). Everything else on this page is still the
  // approved static copy from src/lib/data/quienes-somos.ts.
  const pressItems = await sanityFetch<PressItemResult[]>({
    query: PRESS_ITEMS_QUERY,
    tags: [CACHE_TAGS.press],
  });
  const authors = await sanityFetch<SanityAuthor[]>({
    query: AUTHORS_QUERY,
    tags: [CACHE_TAGS.authors],
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
          {/* Two columns from md: up — same Container/width system as
              every other section on this page (never narrower), but the
              paragraphs stay at a comfortable reading measure instead of
              stretching edge to edge: the closing statement takes the
              rest of the width as a large editorial callout beside them,
              not more line-length. Stacks single-column on mobile, same
              reading order as before (paragraphs, then the closing
              line). */}
          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-0">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-slate/80 md:col-span-7 md:pr-12">
              {QUIENES_SOMOS_EVOLUTION.paragraphs.map((paragraph, i) => (
                <RichText key={i} text={paragraph} />
              ))}
            </div>
            <div className="md:col-span-5 md:border-l md:border-slate/15 md:pl-12">
              <p className="text-lg font-medium text-slate/70">{QUIENES_SOMOS_EVOLUTION.leadIn}</p>
              <p className="mt-4 text-display-lg font-semibold text-balance text-slate">
                {QUIENES_SOMOS_EVOLUTION.closingStatement}
              </p>
            </div>
          </div>
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
            {authors.map((author) => (
              <TeamMember
                key={author._id}
                author={{
                  name: author.name,
                  role: author.role,
                  bio: author.bio,
                  linkedin: author.linkedin,
                  image: toAuthorImage(author),
                }}
              />
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
