Skill: design-taste-frontend (`.claude/skills/taste-skill`), with minimalist-ui (`minimalist-skill`) and high-end-visual-design (`soft-skill`) used as lenses for Directions D and E. Source: https://github.com/leonxlnx/taste-skill, commit `5217fb4`, per `.claude/skills/README.md`.
Date: 2026-09-21. Inputs read: `docs/site-structure.md` sections 1 to 5 and 10, `docs/design-directions.md`, `docs/design-preview.html`, `content/pages/en/home.md`, `content/work/en/bangkok-education-policy-map.md`. The skill text is treated as design guidance; where its defaults conflict with the plan in `docs/`, the plan wins and the conflict is named.

# Applying the taste skill to the site

## 1. Design Read (skill section 0)

**Reading this as: a multi-audience personal portfolio (switchboard home plus one sub-page per section) for grad-school committees, EdTech employers, brands and TikTok followers weighted equally, with a plain, calm, document-like language, leaning toward native CSS plus Tailwind v4 utilities on static Astro, trilingual Google Fonts stacks, and hover-only motion.**

Assumption stated instead of a question. The skill's section 0.C would ask one question here: "closer to Linear-clean or Awwwards-experimental?" The brief already answers it. Four equally weighted audiences, WCAG AA, mobile-first for readers arriving from a bio link, and "nothing that dates fast" all point to the clean end. I take that as decided. Two further readings the skill needs:

- Mode (skill section 11): greenfield. There is no existing site, so the redesign protocol does not apply. The three baseline directions are the material to audit, not a live site.
- Scope (skill section 13): the skill covers the home page, `/about`, `/creator`, `/links`, `/contact`, and the case-study and post pages as editorial pages. `/cv`, the publications and talks lists on `/research`, and the timeline are data pages ("different page entirely if the data is the product", skill 4.9). On those the skill governs headings, spacing and colour only; the tabular treatment the plan already specifies stands.

## 2. The three dials (skill section 1)

| Dial | Value | Skill rows it sits between | Why not lower | Why not higher |
|---|---|---|---|---|
| DESIGN_VARIANCE | 4 | "trust-first / accessibility-critical" 3 to 4; "minimalist / clean / calm / editorial" 5 to 6 | At 3 the skill prescribes a symmetrical 12-column grid with centred alignment, which turns the three doors, three cards, three videos and three posts into one template rhythm. A case-study page needs a meta rail beside the prose, and a home hero needs the portrait offset from the text; both are "Offset" moves (skill section 7, band 4 to 7). | At 5 and above the skill's anti-centre bias fires and the layout starts asking for split screens and asymmetric white space. The `/links` page must stay a single centred column, and asymmetry on a neutral site reads as a designer or agency portfolio, which the brief forbids. |
| MOTION_INTENSITY | 2 | "trust-first" 2 to 3; "Editorial / Blog" 4 | At 1 there is no `:active` press and no colour transition; the skill's 4.5 asks for tactile feedback on buttons regardless of dial. | At 3 the band is still "static", but Feature's hero fade and Explainer's hover lift would survive. At 4 and above the skill demands entry transitions and scroll reveals ("motion claimed, motion shown"), which means shipping JavaScript on a site that Astro otherwise renders with none, on phones arriving from TikTok. The skill's own fallback rule applies: "if you cannot ship working motion in the available scope, drop the dial to 3 and ship a clean static page." I drop it to 2 to say that load-in fades are out too. |
| VISUAL_DENSITY | 5 | "trust-first" 4 to 5; "Portfolio (Developer)" preset 4; "Daily App" band 4 to 7 | At 2 to 3 (art gallery, `py-32` to `py-48`) the work index of eleven case studies and the publications list push off the first phone screen, and the site reads as a designer's portfolio. | At 8 and above the skill bans cards, mandates monospace for all numbers and turns the home page into a dashboard. That is the register Register already risks. |

The skill's baseline is 8 / 6 / 4 and its "Portfolio (Designer / studio)" preset is 8 / 7 / 3. Both are overridden by the brief: neutrality, AA, mobile-first and durability all pull the first two dials down, and the data pages pull density slightly up.

### What the dials change on each page

| Page | VARIANCE 4 | MOTION 2 | DENSITY 5 |
|---|---|---|---|
| Home | Hero is left-aligned with the portrait offset beside the text, not a centred stack and not a 50/50 split with a large asset. Doors are three equal columns (the brief fixes this) but not three boxes. Featured work uses a 1 + 2 grid (one entry spans two columns), which is the one asymmetric move on the page. | No load-in fade, no stagger. Hover changes an underline or a border colour in 120 to 180 ms; buttons press 1 px or scale 0.98 on `:active`. | Sections 64 to 80 px apart on desktop, 48 to 56 on phones. Six sections fit in roughly three phone screens. |
| Work index | Left-aligned heading over a grouped list; the filter row and the list share one left edge. Rows are not cards. | Filter chips change fill on toggle with a 120 ms colour transition; the list re-renders without animation. | Eleven entries grouped by country (TH, JP, international) with one rule per group, not one hairline per row. Each row: title, organisation, year, headline number. |
| Case study | Two columns at desktop: a 240 px meta rail (organisation, role, period, location, tags, headline number) beside a 65 to 68 ch prose column; single column on phones with the rail rendered as a definition list above the prose. The fixed seven-part structure supplies the headings, so no eyebrows. | Nothing moves. Links underline on hover. | The evidence section may hold one figure or a short table inside the prose column without reading as a data dump. |
| `/links` | Variance is effectively 1: one centred column, 360 px max, no chrome. The brief overrides the skill's anti-centre bias here and the skill's own exception ("the message itself is the design") covers it. | `:active` press only. | Portrait 80 to 96 px, six to eight 48 to 52 px buttons with 12 px gaps; everything fits one phone screen. |

## 3. Brief to design system (skill section 2)

None of the official systems in the skill's table 2.A fits. The brief is not Microsoft, Google, IBM, Shopify, Atlassian, GitHub or public-sector work, and the skill's honesty rule cuts the other way too: using IBM Plex (Direction A) is not a reason to install Carbon, because the brief does not read as an IBM-style product. The brief is an aesthetic in the sense of table 2.B ("editorial / minimal: no library"), and the last row of 2.A ("Tailwind v4 utilities + `dark:` variant, default for indie and small team builds") is the foundation the skill would pick.

That agrees with the plan's Astro plus Tailwind decision. Differences between the skill's section 3 defaults and the plan, with the plan winning in each case:

| Skill default (section 3) | Plan | Resolution |
|---|---|---|
| React or Next.js with Server Components | Static Astro | Astro. Any component with client JavaScript (theme toggle, mobile sheet, work-index filter) is an island; at MOTION 2 nothing else needs JavaScript. |
| Motion library (`motion/react`) | No animation library named | None needed. Transitions are CSS. |
| `next/font` or self-hosted `@font-face`; "never link Google Fonts via `<link>` in production" | "Google Fonts with named families and weights" | Same families, self-hosted. Fontsource mirrors every Google Fonts family as an npm package; verify the exact package names once `package.json` exists (skill 3.F). Latin and Thai subsets are small. Japanese is the exception: Google's CSS API serves Noto-class JP families in about a hundred `unicode-range` slices so a page downloads only the kanji it uses, and a self-hosted single file is several megabytes. For the `/ja` routes either keep the Google Fonts link for the JP family only (a stated deviation from the skill) or add a build-time subsetting step. Decide when Phase 3 starts. |
| Tailwind v4 through `@tailwindcss/postcss` or the Vite plugin | Tailwind, version unstated | Tailwind v4 through `@tailwindcss/vite`, which is how Astro integrates it. Colour tokens live in CSS variables and are exposed with `@theme`; do not also write `dark:` utilities (skill 8.A, one strategy). |
| Icons from Phosphor, HugeIcons, Radix or Tabler; one family; one stroke weight | Not specified | Phosphor, either through Iconify's `ph` set with `astro-icon` or `@phosphor-icons/web`. One weight per direction (Regular for D, Light for E). |
| `max-w-7xl` containers, `min-h-[100dvh]` for full-height heroes | Container widths per direction | No full-height hero exists in any direction, so `100dvh` is only relevant to the mobile sheet. |

## 4. Audit of the baseline directions (skill sections 4 and 9)

Findings quote `docs/design-directions.md` (the document) or `docs/design-preview.html` (the preview). Passes are listed once at the end so the audit is fair.

### Shared findings (from the home structure and the preview markup all three directions use)

