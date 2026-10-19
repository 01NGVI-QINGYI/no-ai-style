# Evidence boundary and Claim-Equilibrium procedure

## Claim classes

Treat each consequential assertion as one of three categories:

- **Fact supplied/verified:** A measurement, method, source-backed event,
  exact description, or cited result supported by material reviewed.
- **Reasonable interpretation:** A conclusion explicitly connected to
  observed evidence, with scope and strength appropriate to that evidence.
- **Unverified proposition:** A claim needing missing data, a source read,
  author clarification, ethics confirmation, or a method check.

Do not mistake an in-text citation for a verified source unless the content
of that source is actually available. Preserve quotes and acknowledgments.

## Claim-Equilibrium: six steps

1. **Inventory anchors.** Copy or record key numbers, units, sample sizes,
   dates, model identifiers, citations, outcomes, and uncertainty markers
   before revising. Run `scripts/compare_anchors.py` when files are present,
   then manually inspect items the script cannot recognize.
2. **Express the proposition.** For each key sentence, record who or what
   is involved, what is asserted, on which population, over which time,
   according to which data or reference.
3. **Map evidence.** Point to a supplied table, figure, analysis output,
   method section, or checked source. If evidence is missing, label
   `[EVIDENCE GAP]` and block release until it is supplied.
4. **Compare inference force.** Ask if the revised version strengthens a
   modal, changes an association into a causal relationship, generalizes
   beyond the sample, turns a plan into a result, or adds a recommendation.
   When present evidence allows multiple readings, label
   `[INTERPRETATION FLAG]` pending author choice.
5. **Account for inconvenient facts.** Track negative or null outcomes,
   contradictory evidence, confounds, imprecision, and scope restrictions.
   A moved limitation must still be accessible; an omitted necessary
   limitation is a failed check.
6. **Decide.** Accept edits only when the revised proposition is entailed
   by or no stronger than the evidence-supported original, or a specific
   justified factual change is explicitly documented. Otherwise revert,
   narrow the language, or report `VERIFY`.

## High-risk changes

| Original relation | Dangerous transformation | Safer rule |
| --- | --- | --- |
| Associated with | Causes / improves | Preserve observational wording unless a causal design supports it |
| No significant difference | Equivalent / identical | Non-significance is not equivalence without a suitable test |
| In this sample | For all populations | Retain population and design limits |
| We plan to test | We tested | Keep prospective versus completed status |
| Percentage points | Percent | Keep arithmetic meaning and units |
| No evidence of X | Evidence of no X | Preserve evidential direction |
| A study cited X | The citation proves X | Verify the cited text and its actual scope |

## Minimal tracking sheet

| Source passage | Grounding | Protected anchors | Revised claim | Decision |
| --- | --- | --- | --- | --- |
| sentence/section ID | accessible evidence | numbers/method/caveat | concise proposition | accept / narrow / VERIFY |

Checking numeric anchors alone never establishes claim equivalence.
The human reviewer must still inspect scope, attribution, causal language,
modality, and missing qualifiers.
