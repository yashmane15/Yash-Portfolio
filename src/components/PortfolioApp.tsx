"use client";
import { useState } from "react";
import type { PortfolioContent } from "@/data/portfolio";
import { PortfolioContentProvider } from "@/context/PortfolioContentContext";
import SmoothScroll from "./SmoothScroll";
import BootSequence from "./BootSequence";
import HudFrame from "./HudFrame";
import DepthNav from "./DepthNav";
import ScrollSnap from "./ScrollSnap";
import Hero from "./sections/Hero";
import Operations from "./sections/Operations";
import Approach from "./sections/Approach";
import Projects from "./sections/Projects";
import OpenSource from "./sections/OpenSource";
import About from "./sections/About";
import Contact from "./sections/Contact";

export default function PortfolioApp({ initialContent }: { initialContent: PortfolioContent }) {
  const [booted, setBooted] = useState(false);
  return <PortfolioContentProvider initialContent={initialContent}><SmoothScroll>
    <div className="pointer-events-none fixed inset-0 -z-10 blueprint-grid" />
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--ink-900)_100%)]" />
    <BootSequence onDone={() => setBooted(true)} /><HudFrame /><DepthNav /><ScrollSnap />
    <main className="relative"><Hero started={booted} /><Operations /><Approach /><Projects /><OpenSource /><About /><Contact /></main>
  </SmoothScroll></PortfolioContentProvider>;
}
