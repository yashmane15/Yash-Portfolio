import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getDraftPortfolioContent, saveDraftPortfolioContent } from "@/lib/portfolio/content";
export async function GET() { if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); return NextResponse.json(await getDraftPortfolioContent()); }
export async function PUT(request: Request) {
  if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const body = await request.json(); const row = await saveDraftPortfolioContent(body); return NextResponse.json({ ok: true, updatedAt: row.updatedAt }); }
  catch (error) { const message = error instanceof Error && error.message === "DATABASE_NOT_CONFIGURED" ? "Database is not configured" : "Validation failed"; return NextResponse.json({ error: message }, { status: 400 }); }
}
