import AddToBag from "@/components/bag/add-to-bag";
import ProductImage from "@/components/products/product-image";
import Sizes from "@/components/products/sizes";
import { Product } from "@/sanity/sanity.types";
import { sanityClient } from "@/sanity/sanityClient";
import { PortableText } from "next-sanity";
import React from "react";

async function getProductBySlug(slug: string) {
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

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(slug);

  console.log("ddd", product.images);

  return (
    <div className="w-full flex flex-col lg:flex-row space-y-5 lg:space-x-10 h-full">
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2">
        <ProductImage images={product.images}/>
      </div>
      <div className="flex flex-col lg:w-1/2 space-y-10 mt-6 px-2">
        <div className="space-y-4">
          <h2 className={`font-semibold text-base tracking-tight`}>
            {product?.title}
          </h2>
          <div className=" text-sm">{product?.price} INR</div>

          {product?.description && product?.description.length > 0 && (
            <div className="text-justify text-sm prose max-w-none">
              <PortableText value={product?.description} />
            </div>
          )}
          <Sizes sizes={product?.sizes} />
        </div>
        <div className="flex flex-col space-y-4">
          {/* <AddToBag product={searchParams} /> */}
        </div>
      </div>
    </div>
  );
}
