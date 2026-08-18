// ============================================================
// CONTENT DATA LAYER - Yash Mane portfolio source of truth
// ============================================================

export const identity = {
  name: "Yash Mane",
  callsign: "YASH-CORE",
  role: "Full-Stack Developer · AI Enthusiast",
  roleFramings: [
    "Full-Stack Developer",
    "Software Development Enthusiast",
    "AI-Driven Product Builder",
    "Java · React · Node.js",
    "Building Software for Real Problems",
  ],
  location: "Mumbai, Maharashtra, India",
  email: "myash8268@gmail.com",
  tagline:
    "I build full-stack products, intelligent systems, and practical software for real-world problems.",
  summary:
    "Yash Mane is a final-year Computer Science Engineering student focused on full-stack development, software engineering, AI integrations, and problem solving. He builds practical web applications using React, Node.js, Express, PostgreSQL, MongoDB, and modern development tools while strengthening his Java, DSA, and AI skills through projects, hackathons, and placement preparation.",
  links: {
    github: "https://github.com/yashmane15",
    linkedin: "https://www.linkedin.com/in/yash-mane-21a81140a/",
    twitter: "https://x.com/Og_yashya",
  },
};

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  kind: "client" | "edge" | "service" | "data" | "external" | "ai";
};

export type DiagramEdge = { from: string; to: string; label?: string };

export type ReconPhase = {
  at: string;
  title: string;
  note: string;
  add: string[];
  commit: string;
  stress?: string;
  stressMsg?: string;
  resolve?: string;
  fix?: string;
};

export type Reconstruction = {
  graph: { nodes: DiagramNode[]; edges: DiagramEdge[] };
  phases: ReconPhase[];
};

export type Project = {
  id: string;
  index: string;
  name: string;
  client: string;
  year: string;
  classification: string;
  summary: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  highlights: string[];
  diagram: { nodes: DiagramNode[]; edges: DiagramEdge[] };
  detail?: { nodes: DiagramNode[]; edges: DiagramEdge[] };
  reconstruction?: Reconstruction;
  githubUrl?: string;
  liveUrl?: string;
  visible?: boolean;
  order?: number;
};

const financeGraph = {
  nodes: [
    { id: "client", label: "React UI", sub: "finance dashboard", x: 7, y: 43, kind: "client" as const },
    { id: "api", label: "REST API", sub: "Express.js", x: 30, y: 43, kind: "service" as const },
    { id: "auth", label: "Auth", sub: "JWT · bcrypt", x: 52, y: 14, kind: "edge" as const },
    { id: "finance", label: "Finance", sub: "budgets · goals", x: 52, y: 42, kind: "service" as const },
    { id: "advisor", label: "Advisor", sub: "AI guidance", x: 52, y: 72, kind: "ai" as const },
    { id: "prisma", label: "Prisma", sub: "ORM", x: 76, y: 42, kind: "service" as const },
    { id: "db", label: "PostgreSQL", sub: "Neon", x: 94, y: 42, kind: "data" as const },
    { id: "gemini", label: "Gemini API", sub: "external AI", x: 76, y: 72, kind: "external" as const },
    { id: "ocr", label: "Tesseract", sub: "receipt OCR", x: 30, y: 78, kind: "external" as const },
  ],
  edges: [
    { from: "client", to: "api", label: "HTTPS" },
    { from: "api", to: "auth", label: "verify" },
    { from: "api", to: "finance", label: "CRUD" },
    { from: "api", to: "advisor" },
    { from: "api", to: "ocr", label: "receipt" },
    { from: "finance", to: "prisma" },
    { from: "advisor", to: "prisma" },
    { from: "advisor", to: "gemini" },
    { from: "prisma", to: "db" },
  ],
};

const supportGraph = {
  nodes: [
    { id: "ticket", label: "Incoming", sub: "support ticket", x: 5, y: 46, kind: "client" as const },
    { id: "prep", label: "Preprocess", sub: "TF-IDF", x: 22, y: 46, kind: "service" as const },
    { id: "similarity", label: "Similarity", sub: "cosine · top-k", x: 40, y: 46, kind: "ai" as const },
    { id: "history", label: "History", sub: "resolved cases", x: 40, y: 78, kind: "data" as const },
    { id: "confidence", label: "Confidence", sub: "agreement", x: 59, y: 46, kind: "ai" as const },
    { id: "rules", label: "Rule Guard", sub: "business safety", x: 76, y: 46, kind: "service" as const },
    { id: "gemini", label: "Gemini", sub: "response", x: 76, y: 16, kind: "external" as const },
    { id: "auto", label: "Auto Resolve", sub: "safe action", x: 94, y: 25, kind: "service" as const },
    { id: "human", label: "Human Review", sub: "escalation", x: 94, y: 69, kind: "client" as const },
  ],
  edges: [
    { from: "ticket", to: "prep" }, { from: "prep", to: "similarity" },
    { from: "history", to: "similarity", label: "compare" },
    { from: "similarity", to: "confidence", label: "matches" },
    { from: "confidence", to: "rules", label: "score" },
    { from: "rules", to: "gemini", label: "approved" },
    { from: "gemini", to: "auto" }, { from: "rules", to: "human", label: "escalate" },
  ],
};

