import { getLatestProducts } from "@/sanity/queries";
import { ProductsList } from "./products-list";

export const LatestProducts = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      {/* <h2 className="font-bold text-xl lg:text-2xl tracking-tight text-center capitalize mb-2.5">
        New Arrivals
      </h2> */}
      <ProductsList products={latestProducts} />;
    </div>
  );
};
