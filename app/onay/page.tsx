import Link from "next/link";
import { notFound } from "next/navigation";

import { InView } from "@/components/motion/in-view";
import { Magnetic } from "@/components/motion/magnetic";
import { RevealText } from "@/components/motion/reveal-text";
import { BookingProgress } from "@/components/booking/booking-progress";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { SuccessCheck } from "@/components/booking/success-check";
import { DarkCTA } from "@/components/layout/dark-cta";
import { getStaffById } from "@/lib/catalog";
import { getAppointmentById } from "@/lib/store";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const dynamic = "force-dynamic";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const id = params.id;
  if (typeof id !== "string") {
    notFound();
  }

  const appointment = getAppointmentById(id);
  if (!appointment) {
    notFound();
  }

  const staff = getStaffById(appointment.staffId);

  const nextSteps = [
    { label: "Hazır WhatsApp mesajı", value: "Oluşturuldu" },
    { label: "Takvim", value: "Seans bloğu işlendi" },
    { label: "Uzman", value: staff?.name || "—" },
  ];

  return (
    <div>
      <BookingProgress current="confirm" />

      {/* Celebration hero */}
      <section className="bg-white">
        <div className="shell pt-14 pb-10 lg:pt-20 lg:pb-12">
          <InView>
            <SuccessCheck />
          </InView>

          <div className="mt-8 flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
              Onaylandı
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </div>

          <RevealText
            as="h1"
            className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-graphite"
          >
            Randevun hazır.
          </RevealText>

          <InView delay={0.3}>
            <p className="mt-6 max-w-xl text-base leading-8 text-ash">
              Seçilen hizmet, uzman ve zaman aralığı rezervasyon sistemine işlendi. WhatsApp
              üzerinden hızlıca iletişime geçebilirsin.
            </p>
          </InView>

          <InView delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={appointment.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-4 text-sm font-semibold text-white transition hover:bg-mocha"
                >
                  <span>WhatsApp mesajını aç</span>
                  <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white text-graphite transition group-hover:rotate-45">
                    →
                  </span>
                </a>
              </Magnetic>
              <Link href="/hizmetler" className="btn-pill-outline">
                <span>Hizmetleri incele</span>
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </InView>
        </div>
      </section>

      {/* Details */}
      <section className="border-t border-hairline bg-white">
        <div className="shell py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <BookingSummaryCard
              title={appointment.itemName}
              description="Onay sonrası randevu özeti ve salon tarafındaki görünüm bir arada tutulur."
              durationMinutes={appointment.durationMinutes}
              price={appointment.price}
              bookingTypeLabel={appointment.bookingType === "package" ? "Paket" : "Hizmet"}
              staffName={staff?.name}
              date={appointment.date}
              timeLabel={`${appointment.startTime} - ${appointment.endTime}`}
            />

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                Müşteri bilgisi
              </p>
              <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                <InView delay={0.1}>
                  <div className="rounded-[24px] border border-hairline bg-white p-5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                      Ad Soyad
                    </dt>
                    <dd className="mt-2 font-display text-xl font-extrabold tracking-tight text-graphite">
                      {appointment.customer.firstName} {appointment.customer.lastName}
                    </dd>
                  </div>
                </InView>
                <InView delay={0.2}>
                  <div className="rounded-[24px] border border-hairline bg-white p-5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                      Telefon
                    </dt>
                    <dd className="mt-2 font-display text-xl font-extrabold tabular-nums tracking-tight text-graphite">
                      {appointment.customer.phone}
                    </dd>
                  </div>
                </InView>
                {appointment.customer.email ? (
                  <InView delay={0.3}>
                    <div className="rounded-[24px] border border-hairline bg-white p-5 sm:col-span-2">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
                        E-posta
                      </dt>
                      <dd className="mt-2 font-display text-base font-semibold tracking-tight text-graphite break-all">
                        {appointment.customer.email}
                      </dd>
                    </div>
                  </InView>
                ) : null}
              </dl>

              <p className="mt-12 text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                Sonraki adımlar
              </p>
              <ul className="mt-7 grid gap-3">
                {nextSteps.map((step, idx) => (
                  <InView key={step.label} delay={idx * 0.08} y={16}>
                    <li className="flex items-center gap-4 rounded-full border border-hairline bg-white px-5 py-3">
                      <span className="font-display text-xs font-extrabold tabular-nums text-rosewood">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-base font-semibold tracking-tight text-graphite">
                        {step.label}
                      </span>
                      <span className="text-[12px] font-medium text-ash">{step.value}</span>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-400/15 text-emerald-700">
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M3 8.5l3.5 3.5L13 4" />
                        </svg>
                      </span>
                    </li>
                  </InView>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <DarkCTA
        number="06"
        eyebrow="Hatırlatma"
        title="Randevudan önce kısa bir not paylaşmak istersen WhatsApp'tan ulaşabilirsin."
        primaryCta={{ label: "WhatsApp", href: appointment.whatsappUrl }}
        secondaryCta={{ label: "Anasayfa", href: "/" }}
      />
    </div>
  );
}
