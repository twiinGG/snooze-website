#!/usr/bin/env python3
"""
Regenerate CURATED-SOCIAL-PROOF.md from the live Notion corpus.

Five sets, per the routing rules:
  1. Membership / course / age   -> home, age pages, course landings, library, membership
  2. Consult / coaching          -> about-sally, consultations, contact
  3. Camp only                   -> camp-snooze-sleep-coaching only
  4. Google reviews (by country)
  5. Screenshots (embed-ready, Asset URL)

Verbatim quotes only (from Notes). Auto-regenerated — for human review before any site paste
(RUNBOOK #18 stays ON HOLD until Sally/Kade approve). Camp quotes never appear in sets 1-2.
"""
from __future__ import annotations

import os
import re
from pathlib import Path

from dotenv import load_dotenv
import requests

ROOT = Path(__file__).resolve()
HERE = ROOT.parent.parent
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break

DB = "24f33898-b6c2-817c-bfa3-cab91a68b9e9"
NV = "2022-06-28"
TOK = os.getenv("NOTION_API_TOKEN") or os.getenv("NOTION_TOKEN")
H = {"Authorization": f"Bearer {TOK}", "Notion-Version": NV, "Content-Type": "application/json"}
MEMBERSHIP_KW = ["membership", "snooze platform", "platform", "community", "podcast", "forum",
                 "snooze social", "join snooze", "library", "ongoing support", "course", "guide"]


def rt(props, name):
    return "".join(x.get("plain_text", "") for x in (props.get(name) or {}).get("rich_text", []))


def title(props):
    return "".join(x.get("plain_text", "") for x in (props.get("Title") or {}).get("title", []))


def sel(props, name):
    p = (props.get(name) or {}).get("select")
    return p.get("name") if p else None


def multi(props, name):
    return [o["name"] for o in (props.get(name) or {}).get("multi_select", [])]


def fetch_all():
    url = f"https://api.notion.com/v1/databases/{DB}/query"
    rows, cur = [], None
    while True:
        body = {"page_size": 100}
        if cur:
            body["start_cursor"] = cur
        d = requests.post(url, headers=H, json=body, timeout=60).json()
        for p in d["results"]:
            pr = p["properties"]
            fd = (pr.get("Feedback Date") or {}).get("date") or {}
            rows.append({
                "notes": rt(pr, "Notes"), "title": title(pr),
                "source": sel(pr, "Source"), "ctype": sel(pr, "Content Type"),
                "perm": sel(pr, "Permission Level"),
                "pub": bool((pr.get("Publish Approved") or {}).get("checkbox")),
                "rating": (pr.get("Rating") or {}).get("number"),
                "name": rt(pr, "Google Display Name"),
                "product": multi(pr, "Product"), "tags": multi(pr, "Tags"),
                "asset": (pr.get("Asset URL") or {}).get("url"),
                "date": (fd.get("start") or "")[:10],
            })
        if not d.get("has_more"):
            break
        cur = d["next_cursor"]
    return rows


def country_of(tags):
    for t in tags:
        if t.startswith("country_") and t != "country_unknown":
            return t.split("_", 1)[1]
    return "Unknown"


def esc(s):
    return (s or "").replace("|", "\\|").replace("\n", " ").strip()


def attribution(r):
    if r["name"]:
        return r["name"]
    t = r["title"]
    if "·" in t:
        return t.split("·")[0].strip()
    return "Snooze member"


def clip(s, n=300):
    s = s.strip()
    return s if len(s) <= n else s[:n].rsplit(" ", 1)[0] + "…"


CAMP_RE = re.compile(r"\bcamp\b|camp snooze", re.I)


def names_camp(text):
    """True if the quote, as written, references Camp or the camp model."""
    return bool(CAMP_RE.search(text or ""))


def split_sentences(text):
    # naive sentence split that keeps the delimiter
    parts = re.split(r"(?<=[.!?])\s+", (text or "").strip())
    return [p.strip() for p in parts if p.strip()]


def broad_excerpt(text):
    """Verbatim excerpt for broader (non-camp) use: drop sentences that name Camp,
    join the rest with an ellipsis. Selection only — no wording changes."""
    keep = [s for s in split_sentences(text) if not names_camp(s)]
    if not keep:
        return ""
    out = " … ".join(keep)
    return out if len(out) >= 40 else ""


