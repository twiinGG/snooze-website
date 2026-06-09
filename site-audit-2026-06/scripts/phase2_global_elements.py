#!/usr/bin/env python3
"""
Phase 2a — capture global navigation, header, footer from a representative
public page (homepage), no login required. Writes pages/_global-nav-header-footer.md.
"""
import re
from pathlib import Path
import audit_common as ac

AUDIT = ac.REPO_ROOT / "apps/snooze-website/site-audit-2026-06"
HOME_HTML = AUDIT / "data/html/home.html"

def extract_region(html, tag_or_id):
    # crude region extraction by tag or id
    m = re.search(rf'<{tag_or_id}\b[^>]*>(.*?)</{tag_or_id}>', html, re.I | re.S)
    return m.group(0) if m else ""

def links_in(region):
    out = []
    for m in re.finditer(r'<a\b[^>]*href="([^"]+)"[^>]*>(.*?)</a>', region, re.I | re.S):
        href = m.group(1)
        text = re.sub(r"<[^>]+>", "", m.group(2)).strip()
        text = re.sub(r"\s+", " ", text)
        if text or href:
            out.append((text[:60], href))
    # dedupe preserving order
    seen, ded = set(), []
    for t, h in out:
        if (t, h) not in seen:
            seen.add((t, h)); ded.append((t, h))
    return ded

def main():
    html = HOME_HTML.read_text(encoding="utf-8", errors="ignore")
    header = extract_region(html, "header")
    footer = extract_region(html, "footer")
    nav = extract_region(html, "nav")

    lines = ["# Global Elements — Navigation, Header, Footer",
             "",
             "Captured from the live homepage (https://www.joinsnooze.com/) rendered HTML.",
             "These are Kajabi theme-level global elements shared across all pages.",
             ""]
    lines.append(f"- Header region present: {'yes' if header else 'no'} ({len(header)} chars)")
    lines.append(f"- Nav region present: {'yes' if nav else 'no'} ({len(nav)} chars)")
    lines.append(f"- Footer region present: {'yes' if footer else 'no'} ({len(footer)} chars)")
    lines.append("")

    for label, region in [("Header / Navigation", header or nav), ("Footer", footer)]:
        lns = links_in(region)
        lines.append(f"## {label} links ({len(lns)})\n")
        for t, h in lns:
            lines.append(f"- [{t or '(no text)'}]({h})")
        lines.append("")

    (AUDIT / "pages/_global-nav-header-footer.md").write_text("\n".join(lines))
    print("header links:", len(links_in(header or nav)), "footer links:", len(links_in(footer)))
    print("Wrote pages/_global-nav-header-footer.md")

if __name__ == "__main__":
    main()
