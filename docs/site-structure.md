# Personal website: structure plan

Status: draft v3, 2026-09-21 (v1 and v2 reviewed by the owner; decisions recorded in section 12)
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

Design consequence: the home page is a switchboard. Each section is its own sub-page; the home page links to them and never tries to be all of them.

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

1. Hero: name, one-line identity, portrait, two buttons ("See my work", "Watch @takumyi").
2. Three doors: Work and Research / Creator / Writing, one sentence each, equal size.
3. Featured work: three case-study cards, each with organisation, role, and one headline number.
4. Latest from @takumyi: three videos (thumbnail plus link, no autoplay).
5. Latest writing: three posts. The section hides itself when there are no posts.
6. Contact strip: "Research collaboration, speaking, or brand work: email."

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

Recommendation: Astro with MDX content collections and Tailwind CSS, static output.

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

A reasonable path: deploy the first build to Cloudflare Pages on its free `*.pages.dev` subdomain, then attach takumyi.com once the registration is sorted.

## 9. Repository layout

```
personal-website/
├── docs/
│   └── site-structure.md        this plan
├── content/                     all site content; see content/README.md
│   ├── _templates/
│   ├── pages/{en,th,ja}/
│   ├── work/{en,th,ja}/
│   ├── writing/{en,th,ja}/
│   ├── data/
│   └── i18n/
├── public/                      (after scaffolding) CV PDF, media kit, images, robots.txt
├── src/                         (after scaffolding) Astro components, layouts, pages, styles
├── astro.config.mjs             (after scaffolding)
├── package.json                 (after scaffolding)
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

4. Scaffold the Astro project reading `content/`, with i18n configured for en, th, ja and only en enabled.
5. Base layout, navigation, footer, theme tokens.
6. Home, About, Contact, `/links`.
7. Work index plus the approved case studies.
8. Creator page with selected videos, statistics, and collaborations.
9. CV page plus PDF.
10. Deploy to Cloudflare Pages, attach takumyi.com, add analytics.

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

## 13. Open items

1. Case studies: answer the confidentiality check for Edsy and the 2025 Bangkok work, and fill the TODO comments in each draft.
2. Design: point to where the taste, impeccable, and emil skills come from so they can be installed, then explore further; the three directions in `docs/design-directions.md` stay as the baseline.
3. Domain: check the shortlist in section 8 at a registrar and register one.
4. Hosting: confirm Cloudflare Pages, or name a preference from the table in section 8.
5. Creator statistics: export from TikTok analytics and fill `content/data/creator-stats.yaml`.
6. YouTube and X: confirm whether these accounts exist and should be linked.
7. The @takumyi channel start date for the timeline (the CV does not give it).
8. Whether the public email on the site should be the Gmail address from the CV, and confirmation that phone numbers stay off the site (they were left out).
9. Source PDFs for the research plan, the senior thesis, and the ESCAP paper, so `/research` can link to them.
