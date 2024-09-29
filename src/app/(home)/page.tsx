import { ProductsList } from "@/components/products/products-list";
import { DumyProducts } from "@/lib/dumyProducts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-justify relative dark:bg-zinc-800 p-2">
      <ProductsList products={DumyProducts} />
    </main>
  );
}
