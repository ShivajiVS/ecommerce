import AddToBag from "@/components/bag/add-to-bag";
import ProductImage from "@/components/products/product-image";
import Sizes from "@/components/products/sizes";
import { Product } from "@/types/product";

type PropsType = {
  searchParams: Product;
};

export default function Page({ searchParams }: PropsType) {
  return (
    <div className="flex flex-col lg:flex-row space-y-5 lg:space-x-10 p-2">
      <div className="flex flex-col lg:flex-row lg:w-1/2">
        <ProductImage images={["1", "2", "3", "4", "5"]} />
      </div>
      <div className="flex flex-col lg:w-1/2 space-y-10 mt-6">
        <div className="space-y-4">
          <h2 className={`font-semibold text-base`}>{searchParams?.title}</h2>
          <div className=" text-sm">{searchParams?.price} INR</div>
          <p className="text-justify text-sm">
            There is always room in your wardrobe for a casual jacket. Smart in
            the traditional sense but with an eye for the contemporary, this
            Relaxed fit jacket in color green, will make you look dressed up
            without really trying. Layering is a skill and this 100% cotton
            jacket makes it much easier to master. Size &amp; Fit Fit - Relaxed
            fit Size - Model is wearing M size Wash Care machine wash
            Specifications elevated geometric spread 100% cotton.
          </p>
          <Sizes />
        </div>
        <div className="flex flex-col space-y-4">
          <AddToBag product={searchParams} />
          {/* <Button variant="outline" className="flex space-x-3">
            <Heart /> <span>Add to wishlist</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
