import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  res.headers.append("Access-Control-Allow-Origin", "*");
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type",
  );
  return res;
}
export const config = {
  matcher: ["/api/:path*"],
};
