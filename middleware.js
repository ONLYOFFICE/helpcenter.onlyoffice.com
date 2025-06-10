import { NextResponse } from "next/server";
import CONFIG from "@config/config";


function safeParseCookies(cookieString) {
  const cookies = {};
  if (!cookieString) return cookies;

  const cookiePairs = cookieString.split(';');

  for (const pair of cookiePairs) {
    const [rawKey, rawValue] = pair.trim().split('=');
    if (!rawKey || !rawValue) continue;

    try {
      const key = decodeURIComponent(rawKey.trim());
      const value = decodeURIComponent(rawValue.trim());
      cookies[key] = value;
    } catch (err) {
      
      
    }
  }

  return cookies;
}


export function middleware(request ) {
  const response = NextResponse.next();

 
  response.headers.set(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${CONFIG.api.cms}`
  );

  
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = safeParseCookies(cookieHeader);
    
  }

  return response;
}


export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
