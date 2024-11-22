import React from "react";
import { PortableText } from "next-sanity";

import AddToBag from "@/components/bag/add-to-bag";
import ProductImage from "@/components/products/product-image";
import Sizes from "@/components/products/sizes";
import { getProductBySlug } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const priceO = product?.price - product?.price / 100;

  return (
    <div className="w-full flex flex-col lg:flex-row space-y-3 lg:space-x-7 h-full">
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2">
        <ProductImage images={product.images} />
      </div>
      <div className="flex flex-col lg:w-1/2 space-y-10 mt-6 px-2">
        <div className="space-y-2">
          <h2 className={`font-semibold text-2xl tracking-tight capitalize `}>
            {product?.title}
          </h2>
          <section>
            <div className="flex flex-row space-x-2 items-center md:flex-col md:items-start md:space-x-0 md:space-y-1">
              <p className="text-base md:text-2xl font-bold">
                ₹
                {calculateDiscountedPrice(
                  product?.price,
                  product?.discountPercentage as number
                )}{" "}
                INR
              </p>
              <div className="capitalize flex space-x-1 text-sm text-primary">
                <p className="uppercase">
                  mrp <span className="line-through">₹{product?.price}</span>
                </p>
                <p className="font-semibold">
                  ({product?.discountPercentage}% off)
                </p>
              </div>
            </div>
            <p className="text-xs mt-0.5">Price inclusive of all taxes</p>
          </section>

          {product?.description && product?.description.length > 0 && (
            <>
              <div className="text-justify text-sm prose max-w-none">
                <h3 className="text-sm font-bold mb-1 text-[#406786]">
                  Product Description
                </h3>
                <PortableText value={product?.description} />
              </div>
            </>
          )}
          <Sizes sizes={product?.sizes} />
        </div>
        <div className="flex flex-col space-y-4">
          <AddToBag {...product} />
        </div>
      </div>
    </div>
  );
}
