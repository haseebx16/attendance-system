import { NextResponse } from "next/server";

export function middleware(req) {
  const allowedIPs = ["103.244.175.105"];  // Your allowed IP

  // Try using 'x-forwarded-for' first, then fall back to 'req.ip'
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(',')[0] || req.ip || "";

  console.log("Client IP:", ip); // Log the IP for debugging

  if (!allowedIPs.includes(ip)) {
    return new Response("Access Denied", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",  // Apply to all routes
};