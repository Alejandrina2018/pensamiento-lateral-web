import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Required for next/image to optimize Sanity-hosted assets (e.g.
    // author.image) — cdn.sanity.io serves every project's uploaded
    // images at this one host, under /images/<projectId>/<dataset>/...
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
};

export default nextConfig;
