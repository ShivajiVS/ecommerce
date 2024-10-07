"use client";

import { notFound, useSearchParams } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "../ui/button";
import { useCartState } from "@/lib/store/client-store";
import { Product } from "@/types/product";

const SearchParamsSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  price: z.coerce.number(),
  size: z.string().optional(),
  imgUrl: z.string(),
});

type PropsType = {
  product: Product;
};

const AddToBag = ({
  product: { id, title, price, imgUrl, size },
}: PropsType) => {
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const validatedSearchParams =
    SearchParamsSchema.safeParse(searchParamsObject);

  if (!validatedSearchParams.success) {
    notFound();
  }

  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = useCartState((state) => state.addToCart);

  return (
    <>
      <Button
        className="w-full"
        onClick={() => {
          addToCart({ size, quantity, title, id, price, imgUrl });
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
