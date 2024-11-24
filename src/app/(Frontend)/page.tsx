import Carousel from "@/components/carousel";
import { Footer } from "@/components/footer";
import { ProductsList } from "@/components/products/products-list";
import { Title } from "@/components/products/title";
import { DumyProducts } from "@/lib/dumyProducts";
import { getAllProduct } from "@/sanity/queries";

export default async function Home() {
  const response = await getAllProduct();
  console.log("products daaaaa ussss ", response);
  return (
    <div className="flex flex-col relative">
      <Carousel />
      <section className="max-w-6xl mx-auto px-1 lg:px-4 space-y-8">
        <Title title="Featured Products" />
        <ProductsList products={response} />
        {/* <Title title="best selling products" />
        <ProductsList products={DumyProducts} /> */}
      </section>
      <Footer />
    </div>
  );
}
