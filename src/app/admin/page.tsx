import { requireAdmin } from "@/lib/auth/guard";
import { getDraftPortfolioContent } from "@/lib/portfolio/content";
import AdminEditor from "@/components/admin/AdminEditor";
export const dynamic = "force-dynamic";
export default async function AdminPage() { const session = await requireAdmin(); const state = await getDraftPortfolioContent(); return <AdminEditor initial={state.content} username={session.username} database={state.database} updatedAt={state.updatedAt?.toISOString() ?? null} publishedAt={state.publishedAt?.toISOString() ?? null} />; }
