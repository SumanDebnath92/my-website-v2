"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Bot,
  BriefcaseBusiness,
  ChevronDown,
  Cloud,
  Code,
  Gauge,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Mouse,
  Phone,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type SVGProps,
} from "react";

/* ════════════════════════════════════════════════════════════════════════════
 * Content — sourced from Suman Debnath's resume
 * ════════════════════════════════════════════════════════════════════════════ */

const PROFILE = {
  name: "Suman Debnath",
  firstName: "Suman",
  lastName: "Debnath",
  title: "Senior Frontend Engineer",
  specialty: "React.js & Next.js Specialist · Full Stack (Node.js)",
  bio: "I turn complex product ideas into fast, scalable React applications. I built and owned a React Flow workflow automation builder used by 155+ customer organizations running 1,200+ live workflows. I ship production code in React.js, Next.js (SSR, SSG, ISR) and TypeScript, lead teams through reviews and mentoring, and use AI-assisted development (Claude Code + Figma MCP) to ship 55% faster. I also deliver full stack features with Node.js, Express and MongoDB.",
  years: [
    { value: "12+", label: "yrs web development" },
    { value: "6+", label: "yrs React.js & Next.js" },
    { value: "3+", label: "yrs full stack" },
  ],
  path: [
    "Web Designer & HTML",
    "Frontend (JS, jQuery)",
    "React.js & Next.js",
    "Full Stack (Node.js)",
  ],
  location: "Kolkata, West Bengal, India",
  availability: "Immediate joiner",
  relocation: "Open to relocate: on-site anywhere in India · Hybrid · Remote",
};

const CONTACT = {
  email: "suman.debnath.web@gmail.com",
  phone: "+91 98049 67495",
  phoneHref: "tel:+919804967495",
  linkedin: "https://www.linkedin.com/in/suman--debnath",
  linkedinLabel: "linkedin.com/in/suman--debnath",
  github: "https://github.com/SumanDebnath92",
  githubLabel: "github.com/SumanDebnath92",
};

const STATS = [
  { value: "155+", label: "Customer orgs on my React Flow builder" },
  { value: "1,200+", label: "Live automation workflows" },
  { value: "55%", label: "Faster delivery with Claude Code + Figma MCP" },
  { value: "60–70%", label: "Fewer redundant API calls" },
  { value: "6", label: "Engineers led across 12–14 live products" },
  { value: "1,000+", label: "Concurrent users on the platform" },
];

const EXPERTISE = [
  { name: "React.js", level: "Expert", pct: 96 },
  { name: "JavaScript (ES6+)", level: "Expert", pct: 95 },
  { name: "HTML5 / CSS3", level: "Expert", pct: 95 },
  { name: "React Flow", level: "Expert", pct: 94 },
  { name: "Next.js (App Router)", level: "Advanced", pct: 86 },
  { name: "TypeScript", level: "Advanced", pct: 84 },
  { name: "Node.js", level: "Intermediate", pct: 70 },
  { name: "Express.js", level: "Intermediate", pct: 70 },
];

type StackGroup = {
  title: string;
  icon: typeof Layers;
  groups: { label: string; items: string[] }[];
  className?: string;
};

/** Order matters: index = orbit ring in the right-side constellation. */
const STACK: StackGroup[] = [
  {
    title: "Frontend",
    icon: Layers,
    className: "sm:col-span-2",
    groups: [
      {
        label: "State & Data",
        items: ["Redux Toolkit", "Zustand", "TanStack Query", "Context API", "Axios", "REST APIs", "Zod"],
      },
      {
        label: "UI & Styling",
        items: ["Tailwind CSS", "SCSS", "CSS Modules", "Responsive / Mobile First", "Figma to Code", "Design Systems", "Storybook", "WCAG 2.1 / ARIA"],
      },
    ],
  },
  {
    title: "Full Stack & Cloud",
    icon: Cloud,
    groups: [
      {
        label: "Backend & DevOps",
        items: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT Auth", "Docker", "AWS EC2", "Vercel", "Railway", "GitHub Actions CI/CD"],
      },
    ],
  },
  {
    title: "AI-Assisted Dev",
    icon: Bot,
    groups: [
      {
        label: "Ship faster",
        items: ["Claude Code", "Figma MCP", "GitHub Copilot", "OpenAI Codex", "Spec Driven Dev"],
      },
    ],
  },
  {
    title: "Engineering Quality",
    icon: Gauge,
    className: "sm:col-span-2",
    groups: [
      { label: "Performance", items: ["Code Splitting", "Lazy Loading", "Virtualization", "Memoization", "Debounce / Throttle"] },
      { label: "Testing", items: ["Jest", "React Testing Library"] },
      { label: "Architecture & Tooling", items: ["Component Libraries", "Vite", "Webpack", "Git", "Agile / Scrum", "JIRA"] },
    ],
  },
];

const STRENGTHS = [
  { title: "Performance first", text: "Fast, lean UIs on data-heavy pages" },
  { title: "AI-accelerated delivery", text: "Claude Code + Figma MCP, 55% faster" },
  { title: "Team leadership", text: "Reviews, standards and mentoring" },
  { title: "Complex UI at scale", text: "Flow, IVR and node builders for 1,000+ users" },
];

type Project = {
  name: string;
  badge: string;
  summary: string;
  url?: { href: string; label: string };
  features?: { title: string; text: string }[];
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    name: "Red Belt Gym Management Software",
    badge: "Flagship",
    summary:
      "All-in-one platform for gym owners to manage contacts, attendance, appointments, transactions and communication, plus a mobile app for members.",
    url: { href: "https://redbeltgym.com", label: "redbeltgym.com" },
    features: [
      {
        title: "Workflow Automation Builder",
        text: "Drag-and-drop React Flow canvas connecting triggers (e.g. “contact created”) to actions like email or SMS. Custom nodes, Yes/No branches and auto layout — used by 155+ organizations.",
      },
      {
        title: "In-App Message Builder",
        text: "Drag-and-drop designer for member notifications with a live mobile preview that updates instantly.",
      },
      {
        title: "Contact Management",
        text: "Contact list with bulk add and a detailed profile view with all member information in one place.",
      },
    ],
    tags: ["React.js", "TypeScript", "React Flow", "Redux", "Node.js", "Express.js"],
  },
  {
    name: "Chirply — CRM & Communication",
    badge: "Frontend owner",
    summary:
      "Built the complete frontend of a subscription CRM (Laravel backend by another team) with one-click SMS, email and calling, fully responsive across devices.",
    url: { href: "https://chirply.io", label: "chirply.io" },
    features: [
      {
        title: "Visual IVR Builder",
        text: "Drag-and-drop tool where each business designs its own phone menu (“Press 1 for sales, press 2 for support”) as connected nodes, nested to any depth — in plain JavaScript.",
      },
    ],
    tags: ["JavaScript", "HTML5", "CSS3", "Drag & Drop", "Responsive Design"],
  },
  {
    name: "Training Management System",
    badge: "Full stack",
    summary:
      "Training programs, video lessons and student progress tracking. App Router Server/Client split, JWT auth with middleware route protection, TanStack Query mutations, Zod on both ends, rate-limited APIs and Jest tests. Dockerized, deployed on Vercel + Railway.",
    tags: ["Next.js", "TypeScript", "TanStack Query", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Docker", "Jest"],
  },
  {
    name: "Legal Will Creation Platform",
    badge: "Web app",
    summary:
      "Secure multi-step will wizard with authentication, beneficiary management and asset allocation.",
    tags: ["Angular", "HTML5", "CSS3"],
  },
];

type Role = {
  role: string;
  company: string;
  meta: string;
  period: string;
  note?: string;
  points: string[];
  tags?: string[];
};

const EXPERIENCE: Role[] = [
  {
    role: "Frontend Engineer (Contract)",
    company: "Webingo",
    meta: "Hospital Management Software",
    period: "Oct 2026 — Present",
    points: [
      "Building a Hospital Management Software end to end, with Next.js on the frontend and Node.js + Express.js on the backend.",
      "Designed and built REST APIs in Express.js and integrated them in Next.js, delivering full CRUD across the core hospital modules.",
      "Built reusable list, create, edit and delete flows with loading, error and validation states for a smooth staff experience.",
    ],
    tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "CRUD"],
  },
  {
    role: "Group Leader, Frontend Engineering",
    company: "Tier5 Technology Solutions",
    meta: "Kolkata · CRM, SaaS, Workflow Automation",
    period: "Mar 2018 — Aug 2026",
    note: "Frontend Developer → Senior Developer → Group Leader",
    points: [
      "Built and owned the visual Workflow Automation Builder (React.js + React Flow) — the platform's core differentiator, adopted by 155+ organizations running 1,200+ live workflows for 1,000+ concurrent users.",
      "Led frontend for 12–14 concurrent products with a 6-engineer team, owning technical decisions, code reviews, sprint planning and delivery.",
      "Cut a 20-day feature delivery to 9 days (55% faster) by bringing Claude Code + Figma MCP into the team — it became the internal delivery benchmark.",
      "Reduced redundant network requests by 60–70% with list virtualization, de-duplicated API calls and debounced search; tuned data-heavy pages with React.memo, useMemo and useCallback.",
      "Designed a recursive tree layout algorithm for React Flow that removed node overlap in deeply nested workflows, fixing a blocking UX issue for every client account.",
      "Proposed an in-app OTP check-in flow for gym kiosk tablets that removed SMS costs completely; adopted by the client.",
      "Grew 4 junior engineers into mid-senior contributors over 3 years through architecture guidelines, reviews and hands-on sessions.",
    ],
    tags: ["React.js", "React Flow", "Redux", "Next.js", "TypeScript", "Zustand", "Zod", "Jest", "React Testing Library", "Chrome Extension APIs"],
  },
];

const EARLIER_ROLES = [
  {
    role: "Frontend Developer",
    company: "Mapps IT Services",
    period: "May 2015 — Mar 2018",
    text: "Frontend for Experiture (omnichannel marketing automation SaaS) and EasyPURL (personalized URL platform) for automotive, healthcare, retail and education clients.",
  },
  {
    role: "Frontend Developer",
    company: "Capital Numbers Infotech",
    period: "Aug 2013 — Sep 2014",
    text: "Pixel-perfect responsive websites for international clients, with JavaScript interactions and fast production hotfixes.",
  },
  {
    role: "Web Designer & Frontend Developer",
    company: "Infoware",
    period: "Aug 2012 — Sep 2013",
    text: "Owned delivery from Photoshop design to responsive HTML, CSS and JavaScript websites, plus brand assets for FMCG clients.",
  },
];

const CREDENTIALS = [
  { icon: Award, title: "Claude Code in Action · Claude Code 101 · Claude 101", meta: "Anthropic Academy · 2026" },
  { icon: Award, title: "Introduction to Modern AI", meta: "Cisco Networking Academy · 2026" },
  { icon: GraduationCap, title: "Bachelor of Computer Applications", meta: "Municipal University · expected 2027" },
  { icon: GraduationCap, title: "Bachelor of Arts (Geography)", meta: "Shridhar University" },
];

const STAGES = [
  { id: "intro", label: "Intro", title: "Hero Intro" },
  { id: "stack", label: "Stack", title: "Full-Stack Tech Stack" },
  { id: "work", label: "Work", title: "Featured Projects" },
  { id: "contact", label: "Contact", title: "Contact" },
] as const;

const STAGE_COUNT = STAGES.length;

/* ════════════════════════════════════════════════════════════════════════════
 * Visual-stage data — what the right-side particles morph into
 * ════════════════════════════════════════════════════════════════════════════ */

type Scene =
  | { kind: "portrait" }
  | { kind: "stack"; group: number } // group: -1 none, 0..3 = STACK ring, 4 = core
  | { kind: "flow"; project: number }
  | { kind: "globe"; variant: "experience" | "contact" };

/** Morph only when the shape changes — hover highlights don't re-scatter particles. */
const sceneKey = (s: Scene) => (s.kind === "flow" ? `flow-${s.project}` : s.kind);

