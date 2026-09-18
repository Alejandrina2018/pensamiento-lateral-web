import Link from "next/link";
import Container from "@/components/ui/Container";
import MobileMenu from "./MobileMenu";
import { MAIN_NAV, SITE_NAME } from "@/lib/constants";

/** Sticky, subtle site header (CLAUDE.md #10). No mega-menu; the
 * "Servicios" dropdown uses <details> so it works without JavaScript.
 *
 * PENDING UX DECISION (flagged by the site audit, not resolved here): here
 * "Servicios" only opens the dropdown — its own href never navigates. In
 * MobileMenu, "Servicios" is a plain link that navigates straight to
 * /investigacion. Left as-is per explicit instruction; revisit together in
 * the final navigation review. */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-cream/95 backdrop-blur">
      <Container className="relative flex items-center justify-between py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate">
          {SITE_NAME}
        </Link>

        <nav aria-label="Menú principal" className="hidden items-center gap-8 md:flex">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <details key={item.label} className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-1 text-sm text-slate marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.label}
                </summary>
                <div className="absolute left-0 top-full flex min-w-48 flex-col gap-1 border border-sand bg-cream py-3 shadow-sm">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="px-4 py-2 text-sm text-slate hover:text-terracotta"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate hover:text-terracotta"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <MobileMenu />
      </Container>
    </header>
  );
}
