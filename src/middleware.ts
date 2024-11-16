import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/search", "/product"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const PROTECTED_ROUTES = ["/account", "/address", "/orders", "/checkout"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuthenticated = true;

  

  console.log("middleware...", pathname);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
