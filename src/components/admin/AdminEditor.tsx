"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioContent, Project } from "@/data/portfolio";

type Section =
  | "overview"
  | "identity"
  | "stats"
  | "projects"
  | "stackStory"
  | "operations"
  | "principles"
  | "manifesto"
  | "experience"
  | "skillGroups"
  | "achievements"
  | "github"
  | "repos"
  | "operatorSpec"
  | "systemCopy";

const NAV: { key: Section; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "identity", label: "Identity" },
  { key: "stats", label: "Hero & Stats" },
  { key: "projects", label: "Projects" },
  { key: "stackStory", label: "Stack" },
  { key: "operations", label: "Current Operations" },
  { key: "principles", label: "Operating Principles" },
  { key: "manifesto", label: "Manifesto" },
  { key: "experience", label: "Journey" },
  { key: "skillGroups", label: "Skills" },
  { key: "achievements", label: "Achievements" },
  { key: "github", label: "GitHub" },
  { key: "repos", label: "Repositories" },
  { key: "operatorSpec", label: "Operator Spec" },
  { key: "systemCopy", label: "System Copy" },
];

const input =
  "mt-1 w-full border border-line-faint bg-ink-800 px-3 py-2 font-mono text-sm text-paper outline-none focus:border-cyan";

const button =
  "border border-line-faint px-3 py-2 font-mono text-xs text-paper-dim hover:border-cyan hover:text-cyan disabled:opacity-40";

/**
 * IMPORTANT:
 * Explicit locale + timezone prevents Next.js SSR/client hydration mismatch.
 *
 * Server and browser will now always render the same timestamp.
 */
const adminDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  timeZone: "Asia/Kolkata",
});

function formatAdminDate(value?: string | Date | null) {
  if (!value) return "NEVER";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "INVALID DATE";
  }

  return adminDateFormatter.format(date);
}

function Field({
  label,
  value,
  onChange,
  area = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  return (
    <label className="block text-xs text-paper-dim">
      <span className="tech-label">{label}</span>

      {area ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={input}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={input}
        />
      )}
    </label>
  );
}

function JsonEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
const [error, setError] = useState("");

useEffect(() => {
  setText(JSON.stringify(value, null, 2));
  setError("");
}, [value]);

function apply() {
    try {
      onChange(JSON.parse(text) as unknown);
      setError("");
    } catch {
      setError("Invalid JSON — changes were not applied.");
    }
  }

  return (
    <section className="border border-line-faint bg-ink-900/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">{label}</h2>

          <p className="text-xs text-paper-dim">
            Structured editor for lists, ordering, links, blueprints, and
            reconstruction data.
          </p>
        </div>

        <button onClick={apply} className={button}>
          APPLY SECTION
        </button>
      </div>

      <textarea
        aria-label={`${label} JSON`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={24}
        spellCheck={false}
        className={`${input} mt-4 resize-y text-xs leading-relaxed`}
      />

      {error && (
        <p role="alert" className="mt-2 text-sm text-amber">
          {error}
        </p>
      )}
    </section>
  );
}

function newProject(index: number): Project {
  return {
    id: `project-${Date.now()}`,
    index: `SYS-${String(index + 1).padStart(2, "0")}`,
    name: "New Project",
    client: "Project Context",
    year: String(new Date().getFullYear()),
    classification: "FULL-STACK PROJECT",
    summary: "Describe the project.",
    stack: [],
    metrics: [],
    highlights: [],
    diagram: {
      nodes: [],
      edges: [],
    },
    visible: false,
    order: index,
  };
}

