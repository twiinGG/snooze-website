#!/usr/bin/env python3
"""
Recursively list the Camp Snooze Drive folder tree (READ-ONLY).

Emits a JSON manifest of every file with id, name, mimeType, parent path, and
modifiedTime — the input work-list for the transcript-extractor step. No downloads.
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
FOLDER_MIME = "application/vnd.google-apps.folder"


def service():
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build

    creds = Credentials(
        token=None,
        refresh_token=os.environ["GOOGLE_REFRESH_TOKEN"],
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.environ["GOOGLE_CLIENT_ID"],
        client_secret=os.environ["GOOGLE_CLIENT_SECRET"],
        scopes=["https://www.googleapis.com/auth/drive"],
    )
    creds.refresh(Request())
    return build("drive", "v3", credentials=creds)


def walk(svc, folder_id, path, out):
    token = None
    while True:
        resp = svc.files().list(
            q=f"'{folder_id}' in parents and trashed=false",
            fields="nextPageToken, files(id,name,mimeType,modifiedTime,size)",
            pageSize=200, pageToken=token,
            supportsAllDrives=True, includeItemsFromAllDrives=True,
        ).execute()
        for f in resp.get("files", []):
            node = {
                "id": f["id"], "name": f["name"], "mimeType": f["mimeType"],
                "path": f"{path}/{f['name']}", "modifiedTime": f.get("modifiedTime"),
                "size": f.get("size"),
            }
            out.append(node)
            if f["mimeType"] == FOLDER_MIME:
                walk(svc, f["id"], node["path"], out)
        token = resp.get("nextPageToken")
        if not token:
            break


def main():
    svc = service()
    out = []
    walk(svc, CAMP_FOLDER_ID, "Camp Snooze", out)
    print(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"\nTOTAL ITEMS: {len(out)}", file=sys.stderr)
    docs = [o for o in out if o["mimeType"] != FOLDER_MIME]
    print(f"FILES (non-folder): {len(docs)}", file=sys.stderr)


if __name__ == "__main__":
    main()
