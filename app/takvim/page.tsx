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
    <div className="shell py-10">
      <PageIntro
        eyebrow="Takvim Adımı"
        title="Gün ve saat seçimi"
        copy="Uygunluk motoru; çalışma saatlerini, bloke aralıkları ve dolu randevuları birlikte dikkate alır."
        icon="calendar"
        asideTitle="Boş seansı hızlı kapat"
        asideCopy="Yalnızca gerçekten müsait saatler görünür. Sistem uygun olmayan aralıkları otomatik gizler."
        stats={[
          { label: "Akış", value: "3 / 4" },
          { label: "Uzman", value: staff.name },
          { label: "Süre", value: `${item.durationMinutes} dk` },
          { label: "Başlangıç", value: date },
        ]}
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <BookingSummaryCard
          title={item.name}
          description={item.description}
          durationMinutes={item.durationMinutes}
          price={item.price}
          staffName={staff.name}
          bookingTypeLabel={bookingType === "package" ? "Paket" : "Hizmet"}
          includedServices={item.includedServices.map((service) => service.name)}
        />
        <AvailabilityPicker
          bookingType={bookingType}
          itemId={itemId}
          staffId={staffId}
          initialDate={date}
        />
      </div>
    </div>
  );
}
