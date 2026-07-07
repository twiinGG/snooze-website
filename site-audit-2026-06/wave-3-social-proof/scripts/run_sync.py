#!/usr/bin/env python3
"""
Runner for the legacy sync_member_feedback_wins.py.

The legacy script looks for .env at the old workspace root (stale) and reads
SUPABASE_ANON_KEY — which RLS on member_feedback_raw blocks for writes. This runner:
  - loads the monorepo-root .env,
  - routes the Supabase client through SUPABASE_SERVICE_KEY (bypasses RLS for a backend
    sync) by exposing it as SUPABASE_ANON_KEY to the script,
  - then runs the script with whatever args you pass through.

Usage: python run_sync.py --dry-run [--max-pages N]
       python run_sync.py
"""
import os
import runpy
import sys
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve()
for _ in range(12):
    ROOT = ROOT.parent
    if (ROOT / ".env").exists():
        load_dotenv(ROOT / ".env")
        break

svc = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")
if svc:
    os.environ["SUPABASE_ANON_KEY"] = svc  # backend sync → service role, bypass RLS

SYNC = ROOT / "hub/mcp-servers/memory-integration/scripts/sync_member_feedback_wins.py"
sys.argv = [str(SYNC)] + sys.argv[1:]
runpy.run_path(str(SYNC), run_name="__main__")
