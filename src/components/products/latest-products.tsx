import { getLatestProducts } from "@/sanity/queries";
import { ProductsList } from "./products-list";
import { Title } from "@radix-ui/react-toast";

export const LatestProducts = async () => {
  const latestProducts = await getLatestProducts();

  console.log("products", latestProducts);

  return (
    <div>
      <h2 className="font-bold text-xl tracking-tight text-center capitalize mb-4">
        New Arrivals
      </h2>
      <ProductsList products={latestProducts} />;
    </div>
  );
};
