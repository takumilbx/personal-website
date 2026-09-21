# Design directions

Status: proposal v1, 2026-09-21. Companion preview: `docs/design-preview.html` (three directions rendered with live fonts, light and dark), also published as a page; link in `site-structure.md` section 10.
Owner: Takumi Oshiyama
Inputs: `site-structure.md` sections 1 to 5 and 10.

## Framing

All three directions share the decisions already made in the structure plan. Each is neutral toward the four audiences, so a scholarship reviewer and a TikTok follower see the same page and neither feels they have walked into someone else's room. Each uses one accent colour plus hue-biased neutrals, passes WCAG AA in light and dark, and treats Thai and Japanese as first-class scripts from day one even though only English ships at launch. Each is built from Google Fonts families so the Astro and Tailwind setup stays simple, and each avoids glass effects, large gradients, bento grids and decorative blobs. In all three the home page is a switchboard: name, one line, two buttons, three doors, then cards.

What separates them is the source of their personality. Register takes it from order: one type family across three scripts, metadata set in monospace, square corners, tabular lists. Feature takes it from reading: a serif reading face at a larger size, borderless cards separated by space, a plum accent used sparingly. Explainer takes it from directness: a Thai-designed sans with a matching Latin, heavier headings, filled chips, an amber accent used as a fill rather than as text. The three sit at different points on two axes: how much structure is visible on the page, and how much warmth the type carries.

## Direction A: Register

### Concept

A well-kept record. Every list looks like a list, every number is set in monospace, and the same type family carries English, Thai and Japanese so a visitor who switches language sees the same site rather than a translated one.

### Who it feels right to and why

Employers and committees read it as evidence: dates, organisations and headline numbers line up in columns and can be scanned in seconds. Brands read it as a media kit already laid out. Followers arriving from a bio link get a calm page that loads fast and does not shout. Nothing in it says academic (no serif, no citations styling) and nothing says creator (no oversized thumbnails, no chips in brand colours).

### Typography

| Script | Family | Weights | Role |
|---|---|---|---|
| Latin | IBM Plex Sans | 400, 500, 600 (italic 400) | body, UI, headings |
| Thai | IBM Plex Sans Thai | 400, 500, 600 | body, UI, headings |
| Japanese | IBM Plex Sans JP | 400, 500, 600 | body, UI, headings |
| Numbers and metadata | IBM Plex Mono | 400, 500 | dates, counts, tags, table cells |

Why they pair: they are one family. IBM Plex Sans Thai and IBM Plex Sans JP were released as extensions of the Plex Latin and drawn to its stroke weight, vertical proportions and terminals, so weights correspond one to one and a 600 heading looks equally heavy in all three scripts. The Thai is loopless; if a formal looped style is ever wanted for the Japanese and Thai committee readers, IBM Plex Sans Thai Looped exists in the same family and can be swapped in without changing metrics. Plex Mono is the family's own monospace, so numerals in tables and body text share a skeleton.

Type scale (base 16 px, ratio 1.2, line-height 1.6 for body):

| Step | Size | Weight | Use |
|---|---|---|---|
| meta | 13 px mono | 400 | dates, counts, tags |
| small | 14 px | 400 | captions, footer |
| body | 16 px | 400 | running text |
| lead | 19 px | 400 | identity line, card summaries |
| h3 | 23 px | 600 | card titles |
| h2 | 28 px | 600 | section titles |
| h1 | 34 px | 600 | page titles |
| display | 40 px | 600 | name on the home hero only |

Script adjustments: `:lang(th)` keeps the same size (Plex Thai is drawn to the Latin x-height) with line-height 1.7 for the tone marks. `:lang(ja)` keeps the same size, line-height 1.8, headings at 500 instead of 600 because dense kanji darken faster than Latin.

### Colour tokens

| Token | Light | Dark |
|---|---|---|
| bg | #F8F8F6 | #111615 |
| surface | #FFFFFF | #1A2120 |
| text | #1A1F1E | #E6EBE9 |
| text-muted | #5A6360 | #9AA6A2 |
| border | #D5DAD8 | #2B3533 |
| accent | #0B6B60 | #5BC9BA |
| accent-text | #FFFFFF | #0A1F1C |

