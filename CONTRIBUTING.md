# Contributing to Hillwise

Corrections, clearer explanations, new sourced questions, accessibility improvements, and reusable-quiz improvements are welcome. Use the [question correction form](https://github.com/shaanakshaikh/hillwise-ai-congress/issues/new?template=question-correction.yml) for content errors and the [feature request form](https://github.com/shaanakshaikh/hillwise-ai-congress/issues/new?template=feature-request.yml) for ideas.

## Propose a change

Fork the repository, create a branch, make the change, and open a pull request. Explain the problem, the resulting behavior or content correction, and how you checked it. For content changes, link the primary evidence and identify the relevant question or profile IDs. A focused change is easier to review than unrelated edits bundled together.

Contributions must be yours to share. Original code and original educational wording contributed here use the project's MIT license. Preserve the existing copyright and permission notice, and document any separately licensed asset in `ATTRIBUTION.md`. Do not import another quiz's wording or code merely because it is publicly visible.

## Question format

Question banks are JSON arrays. Each question uses this shape:

```json
{
  "id": "unique-stable-id",
  "category": "process",
  "difficulty": 1,
  "prompt": "A self-contained question with exactly one defensible answer.",
  "options": [
    {"text": "Option A", "explanation": "Why this option does or does not fit."},
    {"text": "Option B", "explanation": "Why this option does or does not fit."},
    {"text": "Option C", "explanation": "Why this option does or does not fit."},
    {"text": "Option D", "explanation": "Why this option does or does not fit."}
  ],
  "correct": 0,
  "hint": "A useful clue that does not give away the answer.",
  "takeaway": "The practical lesson to remember.",
  "sources": [{"title": "Primary source", "url": "https://example.gov/record"}],
  "asOf": "2026-11-13",
  "tags": ["concept"]
}
```

`category` must match a topic ID in `dist/quiz-config.js`. This edition uses `process`, `power`, `enacted`, `pending`, `history`, and `people`. Difficulty 1 means foundations, 2 working knowledge, and 3 applied judgment. `correct` is the zero-based index in the source array. The interface shuffles choices while preserving the source answer key.

Keep IDs stable when fixing wording or a citation. Give the item a new ID if a substantial change would make existing progress misleading, such as replacing the underlying claim or changing the correct answer. IDs must be unique across all configured question files.

## Evidence and editorial checklist

1. Read the source, not just a search snippet or another quiz. Prefer official legislative text and action histories, House and Senate procedural resources, committee records, and dated statements.
2. Identify a bill by Congress, chamber, and number. Record the text version and date relevant to the question. A title alone may refer to several different proposals.
3. Separate introduction, committee action, passage in one chamber, enactment, effective dates, and implementation. A proposal that expired can have a successor, and some provisions can become law through another vehicle.
4. Describe member positions through specific, dated evidence. Sponsorship, votes, letters, and public statements support different claims; none automatically proves a complete view of AI policy.
5. Make only one option defensible. Explain why each alternative is wrong in the question's stated context. Keep important qualifiers, exceptions, and scope limits.
6. Use original prose and informative source titles. Link the exact official record when possible. Update the item's `asOf` after checking its evidence; do not advance it merely because the file changed.
7. Update relevant `research/` notes. Change the edition date in `dist/quiz-config.js` only when that edition has actually been reviewed.
8. Run the checks and inspect the affected user flow. Automated checks validate the data and engine, not factual accuracy.

The tracker is a discovery aid. The app does not automatically ingest tracker changes, update bill statuses, or refresh source links. Treat legislation questions as a dated learning edition until a reviewed update is published.

## Member profiles and portraits

`dist/data/profiles.json` contains an array with `id`, `name`, `party`, `state`, `chamber`, `focus`, `record`, and `sources`. Each record entry has `date`, `text`, and `url`; each source has `title` and `url`. The included profiles use Bioguide IDs.

Portrait inventory entries are IDs in `dist/data/portraits.json`, with matching files in `dist/portraits/`. Add only images whose reuse status you have verified, and record attribution. A fork on another subject may set `profilesFile` and `portraitsFile` to `null` in `dist/quiz-config.js` to omit profiles and portraits.

## Local checks

Use Node.js 22 or later; there are no npm dependencies:

```sh
node --check dist/app.js
node --check dist/engine.js
node --check dist/quiz-config.js
node scripts/validate.mjs
node scripts/test-engine.mjs
node scripts/export-data.mjs
python3 -m http.server 8000 --directory dist
```

The export command refreshes `dist/data/questions.json` from the configured question files. Commit the refreshed export with source-data changes; CI uses `node scripts/export-data.mjs --check` to detect a stale export. Open <http://localhost:8000> and check the changed flow with a narrow and wide viewport, keyboard navigation, answer feedback, and source links. If changing progress behavior, also check save/resume and export/import. If changing the engine, add or adjust a focused behavior test when needed.

Do not commit generated ZIPs, browser progress exports, screenshots from temporary QA, credentials, or hosting-account metadata. `scripts/package-source.py` optionally produces a portable ZIP; GitHub also provides the repository source archive.
