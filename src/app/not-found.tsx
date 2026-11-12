import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-32 sm:px-8">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">
        This page does not exist
      </h1>
      <p className="mt-4 text-muted">
        The link may be old or mistyped.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block font-medium text-accent underline underline-offset-4"
      >
        Back to the home page
      </Link>
    </div>
  );
}
