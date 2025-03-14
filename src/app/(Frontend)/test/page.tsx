// import order_success from "../../../../public/success-order.json";

"use client";
import SignInForm from "@/components/auth/sign-in";
import { Model } from "@/components/model";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [show, setShow] = useState(false);

  return (
    <div className="h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center">
      <h2>welcome</h2>
      <Button className="my-4" onClick={() => setShow(true)}>
        open
      </Button>
      {show && (
        // <div className="bg-black bg-opacity-25 fixed inset-0 backdrop-blur-sm flex items-center justify-center">
        //   <div className="size-96 p-4 relative bg-slate-100 rounded-lg">
        //     <button
        //       className="text-xl absolute right-5 top-3"
        //       onClick={() => setShow(false)}
        //     >
        //       x
        //     </button>
        //   </div>
        // </div>

        <Model isVisible onClose={() => setShow(false)}>
          <SignInForm />
        </Model>
      )}
    </div>
  );
}
