"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioContent } from "@/context/PortfolioContentContext";
import SectionHeader from "@/components/SectionHeader";
import { sound } from "@/lib/sound";

gsap.registerPlugin(ScrollTrigger);

export default function OpenSource() {
  const { repos, github } = usePortfolioContent();
  const visibleRepos = repos.filter((r) => r.visible !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".os-card", {
        scrollTrigger: { trigger: el, start: "top 80%" },
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signals"
      ref={ref}
      className="relative mx-auto max-w-6xl px-6 py-24 md:px-10"
    >
      <SectionHeader
        index="03"
        title="OPEN-SOURCE SIGNALS"
        caption="Curated projects and active learning signals on GitHub."
      />

      {/* stat bar */}
      <div className="mb-10 grid grid-cols-3 gap-px border border-line-faint bg-line-faint">
        <div className="os-card bg-ink-900 px-5 py-5">
          <div className="font-display text-3xl font-semibold text-amber glow-amber">
            {github.featuredProjects}
          </div>
          <div className="tech-label mt-1">FEATURED PROJECTS</div>
        </div>
        <div className="os-card bg-ink-900 px-5 py-5">
          <div className="font-display text-3xl font-semibold text-cyan glow-cyan">
            {github.primaryLanguage}
          </div>
          <div className="tech-label mt-1">PRIMARY LANGUAGE</div>
        </div>
        <a
          href={github.url}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => sound.play("hover")}
          className="os-card group flex flex-col justify-between bg-ink-900 px-5 py-5 transition-colors hover:bg-ink-800"
        >
          <div className="font-display text-lg font-semibold text-paper transition-colors group-hover:text-cyan">
            @{github.handle}
          </div>
          <div className="tech-label mt-1 flex items-center gap-1">
            VIEW PROFILE
            <span className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </div>
        </a>
      </div>

      {/* repo grid */}
      <div className="grid gap-px border border-line-faint bg-line-faint md:grid-cols-2 lg:grid-cols-3">
        {visibleRepos.map((r) => {
          const Card = r.url ? "a" : "article";
          return (
          <Card
            key={r.name}
            {...(r.url ? { href: r.url, target: "_blank", rel: "noreferrer" } : {})}
            onMouseEnter={() => sound.play("hover")}
            className="os-card group flex flex-col bg-ink-900 p-5 transition-colors hover:bg-ink-800"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="tech-label text-cyan">{r.tag}</span>
              <span className="tech-label text-amber">CURATED</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-paper transition-colors group-hover:text-cyan">
              {r.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-paper-dim">
              {r.desc}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-line-faint pt-3">
              <span className="flex items-center gap-1.5 text-xs text-paper-dim">
                <span className="h-2 w-2 rounded-full bg-cyan" />
                {r.lang}
              </span>
              <span className="tech-label transition-colors group-hover:text-cyan">
                {r.url ? "OPEN ↗" : "IN DEVELOPMENT"}
              </span>
            </div>
          </Card>
          );
        })}
      </div>
    </section>
  );
}
