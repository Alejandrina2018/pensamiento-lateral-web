import { getClient } from "./client";

type SanityFetchArgs = {
  query: string;
  params?: Record<string, unknown>;
  /** Comes from `(await draftMode()).isEnabled` at the call site — never
   * hardcoded true/false in a page. */
  preview?: boolean;
  /** Next.js cache tags, used by the revalidation webhook
   * (src/app/api/revalidate) to invalidate exactly what changed instead
   * of the whole site. Ignored in preview mode, which is never cached. */
  tags?: string[];
};

/** Thin wrapper so every query goes through the same preview/tag
 * plumbing instead of each page reaching for a client directly. */
export async function sanityFetch<Result>({
  query,
  params = {},
  preview = false,
  tags,
}: SanityFetchArgs): Promise<Result> {
  const client = getClient(preview);
  return client.fetch<Result>(query, params, preview ? { cache: "no-store" } : { next: { tags } });
}
