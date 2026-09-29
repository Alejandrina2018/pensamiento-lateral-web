import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
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
        <Container className="py-14 md:py-20">
          {/* Design-review pass: trimmed to just the closing statement —
              the title, the two evolution paragraphs and the "Hoy, cada
              estudio..." lead-in (still in QUIENES_SOMOS_EVOLUTION, for
              the record, just not rendered here) were pushing the team's
              bios too far down the page. This one line now carries the
              whole section as a compact manifesto beat, not a second
              hero: same text-display-md scale as this page's other h2/h3
              headings (never bumped up), same md:col-span-8 column width
              already used elsewhere on this page, section padding cut
              from py-20/py-28 to py-14/py-20 so it reads as a quick beat
              between "Nuestra forma de trabajar" and "Nuestro equipo",
              not a lingering stop. */}
          <div className="grid md:grid-cols-12">
            <p className="text-display-md font-semibold text-balance text-slate md:col-span-8">
              {QUIENES_SOMOS_EVOLUTION.closingStatement}
            </p>
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
