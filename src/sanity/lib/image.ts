import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId: projectId ?? "", dataset: dataset ?? "production" });

/** `urlFor(image).width(800).url()` — width/quality are set per call
 * site, so next/image always gets an appropriately sized source instead
 * of the original upload. */
export function urlFor(source: Image) {
  return builder.image(source);
}
