import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  narrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/** Editorial content grid wrapper (CLAUDE.md #39): centers content at the
 * brand's max-width and applies the responsive side gutters. */
export default function Container<T extends ElementType = "div">({
  as,
  narrow = false,
  children,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Tag = as || "div";

  return (
    <Tag
      className={`mx-auto w-full px-6 md:px-10 ${
        narrow ? "max-w-(--container-narrow)" : "max-w-(--container-content)"
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
