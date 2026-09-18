"use client";

import { useState } from "react";
import Link from "next/link";
import { MAIN_NAV, FOOTER_NAV } from "@/lib/constants";

/** Mobile nav trigger + panel (CLAUDE.md #10). No hover dependency;
 * keyboard and touch operable.
 *
 * PENDING UX DECISION (flagged by the site audit, not resolved here): here
 * "Servicios" is a plain link that navigates straight to /investigacion —
 * its children render as a separate list below it, never a toggle. In
 * Header, the desktop "Servicios" only opens the dropdown and never
 * navigates on its own. Left as-is per explicit instruction; revisit
 * together in the final navigation review. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-px w-6 bg-slate transition-transform duration-(--duration-base) ease-(--ease-editorial) ${
            open ? "translate-y-[3.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-px w-6 bg-slate transition-transform duration-(--duration-base) ease-(--ease-editorial) ${
            open ? "-translate-y-[3.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Menú principal"
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-sand bg-cream px-6 py-6"
        >
          {MAIN_NAV.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg text-slate"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="flex flex-col gap-1 pb-2 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="py-2 text-sm text-slate/80"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {FOOTER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-slate/70"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
