# Personal website: structure plan

Status: draft v1, 2026-09-21
Owner: Takumi Oshiyama
Purpose of this document: agree on what the site is, who it serves, which pages exist, and how content is organised, before any code is written.

---

## 1. Purpose and audiences

The site has one job: let a stranger understand who Takumi is in thirty seconds, then go deeper in whichever direction they came for.

Four audiences arrive with different questions:

| Audience | Arrives from | Wants to know | Should land on |
|---|---|---|---|
| Grad-school committees, scholarship reviewers, professors (Japan) | Application PDF, email signature | Research interests, academic record, writing quality | `/research`, `/about`, `/cv` |
| EdTech and education-policy employers, NGOs, international organisations | LinkedIn, referrals | What he has actually done, with evidence | `/work` |
| Brands, event organisers, media | TikTok / Instagram profile | Channel identity, audience, past collaborations, how to book | `/creator` |
| Followers | TikTok / Instagram bio link | Quick links, latest content, who this person is | `/links`, `/` |

Design consequence: the home page cannot be optimised for one audience. It is a switchboard with three doors (Work and Research, Creator, Writing) under a short identity statement.

## 2. Positioning

One-line identity, working draft (EN):

> EdTech researcher working across Thailand and Japan. Creator behind @takumyi.

Throughline on every page: Thailand ↔ Japan. Case studies compare Thailand's Digital Classroom with Japan's GIGA School; creator content explains Japan to a Thai audience; the study-abroad journey joins the two halves. The site should make this visible in its structure (country tags, a timeline), not only in copy.

Tone follows the existing voice charter: first person, sincere, real numbers instead of adjectives, no "passionate about" filler.

## 3. Languages

Assumption for this plan: English and Thai at launch, Japanese later.

