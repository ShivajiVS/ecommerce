import { CartItem } from "@/lib/store/cartType";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: Request) => {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });

  const body = await request.json();

  const cart: CartItem[] = body.cart;

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: cart.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      metadata: {
        userId: userId,
      },
      mode: "payment",
      success_url: `${process.env.BASE_URL}/orders/complete?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/orders/complete?cancelled=true`,
    });

    return NextResponse.json({
      mesage: "success",
      paymentUrl: checkoutSession.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        mesage: (error as Error).message,
      },
      { status: 401 }
    );
  }
};
