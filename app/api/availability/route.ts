import { NextRequest, NextResponse } from "next/server";

import { getAvailability } from "@/lib/booking";
import { BookingType } from "@/lib/types";

export function GET(request: NextRequest) {
  const bookingType = request.nextUrl.searchParams.get("bookingType") as BookingType | null;
  const itemId = request.nextUrl.searchParams.get("itemId");
  const staffId = request.nextUrl.searchParams.get("staffId");
  const date = request.nextUrl.searchParams.get("date");

  if (
    (bookingType !== "service" && bookingType !== "package") ||
    !itemId ||
    !staffId ||
    !date
  ) {
    return NextResponse.json({ error: "Eksik sorgu parametresi" }, { status: 400 });
  }

  return NextResponse.json(getAvailability(bookingType, itemId, staffId, date));
}
