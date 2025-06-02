import { NextResponse } from "next/server";
import CONFIG from "@config/config";

export function middleware(request) {
  const response = NextResponse.next();
  response.headers.set(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${CONFIG.api.cms}`
  );
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
