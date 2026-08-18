import { PrismaClient } from "@prisma/client";
import { defaultPortfolioContent } from "../src/data/portfolio";

const prisma = new PrismaClient();

async function main() {
  await prisma.portfolioContent.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      draft: defaultPortfolioContent,
      published: defaultPortfolioContent,
      publishedAt: new Date(),
    },
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });