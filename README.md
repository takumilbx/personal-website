# personal-website

Personal site for Takumi Oshiyama: education research and Thailand↔Japan work on one side, the @takumyi channel on the other. Built with Astro, React islands, Tailwind CSS 4, and Framer Motion; static output for Cloudflare Pages.

## Running it

```
npm install
npm run dev        # http://localhost:4321/en/
npm run build      # static output in dist/
npm run preview    # serve dist/
npm run check      # type-check Astro and TypeScript
```

The root `/` redirects to `/en/`. Thai and Japanese routes are configured but not built yet.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main` or a `claude/**` branch, at https://takumilbx.github.io/personal-website/. It sets `SITE_URL` and `SITE_BASE` for the build; a custom domain later sets `SITE_URL` to the domain and leaves `SITE_BASE` unset. Pages must be enabled once in the repository settings with "GitHub Actions" as the source.

## Where things are

- `content/` is all site content as Markdown and YAML. Start with [`content/README.md`](content/README.md). The home page reads `content/pages/en/home.yaml`; case studies are `content/work/en/*.md`.
- `src/` is the Astro site: `pages/en/` for routes, `components/home/` for the landing page, `components/ui/` for shared motion pieces, `styles/global.css` for tokens and keyframes.
- `docs/` holds the plan and its decisions:
  - [`site-structure.md`](docs/site-structure.md): audiences, sitemap, content model, stack, hosting, build order, decision log, open items.
  - [`landing-page-brief.md`](docs/landing-page-brief.md): the home page specification, the defaults applied, and the assets still needed.
  - [`case-study-candidates.md`](docs/case-study-candidates.md): the eleven approved case studies and what each still needs.
  - [`design-directions.md`](docs/design-directions.md) and [`design-preview.html`](docs/design-preview.html): the three baseline directions for the section pages.
  - [`design-exploration/`](docs/design-exploration/README.md): four skill-based explorations and their synthesis.
- `.claude/skills/` holds vendored third-party design skills; see [its README](.claude/skills/README.md).
