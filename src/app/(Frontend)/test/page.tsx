// import { getServerSession } from "@/auth/getServerSession";
// import { db } from "@/db";
// import { users } from "@/db/schema";
// import { sanityFetch } from "@/sanity/live";
// import { defineQuery } from "next-sanity";

// export default async function Page() {

//   const PRODUCT_QUERY = defineQuery(
//     `*[_type == "product"]{_id, title, slug, description,originalPrice, discountPrice,stock, sizes }|order(date desc)`
//   );

//   const data = await sanityFetch({ query: PRODUCT_QUERY });

//   console.log(data.data);

//   return (
//     <div className="max-w-xl mx-auto h-96 bg-slate-500">
//       {/* <p>{JSON.stringify(result)}</p> */}
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";

const ButtonColors = () => {
  const colors: string[] = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "purple",
    "orange",
    "cyan",
    "brown",
  ];

  const [buttons, setButtons] = useState(
    Array(9).fill({ color: "", disabled: false })
  );

  // Function to handle button clicks
  const handleButtonClick = (index: number) => {
    setButtons((prevButtons) => {
      const updatedButtons = [...prevButtons];
      const colorIndex = updatedButtons.filter(
        (btn) => btn.color !== ""
      ).length; // Determine the next color in sequence
      updatedButtons[index] = { color: colors[colorIndex], disabled: true };
      return updatedButtons;
    });
  };

  return (
    <div className="flex flex-wrap space-x-3 space-y-3">
      {buttons.map((button, index) => (
        <button
          key={index}
          style={{
            backgroundColor: button.color || "lightgray",
          }}
          onClick={() => handleButtonClick(index)}
          disabled={button.disabled}
          className={`w-24 h-10 bg-gray-500 cursor-pointer text-primary ${button.disabled ? "cursor-not-allowed" : null}`}
        >
          {button.disabled ? "Done" : "Click Me"}
        </button>
      ))}
    </div>
  );
};

export default ButtonColors;
