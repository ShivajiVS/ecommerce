import { FC } from "react";
import { ProductsType } from "@/lib/dumyProducts";
import { ProductCard } from "./product-card";

type PropsTypes = {
  products: ProductsType[];
};

export const ProductsList: FC<PropsTypes> = ({ products }) => {
  return (
    <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-1">
      {products?.map((item: ProductsType) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  );
};