/** Orbit rings of the skill constellation, aligned with STACK order. */
const RINGS = [
  { r: 0.4, tilt: 0.05, roll: 0.16, speed: 0.2, nodes: ["TypeScript", "Redux Toolkit", "Zustand", "TanStack Query", "Tailwind CSS", "React Flow"] },
  { r: 0.6, tilt: 0.28, roll: -0.18, speed: -0.14, nodes: ["Node.js", "Express", "MongoDB", "Docker", "AWS EC2", "Vercel"] },
  { r: 0.79, tilt: -0.22, roll: 0.28, speed: 0.1, nodes: ["Claude Code", "Figma MCP", "Copilot", "Codex"] },
  { r: 0.98, tilt: 0.12, roll: -0.08, speed: -0.07, nodes: ["Jest", "RTL", "Virtualization", "Storybook", "CI/CD"] },
];
const CORE_LABEL = "React.js · Next.js";
const nodeAngle = (k: number, j: number) => (j / RINGS[k].nodes.length) * Math.PI * 2 + k * 0.7;

type FlowNode = { id: string; label: string; sub?: string; x: number; y: number };
type FlowSpec = { title: string; url: string; nodes: FlowNode[]; edges: [string, string, string?][] };

/** One live system diagram per project (unit coords, x ∈ [-1,1], y ∈ [-0.9,0.9]). */
const FLOWS: FlowSpec[] = [
  {
    title: "workflow-automation-builder",
    url: "redbeltgym.com",
    nodes: [
      { id: "t", label: "Trigger", sub: "contact created", x: -0.68, y: -0.5 },
      { id: "c", label: "Yes / No", sub: "has membership?", x: -0.68, y: 0.05 },
      { id: "e", label: "Send email", sub: "welcome series", x: 0.02, y: -0.28 },
      { id: "s", label: "Send SMS", sub: "trial offer", x: 0.02, y: 0.38 },
      { id: "m", label: "Member app", sub: "in-app message", x: 0.68, y: -0.28 },
      { id: "p", label: "Contact profile", sub: "attendance + notes", x: 0.68, y: 0.38 },
    ],
    edges: [["t", "c"], ["c", "e", "yes"], ["c", "s", "no"], ["e", "m"], ["s", "p"], ["m", "p"]],
  },
  {
    title: "visual-ivr-builder",
    url: "chirply.io",
    nodes: [
      { id: "call", label: "Incoming call", sub: "business line", x: -0.7, y: 0 },
      { id: "menu", label: "Main menu", sub: "greeting", x: -0.18, y: 0 },
      { id: "sales", label: "Press 1", sub: "sales", x: 0.3, y: -0.5 },
      { id: "sup", label: "Press 2", sub: "support", x: 0.3, y: 0.08 },
      { id: "sub", label: "Nested menu", sub: "any depth", x: 0.7, y: 0.55 },
      { id: "agent", label: "Agent", sub: "call · SMS · email", x: 0.7, y: -0.5 },
    ],
    edges: [["call", "menu"], ["menu", "sales", "1"], ["menu", "sup", "2"], ["sales", "agent"], ["sup", "sub"], ["sub", "agent"]],
  },
  {
    title: "training-management-system",
    url: "next.js + express",
    nodes: [
      { id: "ui", label: "Next.js App", sub: "server/client split", x: -0.68, y: -0.45 },
      { id: "q", label: "TanStack Query", sub: "mutations", x: -0.68, y: 0.3 },
      { id: "mw", label: "Middleware", sub: "JWT route guard", x: 0, y: -0.45 },
      { id: "api", label: "Express API", sub: "Zod · rate limited", x: 0, y: 0.3 },
      { id: "db", label: "MongoDB", sub: "programs · progress", x: 0.68, y: 0.3 },
      { id: "ship", label: "Docker", sub: "Vercel + Railway", x: 0.68, y: -0.45 },
    ],
    edges: [["ui", "mw"], ["ui", "q"], ["q", "api"], ["mw", "api"], ["api", "db"], ["api", "ship"]],
  },
  {
    title: "will-creation-wizard",
    url: "angular",
    nodes: [
      { id: "a", label: "Sign in", sub: "secure auth", x: -0.68, y: -0.42 },
      { id: "b", label: "Your details", sub: "step 1", x: 0, y: -0.42 },
      { id: "c", label: "Beneficiaries", sub: "step 2", x: 0.68, y: -0.42 },
      { id: "d", label: "Assets", sub: "allocation", x: 0.68, y: 0.32 },
      { id: "e", label: "Review", sub: "step 4", x: 0, y: 0.32 },
      { id: "f", label: "Will ready", sub: "download", x: -0.68, y: 0.32 },
    ],
    edges: [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"], ["e", "f"]],
  },
];

const HOME = { name: "Kolkata, IN", lat: 22.57, lon: 88.36 };
const CITIES = [
  { name: "Bengaluru", lat: 12.97, lon: 77.59 },
  { name: "Mumbai", lat: 19.07, lon: 72.87 },
  { name: "Delhi", lat: 28.61, lon: 77.2 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "Sydney", lat: -33.86, lon: 151.2 },
];

const SCENE_CAPTIONS = {
  portrait: { k: "portrait", title: "portrait.assemble()", text: "Hover to disturb the particles" },
  stack: { k: "stack", title: "stack.constellation", text: "Hover a group on the left to light its orbit" },
  experience: { k: "experience", title: "career.signal", text: "12+ years · 5 companies · broadcasting from Kolkata" },
  contact: { k: "contact", title: "beacon.online", text: "Remote · Hybrid · On-site anywhere in India" },
};

/* ════════════════════════════════════════════════════════════════════════════
 * Particle engine (HTML5 Canvas, no dependencies)
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Portrait 3-stop depth gradient (12 steps):
 * indigo/violet shadows rgb(67,56,202) → electric blue midtones rgb(59,130,246) → sky-blue highlights rgb(186,230,253).
 */
const PORTRAIT_STOPS = [
  [67, 56, 202],
  [59, 130, 246],
  [186, 230, 253],
];
const PORTRAIT_TONE_STEPS = 12;
const PORTRAIT_TONES = Array.from({ length: PORTRAIT_TONE_STEPS }, (_, i) => {
  const t = i / (PORTRAIT_TONE_STEPS - 1);
  const [a, b, u] = t < 0.5 ? [PORTRAIT_STOPS[0], PORTRAIT_STOPS[1], t / 0.5] : [PORTRAIT_STOPS[1], PORTRAIT_STOPS[2], (t - 0.5) / 0.5];
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * u)},${Math.round(a[1] + (b[1] - a[1]) * u)},${Math.round(a[2] + (b[2] - a[2]) * u)})`;
});
const PORTRAIT_TONE0 = 8;

const PALETTE = ["#7c3aed", "#8b5cf6", "#a78bfa", "#818cf8", "#60a5fa", "#38bdf8", "#7dd3fc", "#bae6fd", ...PORTRAIT_TONES];

type Pt = { x: number; y: number; z: number; ring: number; ang: number; rad: number; tone: number; alpha: number; size: number; tag: number };

type Model = {
  count: number;
  screen: boolean; // true = x/y already in canvas px (portrait)
  x: Float32Array; y: Float32Array; z: Float32Array;
  ring: Int8Array; ang: Float32Array; rad: Float32Array;
  tone: Uint8Array; alpha: Float32Array; size: Float32Array; tag: Int8Array;
  /** Portrait only: particle indices sorted by (tone, alpha bucket) so dots draw as a few batched arc paths. */
  order?: Uint32Array;
};

/** Normalised dot targets: x/y in 0..1 of the portrait box, r = dot radius (px), a = alpha, c = colour position 0..1. */
type PortraitSamples = {
  x: Float32Array; y: Float32Array; r: Float32Array; a: Float32Array; c: Float32Array;
  count: number; aspect: number;
};

const pt = (x: number, y: number, z: number, o: Partial<Pt> = {}): Pt => ({
  x, y, z, ring: -1, ang: 0, rad: 0, tone: 5, alpha: 0.9, size: 1.3, tag: -1, ...o,
});

function finalize(pts: Pt[], max: number, screen: boolean): Model {
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  const n = Math.min(pts.length, max);
  const m: Model = {
    count: n, screen,
    x: new Float32Array(n), y: new Float32Array(n), z: new Float32Array(n),
    ring: new Int8Array(n), ang: new Float32Array(n), rad: new Float32Array(n),
    tone: new Uint8Array(n), alpha: new Float32Array(n), size: new Float32Array(n), tag: new Int8Array(n),
  };
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    m.x[i] = p.x; m.y[i] = p.y; m.z[i] = p.z;
    m.ring[i] = p.ring; m.ang[i] = p.ang; m.rad[i] = p.rad;
    m.tone[i] = p.tone; m.alpha[i] = p.alpha; m.size[i] = p.size; m.tag[i] = p.tag;
  }
  return m;
}

const rand = (a = -1, b = 1) => a + Math.random() * (b - a);

/*
 * Stippled portrait — dot coordinates ported from the original standalone particle portrait:
 *  · regular grid (≈2px step on a 340×560 canvas → ~170 columns), each cell box-averaged
 *  · luminance threshold drops the dark navy background
 *
 * Depth shading (rendering only — coordinates unchanged), tuned between "flat & bright" and "too dark":
 *  · mild local-contrast relief (cell vs. blurred neighbourhood) so features read as form
 *  · one continuous roundness falloff over head + neck + chest (smooth union of two ellipses),
 *    so there is no brightness break between the face and the chest
 *  · soft gamma (1.6): shadows fall to indigo, midtones stay electric blue, highlights reach sky-blue
 *  · radius 0.6px (shadow) → 1.8px (highlight), 3-stop indigo → electric blue → sky-blue
 *  · dark hair/blazer dots keep a floor so the silhouette stays complete
 *  · cosine fade at the bottom of the chest
 */
const PORTRAIT_THRESHOLD = 0.11; // navy background averages ≈ 0.065
const PORTRAIT_GAMMA = 1.6;
const PORTRAIT_RELIEF = 0.8; // local-contrast strength
const PORTRAIT_FORM = 0.25; // edge falloff strength
const PORTRAIT_ALPHA_MIN = 0.2;
const PORTRAIT_R_MIN = 0.6;
const PORTRAIT_R_MAX = 1.8;
const PORTRAIT_REF_H = 700; // radii are in px for a ~700px-tall portrait; scaled for other sizes
const CHEST_FADE_START = 0.8;
const CHEST_FADE_END = 0.97;

/** Separable gaussian blur on a single-channel grid. */
function blurGrid(src: Float32Array, W: number, H: number, sigma: number) {
  const rad = Math.ceil(sigma * 2);
  const k = Array.from({ length: rad * 2 + 1 }, (_, i) => Math.exp(-((i - rad) ** 2) / (2 * sigma * sigma)));
  const ks = k.reduce((a, b) => a + b, 0);
  const tmp = new Float32Array(W * H);
  const out = new Float32Array(W * H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      let s = 0;
      for (let j = -rad; j <= rad; j++) s += src[y * W + Math.min(W - 1, Math.max(0, x + j))] * k[j + rad];
      tmp[y * W + x] = s / ks;
    }
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      let s = 0;
      for (let j = -rad; j <= rad; j++) s += tmp[Math.min(H - 1, Math.max(0, y + j)) * W + x] * k[j + rad];
      out[y * W + x] = s / ks;
    }
  return out;
}

/** Roundness: 0 at the centre of the bust, →1 toward its silhouette. Head and torso blend smoothly through the neck. */
function bustDistance(nx: number, ny: number) {
  const dh = ((nx - 0.5) / 0.26) ** 2 + ((ny - 0.43) / 0.33) ** 2;
  const dt = ((nx - 0.5) / 0.5) ** 2 + ((ny - 1.0) / 0.42) ** 2;
  const k = 0.35;
  return -k * Math.log(Math.exp(-dh / k) + Math.exp(-dt / k)); // smooth min
}

function samplePortrait(img: HTMLImageElement, cols: number): PortraitSamples {
  const W = cols;
  const H = Math.round((W * img.naturalHeight) / img.naturalWidth);
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high"; // box-average each grid cell
  g.drawImage(img, 0, 0, W, H);
  const data = g.getImageData(0, 0, W, H).data;

  const lum = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) lum[i] = (0.3 * data[i * 4] + 0.59 * data[i * 4 + 1] + 0.11 * data[i * 4 + 2]) / 255;
  const soft = blurGrid(lum, W, H, 4 * (W / 170));

  // Pass 1: same cells as the original portrait; relief + roundness adjusted brightness per dot.
  const xs = new Float32Array(W * H), ys = new Float32Array(W * H), vs = new Float32Array(W * H);
  let count = 0;
  for (let gy = 0; gy < H; gy++) {
    for (let gx = 0; gx < W; gx++) {
      const nx = (gx + 0.5) / W;
      const ny = (gy + 0.5) / H;
      // Skip the small sparkle watermark in the bottom-right corner.
      if (nx > 0.81 && nx < 0.92 && ny > 0.85 && ny < 0.95) continue;
      const l = lum[gy * W + gx];
      if (l < PORTRAIT_THRESHOLD) continue;
      let v = l + PORTRAIT_RELIEF * (l - soft[gy * W + gx]);
      v *= 1 - PORTRAIT_FORM * Math.pow(Math.min(1, Math.max(0, bustDistance(nx, ny))), 1.5);
      xs[count] = nx + ((Math.random() - 0.5) * 0.6) / W;
      ys[count] = ny + ((Math.random() - 0.5) * 0.6) / H;
      vs[count] = v;
      count++;
    }
  }

  // Pass 2: robust normalisation, then the soft gamma curve.
  const sorted = vs.slice(0, count).sort();
  const lo = sorted[Math.floor(count * 0.02)] ?? 0;
  const hi = sorted[Math.floor(count * 0.995)] ?? 1;
  const rs = new Float32Array(count), as = new Float32Array(count), cs = new Float32Array(count);
  let kept = 0;
  for (let i = 0; i < count; i++) {
    const nx = xs[i], ny = ys[i];
    const t = Math.min(1, Math.max(0, (vs[i] - lo) / Math.max(1e-6, hi - lo)));
    const gm = Math.pow(t, PORTRAIT_GAMMA);
    let alpha = PORTRAIT_ALPHA_MIN + (1 - PORTRAIT_ALPHA_MIN) * gm;
    if (gm < 0.25) {
      if (ny < 0.22 && nx > 0.3 && nx < 0.8) alpha = Math.max(alpha, 0.45); // hair
      else if (ny < 0.52 && (nx < 0.3 || nx > 0.72)) alpha = Math.max(alpha, 0.4); // head sides
      else if (ny > 0.6 && ny < 0.9 && (nx < 0.42 || nx > 0.58)) alpha = Math.max(alpha, 0.4); // collar / blazer
      else if (ny > 0.55 && (nx < 0.22 || nx > 0.78)) alpha = Math.max(alpha, 0.35); // shoulders
    }
    if (ny > CHEST_FADE_START) {
      const f = Math.min(1, (ny - CHEST_FADE_START) / (CHEST_FADE_END - CHEST_FADE_START));
      alpha *= 0.5 * (1 + Math.cos(Math.PI * f));
    }
    if (alpha < 0.015) continue;
    xs[kept] = nx;
    ys[kept] = ny;
    rs[kept] = PORTRAIT_R_MIN + (PORTRAIT_R_MAX - PORTRAIT_R_MIN) * gm;
    as[kept] = alpha;
    cs[kept] = Math.pow(t, (PORTRAIT_GAMMA + 1) / 2);
    kept++;
  }
  return { x: xs, y: ys, r: rs, a: as, c: cs, count: kept, aspect: W / H };
}

const ALPHA_BUCKETS = 16;

function buildPortrait(s: PortraitSamples | null, w: number, h: number, max: number, compact: boolean): Model {
  if (!s) return finalize([], max, true);
  let ph = h * (compact ? 0.62 : 0.88);
  let pw = ph * s.aspect;
  if (pw > w * 0.88) {
    pw = w * 0.88;
    ph = pw / s.aspect;
  }
  const ox = (w - pw) / 2;
  const oy = compact ? h * 0.06 : (h - ph) / 2;
  const scale = Math.min(1.15, Math.max(0.7, ph / PORTRAIT_REF_H));
  const pts: Pt[] = [];
  for (let i = 0; i < s.count; i++) {
    pts.push(
      pt(ox + s.x[i] * pw, oy + s.y[i] * ph, 0, {
        tone: PORTRAIT_TONE0 + Math.round(s.c[i] * (PORTRAIT_TONE_STEPS - 1)),
        alpha: s.a[i],
        size: s.r[i] * scale, // radius in px
      }),
    );
  }
  const m = finalize(pts, max, true);
  // Pre-sort by (tone, alpha bucket): dark dots first so highlights sit on top, few fill() calls.
  const key = (i: number) => m.tone[i] * ALPHA_BUCKETS + Math.min(ALPHA_BUCKETS - 1, Math.floor(m.alpha[i] * ALPHA_BUCKETS));
  m.order = Uint32Array.from({ length: m.count }, (_, i) => i).sort((a, b) => key(a) - key(b));
  return m;
}

function buildStack(max: number): Model {
  const pts: Pt[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < 260; i++) {
    const y = 1 - (i / 259) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = i * golden;
    const rr = 0.15 + rand(0, 0.02);
    pts.push(pt(Math.cos(a) * r * rr, y * rr, Math.sin(a) * r * rr, { tone: 6 + (i % 2), alpha: 0.9, size: 1.4, tag: 4 }));
  }
  RINGS.forEach((ring, k) => {
    const pathN = Math.round(160 + ring.r * 180);
    for (let i = 0; i < pathN; i++) {
      pts.push(pt(rand() * 0.008, rand() * 0.008, rand() * 0.008, {
        ring: k, ang: (i / pathN) * Math.PI * 2, rad: ring.r,
        tone: k % 2 ? 2 : 5, alpha: 0.5, size: 1.05, tag: k,
      }));
    }
    ring.nodes.forEach((_, j) => {
      for (let m = 0; m < 40; m++) {
        pts.push(pt(rand() * 0.035, rand() * 0.035, rand() * 0.035, {
          ring: k, ang: nodeAngle(k, j), rad: ring.r,
          tone: m % 3 ? 7 : 2, alpha: 1, size: 1.5, tag: k,
        }));
      }
    });
  });
  return finalize(pts, max, false);
}

const NODE_HW = 0.2;
const NODE_HH = 0.088;

function edgeEnds(a: FlowNode, b: FlowNode) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const clip = (sx: number, sy: number) => Math.min(NODE_HW / Math.max(Math.abs(sx), 1e-6), NODE_HH / Math.max(Math.abs(sy), 1e-6));
  const ta = clip(dx, dy);
  return {
    x1: a.x + dx * ta, y1: a.y + dy * ta,
    x2: b.x - dx * ta, y2: b.y - dy * ta,
  };
}

function buildFlow(index: number, max: number): Model {
  const f = FLOWS[index];
  const pts: Pt[] = [];
  const line = (x1: number, y1: number, x2: number, y2: number, step: number, o: Partial<Pt>) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(2, Math.round(len / step));
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      pts.push(pt(x1 + (x2 - x1) * u + rand() * 0.003, y1 + (y2 - y1) * u + rand() * 0.003, rand() * 0.01, o));
    }
  };
  const rect = (x: number, y: number, w: number, h: number, step: number, o: Partial<Pt>) => {
    line(x, y, x + w, y, step, o);
    line(x + w, y, x + w, y + h, step, o);
    line(x + w, y + h, x, y + h, step, o);
    line(x, y + h, x, y, step, o);
  };
  // Browser-window wireframe
  rect(-1, -0.92, 2, 1.8, 0.03, { tone: 2, alpha: 0.35, size: 1, tag: 1 });
  line(-1, -0.76, 1, -0.76, 0.04, { tone: 2, alpha: 0.25, size: 1, tag: 1 });
  const byId = Object.fromEntries(f.nodes.map((n) => [n.id, n]));
  f.edges.forEach(([a, b]) => {
    const e = edgeEnds(byId[a], byId[b]);
    line(e.x1, e.y1, e.x2, e.y2, 0.02, { tone: 4, alpha: 0.6, size: 1.1, tag: 2 });
  });
  f.nodes.forEach((n) => {
    rect(n.x - NODE_HW, n.y - NODE_HH, NODE_HW * 2, NODE_HH * 2, 0.008, { tone: 6, alpha: 0.95, size: 1.3, tag: 0 });
  });
  return finalize(pts, max, false);
}

const GLOBE_R = 0.78;

function latLon(lat: number, lon: number, r = GLOBE_R) {
  const p = (lat * Math.PI) / 180;
  const l = (lon * Math.PI) / 180;
  return { x: Math.cos(p) * Math.sin(l) * r, y: -Math.sin(p) * r, z: -Math.cos(p) * Math.cos(l) * r };
}

/** Great-circle arc from a to b lifted off the surface. */
function arcPoint(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }, u: number) {
  const dot = (a.x * b.x + a.y * b.y + a.z * b.z) / (GLOBE_R * GLOBE_R);
  const om = Math.acos(Math.min(1, Math.max(-1, dot)));
  const so = Math.sin(om) || 1;
  const ka = Math.sin((1 - u) * om) / so;
  const kb = Math.sin(u * om) / so;
  const lift = 1 + Math.sin(Math.PI * u) * (0.08 + 0.28 * (om / Math.PI));
  return { x: (a.x * ka + b.x * kb) * lift, y: (a.y * ka + b.y * kb) * lift, z: (a.z * ka + b.z * kb) * lift };
}

function buildGlobe(max: number, compact: boolean): Model {
  const pts: Pt[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const N = compact ? 900 : 1500;
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = i * golden;
    pts.push(pt(Math.cos(a) * r * GLOBE_R, y * GLOBE_R, Math.sin(a) * r * GLOBE_R, {
      tone: 3 + ((Math.random() * 3) | 0), alpha: 0.55, size: 1.1, tag: 0,
    }));
  }
  // Tilted orbit ring
  for (let i = 0; i < 160; i++) {
    const a = (i / 160) * Math.PI * 2;
    const x = Math.cos(a) * 1.02, z = Math.sin(a) * 1.02;
    pts.push(pt(x, z * 0.35, z, { tone: 1, alpha: 0.4, size: 1, tag: 2 }));
  }
  const home = latLon(HOME.lat, HOME.lon);
  CITIES.forEach((c) => {
    const b = latLon(c.lat, c.lon);
    for (let i = 0; i <= 34; i++) {
      const p = arcPoint(home, b, i / 34);
      pts.push(pt(p.x, p.y, p.z, { tone: 6, alpha: 0.85, size: 1.25, tag: 1 }));
    }
  });
  for (let i = 0; i < 50; i++) {
    pts.push(pt(home.x + rand() * 0.03, home.y + rand() * 0.03, home.z + rand() * 0.03, { tone: 7, alpha: 1, size: 1.6, tag: 1 }));
  }
  return finalize(pts, max, false);
}

/* Scratch outputs (avoid per-frame allocation) */
const Q = { x: 0, y: 0, z: 0 };
const P = { x: 0, y: 0, s: 1, d: 0 };

function ringPoint(k: number, a: number, rad: number, ox: number, oy: number, oz: number) {
  const R = RINGS[k];
  const x = Math.cos(a) * rad + ox;
  const y = oy;
  const z = Math.sin(a) * rad + oz;
  const ct = Math.cos(R.tilt), st = Math.sin(R.tilt);
  const y1 = y * ct - z * st;
  const z1 = y * st + z * ct;
  const cr = Math.cos(R.roll), sr = Math.sin(R.roll);
  Q.x = x * cr - y1 * sr;
  Q.y = x * sr + y1 * cr;
  Q.z = z1;
}

type View = { cy: number; sy: number; cx: number; sx: number; ox: number; oy: number; R: number };

function project(x: number, y: number, z: number, v: View) {
  const x1 = x * v.cy + z * v.sy;
  const z1 = -x * v.sy + z * v.cy;
  const y2 = y * v.cx - z1 * v.sx;
  const z2 = y * v.sx + z1 * v.cx;
  const s = 2.8 / (2.8 + z2);
  P.x = v.ox + x1 * v.R * s;
  P.y = v.oy + y2 * v.R * s;
  P.s = s;
  P.d = z2;
}

function makeSprite(color: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return c;
}

/**
 * Right-side visual stage. One particle pool morphs between scenes; a second,
 * fully-cleared canvas draws crisp vector overlays (lines, labels, pulses).
 */
function ParticleStage({ scene }: { scene: Scene }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene>(scene);
  const reduce = useReducedMotion();

  useEffect(() => {
    sceneRef.current = scene;
  }, [scene]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const base = baseRef.current;
    const over = overlayRef.current;
    if (!wrap || !base || !over) return;
    const ctx = base.getContext("2d")!;
    const octx = over.getContext("2d")!;
    const still = Boolean(reduce);

    const compact = window.innerWidth < 1024;
    // Grid columns follow the original portrait density (~170 cols on desktop); lighter on small screens.
    const PORTRAIT_COLS = window.innerWidth < 640 ? 100 : compact ? 120 : 170;
    const N = window.innerWidth < 640 ? 5600 : compact ? 7800 : 15200;
    const FREE_MIN = 260;
    const MAX_PTS = N - FREE_MIN;

    const px = new Float32Array(N), py = new Float32Array(N);
    const vx = new Float32Array(N), vy = new Float32Array(N);
    const ptone = new Uint8Array(N), pseed = new Float32Array(N);
    const drawA = new Float32Array(N), drawS = new Float32Array(N);

    let w = 0, h = 0;
    let portrait: PortraitSamples | null = null;
    let model: Model = finalize([], MAX_PTS, true);
    let key = "";
    let energy = 1;
    let blend = 0;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    const mouse = { x: -9999, y: -9999, inside: false, nx: 0, ny: 0, tx: 0, ty: 0, lastX: 0, lastY: 0, lastSpawn: 0 };
    const ripples: { x: number; y: number; t0: number; k: number }[] = [];
    const sprites = [makeSprite("rgba(56,189,248,0.9)"), makeSprite("rgba(167,139,250,0.9)")];
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains-mono").trim() || "monospace";

    const buildFor = (s: Scene): Model => {
      switch (s.kind) {
        case "portrait":
          return buildPortrait(portrait, w, h, MAX_PTS, compact);
        case "stack":
          return buildStack(MAX_PTS);
        case "flow":
          return buildFlow(s.project, MAX_PTS);
        case "globe":
          return buildGlobe(MAX_PTS, compact);
      }
    };

    const remodel = (kick: boolean) => {
      model = buildFor(sceneRef.current);
      if (kick) {
        energy = still ? 0 : 1;
        blend = still ? 1 : 0;
      }
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const first = w === 0;
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      for (const c of [base, over]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first) {
        for (let i = 0; i < N; i++) {
          // Start as a drifting cloud around the edges so particles swirl in.
          const a = Math.random() * Math.PI * 2;
          const rr = Math.max(w, h) * rand(0.35, 0.75);
          px[i] = w / 2 + Math.cos(a) * rr;
          py[i] = h / 2 + Math.sin(a) * rr;
          ptone[i] = (Math.random() * 8) | 0;
          pseed[i] = Math.random();
        }
      }
      if (sceneRef.current.kind === "portrait") remodel(false);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const img = new Image();
    img.decoding = "async";
    img.src = "/profile.png";
    img.onload = () => {
      portrait = samplePortrait(img, PORTRAIT_COLS);
      if (sceneRef.current.kind === "portrait") remodel(true);
    };

    const onMove = (e: PointerEvent) => {
      const r = over.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      mouse.inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      mouse.x = x;
      mouse.y = y;
      mouse.tx = Math.max(-1, Math.min(1, (x / r.width - 0.5) * 2));
      mouse.ty = Math.max(-1, Math.min(1, (y / r.height - 0.5) * 2));
      const now = performance.now();
      const moved = Math.hypot(x - mouse.lastX, y - mouse.lastY);
      if (mouse.inside && !still && moved > 26 && now - mouse.lastSpawn > 220) {
        ripples.push({ x, y, t0: now, k: 0.55 });
        if (ripples.length > 6) ripples.shift();
        mouse.lastSpawn = now;
      }
      mouse.lastX = x;
      mouse.lastY = y;
    };
    const onDown = (e: PointerEvent) => {
      const r = over.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (still || x < 0 || y < 0 || x > r.width || y > r.height) return;
      ripples.push({ x, y, t0: performance.now(), k: 1.4 });
      if (ripples.length > 6) ripples.shift();
    };
    const onLeave = () => {
      mouse.inside = false;
      mouse.tx = 0;
      mouse.ty = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    const viewFor = (s: Scene): View => {
      const mx = mouse.nx, my = mouse.ny;
      let ry = 0, rx = 0, R = Math.min(w, h) * 0.44;
      let oy = h / 2;
      if (s.kind === "stack") {
        ry = t * 0.08 + mx * 0.5;
        rx = -1.1 + my * 0.25;
      } else if (s.kind === "flow") {
        ry = Math.sin(t * 0.35) * 0.1 + mx * 0.3;
        rx = -0.3 + my * 0.15;
        R = Math.min(w * 0.45, h * 0.5);
      } else if (s.kind === "globe") {
        ry = (HOME.lon * Math.PI) / 180 + 0.22 + Math.sin(t * 0.15) * 0.22 + mx * 0.2;
        rx = ((HOME.lat * Math.PI) / 180) * 0.8 + my * 0.25;
        R = Math.min(w, h) * 0.46;
      }
      if (compact) {
        R *= 0.82;
        oy = h * 0.36;
      }
      return { cy: Math.cos(ry), sy: Math.sin(ry), cx: Math.cos(rx), sx: Math.sin(rx), ox: w / 2, oy, R };
    };

    /* ─── overlay drawing ─── */

    const label = (text: string, x: number, y: number, size: number, color: string, weight = 500, align: CanvasTextAlign = "center") => {
      octx.font = `${weight} ${size}px ${mono}`;
      octx.textAlign = align;
      octx.fillStyle = color;
      octx.fillText(text, x, y);
    };

    const drawStackOverlay = (v: View, group: number) => {
      project(0, 0, 0, v);
      const cx0 = P.x, cy0 = P.y;
      const nodes: { x: number; y: number; s: number; d: number; text: string; k: number; j: number }[] = [];
      RINGS.forEach((ring, k) => {
        ring.nodes.forEach((text, j) => {
          ringPoint(k, nodeAngle(k, j) + t * ring.speed, ring.r, 0, 0, 0);
          project(Q.x, Q.y, Q.z, v);
          nodes.push({ x: P.x, y: P.y, s: P.s, d: P.d, text, k, j });
        });
      });
      nodes.sort((a, b) => b.d - a.d);
      octx.lineWidth = 1;
      for (const n of nodes) {
        const on = group === n.k;
        const dim = group >= 0 && !on;
        octx.strokeStyle = on ? "rgba(167,139,250,0.6)" : `rgba(56,189,248,${dim ? 0.05 : 0.13})`;
        octx.beginPath();
        octx.moveTo(cx0, cy0);
        octx.lineTo(n.x, n.y);
        octx.stroke();
        // Data packet travelling along the spoke
        const u = (t * 0.45 + n.j * 0.17 + n.k * 0.31) % 1;
        octx.fillStyle = on ? "rgba(196,181,253,0.95)" : "rgba(125,211,252,0.7)";
        octx.beginPath();
        octx.arc(cx0 + (n.x - cx0) * u, cy0 + (n.y - cy0) * u, on ? 2.2 : 1.5, 0, Math.PI * 2);
        octx.fill();
      }
      for (const n of nodes) {
        const on = group === n.k;
        const depthA = Math.max(0.25, Math.min(1, 0.85 - n.d * 0.5));
        const a = (group >= 0 && !on ? 0.3 : 1) * depthA;
        octx.fillStyle = on ? `rgba(167,139,250,${a})` : `rgba(125,211,252,${a})`;
        octx.beginPath();
        octx.arc(n.x, n.y, (on ? 4 : 3) * n.s, 0, Math.PI * 2);
        octx.fill();
        if (on) {
          octx.strokeStyle = "rgba(167,139,250,0.5)";
          octx.beginPath();
          octx.arc(n.x, n.y, 9 * n.s, 0, Math.PI * 2);
          octx.stroke();
        }
        label(n.text, n.x, n.y - 10 * n.s, Math.round((compact ? 9.5 : 11) * n.s), `rgba(226,232,240,${a * 0.95})`, on ? 600 : 500);
      }
      const coreOn = group === 4;
      label(CORE_LABEL, cx0, cy0 + v.R * 0.26, compact ? 11 : 13, coreOn ? "#c4b5fd" : "#f8fafc", 700);
      label("core expertise", cx0, cy0 + v.R * 0.26 + 14, compact ? 9 : 10, "rgba(148,163,184,0.9)");
    };

    const drawFlowOverlay = (v: View, index: number) => {
      const f = FLOWS[index];
      const poly = (pts: [number, number][]) => {
        octx.beginPath();
        pts.forEach(([x, y], i) => {
          project(x, y, 0, v);
          if (i === 0) octx.moveTo(P.x, P.y);
          else octx.lineTo(P.x, P.y);
        });
        octx.closePath();
      };
      // Window chrome
      poly([[-1, -0.92], [1, -0.92], [1, 0.88], [-1, 0.88]]);
      octx.fillStyle = "rgba(11,16,32,0.25)";
      octx.fill();
      ["#f87171", "#fbbf24", "#4ade80"].forEach((c, i) => {
        project(-0.94 + i * 0.045, -0.84, 0, v);
        octx.fillStyle = c;
        octx.globalAlpha = blend * 0.7;
        octx.beginPath();
        octx.arc(P.x, P.y, 3 * P.s, 0, Math.PI * 2);
        octx.fill();
        octx.globalAlpha = blend;
      });
      project(-0.78, -0.835, 0, v);
      label(`${f.url} — ${f.title}`, P.x, P.y + 3, compact ? 9 : 11, "rgba(148,163,184,0.95)", 500, "left");
      project(0.96, -0.835, 0, v);
      octx.fillStyle = "#22c55e";
      octx.beginPath();
      octx.arc(P.x - 34, P.y, 3, 0, Math.PI * 2);
      octx.fill();
      label("live", P.x, P.y + 3, compact ? 9 : 10, "rgba(134,239,172,0.95)", 600, "right");

      const byId = Object.fromEntries(f.nodes.map((n) => [n.id, n]));
      const activeNode = Math.floor(t * 0.7) % f.nodes.length;
      f.edges.forEach(([a, b, tag], ei) => {
        const e = edgeEnds(byId[a], byId[b]);
        project(e.x1, e.y1, 0, v);
        const x1 = P.x, y1 = P.y;
        project(e.x2, e.y2, 0, v);
        const x2 = P.x, y2 = P.y;
        octx.strokeStyle = "rgba(56,189,248,0.35)";
        octx.lineWidth = 1.2;
        octx.beginPath();
        octx.moveTo(x1, y1);
        octx.lineTo(x2, y2);
        octx.stroke();
        for (let k = 0; k < 2; k++) {
          const u = (t * 0.4 + k * 0.5 + ei * 0.17) % 1;
          const x = x1 + (x2 - x1) * u, y = y1 + (y2 - y1) * u;
          octx.fillStyle = "rgba(167,139,250,0.25)";
          octx.beginPath();
          octx.arc(x, y, 6, 0, Math.PI * 2);
          octx.fill();
          octx.fillStyle = "#e0f2fe";
          octx.beginPath();
          octx.arc(x, y, 2.2, 0, Math.PI * 2);
          octx.fill();
        }
        if (tag) {
          const mxp = (x1 + x2) / 2, myp = (y1 + y2) / 2;
          octx.fillStyle = "rgba(5,7,13,0.85)";
          octx.fillRect(mxp - 14, myp - 9, 28, 16);
          label(tag, mxp, myp + 3, compact ? 9 : 10, "#c4b5fd", 600);
        }
      });
      f.nodes.forEach((n, ni) => {
        poly([[n.x - NODE_HW, n.y - NODE_HH], [n.x + NODE_HW, n.y - NODE_HH], [n.x + NODE_HW, n.y + NODE_HH], [n.x - NODE_HW, n.y + NODE_HH]]);
        octx.fillStyle = "rgba(11,16,32,0.72)";
        octx.fill();
        const on = ni === activeNode;
        octx.strokeStyle = on ? "rgba(167,139,250,0.95)" : "rgba(125,211,252,0.35)";
        octx.lineWidth = on ? 1.6 : 1;
        octx.stroke();
        project(n.x, n.y, 0, v);
        const s = P.s;
        label(n.label, P.x, P.y - (n.sub ? 2 : -4) * s, Math.round((compact ? 10 : 12) * s), on ? "#ede9fe" : "#f1f5f9", 600);
        if (n.sub) label(n.sub, P.x, P.y + 12 * s, Math.round((compact ? 8.5 : 10) * s), "rgba(148,163,184,0.95)");
      });
    };

    const drawGlobeOverlay = (v: View, variant: "experience" | "contact") => {
      const home = latLon(HOME.lat, HOME.lon);
      octx.lineWidth = 1.2;
      CITIES.forEach((c, ci) => {
        const b = latLon(c.lat, c.lon);
        let prevX = 0, prevY = 0;
        for (let i = 0; i <= 28; i++) {
          const p = arcPoint(home, b, i / 28);
          project(p.x, p.y, p.z, v);
          if (i > 0) {
            const a = Math.max(0, Math.min(0.7, 0.45 - P.d * 0.6));
            octx.strokeStyle = `rgba(167,139,250,${a})`;
            octx.beginPath();
            octx.moveTo(prevX, prevY);
            octx.lineTo(P.x, P.y);
            octx.stroke();
          }
          prevX = P.x;
          prevY = P.y;
        }
        const u = (t * 0.28 + ci * 0.19) % 1;
        const p = arcPoint(home, b, u);
        project(p.x, p.y, p.z, v);
        if (P.d < 0.4) {
          octx.fillStyle = "rgba(186,230,253,0.95)";
          octx.beginPath();
          octx.arc(P.x, P.y, 2.4, 0, Math.PI * 2);
          octx.fill();
        }
        project(b.x, b.y, b.z, v);
        if (P.d < 0.1) {
          octx.fillStyle = "#7dd3fc";
          octx.beginPath();
          octx.arc(P.x, P.y, 2.5, 0, Math.PI * 2);
          octx.fill();
          label(c.name, P.x + 6, P.y - 6, compact ? 9 : 10, "rgba(203,213,225,0.85)", 500, "left");
        }
      });
      project(home.x, home.y, home.z, v);
      const hx = P.x, hy = P.y;
      for (let k = 0; k < 3; k++) {
        const rr = (t * 0.5 + k / 3) % 1;
        octx.strokeStyle = `rgba(34,211,238,${(1 - rr) * 0.7})`;
        octx.lineWidth = 1.4;
        octx.beginPath();
        octx.arc(hx, hy, 5 + rr * (compact ? 45 : 70), 0, Math.PI * 2);
        octx.stroke();
      }
      octx.fillStyle = "#e0f2fe";
      octx.beginPath();
      octx.arc(hx, hy, 4, 0, Math.PI * 2);
      octx.fill();
      label(HOME.name, hx + 12, hy - 10, compact ? 11 : 13, "#f8fafc", 700, "left");
      label(variant === "contact" ? "signal: available now" : "12+ yrs · 5 companies", hx + 12, hy + 6, compact ? 9 : 10.5, "rgba(125,211,252,0.95)", 500, "left");
    };

    /* ─── main loop ─── */

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(2.5, (now - last) / 16.67);
      last = now;
      if (w < 10 || h < 10) return;
      if (!still) t += dt / 60;

      const s = sceneRef.current;
      const k = sceneKey(s);
      if (k !== key) {
        key = k;
        remodel(true);
      }
      if (!still) energy *= Math.pow(0.986, dt);
      if (energy < 0.55) blend = Math.min(1, blend + 0.03 * dt);

      mouse.nx += (mouse.tx - mouse.nx) * 0.05 * dt;
      mouse.ny += (mouse.ty - mouse.ny) * 0.05 * dt;

      const v = viewFor(s);
      const group = s.kind === "stack" ? s.group : -1;
      const m = model;
      const springK = still ? 0.25 : 0.014 + 0.07 * (1 - energy) * (1 - energy);
      const flowAmp = still ? 0 : 0.5 * energy + 0.025;
      const nowMs = now;
      const R2 = 110 * 110;

      for (let i = 0; i < N; i++) {
        let x = px[i], y = py[i];
        const ang =
          (Math.sin(x * 0.006 + t * 0.35 + pseed[i]) + Math.cos(y * 0.007 - t * 0.28) + Math.sin((x + y) * 0.003 + t * 0.12)) * Math.PI;
        if (i < m.count) {
          let tx: number, ty: number, sc = 1, dep = 0;
          if (m.screen) {
            tx = m.x[i];
            ty = m.y[i];
          } else {
            let mx = m.x[i], my = m.y[i], mz = m.z[i];
            const ring = m.ring[i];
            if (ring >= 0) {
              ringPoint(ring, m.ang[i] + t * RINGS[ring].speed, m.rad[i], mx, my, mz);
              mx = Q.x; my = Q.y; mz = Q.z;
            }
            project(mx, my, mz, v);
            tx = P.x; ty = P.y; sc = P.s; dep = P.d;
          }
          vx[i] += (tx - x) * springK * dt + Math.cos(ang) * flowAmp * dt;
          vy[i] += (ty - y) * springK * dt + Math.sin(ang) * flowAmp * dt;
          const depthA = m.screen ? 1 : Math.max(0.18, Math.min(1, 0.9 - dep * 0.5));
          const tag = m.tag[i];
          const hl = group < 0 ? 1 : tag === group ? 1.3 : 0.28;
          drawA[i] = Math.min(1, m.alpha[i] * depthA * hl);
          drawS[i] = m.size[i] * sc;
        } else {
          vx[i] += Math.cos(ang) * 0.07 * dt;
          vy[i] += Math.sin(ang) * 0.07 * dt - 0.004 * dt;
          const sp = Math.hypot(vx[i], vy[i]);
          if (sp > 2.2) {
            vx[i] *= 2.2 / sp;
            vy[i] *= 2.2 / sp;
          }
        }

        if (!still) {
          if (mouse.inside) {
            const dx = x - mouse.x, dy = y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = 1 - d / 110;
              vx[i] += ((dx / d) * 2.6 - (dy / d) * 1.2) * f * dt;
              vy[i] += ((dy / d) * 2.6 + (dx / d) * 1.2) * f * dt;
            }
          }
          for (let r = 0; r < ripples.length; r++) {
            const rp = ripples[r];
            const age = (nowMs - rp.t0) / 1000;
            if (age > 1.1) continue;
            const dx = x - rp.x, dy = y - rp.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            const band = Math.abs(d - age * 420);
            if (band < 28) {
              const f = (1 - band / 28) * (1 - age / 1.1) * 2 * rp.k;
              vx[i] += (dx / d) * f * dt;
              vy[i] += (dy / d) * f * dt;
            }
          }
        }

        const damp = Math.pow(i < m.count ? 0.84 : 0.95, dt);
        vx[i] *= damp;
        vy[i] *= damp;
        x += vx[i] * dt;
        y += vy[i] * dt;
        if (i >= m.count) {
          if (x < -30) x = w + 30;
          else if (x > w + 30) x = -30;
          if (y < -30) y = h + 30;
          else if (y > h + 30) y = -30;
        }
        px[i] = x;
        py[i] = y;
      }
      while (ripples.length && (nowMs - ripples[0].t0) / 1000 > 1.1) ripples.shift();

      /* base canvas: fade previous frame for smokey trails */
      const portraitScene = m.screen && m.order !== undefined;
      // Trails persist while particles swirl in; once the portrait settles the frame clears fully,
      // so stationary dots don't stack up into a brighter, flatter face than the shading intends.
      const settle = portraitScene ? Math.min(1, Math.max(0, (0.35 - energy) / 0.3)) : 0;
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(0,0,0,${still ? 1 : 0.24 + 0.76 * settle})`;
      ctx.fillRect(0, 0, w, h);

      // Soft smoke: additive glow elsewhere, plain blending over the portrait (no glow stacking on the face).
      ctx.globalCompositeOperation = portraitScene ? "source-over" : "lighter";
      const smokeEnd = Math.min(N, m.count + 650);
      for (let i = m.count; i < smokeEnd; i++) {
        const size = 10 + (i % 7) * 3;
        ctx.globalAlpha = (0.035 + (i % 5) * 0.008) * (portraitScene ? 0.6 : 1);
        ctx.drawImage(sprites[ptone[i] < 4 ? 1 : 0], px[i] - size / 2, py[i] - size / 2, size, size);
      }

      ctx.globalCompositeOperation = "source-over";
      if (portraitScene) {
        // Round stipple dots, batched by (tone, alpha bucket) — darkest first, highlights on top.
        const order = m.order!;
        let cur = -1;
        for (let j = 0; j < m.count; j++) {
          const i = order[j];
          const ab = Math.min(ALPHA_BUCKETS - 1, Math.floor(m.alpha[i] * ALPHA_BUCKETS));
          const k = m.tone[i] * ALPHA_BUCKETS + ab;
          if (k !== cur) {
            if (cur >= 0) ctx.fill();
            cur = k;
            ctx.fillStyle = PALETTE[m.tone[i]];
            ctx.globalAlpha = (ab + 0.5) / ALPHA_BUCKETS;
            ctx.beginPath();
          }
          const r = drawS[i];
          ctx.moveTo(px[i] + r, py[i]);
          ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
        }
        if (cur >= 0) ctx.fill();
      } else {
        for (let b = 0; b < PALETTE.length; b++) {
          ctx.fillStyle = PALETTE[b];
          for (let i = 0; i < m.count; i++) {
            if (m.tone[i] !== b) continue;
            ctx.globalAlpha = drawA[i];
            const sz = drawS[i];
            ctx.fillRect(px[i] - sz / 2, py[i] - sz / 2, sz, sz);
          }
        }
      }
      ctx.globalAlpha = 1;

      /* overlay canvas: crisp vectors, fully cleared each frame */
      octx.clearRect(0, 0, w, h);
      octx.globalAlpha = blend;
      if (blend > 0.01) {
        if (s.kind === "stack") drawStackOverlay(v, group);
        else if (s.kind === "flow") drawFlowOverlay(v, s.project);
        else if (s.kind === "globe") drawGlobeOverlay(v, s.variant);
      }
      octx.globalAlpha = 1;
      for (const rp of ripples) {
        const age = (nowMs - rp.t0) / 1000;
        octx.strokeStyle = `rgba(125,211,252,${Math.max(0, (1 - age / 1.1) * 0.35 * rp.k)})`;
        octx.lineWidth = 1;
        octx.beginPath();
        octx.arc(rp.x, rp.y, age * 420, 0, Math.PI * 2);
        octx.stroke();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      img.onload = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={baseRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <canvas
        ref={overlayRef}
        role="img"
        aria-label={sceneAria(scene)}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function sceneAria(s: Scene) {
  switch (s.kind) {
    case "portrait":
      return "Particle portrait of Suman Debnath";
    case "stack":
      return "Animated constellation of Suman's tech stack orbiting React.js and Next.js";
    case "flow":
      return `Live system diagram for ${PROJECTS[s.project].name}`;
    case "globe":
      return "Network globe broadcasting from Kolkata, India";
  }
}

/* ════════════════════════════════════════════════════════════════════════════
 * Motion primitives
 * ════════════════════════════════════════════════════════════════════════════ */

const SPRING = { stiffness: 140, damping: 22, mass: 0.6 };
const TILT_SPRING = { stiffness: 260, damping: 20, mass: 0.5 };

const stageVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 70, z: -120, rotateX: dir * 8, filter: "blur(10px)" }),
  center: {
    opacity: 1, y: 0, z: 0, rotateX: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: (dir: number) => ({
    opacity: 0, y: dir * -60, z: -160, rotateX: dir * -6, filter: "blur(8px)",
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  }),
};

const reducedStageVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const itemVariants: Variants = {
  enter: { opacity: 0, y: 24, scale: 0.97 },
  center: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 180, damping: 22 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* ════════════════════════════════════════════════════════════════════════════
 * Scroll-driven stage controller
 * The page scrolls a 400vh invisible track; the UI lives in a fixed 100vh stage.
 * ════════════════════════════════════════════════════════════════════════════ */

function useStageController() {
  const { scrollY, scrollYProgress } = useScroll();
  const [state, setState] = useState({ index: 0, dir: 1 });
  const local = useMotionValue(0); // signed distance from the active stage (-0.5 … 0.5)

  const sync = useCallback(
    (y: number) => {
      const vh = window.innerHeight || 1;
      const raw = y / vh;
      const index = Math.min(STAGE_COUNT - 1, Math.max(0, Math.round(raw)));
      local.set(Math.max(-0.5, Math.min(0.5, raw - index)));
      setState((prev) => (prev.index === index ? prev : { index, dir: index > prev.index ? 1 : -1 }));
    },
    [local],
  );

  useMotionValueEvent(scrollY, "change", sync);

  useEffect(() => {
    const hashIndex = STAGES.findIndex((s) => `#${s.id}` === window.location.hash);
    if (hashIndex > 0) window.scrollTo({ top: hashIndex * window.innerHeight, behavior: "instant" });
    const onHash = () => {
      const i = STAGES.findIndex((s) => `#${s.id}` === window.location.hash);
      if (i >= 0) window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHash);
    const raf = requestAnimationFrame(() => sync(window.scrollY));
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", onHash);
    };
  }, [sync]);

  useEffect(() => {
    const id = STAGES[state.index].id;
    window.history.replaceState(null, "", state.index === 0 ? window.location.pathname : `#${id}`);
  }, [state.index]);

  return { ...state, local, progress: scrollYProgress };
}

