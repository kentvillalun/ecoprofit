import { NextResponse } from "next/server";

export function proxy(request) {
  console.log("proxy running", request.nextUrl.pathname);
  const token = request.cookies.get("barangay_token");
  console.log("token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/barangay/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/collection-requests/:path*"],
};
