# Legislation question-bank verification

Checked November 13, 2026 (user-facing date). All 30 questions are original educational prose; no external question bank was copied. The tracker was used to identify candidate records. Operative claims were then checked against primary federal sources.

## Files

- `dist/data/legislation.json`: 30 questions (10 enacted, 12 pending, 8 history), IDs `l01`–`l30`.
- `scripts/build-legislation-bank.py`: readable authoring source and deterministic JSON generation.
- `research/primary/`: downloaded government texts and action-history XML used during review. These are research evidence, not required browser assets.
- `research/tracker.json`: the tracker snapshot used for discovery.

## Primary evidence actually inspected

| Questions | Source and exact support |
|---|---|
| l01–l04 | [Public Law 119-12](https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm), §§2–4, enactment notation and legislative history. Checked scope, valid-request trigger, 48-hour outer limit, FTC enforcement, one-year process-establishment deadline, May 19, 2025 enactment, S.146 vehicle. |
| l05–l08 | [Public Law 119-60](https://www.govinfo.gov/content/pkg/PLAW-119publ60/html/PLAW-119publ60.htm), §1513(a)–(f). Checked risk-based calibration, DFARS or similar implementation route, defense-acquisition scope and lifecycle components, plan and reporting distinctions. No claim that a reporting deadline proves implementation. |
| l09 | Same law, §1512(a)–(c). Read AI-specific attacks, lifecycle security, monitoring, governance and workforce provisions. |
| l10 | [Public Law 118-159](https://www.govinfo.gov/content/pkg/PLAW-118publ159/html/PLAW-118publ159.htm), §6504. Checked statutory center location, functions, and counter-AI definition. Question explicitly avoids claiming that the statutory date was the center’s first administrative existence. |
| l11–l14 | [H.R.9477 introduced text](https://www.govinfo.gov/content/pkg/BILLS-119hr9477ih/html/BILLS-119hr9477ih.htm), §2(a)–(c) and definitions. Checked covered-developer designation, Commerce recipient, knowledge/reasonable-belief trigger, seven-day outer limit, expedited reports, near misses, and narrow evaluation exclusion. |
| l15–l17 | [H.R.9925 introduced text](https://www.govinfo.gov/content/pkg/BILLS-119hr9925ih/html/BILLS-119hr9925ih.htm), §§4 and 9. Read framework publication/implementation/compliance, third-party audit object, preemption covered subjects and savings clauses. No claims that the bill abolishes all state AI laws or that an audit guarantees safety. |
| l18–l19 | [S.5061 introduced text](https://www.govinfo.gov/content/pkg/BILLS-119s5061is/html/BILLS-119s5061is.htm), §3(c)–(f) and §4. Read mandatory 21-calendar-day premarket AI Security Center access and separate voluntary NIST incident-submission regime. No claim that the entire bill is voluntary. |
| l20–l21 | [H.R.3460 introduced text](https://www.govinfo.gov/content/pkg/BILLS-119hr3460ih/html/BILLS-119hr3460ih.htm), §§2–3. Checked protected conduct and coverage of former employees and current/former independent contractors. |
| l22 | Comparison of enacted §1513 definitions and introduced H.R.9925. Distinguishes enactment and proposed duties. |
| l23–l24 | [Official Senate roll call 363](https://www.senate.gov/legislative/LIS/roll_call_votes/vote1191/vote_119_1_00363.htm) and [Congressional Record](https://www.govinfo.gov/content/pkg/CREC-2025-06-30/html/CREC-2025-06-30-pt1-PgS4037-6.htm). Verified July 1, 2025, 99–1, amendment 2814 to amendment 2360 to H.R.1, and striking the AI section. l24 limits the inference to the recorded vote. |
| l25–l26 | [S.3312 reported text](https://www.govinfo.gov/content/pkg/BILLS-118s3312rs/html/BILLS-118s3312rs.htm), front matter and §206(a)(4), plus official action XML. Checked December 18, 2024 calendar placement and the report-review prohibition limit. Used the revised reported text, not the deleted introduced clauses. |
| l27 | [H.R.9720 introduced text](https://www.govinfo.gov/content/pkg/BILLS-118hr9720ih/html/BILLS-118hr9720ih.htm), §2. Checked voluntary tracking process, NIST coordination, subject-to-appropriations clauses, and explicit lack of additional enforcement authority. Official final action: ordered reported by voice vote September 25, 2024. |
| l28–l29 | [S.4569 Senate-passed text](https://www.govinfo.gov/content/pkg/BILLS-118s4569es/html/BILLS-118s4569es.htm), official action XML and Public Law 119-12 legislative history. Distinguishes predecessor, enacted vehicle and Congress-specific identifiers. |
| l30 | Official H.R.8070 action XML and Public Law 118-159 enactment/legislative history. Final H.R.8070 action: received in Senate July 8, 2024; H.R.5009 was the enacted FY2025 NDAA vehicle. Question requires provision-level comparison, rather than presuming survival or failure. |

For expiry doctrine, read the [Law Library of Congress explanation](https://ask.loc.gov/law/faq/334496). No historical question claims that an expired bill’s provisions never entered another law.

## Live action-history checks

Fetched GovInfo XML directly and inspected the top-level `bill/latestAction`, not similarly named fields nested in related bills or amendments:

| Record | Latest top-level action on retrieval |
|---|---|
| 119/hr/9477 | June 25, 2026: referred to House Energy and Commerce |
| 119/hr/9925 | July 23, 2026: referred to House Energy and Commerce and Science, Space, and Technology |
| 119/s/5061 | July 21, 2026: read twice and referred to Senate Commerce |
| 119/hr/3460 | May 15, 2025: referred to House Education and Workforce |
| 118/s/3312 | December 18, 2024: placed on Senate calendar |
| 118/hr/9720 | September 25, 2024: ordered reported by voice vote |
| 118/s/4569 | December 4, 2024: held at House desk |
| 118/hr/8070 | July 8, 2024: received in Senate |

Questions concerning proposals are anchored to explicitly named introduced versions. Category membership reflects the review snapshot. Future updates should recheck current status before republishing the pending category; historical questions should retain their explicit dates and versions.

## Quality checks

- Exactly four distinct options per question, one correct index, all option explanations populated.
- 30 unique IDs; category count 10/12/8.
- Correct positions rotated deterministically A/B/C/D rather than always first.
- Distractors reviewed for a single defensible answer; law-versus-proposal, report-versus-license, and vehicle-versus-provision distinctions are intentional learning targets.
- Legal text used for educational comparisons, not personalized legal advice or a claim of current agency compliance.
