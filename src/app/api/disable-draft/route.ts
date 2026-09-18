import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Exits preview — clears the Draft Mode cookie and sends the editor
 * back to the public, published-only view of the same page. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectPath = searchParams.get("redirect") ?? "/";

  (await draftMode()).disable();

  if (!redirectPath.startsWith("/") || redirectPath.startsWith("//")) {
    redirect("/");
  }
  redirect(redirectPath);
}