Contrast: text on bg 15.7:1 light, 15.2:1 dark. accent-text on accent 6.4:1 light, 8.6:1 dark. text-muted on bg 5.8:1 light, 7.3:1 dark. The accent also works as link text on bg (6.0:1 light, 9.1:1 dark). Neutrals lean slightly warm in light and slightly green in dark so the teal sits in them rather than on them.

### Layout and grid

Container 1120 px, reading column 680 px. Spacing on an 8 px rhythm: 4, 8, 12, 16, 24, 32, 48, 64, 96. Section spacing 64 px on desktop, 48 px on phones. Cards are 1 px bordered rectangles with 0 radius on the surface colour, 20 px inner padding, no shadow. Lists (publications, talks, timeline, work index) are true tables on desktop with a hairline row divider and a mono first column for the year, collapsing to stacked rows on phones. Filter chips on `/work` are bordered mono labels. The `/links` page is the same components at full width.

### Component character

Buttons: square corners, 40 px tall, 500 weight. Primary is filled accent with accent-text. Secondary is 1 px border in text colour. Links in running text are underlined 1 px with the underline in accent and text in text colour; hover fills the underline to 2 px. Tags are mono, uppercase, 12 px, letter-spacing 0.06 em, 1 px border, 2 px padding. Cards have a mono meta line at the top (organisation, year, headline number), the title in h3, one sentence in body. Navigation is a single row of 500-weight links with the active one underlined.

### Motion

Only colour and underline transitions at 120 ms. No entrance animations, no parallax, no hover scaling. Focus ring 2 px in accent.

### Imagery guidance

Portrait: square crop, 1:1, shown at 96 px on the hero and 160 px on `/about`, square corners, natural colour with slightly reduced saturation so it sits with the neutrals. Video thumbnails: 9:16, shown at 108 px wide beside the title and a mono meta line (format, platform, date), never as a full-width grid of vertical posters. Case-study covers: 16:10, a flat single-colour field carrying one number or one document crop (a slide, a table) with a 1 px border, not a photograph.

### References

GOV.UK Design System (design-system.service.gov.uk) for tabular, bordered, square components that stay legible on cheap phones. IBM Carbon (carbondesignsystem.com) for how Plex behaves in a full UI. Are.na (are.na) for a personal, list-driven site that does not read as corporate despite square corners and monospace metadata.

### Risks

Plex is IBM's brand face and Carbon is widely copied, so the direction can read as a software company if the accent is overused or if cards multiply. Plex Sans JP kana are slightly stiff compared with Zen Kaku or Noto. Monospace metadata reads as "developer" to some readers; keep it to dates, counts and tags. Square corners on the `/links` page make buttons feel smaller than they are; keep them 48 px tall there.

## Direction B: Feature

### Concept

A magazine feature rather than a journal article. A serif reading face at 18 px, borderless cards separated by space and a single top rule, and a plum accent that appears only on buttons and underlines.

### Who it feels right to and why

Committees and professors read the serif as care with writing, which is what they are judging. Employers see case studies presented like reported stories with a headline number, which is closer to how they will retell them. Brands see photography given room. Followers see a quieter page than they expect from a creator and that contrast is the point. It avoids academic styling by keeping type large, columns short, and citations out of the layout; it avoids creator styling by never letting a thumbnail be the largest thing on the page.

### Typography

| Script | Family | Weights | Role |
|---|---|---|---|
| Latin | Source Serif 4 | 400, 500, 600 (italic 400), optical size 8 to 60 | headings, running text |
| Thai | Noto Serif Thai | 400, 500, 600 | headings, running text |
| Japanese | Noto Serif JP | 400, 500, 600 | headings, running text |
| Latin UI | Source Sans 3 | 400, 500, 600 | buttons, tags, meta, navigation |
| Thai UI | Noto Sans Thai | 400, 500 | buttons, tags, meta |
| Japanese UI | Noto Sans JP | 400, 500 | buttons, tags, meta |

Why they pair: Noto Serif JP is the open release of Source Han Serif, and Source Han Serif's Latin glyphs are drawn from Source Serif, so Source Serif 4 and Noto Serif JP share a design origin and stroke contrast. Noto Serif Thai was drawn to the Noto Serif Latin proportions, which are close to Source Serif's. The UI set repeats the same logic with sans faces: Noto Sans JP is Source Han Sans, whose Latin is Source Sans. Headings in Japanese use 500 rather than 600 because mincho at 600 fills in on screens.

