import { Slug } from "@/sanity/sanity.types";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  slug: Slug | undefined;
};
