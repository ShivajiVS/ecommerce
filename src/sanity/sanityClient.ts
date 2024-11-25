import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "f2jggqsm",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function sanityImageEncoder(source: any) {
  return builder.image(source);
}
