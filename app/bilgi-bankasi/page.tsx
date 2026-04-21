import Link from "next/link";

import { Eyebrow } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { buildPageMetadata, siteContent } from "@/lib/site";

export const metadata = buildPageMetadata(
  "Bilgi Bankası",
  "Sayamer Güzellik bilgi bankası ve sık sorulan sorular.",
);

export default function KnowledgeBasePage() {
  return (
    <div className="shell py-10">
      {/* Hero */}
      <section className="card p-8 sm:p-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-400">
          <Link href="/" className="hover:text-espresso">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-espresso">Bilgi Bankası</span>
        </nav>

        <div className="mt-6 max-w-3xl">
          <Eyebrow>Medya</Eyebrow>
          <h1 className="mt-5 font-display text-display-lg text-espresso">Bilgi Bankası</h1>
          <p className="mt-5 text-base leading-8 text-ink-500">
            Randevu süreci, fiyat yaklaşımı ve paket seçimleri hakkında en çok sorulan konuların
            kısa yanıtlarını burada bulabilirsiniz.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4">
          <div className="card p-6">
            <Eyebrow>Yardım</Eyebrow>
            <h2 className="mt-4 font-display text-2xl text-espresso">Sorunuz listede yok mu?</h2>
            <p className="mt-3 text-sm leading-7 text-ink-500">
              Ekibimize ulaşın, sizi en kısa sürede yönlendirelim.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <LinkButton href="/iletisim" variant="primary" size="md">
                İletişim Formu
              </LinkButton>
              <LinkButton
                href={siteContent.contact.whatsappUrl}
                external
                variant="outline"
                size="md"
              >
                WhatsApp
              </LinkButton>
            </div>
          </div>

          <div className="card-muted">
            <p className="eyebrow-text">Hızlı bağlantılar</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/hizmetler" className="text-ink-500 hover:text-espresso">
                  Hizmetleri gör →
                </Link>
              </li>
              <li>
                <Link href="/paketler" className="text-ink-500 hover:text-espresso">
                  Paketleri incele →
                </Link>
              </li>
              <li>
                <Link href="/randevu" className="text-ink-500 hover:text-espresso">
                  Online randevu →
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="space-y-3">
          {siteContent.knowledgeBase.map((item, index) => (
            <details
              key={item.question}
              className="group card p-0"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-7">
                <h3 className="font-display text-xl text-espresso">{item.question}</h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-rosewood transition group-open:rotate-45">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-line-subtle px-6 pb-6 pt-5 sm:px-7">
                <p className="text-base leading-8 text-ink-500">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
