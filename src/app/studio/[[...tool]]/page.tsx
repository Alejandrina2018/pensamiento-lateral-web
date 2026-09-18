"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

/**
 * Embedded Studio at /studio — outside the (site) route group, so it
 * renders without Header/Footer (see src/app/(site)/layout.tsx).
 */
export default function StudioPage() {
  return (
    <div className="h-screen flex-1">
      <NextStudio config={config} />
    </div>
  );
}
