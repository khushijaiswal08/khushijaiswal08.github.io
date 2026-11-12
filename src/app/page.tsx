import type { ReactNode } from "react";
import { ProjectCard } from "@/components/project-card";
import { Chips, ExternalLink, Eyebrow } from "@/components/ui";
import {
  aiNote,
  principles,
  profile,
  skills,
  timeline,
} from "@/content/profile";
import { projects } from "@/content/projects";
import { SITE_URL } from "@/site";

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-line"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={`${id}-title`}
          className="mt-3 font-display text-4xl leading-tight sm:text-5xl"
        >
          {title}
        </h2>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaipur",
    addressCountry: "IN",
  },
  sameAs: [profile.github, profile.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Hero */}
      <section aria-labelledby="hero-title">
        <div className="mx-auto grid w-full max-w-6xl gap-x-14 px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_19rem]">
          {/* Portrait: small circle above the text on phones, large rounded square beside it on desktop */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/me/khushi-640.webp"
            srcSet="/me/khushi-320.webp 320w, /me/khushi-640.webp 640w"
            sizes="(min-width: 1024px) 304px, 112px"
            width={640}
            height={640}
            alt="Portrait of Khushi Jaiswal, smiling, in a light blue shirt"
            className="mb-7 size-28 rounded-full border border-line object-cover sm:size-32 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:size-auto lg:w-full lg:rounded-2xl"
          />
          <div className="lg:col-start-1 lg:row-start-1">
            <div>
              <Eyebrow className="tracking-[0.08em] sm:tracking-[0.18em]">
                {profile.role}
              </Eyebrow>
            </div>
            <h1
              id="hero-title"
              className="mt-5 font-display text-[3.25rem] leading-[1.02] tracking-tight sm:text-7xl lg:text-7xl xl:text-8xl"
            >
              {profile.name}
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">
              {profile.pitch}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-on-accent transition-opacity hover:opacity-90"
              >
                View projects
                <span aria-hidden="true">↓</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-ink px-5 py-3 font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <ul
              aria-label="Quick facts"
              className="mt-12 flex flex-col gap-x-8 gap-y-2 border-t border-line pt-6 font-mono text-[13px] text-muted sm:flex-row sm:flex-wrap"
            >
              {profile.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section id="projects" eyebrow="Selected work" title="Projects">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </Section>

      <Section
        id="experience"
        eyebrow="Background"
        title="Experience and education"
      >
        <ol className="divide-y divide-line border-y border-line">
          {timeline.map((entry) => (
            <li
              key={entry.title}
              className="grid gap-2 py-8 md:grid-cols-12 md:gap-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:col-span-3 md:pt-1.5">
                {entry.kind}
              </p>
              <div className="md:col-span-6">
                <h3 className="text-xl font-medium">{entry.title}</h3>
                <p className="mt-1 text-muted">{entry.place}</p>
                {entry.summary ? (
                  <p className="mt-3 leading-relaxed">{entry.summary}</p>
                ) : null}
              </div>
              <p className="font-mono text-[13px] text-muted md:col-span-3 md:pt-1.5 md:text-right">
                {entry.when}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="skills" eyebrow="Toolbox" title="Skills">
        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {group.label}
              </dt>
              <dd className="mt-4">
                <Chips items={group.items} label={group.label} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="how-i-work" eyebrow="Approach" title="How I work">
        <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {principles.map((principle, index) => (
            <li key={principle.title} className="border-t border-line pt-5">
              <p className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-medium">{principle.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">
                {principle.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-3xl border-l-2 border-accent pl-5 text-lg leading-relaxed">
          {aiNote}
        </p>
      </Section>

      <Section id="contact" eyebrow="Get in touch" title="Contact">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          The quickest way to reach me is email. I am happy to walk through any
          of these projects, including the parts that are not finished.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block break-all font-display text-2xl text-ink underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent sm:text-4xl"
        >
          {profile.email}
        </a>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <li>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
          </li>
          <li>
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
          </li>
        </ul>
      </Section>
    </>
  );
}
