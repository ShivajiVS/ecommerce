import React from "react";

import { ProductsType } from "@/lib/dumyProducts";
import { ProductCard } from "./productCard";

type PropsTypes = {
  products: ProductsType[];
};

export const ProductsList: React.FC<PropsTypes> = ({ products }) => {
  return (
    <div className="w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-5 lg:px-10 py-3">
      {products?.map((item: ProductsType) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  );
};
