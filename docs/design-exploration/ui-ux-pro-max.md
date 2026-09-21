# UI/UX Pro Max applied to the personal site

Skill: ui-ux-pro-max (its SKILL.md frontmatter carries no version field; the bundled data catalog is stamped verifiedAt 2026-08-26 and the search calibration is 2026-08-12-v1). Companion skill design-system 1.0.0 skimmed.
Source commit dcc40ff (from `.claude/skills/README.md`). Written 2026-09-21.

## 0. How this was run

- Inputs read first: `docs/site-structure.md` sections 1 to 5, 7 and 10; `docs/design-directions.md`; `docs/design-preview.html`; `content/pages/en/home.md`; `content/pages/en/creator.md`. Then the skill's SKILL.md, `references/quick-reference.md`, and a skim of the design-system skill.
- The skill's text and the search results are treated as recommendations. Where they conflict with the plan in `docs/`, the plan wins and the conflict is named.
- Stack is stated, not detected: Astro with Tailwind CSS, static output (site-structure section 7). The skill asks for detection from `package.json`; the site is not scaffolded yet, so there is nothing to detect.
- Every command below was run from the repository root as `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" <flags>`. Nothing was persisted (`--persist` and `--force` were never passed). No packages were installed and nothing touched the network.
- Output is trimmed to the lines that matter. The script writes its dial labels with an em-dash; those are rendered here with a colon.
- The owner's name was passed as `-p` because the brief asked for it. It only labels the output header.

## 1. Search log

### 1.1 Design system, dials 5 / 3 / 4

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "personal portfolio education researcher content creator trilingual" --design-system -p "Takumi Oshiyama" --variance 5 --motion 3 --density 4
```

```
TARGET: Takumi Oshiyama - RECOMMENDED DESIGN SYSTEM
DESIGN DIALS   Variance: 5/10: Balanced / Modern   Motion: 3/10: Subtle   Density: 4/10: Standard
PATTERN        Scroll-Triggered Storytelling
               Sections: Intro hook > Chapter 1 (problem) > Chapter 2 (journey) > Chapter 3 (solution) > Climax CTA
               CTA: End of each chapter (mini) + Final climax CTA
STYLE          Brutalism   (Light supported, Dark supported)
               Keywords: Raw, unpolished, stark, high contrast, plain text, default fonts, visible borders, asymmetric, anti-design
               Best For: Design portfolios, artistic projects, counter-culture brands, editorial/media sites, tech blogs
COLORS         Primary #18181B  Accent/CTA #2563EB  On Accent #FFFFFF  Background #FAFAFA  Foreground #09090B
               Card #FFFFFF  Muted #E8ECF0  Muted Foreground #475569  Border #E4E4E7  Ring #18181B
               Notes: Monochrome + blue accent
TYPOGRAPHY     Caveat / Quicksand
               Mood: handwritten, personal, friendly, casual, warm, charming
               Best For: Personal blogs, invitations, creative portfolios, lifestyle brands
KEY EFFECTS    No smooth transitions (instant), sharp corners (0px), bold typography (700+), visible grid, large blocks
MOTION         Scroll Reveal (Subtle): gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out', scrollTrigger: {...} })
AVOID          Corporate templates + Generic layouts
```

Row identities from the same run with `--json`: category `Portfolio/Personal`; product row `Portfolio/Personal`; reasoning row `Portfolio/Personal` with decision rule `if_creative_field -> style:brutalism` activated; style `brutalism`; color row `Portfolio/Personal`; typography row `Handwritten Charm`; landing row `Scroll-Triggered Storytelling`; severity MEDIUM; spacing scale xs 4, sm 8, md 16, lg 24, xl 32, 2xl 48, 3xl 64.

Fit: the top result does not fit. Three of its five parts break stated constraints. Scroll-triggered chapters with a climax CTA contradict the switchboard home page (site-structure section 1). Brutalism is a trend and the plan asks for nothing that dates fast; its "instant" transitions also contradict the skill's own anti-pattern "Instant state changes (0ms)". Caveat and Quicksand are Latin-only (subsets in the skill's own `google-fonts.csv`: Caveat cyrillic, latin; Quicksand latin, vietnamese), so they cannot set Thai or Japanese, and a handwriting heading face is not neutral toward committees or employers. The palette and the "avoid generic layouts" line are usable.

### 1.2 Design system, dials 7 / 4 / 3

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "personal portfolio education researcher content creator trilingual" --design-system -p "Takumi Oshiyama" --variance 7 --motion 4 --density 3
```

```
DESIGN DIALS   Variance: 7/10: Balanced / Modern   Motion: 4/10: Standard   Density: 3/10: Spacious
PATTERN        Scroll-Triggered Storytelling        (unchanged)
STYLE          Brutalism                            (unchanged)
COLORS         Monochrome + blue accent             (unchanged)
TYPOGRAPHY     Caveat / Quicksand                   (unchanged)
MOTION         Stagger List (Standard): gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, grid: 'auto' }, ease: 'back.out(1.4)' })
```

What the dials changed, checked with `--json` at several settings:

| Dial | Setting | Effect on output |
|---|---|---|
| variance | 2 | Style becomes `Minimalism & Swiss Style` (label Centered / Minimal). Typography still Caveat / Quicksand. |
| variance | 5, 7 | Both labelled Balanced / Modern; style stays Brutalism because the reasoning rule `if_creative_field` fires on the query and outranks the dial in this band. |
| variance | 9 | Brutalism (label Bold / Asymmetric). |
| motion | 3 vs 4 | Swaps the attached GSAP snippet (Scroll Reveal Subtle vs Stagger List Standard). Nothing else. |
| density | 3 | Spacing scale xs 4, sm 8, md 24, lg 32, xl 48, 2xl 64, 3xl 96 (note: no 16 px step). |
| density | 4 | xs 4, sm 8, md 16, lg 24, xl 32, 2xl 48, 3xl 64. |
| density | 8 | xs 2, sm 4, md 8, lg 12, xl 16, 2xl 24, 3xl 32. |

Fit: the dials never touch pattern, palette or typography, so the two runs the brief asked for differ only in the motion snippet and the density label. The variance 2 run is the one worth keeping, because Minimalism & Swiss Style is the only style the tool offered that survives the constraints. The GSAP snippets are declined for this build (section 6).

### 1.3 Design system retries (narrower queries, as the skill asks when the result is off-topic)

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "academic personal portfolio minimal" --design-system -p "Takumi Oshiyama" --variance 5 --motion 3 --density 4
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "portfolio personal website minimal editorial" --design-system -p "Takumi Oshiyama" --variance 5 --motion 3 --density 4
```

```
PATTERN     Scroll-Triggered Storytelling       (both)
STYLE       Brutalism                           (both)
COLORS      Monochrome + blue accent            (both)
TYPOGRAPHY  Archivo / Space Grotesk             (both)
            Mood: minimal, portfolio, designer, creative, clean, artistic
