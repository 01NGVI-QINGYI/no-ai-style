#!/usr/bin/env python3
"""Offline comparison of high-stakes textual anchors across revisions.

Signals possible changes; cannot assess proposition-level entailment or correctness.
"""

from __future__ import annotations

import argparse
from collections import Counter
import json
from pathlib import Path
import re

# Preserve common result-bearing symbols and identifiers; exclude bare prose.
ANCHOR = re.compile(
    r"(?<!\w)(?:10\.\d{4,9}/[-._;()/:A-Za-z0-9]+|"
    r"(?:p\s*[<=>]\s*)?\d+(?:\.\d+)?\s*(?:%|％|ms|s|kg|mg|mm|cm|km|Hz|GB|MB|CI|SD|SE)|"
    r"(?:19|20)\d{2}(?:[-/]\d{1,2}(?:[-/]\d{1,2})?)?|"
    r"\d+(?:\.\d+)?(?:e[+-]?\d+)?|"
    r"\[(?:\d+(?:\s*[,–-]\s*\d+)*)\])(?!\w)",
    flags=re.IGNORECASE,
)
# A deliberately straightforward extractor that makes no assumptions about meaning.
# See README: read changes manually, especially if numeric values move between sections.


def anchors(text: str) -> Counter[str]:
    # Ignore fenced code, which may contain dozens of irrelevant literal numbers.
    clean = re.sub(r"(?ms)^\s*```.*?^\s*```\s*$", "", text)
    found = [x.group(0).strip() for x in ANCHOR.finditer(clean)]
    return Counter(found)


def compare(before: str, after: str) -> dict:
    b, a = anchors(before), anchors(after)
    missing, added = b - a, a - b
    return {"removed_anchors": dict(sorted(missing.items())),
            "added_anchors": dict(sorted(added.items())),
            "caution": "Differences require human review; equal anchors do not ensure equal meaning."}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("before", type=Path)
    ap.add_argument("after", type=Path)
    ap.add_argument("--format", choices=["text", "json"], default="text")
    ap.add_argument("--strict", action="store_true", help="Exit 1 if the anchors differ")
    args = ap.parse_args()
    try:
        result = compare(args.before.read_text(encoding="utf-8"), args.after.read_text(encoding="utf-8"))
    except (OSError, UnicodeError) as exc:
        ap.error(f"cannot read input: {exc}")
    if args.format == "json":
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        for kind in ("removed_anchors", "added_anchors"):
            print(f"{kind}: {result[kind] or 'none detected'}")
        print(result["caution"])
    return int(args.strict and bool(result["removed_anchors"] or result["added_anchors"]))


if __name__ == "__main__":
    raise SystemExit(main())
