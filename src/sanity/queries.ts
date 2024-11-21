import { sanityClient } from "@/sanity/sanityClient";
import { Product } from "./sanity.types";

export async function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
     title,
     description,
     images,
     "slug": slug.current,
     "category": category-> title,
     sizes,
     price,
     discountPercentage,
     stock,
 }`;

  const data = await sanityClient.fetch<Product>(query);

  return data;
}

export async function getAllProduct() {}

export async function getAllProductByCategory() {}
