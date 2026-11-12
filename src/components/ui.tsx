import type { ReactNode } from "react";
import type { Actor } from "@/content/projects";

/** Small monospace label used above headings. */
export function Eyebrow({
  children,
  className = "tracking-[0.18em]",
}: {
  children: ReactNode;
  /** Letter spacing; override for long labels that must fit on phones. */
  className?: string;
}) {
  return (
    <p className={`font-mono text-xs uppercase text-accent ${className}`}>
      {children}
    </p>
  );
}

export function Chips({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 3h7v7M13 3 4 12" />
      </svg>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

const ACTOR_LABEL: Record<Actor, string> = {
  auto: "Automated",
  ai: "LLM",
  human: "Person",
};

const ACTOR_CLASS: Record<Actor, string> = {
  auto: "text-tag-auto",
  ai: "text-tag-ai",
  human: "text-tag-human",
};

const ACTOR_MARK: Record<Actor, string> = {
  auto: "",
  ai: "rotate-45",
  human: "rounded-full",
};

/** Who performs a pipeline step: code, the model, or a person. */
export function ActorTag({ actor }: { actor: Actor }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider ${ACTOR_CLASS[actor]}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 bg-current ${ACTOR_MARK[actor]}`}
      />
      {ACTOR_LABEL[actor]}
    </span>
  );
}
