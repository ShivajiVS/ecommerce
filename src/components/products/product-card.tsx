import { FC } from "react";
import Link from "next/link";

import { ProductsType } from "@/lib/dumyProducts";
import { calculateDiscountedPrice } from "@/lib/calculateDiscountedPrice";

type PropsTypes = {
  item: ProductsType;
};

export const ProductCard: FC<PropsTypes> = ({ item }) => {
  const { title, price, imgUrl } = item;
  return (
    <Link
      href={`/product?${Object.entries(item)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`}
      prefetch={false}
      className="cursor-pointer"
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={imgUrl}
          alt={title}
          className=" transition ease-in-out hover:scale-110 h-[300px] w-[250px]"
        />
      </div>
      <div className="flex flex-col space-y-2 pt-2">
        <h2 className="font-medium text-xs tracking-tight">{title}</h2>
        <div className="text-xs font-semibold flex space-x-1">
          <p>₹{calculateDiscountedPrice(parseInt(price), 10)} </p>
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
