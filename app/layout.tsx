import type { Metadata } from "next";
import Link from "next/link";

import "@/app/globals.css";

import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";

export const metadata: Metadata = {
  title: "Sayamer Güzellik",
  description:
    "Sayamer Güzellik için premium-soft randevu deneyimi ve salon yönetim paneli demosu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="font-sans text-espresso antialiased">
        <div className="relative min-h-screen">
          <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-hero-glow" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <Link
            href="/yonetim"
            className="fixed bottom-4 right-4 z-40 rounded-full border border-rosewood/15 bg-white/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-rosewood shadow-soft backdrop-blur"
          >
            Salon Paneli
          </Link>
        </div>
      </body>
    </html>
  );
}
