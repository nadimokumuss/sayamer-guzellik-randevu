import Link from "next/link";
import { notFound } from "next/navigation";

import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { AppIcon } from "@/components/ui/app-icon";
import { PageIntro } from "@/components/ui/page-intro";
import { getStaffForItem, getItemSummary } from "@/lib/catalog";
import { buildBookingHref, getInitials } from "@/lib/utils";

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
    <div className="shell py-10">
      <PageIntro
        eyebrow="Uzman Seçimi"
        title="Bakımını kiminle almak istediğini belirle"
        copy="Her hizmet veya paket için yalnızca uygun uzmanlar listelenir. Bir sonraki adımda sadece seçilen uzmanın boş saatleri gösterilir."
        icon="users"
        asideTitle="Doğru ekip eşleşmesi"
        asideCopy="Profil kartları sadeleştirildi; uzmanı seçerken önce imza alanı, sonra detaylar görünür."
        stats={[
          { label: "Uygun uzman", value: String(staff.length) },
          { label: "Akış", value: "2 / 4" },
          { label: "Seçim", value: bookingType === "package" ? "Paket" : "Hizmet" },
          { label: "Sonraki adım", value: "Takvim" },
        ]}
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <BookingSummaryCard
          title={item.name}
          description={item.description}
          durationMinutes={item.durationMinutes}
          price={item.price}
          bookingTypeLabel={bookingType === "package" ? "Paket" : "Hizmet"}
          includedServices={item.includedServices.map((service) => service.name)}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {staff.map((member) => (
            <article key={member.id} className="glass-card overflow-hidden">
              <div className={`bg-gradient-to-r ${member.gradient} p-6`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#7b6668]">{member.title}</p>
                    <h2 className="mt-3 font-display text-3xl text-espresso">{member.name}</h2>
                  </div>
                  <span className="icon-badge h-14 w-14 rounded-[20px] bg-white/75 font-display text-xl text-rosewood">
                    {getInitials(member.name)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#5d494b]">{member.bio}</p>
              </div>

              <div className="space-y-4 p-6">
                <div className="rounded-[24px] bg-[#fcf7f3] p-4">
                  <div className="flex items-center gap-3">
                    <span className="icon-badge h-10 w-10 rounded-[16px]">
                      <AppIcon name="spark" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#8c7376]">İmza alanı</p>
                      <p className="font-medium text-espresso">{member.signature}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full border border-rosewood/10 bg-[#fcf7f3] px-3 py-2 text-xs text-[#6f5c5e]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-[#6f5c5e]">
                  Çalışma saatleri: {member.startHour}:00 - {member.endHour}:00
                </p>

                <Link
                  href={buildBookingHref("/takvim", {
                    bookingType,
                    itemId,
                    staffId: member.id,
                  })}
                  className="soft-button w-full"
                >
                  Takvime Geç
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
