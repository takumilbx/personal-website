# Design exploration: Emil Kowalski skills

Skills: emil-design-eng, animate (with its RECIPES.md), animation-vocabulary, find-animation-opportunities, mobile-native, apple-design (skimmed), pick-ui-library (skimmed); vendored from https://github.com/emilkowalski/skills at commit 85e8e23 (see .claude/skills/README.md).
Date: 2026-09-21. Inputs: docs/site-structure.md sections 1 to 5 and 10, docs/design-directions.md (three Motion sections), docs/design-preview.html, content/pages/en/home.md, links.md, work.md. The skills are guidance; where they conflict with the brief, the brief wins and the conflict is named where it happens.

Hard constraints taken as given: neutral toward four audiences; each section is a sub-page and the home page is a switchboard; static Astro with Tailwind, so page navigation is a full page load unless View Transitions are used; light and dark; WCAG AA; mobile first, with much traffic from the TikTok and Instagram in-app browsers; `prefers-reduced-motion` respected.

## 1. Review

Scope: every transition, hover, active, focus and motion rule in `docs/design-preview.html` (line numbers refer to that file) and every sentence of the three Motion sections in `docs/design-directions.md`. Curve tokens named in the After column are defined in section 3: `--ease-out` is `cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-drawer` is `cubic-bezier(0.32, 0.72, 0, 1)`.

| Before | After | Why |
| --- | --- | --- |
| `.btn{...transition:background-color .12s,color .12s,border-color .12s,transform .12s}` (line 75) | `transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, transform 160ms var(--ease-out)` | Two jobs share one timing. The colour change is a hover change and the skill's easing table gives hover `ease`, so 120 ms `ease` is right for those three. The transform is press feedback, which the skill puts at 100 to 160 ms on the strong ease-out; the unnamed default curve is too weak for a transform. |
| No `:active` rule on `.btn` in Register or Feature (lines 75 to 77, 126, 152), and Feature "Nothing else moves." | `.btn:active{transform:scale(0.97)}` in all three directions, on the 160 ms `--ease-out` above | Buttons must feel responsive to press. Section 5 removes the tap highlight, so `:active` becomes the only feedback a phone gives; without it a tap inside the TikTok browser looks ignored until the next page arrives. |
| `.dir-c .btn:active{transform:translateY(1px)}` (line 192), and Explainer "Buttons press 1 px on active." | `.dir-c .btn:active{transform:scale(0.97)}` | Scale takes the label with it and reads as a press from any input. A 1 px shift is a position nudge that is close to invisible at 1 CSS px and moves the label off its baseline. |
| `.door{...transition:border-color .15s,transform .15s}` (line 79) and `.card{...transition:border-color .15s,transform .15s}` (line 86) | Register and Feature: `transition: border-color 120ms ease`. Explainer: `transition: border-color 120ms ease, transform 160ms var(--ease-out)` | The Register text says 120 ms and the preview says 150 ms; one token, used everywhere. A `transform` entry on a direction where nothing ever transforms is dead weight that invites a lift later. |
| `.dir-a .btn-primary:hover{...}` (126), `.dir-a .btn-secondary:hover{...}` (127), `.dir-b .btn-primary:hover{...}` (152), `.dir-c .btn-primary:hover{...}` (189), `.dir-c .btn-secondary:hover{...}` (191) | The same declarations inside `@media (hover: hover) and (pointer: fine){...}` | Touch fires `:hover` on tap and leaves it there. The primary button inverts to text colour on hover, so after a tap in an in-app browser it stays inverted, and it is still inverted when the visitor swipes back. Tailwind v4's `hover:` variant already compiles to `@media (hover: hover)`; hand-written CSS needs the wrapper. |
| `.dir-a .door:hover,.dir-a .card:hover{border-color:var(--text)}` (line 130) | Gated as in the row above | Sticky hover on the door cards: tap a door, come back, and that door still carries the hover border, which reads as a selected state the site does not have. |
| `.dir-b .btn-secondary:hover{color:var(--accent);text-decoration-thickness:2px}` (line 154), and Feature "Link underline thickens on hover." | Gated; add `text-decoration-thickness 120ms ease, text-decoration-color 120ms ease` to the transition list on Feature's links and secondary button (the same applies to Register's running-text links, whose underline fills from 1 px to 2 px), or make both changes instant | The colour fades over 120 ms while the underline snaps: two properties out of sync, which is the first thing frame-by-frame review catches. Either both move or neither. |
| `.dir-b .door:hover .door-title,.dir-b .card:hover .card-title{color:var(--accent)}` (line 159) | Gated; `.door-title,.card-title{transition:color 120ms ease}` | The 150 ms transition sits on the parent's `border-color`, so the child's colour change is instant. The site's only hover language is a 120 ms colour change; titles should speak it too. |
| `.dir-c .door:hover,.dir-c .card:hover{border-color:var(--text);transform:translateY(-2px)}` (line 194), and Explainer "Cards raise a 1 px border-colour change and a 2 px translate on hover at 150 ms." | Gated; border colour at 120 ms `ease`, `transform:translateY(-2px)` on `transition: transform 160ms var(--ease-out)` | Hover on a card is the tens-per-day tier: near-imperceptible or nothing. 2 px at 160 ms is at the ceiling and passes only when gated, because ungated it sticks after a tap. Press feedback (next row) gives touch users what the lift gives mouse users. |
| No `:active` on `.door` or `.card` in any direction (lines 79, 86) | `.door:active,.card:active{transform:scale(0.98)}` with `transition: transform 160ms var(--ease-out)`; make the whole card one `<a>` so iOS applies `:active` | Doors and cards are the largest tap targets on the home page and the work index. A press on them is the moment a visitor decides whether the page is listening. 0.98 rather than 0.97 because the element is large. |
| `@media (prefers-reduced-motion: reduce){*,*::before,*::after{transition:none !important}}` (line 220) | `@media (prefers-reduced-motion: reduce){.btn,.door,.card,.chip{transition-property:background-color,color,border-color,text-decoration-color,text-decoration-thickness} .btn:active,.door:active,.card:active,.door:hover,.card:hover{transform:none}}` | Reduced motion means fewer and gentler, not zero: keep colour and opacity, remove movement. `!important` on `*` also fights every component added later (the sheet menu, the contact form) and forces each of them to carry its own stronger selector. |
| Feature "The home hero fades in over 240 ms on first load (opacity only, from 0.6 so nothing is invisible at rest)." | Delete the sentence. If it is ever kept: a CSS animation (off the main thread), `opacity` 0.6 to 1, 240 ms `--ease-out`, once per session, started only after `document.fonts.ready`, never on back navigation | The purpose can only be named as delight, which the skill allows at the rare tier, and a first visit qualifies. It fails on function: the hero is the thirty-second answer the visitor came for, and on a bio-link visit the Google Fonts swap in during the same 240 ms, so the visitor sees two things settle at once. With the page crossfade in section 3 it would be a fade on top of a fade. "From 0.6" is the right instinct (nothing appears from nothing) and is kept in the fallback. |
| Feature "Respect `prefers-reduced-motion` by removing the fade." | "Reduced motion removes transforms; opacity and colour transitions stay." | An opacity-only fade is exactly the variant the skill keeps under reduced motion, so the sentence removes the wrong category and is silent on the one that matters. Moot once the row above is applied, but the rule should be stated for the site. |
| Explainer "Chips do not move." | "Chips do not move on hover. A chip scales to 0.97 on press (160 ms `--ease-out`) and its fill and text colour change over 120 ms `ease` when it becomes active. The filtered list changes instantly." | A chip is a pressable control and needs the same feedback as a button. The result list is list navigation (tens per day), so it never animates. |
| Register "Only colour and underline transitions at 120 ms." | "Colour, border and underline transitions at 120 ms `ease`; press feedback `scale(0.97)` at 160 ms `--ease-out`." | Names the easing so a later Tailwind `ease-out` (the weak built-in) is not applied by habit, and adds the one transform the skill treats as mandatory. Everything else in the sentence is right. |

