#!/usr/bin/env python3
"""A conservative, offline writing-signal scanner. No external dependencies.

Findings invite editorial attention; they never authorize automatic deletions.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

# Patterns are deliberately short examples of possible reading problems.
# Severity reflects review priority, not a probability of AI authorship.
PATTERNS = {
    "en": [
        ("empty-preface", "low", r"\b(?:it is worth noting that|needless to say|it goes without saying)\b", "Consider whether the sentence can begin with the actual claim."),
        ("generic-scene-setting", "low", r"\b(?:in today's (?:fast[- ]paced|rapidly changing) world|in the modern era)\b", "Replace generic scene-setting with relevant context."),
        ("stacked-uncertainty", "medium", r"\b(?:may potentially|might possibly|could perhaps)\b", "Choose the level of uncertainty supported by the evidence."),
        ("empty-evaluation", "low", r"\b(?:a groundbreaking breakthrough|a highly significant and important)\b", "Supply concrete evidence or remove the evaluation."),
        ("conversation-residue", "medium", r"\b(?:as you requested,? (?:i|we) (?:did not|removed|avoided)|per your instructions,? without)\b", "Describe the final work, unless the history is part of the deliverable."),
    ],
    "zh": [
        ("empty-preface", "low", r"(?:众所周知|不难发现|值得一提的是)", "检查是否可以直接写出实质内容。"),
        ("generic-scene-setting", "low", r"(?:随着时代的不断发展|在当今快速发展的时代)", "用与研究问题直接相关的背景代替。"),
        ("stacked-uncertainty", "medium", r"(?:可能或许|也许可能|可能有可能)", "保留证据要求的单一限定。"),
        ("conversation-residue", "medium", r"(?:按照你的要求[，,]?我们(?:删除|没有使用|避免)|根据之前的要求[，,]?已(?:去掉|删去))", "区分真实变更记录和不必要的对话回声。"),
    ],
    "ja": [
        ("empty-preface", "low", r"(?:言うまでもなく|周知のとおり)", "必要な根拠や主張を先に示せるか確認してください。"),
        ("stacked-uncertainty", "medium", r"(?:可能性があるかもしれない|示唆される可能性があるかもしれない)", "根拠に合う不確実性の表現を選んでください。"),
        ("conversation-residue", "medium", r"(?:ご指示どおり[、,]?(?:削除|使用せず)|先ほどのご要望に従い)", "必要な変更履歴か、単なる会話の残りか判定してください。"),
    ],
}

PLACEHOLDER = re.compile(r"\[(?:VERIFY|TODO|REF\?|CITATION NEEDED|EVIDENCE GAP|INTERPRETATION FLAG)(?::[^\]]*)?\]", re.IGNORECASE)
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})(.*)$")


def scan(content: str, lang: str = "auto") -> list[dict]:
    """Return inspectable issues; leave source text unchanged."""
    active = ["en", "zh", "ja"] if lang == "auto" else [lang]
    result: list[dict] = []
    fence_token = None
    comment_open = None
    for line_no, line in enumerate(content.splitlines(), start=1):
        # Strip blockquote markers without shifting reported source columns.
        prefix = re.match(r"^(?: {0,3}>[ \t]?)+", line)
        offset = prefix.end() if prefix else 0
        body = line[offset:]
        if fence_token is not None:
            char, length, opening_line, opening_column = fence_token
            if re.fullmatch(r" {0,3}" + re.escape(char) + "{" + str(length) + r",}[ \t]*", body):
                fence_token = None
            continue
        # Mask complete and multiline HTML comments, retaining visible text.
        visible = list(body)
        cursor = 0
        while cursor < len(body):
            if comment_open is not None:
                end = body.find("-->", cursor)
                stop = len(body) if end < 0 else end + 3
                visible[cursor:stop] = " " * (stop - cursor)
                cursor = stop
                if end < 0:
                    break
                comment_open = None
            else:
                start = body.find("<!--", cursor)
                if start < 0:
                    break
                comment_open = (line_no, offset + start + 1)
                cursor = start
        visible_body = "".join(visible)
        match = FENCE.match(visible_body)
        if match:
            token, info = match.groups()
            if token[0] != "`" or "`" not in info:
                fence_token = (token[0], len(token), line_no, offset + match.start(1) + 1)
                continue
        inspected = " " * offset + visible_body
        # Mask URLs in place so reported columns still locate the source text.
        inspected = re.sub(r"https?://\S+", lambda m: " " * len(m.group(0)), inspected)
        for m in PLACEHOLDER.finditer(inspected):
            result.append({"line": line_no, "start": m.start() + 1,
                           "rule": "unresolved-placeholder",
                           "severity": "medium" if m.group(0).upper().startswith("[INTERPRETATION FLAG") else "high",
                           "match": m.group(0),
                           "advice": "Request author clarification for this interpretation." if m.group(0).upper().startswith("[INTERPRETATION FLAG") else "Resolve or explicitly disclose this missing item before publication."})
        for region in active:
            for rule, severity, pattern, advice in PATTERNS[region]:
                for m in re.finditer(pattern, inspected, re.IGNORECASE):
                    result.append({"line": line_no, "start": m.start() + 1, "rule": rule,
                                   "severity": severity, "match": m.group(0), "advice": advice})
    if fence_token is not None:
        char, length, line_no, column = fence_token
        result.append({"line": line_no, "start": column,
                       "rule": "unclosed-code-fence", "severity": "high",
                       "match": char * length,
                       "advice": "Close this fence and scan again; the remaining fenced content was excluded."})
    if comment_open is not None:
        line_no, column = comment_open
        result.append({"line": line_no, "start": column,
                       "rule": "unclosed-html-comment", "severity": "high",
                       "match": "<!--",
                       "advice": "Close this comment and scan again; its contents were excluded."})
    return sorted(result, key=lambda item: (item["line"], item["start"], item["rule"]))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path)
    parser.add_argument("--lang", choices=["auto", "en", "zh", "ja"], default="auto")
    parser.add_argument("--format", choices=["text", "json"], default="text")
    parser.add_argument("--strict", action="store_true", help="Exit 1 for unresolved evidence markers or unclosed markup")
    args = parser.parse_args()
    try:
        content = args.file.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        parser.error(f"cannot read input: {exc}")
    findings = scan(content, args.lang)
    if args.format == "json":
        print(json.dumps({"file": str(args.file), "findings": findings,
                          "note": "Heuristic review flags, not a plagiarism/AI detector."}, ensure_ascii=False, indent=2))
    else:
        print(f"{args.file}: {len(findings)} review flag(s)")
        for f in findings:
            print(f"  {f['line']}:{f['start']} [{f['severity']}/{f['rule']}] {f['match']!r}: {f['advice']}")
        if not findings:
            print("  No listed patterns found. Factual and ethical checks remain necessary.")
    return int(args.strict and any(f["severity"] == "high" for f in findings))


if __name__ == "__main__":
    raise SystemExit(main())
