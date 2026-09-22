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

// Temporary fallback while these two authors don't have a Sanity image
// yet — keyed by the author's Sanity `slug` (stable identifier, not the
// display name). Remove an entry once its Sanity author.image is set;
// toAuthorImage already prefers Sanity first, so nothing else changes.
//
// objectPosition is measured per photo, not guessed: TeamMember's box is
// aspect-[4/3], both source photos are taller/more-square than that, so
// object-cover's default center crop removes ~150-155px (Alejandrina) /
// ~117px (Ángeles) off the top in original-image pixels — enough to cut
// into the hair. Each value below anchors the crop close to the top
// instead (a small vertical percentage, not "top" outright) so only a
// little is trimmed above the hairline — leaving a small air margin —
// and the rest of the crop comes off the bottom (shoulders/torso, never
// the face). The two values differ because the photos differ; neither
// is a guess — see the design-review report for the source measurements.
const LOCAL_TEAM_PHOTO_FALLBACK: Record<string, { src: string; objectPosition: string }> = {
  "alejandrina-chichizola": { src: "/images/team/alejandrina-chichizola.jpg", objectPosition: "center 18%" },
  "angeles-calandri": { src: "/images/team/angeles-calandri.jpg", objectPosition: "center 13%" },
};

/** Resolves a team photo with three tiers, in order: Sanity `author.image`
 * (asset + optional hotspot — Sanity's own crop already respects the
 * hotspot, so no extra object-position is needed here) → a local
 * fallback file for the two authors who don't have one in Sanity yet,
 * each with its own measured object-position so the 4:3 crop never cuts
 * into the head → undefined, which makes TeamMember fall back to its
 * usual placeholder. Never hardcodes a photo inside TeamMember itself. */
function toAuthorImage(author: SanityAuthor): { src: string; alt: string; objectPosition?: string } | undefined {
  if (author.image?.asset) {
    return {
      src: urlFor(author.image).width(1200).height(900).fit("crop").url(),
      alt: author.image.alt || `Foto de ${author.name}`,
    };
  }
  const fallback = LOCAL_TEAM_PHOTO_FALLBACK[author.slug];
  if (fallback) {
    return { src: fallback.src, alt: `Foto de ${author.name}`, objectPosition: fallback.objectPosition };
  }
  return undefined;
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
          {/* Vertical editorial read, not a two-column split (design-review
              correction — the side-by-side version read as two
              disconnected halves). Paragraphs and the closing statement
              share the same md:col-span-8 column (~8/12 of the grid),
              so both align to the same left edge and read as one block
              at a width comparable to Nuestro equipo below — wider than
              the page's usual --measure column, short of the full
              container. The statement was previously text-display-xl
              (hero scale, ~2x the H1) — a second design-review pass
              brought it down to text-display-md, the same scale as this
              page's own h2/h3 section headings, so it reads as a strong
              editorial conclusion without competing with the H1. */}
          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-slate/80 md:col-span-8">
              {QUIENES_SOMOS_EVOLUTION.paragraphs.map((paragraph, i) => (
                <RichText key={i} text={paragraph} />
              ))}
            </div>
          </div>
          <div className="mt-16 grid md:grid-cols-12 md:mt-20">
            <div className="md:col-span-8">
              <p className="text-lg font-medium text-slate/70">{QUIENES_SOMOS_EVOLUTION.leadIn}</p>
              <p className="mt-4 text-display-md font-semibold text-balance text-slate">
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
