import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { resolvePreviewPath } from "@/sanity/lib/previewUrl";

// Embedded Studio, served at /studio (see src/app/studio/[[...tool]]/page.tsx).
// Only the 4 CMS-managed types live here — see schemaTypes/index.ts.
export default defineConfig({
  name: "pensamiento-lateral",
  title: "Pensamiento Lateral",

  projectId: projectId ?? "",
  dataset: dataset ?? "production",
  apiVersion,

  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Powers the Studio's "Open preview" action — routes to the right
    // page per document type (point 11), through /api/draft so it also
    // enables Next.js Draft Mode on the way.
    productionUrl: async (prev, context) => {
      const { document } = context;
      const path = resolvePreviewPath(document as never);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      const secret = process.env.SANITY_PREVIEW_SECRET;
      if (!secret) return prev;

      const url = new URL("/api/draft", siteUrl);
      url.searchParams.set("secret", secret);
      url.searchParams.set("redirect", path);
      return url.toString();
    },
  },
});
