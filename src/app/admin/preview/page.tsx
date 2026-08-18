import { requireAdmin } from "@/lib/auth/guard";
import { getDraftPortfolioContent } from "@/lib/portfolio/content";
import PortfolioApp from "@/components/PortfolioApp";
export const dynamic = "force-dynamic";
export default async function PreviewPage() { await requireAdmin(); const { content } = await getDraftPortfolioContent(); return <><div className="fixed left-1/2 top-2 z-[100] -translate-x-1/2 border border-amber bg-ink-900 px-3 py-1 tech-label text-amber">ADMIN DRAFT PREVIEW</div><PortfolioApp initialContent={content} /></>; }
