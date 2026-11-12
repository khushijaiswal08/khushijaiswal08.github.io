/**
 * Everything about Khushi that is not a project. Edit the text here; the
 * components read from this file and never hard-code copy.
 */

export const profile = {
  name: "Khushi Jaiswal",
  /** Short line above the name in the hero; keep it to one line on phones. */
  role: "AI & automation · IT Trainee (SDE-1)",
  pitch:
    "I build automation tools and LLM applications with guardrails: deterministic code does the deciding, the model adds what rules cannot, and tests check both.",
  intro:
    "Final-year AI & Data Science student and IT trainee in Jaipur. At work I build internal tools that replace manual, spreadsheet-based processes.",
  facts: [
    "BTech, Artificial Intelligence & Data Science",
    "Graduating June 2027",
    "Jaipur, India",
  ],
  interests: [
    "Workflow automation",
    "LLM applications with guardrails",
    "Data pipelines",
  ],
  email: "khushijaiswal0005@gmail.com",
  github: "https://github.com/khushijaiswal08",
  linkedin: "https://www.linkedin.com/in/khushijaiswal08",
  location: "Jaipur, India",
} as const;

export type TimelineEntry = {
  kind: "Experience" | "Education";
  title: string;
  place: string;
  /** Short status shown on the right, e.g. "Current role". */
  when: string;
  summary?: string;
};

export const timeline: TimelineEntry[] = [
  {
    kind: "Experience",
    title: "IT Trainee (SDE-1)",
    place: "An e-commerce company in Jaipur",
    when: "Current role",
    summary:
      "Builds internal tools that replace manual, spreadsheet-based work, in a team with no senior engineers.",
  },
  {
    kind: "Education",
    title: "BTech, Artificial Intelligence & Data Science",
    place: "JECRC College, Jaipur",
    when: "Graduating June 2027",
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "TypeScript", "SQL"] },
  {
    label: "AI and LLMs",
    items: [
      "Claude API",
      "Gemini API",
      "Prompt design",
      "Structured outputs",
      "LLM guardrails",
    ],
  },
  {
    label: "Backend and web",
    items: ["FastAPI", "Next.js", "React", "Prisma", "PostgreSQL"],
  },
  {
    label: "Testing, delivery and tools",
    items: [
      "pytest",
      "Git",
      "GitHub Actions",
      "Docker",
      "Vercel",
      "Netlify",
      "Claude Code",
    ],
  },
];

export type Principle = { title: string; body: string };

/** "How I work": each point is grounded in the project repositories. */
export const principles: Principle[] = [
  {
    title: "Deterministic first, LLM second",
    body: "Anything that can be computed with rules is computed with rules, so it costs nothing and gives the same answer every time. In the AI Resume Analyzer the score never depends on the model, and it works with no API key at all.",
  },
  {
    title: "Guardrails around every model call",
    body: "Personal details are redacted before a prompt is built, untrusted text is treated as data, output is validated against a schema, and a failed call degrades gracefully. In the Creator Growth Engine the model only recommends: a person approves every creator.",
  },
  {
    title: "Tests and evals in CI",
    body: "Guardrails are covered by offline tests that run against a fake model. An evaluation script measures skill-extraction accuracy, and GitHub Actions fails the build if it drops below the threshold.",
  },
  {
    title: "Honest docs",
    body: "Each README says what is built, what is not, and where the limits are: a heuristic is called a heuristic, demo data is labelled as demo data.",
  },
];

/** Said once, plainly (see SPEC.md: honesty about AI). */
export const aiNote =
  "I build with AI-assisted development (Claude Code), working from a written spec, and I verify the result with tests, reviews and quality gates before it counts as done.";
