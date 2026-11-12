import type { Actor, FlowStep } from "@/content/projects";
import { ActorTag } from "./ui";

/** Full pipeline for a case-study page: a numbered vertical timeline. */
export function Flow({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="relative ml-3 border-l border-line">
      {steps.map((step, index) => (
        <li key={step.title} className="relative pb-7 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-bg font-mono text-[11px] text-muted"
          >
            {index + 1}
          </span>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-medium text-ink">{step.title}</h3>
            <ActorTag actor={step.actor} />
          </div>
          <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-muted">
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Compact pipeline used on a project card when there is no screenshot. */
export function FlowCard({
  steps,
  caption,
}: {
  steps: { label: string; actor: Actor }[];
  caption: string;
}) {
  return (
    <figure className="rounded-lg border border-line bg-surface p-4 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-16px_rgb(0_0_0/0.18)] sm:p-7">
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="flex min-h-24 flex-col justify-between gap-3 rounded-md border border-line bg-bg p-3"
          >
            <span className="font-mono text-[11px] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block text-[15px] font-medium leading-snug text-ink">
                {step.label}
              </span>
              <ActorTag actor={step.actor} />
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
