#!/usr/bin/env python3
"""Validate static JSON-LD blocks in Kajabi global HTML snippets."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


SCRIPT_RE = re.compile(
    r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.IGNORECASE | re.DOTALL,
)


def validate_file(path: Path) -> list[str]:
    errors: list[str] = []
    text = path.read_text(encoding="utf-8")
    for index, match in enumerate(SCRIPT_RE.finditer(text), start=1):
        payload = match.group(1).strip()
        if not payload:
            errors.append(f"{path}: JSON-LD block {index} is empty")
            continue
        try:
            json.loads(payload)
        except json.JSONDecodeError as exc:
            errors.append(f"{path}: JSON-LD block {index} invalid JSON: {exc}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate application/ld+json blocks under global/html."
    )
    parser.add_argument(
        "--dir",
        type=Path,
        default=Path("apps/snooze-website/kajabi-deployment/global/html"),
        help="Directory of HTML snippets to scan.",
    )
    args = parser.parse_args()

    if not args.dir.exists():
        print(f"Directory not found: {args.dir}", file=sys.stderr)
        return 2

    errors: list[str] = []
    for path in sorted(args.dir.rglob("*.html")):
        errors.extend(validate_file(path))

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1

    print(f"JSON-LD valid under {args.dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