const talentGraph = {
  nodes: [
    { id: "client", label: "React Client", sub: "Vite · Redux", x: 7, y: 45, kind: "client" as const },
    { id: "api", label: "REST API", sub: "Express.js", x: 32, y: 45, kind: "service" as const },
    { id: "auth", label: "Auth", sub: "JWT", x: 56, y: 14, kind: "edge" as const },
    { id: "jobs", label: "Jobs", sub: "listings", x: 56, y: 38, kind: "service" as const },
    { id: "apps", label: "Applications", sub: "workflow", x: 56, y: 64, kind: "service" as const },
    { id: "users", label: "Profiles", sub: "candidate · employer", x: 56, y: 88, kind: "service" as const },
    { id: "mongo", label: "MongoDB", sub: "Atlas", x: 91, y: 47, kind: "data" as const },
    { id: "media", label: "Cloudinary", sub: "profile media", x: 91, y: 82, kind: "external" as const },
  ],
  edges: [
    { from: "client", to: "api", label: "Axios" }, { from: "api", to: "auth" },
    { from: "api", to: "jobs" }, { from: "api", to: "apps" }, { from: "api", to: "users" },
    { from: "auth", to: "mongo" }, { from: "jobs", to: "mongo" },
    { from: "apps", to: "mongo" }, { from: "users", to: "mongo" },
    { from: "users", to: "media", label: "upload" },
  ],
};