```

Fit: the category resolves to `Portfolio/Personal` whatever the wording, so pattern, style and palette do not move. The typography slot changed to Archivo / Space Grotesk, which is again Latin-only (subsets latin, latin-ext, vietnamese for both), so no `--design-system` run produced a font pairing that can set Thai or Japanese. The typography part of the design-system output is therefore set aside and the `--domain typography` results below are used instead.

### 1.4 Style

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "portfolio editorial minimal neutral" --domain style
```

```
Found: 1 results
Style ID: minimalism-and-swiss-style   Style Category: Minimalism & Swiss Style   Status: active   Type: General
Keywords: Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential
Primary Colors: Monochromatic, Black #000000, White #FFFFFF
Effects & Animation: Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading
Best For: Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools
Light Mode: supported   Dark Mode: supported   Performance: cost:low   Accessibility: risk:low, requires contrast-text-4.5, keyboard, visible-focus, reduced-motion
CSS/Technical Keywords: display: grid, gap: 2rem, font-family: sans-serif, max-width: 1200px, clean borders, no box-shadow unless necessary
Implementation Checklist: Grid-based layout 12-16 columns, Typography hierarchy clear, No unnecessary decorations, text contrast measured against the chosen project target, Mobile responsive grid
Design System Variables: --spacing: 2rem, --border-radius: 0px, --font-weight: 400-700, --shadow: none, --accent-color: single primary only
```

Fit: this fits. Single accent, no shadows, radius 0, sans-serif, a grid and fast loading are all already in the plan, and the row supports light and dark. Its "Best For" list is software, not a person, which is the same risk Register carries.

Follow-up on the style's child row:

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "swiss modernism editorial grid" --domain style -n 2
```

```
Found: 1 results
Style ID: swiss-modernism-2-0   Parent Style ID: minimalism-and-swiss-style
Keywords: Grid system, Helvetica, modular, asymmetric, international style, rational, clean, mathematical spacing
Primary Colors: #000000, #FFFFFF, #F5F5F5, single vibrant accent only
Effects & Animation: display: grid, grid-template-columns: repeat(12 1fr), gap: 1rem, mathematical ratios, clear hierarchy
Design System Variables: --grid-columns: 12, --grid-gap: 1rem, --base-unit: 8px, --font-primary: Inter, --color-text: #000000, --color-bg: #FFFFFF, --accent: single vibrant
```

Fit: fits as a layout spec (12 columns, 8 px base unit, one accent). Its suggested font, Inter, is Latin-only and would need Noto partners for Thai and Japanese; site-structure section 10 already lists Inter + Noto as a candidate.

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "accessible ethical" --domain style -n 1
```

```
Style ID: accessible-and-ethical
Keywords: Accessible, inclusive interface, high contrast, large text (16px+), keyboard navigation, screen reader friendly, focus state, semantic
Effects & Animation: Clear focus rings (3-4px), ARIA labels, skip links, responsive design, reduced motion, 44x44px touch targets
Design System Variables: --contrast-ratio: 7:1, --font-size-min: 16px, --focus-ring: 3-4px, --touch-target: 44x44px
```

Fit: fits as an accessibility spec, not as a look. Its 7:1 target is AAA; the plan's requirement is AA, and the Direction G tokens below happen to clear 7:1 for body text anyway.

### 1.5 Typography

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "multilingual thai japanese latin sans serif pairing" --domain typography
```

```
Found: 3 results
1. Japanese Elegant (Serif + Sans): Noto Serif JP / Noto Sans JP
   Best For: Japanese sites, Japanese restaurants, cultural sites, anime/manga
   Google Fonts: Noto+Sans+JP:wght@300;400;500;700 & Noto+Serif+JP:wght@400;500;600;700
2. Thai Modern (Sans + Sans): Noto Sans Thai / Noto Sans Thai
   Best For: Thai sites, Southeast Asia, tourism, Thai restaurants
   Google Fonts: Noto+Sans+Thai:wght@300;400;500;700
3. Chinese Traditional (Serif + Sans): Noto Serif TC / Noto Sans TC
```

Fit: partial. The database has no pairing that covers Latin, Thai and Japanese together; its Thai and Japanese rows are single-script and both point at Noto. That confirms the plan's fallback (Noto Sans Thai and Noto Sans JP) and matches the UI set in Feature. Nothing here breaks a constraint, but nothing here decides the Latin face either.

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "ibm plex" --domain typography -n 2
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "inter clean modern sans" --domain typography -n 2
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "editorial serif academic scholarly" --domain typography -n 2
```

```
Financial Trust: IBM Plex Sans / IBM Plex Sans. Best For: Banks, finance, insurance, investment, fintech, enterprise. Notes: conveys trust and professionalism. Excellent for data.
Developer Mono: JetBrains Mono / IBM Plex Sans. Best For: Developer tools, documentation, code editors, tech blogs.
Modern Dark Cinema (Inter System): Inter / Inter. Notes: Inter 700 (-1.5 tracking) Display 48; 600 (-0.5) H1 32 / H2 24; 400 body 16; 500 uppercase +1.2 tracking labels.
Spatial Clear: Inter / Inter. Best For: Spatial computing, AR/VR, glassmorphism.
Academic/Research: Crimson Pro / Atkinson Hyperlegible. Best For: Universities, research papers, academic journals.
Academic/Archival: EB Garamond / Crimson Text. Best For: University sites, archives.
```

Fit: the Plex rows describe Register's family as a finance and developer face, which is the risk Register already lists. The Inter system row gives a usable single-family scale (48 / 32 / 24 / 16 / 13 labels) that Direction G borrows. The academic rows are Latin-only (Crimson Pro latin, latin-ext, vietnamese; Atkinson Hyperlegible latin, latin-ext) and a serif-led pairing tilts the site toward committees, so they are not taken.

### 1.6 Colour

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "neutral teal portfolio calm" --domain color
```

```
Found: 3 results
1. Yoga & Stretching Guide: Primary #6B7280  Accent #0891B2  On Accent #000000  Background #F5F5F0  Foreground #0F172A
   Muted Foreground #475569  Border #EDEEEF   Notes: Sage neutral + calm teal
2. Portfolio/Personal: Primary #18181B  Accent #2563EB  On Accent #FFFFFF  Background #FAFAFA  Foreground #09090B
   Muted Foreground #475569  Border #E4E4E7   Notes: Monochrome + blue accent
3. Healthcare App: Primary #0891B2  Accent #059669  Background #ECFEFF   Notes: Calm cyan + health green
```

Fit: the top row fits in mood (warm-grey ground, one cool accent) but not as given. Computed with the snippet in section 4: #0891B2 as link text on #F5F5F0 is 3.37:1 and white on #0891B2 is 3.68:1, both below AA for normal text; the row's own black-on-accent pairing is 5.70:1. The border #EDEEEF is 1.06:1 against the background, invisible as a rule. Direction G keeps the hue and darkens it. The second row passes as given (white on #2563EB 5.17:1, #2563EB on #FAFAFA 4.95:1) but is the Tailwind default blue on zinc, which is the "generic" look the reasoning row itself warns against.

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "teal sage neutral" --domain color -n 2
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "academic research navy" --domain color -n 2
```

