import { NextResponse } from "next/server";

import { getAppointmentById } from "@/lib/store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const appointment = getAppointmentById(id);
  if (!appointment) {
    return NextResponse.json({ error: "Randevu bulunamadı" }, { status: 404 });
  }
  return NextResponse.json({ appointment });
}
