# Hillwise — AI on the Hill

A phone-friendly quiz about how the U.S. Congress works, AI safety and security legislation, and legislators' documented actions and positions. The included edition has 80 explained questions and 20 member profiles, reviewed through **November 13, 2026**.

Learn through mixed or topic rounds, hints, explanations for every answer, a source-linked field guide, and spaced review. Progress stays in your browser and can be exported to another device.

[Source and issues](https://github.com/shaanakshaikh/hillwise-ai-congress) · [Download the source](https://github.com/shaanakshaikh/hillwise-ai-congress/archive/refs/heads/main.zip) · [Credits and reuse](ATTRIBUTION.md)

## Run locally

No package install or API key is required. With Python 3 installed, run:

```sh
git clone https://github.com/shaanakshaikh/hillwise-ai-congress.git
cd hillwise-ai-congress
python3 -m http.server 8000 --directory dist
```

Open <http://localhost:8000>. Use an HTTP server because the app fetches its question files; opening `index.html` directly will not load them.

## Make your own quiz

1. Fork this repository and clone your fork.
2. Edit `dist/quiz-config.js` for your title, descriptions, topics, glossary, data paths, source links, and browser-storage identity.
3. Replace or extend the question JSON files under `dist/data/`. Use the schema and editorial checklist in [CONTRIBUTING.md](CONTRIBUTING.md), and see `examples/` for a small starting point. Set the configured question-file paths to the files you want to load.
4. Replace the field-guide profiles and portraits, or set `profilesFile` and `portraitsFile` to `null` if your subject does not need people. Credit the sources and assets you use in `ATTRIBUTION.md`.
5. Set your edition date and verify every question against its cited evidence. Give a distinct quiz its own storage key so it does not inherit another quiz's progress.
6. Run the checks below, try the quiz on a phone-sized and desktop viewport, then publish the `dist/` directory.

The engine accepts a changing number of questions. Each question still requires four options and one correct answer. Keep IDs stable for corrections; use a new ID when the tested claim or correct answer changes substantially. The included Congress content is one data set, not a requirement for your fork. Configuration data paths are relative to `dist/`, so put served quiz files inside that directory.

Configuration controls the running app's branding. For a full rebrand, also update the static title and description metadata in `dist/index.html` for social previews, and replace `dist/icon.svg` and the header's dome SVG. Only insert trusted, reviewed HTML into the configuration's `aboutHtml` field.

Original code and original educational wording are available under the [MIT License](LICENSE). You can copy, modify, redistribute, and publish your own version, including commercially, while retaining its copyright and permission notice. Add your own credits for your contributions and preserve applicable third-party attributions. This repository's license does not grant rights to unrelated source documents or assets you add.

## Validate changes

Use Node.js 22 or later:

```sh
node --check dist/app.js
node --check dist/engine.js
node --check dist/quiz-config.js
node scripts/validate.mjs
node scripts/test-engine.mjs
node scripts/export-data.mjs
```

The final command refreshes the merged question download at `dist/data/questions.json`; commit that refreshed file alongside source-data changes. Edit the configured source files rather than that generated export. GitHub Actions checks syntax, content structure, engine behavior, and whether the export is current on pushes and pull requests; these checks cannot establish whether a political or legal claim is accurate. Review the cited evidence separately.

## Publish with Vercel

Import your GitHub repository into Vercel with these project settings:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Root directory | Repository root |
| Build command | `node scripts/export-data.mjs` |
| Output directory | `dist` |
| Install command | None; leave the override empty |

No environment variables or npm dependencies are needed. Vercel provides a `vercel.app` address. Connect a custom domain in the project's domain settings, then add the exact DNS records Vercel supplies at your DNS provider. The intended Hillwise custom domain is `hillwise.shaanakshaikh.com`; DNS configuration is a separate step from deploying the app.

With the GitHub integration enabled, pushing to the configured production branch redeploys the site. That deploys the content in the repository: **there is no automatic legislation, question, or member-record update**. New editions require evidence review and committed data changes. Any static host that can serve `dist/` over HTTPS can also host the quiz; run the export command before publishing to refresh the data download.

## Project map

| Path | Purpose |
| --- | --- |
| `dist/index.html` | Page shell and accessible navigation |
| `dist/quiz-config.js` | Branding, topics, glossary, data paths, and links |
| `dist/style.css` | Responsive visual design |
| `dist/app.js` | Views, interaction, field guide, and progress import/export |
| `dist/engine.js` | Question selection, spaced review, and progress validation |
| `dist/data/*.json` | Questions, member profiles, and portrait inventory |
| `dist/portraits/` | Local public-domain congressional portraits |
| `examples/` | Starter content for a different quiz |
| `research/*.md` | Source review, editorial decisions, and reuse notes |
| `scripts/validate.mjs` | Configuration, content-schema, and asset checks |
| `scripts/test-engine.mjs` | Selection, review-scheduling, and progress checks |
| `scripts/export-data.mjs` | Merged downloadable question bank |
| `scripts/package-source.py` | Optional portable source ZIP export |

To create a local source archive:

```sh
python3 scripts/package-source.py
```

This writes `dist/hillwise-source.zip`, excluding hosting identity and temporary files. The ZIP is generated locally and ignored by Git; the public app can link to GitHub's source archive instead. Use `--output /path/to/quiz-source.zip --prefix my-quiz` to choose another destination and archive folder name.

## Learning and privacy

Rounds contain 5, 10, or 20 questions, capped by the available pool. The placement round uses up to 8. Missed and skipped questions remain due; correct recall schedules review after 1, 3, 7, 14, then 30 days. Two consecutive correct recalls count as reinforced. Placement and reinforcement are learning aids, not formal qualifications.

Progress and an unfinished round are stored in localStorage under the configured key (`hillwise-progress-v1` for this edition). Export/import transfers that JSON between browsers. Clearing browser data removes local progress. The application has no quiz accounts, application analytics, runtime AI calls, or server-side progress storage. The hosting provider may process ordinary request and security logs.

## Content and credits

The [U.S. AI Safety & Security Legislation Tracker](https://legislation.shaanakshaikh.com/) helped identify legislation to research. Questions link to primary evidence and are original paraphrases. A bill's introduction, passage in one chamber, enactment, and implementation are treated separately. Member profiles describe dated actions and statements rather than assigning broad ideological scores.

See [ATTRIBUTION.md](ATTRIBUTION.md) for source and asset provenance. The MIT license covers the original application and original educational wording. Public-domain congressional portraits and linked third-party documents have their own status. No third-party question bank or game code was copied.

Found an error or want to contribute? See [CONTRIBUTING.md](CONTRIBUTING.md), then [open an issue](https://github.com/shaanakshaikh/hillwise-ai-congress/issues/new/choose).
