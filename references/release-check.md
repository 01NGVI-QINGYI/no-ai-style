# Release and final-artifact review

Use when the user wants submission, export, a final manuscript, a GitHub release, or a file-level edit.

## Editorial release gate
- Has the user approved any meaning-changing edit, or have you kept it as a flagged suggestion?
- Are all core claims properly supported, with quoted/paraphrased material attributed?
- Are null or unfavorable results, scope constraints, and limitations visible where necessary?
- Are sections coherent and are terminology, tense, figure/table names, and references consistent?
- For each changed passage, did the edit fix a visible reading problem while retaining useful author choices? Leave sound passages unchanged.
- Did you avoid invented citations, bibliographic records, author roles, approvals, and statistical findings?
- Have you checked journal, department, grant, or platform disclosure requirements when available?

## Artifact release gate
- Work only within authorized file scope. Check actual files rather than assuming the agent's final chat describes them.
- In a repo, re-read the final staged or committed diff, the rendered doc when practical, and metadata (title, release notes, PR body).
- Do not carry discarded suggestions into titles or comments unless they are genuinely relevant to the implemented change.
- Never remove changelog details about real deprecations, migrations, design decisions, or reproducibility because of a generic style preference.
- If a script flags a line, review it in context; do not run bulk replace blindly.

## Verdict language
`ready`: only when the available evidence and requested checks support that conclusion.
`ready with reservations`: minor open issues do not clearly invalidate use; name them.
`not ready`: unresolved material claims, missing required information, or critical contradictions.

For unresolved material evidence, report `not ready` and name the required verification.

## Updating editorial rules

When a real edit exposes a failure, use that case to improve the relevant
rule. Check both an example where the rule should act and a similar one
where it should leave the text alone. Prefer clarifying or merging an
existing rule to adding another prohibition. Do not retain private author
material as a reusable test fixture without authorization; use a synthetic
case with the same decision problem instead.