Type scale (base 18 px, ratio 1.25, line-height 1.6 for body):

| Step | Size | Family | Weight | Use |
|---|---|---|---|---|
| meta | 14 px | sans | 500 | dates, tags, organisation |
| small | 15 px | sans | 400 | captions, footer |
| body | 18 px | serif | 400 | running text |
| lead | 22 px | serif | 400 | identity line, summaries |
| h3 | 24 px | serif | 500 | card titles |
| h2 | 30 px | serif | 600 | section titles |
| h1 | 38 px | serif | 600 | page titles |
| display | 48 px | serif | 600 | name on the home hero only |

Script adjustments: `:lang(th)` at 1.05 em and line-height 1.75 (Noto Serif Thai sits lower than the Latin x-height and the loops need room). `:lang(ja)` at the same size with line-height 1.85 and letter-spacing 0.02 em; headings 500.

### Colour tokens

| Token | Light | Dark |
|---|---|---|
| bg | #FAF8F9 | #171317 |
| surface | #F2EEF1 | #211B20 |
| text | #221A20 | #ECE6EA |
| text-muted | #675C64 | #A99DA5 |
| border | #DDD4DA | #3A3038 |
| accent | #6D2A56 | #D797C1 |
| accent-text | #FFFFFF | #23101D |

Contrast: text on bg 16.1:1 light, 15.0:1 dark. accent-text on accent 9.9:1 light, 7.8:1 dark. text-muted on bg 6.0:1 light, 7.1:1 dark. Accent as link text on bg 9.4:1 light, 8.0:1 dark. The paper is a faint cool pink-grey rather than cream, so it does not slide into the cream-and-terracotta look. Surface is darker than bg in light mode because it is used for pull-quotes and tag fills, not for cards.

### Layout and grid

Container 1040 px, reading column 640 px (about 65 characters at 18 px). Spacing on a 12 px rhythm: 12, 24, 36, 48, 72, 96. Section spacing 96 px on desktop, 56 px on phones. Cards have no border and no fill; each begins with a 1 px top rule in border colour and 24 px of space, so a row of three reads as three columns of an article. Lists are stacked entries with the year in sans meta above a serif title. The work index filter chips are sans text separated by middle dots, with the active one underlined in accent.

### Component character

Buttons: 3 px radius, 44 px tall, sans 500. Primary filled accent with white text. Secondary is plain text with a trailing arrow and an accent underline. Links in running text are underlined in accent with text in text colour; hover changes the text to accent. Tags are sans, 13 px, uppercase, letter-spacing 0.08 em, muted colour, no border, separated by middle dots. Cards carry meta line, serif title, one serif sentence; the image sits above with 3 px radius.

### Motion

The home hero fades in over 240 ms on first load (opacity only, from 0.6 so nothing is invisible at rest). Link underline thickens on hover. Nothing else moves. Respect `prefers-reduced-motion` by removing the fade.

### Imagery guidance

Portrait: 4:5 colour photograph in natural light, shown at 200 px wide on the hero and full column width on `/about`, 3 px radius, no cut-out, no background removal. Video thumbnails: 9:16 at 120 px wide in a vertical list with serif titles, three at a time, so they read as a programme listing rather than a feed. Case-study covers: a single photograph or a single figure at 3:2, full column width, caption in sans meta beneath.

### References

Craig Mod (craigmod.com) for serif long-form about Japan with photographs given room. Aeon (aeon.co) for a serif essay site that stays warm without looking like a journal. The New Yorker (newyorker.com) for a serif front page that still uses sans for its meta and navigation.

### Risks

This is the direction most likely to be read as academic or literary by a brand manager who spends five seconds on it. Noto Serif Thai loses its loops below 16 px on low-density Android screens, so Thai body text has to stay at 19 px or larger. Mincho renders thin on Windows without ClearType tuning. Three extra font families (the sans UI set) add roughly 60 to 90 KB of woff2 on first load, which matters on a TikTok bio link. Borderless cards need disciplined spacing in Tailwind or they blur into one another.

## Direction C: Explainer

### Concept

The site explains things plainly, the way the channel does: heavier headings, short lines, filled chips, and one amber button that is unmistakably the thing to press. Latin and Thai come from one Bangkok-drawn family, so the Thai version of the site is not a translation but the native state.

