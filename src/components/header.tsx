import Link from "next/link";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/#projects", label: "Projects", always: true },
  { href: "/#experience", label: "Experience", always: false },
  { href: "/#skills", label: "Skills", always: false },
  { href: "/#how-i-work", label: "How I work", always: false },
  { href: "/#contact", label: "Contact", always: true },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          href="/"
          className="whitespace-nowrap font-display text-lg tracking-tight text-ink sm:text-xl"
        >
          {profile.name}
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label="Main">
            <ul className="flex items-center gap-3 text-sm sm:gap-6">
              {NAV.map((item) => (
                <li
                  key={item.href}
                  className={item.always ? "" : "hidden md:block"}
                >
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
