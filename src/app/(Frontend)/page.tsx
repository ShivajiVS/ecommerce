import Carousel from "@/components/carousel";
import { Footer } from "@/components/footer";
import { FAQSection } from "@/components/fqs-section";
import { LatestProducts } from "@/components/products/latest-products";
import { ProductsList } from "@/components/products/products-list";
import { Title } from "@/components/products/title";
import { getAllProduct } from "@/sanity/queries";

export default async function Home() {
  const products = await getAllProduct();

  return (
    <div className="flex flex-col relative">
      <Carousel />
      <section className="max-w-6xl mx-auto px-3 space-y-5 mt-3">
        <div className="text-center space-y-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-1">
              Latest Products
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Discover our newest arrivals
            </p>
          </div>
          <LatestProducts />
        </div>

        <div className="text-center">
          <h2 className="font-bold text-xl lg:text-2xl tracking-tight capitalize mb-3">
            Best Selling Products
          </h2>
          <ProductsList products={products} />
        </div>

        <FAQSection />
      </section>

      <Footer />
    </div>
  );
}
