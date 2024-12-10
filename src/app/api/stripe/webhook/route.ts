import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const header = headers();

  const signature = header.get("stripe-signature");

  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeWebhookSecret)
    return NextResponse.json(
      { error: "stripe webhook secret not set" },
      { status: 401 }
    );

  if (!signature)
    return NextResponse.json({ error: "no stripe signature" }, { status: 401 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    );
  } catch (error) {
    return NextResponse.json({ error: "webhook error," }, { status: 401 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrder(session);
    } catch (error) {
      return NextResponse.json(
        { error: "error while creating order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

async function createOrder(session: any) {}
