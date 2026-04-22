import Link from "next/link";

import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Vizyon ve Misyon",
  "Sayamer Güzellik vizyonu, misyonu ve çalışma yaklaşımı.",
);

const principles = [
  {
    title: "Karar vermeyi kolaylaştırmak",
    copy: "Hizmet, süre ve fiyat bilgilerini açık sunarak müşteri için hızlı bir karar zemini oluşturuyoruz.",
  },
  {
    title: "İletişim, hijyen ve düzenle bakım kalitesi",
    copy: "Rezervasyondan seans sonrasına kadar süreci destekleyen operasyonel çerçeveyi titizlikle tutuyoruz.",
  },
  {
    title: "Güvenli ve sakin bir salon hissi",
    copy: "Kişisel ilgi ve tutarlı hizmet ile müşterinin dönüş niyetini güçlendiriyoruz.",
  },
];

export default function VisionMissionPage() {
  return (
    <div>
      {/* HERO */}
      <section className="shell pt-20 pb-20 lg:pt-32 lg:pb-24">
        <p className="eyebrow-tag">Vizyon ve misyon</p>
        <h1 className="mt-8 max-w-3xl font-display text-display-xl text-graphite">
          Bakım deneyimini tüm yolculukla birlikte tasarlıyoruz.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-ash">
          Sayamer, salon atmosferini ve bakım hizmetlerini aynı sakin çizgide buluşturan
          bir güzellik evi olmayı hedefler.
        </p>
      </section>

      {/* VISION */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <p className="eyebrow-tag">Vizyon</p>
            <p className="font-display text-2xl leading-[1.5] text-graphite sm:text-3xl sm:leading-[1.5]">
              {siteContent.visionMission.vision}
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <p className="eyebrow-tag">Misyon</p>
            <p className="font-display text-2xl leading-[1.5] text-graphite sm:text-3xl sm:leading-[1.5]">
              {siteContent.visionMission.mission}
            </p>
          </div>
        </div>
      </section>

      {/* EDITORIAL PHOTO */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="overflow-hidden">
            <img
              src={siteContent.media.editorial[1].src}
              alt={siteContent.media.editorial[1].alt}
              className="h-[60vh] w-full object-cover lg:h-[72vh]"
            />
          </div>
          <div className="mt-6 flex items-start justify-between gap-6">
            <p className="max-w-md text-sm leading-7 text-ash">
              {siteContent.media.editorial[1].copy}
            </p>
            <p className="eyebrow-tag">Sayamer · {siteContent.media.editorial[1].eyebrow}</p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-tag">İlkelerimiz</p>
            <h2 className="mt-6 font-display text-display-lg text-graphite">
              Her ziyaretin arkasında üç temel çalışma prensibi
            </h2>
          </div>

          <ul className="mt-16 rule-top">
            {principles.map((item, index) => (
              <li key={item.title}>
                <div className="service-row flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="service-row-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-2xl text-graphite">{item.title}</p>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-ash">{item.copy}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-tag">Başlayalım</p>
            <h2 className="mt-6 font-display text-display-lg text-graphite">
              Bakım planlamak sizin için kolay, uygulama bizim işimiz.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/randevu" className="btn-minimal-solid">
                Randevu al
              </Link>
              <Link href="/hakkimizda" className="link-underline">
                Hakkımızda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
