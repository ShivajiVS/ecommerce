"use client";

import { Button } from "@/components/ui/button";
import { ProductsType } from "@/lib/dumyProducts";
import { Heart } from "lucide-react";

type PropsTypes = {
  searchParams?: ProductsType;
};

export default function Page({ searchParams }: PropsTypes) {
  return (
    <div className="flex flex-col lg:flex-row space-y-5 lg:space-x-10">
      <div>
        <img
          src={searchParams?.imgUrl}
          alt={searchParams?.title}
          className="h-[500px] mx-6"
        />
      </div>
      <div className="flex flex-col lg:w-1/2 space-y-10 mt-6">
        <div className="space-y-3">
          <h2 className="font-semibold text-base">{searchParams?.title}</h2>
          <div className=" text-sm">{searchParams?.price} INR</div>
          <p className="text-justify">
            There is always room in your wardrobe for a casual jacket. Smart in
            the traditional sense but with an eye for the contemporary, this
            Relaxed fit jacket in color green, will make you look dressed up
            without really trying. Layering is a skill and this 100% cotton
            jacket makes it much easier to master. Size &amp; Fit Fit - Relaxed
            fit Size - Model is wearing M size Wash Care machine wash
            Specifications elevated geometric spread 100% cotton.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Button>ADD TO BAG</Button>
          <Button variant="outline" className="flex space-x-3">
            <Heart /> <span>Add to wishlist</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
