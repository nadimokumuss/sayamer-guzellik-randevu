"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppIcon, type AppIconName } from "@/components/ui/app-icon";
import { classNames } from "@/lib/utils";

const links: Array<{ href: string; label: string; detail: string; icon: AppIconName }> = [
  { href: "/yonetim", label: "Genel Bakış", detail: "Akış ve metrikler", icon: "chart" },
  { href: "/yonetim/takvim", label: "Takvim", detail: "Gün planı", icon: "calendar" },
  { href: "/yonetim/randevular", label: "Randevular", detail: "Durum yönetimi", icon: "bookmark" },
  { href: "/yonetim/hizmetler", label: "Hizmetler", detail: "Katalog görünümü", icon: "layers" },
  { href: "/yonetim/personeller", label: "Personeller", detail: "Ekip profilleri", icon: "users" },
  { href: "/yonetim/uygunluk", label: "Uygunluk", detail: "Bloke saatler", icon: "block" },
];

const todayLabel = new Intl.DateTimeFormat("tr-TR", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(new Date());

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-card sticky top-24 h-fit overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-[#f6dfdf]/80 via-white/10 to-transparent" />

      <div className="relative">
        <div className="flex items-center gap-4">
          <span className="icon-badge icon-badge-lg">
            <AppIcon name="spark" className="h-7 w-7" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c7376]">
              Sayamer Panel
            </p>
            <h1 className="mt-1 font-display text-3xl tracking-tight text-espresso">
              Salon Operasyonları
            </h1>
          </div>
        </div>

        <div className="mt-6 rounded-[26px] border border-white/70 bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[#8c7376]">Bugün</p>
          <p className="mt-2 font-display text-2xl text-espresso">{todayLabel}</p>
          <p className="mt-2 text-sm leading-7 text-[#6f5c5e]">
            Görünüm, müşteri akışı ve demo operasyon ekranlarını aynı veride toplar.
          </p>
        </div>

        <nav className="mt-6 grid gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={classNames(
                  "group rounded-[24px] border px-4 py-4 transition",
                  isActive
                    ? "border-rosewood/15 bg-white text-espresso shadow-soft"
                    : "border-transparent bg-transparent text-[#5d494b] hover:border-white/70 hover:bg-white/60",
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={classNames(
                      "icon-badge h-11 w-11 rounded-[18px]",
                      isActive ? "bg-[#f8efe9] text-rosewood" : "bg-white/70 text-[#8c7376]",
                    )}
                  >
                    <AppIcon name={link.icon} />
                  </span>
                  <div>
                    <p className="font-medium">{link.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8c7376]">
                      {link.detail}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-[26px] bg-[#fcf7f3] p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8c7376]">Kısa Yol</p>
          <div className="mt-3 grid gap-2">
            <Link href="/" className="soft-button-secondary w-full justify-start">
              Demo Anasayfaya Dön
            </Link>
            <Link href="/randevu" className="soft-button w-full justify-start">
              Müşteri Akışını Aç
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
