import Link from "next/link";

import { AppIcon } from "@/components/ui/app-icon";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/40 bg-white/35">
      <div className="shell py-10">
        <div className="glass-card overflow-hidden p-8">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-4">
                <span className="icon-badge icon-badge-lg">
                  <AppIcon name="spark" className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-display text-3xl">Sayamer Güzellik</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#8c7376]">
                    Dijital salon demosu
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#6f5c5e]">
                Bu demo; müşteri tarafı rezervasyon akışı ile salon panelini aynı premium-soft
                tasarım dili içinde birleştirir. Amaç, ilk bakışta güven veren, hızlı taranan ve
                müşteriye görsel olarak kendini anlatan bir randevu deneyimi sunmaktır.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/randevu" className="soft-button">
                  Hizmet Akışını Aç
                </Link>
                <Link href="/yonetim" className="soft-button-secondary">
                  Yönetim Paneline Git
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: "calendar",
                  title: "Randevu",
                  lines: ["Hizmet seçimi", "Paket rezervasyonu", "Takvim adımı"],
                },
                {
                  icon: "users",
                  title: "Salon",
                  lines: ["Uzman profilleri", "Gün planı", "Bloke saat yönetimi"],
                },
                {
                  icon: "phone",
                  title: "İletişim",
                  lines: ["Bağdat Caddesi çevresi", "+90 538 888 77 66", "hello@sayamer.com"],
                },
                {
                  icon: "shield",
                  title: "Demo",
                  lines: ["Parolalı erişim", "Vercel üzerinde yayın", "Müşteri inceleme modu"],
                },
              ].map((block) => (
                <div key={block.title} className="metric-card">
                  <span className="icon-badge h-11 w-11 rounded-[18px]">
                    <AppIcon name={block.icon as "calendar" | "users" | "phone" | "shield"} />
                  </span>
                  <p className="mt-4 font-medium text-espresso">{block.title}</p>
                  <div className="mt-3 space-y-2 text-sm text-[#6f5c5e]">
                    {block.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
