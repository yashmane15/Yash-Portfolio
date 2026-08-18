-- CreateTable
CREATE TABLE "PortfolioContent" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "draft" JSONB NOT NULL,
    "published" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "PortfolioContent_pkey" PRIMARY KEY ("id")
);
