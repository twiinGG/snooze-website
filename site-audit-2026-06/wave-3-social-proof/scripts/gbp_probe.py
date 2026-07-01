#!/usr/bin/env python3
"""
GBP service-account probe (READ-ONLY).

Authenticates with the tsc-ga4-analysis service account key and reports what
Google Business Profile surfaces are actually reachable:
  - Account Management API (accounts.list)
  - Business Information API (locations)
  - My Business API v4 reviews endpoint (review CONTENT — the gated one)

Prints status codes + minimal identifiers only. No secret values printed.
"""
from __future__ import annotations

import json
import sys

import google.auth.transport.requests
from google.oauth2 import service_account
import requests

KEY = "/Users/kadegreenland/.config/snooze/ga4-mcp-key.json"
SCOPE = ["https://www.googleapis.com/auth/business.manage"]


def token():
    creds = service_account.Credentials.from_service_account_file(KEY, scopes=SCOPE)
    info = json.load(open(KEY))
    print("SA client_email:", info.get("client_email"))
    print("SA project_id:", info.get("project_id"))
    print("SA private_key_id:", info.get("private_key_id"))
    creds.refresh(google.auth.transport.requests.Request())
    return creds.token


def main():
    try:
        tok = token()
    except Exception as exc:
        print("AUTH FAILED:", repr(exc)); sys.exit(1)
    h = {"Authorization": f"Bearer {tok}"}

    print("\n--- Account Management: accounts.list ---")
    r = requests.get("https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
                     headers=h, timeout=30)
    print("status", r.status_code, "| body:", r.text[:600])
    accounts = r.json().get("accounts", []) if r.status_code == 200 else []

    for acct in accounts:
        name = acct.get("name")
        print(f"\n--- Business Information: locations for {name} ---")
        r2 = requests.get(
            f"https://mybusinessbusinessinformation.googleapis.com/v1/{name}/locations",
            params={"readMask": "name,title,storefrontAddress"},
            headers=h, timeout=30)
        print("status", r2.status_code, "| body:", r2.text[:600])
        locs = r2.json().get("locations", []) if r2.status_code == 200 else []
        for loc in locs[:3]:
            locname = loc.get("name")
            print(f"\n--- My Business v4 reviews: {acct.get('name')}/{locname} ---")
            r3 = requests.get(
                f"https://mybusiness.googleapis.com/v4/{name}/{locname}/reviews",
                headers=h, timeout=30)
            print("status", r3.status_code, "| body:", r3.text[:400])


if __name__ == "__main__":
    main()
