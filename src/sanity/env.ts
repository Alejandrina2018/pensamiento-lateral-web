/**
 * Sanity connection config, read from env vars only — never hardcoded.
 * `apiVersion` is a fixed, explicit date (never `new Date()`): pinning it
 * means a future Sanity API change can't silently alter query behavior
 * here without us bumping this string on purpose.
 */

export const apiVersion = "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/** Server-only — never prefixed NEXT_PUBLIC_, never sent to the browser. */
export const readToken = process.env.SANITY_API_READ_TOKEN;
