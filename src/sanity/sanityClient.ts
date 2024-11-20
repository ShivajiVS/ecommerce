import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-11-01",
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function sanityImageEncoder(source: any) {
  return builder.image(source);
}

/*
fetching data:
    *[_type=="heroImage"] : array of objects
    *[\_type=="heroImage"][0] : only first object
    example:
      const query = "\*[\_type=="heroImage"][0]"
      getData(query)
      async function getData(query: string) {
        const data = await sanityClient.fetch(query);
        return data
      }
    images :
      <image src={urlFor(data.image1).url()} />
    config: 
    images:{
      domains:["cdn.sanity.io"]
    }
    *[_type=="product"] : all products
    *[_type=="product"][0...4] :4 products
    *[_type=="product"][0...4]{
      _id,
      price,
      title,
      description,
      "slug":slug.current,
      "categoryName":category->name,
      "imageUrl":image[0].asset->url
    }
   *[_type=="product"][0...4] | order(_createdAt asc)
   *[_type=="product" && category->name=="men"]

 
    ArrowRight icon for see more products.



*/
async function getData(query: string) {
  const data = await sanityClient.fetch(query);
  return data;
}
