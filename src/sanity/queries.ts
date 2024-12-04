import { sanityServerClient } from "@/sanity/sanityServerClient";
import { Product } from "./sanity.types";

export async function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
     _id,
     title,
     description,
     more,
     images,
     "slug": slug.current,
     "category": category-> title,
     sizes,
     price,
     discountPercentage,
     stock,
 }`;

  const data = await sanityServerClient.fetch<Product>(query);

  return data;
}

export async function getAllProduct() {
  const query = `*[_type == "product"][0...8] | order(_createdAt desc) {
    _id,
    title,
    price,
    discountPercentage,
    "slug": slug.current,
    "category": category->title,
    images,
  }`;

  // "imageUrl": images[0].asset->url

  const data = await sanityServerClient.fetch<Product[]>(query);
  return data;
}

export async function getAllProductByCategory(category: string) {
  const query = `*[_type == "product" && category == "${category}" ][0...8] | order(_createdAt desc) {
    _id,
    title,
    price,
    discountPercentage,
    "slug": slug.current,
    "category": category->title,
    "imageUrl": images[0].asset->url
  }`;

  const data = await sanityServerClient.fetch<Product[]>(query);
  return data;
}

export async function getLatestProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc)[0...8] {
    _id,
    title,
    price,
    discountPercentage,
    "slug": slug.current,
    "category": category->title,
    images,
  }`;

  const data = await sanityServerClient.fetch<Product[]>(query);
  return data;
}

export async function getAllProductSlugs() {
  const query = `*[_type == "product"]{
    "slug": slug.current,
}`;

  const data = await sanityServerClient.fetch<Product[]>(query);
  return data;
}
