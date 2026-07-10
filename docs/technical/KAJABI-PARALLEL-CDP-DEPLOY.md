# Kajabi Parallel CDP Deployment Runbook

**Established:** July 10, 2026 (Phase-5 UX push). **Status:** proven end-to-end (theme CSS + 6 guide pages, parallel).
**Read alongside:** `KAJABI-SURFACE-CODE-SETUP.md` (per-surface decision table), `../DEPLOYMENT-CHECKLIST.md` (gates), root `AGENTS.md` (token-safe paste).

This is the repeatable playbook for pushing committed `apps/snooze-website` code to the live Kajabi admin in **parallel across multiple browser lanes**. It supersedes the older "single named headed session, serialised" note for multi-surface pushes; use it whenever more than ~2 surfaces ship at once.

---

## 0. Why this exists (the two hard walls)

1. **Kajabi's Cloudflare WAF hard-blocks automated browsers.** A headless agent-browser, or a fresh cookieless profile, hitting `app.kajabi.com` gets a Cloudflare "Sorry, you have been blocked" page (or an HTTP 406). You cannot automate your way past it. A **real, headed Chrome that a human logged into** carries the trusted fingerprint + WAF clearance cookie, and agent-browser can attach to it via CDP and drive it.
2. **A cold automated top-level navigation to any `app.kajabi.com` URL returns HTTP 406 and burns the window.** This includes agent-browser `open`/`goto`/`reload`, and launching Chrome directly at an admin URL. The window then shows "This page isn't working / HTTP ERROR 406" and cannot be recovered by the agent. Only a HUMAN navigation clears it.

Everything below is shaped by those two facts.

---

## 1. Topology: real Chrome per lane, attached via CDP