- EN is the default for `/work`, `/research`, `/cv`, `/contact` (academic and professional readers).
- TH is the default for `/creator` and `/links` (the channel's audience is Thai).
- JA: at minimum `/about` and `/research` in phase 3, because Japanese grad-school and employer readers will look for it.

Implementation: route-prefixed locales (`/en/...`, `/th/...`, `/ja/...`) with `hreflang` tags. Not every page needs every language. The language switcher only shows languages that exist for the current page.

## 4. Sitemap

```
/                          Home (switchboard)
├── /about                 Story, timeline, values, portrait, CV download
├── /work                  Case-study index (filters: research · policy · edtech · interpreting; TH · JP · international)
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

Primary navigation (desktop): Work · Research · Creator · Writing · About · Contact, plus a language switch.
Mobile: the same items in a sheet menu.
Footer: socials, email, `/cv`, `/links`, language switch.

## 5. Page specifications

### Home `/`

1. Hero: name, one-line identity, portrait, two buttons ("See my work", "Watch @takumyi").
2. Three doors: Work and Research / Creator / Writing, one sentence each.
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

Candidate case studies, to confirm with the owner (drawn from existing writing samples):

- Broadband School case study
- Digital Classroom (Thailand) versus GIGA School (Japan)
- Education-policy sorting: 47 policies into 8 focus areas, deck presented by the deputy governor to 437 principals
- Scholarship database: 564 organisations, 700+ scholarships
- ESCAP case studies across Japan, Korea, and China
- Thai–Japanese interpreting engagements

### Research `/research`

1. Research interests: three to five named themes, one paragraph each.
2. Current research plan: problem → why it matters in Thailand and Japan → gap → questions → method. Short version on the page, full PDF linked.
3. Publications and papers: list, newest first, with venue and PDF or DOI.
4. Talks and presentations: list with event, date, slides link.
5. Reading and literature notes: link to `/writing` filtered by tag.

### Creator `/creator`

1. Channel identity in one paragraph (Thai first, English below or toggled).
2. What the channel covers: format tiles (explainers, artist showcases, concert recaps, study-abroad, media literacy).
3. Selected videos: six to nine, grouped by format. Show view counts only when they are real and current.
4. Audience and reach: followers, average views, audience split by country and age. Real figures only. Leave a metric blank rather than estimate it.
5. Brand and event collaborations: logo row plus one line each on what was delivered.
6. Media kit: PDF download and a "Work with me" button that opens `/contact` with the reason preset to "brand".

### Writing `/writing` and `/writing/[slug]`

Posts carry a language tag and topic tags. Types: essay, literature note, journal.
Post page: title, date, reading time, language, tags, body, related posts.
Launch rule: the section appears in navigation only once three posts exist.

### CV `/cv`

Rendered from structured data, and the PDF is generated from the same data so the two never diverge. Sections: Education, Experience, Research, Publications, Talks, Skills and languages, Awards.

### Contact `/contact`

Email (obfuscated), a short form (name, email, reason: research / brand / speaking / other, message), and social links. No phone number.

### Links `/links`

Bare mobile page: portrait, name, six to eight buttons (latest video, `/creator`, `/work`, Instagram, YouTube, X, email). No navigation or footer. This is the URL for the TikTok bio.

## 6. Content model

Content lives as Markdown or MDX files with typed frontmatter, one folder per collection. Adding a case study means adding a file. The CV page, the research lists, and the media kit all render from the same data.

| Collection | Key fields |
|---|---|
| `work` | title, slug, type, org, role, period {start, end}, location, summary, headlineNumber, tags, featured, cover, lang, body |
| `publications` | title, authors, venue, year, type (paper / thesis / abstract / poster), url, pdf, abstract |
| `talks` | title, event, date, place, slides, video |
| `videos` | platform, url, title, format, publishedAt, views (optional), thumbnail, topics, featured |
| `collabs` | brand, campaign, date, deliverables, result, url, logo |
| `writing` | title, slug, date, lang, type, tags, summary, cover, body |
| `timeline` | date, title, description, location (TH / JP / other), link |
| `cv` | education[], experience[], skills[], languages[], awards[] |
| UI strings | `en.json`, `th.json`, `ja.json` |

Translation: one file per language sharing the same slug (`work/en/broadband-school.md`, `work/th/broadband-school.md`). A missing translation falls back to English with a small notice.

## 7. Recommended stack

Recommendation: Astro with MDX content collections and Tailwind CSS, deployed on Vercel or Cloudflare Pages.

Why Astro rather than Next.js for this site:

- The site is content, not an application. Astro ships almost no JavaScript by default, which matters for Thai mobile readers arriving from TikTok.
- Content collections give typed frontmatter out of the box, which is exactly the content model above.
- Built-in i18n routing covers `/en`, `/th`, `/ja`.
- Adding a case study or post is adding a Markdown file. There is no CMS to maintain.

When to choose differently:

- To edit content from a phone or from Notion, add a headless layer later. Keystatic edits the same Markdown files through a UI; a Notion sync is also possible.
- If interactive features are expected (dashboards, member areas), Next.js is the safer base.

Supporting pieces: Plausible or Umami for analytics (no cookie banner needed), Resend or Formspree for the contact form, per-page Open Graph images, `sitemap.xml`, and RSS for `/writing`.

## 8. Repository layout

```
personal-website/
├── docs/
│   └── site-structure.md        this plan
├── public/
│   ├── cv/takumi-oshiyama-cv.pdf
│   ├── media-kit/
│   ├── images/
│   └── robots.txt
├── src/
│   ├── content/
│   │   ├── config.ts            collection schemas (zod)
│   │   ├── work/{en,th}/
│   │   ├── writing/{en,th}/
│   │   ├── research/            publications.yaml, talks.yaml
│   │   ├── creator/             videos.yaml, collabs.yaml
│   │   ├── about/               timeline.yaml
│   │   └── cv/                  cv.yaml
│   ├── i18n/                    en.json, th.json, ja.json
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro          redirects to the default locale
│   │   └── [lang]/...
│   └── styles/
├── astro.config.mjs
├── package.json
└── README.md
```

## 9. Cross-cutting requirements

- Performance: Lighthouse 90+ on mobile. Images through Astro's image pipeline. Videos as thumbnails that link out; no autoplaying embeds on the home page.
- Accessibility: semantic headings, alt text on every image, keyboard-navigable menu, WCAG AA colour contrast.
- SEO: per-page title and description, Open Graph image, `hreflang`, Person structured data on `/about`, `sitemap.xml`, RSS for `/writing`.
- Privacy: cookieless analytics only. The contact form forwards messages and does not store them on the site.
- Typography: Latin, Thai, and Japanese faces that harmonise. Candidates: Inter + Noto Sans Thai + Noto Sans JP, or the IBM Plex family, which covers all three scripts.

## 10. Build order

Phase 1, launchable minimum:

1. Scaffold the Astro project with i18n (en, th), base layout, navigation, footer, and theme tokens.
2. Home, About, Contact, `/links`.
3. Work index plus three case studies (English first, Thai optional).
4. Creator page with selected videos and collaborations.
5. CV page plus PDF.
6. Deploy, custom domain, analytics.

Phase 2:

7. Research page with publications and talks data.
8. Writing section with the first three posts and RSS.
9. `/now` page.

Phase 3:

10. Japanese locale for About and Research.
11. Media-kit PDF generated from the same data as `/creator`.
12. Optional CMS layer (Keystatic or Notion sync).

## 11. Open questions

These change the plan materially, so they should be answered before scaffolding:

1. Languages at launch: EN and TH as assumed? Should JA move into phase 1 because of grad-school applications?
2. Priority audience for the next twelve months: admissions committees, employers, or brands? This decides what the hero says and which door comes first.
3. Domain name, and whether it is already registered.
4. Editing preference: adding Markdown files in GitHub, or a CMS UI from day one?
5. Content inventory: which case studies are cleared to publish (some employer work may be confidential), and whether the source PDFs for the research plan and publications are available.
6. Creator statistics: can current TikTok analytics (followers, 28-day views, audience split) be exported so the creator page uses real numbers?
7. Writing section at launch, or hidden until three posts exist?
8. Design references: sites you like, and whether the site should match the @takumyi channel branding (colours, logo) or feel more academic.
9. Hosting preference: Vercel, Cloudflare Pages, or GitHub Pages.
