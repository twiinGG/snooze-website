#!/usr/bin/env python3
"""
Credential probe (READ-ONLY) for the Wave 3 harvest.

1. Drive: using the clip-engine OAuth creds (GOOGLE_REFRESH_TOKEN/CLIENT_ID/SECRET
   from root .env, Drive scope), list the Camp Snooze folder so we know the account
   can see it and what transcript files exist.
2. GBP: probe Google Business Profile API reachability with the same creds, to learn
   whether the incremental Google-reviews delta can be pulled via the owner API.

Prints status + a file listing only. No secret values are printed.
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve()
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break

CAMP_FOLDER_ID = "1xPrHQbg1vwqWrAxOxZU-m0DF9AiC05Ny"


def build_creds(scopes):
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request

    rt = os.getenv("GOOGLE_REFRESH_TOKEN")
    cid = os.getenv("GOOGLE_CLIENT_ID")
    secret = os.getenv("GOOGLE_CLIENT_SECRET")
    if not (rt and cid and secret):
        missing = [k for k, v in {
            "GOOGLE_REFRESH_TOKEN": rt, "GOOGLE_CLIENT_ID": cid,
            "GOOGLE_CLIENT_SECRET": secret}.items() if not v]
        return None, f"missing env: {missing}"
    creds = Credentials(
        token=None, refresh_token=rt,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=cid, client_secret=secret, scopes=scopes,
    )
    try:
        creds.refresh(Request())
        return creds, None
    except Exception as exc:
        return None, f"refresh failed: {exc}"


def probe_drive():
    print("\n=== DRIVE PROBE ===")
    creds, err = build_creds(["https://www.googleapis.com/auth/drive"])
    if err:
        print("DRIVE: cannot build creds ->", err)
        return
    try:
        from googleapiclient.discovery import build
        svc = build("drive", "v3", credentials=creds)
        # List files in the Camp folder
        resp = svc.files().list(
            q=f"'{CAMP_FOLDER_ID}' in parents and trashed=false",
            fields="files(id,name,mimeType,modifiedTime),nextPageToken",
            pageSize=200,
            supportsAllDrives=True, includeItemsFromAllDrives=True,
        ).execute()
        files = resp.get("files", [])
        print(f"DRIVE: OK — {len(files)} item(s) in Camp folder:")
        for f in files:
            print(f"  - {f['name']}  [{f['mimeType']}]  id={f['id']}  mod={f.get('modifiedTime')}")
    except Exception as exc:
        print("DRIVE: API call failed ->", repr(exc))


def probe_gbp():
    print("\n=== GBP PROBE ===")
    creds, err = build_creds(["https://www.googleapis.com/auth/business.manage"])
    if err:
        print("GBP: cannot build creds with business.manage ->", err)
        return
    try:
        import requests
        # Account management API — list accessible GBP accounts
        r = requests.get(
            "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
            headers={"Authorization": f"Bearer {creds.token}"}, timeout=30)
        print("GBP: accounts endpoint status", r.status_code)
        if r.status_code == 200:
            data = r.json()
            accts = data.get("accounts", [])
            print(f"GBP: {len(accts)} account(s) accessible")
            for a in accts:
                print(f"  - {a.get('name')}  {a.get('accountName')}  type={a.get('type')}")
        else:
            print("GBP: body:", r.text[:400])
    except Exception as exc:
        print("GBP: call failed ->", repr(exc))


if __name__ == "__main__":
    probe_drive()
    probe_gbp()
