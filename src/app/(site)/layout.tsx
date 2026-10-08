import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getGaMeasurementId } from "@/lib/env";

/**
 * Site chrome (Header/Footer) for every public marketing page. Split out
 * from the root layout so /studio (a sibling route, outside this group)
 * renders full-bleed without them — a technical requirement of embedding
 * the Sanity Studio, with no visual effect on any existing page: the
 * route group changes nothing about the URLs or the rendered output
 * here, only where the wrapping happens.
 *
 * GA4 is mounted here (not the root layout) for the same reason: it
 * covers every public page exactly once without instrumenting /studio.
 * `<GoogleAnalytics>` injects gtag.js once per render tree and relies on
 * GA4's own History API listening for SPA page_view tracking across
 * Next.js client-side navigations — no manual pathname-change tracking
 * is added on top, to avoid double page_view events.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  const gaId = getGaMeasurementId();

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}
