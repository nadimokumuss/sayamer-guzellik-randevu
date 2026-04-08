import { NextRequest, NextResponse } from "next/server";

import { updateAppointmentStatus } from "@/lib/store";
import { AppointmentStatus } from "@/lib/types";

const validStatuses: AppointmentStatus[] = [
  "confirmed",
  "checked_in",
  "completed",
  "cancelled",
];

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const payload = (await request.json()) as { status?: AppointmentStatus };

  if (!payload.status || !validStatuses.includes(payload.status)) {
    return NextResponse.json({ error: "Geçersiz durum" }, { status: 400 });
  }

  const appointment = updateAppointmentStatus(id, payload.status);
  if (!appointment) {
    return NextResponse.json({ error: "Randevu bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({ appointment });
}
