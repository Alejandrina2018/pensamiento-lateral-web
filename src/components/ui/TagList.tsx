type TagListProps = {
  tags: string[];
  className?: string;
};

/** A single line of related terms, separated by middots — used for
 * methodology tools, service sub-areas, etc. Plain text, never chips. */
export default function TagList({ tags, className = "" }: TagListProps) {
  return <p className={`text-sm leading-relaxed text-slate/60 ${className}`}>{tags.join(" · ")}</p>;
}
