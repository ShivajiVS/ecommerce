import React, { Suspense } from "react";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";

import AddToBag from "@/components/bag/add-to-bag";
import ProductImage from "@/components/products/product-image";
import Sizes from "@/components/products/sizes";
import { getAllProductSlugs, getProductBySlug } from "@/sanity/queries";
import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice";
import { sleep } from "@/lib/sleep";
import { ProductDescription } from "@/components/products/product-description";

export async function generateStaticParams() {
  const productsSlugs = await getAllProductSlugs();

  if (productsSlugs) return productsSlugs;

  return [];
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(slug);

  sleep(10000);

  if (!product) return notFound();

  return (
    <div className="w-full flex flex-col lg:flex-row space-y-3 lg:space-x-7 h-full relative pt-3">
      {/* product image */}
      <div className="flex flex-col lg:flex-row w-full lg:w-3/5">
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
                  product?.discountPercentage
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
          <h3 className="text-base font-bold mb-1 text-[#406786] dark:text-white">
            Description
          </h3>
          <p className="text-xs pr-5 mt-1.5 text-justify leading-6 hyphens-auto">
            {product.description}
          </p>
        </section>

        <section className="pr-4">
          {product?.more && (
            <ProductDescription>
              <div className="text-justify text-sm prose max-w-none">
                <PortableText value={product?.more} />
              </div>
            </ProductDescription>
          )}
        </section>
        <section className="mt-4 mb-32 lg:mb-0">
          <Suspense>
            <Sizes sizes={product?.sizes} />
          </Suspense>
        </section>

        <section className="mt-10 hidden md:block md:mb-7">
          <Suspense>
            <AddToBag {...product} />
          </Suspense>
        </section>
      </div>

      <div className="bg-zinc-100 dark:bg-slate-700 w-full fixed bottom-0 left-0 right-0 h-16 flex flex-col justify-center drop-shadow-md md:hidden px-4">
        <Suspense>
          <AddToBag {...product} />
        </Suspense>
      </div>
    </div>
  );
}
