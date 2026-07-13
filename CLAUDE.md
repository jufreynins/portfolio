## Architecture

Premium single-page portfolio. Astro 7 + Tailwind CSS 4 (CSS-first `@theme`, no config file), no React.

- **Content data**: `src/data/projects.ts`, `src/data/services.ts`, `src/data/skills.ts` — edit these to change site content, don't hardcode copy in components.
- **Global settings**: `src/config/site.ts` — name, contact info, nav, CV path.
- **Layout**: `src/layouts/BaseLayout.astro` wraps every page — includes `<ClientRouter />`, `SEOHead`, `Header`, `Footer`.
- **Components**: `src/components/` — Header/Footer use the AbortController re-init pattern on `astro:page-load` (see project CLAUDE.md rules in global config). `Reveal.astro` + `.reveal`/`data-reveal` CSS class drive scroll animations via one shared `IntersectionObserver`; respects `prefers-reduced-motion`.
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
