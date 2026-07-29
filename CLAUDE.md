## Architecture

Multi-page WordPress developer portfolio. Next.js 16 (App Router) + Tailwind CSS 4 (CSS-first `@theme`, no config file), React 19, static export (`output: 'export'` in `next.config.ts`) — no server runtime at deploy time.

- **Routes**: `src/app/**/page.tsx` — `/`, `/about`, `/services`, `/portfolio`, `/contact`, `/tools`, `/tools/image-format-converter`, `/tools/image-compressor`, `/tools/css-gradient-generator`, `/tools/seo-meta-preview`, `/tools/favicon-generator`, `/tools/json-formatter`, `/personal-projects`. `src/app/not-found.tsx` is the 404 page, `src/app/sitemap.ts` generates `sitemap.xml`.
- **Content data**: `src/data/projects.ts`, `src/data/services.ts`, `src/data/techLogos.ts`, `src/data/process.ts` — edit these to change site content, don't hardcode copy in components. Plain TypeScript, no framework dependency.
- **Global settings**: `src/config/site.ts` — name, contact info, nav, CV path.
- **Root layout**: `src/app/layout.tsx` — mounts `Header`, `Footer`, `ScrollFX` once for every page; per-page `<title>`/meta comes from each page's exported `metadata` (built via `src/lib/seo.ts`'s `buildMetadata()`), not inline tags.
- **Theme**: light theme — tokens in `src/app/globals.css` (`--color-ink` is the white page background, `--color-surface` is the alternate light-gray section background, `--color-accent` is a WCAG-safe dark green). Text/border utilities use `zinc-900`/`black` opacity classes, not `white`.
- **Navigation model**: plain `<a href>` tags everywhere (not `next/link`) — every navigation is a full static-page load, not a client-side transition. This is deliberate: it keeps every interactive component's setup to a single `useEffect(() => {...}, [])` that runs once per page load, mirroring how the site behaved under Astro's per-page script model. Don't introduce `next/link` for internal nav without also reworking the affected component's effect to re-run on route change (`usePathname()`), or scroll-reveal/menu state will silently stop re-initializing on subsequent navigations.
- **Motion**: `src/components/ScrollFX.tsx` is the single GSAP + ScrollTrigger controller for the whole site — hero entrance, a unified `[data-reveal]`/`data-reveal-type` reveal system (fade-up/scale/mask/stagger via `ScrollTrigger.batch`), progress-line sequential activation, project parallax, and magnetic buttons. It's a client component mounted once in the root layout. Desktop-only effects are gated with `ScrollTrigger.matchMedia('(min-width: 1024px)')`; everything respects `prefers-reduced-motion`. `Reveal.tsx` is just a thin markup wrapper — it has no logic of its own.
- **Other interactive components** (`Header.tsx`, `ProcessTimeline.tsx`, `ContactForm.tsx`, `ImageFormatConverter.tsx`, `ImageCompressor.tsx`, `ProjectModal.tsx`/`ProjectCard.tsx`) follow the same pattern: vanilla DOM manipulation inside a `'use client'` component's `useEffect`, not React state driving the markup (except the project modal, which uses `ProjectModalContext.tsx` for open/close state since the old `<template>`-clone trick doesn't survive React hydration). `GradientGenerator.tsx`, `SeoMetaPreview.tsx`, `JsonFormatter.tsx`, and `FaviconGenerator.tsx` are the exceptions — they use ordinary React state/hooks instead, since their form-driven live-preview UIs fit that model better; all still mount once per full page load like everything else.
- **Project images**: `src/assets/images/projects/*.png`, rendered through `next/image` with `images.unoptimized: true` (required for static export — no server-side resize). Do not hotlink the old WordPress site's images.
- **CV**: `public/documents/Jufrey-Bayog-CV.pdf`, linked via `siteConfig.cvPath`.
- **Contact form**: submits via `fetch` to `public/contact.php` (a plain PHP `mail()` endpoint, chosen for Hostinger shared hosting — no Netlify Forms). Requires a PHP-capable host; honeypot field named `company` is checked server-side in `contact.php`.
- **Legacy redirects**: `public/.htaccess` (Apache, since static export can't do `next.config.ts` `redirects()`) — `/lab` and `/systems` (from a pre-restructure single combined page) both point to `/personal-projects`; `/tools/image-to-webp` points to `/tools/image-format-converter` (renamed when the tool grew from WebP-only to bidirectional JPG/PNG/WebP conversion).

## Development

```
npm run dev        # next dev
npm run build       # next build (static export to out/)
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
```

To preview the actual static export output (not the dev server) before deploying: `npm run build && npx serve out`.

## Deploy

`.github/workflows/deploy.yml` runs `next build` on push to `main`, copies `out/.` to the repo root, and commits+pushes that build output (tagged `[skip ci]` to avoid retriggering itself). Hostinger's plain-Git deploy serves whatever is at the repo root directly — there is no Node.js server involved at any point after the GitHub Action runs.

## Documentation

Full documentation: https://nextjs.org/docs

Consult these guides before working on related tasks:

- [App Router routing fundamentals](https://nextjs.org/docs/app/building-your-application/routing)
- [Static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Client vs Server Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