```
Yoga & Stretching Guide (same row as above)
Knowledge Base/Documentation: Primary #475569  Accent #2563EB  Background #F8FAFC  Foreground #1E293B  Border #E2E8F0   Notes: Neutral grey + link blue
Research Lab / University Department: Primary #1E3A5F  Accent #A16207  Background #F8FAFC  Foreground #0F172A  Border #CBD5E1   Notes: Institutional navy + research accent + serif headings
Academic Journal / Scholarly Publishing: Primary #1E3A5F  Accent #B45309   Notes: Scholarly navy + citation gold + serif accent
```

Fit: the retry returns the same teal row, so it is the database's only teal-on-neutral answer. The navy-and-gold academic rows are what the database would give a research-only site; they are not taken because they would lean the site toward one audience.

### 1.7 UX: switchboard navigation

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "portfolio navigation switchboard hub" --domain ux
```

```
Found: 3 results
1. Navigation / Sticky Navigation (Web, Medium): Fixed nav should not obscure content. Do: add padding-top to body equal to nav height. Don't: let nav overlap first section content.
2. Accessibility / Keyboard Navigation (Web, High): complete keyboard navigation with visible focus on every operable control. Do: keep tab order aligned with visual order and test every action without a pointer.
3. Navigation / Breadcrumbs (Web, Low): Do: use for sites with 3+ levels of depth. Don't: use for flat single-level sites.
```

Fit: partial. The database has no "hub" or "switchboard" concept, so it returned general navigation rules. All three apply: the header must not cover the hero, the menu must be keyboard-operable (site-structure section 10), and breadcrumbs are not needed because the deepest route is two levels (`/work/[slug]`).

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "nav hierarchy primary secondary" --domain ux -n 2
```

```
1. Navigation / Breadcrumbs (as above)
2. Accessibility / Heading Hierarchy (All, Medium): Do: use sequential heading levels h1-h6. Don't: skip heading levels or misuse for styling.
```

Fit: the retry did not find a primary-versus-secondary navigation rule in the CSV (the quick-reference lists `nav-hierarchy` but the search does not surface it). Heading hierarchy applies to every page.

### 1.8 UX: language switcher

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "language switcher locale" --domain ux
```

```
Found: 1 results
Content / Date Formatting (All, Low): Use locale-appropriate date formats. Do: use relative or locale-aware dates. Don't: ambiguous date formats. Bad: 01/02/03
```

Fit: off-topic for the switcher, but the one rule it returned matters for this site: dates on `/work`, `/research` and `/creator` (view counts "as of" dates) must be unambiguous in all three locales. Retries per the skill:

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "localization i18n language selection" --domain ux -n 3   ->  Found: 0 results
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "language locale region" --domain web -n 2               ->  Found: 0 results
```

A direct grep of `data/ux-guidelines.csv` for "language", "i18n", "translat", "RTL" confirms there is no localisation guideline in the database. No verified match; the plan's own rule stands (site-structure section 3: the switcher shows only the languages that exist for the current page, `hreflang` only for those, locale-prefixed routes from day one).

### 1.9 UX: dark mode

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dark mode contrast tokens" --domain ux
```

```
Found: 3 results
1. Typography / Contrast Readability (All, High): Do: use darker text on light backgrounds. Don't: gray text on gray background. Bad: text-gray-400 on gray-100.
2. Accessibility / Color Contrast (All, High): Do: minimum 4.5:1 ratio for normal text. Good: #333 on white (7:1). Bad: #999 on white (2.8:1).
3. Accessibility / Focus Appearance (Web, Medium): WCAG 2.2 AAA minimum area and contrast for focus indicators. Do: an indicator at least as large as a 2 CSS px perimeter with 3:1 state contrast. Good: outline: 2px solid currentColor; outline-offset: 2px.
```

Fit: fits as a contrast checklist. It says nothing specific to dark mode; the retry `"dark mode desaturated tonal" --domain ux` returned 0 results and a grep of the CSV for "dark mode" finds no row. The quick-reference's `color-dark-mode` ("desaturated or lighter tonal variants, not inverted colours; test contrast separately") and `dark-mode-pairing` exist only in the reference file, not in the searchable data. The three baseline directions already follow that rule (lighter accents in dark, separate contrast figures per theme).

### 1.10 Landing: hero

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "portfolio hero introduction" --domain landing
```

```
Found: 3 results
1. portfolio-grid / Portfolio Grid (alias Portfolio + Hero-Centric)
   Section Order: Hero (Name/Role) > Project Grid (Masonry) > About/Philosophy > Contact
   Primary CTA Placement: Project Card Hover + Footer Contact
   Color Strategy: Neutral background (let work shine). Text: Black/White. Accent: Minimal.
   Conversion Optimization: Visuals first. Filter by category. Fast loading essential.
2. hero-centric-design / Hero-Centric Design
   Section Order: Full-bleed Hero > Single value prop strip > Key benefit or proof > Primary CTA
   Conversion: One primary CTA. Verify CTA label text against the button fill at 4.5:1 minimum. Static hero and non-pulsing CTA under reduced motion.
3. hero-features-cta / Hero + Features + CTA
   Section Order: Hero with headline/image > Value prop > Key features (3-5) > CTA section > Footer
```

Fit: the top result fits better than the design-system pattern did. "Hero (Name/Role) > grid > About > Contact" is the home page in site-structure section 5 with the doors standing in for the grid, and "filter by category, fast loading" is the `/work` index. Two parts are not taken: masonry (uneven tiles make one door bigger than another, which section 1 forbids) and "CTA on card hover" (hover-only affordances fail on touch; see 1.11). The 4.5:1 check on button labels is applied to every direction's accent-text token.

### 1.11 UX: bio-link page

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "bio link page mobile buttons" --domain ux
```

```
Found: 3 results
1. Interaction / Loading Buttons (All, High): disable button and show loading state during async actions.
2. Performance / Image Optimization (All, High): Do: appropriate size and format (WebP), srcset with multiple sizes. Bad: 4000px image for 400px display.
3. Navigation / Active State (All, Medium): Do: highlight active nav item with color/underline.
```

Fit: off-topic for `/links`, which has no async buttons and no navigation. Image optimisation applies to the portrait on that page. Retry:

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "touch target size mobile" --domain ux -n 2
```

```
1. Touch / Touch Target Size (High): Do: 44pt on iOS and 48dp on Android; for web use the separate WCAG Target Size rule. Don't: treat one unit as universal.
2. Touch / Touch Spacing (Medium): Do: minimum 8px gap between touch targets. Don't: tightly packed clickable elements.
```

