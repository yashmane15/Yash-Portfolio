import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth/session";

const attempts = new Map<string, { count: number; reset: number }>();
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const state = attempts.get(ip);
  if (state && state.reset > now && state.count >= 5) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const { username, password } = await request.json().catch(() => ({}));
  const configuredUser = process.env.ADMIN_USERNAME;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const valid = typeof username === "string" && typeof password === "string" && configuredUser && hash && username === configuredUser && await bcrypt.compare(password, hash);
  if (!valid) {
    attempts.set(ip, { count: state && state.reset > now ? state.count + 1 : 1, reset: now + 15 * 60_000 });
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  attempts.delete(ip);
  await createSession(username);
  return NextResponse.json({ ok: true });
}
