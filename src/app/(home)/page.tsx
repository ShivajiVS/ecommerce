import { ProductsList } from "@/components/products/productsList";
import { DumyProducts } from "@/lib/dumyProducts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-justify relative dark:bg-zinc-800">
      <ProductsList products={DumyProducts} />
    </main>
  );
}
