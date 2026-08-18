import PortfolioApp from "@/components/PortfolioApp";
import { getPublishedPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-dynamic";
export default async function Home() {
  return <PortfolioApp initialContent={await getPublishedPortfolioContent()} />;
}
