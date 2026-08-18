import { z } from "zod";

const url = z.string().url().or(z.literal("")).optional();
const node = z.object({ id: z.string().min(1), label: z.string().min(1), sub: z.string().optional(), x: z.number().min(0).max(100), y: z.number().min(0).max(100), kind: z.enum(["client", "edge", "service", "data", "external", "ai"]) });
const edge = z.object({ from: z.string().min(1), to: z.string().min(1), label: z.string().optional() });
const graph = z.object({ nodes: z.array(node), edges: z.array(edge) });
const phase = z.object({ at: z.string().min(1), title: z.string().min(1), note: z.string(), add: z.array(z.string()), commit: z.string(), stress: z.string().optional(), stressMsg: z.string().optional(), resolve: z.string().optional(), fix: z.string().optional() });
const project = z.object({
  id: z.string().min(1), index: z.string().min(1), name: z.string().min(1), client: z.string(), year: z.string(), classification: z.string().min(1), summary: z.string().min(1),
  stack: z.array(z.string()), metrics: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })), highlights: z.array(z.string()), diagram: graph,
  detail: graph.optional(), reconstruction: z.object({ graph, phases: z.array(phase) }).optional(), githubUrl: url, liveUrl: url, visible: z.boolean().optional(), order: z.number().optional(),
});

export const portfolioContentSchema = z.object({
  identity: z.object({ name: z.string().min(1), callsign: z.string().min(1), role: z.string().min(1), roleFramings: z.array(z.string().min(1)).min(1), location: z.string(), email: z.string().email(), tagline: z.string(), summary: z.string(), links: z.object({ github: z.string().url(), linkedin: z.string().url(), twitter: z.string().url() }) }),
  projects: z.array(project),
  experience: z.array(z.object({ role: z.string().min(1), company: z.string(), mode: z.string(), period: z.string(), points: z.array(z.string()) })),
  skillGroups: z.array(z.object({ group: z.string().min(1), items: z.array(z.string()) })),
  stackStory: z.object({ title: z.string().min(1), line: z.string(), layers: z.array(z.object({ code: z.string().min(1), role: z.string(), title: z.string().min(1), narrative: z.string(), items: z.array(z.string()), accent: z.enum(["cyan", "amber"]), status: z.enum(["LIVE", "EXPLORING"]).optional() })).min(1) }),
  manifesto: z.array(z.string().min(1)).length(3),
  operations: z.array(z.object({ name: z.string().min(1), detail: z.string(), status: z.enum(["ACTIVE", "RESEARCH", "EXPERIMENTING"]) })),
  principles: z.array(z.object({ no: z.string().min(1), title: z.string().min(1), body: z.string() })),
  achievements: z.array(z.object({ title: z.string().min(1), org: z.string(), date: z.string(), credentialUrl: url })),
  systemStats: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).length(4),
  github: z.object({ handle: z.string(), url: z.string().url(), featuredProjects: z.string(), primaryLanguage: z.string(), currentFocus: z.string() }),
  repos: z.array(z.object({ name: z.string().min(1), desc: z.string(), lang: z.string(), url, tag: z.string(), visible: z.boolean().optional(), order: z.number().optional() })),
  operatorSpec: z.array(z.object({ label: z.string().min(1), value: z.string() })),
  systemCopy: z.object({ drawingCode: z.string().min(1), heroSupport: z.string(), contactCopy: z.string(), bootDiagnostics: z.array(z.string()).min(1) }),
}).superRefine((content, ctx) => {
  const ids = new Set<string>();
  content.projects.forEach((p, pi) => {
    if (ids.has(p.id)) ctx.addIssue({ code: "custom", path: ["projects", pi, "id"], message: "Project IDs must be unique" });
    ids.add(p.id);
    for (const [name, g] of [["diagram", p.diagram], ["detail", p.detail], ["reconstruction", p.reconstruction?.graph]] as const) {
      if (!g) continue;
      const nodeIds = new Set(g.nodes.map((n) => n.id));
      if (nodeIds.size !== g.nodes.length) ctx.addIssue({ code: "custom", path: ["projects", pi, name], message: "Node IDs must be unique" });
      g.edges.forEach((e, ei) => { if (!nodeIds.has(e.from) || !nodeIds.has(e.to)) ctx.addIssue({ code: "custom", path: ["projects", pi, name, "edges", ei], message: "Edges must reference existing nodes" }); });
    }
  });
});

export type ValidatedPortfolioContent = z.infer<typeof portfolioContentSchema>;
