"use client";

import { notFound, useSearchParams } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { useCartState } from "@/lib/store/client-store";
import { Product } from "@/sanity/sanity.types";
import { sanityImageEncoder } from "@/sanity/sanityServerClient";

const sizeSchema = z.enum(["s", "m", "l", "xl", "2xl", "3xl"]);

const AddToBag = ({ _id, title, price, slug, images }: Product) => {
  const searchParams = useSearchParams();
  // const searchParamsObject = Object.fromEntries(searchParams);
  // const validatedSearchParams =
  //   SearchParamsSchema.safeParse(searchParamsObject);

  // if (!validatedSearchParams.success) {
  //   notFound();
  // }

  const size = searchParams.get("size") || "m";

  const isSizeValid = sizeSchema.safeParse(size);

  if (!isSizeValid.success) return notFound();

  const addToCart = useCartState((state) => state.addToCart);

  const image = sanityImageEncoder(images?.[0]).url();

  let quantity = 1;

  return (
    <>
      <Button
        className="w-full"
        data-testid="addToBag"
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
