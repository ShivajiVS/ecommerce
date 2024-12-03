// import { getServerSession } from "@/auth/getServerSession";
// import { db } from "@/db";
// import { users } from "@/db/schema";
// import { sanityFetch } from "@/sanity/live";
// import { defineQuery } from "next-sanity";

import { Skeleton } from "@/components/ui/skeleton";
import { getAllProductSlugs } from "@/sanity/queries";
import { Fragment } from "react";

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

// "use client";

// import React, { useState } from "react";

// const ButtonColors = () => {
//   const colors: string[] = [
//     "red",
//     "green",
//     "blue",
//     "yellow",
//     "pink",
//     "purple",
//     "orange",
//     "cyan",
//     "brown",
//   ];

//   const [buttons, setButtons] = useState(
//     Array(9).fill({ color: "", disabled: false })
//   );

//   // Function to handle button clicks
//   const handleButtonClick = (index: number) => {
//     setButtons((prevButtons) => {
//       const updatedButtons = [...prevButtons];
//       const colorIndex = updatedButtons.filter(
//         (btn) => btn.color !== ""
//       ).length; // Determine the next color in sequence
//       updatedButtons[index] = { color: colors[colorIndex], disabled: true };
//       return updatedButtons;
//     });
//   };

//   return (
//     <div className="flex flex-wrap space-x-3 space-y-3">
//       {buttons.map((button, index) => (
//         <button
//           key={index}
//           style={{
//             backgroundColor: button.color || "lightgray",
//           }}
//           onClick={() => handleButtonClick(index)}
//           disabled={button.disabled}
//           className={`w-24 h-10 bg-gray-500 cursor-pointer text-primary ${button.disabled ? "cursor-not-allowed" : null}`}
//         >
//           {button.disabled ? "Done" : "Click Me"}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default ButtonColors;

export default async function Page() {
  return (
    <div className="relative h-[500vh]">
      <div className="">
        <img
          className="w-screen h-full absolute top-0"
          src="https://img.freepik.com/free-vector/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.jpg?t=st=1733076845~exp=1733080445~hmac=b6ff8a3bd1fadcde3664b3a4c7a661efbfc7605dbb20a958f768754865f176ee&w=1380"
          alt=""
        />
      </div>
      <div className="">

      </div>
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 md:gap-5 py-1">
        {Array(8)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="flex flex-col space-y-2">
              <Skeleton className="h-[300px] w-[250px] rounded-md" />
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3 w-40" />{" "}
            </div>
          ))}
      </div>
    </div>
  );
}
