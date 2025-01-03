import { FC } from "react";
import Link from "next/link";

import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice";
import { Product } from "@/sanity/sanity.types";
import { sanityImageEncoder } from "@/sanity/sanityClient";

type PropsTypes = {
  item: Product;
};

export const ProductCard: FC<PropsTypes> = ({ item }) => {
  const { title, price, discountPercentage, images, slug } = item;
  return (
    <Link
      href={`/product/${slug}`}
      className="cursor-pointer"
      data-testid="product"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={sanityImageEncoder(images[0]).url()}
          alt={title}
          className=" transition ease-in-out hover:scale-110 h-[300px] w-[250px]"
        />
      </div>
      <div className="flex flex-col space-y-2 pt-2">
        <h2 className="font-medium text-xs tracking-tight line-clamp-1">
          {title}
        </h2>
        <div className="text-xs font-semibold flex space-x-1">
          <p>₹{calculateDiscountedPrice(price, discountPercentage)} </p>
          <div className="capitalize flex space-x-1 ">
            <p className="uppercase">
              <span className="line-through">₹{price}</span>
            </p>
            <p className="font-semibold text-primary">{10}% off</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
