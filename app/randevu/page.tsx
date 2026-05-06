import { SinglePageBooking } from "@/components/booking/single-page-booking";
import { getCatalog } from "@/lib/catalog";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Online Randevu",
  "Sayamer Güzellik için hizmet veya paket seçerek online randevu oluşturun.",
);

const benefits = [
  { icon: "🕐", title: "7/24 Online Randevu", desc: "Gece gündüz dilediğiniz saatte" },
  { icon: "✓", title: "Anında Onay", desc: "Randevunuz hemen sisteme düşer" },
  { icon: "🔔", title: "Hatırlatma Bildirimi", desc: "WhatsApp ile bilgilendirme" },
  { icon: "🔒", title: "Güvenli İşlem", desc: "Verileriniz güvende" },
];

export default function BookingPage() {
  const catalog = getCatalog();

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* Hero */}
      <div className="border-b border-hairline bg-white">
        <div className="shell py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                Online Randevu
              </p>
              <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight text-graphite lg:text-5xl">
                Randevunuzu{" "}
                <span className="text-mocha">30 saniyede</span>{" "}
                oluşturun.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-ash">
                Hizmet seçin, uzmanınızı belirleyin, uygun saatinizi kapatın. Randevunuz
                anında onaylanır.
              </p>
            </div>
            <div className="hidden lg:block">
              <img
                src={siteContent.media.editorial[0].src}
                alt="Sayamer randevu"
                className="h-36 w-52 rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Booking */}
      <div className="shell py-10 lg:py-14">
        <SinglePageBooking catalog={catalog} />
      </div>

      {/* Benefits */}
      <div className="border-t border-hairline bg-white">
        <div className="shell py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-col items-center gap-2 text-center">
                <span className="text-2xl">{b.icon}</span>
                <p className="font-display text-sm font-extrabold tracking-tight text-graphite">
                  {b.title}
                </p>
                <p className="text-xs text-ash">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
