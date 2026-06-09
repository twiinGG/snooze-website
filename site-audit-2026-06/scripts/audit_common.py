#!/usr/bin/env python3
"""
Shared helpers for the joinsnooze.com 2026-06 site audit.

Loads the umbrella-root .env (climbing up directories), and exposes
Supabase + Google Sheets clients using the credential paths that
actually work in this repo (service-account key, located post-refactor).
"""
import os
import json
from pathlib import Path

# ---- Robust .env loading (Python 3.14 find_dotenv chokes on heredocs) ----
def find_repo_root(start: Path = None) -> Path:
    p = (start or Path(__file__).resolve()).parent
    for cand in [p, *p.parents]:
        if (cand / ".env").exists() and (cand / "AGENTS.md").exists():
            return cand
    # fall back: climb until .env
    for cand in [p, *p.parents]:
        if (cand / ".env").exists():
            return cand
    raise RuntimeError("Could not locate repo root .env")

REPO_ROOT = find_repo_root()

def load_env():
    from dotenv import dotenv_values
    vals = dotenv_values(REPO_ROOT / ".env")
    for k, v in vals.items():
        if v is not None and k not in os.environ:
            os.environ[k] = v
    return os.environ

# ---- Credential resolution ----
# The .env GOOGLE_APPLICATION_CREDENTIALS points to a stale post-refactor path.
# The real service-account key is located here:
LOCATED_SA_KEY = REPO_ROOT / "_legacy/workspaces/snooze-infrastructure/spellbook-459212-dda0585fd42b.json"

def resolve_sa_key() -> str:
    load_env()
    gac = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    if gac and Path(gac).exists():
        return gac
    if LOCATED_SA_KEY.exists():
        return str(LOCATED_SA_KEY)
    raise RuntimeError("No usable Google service-account key found")

# ---- Supabase ----
def supabase_client():
    load_env()
    from supabase import create_client
    url = os.getenv("SUPABASE_URL", "https://qwwwosoafcsupebpangw.supabase.co")
    key = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not key:
        raise RuntimeError("SUPABASE_SERVICE_KEY missing")
    return create_client(url, key)

# ---- Google Sheets ----
def sheets_client():
    import gspread
    from google.oauth2.service_account import Credentials
    key_path = resolve_sa_key()
    creds = Credentials.from_service_account_file(key_path, scopes=[
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
    ])
    return gspread.authorize(creds), creds, key_path

OWNER_EMAIL = "kadeg@green-hat.com.au"

if __name__ == "__main__":
    print("REPO_ROOT:", REPO_ROOT)
    print("SA key:", resolve_sa_key())
