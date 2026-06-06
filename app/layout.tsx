import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import "@/app/globals.css";

import { CursorDot } from "@/components/motion/cursor-dot";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { PageBackdrop } from "@/components/ui/page-backdrop";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import { siteContent } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-surface font-sans text-ink-900 antialiased">
        <PageBackdrop />
        <div className="relative min-h-screen">
          <ScrollProgress />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <CursorDot />
      </body>
    </html>
  );
}
