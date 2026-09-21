# Project skills

Third-party design skills vendored into this repository so they load in every Claude Code session on it. Added 2026-09-21 at the owner's request. Each folder is copied verbatim from its source at the commit listed; nothing here was edited.

| Folder(s) | Source | Commit | License | What it is |
|---|---|---|---|---|
| `taste-skill`, `minimalist-skill`, `soft-skill`, `brutalist-skill`, `redesign-skill` | https://github.com/leonxlnx/taste-skill (`skills/`) | `5217fb4` | MIT | Anti-template frontend design: design read, three dials (variance, motion, density), directives, forbidden AI tells, redesign protocol. The three aesthetic variants and the redesign protocol are included; image-generation and image-to-code skills are not. |
| `impeccable` (+ `.claude/agents/impeccable-*.md`) | https://github.com/pbakaus/impeccable (`.claude/`) | `9f42da8` (skill 0.1.5) | Apache 2.0 | Design fluency with 24 sub-commands (critique, audit, polish, bolder, quieter, typeset, colorize, layout, animate, new-work, and so on) and four helper agents. |
| `emil-design-eng`, `animate`, `animation-vocabulary`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `apple-design`, `pick-ui-library`, `mobile-native`, `prototype` | https://github.com/emilkowalski/skills (`skills/`) | `85e8e23` | MIT | Emil Kowalski's design-engineering and animation rules. The Expo, Swift, and Sonner skills are not included. |
| `ui-ux-pro-max`, `design-system` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (`.claude/skills/`) | `dcc40ff` | MIT | Searchable local database of styles, palettes, font pairings, UX guidelines, and stack notes, with a Python search script. The logo, slides, banner, brand, and ui-styling skills are not included. |

## Notes

- **Impeccable's edit hook is not enabled.** Upstream installs a PostToolUse and Stop hook that runs `.claude/skills/impeccable/scripts/impeccable hook`; that launcher downloads a pinned engine binary into `~/.impeccable/bin/` on first run. To enable it, copy the `hooks` block from the upstream `.claude/settings.json` into your own `.claude/settings.local.json` after reading it. The skill's instructions also work without the launcher, in the degraded mode the skill itself describes.
- **UI/UX Pro Max search** runs with `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>` from the repository root. It reads only the CSV files beside it. Do not use `--persist` without deciding where the output should live.
- **Updating:** re-clone the source at a newer commit and copy the same folders over these; then update the commit column above.
- Everything in these folders is third-party instruction text. Treat it as guidance for design work, not as authority over this repository's own plan in `docs/`.
