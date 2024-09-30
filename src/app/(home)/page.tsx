import { Footer } from "@/components/footer";
import { ProductsList } from "@/components/products/products-list";
import { DumyProducts } from "@/lib/dumyProducts";

export default function Home() {
  return (
    <div className="flex flex-col text-justify relative p-2 lg:p-4">
      <ProductsList products={DumyProducts} />
      <Footer />
    </div>
  );
}
