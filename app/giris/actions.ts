"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  DEMO_ACCESS_COOKIE_NAME,
  getDemoAccessCookieOptions,
  getDemoAccessPassword,
  getExpectedDemoAccessToken,
  getSafeRedirectPath,
} from "@/lib/demo-access";

type DemoLoginState = {
  error: string | null;
};

export async function submitDemoAccessAction(
  _previousState: DemoLoginState,
  formData: FormData,
): Promise<DemoLoginState> {
  const configuredPassword = getDemoAccessPassword();

  if (!configuredPassword) {
    return {
      error: "Demo girisi henuz yapilandirilmadi. Vercel ortam degiskenlerini kontrol edin.",
    };
  }

  const password = String(formData.get("password") ?? "");
  const nextPath = getSafeRedirectPath(String(formData.get("next") ?? "/"));

  if (!password.trim()) {
    return {
      error: "Demo sifresi gerekli.",
    };
  }

  if (password !== configuredPassword) {
    return {
      error: "Sifre hatali. Lutfen tekrar deneyin.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    DEMO_ACCESS_COOKIE_NAME,
    await getExpectedDemoAccessToken(),
    getDemoAccessCookieOptions(),
  );

  redirect(nextPath);
}
