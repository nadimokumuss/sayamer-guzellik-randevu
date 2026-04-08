import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  DEMO_ACCESS_COOKIE_NAME,
  buildDemoLoginPath,
  hasValidDemoAccessCookie,
  isPublicAccessPath,
  shouldBypassDemoAccess,
} from "@/lib/demo-access";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicAccessPath(pathname) || shouldBypassDemoAccess()) {
    return NextResponse.next();
  }

  const hasAccess = await hasValidDemoAccessCookie(
    request.cookies.get(DEMO_ACCESS_COOKIE_NAME)?.value,
  );

  if (hasAccess) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      {
        error: "Bu demo icin once giris yapmalisiniz.",
      },
      {
        status: 401,
      },
    );
  }

  const nextPath = `${pathname}${search}`;
  return NextResponse.redirect(new URL(buildDemoLoginPath(nextPath), request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
