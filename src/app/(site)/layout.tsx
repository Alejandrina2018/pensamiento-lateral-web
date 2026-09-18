import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Site chrome (Header/Footer) for every public marketing page. Split out
 * from the root layout so /studio (a sibling route, outside this group)
 * renders full-bleed without them — a technical requirement of embedding
 * the Sanity Studio, with no visual effect on any existing page: the
 * route group changes nothing about the URLs or the rendered output
 * here, only where the wrapping happens.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