And the web rule it points to, read from the CSV: `[104] Accessibility / Target Size (Minimum) (Web, High)`: WCAG 2.2 AA requires 24 CSS px pointer targets or an applicable exception. These fit: the `/links` column of six to eight buttons needs a stated height (the baselines use 48 to 52 px) and 8 px or more between buttons.

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "link-in-bio creator page" --domain product -n 2
```

```
1. Link-in-Bio Page Builder: Primary Style Vibrant & Block-based + Bento Box Grid; Secondary Minimalism & Swiss Style, Glassmorphism; Pattern Conversion-Optimized + Social Proof; Palette Brand-customizable + accent link color + clean white canvas
2. Research Lab / University Department (see 1.13)
```

Fit: the product row for bio-link pages recommends bento grids and glassmorphism, both of which the design-directions framing rules out. Its secondary style, Minimalism & Swiss Style, is the one used here. "Accent link colour on a clean canvas" agrees with the plan.

### 1.12 Stack: Astro, then Tailwind

`astro` is a listed stack, so `--stack html-tailwind` was run as a supplement for the Tailwind half rather than as a replacement.

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "static content site images fonts i18n" --stack astro
```

```
Found: 3 results   (Applies To: astro 7.1.6, verified 2026-08-13)
1. Performance / Preload critical assets (Medium): Do: preload fonts, above-fold images. Good: <link rel="preload" href="font.woff2" as="font">
2. Components / Keep .astro for static (High): Do: Astro components for layout structure. Don't: React/Vue for static markup.
3. Routing / Use getStaticPaths for SSG (High): Do: getStaticPaths for known dynamic routes. Don't: fetch at runtime for static content.
```

Fit: all three fit a static content site with `/work/[slug]` and `/writing/[slug]` routes. The "Applies To: astro 7.1.6" line is the database's snapshot; the plan should pin whatever Astro version is current when scaffolding.

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "i18n routing hreflang locale" --stack astro -n 3          ->  Found: 0 results
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "image optimization responsive" --stack astro -n 2
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "view transitions islands hydration" --stack astro -n 3
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "font loading self-host" --stack astro -n 2
```

```
Performance / Optimize images with astro:assets (High): Do: <Image /> component. Don't: <img> for local images.
Performance / Use picture for responsive images (Medium): Do: <Picture /> for art direction.
Architecture / Use Islands Architecture (High): Do: interactive components with client directives. Don't: hydrate the entire page.
ViewTransitions / Use ClientRouter for client-side transitions (Medium): Do: <ClientRouter /> in the shared head. Don't: use removed <ViewTransitions />.
ViewTransitions / Use transition:name (Low).
Performance / Lazy load below-fold content (Medium): loading=lazy for images, client:visible for components.
```

Fit: the Astro rows fit (53 rows in the file; none cover i18n routing, so the plan's locale scheme is unverified by the database and stands on its own). Islands matter here: the only scripts this site needs are the theme toggle and the mobile menu. `ClientRouter` is optional and not required by the plan.

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dark mode tokens theme" --stack html-tailwind -n 3
```

```
Found: 3 results   (Applies To: html-tailwind 4.3)
1. Colors / Dark mode (Medium): Do: dark:bg-gray-900 dark:text-white.
2. Colors / Semantic colors (Medium): Do: declare --color-primary and related tokens in @theme. Don't: repeat palette utilities in components.
3. Colors / Theme color variables (Medium): Do: @theme { --color-primary: oklch(...); } so Tailwind generates semantic utilities. Don't: use arbitrary CSS-variable utilities for registered tokens.
```

Fit: rows 2 and 3 fit and are worth taking: Tailwind v4's `@theme` block is where the `bg / surface / text / text-muted / border / accent / accent-text` tokens from the directions document should live, with the dark values redefined under a `[data-theme="dark"]` or `prefers-color-scheme` block. Row 1's `dark:` prefix per utility is the pattern to avoid once tokens exist, because it repeats colours in every component.

### 1.13 Product rows

```
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "portfolio personal showcase" --domain product -n 1
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "academic research lab publications" --domain product -n 2
```

```
Portfolio/Personal: Primary Style Motion-Driven + Minimalism & Swiss Style; Secondary Brutalism, Aurora UI; Pattern Storytelling-Driven; Palette Brand primary + artistic interpretation
Research Lab / University Department: Swiss Modernism 2.0 + Minimalism & Swiss Style; Secondary Editorial Grid / Magazine, Accessible & Ethical; Pattern Overview + People + Publications; Palette Institutional navy + white + research area accents + serif headings
Academic Journal / Scholarly Publishing: Swiss Modernism 2.0 + Minimalism & Swiss Style; Pattern Content-Index + Search; Palette Trust navy + white + citation blue + serif accents
```

Fit: the two product rows nearest this site's audiences (personal portfolio; research lab) share one style, Minimalism & Swiss Style, which is the strongest signal the database gives. Motion-Driven, Aurora UI and Brutalism are declined (JavaScript-free static site; nothing that dates fast). Navy and serif headings from the academic rows are declined for neutrality.

### 1.14 Google Fonts coverage checks

The `--domain google-fonts` search is fuzzy (querying "IBM Plex Sans" returned IBM Plex Sans KR, "Noto Sans" returned Noto Sans Lycian), so coverage was confirmed by reading the exact family rows from `data/google-fonts.csv`:

| Family | Subsets (from the CSV) | Variable | Covers |
|---|---|---|---|
| IBM Plex Sans | cyrillic, greek, latin, latin-ext, vietnamese | wdth, wght | Latin |
| IBM Plex Sans Thai | cyrillic-ext, latin, latin-ext, thai | no | Thai |
| IBM Plex Sans JP | cyrillic, japanese, latin, latin-ext | no | Japanese |
| Noto Sans | cyrillic, devanagari, greek, latin, latin-ext, vietnamese | wdth, wght | Latin |
| Noto Sans Thai | latin, latin-ext, thai | wdth, wght | Thai |
| Noto Sans JP | cyrillic, japanese, latin, latin-ext, vietnamese | wght | Japanese |
| Anuphan | latin, latin-ext, thai, vietnamese | wght 100 to 700 | Latin, Thai |
| Zen Kaku Gothic New | cyrillic, japanese, latin, latin-ext | no (300, 400, 500, 700, 900) | Japanese |
| Source Serif 4 / Source Sans 3 | latin, latin-ext, cyrillic, greek, vietnamese | opsz, wght | Latin |
| Noto Serif Thai / Noto Serif JP | thai / japanese plus latin | wght | Thai / Japanese |
| Caveat, Quicksand, Archivo, Space Grotesk, Inter, Crimson Pro, Atkinson Hyperlegible | latin (plus cyrillic, greek or vietnamese) | varies | Latin only |

Every family the three baseline directions use is present with the coverage the directions claim. Every Latin face the database proposed for headings or body would need Thai and Japanese partners.

### 1.15 Results that would break a stated constraint

