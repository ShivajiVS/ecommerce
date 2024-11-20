"use client";

import { notFound, useSearchParams } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "../ui/button";
import { useCartState } from "@/lib/store/client-store";
// import { Product } from "@/types/product";
import { Product } from "@/sanity/sanity.types";
import { sanityImageEncoder } from "@/sanity/sanityClient";

const SearchParamsSchema = z.object({
  size: z.string().optional(),
});

/*

  id: z.coerce.number(),
  title: z.string(),
  price: z.coerce.number(),
  size: z.string().optional(),
  imgUrl: z.string(),
*/

const AddToBag = ({ _id, title, price, slug, images }: Product) => {
  const searchParams = useSearchParams();
  // const searchParamsObject = Object.fromEntries(searchParams);
  // const validatedSearchParams =
  //   SearchParamsSchema.safeParse(searchParamsObject);

  // if (!validatedSearchParams.success) {
  //   notFound();
  // }

  const size = searchParams.get("size") || "";

  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = useCartState((state) => state.addToCart);

  const image = sanityImageEncoder(images?.[0]).url();

  return (
    <>
      <Button
        className="w-full"
        onClick={() => {
          addToCart({ id: _id, size, title, quantity, price, image, slug });
          toast("Added successful", {
            duration: 700,
          });
        }}
      >
        ADD TO BAG
      </Button>
    </>
  );
};

export default AddToBag;

// size, quantity, title, id, price, image
