import { getServerSession } from "@/auth/getServerSession";
import { db } from "@/db";
import { users } from "@/db/schema";
import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";

export default async function Page() {
  
  const PRODUCT_QUERY = defineQuery(
    `*[_type == "product"]{_id, title, slug, description,originalPrice, discountPrice,stock, sizes }|order(date desc)`
  );

  const data = await sanityFetch({ query: PRODUCT_QUERY });

  console.log(data.data);

  return (
    <div className="max-w-xl mx-auto h-96 bg-slate-500">
      {/* <p>{JSON.stringify(result)}</p> */}
    </div>
  );
}
