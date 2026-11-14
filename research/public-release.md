# Public release verification — November 14, 2026

The application and original educational wording are published under MIT at
https://github.com/shaanakshaikh/hillwise-ai-congress. The repository is public and enabled as a GitHub template.

The public production site is https://hillwise-ai-congress.vercel.app/.
Vercel is connected to the repository's `main` branch. The initial release used
commit `5a28a8c91e31b03401feebb75580eb4f3c270aa3`.

The custom hostname `hillwise.shaanakshaikh.com` has been assigned to this project;
its external DNS still needs configuration. The registrar's existing nameservers
remain in place. Custom-domain assignment alone does not prove that DNS or HTTPS
is ready.

## Release checks

- Content validation: 80 questions, 320 explained choices, six topics, 20 profiles.
- All 18 engine checks passed, including configurable categories, placement,
  review scheduling, and progress import validation.
- Temporary two-question and 96-question remix fixtures passed without fixed
  question or profile counts; an unknown category was rejected.
- Original question and profile JSON matched the prior reviewed edition. This
  release did not refresh legislative facts; the evidence date remains November
  13, 2026.
- The generated download matched all configured source questions.
- The first GitHub Actions validation run completed successfully.
- Anonymous HTTPS requests returned every one of the 32 served files with bytes
  matching the local release, including JavaScript, JSON, and portraits.
- Live browser checks passed: home, five-question mixed round, answer feedback,
  skipped questions, results, save/reload/resume, profile search, source links, and
  test-progress reset.
- A 390px-wide browser iframe checked the public home and placement quiz. Its
  available content width and document scroll width both measured 375px, with no
  horizontal overflow. This is responsive-layout verification, not a test on
  physical phone hardware.
- The app contains no quiz account, runtime AI call, application analytics, or
  server-side progress storage. Browser storage is origin-specific; use
  export/import when moving from the private preview or between public domains.

The browser launch image is retained as `launch-preview.jpg` in this directory.
