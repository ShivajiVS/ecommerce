import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  API_AUTH_PREFIX,
  PROTECTED_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";
import { getServerSession } from "./auth/getServerSession";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // const user = false;

  const user = await getServerSession();

  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except "/", "/product", "/bag", public files, and API routes
    "/((?!_next|api|trpc|bag|product|$|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
