"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { AppIcon } from "@/components/ui/app-icon";
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
      <form onSubmit={handleSubmit} className="glass-card relative overflow-hidden space-y-5 p-6">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-[#f6dfdf]/70 via-white/10 to-transparent" />

        <div className="relative">
          <div className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name="block" className="h-7 w-7" />
            </span>
            <div>
              <span className="eyebrow">Bloke Saat</span>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-espresso">
                Yeni kapanış ekle
              </h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#6f5c5e]">
            Mola, oda hazırlığı veya ekip arası gibi durumları görünür kılmak için ayrı bir blok
            oluştur.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="metric-card">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Toplam ekip</p>
            <p className="mt-2 font-display text-3xl text-espresso">{staff.length}</p>
          </div>
          <div className="metric-card">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c7376]">Aktif bloke</p>
            <p className="mt-2 font-display text-3xl text-espresso">{blockedSlots.length}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
              Uzman
            </span>
            <select name="staffId" className="field" defaultValue={staff[0]?.id}>
              {staff.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} • {member.title}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
              Tarih
            </span>
            <input name="date" type="date" className="field" defaultValue={defaultDate} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
              Başlangıç
            </span>
            <input name="startTime" type="time" className="field" defaultValue="12:00" />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
              Bitiş
            </span>
            <input name="endTime" type="time" className="field" defaultValue="13:00" />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c7376]">
            Sebep
          </span>
          <input
            name="reason"
            className="field"
            placeholder="Sebep"
            defaultValue="Mola / oda hazırlığı"
          />
        </label>

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
          <div className="flex items-center gap-4">
            <span className="icon-badge icon-badge-lg">
              <AppIcon name="calendar" className="h-7 w-7" />
            </span>
            <div>
              <span className="eyebrow">Mevcut Liste</span>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-espresso">
                Kapanış ve aralar
              </h2>
            </div>
          </div>
          <span className="admin-chip">{blockedSlots.length} kayıt</span>
        </div>

        <div className="mt-6 space-y-3">
          {blockedSlots.map((slot) => {
            const member = staff.find((entry) => entry.id === slot.staffId);
            return (
              <div
                key={slot.id}
                className="rounded-[28px] border border-white/70 bg-[#fcf7f3] p-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="icon-badge h-12 w-12 rounded-[18px] bg-white/75">
                      <AppIcon name="clock" />
                    </span>
                    <div>
                      <p className="font-semibold text-espresso">{member?.name || "Uzman"}</p>
                      <p className="mt-1 text-sm text-[#6f5c5e]">
                        {formatLongDate(slot.date)} • {slot.startTime} - {slot.endTime}
                      </p>
                      <p className="mt-2 text-sm text-[#8c7376]">{slot.reason}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="soft-button-secondary"
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
                    Kaydı Sil
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
