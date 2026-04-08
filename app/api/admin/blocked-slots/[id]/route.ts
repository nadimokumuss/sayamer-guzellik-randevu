import { NextResponse } from "next/server";

import { removeBlockedSlot } from "@/lib/store";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const blockedSlot = removeBlockedSlot(id);
  if (!blockedSlot) {
    return NextResponse.json({ error: "Kayıt bulunamadı" }, { status: 404 });
  }
  return NextResponse.json({ blockedSlot });
}