export const projects: Project[] = [
  {
    id: "finance-ai", index: "SYS-01", name: "Personal Finance Management System with AI Advisor",
    client: "Final Year Project", year: "2026", classification: "AI · FINTECH PLATFORM",
    summary: "A full-stack personal finance platform for recording expenses, understanding spending patterns, managing budgets and saving goals, and receiving intelligent financial guidance. It combines secure persistence, analytics, receipt OCR, and an AI-assisted advisory layer.",
    stack: ["React", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "JWT", "Tailwind CSS", "Recharts", "Gemini API", "Tesseract.js"],
    metrics: [{ value: "AI", label: "ADVISOR" }, { value: "FHS", label: "SCORING" }, { value: "OCR", label: "RECEIPTS" }],
    highlights: ["Expense and transaction management", "Budget tracking and saving goals", "Financial Health Score and spending analytics", "AI financial guidance and receipt OCR"],
    diagram: financeGraph, detail: financeGraph,
    reconstruction: { graph: financeGraph, phases: [
      { at: "PROBLEM", title: "FINANCE MODEL", note: "Defined transactions, budgets, goals, and the financial-health signals the product needs.", add: ["client"], commit: "plan: map personal finance workflows" },
      { at: "API", title: "SERVICE LAYER", note: "Connected the React interface to authenticated Express finance services.", add: ["api", "auth", "finance"], commit: "feat: authenticated finance rest api" },
      { at: "DATA", title: "PERSISTENCE", note: "Modeled durable finance data through Prisma and PostgreSQL on Neon.", add: ["prisma", "db"], commit: "feat: prisma schema + postgres persistence" },
      { at: "ANALYTICS", title: "HEALTH SCORE", note: "Added spending analytics, budget signals, goals, and financial-health scoring.", add: [], commit: "feat: analytics and financial health score" },
      { at: "INTELLIGENCE", title: "AI ADVISOR", note: "Grounded Gemini-assisted guidance in the user's own finance data.", add: ["advisor", "gemini"], commit: "feat: contextual financial advisor" },
      { at: "INPUT", title: "RECEIPT OCR", note: "Added receipt text extraction to reduce manual transaction entry.", add: ["ocr"], commit: "feat: receipt ocr ingestion" },
    ] },
  },
  {
    id: "zepto-support", index: "SYS-02", name: "Zepto Support Ticket Intelligence",
    githubUrl: "https://github.com/yashmane15/zepto-support-manager",
    liveUrl: "https://zepto-support-manager.vercel.app/",
    client: "DigiPlus IT Agentic AI Hackathon", year: "2026", classification: "AI · SUPPORT AUTOMATION",
    summary: "An intelligent customer-support system that compares new tickets with resolved historical cases, recommends actions, calculates confidence, and escalates uncertain or unsafe decisions for human review. Shortlisted for the hackathon presentation round.",
    stack: ["JavaScript", "Node.js", "Express.js", "TF-IDF", "Cosine Similarity", "Gemini API", "Vercel"],
    metrics: [{ value: "80%", label: "SIMILARITY GATE" }, { value: "75%", label: "CONFIDENCE GATE" }, { value: "HITL", label: "ESCALATION" }],
    highlights: ["Top-k historical ticket retrieval and agreement scoring", "Deterministic guards for cancellations and refund limits", "Gemini-assisted response generation", "Human escalation for uncertain or unsafe actions"],
    diagram: supportGraph, detail: supportGraph,
    reconstruction: { graph: supportGraph, phases: [
      { at: "PROBLEM", title: "DECISION FLOW", note: "Mapped support outcomes that can be suggested safely and those that require a person.", add: ["ticket"], commit: "plan: map ticket decision boundaries" },
      { at: "DATA", title: "PIPELINE", note: "Prepared incoming and historical tickets for consistent text comparison.", add: ["prep", "history"], commit: "feat: ticket preprocessing pipeline" },
      { at: "RETRIEVAL", title: "SIMILARITY", note: "Built TF-IDF vectors, cosine matching, and top-k historical retrieval.", add: ["similarity"], commit: "feat: tfidf cosine retrieval" },
      { at: "CONFIDENCE", title: "AGREEMENT", note: "Combined similarity and historical agreement into a confidence gate.", add: ["confidence"], commit: "feat: confidence and agreement scoring" },
      { at: "SAFETY", title: "RULE GUARD", note: "Blocked redelivery for cancelled orders and refunds above order value.", add: ["rules"], commit: "feat: deterministic support safeguards" },
      { at: "RESPONSE", title: "AI OUTPUT", note: "Added Gemini-assisted language after the decision passed validation.", add: ["gemini"], commit: "feat: grounded response generation" },
      { at: "DEPLOY", title: "RESOLUTION", note: "Routed safe cases to suggested resolution and uncertain cases to human review.", add: ["auto", "human"], commit: "deploy: vercel support manager" },
    ] },
  },
  {
    id: "talentbridge", index: "SYS-03", name: "TalentBridge — Job Portal",
    client: "Full-Stack Project", year: "2026", classification: "FULL-STACK · MERN",
    summary: "A full-stack recruitment platform connecting candidates and employers through authentication, job listings, application workflows, and profile management.",
    stack: ["React", "Vite", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express.js", "MongoDB Atlas", "JWT", "Cloudinary", "Axios"],
    metrics: [{ value: "2", label: "USER ROLES" }, { value: "JWT", label: "AUTH" }, { value: "CRUD", label: "WORKFLOWS" }],
    highlights: ["Candidate and employer authentication", "Job listing and application workflows", "Profile management with external media storage", "Redux-powered client state and API integration"],
    diagram: talentGraph, detail: talentGraph,
    reconstruction: { graph: talentGraph, phases: [
      { at: "MODEL", title: "TWO-SIDED FLOW", note: "Mapped candidate and employer journeys across jobs, profiles, and applications.", add: ["client"], commit: "plan: recruitment workflows" },
      { at: "API", title: "BACKEND", note: "Built the Express REST surface and protected it with JWT authentication.", add: ["api", "auth"], commit: "feat: express api + jwt auth" },
      { at: "MODULES", title: "CORE SERVICES", note: "Separated job listings, applications, and profile operations.", add: ["jobs", "apps", "users"], commit: "feat: jobs applications profiles" },
      { at: "DATA", title: "PERSISTENCE", note: "Connected workflow records to MongoDB Atlas.", add: ["mongo"], commit: "feat: mongodb atlas persistence" },
      { at: "MEDIA", title: "PROFILE ASSETS", note: "Integrated Cloudinary for user media while retaining metadata in the application data model.", add: ["media"], commit: "feat: cloudinary profile media" },
    ] },
  },
];

export type ExperienceEntry = { role: string; company: string; mode: string; period: string; points: string[] };
export const experience: ExperienceEntry[] = [
  { role: "Final-Year CSE Student", company: "B.Tech Computer Science Engineering", mode: "Academic", period: "2026–2027", points: ["Focused on full-stack development, software engineering, AI integrations, and Java.", "Preparing for software development placements through DSA and coding-round practice."] },
  { role: "Personal Finance Management System", company: "Final Year Project", mode: "Build", period: "2026", points: ["Building an AI-assisted finance platform with React, Express, PostgreSQL, and Prisma.", "Combining analytics, saving goals, receipt OCR, and contextual financial guidance."] },
  { role: "DigiPlus IT Agentic AI Hackathon", company: "Zepto Support Ticket Intelligence", mode: "Hackathon", period: "2026", points: ["Built a support-decision system using retrieval, confidence scoring, deterministic rules, and Gemini-assisted output.", "Shortlisted for the presentation round."] },
];

export const skillGroups = [
  { group: "Languages", items: ["Java", "JavaScript", "Python", "C++", "C"] },
  { group: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Redux Toolkit", "React Router", "Axios", "Vite", "Framer Motion"] },
  { group: "Backend & APIs", items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "CRUD", "MVC", "Bcrypt"] },
  { group: "Data & ORM", items: ["PostgreSQL", "Neon", "MongoDB", "MongoDB Atlas", "MySQL", "Prisma ORM", "Schema Design"] },
  { group: "AI & Data", items: ["Gemini API", "TF-IDF", "Cosine Similarity", "pandas", "Data Analysis", "Rule-Based AI"] },
  { group: "Tools & Delivery", items: ["Git", "GitHub", "VS Code", "npm", "Prisma CLI", "Vercel", "Netlify"] },
];

export type StackLayer = { code: string; role: string; title: string; narrative: string; items: string[]; accent: "cyan" | "amber"; status?: "LIVE" | "EXPLORING" };
export const stackStory: { title: string; line: string; layers: StackLayer[] } = {
  title: "THE STACK",
  line: "Seven layers, one learning system — from programming fundamentals to the tools and ideas I am strengthening next.",
  layers: [
    { code: "L1", role: "FOUNDATION", title: "Languages & Problem Solving", narrative: "The foundation behind everything I build — programming fundamentals, problem solving, and the languages I use to turn ideas into working systems.", items: ["Java", "JavaScript", "Python", "C++", "C"], accent: "cyan", status: "LIVE" },
    { code: "L2", role: "INTERFACE", title: "What People Interact With", narrative: "Responsive interfaces where product logic becomes clear, usable, and engaging.", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "Vite"], accent: "cyan", status: "LIVE" },
    { code: "L3", role: "SERVICES", title: "Application Logic", narrative: "APIs, authentication, and backend structure that connect users to useful workflows.", items: ["Node.js", "Express.js", "REST APIs", "JWT", "CRUD", "Bcrypt"], accent: "cyan", status: "LIVE" },
    { code: "L4", role: "DATA", title: "Where State Lives", narrative: "Relational and document data modeled to support the actual product flow.", items: ["PostgreSQL", "Neon", "MongoDB", "MongoDB Atlas", "MySQL", "Prisma ORM"], accent: "cyan", status: "LIVE" },
    { code: "L5", role: "INTELLIGENCE", title: "AI & Data Systems", narrative: "Practical intelligence built from retrieval, scoring, analysis, rules, and grounded model integrations.", items: ["Gemini API", "TF-IDF", "Cosine Similarity", "pandas", "Data Analysis", "Rule-Based Intelligence"], accent: "amber", status: "LIVE" },
    { code: "L6", role: "DELIVERY", title: "Build & Ship", narrative: "The everyday toolchain I use to version, build, debug, and deploy software.", items: ["Git", "GitHub", "VS Code", "npm", "Vercel", "Netlify"], accent: "cyan", status: "LIVE" },
    { code: "L7", role: "FRONTIER", title: "Currently Strengthening", narrative: "The next layer of capability: stronger algorithms, system thinking, automation, and responsible agent-based software.", items: ["Data Structures & Algorithms", "AI Agents", "Automation", "System Design", "Cloud Fundamentals"], accent: "amber", status: "EXPLORING" },
  ],
};

