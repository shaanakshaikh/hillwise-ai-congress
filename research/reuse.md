# Existing quiz and data research

Reviewed November 13, 2026. This is a bounded search, not a claim that no other relevant bank exists.

## Decision

There are closely related products, including WonkoLingo and Name that Member. However, this search did not identify a clearly licensed, source-verified question bank that combines current US congressional AI legislation, congressional procedure, and members' evidenced positions. Write original questions against primary sources. Use existing products as interaction references and credit them; do not reproduce their question wording or editorial profiles without permission.

The strongest directly reusable resource located is the public-domain congressional portrait collection at **unitedstates/images**. Optional portrait use is compatible with a separately authored question bank.

## Findings

| Resource | Evidence inspected | Relevance and quality assessment | Reuse decision |
| --- | --- | --- | --- |
| [WonkoLingo](https://wonkolingo.com/) / [App Store listing](https://apps.apple.com/id/app/wonkolingo/id6825172194) | Developer's App Store description, live website shell, GitHub repository searches | Very close topic fit: AI policy, Senate procedure, member positions, state-law preemption, and Legímon senator cards. The developer describes short rounds, source-linked explanations, spaced repetition, and multiple formats. The actual question corpus was not retrieved, so its accuracy has not been audited. | No public repository or content reuse license located. Reference the product; do not copy its corpus. |
| [Legimon binder](https://legimon.pages.dev/#binder) | Direct web and HTTP attempts | Could not retrieve the site (access errors/403). WonkoLingo's developer describes collectible Legímon cards, but this does not independently establish the contents or licensing of the supplied binder URL. | No imported content; no claims about unseen binder data. |
| [Name that Member](https://name-that-member.vercel.app/) | Public HTML, introductory text, serialized member data | A 44-member AI-on-the-Hill recognition game. Useful as inspiration for linking names, photographs, and records. Profiles include interpretive and time-sensitive claims; those should be independently checked before reuse as facts. | No reuse license or matching public GitHub repository located. Do not copy editorial profile text. |
| [unitedstates/images](https://github.com/unitedstates/images) | [README](https://github.com/unitedstates/images/blob/gh-pages/README.md) | Public-domain official congressional portraits keyed by Bioguide ID; the same source used by Name that Member. README attributes photos to GPO and dedicates other files through CC0. | Approved asset candidate. Download only portraits needed and retain source attribution. |
| [unitedstates/congress-legislators](https://github.com/unitedstates/congress-legislators) | README | Structured identities, terms, committees and memberships; suitable for joining Bioguide IDs and portraits. Repository warns that current/historical files may lag departures. | Candidate metadata source; verify date-sensitive institutional roles against official sources. No data imported by this research task. |
| [Open Quiz Commons](https://github.com/prahladyeri/open-quiz-commons) | README, root inventory, dataset folder inventory | A real structured MCQ bank. README explicitly licenses all MCQs CC BY-SA 4.0. Reviewed folders cover programming, web development, databases, and cloud topics, not US Congress or AI legislation. | No content import: topic mismatch. If later reused, attribution and share-alike obligations apply to adapted content. |
| [CivicSense](https://github.com/civicsense2025/civic-sense-main) | README and root inventory | Broad civic-learning platform with quizzes, scenarios, glossary, congressional data, and AI-generated content. The README asserts MIT licensing, but its linked LICENSE file returned 404 and was absent from inspected root inventory. No verified matching AI-legislation bank located. Editorial stance also differs from an objective institutional-learning quiz. | Do not copy in this version. README license assertion alone did not establish a complete content license/provenance chain. |
| [Congressional Alignment Quiz](https://github.com/samdforrest/Congressional-Alignment-Quiz) | Root inventory and README | Questionnaire producing coalition/alignment scores; not an objective knowledge bank. No license file appeared in inspected root inventory. | No reuse: task mismatch and no verified reuse license. |
| [AI Policy Personality Quiz](https://github.com/doanneda/aiPolicyPersonalityQuiz) | Repository tree and first question component | SwiftUI personality-style app; inspected item asks users to choose clothing, not answer a factual AI-policy question. No license file in inspected tree. | No reuse: task mismatch. |
| [Capitol Visitor Center knowledge test](https://www.visitthecapitol.gov/guide150/knowledge-test) and [quiz](https://www.visitthecapitol.gov/quiz) | Search-indexed official text; knowledge-test direct access returned 403 | Existing institutional quizzes establish precedent. They focus on basic civics, the Capitol, and inauguration history rather than AI policy. Some quiz prompts are explicitly historical. | Use as educational precedent; author fresh, source-grounded questions suited to this user's level. |

## Search coverage

- GitHub connector repository searches: `legimon`, `wonkolingo`, `name-that-member`, `congress quiz`, `AI policy quiz`.
- Web searches combined AI policy, Congress, quiz, question bank, GitHub, and license terms; searched the named games and official congressional educational sites.
- Queried repository contents/README/license files where promising. Public availability was not treated as permission to reproduce.
- No third-party quiz questions, profile prose, application code, or images were copied into the app by this research task.

## Useful implementation implications

1. Keep authored questions separate from the quiz engine and attach an official source, evidence date, and bill/version identity to each item.
2. Link members' claims to the particular vote, bill, or statement rather than assigning an overall political label.
3. Offer short rounds and spaced review, but use an original visual identity and wording.
4. If member photographs are used, the documented URL pattern is `https://unitedstates.github.io/images/congress/225x275/BIoGUIDE.jpg` (replace the placeholder with the actual Bioguide ID).
5. Include the named games and WonkoLingo in a concise inspirations note; no affiliation or endorsement is implied.
