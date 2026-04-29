import { notFound } from "next/navigation";

import { AvailabilityPicker } from "@/components/booking/availability-picker";
import { BookingProgress } from "@/components/booking/booking-progress";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { SectionHeader } from "@/components/layout/section-header";
import { getItemSummary, getStaffById } from "@/lib/catalog";
import { buildBookingHref, getNextOpenDate } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const bookingType = params.bookingType;
  const itemId = params.itemId;
  const staffId = params.staffId;
  const date = typeof params.date === "string" ? params.date : getNextOpenDate();

  if (
    (bookingType !== "service" && bookingType !== "package") ||
    typeof itemId !== "string" ||
    typeof staffId !== "string"
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
        current="time"
        hrefs={{
          service: bookingType === "service" ? "/hizmetler" : "/paketler",
          staff: buildBookingHref("/personeller", { bookingType, itemId }),
        }}
      />

      <section className="bg-white">
        <div className="shell py-14 lg:py-20">
          <SectionHeader
            number="03"
            eyebrow="Takvim"
            title="Gün ve saat seçimi."
            align="stacked"
          />
          <p className="mt-6 max-w-2xl text-base leading-8 text-ash">
            Uygunluk motoru çalışma saatlerini, bloke aralıkları ve dolu randevuları birlikte
            dikkate alır. Yalnızca gerçekten müsait saatler görünür.
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
              bookingTypeLabel={bookingType === "package" ? "Paket" : "Hizmet"}
              includedServices={item.includedServices.map((service) => service.name)}
            />
            <div>
              <AvailabilityPicker
                bookingType={bookingType}
                itemId={itemId}
                staffId={staffId}
                initialDate={date}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
