Skill: impeccable 4.3.1 (version from `.claude/skills/impeccable/SKILL.md`; the vendoring table in `.claude/skills/README.md` labels the same copy "skill 0.1.5"). Source: pbakaus/impeccable at commit `9f42da8`.
Date: 2026-09-21. Run without the skill's launcher (it downloads a binary), so every command below ran in the degraded mode the skill itself describes; section 8 lists what that cost.

# Impeccable applied to the personal site

How to read this file: each numbered section is one of the skill's commands, run against the plan in `docs/site-structure.md`, the three baseline directions in `docs/design-directions.md`, their rendering in `docs/design-preview.html`, and the content in `content/`. The skill's text is guidance; where its defaults conflict with the plan, the plan wins and the conflict is marked "Brief wins". Nothing here changes the plan; the owner still picks a direction.

---

## 1. `init`: product record (the PRODUCT.md equivalent)

`init.md` wants an interview before anything is written and forbids inventing what the interview did not confirm. No person could answer in this session, so every field comes from the plan, the content tree, and the brief, and a field the plan does not settle says "unknown" or "undecided". The record lives here, not at `PRODUCT.md`, because the brief says so. The schema comment is kept so a later real file can copy it.

`<!-- impeccable:product-schema 1 -->`

### Platform

web

### Stack

Astro with MDX content collections reading `content/`, Tailwind CSS, static output. Decided per the brief. The plan's own decision log (site-structure.md section 12) still marks Astro and Cloudflare Pages as "proposal, not yet confirmed"; this record follows the brief and notes the gap. Hosting: Cloudflare Pages recommended, not confirmed. Domain: unknown (takumyi.com suggested, availability unverified). Analytics: cookieless (Plausible or Umami), not chosen. Contact form backend: Resend or Formspree, not chosen.

### Users

Four audiences, weighted equally by owner decision. No audience gets a bigger door.

| Audience | Arrives from | Situation and job | Should land on |
|---|---|---|---|
| Grad-school committees, scholarship reviewers, professors in Japan | Application PDF, email signature | Checking research interests, academic record and writing quality, usually on a laptop, with minutes not seconds | `/research`, `/about`, `/cv` |
| EdTech and education-policy employers, NGOs, international organisations | LinkedIn, referrals | Verifying what he has actually done, with evidence | `/work` |
| Brands, event organisers, media | TikTok or Instagram profile | Judging channel identity, audience size and past collaborations, then booking | `/creator` |
| Followers | TikTok or Instagram bio link | Quick links, latest content, who this person is, on a phone | `/links`, `/` |

The device split (phone for the last two rows, laptop more often for the first two) is inferred from the arrival paths, not confirmed.

### Product purpose

One job: a stranger understands who Takumi is in thirty seconds, then goes deeper in whichever direction they came for. Success is defined structurally by the plan (the right sub-page reached from home in one tap); no measured target exists. Unknown: any conversion or traffic goal.

### Positioning

Working one-line identity: "EdTech researcher working across Thailand and Japan. Creator behind @takumyi."

The mechanism a neighbouring site could not truthfully copy: one person has stood at every end of an education policy, teaching in a Bangkok classroom (Saturday School Foundation at Wat Ang Keaw School), shadowing policy fieldwork (TDRI, 2019), sorting a city's policies inside city hall (BMA, 2023 and 2025), comparing Bangkok's Digital Classroom with Japan's GIGA School (senior thesis, 2024; master's thesis in progress), and taking an EdTech product from Thailand into Japan (Edsy), while running a Thai-language channel that explains Japan to a Thai audience. The plan requires the structure, not only the copy, to show the Thailand and Japan throughline (country tags, a timeline).

### Operating context

- Content is Markdown and YAML in this repository, no CMS. English is the source. Every prose file carries `status: placeholder | draft | published`; only `published` builds; a missing translation falls back to English with the notice string in `content/i18n/en.json`.
- Routes are locale-prefixed from day one (`/en`, `/th`, `/ja`); `hreflang` only for languages that exist for a page; the language switcher shows only the languages available for the current page. Translation order after launch: Thai for `/creator` and `/links`, then Japanese for `/about` and `/research`.
- Data is shared across languages: publications, talks, videos, collaborations, timeline, creator statistics, CV. The web CV and the CV PDF render from one `cv.yaml`; the media-kit PDF is planned from the same data as `/creator`.
- Creator statistics come only from a TikTok analytics export, with the export date shown beside every figure. View counts appear only when real, each with its date.
- Videos are thumbnails that link out; nothing autoplays. The home page has no embeds.
- Contact: obfuscated email, a short form (name, email, reason preset to research / brand / speaking / other, message), social links, no phone number. Messages are forwarded, not stored.
- Editing ritual: adding a case study or post is adding a Markdown file from `content/_templates/`.

### Capabilities and constraints

- Pages: `/`, `/about`, `/work` and `/work/[slug]`, `/research` (optional `/research/[slug]`), `/creator`, `/writing` and `/writing/[slug]`, `/cv`, `/contact`, `/links`, optional `/now`. Each section is its own page; the home page is a switchboard.
- Navigation: Work, Research, Creator, Writing, About, Contact, plus a language switch; the same items in a sheet on phones; footer carries socials, email, `/cv`, `/links`, language switch. Writing enters navigation only once three posts exist. `/links` has no site chrome.
- Case studies use one fixed seven-section structure. The work index filters by type (research, policy, edtech, learning-design, interpreting, media) and by country (TH, JP, international).
- Cross-cutting: Lighthouse 90+ on mobile; images through Astro's pipeline; semantic headings; alt text everywhere; keyboard-navigable menu; WCAG AA contrast; per-page title, description and Open Graph image; `sitemap.xml`; RSS for `/writing`; Person structured data on `/about`.
- Typography must cover Latin, Thai and Japanese from Google Fonts with named families and weights, chosen now although only English ships first.
- Design constraints already decided: neutral toward the four audiences; one accent colour; generous white space; light and dark; mobile-first; nothing that dates fast; no glass, large gradients, bento grids or decorative blobs (design-directions.md, framing).
- Terminology: "case study", "headline number", "door", "switchboard", "media kit", "@takumyi".
- Undecided, do not invent: domain; host; whether YouTube and X accounts exist and should be linked; the channel's start date; the public email address; source PDFs for the research plan, senior thesis and ESCAP paper; confidentiality answers for the Edsy and 2025 Bangkok work; which design direction ships; whether dates on Thai pages use the Buddhist Era.

### Brand commitments

- Name: Takumi Oshiyama. Handle: @takumyi on TikTok and Instagram. LinkedIn: linkedin.com/in/takumioshiyama.
- Voice charter: first person, sincere, real numbers instead of adjectives, no "passionate about" filler.
- Logo, wordmark, channel colours, avatar treatment: none in the repository; unknown whether any exist.
- Portrait photograph: none in the repository; the plan assumes one will be supplied.
- Binding visual constraints volunteered by the owner: neutral, one accent, no audience-specific styling. Three candidate directions exist (Register, Feature, Explainer); Register is the plan's recommendation; none is chosen.

