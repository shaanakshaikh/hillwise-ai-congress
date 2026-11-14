# A two-question starting point

`questions.json` contains two original questions with the same schema as the full bank. It demonstrates four explained choices, a zero-based correct-answer index, a hint, a takeaway, source links, and a review date. The examples use the existing `process` and `power` topic IDs.

To try this small bank, copy it into the served directory:

```sh
cp examples/questions.json dist/data/custom.json
```

Then replace the corresponding properties in the exported `quizConfig` object in `dist/quiz-config.js` with:

```js
topics: topics.filter(topic => ['process', 'power'].includes(topic.id)),
dataFiles: ['data/custom.json'],
profilesFile: null,
portraitsFile: null,
placementCategories: ['process', 'power'],
placementCount: 2,
roundSizes: [2],
defaultRoundSize: 2,
storageKey: 'my-quiz-example-v1',
```

The site serves files from `dist/`, so `dataFiles` cannot point directly to `examples/questions.json`. Each configured topic must have at least one question. Profiles and portraits are optional; setting both paths to `null` removes them from this small example.

Run the checks and rebuild the downloadable question bundle:

```sh
node scripts/validate.mjs
node scripts/test-engine.mjs
node scripts/export-data.mjs
```

To make a quiz on another subject, replace the topic definitions and question content, and update the branding, edition date, glossary, about text, and links in `quiz-config.js`. Set a distinct `storageKey` so an unrelated quiz does not reuse old progress. Keep question IDs stable when correcting an existing question.

These original examples are covered by the repository's content license. Linked source documents retain their own terms.
