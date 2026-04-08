import Link from "next/link";

const links = [
  { href: "/", label: "Anasayfa" },
  { href: "/randevu", label: "Hizmetler" },
  { href: "/paketler", label: "Paketler" },
  { href: "/yonetim", label: "Yönetim Paneli" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-[#fcf8f4]/80 backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rosewood/15 bg-white/80 font-display text-lg text-rosewood shadow-soft">
            S
          </div>
          <div>
            <p className="font-display text-xl tracking-tight">Sayamer Güzellik</p>
            <p className="text-xs uppercase tracking-[0.28em] text-[#8c7376]">
              Randevu Deneyimi
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 rounded-full border border-white/70 bg-white/60 px-3 py-2 text-sm text-[#6f5c5e] shadow-soft md:flex">
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

        <Link href="/randevu" className="soft-button">
          Randevu Oluştur
        </Link>
      </div>
    </header>
  );
}
