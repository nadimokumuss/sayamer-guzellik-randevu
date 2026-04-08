import { notFound } from "next/navigation";

import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { CustomerForm } from "@/components/booking/customer-form";
import { PageIntro } from "@/components/ui/page-intro";
import { getItemSummary, getStaffById } from "@/lib/catalog";
import { addMinutesToTime } from "@/lib/utils";

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
    <div className="shell py-10">
      <PageIntro
        eyebrow="Bilgi Formu"
        title="Son adım: müşteri bilgileri"
        copy="Bu adım tamamlandığında randevu anında oluşturulur, onay ekranına taşınır ve WhatsApp bağlantısı hazırlanır."
        icon="shield"
        asideTitle="Kısa ve kontrollü form"
        asideCopy="Zorunlu alanlar öne alınır; opsiyonel not ayrı tutulur. Böylece form daha hızlı tamamlanır."
        stats={[
          { label: "Akış", value: "4 / 4" },
          { label: "Uzman", value: staff.name },
          { label: "Saat", value: startTime },
          { label: "Sonuç", value: "Anında onay" },
        ]}
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
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
        <CustomerForm
          bookingType={bookingType}
          itemId={itemId}
          staffId={staffId}
          date={date}
          startTime={startTime}
        />
      </div>
    </div>
  );
}
