import Image from "next/image";
import type { Author } from "@/types/content";
import CaseImagePlaceholder from "@/components/case/CaseImagePlaceholder";

type TeamMemberProps = {
  author: Author;
};

/** Equal-weight profile block — no card, no avatar/illustration/stock.
 * `author.image` (resolved from Sanity's `author.image` at the page
 * boundary, hotspot-cropped) renders as a real photo in a short,
 * editorial aspect-[4/3] box when present; falls back to the usual
 * placeholder otherwise — same optional-image pattern as CasePreview.
 * LinkedIn renders as plain text (CLAUDE.md's pending-content rule)
 * until a real URL exists, so it never becomes a dead link. */
export default function TeamMember({ author }: TeamMemberProps) {
  return (
    <div className="flex flex-col gap-6">
      {author.image ? (
        <div className="relative aspect-[4/3] overflow-hidden border border-sand">
          <Image
            src={author.image.src}
            alt={author.image.alt}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      ) : (
        <CaseImagePlaceholder label={author.name} aspect="landscape" kind="photo" />
      )}
      <div>
        <h3 className="text-2xl font-semibold text-slate">{author.name}</h3>
        <p className="mt-1 text-sm font-medium uppercase tracking-widest text-slate/60">{author.role}</p>
        <p className="mt-4 max-w-(--measure) leading-relaxed text-slate/80">{author.bio}</p>
        {author.linkedin ? (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-slate"
          >
            LinkedIn
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <p className="mt-4 text-sm font-medium text-slate/70">LinkedIn</p>
        )}
      </div>
    </div>
  );
}
