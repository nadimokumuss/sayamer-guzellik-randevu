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
  const [deleteError, setDeleteError] = useState<string | null>(null);
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
          headers: { "Content-Type": "application/json" },
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
      <form onSubmit={handleSubmit} className="space-y-5 rounded-[24px] border border-hairline bg-white p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
            Bloke Saat
          </p>
          <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-graphite">
            Yeni kapanış ekle
          </h2>
          <p className="mt-3 text-sm leading-7 text-ash">
            Mola, oda hazırlığı veya ekip arası gibi durumları görünür kılmak için ayrı bir blok
            oluştur.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Toplam ekip" value={String(staff.length)} />
          <Field label="Aktif bloke" value={String(blockedSlots.length)} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Uzman">
            <select name="staffId" className={inputCls} defaultValue={staff[0]?.id}>
              {staff.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} · {member.title}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Tarih">
            <input name="date" type="date" className={inputCls} defaultValue={defaultDate} />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Başlangıç">
            <input name="startTime" type="time" className={inputCls} defaultValue="12:00" />
          </FormField>
          <FormField label="Bitiş">
            <input name="endTime" type="time" className={inputCls} defaultValue="13:00" />
          </FormField>
        </div>

        <FormField label="Sebep">
          <input
            name="reason"
            className={inputCls}
            placeholder="Sebep"
            defaultValue="Mola / oda hazırlığı"
          />
        </FormField>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-graphite px-6 py-3 text-sm font-semibold text-white transition hover:bg-mocha disabled:opacity-70"
        >
          {isPending ? "Kaydediliyor..." : "Bloke Saat Ekle"}
        </button>
      </form>

      <div className="rounded-[24px] border border-hairline bg-white p-6">
        <div className="flex items-center justify-between gap-4 border-b border-hairline pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rosewood">
              Mevcut Liste
            </p>
            <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-graphite">
              Kapanış ve aralar
            </h2>
          </div>
          <span className="rounded-full bg-peachLight px-3 py-1 text-[11px] font-semibold text-mocha">
            {blockedSlots.length} kayıt
          </span>
        </div>

        {deleteError ? (
          <div
            className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            role="alert"
          >
            {deleteError}
          </div>
        ) : null}

        <ul className="mt-5 space-y-2">
          {blockedSlots.map((slot) => {
            const member = staff.find((entry) => entry.id === slot.staffId);
            return (
              <li
                key={slot.id}
                className="flex flex-col gap-3 rounded-2xl border border-hairline p-4 transition hover:border-graphite/20 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold tracking-tight text-graphite">
                    {member?.name || "Uzman"}
                  </p>
                  <p className="mt-1 text-xs tabular-nums text-ash">
                    {formatLongDate(slot.date)} · {slot.startTime} - {slot.endTime}
                  </p>
                  <p className="mt-1 text-xs text-graphite/75">{slot.reason}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline bg-white px-4 py-1.5 text-[12px] font-semibold tracking-tight text-graphite transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                  onClick={() =>
                    startTransition(() => {
                      void (async () => {
                        setDeleteError(null);
                        try {
                          const response = await fetch(`/api/admin/blocked-slots/${slot.id}`, {
                            method: "DELETE",
                          });
                          if (!response.ok) {
                            const result = (await response.json().catch(() => ({}))) as {
                              error?: string;
                            };
                            setDeleteError(result.error || "Bloke saat silinemedi.");
                            return;
                          }
                          router.refresh();
                        } catch {
                          setDeleteError("Bloke saat silinemedi.");
                        }
                      })();
                    })
                  }
                >
                  Kaldır
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-full border border-hairline bg-white px-4 py-2.5 text-sm text-graphite transition focus:border-graphite focus:outline-none focus:ring-2 focus:ring-graphite/15";

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ash">
        {label}
      </span>
      {children}
    </label>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-peachLight/40 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ash">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold tabular-nums text-graphite">
        {value}
      </p>
    </div>
  );
}
