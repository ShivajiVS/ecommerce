"use client";

import dynamic from "next/dynamic";

const Bag = dynamic(() => import("../../../components/bag/bag"), {
  ssr: false,
});

export default function Page() {
  if (typeof window === "undefined") return null;

  return (
    <>
      <Bag />
    </>
  );
}
