# Roadmap to launch

Status: 2026-09-22. Where the site stands and what remains, in order. The owner's tickable version is `checklist.md`. Sizes are rough: S is under an hour of build work, M is a session, L is several sessions. "Owner" marks steps only Takumi can do.

## Done

- Plan, audiences, sitemap, content model, hosting comparison (`site-structure.md`).
- Content skeleton with English page shells and Thai and Japanese placeholders; CV, timeline, and publications data filled from the CV and résumé.
- Eleven case studies approved and drafted in the owner's voice, with TODO comments where only he can answer.
- Three baseline design directions, four skill-based explorations, and their synthesis (`design-directions.md`, `design-exploration/`).
- Astro 7 site scaffolded: React islands, Tailwind 4, Framer Motion, locale-prefixed routes, base-path-aware links.
- Home page built to the combined landing-page brief, then given the premium pass: Hanken Grotesk and Noto Sans Thai, medium-weight headings, hairlines, nested card shells, custom easing, grain.
- Work index, eleven case-study pages, bio-link page, contact page listing the socials, stubs for the other sections.
- GitHub Pages deployment on every push, live at https://takumilbx.github.io/personal-website/, marked noindex while it is a preview.

## Milestone 1: make the home page real (owner assets and copy)

| # | Step | Who | Size |
|---|---|---|---|
| 1.1 | Portrait cutout: transparent PNG, at least 2000 px tall, head in the upper half | Owner | |
| 1.2 | Background photo, at least 2560 px wide, dark enough for cream text, or none | Owner | |
| 1.3 | Sixteen to twenty-one media stills or thumbnails from @takumyi, 16:9 preferred | Owner | |
| 1.4 | Nine project images, three per featured case study, at least 1600 px on the long side | Owner | |
| 1.5 | Favicon and a 1200 by 630 px social preview image | Owner | |
| 1.6 | Confirm or replace the defaults in `content/pages/en/home.yaml`: marquee text, title, nav labels, year, footer lines, About paragraph, five What I do items, project categories, button labels; say whether YouTube or X should be linked | Owner | |
| 1.7 | Wire the assets through Astro's image pipeline (WebP and AVIF, responsive sizes, lazy loading below the fold, dimensions set to avoid layout shift), replace every placeholder, and tune the hero over the real photo | Builder | M |
| 1.8 | Font loading: preload the Latin face, `font-display: swap`, metric-matched fallback for Noto Sans Thai | Builder | S |
| 1.9 | Per-page titles, descriptions, Open Graph and Twitter cards using the social image | Builder | S |

## Milestone 2: the section pages, in the same visual system

| # | Step | Who | Size |
|---|---|---|---|
| 2.1 | About: opening paragraph, timeline rendered from `timeline.yaml`, what I work on, values, CV link | Builder, copy from owner | M |
| 2.2 | Creator: channel paragraph, formats, selected videos from `videos.yaml`, reach from `creator-stats.yaml`, collaborations from `collabs.yaml`, media-kit button | Builder | M |
| 2.3 | Creator data: TikTok analytics export into `creator-stats.yaml`; six to nine selected videos with links and thumbnails; brand collaborations | Owner | |
| 2.4 | Work index polish: filters by type and country, cover images, related links resolved to real routes, headline numbers in the meta line | Builder | M |
| 2.5 | Case studies: fill the 45 TODO comments, answer the confidentiality checks for Edsy and the 2025 Bangkok work, supply artefact links; then flip each from draft to published | Owner, then builder | M |
| 2.6 | Research: interests, research-plan summary with PDF, publications and talks from YAML | Builder, PDFs and copy from owner | M |
| 2.7 | Contact: public email decision, then a form (Formspree or Resend) or a mailto link | Owner decides, builder wires | S |
| 2.8 | CV page rendered from `cv.yaml`, plus a generated PDF from the same data | Builder | M |
| 2.9 | Writing: posts collection and index, kept out of navigation until three posts exist; RSS | Builder, posts from owner | M |
| 2.10 | Now page | Owner copy, builder | S |
| 2.11 | 404 page in the site's style | Builder | S |

## Milestone 3: quality before launch

| # | Step | Who | Size |
|---|---|---|---|
| 3.1 | Accessibility pass: keyboard order and focus states, contrast in the cream section, alt text, reduced motion on every animation, screen-reader check of the marquee and character reveal | Builder | M |
| 3.2 | Performance: Lighthouse 90 or above on mobile, island budget, image weights, no layout shift | Builder | M |
| 3.3 | Mobile in-app browsers: test the home page and `/links` inside TikTok and Instagram on a real phone; apply the mobile-native checklist from the exploration | Owner tests, builder fixes | S |
| 3.4 | Cross-document View Transitions crossfade so dark pages do not flash white between navigations | Builder | S |
| 3.5 | `sitemap.xml`, `robots.txt`, Person structured data on About | Builder | S |
| 3.6 | Analytics: Plausible or Umami, cookieless, no banner | Owner picks and creates the account, builder wires | S |
| 3.7 | Content review: every page read once by the owner for voice and facts | Owner | |

## Milestone 4: launch

| # | Step | Who | Size |
|---|---|---|---|
| 4.1 | Domain: check the shortlist at a registrar (takumyi.com first, takumyi.me second) and register one | Owner | |
| 4.2 | Hosting decision: Cloudflare Pages as recommended, or keep GitHub Pages with the custom domain. Either works with the current build; Cloudflare has no bandwidth cap and handles the root redirect server-side | Owner decides | |
| 4.3 | Point DNS, set `SITE_URL` to the domain, drop `SITE_BASE`, remove the preview noindex, verify HTTPS | Builder | S |
| 4.4 | Merge the working branch to `main` through a pull request; from then on `main` is what deploys | Owner merges | S |
| 4.5 | Put the `/links` URL in the TikTok and Instagram bios | Owner | |
| 4.6 | Launch check: every route, every link, both phone and desktop, on the live domain | Builder | S |

## Milestone 5: after launch

| # | Step | Who | Size |
|---|---|---|---|
| 5.1 | Thai: `/creator` and `/links` first, then the rest; the placeholders and locale routing already exist | Owner translates or approves, builder wires | M |
| 5.2 | Japanese: `/about` and `/research` first, with Noto Sans JP added to the font stack | Owner translates or approves, builder wires | M |
| 5.3 | Media-kit PDF generated from the same data as `/creator` | Builder | M |
| 5.4 | Section-page design decision: keep the landing page's dark two-colour system everywhere (current), or adopt one of the explored directions for the reading pages | Owner decides | |
| 5.5 | Writing cadence, timeline updates, new case studies as they happen; update the CV data and regenerate the PDF | Owner, builder as needed | ongoing |

## Decisions still open

1. Public email on the contact page, yes or no.
2. Domain and hosting (4.1, 4.2).
3. Analytics provider (3.6).
4. Whether the section pages stay in the landing page's system (5.4).
5. YouTube and X links.

## The critical path

Assets (1.1 to 1.6) unblock the home page. The case-study TODOs (2.5) and creator data (2.3) unblock the two most-visited section pages. The domain (4.1) unblocks launch. Everything else can proceed in parallel with those three owner inputs.