| Result | Row identity | Constraint it breaks |
|---|---|---|
| Scroll-Triggered Storytelling with chapters and climax CTA | landing `Scroll-Triggered Storytelling`, via reasoning `Portfolio/Personal` | Home page is a switchboard, not a narrative; no audience gets a bigger door |
| Brutalism | style `brutalism`, via rule `if_creative_field` | Nothing that dates fast; neutral toward four audiences; "instant" transitions contradict the skill's own anti-pattern |
| Caveat / Quicksand | typography `Handwritten Charm` | No Thai or Japanese coverage; handwriting is not neutral |
| Archivo / Space Grotesk | typography (retry) | No Thai or Japanese coverage |
| Crimson Pro / Atkinson Hyperlegible; EB Garamond / Crimson Text | typography `Academic/Research`, `Academic/Archival` | Latin only; serif-led pairing leans academic |
| Motion-Driven, Aurora UI | product `Portfolio/Personal` primary and secondary styles | Static Astro with almost no JavaScript; no gradients or blobs |
| Bento Box Grid, Glassmorphism | product `Link-in-Bio Page Builder` | Design-directions framing rules out bento grids and glass |
| Masonry project grid, CTA on card hover | landing `portfolio-grid` | Equal doors; hover-only affordance fails on touch (skill priority 2) |
| GSAP Scroll Reveal and Stagger List | motion dial snippets | Adds a JavaScript animation dependency the plan does not want; no entrance animations in any direction |
| Navy + gold + serif headings | color `Research Lab / University Department` | Neutral design; one accent |
| Teal #0891B2 with white text, or as link text on #F5F5F0 | color `Yoga & Stretching Guide` as given | WCAG AA (3.68:1 and 3.37:1); fixed by darkening in Direction G |

## 2. What the database recommends, consolidated

| Field | Recommendation kept | Row identity | Discarded from the same slot |
|---|---|---|---|
| Pattern | Hero (name, role) > grid of equal entries > About > Contact; filter by category; fast loading | landing `portfolio-grid` | `Scroll-Triggered Storytelling` (design-system default for `Portfolio/Personal`); `hero-centric-design` full-bleed hero |
| Style | Minimalism & Swiss Style: sans-serif, grid of 12 columns, radius 0, no shadow, single accent, subtle hover 200 to 250 ms; Swiss Modernism 2.0 for the grid spec; Accessible & Ethical for the a11y spec | styles `minimalism-and-swiss-style` (top `--domain style` result and the `--variance 2` design-system result), `swiss-modernism-2-0`, `accessible-and-ethical` | `brutalism` |
| Palette | Warm-grey ground with one cool accent: bg #F5F5F0, text #0F172A, muted #475569, accent hue from #0891B2 darkened for AA | colors `Yoga & Stretching Guide` (hue and neutrals), `Portfolio/Personal` (accent-text and muted values) | Tailwind blue #2563EB on zinc as the accent; navy and gold |
| Typography | Noto Sans Thai and Noto Sans JP for the two scripts; a single-family scale of 48 / 32 / 24 / 16 with 13 px uppercase labels | typography `Thai Modern`, `Japanese Elegant` (sans half), `Modern Dark Cinema (Inter System)` (scale only) | `Handwritten Charm`, Archivo / Space Grotesk, `Academic/Research` |
| Effects | Smooth transitions 200 to 250 ms, sharp corners, no box-shadow, visible grid | style `minimalism-and-swiss-style` effects; `brutalism` "visible grid" is the one Brutalism trait that survives | Instant transitions, 700+ everywhere, large blocks |
| Motion | Colour and underline transitions only; respect reduced motion | quick-reference `reduced-motion`, `transform-performance`, `duration-timing` | motion `Scroll Reveal (Subtle)`, `Stagger List (Standard)` |
| Anti-patterns | Corporate templates and generic layouts; hover-only actions; emoji as icons; instant state changes; gray on gray; placeholder-only labels | reasoning `Portfolio/Personal` Anti_Patterns; SKILL.md priority table | |
| Stack | `.astro` components for all static markup; `getStaticPaths` for slug routes; `astro:assets` Image and Picture; preload the critical font; islands only for the theme toggle and menu; Tailwind v4 `@theme` semantic tokens | stacks/astro.csv rows Preload critical assets, Keep .astro for static, Use getStaticPaths for SSG, Optimize images with astro:assets, Use Islands Architecture; stacks/html-tailwind.csv rows Semantic colors, Theme color variables | `dark:` prefix per utility; `ClientRouter` (optional, not needed) |

## 3. Comparison against Register, Feature and Explainer

| Dimension | Database | Register | Feature | Explainer |
|---|---|---|---|---|
| Type category | Sans, single family, grid-based | Agrees (Plex, one family) | Disagrees (serif reading face) | Agrees (Anuphan sans) |
| Thai and Japanese | Noto Sans Thai, Noto Sans JP | Plex Thai and JP, not Noto | Noto Serif and Noto Sans for UI: agrees on the UI set | Anuphan and Zen Kaku, not Noto |
| Accent | One accent on a neutral ground; the teal row's hue | Agrees (teal #0B6B60) | Agrees in count, plum | Agrees in count, amber as fill |
| Corner radius | 0 | Agrees (0) | 3 px, close | 10 to 12 px, disagrees |
| Cards | Grid cells, no shadow | Bordered rectangles, agrees on no shadow | Borderless with top rule, closest to a ruled grid | Bordered with radius |
| Lists | Grid, filter by category | Tables with mono year column, agrees | Stacked entries | Rows with chips |
| Motion | Subtle hover 200 to 250 ms; no scroll effects taken | 120 ms colour only, slightly under the range | 240 ms hero fade, disagrees with "no entrance animation" only mildly | 150 ms hover lift; hover must not be the only affordance |
| Landing order | Hero (name, role) > grid > About > Contact | All three agree: hero, doors, cards, contact strip | | |
| Focus ring | 3 to 4 px (Accessible & Ethical) or 2 px perimeter with 3:1 (WCAG 2.2) | 2 px accent | 2 px accent | 2 px text colour |
| Font loading | `font-display: swap` plus a metric-matched fallback to avoid layout shift | Not specified | Not specified | Not specified |
| Body size | 16 px minimum on mobile | 16 | 18 | 17 |
| Tailwind tokens | `@theme` semantic tokens | Token names agree; mechanism not stated | Same | Same |

Where the database agrees: with Register on almost every structural point (sans, one family per role, grid, radius 0, tables, single accent, colour-only motion), and with the whole set on the landing order, one accent, WCAG AA, mobile-first and 16 px or larger body text.

Where it disagrees and the disagreement is worth taking:

1. Font loading. None of the three directions says how three script families load without layout shift. The database's `Font Loading` rows (`[50]` swap or optional; `[75]` reserve space with a fallback font) should be applied to whichever direction wins: `font-display: swap`, one preload for the Latin body face, and `@font-face` fallbacks with `size-adjust` and `ascent-override` tuned to the chosen family so Thai and Japanese pages do not jump when their fonts arrive.
2. Focus ring size. Move from 2 px to 3 px with a 2 px offset in every direction. It costs nothing and satisfies both the WCAG 2.2 row and the Accessible & Ethical row.
3. Tailwind v4 `@theme`. Declare the seven tokens once and redefine them for dark under one selector, instead of `dark:` utilities per component. The design-directions document names the tokens; the database names the mechanism.
4. Target sizes on `/links`. The Touch Spacing row (8 px gap) and Target Size row (24 px minimum, 44 px recommended) turn the baseline's "48 px tall" into a testable rule: 48 px tall, 12 px apart.
5. Locale-aware dates. The one `Content / Date Formatting` row fixes a real gap: view counts and export dates on `/creator` and years on `/work` need a format that is unambiguous in English, Thai (Buddhist-era years are common) and Japanese.

