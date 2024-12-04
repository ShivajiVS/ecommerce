import { getLatestProducts } from "@/sanity/queries";
import { ProductsList } from "./products-list";
import { Title } from "@radix-ui/react-toast";

export const LatestProducts = async () => {
  const latestProducts = await getLatestProducts();

  console.log("products", latestProducts);

  return (
    <>
      <ProductsList products={latestProducts} />;
    </>
  );
};
