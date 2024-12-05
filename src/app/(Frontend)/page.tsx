import { Footer } from "@/components/footer";
import { FAQSection } from "@/components/fqs-section";
import { LatestProducts } from "@/components/products/latest-products";
import { ProductsList } from "@/components/products/products-list";
import { Title } from "@/components/products/title";
import { getAllProduct } from "@/sanity/queries";

export default async function Home() {
  const products = await getAllProduct();
  return (
    <div className="flex flex-col relative py-2">
      <section className="max-w-6xl mx-auto px-1 lg:px-4 space-y-8 mt-4">
        <img src="/desktop_banner.png" alt="" />
        <LatestProducts />
        <h2 className="font-bold text-xl lg:text-2xl tracking-tight text-center capitalize mb-2.5">
          best selling products
        </h2>
        <ProductsList products={products} />
        <FAQSection />
      </section>
      <Footer />
    </div>
  );
}
