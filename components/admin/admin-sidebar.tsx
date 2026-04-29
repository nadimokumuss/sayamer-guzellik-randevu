"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Wordmark } from "@/components/ui/wordmark";
import { classNames } from "@/lib/utils";

const links: ReadonlyArray<{ href: string; label: string; detail: string }> = [
  { href: "/yonetim", label: "Genel Bakış", detail: "Akış ve metrikler" },
  { href: "/yonetim/takvim", label: "Takvim", detail: "Gün planı" },
  { href: "/yonetim/randevular", label: "Randevular", detail: "Durum yönetimi" },
  { href: "/yonetim/hizmetler", label: "Hizmetler", detail: "Katalog görünümü" },
  { href: "/yonetim/personeller", label: "Personeller", detail: "Ekip profilleri" },
  { href: "/yonetim/uygunluk", label: "Uygunluk", detail: "Bloke saatler" },
];

const todayLabel = new Intl.DateTimeFormat("tr-TR", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(new Date());

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-4 h-fit overflow-hidden rounded-[24px] border border-hairline bg-white p-5">
      <Wordmark size="sm" />

      <div className="mt-6 rounded-2xl border border-hairline bg-peachLight/40 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mocha">
          Bugün
        </p>
        <p className="mt-2 font-display text-base font-extrabold tracking-tight text-graphite">
          {todayLabel}
        </p>
      </div>

      <nav className="mt-5 grid gap-1.5">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={classNames(
                "group flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition",
                isActive
                  ? "border-graphite/15 bg-graphite text-white"
                  : "border-transparent text-ash hover:border-hairline hover:bg-peachLight/40 hover:text-graphite",
              )}
            >
              <div>
                <p className="text-[13px] font-semibold tracking-tight">{link.label}</p>
                <p
                  className={classNames(
                    "mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
                    isActive ? "text-white/55" : "text-ash/80",
                  )}
                >
                  {link.detail}
                </p>
              </div>
              <span
                aria-hidden
                className={classNames(
                  "shrink-0 transition-transform",
                  isActive ? "text-white" : "text-ash group-hover:translate-x-0.5",
                )}
              >
                ↗
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 grid gap-2">
        <Link
          href="/"
          className="inline-flex items-center justify-between gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-[12px] font-semibold tracking-tight text-graphite transition hover:bg-peachLight/40"
        >
          <span>Müşteri tarafı</span>
          <span aria-hidden>↗</span>
        </Link>
        <Link
          href="/randevu"
          className="inline-flex items-center justify-between gap-2 rounded-full bg-graphite px-4 py-2 text-[12px] font-semibold tracking-tight text-white transition hover:bg-mocha"
        >
          <span>Müşteri akışı</span>
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </aside>
  );
}
