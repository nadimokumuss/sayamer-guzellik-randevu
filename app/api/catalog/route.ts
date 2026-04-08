import { NextResponse } from "next/server";

import { getCatalog } from "@/lib/catalog";

export function GET() {
  return NextResponse.json(getCatalog());
}
