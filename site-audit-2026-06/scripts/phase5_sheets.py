#!/usr/bin/env python3
"""
Phase 5 (Google Sheets) — build the audit workbook with 5 tabs:
  Pages | Kajabi Metadata | Issues | Code Provenance | Summary
Reuses the located service-account key (Phase 0). Creates a new spreadsheet,
shares it with the owner, prints the URL.
"""
import json, sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
import audit_common as ac

AUDIT = ac.REPO_ROOT / "apps/snooze-website/site-audit-2026-06"
DATA = AUDIT / "data"

def load_pages():
    out = []
    for pj in sorted(DATA.glob("*.json")):
        if pj.stem in ("url-list", "provenance", "kajabi-admin-metadata"):
            continue
        out.append(json.loads(pj.read_text()))
    return out

def load_provenance():
    p = DATA / "provenance.json"
    return {r["live_url"]: r for r in json.loads(p.read_text())} if p.exists() else {}

def load_admin():
    p = DATA / "kajabi-admin-metadata.json"
    return {r.get("url") or r.get("path"): r for r in json.loads(p.read_text())} if p.exists() else {}

def main():
    pages = load_pages()
    prov = load_provenance()
    admin = load_admin()

    client, creds, key_path = ac.sheets_client()
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    title = f"Snooze Site Audit {ts} (joinsnooze.com)"
    ss = client.create(title)
    ss.share(ac.OWNER_EMAIL, perm_type="user", role="writer")

    # --- Pages tab ---
    pg = ss.sheet1
    pg.update_title("Pages")
    pages_headers = ["URL", "Path", "Type", "HTTP Initial", "HTTP Final", "Final URL",
                     "Redirected", "Title", "Meta Description", "Canonical", "Lang",
                     "Word Count", "JSON-LD Types", "Links Int", "Links Ext",
                     "Images", "Imgs No-Alt", "OG Image", "LCP", "CLS", "TTFB", "FCP",
                     "Source File", "Drift", "# Issues", "Sources"]
    rows = [pages_headers]
    for p in sorted(pages, key=lambda x: x.get("path", "")):
        r = p.get("rendered", {})
        pv = prov.get(p.get("url"), {})
        v = p.get("vitals", {})
        rows.append([
            p.get("url"), p.get("path"), p.get("expected_type"),
            str(p.get("http_status_initial")), str(p.get("http_status_final")),
            r.get("final_url"), "yes" if p.get("redirected") else "no",
            r.get("title"), r.get("meta_description"), r.get("canonical"), r.get("lang"),
            r.get("word_count"), ", ".join(r.get("jsonld_types", [])),
            r.get("links_internal"), r.get("links_external"),
            r.get("images_total"), r.get("images_missing_alt"),
            (r.get("og", {}) or {}).get("og:image"),
            v.get("LCP", ""), v.get("CLS", ""), v.get("TTFB", ""), v.get("FCP", ""),
            pv.get("source_file_path", ""), pv.get("drift_verdict", ""),
            len(p.get("issues", [])), ", ".join(p.get("sources", [])),
        ])
    pg.resize(rows=len(rows), cols=len(pages_headers))
    pg.update(values=rows, range_name="A1")
    pg.freeze(rows=1)
    pg.format("A1:Z1", {"textFormat": {"bold": True},
                        "backgroundColor": {"red": 0.9, "green": 0.9, "blue": 0.9}})

    # --- Kajabi Metadata tab (ALL admin records: landing + website pages,
    #     published + draft; "Live (crawled)" flags which appear in the public crawl) ---
    admin_records = []
    p_amf = DATA / "kajabi-admin-metadata.json"
    if p_amf.exists():
        admin_records = json.loads(p_amf.read_text())
    crawled_urls = {p.get("url") for p in pages}
    km = ss.add_worksheet(title="Kajabi Metadata", rows=max(10, len(admin_records) + 5), cols=11)
    km_headers = ["Internal Title", "Kind", "Slug", "URL", "Publish State", "SEO Title",
                  "SEO Description", "Social Share Image", "Hidden From Search",
                  "Live (crawled)"]
    km_rows = [km_headers]
    for a in sorted(admin_records, key=lambda x: (x.get("kind", ""), x.get("slug", ""))):
        km_rows.append([
            a.get("internal_title", ""), a.get("kind", ""), a.get("slug", ""),
            a.get("url", ""), a.get("publish_state", ""), a.get("seo_title", ""),
            a.get("seo_description", ""),
            "yes" if a.get("social_image") else "no",
            a.get("hide_from_search", ""),
            "yes" if a.get("url") in crawled_urls else "no",
        ])
    if len(km_rows) == 1:
        km_rows.append(["(no admin metadata captured)", "", "", "", "", "", "", "", "", ""])
    km.update(values=km_rows, range_name="A1")
    km.freeze(rows=1)
    km.format("A1:J1", {"textFormat": {"bold": True},
                        "backgroundColor": {"red": 0.9, "green": 0.9, "blue": 0.9}})

    # --- Issues tab (one row per issue) ---
    isheet = ss.add_worksheet(title="Issues", rows=600, cols=5)
    irows = [["URL", "Path", "Type", "Issue", "HTTP Final"]]
    for p in sorted(pages, key=lambda x: x.get("path", "")):
        for iss in p.get("issues", []):
            irows.append([p.get("url"), p.get("path"), p.get("expected_type"),
                          iss, str(p.get("http_status_final"))])
    isheet.resize(rows=max(2, len(irows)), cols=5)
    isheet.update(values=irows, range_name="A1")
    isheet.freeze(rows=1)
    isheet.format("A1:E1", {"textFormat": {"bold": True},
                            "backgroundColor": {"red": 0.95, "green": 0.85, "blue": 0.85}})

    # --- Code Provenance tab ---
    cp = ss.add_worksheet(title="Code Provenance", rows=200, cols=9)
    cp_headers = ["Live URL", "Path", "Type", "HTTP", "Source File", "Wrapper ID",
                  "Match Method", "Drift", "Heading Match"]
    cprows = [cp_headers]
    for r in sorted(prov.values(), key=lambda x: x.get("path", "")):
        cprows.append([r.get("live_url"), r.get("path"), r.get("page_type"),
                       r.get("http_status"), r.get("source_file_path"),
                       r.get("wrapper_id"), r.get("match_method"),
                       r.get("drift_verdict"), r.get("heading_match_ratio", "")])
    cp.resize(rows=max(2, len(cprows)), cols=len(cp_headers))
    cp.update(values=cprows, range_name="A1")
    cp.freeze(rows=1)
    cp.format("A1:I1", {"textFormat": {"bold": True},
                        "backgroundColor": {"red": 0.85, "green": 0.9, "blue": 0.95}})

    # --- Summary tab ---
    sm = ss.add_worksheet(title="Summary", rows=80, cols=4)
    type_c = Counter(p.get("expected_type") for p in pages)
    status_c = Counter(str(p.get("http_status_final")) for p in pages)
    issue_c = Counter(i.split(":")[0] for p in pages for i in p.get("issues", []))
    drift_c = Counter(r.get("drift_verdict") for r in prov.values())
    aeo_no_jsonld = sum(1 for p in pages if "no_jsonld" in p.get("issues", []))
    aeo_no_org = sum(1 for p in pages if "missing_org_schema" in p.get("issues", []))
    srows = [["Snooze Site Audit Summary", ts]]
    srows.append(["Total pages crawled", len(pages)])
    srows.append([])
    srows.append(["By type", ""])
    for k, v in sorted(type_c.items()):
        srows.append([f"  {k}", v])
    srows.append([])
    srows.append(["By HTTP final status", ""])
    for k, v in sorted(status_c.items()):
        srows.append([f"  {k}", v])
    srows.append([])
    srows.append(["Drift verdicts", ""])
    for k, v in sorted(drift_c.items()):
        srows.append([f"  {k}", v])
    srows.append([])
    srows.append(["AEO/GEO coverage", ""])
    srows.append(["  pages missing JSON-LD entirely", aeo_no_jsonld])
    srows.append(["  pages missing Organization schema", aeo_no_org])
    srows.append([])
    srows.append(["Top issues", ""])
    for k, v in issue_c.most_common(20):
        srows.append([f"  {k}", v])
    sm.update(values=srows, range_name="A1")
    sm.format("A1:B1", {"textFormat": {"bold": True, "fontSize": 12}})

    print("SPREADSHEET_URL:", ss.url)
    print("SPREADSHEET_ID:", ss.id)
    # persist the link for the run manifest
    (DATA / "sheet-url.txt").write_text(ss.url)
    return ss.url

if __name__ == "__main__":
    main()
