import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// TODO: SEO metadata (titles/descriptions/OG) per page is explicitly pending —
// content/final-copy.md lists it under "CONTENIDO PENDIENTE / NO INVENTAR".
export const metadata: Metadata = {
  title: "Pensamiento Lateral",
  description: "Pensamiento Lateral — investigación y datos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
