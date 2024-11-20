import { defineLive } from "next-sanity";
import { sanityClient } from "./sanityClient";

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient.withConfig({ apiVersion: "vX" }),
});
