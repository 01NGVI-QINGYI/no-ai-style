[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

# No AI Style

**Natural Writing. Faithful Meaning.**

Skill v1.0 · DSH plugin v1.0.0 · English / 中文 / 日本語 · By [01NGVI-QINGYI](https://github.com/01NGVI-QINGYI)

An agent skill and installable DeepSeek Harness plugin for academic and professional writing.
Remove mechanical phrasing and unnecessary padding while keeping facts, citations,
uncertainty, and the author’s voice.

**Before:** For clarity, it should be mentioned that the device supports two USB ports.

**After:** The device supports two USB ports.

## Installation

Requires Node.js and npm.

**Codex**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --global --agent codex
```

**Deepseek Harness**

In DSH Desktop, add `github:01NGVI-QINGYI/no-ai-style` under **Settings → Plugins**. From the CLI, install the plugin with:

```bash
dsh plugin --profile web add github:01NGVI-QINGYI/no-ai-style
```

Restart DSH to load the plugin. To install it as a regular agent skill instead,
run this in your Deepseek Harness project; it installs to `.agents/skills`:

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --agent universal --copy
```

**Claude Code**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --global --agent claude-code
```

**Pi**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --global --agent pi
```

**Cursor**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --global --agent cursor
```

**Other agents**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style
```

Choose your agent when prompted. Omit `--global` for a project installation.

Manual installation: copy `skills/no-ai-style/` into your agent’s skills directory.

## Usage

Ask your agent in plain language. Paste the text or provide a file path:

```text
Use no-ai-style to lightly edit docs/product.md.
Keep specifications, compatibility requirements, and known limitations.
```

For review without edits:

```text
Use no-ai-style in audit mode on docs/product.md. Do not modify the file.
```

| Mode | What you get |
| --- | --- |
| `audit` | Findings and suggestions; source files stay unchanged |
| `revise` | Edited prose within the requested scope |
| `compose` | A draft based on supplied notes and evidence |
| `release` | A final readiness check and any unresolved issues |

Light editing is the default. Request a stronger rewrite when needed.
The skill follows the text’s language and keeps sound passages unchanged.
Missing evidence is marked `[EVIDENCE GAP]`, which blocks `ready`;
ambiguous interpretations are marked `[INTERPRETATION FLAG]` for author review.

## Optional checks

Python 3.9+, no external packages. Run from the repository root:

```bash
python3 skills/no-ai-style/scripts/audit_prose.py draft.md --lang auto
python3 skills/no-ai-style/scripts/compare_anchors.py before.md after.md --format json
```
The scripts run locally and do not upload text. Findings need contextual review;
unclosed comments or code fences produce warnings. Add `--strict` to return
exit code 1 for missing-evidence markers or unclosed markup.

The goal is readable, faithful prose, not AI-detector evasion.
Detailed rules are in [SKILL.md](skills/no-ai-style/SKILL.md).

## License

[MIT](LICENSE) · Project by [01NGVI-QINGYI](https://github.com/01NGVI-QINGYI).
