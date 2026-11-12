"use client";

/**
 * Light/dark toggle. The site follows the system theme until the visitor
 * clicks; choosing the same theme as the system clears the saved choice so
 * the site follows the system again. Icons are swapped in CSS (globals.css).
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const current = root.getAttribute("data-theme") ?? system;
    const next = current === "dark" ? "light" : "dark";
    try {
      if (next === system) {
        root.removeAttribute("data-theme");
        localStorage.removeItem("theme");
      } else {
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      }
    } catch {
      root.setAttribute("data-theme", next);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
    >
      <svg
        className="icon-moon h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
      <svg
        className="icon-sun h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
