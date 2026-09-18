import type { Author } from "@/types/content";
import CaseImagePlaceholder from "@/components/case/CaseImagePlaceholder";

type TeamMemberProps = {
  author: Author;
};

/** Equal-weight profile block — no card, no avatar/illustration/stock. Photo
 * placeholder swaps for a real portrait later in the same slot. LinkedIn
 * renders as plain text (CLAUDE.md's pending-content rule) until a real
 * URL exists, so it never becomes a dead link. */
export default function TeamMember({ author }: TeamMemberProps) {
  return (
    <div className="flex flex-col gap-6">
      <CaseImagePlaceholder label={author.name} aspect="portrait" kind="photo" />
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
