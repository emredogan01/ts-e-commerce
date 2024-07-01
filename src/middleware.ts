import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL("/products?limit=12&page=1", request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/products"],
};
