---
name: no-ai-style
description: >-
  Improve academic and professional prose by removing mechanical AI phrasing,
  defensive self-justification, and generic filler while protecting claims,
  citations, statistics, methodology, and limitations. Use for manuscripts,
  abstracts, proposals, literature reviews, reports, introductions,
  discussions, and documentation in English, Chinese, or Japanese.
  Also use for 中文论文润色、去机械表达、日文推敲、文章校正.
  Choose audit-only when changes are not authorized.
license: MIT
metadata:
  version: "1.0"
  author: "01NGVI-QINGYI"
  repository: "https://github.com/01NGVI-QINGYI/no-ai-style"
---

# No AI Style

## Natural Writing. Faithful Meaning.

Make each sentence earn its place while keeping every factual
commitment accountable. Confident wording is not stronger evidence;
conversational smoothness is not originality.

## How to read this skill

- Gates are ordered priorities, not a checklist. When gates conflict,
  **Gate 2 (truth boundary) always wins**. Gate 3 and Gate 4 defer to
  Gate 1 (reading contract). Gate 5 overrides any earlier change that
  cannot be verified.
- Prefer the smallest edit that satisfies the reading contract. Do not
  fix problems the user did not ask about.
- Open only the reference file needed for the current task.
- Identify a specific reading problem before changing a passage. If no
  relevant problem is present, keep it; editing does not need a quota.

## Decide the operating mode

Infer the mode from the request; do not ask when intent is clear.

| Mode | Trigger | Allowed work | Deliver |
| --- | --- | --- | --- |
| `audit` | inspect, critique, identify problems | Read and report; do not edit source files | Prioritized findings with passages and rationale |
| `revise` | polish, humanize, tighten, rewrite, no-ai-style | Edit the authorized passage only | Revised text and a brief change summary |
| `compose` | draft from notes, tables, findings | Write from given material, marking unknowns | Draft with unresolved-evidence notes if needed |
| `release` | ready to submit, final check, publish | Check final artifacts; edit only if explicitly authorized | Readiness verdict plus unresolved risks |

If the user requests only a translation, preserve source meaning,
register, qualifiers, and citations before attempting stylistic
changes. If only a response is needed, do not create or modify files.

## Five gates

### Gate 1 — Set the reading contract

Identify internally before editing: document genre, intended reader,
language, format, requested edit intensity (`light` by default),
citation system, and non-editable material. Treat author-supplied
writing samples as optional style evidence, not a license to invent
experiences. Do not change first-person identity, institutional
affiliation, or authorship claims.

Language coverage: **Guidance and examples cover English, Chinese, and
Japanese; follow the target publication’s conventions.** For CJK targets, open
`references/language-notes.md` before editing.

### Gate 2 — Establish the truth boundary

Separate each important statement into a **fact**, a **reasonable
interpretation**, or an **unverified proposition**. Protect:

- Measurements, counts, units, percentages, uncertainty intervals,
  p-values, model names, dates, population definitions, outcome
  definitions, and citation locators.
- Research design, sampling, procedures, registered hypotheses,
  exclusions, ethics information, and the distinction between planned
  and completed work.
- Negative, null, conflicting, and inconclusive observations, when
  relevant to the inquiry.
- Scope and strength of inference: association is not causation; lack
  of detected significance is not proof of equivalence.

Never invent a citation, DOI, author, quotation, test result, method,
approval, participant, or source verification. If a necessary item is
unknown, label it unresolved rather than hiding the gap with
persuasive language. See `references/evidence-boundary.md`.

### Gate 3 — Rebuild the reader's path

For each paragraph, state its job in a few words: define, motivate,
claim, support, interpret, qualify, compare, or transition. If two
paragraphs perform the same job, combine or differentiate them. Put
the necessary point where readers can find it; give it support
nearby; end with the consequence for the argument.

Classify passages for revision:

- `KEEP` — essential claim, evidence, limitation, or purposeful voice.
- `FOCUS` — important material obscured by indirect framing.
- `CONDENSE` — multiple sentences accomplish one task.
- `RELOCATE` — necessary qualification or context in the wrong place.
- `REMOVE` — duplicated, obsolete, or functionless material.
- `VERIFY` — cannot decide safely without evidence or author input.

Only remove rejected brainstorming or earlier chat decisions when they
are *not* part of the actual study, product history, required audit
trail, or disclosed comparison. Final prose describes actual work;
method, migration, and reproducibility records describe actual changes.

### Gate 4 — Tune language without flattening it

Favor concrete subjects and verbs, varied sentence length,
domain-appropriate terminology, and transitions that reflect real
logical relationships. Question any sentence that merely announces
importance, praises the topic, restates the prompt, apologizes for a
legitimate scope, or repeats a generic ending. **Do not replace
specificity with stock academic phrases.**

Treat hedges as propositions about evidence, not as unwanted
vocabulary. Keep evidential hedges (`may`, `suggest`, `可能`, `或许`,
`示唆する`, `と考えられる`, and equivalents) when they reflect the actual
strength of evidence; simplify only redundant stacks. Preserve the author's
intentional rhythm, technical terms, dialect, and preferred formality.
Learn style from consented writing samples only; never claim to
replicate a person's identity.

A flagged expression is a candidate for inspection. Check its function
in this passage before editing it. An author’s deliberate repetition,
a disciplinary term, or a necessary qualification can remain even when
it resembles a listed pattern. Do not enforce uniform punctuation,
sentence lengths, or substitutions merely to make a draft look edited.