Where it disagrees and the disagreement is not worth taking: storytelling chapters, Brutalism, handwriting or Latin-only pairings, GSAP reveals, bento or masonry grids, navy and serif for the academic audience, the Tailwind default blue.

## 4. Direction G: Index

### Concept

A ruled index. The page is a twelve-column grid whose hairlines stay visible on the home page and the index pages, so the doors, the case-study cards and the publication rows all sit on the same lines and the site reads as one ordered sheet rather than a stack of boxes. One sans super-family, Noto, sets English, Thai and Japanese at the same weights, and a single cyan-teal is the only colour.

### Who it feels right to and why

Committees and employers see the register the database associates with research-lab and journal sites (Swiss Modernism 2.0, Minimalism & Swiss Style) without the navy or the serif that would say "department page". Brands see a clean canvas with logos and thumbnails aligned to a grid, which is how a media kit is laid out. Followers arriving from a bio link see a fast page whose doors are full-width tap rows on a phone. It stays neutral by construction: no serif, no chips in brand colours, no follower counts on the home page, three doors of equal size, one accent.

### Typography

| Script | Family | Weights | Role |
|---|---|---|---|
| Latin | Noto Sans | 400, 500, 700 (italic 400) | body, UI, headings |
| Thai | Noto Sans Thai | 400, 500, 700 | body, UI, headings |
| Japanese | Noto Sans JP | 400, 500, 700 | body, UI, headings |

Why they pair: the database's only Thai and Japanese rows are Noto (`Thai Modern`, `Japanese Elegant`), and the database's Latin candidates (Inter, Archivo, Quicksand) are all Latin-only, so the Latin face is taken from the same super-family rather than pairing Inter with Noto. Noto Sans, Noto Sans Thai and Noto Sans JP share vertical metrics and a weight scale by design; Noto Sans and Noto Sans Thai are variable in weight and width, Noto Sans JP is variable in weight, so any weight between 400 and 700 is available without another file. Noto Sans Thai is the loopless cut; Noto Sans Thai Looped exists in the same family (confirmed in `google-fonts.csv`) if a formal Thai is wanted later. The serif half of `Japanese Elegant` (Noto Serif JP headings) is not taken: it would tilt toward committees and mincho at heading weights fills in on screens.

Type scale (base 16 px, ratio 1.25, body line-height 1.6; the display step skips one so the name on the home hero is the only thing at 48):

| Step | Size | Weight | Use |
|---|---|---|---|
| meta | 13 px | 500, uppercase, letter-spacing 0.04 em | dates, tags, organisation |
| small | 14 px | 400 | captions, footer |
| body | 16 px | 400 | running text |
| lead | 20 px | 400 | identity line, card summaries |
| h3 | 20 px | 600 | card titles |
| h2 | 25 px | 600 | section titles |
| h1 | 31 px | 700 | page titles |
| display | 48 px | 700, letter-spacing -0.01 em | name on the home hero only |

Script adjustments: `:lang(th)` keeps the size with line-height 1.7 for tone marks. `:lang(ja)` keeps the size with line-height 1.8 and headings at 600 instead of 700, because Noto Sans JP kanji at 700 darken faster than the Latin. Numbers in tables use `font-variant-numeric: tabular-nums`, which Noto Sans supports.

### Colour tokens

The hue is the database's `Yoga & Stretching Guide` accent #0891B2 (hsl 192, 91%, 36%), darkened for AA in light mode and lightened for dark mode; the light neutrals are that row's background and foreground; muted text is the value shared by both database rows. Borders are hairlines for decoration only and are not relied on as control boundaries.

| Token | Light | Dark |
|---|---|---|
| bg | #F5F5F0 | #131715 |
| surface | #FFFFFF | #1B201E |
| text | #0F172A | #E8ECEA |
| text-muted | #475569 | #A3AEAA |
| border | #C9CEC8 | #363E3B |
| accent | #0A6B80 | #5FD3E6 |
| accent-text | #FFFFFF | #06181C |

Contrast, computed with the snippet below (WCAG relative luminance):

| Pair | Light | Dark |
|---|---|---|
| text on bg | 16.32:1 | 15.17:1 |
| text on surface | 17.85:1 | 13.85:1 |
| text-muted on bg | 6.93:1 | 7.92:1 |
| text-muted on surface | 7.58:1 | 7.23:1 |
| accent-text on accent (buttons) | 6.13:1 | 10.34:1 |
| accent on bg (links, focus ring) | 5.60:1 | 10.29:1 |
| accent on surface | 6.13:1 | 9.39:1 |
| border on bg (decorative hairline) | 1.46:1 | 1.64:1 |

Every text pairing clears AA (4.5:1) and every body-text pairing clears 7:1. The accent may be used as link text and as the focus ring in both themes (it is above 3:1 against both bg and surface for the focus-appearance rule). Hairlines are below 3:1 on purpose; inputs and secondary buttons draw their boundary in the text colour, not the border colour.

```python
def lum(h):
    h = h.lstrip('#'); r, g, b = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
def contrast(a, b):
    la, lb = lum(a), lum(b); hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)
print(round(contrast('#0A6B80', '#F5F5F0'), 2))   # 5.6
```

### Layout and grid

