import { NextRequest, NextResponse } from "next/server";

import { getAppointments } from "@/lib/store";

export function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const status = request.nextUrl.searchParams.get("status");

  let appointments = getAppointments();
  if (date) {
    appointments = appointments.filter((appointment) => appointment.date === date);
  }
  if (status) {
    appointments = appointments.filter((appointment) => appointment.status === status);
  }

  return NextResponse.json({ appointments });
}
