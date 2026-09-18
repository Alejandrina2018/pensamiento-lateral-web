import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Enables Next.js Draft Mode and sends the browser to the right page for
 * whatever document was being edited. Reached only from the Studio's
 * "Open preview" action (sanity.config.ts's `productionUrl`), which
 * already computed `redirect` via resolvePreviewPath — this route's own
 * job is just to check the secret and flip the cookie on.
 *
 * The cookie draftMode() sets is httpOnly and scoped to this browser
 * session only — no other visitor is ever affected, and no Sanity token
 * is ever exposed here or sent to the client (the token lives only in
 * src/sanity/lib/client.ts's server-side draftsClient).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const redirectPath = searchParams.get("redirect") ?? "/";

  if (!process.env.SANITY_PREVIEW_SECRET || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid or missing secret", { status: 401 });
  }

  // Only ever redirect within this site — never follow an absolute URL
  // an attacker could smuggle in via the query string.
  if (!redirectPath.startsWith("/") || redirectPath.startsWith("//")) {
    return new Response("Invalid redirect path", { status: 400 });
  }

  (await draftMode()).enable();
  redirect(redirectPath);
}