### Who it feels right to and why

Followers recognise the register of an explainer video. Brands see a page that already looks like a pitch deck cover: clear hierarchy, a strong call to action, room for logos. Employers see confident, scannable summaries. Committees see clarity of structure, and the serif-free page avoids any pretence of being a journal. It avoids creator styling by using one accent instead of brand colours, no counters or follower badges on the home page, and a portrait that is a photograph rather than a logo.

### Typography

| Script | Family | Weights | Role |
|---|---|---|---|
| Latin and Thai | Anuphan | 400, 500, 600, 700 | everything |
| Japanese | Zen Kaku Gothic New | 400, 500, 700 | everything |

Why they pair: Anuphan (Cadson Demak, Bangkok) is a loopless Thai with a Latin drawn in the same file, so Thai and English share x-height, stroke and spacing without any per-script correction. Zen Kaku Gothic New is a contemporary Japanese gothic with open counters and slightly humanist kana that match Anuphan's softened grotesque; both have a 500 and a 700, and both sit close in apparent weight at the same size. Anuphan has no italics, so emphasis is done with 600 weight rather than slant.

Type scale (base 17 px, ratio 1.25, line-height 1.55 for body):

| Step | Size | Weight | Use |
|---|---|---|---|
| meta | 13 px | 500 | dates, tags, organisation |
| small | 14 px | 400 | captions, footer |
| body | 17 px | 400 | running text |
| lead | 20 px | 400 | identity line, summaries |
| h3 | 22 px | 600 | card titles |
| h2 | 27 px | 700 | section titles |
| h1 | 34 px | 700 | page titles |
| display | 44 px | 700 | name on the home hero only |

