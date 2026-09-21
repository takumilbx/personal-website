# Content

Everything the site shows lives in this folder. No code here, only Markdown and YAML.

## Layout

```
content/
├── README.md              this file
├── _templates/            copy one of these to start a new entry
├── pages/{en,th,ja}/      one Markdown file per site page (prose sections)
├── work/{en,th,ja}/       one Markdown file per case study
├── writing/{en,th,ja}/    one Markdown file per post
├── data/                  shared structured data (YAML), not translated
└── i18n/                  interface strings per language (navigation, buttons)
```

## Two rules

1. **Prose is per language. Data is shared.**
   Pages, case studies, and posts have an `en/`, `th/`, and `ja/` copy. Publications, talks, videos, collaborations, the timeline, creator statistics, and the CV are single YAML files used by every language.

2. **English is the source. Thai and Japanese are placeholders until translated.**
   Every prose file has `status:` in its frontmatter. Only `published` files are built. A missing or placeholder translation falls back to the English page with a small notice.

## Status values

| status | meaning |
|---|---|
| `placeholder` | the file holds the slot; the body is not real content |
| `draft` | real content, not ready to publish |
| `published` | live on the site |

## How to add things

- **A case study:** copy `_templates/case-study.md` to `work/en/<slug>.md`. Keep the seven sections. Add `work/th/<slug>.md` and `work/ja/<slug>.md` later with the same slug.
- **A post:** copy `_templates/post.md` to `writing/en/<slug>.md`.
- **A publication, talk, video, or collaboration:** add an entry to the matching file in `data/`. Each file starts with a commented example.
- **A timeline event:** add an entry to `data/timeline.yaml`.
- **CV changes:** edit `data/cv.yaml`. The web CV and the PDF are both generated from it.
- **Creator statistics:** paste the figures from a TikTok analytics export into `data/creator-stats.yaml` and set `asOf`. Leave a field empty rather than estimate it.

## Naming

- Slugs: lowercase, hyphens, no dates. `broadband-school`, not `2024-broadband-school`.
- Dates: `YYYY-MM-DD`. Month precision is fine for periods: `YYYY-MM`. Ongoing work: `end: present`.
- Images: once the site is scaffolded they go under `public/images/<collection>/<slug>/` and are referenced by path in frontmatter.
