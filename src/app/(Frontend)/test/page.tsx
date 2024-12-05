"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

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

export default function Page() {
  const [value, setValue] = useState("shivaji");

  console.log("outside", value);

  function handler() {
    setValue((prev) => (prev === "shivaji" ? "vyshnavi" : "shivaji"));
    console.log("inside", value);
  }

  return (
    <div>
      <p>{value}</p>
      <Button onClick={handler}> Increment</Button>
    </div>
  );
}
