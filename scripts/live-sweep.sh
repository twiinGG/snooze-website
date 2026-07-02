#!/usr/bin/env bash
set -euo pipefail

CHROME_UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
BASE_URL="https://www.joinsnooze.com"

usage() {
  cat <<'USAGE'
Usage: apps/snooze-website/scripts/live-sweep.sh [YYYY-MM-DD]

Fetches the live joinsnooze.com pricing and SEO audit pages logged out with a
Chrome user agent, saves HTML into a dated baseline directory, writes grep dumps
and emits a markdown summary table.

Default date: current local date
Default output:
  docs/projects/paid-media-and-dual-currency-v1/live-baselines-YYYY-MM-DD/live-sweep/

Environment overrides:
  LIVE_SWEEP_OUT_DIR=/custom/output/dir
  LIVE_SWEEP_BASE_URL=https://www.joinsnooze.com
  LIVE_SWEEP_UA="custom user agent"

Diff against the July 02, 2026 baseline:
  diff -u \
    docs/projects/paid-media-and-dual-currency-v1/live-baselines-2026-07-02/live-sweep/LIVE-SWEEP-REPORT.md \
    docs/projects/paid-media-and-dual-currency-v1/live-baselines-YYYY-MM-DD/live-sweep/LIVE-SWEEP-REPORT.md
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

RUN_DATE="${1:-$(date +%F)}"
BASE_URL="${LIVE_SWEEP_BASE_URL:-$BASE_URL}"
CHROME_UA="${LIVE_SWEEP_UA:-$CHROME_UA}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
OUT_DIR="${LIVE_SWEEP_OUT_DIR:-$REPO_ROOT/docs/projects/paid-media-and-dual-currency-v1/live-baselines-$RUN_DATE/live-sweep}"
REPORT="$OUT_DIR/LIVE-SWEEP-REPORT.md"
STATUS_SUMMARY="$OUT_DIR/status_summary.txt"
ALL_PRICES="$OUT_DIR/all_prices.txt"
BANNED_COPY="$OUT_DIR/banned_copy.txt"
SEO_SIGNALS="$OUT_DIR/seo_signals.txt"
SITEMAP="$OUT_DIR/sitemap.xml"
ALL_URLS="$OUT_DIR/all_urls.txt"

mkdir -p "$OUT_DIR"
: > "$STATUS_SUMMARY"
: > "$ALL_PRICES"
: > "$BANNED_COPY"
: > "$SEO_SIGNALS"
: > "$ALL_URLS"

PAGES=(
  "Home|home|/"
  "Snooze (expected 404)|snooze|/snooze"
  "Newborn|newborn|/newborn-baby-sleep-help"
  "3-4 Month|3-4mo|/3-4-month-baby-sleep-help"
  "5-12 Month|5-12mo|/5-12-month-baby-sleep-help"
  "Toddler|toddler|/toddler-sleep-help"
  "5-12mo Course|5-12mo-course|/5-12-month-baby-sleep-course"
  "Snooze Access|snooze-access|/snooze-access"
  "Camp Snooze|camp-snooze|/camp-snooze-sleep-coaching"
  "Consultations|consultations|/one-on-one-sleep-consultations"
  "Store|store|/store"
  "Checkout z63s9VaR|checkout-z63s9VaR|/offers/z63s9VaR/checkout"
  "Checkout vYgCNgJz|checkout-vYgCNgJz|/offers/vYgCNgJz/checkout"
  "Checkout mqQikDM7|checkout-mqQikDM7|/offers/mqQikDM7/checkout"
  "Checkout Sr6KzShx|checkout-Sr6KzShx|/offers/Sr6KzShx/checkout"
)

count_fixed() {
  local pattern="$1"
  local file="$2"
  { grep -oF "$pattern" "$file" 2>/dev/null || true; } | wc -l | tr -d '[:space:]'
}

count_fixed_i() {
  local pattern="$1"
  local file="$2"
  { grep -oiF "$pattern" "$file" 2>/dev/null || true; } | wc -l | tr -d '[:space:]'
}

grep_fixed_i() {
  local pattern="$1"
  local file="$2"
  grep -inF "$pattern" "$file" 2>/dev/null || true
}

html_escape_pipe() {
  sed \
    -e 's/&/\&amp;/g' \
    -e 's/</\&lt;/g' \
    -e 's/>/\&gt;/g'
}

join_slug_hits() {
  local file="$1"
  local details=()
  local slug
  local count

  for slug in "6iRarwak" "bEsVXFXG" "dRN7QR7k"; do
    count="$(count_fixed "$slug" "$file")"
    if [[ "$count" != "0" ]]; then
      details+=("$slug x$count")
    fi
  done

  if [[ "${#details[@]}" -eq 0 ]]; then
    printf "0"
  else
    printf "%s\n" "${details[@]}" | paste -sd "," - | sed 's/,/, /g'
  fi
}

join_banned_hits() {
  local file="$1"
  local details=()
  local phrase
  local count

  for phrase in "24/7" "weekly coaching" "replays" "Lifetime access" "Registered Paediatric Nurse"; do
    count="$(count_fixed_i "$phrase" "$file")"
    if [[ "$count" != "0" ]]; then
      details+=("$phrase x$count")
    fi
  done

  if [[ "${#details[@]}" -eq 0 ]]; then
    printf "0"
  else
    printf "%s\n" "${details[@]}" | paste -sd "," - | sed 's/,/, /g'
  fi
}

json_ld_block_count() {
  local file="$1"
  count_fixed_i "application/ld+json" "$file"
}

json_ld_types() {
  local file="$1"
  local types

  types="$(
    perl -0777 -ne 'while (/"\@type"\s*:\s*(?:"([^"]+)"|\[([^\]]+)\])/g) {
      if (defined $1) {
        print "$1\n";
      } else {
        my $list = $2;
        while ($list =~ /"([^"]+)"/g) { print "$1\n"; }
      }
    }' "$file" \
      | sort -u \
      | paste -sd "," - \
      | sed 's/,/, /g'
  )"

  if [[ -z "$types" ]]; then
    printf "none"
  else
    printf "%s" "$types"
  fi
}

