"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AdminLogin() {
  const router = useRouter(); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true); setError(""); const data = new FormData(e.currentTarget); const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ username: data.get("username"), password: data.get("password") }) }); const body = await response.json(); setBusy(false); if (!response.ok) return setError(body.error ?? "Authentication failed"); router.replace("/admin"); router.refresh(); }
  return <main className="blueprint-grid flex min-h-screen items-center justify-center bg-ink-900 px-5">
    <form onSubmit={submit} className="w-full max-w-md border border-line-faint bg-ink-900/95 p-7 shadow-2xl">
      <div className="tech-label text-cyan">YASH-CORE</div><h1 className="mt-3 font-display text-3xl font-bold">ADMIN AUTHENTICATION</h1><p className="mt-2 text-sm text-paper-dim">Secure control channel</p>
      <label className="mt-7 block tech-label">USERNAME<input name="username" autoComplete="username" required className="mt-2 w-full border border-line-faint bg-ink-800 px-3 py-3 font-mono text-paper outline-none focus:border-cyan" /></label>
      <label className="mt-4 block tech-label">PASSWORD<input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full border border-line-faint bg-ink-800 px-3 py-3 font-mono text-paper outline-none focus:border-cyan" /></label>
      {error && <p role="alert" className="mt-4 border border-amber/40 bg-amber/5 p-3 text-sm text-amber">{error}</p>}
      <button disabled={busy} className="mt-6 w-full border border-cyan px-4 py-3 font-mono text-sm font-semibold text-cyan hover:bg-cyan hover:text-ink-900 disabled:opacity-50">{busy ? "AUTHENTICATING..." : "AUTHENTICATE"}</button>
    </form></main>;
}
