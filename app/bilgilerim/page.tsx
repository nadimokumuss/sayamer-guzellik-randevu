import { notFound } from "next/navigation";

import { BookingProgress } from "@/components/booking/booking-progress";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { CustomerForm } from "@/components/booking/customer-form";
import { SectionHeader } from "@/components/layout/section-header";
import { getItemSummary, getStaffById } from "@/lib/catalog";
import { addMinutesToTime, buildBookingHref } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CustomerDetailsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const bookingType = params.bookingType;
  const itemId = params.itemId;
  const staffId = params.staffId;
  const date = params.date;
  const startTime = params.startTime;

  if (
    (bookingType !== "service" && bookingType !== "package") ||
    typeof itemId !== "string" ||
    typeof staffId !== "string" ||
    typeof date !== "string" ||
    typeof startTime !== "string"
  ) {
    notFound();
  }

  const item = getItemSummary(bookingType, itemId);
  const staff = getStaffById(staffId);
  if (!item || !staff) {
    notFound();
  }

  return (
    <div>
      <BookingProgress
        current="info"
        hrefs={{
          service: bookingType === "service" ? "/hizmetler" : "/paketler",
          staff: buildBookingHref("/personeller", { bookingType, itemId }),
          time: buildBookingHref("/takvim", { bookingType, itemId, staffId, date }),
        }}
      />

      <section className="bg-white">
        <div className="shell py-14 lg:py-20">
          <SectionHeader
            number="04"
            eyebrow="Bilgi formu"
            title="Son adım: müşteri bilgileri."
            align="stacked"
          />
          <p className="mt-6 max-w-2xl text-base leading-8 text-ash">
            Bu adım tamamlandığında randevu anında oluşturulur, onay ekranına taşınır ve
            WhatsApp bağlantısı hazırlanır.
          </p>
        </div>
      </section>

      <section className="border-t border-hairline bg-white">
        <div className="shell py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <BookingSummaryCard
              title={item.name}
              description={item.description}
              durationMinutes={item.durationMinutes}
              price={item.price}
              staffName={staff.name}
              date={date}
              timeLabel={`${startTime} - ${addMinutesToTime(startTime, item.durationMinutes)}`}
              bookingTypeLabel={bookingType === "package" ? "Paket" : "Hizmet"}
              includedServices={item.includedServices.map((service) => service.name)}
            />
            <div>
              <CustomerForm
                bookingType={bookingType}
                itemId={itemId}
                staffId={staffId}
                date={date}
                startTime={startTime}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
