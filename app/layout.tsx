import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import "@/app/globals.css";

import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import { siteContent } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteContent.brand.name,
    template: `%s | ${siteContent.brand.name}`,
  },
  description: siteContent.brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans text-espresso antialiased">
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-hero-glow" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
