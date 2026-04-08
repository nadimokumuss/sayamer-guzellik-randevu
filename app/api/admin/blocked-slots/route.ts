import { randomUUID } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { addBlockedSlot, getBlockedSlots } from "@/lib/store";

export function GET() {
  return NextResponse.json({ blockedSlots: getBlockedSlots() });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as {
    staffId?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    reason?: string;
  };

  if (
    !payload.staffId ||
    !payload.date ||
    !payload.startTime ||
    !payload.endTime ||
    !payload.reason
  ) {
    return NextResponse.json({ error: "Eksik alan var" }, { status: 400 });
  }

  const blockedSlot = addBlockedSlot({
    id: randomUUID(),
    staffId: payload.staffId,
    date: payload.date,
    startTime: payload.startTime,
    endTime: payload.endTime,
    reason: payload.reason,
  });

  return NextResponse.json({ blockedSlot }, { status: 201 });
}
