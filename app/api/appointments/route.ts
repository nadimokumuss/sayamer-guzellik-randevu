import { NextRequest, NextResponse } from "next/server";

import { createAppointment } from "@/lib/booking";
import { getAppointments } from "@/lib/store";
import { AppointmentRequest } from "@/lib/types";

export function GET() {
  return NextResponse.json({ appointments: getAppointments() });
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as AppointmentRequest;
    const appointment = createAppointment(payload);
    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Randevu oluşturulamadı" },
      { status: 400 },
    );
  }
}
