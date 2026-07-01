#!/usr/bin/env python3
"""
Download all Camp roll-call transcripts (text/plain) from the Drive manifest to a
local staging dir for offline extraction. READ-ONLY against Drive.

Output:
  transcript-extractions/_raw/<camp>/<filename>.txt
  transcript-extractions/_raw/_index.json   (file_id, drive_path, local_path, camp)
"""
from __future__ import annotations

import io
import json
import os
import re
from pathlib import Path

from dotenv import load_dotenv

HERE = Path(__file__).resolve().parent.parent  # wave-3-social-proof/
ROOT = HERE
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break

MANIFEST = HERE / "harvest" / "drive-manifest.json"
RAW = HERE / "transcript-extractions" / "_raw"


def service():
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
    creds = Credentials(
        token=None, refresh_token=os.environ["GOOGLE_REFRESH_TOKEN"],
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.environ["GOOGLE_CLIENT_ID"],
        client_secret=os.environ["GOOGLE_CLIENT_SECRET"],
        scopes=["https://www.googleapis.com/auth/drive"],
    )
    creds.refresh(Request())
    return build("drive", "v3", credentials=creds)


def camp_of(path):
    m = re.search(r"Camp Snooze Intakes/([^/]+)/", path)
    return m.group(1) if m else "_other"


def main():
    manifest = json.load(open(MANIFEST))
    txts = [o for o in manifest if o["mimeType"] == "text/plain"]
    svc = service()
    from googleapiclient.http import MediaIoBaseDownload
    index = []
    for o in txts:
        camp = camp_of(o["path"])
        dest_dir = RAW / camp
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / o["name"]
        req = svc.files().get_media(fileId=o["id"])
        buf = io.BytesIO()
        dl = MediaIoBaseDownload(buf, req)
        done = False
        while not done:
            _, done = dl.next_chunk()
        dest.write_bytes(buf.getvalue())
        index.append({"file_id": o["id"], "drive_path": o["path"],
                      "local_path": str(dest.relative_to(HERE)), "camp": camp})
        print(f"  downloaded {camp}/{o['name']} ({len(buf.getvalue())} bytes)")
    (RAW / "_index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False))
    print(f"\nDONE: {len(index)} transcripts -> {RAW.relative_to(HERE)}")


if __name__ == "__main__":
    main()