Already right and left out of the table: `:focus-visible{outline:2px solid var(--focus,var(--page-text));outline-offset:2px}` (line 44) and Register "Focus ring 2 px in accent." (not transitioned, which is correct for a keyboard action; Explainer's `--focus: var(--text)` is the right exception because amber on white is 1.9:1); `.dir-c .door:hover,.dir-c .card:hover{transform:none}` under reduced motion (line 221); Register "No entrance animations, no parallax, no hover scaling."; Explainer "No entrance animations."; the default `ease` on the hover colour transitions, which matches the skill's easing table. The preview's own Light, Dark and System buttons are page chrome, not a direction rule, and are not reviewed.

## 2. Motion decision framework applied to this site

The skill keys its frequency table on the class of element (hover, navigation, modal), not on one visitor's count. A visitor sees the home page once; the owner and returning readers see every hover and every navigation daily, and the interface has to hold up for them. Decisions use the skill's four tiers and four outcomes: no animation, reduced, standard, delight. Vocabulary terms are from animation-vocabulary.

| Element | Frequency class | Decision | Motion, if any (property, curve, duration, origin) |
| --- | --- | --- | --- |
| Primary navigation links (header and footer) | Tens/day (core navigation) | Reduced | Hover effect: `color` and `text-decoration-color` 120 ms `ease`, gated. Active-page underline is static. `:active` applies the hover colour instantly with no transform: a text link that shrinks inside a row of links reads as a glitch. When reached by keyboard nothing animates; the focus ring is instant. |
| Mobile sheet menu (site-structure section 4: "the same items in a sheet menu") | Occasional | Standard | Slide in from the bottom edge: `transform: translateY(100%)` to `translateY(0)`, enter 250 ms `--ease-drawer`, exit 200 ms `--ease-drawer` along the same path (Spatial consistency). Backdrop `opacity` 0 to 1 over 250 ms `--ease-out`. Built on `<dialog>` with `@starting-style` and `transition-behavior: allow-discrete`; no JavaScript animation. Reduced motion: closed state `opacity: 0; transform: none`, `opacity` 200 ms `ease`. If the menu opens from the top instead, `translateY(-100%)`. |
| Language switch | Rare/first-time; hidden at launch because only English exists | No animation | It is a link to the same page in another locale, so it is a page navigation (see below). If it later becomes a three-item menu: Origin-aware animation, `opacity` 0 to 1 and `transform: scale(0.95)` to 1, 150 ms `--ease-out`, `transform-origin: top right` (the trigger's edge). |
| Theme switch | Rare/first-time; the plan has none, light and dark follow the system through `color-scheme` | No animation | If a toggle is ever added: the button gets press feedback, and the page's colours change instantly. Never `transition: background-color` across many elements at once; they fade at different times and read as broken. The apple-design skill asks to ease dark-to-light changes; the only way that respects the emil rules is one whole-page Crossfade through `document.startViewTransition`, 200 ms `ease`, instant where unsupported or under reduced motion. |
| Home door cards | Tens/day tier (hover states) | Reduced | Hover: `border-color` 120 ms `ease` (Register, Explainer) or title `color` 120 ms `ease` (Feature), gated. Press / Tap feedback: `transform: scale(0.98)`, 160 ms `--ease-out`, origin centre. Explainer only: `translateY(-2px)` on hover, gated, 160 ms `--ease-out`. No entrance, no Stagger. |
| Work-index filter chips | Tens/day (frequent toggles, list navigation) | Reduced | Press / Tap feedback `scale(0.97)` 160 ms `--ease-out`, origin centre; active fill and text colour 120 ms `ease`. The result grid re-renders with no animation: cards appear and disappear instantly, no Layout animation. |
| Case-study cards (work index, featured on home) | Tens/day tier (hover) | Reduced | As door cards. The cover (a flat field with a number, or a photograph in Feature) never scales on hover. |
| Video cards (home "Latest from @takumyi", /creator) | Tens/day tier (hover) | Reduced | As cards. The play glyph is static; no autoplay and no hover preview (site-structure section 10). The link leaves the site, so no page transition applies. |
| Buttons (primary, secondary, "Work with me", form submit) | Tens/day | Reduced | Press / Tap feedback `scale(0.97)` 160 ms `--ease-out`, origin centre; hover colour 120 ms `ease`, gated. While the form sends, the label changes to "Sending" with no animation and the disabled state is instant. |
| In-page links (running text) | Tens/day | Reduced | Hover effect, gated, 120 ms `ease`, with both changed properties in the transition list: Register `text-decoration-thickness` 1 px to 2 px; Feature `color` to accent; Explainer `text-underline-offset` 2 px lower. No transform. |
| /links page buttons | Rare per visitor (one visit, one or two taps), but always touch and the most-tapped elements on the site | Reduced | Press / Tap feedback `scale(0.98)` (a full-width bar) 160 ms `--ease-out`, origin centre. Hover is irrelevant and gated anyway. No entrance, no Stagger (reason in section 4). |
| Page-to-page navigation | Tens/day for the owner; 3 to 8 per visit for a visitor | Reduced (near-imperceptible) | View transition: a Crossfade of the page at 150 ms `ease` with the header held still. Language switch and back or forward get the same. Details and reasoning in section 3. |
| Image loading (portrait, thumbnails, covers) | Many per page | No animation | Space reserved with `width`, `height` and `aspect-ratio`; `background: var(--surface)` behind each image so an unloaded image is a flat block, not a hole; `loading="lazy"` below the fold; `fetchpriority="high"` on the hero portrait. No Fade in on load, no blur-up, no Skeleton / Shimmer. |
| Home "latest" sections (videos, writing) | Once per visit; static at build time | No animation | Nothing changes at runtime, so there is nothing to bridge. No Scroll reveal, no Stagger. The empty "Latest writing" section is removed at build, not hidden with a transition. |
| Contact form validation and success | Rare/first-time | Delight, kept small | Inline error text: Fade in, `opacity` 0 to 1, 120 ms `ease`, no Shake / Wiggle. Success block replacing the form: Scale in, `opacity: 0; transform: scale(0.97)` to settled, 200 ms `--ease-out`, origin centre, through `@starting-style`. Reduced motion: opacity only. |
| Skip link and focus ring | Keyboard-initiated | No animation | Instant. Never animate keyboard-initiated actions. |
| In-page anchor jumps (case-study "Related", research "Reading" link) | Rare | No animation | No global `scroll-behavior: smooth`. If a case-study table of contents is added later, `scroll-behavior: smooth` only inside `@media (prefers-reduced-motion: no-preference)`. |

## 3. Motion tokens

One file, imported once (`src/styles/motion.css`), with the same names declared in Tailwind so utilities and hand-written CSS share them.

```css
:root {
  --dur-color: 120ms;   /* hover: colour, border, underline */
  --dur-press: 160ms;   /* :active scale */
  --dur-page:  150ms;   /* view transition crossfade */
  --dur-enter: 200ms;   /* small surfaces entering: form success, language menu (150) */
  --dur-sheet: 250ms;   /* mobile navigation sheet enter; exit 200ms */

  --ease:        ease;                             /* hover and colour; the skill's own table gives hover the built-in ease */
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);   /* entrances and press feedback */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* movement of something already on screen; nothing uses it at launch */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* the sheet menu */
}
```

Tailwind: in v4, declare `--ease-out`, `--ease-in-out` and `--ease-drawer` inside `@theme` so the `ease-out` utility becomes the strong curve instead of Tailwind's default `cubic-bezier(0, 0, 0.2, 1)`, and use `duration-120` and `duration-160`. In v3, put them under `theme.extend.transitionTimingFunction` and `transitionDuration`, and set `future.hoverOnlyWhenSupported: true` so `hover:` is gated. Never write a fourth curve; the animate skill forbids approximated values.

Properties that may animate:

- `transform` and `opacity`: anything that moves or appears.
- `color`, `background-color`, `border-color`, `text-decoration-color`, `text-decoration-thickness`, `text-underline-offset`: hover and active states only, always at `--dur-color` on `--ease`. This is the one exception to "transform and opacity only", and it is inside the skill: its easing table has a "hover / color change" row. These are paint-only changes on small elements; the performance rule targets layout properties.
- Never: `width`, `height`, `margin`, `padding`, `top`, `left`, `box-shadow`, `filter`, `clip-path`, and never `transition: all`. No direction uses shadows, no page has an accordion, nothing needs a reveal.

Springs: none. Nothing on the site is gesture-driven, there is no JavaScript motion library and no framework island. The sheet is not draggable. If drag-to-dismiss is ever wanted, that is the point where Motion (and a React island) enters, not before. The apple-design spring values are recorded as not applicable.

Reduced motion, one block, shipped with the first component:

```css
@media (prefers-reduced-motion: reduce) {
  /* keep colour and opacity, drop movement */
  .btn, .chip, .door, .card, .link-btn, a {
    transition-property: color, background-color, border-color,
      text-decoration-color, text-decoration-thickness, text-underline-offset, opacity;
  }
  .btn:active, .chip:active, .door:active, .card:active, .link-btn:active,
  .door:hover, .card:hover { transform: none; }
  .sheet { transition: opacity var(--dur-enter) var(--ease); }
  .sheet[data-closed] { opacity: 0; transform: none; }
  .form-success { transition: opacity var(--dur-enter) var(--ease); transform: none; }
}
```

The page crossfade below stays under reduced motion: it is opacity only, which is the reduced-motion form both skills prescribe, and WCAG's definition of motion animation excludes opacity changes.

View Transitions decision: use the browser's cross-document View Transitions, opted in with CSS. Do not add Astro's `<ClientRouter />` (the component formerly named `<ViewTransitions />`). The router script intercepts every link, re-runs scripts on swap, and its simulated fallback is another moving part inside in-app browsers; the CSS rule is zero JavaScript, scroll and back or forward stay native, and analytics needs no re-initialisation.

```css
@view-transition { navigation: auto; }

::view-transition-old(root),
::view-transition-new(root) { animation-duration: 150ms; animation-timing-function: ease; }

.site-header { view-transition-name: site-header; }
::view-transition-old(site-header),
::view-transition-new(site-header) { animation: none; mix-blend-mode: normal; }
```

What persists: the site header (navigation, language switch), held still while the rest of the page crossfades. What crossfades: everything else, as one root snapshot, 150 ms, old page held until the new one has rendered. What must not happen: no slide or Direction-aware transition (the site is not an app with a hierarchy, and a cross-document transition has no reliable direction without JavaScript); no Shared element transition for the portrait (home to /about) or thumbnails (home to /creator), because their sizes and positions differ and a morphing image on every trip fails the tens-per-day gate; no morphing headings, because line breaks differ and a text morph reads as broken. `/links` has no header and most of its links leave the site; when it links inward it gets the plain root crossfade. Outbound links (TikTok, Instagram, LinkedIn, PDFs) get nothing by definition.

Frequency reasoning: navigation is the tens-per-day tier, where the skill allows near-imperceptible motion only. 150 ms of opacity with a static header is that. The purpose is Preventing a jarring change: in dark mode a hard cut can flash the browser's default white between documents, and holding the old snapshot removes it. Set `html { background: var(--bg) }` and `color-scheme` early as well, so the flash is also handled in browsers without support (they get the ordinary hard cut, which is today's default). If the crossfade ever feels slow to the owner in daily use, delete the `@view-transition` rule; nothing else depends on it.

## 4. find-animation-opportunities pass

Recon: Astro static output with Tailwind, no motion library, no existing tokens (section 3 supplies them), no `src/` yet, so evidence points at the preview and the plan. Personality per direction: orderly, readerly, direct; all three say no entrance animations. Frequency map: a visitor lands from a bio link or a PDF, reads the hero, taps one door, reads one or two pages, leaves; the owner sees every hover and navigation daily.

Part 1, opportunities, ordered by leverage:

| # | Location | Today | Purpose | Frequency | Suggested motion |
| --- | --- | --- | --- | --- | --- |
| 1 | Every button, chip, door, card and /links button (`docs/design-preview.html:75`, `:79`, `:86`; all three Motion sections) | No press state except Explainer's 1 px shift | Feedback | Tens/day | `:active{transform:scale(0.97)}` (0.98 on cards and full-width /links bars), `transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1)`; reduced motion `transform: none`, colour change stays |
| 2 | Mobile navigation sheet (`docs/site-structure.md` section 4, "Mobile: the same items in a sheet menu") | Unspecified; would appear in place | Spatial consistency; Preventing a jarring change | Occasional | Bottom sheet on `<dialog>`: closed `transform: translateY(100%)`, open `translateY(0)`, enter 250 ms `cubic-bezier(0.32, 0.72, 0, 1)`, exit 200 ms on the same curve and edge; backdrop `opacity` 0 to 1 over 250 ms `cubic-bezier(0.23, 1, 0.32, 1)`; `@starting-style` plus `transition-behavior: allow-discrete`; reduced motion `opacity` 200 ms `ease` |
| 3 | Page-to-page navigation (`docs/site-structure.md` section 7, static output) | Hard cut; possible white flash between documents in dark mode | Preventing a jarring change | Tens/day for the owner, a few per visit for a visitor | Cross-document View transition, CSS only: root Crossfade 150 ms `ease`, header excluded through `view-transition-name`; section 3 |
| 4 | Contact form success and inline errors (`docs/site-structure.md` section 5, Contact) | Unspecified; the confirmation would replace the form instantly | State indication, and the one place the delight budget applies | Rare/first-time | Success block through `@starting-style{opacity:0;transform:scale(0.97)}`, `transition: opacity 200ms cubic-bezier(0.23, 1, 0.32, 1), transform 200ms cubic-bezier(0.23, 1, 0.32, 1)`; inline errors `opacity` 0 to 1 over 120 ms `ease`; reduced motion opacity only |
| 5 | Language menu, once three languages exist (`docs/site-structure.md` section 3) | Not built; at launch one link or hidden | Spatial consistency | Rare/first-time | Only if it becomes a menu: Origin-aware animation, `@starting-style{opacity:0;transform:scale(0.95)}`, 150 ms `cubic-bezier(0.23, 1, 0.32, 1)`, `transform-origin: top right`; if it stays a row of links, nothing |

Part 2, rejected candidates, each with the gate question that killed it:

- Feature's hero fade (`docs/design-directions.md`, Feature, Motion). Rejected: function. The hero is what the visitor came to read; it competes with the font swap and with the page crossfade.
- Stagger on the /links buttons (`content/pages/en/links.md`). Rejected: function. The follower came to tap one thing inside an in-app browser whose first paint is already the slow part; a cascade delays the target. The group-entrance case in the skill is for pages seen occasionally and this page is seen once, but it has to be instant, not eventful.
- Scroll reveal on home sections, case-study sections and the /about timeline. Rejected: function. These are content being read; the recipe itself says marketing surfaces only.
- Cover or thumbnail zoom on hover (`.cover`, `.thumb`). Rejected: frequency, tens/day hover tier. Register forbids hover scaling and the other two directions gain nothing from it.
- Number ticker on headline numbers (47 to 8, 437 principals; `.cover-num`, the /creator reach figures). Rejected: function. Data the reader is scanning; a counting number reads as marketing, which the voice charter rules out. Tabular numbers, static.
- Filter results animating in and out when a chip toggles (`content/pages/en/work.md`, Filters). Rejected: frequency, list navigation. Instant.
- Shared element transition of the portrait (home to /about) or thumbnails (home to /creator). Rejected: frequency. Sizes and positions differ, so the morph would be a scaling image on every trip.
- Per-element colour transitions on a theme change. Rejected: purpose cannot be named; the fades desync and read as broken. The only acceptable form is a single crossfade (section 2), and the plan has no toggle.
- Line drawing of the /about timeline. Rejected: function. The timeline is a record, not an explanation.
- Smooth scrolling for anchor links. Rejected: keyboard and link initiated whole-page movement. Opt in only under `prefers-reduced-motion: no-preference` if a table of contents ever exists.

Part 3, verdict: this site needs very little motion and the directions are already close. The whole gap for Register is press feedback and hover gating; Explainer needs its lift gated and its press changed to scale; Feature needs its hero fade removed and press feedback added. Row 1 has the highest leverage because it touches every tap a follower makes on a phone. The skill's hand-off is `improve-animations plan <suggestion>`; that skill is vendored beside these and can turn any row into an implementation plan once `src/` exists.

## 5. mobile-native pass: /links and the home page inside the TikTok and Instagram in-app browsers

Context: the in-app browsers are WKWebView on iOS (Safari's engine, with the app's own title bar and bottom bar taking height) and the system WebView on Android (Chrome's engine). None of the items below reproduce in desktop device emulation, and a third-party app's WebView cannot be attached to Safari's inspector, so the check is by eye on a phone, then "Open in browser" to inspect. Everything here can be written from code; nothing here can be verified from this environment.

- [ ] Viewport. Keep the preview's tag and add the keyboard flag for the contact page (harmless site-wide). Never `user-scalable=no` or `maximum-scale=1`.

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
  ```

- [ ] Status bar colour, one per scheme, matching the chosen direction's `bg` (Register `#F8F8F6` and `#111615`; Feature `#FAF8F9` and `#171317`; Explainer `#FFFFFF` and `#141311`). The in-app browsers mostly ignore this; Safari and Chrome use it once the follower opens the page in the real browser.

  ```html
  <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F8F8F6">
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111615">
  <meta name="color-scheme" content="light dark">
  ```

- [ ] Tap highlight off, then every tappable element gets its own `:active` (section 2), because this removes the only feedback the browser was giving.

  ```css
  html { -webkit-tap-highlight-color: transparent; -webkit-text-size-adjust: 100%; }
  ```

- [ ] Sticky hover. Every `:hover` rule on the site lives inside `@media (hover: hover) and (pointer: fine)`. Tailwind v4 does this for `hover:`; v3 needs `future.hoverOnlyWhenSupported`; the hand-written rules from the preview need the wrapper (section 1, five rows).

- [ ] Viewport height. `/links` is a normal scrolling document, not an app shell: no `100vh`, no `100dvh` column. If the portrait and buttons are meant to fill the first screen, `min-height: 100svh` on the page wrapper, because `dvh` shifts the layout as the in-app bars show and hide, and `vh` overflows behind them. The home hero needs no height rule at all; it is content in flow. Note that the in-app browsers' own bars make the visible height smaller than Safari's, so the first screen on `/links` should show the portrait, the name and at least the first three buttons at 48 px each without scrolling on a 667 px tall phone.

- [ ] Input zoom. Only `/contact` has inputs. Font size 16 px at the minimum on every field regardless of direction (Register's `small` 14 px, Explainer's `meta` 13 px and Feature's `small` 15 px must never be used on a field), plus the keyboard attributes.

  ```css
  input, textarea, select { font-size: 16px; }
  ```

  `type="email"` on the email field, `autocapitalize="none"` and `autocorrect="off"` on it, `enterkeyhint="send"` on the message field, and the reason `<select>` left native so the phone shows its own picker.

- [ ] Tap delay and press feedback. Feedback on press, not on release, on every control including the `/links` buttons and the nav links.

  ```css
  a, button, [role="button"], .chip { touch-action: manipulation; }
  .btn, .chip, .link-btn { transition: transform 160ms var(--ease-out); }
  .btn:active, .chip:active { transform: scale(0.97); }
  .link-btn:active, .card:active, .door:active { transform: scale(0.98); }
  ```

  Make the doors, cards and `/links` buttons real `<a>` elements; iOS only applies `:active` to links, buttons and elements with a touch listener.

- [ ] Scroll behaviour. This is a document, so pull-to-refresh and the page rubber band stay; `overscroll-behavior: none` on `html` is deliberately left out, which the skill's baseline allows for scrolling documents. It goes only on the sheet menu's content, and `scroll-behavior` stays `auto` (section 2).

  ```css
  .sheet-content { overflow-y: auto; overscroll-behavior: contain; }
  ```

- [ ] Safe areas. `/links` has no chrome, so its own padding carries the insets; the sheet menu pads its bottom; the home header only needs the top inset if it is ever made sticky. Inside an in-app browser the insets are usually 0 because the WebView sits below the app's bar; the rule costs nothing there and matters once the page is opened in Safari.

  ```css
  .links-page {
    padding: max(16px, env(safe-area-inset-top, 0px)) max(16px, env(safe-area-inset-right, 0px))
             max(24px, env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left, 0px));
  }
  .sheet { padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px)); }
  ```

- [ ] Long-press. Controls are not selectable; content is. The name, the identity line and the button labels' surrounding text stay selectable; never put this on `body`.

  ```css
  .btn, .link-btn, .chip, .nav a, [role="button"] {
    user-select: none; -webkit-user-select: none; -webkit-touch-callout: none;
  }
  ```

- [ ] Carousel. Register and Feature list videos vertically, so this applies only to Explainer's horizontal row of thumbnails on the home page. Use native scroll with snap rather than a gesture handler, so `touch-action` is not needed. Keep the 16 px gutter so the first swipe does not start at the screen edge, which iOS in-app browsers read as back.

  ```css
  .video-row { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory;
               scroll-padding-inline: 16px; overscroll-behavior-x: contain; }
  .video-row > * { scroll-snap-align: start; }
  ```

- [ ] Button height on `/links`. The skill's tap hysteresis is about 10 px around the target; with square corners the Register direction's own risk note asks for 48 px, Feature's 44 px goes to 48 px on this page, Explainer's 52 px stays. Full width, one column, 12 px gaps, in the order given in `content/pages/en/links.md`.

- [ ] Not a PWA. `apple-mobile-web-app-status-bar-style` and a manifest are not needed; the site is a document opened from a bio link.

- [ ] Real hardware. Open the link from the TikTok bio and the Instagram bio on an iPhone and on a mid-range Android that is a few years old, in light and dark, with the keyboard open on `/contact`, and once in landscape. Check in this order: no grey flash on tap, no stuck hover after a tap and a swipe back, `/links` first screen fits, no zoom when the email field focuses, the sheet's bottom padding clears the home indicator, the theme colour matches the page top in Safari.

## 6. pick-ui-library

Every entry on the skill's list is a React library except Satori and shiki, and the stack is static Astro with no framework island, so the question is answered task by task:

- Unstyled accessible primitives (base-ui): not warranted. The one dialog on the site is the mobile sheet menu; native `<dialog>` gives focus trapping, Escape and the backdrop, and the language menu, if it ever exists, can be a `popover` attribute. Hand-rolling a `<div>` menu is the mismatch the skill warns about; the native elements are the alternative here, not a library.
- Toasts (Sonner): not warranted. The contact form's success state is inline in place of the form.
- Motion (motion.dev): not warranted. There are no springs, layout animations, exit animations or gesture-driven values; the sheet is a CSS transition with `@starting-style` and `transition-behavior: allow-discrete`.
- Animated numbers (NumberFlow): rejected in section 4; the numbers are data.
- Theme switching (next-themes): not warranted. Light and dark follow the system. If a toggle is added, the preview's ten-line inline script in `<head>` (set `data-theme` from `localStorage` before paint) is the framework-free equivalent of what next-themes does about the flash on load.
- Conditional class names (clsx, cva): not warranted. Astro's `class:list` directive covers conditional classes, and two button variants across the site do not deserve a typed variant API.
- Command menus, OTP inputs, drag and drop, virtualization, charts, state management: no such tasks on this site. Creator statistics are a table with an export date, not a chart.
- Syntax highlighting (shiki): already inside Astro's Markdown pipeline, so a literature note with a code block is covered without adding anything.
- Dynamic OG images (Satori): the one library on the list that earns its place. The plan asks for per-page Open Graph images (site-structure section 10). Satori, or an Astro integration wrapping it, runs at build time and ships nothing to the client.

Verdict: native CSS and native HTML elements suffice at runtime; zero client-side libraries. Satori at build time for Open Graph images; shiki is already present. There is no `package.json` yet, so the skill's "check what is installed" step has nothing to check.

## 7. Verdict on the three directions

Register best supports this motion and interaction model, which agrees with the plan's own recommendation. Its Motion section is closest to the skills' posture: colour only at a single short duration, no entrance animations, no hover scaling, an unanimated focus ring. It needs two additions (press feedback and hover gating) and no deletions. Explainer is second: its lift and press are the kind of motion the skills accept once gated and changed to scale, and its two font families make it the cheapest first paint inside an in-app browser, which is where the mobile-native pass matters most. Feature's Motion section needs the most rewriting, because its one named animation (the hero fade) fails the gate and its "Nothing else moves" rule leaves buttons without press feedback; the rest of Feature is fine.

The three changes to each Motion section:

Register:

1. Replace "Only colour and underline transitions at 120 ms." with "Colour, border and underline transitions at 120 ms `ease`; press feedback `transform: scale(0.97)` on buttons, chips and `/links` buttons and `scale(0.98)` on doors and cards, 160 ms `cubic-bezier(0.23, 1, 0.32, 1)`."
2. Add "Every hover rule sits inside `@media (hover: hover) and (pointer: fine)`", and align the preview's 150 ms door and card transitions to 120 ms.
3. Add the two things the section is silent on: the mobile sheet (slide from the bottom, 250 ms in and 200 ms out on `cubic-bezier(0.32, 0.72, 0, 1)`, opacity only under reduced motion) and page navigation (a 150 ms crossfade through `@view-transition` with the header held still). State the reduced-motion rule as "transforms off, colour and opacity stay".

Feature:

1. Delete the hero fade sentence. If the owner wants it back after living with the site, the fallback in section 1 (CSS animation, opacity 0.6 to 1, 240 ms, once per session, after fonts are ready) is the only form that passes.
2. Replace "Nothing else moves." with press feedback (`scale(0.97)` at 160 ms `cubic-bezier(0.23, 1, 0.32, 1)`) and make "Link underline thickens on hover" transition `text-decoration-thickness` together with the colour at 120 ms `ease`, gated.
3. Replace "Respect `prefers-reduced-motion` by removing the fade." with "Reduced motion removes transforms; opacity and colour stay", and add the sheet menu and page crossfade rules as for Register.

Explainer:

1. Rewrite the card rule: "Cards change border colour over 120 ms `ease` and lift 2 px over 160 ms `cubic-bezier(0.23, 1, 0.32, 1)`, only under `@media (hover: hover) and (pointer: fine)`; on press they scale to 0.98."
2. Rewrite the button rule: "Buttons scale to 0.97 on active, 160 ms `cubic-bezier(0.23, 1, 0.32, 1)`" in place of the 1 px press.
3. Rewrite the chip rule: "Chips do not move on hover; on press they scale to 0.97, the active fill changes over 120 ms `ease`, and the filtered list changes instantly." Keep "No entrance animations", write the reduced-motion rule the preview already has (transform off, border colour stays) into the text, and add the sheet menu and page crossfade rules as for Register.

## 8. Rules that hold whichever direction is chosen

1. Every hover rule lives inside `@media (hover: hover) and (pointer: fine)`.
2. Every pressable element has an `:active` state: `scale(0.97)`, or 0.98 on cards and full-width bars, at 160 ms `cubic-bezier(0.23, 1, 0.32, 1)`, on press rather than on click.
3. Colour, border and underline changes take 120 ms `ease`, and nothing else changes on hover.
4. Only `transform` and `opacity` move; never width, height, margin, padding, top or left, and never `transition: all`.
5. No entrance animations on content the visitor came to read: no scroll reveals, no staggers, no number tickers, no parallax, no fade-in on image load.
6. Nothing exceeds 300 ms; the sheet menu at 250 ms is the longest motion on the site.
7. Reduced motion removes transforms and keeps colour and opacity; never `transition: none !important` on `*`.
8. Keyboard-initiated changes (focus, skip link, menu opened by keyboard) show instantly.
9. `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation` and `user-select: none` on controls only; never `user-scalable=no`.
10. Sign off motion and touch on a phone opened from the TikTok and Instagram bio links, and look at it again the next day; emulation reproduces none of the mobile tells.

What the skills wanted that this environment or brief did not allow:

- The skills' component and motion libraries (Motion, base-ui, Sonner, next-themes, clsx, cva) are React; the stack is static Astro without a framework, so native CSS, `<dialog>` and `popover` stand in.
- Springs, velocity hand-off, rubber-banding and interruptible gestures (emil-design-eng, apple-design) have no surface here; nothing is draggable and the sheet is not drag-to-dismiss.
- apple-design's translucent `backdrop-filter` chrome and scroll edge effects are ruled out by the design-directions framing (no glass effects); the brief wins.
- apple-design asks to ease dark-to-light changes; the plan has no theme toggle, and the resolution if one appears is a single whole-page crossfade rather than per-element colour fades.
- mobile-native's baseline sets `overscroll-behavior: none` on `html`; dropped because this is a scrolling document, which the skill's own note permits.
- animate's "never ship built-in ease-out on a deliberate animation" is kept for transforms, but the built-in `ease` stays on hover colour because the skill's own easing table assigns it there.
- find-animation-opportunities requires `file:line` evidence from source; there is no `src/` yet, so evidence points at the preview and the plan documents.
- pick-ui-library asks to read `package.json` first; none exists.
- All three skills insist on real-device testing, slow-motion playback and a next-day review; none was possible here, and every judgement above is from code and text alone.
- The emil-design-eng skill's fixed greeting on invocation was skipped as instructed.
