import { NextResponse } from "next/server";
import CONFIG from "@config/config";

// Safe function for parsing cookies
function safeParseCookies(cookieString) {
  const cookies = {};
  if (!cookieString) return cookies;
  
  try {
    const cookiePairs = cookieString.split(';');
    
    for (const pair of cookiePairs) {
      try {
        const [key, value] = pair.trim().split('=');
        if (key && value) {
          try {
            cookies[key] = decodeURIComponent(value);
          } catch (decodeError) {
            // Ignore invalid cookies that cannot be decoded
            console.error(`Error decoding cookie ${key}:`, decodeError);
          }
        }
      } catch (pairError) {
        // Ignore invalid cookie pairs
        console.error('Error parsing cookie pair:', pairError);
      }
    }
  } catch (error) {
    console.error('General cookie parsing error:', error);
  }
  
  return cookies;
}

export function middleware(request) {
  const response = NextResponse.next();
  
  // Set security header
  response.headers.set(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${CONFIG.api.cms}`
  );
  
  // Safely process cookies
  try {
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      // Just parse cookies safely, but don't use them in middleware
      // This is only needed to catch possible errors
      safeParseCookies(cookieHeader);
    }
  } catch (error) {
    
  }
  
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
