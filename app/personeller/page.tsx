import Link from "next/link";
import { notFound } from "next/navigation";

import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { PageIntro } from "@/components/ui/page-intro";
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
      <PageIntro
        eyebrow="02 · Uzman seçimi"
        title="Bakımını kiminle almak istersin?"
        copy="Her hizmet veya paket için yalnızca uygun uzmanlar listelenir. Bir sonraki adımda sadece seçilen uzmanın boş saatleri gösterilir."
        stats={[
          { label: "Uygun uzman", value: String(staff.length) },
          { label: "Akış", value: "2 / 4" },
          { label: "Seçim", value: bookingType === "package" ? "Paket" : "Hizmet" },
          { label: "Sonraki adım", value: "Takvim" },
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
              bookingTypeLabel={bookingType === "package" ? "Paket" : "Hizmet"}
              includedServices={item.includedServices.map((service) => service.name)}
            />

            <div className="lg:pl-12">
              <p className="eyebrow-tag">Uygun uzmanlar</p>
              <ul className="mt-8 rule-top">
                {staff.map((member, index) => (
                  <li key={member.id}>
                    <Link
                      href={buildBookingHref("/takvim", {
                        bookingType,
                        itemId,
                        staffId: member.id,
                      })}
                      className="service-row flex-col items-start gap-3 transition hover:pl-2 hover:text-clay sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <span className="service-row-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <p className="font-display text-2xl text-graphite">
                          {member.name}
                        </p>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-ash">
                          {member.title}
                        </p>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-ash">
                          {member.bio}
                        </p>
                        {member.specialties.length > 0 ? (
                          <p className="mt-3 text-xs leading-6 text-ash/80">
                            {member.specialties.slice(0, 4).join(" · ")}
                          </p>
                        ) : null}
                      </div>
                      <span className="service-row-meta whitespace-nowrap tabular-nums">
                        {member.startHour}:00 — {member.endHour}:00
                      </span>
                    </Link>
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
