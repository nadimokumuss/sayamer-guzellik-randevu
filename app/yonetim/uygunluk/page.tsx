import { BlockedSlotManager } from "@/components/admin/blocked-slot-manager";
import { PageIntro } from "@/components/ui/page-intro";
import { getCatalog } from "@/lib/catalog";
import { getBlockedSlots } from "@/lib/store";
import { getNextOpenDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminAvailabilityPage() {
  const catalog = getCatalog();
  const blockedSlots = getBlockedSlots();

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Uygunluk"
        title="Bloke saat yönetimi"
        copy="Operasyon araları, mola blokları ve oda hazırlık zamanları ayrı bir yüzeyde yönetilir. Form ve mevcut liste artık birbirinden daha net ayrılmıştır."
        icon="block"
        asideTitle="Çakışmayı görsel yönet"
        asideCopy="Yeni blok ekleme ve mevcut kapanışları silme işlemleri aynı ekranda ama ayrı rollerle düzenlenir."
        stats={[
          { label: "Uzman", value: String(catalog.staff.length) },
          { label: "Aktif bloke", value: String(blockedSlots.length) },
          { label: "Başlangıç günü", value: getNextOpenDate() },
          { label: "Kullanım", value: "Operasyon odaklı" },
        ]}
      />

      <BlockedSlotManager
        staff={catalog.staff}
        blockedSlots={blockedSlots}
        defaultDate={getNextOpenDate()}
      />
    </div>
  );
}
