# Landing page brief: two reference prompts combined

Status: v2, 2026-09-21. The owner answered question 1 (this is the home page, built inside Astro) and the page is built; section 11 lists the defaults applied for the other questions and what is still needed.
Sources: Prompt A ("Jack, 3D Creator": five scrolling sections, Kanit, Framer Motion) and Prompt B ("Marcus, Bennet": one non-scrolling editorial hero, cream on black, CSS entrance choreography). Both describe other people's pages. Their copy, image URLs, and one font are references only and are replaced below by placeholders written as `{{like-this}}`.

## 1. How the two prompts were combined

| Aspect | Prompt A | Prompt B | Combined decision | Owner to confirm |
|---|---|---|---|---|
| Page shape | Five sections that scroll | One 100dvh hero, no scroll inside it | B's hero is the first viewport; A's sections follow below it | yes, section 9 Q1 |
| Background and text | `#0C0C0C`, text `#D7E2EA` | photo background, text cream `#efeee9` | `#0C0C0C` everywhere dark; cream `#efeee9` is the text and line colour; `#D7E2EA` is dropped so there is one light tone | Q6 |
| Light section | Services on pure white `#FFFFFF` | none, black and cream only | Keep A's one light section for rhythm, but paint it cream `#efeee9` with `#0C0C0C` text so the page has two colours, not three | Q6 |
| Font | Kanit 300 to 900 from Google Fonts | Helvetica Neue ME from db.onlinewebfonts.com | Kanit. It is licensed, on Google Fonts, and covers Thai and Latin. The Helvetica Neue ME link is dropped: that site redistributes a commercial Monotype font without a licence, and the face has no Thai. If a Helvetica feel is wanted, section 9 Q5 lists licensed options | Q5 |
| Purple | Contact button with a purple and orange gradient and glow | "no purple, no glow, no pills" | Gradient dropped. Every call to action is B's ghost pill: 2px cream border, cream text, uppercase, wide tracking. B forbids pills in the hero, so the hero has no button at all; the first button appears in the About section | no |
| Cards | Three sticky stacking project cards | "no cards" | No cards in the hero. Stacking cards are kept below the fold in Projects | Q10 |
| Hero headline | "Hi, i'm jack" at 17.5vw with a grey gradient fill | Scrolling marquee name at 26vh, infinite, 30s | B's marquee name. A's gradient text class is kept for the section headings below (About, What I do, Projects) | Q2 |
| Portrait | One image that follows the mouse (Magnet), bottom centre | Full-bleed background photo plus a cutout portrait layered over the marquee | B's layering: background image, marquee, cutout on top with pointer events off. A's Magnet effect is optional on the cutout, desktop only | Q7 |
| Header | Horizontal row of four links | Brand at left; year, vertical nav column and vertical social column at right; hamburger and drawer on mobile | B's header, with this site's sections and socials | Q3 |
| Motion | Framer Motion `whileInView` fades, scroll-driven marquee and text reveal, sticky scale | CSS keyframes with a fixed delay schedule, marquee, drawer | B's CSS choreography for the hero; Framer Motion for the sections below; `prefers-reduced-motion` collapses everything to near zero | no |
| Stack | Vite, React, TypeScript, Tailwind, Framer Motion, Lucide | Vite, React, TypeScript, Tailwind, Lucide (X icon only) | React, TypeScript, Tailwind, Framer Motion, Lucide. Where it lives (standalone Vite app or a React island inside the Astro site) is Q4 | Q4 |
| Title | "Jack -- 3D Creator" | "Marcus — Bennet" | `{{title}}` | Q2 |
| Theme | dark only | dark only | dark only for this page. The wider plan wanted light and dark; see section 10 | Q11 |

## 2. Global styles

- Background `#0C0C0C` on `html`, `body`, `#root`, and the main wrapper. Main wrapper `overflow-x: clip`.
- Font: Kanit, weights 300, 400, 500, 700, 900, from Google Fonts with `display=swap`. Stack: `'Kanit', 'Noto Sans Thai', system-ui, sans-serif`. Add `Noto Sans JP` only if Japanese text appears on the page (Q8).
- Colours as Tailwind theme extensions: `ink: #0C0C0C`, `cream: #efeee9`, `panel: #141414` (drawer only).
- Reset: `box-sizing: border-box`, zero margin and padding.
- `.hero-heading`: `background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%)`, `-webkit-background-clip: text`, `-webkit-text-fill-color: transparent`. Used on the section headings below the fold, not in the hero.
- Root hero section: `relative h-[100dvh] w-full overflow-hidden`.

## 3. Section order