function useGoToStage() {
  const reduce = useReducedMotion();
  return useCallback(
    (i: number) => {
      const target = document.getElementById(`track-${STAGES[i].id}`);
      if (!target) return;
      window.scrollTo({ top: target.offsetTop, behavior: reduce ? "instant" : "smooth" });
    },
    [reduce],
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * Page
 * ════════════════════════════════════════════════════════════════════════════ */

type WorkTab = "projects" | "experience";

export default function Home() {
  const { index, dir, local, progress } = useStageController();
  const goTo = useGoToStage();
  const reduce = useReducedMotion();

  const [activeGroup, setActiveGroup] = useState(-1);
  const [activeProject, setActiveProject] = useState(0);
  const [workTab, setWorkTab] = useState<WorkTab>("projects");
  const [hasMore, setHasMore] = useState(false);

  const scene: Scene =
    index === 0
      ? { kind: "portrait" }
      : index === 1
        ? { kind: "stack", group: activeGroup }
        : index === 2
          ? workTab === "projects"
            ? { kind: "flow", project: activeProject }
            : { kind: "globe", variant: "experience" }
          : { kind: "globe", variant: "contact" };

  const smoothLocal = useSpring(local, SPRING);
  const stageRotate = useTransform(smoothLocal, [-0.5, 0.5], reduce ? [0, 0] : [5, -5]);
  const stageY = useTransform(smoothLocal, [-0.5, 0.5], reduce ? [0, 0] : [40, -40]);
  const stageScale = useTransform(smoothLocal, [-0.5, 0, 0.5], reduce ? [1, 1, 1] : [0.97, 1, 0.97]);
  const visualY = useTransform(smoothLocal, [-0.5, 0.5], reduce ? [0, 0] : [-24, 24]);

  return (
    <>
      {/* Invisible scroll track: 4 × 100vh snap bands = 400vh */}
      <div aria-hidden className="relative">
        {STAGES.map((s) => (
          <div key={s.id} id={`track-${s.id}`} className="h-svh snap-start [scroll-snap-stop:always]" />
        ))}
      </div>

      {/* Locked 100vh stage */}
      <div className="fixed inset-0 overflow-hidden">
        <AmbientBackdrop progress={progress} stage={index} />

        {/* Desktop: 7/12 content · 5/12 graphics. Mobile: graphics become a dimmed full-bleed backdrop. */}
        <div className="absolute inset-0 lg:grid lg:grid-cols-12 lg:grid-rows-1">
          {/* Right: dynamic graphical stage */}
          <motion.div
            className="absolute inset-0 opacity-70 lg:relative lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:opacity-100"
            style={{ y: visualY }}
          >
            <NebulaSmoke />
            <ParticleStage scene={scene} />
            <div aria-hidden className="pointer-events-none absolute inset-y-[12%] left-0 hidden w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:block" />
            <SceneCaption scene={scene} />
          </motion.div>
          {/* Keep left text readable over the backdrop on small screens */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/60 to-bg/85 lg:hidden" />

          {/* Left: data & cards */}
          <main className="pointer-events-none absolute inset-0 [perspective:1400px] lg:relative lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <motion.div className="h-full w-full" style={{ rotateX: stageRotate, y: stageY, scale: stageScale }}>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.section
                  key={STAGES[index].id}
                  id={STAGES[index].id}
                  aria-label={STAGES[index].title}
                  custom={dir}
                  variants={reduce ? reducedStageVariants : stageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="pointer-events-auto absolute inset-0 flex items-center"
                >
                  <div className="w-full px-4 sm:px-8 lg:pr-8 lg:pl-10 xl:pr-12 xl:pl-14 2xl:pl-[max(3.5rem,calc(50vw-44rem))]">
                    <StageScroller
                      dir={dir}
                      onNext={() => index < STAGE_COUNT - 1 && goTo(index + 1)}
                      onPrev={() => index > 0 && goTo(index - 1)}
                      onMoreChange={setHasMore}
                    >
                      <div className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
                        {index === 0 && <HeroStage onNavigate={goTo} />}
                        {index === 1 && <StackStage activeGroup={activeGroup} onGroup={setActiveGroup} />}
                        {index === 2 && (
                          <WorkStage
                            tab={workTab}
                            onTab={setWorkTab}
                            activeProject={activeProject}
                            onProject={setActiveProject}
                          />
                        )}
                        {index === 3 && <ContactStage />}
                      </div>
                    </StageScroller>
                  </div>
                </motion.section>
              </AnimatePresence>
            </motion.div>
            <ScrollHint visible={index === 0 && !hasMore} />
          </main>
        </div>

        <ProgressDots active={index} progress={progress} onNavigate={goTo} />
        <StageCounter active={index} />
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * Ambient layers
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Internal scroll for tall left-side stages. While there is more content, wheel/touch
 * scroll the panel itself (scroll chaining is contained). Once the reader reaches the
 * end, a *new* gesture in the same direction hands off to the next/previous stage —
 * so momentum from reading never skips a stage or leaves content cut off.
 */
function StageScroller({
  children,
  dir,
  onNext,
  onPrev,
  onMoreChange,
}: {
  children: ReactNode;
  dir: number;
  onNext: () => void;
  onPrev: () => void;
  onMoreChange: (more: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [more, setMore] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();
  const gesture = useRef({ lastWheel: 0, edgeDir: 0, lockUntil: 0, touchY: 0, touchTop: false, touchBottom: false });
  const drag = useRef({ startY: 0, startScroll: 0 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const of = max > 4;
    const remaining = max - el.scrollTop;
    setOverflow(of);
    setMore(of && remaining > 8);

    // Soft edge fades instead of a hard cut: grow with distance scrolled / distance remaining.
    const top = of ? Math.min(56, el.scrollTop) : 0;
    const bottom = of ? Math.min(80, Math.max(0, remaining)) : 0;
    const mask =
      top || bottom
        ? `linear-gradient(to bottom, transparent 0, #000 ${top}px, #000 calc(100% - ${bottom}px), transparent 100%)`
        : "none";
    el.style.maskImage = mask;
    el.style.webkitMaskImage = mask;

    // Capsule position on the divider rail.
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (track && thumb && of) {
      const travel = track.clientHeight - thumb.offsetHeight;
      thumb.style.transform = `translateY(${(el.scrollTop / max) * travel}px)`;
      thumb.setAttribute("aria-valuenow", String(Math.round((el.scrollTop / max) * 100)));
    }
  }, []);

  const travelRatio = () => {
    const el = ref.current!;
    const travel = trackRef.current!.clientHeight - thumbRef.current!.offsetHeight;
    return (el.scrollHeight - el.clientHeight) / Math.max(1, travel);
  };

  const onThumbDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startScroll: ref.current!.scrollTop };
    setDragging(true);
  };
  const onThumbMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    ref.current!.scrollTop = drag.current.startScroll + (e.clientY - drag.current.startY) * travelRatio();
  };
  const onThumbUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  };
  const onTrackDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current!;
    const thumb = thumbRef.current!;
    const y = e.clientY - track.getBoundingClientRect().top - thumb.offsetHeight / 2;
    ref.current!.scrollTo({ top: y * travelRatio(), behavior: reduce ? "instant" : "smooth" });
  };
  const onThumbKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = ref.current!;
    const step = { ArrowDown: 60, ArrowUp: -60, PageDown: el.clientHeight * 0.8, PageUp: -el.clientHeight * 0.8 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    el.scrollBy({ top: step, behavior: reduce ? "instant" : "smooth" });
  };

  useEffect(() => {
    onMoreChange(more);
  }, [more, onMoreChange]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gesture.current.edgeDir = dir < 0 ? 1 : -1;
    const mountedAt = performance.now();
    const ro = new ResizeObserver(() => {
      // Keep pinned to the end while the entering stage finishes laying out.
      if (dir < 0 && performance.now() - mountedAt < 1200) el.scrollTo({ top: el.scrollHeight, behavior: "instant" });
      measure();
    });
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    const raf = requestAnimationFrame(() => {
      // Arriving from the stage below: start at the end so reading continues upward naturally.
      if (dir < 0) el.scrollTo({ top: el.scrollHeight, behavior: "instant" });
      measure();
    });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      onMoreChange(false);
    };
  }, [dir, measure, onMoreChange]);

  const edges = () => {
    const el = ref.current!;
    return { top: el.scrollTop <= 2, bottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 2 };
  };

  const handoff = (direction: 1 | -1) => {
    const g = gesture.current;
    const now = performance.now();
    if (now < g.lockUntil) return;
    g.lockUntil = now + 1100;
    g.edgeDir = 0;
    if (direction > 0) onNext();
    else onPrev();
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!overflow || e.deltaY === 0) return;
    const g = gesture.current;
    const now = performance.now();
    const gap = now - g.lastWheel;
    g.lastWheel = now;
    const d = e.deltaY > 0 ? 1 : -1;
    const { top, bottom } = edges();
    const atEdge = (d > 0 && bottom) || (d < 0 && top);
    if (!atEdge) {
      g.edgeDir = 0;
      return;
    }
    // Same-direction gesture that started after a pause at the edge → next/previous stage.
    if (g.edgeDir === d && gap > 180) handoff(d);
    else g.edgeDir = d;
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const { top, bottom } = edges();
    Object.assign(gesture.current, { touchY: e.touches[0].clientY, touchTop: top, touchBottom: bottom });
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!overflow) return;
    const g = gesture.current;
    const dy = g.touchY - e.changedTouches[0].clientY;
    const { top, bottom } = edges();
    if (dy > 60 && g.touchBottom && bottom) handoff(1);
    else if (dy < -60 && g.touchTop && top) handoff(-1);
  };

  const scrollMore = () => {
    const el = ref.current;
    if (el) el.scrollBy({ top: el.clientHeight * 0.7, behavior: reduce ? "instant" : "smooth" });
  };

  useEffect(() => {
    // Place the capsule once the rail has rendered.
    if (!overflow) return;
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [overflow, measure]);

  return (
    <>
      <div className="relative">
        <div
          ref={ref}
          id="stage-scroll"
          onScroll={measure}
          onWheel={onWheel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className={`no-scrollbar max-h-[82vh] overflow-y-auto pr-2 ${overflow ? "overscroll-contain" : ""}`}
        >
          {children}
          {overflow && <div aria-hidden className="h-10" />}
        </div>

        <AnimatePresence>
          {more && (
            <motion.button
              key="more"
              type="button"
              onClick={scrollMore}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="glass absolute -bottom-12 left-1/2 flex min-h-9 -translate-x-1/2 cursor-pointer items-center gap-2 rounded-full px-3.5 font-mono text-[11px] tracking-wider whitespace-nowrap text-fg-soft uppercase transition-colors duration-200 hover:border-primary/40 hover:text-fg"
            >
              <Mouse className="h-3.5 w-3.5 text-primary" aria-hidden />
              Scroll for more
              <motion.span
                aria-hidden
                animate={reduce ? undefined : { y: [0, 3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="h-3.5 w-3.5 text-secondary" />
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll rail: a small outlined capsule riding on the thin divider between the two panels.
          Positioned against the stage section (this fragment has no positioned wrapper). */}
      <AnimatePresence>
        {overflow && (
          <motion.div
            key="rail"
            ref={trackRef}
            onPointerDown={onTrackDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[12%] right-1.5 bottom-[12%] z-10 w-5 cursor-pointer lg:right-0 lg:translate-x-1/2"
          >
            {/* Track line only on small screens — on desktop the panel divider is the track. */}
            <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:hidden" />
            <div
              ref={thumbRef}
              role="scrollbar"
              aria-controls="stage-scroll"
              aria-orientation="vertical"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
              aria-label="Scroll section content"
              tabIndex={0}
              onPointerDown={onThumbDown}
              onPointerMove={onThumbMove}
              onPointerUp={onThumbUp}
              onPointerCancel={onThumbUp}
              onKeyDown={onThumbKey}
              className={`group absolute top-0 left-0 flex h-11 w-5 touch-none items-center justify-center outline-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
              <span
                aria-hidden
                className={`block h-full w-2.5 rounded-full border transition-[border-color,box-shadow] duration-200 group-hover:border-primary group-hover:shadow-[0_0_12px_2px_rgb(34_211_238/0.45)] group-focus-visible:border-primary group-focus-visible:shadow-[0_0_12px_2px_rgb(34_211_238/0.45)] ${
                  dragging ? "border-primary shadow-[0_0_14px_3px_rgb(167_139_250/0.5)]" : "border-primary/70"
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const ORB_PALETTES = [
  ["#22d3ee", "#a78bfa", "#3b82f6"],
  ["#a78bfa", "#22d3ee", "#6366f1"],
  ["#3b82f6", "#a78bfa", "#22d3ee"],
  ["#22d3ee", "#8b5cf6", "#a78bfa"],
];

function AmbientBackdrop({ progress, stage }: { progress: MotionValue<number>; stage: number }) {
  const reduce = useReducedMotion();
  const p = useSpring(progress, { stiffness: 60, damping: 20 });
  const k = reduce ? 0 : 1;

  const nearY = useTransform(p, [0, 1], [0, -320 * k]);
  const nearX = useTransform(p, [0, 1], [0, 180 * k]);
  const nearScale = useTransform(p, [0, 0.5, 1], [1, 1 + 0.25 * k, 1]);
  const midY = useTransform(p, [0, 1], [0, 200 * k]);
  const farY = useTransform(p, [0, 1], [0, -90 * k]);
  const farScale = useTransform(p, [0, 1], [1, 1 + 0.4 * k]);
  const gridShift = useTransform(p, [0, 1], [0, 480 * k]);
  const gridPos = useMotionTemplate`0px ${gridShift}px`;

  const [c1, c2, c3] = ORB_PALETTES[stage];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-[30%] left-[25%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ y: farY, scale: farScale }}
        animate={{ backgroundColor: c3 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] h-[22rem] w-[22rem] rounded-full opacity-20 blur-[100px]"
        style={{ y: midY }}
        animate={{ backgroundColor: c2 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute top-[-8%] left-[-8%] h-[22rem] w-[22rem] rounded-full opacity-30 blur-[90px]"
        style={{ y: nearY, x: nearX, scale: nearScale }}
        animate={{ backgroundColor: c1 }}
        transition={{ duration: 1.2 }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[50%] [perspective:600px] lg:right-[41.667%]">
        <motion.div
          className="absolute inset-x-[-50%] bottom-[-20%] h-[160%] origin-bottom [transform:rotateX(62deg)] opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(34 211 238 / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(34 211 238 / 0.35) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            backgroundPosition: gridPos,
            maskImage: "linear-gradient(to top, black 10%, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 75%)",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-bg)_100%)]" />
    </div>
  );
}

const NEBULAE = [
  { c: "rgb(56 189 248 / 0.22)", cls: "top-[8%] left-[10%] h-[60%] w-[70%]", x: [0, 60, -30, 0], y: [0, 40, 70, 0], d: 26 },
  { c: "rgb(139 92 246 / 0.24)", cls: "top-[35%] right-[-10%] h-[65%] w-[65%]", x: [0, -70, -20, 0], y: [0, -50, 30, 0], d: 32 },
  { c: "rgb(99 102 241 / 0.18)", cls: "bottom-[-15%] left-[-5%] h-[55%] w-[60%]", x: [0, 50, 90, 0], y: [0, -30, -60, 0], d: 38 },
  { c: "rgb(34 211 238 / 0.12)", cls: "top-[-10%] right-[5%] h-[45%] w-[50%]", x: [0, -40, 20, 0], y: [0, 60, 20, 0], d: 30 },
];

/** Soft, slow-drifting blue/violet nebula smoke behind the canvas. */
function NebulaSmoke() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {NEBULAE.map((n, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-[50%] blur-[70px] ${n.cls}`}
          style={{ background: `radial-gradient(closest-side, ${n.c}, transparent)` }}
          animate={reduce ? undefined : { x: n.x, y: n.y, scale: [1, 1.15, 0.95, 1], rotate: [0, 25, -15, 0] }}
          transition={{ duration: n.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function SceneCaption({ scene }: { scene: Scene }) {
  const c =
    scene.kind === "flow"
      ? { k: `flow-${scene.project}`, title: `flow.${FLOWS[scene.project].title}`, text: PROJECTS[scene.project].name }
      : scene.kind === "globe"
        ? SCENE_CAPTIONS[scene.variant]
        : SCENE_CAPTIONS[scene.kind];
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center px-4 lg:flex">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={c.k}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.35 }}
          className="glass flex max-w-full min-w-0 items-center gap-3 rounded-full px-4 py-2 font-mono text-[11px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgb(34_211_238/0.9)]" />
          <span className="text-primary">{c.title}</span>
          <span className="truncate text-muted">{c.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * Navigation — floating pill + side progress dots + stage counter
 * ════════════════════════════════════════════════════════════════════════════ */

function ProgressDots({
  active,
  progress,
  onNavigate,
}: {
  active: number;
  progress: MotionValue<number>;
  onNavigate: (i: number) => void;
}) {
  const fill = useSpring(progress, { stiffness: 120, damping: 24 });

  return (
    <>
      <nav aria-label="Stage progress" className="absolute top-1/2 right-3 z-30 hidden -translate-y-1/2 sm:block lg:right-5">
        <div className="relative flex flex-col items-center gap-1">
          <div className="absolute top-5 bottom-5 w-px bg-line" />
          <motion.div className="absolute top-5 bottom-5 w-px origin-top bg-gradient-to-b from-primary to-secondary" style={{ scaleY: fill }} />
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onNavigate(i)}
              aria-label={`Go to ${s.title}`}
              aria-current={active === i ? "step" : undefined}
              className="group relative flex h-10 w-10 cursor-pointer items-center justify-center"
            >
              <motion.span
                className="block w-2 rounded-full"
                animate={{
                  height: active === i ? 22 : 8,
                  backgroundColor: active === i ? "#22d3ee" : i < active ? "#a78bfa" : "#334155",
                  boxShadow: active === i ? "0 0 16px rgba(34,211,238,0.7)" : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              />
              <span className="glass pointer-events-none absolute right-11 rounded-md px-2 py-1 font-mono text-[11px] whitespace-nowrap text-fg-soft opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </nav>
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 z-40 h-0.5 origin-left bg-gradient-to-r from-primary to-secondary sm:hidden"
        style={{ scaleX: fill }}
      />
    </>
  );
}

function StageCounter({ active }: { active: number }) {
  return (
    <div className="pointer-events-none absolute top-5 left-4 z-30 hidden items-center gap-3 font-mono text-xs text-muted sm:left-8 sm:flex">
      <span className="text-fg">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={active}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            className="inline-block"
          >
            {String(active + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="h-px w-8 bg-line-strong" />
      <span>{String(STAGE_COUNT).padStart(2, "0")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={active}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 6 }}
          transition={{ duration: 0.25 }}
          className="ml-2 tracking-widest uppercase"
        >
          {STAGES[active].title}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function ScrollHint({ visible }: { visible: boolean }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[11px] tracking-widest text-muted uppercase sm:flex"
        >
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mouse className="h-5 w-5" />
          </motion.span>
          Scroll
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * Shared UI
 * ════════════════════════════════════════════════════════════════════════════ */

function TiltCard({
  children,
  className = "",
  intensity = 8,
  active = false,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), TILT_SPRING);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), TILT_SPRING);
  const gx = useTransform(mx, (v) => v * 100);
  const gy = useTransform(my, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgb(34 211 238 / 0.12), transparent 45%)`;

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div variants={itemVariants} className={`[perspective:1000px] ${className}`}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        whileHover={reduce ? undefined : { scale: 1.012 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{ rotateX, rotateY }}
        className={`glass group relative h-full overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-300 hover:border-primary/30 ${
          active ? "border-secondary/40 shadow-[0_0_40px_-12px_rgb(167_139_250/0.6)]" : ""
        }`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
        <div className="relative h-full">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function Tag({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5 ${
        strong ? "border-primary/30 bg-primary/10 text-primary" : "border-line bg-white/[0.03] text-fg-soft"
      }`}
    >
      {children}
    </span>
  );
}

function Eyebrow({ index, children }: { index: number; children: ReactNode }) {
  return (
    <motion.p variants={itemVariants} className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-primary uppercase">
      <span className="text-muted">{String(index).padStart(2, "0")}</span>
      <span className="h-px w-8 bg-primary/50" />
      {children}
    </motion.p>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.68 0-1.25.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * Stage 1 — Hero Intro
 * ════════════════════════════════════════════════════════════════════════════ */

function HeroStage({ onNavigate }: { onNavigate: (i: number) => void }) {
  return (
    <div className="w-full">
      <motion.div
        variants={itemVariants}
        className="glass mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] text-fg-soft sm:text-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        {PROFILE.availability} · Kolkata, India
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="font-mono text-[2.6rem] leading-[1.02] font-bold tracking-tight sm:text-6xl xl:text-7xl"
      >
        {PROFILE.firstName}{" "}
        <br className="hidden sm:block lg:hidden" />
        <span className="glow-text bg-gradient-to-r from-primary via-sky-300 to-secondary bg-clip-text text-transparent">
          {PROFILE.lastName}
        </span>
      </motion.h1>

      <motion.p variants={itemVariants} className="mt-4 font-mono text-sm text-primary sm:text-base">
        {PROFILE.title}
        <span className="text-muted">{" // "}</span>
        <span className="text-fg-soft">{PROFILE.specialty}</span>
      </motion.p>

      <motion.ul variants={itemVariants} className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted">
        {PROFILE.years.map((y) => (
          <li key={y.label}>
            <span className="font-semibold text-fg">{y.value}</span> {y.label}
          </li>
        ))}
      </motion.ul>

      <motion.p variants={itemVariants} className="mt-4 text-[15px] leading-relaxed text-fg-soft">
        {PROFILE.bio}
      </motion.p>

      <motion.ol variants={itemVariants} aria-label="Career path" className="mt-4 flex flex-wrap items-center gap-1.5">
        {PROFILE.path.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            <Tag strong={i === PROFILE.path.length - 1}>{step}</Tag>
            {i < PROFILE.path.length - 1 && <ArrowRight aria-hidden className="h-3 w-3 text-muted" />}
          </li>
        ))}
      </motion.ol>

      <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onNavigate(2)}
          className="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-primary to-sky-400 px-5 font-mono text-sm font-semibold text-bg shadow-[0_0_30px_-6px_rgb(34_211_238/0.7)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          View my work
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate(3)}
          className="glass inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-5 font-mono text-sm text-fg transition-colors duration-200 hover:border-primary/40"
        >
          <Mail className="h-4 w-4" />
          Get in touch
        </button>
      </motion.div>

      <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <TiltCard key={s.label} intensity={12}>
            <div className="p-3.5">
              <p className={`font-mono text-xl font-bold sm:text-2xl ${i % 2 === 0 ? "text-primary" : "text-secondary"}`}>{s.value}</p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-fg-soft">{s.label}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * Stage 2 — Full-Stack Tech Stack
 * ════════════════════════════════════════════════════════════════════════════ */

function StackStage({ activeGroup, onGroup }: { activeGroup: number; onGroup: (g: number) => void }) {
  const bind = (g: number) => ({
    onMouseEnter: () => onGroup(g),
    onMouseLeave: () => onGroup(-1),
    onFocus: () => onGroup(g),
    onBlur: () => onGroup(-1),
    onClick: () => onGroup(g),
    tabIndex: 0,
  });

  return (
    <div className="w-full">
      <Eyebrow index={2}>Full-Stack Tech Stack</Eyebrow>
      <motion.h2 variants={itemVariants} className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
        Frontend depth, <span className="text-secondary">full-stack reach.</span>
      </motion.h2>
      <motion.ul variants={itemVariants} className="mt-4 mb-5 flex flex-wrap gap-2">
        {STRENGTHS.map((s) => (
          <li key={s.title} title={s.text}>
            <Tag>{s.title}</Tag>
          </li>
        ))}
      </motion.ul>

      <div className="grid gap-3 sm:grid-cols-2">
        <div {...bind(4)} className="rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary sm:col-span-2">
          <TiltCard intensity={5} active={activeGroup === 4}>
            <div className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" aria-hidden />
                <h3 className="font-mono text-sm font-semibold">Core Expertise</h3>
              </div>
              <ul className="grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
                {EXPERTISE.map((s, i) => (
                  <li key={s.name}>
                    <div className="mb-1 flex items-baseline justify-between gap-2 text-[12.5px]">
                      <span className="text-fg">{s.name}</span>
                      <span className="font-mono text-[10.5px] text-muted">{s.level}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: s.pct / 100 }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </div>

        {STACK.map((card, gi) => (
          <div
            key={card.title}
            {...bind(gi)}
            className={`rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary ${card.className ?? ""}`}
          >
            <TiltCard intensity={6} active={activeGroup === gi} className="h-full">
              <div className="p-4">
                <div className="mb-2.5 flex items-center gap-2">
                  <card.icon className={`h-4 w-4 ${activeGroup === gi ? "text-secondary" : "text-primary"}`} aria-hidden />
                  <h3 className="font-mono text-sm font-semibold">{card.title}</h3>
                  <span className="ml-auto font-mono text-[10px] text-muted">orbit {gi + 1}</span>
                </div>
                <div className={card.groups.length > 1 ? "grid gap-3 sm:grid-cols-2" : ""}>
                  {card.groups.map((g, i) => (
                    <div key={g.label} className={card.groups.length === 3 && i === 2 ? "sm:col-span-2" : ""}>
                      <p className="mb-1.5 font-mono text-[10px] tracking-[0.18em] text-secondary uppercase">{g.label}</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {g.items.map((item) => (
                          <li key={item}>
                            <Tag>{item}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * Stage 3 — Featured Projects (+ Experience tab)
 * ════════════════════════════════════════════════════════════════════════════ */

const WORK_TABS = [
  { id: "projects", label: "Projects", icon: Workflow },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
] as const;

function WorkStage({
  tab,
  onTab,
  activeProject,
  onProject,
}: {
  tab: WorkTab;
  onTab: (t: WorkTab) => void;
  activeProject: number;
  onProject: (i: number) => void;
}) {
  return (
    <div className="w-full">
      <Eyebrow index={3}>Featured Projects</Eyebrow>
      <motion.div variants={itemVariants} className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          Complex UI, <span className="text-primary">shipped at scale.</span>
        </h2>
        <div role="tablist" aria-label="Work view" className="glass inline-flex self-start rounded-full p-1">
          {WORK_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => onTab(t.id)}
              className="relative flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-4 font-mono text-xs"
            >
              {tab === t.id && (
                <motion.span
                  layoutId="work-tab"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <t.icon className={`relative h-3.5 w-3.5 ${tab === t.id ? "text-primary" : "text-muted"}`} aria-hidden />
              <span className={`relative ${tab === t.id ? "text-fg" : "text-muted"}`}>{t.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {tab === "projects" ? (
          <motion.ul
            key="projects"
            id="panel-projects"
            role="tabpanel"
            aria-labelledby="tab-projects"
            initial="enter"
            animate="center"
            exit="exit"
            variants={{ center: { transition: { staggerChildren: 0.06 } } }}
            className="grid gap-2.5"
          >
            {PROJECTS.map((p, i) => (
              <ProjectRow key={p.name} project={p} index={i} active={i === activeProject} onActivate={() => onProject(i)} />
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key="experience"
            id="panel-experience"
            role="tabpanel"
            aria-labelledby="tab-experience"
            initial="enter"
            animate="center"
            exit="exit"
            variants={{ center: { transition: { staggerChildren: 0.06 } } }}
            className="grid gap-3"
          >
            {EXPERIENCE.map((r) => (
              <RoleCard key={r.company} role={r} />
            ))}
            <TiltCard intensity={4}>
              <div className="p-5">
                <h3 className="mb-4 font-mono text-sm font-semibold">Earlier experience</h3>
                <ol className="relative space-y-4 border-l border-line pl-4">
                  {EARLIER_ROLES.map((r) => (
                    <li key={r.company} className="relative">
                      <span className="absolute top-1.5 -left-[21px] h-2.5 w-2.5 rounded-full border border-secondary bg-bg" />
                      <p className="font-mono text-[11px] text-secondary">{r.period}</p>
                      <p className="mt-0.5 text-sm font-semibold text-fg">
                        {r.role} <span className="font-normal text-muted">· {r.company}</span>
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-fg-soft">{r.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </TiltCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectRow({
  project: p,
  index,
  active,
  onActivate,
}: {
  project: Project;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.li variants={itemVariants} onMouseEnter={onActivate}>
      <TiltCard intensity={active ? 3 : 7} active={active}>
        <article>
          <h3>
            <button
              type="button"
              onClick={onActivate}
              onFocus={onActivate}
              aria-expanded={active}
              aria-controls={`project-${index}`}
              className="flex w-full cursor-pointer items-center gap-3 p-4 text-left"
            >
              <span className={`font-mono text-xs ${active ? "text-secondary" : "text-muted"}`}>{String(index + 1).padStart(2, "0")}</span>
              <span className={`font-mono text-[15px] font-semibold ${active ? "text-fg" : "text-fg-soft"}`}>{p.name}</span>
              <span
                className={`ml-auto hidden shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase sm:inline ${
                  active ? "bg-secondary/15 text-secondary" : "bg-primary/10 text-primary"
                }`}
              >
                {p.badge}
              </span>
              <ChevronDown
                aria-hidden
                className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${active ? "rotate-180" : ""}`}
              />
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {active && (
              <motion.div
                id={`project-${index}`}
                initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4">
                  <p className="text-[13px] leading-relaxed text-fg-soft">{p.summary}</p>
                  {p.features && (
                    <ul className="mt-3 grid gap-2">
                      {p.features.map((f) => (
                        <li key={f.title} className="rounded-xl border-l-2 border-primary/60 bg-white/[0.03] px-3 py-2">
                          <p className="text-[13px] font-semibold text-fg">{f.title}</p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-fg-soft">{f.text}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                    {p.url && (
                      <a
                        href={p.url.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex min-h-9 items-center gap-1 rounded-full px-2 font-mono text-[11px] text-primary transition-colors duration-200 hover:text-fg"
                      >
                        {p.url.label}
                        <ArrowUpRight className="h-3 w-3" aria-hidden />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      </TiltCard>
    </motion.li>
  );
}

function RoleCard({ role: r }: { role: Role }) {
  return (
    <TiltCard intensity={4}>
      <article className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-mono text-base font-semibold text-fg">{r.role}</h3>
            <p className="text-[13px] text-muted">
              <span className="text-fg-soft">{r.company}</span> · {r.meta}
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[11px] text-primary">{r.period}</span>
        </div>
        {r.note && <p className="mt-1.5 font-mono text-[11px] text-secondary">{r.note}</p>}
        <ul className="mt-3 space-y-1.5">
          {r.points.map((pt) => (
            <li key={pt} className="flex gap-2 text-[13px] leading-relaxed text-fg-soft">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/80" />
              {pt}
            </li>
          ))}
        </ul>
        {r.tags && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {r.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        )}
      </article>
    </TiltCard>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * Stage 4 — Contact
 * ════════════════════════════════════════════════════════════════════════════ */

const CONTACT_LINKS = [
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: LinkedinIcon, label: "LinkedIn", value: CONTACT.linkedinLabel, href: CONTACT.linkedin },
  { icon: GithubIcon, label: "GitHub", value: CONTACT.githubLabel, href: CONTACT.github },
  { icon: Phone, label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
];

function ContactStage() {
  return (
    <div className="w-full">
      <Eyebrow index={4}>Contact</Eyebrow>
      <motion.h2 variants={itemVariants} className="font-mono text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl xl:text-6xl">
        Let&apos;s build something{" "}
        <span className="glow-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">fast.</span>
      </motion.h2>
      <motion.p variants={itemVariants} className="mt-4 leading-relaxed text-fg-soft">
        Looking for a Senior Frontend Engineer who can own complex React and Next.js products end to end? I&apos;m available to join
        immediately.
      </motion.p>

      <motion.ul variants={itemVariants} className="mt-5 space-y-2 text-sm text-fg-soft">
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_10px_rgb(34_197_94/0.8)]" />
          {PROFILE.availability}
        </li>
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
          {PROFILE.location}
        </li>
        <li className="flex items-start gap-2">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
          {PROFILE.relocation}
        </li>
      </motion.ul>

      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
        {CONTACT_LINKS.map((c) => {
          const external = c.href.startsWith("http");
          return (
            <TiltCard key={c.label} intensity={10}>
              <a
                href={c.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full min-h-[76px] items-center gap-3 p-3.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-primary">
                  <c.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] tracking-wider text-muted uppercase">{c.label}</span>
                  <span className="block text-[13px] break-all text-fg">{c.value}</span>
                </span>
                <ArrowUpRight
                  className="ml-auto h-4 w-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-primary"
                  aria-hidden
                />
              </a>
            </TiltCard>
          );
        })}

        <TiltCard className="sm:col-span-2 lg:col-span-1 2xl:col-span-2" intensity={4}>
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-secondary" aria-hidden />
              <h3 className="font-mono text-sm font-semibold">Certifications & Education</h3>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {CREDENTIALS.map((c) => (
                <li key={c.title} className="flex gap-2.5">
                  <c.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
                  <div>
                    <p className="text-[13px] leading-snug text-fg">{c.title}</p>
                    <p className="font-mono text-[11px] text-muted">{c.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TiltCard>
      </div>

      <motion.a
        variants={itemVariants}
        href={`mailto:${CONTACT.email}`}
        className="group mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 font-mono text-sm font-semibold text-bg shadow-[0_0_40px_-8px_rgb(167_139_250/0.8)] transition-transform duration-200 hover:-translate-y-0.5"
      >
        <Mail className="h-4 w-4" aria-hidden />
        Say hello
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </motion.a>

      <motion.p variants={itemVariants} className="mt-5 font-mono text-[11px] text-muted">
        © 2026 {PROFILE.name} · Built with Next.js, TypeScript, Tailwind CSS, Framer Motion & Canvas
      </motion.p>
    </div>
  );
}
