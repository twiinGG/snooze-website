#!/usr/bin/env bash
#
# launch-kajabi-cdp-lanes.sh
#
# Launch N real, headed Chrome instances for PARALLEL Kajabi admin paste lanes,
# each attachable by agent-browser via CDP. This is the proven way to drive the
# Kajabi admin WAF surface: a real Chrome fingerprint + a HUMAN login clears
# Cloudflare, and agent-browser attaches read/write without tripping the block.
#
# WHY this shape (learned 2026-07-10, see KAJABI-PARALLEL-CDP-DEPLOY.md):
#   - Headless / fresh-profile agent-browser is HARD-BLOCKED by Kajabi's WAF.
#   - Each window opens to about:blank, NOT a kajabi URL. A cold automated hit on
#     app.kajabi.com returns HTTP 406 and BURNS the window before you can log in.
#   - Each lane gets its own --remote-debugging-port + its own fresh --user-data-dir
#     (two lanes sharing a user-data-dir hit Chrome's singleton lock).
#
# USAGE:
#   bash apps/snooze-website/scripts/launch-kajabi-cdp-lanes.sh [N] [BASE_PORT]
#     N          number of lanes (default 3)
#     BASE_PORT  first debug port (default 9333; lanes use BASE_PORT, +1, +2, ...)
#
# AFTER RUNNING: log into Kajabi admin BY HAND in each window (same admin account
# is fine). Go via the dashboard it lands on; NEVER open the /login deep-link.
# Then attach one agent-browser teammate per lane:
#   agent-browser --cdp <port> --session <UNIQUE-lane-name> <cmd>
# The UNIQUE --session per lane is MANDATORY (the daemon routes by session name,
# not by port; a missing/duplicate session silently collapses lanes onto one tab).
set -euo pipefail

N="${1:-3}"
BASE_PORT="${2:-9333}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROFILE_ROOT="$HOME/.kajabi-cdp"

[ -x "$CHROME" ] || { echo "ERROR: Chrome not found at $CHROME" >&2; exit 1; }

for i in $(seq 1 "$N"); do
  port=$((BASE_PORT + i - 1))
  dir="$PROFILE_ROOT/lane$i"
  mkdir -p "$dir"
  "$CHROME" --remote-debugging-port="$port" --user-data-dir="$dir" \
    --no-first-run --no-default-browser-check "about:blank" >/dev/null 2>&1 &
  echo "Lane $i: port $port  pid $!  dir $dir"
done

sleep 3
echo "--- DevTools endpoints (each should return a JSON Browser string) ---"
for i in $(seq 1 "$N"); do
  port=$((BASE_PORT + i - 1))
  printf "port %s: " "$port"; curl -s "http://localhost:$port/json/version" | head -c 80; echo
done
echo
echo "NEXT: 1) log into Kajabi admin by hand in all $N windows (dashboard, NOT /login)."
echo "      2) attach one teammate per lane: agent-browser --cdp <port> --session lane<i> <cmd>"
echo "      3) NEVER auto-navigate a kajabi URL (open/goto/reload => HTTP 406). Clicks only."