Script adjustments: `:lang(th)` needs nothing; the Thai is the same face. `:lang(ja)` uses line-height 1.8 and headings at 700 (Zen Kaku's bold is drawn lighter than most gothics, so it does not clog).

### Colour tokens

| Token | Light | Dark |
|---|---|---|
| bg | #FFFFFF | #141311 |
| surface | #F5F4EF | #1E1D19 |
| text | #1C1B18 | #EEEBE3 |
| text-muted | #5D5A52 | #A5A197 |
| border | #D9D6CC | #36342D |
| accent | #F0B429 | #F5C453 |
| accent-text | #1C1B18 | #1C1B18 |

Contrast: text on bg 17.2:1 light, 15.6:1 dark. accent-text on accent 9.2:1 light, 10.6:1 dark. text-muted on bg 6.9:1 light, 7.2:1 dark. Rule that follows from the numbers: amber on white is 1.9:1, so in light mode the accent is only ever a fill (button, chip, 2 px underline, active-tab bar) and never a text colour or a focus ring. Links stay in text colour with an amber underline. Focus rings use text colour. In dark mode the amber does reach 11.4:1 on bg and may be used as text there, but keeping one rule across both themes is simpler.

### Layout and grid

Container 1200 px, reading column 720 px. Spacing on an 8 px rhythm: 4, 8, 12, 16, 24, 32, 48, 64. Section spacing 64 px on desktop, 40 px on phones. Cards are 12 px radius, 1 px border, surface fill, 20 px inner padding. Lists are stacked rows with a chip row beneath each title. Filter chips are filled surface with a 999 px radius and switch to filled accent when active. The `/links` page is a column of 52 px buttons at 12 px radius.

### Component character

Buttons: 10 px radius, 44 px tall, 600 weight. Primary is filled amber with dark text. Secondary is a 1 px border in border colour with text colour. Links in running text are text colour with a 2 px amber underline; hover moves the underline 2 px lower. Tags are chips: surface fill, 13 px, 500 weight, 999 px radius, 4 px by 10 px padding. Cards have the chip row at the top, a 600 title, one line in body, and a meta line in muted.

### Motion

Cards raise a 1 px border-colour change and a 2 px translate on hover at 150 ms. Buttons press 1 px on active. No entrance animations. Chips do not move.

### Imagery guidance

Portrait: 3:4 colour photograph with a 12 px radius, shown at 140 px wide on the hero and 280 px on `/about`, no circle crop. Video thumbnails: 9:16 at 108 px wide in a horizontal row on the home page and a three-column grid on `/creator`, each in a 12 px radius card with a chip for the format. Case-study covers: 16:10 flat colour field in surface with the headline number set at display size in accent-text colour, and the organisation logo at small size in the corner where permitted.

### References

Vox (vox.com) for explainer journalism with a yellow accent used as a fill and heavy sans headings. Khan Academy (khanacademy.org) for rounded, bordered cards and a friendly learning register that is not childish. Wirecutter (nytimes.com/wirecutter) for direct, scannable product-style summaries with restrained colour.

### Risks

If the accent is used on more than one element per screen the page turns into a startup landing page. Amber can be read as a warning colour by some Japanese readers (yellow is caution signage), so keep it off anything that is not an action. Anuphan is a young family with no italics and no width axis, so long English essays have less typographic range than with Plex or Source Serif. Two foundries means the Japanese and Thai never match as exactly as in Register; a heading with mixed Thai and Japanese will show a small weight difference.

## Comparison

| | Register | Feature | Explainer |
|---|---|---|---|
| Personality in one word | Orderly | Readerly | Direct |
| Latin / Thai / Japanese | IBM Plex Sans / Plex Sans Thai / Plex Sans JP, Plex Mono for numbers | Source Serif 4 / Noto Serif Thai / Noto Serif JP, sans set for UI | Anuphan / Anuphan / Zen Kaku Gothic New |
| Font families to load | 4 | 6 | 2 |
| Body size | 16 px | 18 px | 17 px |
| Accent | Teal #0B6B60 | Plum #6D2A56 | Amber #F0B429 (fill only) |
| Corner radius | 0 | 3 px | 10 to 12 px |
| Card style | 1 px border, surface fill | No border, top rule, space | 1 px border, surface fill, radius |
| Lists | Tables with mono year column | Stacked entries, sans meta | Stacked rows with chips |
| Motion | Colour only | Hero fade, underline | Hover lift, press |
| Strongest for | Employers, committees | Committees, brands with photography | Followers, brands |
| Weakest for | Followers who expect warmth | Followers, brands in a five-second scan | Committees expecting restraint |
| Trilingual fit | One family, matched weights, looped Thai available | Shared design origin, Thai needs a size bump | Thai native, Japanese from a second foundry |
| Cost on a bio-link visit | Low | Highest (serif plus sans set) | Lowest |
| Tailwind effort | Low: default scale, radius 0 | Medium: spacing discipline, two font stacks | Low |
| Main risk | Reads as software company | Reads as journal | Reads as startup |

## Recommendation

Register is the recommendation.

For the four audiences: it is the only direction that is neutral by construction rather than by restraint. Committees and employers get tables, dates and monospace numbers, which matches the voice charter's rule of real numbers instead of adjectives. Brands get a page that already behaves like a media kit. Followers get a fast, calm page that does not try to look like TikTok, and the door cards give them somewhere to go in one tap. Feature serves committees best but asks brands and followers to slow down; Explainer serves followers and brands best but gives committees the least sense of restraint.

For the trilingual requirement: Register is the only direction where all three scripts come from one family with one weight scale and one vertical metric, so the Thai and Japanese pages later need no per-script corrections, and IBM Plex Sans Thai Looped gives a formal Thai option without changing layout. Feature has a real shared origin between its Latin and Japanese but the Thai needs a size bump, and its six families are the heaviest load on a phone. Explainer pairs Thai and Latin perfectly but its Japanese comes from a second foundry.

For mobile-first: Plex at 16 px is legible on low-density Android screens, and the direction loads four families of which only the subsets in use download.

If Register feels too cool after living with the preview, Explainer is the second choice and shares its structure, so switching costs one font stack and a radius scale. Feature is the choice only if writing becomes the main thing the site does.

## What changes if you pick each one

- Register: Tailwind `fontFamily.sans` = Plex Sans, Plex Sans Thai, Plex Sans JP; `fontFamily.mono` = Plex Mono; `borderRadius` set to 0; base text 16 px; accent teal; lists become tables on desktop.
- Feature: two stacks, `serif` for prose and `sans` for UI; base text 18 px with a 640 px prose column; `borderRadius` 3 px; cards drop their borders and use a top rule; accent plum; six families in the font link.
- Explainer: `fontFamily.sans` = Anuphan, Zen Kaku Gothic New; base text 17 px; `borderRadius` 10 and 12 px; chips as the tag component; accent amber used as fill only, links underlined not coloured.