Choose the edit by asking what the reader would lose if the passage
changed. Remove an empty introduction when it carries no information.
Shorten a repeated qualification while keeping its meaning beside the
claim it limits. Leave a negative statement intact when it reports an
exclusion, failed test, absence, or other necessary distinction. There is
no required positive-framing conversion.

| Supplied sentence | Revision | Information retained |
| --- | --- | --- |
| "For clarity, the instrument was calibrated before each session." | "The instrument was calibrated before each session." | Procedure and timing |
| "The archive covers April only. It does not cover any other month." | "The archive covers April only." | Exact temporal boundary |
| "The sensor did not record a signal below 8 °C." | Keep the sentence. | Negative observation and threshold |

Examples specify editorial operations, not facts to borrow. Any missing
measurement, rationale, validation, or section reference remains missing
after editing. Record a `VERIFY` item when a useful revision needs it.

For language-specific conventions and further examples, open
`references/language-notes.md` and `references/examples.md`.

### Gate 5 — Backcheck before delivery

Run these checks **in order of priority**. If 5.1 (anchors) or 5.2
(claim strength) fails, do not continue stylistic polishing or deliver
the affected revision. Revert or narrow the unsupported change, or
report the failure and the required author input.

**5.1 Anchors unchanged.** Compare before/after with
`scripts/compare_anchors.py` or by reading. Every number, unit,
citation locator, model name, and date must match or have a documented
reason to change.

**5.2 Claim strength preserved or narrowed.** For every substantive
claim, check: did the revision make the claim *stronger*? If the
original said "associated with," the revision must not say "causes."
If the original reported a null result, the revision must not delete
it. Use the `Claim-Equilibrium` procedure in
`references/evidence-boundary.md`.

**5.3 Caveats still accessible.** Relevant limitations and contrary
evidence must remain at a location a reader can find. Relocate a caveat only when readers can still interpret the claim correctly
where it appears; keep essential scope in the abstract itself.

**5.4 Coherence after edits.** Terminology, scope, tense, paragraph
links, and genre-specific register are consistent from opening to
close. Compare changed passages with the source in both directions:
identify reading problems still present, and information or intentional
expression the edit damaged. Restore a useful construction when its
replacement is less precise or less recognizably the author’s. Stop
when the requested problems are resolved; do not manufacture another pass.

**5.5 Delivery surface clean.** The final artifact must not reference
discarded conversations or options that were never implemented.
Required historical records (changelogs, migration notes, audit
trails) are retained. Apply the check separately to each surface:
title, abstract, commit message, PR description, body, captions, tags.

**5.6 Original authorship.** The output is not a mechanical
paraphrase of another author's prose. Attribution is maintained where
needed.

Treat script findings as review flags; check the text and underlying evidence before accepting edits.

```bash
python3 <skill-dir>/scripts/audit_prose.py path/to/draft.md --lang auto
python3 <skill-dir>/scripts/compare_anchors.py path/to/before.md path/to/after.md
```

## Risk-sensitive choices

- **Academic/scientific:** preserve methods/results identity, citations,
  and venue style; present uncertainty in proportion to evidence. A
  cleaner argument must never become a stronger unsupported finding.
- **Grant/proposal:** distinguish work proposed from work completed;
  do not invent institutional support, feasibility evidence, or approvals.
- **Policy, safety, legal, medical:** warnings, eligibility conditions,
  and uncertainty are content, not filler. Clarity over rhetorical force.
- **Technical release:** preserve real migration changes, deprecations,
  compatibility warnings, and reproducibility metadata, even when they
  describe alternatives.
- **Chinese academic:** preserve author-positioning and evidential phrases
  such as `笔者认为` and `研究表明` in accordance with their actual support.
  Distinguish association (`相关`, `有关`) from causation (`导致`, `引起`);
  do not automatically delete evidence-appropriate qualifiers such as
  `可能`, `或许`, or `倾向于`.
- **Japanese academic:** maintain consistent `である`/`です・ます` and
  appropriate evidential markers. Do not automatically remove
  `考えられる` or `示唆される`.

## Response contract

- `audit`: compact finding table with impact, evidence from the text,
  and a suggested action; do not output a secretly edited manuscript.
- `revise`: usable revised prose first, then explain only material
  changes; flag any unverifiable claim or fact requiring approval.
- `compose`: requested draft, followed by explicit open questions.
  Use two markers:
  - `[EVIDENCE GAP]` — missing data; blocks release until the
    author supplies it.
  - `[INTERPRETATION FLAG]` — data present but ambiguous; author
    confirmation is enough to proceed.
- `release`: state ready, ready with reservations, or not ready;
  identify unresolved material issues.

For requests to 'remove AI traces' or 'avoid plagiarism', improve clarity and
original expression; retain attribution and do not disguise copied work
or optimize for AI-detector evasion.

## References (open only what the task needs)

- `references/evidence-boundary.md` — claim checks; Claim-Equilibrium
  procedure; high-risk edits.
- `references/voice-contract.md` — protecting an author's own style.
- `references/language-notes.md` — English, Chinese, Japanese conventions.
- `references/examples.md` — before/after pairs, including CJK, each
  tagged with the gate that triggered the edit.
- `references/release-check.md` — submission and artifact QA.
