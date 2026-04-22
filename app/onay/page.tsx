import Link from "next/link";
import { notFound } from "next/navigation";

import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
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

  return (
    <div>
      {/* HERO */}
      <section className="shell pt-20 pb-16 lg:pt-32 lg:pb-20">
        <p className="eyebrow-tag">Onaylandı</p>
        <h1 className="mt-8 max-w-3xl font-display text-display-xl text-graphite">
          Randevun Sayamer takvimine eklendi.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-ash">
          Seçilen hizmet, uzman ve zaman aralığı rezervasyon sistemine işlendi. Dilersen
          WhatsApp üzerinden hızlıca iletişime geçebilirsin.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <a
            href={appointment.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-minimal-solid"
          >
            WhatsApp mesajını aç
          </a>
          <Link href="/hizmetler" className="link-underline">
            Hizmetleri incele
          </Link>
        </div>
      </section>

      {/* DETAILS */}
      <section className="rule-top bg-bone">
        <div className="shell py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-0">
            <BookingSummaryCard
              title={appointment.itemName}
              description="Onay ekranında randevu özeti ve salon tarafındaki görünüm bir arada tutulur."
              durationMinutes={appointment.durationMinutes}
              price={appointment.price}
              bookingTypeLabel={appointment.bookingType === "package" ? "Paket" : "Hizmet"}
              staffName={staff?.name}
              date={appointment.date}
              timeLabel={`${appointment.startTime} - ${appointment.endTime}`}
            />

            <div className="lg:pl-12">
              <p className="eyebrow-tag">Müşteri bilgisi</p>
              <dl className="mt-8 space-y-6 border-t border-hairline pt-8 text-sm">
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-6">
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-ash">
                    Ad Soyad
                  </dt>
                  <dd className="font-display text-xl text-graphite">
                    {appointment.customer.firstName} {appointment.customer.lastName}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-6">
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-ash">
                    Telefon
                  </dt>
                  <dd className="font-display text-xl text-graphite tabular-nums">
                    {appointment.customer.phone}
                  </dd>
                </div>
                {staff ? (
                  <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-6">
                    <dt className="text-[11px] uppercase tracking-[0.22em] text-ash">
                      Uzman
                    </dt>
                    <dd className="text-graphite">{staff.name}</dd>
                  </div>
                ) : null}
              </dl>

              <p className="mt-12 eyebrow-tag">Sonraki adımlar</p>
              <ul className="mt-8 rule-top">
                {[
                  { label: "Hazır WhatsApp mesajı", value: "Oluşturuldu" },
                  { label: "Takvim", value: "Seans bloğu işlendi" },
                  { label: "Uzman", value: staff?.name || "—" },
                ].map((item, index) => (
                  <li key={item.label}>
                    <div className="service-row">
                      <span className="service-row-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="service-row-name">{item.label}</span>
                      <span className="service-row-meta">{item.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
