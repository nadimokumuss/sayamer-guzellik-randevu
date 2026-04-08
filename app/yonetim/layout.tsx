import Link from "next/link";

const links = [
  { href: "/yonetim", label: "Genel Bakış" },
  { href: "/yonetim/takvim", label: "Takvim" },
  { href: "/yonetim/randevular", label: "Randevular" },
  { href: "/yonetim/hizmetler", label: "Hizmetler" },
  { href: "/yonetim/personeller", label: "Personeller" },
  { href: "/yonetim/uygunluk", label: "Uygunluk" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shell py-8">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="glass-card h-fit p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8c7376]">
            Sayamer Panel
          </p>
          <h1 className="mt-4 font-display text-3xl tracking-tight text-espresso">
            Salon Operasyonları
          </h1>
          <nav className="mt-8 grid gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[20px] px-4 py-3 text-sm text-[#5d494b] transition hover:bg-white/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
