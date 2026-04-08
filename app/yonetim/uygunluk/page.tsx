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
      <section className="glass-card p-8">
        <span className="eyebrow">Uygunluk</span>
        <h1 className="mt-5 font-display text-5xl tracking-tight text-espresso">
          Bloke saat yönetimi
        </h1>
      </section>

      <BlockedSlotManager
        staff={catalog.staff}
        blockedSlots={blockedSlots}
        defaultDate={getNextOpenDate()}
      />
    </div>
  );
}
