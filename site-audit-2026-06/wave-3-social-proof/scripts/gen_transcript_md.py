#!/usr/bin/env python3
"""
Turn the camp-transcript-extract workflow output into per-file extraction markdown
plus an aggregate summary. Flags quotes mis-attributed to the coach (Sally / Sally Woods).
"""
from __future__ import annotations

import json
import re
from pathlib import Path

OUT = Path("/private/tmp/claude-501/-Users-kadegreenland-Documents-Projects-The-Sleep-Concierge-Platforms-Snooze-OS/89b4538f-f11e-42ea-9ca9-dce88d4918bd/tasks/wleiw24fp.output")
HERE = Path(__file__).resolve().parent.parent  # wave-3-social-proof/
DEST = HERE / "transcript-extractions"
COACH = {"sally", "sally woods"}


def slug(s):
    return re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-")


def esc(s):
    return (s or "").replace("|", "\\|").replace("\n", " ").strip()


def main():
    data = json.loads(OUT.read_text())["result"]
    results = data["results"]
    agg = []
    for r in results:
        camp = r["camp"]; name = r["file"]; date = r.get("date", "")
        fn = DEST / f"{slug(camp)}__{slug(name)}.md"
        lines = [f"# Transcript extraction — {name}", "",
                 f"- **Camp cohort:** {camp}", f"- **Call date:** {date or '(see filename)'}",
                 f"- **Source file id:** {r.get('_file_id','')}",
                 f"- **Parent speakers detected:** {', '.join(r.get('parent_speakers', [])) or '(none)'}",
                 f"- **Quotes:** {r.get('total_quotes', len(r['quotes']))}",
                 "", "> Routing: **Camp-only** (camp landing page + camp ads). Permission Level = Internal,",
                 "> Publish Approved = false until Sally confirms consent. Verbatim from transcript.", "",
                 "| # | Quote | Speaker | Time | Theme | Win type | Strength | Baby age | Coach? |",
                 "|---|---|---|---|---|---|---|---|---|"]
        for i, q in enumerate(r["quotes"], 1):
            is_coach = q["speaker"].strip().lower() in COACH
            lines.append(f"| {i} | {esc(q['quote'])} | {esc(q['speaker'])} | {esc(q.get('timestamp',''))} | "
                         f"{esc(q.get('theme',''))} | {esc(q.get('win_type',''))} | {esc(q.get('strength',''))} | "
                         f"{esc(q.get('baby_age',''))} | {'⚠️ COACH — exclude' if is_coach else ''} |")
        fn.write_text("\n".join(lines) + "\n")
        agg.append((camp, name, date, r))

    # Aggregate summary
    total = sum(len(r["quotes"]) for *_, r in agg)
    coach_q = sum(1 for *_, r in agg for q in r["quotes"] if q["speaker"].strip().lower() in COACH)
    strong = [(c, n, q) for c, n, _, r in agg for q in r["quotes"]
              if q.get("strength") == "strong" and q["speaker"].strip().lower() not in COACH]
    s = [f"# Camp transcript extraction — summary", "",
         f"- Files processed: **{len(agg)}**",
         f"- Total quotes: **{total}** (parent: {total - coach_q}, coach-attributed/exclude: {coach_q})",
         f"- Strong parent quotes: **{len(strong)}**", "",
         "> All Camp transcript quotes are **Camp-only** (camp page + camp ads). Default Permission",
         "> Level = Internal, Publish Approved = false until Sally confirms. Coach-attributed quotes",
         "> (Sally / Sally Woods) are flagged and excluded from the publishable set.", "",
         "## Strong parent quotes (publishable candidates, pending consent)", "",
         "| Camp | File | Speaker | Theme | Win type | Quote |", "|---|---|---|---|---|---|"]
    for c, n, q in strong:
        s.append(f"| {esc(c)} | {esc(n)} | {esc(q['speaker'])} | {esc(q.get('theme',''))} | "
                 f"{esc(q.get('win_type',''))} | {esc(q['quote'])} |")
    (DEST / "_SUMMARY.md").write_text("\n".join(s) + "\n")
    print(f"Wrote {len(agg)} per-file md + _SUMMARY.md")
    print(f"Total quotes {total} | coach-excluded {coach_q} | strong parent {len(strong)}")


if __name__ == "__main__":
    main()
