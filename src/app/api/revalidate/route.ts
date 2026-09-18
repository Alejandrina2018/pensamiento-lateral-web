import { revalidatePath, revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { CACHE_TAGS } from "@/sanity/lib/tags";

// Next.js 16's revalidateTag requires a cache-life profile as its second
// argument. "max" — cache until explicitly revalidated — matches how
// sanityFetch tags entries (see src/sanity/lib/fetch.ts): they're meant
// to live until this exact webhook fires, not expire on a timer. Revisit
// this against the live Next.js docs once this is tested against a real
// deployment — the cache-components profile API is new.
const CACHE_PROFILE = "max";

/**
 * Sanity webhook target. Configure one webhook in the Sanity project
 * (Manage → API → Webhooks) pointing at this route, for create/update/
 * delete on insight/caseStudy/author/pressItem, with this GROQ
 * projection as the payload:
 *
 *   { "_type": _type, "_id": _id, "slug": slug.current }
 *
 * and the webhook's own secret set as SANITY_REVALIDATE_SECRET here.
 * Sanity signs every request with that secret (`sanity-webhook-signature`
 * header) — verified below before anything else runs, so this endpoint
 * can't be triggered by anyone else.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new Response("SANITY_REVALIDATE_SECRET is not configured", { status: 500 });
  }

  // Signature verification needs the raw request body text — a
  // re-serialized JSON.stringify(await request.json()) can byte-for-byte
  // differ from what Sanity signed and fail verification.
  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: { _type?: string; _id?: string; slug?: string };
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  if (!payload._type) {
    return new Response("Missing _type in payload", { status: 400 });
  }

  switch (payload._type) {
    case "insight":
      revalidateTag(CACHE_TAGS.insights, CACHE_PROFILE);
      revalidatePath("/insights");
      if (payload.slug) revalidatePath(`/insights/${payload.slug}`);
      break;
    case "caseStudy":
      revalidateTag(CACHE_TAGS.cases, CACHE_PROFILE);
      revalidatePath("/casos");
      if (payload.slug) revalidatePath(`/casos/${payload.slug}`);
      break;
    case "author":
      revalidateTag(CACHE_TAGS.authors, CACHE_PROFILE);
      revalidatePath("/quienes-somos");
      break;
    case "pressItem":
      revalidateTag(CACHE_TAGS.press, CACHE_PROFILE);
      revalidatePath("/quienes-somos");
      break;
    default:
      return new Response(`Unknown type: ${payload._type}`, { status: 400 });
  }

  return Response.json({ revalidated: true, type: payload._type, id: payload._id });
}