export const manifesto = ["Every idea begins as a problem.", "Every problem becomes a system.", "Every system should create real value."];
export type Operation = { name: string; detail: string; status: "ACTIVE" | "RESEARCH" | "EXPERIMENTING" };
export const operations: Operation[] = [
  { name: "Personal Finance Management System with AI Advisor", detail: "Final-year full-stack project combining expense tracking, analytics, saving goals, and intelligent financial guidance.", status: "ACTIVE" },
  { name: "Placement & DSA Preparation", detail: "Strengthening Java, data structures, algorithms, and coding-round problem solving for software development roles.", status: "ACTIVE" },
  { name: "AI & Automation", detail: "Exploring practical AI integrations, intelligent workflows, and agent-based software experiences.", status: "EXPERIMENTING" },
];

export const achievements = [
  { title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", org: "Oracle", date: "2025" },
  { title: "Shortlisted for Presentation Round", org: "DigiPlus IT Agentic AI Hackathon", date: "2026" },
];

export const systemStats = [
  { label: "GRADUATION", value: "2027" }, { label: "PROJECTS BUILT", value: "6+" },
  { label: "LEETCODE SOLVED", value: "33+" }, { label: "FOCUS", value: "FULL STACK" },
];

export const github = { handle: "yashmane15", url: "https://github.com/yashmane15", featuredProjects: "3+", primaryLanguage: "Java", currentFocus: "Full-Stack" };
export type Repo = { name: string; desc: string; lang: string; url?: string; tag: string; visible?: boolean; order?: number };
export const repos: Repo[] = [
  { name: "zepto-support-manager", desc: "Hackathon support-ticket intelligence using similarity retrieval, confidence scoring, safety rules, and human escalation.", lang: "JavaScript", url: "https://github.com/yashmane15/zepto-support-manager", tag: "AI · SUPPORT" },
  { name: "Telco-Customer-Churn-Analytics", desc: "Data cleaning and exploratory analysis of a 7,043-row telco churn dataset for customer and retention insights.", lang: "Python", url: "https://github.com/yashmane15/Telco-Customer-Churn-Analytics", tag: "DATA · EDA" },
  { name: "Personal Finance System", desc: "Full-stack final-year project for finance tracking, analytics, saving goals, receipt OCR, and AI-assisted guidance.", lang: "JavaScript", tag: "AI · FINTECH" },
];

export type Principle = { no: string; title: string; body: string };
export type OperatorSpec = { label: string; value: string };
export type Achievement = { title: string; org: string; date: string; credentialUrl?: string };

export const principles: Principle[] = [
  { no: "P-01", title: "Build to understand", body: "The fastest way I learn technology is by turning it into a working product — connecting frontend, backend, data, and user experience." },
  { no: "P-02", title: "Solve the actual problem", body: "Features only matter when they address something real. I prefer focused products with useful capabilities over complexity for its own sake." },
  { no: "P-03", title: "Use AI with purpose", body: "AI should improve a workflow, decision, or experience. It should be part of the system's logic rather than decoration." },
  { no: "P-04", title: "Keep improving the system", body: "Every project exposes another gap — performance, architecture, algorithms, or UX — and each iteration is an opportunity to engineer it better." },
];

export const operatorSpec: OperatorSpec[] = [
  { label: "DESIGNATION", value: identity.role },
  { label: "BASE", value: identity.location },
  { label: "STAGE", value: "Final-Year CSE Student" },
  { label: "FOCUS", value: "Full-Stack · AI · Java" },
  { label: "EDUCATION", value: "B.Tech Computer Science Engineering · 2027" },
  { label: "STATUS", value: "Open to software development opportunities" },
];

export const systemCopy = {
  drawingCode: "YM-2026",
  heroSupport: "Working across modern web development, Java, problem solving, and purposeful AI integrations.",
  contactCopy: "Recruiters, collaborators, and teams — if you are looking for a developer who learns quickly, solves real problems, and builds thoughtful full-stack products, the channel is open.",
  bootDiagnostics: ["mounting development stack", "linking full-stack runtime", "indexing project systems", "warming AI integration layer", "calibrating problem-solving engine"],
};

export type PortfolioContent = {
  identity: typeof identity;
  projects: Project[];
  experience: ExperienceEntry[];
  skillGroups: typeof skillGroups;
  stackStory: typeof stackStory;
  manifesto: string[];
  operations: Operation[];
  principles: Principle[];
  achievements: Achievement[];
  systemStats: typeof systemStats;
  github: typeof github;
  repos: Repo[];
  operatorSpec: OperatorSpec[];
  systemCopy: typeof systemCopy;
};

export const defaultPortfolioContent: PortfolioContent = {
  identity, projects, experience, skillGroups, stackStory, manifesto, operations,
  principles, achievements, systemStats, github, repos, operatorSpec, systemCopy,
};
