import { CartItem } from "@/lib/store/cartType";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  const { cart } = body;

  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  console.log("cartItems", body);
  return NextResponse.json({ mesage: "success" });
};
