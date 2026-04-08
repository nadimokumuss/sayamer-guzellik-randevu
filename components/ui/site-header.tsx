import Link from "next/link";

import { AppIcon } from "@/components/ui/app-icon";

const links = [
  { href: "/", label: "Anasayfa" },
  { href: "/randevu", label: "Hizmetler" },
  { href: "/paketler", label: "Paketler" },
  { href: "/yonetim", label: "Yönetim Paneli" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-[#fbf6f0]/80 backdrop-blur-2xl">
      <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg float-slow">
              <AppIcon name="spark" className="h-7 w-7" />
            </span>
            <div>
              <p className="font-display text-2xl tracking-tight">Sayamer Güzellik</p>
              <p className="text-xs uppercase tracking-[0.28em] text-[#8c7376]">
                Demo Randevu Deneyimi
              </p>
            </div>
          </Link>

          <span className="hidden rounded-full border border-rosewood/10 bg-white/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8c7376] lg:inline-flex">
            Premium Soft Interface
          </span>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-2 text-sm text-[#6f5c5e] shadow-soft md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 transition hover:bg-white hover:text-espresso"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            <Link href="/giris" className="soft-button-secondary">
              Demo Girişi
            </Link>
            <Link href="/randevu" className="soft-button">
              Randevu Oluştur
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
