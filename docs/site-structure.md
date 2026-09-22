# Personal website: structure plan

Status: draft v4, 2026-09-21 (v1 to v3 reviewed by the owner; decisions recorded in section 12; the site is scaffolded and the home page is built)
Owner: Takumi Oshiyama
Domain: not yet chosen; takumyi.com is the working suggestion (section 8)
Purpose of this document: agree on what the site is, who it serves, which pages exist, and how content is organised, before any code is written.

---

## 1. Purpose and audiences

The site has one job: let a stranger understand who Takumi is in thirty seconds, then go deeper in whichever direction they came for.

Four audiences arrive with different questions. They are weighted equally: no audience gets a bigger door, and the visual design stays neutral rather than leaning academic or leaning creator.

| Audience | Arrives from | Wants to know | Should land on |
|---|---|---|---|
| Grad-school committees, scholarship reviewers, professors (Japan) | Application PDF, email signature | Research interests, academic record, writing quality | `/research`, `/about`, `/cv` |
| EdTech and education-policy employers, NGOs, international organisations | LinkedIn, referrals | What he has actually done, with evidence | `/work` |
| Brands, event organisers, media | TikTok / Instagram profile | Channel identity, audience, past collaborations, how to book | `/creator` |
| Followers | TikTok / Instagram bio link | Quick links, latest content, who this person is | `/links`, `/` |

Design consequence, revised 2026-09-21: the home page is the dark landing page specified in `docs/landing-page-brief.md` (marquee name, portrait, media rows, About, What I do, Projects). Its header and drawer carry the switchboard role. Each section is still its own sub-page.

## 2. Positioning

One-line identity, working draft (EN):

> EdTech researcher working across Thailand and Japan. Creator behind @takumyi.

Throughline on every page: Thailand ↔ Japan. Case studies compare Thailand's Digital Classroom with Japan's GIGA School; creator content explains Japan to a Thai audience; the study-abroad journey joins the two halves. The site makes this visible in its structure (country tags, a timeline), not only in copy.

Tone follows the existing voice charter: first person, sincere, real numbers instead of adjectives, no "passionate about" filler.

## 3. Languages

Decision: English only at launch. Thai and Japanese exist as placeholder files in the content tree from day one so they can be developed in parallel, but nothing in those languages is built until a file is marked `published`.

