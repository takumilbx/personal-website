# Design exploration with the vendored skills

Date: 2026-09-21. Four write-ups, one per skill family, each applying its own method to the brief in `site-structure.md` and to the three baseline directions in `design-directions.md` (Register, Feature, Explainer). They were produced before the owner decided that the home page becomes the dark landing page in `landing-page-brief.md`, so their home-page findings now apply to the section pages, and their motion, mobile, typography and accessibility rules apply everywhere.

| File | Skill | What it produced |
|---|---|---|
| `taste.md` | taste-skill, minimalist-skill, soft-skill | Design read, dials 4 / 2 / 5, AI-tell audit of the baselines, Direction D "Document" and Direction E "Relief" with tokens and pre-flight |
| `impeccable.md` | impeccable 4.3.1 (launcher not run) | PRODUCT.md equivalent, mode per surface, heuristic scores (Register 22, Explainer 20, Feature 19 of 28), Direction F "Concourse", bolder and quieter tables, trilingual typeset and colorize notes, craft-floor checklist |
| `emil.md` | emil-design-eng, animate, animation-vocabulary, find-animation-opportunities, mobile-native, apple-design, pick-ui-library | Fifteen-row before-and-after review of the baseline motion, a 17-row frequency table, motion tokens, View Transitions decision, mobile-native checklist for in-app browsers |
| `ui-ux-pro-max.md` | ui-ux-pro-max, design-system | Database searches with verdicts, Direction G "Index", the UX guidelines the build must satisfy |

## Where the four agree

1. **Register is the best of the three baselines**, for structure and for motion. Explainer is second. Feature's serif reads as academic, which breaks the neutrality rule.
2. **Every baseline over-used the giant number.** A headline number on every case-study cover becomes a stat-tile grid. Keep one number per card in the meta line; use covers for real artefacts only.
3. **Thai and Japanese need script-scoped rules**, not a shared size: Thai has no case and letter-spacing breaks its combining marks, so uppercase tracked tags must not apply to Thai; Thai body text needs a size floor near 19 px in serif faces; Japanese headings sit one weight lighter.
4. **Font loading is unspecified in every baseline.** Use `font-display: swap`, one preload for the Latin face, and metric-matched fallbacks for the Thai and Japanese faces.
5. **Motion is a frequency decision.** Hover and press feedback at 120 to 160 ms on transform, opacity and colour only; no entrance animations on things seen tens of times a day; a 150 ms cross-document crossfade via CSS View Transitions to avoid the white flash between dark pages; reduced motion removes transforms but keeps colour and opacity.
6. **The phone audience arrives inside an in-app browser.** Transparent tap highlight, `touch-action: manipulation`, `100dvh` not `100vh`, safe-area padding on fixed chrome, 44 to 48 px targets with 12 px gaps on `/links`.

## What applies to the landing page as built

The landing page in `landing-page-brief.md` deliberately breaks several baseline rules (entrance choreography, a marquee, scroll-driven reveals, stacking cards), because the owner chose that reference. The rules above that still bind it: transform and opacity only, reduced motion collapses everything, tap and safe-area fixes, 44 px targets, one font family that covers Thai and Latin (Kanit does), and no giant number as decoration outside the numbered lists the reference calls for.

## New directions for the section pages

Four candidates came out of the exploration, each with light and dark tokens and computed contrast: D "Document" (working-document register, Geist / Sarabun / BIZ UDPGothic, slate blue), E "Relief" (soft panels, Plus Jakarta Sans / Prompt / M PLUS 2, rust), F "Concourse" (station wayfinding, Overpass / Sarabun / BIZ UDPGothic, guide-sign blue), G "Index" (ruled twelve-column index, the Noto super-family, cyan-teal). None of them was designed for a dark landing page; whichever is chosen for the section pages will need its dark tokens to sit next to `#0C0C0C` and cream, or the section pages stay in the landing page's own two colours, which is what the stubs do today.
