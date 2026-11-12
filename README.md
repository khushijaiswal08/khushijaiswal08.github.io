# Khushi Jaiswal: portfolio website

A personal portfolio for AI and automation engineering roles: one home page (hero, projects,
experience and education, skills, how I work, contact) plus a case-study page for each of four
projects. It is a static site: the build produces plain HTML, CSS and JavaScript with no server,
no database, no analytics and no environment variables.

Built with Next.js 16 (App Router, static export), TypeScript and Tailwind CSS 4.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload |
| `npm run build` | Production build, written to `out/` as static files |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types, then runs `tsc --noEmit` |
| `npm run images` | Rebuilds the optimised screenshots and the share image in `public/` |

All three of `lint`, `typecheck` and `build` should pass before deploying.

To preview the production build, serve the `out/` folder with any static file server, for example
`npx serve out`.

## Edit the content

No component needs to change to edit text.

| What | Where |
| --- | --- |
| Project cards and case studies | `src/content/projects.ts` |
| Pitch, facts, experience, education, skills, "How I work", contact links | `src/content/profile.ts` |
| Site address, title and description for search and link previews | `src/site.ts` |

Rules for the content (from `SPEC.md`): only state facts that the project's own README states, no
phone numbers, and do not name the employer, its brands or the designer client.

### Add or replace a screenshot

1. Put the source image in `assets-src/<project>/`.
2. Add a line to the `SHOTS` list in `scripts/optimize-images.mjs`.
3. Run `npm run images`. It writes 640, 1024 and 1600 px WebP files to `public/shots/` and prints
   the width and height to use.
4. Add the screenshot to the project in `src/content/projects.ts` with that width and height, alt
   text and a caption.

`assets-src/` is only the input for that script; the site itself never loads files from it.

## Where things live

```
src/site.ts                  site address (one place), title, description
src/content/                 all text: projects.ts and profile.ts
src/app/page.tsx             home page sections
src/app/projects/[slug]/     case-study page (one per project in projects.ts)
src/app/layout.tsx           fonts, metadata, theme script, header and footer
src/app/robots.ts, sitemap.ts, icon.svg   SEO files
src/components/              header, footer, theme toggle, project card, pipeline, screenshot frame
src/lib/image-loader.ts      picks the right pre-built screenshot width
scripts/optimize-images.mjs  screenshots and share image
public/                      optimised screenshots (shots/) and og.png
```

The theme follows the system setting. The toggle in the header saves a choice in the browser's
local storage, and a small inline script applies it before the first paint so there is no flash.

## Deploy

First set the real address in `src/site.ts` (`SITE_URL`). It feeds the canonical links, Open Graph
tags, `robots.txt` and `sitemap.xml`.

- **Vercel:** import the repository. The defaults work (framework Next.js, build `npm run build`).
- **Netlify:** build command `npm run build`, publish directory `out`.
- **GitHub Pages:** build with `npm run build` and publish the `out/` folder (for example with a
  GitHub Actions workflow). `public/.nojekyll` is copied into `out/` so Pages does not run Jekyll,
  which would drop the `_next/` folder; keep that file. If the site is served from a sub-path such as
  `https://<user>.github.io/<repo>/`, add `basePath: "/<repo>"` to `next.config.ts` and prefix the
  path returned by `src/lib/image-loader.ts` and the `/og.png` paths in `src/app/layout.tsx` with it.

What only Khushi can supply before or after launch is listed in [TODO.md](TODO.md).