- One **real headed Chrome instance per lane**, each with its own `--remote-debugging-port` and its own fresh `--user-data-dir`. Two lanes must never share a user-data-dir (Chrome singleton lock).
- Windows launch to **`about:blank`**, never a kajabi URL (see wall #2).
- agent-browser attaches per lane with `--cdp <port> --session <UNIQUE-name>`.
- **The unique `--session` per lane is MANDATORY.** agent-browser runs one global daemon; it routes commands by **session name, not by CDP port**. A missing or duplicated `--session` silently sends every command to the first-registered browser, collapsing all lanes onto one tab. Verify with `agent-browser session list` before dispatching.
- Do NOT rely on `--profile` for isolation here — it only binds at the daemon's first launch and is ignored afterward ("--profile ignored: daemon already running"). CDP-attach sidesteps that entirely.
- **`agent-browser close --all` is unscoped** — it kills every session on the machine, including other conversations' windows. Only ever `agent-browser close <session>`.

Launch helper: `apps/snooze-website/scripts/launch-kajabi-cdp-lanes.sh [N] [BASE_PORT]`.

---

## 2. Human login (the only gate that needs the operator)

After launching, the operator logs into Kajabi admin **by hand** in each window (same admin account is fine). Go via the dashboard the window lands on; **never** click into `app.kajabi.com/login` directly (that path is what the WAF blocks). Human navigation seeds the Cloudflare clearance cookie for that profile.

Each lane teammate then confirms auth by snapshotting the **already-loaded** page (no `open`). If a window shows a 406/error page, the operator re-navigates it by hand — the agent must not retry navigation.

---

## 3. Working admin navigation (no 406)

Once a human has the window on an authenticated admin page, the agent moves **only by in-app clicks** — never a top-level `open`/`goto`/`reload` of a kajabi URL. Proven path to a website page's code:

1. Top **Search / quick-jump** → type "Pages" → **Website Pages** tab (lands `/admin/sites/<siteId>/website_pages` via in-app nav).
2. `scrollintoview` the page-title link, then click it. **Snapshot refs renumber on scroll**, so re-snapshot and use the fresh ref if a click silently no-ops. The title link often sits below the fold; a click at stale coordinates hits nothing.
3. Lands in the Encore builder (`/admin/themes/<themeId>/settings/edit?theme_file_id=<N>`).
4. Sections panel → **"Custom Code"** section → **"Custom Code"** block → a single `.ace_editor` (index 0) holding the full page HTML.
5. **Ace mounts ~1s after clicking the block.** The first diagnostic eval may return `[]`; wait ~1s / re-click, then it appears.

**Theme-wide Custom Code (CSS/JS):** field `settings-css-input` (CSS) / `settings-js-input` (JS) on the website theme. It lives in the theme code editor. The caret dropdown that opens it (`Design → theme card → "Modify code"`) **does not respond to synthetic CDP clicks**, and the raw-theme-file editor route is **plan-gated** on this account. Reliable path: the **operator opens the theme Custom Code CSS editor by hand** in one lane's window, then the agent does the eval-paste + Save-click (both of which work fine once the editor is on screen).

---

## 4. Token-safe paste + save

Never carry file bytes through model context. Use the helper (bytes flow disk → python → shell → Ace):

```bash
agent-browser --cdp <port> --session <lane> \
  eval "$(python3 apps/snooze-website/scripts/emit_paste_js.py <FILE> --target ace --index <N>)"
```

- The eval returns `{ok, length, expected, sha256prefix}`. Require `ok:true` AND `length == expected`. If not, STOP — do not Save a partial paste. (`length` is the character count; the file's byte size on disk may be a few bytes larger for multi-byte UTF-8 — that is expected, not a mismatch.)
- Pick the right editor with the diagnostic eval (counts + first-40/60 chars, never full content):
  ```bash
  eval "JSON.stringify(Array.from(document.querySelectorAll('.ace_editor')).map((e,i)=>({i,len:window.ace.edit(e).getValue().length,head:window.ace.edit(e).getValue().slice(0,60)})))"
  ```
  Page HTML editor = the one whose head is `<!DOCTYPE html>`. Theme CSS editor = the one whose head is the `SNOOZE UNIFIED THEME` / `Custom CSS Added Via Theme Settings` banner.
- **Save** = click the top-right Save button (a trusted click; works via CDP). If a "Changes Detected" modal appears click **"Keep Editing"**, never Reload. Persistence signal = the Save button greys to disabled (no toast text in the DOM).

---

## 5. The `<body>` vs `<div>` wrapper trap (CRITICAL)

Kajabi custom-code blocks are HTML **fragments**, not documents. **Kajabi strips any `<body>` tag.** A page whose content is wrapped in `<body id="X-page">` therefore produces **no `#X-page` element** in the live DOM — content renders under Kajabi's own `encore-theme → section-* → block-*` wrappers. Any theme CSS scoped to that id (`#X-page …` or `:is(#chooser-page,…)`) then matches nothing.

- The page wrapper MUST be **`<div id="X-page">`** (per root `AGENTS.md` §5, and matching the live `#home-page`, which works). Never `<body id>`.
- This is invisible to a curl 0-missing check (the literal `<body id>` text still appears in the served HTML). It only shows under `getComputedStyle`. **Always visually verify a scoped component renders** (see §6).
- When ADDING a page, two coupled changes: (1) wrap content in `<div id="X-page">`; (2) add that id to the guide scope selector in the single global `kajabi-deployment/global/css/theme-custom-code.css` (`:is(#chooser-page,#age-newborn-page,…,#catnapping-page)`). A wrapper without the CSS scope, or CSS scope without the wrapper, both render bare.

---

## 6. Verification (deterministic, orchestrator-run, never self-report)

Per surface, in Bash:

1. **Content:** `apps/snooze-website/scripts/verify-live-page.sh <slug> <repo-file>` → must print `0 missing lines`.
2. **Wrapper actually live:** curl the page and confirm `<div id="X-page">` is served and `<body id="X-page">` is NOT.
3. **Scoped CSS renders** (the check curl can't do): in a browser lane, `getComputedStyle` on a scoped component — e.g. `.step-card` backgroundColor should be `rgb(255,255,255)`, not transparent; `.credential-chip` padding non-zero. Confirm `document.querySelectorAll('#X-page .<component>').length > 0`.
4. Theme CSS: it can't be read via MCP (`get_theme_content` 200KB cap); confirm by grepping a public page's served `<style>` for a distinctive new selector (e.g. `.credential-chip`, `#chooser-page`).

The orchestrator runs these independently; acceptance never rests on a teammate's report.

---

## 7. Orchestration shape (who does what)

- **Orchestrator (Opus):** gates, dispatch, independent curl verification, run log, memory. Never runs agent-browser inline.
- **One sonnet teammate per lane**, driven via SendMessage, persistent across its assigned surfaces (disjoint per lane). Cap ~3-4 surfaces per spawn; on cap, write a handoff file and spawn a fresh successor on the same lane.
- Lane teammates STOP and report on any ambiguity (406, missing editor, no code field) rather than improvise on the live site.
- Optional pre-flight: a throwaway "topology probe" teammate can prove `--cdp` + unique-`--session` isolation against `about:blank`/`example.com` before real lanes launch (no Kajabi, zero risk).

---

## 8. Failure modes → recovery

| Symptom | Cause | Recovery |
|---|---|---|
| "Sorry, you have been blocked" (Cloudflare) | headless / fresh cookieless profile | real headed Chrome + human login (§1-2) |
| HTTP 406 "This page isn't working" | cold automated nav to a kajabi URL | human re-navigates the window by hand; agent never retries `open` |
| All lanes drive one tab | missing/duplicate `--session` | unique `--session` per lane; check `session list` |
| `close --all` killed other windows | unscoped close | only `close <session>`; relaunch + human re-login |
| Click silently no-ops | stale ref after scroll, or off-viewport link | `scrollintoview` + re-snapshot + fresh ref |
| Diagnostic eval returns `[]` | Ace not mounted yet | wait ~1s after clicking the block, retry |
| Page verifies 0-missing but renders unstyled | `<body id>` wrapper stripped (§5) | change to `<div id>`, re-paste, re-verify with getComputedStyle |
| Can't reach theme CSS editor | caret dropdown ignores CDP clicks; raw editor plan-gated | operator opens it by hand; agent pastes from there |
| "Changes Detected" modal loops; Save never greys; paste silently doesn't persist | **concurrent Save against the same shared theme** from another lane (all website pages share one theme; parallel saves collide on the theme version) | **paste in parallel, but SAVE one lane at a time.** Quiesce the other lanes, then re-Save the held paste (it commits cleanly, no modal). Verify server-side by curl, never by the greyed-button signal alone. (Proven 2026-07-10 age-hub push.) |
| cursor grok lane aborts: "Too many MCP tools enabled for this model" | session MCP set exceeds grok's tool ceiling | `cursor-agent mcp disable <server>` for all servers during the grok dispatch, re-enable after; or use a gpt-codex model (tolerates the full set). Log `$?` explicitly on background dispatches — the wrapper exit-0 masks the agent's real exit. |

---

## 9. Scripts

- `apps/snooze-website/scripts/launch-kajabi-cdp-lanes.sh [N] [BASE_PORT]` — launch N headed Chrome lanes to `about:blank`.
- `apps/snooze-website/scripts/emit_paste_js.py <file> --target ace [--index N]` — token-safe Ace paste (existing).
- `apps/snooze-website/scripts/verify-live-page.sh <slug> <repo-file>` — curl 0-missing content check.
