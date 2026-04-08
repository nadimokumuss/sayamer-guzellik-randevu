import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/40 bg-white/40">
      <div className="shell grid gap-10 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-display text-2xl">Sayamer Güzellik</p>
          <p className="max-w-md text-sm leading-7 text-[#6f5c5e]">
            Premium-soft marka diliyle tasarlanmış bu demo; hizmet seçimi, personel planlama,
            uygunluk yönetimi ve salon paneli deneyimini tek akışta gösterir.
          </p>
        </div>

        <div className="space-y-3 text-sm text-[#6f5c5e]">
          <p className="font-semibold uppercase tracking-[0.22em] text-[#8c7376]">Randevu</p>
          <Link href="/randevu" className="block hover:text-espresso">
            Hizmet Seç
          </Link>
          <Link href="/paketler" className="block hover:text-espresso">
            Paket Seç
          </Link>
          <Link href="/yonetim/takvim" className="block hover:text-espresso">
            Takvim Paneli
          </Link>
        </div>

        <div className="space-y-3 text-sm text-[#6f5c5e]">
          <p className="font-semibold uppercase tracking-[0.22em] text-[#8c7376]">İletişim</p>
          <p>Bağdat Caddesi çevresi, İstanbul</p>
          <p>+90 538 888 77 66</p>
          <p>hello@sayamer.com</p>
        </div>
      </div>
    </footer>
  );
}