status_display() {
  local status="$1"
  local file="$2"

  if [[ "$status" == "403" ]] && grep -qi "Attention Required" "$file"; then
    printf "403 (Cloudflare)"
  else
    printf "%s" "$status"
  fi
}

fetch_page() {
  local name="$1"
  local slug="$2"
  local path="$3"
  local url="$BASE_URL$path"
  local file="$OUT_DIR/$slug.html"
  local headers="$OUT_DIR/$slug.headers"
  local status
  local bytes

  status="$(
    curl -sSL \
      -A "$CHROME_UA" \
      -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
      -H "Accept-Language: en-US,en;q=0.9" \
      -D "$headers" \
      -o "$file" \
      -w "%{http_code}" \
      "$url" || printf "000"
  )"

  bytes="$(wc -c < "$file" | tr -d '[:space:]')"
  perl -0pe 's/[[:space:]]+/ /g' "$file" > "$OUT_DIR/$slug.flat.html"
  printf "%s | %s | status=%s | bytes=%s\n" "$slug" "$url" "$status" "$bytes" >> "$STATUS_SUMMARY"
}

write_page_dumps() {
  local name="$1"
  local slug="$2"
  local path="$3"
  local file="$OUT_DIR/$slug.html"

  {
    printf "## %s | %s\n" "$name" "$path"
    grep -inoE 'dynamic-price|data-aud|dynamic-cta|data-checkout|\$[0-9][0-9,]*(\.[0-9][0-9])?|AUD|USD' "$file" 2>/dev/null || true
    printf "\n"
  } >> "$ALL_PRICES"

  {
    printf "## %s | %s\n" "$name" "$path"
    grep_fixed_i "24/7" "$file"
    grep_fixed_i "weekly coaching" "$file"
    grep_fixed_i "replays" "$file"
    grep_fixed_i "Lifetime access" "$file"
    grep_fixed_i "Registered Paediatric Nurse" "$file"
    printf "\n"
  } >> "$BANNED_COPY"

  {
    printf "## %s | %s\n" "$name" "$path"
    grep -inoE '<script[^>]+type=["'\'']application/ld\+json["'\'']|@type|canonical|noindex|og:title|og:description' "$file" 2>/dev/null || true
    printf "\n"
  } >> "$SEO_SIGNALS"
}