def main():
    rows = fetch_all()
    for r in rows:
        r["mentions_membership"] = any(k in r["notes"].lower() for k in MEMBERSHIP_KW)
        r["names_camp"] = names_camp(r["notes"])  # by TEXT, not by source

    google = [r for r in rows if r["source"] == "Google Review"]
    shots = [r for r in rows if r["ctype"] == "Screenshot"]
    quotes = [r for r in rows if r["notes"] and r["ctype"] != "Screenshot"]

    def rank(r):
        return ((r["rating"] or 0), len(r["notes"]), r["date"])

    # Set 1: membership/course/age — strongest UNIVERSAL quotes (do NOT name camp), any source.
    # A quote that doesn't reference camp is honest Snooze-client proof usable anywhere.
    universal = sorted([r for r in quotes if not r["names_camp"]], key=rank, reverse=True)[:20]

    # Set 1b: trimmed excerpts from camp-naming quotes (camp sentences dropped, verbatim) —
    # candidates for broader use; human verifies before publishing.
    trimmed = []
    for r in sorted([r for r in quotes if r["names_camp"]], key=rank, reverse=True):
        ex = broad_excerpt(r["notes"])
        if ex and not names_camp(ex):
            trimmed.append((r, ex))
        if len(trimmed) >= 14:
            break

    # Set 2: consult/coaching — Product 1:1 Consult, Source Review, or text mentions consult/package
    consult = [r for r in quotes if "1:1 Consult" in r["product"] or r["source"] == "Review"
               or any(k in r["notes"].lower() for k in ["consult", "package", "slumber party", "one on one", "one-on-one", "1:1"])]
    consult = sorted(consult, key=rank, reverse=True)[:10]

    # Set 3: camp page — quotes that name camp/the camp model, shown FULL (camp contexts only).
    camp_named = sorted([r for r in quotes if r["names_camp"]], key=rank, reverse=True)[:24]

    lines = []
    A = lines.append
    A("# Curated Social Proof — Wave 3 (regenerated)")
    A("")
    A("> Auto-regenerated 2026-06-09 from the live Notion **Member Feedback & Wins** corpus "
      "(351 rows) by `scripts/gen_curated.py`. Verbatim quotes only. **For human review before "
      "any site paste** — RUNBOOK #18 (injection) stays ON HOLD until Sally/Kade approve.")
    A("")
    A("Routing rule (corrected): a quote is restricted **only if it names Camp or the camp "
      "model** — those can't stand as proof for other products as-is. Quotes that describe a "
      "universal sleep outcome (no camp reference) are honest Snooze-client proof usable "
      "anywhere. Camp-naming quotes can be **verbatim-trimmed** (drop the camp sentence) for "
      "broader use — see Set 1b. Goal: best content at the right journey stage.")
    A("")
    A(f"Corpus snapshot: total quote rows {len(quotes)} · name camp {sum(1 for r in quotes if r['names_camp'])} · "
      f"universal {sum(1 for r in quotes if not r['names_camp'])} · Google reviews {len(google)} · Screenshots {len(shots)}.")
    A("")

    A("## Set 1 — Membership / course / age (money pages)")
    A("Strongest **universal** quotes (do NOT name camp), any source — home, age pages, course "
      "landings, library, membership path. Verbatim.")
    A("")
    A("| Quote | Name | ★ | Source | Product | Date |")
    A("|---|---|---|---|---|---|")
    for r in universal:
        A(f"| {esc(clip(r['notes']))} | {esc(attribution(r))} | {r['rating'] or ''} | "
          f"{esc(r['source'] or '')} | {esc(', '.join(r['product']))} | {r['date']} |")
    A("")

    A("## Set 1b — Trimmed camp excerpts (broader-use candidates — VERIFY before publishing)")
    A("Verbatim excerpts from camp-naming quotes with the camp sentence(s) dropped (ellipsis). "
      "Selection only, no wording changes. Confirm each still reads true to the reviewer before use off the camp page.")
    A("")
    A("| Trimmed excerpt | Name | ★ | Full quote names camp |")
    A("|---|---|---|---|")
    for r, ex in trimmed:
        A(f"| {esc(clip(ex))} | {esc(attribution(r))} | {r['rating'] or ''} | yes |")
    A("")

    A("## Set 2 — Consult / coaching (about-sally, consultations, contact)")
    A("Named 1:1 / consult-style proof.")
    A("")
    A("| Quote | Name | ★ | Source | Date |")
    A("|---|---|---|---|---|")
    for r in consult:
        A(f"| {esc(clip(r['notes']))} | {esc(attribution(r))} | {r['rating'] or ''} | "
          f"{esc(r['source'] or '')} | {r['date']} |")
    A("")

    A("## Set 3 — Camp-naming quotes (camp page / camp ads, or trim per Set 1b)")
    A("> These name Camp or the camp model, so they can't stand as proof for other products "
      "as-is. Use full on the camp page; for broader use, trim the camp reference (Set 1b). "
      "Transcript quotes are Internal / Publish Approved=false until Sally confirms consent.")
    A("")
    A("| Quote | Speaker/Reviewer | Source | Perm | Date |")
    A("|---|---|---|---|---|")
    for r in camp_named:
        A(f"| {esc(clip(r['notes']))} | {esc(attribution(r))} | {esc(r['source'] or '')} | "
          f"{esc(r['perm'] or '')} | {r['date']} |")
    A("")

    A("## Set 4 — Google reviews by country")
    bycountry = {}
    for r in google:
        bycountry.setdefault(country_of(r["tags"]), []).append(r)
    for cc in sorted(bycountry, key=lambda k: (k == "Unknown", k)):
        A(f"- **{cc}**: {len(bycountry[cc])} review(s)"
          + ("" if cc == "Unknown" else " — " + "; ".join(esc(attribution(r)) for r in bycountry[cc][:8])))
    A("")
    A("_Country is sparse by design: inferred only on explicit place mentions, else `country_unknown` "
      "(authoritative country will populate via CRM-relation linking)._")
    A("")

    A("## Set 5 — Screenshots (embed-ready, raw)")
    A("Raw DM/community screenshots — the asset IS the proof. Internal / unapproved until Sally confirms consent.")
    A("")
    A("| Caption | Source | Asset URL |")
    A("|---|---|---|")
    for r in sorted(shots, key=lambda r: r["title"]):
        A(f"| {esc(clip(r['notes'], 160))} | {esc(r['source'] or '')} | {r['asset'] or ''} |")
    A("")

    (HERE / "CURATED-SOCIAL-PROOF.md").write_text("\n".join(lines) + "\n")
    print(f"Wrote CURATED-SOCIAL-PROOF.md — universal {len(universal)}, trimmed {len(trimmed)}, "
          f"consult {len(consult)}, camp-named {len(camp_named)}, google {len(google)}, screenshots {len(shots)}")


if __name__ == "__main__":
    main()
