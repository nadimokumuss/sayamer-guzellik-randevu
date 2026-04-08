import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { DEMO_ACCESS_COOKIE_NAME, DEMO_LOGIN_ROUTE, getDemoAccessCookieOptions } from "@/lib/demo-access";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_ACCESS_COOKIE_NAME, "", {
    ...getDemoAccessCookieOptions(),
    maxAge: 0,
  });

  return NextResponse.redirect(new URL(DEMO_LOGIN_ROUTE, request.url));
}
