import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

import { DemoLoginForm } from "@/components/access/demo-login-form";
import {
  DEMO_ACCESS_COOKIE_NAME,
  DEMO_LOGOUT_ROUTE,
  getSafeRedirectPath,
  hasValidDemoAccessCookie,
  isDemoAccessConfigured,
} from "@/lib/demo-access";

import { submitDemoAccessAction } from "./actions";

type DemoLoginPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Demo Girisi | Sayamer Guzellik",
  description: "Sayamer Guzellik demo deneyimini parola ile acmak icin giris paneli.",
};

export default async function DemoLoginPage({ searchParams }: DemoLoginPageProps) {
  const params = (await searchParams) ?? {};
  const nextPath = getSafeRedirectPath(params.next);
  const cookieStore = await cookies();
  const hasAccess = await hasValidDemoAccessCookie(
    cookieStore.get(DEMO_ACCESS_COOKIE_NAME)?.value,
  );
  const isConfigured = isDemoAccessConfigured();

  return (
    <div className="shell py-12 sm:py-16">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="glass-card relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-[#f6dfdf]/80 via-white/10 to-transparent" />
          <div className="relative">
            <span className="eyebrow">Demo Erisimi</span>
            <h1 className="mt-5 max-w-xl font-display text-5xl tracking-tight text-espresso sm:text-6xl">
              Musteri incelemesi icin korumali giris paneli
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6f5c5e] sm:text-base">
              Bu ekran, Sayamer Guzellik demosunu tek bir parola ile acmak icin eklendi.
              Musteriniz anasayfa akisini, randevu adimlarini ve salon panelini ayni link
              uzerinden inceleyebilir.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Tum sayfalar middleware ile korunur.",
                "Giris yapildiginda 12 saatlik guvenli oturum cookie'si verilir.",
                "Musteri isterse yonetim paneline de ayni sifreyle ulasir.",
                "Parola Vercel ortam degiskeninden okunur.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/70 bg-white/70 p-5 text-sm leading-7 text-[#5d494b]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-card p-8 sm:p-10">
          <span className="eyebrow">Giris Formu</span>
          <h2 className="mt-5 font-display text-4xl tracking-tight text-espresso">
            {hasAccess ? "Oturum acik" : "Demo sifresiyle devam et"}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6f5c5e]">
            {hasAccess
              ? "Bu tarayicida demo oturumu zaten acik. Incelemeye devam edebilir veya cikis yapabilirsiniz."
              : "Musterinizle paylasacaginiz tek sifreyi girerek projeyi acin."}
          </p>

          {hasAccess ? (
            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] border border-[#d9eadf] bg-[#f4fbf7] p-5 text-sm leading-7 text-[#476856]">
                Giris dogrulandi. Sonraki durak olarak
                <span className="font-semibold text-espresso"> {nextPath}</span> hazir.
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={nextPath} className="soft-button">
                  Incelemeye Devam Et
                </Link>
                <Link href="/yonetim" className="soft-button-secondary">
                  Yonetim Panelini Ac
                </Link>
                <Link href={DEMO_LOGOUT_ROUTE} className="soft-button-secondary">
                  Cikis Yap
                </Link>
              </div>
            </div>
          ) : (
            <DemoLoginForm
              action={submitDemoAccessAction}
              nextPath={nextPath}
              isConfigured={isConfigured}
            />
          )}

          <div className="mt-8 rounded-[24px] bg-[#fcf7f3] p-5 text-sm leading-7 text-[#6f5c5e]">
            Onerilen kullanim: Vercel uzerinde yayina alin, `DEMO_ACCESS_PASSWORD` env degerini
            tanimlayin ve musteriyle yalnizca tek bir demo linki paylasin.
          </div>
        </section>
      </div>
    </div>
  );
}
