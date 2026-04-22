import { notFound } from "next/navigation";

import { AvailabilityPicker } from "@/components/booking/availability-picker";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { PageIntro } from "@/components/ui/page-intro";
import { getItemSummary, getStaffById } from "@/lib/catalog";
import { getNextOpenDate } from "@/lib/utils";

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
      <PageIntro
        eyebrow="03 · Takvim"
        title="Gün ve saat seçimi"
        copy="Uygunluk motoru; çalışma saatlerini, bloke aralıkları ve dolu randevuları birlikte dikkate alır. Yalnızca gerçekten müsait saatler görünür."
        stats={[
          { label: "Akış", value: "3 / 4" },
          { label: "Uzman", value: staff.name },
          { label: "Süre", value: `${item.durationMinutes} dk` },
          { label: "Başlangıç", value: date },
        ]}
      />

      <section className="rule-top bg-bone">
        <div className="shell py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-0">
            <BookingSummaryCard
              title={item.name}
              description={item.description}
              durationMinutes={item.durationMinutes}
              price={item.price}
              staffName={staff.name}
              bookingTypeLabel={bookingType === "package" ? "Paket" : "Hizmet"}
              includedServices={item.includedServices.map((service) => service.name)}
            />
            <div className="lg:pl-12">
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
