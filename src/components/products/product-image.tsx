"use client";

import { useState } from "react";

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

export default ProductImage;
