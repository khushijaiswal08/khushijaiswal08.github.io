import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Flow } from "@/components/flow";
import { Shot } from "@/components/shot";
import { Chips, ExternalLink, Eyebrow } from "@/components/ui";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `/projects/${project.slug}/`;
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.tagline,
      url,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
    >
      <h2
        id={id}
        className="font-display text-2xl leading-tight sm:text-3xl lg:col-span-4"
      >
        {title}
      </h2>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <header className="pb-14 pt-10 sm:pb-20 sm:pt-14">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>
        <div className="mt-10">
          <Eyebrow>{project.kind}</Eyebrow>
        </div>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          {project.name}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted sm:text-2xl sm:leading-relaxed">
          {project.tagline}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <ExternalLink href={project.repoUrl}>Source on GitHub</ExternalLink>
          {project.liveUrl ? (
            <ExternalLink href={project.liveUrl}>Live demo</ExternalLink>
          ) : null}
        </div>
        <p className="mt-4 max-w-3xl text-sm text-muted">{project.demoNote}</p>
        <div className="mt-8">
          <Chips items={project.stack} label="Main technologies" />
        </div>
      </header>

      <Block id="problem" title="The problem">
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
          {project.problemLong.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Block>

      <Block id="what-it-does" title="What it does">
        <ul className="max-w-2xl space-y-4 leading-relaxed">
          {project.whatItDoes.map((item) => (
            <li key={item} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-[0.75em] h-px w-4 shrink-0 bg-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="how-it-works" title="How it works">
        <p className="mb-10 max-w-2xl leading-relaxed">
          {project.howItWorksIntro}
        </p>
        <Flow steps={project.flow} />
      </Block>

      <Block id="highlights" title="Engineering highlights">
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {project.highlights.map((highlight) => (
            <li key={highlight.title} className="border-t border-line pt-4">
              <h3 className="font-medium text-ink">{highlight.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {highlight.body}
              </p>
            </li>
          ))}
        </ul>
      </Block>

      {project.screenshots.length > 0 ? (
        <Block id="screenshots" title="Screenshots">
          <div className="space-y-10">
            {project.screenshots.map((shot) => (
              <figure key={shot.src}>
                <Shot shot={shot} sizes="(min-width: 1024px) 740px, 100vw" />
                <figcaption className="mt-3 text-sm text-muted">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Block>
      ) : null}

      <Block id="stack" title="Tech stack">
        <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {project.stackGroups.map((group) => (
            <div key={group.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {group.label}
              </dt>
              <dd className="mt-3">
                <Chips items={group.items} label={group.label} />
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      {project.improveNext ? (
        <Block id="improve" title="Limits, and what I'd improve next">
          <ul className="max-w-2xl space-y-3 leading-relaxed text-muted">
            {project.improveNext.map((item) => (
              <li key={item} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-[0.75em] h-px w-4 shrink-0 bg-line"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {project.note ? (
        <Block id="note" title="Context">
          <p className="max-w-2xl leading-relaxed">{project.note}</p>
        </Block>
      ) : null}

      <nav
        aria-label="More projects"
        className="flex flex-col gap-6 border-t border-line py-12 sm:flex-row sm:items-end sm:justify-between"
      >
        <Link
          href="/#projects"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>
        <Link href={`/projects/${next.slug}/`} className="group sm:text-right">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Next project
          </span>
          <span className="mt-1 block font-display text-3xl transition-colors group-hover:text-accent">
            {next.name} <span aria-hidden="true">→</span>
          </span>
        </Link>
      </nav>
    </article>
  );
}
