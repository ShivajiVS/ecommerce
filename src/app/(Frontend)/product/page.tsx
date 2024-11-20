import AddToBag from "@/components/bag/add-to-bag";
import ProductImage from "@/components/products/product-image";
import Sizes from "@/components/products/sizes";
import { sanityClient } from "@/sanity/sanityClient";
import { Product } from "@/types/product";

type PropsType = {
  searchParams: Promise<Product>;
};



export default async function Page(props: PropsType) {
  const searchParams = await props.searchParams;

  const query = `*[_type == "product" && slug.current == "${searchParams}"][0] {
    _id,
     title,
     description,
     images,
     "slug": slug.current,
     "category": category-> title,
     sizes,
     price,
     discountPercentage,
     stock,
 }`;

  const data = await sanityClient.fetch(query);

  /*
  
    const query = `*[_type == "product"][0...8] | order(_createdAt desc) {
        _id,
        title,
        price,
        "slug": slug.current,
        "category": category->title,
        "imageUrl": images[0].asset->url
      }`;

    const data = await client.fetch(query);

  */

  return (
    <div className="w-full flex flex-col lg:flex-row space-y-5 lg:space-x-10 h-full">
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2">
        <ProductImage />
      </div>
      <div className="flex flex-col lg:w-1/2 space-y-10 mt-6 px-2">
        <div className="space-y-4">
          <h2 className={`font-semibold text-base tracking-tight`}>
            {searchParams?.title}
          </h2>
          <div className=" text-sm">{searchParams?.price} INR</div>
          <p className="text-justify text-sm line-clamp-6">
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
        </div>
      </div>
    </div>
  );
}