export default function AdminEditor({
  initial,
  username,
  database,
  updatedAt,
  publishedAt,
}: {
  initial: PortfolioContent;
  username: string;
  database: boolean;
  updatedAt: string | null;
  publishedAt: string | null;
}) {
  const [content, setContent] = useState(initial);
  const [section, setSection] = useState<Section>("overview");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState<
    "save" | "publish" | "logout" | null
  >(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", warn);

    return () => {
      window.removeEventListener("beforeunload", warn);
    };
  }, [dirty]);

  const counts = useMemo(
    () => ({
      projects: content.projects.length,
      skills: content.skillGroups.length,
      achievements: content.achievements.length,
      layers: content.stackStory.layers.length,
    }),
    [content]
  );

  function change(next: PortfolioContent) {
    setContent(next);
    setDirty(true);
    setNotice("UNSAVED CHANGES");
  }

  function setKey<K extends keyof PortfolioContent>(
    key: K,
    value: PortfolioContent[K]
  ) {
    change({
      ...content,
      [key]: value,
    });
  }

  async function save() {
    setBusy("save");
    setNotice("");

    const r = await fetch("/api/admin/content", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(content),
    });

    const body = await r.json();

    setBusy(null);

    if (!r.ok) {
      return setNotice(body.error ?? "Could not save draft");
    }

    setDirty(false);
    setNotice("DRAFT SAVED");
  }

  async function publish() {
    if (dirty) {
      return setNotice("Save the draft before publishing.");
    }

    setBusy("publish");

    const r = await fetch("/api/admin/publish", {
      method: "POST",
    });

    const body = await r.json();

    setBusy(null);

    setNotice(
      r.ok ? "PUBLISHED" : body.error ?? "Could not publish"
    );
  }

  async function logout() {
    if (
      dirty &&
      !window.confirm("Discard unsaved changes and log out?")
    ) {
      return;
    }

    setBusy("logout");

    await fetch("/api/admin/logout", {
      method: "POST",
    });

    location.href = "/admin/login";
  }

  function moveProject(index: number, delta: number) {
    const next = [...content.projects];
    const target = index + delta;

    if (target < 0 || target >= next.length) {
      return;
    }

    [next[index], next[target]] = [next[target], next[index]];

    next.forEach((p, i) => {
      p.order = i;
    });

    setKey("projects", next);
  }

  return (
    <main className="min-h-screen bg-ink-900 text-paper blueprint-grid lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-line-faint bg-ink-900/95 p-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="tech-label text-cyan">
          YASH-CORE // CONTROL CENTER
        </div>

        <div className="mt-1 text-xs text-paper-dim">
          SIGNED IN · {username}
        </div>

        <nav
          aria-label="Admin sections"
          className="mt-5 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1"
        >
          {NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`px-3 py-2 text-left font-mono text-xs ${
                section === item.key
                  ? "bg-cyan text-ink-900"
                  : "border border-line-faint text-paper-dim hover:text-cyan"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={logout}
          disabled={busy === "logout"}
          className={`${button} mt-5 w-full`}
        >
          LOGOUT
        </button>
      </aside>

      <div className="min-w-0 p-5 md:p-8">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-line-faint pb-5">
          <div>
            <div className="tech-label text-cyan">
              BLUEPRINT OS // ADMIN
            </div>

            <h1 className="mt-1 font-display text-3xl font-bold">
              PORTFOLIO CONTROL CENTER
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/admin/preview"
              target="_blank"
              className={button}
            >
              PREVIEW DRAFT ↗
            </a>

            <button
              onClick={save}
              disabled={!!busy}
              className={button}
            >
              {busy === "save" ? "SAVING..." : "SAVE DRAFT"}
            </button>

            <button
              onClick={publish}
              disabled={!!busy || dirty}
              className="border border-cyan px-3 py-2 font-mono text-xs text-cyan hover:bg-cyan hover:text-ink-900 disabled:opacity-40"
            >
              {busy === "publish" ? "PUBLISHING..." : "PUBLISH"}
            </button>
          </div>
        </header>

        {notice && (
          <div
            role="status"
            className={`mb-5 border p-3 font-mono text-sm ${
              notice === "PUBLISHED" ||
              notice === "DRAFT SAVED"
                ? "border-cyan text-cyan"
                : "border-amber text-amber"
            }`}
          >
            {notice}
          </div>
        )}

        {section === "overview" && (
          <div className="space-y-5">
            <div className="grid gap-px border border-line-faint bg-line-faint sm:grid-cols-2 xl:grid-cols-4">
              {[
                [
                  "SYSTEM STATUS",
                  database ? "ONLINE" : "FALLBACK",
                ],
                [
                  "CONTENT",
                  dirty ? "UNSAVED" : "DRAFT SAVED",
                ],
                [
                  "LAST UPDATED",
                  updatedAt
                    ? formatAdminDate(updatedAt)
                    : "Static fallback",
                ],
                [
                  "LAST PUBLISHED",
                  publishedAt
                    ? formatAdminDate(publishedAt)
                    : "Not seeded",
                ],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="bg-ink-900 p-4"
                >
                  <div className="tech-label">{k}</div>

                  <div className="mt-2 font-display text-lg text-cyan">
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-px border border-line-faint bg-line-faint sm:grid-cols-4">
              {Object.entries(counts).map(([k, v]) => (
                <div
                  key={k}
                  className="bg-ink-900 p-5"
                >
                  <div className="font-display text-3xl text-amber">
                    {v}
                  </div>

                  <div className="tech-label mt-1">
                    {k}
                  </div>
                </div>
              ))}
            </div>

            {!database && (
              <p className="border border-amber/40 bg-amber/5 p-4 text-sm text-amber">
                Database is not configured. Public fallback works,
                but Save Draft and Publish require DATABASE_URL and
                a migrated database.
              </p>
            )}
          </div>
        )}

        {section === "identity" && (
          <section className="grid gap-4 border border-line-faint bg-ink-900/70 p-5 md:grid-cols-2">
            {(
              [
                "name",
                "callsign",
                "role",
                "location",
                "email",
                "tagline",
              ] as const
            ).map((k) => (
              <Field
                key={k}
                label={k.toUpperCase()}
                value={content.identity[k]}
                onChange={(v) =>
                  setKey("identity", {
                    ...content.identity,
                    [k]: v,
                  })
                }
              />
            ))}

            <div className="md:col-span-2">
              <Field
                label="SUMMARY"
                area
                value={content.identity.summary}
                onChange={(v) =>
                  setKey("identity", {
                    ...content.identity,
                    summary: v,
                  })
                }
              />
            </div>

            <Field
              label="GITHUB URL"
              value={content.identity.links.github}
              onChange={(v) =>
                setKey("identity", {
                  ...content.identity,
                  links: {
                    ...content.identity.links,
                    github: v,
                  },
                })
              }
            />

            <Field
              label="LINKEDIN URL"
              value={content.identity.links.linkedin}
              onChange={(v) =>
                setKey("identity", {
                  ...content.identity,
                  links: {
                    ...content.identity.links,
                    linkedin: v,
                  },
                })
              }
            />

            <Field
              label="X / TWITTER URL"
              value={content.identity.links.twitter}
              onChange={(v) =>
                setKey("identity", {
                  ...content.identity,
                  links: {
                    ...content.identity.links,
                    twitter: v,
                  },
                })
              }
            />

            <div className="md:col-span-2">
              <JsonEditor
                label="TYPEWRITER ROLE FRAMINGS"
                value={content.identity.roleFramings}
                onChange={(v) =>
                  setKey("identity", {
                    ...content.identity,
                    roleFramings: v as string[],
                  })
                }
              />
            </div>
          </section>
        )}

        {section === "stats" && (
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {content.systemStats.map((stat, i) => (
              <div
                key={i}
                className="border border-line-faint bg-ink-900 p-4"
              >
                <Field
                  label="LABEL"
                  value={stat.label}
                  onChange={(v) => {
                    const next = [...content.systemStats];

                    next[i] = {
                      ...stat,
                      label: v,
                    };

                    setKey("systemStats", next);
                  }}
                />

                <div className="mt-3">
                  <Field
                    label="VALUE"
                    value={stat.value}
                    onChange={(v) => {
                      const next = [...content.systemStats];

                      next[i] = {
                        ...stat,
                        value: v,
                      };

                      setKey("systemStats", next);
                    }}
                  />
                </div>
              </div>
            ))}
          </section>
        )}

        {section === "projects" && (
          <section className="space-y-4">
            <div className="flex justify-end">
              <button
                className={button}
                onClick={() =>
                  setKey("projects", [
                    ...content.projects,
                    newProject(content.projects.length),
                  ])
                }
              >
                + NEW PROJECT
              </button>
            </div>

            {content.projects.map((p, i) => (
              <details
                key={p.id}
                className="border border-line-faint bg-ink-900/80 p-4"
                open={i === 0}
              >
                <summary className="cursor-pointer font-display text-lg font-semibold text-cyan">
                  {p.index} · {p.name}
                </summary>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <Field
                    label="ID / SLUG"
                    value={p.id}
                    onChange={(v) => {
                      const n = [...content.projects];

                      n[i] = {
                        ...p,
                        id: v,
                      };

                      setKey("projects", n);
                    }}
                  />

                  <Field
                    label="NAME"
                    value={p.name}
                    onChange={(v) => {
                      const n = [...content.projects];

                      n[i] = {
                        ...p,
                        name: v,
                      };

                      setKey("projects", n);
                    }}
                  />

                  <Field
                    label="CLASSIFICATION"
                    value={p.classification}
                    onChange={(v) => {
                      const n = [...content.projects];

                      n[i] = {
                        ...p,
                        classification: v,
                      };

                      setKey("projects", n);
                    }}
                  />

                  <Field
                    label="CONTEXT"
                    value={p.client}
                    onChange={(v) => {
                      const n = [...content.projects];

                      n[i] = {
                        ...p,
                        client: v,
                      };

                      setKey("projects", n);
                    }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    className={button}
                    onClick={() => {
                      const n = [...content.projects];

                      n[i] = {
                        ...p,
                        visible: p.visible === false,
                      };

                      setKey("projects", n);
                    }}
                  >
                    VISIBLE · {p.visible === false ? "OFF" : "ON"}
                  </button>

                  <button
                    className={button}
                    onClick={() => moveProject(i, -1)}
                  >
                    ↑ UP
                  </button>

                  <button
                    className={button}
                    onClick={() => moveProject(i, 1)}
                  >
                    ↓ DOWN
                  </button>

                  <button
                    className={`${button} text-amber`}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Delete "${p.name}"?`
                        )
                      ) {
                        setKey(
                          "projects",
                          content.projects.filter(
                            (_, x) => x !== i
                          )
                        );
                      }
                    }}
                  >
                    DELETE
                  </button>
                </div>

                <div className="mt-4">
                  <JsonEditor
                    label="ADVANCED PROJECT · STACK · METRICS · LINKS · BLUEPRINT · RECONSTRUCTION"
                    value={p}
                    onChange={(v) => {
                      const n = [...content.projects];

                      n[i] = v as Project;

                      setKey("projects", n);
                    }}
                  />
                </div>
              </details>
            ))}
          </section>
        )}
        {section !== "overview" &&
          section !== "identity" &&
          section !== "stats" &&
          section !== "projects" && (
            <JsonEditor
              key={section}
              label={
                NAV.find((n) => n.key === section)?.label ??
                section
              }
              value={content[section]}
              onChange={(v) =>
                setKey(
                  section,
                  v as PortfolioContent[typeof section]
                )
              }
            />
          )}
      </div>
    </main>
  );
}