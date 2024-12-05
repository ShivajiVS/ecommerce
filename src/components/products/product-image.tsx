"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {  useEffect, useState } from "react";
import { sanityImageEncoder } from "@/sanity/sanityClient";

interface CarouselProps {
  images: any;
}

const ProductImage = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const loadNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const loadPreviousImage = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        loadNextImage();
      } else if (event.key === "ArrowLeft") {
        loadPreviousImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-1 lg:space-x-4 w-full h-[600px]">
      <div className="lg:flex relative hidden h-full">
        <div className=" flex flex-col space-y-4">
          {images.map((image: string, idx: number) => (
            <img
              key={idx}
              src={sanityImageEncoder(image).url()}
              className="h-20 w-14 rounded-sm cursor-pointer"
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Previous Button */}
        <button
          className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2"
          onClick={loadPreviousImage}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-7 w-7 cursor-pointer text-black" />
        </button>

        {/* Next Button */}
        <button
          className="absolute z-10 right-0 top-1/2 transform -translate-y-1/2"
          onClick={loadNextImage}
          aria-label="Next image"
        >
          <ChevronRight className="h-7 w-7 cursor-pointer text-black" />
        </button>
        <div className="relative w-full lg:w-[515px] h-full">
          <img
            src={sanityImageEncoder(images[currentIndex]).url()}
            alt={`Image ${currentIndex + 1}`}
            className="object-fill w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