| # | Finding | Fix |
|---|---|---|
| S1 | Four consecutive three-up sections. Document: "name, one line, two buttons, three doors, then cards"; site-structure 5: doors "equal size", "three case-study cards", "three videos", "three posts". Preview: `.doors{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}` and `.cards{grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}`. Skill 4.7 (Section-Layout-Repetition Ban: a layout family appears at most once per page) and 9.C ("NO 3-column equal feature cards"). | Keep the counts and the equal doors (brief wins) and change the family per section: doors as three equal text columns under one rule, no boxes; featured work as 1 + 2 (first entry spans two columns with its artefact) or a stacked list with the cover at left; videos as a horizontal scroll-snap row of 9:16 thumbnails (skill 4.9 lists scroll-snap as a component); writing as a plain dated list. That is four families across six sections, which meets the skill's minimum. |
| S2 | Duplicate CTA intent. Hero "See my work" and door "Work and Research" both go to `/work`; "Watch @takumyi" and door "Creator" both go to `/creator`. Skill 4.5 ("one label per intent"). Both are fixed by the brief. | Within the brief: the doors are navigation, not calls to action. Whole row is the link, plain title, no button styling, and no per-door arrow or "Open" label (preview: `.door-arrow{color:var(--accent)}` on all three doors; Explainer's `<span class="door-arrow">Open</span>` three times). The page then has two button-styled CTAs above the fold, not five. |
| S3 | Middle dot as the default separator. Preview `.meta`: "Bangkok Metropolitan Administration · 2023 · 437 principals" on every card. Skill 9.F: "maximum 1 per line in metadata strips". | Organisation on line one; year and headline number on line two, or the year in its own column. |
| S4 | The cover number is the largest type on the site. Preview: `.cover-num{font-size:clamp(40px,8vw,64px)}` against `.name` at 40 px (A), 48 px (B), 44 px (C). Three such tiles under the hero outrank the owner's name. Skill 9.B: "control hierarchy with weight + color, not raw scale". | Cap the tile number at h2 size in text colour. Prefer a real artefact: the case study already asks for "a link to the deck or a screenshot of one visualisation", and skill 4.8 says "even minimalist sites need real images". The number tile is the fallback when nothing is public. |
| S5 | Uppercase tracked micro-labels. A: `.tag{font-size:12px;letter-spacing:.06em;text-transform:uppercase}`; B: "uppercase, letter-spacing 0.08 em". Skill 4.7 names `text-[11px] uppercase tracking-[0.18em]` as the eyebrow signature and counts it mechanically. The `/work` filter row alone has up to nine such chips; every card carries two. | Sentence case, 13 px, no tracking, for tags and filter chips. No eyebrow above any section heading (none is specified today; keep it so). On a six-section home page the skill's cap is two and the target is zero. |
| S6 | En-dashes (U+2013) and one em-dash (U+2014) in copy that will render. "Thai-Japanese interpreting" is set with an en-dash in site-structure 5 and `about.md` line 26; so are "Japanese-Thai-English" (`cv.yaml`, `timeline.yaml`, `interpreting-fieldwork-cohorts.md`), "teacher-student ratios" (`cv.yaml`), "Japan-Bangkok Comparison" (`publications.yaml`, `cv.yaml`) and "Thailand-United States Alumni Association" (three case studies, `cv.yaml`). One em-dash sits in an ESCAP title in `publications.yaml`. Skill 9.G bans both characters on the page. A search of `content/` for the two code points lists every instance. | Hyphen in the site's own copy ("Thai-Japanese", "Japanese-Thai-English"). Published titles and organisation names stay exactly as printed; the skill's copy rule does not license altering a citation. |
| S7 | The primary button loses the accent on hover. Preview: `.dir-a .btn-primary:hover{background:var(--text)}`, and the same rule in `.dir-b` and `.dir-c`. The one element that carries the accent swaps it for near-black. Skill 8.B hierarchy parity ("if a CTA pops in light, it pops in dark") and the Colour Consistency Lock. | Darken the accent 8 to 10 % on hover and keep accent-text: A `#085A50` (7.6:1 with `#F8F8F6`), B `#571F44` (11.8:1), C `#C9982C` (6.6:1 with `#1C1B18`). |
| S8 | Contact form input borders. All three border tokens sit at 1.3 to 1.5:1 on their backgrounds, which is fine for decorative rules but below the 3:1 WCAG 1.4.11 needs for an input's boundary. Skill 4.5 FORM CONTRAST CHECK. | Input borders in text-muted (5.8 to 6.9:1 in light, 7.1 to 7.3:1 in dark), labels above, error text below in text colour with an icon, never in the accent. |

### Direction A: Register

| # | Finding | Fix |
|---|---|---|
| A1 | Accent-filled cover tiles. Preview: `.cover{background:var(--accent)}` with a 64 px white mono number; document: "Case-study covers: 16:10, a flat single-colour field carrying one number". Three teal 16:10 fields under the hero make the accent the largest colour area on the home page. Skill 4.2 uses accents as accents, not fields, and the direction's own risk says it "can read as a software company if the accent is overused". | Cover is a document crop (slide, chart, table) in a 1 px border on surface. Fallback: surface tile, number at h2 in text colour, arrow dropped. |
| A2 | Mono on everything small. Document: "IBM Plex Mono: dates, counts, tags, table cells"; preview: `.dir-a .kicker,.block-label,.meta,.tag,.spec-label,.sw-hex,.door-arrow{font-family:var(--mono)}` and `.cover-num{font-family:var(--mono)}`. Skill 4.9 ("one copy register per page. Don't mix technical mono ... editorial prose") and section 7 ties mono numbers to the cockpit band (density 8 to 10). At density 5, for committees and brands, this is the developer-portfolio register the direction's own risks name. | Plex Mono only inside true tables (`/cv`, publications, the year column of the work index). Card meta, inline counts and the hero use Plex Sans with `font-variant-numeric: tabular-nums`. Tags in sans. |
| A3 | Work index as a hairline table. Document: "Lists (publications, talks, timeline, work index) are true tables on desktop with a hairline row divider". Eleven case studies. Skill 4.9 ("group rows into 2 to 3 chunks with sparse dividers") and 9.F ("NO `border-t` + `border-b` on every row of a long list"). | Group by country with one heading and one rule per group; rows separated by space; filters act on the groups. `/cv`, publications and talks keep their tables (out of the skill's scope). |
| A4 | Teal `#0B6B60` is 81 % HSL saturation, just above the skill's "saturation < 80 % by default" (4.2). Dark `#5BC9BA` is 50 %. | No change if the accent stays on buttons, links and focus rings. If it were kept as the cover fill (A1) it would be a large saturated field, which is the case to avoid. |
| A5 | Square corners with 40 px buttons on `/links`. The document already notes the risk ("square corners on the `/links` page make buttons feel smaller than they are; keep them 48 px tall there"). Skill 4.4's shape lock accepts radius 0 everywhere; the point is the height rule must be written into the token file, not remembered. | Token: `--btn-h: 40px` on the site, `48px` on `/links`. |

### Direction B: Feature

| # | Finding | Fix |
|---|---|---|
| B1 | The serif is justified by audience signalling. Document: "Committees and professors read the serif as care with writing, which is what they are judging", and the risk: "most likely to be read as academic or literary by a brand manager". Skill 4.1 accepts a serif only when the aesthetic family is genuinely editorial and you can say why this serif fits this brand; "it feels editorial" is named as the insufficient reason. Here the stated reason favours one of the four audiences, which the brief's neutrality rule forbids. The pairing argument (Source Serif 4 and Noto Serif JP share the Source Han Serif origin) is sound, but it explains why the fonts go together, not why this site is a publication. | Either drop the serif (Source Sans 3, Noto Sans Thai and Noto Sans JP carry the direction; the reading character survives in the 18 px body, 640 px measure and top rules), or confine Source Serif 4 to running prose on `/work/[slug]` and `/writing/[slug]` where reading is the job, with sans on the home page, `/creator`, `/links` and every heading. |
| B2 | Six families on first load. Document: "Font families to load: 6", "roughly 60 to 90 KB of woff2 on first load, which matters on a TikTok bio link". Skill 6.D (LCP under 2.5 s, CLS under 0.1) and 3.A (self-host with `font-display: swap`). | Load per locale: at launch only the Latin pair. Self-host subsets. Provide `size-adjust` fallback metrics for the serif so the swap does not reflow the 640 px column. |
| B3 | Middle dots as tag separators. Preview: `.dir-b .tag+.tag::before{content:"\00b7"}`; document: "filter chips are sans text separated by middle dots". Skill 9.F. | 12 to 16 px gap and no glyph. The active chip keeps its accent underline. |
| B4 | The hero fade. Document: "The home hero fades in over 240 ms on first load (opacity only, from 0.6)". Skill 5, MOTION MUST BE MOTIVATED: it communicates no hierarchy, story, feedback or state change. At MOTION 2 there are no load-ins. | Remove it. The direction then ships no keyframes and no JavaScript beyond the theme toggle. |
| B5 | Hero CTAs of two shapes. Preview: `.dir-b .btn-secondary{border-color:transparent;padding-inline:4px;text-decoration:underline}` beside a 44 px filled primary. The label is readable (16:1), so skill 4.5's contrast rule passes, but the secondary is a `<button>` styled as a text run with a 4 px hit area beside a block. | Render it as an `<a>` (it navigates) with the same 44 px line box, or give it the 1 px border the other directions use. |

### Direction C: Explainer

| # | Finding | Fix |
|---|---|---|
| C1 | Amber saturation. `#F0B429` is 87 % HSL, dark `#F5C453` is 89 %. Skill 4.2 ("saturation < 80 % by default") and 9.A ("NO oversaturated accents"). | `#E3AC33` light (76 %, accent-text 8.4:1) and `#E9BE5A` dark (76 %, 9.8:1). Both remain fill-only, as the document already rules. |
| C2 | Four accent elements in the first viewport. Document rule: "If the accent is used on more than one element per screen the page turns into a startup landing page". Preview: `.dir-c .door-arrow{text-decoration-color:var(--accent);text-decoration-thickness:2px}` on all three doors under an amber primary button. | Doors carry no amber (plain titles, whole row link, hover underline in text colour). The primary button is the single accent element above the fold. |
| C3 | Invisible chip. Document: "Tags are chips: surface fill"; preview: `.dir-c .tag{background:var(--bg)}` and `.dir-c .card .tag{background:var(--bg)}` inside `.card{background:var(--surface)}`, which is white on `#F5F4EF`, 1.10:1. The chip has no shape in light mode and the row reads as loose words. Not a WCAG failure (informational), but the component does not exist visually. | Chip fill is the opposite of its container (surface on bg, bg on surface) plus a 1 px border in border colour. Write it down. |
| C4 | The radius rule has holes. Document: buttons 10 px, cards 12 px, chips 999 px, `/links` "52 px buttons at 12 px radius"; preview: `.dir-c .thumb{border-radius:0}` inside 12 px cards, `.dir-c .chip{border-radius:10px}`. Skill 4.4 Shape Consistency Lock needs one documented rule applied everywhere. | Three named radii: `--r-btn: 10px` (all buttons, including `/links`), `--r-card: 12px` (cards, covers, thumbnails, portrait), `--r-chip: 999px`. |
| C5 | Active filter chips in amber. Document: filter chips "switch to filled accent when active". With type and country filters both live, `/work` can show several amber chips at once, breaking C2 on that page. | Active chip is filled text colour with bg text (17:1). Amber stays on the single primary button. |
| C6 | A chip row above every card title. Document: "Cards have the chip row at the top, a 600 title". A micro-label above every headline is the rhythm the skill's eyebrow rule targets (4.7). | Chips below the title or in the meta line, as A and B already do. |
| C7 | Hover lift. Preview: `.dir-c .door:hover,.dir-c .card:hover{transform:translateY(-2px)}`. Transform-only, so skill 6.A is satisfied, but at MOTION 2 there is no hover movement, and lifts are the pattern most likely to date. | Keep the border-colour change, drop the translate. |

### What passes in all three

Hero stack is three text elements and the identity line is twelve words (skill 4.7). No gradients, glass, blobs, grain or custom cursors. No Inter (site-structure 10 lists it as a candidate; the directions chose better). Names and numbers are real (47, 8, 437 come from the case study). No scroll cues, no version labels, no locale strips (country tags are content, and the skill allows them as such). `prefers-reduced-motion` is handled globally. Theme follows the system with a manual toggle and persists it. Focus rings are visible and pass 3:1 (A and B in accent, C in text colour). Navigation is six items plus a language switch and fits one line at 1024 px in every direction.

## 5. Dark mode protocol and guardrails (skill sections 8 and 6)

Contrast figures in `design-directions.md` were recomputed with the WCAG 2 formula. Every claimed pair matched within rounding (for example Register text on bg 15.69 light and 15.16 dark; Feature accent-text on accent 9.93 and 7.81; Explainer amber on white 1.86). No change to the claims.

| Check | Result | Change |
|---|---|---|
| Token strategy (8.A: pick one) | Preview uses CSS variables switched by `prefers-color-scheme` and `[data-theme]`. Correct choice for Astro. | Expose the variables to Tailwind v4 with `@theme` and never write `dark:` utilities. Move the saved-theme read from the end of `<body>` (where the preview has it) to an inline script in `<head>` so there is no flash of the wrong theme. |
| No pure `#FFFFFF` or `#000000` (8.B) | A surface `#FFFFFF` and accent-text `#FFFFFF`; B accent-text `#FFFFFF`; C bg `#FFFFFF`. No `#000000` anywhere. | A surface `#FDFDFC` (text 16.4:1), A accent-text `#F8F8F6` (6.0:1 on teal). B accent-text `#FAF8F9` (9.4:1). C bg `#FCFCFA` (text 16.8:1, muted 6.7:1) with surface `#F3F2ED` to keep the step (15.4:1). |
| Hierarchy parity (8.B) | Primary buttons pop in both modes. The hover swap to near-black breaks parity on hover (S7). | Hover darkens the accent (S7). |
| Brand fidelity (8.B) | Each dark accent keeps its hue. | None. |
| Default mode and toggle (8.C) | System preference, manual override, `localStorage` inside try/catch. | None. |
| Test in both modes (8.D) | Cannot be run here; no build exists. | Phase 1 task. |
| Reduced motion (6.B) | Global kill switch present. | Add `scroll-behavior: auto` under `reduce` if smooth scrolling is ever enabled. Feature's hero fade goes (B4), so nothing else needs gating. |
| Animate only transform and opacity (6.A) | Colour and border-colour transitions are paint-only and short; C's lift is transform. | Keep transitions at 120 to 180 ms. |
| Core Web Vitals (6.D) | Google Fonts `<link>` in the preview; six families in B. | Self-host per locale (section 3). Reserve image boxes with `aspect-ratio` so thumbnails and covers do not shift. |
| Grain and blur (6.E) | None used. | None. |
| Z-index (6.F) | Not specified. | Three layers in the token file: nav 10, mobile sheet 20, skip link 30. |
| Page theme lock (4.11) | No section inverts. A's accent cover tiles are the only large fills (see A1). `/links` uses the same tokens. | None beyond A1. |
| Non-text contrast (WCAG 1.4.11) | Focus rings pass. Decorative borders at 1.3 to 1.5:1 are fine as separators; input borders are not (S8). | S8. |

## 6. Two new directions

Both are shaped by the dials above (4 / 2 / 5) and by the skill's anti-default rules. Where a lens asks for something the taste skill bans or the brief excludes, the lens loses and the reason is given. Neither direction may read as a creator site or an academic site, so neither uses a serif, monospace metadata, follower counts on the home page, or a thumbnail larger than the hero portrait.

### Direction D: Document

Built from the minimalist-ui lens ("premium utilitarian minimalism": warm monochrome, typographic contrast, 1 px rules, no shadows, one accent used as a scarce resource).

**Concept.** The site behaves like a well-made working document: one warm off-white ground, one column of text with wide margins, and one slate blue used only for links, the active state and tag fills. Structure comes from spacing and 1 px rules rather than from boxes, and the only large type on the site is the owner's name.

**Who it feels right to and why.** Committees and professors read a document register they already know (Sarabun is the register of Thai official documents; a universal-design gothic is the register of Japanese public and school documents) with no citation styling and no serif. Employers read case studies as one-page briefs with a meta rail. Brands see clear buttons and a media kit that looks like the rest of the site. Followers get a page with no chrome noise and a list of doors they can tap. It avoids academic styling by having no serif and no footnote apparatus, and creator styling by keeping thumbnails at 96 px and counters off the home page.

**Typography.**

| Script | Family (Google Fonts) | Weights | Role |
|---|---|---|---|
| Latin | Geist | 400, 500, 600 | body, UI, headings |
| Thai | Sarabun | 400, 500, 600 | body, UI, headings |
| Japanese | BIZ UDPGothic | 400, 700 | body, UI, headings (700 stands in for 600) |

Why they pair: Geist is a neutral grotesk with a large x-height and open apertures. Sarabun (Cadson Demak) is a loopless Thai of the same open, low-contrast construction, with eight weights so 400, 500 and 600 map one to one; its Latin is not loaded, so Latin words inside Thai lines set in Geist. BIZ UDPGothic is Morisawa's universal-design gothic, drawn for legibility on screens with wide counters, and is the face Japanese readers meet on public documents and textbooks; it has only 400 and 700, so `:lang(ja)` headings use 700 and 500-weight UI labels fall back to 400. If that limit bites, the named swap is Noto Sans JP (variable, exact weight mapping) at the cost of the document register. No monospace anywhere; tabular figures come from `font-variant-numeric: tabular-nums`. The lens's serif hero heading (it names Newsreader, Playfair Display and Instrument Serif) is dropped: the taste skill bans Instrument Serif outright and discourages any default serif, and the brief's neutrality rules out serif signalling. Typographic contrast comes from size and weight instead.

Type scale (base 16 px, ratio 1.25, body line-height 1.6):

| Step | Size | Weight | Use |
|---|---|---|---|
| meta | 13 px | 500 | dates, organisation, tags |
| small | 14 px | 400 | captions, footer |
| body | 16 px | 400 | running text |
| lead | 20 px | 400 | identity line, summaries |
| h3 | 22 px | 600 | card and row titles |
| h2 | 28 px | 600 | section titles |
| h1 | 36 px | 600, tracking -0.01 em | page titles |
| display | 48 px (36 on phones) | 600, tracking -0.02 em | name on the home hero only |

Script adjustments: `:lang(th)` same size, line-height 1.7; Sarabun's x-height sits a little under Geist's, so Thai headings look slightly lighter, which is acceptable. `:lang(ja)` line-height 1.8, letter-spacing 0.02 em, headings 700, no negative tracking.

**Colour tokens.** Ratios computed with the WCAG 2 formula (script in section 6, end).

| Token | Light | Dark |
|---|---|---|
| bg | #F7F6F3 | #161614 |
| surface | #FCFCFB | #1E1E1B |
| text | #1C1C1A | #E9E7E2 |
| text-muted | #63625C | #A6A49C |
| border | #E3E1DC | #302F2B |
| accent | #3B5C86 | #93B4D8 |
| accent-text | #F7F6F3 | #101A26 |
| accent-soft (tag fill, derived) | #E2EBF4 with text #2E4A6B | #22303F with text #B7CDE6 |

| Pair | Light | Dark |
|---|---|---|
| text on bg | 15.8:1 | 14.7:1 |
| text on surface | 16.6:1 | 13.5:1 |
| text-muted on bg | 5.7:1 | 7.3:1 |
| text-muted on surface | 6.0:1 | 6.7:1 |
| accent-text on accent | 6.4:1 | 8.2:1 |
| accent as link text on bg | 6.4:1 | 8.4:1 |
| accent as link text on surface | 6.7:1 | 7.8:1 |
| accent-soft text on accent-soft | 7.6:1 | 8.3:1 |
| primary button (bg-colour label on text-colour fill) | 15.8:1 | 14.7:1 |
| accent HSL saturation | 39 % | 47 % |

Notes on the palette. The lens's own values were not copied where they fail: its muted grey `#787774` is 4.1:1 on its bone `#F7F6F3` and 4.5:1 on white, so text-muted was darkened; its `#FFFFFF` canvas and `#111111` text became off values (skill 8.B); its four pastels collapsed to one accent family (Colour Consistency Lock). The bone background is the lens's named value and is not in the skill's banned list, but it belongs to the warm-paper family; the ban targets that family paired with brass, clay or oxblood on premium-consumer briefs, and D pairs it with a cool accent, which is the skill's own "cobalt and cream" logic in a quieter key. Keep the neutral this faint; if it drifts warmer it becomes the palette the skill bans.

**Layout and grid.** Container 1080 px, reading column 66 ch (about 640 px). 8 px rhythm: 4, 8, 12, 16, 24, 32, 48, 64, 96. Sections 64 px on desktop, 48 on phones. Home: hero with a 96 px square portrait at the left of the text, like a document header; doors as three equal text columns under a single 1 px rule, no boxes; featured work as a 1 + 2 grid where the first entry spans two columns and carries its artefact crop; videos as a scroll-snap row; writing as a dated list; contact strip as one sentence and a link. Case study: 240 px sticky meta rail plus prose at desktop, single column on phones with the rail as a definition list. Work index: filter row, then groups by country with one heading and one rule each, rows of title, organisation, year and headline number. `/links`: 360 px column, 80 px portrait, 48 px buttons with 12 px gaps. The lens's "flat bento grids" are limited to that one 1 + 2 grid; a full bento is the trend most likely to date and the skill's cell-count rule would force empty tiles with the brief's counts.

**Component character.** One radius: 6 px on buttons, cards, tags, inputs, images and the `/links` buttons (the lens's pill tags were dropped for the skill's shape lock). Buttons 40 px (48 on `/links`), 500 weight; primary is text-colour fill with a bg-colour label, hover `#333331` (11.7:1); secondary is a 1 px border in border colour, hover border in text colour. Links are text colour with a 1 px accent underline offset 3 px; hover turns the text to accent. Tags are accent-soft fill, 13 px, sentence case, no tracking, placed below titles. Filter chips are tags with a 1 px border; active is text-colour fill with bg text. Cards exist only where a border helps (featured work, videos): 1 px border, surface fill, 20 px padding, no shadow. Tables (`/cv`, publications): 500-weight header row, rows separated by 1 px in border colour, tabular figures, no vertical rules. Accordions on `/cv` at phone width follow the lens: no boxes, `border-bottom` separators, plus and minus toggles. Inputs: surface fill, 1 px border in text-muted (6.0:1), label above, error below. Navigation: 64 px bar, 500-weight links, active underlined; phone sheet. Icons: Phosphor Regular. Focus ring 2 px accent, offset 2 px. The lens's faux-OS window chrome and keyboard-key micro-UI are not used: the first is the fake-screenshot pattern the skill bans, the second has no content here.

**Motion (MOTION_INTENSITY 2).** 150 ms ease-out transitions on colour, border colour and underline thickness; `:active` scale 0.98 on buttons; the phone sheet slides 200 ms. Nothing on load or scroll. The lens's 600 ms scroll fade-ins, 80 ms staggers and drifting radial blob are dropped under the dial and the "nothing that dates fast" constraint. `prefers-reduced-motion: reduce` sets all transitions to 0.

**Imagery guidance.** Portrait: square 1:1 at 96 px on the hero, 4:5 at 240 px on `/about`, 6 px radius, natural colour with saturation reduced in the file rather than by a CSS filter. One wide 3:2 photograph on `/about` at column width (the owner is a photographer; use his own). Case-study covers: artefact crops (a slide, a chart, a table) at 16:10 inside a 1 px border; fallback is a surface tile with the headline number at h2 in text colour. Video thumbnails: 9:16 at 96 px in the scroll-snap row on home and a three-column grid on `/creator`, the format chip beside the thumbnail, never on it. No grain overlay, no illustrations (the lens's ink sketches would need commissioning), no logos larger than 24 px tall. Images needed before launch: hero portrait, `/about` portrait and one wide photo, covers for the three featured case studies.

**References.** notion.com (warm off-white ground, 1 px rules, no shadows, document-like sections). vercel.com/geist (Geist in use across a neutral system in light and dark). linear.app (one accent used only for action and state, headings that rely on weight rather than size).

**Risks.** Reads as a workspace or SaaS product site if cards multiply; the answer is the same as Register's: cards only where a border helps. Sarabun is strongly associated with Thai official forms, which is neutral but plain; if the owner finds it lifeless, IBM Plex Sans Thai is the swap that keeps the weights. BIZ UDPGothic's two weights lose the 500 step in Japanese. Geist is now common on developer sites, and with a blue accent the site can read "developer"; keep the accent off large surfaces. The warm neutral must stay this faint.

### Direction E: Relief

Built from the high-end-visual-design lens, using its "Soft Structuralism" archetype (silver-grey ground, bold grotesk, surfaces that float on diffused shadows). The lens's other archetypes are out: "Ethereal Glass" (OLED black and mesh gradients) is the pattern the taste skill's lila rule bans and the baseline excludes; "Editorial Luxury" (cream, variable serif, grain) is the serif and warm-paper default the skill bans.

**Concept.** Surfaces sit in low relief on a cool silver-grey ground: off-white panels with a diffused, tinted shadow instead of borders, pill buttons, and bold grotesk headings. One rust accent is the only warm thing on the page, so it always reads as the action.

**Who it feels right to and why.** Brands and followers see the register of consumer product sites they use daily. Employers see one panel per case study with one headline number each. Committees see a quiet, low-contrast structure with no thumbnail competing with text. It stays neutral because the panels hold research and creator content identically, no image is larger than the hero portrait, no follower count appears on the home page, and there is no serif.

**Typography.**

| Script | Family (Google Fonts) | Weights | Role |
|---|---|---|---|
| Latin | Plus Jakarta Sans | 400, 500, 700 | body, UI; headings 700 |
| Thai | Prompt | 400, 500, 700 | body, UI, headings |
| Japanese | M PLUS 2 | 400, 500, 700 | body, UI, headings |

Why they pair: Plus Jakarta Sans is a geometric-humanist grotesk with round bowls and a 700 that holds a 56 px name. Prompt (Cadson Demak) is a geometric loopless Thai drawn in the same idiom with nine weights, so the three steps map exactly; its Latin is not loaded. M PLUS 2 is a variable Japanese gothic with open, geometric kana and a true 700, so JP headings match the Latin weight step without a per-script override. The lens names Geist, Clash Display, PP Editorial New and Plus Jakarta Sans; only the last is on Google Fonts and not already used by D.

Type scale (base 16 px, ratio 1.25, body line-height 1.6):

| Step | Size | Weight | Use |
|---|---|---|---|
| meta | 13 px | 500 | dates, organisation, tags |
| small | 14 px | 400 | captions, footer |
| body | 16 px | 400 | running text |
| lead | 20 px | 400 | identity line, summaries |
| h3 | 22 px | 700 | panel and row titles |
| h2 | 30 px | 700, tracking -0.01 em | section titles |
| h1 | 38 px | 700, tracking -0.015 em | page titles |
| display | 56 px (40 on phones) | 700, tracking -0.02 em | name on the home hero only |

Script adjustments: `:lang(th)` line-height 1.7, headings at 0.98 em because Prompt sits tall. `:lang(ja)` line-height 1.8, headings 700, no negative tracking.

**Colour tokens.**

| Token | Light | Dark |
|---|---|---|
| bg | #EEF0F2 | #17191C |
| surface | #FBFBFC | #202327 |
| text | #1B1E22 | #E7E9EC |
| text-muted | #5A6169 | #A1A7AE |
| border (inputs and hairlines only) | #D6DAE0 | #32363C |
| accent | #B5462F | #E48A66 |
| accent-text | #FBFBFC | #23100A |

| Pair | Light | Dark |
|---|---|---|
| text on bg | 14.6:1 | 14.5:1 |
| text on surface | 16.2:1 | 13.0:1 |
| text-muted on bg | 5.5:1 | 7.3:1 |
| text-muted on surface | 6.1:1 | 6.5:1 |
| accent-text on accent | 5.2:1 | 7.1:1 |
| accent as link text on bg | 4.7:1 | 6.8:1 |
| accent as link text on surface | 5.2:1 | 6.1:1 |
| primary hover (`#9F3B26` light, `#EE9C7A` dark) | 6.5:1 | 8.4:1 |
| input border (text-muted) on surface | 6.1:1 | 6.5:1 |
| surface on bg (panel step) | 1.10:1 | 1.12:1 |
| accent HSL saturation | 59 % | 70 % |

Notes on the palette. The light accent as link text is 4.7:1, above AA with little margin, so every link is underlined and no tint of the accent is ever used as text. The panel step is deliberately small; the shadow does the separation in light mode. In dark mode shadows vanish, so panels add a 1 px inner highlight (`inset 0 1px 0 rgb(255 255 255 / 0.04)`), which is the lens's inner-highlight rule applied honestly. Shadow tokens: light `0 1px 2px rgb(27 30 34 / 0.05), 0 8px 24px rgb(27 30 34 / 0.07)`, tinted to the text hue as the skill requires (4.4); dark `0 1px 2px rgb(0 0 0 / 0.3), 0 8px 24px rgb(0 0 0 / 0.35)`. No pure white or black anywhere.

**Layout and grid.** Container 1120 px, reading column 68 ch. 8 px rhythm. Sections 80 px on desktop, 56 on phones. Home: hero as a 7 / 5 split, text left and the portrait right inside a surface panel; on phones the portrait sits above the text at 160 px. Doors: one full-width panel holding three equal columns with a 1 px hairline between them at desktop, stacked on phones, so the doors are equal (brief) without being three cards (skill). Featured work: 1 + 2 grid with the first entry spanning two columns. Videos: scroll-snap row of 9:16 thumbnails directly on the ground, no panel. Writing: plain list on the ground. Contact strip: one panel. Case study: a header panel with the title and a definition grid (organisation, role, period, location, tags, headline number), then prose on the ground with figures in panels; single column on phones. Work index: filter pills, then one panel row per case study (title, organisation, year, number) grouped by country with a heading per group. `/links`: 96 px portrait, 52 px pill buttons in surface with the panel shadow, 12 px gaps. The lens's "asymmetrical bento" and "z-axis cascade" (rotated, overlapping cards) are not used: variance 4 does not reach them, and both are the layouts most likely to date. Its "editorial split" survives only as the 7 / 5 hero.

**Component character.** Three named radii, documented as the skill's shape lock requires: `--r-pill: 999px` for buttons and chips, `--r-panel: 16px` for panels, `--r-media: 12px` for images and inputs. The lens asks for 2 rem panels; 16 px is the top of the skill's "all-soft" band and holds concentric curves with a 4 px inset (16 minus 4 equals 12), which is the lens's nested-radius rule at a scale that will not date. Buttons 44 px (52 on `/links`), 600 weight, 12 px vertical padding so Thai tone marks clear the pill; primary is accent fill with accent-text, hover darkens; secondary is surface fill with the panel shadow and no border; `:active` scale 0.98. The lens's "button-in-button" trailing icon circle is dropped as a dated agency signature. Links: text colour with a 1.5 px accent underline; hover turns the text to accent. Chips: pill, 13 px, 500, filled with the opposite of their container plus a 1 px border in border colour (the lesson from C3); active filter is text-colour fill with bg text. Panels: surface, 16 px radius, no border, shadow as above, 24 px padding; nested media at 12 px. Inputs: surface fill, 1 px border in text-muted, 12 px radius, label above, error below in text colour with a Phosphor icon, never in the accent. Navigation: a standard 64 px bar on the ground, 500-weight links, active underlined; phone sheet. The lens's floating detached pill nav is dropped: it dates fast and eats vertical space on phones. Icons: Phosphor Light. Focus ring 2 px accent, offset 2 px (4.7:1 on bg, passes non-text 3:1). No eyebrow pill badges above headings (the lens asks for them; the skill's eyebrow restraint and the brief's plainness say no).

**Motion (MOTION_INTENSITY 2).** 180 ms transitions with the lens's curve `cubic-bezier(0.32, 0.72, 0, 1)` on colour, box-shadow and transform. Panels that are links deepen their shadow on hover, with no lift. `:active` scale 0.98. The phone sheet slides 200 ms. Nothing on load or scroll. The lens's 800 ms blur fade-ups, staggered mask reveals and magnetic hover are dropped under the dial. `prefers-reduced-motion: reduce` removes the transitions and the sheet slide.

**Imagery guidance.** Portrait: 4:5 colour, natural light, inside the hero panel with the concentric inner radius. `/about`: one wide 3:2 photograph in a panel. Case-study covers: artefact crops at 16:10 in the panel's media slot; fallback a surface tile with the headline number at h2 in text colour. Video thumbnails: 9:16 in 12 px radius, chip beside, nothing overlaid. Brand logos on `/creator`: monochrome SVGs in text colour, logos only with no category captions (skill 4.8). No grain overlay: the lens wants one at 3 % opacity, the skill allows it only on a fixed layer, and it is a texture that dates. Images needed before launch are the same list as D.

**References.** apple.com (silver-grey ground, off-white panels, pill buttons, no borders). stripe.com (diffused shadows, one accent on a light neutral, bold sans headings). framer.com (panel-based marketing pages with a single accent and generous but not empty spacing).

**Risks.** Reads as a consumer product or SaaS page, the same family as Explainer's startup risk. Shadows disappear on dark grounds and on poor panels, so dark mode relies on the small surface step plus the inner highlight; test on a cheap Android screen. The rust accent is near error red, so form errors must never use it. Pill buttons with Thai labels need the 12 px vertical padding or tone marks clip. M PLUS 2 at 700 is wide; Japanese navigation labels may wrap at 1024 px, so condense labels before adding a hamburger. The light accent's 4.7:1 as text leaves no room for tinting. Plus Jakarta Sans and Prompt are both geometric and were fashionable from 2020 to 2024, so E will date sooner than D.

### Contrast script

The ratios above come from this, run on 2026-09-21:

```python
def lum(h):
    h = h.lstrip('#'); r, g, b = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
def ratio(a, b):
    la, lb = lum(a), lum(b); return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)
def hsl_sat(h):
    h = h.lstrip('#'); r, g, b = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    mx, mn = max(r, g, b), min(r, g, b); L = (mx + mn) / 2
    return 0 if mx == mn else (mx - mn) / (1 - abs(2 * L - 1))
print(ratio('#1C1C1A', '#F7F6F3'), ratio('#B5462F', '#EEF0F2'), hsl_sat('#F0B429'))
```

## 7. Pre-flight (skill section 14) against D and E

Items that apply to a design specification are listed; items that only apply to code (GSAP skeletons, `useEffect` cleanup, `'use client'` isolation, `window.addEventListener('scroll')`) are recorded as "not applicable at this stage" and become Phase 1 checks. Items about patterns neither direction uses (marquee, logo wall in the hero, split-header, zigzag, testimonials, progress bars, version footers, weather strips, scroll cues, section-number eyebrows, decorative dots, pills on images, photo-credit captions) pass by absence in both.

| Check | D | E | Note |
|---|---|---|---|
| Brief inference declared | pass | pass | Section 1. |
| Dial values explicit and reasoned | pass | pass | Section 2. |
| Design system chosen or aesthetic labelled | pass | pass | Tailwind v4 utilities plus native CSS; lenses named. |
| Redesign mode | n/a | n/a | Greenfield. |
| Zero em-dashes and en-dashes | pass | pass | Copy rule S6 applied to the site's own strings. This document contains none. |
| Page theme lock | pass | pass | One theme, no inverted sections. |
| Colour consistency lock | pass | pass | One accent each; hover darkens it. |
| Shape consistency lock | changed | changed | D: the lens's pill tags became 6 px so the page has one radius. E: the lens's 2 rem became 16 px and three radii are named. |
| Button contrast | pass | pass | D primary 15.8:1; E primary 5.2:1 light, 7.1:1 dark. |
| CTA wrap | pass | pass | Longest label "Watch @takumyi" is two words. |
| Form contrast | changed | changed | Input borders moved to text-muted (S8), error text in text colour. |
| Serif discipline | pass | pass | No serif. The minimalist lens's Instrument Serif hero was rejected. |
| Premium-consumer palette | pass | pass | Not a premium-consumer brief. D's bone neutral noted and kept faint. |
| Italic descender clearance | n/a | n/a | No italic display type. |
| Hero fits the viewport, top padding, stack of 4 | pass | pass | Name, identity line, two buttons; portrait beside. Top padding 48 to 64 px. |
| Eyebrow count | pass | changed | Zero in both. E dropped the lens's pill badges above headings. |
| Split-header ban | pass | pass | Headings stack vertically. |
| Zigzag cap | pass | pass | No image-text alternation. |
| No duplicate CTA intent | changed | changed | Doors rendered as navigation, not buttons (S2). The hero pair remains because the brief fixes it. |
| Bento rhythm and exact cell count | pass | pass | The only grid is 1 + 2 for three featured entries. |
| Bento background diversity | pass | pass | The spanning cell carries an artefact crop. |
| Copy self-audit | changed | changed | Middle dots removed from meta lines (S3); "Open" labels removed from doors. Case-study TODO comments must be resolved before the strings ship. |
| Motion motivated, motion claimed equals motion shown | pass | pass | Dial 2 claims hover, focus and active only, and that is what ships. |
| Marquee max one | pass | pass | None. |
| Navigation one line, height cap | pass | pass | 64 px bar. E must check Japanese labels at 1024 px. |
| Section-layout repetition | changed | changed | Home uses four families (S1). |
| Long lists use the right component | changed | changed | Work index grouped by country; data pages keep tables by scope. |
| Real images, no fake screenshots, no pure-text minimalism | changed | changed | Artefact crops are the default cover; the number tile is the fallback; placeholder list given. No image tool was available (section 8). |
| Quotes | n/a | n/a | No testimonials. |
| Reduced motion | pass | pass | Transitions to 0 under `reduce`. |
| Dark mode tokens defined | pass | pass | Both tables above; tested only by computation, not in a browser. |
| Mobile collapse explicit | pass | pass | Every multi-column block names its phone fallback. |
| Viewport stability | pass | pass | No full-height hero; sheet uses `100dvh`. |
| Empty, loading, error states | changed | changed | Work index with no match shows "No case studies match these filters" and a clear-filters link; the writing section hides while empty (brief); contact form shows inline errors and a sent state; loading only applies to the form submit button. |
| Cards omitted where spacing suffices | pass | pass | D uses borders only on featured work and videos; E uses panels only where content needs a boundary. |
| Icons from an allowed library | pass | pass | Phosphor Regular (D), Phosphor Light (E). |
| No AI tells from section 9 | pass | pass | Checked against the list. |
| Core Web Vitals plausible | pass | pass | Self-hosted per-locale fonts, `aspect-ratio` on media, no JavaScript beyond islands. Lighthouse cannot be run here. |
| One design system | pass | pass | Tailwind utilities only. |

## 8. Closing

### Rules from this skill that hold whichever direction is chosen

1. No em-dash or en-dash in the site's own copy; published titles and organisation names stay as printed.
2. One accent per direction, used the same way on every page; hover darkens it and never swaps it for another colour.
3. One documented radius rule, applied to buttons, cards, chips, inputs, images and the `/links` buttons alike.
4. No eyebrow above section headings; tags sit below or beside titles in sentence case with no tracking.
5. The middle dot appears at most once per line; meta lines break into two lines or columns instead.
6. The home page uses four layout families across its six sections; the three doors stay equal but are a list, not three cards.
7. Every case-study cover is a real artefact crop; the numbered tile is a fallback and its number is never larger than h2.
8. Motion is hover, focus and active only, 120 to 200 ms, on colour, shadow and transform; nothing on load or scroll; reduced motion sets transitions to 0.
9. No pure `#FFFFFF` or `#000000` in tokens; every text token is at least 4.5:1 on bg and surface in both modes; focus rings and input borders at least 3:1.
10. Fonts are the named Google Fonts families, self-hosted per locale with `font-display: swap` and metric fallbacks; no third family added for interest.

### What the skill wanted that this environment or brief did not allow

- React or Next.js, Server Components, the Motion library and `next/font` (skill 3.A). The plan is static Astro; at MOTION 2 no animation library is needed.
- "Image-generation tool first" (skill 4.8). No image tool was used. The owner is a photographer and the artefacts are real documents, so placeholders are listed instead; both directions need a hero portrait, an `/about` portrait and wide photo, and covers for the three featured case studies.
- "Never link Google Fonts via `<link>` in production" (skill 3.A) against the brief's Google Fonts requirement. Resolved by self-hosting the same families, with the Japanese slicing caveat in section 3 left open until Phase 3.
- "Ask one clarifying question" (skill 0.C). Not permitted; the assumption is stated in section 1.
- Lighthouse and testing in both modes (skill 6.D, 8.D). No build exists; contrast was verified by computation only.
- Dependency verification (skill 3.F). No `package.json` yet; package names for fonts and icons are to be checked when it exists.
- The skill's out-of-scope rule (section 13) on data tables. `/cv`, publications and talks keep the plan's tabular treatment; the skill was applied to their headings, spacing and colour only.
- The skill's 8 / 6 / 4 baseline and its 8 / 7 / 3 portfolio preset. Overridden to 4 / 2 / 5 for the reasons in section 2.
- The skill's bans on three equal cards (9.C) and duplicate CTA intent (4.5). The brief's three equal doors and two hero buttons stand; the mitigations in S1 and S2 keep the doors from reading as cards or as calls to action.
- The minimalist lens's serif hero heading, four pastel accents, pill tags, faux-OS window chrome, fade-ins and ambient blob; the soft lens's OLED black and mesh gradients, 2 rem radii, floating pill nav, eyebrow badges, button-in-button icons, blur fade-ups and grain. Each was rejected by a taste-skill rule, the dials, or the brief's durability constraint, as noted in section 6.
- Out of this brief: `docs/landing-page-brief.md` was committed during this session (commit `a46c86b`; a dark-only page combining two reference prompts, with a marquee name, gradient-filled headings and sticky stacking cards). It was not audited here. If any of it is merged into the main site, the marquee, the gradient text, the dark-only theme and the stacking cards would each fail this skill's pre-flight as written.
