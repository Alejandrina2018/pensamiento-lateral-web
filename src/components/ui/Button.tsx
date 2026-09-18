import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondary-inverted";

const VARIANT_STYLES: Record<Variant, string> = {
  // The border is a fixed-contrast boundary against a dark section (e.g.
  // WhatsApp's button on /contacto's slate background), where the
  // terracotta fill alone doesn't meet WCAG 1.4.11's 3:1 non-text
  // boundary contrast. It reads as a hairline on cream (already
  // high-contrast there) and a visible edge on slate.
  primary:
    "border border-cream/40 bg-terracotta text-cream hover:bg-slate focus-visible:bg-slate",
  secondary:
    "border border-slate text-slate hover:bg-slate hover:text-cream",
  // For use on a dark (bg-slate) section, where `secondary` would blend into the background.
  "secondary-inverted":
    "border border-cream text-cream hover:bg-cream hover:text-slate",
};

const BASE_STYLES =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-(--duration-base) ease-(--ease-editorial)";

type ButtonOwnProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkProps = ButtonOwnProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

type ButtonAsButtonProps = ButtonOwnProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

type ButtonProps = LinkProps | ButtonAsButtonProps;

/** Shared CTA primitive (CLAUDE.md #37). Renders a Link when `href` is
 * passed, otherwise a native button. */
export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
