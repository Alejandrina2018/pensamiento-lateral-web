type StructuredIndexProps = {
  terms: string[];
};

/** Datos' "De los datos a herramientas de gestión" output list, treated as
 * an editorial index/matrix rather than a tag cloud or a grid of cards —
 * ruled rows, no boxes, no radius, no shadow, no fabricated dashboard
 * (approved direction). */
export default function StructuredIndex({ terms }: StructuredIndexProps) {
  return (
    <ul className="grid grid-cols-1 border-t border-sand sm:grid-cols-2">
      {terms.map((term) => (
        <li
          key={term}
          className="border-b border-sand py-3 text-slate/80 sm:odd:pr-10 sm:even:pl-10"
        >
          {term}
        </li>
      ))}
    </ul>
  );
}
