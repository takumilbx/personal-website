# Launch checklist

Your list, in the order to do things. Items marked **(me)** are mine and start as soon as the item above them is done. Tick a box by editing this file on GitHub (pencil icon) or just tell me and I will tick it.

How to hand me files: drop them into the repository at the path given (GitHub, "Add file", "Upload files", on this branch), or send them in chat and I will place them.

## 1. Now: make the home page real

- [ ] Portrait cutout, PNG with a transparent background, at least 2000 px tall, head in the upper half. Path: `public/images/home/portrait.png`
- [ ] Background photo, at least 2560 px wide, dark enough for cream text. Optional; skip if you want plain black. Path: `public/images/home/background.jpg`
- [ ] 16 to 21 media stills or thumbnails from @takumyi, 16:9 if possible. Path: `public/images/media/01.jpg` to `21.jpg`
- [ ] 9 project images, three per featured case study, at least 1600 px on the long side. Paths: `public/images/work/bangkok-education-policy-map/1.jpg` to `3.jpg`, same for `digital-classroom-vs-giga-school` and `edsy-japan-market-entry`
- [ ] Favicon (512 px square) and a social preview image (1200 by 630 px). Paths: `public/images/icon.png`, `public/images/social.jpg`
- [ ] Open `content/pages/en/home.yaml` and decide each line marked `default`:
  - [ ] Marquee text and browser title (now "Takumi — Oshiyama")
  - [ ] Brand word top left (now "Takumi") and year (now 2026)
  - [ ] Three nav labels (now Work, Creator, About)
  - [ ] Footer lines, three left and two right
  - [ ] About paragraph (drafted from your CV, about 55 words)
  - [ ] Five "What I do" items
  - [ ] Project categories and the button label
- [ ] YouTube and X: say yes with the links, or no
- [ ] **(me)** Wire the assets, replace every placeholder, tune the hero over the real photo, add font preloading and Open Graph tags

## 2. Next: the two most-visited section pages

- [ ] Export TikTok analytics (followers, 28-day views, audience by country and age) and send it, or paste into `content/data/creator-stats.yaml`
- [ ] Pick 6 to 9 videos for the Creator page: link, title, format, date. Goes in `content/data/videos.yaml`
- [ ] List brand or event collaborations: brand, campaign, date, what you delivered. Goes in `content/data/collabs.yaml`
- [ ] **(me)** Build the Creator page from those files
- [ ] Answer the confidentiality checks: what may be public about the Edsy work (Gakken, pilot-school list, market analysis) and the 2025 Bangkok work (dashboards, analysis)
- [ ] Go through the 11 case-study files in `content/work/en/` and answer the `TODO owner` comments, especially "What I would do differently" in each
- [ ] Send links to public artefacts: the deck for the 47 policies, the ESCAP paper is already linked, thesis PDF, dashboard screenshots if allowed
- [ ] **(me)** Publish the case studies, add filters and covers to the work index

## 3. Then: the remaining pages

- [ ] Confirm the About page story and timeline (drafted from your CV), and give the @takumyi channel start date
- [ ] Send the research plan PDF and the senior thesis PDF, or say they stay private
- [ ] Decide: public email address on the contact page, yes or no
- [ ] Write the Now page: what this season looks like, a few lines
- [ ] **(me)** Build About, Research, Contact, CV page with generated PDF, Now, a 404 page
- [ ] Optional: three posts for the Writing section, or leave it hidden

## 4. Before launch

- [ ] Read every page once for voice and facts, and send corrections
- [ ] Open the home page and `/en/links/` on your phone from inside TikTok and Instagram, and note anything that feels wrong
- [ ] Pick analytics: Plausible or Umami, create the account, send the site ID
- [ ] **(me)** Accessibility pass, performance to Lighthouse 90 or above on mobile, page crossfade, sitemap, structured data, analytics wired

## 5. Launch

- [ ] Check the domain shortlist at a registrar (takumyi.com first, then takumyi.me) and register one
- [ ] Decide hosting: Cloudflare Pages (recommended) or keep GitHub Pages with the custom domain
- [ ] **(me)** Point the build at the domain, remove the preview noindex, set up DNS with you, verify HTTPS
- [ ] Merge the working branch into `main` (I open the pull request, you press merge)
- [ ] Put `/links` in your TikTok and Instagram bios
- [ ] **(me)** Final check of every route on the live domain

## 6. After launch

- [ ] Thai versions of Creator and Links, then the rest
- [ ] Japanese versions of About and Research
- [ ] Media-kit PDF for brands
- [ ] Decide whether the reading pages keep the dark landing-page look or take one of the explored directions
- [ ] Keep the timeline, CV data, and case studies current

## Open decisions

- [ ] Public email on the site
- [ ] Domain and hosting
- [ ] Analytics provider
- [ ] Section-page design
- [ ] YouTube and X links
