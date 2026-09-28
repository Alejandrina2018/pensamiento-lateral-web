import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Explicit allow rules for the AI/search crawlers named in CLAUDE.md #29
// (GEO — don't rely on the generic "*" rule alone to cover them), plus the
// generic rule for everyone else. /studio (Sanity Studio) and /api/* (draft
// mode, revalidation webhook) are operational routes, never meant to be
// indexed.
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/studio", "/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
