import { NextRequest, NextResponse } from "next/server";

import { createAppointment } from "@/lib/booking";
import { getAppointments } from "@/lib/store";
import { AppointmentRequest } from "@/lib/types";
import {
  EMAIL_FORMAT_MESSAGE,
  PHONE_FORMAT_MESSAGE,
  isValidEmail,
  normalizePhone,
} from "@/lib/validation";

export function GET() {
  return NextResponse.json({ appointments: getAppointments() });
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as AppointmentRequest;
    const customer = payload?.customer;

    if (!customer?.firstName?.trim() || !customer?.lastName?.trim() || !customer?.phone?.trim()) {
      return NextResponse.json(
        { error: "Ad, soyad ve telefon alanları zorunlu." },
        { status: 400 },
      );
    }

    const normalizedPhone = normalizePhone(customer.phone);
    if (!normalizedPhone) {
      return NextResponse.json({ error: PHONE_FORMAT_MESSAGE }, { status: 400 });
    }

    if (customer.email && !isValidEmail(customer.email)) {
      return NextResponse.json({ error: EMAIL_FORMAT_MESSAGE }, { status: 400 });
    }

    const appointment = createAppointment({
      ...payload,
      customer: { ...customer, phone: normalizedPhone },
    });
    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Randevu oluşturulamadı" },
      { status: 400 },
    );
  }
}
