import "server-only";
import { defaultPortfolioContent, type PortfolioContent } from "@/data/portfolio";
import { portfolioContentSchema } from "./validation";

async function db() {
  if (!process.env.DATABASE_URL) return null;
  const { prisma } = await import("@/lib/db");
  return prisma;
}

function validated(value: unknown): PortfolioContent | null {
  const result = portfolioContentSchema.safeParse(value);
  return result.success ? (result.data as PortfolioContent) : null;
}

export async function getPublishedPortfolioContent(): Promise<PortfolioContent> {
  try {
    const client = await db();
    if (!client) return defaultPortfolioContent;
    const row = await client.portfolioContent.findUnique({ where: { id: "main" } });
    return validated(row?.published) ?? defaultPortfolioContent;
  } catch (error) {
    console.error("Published portfolio fallback activated", error instanceof Error ? error.message : "database unavailable");
    return defaultPortfolioContent;
  }
}

export async function getDraftPortfolioContent() {
  const client = await db();
  if (!client) return { content: defaultPortfolioContent, updatedAt: null, publishedAt: null, database: false };
  const row = await client.portfolioContent.findUnique({ where: { id: "main" } });
  return { content: validated(row?.draft) ?? defaultPortfolioContent, updatedAt: row?.updatedAt ?? null, publishedAt: row?.publishedAt ?? null, database: true };
}

export async function saveDraftPortfolioContent(input: unknown) {
  const content = portfolioContentSchema.parse(input) as PortfolioContent;
  const client = await db();
  if (!client) throw new Error("DATABASE_NOT_CONFIGURED");
  return client.portfolioContent.upsert({ where: { id: "main" }, update: { draft: content }, create: { id: "main", draft: content, published: defaultPortfolioContent } });
}

export async function publishPortfolioContent() {
  const client = await db();
  if (!client) throw new Error("DATABASE_NOT_CONFIGURED");
  const row = await client.portfolioContent.findUnique({ where: { id: "main" } });
  const draft = portfolioContentSchema.parse(row?.draft ?? defaultPortfolioContent);
  return client.portfolioContent.upsert({ where: { id: "main" }, update: { published: draft, publishedAt: new Date() }, create: { id: "main", draft, published: draft, publishedAt: new Date() } });
}
