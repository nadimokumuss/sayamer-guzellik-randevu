import Link from "next/link";
import { notFound } from "next/navigation";

import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { AppIcon } from "@/components/ui/app-icon";
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
    <div className="shell py-10">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="glass-card relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-[#dff0e7]/80 via-white/10 to-transparent" />

          <div className="relative">
            <div className="flex items-center gap-4">
              <span className="icon-badge icon-badge-lg bg-[#f3fbf6] text-[#476856]">
                <AppIcon name="check" className="h-7 w-7" />
              </span>
              <div>
                <span className="eyebrow">Onaylandı</span>
                <h1 className="mt-5 font-display text-5xl leading-tight tracking-tight text-espresso">
                  Randevun Sayamer takvimine eklendi.
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#6f5c5e]">
              Seçilen hizmet, uzman ve zaman aralığı salon paneline düştü. İstersen önceden
              hazırlanmış WhatsApp mesajıyla ekip ile hızlıca iletişime geçebilirsin.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link href={appointment.whatsappUrl} className="soft-button" target="_blank">
                WhatsApp Mesajını Aç
              </Link>
              <Link href="/yonetim/randevular" className="soft-button-secondary">
                Panelde Görüntüle
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: "message", title: "Mesaj", copy: "Hazır metin oluşturuldu" },
                { icon: "calendar", title: "Takvim", copy: "Seans bloğu işlendi" },
                { icon: "users", title: "Uzman", copy: staff?.name || "-" },
              ].map((item) => (
                <div key={item.title} className="metric-card">
                  <span className="icon-badge h-10 w-10 rounded-[16px]">
                    <AppIcon name={item.icon as "message" | "calendar" | "users"} />
                  </span>
                  <p className="mt-4 font-medium text-espresso">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#6f5c5e]">{item.copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[28px] bg-[#fcf7f3] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
                Müşteri Bilgisi
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[20px] bg-white/80 p-4">
                  <p className="text-sm text-[#8c7376]">Ad Soyad</p>
                  <p className="mt-2 font-medium text-espresso">
                    {appointment.customer.firstName} {appointment.customer.lastName}
                  </p>
                </div>
                <div className="rounded-[20px] bg-white/80 p-4">
                  <p className="text-sm text-[#8c7376]">Telefon</p>
                  <p className="mt-2 font-medium text-espresso">{appointment.customer.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
      </div>
    </div>
  );
}
