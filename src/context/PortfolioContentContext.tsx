"use client";

import { createContext, useContext } from "react";
import { defaultPortfolioContent, type PortfolioContent } from "@/data/portfolio";

const PortfolioContentContext = createContext<PortfolioContent>(defaultPortfolioContent);

export function PortfolioContentProvider({ initialContent, children }: { initialContent: PortfolioContent; children: React.ReactNode }) {
  return <PortfolioContentContext.Provider value={initialContent}>{children}</PortfolioContentContext.Provider>;
}

export function usePortfolioContent() {
  return useContext(PortfolioContentContext);
}
