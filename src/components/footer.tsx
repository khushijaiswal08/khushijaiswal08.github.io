import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {profile.name} · {profile.location}
        </p>
        <ul className="flex gap-6">
          <li>
            <a className="hover:text-ink" href={`mailto:${profile.email}`}>
              Email
            </a>
          </li>
          <li>
            <a
              className="hover:text-ink"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="hover:text-ink"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
