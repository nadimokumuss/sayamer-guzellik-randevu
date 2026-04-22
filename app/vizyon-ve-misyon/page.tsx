import Link from "next/link";

import { AppIcon } from "@/components/ui/app-icon";
import { Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { EditorialPhoto } from "@/components/ui/editorial-photo";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Vizyon ve Misyon",
  "Sayamer Güzellik vizyonu, misyonu ve çalışma yaklaşımı.",
);

const principles = [
  {
    title: "Karar verme sürecini kolaylaştırmak",
    copy: "Hizmet, süre ve fiyat bilgilerini açık sunarak müşteri için hızlı bir karar zemini oluşturuyoruz.",
    icon: "compass" as const,
  },
  {
    title: "İletişim, hijyen ve düzen ile bakım kalitesi",
    copy: "Rezervasyondan seans sonrasına kadar süreci destekleyen operasyonel çerçeveyi titizlikle tutuyoruz.",
    icon: "shield" as const,
  },
  {
    title: "Tekrar gelme isteği uyandıran güvenli bir salon hissi",
    copy: "Kişisel ilgi ve tutarlı hizmet ile müşterinin dönüş niyetini güçlendiriyoruz.",
    icon: "spark" as const,
  },
];

export default function VisionMissionPage() {
  return (
    <div className="shell py-10">
      <section className="card p-8 sm:p-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-400">
          <Link href="/" className="hover:text-espresso">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-espresso">Vizyon ve Misyon</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>Kurumsal</Eyebrow>
            <h1 className="mt-5 font-display text-display-lg text-espresso">
              Vizyonumuz ve misyonumuzla bakım deneyimini netleştiriyoruz
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-500">
              Sayamer, salon atmosferini ve bakım hizmetlerini aynı sakin çizgide buluşturan bir
              güzellik evi olmayı hedefler.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-line shadow-editorial">
            <img
              src={siteContent.media.editorial[1].src}
              alt={siteContent.media.editorial[1].alt}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision + Mission side by side */}
      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <article className="spotlight-panel">
          <Eyebrow>Vizyon</Eyebrow>
          <h2 className="mt-4 font-display text-display-md text-espresso">Uzun vadeli bakışımız</h2>
          <p className="mt-5 text-base leading-8 text-ink-500">
            {siteContent.visionMission.vision}
          </p>
        </article>

        <article className="spotlight-panel">
          <Eyebrow>Misyon</Eyebrow>
          <h2 className="mt-4 font-display text-display-md text-espresso">Günlük çalışma prensibimiz</h2>
          <p className="mt-5 text-base leading-8 text-ink-500">
            {siteContent.visionMission.mission}
          </p>
        </article>
      </section>

      {/* Editorial */}
      <section className="mt-16">
        <Eyebrow>Salon Kareleri</Eyebrow>
        <h2 className="mt-4 font-display text-display-md text-espresso">
          Sayamer'in atmosferinden kesitler
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteContent.media.editorial.slice(0, 3).map((item) => (
            <EditorialPhoto
              key={item.src}
              src={item.src}
              alt={item.alt}
              eyebrow={item.eyebrow}
              title={item.title}
              copy={item.copy}
              imageClassName="aspect-[4/5] min-h-[260px]"
            />
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="mt-16">
        <Eyebrow>İlkelerimiz</Eyebrow>
        <h2 className="mt-4 font-display text-display-md text-espresso">
          Her ziyaretin arkasında üç temel çalışma prensibi var
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="card p-7">
              <span className="icon-badge icon-badge-sm">
                <AppIcon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl leading-tight text-espresso">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-500">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <Eyebrow>Başlayalım</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-espresso">
              Bakım planlamak sizin için kolay, uygulama bizim işimiz
            </h2>
          </div>
          <LinkButton href="/randevu" variant="primary" size="lg">
            Randevu Oluştur
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
