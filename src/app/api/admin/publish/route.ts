import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { publishPortfolioContent } from "@/lib/portfolio/content";
export async function POST() {
  if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const row = await publishPortfolioContent(); revalidatePath("/"); revalidatePath("/opengraph-image"); return NextResponse.json({ ok: true, publishedAt: row.publishedAt }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error && error.message === "DATABASE_NOT_CONFIGURED" ? "Database is not configured" : "Validation failed" }, { status: 400 }); }
}
