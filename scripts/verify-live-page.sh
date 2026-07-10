#!/usr/bin/env bash
#
# verify-live-page.sh
#
# Deterministic post-paste verification for a Kajabi website page.
# Curls the public URL (cache-buster + desktop UA), whitespace-normalises both
# sides, and asserts every non-blank line of the repo source file appears in the
# live HTML. Exit 0 = 0 missing lines. Non-zero = missing lines (printed to stderr).
#
# USAGE: bash apps/snooze-website/scripts/verify-live-page.sh <live-slug> <repo-file> [base-url]
#   base-url defaults to https://www.joinsnooze.com
#
# NOTE: this is a CONTENT check (repo lines present live). It does NOT prove the
# scoped CSS renders — for that, check getComputedStyle on a scoped component in a
# browser (a page can pass 0-missing yet render unstyled if the #X-page wrapper is
# missing; see KAJABI-PARALLEL-CDP-DEPLOY.md, the <body> vs <div> wrapper trap).
set -euo pipefail

SLUG="$1"; FILE="$2"; BASE="${3:-https://www.joinsnooze.com}"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
CB="$(od -An -N4 -tu4 < /dev/urandom | tr -d ' ')"

live="$(curl -fsSL -A "$UA" "${BASE}/${SLUG}?cb=${CB}")"
norm() { tr -s '[:space:]' ' ' | sed 's/^ //; s/ $//'; }
live_norm="$(printf '%s' "$live" | norm)"

missing=0
while IFS= read -r line; do
  [ -z "${line// }" ] && continue
  ln="$(printf '%s' "$line" | norm)"; [ -z "$ln" ] && continue
  case "$live_norm" in
    *"$ln"*) : ;;
    *) missing=$((missing+1)); printf 'MISSING: %s\n' "$ln" >&2 ;;
  esac
done < "$FILE"

echo "=== ${SLUG}: ${missing} missing lines ==="
[ "$missing" -eq 0 ]
