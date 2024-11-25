import React from "react";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";

import AddToBag from "@/components/bag/add-to-bag";
import ProductImage from "@/components/products/product-image";
import Sizes from "@/components/products/sizes";
import { getProductBySlug } from "@/sanity/queries";
import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <div className="w-full flex flex-col lg:flex-row space-y-3 lg:space-x-7 h-full relative lg:px-3 pt-3">
      {/* product image */}
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2">
        <ProductImage images={product.images} />
      </div>
      {/* product description */}
      <div className="flex flex-col lg:w-1/2 gap-y-3 mt-6 px-2">
        <div className="space-y-4">
          <h2
            className={`font-semibold text-lg lg:text-2xl tracking-tight capitalize `}
          >
            {product?.title}
          </h2>

          <section>
            <div className="flex flex-row space-x-2.5 items-center md:flex-col md:items-start md:space-x-0 md:space-y-2">
              <p className="text-base md:text-2xl font-bold">
                ₹
                {calculateDiscountedPrice(
                  product?.price,
                  product?.discountPercentage as number
                )}{" "}
                INR
              </p>
              <div className="capitalize flex space-x-1.5 text-sm text-primary">
                <p className="uppercase">
                  mrp <span className="line-through">₹{product?.price}</span>
                </p>
                <p className="font-semibold">
                  ({product?.discountPercentage}% off)
                </p>
              </div>
            </div>
            <p className="text-xs mt-2">Price inclusive of all taxes</p>
          </section>
        </div>

        <section>
          <h3 className="text-base font-bold mb-1 text-[#406786]">
            Description
          </h3>
          <p className="text-xs pr-5 mt-1.5 text-justify leading-5 hyphens-auto">
            {product.description}
          </p>
        </section>
        <section className="mt-4">
          <Sizes sizes={product?.sizes} />
        </section>

        <section className="mt-5 hidden md:block">
          <AddToBag {...product} />
        </section>

        <section className="mt-6 mb-32 border-t-2 pt-5 ">
          {product?.more && (
            <>
              <h3 className="text-base font-bold mb-1 text-[#406786]">
                More Details
              </h3>
              <div className="text-justify text-sm prose max-w-none">
                <PortableText value={product?.more} />
              </div>
            </>
          )}
        </section>
      </div>

      <div className="bg-zinc-100 dark:bg-slate-700 w-full fixed bottom-0 left-0 right-0 h-16 flex flex-col justify-center drop-shadow-md md:hidden px-4">
        <AddToBag {...product} />
      </div>
    </div>
  );
}