### Evidence on hand

- Eleven case studies drafted in `content/work/en/`, all `status: draft`, each with owner TODOs (what he would do differently, artefacts, covers, figures the CV does not give). Headline numbers present: 437 principals; 10,849 submissions; 3 barriers; 4 markets; 3 countries; 245 students; 80+ applicants for 30+ places; 4 cohorts; 700+ scholarships; 80% on the post-test. One is empty (`bma-teacher-student-ratio-map`). Three are `featured: true`. Location split: nine TH, one JP, one INTL.
- `content/data/cv.yaml` (315 lines) and `timeline.yaml` (25 entries, one TODO for the channel start date) are filled from the CV and résumé. `publications.yaml` holds three entries (a 2027 master's thesis in progress, a 2024 UN ESCAP policy paper, a 2024 senior thesis). `talks.yaml`, `collabs.yaml` and `videos.yaml` are empty. `creator-stats.yaml` is empty by design until the export.
- Absent and not to be fabricated: follower counts, view counts, audience splits, brand logos, testimonials, video thumbnails, the portrait, case-study covers, the names of the eight BMA focus areas, the UNESCO selection result, any press.

### Product principles

1. Neutral by construction: the same page serves a committee and a follower, and no door is bigger than another.
2. Evidence over adjectives: every claim is a number, a date, an artefact or a name, and figures carry the date they were true.
3. Structure carries the throughline: country and time are visible in layout and data, not only in prose.
4. Three scripts, one site: Thai and Japanese are designed for now, so a later translation changes no layout and no URL.
5. Fast from a bio link: nothing loads that the first viewport on a phone does not need.

### Accessibility and inclusion

WCAG AA contrast in both themes; semantic heading order; alt text on every image; keyboard-navigable menu and visible focus; `prefers-reduced-motion` honoured; script-correct line breaking, line height and underline offset for Thai and Japanese (section 6). No further user-specific need was recorded; unknown whether any reader relies on a screen reader or on text scaling.

---

## 2. Mode per surface

The skill names four modes and says to choose the mode from the requested surface, not the product; its line "Portfolios, galleries, showcases" under Experience is an example, not a rule that every page of a portfolio is Experience. The plan's neutrality decision (no door bigger than another, no section trying to be the whole site) means no artefact leads any whole page, which is what Experience requires. Result: no surface here is Experience.

| Surface | Mode | Reasoning | Brief wins? |
|---|---|---|---|
| Home `/` | Operate, with the first viewport held to Persuade's test | The visitor's job is routing: read one line, pick one of three doors. That is a task, so scanability, consistency and equal weight outrank expression. The first viewport still has to pass the skill's Persuade check (know what this is, why it matters, what to do, within seconds) because it is where strangers arrive. Not Experience: a switchboard has nothing to be inside of. | Yes: the skill's portfolio default would put an artefact in the first viewport; the plan puts name, one line, two buttons and three equal doors. |
| `/work` index | Operate | Filter, scan, pick. The critique reference's own rule for portfolio indexes applies: one decision per screen (which piece to open). | No conflict. |
| Case study `/work/[slug]` | Read | The reader's question is "what did he actually do, and what shows it". The fixed seven-section structure is comprehension structure. Where a case study owns a real artefact (a map, a slide), it leads its own section, not the page. | No conflict. |
| `/research` | Read | Interests, a plan summary, lists of publications and talks with PDFs. Committee readers come to understand and verify. | No conflict. |
| `/creator` | Persuade, with one Experience block | The brand manager decides and acts (media kit, "Work with me"); the page sequence is offer, proof (real figures with export dates, collaborations), action. The selected-videos block is where the work leads and where followers coming from `/links` are served. Neutral still applies: Persuade here is sequence and proof, not volume. | Partly: the skill's Persuade permits committed colour and display type; the plan's one-accent, no-counters-on-home rules stand. |
| Writing post `/writing/[slug]` | Read | An essay, a literature note, a journal entry. | No conflict. |
| `/links` | Operate | A column of six to eight buttons on a phone, no chrome. Thumb reach and target size are the whole design. | No conflict. |

Consequence for the rest of this file: the skill's own rules for Operate and Read (restrained colour strategy, workhorse faces are acceptable, predictable structure, rarity gives the accent force) line up with the plan's neutrality decision, so the two authorities mostly agree.

---

## 3. `critique`: the three baseline directions against `docs/design-preview.html`

DEGRADED: single-context (no sub-agent tool is exposed in this session; the detector `impeccable detect` needs the launcher, which downloads a binary and was not run; no browser was available). The skill requires this banner as the first line of a degraded critique; its version carries a warning emoji, dropped here for house style. Assessment A (design review) was done from the preview's source and the direction document. Assessment B (mechanical) was done by hand: contrast ratios computed (section 4 has the snippet), reading measures estimated from font metrics, and the craft-floor list walked manually.

Target: `docs/design-preview.html`, a comparison page that renders, for each direction, the home hero, the three doors, one case-study card, one video card, a trilingual type specimen and a palette, in light and dark. It is not the site: it has no forms, no errors, no help, no navigation. Heuristics 5 (error prevention), 9 (error recovery) and 10 (help) are therefore `n/a` for all three, and the applicable maximum is 28. Heuristic 3 (user control) is scored on what the mock shows (theme toggle, no traps, no modals).

### Design health scores

| # | Heuristic | Register | Feature | Explainer | Key issue that separates them |
|---|---|---|---|---|---|
| 1 | Visibility of system status | 3 | 3 | 3 | All three specify hover, focus and active-nav states; none shows a current-location cue beyond the nav underline. |
| 2 | Match system and real world | 3 | 3 | 3 | Register's "TH / JP" tags in uppercase mono read as codes; Feature spells "Thailand / Japan"; Explainer labels doors "Open", which says nothing the link does not already say. |
| 3 | User control and freedom | 3 | 3 | 3 | Theme toggle with `aria-pressed`, no traps. No skip link in any. |
| 4 | Consistency and standards | 4 | 3 | 3 | Register: one family, one scale, one card grammar. Feature: the hero's secondary action is a styled link beside a filled button. Explainer: tags and filter chips share one shape while one is static and one is a control. |
| 5 | Error prevention | n/a | n/a | n/a | No inputs in the target. |
| 6 | Recognition rather than recall | 3 | 2 | 3 | Feature's borderless cards give no visible click region at rest; hover changes only the title colour, and touch has no hover. |
| 7 | Flexibility and efficiency | 3 | 2 | 3 | Feature's 18 px serif and 96 px section spacing make the home page the longest scroll on a phone; Register's tables scan fastest. |
| 8 | Aesthetic and minimalist design | 3 | 3 | 2 | Explainer stacks three emphasised elements per card (chip row, 700 title, display-size number); Register and Feature stack two. |
| 9 | Error recovery | n/a | n/a | n/a | No error states in the target. |
| 10 | Help and documentation | n/a | n/a | n/a | A personal site's home needs no help system. |
| | Total | 22/28 (79%, Good) | 19/28 (68%, Acceptable) | 20/28 (71%, Good) | |

The scores are close because the three directions share one HTML skeleton and differ in CSS. The differences that matter are in the findings, not the totals.

### Design specificity verdict

- Register: authored for this product in its logic (one family across three scripts, numbers as content), but its clothes sit inside the skill's third calibration cluster (hairline tables, small tracked mono labels), and IBM Plex is on the skill's list of faces that mean "you stopped looking". The document's reason for Plex, one family whose Thai and Japanese were drawn to the Latin's metrics with a looped Thai variant in the same family, is a reason no other Google Fonts family except Noto satisfies, so Plex passes the skill's own test ("a reason no other face could satisfy"). The mono labels do not; see the first Register finding.
- Feature: the skill's first cluster (warm paper, high-contrast serif display, one deep accent) answered by avoidance: the document says the paper is "a faint cool pink-grey rather than cream, so it does not slide into the cream-and-terracotta look". The skill's test is that a design guessable from "category plus avoidance" has failed the self-check. Feature is the category-plus-avoidance answer. This is a warning for the choice, not a defect in the work.
- Explainer: the most product-specific of the three in its origin (a Bangkok-drawn family, the channel's register) and the least specific in its components (rounded bordered cards, pill chips, hover lift), which are the defaults of every learning-product site.
- All three: same-size door cards of heading plus text as the first structure after the hero. This is the craft floor's first "refuse" item. Brief wins: the plan pins three doors of equal size. The skill's reflex still applies inside the brief: equal weight does not require boxes; three rows of one list are equal too. Direction F (section 4) does that.

### Verified: the colour claims

Every contrast figure in `docs/design-directions.md` matches a WCAG 2 computation within 0.1 (for example Register text on bg 15.69 light, 15.16 dark; Explainer amber on white 1.86). The dark themes are composed, not inverted: surface sits above bg, accent is lighter, accent-text is dark. That is a strength the skill's colorize reference asks for and rarely gets.

### Findings: Register

1. [P1] "Tags are mono, uppercase, 12 px, letter-spacing 0.06 em" and "dates, counts, tags" in mono. The craft floor allows monospace for code, data and measurement, not as a costume; dates and counts qualify, tags do not. Worse, the tag style has no Thai form: Thai has no case, and letter-spacing breaks Thai's combining marks (section 6). Fix: numbers and dates stay in Plex Mono with `font-variant-numeric: tabular-nums`; tags become Plex Sans 13 px 500, no uppercase, no tracking, and on Thai pages the same rule applies without exception. Command: `typeset`.
2. [P1] "Case-study covers: 16:10, a flat single-colour field carrying one number", rendered in the preview as "47 → 8" at up to 64 px on the accent fill. This is the craft floor's hero-metric template, and eleven cards make a stat-tile grid; it also breaks the direction's own one-accent discipline, because every cover is an accent block. Brief wins on the number itself (the plan pins one headline number per card). Fix: the number lives in the meta line at lead size, 500 weight, mono; the cover is used only when a real artefact crop exists (a slide, a map, a table) with a 1 px border, and there is no cover otherwise. Command: `layout`.
3. [P2] "reading column 680 px" at 16 px. With Plex Sans's average advance near 0.48 em that is about 88 characters a line; typeset asks for 45 to 75 and the craft floor for 65 to 75. Fix: prose `max-width: 64ch` (about 610 px at 16 px); tables may still use the 1120 px container. Verify with a real case-study paragraph at every breakpoint. Command: `typeset`.
4. [P2] "Cards have a mono meta line at the top (organisation, year, headline number), the title in h3". The scan begins with the organisation, not the title; the craft floor's kicker ban is about labels, but the effect is the same: the heading is second. Fix: title first, meta second, tags last or as table columns. Command: `layout`.
5. [P2] "Focus ring 2 px in accent". Teal on the light bg is 6.0:1, but on the teal primary button the ring is accent on accent and vanishes. Fix: a double ring (`outline: 2px solid var(--accent); outline-offset: 2px; box-shadow: 0 0 0 2px var(--bg)`) or a ring in text colour. Command: `harden`.
6. [P2] "Buttons: square corners, 40 px tall". Below the 44 px touch floor the personas reference uses; the document already raises `/links` to 48 px because square corners "make buttons feel smaller than they are". Fix: 44 px everywhere, 48 px on `/links`. Command: `adapt`.
7. [P3] The door arrow is the glyph "→" in the accent colour. The craft floor names Unicode glyphs standing in for icons. Fix: the whole door is the link; drop the arrow, or draw one chevron as inline SVG with a 1.5 px stroke and `aria-hidden`. Command: `polish`.

### Findings: Feature

1. [P1] "Cards have no border and no fill; each begins with a 1 px top rule" and "hover changes the text to accent". The click region is invisible at rest and hover does not exist on touch. Fix: the card is one `<a>` with an affordance at rest (top rule in text colour for linked cards, border colour for static blocks) and a focus ring around the whole card. Command: `harden`.
2. [P1] Six families ("roughly 60 to 90 KB of woff2 on first load", the document's own risk) plus "the home hero fades in over 240 ms". With `display=swap`, the first paint shows fallbacks, the swap reflows, and the reflow lands inside the fade. Fix: drop the fade (the craft floor wants one authored moment from an already-visible default, and a fade from 0.6 earns nothing); load Thai and Japanese slices only on pages in those languages (Google Fonts already serves `unicode-range` slices); preload only the Latin serif 400. Command: `optimize`.
3. [P2] "Secondary is plain text with a trailing arrow and an accent underline" next to a filled primary in the hero. Two actions of equal rank in two component classes; the same arrow then appears on the doors as decoration. Fix: both hero actions are buttons; arrows only on links that leave the site. Command: `clarify`.
4. [P2] Two statements contradict each other: "`:lang(th)` at 1.05 em" (18 × 1.05 = 18.9 px body) and the risk note "Noto Serif Thai loses its loops below 16 px on low-density Android screens, so Thai body text has to stay at 19 px or larger", while meta is 14 px and small is 15 px in Noto Sans Thai. Fix: a Thai floor of 15 px for the sans roles and 19 px for the serif roles, written as tokens, and a check on a 1x Android device. Command: `harden`.
5. [P2] "reading column 640 px (about 65 characters at 18 px)". With Source Serif 4's average advance near 0.45 em, 640 px holds about 79 characters. Fix: `max-width: 62ch`. Command: `typeset`.
6. [P3] The cover in the preview sets the number in plum at 64 px on the pink-grey surface (8.6:1, passes) and makes it the largest element on the card; same hero-metric finding as Register, same fix.

### Findings: Explainer

1. [P1] The document's rule "if the accent is used on more than one element per screen the page turns into a startup landing page" is broken by its own components on `/work`: "Filter chips ... switch to filled accent when active", "Primary is filled amber", "2 px amber underline" on links. One screen, three amber elements. Fix: the active chip is filled text colour with bg text; links keep the underline; the button stays the only amber fill. Command: `colorize`.
2. [P1] "Tags are chips: surface fill, 13 px, 500 weight, 999 px radius" and "Filter chips are filled surface with a 999 px radius". Static tags and interactive filters share one component. Fix: tags become plain 13 px text separated by middle dots; the pill shape is reserved for controls. Command: `clarify`.
3. [P2] "Cards raise a 1 px border-colour change and a 2 px translate on hover at 150 ms" and "Buttons press 1 px on active". The lift is the rounded-card hover reflex the craft floor names; it never fires on touch, which is most of this direction's audience. Fix: border colour change only. Command: `quieter`.
4. [P2] "Case-study covers: ... the headline number set at display size" plus 700 headings plus a chip row: three emphasised elements per card (heuristic 8). Fix: as Register, number in the meta line, cover only for artefacts. Command: `layout`.
5. [P2] "reading column 720 px" at 17 px is about 88 characters. Fix: `max-width: 64ch`. Command: `typeset`.
6. [P2] "Anuphan has no italics, so emphasis is done with 600 weight rather than slant". Nothing in the tokens enforces it, so `<em>` in a case study renders as a synthetic slant. Fix: `em { font-style: normal; font-weight: 600 }` scoped to the family, and a rule for cited titles. Command: `typeset`.
7. [P3] Door label "Open" where the other directions use an arrow. Whichever direction ships, one pattern: the door is the link, the label is the door title.

### Findings shared by all three (preview and specification level)

1. [P1] Content edge: `bma-teacher-student-ratio-map` has `headlineNumber: ""`, so the meta line "Bangkok Metropolitan Administration · 2025 · " ends in a dangling separator in every direction. Fix: the template joins only non-empty parts. Command: `harden`.
2. [P1] `/work` shows two filter groups (six types, three countries) above the cards. The critique reference's own example of overload is a portfolio index with "filter, sort, and tag controls all at once". Fix: country as a three-way segmented control (plus All), type as a `<select>` on phones and text chips on desktop; or group the index by type so no type control is needed. Command: `distill`.
3. [P2] Nothing in any direction themes the browser surfaces the craft floor lists: `::selection`, `caret-color`, `accent-color` for native controls, scrollbar colour, `text-underline-offset` for Thai, tabular numerals in tables. Add them to the token set of whichever direction ships. Command: `polish`.
4. [P2] The video card's play triangle is drawn with CSS borders on a muted fill. Fine as a placeholder; the build needs either a drawn icon in the site's stroke or no icon at all (the row is a link, and "TikTok · 0:48" says what it is).
5. [P3] `overflow-wrap: anywhere` on every `p`, `h1`, `h2`, `h3` is safe for Thai and Japanese (it only fires when no dictionary or kinsoku break exists) but `line-break: strict` for `:lang(ja)` is missing, so a line can begin with 。or 、. Section 6 has the rule.
6. Preview only: the "Direction A / B / C" kicker above each direction name is the craft floor's one outright ban (a kicker above a heading). It is comparison chrome, not part of any direction, and needs no action.

### Cognitive load (home page as previewed)

Checklist failures: minimal choices (the desktop first viewport offers two buttons, three doors, six navigation items and a language switch, twelve options against the reference's four) and, at launch, nothing else. Brief wins on the count: the plan pins six navigation items, and Writing is hidden until three posts exist, so launch has five. Moderate load, not critical. The fix inside the brief is order, not removal: the two buttons are the only controls above the fold on phones; the doors follow; navigation collapses to a sheet.

### Persona red flags

- Casey (one-handed phone, from a TikTok bio link, possibly on 3G): Register's 40 px buttons are under the thumb floor; Feature loads six families before the first real paint; all three put the two hero actions at the top of the screen, which is acceptable on `/` because the doors follow, and correct on `/links` where the buttons are a column.
- Sam (screen reader and keyboard): decorative arrows read as "right arrow" unless `aria-hidden`; Feature's borderless cards give no focus boundary; Register's and Feature's accent focus ring disappears on the accent button; the theme toggle's `aria-pressed` is right.
- Jordan (a brand manager who has never seen the site, five seconds): the door "Work and Research" is two audiences in one label, and "Creator" is the third door in every direction. Equal size keeps this fair; Register's mono tags and Feature's serif slow this reader most.
- Project persona, the committee reader (a professor opening the link from an application PDF, two minutes, wants the research plan and PDFs): none of the previews shows `/research`; the finding is that all three directions specify list styles for publications but none specifies where the PDF link sits in the row. Put it at the row's end, right-aligned, as a labelled link, not an icon.

### Questions the owner should answer before scaffolding

- Which matters more on `/work`: filtering by type, or a grouped index that needs no controls?
- Should case-study covers exist at all before real artefacts are cleared for publication?
- Is Register's Plex Mono for numbers a taste the owner shares, or would tabular figures in the sans do the same job?

Questions skipped: the skill requires two to four targeted questions with answer options after three or more priority issues, and this run had no one to answer them; the questions above are listed for the owner instead.

---

## 4. `new-work`: Direction F

### Process, as new-work.md orders it

Step 1, the mechanism and the scene. Mechanism: one person who has stood at every end of an education policy in two countries, and who explains one of those countries to the other in its own language. Scene: a follower on a phone on the BTS at night; a professor at a desk in Tokyo in the afternoon; an employer on LinkedIn between meetings; a brand manager on a phone with the TikTok profile still open. Cultural home: Bangkok and Tokyo, classrooms, city hall, stations, screens. What the home page must prove: who this is in one line, and that the three ways in are equal.

The rut, kept out of the candidate list: the page this category always ships (a mood hero with a portrait, a grid of project cards, an "about me" paragraph, a row of social icons) and its predictable opposite (a black-and-white monospace "terminal" portfolio). The brief's own metaphor, the switchboard, gets its one literal candidate below and no more.

Step 2, seven concrete systems from the audience's world, ordered by resonance, spanning four material families:

| # | Candidate | Family | Why it resonates and can carry the mechanism | Verdict |
|---|---|---|---|---|
| 1 | Station wayfinding boards (Tokyo Metro, JR, BTS) | Signage | Every one of the four audiences reads it daily; it sets three scripts at one size and weight; each board answers one question, where next, which is the home page's job; colour is the board, not the words; it has not changed in twenty years. | Assigned direction |
| 2 | Survey map sheet with legend and index to adjoining sheets (GSI, Royal Thai Survey) | Cartography | Two case studies are literally maps; the "index to adjoining sheets" is a switchboard drawn as a diagram; one highlight on a neutral base. | Competitive: strong for `/work`, but the marginalia become costume on `/creator` and `/links` |
| 3 | Bilingual dictionary entry (Thai and Japanese) | Reference book | The interpreter's own artefact: headword, two scripts on one line, numbered senses, examples. | Declined: the skill warns that "books wanting a serif" is the association to break, and the entry grammar has no home for videos or statistics |
| 4 | School record and transcript (Thai ปพ.1, Japanese 通知表) | Paper record | Ruled tables, stamps, one entry per line; both audiences held one at school. | Declined: near-duplicate of Register ("a well-kept record") and reads juvenile at scale |
| 5 | Japanese conference proceedings page (two columns, kiyō) | Academic print | Committees know it by heart. | Declined: leans academic, which the plan forbids |
| 6 | The vertical video frame with burned-in captions | Screen | Followers know it by heart. | Declined: leans creator, which the plan forbids |
| 7 | The telephone switchboard (the brief's literal metaphor) | Machine | Jacks, cords, a labelled panel. | Declined: costume; it explains nothing a visitor needs and dates instantly |

Step 3 and 4, the roll. `impeccable concept-seed --scope direction --mode operate` was not run (the launcher downloads a binary). The skill says that on a new world, writing artefact code before the roll is a contract violation; no code is written here. Without the roll there are no dealt challengers, so candidate 1 is presented as the skill's own "pick card" would be: the top-ranked grounded candidate, with the honest familiarity line the skill requires: public wayfinding is where many designers land for multilingual sites, and its familiarity is the point for a neutral brief. The standing exit the skill always offers (the category standard played straight) already exists in this repository: the three baseline directions. No re-roll was made; the owner may ask for one when the launcher is available.

Saturated-pattern checks and how F routes around them:

- The skill's list of default faces (Fraunces, Playfair, IBM Plex, Inter as display, Space Grotesk, DM Sans and so on): F uses none.
- The three calibration clusters (cream paper with serif display and terracotta; near-black with neon and glow; broadsheet hairlines with italic serif and tracked mono labels): F's ground is cool off-white or a black board, its type is a two-weight gothic set, there are no hairline-and-mono labels and no italic display.
- The craft floor's refuse list: no card grid (rows on a board), no hero-metric covers, no kicker, no section numbers, no mono costume, no Unicode icons, no glyph arrows, no hover lift, no glass.
- The category rut: no mood hero, no card grid, no social icon row on the home page (the socials live in the footer and on `/links`).
- Colour strategy per new-work step 4: Restrained (neutrals plus one accent), which the skill names as the default when the visitor came to operate or read, and which the plan's one-accent rule pins anyway. Light or dark from the scene: the follower on the BTS at 22:00 has the OS in dark; the professor at 14:00 has it in light. Both ship and follow the OS; the dark theme is the black concourse board, the world's own night state, not an inversion.

### Direction F: Concourse

**Concept.** The site is set like the wayfinding of a station concourse: every screen answers one question, where next, in type made for reading at a glance, with Latin, Thai and Japanese set the way a bilingual sign sets them, same size, same weight, one under the other. Colour is a board, not a highlight: one guide-sign blue owns the primary action and the active route, and every other word is black or white on the ground.

**Who it feels right to and why.** Committees and employers in Japan read BIZ UD Gothic every week (it ships in Windows and in municipal print) and Thai readers have seen Sarabun on every official letter and school certificate since 2010, so the site reads as public-grade without reading as academic: no serif, no two-column page, no citation styling. Brands see a page whose structure is already a media kit: rows, a right-aligned number per row, one button. Followers arriving from a bio link recognise the register of the stations they ride and of the Japanese signage that appears in the channel's own videos; nothing shouts, and the page loads six font files. It avoids creator styling (no poster grid, no counters on home, no brand colours) and academic styling (no serif, no journal layout). It is neutral by construction: a sign treats every destination the same.

**Typography.** All three families were drawn for public reading and all three ship 400 and 700, so no script has a weight another lacks.

| Script | Family (Google Fonts) | Weights | Role |
|---|---|---|---|
| Latin | Overpass | 400, 700, italic 400 | body, UI, headings; also Latin letters and digits inside Thai and Japanese text |
| Thai | Sarabun | 400, 700, italic 400 | Thai glyphs only (listed after Overpass in the stack) |
| Japanese | BIZ UDPGothic | 400, 700 | Japanese glyphs only (listed last) |

Why they pair: Overpass is a digital descendant of the FHWA Highway Gothic series, the Latin of road signage. Sarabun is the Thai government's standard document face (one of the national fonts adopted by cabinet resolution in 2010). BIZ UDPGothic is Morisawa's universal-design gothic in its proportional cut, bundled with Windows since 2018. All three have large x-heights and open counters, and none has a weight the others cannot answer. Sarabun's Thai is drawn small relative to Overpass's x-height, so `:lang(th)` runs at 1.125 em (18 px on the 16 px base) with line-height 1.7; confirm this in the specimen, and if it fails, Noto Sans Thai Looped (variable, 100 to 900) is the substitute with the same formality. BIZ UDPGothic's 700 was drawn for legibility and does not clog at 24 px and above, so Japanese headings keep 700; Japanese has no italics, so `em:lang(ja)` uses 700 or 「」. Tables use `font-variant-numeric: tabular-nums`; if the specimen shows Overpass lacks tabular figures, the number column alone uses Overpass Mono 400, which is data, not costume.

Type scale (base 16 px, ratio about 1.2, two weights):

| Step | Size | Weight | Use |
|---|---|---|---|
| meta | 14 px | 400, text-muted | dates, counts, organisation, format |
| body | 16 px | 400 | running text |
| lead | 18 px | 400 | identity line, summaries |
| h3 | 20 px | 700 | row titles, door titles |
| h2 | 24 px | 700 | section titles |
| h1 | 30 px | 700 | page titles (the sign head) |
| display | clamp(32 px, 8vw, 44 px) | 700 | the name on the home page only |

Script adjustments: `:lang(th)` body 1.125 em, line-height 1.7, headings line-height 1.35, `text-underline-offset: 0.25em`, never any letter-spacing or uppercase transform. `:lang(ja)` same size, line-height 1.8, headings line-height 1.4, `line-break: strict`, never letter-spacing on 700. Latin body line-height 1.55.

**Colour tokens.** Restrained: neutrals plus one accent. The neutrals lean cool so the blue sits in them.

| Token | Light | Dark |
|---|---|---|
| bg | #F4F5F7 | #101317 |
| surface | #FFFFFF | #181C22 |
| text | #14171C | #E9ECF1 |
| text-muted | #555B66 | #A2AAB6 |
| border | #C9CED6 | #2B313B |
| accent | #1E4FB0 | #8EB5F8 |
| accent-text | #FFFFFF | #0C1730 |

Contrast, computed with the WCAG 2 relative-luminance formula (snippet below), not estimated:

| Pair | Light | Dark |
|---|---|---|
| text on bg | 16.5:1 | 15.7:1 |
| text on surface | 18.0:1 | 14.4:1 |
| text-muted on bg | 6.3:1 | 8.0:1 |
| text-muted on surface | 6.8:1 | 7.3:1 |
| accent-text on accent | 7.5:1 | 8.6:1 |
| accent on bg (if ever used as text or as a 2 px underline) | 6.9:1 | 9.0:1 |
| accent on surface | 7.5:1 | 8.2:1 |
| border on bg (hairlines, not controls) | 1.45:1 | 1.42:1 |

```python
def lum(h):
    h = h.lstrip('#'); r, g, b = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
def cr(a, b):
    la, lb = lum(a), lum(b); hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)
print(round(cr('#14171C', '#F4F5F7'), 2), round(cr('#FFFFFF', '#1E4FB0'), 2))   # 16.47 7.5
```

Rules that follow from the world and the numbers: the accent is a fill or a line, never a word. It appears as the primary button, the active filter, the 3 px bar under the active navigation item, the 2 px link underline, the focus ring and `::selection`. Link text stays in text colour in both themes. One accent fill per viewport besides underlines. Form field borders use text-muted, not border, because a control boundary needs 3:1 and a hairline does not.

**Layout and grid.** Container 1120 px; prose `max-width: 64ch` (about 74 characters in Overpass at 16 px). Spacing on an 8 px scale: 4, 8, 12, 16, 24, 32, 48, 64, 96. Section spacing 64 px on desktop, 48 px on phones. The one structure is the board: a list with a 2 px rule in text colour at its top (the sign's frame) and 1 px rules in border colour between rows, no side borders, no fills, no boxes. A row has up to three columns on desktop (a plate or a thumbnail, then title and one line, then a number or a date right-aligned in tabular figures) and stacks to two lines on phones.

- Home: sign head (name at display, identity line at lead, portrait 4:5 at 144 px to the right on desktop and 96 px beside the name on phones, two buttons), then the directory board (the three doors as three rows of equal height, title 700 and one line 400 muted), then featured work as a board (plate TH/JP/INTL, organisation and year, title, headline number), then latest videos as a board (72 × 128 thumbnail, title, format and date), then latest writing (absent while empty), then the contact strip as one final row with one button.
- `/work`: a country segmented control (All, TH, JP, INTL) above the board; type as a `<select>` on phones and text chips on desktop; rows as on home.
- Case study: sign head (title, then one meta line: organisation · role · period · location), the seven sections in the prose column, and the "What the evidence showed" section may carry a small board of numbers.
- `/creator`: sign head, formats as a board, selected videos as boards grouped by format, reach as a board of figures with the export date in its head, collaborations as rows (logo at 24 px, one line), media kit as the page's one primary button.
- `/links`: one board of 48 px rows at full width, no chrome, the first row the most current.
- Corner radius 4 px on buttons and plates, 0 everywhere else.

**Component character.** Buttons 44 px tall (48 px on `/links`), 4 px radius, 700 at 16 px; primary is accent fill with accent-text, secondary is a 1 px border in text colour; both are real `<a>` or `<button>` elements, never a styled span. Links in running text: text colour, 2 px accent underline, offset 0.15 em (0.25 em under Thai), `text-decoration-skip-ink: auto`, hover thickens to 3 px. Navigation: one row at 400, the active item at 700 with a 3 px accent bar beneath; a sheet on phones. Plates: two- or four-letter codes (TH, JP, INTL) in a 1 px border, 12 px 700, 2 px by 6 px padding, 4 px radius, used only where a row can be sorted by them and never above a heading. No chips as tags: types appear as words in the meta line. The language line: beneath each h1, the page's title in each language the page exists in, as plain links (EN · TH · JA), the way a bilingual sign stacks its scripts; on an English-only page the line is absent. This is the language switcher the plan asks for (only languages available for the current page) and it is the direction's one signature component.

**Motion.** One authored moment: the navigation bar slides between items on hover and focus (transform only, 160 ms, `cubic-bezier(0.2, 0, 0, 1)`). Link underlines change thickness at 120 ms. Nothing enters, nothing lifts, nothing fades. `prefers-reduced-motion` makes the slide an instant change.

**Imagery guidance.** Portrait: a 4:5 colour photograph in natural light, 144 px wide on the home page and 240 px on `/about`, 4 px radius, no cut-out, no circle. Video thumbnails: 9:16 at 72 px wide in rows, never a poster grid, with a meta line of platform and date and no play glyph (the row is the link). Case-study covers only where a real artefact exists (a slide, a map, a table crop) at 16:10 with a 1 px border; the headline number is text in the row, never a cover. Open Graph image: the sign head (name, identity line) in white on the blue board. Collaboration logos at 24 px tall in a row, greyscale in neither theme (logos keep their colour; the rule is size).

**References.**

1. Tokyo Metro sign system, Hiromura Design Office (2004): bilingual boards, one weight, colour carried by the band, every other word black or white.
2. Digital Agency of Japan design system (design.digital.go.jp): a public-sector system built on Google Fonts (Noto Sans JP) with an accent reserved for actions; the nearest working example of "official but not academic" for Japanese readers.
3. GOV.UK Design System typography: a signage-descended face (GDS Transport) carrying long reading on cheap phones, which shows that a road-sign register holds for reading.

**Risks.** Blue is the web's default link colour, so the fill-only rule is load-bearing; the moment blue becomes text, the direction reads as a default. Overpass's rounded terminals at 700 and display size can read sporty; keep 700 at 20 px and above only and never letterspace it. Sarabun is looped and formal; followers may read it as official; the substitute is named above. BIZ UDPGothic has only two weights, so Japanese hierarchy leans on size and muted colour. Wayfinding turns into costume fast: roundels, line colours, pictograms and station-number badges are excluded from this direction by rule; its grammar is rows, plates, the board and stacked scripts. Japanese pages will download more font bytes than English pages (Google Fonts slices BIZ UDPGothic into many `unicode-range` ranges; only used ranges download, but a kanji-heavy page uses many). Overpass's tabular figures need verifying in the specimen. The two-column-sign metaphor gives `/creator` the least room for photography; if brand work grows, that page will want the imagery rules widened.

**Neutrality check.** Same board on every page; no door bigger; no counters on home; no serif; no poster grid; no brand colour; a committee page and a follower page differ only in content.

**Direction contract (the six blocks new-work asks for; no seed key because the roll did not run).**

- THESIS: A personal site as a concourse: each screen is a sign that answers "where next" and nothing else. It refuses the portfolio arrangement of mood hero, card grid and social strip.
- OWN-WORLD: cool off-white ground or black board; words in near-black or white; one guide-sign blue as fill and line only; Overpass, Sarabun and BIZ UDPGothic at 400 and 700; boards with a 2 px head rule and 1 px row rules, no boxes; two-letter plates; 4 px radius on buttons and plates. With all copy removed it is still recognisable as a directory board with one blue button.
- STORY: The visitor reads one line about who this is, sees three destinations of equal weight, picks one, and on every page finds the same board with the numbers on the right and the way back at the top.
- FIRST VIEWPORT: On a 390 px phone: name, identity line, the primary button (blue, full width) and the secondary button beneath it, then the directory board's head rule and its first row already visible. On a 1280 px desktop: the sign head in the left seven columns with the 144 px portrait at the right edge, the board below at container width with all three rows visible; the primary button sits under the identity line.
- FORM: public wayfinding board; candidate 1 of 7; seed key: none (concept-seed not run).
- FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

---

## 5. `bolder` on Register and `quieter` on Explainer

### `bolder` Register

bolder.md's rule: amplify what the system already owns, make one decisive move and quiet everything around it, add no colour, font or primitive, keep every claim true. Register's own strongest moves are the table, the mono numerals and the square corner. The move: Register stops being cards and becomes a ledger.

| Now | After | Why |
|---|---|---|
| Hero: portrait 96 px, name 40 px, identity line, two buttons; the record device begins only at the cards below. | The hero is the first row of the record: name at `clamp(40px, 6vw, 56px)` 600 with tracking -0.02 em, identity line at h2 size 400, and directly beneath it the three doors as a three-row table (Work and Research, Creator, Writing) with a mono first column giving a real count from the content (11 case studies, 5 formats; Writing hidden until three posts). | The skeleton test: with copy removed the first viewport already says "record". The counts are computed from `content/`, so no claim is invented. |
| Three doors as three same-size bordered cards. | Three rows of one table, equal height, hairline dividers, whole row a link. | Equal weight without boxes; the brief's equality holds, the craft floor's card default goes. |
| Featured work: three bordered cards with a giant "47 → 8" cover. | Three full-width rows: year (mono) · TH plate · organisation · title (h3) · headline number right-aligned (mono, 500, lead size). No cover. | The system's own device at full strength; the hero-metric template is removed; the number is still the loudest thing in the row, by weight and position rather than by size. |
| Country appears as a mono uppercase tag among other tags. | Country is the table's first data column on every list (work, timeline, publications), and the filter on `/work` is a column header. | The plan asks the structure, not the copy, to show the Thailand and Japan throughline. |
| Tags: mono, uppercase, tracked, bordered. | No tags; type and country are columns, and the type word appears once in the meta at 500. | The mono costume goes; the Thai form of the tag no longer needs uppercase or tracking. |
| Accent on the primary button, link underlines, focus ring and every cover. | Accent on the primary button, the active nav underline and link underlines only. | Commit, then clarify: with the covers gone, the one blue button is the peak of the page. |
| Cards and doors carry 1 px borders on all sides on the surface colour. | Rows carry a 1 px bottom rule only; the sole fully bordered elements left are the secondary button and the plates. | Quieting the surroundings is what makes the ledger legible as a decision. |
| `/links`: the same components at full width, 48 px. | Unchanged. | Scope is sovereign: bolder was asked of the record, not the bio page. |

### `quieter` Explainer

quieter.md's rule: reduce intensity without losing the point of view; desaturate to 70 to 85%, reduce weights (700 to 500 or 600), fewer colours, more air, no bounce, flatter cards; never grayscale, never uniform. Explainer's sources of intensity: 700 headings, the amber fill, pill chips, 12 px radius, hover lift and press. The point of view that survives: directness, one button that is obviously the thing to press, Thai and Latin from one family.

| Now | After | Why |
|---|---|---|
| Headings 700 (h1, h2, display), 600 (h3); Zen Kaku JP 700. | h1 and h2 at 600, h3 at 500, display at 600; Zen Kaku JP at 500 for h1 to h3, 700 for display only. | Weight was doing the work size can do; the scale still has obvious steps. |
| Type scale ratio 1.25 (display 44, h1 34, h2 27). | Ratio 1.2 (display 40, h1 32, h2 26, h3 22); body stays 17 px. | Smaller jumps read calmer; the 17 px body and short lines that give Explainer its directness stay. |
| Accent #F0B429 at full chroma; used on the primary button, active chips, link underlines. | Accent #E4B24A (about 80% of the chroma; dark text on it 8.8:1; still 1.95:1 on white so the fill-only rule stays). Used on the primary button and link underlines; the active chip becomes text-colour fill with bg text. | One amber element per screen, as the direction's own rule already says; the hue keeps its warmth. |
| Tags as pill chips, surface fill, 999 px radius; filter chips the same shape. | Tags as 13 px 500 text separated by middle dots; the pill shape is reserved for filter controls, with a 1 px border instead of a fill. | Static and interactive elements stop sharing a shape; two fills leave every card. |
| Cards: 12 px radius, 1 px border, surface fill, hover lift 2 px, buttons press 1 px. | 6 px radius, 1 px border, no fill (bg shows through), hover changes border to text colour, no translate, no press. | The lift and the press are the parts that read as a product landing page, and touch never sees them. |
| Cover: headline number at display size in a surface field. | No cover; the number sits in the meta line at lead size, 600. | Three emphasised elements per card become one. |
| bg pure #FFFFFF in light. | bg #FBFAF7 (text 16.5:1, muted 6.6:1; surface #F5F4EF then differs from bg by only 1.06:1, so with fills removed from cards the surface token is used for pull-quotes only). | quieter asks for tinted neutrals rather than pure white; the warm tint matches Anuphan and the amber. |
| Section spacing 64 px desktop, 40 px phones. | 80 px desktop, 48 px phones; card padding 20 px stays. | More air between groups, tight groups inside. |

---

## 6. `typeset` and `colorize`: notes for a trilingual site

Both references assume one script; these notes are what changes when Latin, Thai and Japanese share one system. They apply to whichever direction ships.

### Font stacks and fallbacks

- Order the stack Latin face first, Thai face second, Japanese face third, then platform fallbacks. Script-specific faces carry only their own glyphs in Google Fonts' subsets, so Latin letters and digits inside Thai or Japanese text come from the Latin face and never from the Thai face's Latin, which keeps the Latin one face across the site. Example for F: `Overpass, Sarabun, "BIZ UDPGothic", system-ui, -apple-system, "Segoe UI", Roboto, Thonburi, "Leelawadee UI", "Noto Sans Thai", "Hiragino Sans", "Yu Gothic UI", Meiryo, "Noto Sans JP", sans-serif`.
- Platform fallbacks to name explicitly: Thai on iOS and macOS is Thonburi, on Windows Leelawadee UI, on Android Noto Sans Thai; Japanese on iOS and macOS is Hiragino Sans, on Windows Yu Gothic UI or Meiryo, on Android Noto Sans CJK JP. Without the Japanese entries, a Windows machine with a Chinese default can render Japanese text with Chinese glyph forms.
- Set `lang` on `<html>` per page and on every inline span of another script (a Thai video title on the English page, a Japanese organisation name). `lang` drives glyph selection, line breaking and screen-reader pronunciation; the preview already does this and the build must keep it.
- Google Fonts serves Thai and Japanese families as `unicode-range` slices, so only the ranges a page uses download; a self-hosted move later (Fontsource) keeps the same slicing. Request only the listed weights. `display=swap` for the reading face; `optional` is acceptable for the UI face if the fallback is metric-close, which it is for Latin only.
- Reflow control: a local `@font-face` for the Latin fallback with `size-adjust`, `ascent-override` and `descent-override` measured against the web face. Do not attempt this for Thai or Japanese; their fallback metrics differ too much and the swap is the honest state.
- Preload one file: the Latin 400 woff2. Nothing else.

### Size, line height and weight per script

| Script | Body size | Body line height | Heading line height | Weight mapping | Notes |
|---|---|---|---|---|---|
| Latin | 16 to 18 px | 1.5 to 1.6 | 1.15 to 1.25 | as the direction's scale | Measure 45 to 75 characters; prefer `ch` widths to px columns. |
| Thai | same size when the Thai face was drawn to the Latin x-height (IBM Plex Sans Thai, Anuphan); 1.06 to 1.125 em otherwise (Noto Serif Thai, Sarabun) | 1.7 to 1.75 | 1.35 minimum | same weight as Latin | Tone marks stack above and vowels hang below the line; tight leading clips them. Never letter-spacing (it separates combining marks from their base). Never `text-transform: uppercase` (no case exists); a Latin-only tag style must be scoped `:lang(en)`. Underline offset 0.25 em or more and `text-decoration-skip-ink: auto`, or the underline strikes ุ and ู. Line breaking is dictionary-based in every major browser; do not set `word-break: break-all`. Looped faces need 15 px or more on 1x Android. |
| Japanese | same size | 1.8 to 1.9 | 1.35 to 1.4 | one step lighter than Latin for headings when the family has 500 (Plex Sans JP, Noto Serif JP); keep 700 when the family has only 400 and 700 (BIZ UDPGothic) | Kanji darken faster than Latin at the same weight. `line-break: strict` so 。、」 never start a line. No italics exist; `em` uses weight or 「」. No letter-spacing on bold; up to 0.02 em on regular body is fine (Feature uses it). `text-wrap: balance` works for headings. |

Shared rules: the scale is one set of tokens; `:lang()` selectors adjust size and leading, never the roles. Numerals in tables are tabular. Dates render per locale through `Intl.DateTimeFormat` (2023年5月 in Japanese, and the Buddhist Era question for Thai is an undecided product fact, not a typographic one). Emphasis is one mechanism per script, declared in CSS, not left to synthetic slant. Run real Thai and Japanese copy through every component before launch even though only English ships, because a 108 px video thumbnail row with a long Thai title is where the layout breaks first.

### What the accent may and may not do (per colorize.md, in Operate and Read)

- May: mark the primary action, the active route (navigation, filter), selection (`::selection`, `accent-color` for native controls), focus, and link underlines. It carries wayfinding and action, which is what rarity is for.
- May not: colour body text or headings; decorate covers, dividers or backgrounds; be the only signal of a state (add underline, weight, shape or a label); vary its meaning between pages.
- On coloured surfaces (the primary button, an OG image), secondary text is a tint of the surface hue or of the foreground, never a generic grey, and is an explicit colour, not an alpha layer, so contrast does not depend on what is behind it.
- Explainer's rule for a low-contrast accent (fill only, never text) is the model for any accent whose text contrast fails; Direction F adopts it for a high-contrast accent too, because the world's grammar says words are black or white.
- Semantic colours for the contact form (error, success) are separate tokens, not the accent, and every state also carries text and an icon or position.
- Data on `/creator` (audience split by country and age) uses lightness steps of one hue plus direct labels, so colour is never the only code.
- Dark mode is composed: surface above bg, accent lighter and less saturated, accent-text dark, and every pair verified in both directions. Set `color-scheme` on `:root` so native controls and scrollbars follow the theme.
- Browser surfaces are themed from the palette: `::selection` (accent with accent-text), `caret-color` (text), `accent-color` (accent), scrollbar colours where supported, focus ring as a double ring that survives on accent fills.

---

## 7. `craft-floor`: the bans and reflexes that apply to this build

For the build checklist. Each is one check on the built result.

- Body and placeholder text at 4.5:1 or better, large text 3:1, in both themes, on every surface including the accent fill.
- Secondary text on a coloured surface is a tint of that hue or the foreground, never grey.
- Shadows, if any, carry an offset and a soft blur; no zero-offset halos. (No direction here uses shadows; keep it that way.)
- Tight inside groups, generous between them; more space above a heading than below it; read the computed values.
- Body measure 65 to 75 characters; display size never above 6 rem; tracking never below -0.04 em; headings balanced; obvious steps between scale sizes and between weights.
- Run the real copy (English now, Thai and Japanese fixtures too) at every breakpoint and fix what overflows.
- One authored motion moment per site, exponential ease-out from an already-visible default; no identical entrance on every section; no entrance animations at all under the plan's mobile rule.
- Every state built: hover, focus, disabled, loading (the contact form), error, empty (no posts, no videos, no stats yet), with real content and working controls.
- Theme the browser surfaces: selection, caret, focus ring, underline offset, scrollbar, native form controls, tabular numerals.
- Copy in the site's own language: controls name their action ("Download media kit", not "Click here"); errors name the problem and the recovery.
- Every plan requirement present and findable within seconds on its page.
- Ban: a kicker or eyebrow above any heading, on any page, for any reason.
- Refuse unless the brief pins it: same-size card grids as page structure (the plan pins three equal doors; equal rows satisfy it), the hero-metric template (one headline number is pinned; a giant-number cover is not), section numbers, modals.
- Refuse: gradient text, glass and blur as decoration, coloured side borders above 1 px, hard offset shadows, sparklines or progress rings standing in for content, monospace as a costume (data and dates only), a system face as the display voice, Unicode glyphs or emoji as icons (draw them, one stroke weight), geometric masks around the portrait.
- Light or dark from the use scene, not the category: both ship, follow the OS, and offer a switch.
- With every check green, spend the page on the committed direction; when torn between refined and committed, commit.

---

## 8. What the skill wanted that this environment or brief did not allow

- `impeccable context` (the launcher) was not run: it downloads an engine binary. The skill's stated fallback was used: read the project context directly and say so up front.
- `init` required an interview through a question tool with at least one real answer round before writing. No one could answer; every field in section 1 is drawn from the plan and content and labelled where inferred, and PRODUCT.md itself was not written because the brief keeps it inside this file.
- `critique` required two isolated sub-agents (design review and detector) and a browser inspection with an injected overlay, then a persisted snapshot in `.impeccable/critique/` and a trend line. No sub-agent tool, no detector (launcher), no browser, and no snapshot was written to the repository. The run is declared degraded as the reference demands.
- `new-work` required `impeccable concept-seed` to deal the direction and challengers, `serve-question` to present a decision page with a canon card, a pick card, re-roll registers and a build-path toggle, comps generated by an image tool, a surface brief written with `surface-brief write`, and DESIGN.md at finish written by the documenter agent. None ran. Direction F is presented as the top-ranked grounded candidate with the skill's required familiarity line, with no dealt challengers and no seed key.
- The skill's default for a new world with image generation is comp-led building; no image generation exists here and no code was to be written, so nothing was built and no `.impeccable/config.json` was created.
- `bolder`, `quieter`, `typeset`, `colorize` and `layout` each wanted a mechanical scan (`impeccable detect`) and rendered evidence; they were applied to the specification and preview source instead.
- The critique reference's warning-emoji banner and the skill's suggestion to hand off to `/impeccable polish` were dropped or left unactioned for house style and scope.
- The skill's setting that hooks auto-run the detector after UI edits is not enabled in this repository (see `.claude/skills/README.md`); nothing here changes that.
- Version note: SKILL.md says 4.3.1 while the vendoring README records "skill 0.1.5" at the same commit; this file cites both and the README's commit.