Container 1200 px (the Minimalism row's max-width), twelve columns with a 32 px gap (its `gap: 2rem`), collapsing to four columns under 768 px. Reading column spans eight columns and is capped at 68 ch. Spacing uses the script's density-3 scale with the missing 16 px step put back: 4, 8, 16, 24, 32, 48, 64, 96. Section spacing 96 px on desktop, 56 px on phones. Hairlines: on the home page and on the `/work`, `/research` and `/creator` indexes, grid cells draw a 1 px top rule and, from 768 px up, a 1 px left rule in the border colour, so the column lines are visible between doors and cards. Prose pages (`/about`, a case study, a post) draw no column lines, only a top rule per section. Lists (publications, talks, timeline) are ruled rows with the year in a two-column span, tabular figures, collapsing to stacked rows on phones. The `/links` page is the same grid at one column: portrait, name, then buttons 48 px tall with 12 px between them.

### Component character

Buttons: radius 0, 44 px tall, weight 500, 20 px side padding. Primary is filled accent with accent-text; secondary is a 1 px border in text colour with transparent fill. Links in running text are text colour with a 1 px underline in accent, offset 3 px; hover thickens it to 2 px. Tags are meta-style text (13 px, uppercase, 500) in text-muted, separated by a slash, no border, no fill. Cards have no fill and no box: a grid cell with a meta line, an h3, one sentence in body, and an optional cover at the top. Filter chips on `/work` are the same tag style with a 2 px bottom rule in accent when active. Navigation is one row of 500-weight links; the active one carries a 2 px bottom rule in accent. The language switch is a text control listing only the locales that exist for the page (plan section 3; the database has no rule for this). Focus ring: 3 px solid accent, 2 px offset, on every interactive element.

### Motion

Colour, underline and border transitions at 200 ms (the Minimalism row's 200 to 250 ms band). No entrance animations, no scroll reveals, no hover scaling or lifting, no view transitions. The GSAP snippets the motion dial attached are not used. `prefers-reduced-motion: reduce` removes the transitions. Interactive states change colour, never layout.

### Imagery guidance

Portrait: 1:1, radius 0, filling one grid cell at 96 px on the hero and 200 px on `/about`, natural colour. Video thumbnails: 9:16 at 96 px wide, sitting in a ruled row beside a meta line and title, never a poster grid; on `/creator` the same rows grouped under format headings. Case-study covers: 16:10 field in the surface colour with the headline number at 48 px, weight 700, in accent (6.13:1 on surface), and the organisation name in meta below; no photographs on covers. Collaboration logos: monochrome in text-muted on a row of grid cells with hairlines, so no brand's colour competes with the accent.

### References

Rasmus Andersson's site (rsms.me): one sans, a plain grid, metadata in small caps, a personal site that does not read as a template. Grilli Type (grillitype.com): a Swiss grid with visible column rules and large type on a neutral ground. Google Fonts' Noto overview (fonts.google.com/noto): the reference for how one family behaves across Latin, Thai and Japanese at the same weights; a type reference, not a layout reference.

### Risks

Noto Sans is the system face of Android and Chrome OS, so the site can look like a settings page unless the grid and the scale do the work; the 48 px display step and the hairlines are what keep it from that. Visible column rules on every page would read as a spreadsheet; they are confined to the home page and the indexes for that reason. The accent sits next to Register's teal, so this direction is an alternative on structure and type, not on colour; if the owner dislikes teal, both fall together. Noto Sans JP at 700 is heavy; the 600 rule for Japanese headings must be kept. Three families are three requests, like Register; Google Fonts serves Noto Sans JP in unicode-range slices so the Japanese download is spread over pages. Hairlines at 1.46:1 are decorative and cannot serve as the boundary of inputs or secondary buttons.

### Tailwind consequence

`fontFamily.sans` = Noto Sans, Noto Sans Thai, Noto Sans JP; no mono stack; `borderRadius` 0; base text 16 px; the seven tokens in `@theme` with dark values under one selector; container 1200 px; a `grid-cols-12` layout with `border-t` and `md:border-l` on index cells.

## 5. UX guidelines this build must satisfy

Identities are the `Category / Issue` pairs the script returned, with the quick-reference id in brackets where it matches. Grouped by the skill's priority categories; category 10 (charts) is omitted because the site has no charts, only figures with their export date.

### 1. Accessibility (critical)

- [ ] Accessibility / Color Contrast [`color-contrast`]: minimum 4.5:1 for normal text; verified per theme in section 4 and in `design-directions.md`.
- [ ] Interaction / Focus States [`focus-states`]: visible focus ring on every interactive control; 3 px, 2 px offset.
- [ ] Accessibility / Focus Appearance [`focus-appearance`]: at least a 2 CSS px perimeter with 3:1 state contrast; the accent clears 3:1 on bg and surface in both themes.
- [ ] Accessibility / Focus Not Obscured (Minimum) [`focus-not-obscured`]: a sticky header must not cover the focused control; use `scroll-padding-top` equal to the header height.
- [ ] Accessibility / Alt Text [`alt-text`]: descriptive alt on the portrait, covers and thumbnails (site-structure section 10).
- [ ] Accessibility / ARIA Labels [`aria-labels`]: the menu button, theme toggle and any icon-only social link carry an accessible name.
- [ ] Accessibility / Keyboard Navigation [`keyboard-nav`]: tab order matches visual order; the mobile sheet menu is fully keyboard-operable with no trap.
- [ ] Accessibility / Skip Links [`skip-links`]: a skip-to-main link on every page with site chrome.
- [ ] Accessibility / Heading Hierarchy [`heading-hierarchy`]: one h1 per page, sequential levels; the content skeleton's `##` sections become h2.
- [ ] Accessibility / Color Only [`color-not-only`]: the active nav item and active filter chip use an underline or rule, not colour alone.
- [ ] Animation / Reduced Motion [`reduced-motion`]: `prefers-reduced-motion` removes transitions.
- [ ] Accessibility / Screen Reader [`voiceover-sr`]: semantic HTML (nav, main, article, footer), no div soup.
- [ ] Accessibility / Target Size (Minimum) [`web-target-size`]: every pointer target at least 24 by 24 CSS px; buttons 44 px, `/links` buttons 48 px.

### 2. Touch and interaction (critical)

- [ ] Touch / Touch Target Size [`touch-target-size`]: 44 px buttons; 48 px on `/links`.
- [ ] Touch / Touch Spacing [`touch-spacing`]: at least 8 px between adjacent targets; 12 px on `/links`.
- [ ] Animation / Hover vs Tap [`hover-vs-tap`]: doors and cards are links in their own right; no action lives only on hover (this rejects the `portfolio-grid` row's "CTA on card hover").
- [ ] Interaction / Hover States [`cursor-pointer`]: cursor change and a subtle visual change on clickable elements.
- [ ] Interaction / Loading Buttons [`loading-buttons`]: the contact form's submit disables and shows state while sending.

### 3. Performance (high)

- [ ] Performance / Image Optimization [`image-optimization`]: WebP or AVIF through `astro:assets`, `srcset` sizes for the portrait and thumbnails.
- [ ] Layout / Content Jumping [`content-jumping`]: declared dimensions or `aspect-ratio` on portrait, covers and 9:16 thumbnails.
- [ ] Performance / Font Loading [`font-loading`]: `font-display: swap`.
- [ ] Typography / Font Loading (layout shift): metric-matched fallback faces so Thai and Japanese pages do not shift when fonts arrive.
- [ ] stacks/astro Preload critical assets [`font-preload`]: preload only the Latin body face.
- [ ] Performance / Lazy Loading [`lazy-load-below-fold`]: `loading="lazy"` on thumbnails and covers below the fold.
- [ ] Performance / Third Party Scripts [`third-party-scripts`]: the analytics script loads deferred; no other third-party script on the home page.
- [ ] stacks/astro Use Islands Architecture: only the theme toggle and the mobile menu ship JavaScript.

### 4. Style selection (high)

- [ ] SKILL.md priority table `style-match`, `consistency`: one style (Minimalism & Swiss Style or the chosen baseline) across every page including `/links`.
- [ ] `no-emoji-icons`: SVG icons only (Lucide or Heroicons), one set, one stroke width. (Not in the searchable CSV; from the priority table and pro-rules.)
- [ ] `effects-match-style`: no shadows, no blur, radius as the direction specifies.
- [ ] `dark-mode-pairing`: light and dark tokens designed together; contrast verified separately for each (done in section 4).
- [ ] `primary-action`: one primary button per screen; on the home hero "See my work" is primary and "Watch @takumyi" is secondary in style though equal in size.
- [ ] Style row `accessible-and-ethical`: 16 px minimum text, skip links, 3 to 4 px focus rings, 44 px targets.

### 5. Layout and responsive (high)

- [ ] Responsive / Viewport Meta [`viewport-meta`]: `width=device-width, initial-scale=1`, zoom never disabled.
- [ ] Responsive / Mobile First [`mobile-first`]: mobile styles first, then 768, 1024, 1440 breakpoints.
- [ ] Responsive / Readable Font Size [`readable-font-size`]: 16 px body on mobile (Feature uses 18, Explainer 17, Register and Index 16).
- [ ] Typography / Line Length [`line-length-control`]: 65 to 75 characters on desktop via the reading column cap.
- [ ] Responsive / Horizontal Scroll [`horizontal-scroll`]: no horizontal scroll at 375 px; ruled tables collapse to stacked rows.
- [ ] Layout / Container Width [`container-width`]: one max-width per direction (1120, 1040, 1200).
- [ ] Navigation / Sticky Navigation [`fixed-element-offset`]: if the header is sticky, reserve its height above the first section.
- [ ] `content-priority`: on phones the home page shows hero, doors and featured work before videos and writing.

### 6. Typography and colour (medium)

- [ ] Typography / Line Height [`line-height`]: 1.5 to 1.75 for body; 1.7 for Thai, 1.8 for Japanese.
- [ ] Typography / Font Size Scale [`font-scale`]: one modular scale per direction, no ad hoc sizes.
- [ ] Typography / Contrast Readability [`contrast-readability`]: no gray-on-gray; muted text at 5.8:1 or better in every direction.
- [ ] `color-semantic` and stacks/html-tailwind Semantic colors: tokens in `@theme`, no raw hex in components.
- [ ] `color-dark-mode`: dark accents are lighter tonal variants, not inversions (all four directions comply).
- [ ] `number-tabular`: tabular figures for years, counts and the CV.
- [ ] Content / Date Formatting: locale-aware, unambiguous dates for view counts, export dates and years in all three languages.
- [ ] Content / Number Formatting: thousand separators on follower and view figures.
- [ ] `letter-spacing`: no tight tracking on body text; tracking only on the 13 px uppercase meta.

### 7. Animation (medium)

- [ ] Animation / Duration Timing [`duration-timing`]: shared motion tokens (one duration, one easing) declared once.
- [ ] Animation / Transform Performance [`transform-performance`]: only colour, opacity and transform change; never width, height or position.
- [ ] `excessive-motion`: at most one or two moving elements per view; the plan has none on load.
- [ ] `state-transition`: hover and focus changes transition rather than snap, which is the reason Brutalism's "instant" effects are declined.
- [ ] `layout-shift-avoid`: no animation causes reflow.

### 8. Forms and feedback (medium; applies to `/contact` only)

- [ ] Forms / Input Labels [`input-labels`]: visible label for name, email, reason and message.
- [ ] Forms / Error Placement [`error-placement`]: error below the field, linked with `aria-describedby`.
- [ ] Forms / Required Indicators [`required-indicators`]: required fields marked.
- [ ] `submit-feedback`, `error-recovery`: sending, sent and failed states with a retry.
- [ ] `input-type-keyboard`, `autofill-support`: `type="email"` and `autocomplete` attributes.
- [ ] Feedback / Empty States [`empty-states`]: `/writing` and "Latest writing" hide or explain themselves while there are no posts (plan section 5 already says hide).

### 9. Navigation patterns (high)

- [ ] Navigation / Active State [`nav-state-active`]: current section underlined in the header.
- [ ] Navigation / Deep Linking [`deep-linking`]: every page, case study and post has its own URL; `/work` filters reflected in the URL query.
- [ ] Navigation / Breadcrumbs [`breadcrumb-web`]: not used; the hierarchy is two levels deep.
- [ ] `persistent-nav`, `navigation-consistency`: the same header on every page except `/links`, which deliberately has none (plan section 5).
- [ ] `focus-on-route-change`: not needed without client-side routing; if `ClientRouter` is ever added, move focus to main on navigation.
- [ ] `back-behavior`: plain links and static pages, so the browser's back button works without help.

## 6. What the skill wanted that this environment or brief did not allow, and the design-system skill

Not done, and why:

- Stack detection from `package.json`, `pubspec.yaml` and so on. The site is not scaffolded; the brief states the stack (Astro, Tailwind, static). The stack searches were run against `astro` and `html-tailwind` on that basis.
- `--persist` to `design-system/<slug>/MASTER.md` and `--page` overrides. Not allowed by the brief, and `.claude/skills/README.md` says not to persist without deciding where the output lives. This document is the record instead.
- The GSAP snippets attached by `--motion`. The site is static Astro with JavaScript only for the theme toggle and menu, and no direction has entrance animations, so the snippets were read and declined.
- `references/pro-rules.md` and its pre-delivery checklist. Its scope notice says it targets native and mobile app UI (iOS, Android, React Native, Flutter). Only its icon discipline rows (one set, one stroke width, no emoji, 3:1 icon contrast) carry over to this web build.
- Verification of unmatched queries. The skill says to state when no verified match exists: there is no database match for a language switcher or locale routing (1.8, 1.12), none for dark-mode token design beyond generic contrast rules (1.9), and none for a Latin, Thai and Japanese pairing in one row (1.5). Guidance in those areas comes from the plan and the quick-reference file, not from a search hit.
- Typography from `--design-system`. Every pairing that slot produced (Caveat / Quicksand, Archivo / Space Grotesk) is Latin-only, so the slot was overridden with `--domain typography` rows and the exact rows of `google-fonts.csv`.
- The skill's rule against private project data in queries. The owner's name was passed as `-p` at the brief's request; queries themselves contain no private data and nothing was persisted.

The design-system skill (version 1.0.0): skimmed, not run. Its scripts are Node (`generate-tokens.cjs`, `validate-tokens.cjs`) and the brief permits only the search script; its slide system (`search-slides.py`, slide CSVs, Chart.js) is irrelevant to a personal site. Two things from it are worth carrying into the build: the three-layer token naming (primitive, for example `--color-cyan-700`; semantic, for example `--color-accent`; component, for example `--button-bg`) as the way to write the `@theme` block so a later change of accent touches one line; and its component-spec table (default, hover, active, disabled per property) as the format for documenting buttons, links, chips and cards once a direction is chosen. Its Tailwind reference targets the v3 `@tailwind base` layer with HSL channel variables; for Tailwind v4 the html-tailwind rows above (`@theme`, oklch or hex) are the current form. It did not change any recommendation in this document.
