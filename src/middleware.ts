import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface TokenSession {
  iat: number;
  userId: string;
  role: string;
  email: string;
}

export default function middleware(req: NextRequest) {
  const session = req.cookies.get("token")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const userSession = jwtDecode<TokenSession>(session);
    const { role } = userSession;

    const urlPath = req.nextUrl.pathname;

    if (urlPath.startsWith("/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    if (urlPath.startsWith("/user")) {
      if (role !== "user") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/cart"],
};
