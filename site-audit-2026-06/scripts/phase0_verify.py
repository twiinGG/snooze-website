#!/usr/bin/env python3
"""Phase 0 — verify Google Sheets auth and Supabase write path."""
import sys, json, datetime
import audit_common as ac

def check_env():
    ac.load_env()
    print("REPO_ROOT:", ac.REPO_ROOT)
    import os
    gac = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    from pathlib import Path
    print("GOOGLE_APPLICATION_CREDENTIALS:", gac, "(exists)" if gac and Path(gac).exists() else "(STALE/MISSING)")
    print("Resolved SA key:", ac.resolve_sa_key())
    with open(ac.resolve_sa_key()) as f:
        sa = json.load(f)
    print("  SA client_email:", sa["client_email"])
    print("  SA project_id:", sa["project_id"])

def check_sheets():
    print("\n=== Google Sheets ===")
    client, creds, key_path = ac.sheets_client()
    # Create a throwaway test spreadsheet, then delete it.
    title = "AUDIT-PHASE0-TEST"
    ss = client.create(title)
    print("  Created test spreadsheet id:", ss.id)
    ss.sheet1.update("A1", [["ok", datetime.datetime.utcnow().isoformat()]])
    print("  Wrote test cell OK")
    # share with owner to confirm sharing works
    try:
        ss.share(ac.OWNER_EMAIL, perm_type="user", role="writer")
        print("  Shared with", ac.OWNER_EMAIL)
    except Exception as e:
        print("  Share warning:", e)
    client.del_spreadsheet(ss.id)
    print("  Deleted test spreadsheet OK")

def check_supabase():
    print("\n=== Supabase page_scrape_data ===")
    sb = ac.supabase_client()
    # count
    res = sb.table("page_scrape_data").select("url", count="exact").limit(1).execute()
    print("  current row count:", res.count)
    # test upsert + delete
    test_url = "https://www.joinsnooze.com/__audit_phase0_test__"
    sb.table("page_scrape_data").upsert({
        "url": test_url, "title": "phase0 test", "word_count": 0,
        "scraped_at": datetime.datetime.utcnow().isoformat() + "Z",
    }, on_conflict="url").execute()
    chk = sb.table("page_scrape_data").select("url").eq("url", test_url).execute()
    print("  upsert verified:", len(chk.data) == 1)
    sb.table("page_scrape_data").delete().eq("url", test_url).execute()
    chk2 = sb.table("page_scrape_data").select("url").eq("url", test_url).execute()
    print("  delete verified:", len(chk2.data) == 0)

if __name__ == "__main__":
    # Supabase is verified/written via the Supabase MCP tools (per CLAUDE.md:
    # "always use MCP tools, never direct connection strings"). This script
    # only covers Google Sheets + env, which have no such MCP boundary.
    check_env()
    ok = True
    try:
        check_sheets()
    except Exception as e:
        ok = False
        print("  SHEETS FAILED:", repr(e))
    print("\nPhase 0 (env+sheets):", "PASS" if ok else "FAIL")
    sys.exit(0 if ok else 1)