write_report() {
  {
    printf "# joinsnooze.com Live Pricing / SEO Sweep - %s\n\n" "$RUN_DATE"
    printf "Method: curl -sL with a Chrome user agent against live URLs while logged out. HTML is saved under this directory. Analysis uses literal grep counts on saved HTML.\n\n"
    printf "Output directory: \`%s\`\n\n" "$OUT_DIR"
    printf "Baseline for diff: \`docs/projects/paid-media-and-dual-currency-v1/live-baselines-2026-07-02/live-sweep/\`\n\n"
    printf "## Summary table\n\n"
    printf "| Page | URL | Status | dynamic-price / data-aud / dynamic-cta / data-checkout | Legacy slug hits | Banned-copy hits | JSON-LD blocks (types) |\n"
    printf "|---|---|---|---|---|---|---|\n"

    local page
    for page in "${PAGES[@]}"; do
      IFS="|" read -r name slug path <<< "$page"
      local file="$OUT_DIR/$slug.html"
      local status
      local dynamic_price
      local data_aud
      local dynamic_cta
      local data_checkout
      local legacy_hits
      local banned_hits
      local banned_total
      local blocks
      local types

      status="$(awk -F 'status=' -v s="$slug" '$1 ~ "^" s " \\|" {split($2, a, " "); print a[1]}' "$STATUS_SUMMARY" | tail -n 1)"
      status="$(status_display "${status:-000}" "$file")"
      dynamic_price="$(count_fixed "dynamic-price" "$file")"
      data_aud="$(count_fixed "data-aud" "$file")"
      dynamic_cta="$(count_fixed "dynamic-cta" "$file")"
      data_checkout="$(count_fixed "data-checkout" "$file")"
      legacy_hits="$(join_slug_hits "$file" | html_escape_pipe)"
      banned_hits="$(join_banned_hits "$file" | html_escape_pipe)"
      banned_total="$(
        {
          printf "%s\n" "$(count_fixed_i "24/7" "$file")"
          printf "%s\n" "$(count_fixed_i "weekly coaching" "$file")"
          printf "%s\n" "$(count_fixed_i "replays" "$file")"
          printf "%s\n" "$(count_fixed_i "Lifetime access" "$file")"
          printf "%s\n" "$(count_fixed_i "Registered Paediatric Nurse" "$file")"
        } | awk '{sum += $1} END {print sum + 0}'
      )"
      blocks="$(json_ld_block_count "$file")"
      types="$(json_ld_types "$file" | html_escape_pipe)"

      printf "| %s | \`%s\` | %s | %s / %s / %s / %s | %s | %s (%s total) | %s (%s) |\n" \
        "$name" "$path" "$status" "$dynamic_price" "$data_aud" "$dynamic_cta" "$data_checkout" \
        "$legacy_hits" "$banned_hits" "$banned_total" "$blocks" "$types"
    done

    printf "\n## Raw files\n\n"
    printf "%s\n" "- \`status_summary.txt\`"
    printf "%s\n" "- \`all_prices.txt\`"
    printf "%s\n" "- \`all_urls.txt\`"
    printf "%s\n" "- \`banned_copy.txt\`"
    printf "%s\n" "- \`seo_signals.txt\`"
    printf "%s\n" "- \`*.html\` and \`*.flat.html\`"
    printf "%s\n\n" "- \`sitemap.xml\`"
    printf "## Diff commands\n\n"
    printf "\`\`\`bash\n"
    printf "diff -u docs/projects/paid-media-and-dual-currency-v1/live-baselines-2026-07-02/live-sweep/status_summary.txt %q/status_summary.txt\n" "$OUT_DIR"
    printf "diff -u docs/projects/paid-media-and-dual-currency-v1/live-baselines-2026-07-02/live-sweep/LIVE-SWEEP-REPORT.md %q/LIVE-SWEEP-REPORT.md\n" "$OUT_DIR"
    printf "\`\`\`\n"
  } > "$REPORT"
}

printf "Writing live sweep to %s\n" "$OUT_DIR" >&2

curl -sSL -A "$CHROME_UA" "$BASE_URL/sitemap.xml" -o "$SITEMAP" || true
perl -0777 -ne 'while (/<loc>(.*?)<\/loc>/g) { print "$1\n"; }' "$SITEMAP" > "$ALL_URLS" || true

for page in "${PAGES[@]}"; do
  IFS="|" read -r name slug path <<< "$page"
  printf "Fetching %s: %s\n" "$name" "$BASE_URL$path" >&2
  fetch_page "$name" "$slug" "$path"
  write_page_dumps "$name" "$slug" "$path"
done

write_report
cat "$REPORT"
