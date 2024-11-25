import { defineLive } from "next-sanity";
import { sanityServerClient } from "./sanityServerClient";

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityServerClient.withConfig({ apiVersion: "vX" }),
});
