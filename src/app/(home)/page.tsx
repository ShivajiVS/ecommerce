import Carousel from "@/components/carousel";
import { Footer } from "@/components/footer";
import { ProductsList } from "@/components/products/products-list";
import { Title } from "@/components/products/title";
import { DumyProducts } from "@/lib/dumyProducts";

export default function Home() {
  return (
    <div className="flex flex-col relative p-2">
      <Carousel />
      <section className="max-w-6xl mx-auto px-2 lg:px-4 space-y-8">
        <Title title="weekly featured products" />
        <ProductsList products={DumyProducts} />
        <Title title="best selling products" />
        <ProductsList products={DumyProducts} />
      </section>

      <Footer />
    </div>
  );
}
