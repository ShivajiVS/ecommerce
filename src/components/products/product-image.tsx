"use client";

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { sanityImageEncoder } from "@/sanity/sanityClient";

interface CarouselProps {
  images: any;
  transitionSpeed?: number;
}

const ProductImage = ({ images, transitionSpeed = 0.7 }: CarouselProps) => {
  const [image, setImage] = useState(images[0]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<string>("next");

  const loadNextImage = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const loadPreviousImage = () => {
    setDirection("prev");
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
    <div className="flex flex-1 flex-col-reverse gap-3 lg:flex-row w-full h-[500px]">
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
        <div className="relative w-full h-full">
          <img
            src={sanityImageEncoder(images[currentIndex]).url()} // Dynamic source based on currentIndex
            alt={`Image ${currentIndex + 1}`}
            className="object-cover w-full h-full" // Use img tag with object-cover
          />
        </div>
      </div>
    </div>
  );
};

const variants = {
  enter: (direction: string) => ({
    x: direction === "next" ? "100%" : "-100%",
    opacity: 0,
    scale: 0.8, // Add a slight scale effect on enter
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1, // Normalize to full scale on center
  },
  exit: (direction: string) => ({
    x: direction === "next" ? "-100%" : "100%",
    opacity: 0,
    scale: 0.8, // Slight scale effect on exit
  }),
};

export default ProductImage;

/**
 
const ProductImage = ({ images }: { images: string[] }) => {
  const [image, setImage] = useState("1.webp");
  return (
    <div className="flex flex-1 flex-col-reverse gap-3 lg:flex-row">
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-between lg:justify-normal lg:w-[18.7%] w-full gap-6">
        {images.map((item, index) => (
          <img
            src={`${item}.webp`}
            key={index}
            className="w-10 h-20 lg:w-full flex-shrink-0 cursor-pointer"
            onClick={() => setImage(`${item}.webp`)}
          />
        ))}
      </div>
      <div className="w-full lg:w-[80%]">
        <img src={image} alt="" className="w-full h-auto" />
      </div>
    </div>
  );
};

 */
