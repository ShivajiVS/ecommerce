import { OrderSuccessfullBackButton } from "@/components/order-successfull-back-button";
import Lootie from "lottie-react";

import { stripe } from "@/lib/stripe";
import order_success from "../../../../../public/success-order.json";
import { OrderSuccessAnimation } from "@/components/order-success-animation";

export default async function page({
  searchParams,
}: {
  searchParams: { success?: boolean; cancelled?: boolean; session_id: string };
}) {
  let issession;

  if (searchParams.success) {
    const sessionId = searchParams.session_id;
    if (!sessionId) throw new Error("Incorrect callback Url");

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session && session.status === "complete") {
      issession = true;
    }
  }

  // if (searchParams.success && searchParams.session_id) {
  //   const session = await stripe.checkout.sessions.retrieve(
  //     searchParams.session_id
  //   );

  //   if (session && session.status === "complete") {
  //     issession = true;
  //   }
  // }

  return (
    <div className="h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center">
      {issession && (
        <div className="rounded-lg">
          {/* <h2 className="tracking-tight font-bold text-xl capitalize">
            payment successful...
          </h2> */}
          <OrderSuccessAnimation />
          <OrderSuccessfullBackButton />
        </div>
      )}
    </div>
  );
}