1. Hero (B)
2. Media marquee (A, with the owner's media)
3. About (A, without the borrowed 3D props)
4. What I do (A's Services)
5. Projects (A)
6. Footer is part of the hero in B; a second, simple footer closes the page after Projects.

## 4. Hero

Layers, bottom to top: background image; marquee name `z-10`; cream rule `z-10`; desktop footer `sm:z-10`; cutout portrait `z-20`, `pointer-events-none`; header and mobile footer `z-30`; drawer `z-40`; hamburger and close `z-50`.

Header: `absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8`.
- Left: brand link `{{brand}}` in `text-lg tracking-wide`.
- Right, `hidden sm:flex items-start gap-16 lg:gap-24`: year `{{year}}` in `text-sm`; nav column `flex-col gap-0.5 text-sm` with `{{nav-1}}`, `{{nav-2}}`, `{{nav-3}}`; social column, same style, with `{{social-1}}`, `{{social-2}}`, `{{social-3}}`. Hover `opacity-60` over `300ms`.
- Mobile: hamburger, three cream bars in a `h-10 w-10` box, bars `h-4 w-6`.

Marquee: `absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden`; track `flex w-max whitespace-nowrap text-[16vh] sm:text-[26vh] leading-none text-cream`; text `{{marquee-name}}` followed by a non-breaking space, each span `pr-[6vw]`, duplicated so the track is two identical halves; `translateX(0)` to `translateX(-50%)`, 30s linear infinite.

Portrait: background `{{hero-background}}` and cutout `{{hero-cutout}}`, both `absolute inset-0 h-full w-full object-cover`. Cutout `alt="Portrait"`, background `alt=""`. Optional Magnet on the cutout at `sm:` and up: padding 150, strength 3, transition in `transform 0.3s ease-out`, out `transform 0.6s ease-in-out`, `will-change: transform`.

Cream rule: `absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-cream`, grows `scaleX(0)` to `scaleX(1)` from the left.

Footer: `absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed`. Left, three lines `{{footer-line-1}}`, `{{footer-line-2}}`, `{{footer-line-3}}`. Right, right-aligned, two lines `{{footer-right-1}}`, `{{footer-right-2}}`.

Mobile drawer (`sm:hidden`): backdrop `fixed inset-0 z-40 bg-black/40 backdrop-blur-sm`, opacity over 500ms, click closes, `pointer-events-none` when closed. Panel from the right, `w-[80%] max-w-sm bg-[#141414] px-8 py-10`, `translate-x-full` to `translate-x-0` over 600ms with `cubic-bezier(0.76, 0, 0.24, 1)`. Body scroll locked while open. Close is Lucide `X` size 26 stroke 1.5 at `right-6 top-6`, rotate 90 and fade when closed, delay 300ms when opening. Labels `{{drawer-label-1}}` (for the nav) and `{{drawer-label-2}}` (for the socials), uppercase, `tracking-[0.2em]`, `text-cream/50`. Nav links `text-4xl`, staggered `300 + i*80` ms from `translate-y-6 opacity-0`; socials `text-sm`, staggered `550 + i*60` ms from `translate-y-4 opacity-0`. Hamburger bars rotate to an X over 500ms with the same curve; middle bar fades over 300ms.

## 5. Sections below the hero

### Media marquee
Two rows of tiles that move with page scroll. Padding `pt-24 sm:pt-32 md:pt-40 pb-10`. Tiles 420 by 270 px, `rounded-2xl`, `object-cover`, lazy loaded, `gap-3`, `will-change: transform`, passive scroll listener. Row 1 moves right, `translateX(offset - 200)`; row 2 moves left, `translateX(-(offset - 200))`; `offset = (scrollY - sectionTop + innerHeight) * 0.3`. Each row is its list tripled for a seamless loop. Media: `{{marquee-media}}`, ideally 16 to 21 items split roughly in half. A's GIFs are another studio's work and are not used.

### About
`min-h-screen`, `px-5 sm:px-8 md:px-10 py-20`, centred. Heading "About me" in `.hero-heading`, `font-black uppercase leading-none tracking-tight`, `clamp(3rem, 12vw, 160px)`, fade in y 40. Paragraph `{{about-paragraph}}` in cream, `font-medium`, centred, `leading-relaxed`, `max-w-[560px]`, `clamp(1rem, 2vw, 1.35rem)`, revealed character by character from opacity 0.2 to 1 with scroll offset `['start 0.8', 'end 0.2']`. Below it one ghost pill `{{cta-label}}` linking to `{{contact-target}}`. Gaps `gap-10 sm:gap-14 md:gap-16` then `gap-16 sm:gap-20 md:gap-24`. The four decorative 3D objects in A are another creator's renders and are left out unless the owner supplies his own props (`{{about-props}}`, optional).

### What I do
Cream section, `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]`, `px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32`. Heading `{{services-heading}}` in `#0C0C0C`, `font-black uppercase`, centred, `clamp(3rem, 12vw, 160px)`, `mb-16 sm:mb-20 md:mb-28`. Five rows, `max-w-5xl`, centred, separated by 1px `rgba(12,12,12,0.15)` rules, `py-8 sm:py-10 md:py-12`, each fading in with delay `i * 0.1`: number at left in `font-black` `clamp(3rem, 10vw, 140px)`; at right the name in `font-medium uppercase` `clamp(1rem, 2.2vw, 2.1rem)` over a description in `font-light leading-relaxed max-w-2xl` `clamp(0.85rem, 1.6vw, 1.25rem)` at opacity 0.6. Items `{{service-1}}` to `{{service-5}}`, each a name and one sentence.

### Projects
Back to `#0C0C0C`, `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]`, `-mt-10 sm:-mt-12 md:-mt-14 z-10`. Heading `{{projects-heading}}` in `.hero-heading`. Three sticky cards, each `sticky top-24 md:top-32` inside an `h-[85vh]` container, `top: index * 28px`, scaling to `1 - (2 - index) * 0.03` as the next card arrives, via `useScroll` and `useTransform`. Card: `rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-cream bg-[#0C0C0C] p-4 sm:p-6 md:p-8`. Top row: number in the services style, `{{project-n-category}}`, `{{project-n-name}}`, and a ghost pill `{{project-button-label}}` linking to `{{project-n-url}}`. Bottom row: two columns, left 40% with two stacked images at heights `clamp(130px, 16vw, 230px)` and `clamp(160px, 22vw, 340px)`, right 60% with one tall image, all with the card's radius. Images `{{project-n-image-1..3}}`. A's nine CloudFront images belong to someone else's projects and are not used.

### Closing footer
One line of cream text on `#0C0C0C`: `{{closing-footer}}` (name, year, and the social links again).

## 6. Components

- `FadeIn`: Framer Motion `whileInView`, `viewport={{ once: true, margin: "50px", amount: 0 }}`, props `delay`, `duration` (0.7), `x` (0), `y` (30), easing `[0.25, 0.1, 0.25, 1]`, `motion.create()` for the element type.
- `Magnet`: mouse-following translate, activates within `padding` px of the element edge, offset divided by `strength`, transitions as in section 4, `will-change: transform`. Disabled on touch devices and under reduced motion.
- `AnimatedText`: per-character spans, invisible placeholder plus absolutely positioned animated copy, opacity mapped from scroll progress.
- `GhostButton`: `rounded-full border-2 border-cream text-cream font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base`, hover `bg-cream/10`. The only button style on the page.
- `Drawer`: as in section 4.

## 7. Motion schedule

Hero, CSS keyframes with `animation-fill-mode: both`:

| Class | Keyframes | Duration and easing | Target and delay |
|---|---|---|---|
| `anim-fade-in` | opacity 0 to 1 | 1.2s ease-out | background image, 0ms |
| `anim-rise-in` | opacity 0 to 1, `translateY(4vh) scale(1.03)` to none | 1.4s `cubic-bezier(0.22, 1, 0.36, 1)` | cutout, 300ms |
| `anim-fade-up` | opacity 0 to 1, `translateY(28px)` to 0 | 0.9s `cubic-bezier(0.22, 1, 0.36, 1)` | marquee 500ms; brand 800ms; year and hamburger 900ms; nav `1000 + i*80`; socials `1150 + i*80`; footer left 1400ms; footer right 1550ms |
| `anim-line` | `scaleX(0)` to 1, origin left | 1.1s `cubic-bezier(0.76, 0, 0.24, 1)` | cream rule, 1200ms |
| `.marquee` | `translateX(0)` to `-50%` | 30s linear infinite | name track |

Below the fold: `FadeIn` per section as listed; scroll-driven media marquee; character reveal in About; sticky scale in Projects.

Reduced motion: under `prefers-reduced-motion: reduce`, every keyframe collapses to 0.01ms with 0 delay, the name marquee stops, the media rows are static, About text renders at full opacity, cards stack without scaling, and Magnet is off.

## 8. Assets needed from the owner

| Asset | Spec | Used in |
|---|---|---|
| `{{hero-background}}` | One landscape photo, at least 2560 px wide, dark enough for cream text, or a plain `#0C0C0C` field if no photo | Hero background |
| `{{hero-cutout}}` | Portrait with the background removed, PNG with transparency, at least 2000 px tall, framed so the head sits in the upper half at 16:9 and 9:16 | Hero, over the marquee |
| `{{marquee-media}}` | 16 to 21 items: video thumbnails, stills, or short looping MP4 or WebP from @takumyi or the photography work, 16:9 preferred; posters for any video | Media marquee |
| `{{project-n-image-1..3}}` | Three images per project, nine in all, each at least 1600 px on the long side | Projects |
| `{{about-props}}` (optional) | Two to four PNG objects with transparency if the About corners should have props | About |
| Favicon and social preview image | 512 px square icon; 1200 by 630 px preview | Page chrome |

## 9. Questions for the owner

1. Scope. Is this landing page the new home page of the site planned in `docs/site-structure.md`, with the section pages (Work, Research, Creator, Writing, About, Contact) behind it, or a separate one-page site? The plan's home page was a neutral switchboard; this is a creator-forward hero, so the plan changes either way.
2. Names and title. What text runs in the marquee (for example "Takumi — Oshiyama" or "Takumi — @takumyi"), what is the brand word at top left, and what is the browser title?
3. Header links. Which three nav labels (the plan's sections are Work, Research, Creator, Writing, About, Contact; B has three), which three socials (TikTok and Instagram are confirmed as @takumyi; YouTube and X are not), and what year?
4. Where it lives. Standalone Vite and React app, or a React island inside the Astro site so the case studies and data already in `content/` stay usable? Hosting is still Cloudflare Pages either way.
5. Font. Kanit as combined, or a Helvetica-like face? Licensed Google options with the right feel are Archivo, Hanken Grotesk, Public Sans, or Instrument Sans, each paired with Noto Sans Thai for Thai text. Helvetica Neue itself needs a Monotype licence and a self-hosted file.
6. Colours. Cream `#efeee9` as the single light tone, and the What I do section painted cream rather than white? Or keep A's `#D7E2EA` and pure white?
7. Portrait behaviour. Should the cutout follow the cursor on desktop (A's Magnet), or stay still (B)?
8. Language. English only on this page, or Thai as well? Kanit covers both; Japanese would add Noto Sans JP.
9. Copy. The tagline under the hero (if any), the three footer lines and the two right-aligned lines, the About paragraph (about 50 words, first person), the five What I do items with one sentence each, the three projects with category, name, and link, and the drawer labels.
10. Projects. Which three: three of the eleven case studies already drafted, three creator collaborations, or a mix? Cards are kept for these; confirm that is fine given B's "no cards" rule for the hero.
11. Theme. Dark only, as both prompts are, or should a light theme exist for the section pages?
12. Contact. A `mailto:` link, the plan's contact form, or a link to Instagram DMs?

## 10. Relationship to the existing plan

This brief departs from three earlier decisions: the neutral look, the switchboard home page, and the light-plus-dark themes. Nothing in the plan is changed until Q1 and Q11 are answered. The three baseline directions and the four skill-based explorations in `docs/design-exploration/` still apply to the section pages, and their motion and mobile rules apply to this landing page as well.

## 11. Build status, 2026-09-21

Built as `src/pages/en/index.astro` with the hero as static Astro plus a React island for the header and drawer, and React islands for the media rows, About, What I do, and Projects. Copy and settings are in `content/pages/en/home.yaml`; every value chosen by the builder is marked `default` there with the question it answers.

| Question | Default applied | Change it in |
|---|---|---|
| Q2 names | Marquee and title "Takumi — Oshiyama", brand "Takumi" | `home.yaml`: marquee, title, brand |
| Q3 header | Work, Creator, About; TikTok, Instagram, LinkedIn; 2026 | `home.yaml`: nav, social, year |
| Q5 font | Kanit 300 to 900 | `src/layouts/Base.astro` and `src/styles/global.css` |
| Q6 colours | Ink and cream only; What I do painted cream | `src/styles/global.css` |
| Q7 portrait | Follows the cursor on pointer devices, still on touch | `home.yaml`: hero.magnet |
| Q8 language | English only | n/a |
| Q9 copy | Footer lines, About paragraph, five What I do items, drawer labels, button labels, all drafted from the CV | `home.yaml` |
| Q10 projects | The three featured case studies | `home.yaml`: projects.items |
| Q11 theme | Dark only | n/a |
| Q12 contact | The contact page, which lists the socials; no email yet | `home.yaml`: about.cta, and `src/pages/en/contact.astro` |

Still needed: every asset in section 8. Placeholders are in `public/placeholders/` and referenced from `home.yaml`; replace the paths there once the files are in `public/images/`.
