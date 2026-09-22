import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";

type BrandMarkProps = {
  /** Header and Footer want slightly different sizes ("similar o
   * ligeramente mayor" in the footer) — passed in rather than hardcoded
   * so this stays the one place that owns the lockup's structure. */
  markClassName: string;
  textClassName?: string;
  className?: string;
};

/** The "P" isotype + wordmark lockup used in Header and Footer — always
 * one link to "/", never two separately-clickable pieces. The isotype's
 * alt is empty on purpose: it's decorative inside a link whose accessible
 * name already comes from the visible "Pensamiento Lateral" text, so a
 * screen reader announces the name once, not twice. */
export default function BrandMark({ markClassName, textClassName = "", className = "" }: BrandMarkProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/images/brand/pensamiento-lateral-mark.png"
        alt=""
        width={277}
        height={377}
        className={`w-auto ${markClassName}`}
      />
      <span className={`font-semibold tracking-tight text-slate ${textClassName}`}>{SITE_NAME}</span>
    </Link>
  );
}