- Routes are locale-prefixed from the start (`/en/...`, `/th/...`, `/ja/...`) so adding a language later changes no URLs. The bare root redirects to `/en`.
- `hreflang` tags are emitted only for languages that actually exist for a page.
- The language switcher shows only the languages available for the current page.
- Translation order after launch: Thai for `/creator` and `/links` first (the channel's audience is Thai), then Japanese for `/about` and `/research` (grad-school and employer readers in Japan).

## 4. Sitemap

```
/                          Home (switchboard)
├── /about                 Story, timeline, values, portrait, CV download
├── /work                  Case-study index (filters: research · policy · edtech · learning-design · interpreting · media; TH · JP · international)
│   └── /work/[slug]       One case study
├── /research              Research interests, research-plan summary, publications, talks
│   └── /research/[slug]   Optional: one publication or talk page (otherwise link out to the PDF)
├── /creator               @takumyi: channel, formats, selected videos, reach, collaborations, media kit
├── /writing               Essays, literature notes, study-abroad journal
│   └── /writing/[slug]    One post
├── /cv                    Web CV plus PDF
├── /contact               Email, short form, what to contact for
├── /links                 Link-in-bio page (mobile first, no site chrome)
└── /now                   Optional: what he is doing this season
```

All paths above sit under a locale prefix (`/en/about`). Every section is a separate page.

Primary navigation (desktop): Work · Research · Creator · Writing · About · Contact, plus a language switch.
Mobile: the same items in a sheet menu.
Footer: socials, email, `/cv`, `/links`, language switch.

## 5. Page specifications

The Markdown skeleton for every page below already exists in `content/pages/en/` with the section headings in place.

### Home `/`

Built 2026-09-21 to `docs/landing-page-brief.md`, which replaces the earlier switchboard spec. Copy and settings live in `content/pages/en/home.yaml`; the three project cards are the case studies marked `featured: true`. Placeholders stand in for the portrait, the media rows, and the project images until the owner supplies assets.

### About `/about`

1. Opening paragraph built on a turning point, not a job list.
2. Timeline: Thailand → Japan. Education, key roles, channel start. One line per entry, with year and country.
3. What I work on: three or four short blocks (EdTech policy, learning innovation, media literacy, Thai–Japanese interpreting).
4. Values: "quality education for all", "ICT is not a silver bullet", the holistic view of learners, teachers, parents, and the learning space.
5. Links: CV PDF, LinkedIn, contact.

### Work `/work` and `/work/[slug]`

Index: filter chips by type and by country. Cards show organisation, role, period, and one headline number.

Every case study uses the same fixed structure so the collection reads consistently:

1. Header: title, organisation, role, period, location, tags.
2. Context and stakeholders
3. The problem
4. What I did
5. What the evidence showed (numbers, artefacts, outcomes)
6. What I would do differently
7. Related: other case studies, publications, or videos.

Candidate case studies are drawn from the owner's CV and résumé and listed in `docs/case-study-candidates.md` in three tiers, with proposed slugs, types, headline numbers, and a confidentiality check. None is written until the owner approves it.

### Research `/research`

1. Research interests: three to five named themes, one paragraph each.
2. Current research plan: problem → why it matters in Thailand and Japan → gap → questions → method. Short version on the page, full PDF linked.
3. Publications and papers: list, newest first, with venue and PDF or DOI.
4. Talks and presentations: list with event, date, slides link.
5. Reading and literature notes: link to `/writing` filtered by type.

### Creator `/creator`

1. Channel identity in one paragraph.
2. What the channel covers: format tiles (explainers, artist showcases, concert recaps, study-abroad, media literacy).
3. Selected videos: six to nine, grouped by format. View counts only when real, each with its date.
4. Audience and reach: followers, 28-day views, audience split by country and age, from a TikTok analytics export. The export date is shown next to the figures.
5. Brand and event collaborations: logo row plus one line each on what was delivered.
6. Media kit: PDF download and a "Work with me" button that opens `/contact` with the reason preset to "brand".

### Writing `/writing` and `/writing/[slug]`

Posts carry a language tag and topic tags. Types: essay, literature note, journal.
Post page: title, date, reading time, language, tags, body, related posts.
Launch rule: the section appears in navigation only once three posts exist.

### CV `/cv`

Rendered from `content/data/cv.yaml`, and the PDF is generated from the same file so the two never diverge. Sections: Education, Experience, Research, Publications, Talks, Skills and languages, Awards.

### Contact `/contact`

Email (obfuscated), a short form (name, email, reason: research / brand / speaking / other, message), and social links. No phone number.

### Links `/links`

Bare mobile page: portrait, name, six to eight buttons (latest video, `/creator`, `/work`, Instagram, YouTube, X, email). No navigation or footer. This is the URL for the TikTok bio.

## 6. Content model

Decision: content is Markdown and YAML in this GitHub repository. No CMS. The skeleton is in `content/` and its `README.md` explains the rules for editing.

Two rules govern the tree:

1. Prose is per language; data is shared. Pages, case studies, and posts have `en/`, `th/`, `ja/` copies. Lists (publications, talks, videos, collaborations, timeline, creator statistics, CV) are single YAML files used by every language.
2. English is the source. Every prose file carries `status: placeholder | draft | published`, and only `published` files build. A missing translation falls back to English with a notice.

| Collection | Where | Key fields |
|---|---|---|
| pages | `content/pages/{en,th,ja}/*.md` | title, slug, lang, description, status, nav, order; body is the page's sections |
| work | `content/work/{en,th,ja}/*.md` | title, slug, type, org, role, period, location, summary, headlineNumber, tags, featured, cover, links, related |
| writing | `content/writing/{en,th,ja}/*.md` | title, slug, date, type, tags, summary, cover |
| publications | `content/data/publications.yaml` | title, authors, venue, year, type, url, pdf, abstract |
| talks | `content/data/talks.yaml` | title, event, date, place, slides, video |
| videos | `content/data/videos.yaml` | title, platform, url, format, publishedAt, views, viewsAsOf, thumbnail, topics, featured |
| collabs | `content/data/collabs.yaml` | brand, campaign, date, deliverables, result, url, logo |
| creator stats | `content/data/creator-stats.yaml` | asOf, per-platform followers, 28-day views, audience split |
| timeline | `content/data/timeline.yaml` | date, title, description, location, link |
| cv | `content/data/cv.yaml` | education, experience, research, skills, languages, awards |
| UI strings | `content/i18n/{en,th,ja}.json` | navigation labels, buttons, notices |

Templates for a page, a case study, and a post are in `content/_templates/`.

## 7. Recommended stack

Decision, 2026-09-21: Astro 7 with React islands for the animated sections, Tailwind CSS 4, Framer Motion, and Lucide, static output. Scaffolded and building; see the README for commands.

Why Astro rather than Next.js for this site:

- The site is content, not an application. Astro ships almost no JavaScript by default, which matters for mobile readers arriving from TikTok.
- Content collections read the `content/` tree above directly and give typed frontmatter out of the box.
- Built-in i18n routing covers `/en`, `/th`, `/ja`.
- Adding a case study or post is adding a Markdown file, which matches the editing decision.

When to choose differently: if interactive features are expected later (dashboards, member areas), Next.js is the safer base. If editing from a phone becomes important, Keystatic can be added on top of the same Markdown files without changing the stack.

Supporting pieces: Plausible or Umami for analytics (cookieless, no banner), Resend or Formspree for the contact form, per-page Open Graph images, `sitemap.xml`, and RSS for `/writing`.

## 8. Hosting and domain

Domain: not yet registered. takumyi.com is the owner's suggestion, not a name he holds. As of 2026-09-21 it has no DNS records, but availability could not be verified from the build environment because WHOIS and RDAP lookups are blocked there. Check it at a registrar (Cloudflare Registrar, Porkbun, or Namecheap all show availability without an account).

The domain should match the @takumyi handle, because the TikTok and Instagram bios are the largest source of visitors and a name that matches the handle is the one people will type. Shortlist, in order of preference:

1. `takumyi.com`: matches the handle; first choice if free.
2. `takumyi.me`: same name, common for personal sites; second choice.
3. `takumyi.co`: short, but often confused with .com.
4. `takumioshiyama.com`: full name, formal; better for academic readers, weaker for followers.
5. `oshiyama.me`: surname only; short but not obviously him.

Whichever is chosen, register the .com of the same name if it is also free, and redirect it.

Recommendation: Cloudflare Pages for hosting, with DNS at Cloudflare and the domain registered or transferred to Cloudflare Registrar so all three sit in one account.

Why Cloudflare Pages:

- Free tier with unlimited bandwidth and no restriction on commercial use. A creator page that advertises brand work counts as commercial, which the free tiers of some competitors forbid.
- Global edge network with locations in Bangkok and Tokyo, so both audiences get fast loads.
- Builds straight from this GitHub repository on every push, with a preview URL per branch.
- Custom domain and HTTPS included.

Alternatives, in order of fit:

| Host | Fit | Trade-off |
|---|---|---|
| Vercel | Best developer experience for Astro and Next.js | Free Hobby plan is non-commercial only; the paid plan is per seat per month |
| Netlify | Similar to Cloudflare Pages, mature forms feature | Free tier caps bandwidth per month |
| GitHub Pages | Simplest, free, already where the code is | Static only: the root locale redirect must be client-side, no server redirects, soft bandwidth cap; fine for a first deploy, weaker long term |

A reasonable path: deploy the first build to Cloudflare Pages on its free `*.pages.dev` subdomain, then attach the domain once the registration is sorted.

Interim hosting, 2026-09-22: the owner asked to see the site on GitHub first. `.github/workflows/deploy.yml` builds on every push to `main` or a `claude/**` branch with `SITE_BASE=/personal-website` and publishes to GitHub Pages at https://takumilbx.github.io/personal-website/. Every internal link and asset path goes through `withBase()` so the same code serves at the root on a custom domain. Two settings live outside the repository and must be set once by the owner: Pages must be switched on (Settings, Pages, Build and deployment, Source: GitHub Actions), and if the `github-pages` environment restricts deployment branches, the `claude/**` branch must be allowed or the work merged to `main`.

## 9. Repository layout

```
personal-website/
├── docs/                        plan, briefs, candidates, design directions and exploration
├── content/                     all site content; see content/README.md
│   ├── _templates/
│   ├── pages/{en,th,ja}/        page shells; en/home.yaml holds the landing-page copy
│   ├── work/{en,th,ja}/         case studies (eleven English drafts)
│   ├── writing/{en,th,ja}/
│   ├── data/                    cv, timeline, publications, talks, videos, collabs, creator stats
│   └── i18n/
├── public/                      favicon, placeholders, _redirects (Cloudflare), later images and PDFs
├── src/
│   ├── content.config.ts        the work collection, read from content/work/en
│   ├── lib/content.ts           YAML reader for content/
│   ├── styles/global.css        Tailwind theme tokens, keyframes, reduced-motion rules
│   ├── layouts/                 Base (document head) and Page (section pages)
│   ├── components/home/         Hero, HeroChrome, MediaMarquee, About, Services, Projects, ClosingFooter
│   ├── components/ui/           FadeIn, Magnet, AnimatedText, GhostButton
│   └── pages/                   index (redirect), en/ (home, work, work/[slug], links, stubs)
├── .claude/skills/              vendored design skills; see its README
├── astro.config.mjs
├── package.json
└── README.md
```

## 10. Cross-cutting requirements

- Performance: Lighthouse 90+ on mobile. Images through Astro's image pipeline. Videos as thumbnails that link out; no autoplaying embeds on the home page.
- Accessibility: semantic headings, alt text on every image, keyboard-navigable menu, WCAG AA colour contrast.
- SEO: per-page title and description, Open Graph image, `hreflang`, Person structured data on `/about`, `sitemap.xml`, RSS for `/writing`.
- Privacy: cookieless analytics only. The contact form forwards messages and does not store them on the site.
- Typography: Latin, Thai, and Japanese faces that harmonise, chosen now even though only English ships first. Candidates: Inter + Noto Sans Thai + Noto Sans JP, or the IBM Plex family, which covers all three scripts.
- Design: neutral. One accent colour, generous white space, no audience-specific styling. Three candidate directions (Register, Feature, Explainer), each with trilingual typography and light and dark tokens, are proposed in `docs/design-directions.md`, with the recommendation being Register. The rendered comparison is `docs/design-preview.html`, published at https://claude.ai/artifact/7pu1sUws3qpYnMmRPe95di. The owner picks one before the layout is scaffolded.

## 11. Build order

Phase 0, now:

1. Content skeleton in `content/` (done).
2. CV, timeline, and publications data filled from the owner's CV and résumé (done; owner reviews `content/data/`).
3. Case studies approved and drafted (done; owner fills the TODO comments in `content/work/en/`).
4. Further design exploration with the owner's chosen skills, then a direction is picked.
5. Owner checks domain availability and registers one from the shortlist in section 8.
6. Owner exports TikTok analytics into `content/data/creator-stats.yaml`.

Phase 1, launchable minimum, English only:

4. Scaffold the Astro project reading `content/`, with i18n configured for en, th, ja and only en enabled (done).
5. Base layout, navigation, footer, theme tokens (done, dark only).
6. Home (done, with placeholder assets), `/links` (done), Contact (stub, socials only), About (stub).
7. Work index plus the approved case studies (done; drafts render with a draft marker).
8. Creator page with selected videos, statistics, and collaborations (stub).
9. CV page plus PDF (stub).
10. Replace placeholders with the owner's assets, deploy to Cloudflare Pages, attach the domain, add analytics.

Phase 2:

11. Research page with publications and talks data.
12. Writing section with the first three posts and RSS.
13. Thai translations of `/creator` and `/links`.
14. `/now` page.

Phase 3:

15. Japanese translations of `/about` and `/research`.
16. Media-kit PDF generated from the same data as `/creator`.
17. Remaining Thai and Japanese pages as they are written.

## 12. Decision log

| Date | Decision | Source |
|---|---|---|
| 2026-09-21 | English only at launch; Thai and Japanese placeholders in the tree from day one | Owner |
| 2026-09-21 | All four audiences weighted equally; neutral design; each section is its own sub-page | Owner |
| 2026-09-21 | Content is Markdown and YAML in GitHub, no CMS; skeleton built first | Owner |
| 2026-09-21 | Case studies are listed for approval before any is written | Owner |
| 2026-09-21 | Creator statistics come from a real TikTok analytics export | Owner |
| 2026-09-21 | takumyi.com is a suggestion, not a domain the owner holds; availability unverified | Owner |
| 2026-09-21 | The owner's CV and résumé are the source for case studies, timeline, CV data, and publications | Owner |
| 2026-09-21 | TikTok and Instagram handle is @takumyi; LinkedIn is linkedin.com/in/takumioshiyama | Owner |
| 2026-09-21 | Design direction to be chosen from three proposals in `docs/design-directions.md` | Owner asked for proposals |
| 2026-09-21 | All eleven Tier 1 and Tier 2 case studies approved; drafted in `content/work/en/` | Owner |
| 2026-09-21 | Owner wants further design exploration with the taste, impeccable, and emil skills, which are not available in this environment | Owner; pending source of those skills |
| 2026-09-21 | Astro static site, Cloudflare Pages recommended | Proposal, not yet confirmed |
| 2026-09-21 | The combined landing page in `docs/landing-page-brief.md` is the home page, built inside Astro with React islands | Owner |
| 2026-09-21 | Kanit, ink `#0C0C0C` and cream `#efeee9`, dark only, three nav labels, confirmed socials, and CV-derived copy applied as defaults on the home page until the owner answers the brief's questions | Builder; every default is marked in `content/pages/en/home.yaml` |
| 2026-09-22 | Interim hosting on GitHub Pages from the working branch; the owner enabled Pages with the GitHub Actions source and allowed the `claude/**` branch in the `github-pages` environment | Owner |

## 13. Open items

1. Home page assets: portrait cutout, background photo, 16 to 21 media items, nine project images, favicon and social image (specs in `docs/landing-page-brief.md`, section 8).
2. Home page copy: confirm or replace the defaults marked in `content/pages/en/home.yaml` (marquee text, title, nav labels, footer lines, About paragraph, What I do items, project categories).
3. Case studies: answer the confidentiality check for Edsy and the 2025 Bangkok work, and fill the TODO comments in each draft.
4. Section pages: choose a direction for them from `docs/design-exploration/README.md`, or keep the landing page's two colours, then build About, Creator, Research, Writing, CV, and Contact.
5. Domain: check the shortlist in section 8 at a registrar and register one, then set `site` in `astro.config.mjs`.
6. Hosting: confirm Cloudflare Pages, or name a preference from the table in section 8.
7. Creator statistics: export from TikTok analytics and fill `content/data/creator-stats.yaml`.
8. YouTube and X: confirm whether these accounts exist and should be linked.
9. The @takumyi channel start date for the timeline (the CV does not give it).
10. Whether the public email on the site should be the Gmail address from the CV, and confirmation that phone numbers stay off the site (they were left out).
11. Source PDFs for the research plan, the senior thesis, and the ESCAP paper, so `/research` can link to them.
