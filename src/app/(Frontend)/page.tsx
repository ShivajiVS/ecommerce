
import { LatestProducts } from "@/components/products/latest-products";
import { ProductsList } from "@/components/products/products-list";
import { Title } from "@/components/products/title";
import { getAllProduct } from "@/sanity/queries";

export default async function Home() {
  const products = await getAllProduct();
  return (
    <div className="flex flex-col relative py-2">
      <section className="max-w-6xl mx-auto px-1 lg:px-4 space-y-8 mt-4">
        <Title title="Latest Products" />
        <LatestProducts />
        <Title title="best selling products" />
        <ProductsList products={products} />
      </section>
    </div>
  );
}
