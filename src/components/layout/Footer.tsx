import Link from "next/link";
import Container from "@/components/ui/Container";
import { getContactEmail } from "@/lib/env";
import { MAIN_NAV, FOOTER_NAV, SITE_NAME } from "@/lib/constants";

/** Site footer (CLAUDE.md #10, #20, #21). Structural only: link labels
 * mirror the site's own routes and nav, no marketing copy. */
export default function Footer() {
  const email = getContactEmail();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand bg-cream">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold tracking-tight text-slate">{SITE_NAME}</p>
        </div>

        <nav aria-label="Enlaces del sitio" className="flex flex-col gap-2">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate hover:text-terracotta">
              {item.label}
            </Link>
          ))}
          {FOOTER_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate/70 hover:text-terracotta">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-slate">
          {email && (
            <a href={`mailto:${email}`} className="hover:text-terracotta">
              {email}
            </a>
          )}
        </div>
      </Container>

      <Container className="border-t border-sand py-6">
        <p className="text-xs text-slate/60">
          © {year} {SITE_NAME}
        </p>
      </Container>
    </footer>
  );
}
