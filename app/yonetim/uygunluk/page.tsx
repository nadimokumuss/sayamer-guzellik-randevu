import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BlockedSlotManager } from "@/components/admin/blocked-slot-manager";
import { getCatalog } from "@/lib/catalog";
import { getBlockedSlots } from "@/lib/store";
import { getNextOpenDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminAvailabilityPage() {
  const catalog = getCatalog();
  const blockedSlots = getBlockedSlots();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Uygunluk"
        title="Bloke saat yönetimi"
        copy="Operasyon araları, mola blokları ve oda hazırlık zamanları ayrı bir yüzeyde yönetilir."
        stats={[
          { label: "Uzman", value: String(catalog.staff.length) },
          { label: "Aktif bloke", value: String(blockedSlots.length) },
          { label: "Başlangıç", value: getNextOpenDate() },
          { label: "Kullanım", value: "Operasyon" },
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
