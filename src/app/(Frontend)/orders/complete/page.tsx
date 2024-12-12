import Link from "next/link";

import { OrderSuccessAnimation } from "@/components/order-success-animation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
// import order_success3 from "../../../../../public/order-success3.json";

type PropsTypes = {
  searchParams: { success?: boolean; cancelled?: boolean; session_id: string };
};

export default async function page({ searchParams }: PropsTypes) {
  let issession;

  if (searchParams.success) {
    const sessionId = searchParams.session_id;
    if (!sessionId) throw new Error("Incorrect callback Url");

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session && session.status === "complete") {
      issession = true;
    }
  }

  return (
    <div className="h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center">
      {issession && (
        <Card className="mx-auto w-full max-w-sm lg:max-w-lg py-7 rounded-lg flex justify-center items-center dark:bg-slate-900">
          <div className="w-full px-4 lg:px-8">
            <OrderSuccessAnimation />

            <div className="space-y-2.5 mt-5">
              <h2 className="text-base lg:text-2xl font-bold tracking-tight text-center">
                Thank you for ordering
              </h2>
              <div className="text-sm text-center font-medium text-muted-foreground space-y-1">
                <p>we've received your order will ship in 5-7 business days.</p>
                <p>Your order number is Edf232133.</p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full mt-8 space-x-4 lg:px-12">
              <Link href="/orders">
                <Button
                  variant="secondary"
                  className="w-full px-8 uppercase text-xs font-bold"
                >
                  View order
                </Button>
              </Link>
              <Link href="/">
                <Button
                  type="submit"
                  className="w-full px-6 uppercase text-xs font-bold"
                >
                  continue shopping
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
