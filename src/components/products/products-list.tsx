import { FC } from "react";
import { ProductsType } from "@/lib/dumyProducts";
import { ProductCard } from "./product-card";

import { Product } from "@/sanity/sanity.types";

type PropsTypes = {
  products: Product[];
};

export const ProductsList: FC<PropsTypes> = ({ products }) => {
  return (
    <div
      className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 md:gap-5 py-1"
      data-testid="products"
    >
      {products?.map((item) => <ProductCard item={item} key={item._id} />)}
    </div>
  );
};
