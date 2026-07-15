## Architecture

Premium single-page portfolio. Astro 7 + Tailwind CSS 4 (CSS-first `@theme`, no config file), no React.

- **Content data**: `src/data/projects.ts`, `src/data/services.ts`, `src/data/techLogos.ts` — edit these to change site content, don't hardcode copy in components.
- **Global settings**: `src/config/site.ts` — name, contact info, nav, CV path.
- **Layout**: `src/layouts/BaseLayout.astro` wraps every page — includes `<ClientRouter />`, `SEOHead`, `Header`, `Footer`, `ScrollFX`.
- **Theme**: light theme — tokens in `src/styles/global.css` (`--color-ink` is the white page background, `--color-surface` is the alternate light-gray section background, `--color-accent` is a WCAG-safe dark green). Text/border utilities use `zinc-900`/`black` opacity classes, not `white`.
- **Motion**: `src/components/ScrollFX.astro` is the single GSAP + ScrollTrigger controller for the whole site — hero entrance, a unified `[data-reveal]`/`data-reveal-type` reveal system (fade-up/scale/mask/stagger via `ScrollTrigger.batch`), progress-line sequential activation, project parallax, and magnetic buttons. Desktop-only effects are gated with `ScrollTrigger.matchMedia('(min-width: 1024px)')`; everything respects `prefers-reduced-motion`. `Reveal.astro` is just a thin markup wrapper — it has no logic of its own.
- **Project images**: `src/assets/images/projects/*.png`, rendered through `astro:assets` `<Image />` (auto-optimized to WebP at build time). Do not hotlink the old WordPress site's images.
- **CV**: `public/documents/Jufrey-Bayog-CV.pdf`, linked via `siteConfig.cvPath`.
- **Contact form**: Netlify Forms (`data-netlify="true"`, hidden `form-name`, honeypot field named `company`). No backend — submissions land in the Netlify dashboard once deployed.
- Single page (`src/pages/index.astro`); sections are anchor-linked (`#about`, `#services`, `#work`, `#contact`).

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
