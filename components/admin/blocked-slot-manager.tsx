"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { BlockedSlot, StaffMember } from "@/lib/types";
import { formatLongDate } from "@/lib/utils";

type BlockedSlotManagerProps = {
  staff: StaffMember[];
  blockedSlots: BlockedSlot[];
  defaultDate: string;
};

export function BlockedSlotManager({
  staff,
  blockedSlots,
  defaultDate,
}: BlockedSlotManagerProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);

    const payload = {
      staffId: String(formData.get("staffId") || ""),
      date: String(formData.get("date") || ""),
      startTime: String(formData.get("startTime") || ""),
      endTime: String(formData.get("endTime") || ""),
      reason: String(formData.get("reason") || ""),
    };

    startTransition(() => {
      void (async () => {
        const response = await fetch("/api/admin/blocked-slots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const result = (await response.json()) as { error?: string };
          setError(result.error || "Bloke saat kaydedilemedi.");
          return;
        }
        router.refresh();
        form.reset();
      })();
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6">
        <div>
          <span className="eyebrow">Bloke Saat</span>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-espresso">
            Yeni kapanış ekle
          </h2>
        </div>

        <select name="staffId" className="field" defaultValue={staff[0]?.id}>
          {staff.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} • {member.title}
            </option>
          ))}
        </select>
        <input name="date" type="date" className="field" defaultValue={defaultDate} />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="startTime" type="time" className="field" defaultValue="12:00" />
          <input name="endTime" type="time" className="field" defaultValue="13:00" />
        </div>
        <input name="reason" className="field" placeholder="Sebep" defaultValue="Mola / oda hazırlığı" />

        {error ? (
          <div className="rounded-[20px] border border-rosewood/15 bg-[#fff4f4] px-4 py-3 text-sm text-rosewood">
            {error}
          </div>
        ) : null}

        <button type="submit" disabled={isPending} className="soft-button w-full">
          {isPending ? "Kaydediliyor..." : "Bloke Saat Ekle"}
        </button>
      </form>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Mevcut Liste</span>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-espresso">
              Kapanış ve aralar
            </h2>
          </div>
          <span className="admin-chip">{blockedSlots.length} kayıt</span>
        </div>

        <div className="mt-6 space-y-3">
          {blockedSlots.map((slot) => {
            const member = staff.find((entry) => entry.id === slot.staffId);
            return (
              <div key={slot.id} className="rounded-[24px] bg-[#fcf7f3] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-semibold text-espresso">{member?.name || "Uzman"}</p>
                    <p className="mt-1 text-sm text-[#6f5c5e]">
                      {formatLongDate(slot.date)} • {slot.startTime} - {slot.endTime}
                    </p>
                    <p className="mt-2 text-sm text-[#8c7376]">{slot.reason}</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-rosewood/15 px-4 py-2 text-sm text-rosewood"
                    onClick={() =>
                      startTransition(() => {
                        void (async () => {
                          await fetch(`/api/admin/blocked-slots/${slot.id}`, {
                            method: "DELETE",
                          });
                          router.refresh();
                        })();
                      })
                    }
                  >
                    Sil
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
