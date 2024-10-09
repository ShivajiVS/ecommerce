"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CarouselProps {
  images?: string[];
  autoSlideInterval?: number;
  transitionSpeed?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
}

const Carousel = ({
  images = ["banner1.jpg", "cat2.jpg", "cat3.jpg", "cat4.jpg", "cat5.jpg"],
  autoSlideInterval = 4000,
  transitionSpeed = 0.7,
  loop = true,
  pauseOnHover = true,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<string>("next");
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const loadNextImage = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const loadPreviousImage = () => {
    setDirection("prev");
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? (loop ? images.length - 1 : 0) : prev - 1
    );
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        loadNextImage();
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, autoSlideInterval]);

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
    <div
      className="mb-8 mt-5 overflow-hidden lg:mx-4"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="w-full h-[500px] relative overflow-hidden">
        <button className="absolute z-[500000] left-2 top-1/2 transform -translate-y-1/2">
          <ChevronLeft
            className="h-10 w-10 cursor-pointer text-background"
            onClick={loadPreviousImage}
            aria-label="Previous image"
          />
        </button>
        <button className="absolute z-[500000] right-2 top-1/2 transform -translate-y-1/2">
          <ChevronRight
            className="h-10 w-10 cursor-pointer text-background"
            onClick={loadNextImage}
            aria-label="Next image"
          />
        </button>
        <AnimatePresence custom={direction}>
          <motion.div
            key={images[currentIndex]} //Use image URL as key
            className="absolute w-full h-full"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: transitionSpeed }}
            custom={direction}
          >
            <Image
              src={`/${images[currentIndex]}`}
              alt={`Image ${currentIndex + 1}`}
              layout="fill"
              objectFit="cover"
              objectPosition=""
              fill
              // loading="lazy"
              // style={{ objectFit: "contain" }}
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </motion.div>
        </AnimatePresence>
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

export default Carousel;
