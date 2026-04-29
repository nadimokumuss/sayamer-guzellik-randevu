import { notFound } from "next/navigation";

import { BookingProgress } from "@/components/booking/booking-progress";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { StaffBentoCard } from "@/components/booking/staff-bento-card";
import { SectionHeader } from "@/components/layout/section-header";
import { getStaffForItem, getItemSummary } from "@/lib/catalog";
import { buildBookingHref } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function StaffPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const bookingType = params.bookingType;
  const itemId = params.itemId;

  if (
    (bookingType !== "service" && bookingType !== "package") ||
    typeof itemId !== "string"
  ) {
    notFound();
  }

  const item = getItemSummary(bookingType, itemId);
  if (!item) {
    notFound();
  }

  const staff = getStaffForItem(bookingType, itemId);

  return (
    <div>
      <BookingProgress
        current="staff"
        hrefs={{
          service: bookingType === "service" ? "/hizmetler" : "/paketler",
        }}
      />

      <section className="bg-white">
        <div className="shell py-14 lg:py-20">
          <SectionHeader
            number="02"
            eyebrow="Uzman seçimi"
            title="Bakımını kiminle almak istersin?"
            align="stacked"
          />
          <p className="mt-6 max-w-2xl text-base leading-8 text-ash">
            Her hizmet veya paket için yalnızca uygun uzmanlar listelenir. Bir sonraki
            adımda yalnızca seçilen uzmanın boş saatleri gösterilecek.
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
              bookingTypeLabel={bookingType === "package" ? "Paket" : "Hizmet"}
              includedServices={item.includedServices.map((service) => service.name)}
            />

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
                Uygun uzmanlar · {staff.length}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {staff.map((member, idx) => (
                  <StaffBentoCard
                    key={member.id}
                    staff={member}
                    delay={idx * 0.08}
                    href={buildBookingHref("/takvim", {
                      bookingType,
                      itemId,
                      staffId: member.id,
                    })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
