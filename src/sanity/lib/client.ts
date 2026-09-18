import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken } from "../env";

/**
 * Production reads. `perspective: "published"` means a draft-only
 * document is invisible here by construction — no manual
 * `!(_id in path("drafts.**"))` filtering needed in any query.
 * `useCdn: true` is fine (and preferred) here: the revalidation webhook
 * (see src/app/api/revalidate) is what keeps this fresh after a Publish,
 * not request-time cache-busting.
 */
export const publishedClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: "published",
  useCdn: true,
});

/**
 * Preview/Draft Mode reads only — never imported by a page that isn't
 * behind draftMode().isEnabled. `perspective: "drafts"` (not
 * "previewDrafts", per the approved architecture) reads the draft
 * version of a document when one exists, falling back to published
 * otherwise. Requires a token, so `useCdn` must be `false` (the CDN
 * doesn't serve authenticated/token requests), and the token itself
 * (`SANITY_API_READ_TOKEN`) is read from `env.ts`'s server-only
 * `readToken` — never `NEXT_PUBLIC_`, so it can't reach the browser.
 */
export const draftsClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: "drafts",
  useCdn: false,
  token: readToken,
});

/** Pick the right client for a given request — `preview` should come
 * from `(await draftMode()).isEnabled`, never a hardcoded flag. */
export function getClient(preview: boolean): SanityClient {
  return preview ? draftsClient : publishedClient;
}
