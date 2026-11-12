import Link from "next/link";
import type { Project } from "@/content/projects";
import { FlowCard } from "./flow";
import { Shot } from "./shot";
import { Chips, ExternalLink } from "./ui";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href = `/projects/${project.slug}/`;
  const flip = index % 2 === 1;
  const lead = project.flagship === true;

  return (
    <article className="grid items-start gap-8 border-t border-line py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-12 lg:py-16">
      <div
        className={`${lead ? "lg:col-span-7" : "lg:col-span-6"} ${flip ? "lg:order-2" : ""}`}
      >
        {project.cover ? (
          <Link
            href={href}
            aria-label={`${project.name}: read the case study`}
            className="block transition-transform duration-300 hover:-translate-y-1"
          >
            <Shot
              shot={project.cover}
              sizes={
                lead
                  ? "(min-width: 1024px) 640px, 100vw"
                  : "(min-width: 1024px) 540px, 100vw"
              }
              eager={index === 0}
              crop
            />
          </Link>
        ) : project.cardFlow ? (
          <FlowCard
            steps={project.cardFlow}
            caption="The pipeline in six steps. The model scores; a person approves and presses send."
          />
        ) : null}
      </div>

      <div
        className={`${lead ? "lg:col-span-5" : "lg:col-span-6"} ${flip ? "lg:order-1" : ""}`}
      >
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span className="text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          · {project.kind}
        </p>
        <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
          <Link href={href} className="transition-colors hover:text-accent">
            {project.name}
          </Link>
        </h3>

        <dl className="mt-6 space-y-4 text-[15px] leading-relaxed">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Problem
            </dt>
            <dd className="mt-1 text-ink">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              What I built
            </dt>
            <dd className="mt-1 text-ink">{project.built}</dd>
          </div>
        </dl>

        {lead ? null : (
          <ul className="mt-6 space-y-1.5 text-[15px] text-muted">
            {project.facts.map((fact) => (
              <li key={fact} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.7em] h-px w-4 shrink-0 bg-accent"
                />
                {fact}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <Chips items={project.stack} label={`${project.name} tech stack`} />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-medium text-on-accent transition-opacity hover:opacity-90"
          >
            Case study
            <span aria-hidden="true">→</span>
            <span className="sr-only">: {project.name}</span>
          </Link>
          <ExternalLink href={project.repoUrl}>GitHub</ExternalLink>
          {project.liveUrl ? (
            <ExternalLink href={project.liveUrl}>Live demo</ExternalLink>
          ) : null}
        </div>
      </div>

      {lead ? (
        <ul
          aria-label={`${project.name}: key facts`}
          className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 lg:order-3 lg:col-span-12"
        >
          {project.facts.map((fact) => (
            <li
              key={fact}
              className="border-l-2 border-accent bg-surface px-5 py-4 text-[15px] font-medium leading-snug text-ink"
            >
              {fact}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
