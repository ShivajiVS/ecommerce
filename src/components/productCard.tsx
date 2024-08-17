import React from "react";

import { ProductsType } from "@/lib/dumyProducts";
import Link from "next/link";

type PropsTypes = {
  item: ProductsType;
};

export const ProductCard: React.FC<PropsTypes> = ({ item }) => {
  const { title, price, imgUrl } = item;

  // Object.entries(article)
  //           .map(([key, value]) => `${key}=${value}`)
  //           .join('&')
  return (
    <Link
      href={`/products?${Object.entries(item)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`}
      prefetch={false}
      className="flex flex-col space-y-2 cursor-pointer"
    >
      <img src={imgUrl} alt={title} className="lg:h-[366px] lg:w-[244px]" />
      <h2 className="font-semibold text-base">{title}</h2>
      <div className=" text-sm">{price}</div>
    </Link>
  );
};
