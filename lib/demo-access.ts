export const DEMO_ACCESS_COOKIE_NAME = "sayamer_demo_access";
export const DEMO_LOGIN_ROUTE = "/giris";
export const DEMO_LOGOUT_ROUTE = "/cikis";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 12;
const PUBLIC_PATHS = new Set([DEMO_LOGIN_ROUTE, DEMO_LOGOUT_ROUTE]);

export function getDemoAccessPassword() {
  return process.env.DEMO_ACCESS_PASSWORD?.trim() ?? "";
}

export function isDemoAccessConfigured() {
  return getDemoAccessPassword().length > 0;
}

export function shouldBypassDemoAccess() {
  return process.env.NODE_ENV !== "production" && !isDemoAccessConfigured();
}

export function isPublicAccessPath(pathname: string) {
  return PUBLIC_PATHS.has(pathname);
}

export function getSafeRedirectPath(value?: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

export function buildDemoLoginPath(nextPath?: string | null) {
  const safePath = getSafeRedirectPath(nextPath);

  if (safePath === "/") {
    return DEMO_LOGIN_ROUTE;
  }

  return `${DEMO_LOGIN_ROUTE}?next=${encodeURIComponent(safePath)}`;
}

export function getDemoAccessCookieOptions() {
  return {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);

  return Array.from(new Uint8Array(hashBuffer), (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export async function createDemoAccessToken(password: string) {
  const sessionSecret = process.env.DEMO_SESSION_SECRET?.trim() || "sayamer-demo-session";
  return sha256(`${password}:${sessionSecret}`);
}

export async function getExpectedDemoAccessToken() {
  const password = getDemoAccessPassword();

  if (!password) {
    return "";
  }

  return createDemoAccessToken(password);
}

export async function hasValidDemoAccessCookie(cookieValue?: string | null) {
  if (!cookieValue) {
    return false;
  }

  const expectedToken = await getExpectedDemoAccessToken();
  return expectedToken.length > 0 && cookieValue === expectedToken;
}
