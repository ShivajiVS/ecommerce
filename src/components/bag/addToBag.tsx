"use client";

import { notFound, useSearchParams } from "next/navigation";
import * as z from "zod";

import { Button } from "../ui/button";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useCartState } from "@/lib/store/client-store";
import { Product } from "@/types/product";
import { toast } from "../ui/use-toast";

const SearchParamsSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  price: z.coerce.number(),
  imgUrl: z.string(),
});

type PropsType = {
  product: Product;
};

const AddToBag = ({ product: { id, title, price, imgUrl } }: PropsType) => {
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const validatedSearchParams =
    SearchParamsSchema.safeParse(searchParamsObject);

  if (!validatedSearchParams.success) {
    notFound();
  }

  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCartState((state) => state.cart);
  const addToCart = useCartState((state) => state.addToCart);

  return (
    <>
      <div className="flex items-center space-x-6">
        <Button
          variant="secondary"
          onClick={() => {
            if (quantity > 1) setQuantity((quantity) => quantity - 1);
          }}
        >
          <MinusIcon />
        </Button>
        <Button className="flex-1">{quantity}</Button>
        <Button
          variant="secondary"
          onClick={() => setQuantity((quantity) => quantity + 1)}
        >
          <PlusIcon />
        </Button>
      </div>

      <Button
        className="w-full"
        onClick={() => {
          addToCart({ quantity, title, id, price, imgUrl });
          // toast('Logout successful', {
          //   duration: 1500,
          //   position: 'top-right',
          // });
        }}
      >
        ADD TO BAG
      </Button>
    </>
  );
};

export default AddToBag;
