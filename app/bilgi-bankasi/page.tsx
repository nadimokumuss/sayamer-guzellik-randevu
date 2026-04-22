import Link from "next/link";

import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Bilgi Bankası",
  "Sayamer Güzellik bilgi bankası ve sık sorulan sorular.",
);

export default function KnowledgeBasePage() {
  return (
    <div>
      {/* HERO */}
      <section className="shell pt-20 pb-20 lg:pt-32 lg:pb-24">
        <p className="eyebrow-tag">Bilgi bankası</p>
        <h1 className="mt-8 max-w-3xl font-display text-display-xl text-graphite">
          Sık sorulan sorular ve kısa yanıtlar.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-ash">
          Randevu süreci, fiyat yaklaşımı ve paket seçimleri hakkında en çok sorulan
          konuların kısa yanıtlarını burada bulabilirsiniz.
        </p>
      </section>

      {/* FAQ */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
            <div>
              <p className="eyebrow-tag">Yardım</p>
              <h2 className="mt-6 font-display text-display-lg text-graphite">
                Sorunuz listede yok mu?
              </h2>
              <p className="mt-6 max-w-sm text-base leading-8 text-ash">
                Ekibimize ulaşın, sizi en kısa sürede yönlendirelim.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <Link href="/iletisim" className="btn-minimal-solid">
                  İletişim formu
                </Link>
                <a
                  href={siteContent.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <ul className="rule-top">
              {siteContent.knowledgeBase.map((item, index) => (
                <li key={item.question}>
                  <details className="group border-b border-hairline py-8" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                      <span className="flex items-baseline gap-6">
                        <span className="service-row-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-2xl text-graphite">
                          {item.question}
                        </span>
                      </span>
                      <span className="text-ash transition group-open:rotate-45">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-6 ml-[56px] max-w-2xl text-base leading-8 text-ash">
                      {item.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="rule-top bg-bone">
        <div className="shell py-24 lg:py-32">
          <p className="eyebrow-tag">Hızlı bağlantılar</p>
          <ul className="mt-12 rule-top">
            {[
              { label: "Hizmetleri gör", href: "/hizmetler" },
              { label: "Paketleri incele", href: "/paketler" },
              { label: "Online randevu", href: "/randevu" },
            ].map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="service-row transition hover:pl-2 hover:text-clay"
                >
                  <span className="service-row-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="service-row-name">{item.label}</span>
                  <span className="service-row-meta">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
