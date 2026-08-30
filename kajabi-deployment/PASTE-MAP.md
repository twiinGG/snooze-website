# Kajabi paste map (source of truth)

**Updated:** August 29, 2026
**Last live verify:** **August 27, 2026**, the site-wide Header Page Scripts field, website theme CSS,
website theme JavaScript and primary Camp theme CSS and JavaScript were read from Kajabi and
compared against their complete single-file repo paste targets. All five match byte-for-byte.
The primary Camp JavaScript is `website-v1.5.4`, 26,158 characters, SHA-256
`02e75084c92c02f7e06261512142733c7bd9649982828226332b2aa8cacb3d89`. A cache-busted live Meta
journey retained acquisition parameters through the capacity CTA and checkout, kept one GA4 client
and session id and produced no duplicate browser events. Earlier entry: **2026-08-25**, the six Camp Snooze landing paste targets (hero next-camp
banner): both landing custom-code blocks plus Custom CSS and JS on themes `2164288957` and
`2164775842`, each confirmed by cache-busted curl with every non-blank repo line present, and a live
DOM read showing the hero and the capacity card on the same date from the same feed. Earlier entry:
**2026-08-17** (ME-010), the two identity-capture paste targets only. Site header
and checkout Header both re-pasted and confirmed live by cache-busted read: `SnoozeCheckoutIdentity`
present, `function gaSessionId` present, the fixed `match(/^s?(\d+)/)` session id parse present, and the
old `return segs[2]` absent, on both `/catnapping` and a live offer checkout. Checkout Footer confirmed
**still empty**, which is correct, see row A5. Earlier entry: **2026-08-16**, ten fields read off the live screens and diffed both directions with `live-capture/check-live-vs-repo.mjs`. Nine matched git exactly. The two exceptions are recorded: `linktree-landing-page.js` was a 1-byte placeholder in git and has been restored from live, and the checkout Header field is behind git by exactly the new identity capture block. Previous entry was 2026-07-31 (curl + whitespace-normalized CSS match; Kajabi MCP for Store CMS + membership checkouts)
**App:** [`apps/snooze-website/kajabi-deployment/`](./)

> ## Paste from the branch you edited, not from the default checkout
>
> **Near miss, 2026-08-17 (ME-010).** The site header and checkout Header fields were both pasted from
> `/Users/kadegreenland/Snooze-OS`, the default working checkout, which was sitting on an unrelated
> feature branch that **predated the checkout identity capture block entirely**. Both pastes therefore
> deleted the identity block from live. Caught within minutes by a cache-busted read: `gaSessionId` and
> `SnoozeCheckoutIdentity` both returned **0** occurrences on `/catnapping` and on a live checkout,
> having been present twenty minutes earlier. Re-pasted from the correct branch and re-verified.
>
> **Before pasting any field, confirm which branch the file you are copying is on.** A worktree at
> `~/.worktrees/Snooze-OS/<phase>` and the default checkout at `~/Snooze-OS` hold different content
> whenever they are on different branches, and the file path looks identical apart from the prefix. A
> cheap guard is to grep the file for a marker you expect the current work to contain before copying it.
>
> This is the same failure family as the 2026-08-16 near miss where a paste from a repo file holding one
> of three live blocks nearly deleted the other two. That one was about composing a field from the wrong
> file; this one is about reading the right file from the wrong branch.

Git is the source of truth. Kajabi is the render surface. **One repo file per paste target.** Never compose a field from two files at paste time. Edit the canonical file in git, then whole-field overwrite.

> **This map identifies surfaces; it does not grant write authority.** Status notes age, and historical
> rollout steps remain only as evidence. Before every future Kajabi or analytics mutation, run the named
> preflight, reconcile live state in both directions, capture a lossless preimage, obtain approval for the
> exact target and value, save serially, verify cache-busted live output and retain the rollback. A row
> marked ahead, drift or paste never overrides those gates.

Authoritative detail:
- Contract: [`CODE-SURFACE-CONTRACT.md`](../docs/technical/CODE-SURFACE-CONTRACT.md)
- Surface rules: [`KAJABI-SURFACE-CODE-SETUP.md`](../docs/technical/KAJABI-SURFACE-CODE-SETUP.md)
- Checkout tracking how-to: [`KAJABI-CHECKOUT-TRACKING-CODE.md`](../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md)
- Older CU-001 stage notes (checkboxes may be stale): [`../docs/BATCH-1-PASTE-GUIDE.md`](../docs/BATCH-1-PASTE-GUIDE.md)

---

## 0. Status board (2026-08-08 baseline, reconciled 2026-08-29)

### Membership release changes

| # | Kajabi location | Admin path | Canonical file(s) | Reaches | Live vs repo | Re-paste? |
|---|---|---|---|---|---|---|
| A1 | Settings → Site Details → **Header Page Scripts** | [`Site Details`](https://app.kajabi.com/admin/sites/2148291177/edit/site-details) | [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html) | Website + landing pages | **MATCH, read back August 27, 2026:** 82,632 chars, SHA-256 `4313067418d8dfdd09ec25d1faa804b50ccce96d6a6ab88a15573626b5ba2de4` | No |
| A2 | Customizer → Theme Custom Code → **CSS** | [website theme `2156873377`](https://app.kajabi.com/admin/themes/2156873377/settings/edit) | [`global/css/theme-custom-code.css`](./global/css/theme-custom-code.css) | Website pages only | **MATCH, read back August 28, 2026:** 399,905 source chars, SHA-256 `85cbf54a401de1f68a3010d6e4ee731c2ee918ffdaaa5c5cdb1f65e29a8a39a4` | No |
| A3 | Customizer → Theme Custom Code → **JS** | [website theme `2156873377`](https://app.kajabi.com/admin/themes/2156873377/settings/edit) | [`global/js/theme-custom-code.js`](./global/js/theme-custom-code.js) | Website pages only | **MATCH, read back August 27, 2026:** 4,325 chars, SHA-256 `30766a6563fbae2db479832c3ede9df6201af489dd16c1957f8284856e2311d5`. This field applies across website pages and exits safely without `#home-page` | No |
| A4 | Settings → Checkout → **Header tracking code** | [`Checkout Settings`](https://app.kajabi.com/admin/sites/2148291177/edit/checkout-settings) | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | Every checkout (when inject_header is true) | **MATCH and protected:** loader, Meta matching, UTM capture and identity capture. Unchanged by the August 27 campaign repair | No |
| A5 | Settings → Checkout → **Footer tracking code** | [`Checkout Settings`](https://app.kajabi.com/admin/sites/2148291177/edit/checkout-settings) | **No paste target.** [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) is historical rollback/test evidence only | Every checkout (when inject_footer is true) | **DELIBERATELY CLEARED 2026-08-16 (ME-009), re-verified empty 2026-08-17 (ME-010).** The field is empty on purpose. It previously held the order-bound purchase script, which had never fired. Purchase is now owned by the server-side n8n path | **NEVER.** Pasting it back re-creates a second purchase emitter beside the server-side path and double counts every order. Row **P3** used to contradict this and told a reader there were 90 lines to keep; that row is now closed and points here |
| A6 | Website theme → Header → **Call to action** | [live website theme](https://app.kajabi.com/admin/themes/2156873377/settings/edit#/sections/header/blocks/1767079787493) | [`global/native-header-call-to-action.json`](./global/native-header-call-to-action.json) | Website pages using the native Header | **MATCH, read back August 29, 2026:** `Start Here`, URL action, `/snooze-membership`, same-tab. This is the ratified public-header source of truth | **No current write.** The chosen state is already live. Any later change needs the shared-theme lock, field preimage, exact approval, serial save and all-breakpoint verification |
| A7 | Historical custom navigation source | **No current paste target** | [`global/html/navigation.html`](./global/html/navigation.html) | None | Dormant alternative navigation; its `Start here` route and structure are not the live native Header | **DO NOT PASTE.** It is retained as historical/source evidence, not deployment authority. Rebuild and approve against A6 before any future activation |

### A4: the "loader only" note was wrong, and a paste from the old repo file would have deleted live code

**Found 2026-08-16, before pasting, by reading the live field rather than trusting this map.**

Rows A4 recorded the checkout Header tracking code as a MATCH containing the "GTM/Stape loader
only". The live field actually holds **8,027 characters in three blocks**:

| Block | Lines | Was it in the repo file? |
|---|---|---|
| GTM / Stape custom loader | 1 to 5 | yes |
| Meta Advanced Matching, `window.SnoozeMetaMatch`, SHA-256 hashing and event-id dedup | 7 to 133 | **no**, it lived only as the un-inlined fragment `global/js/meta-advanced-matching.js` |
| UTM attribution capture, `snooze_utm_attribution`, 30 day first touch | 135 to 238 | **no. It existed nowhere in this repository at all** |

The repo file held only the loader, 1,484 bytes. A whole-field overwrite from it would have deleted
Meta Advanced Matching and the UTM attribution capture from every live checkout. The UTM block feeds
the attribution join, so ME-008 would have broken the thing it is being built to fix.

`global/html/checkout-header-tracking.html` has been rebuilt from the live capture with exactly one
line changed, the loader. Verified line by line: 239 live lines against 238 rebuilt lines, one
differing line, both `<script>` blocks pass `node --check`.

**The lesson, and it now applies to every row in this map.** Checking that repo lines appear in live
only detects additions. It cannot detect deletions. **Diff both directions before any whole-field
overwrite**, and read the field itself rather than trusting a "MATCH" note written weeks earlier.

**Still open:** the UTM attribution capture block has no owner document and no test. It reached
production without ever entering git.

### Legal and policy pages (added 2026-08-29)

These had **no row in this map at all** until August 29, 2026, which is why establishing what owned `/terms-conditions` needed a live fetch.

| # | Kajabi location | Admin path | Canonical file | Reaches | Live vs repo | Re-paste? |
|---|---|---|---|---|---|---|
| L1 | Website theme -> Terms page -> **Text** block (TinyMCE) | [theme `2156873377`, file `2931909141`](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=2931909141) | [`pages/website/terms-conditions/PASTE-terms-conditions-block.html`](./pages/website/terms-conditions/PASTE-terms-conditions-block.html) | [`/terms-conditions`](https://www.joinsnooze.com/terms-conditions) | **MATCH, pasted and verified August 29, 2026.** 23,695 chars. Sections 5A (consults) and 5B (Camp) added, dual currency corrected | No |
| L2 | Website theme -> FAQs page -> **Custom Code** block (Ace) | [theme `2156873377`, file `2948173435`](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=2948173435) | [`pages/website/faq/the-sleep-concierge-faq-page-complete.html`](./pages/website/faq/the-sleep-concierge-faq-page-complete.html) | [`/the-sleep-concierge-faq`](https://www.joinsnooze.com/the-sleep-concierge-faq) | **MATCH, pasted and verified August 29, 2026.** 36,609 chars, both JSON-LD blocks valid | No |
| L3 | Website theme -> Privacy Policy page -> **Text** block (TinyMCE) | [theme `2156873377`, file `3241379217`](https://app.kajabi.com/admin/themes/2156873377/settings/edit?theme_file_id=3241379217) | not captured, pre-image only | [`/privacy-policy`](https://www.joinsnooze.com/privacy-policy) | Section `1764977266941`, block `1730252376707_0`. Formatting changed August 30, 2026. Pre-image in [`_live-preimages/privacy-policy/`](./_live-preimages/privacy-policy/) | Capture a paste target before any content edit |

**The Terms page is TinyMCE, not Ace.** Its backing `<textarea>` is not what the builder saves from, so writing the textarea directly is a silent no-op. Use `emit_paste_js.py --target tinymce`, added the same day. TinyMCE also normalises a literal U+00A0 to `&nbsp;`, so expect a small length delta on the verify and check it is only that.

Pre-images live in [`_live-preimages/terms-conditions/`](./_live-preimages/terms-conditions/), [`_live-preimages/faq/`](./_live-preimages/faq/) and [`_live-preimages/privacy-policy/`](./_live-preimages/privacy-policy/).

**Reading-width standard, set August 30, 2026 (Kade).** The Snooze Social terms landing page reads more easily than the main policy pages did, and the reason is measure: it renders in a `col-8` column where Terms and Privacy were `col-10`. On a 1260px container that is roughly 840px of text instead of 1050px, which is much closer to a comfortable line length. Both policy pages are now `col-8`, set through the block `width` setting, and any new policy page should match.

The same pass removed a stray line from the top of both pages. Each had the SEO page title repeated as a body paragraph above the `<h1>`, rendering as a floating "Terms and Conditions | Snooze - Baby Sleep Support" above the real heading. Gone from both.

**Opening a Text section in the builder needs a DOM click, not a snapshot ref.** Snapshot refs on this screen go stale between the snapshot and the click and the click silently no-ops. What works: `[...document.querySelectorAll('a,button,[role=link]')].filter(e => e.textContent.trim() === 'Text')`, click index 0 for the section, then re-run and click the last match for the block. The TinyMCE editor mounts about a second later.

**Checkout policy blocks** are a separate family and are mapped in their own files, not here: [`pages/checkout/consults/README.md`](./pages/checkout/consults/README.md) covers 17 consult checkouts, [`pages/checkout/camp/README.md`](./pages/checkout/camp/README.md) covers 6 Camp checkouts. All 23 are written through the Kajabi MCP `update_theme_content`, not through the browser.

### A1: the "membership release" gate is retired, 2026-08-16

Rows A1 carried "Yes, with the membership release" from 2026-07-27. **That gate is stale and has
been removed.** `https://www.joinsnooze.com/snooze-membership` returns HTTP 200 and appears in the
live navigation, so the membership release shipped, around 2026-08-08.

The gate was not retired on that reasoning alone. Every substantive line of the repo file was
compared against the live page on 2026-08-16: 480 lines of 45 characters or more, of which 22 are
absent from live. All 22 are ME-007's currency, surface and `cta_click` fixes plus the Cookie
Keeper loader. **Not one line of membership CTA drift remains.**

Re-run the check before pasting, because it costs nothing and this note will age too.

### A1: historical drift from August 18, closed August 27, 2026

Camp 15 launch repo cleanup found that the currency-toggle script embedded in this file mapped the
program-level Camp pair, offer `2151342069` to `2151342068` and checkout token `JqoPWuzv` to `mzwFzpg5`,
and carried `2151342068` in `audOfferIds`. That pair was **deleted** in Kajabi on August 17 to 18, 2026
(not merely unpublished); see `docs/strategy/paid-scaling/4_working/2026-08-organic-harvest/DECISIONS-2026-08-17-KADE.md`
R3. The existing Camp mapping, `2150884129` to `2150946767` / `K3Y6FEKX` to `46Bz9tk6`, already covers
the live destination, so the dead entries were removed rather than remapped. The mirror file
[`global/js/currency-toggle.js`](./global/js/currency-toggle.js) (not a paste target, test extract only
per §E) got the identical edit so the two stay in sync.

**Closed August 27, 2026.** The complete Header Page Scripts field was reconciled in both directions,
pasted once and read back after leaving and reopening [`Site Details`](https://app.kajabi.com/admin/sites/2148291177/edit/site-details).
It now matches the single repo paste target byte-for-byte. The public Camp journey still uses
`46Bz9tk6` for AUD and no longer carries the deleted mappings.

### A2: two things that will waste your time if you do not know them

Both learned first-hand on 2026-08-07, after three saves were silently lost.

**1. "Save greys out" does NOT mean it saved.** The Customizer sends an `updated_at` optimistic-concurrency token with `PUT /admin/themes/<id>/settings`. An editor that has been sitting open on a stale token gets **HTTP 409 Conflict**, and the UI swallows it completely: no toast, no modal, and the Save button greys to `disabled` exactly as if the save had succeeded.

> **Reload the theme settings page immediately before pasting**, and **verify on the live site**, never on the Save button.

Verification that actually proves it, on any live website page:

```bash
curl -sS "https://www.joinsnooze.com/catnapping?cb=$RANDOM" \
  | python3 -c "import sys,re; h=sys.stdin.read(); i=h.find('Custom CSS Added Via Theme Settings'); s=h.rfind('<style',0,i); e=h.find('</style>',i); b=h[s:e]; print('chars',len(b),'braces',b.count('{'),b.count('}'))"
```

Kajabi wraps the pasted file in `/* Custom CSS Added Via Theme Settings */` and trims the source's leading indentation. For the current file expect **399,960 live block chars and 2449 balanced braces**. After removing the wrapper, leading indentation and final newline variance, the live block must hash-match the repo source.

**2. Getting to the editor.** Design → caret → "Modify code" ignores synthetic clicks, which is why this was once thought to need a human for every paste. It does not. From inside the Customizer (`/admin/themes/<id>/settings/edit`), **Settings → Custom Code** mounts `settings-css-input` in two ordinary clicks and survives a page reload.

### A5: the footer field held a dormant second purchase emitter, and is now cleared

**Measured 2026-08-16 by reading the live screen**, after three separate notes in this file recorded
it as empty. It holds 90 significant lines, byte-identical to
[`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js). It has been live
since about 2026-07-11, which `01-ROOT-CAUSE-AND-BLACKOUT.md` already said; this file was the outlier
and is now corrected.

It is **inert**, not harmless. Line 37 is `if (typeof Kajabi === 'undefined' || !Kajabi.order) return;`
and `Kajabi.order` is null on every page the field injects into, which is the whole reason order
tracking moved to the server. So it returns on every run today.

**Why it still matters.** If it ever did run, it pushes `event: 'purchase'` with
`transaction_id: orderId`, the Kajabi **order** id. The server-side path in ME-009 keys on
`payment_transaction.id`, a different number. Two emitters with different ids do not deduplicate:
Meta would count the order twice because the `event_id` values differ, and GA4 has no deduplication
primitive at all. That is a money bug waiting on a Kajabi behaviour change nobody controls.

**Resolved 2026-08-16: the field was cleared**, on Kade's instruction to resolve it as seen fit.
Nothing was lost, because it had never fired. It removed the last browser surface that could emit a
second purchase, ahead of the server-side path going live.

A byte-exact copy of what was live at the moment of clearing is in the run scratchpad, and
[`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) is the same
content, kept in git as history.

**Do not paste that file into this field again.** If a browser purchase path is ever wanted back, it
needs a new decision and a dedup scheme shared with the server path, because the two key on
different ids.

Verified after clearing by a cache-busted read of the live checkout: `AUD_OFFER_IDS` and
`TRIAL_OFFER_IDS` both absent, while the header field's four blocks all still load.

### Checkout header compose order (A4)

**That claim was wrong and is corrected here.** The repo file holds four script blocks: the GTM/Stape loader, Meta Advanced Matching (`window.SnoozeMetaMatch`), the UTM attribution capture, and the checkout identity capture (`window.SnoozeCheckoutIdentity`). The first three were rebuilt from a live read and the fourth subsequently shipped; all four matched live on August 27, 2026. **Read the live field and diff both directions before any approved overwrite.** Checking that repo lines appear in live detects additions only and is blind to deletions, which on 2026-08-16 nearly deleted two live blocks.

Historical note: Meta Advanced Matching later shipped inline as part of the protected four-block A4
file. The standalone [`global/js/meta-advanced-matching.js`](./global/js/meta-advanced-matching.js)
remains a fragment, not a paste target. Do not append it or overwrite A4 without an approved,
whole-field change and a fresh two-way diff.

Short pointer: [`global/checkout-tracking/README.md`](./global/checkout-tracking/README.md).

### TO DO

| # | Status | What to do | Where | Repo / replacement text |
|---|---|---|---|---|
| **P5** | **DONE** (closed 2026-08-09) | Nothing; preserve as completed evidence | superseded: `/store` is no longer the native-builder page this row described | `Weekly group coaching and replays` returns 0 on live `/store` and 0 in [`pages/website/StoreV2/store-page-v2.html`](./pages/website/StoreV2/store-page-v2.html), verified 2026-08-09. The StoreV2 deploy replaced the text block this row pointed at |
| **P3** | **CLOSED, NEVER PASTE** (2026-08-16, re-verified 2026-08-17) | Nothing. The field stays empty | **Settings → Checkout** → **Footer tracking code** | See **row A5** and the warning below it. [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) is **NOT a paste target**. ME-009 cleared this field on purpose because it held an order-bound purchase emitter that had never fired, and purchase is now owned by the server-side n8n path. Pasting it back creates a second purchase emitter and double counts every order. Verified empty by a cache-busted read of a live checkout on **2026-08-17**: `AUD_OFFER_IDS` absent |
| **LIB** | **TO DO (confirm first)** | Logged-in compare before any paste | <https://www.joinsnooze.com/snooze-library> · page **2156716053** (`authenticated_only`) | [`pages/website/library/library-page.html`](./pages/website/library/library-page.html) · Public verify blocked (403) |
| **P6** | **HOLD** | Pull day-pass theme css+js from live before editing | Day-pass offer theme CSS + JS fields | Missing under [`pages/checkout/day-pass-offer/`](./pages/checkout/day-pass-offer/) |
| **P7** | **SUPERSEDED** | Nothing; Advanced Matching is already inline in the protected four-block A4 field | **Settings → Checkout** → **Header tracking code** | A4 matched the complete repo target on August 27. The standalone [`meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) is not a paste target |

### DONE (live MATCH; do not re-paste)

| # | Status | Surface | Evidence (2026-07-31) |
|---|---|---|---|
| **P1** | **DONE; superseded by fresh A2 evidence** | Theme CSS (A2) | The August 13 WS-006 note required a paired paste at that time. A2 was subsequently read back and matched byte-for-byte on August 28, 2026. No current write is authorised |
| **P2** | **DONE** | Consultations | Book CTAs have **no** `data-checkout` (membership "Join" links still correctly use it). Credentials/prices present. |
| **P4** | **DONE** | Membership checkouts USD/AUD | MCP themes `2163485833` / `2166694709` block `1767316681231`: cleaned benefits; no "Weekly live group coaching" / "24/7"; USD says USD; AUD says AUD. |
| **A1** | **DONE** | Header Page Scripts | `keepOfferUrl` / `isPlaceholderHref` live on home; `GTM-KNRTH6P` ×1. |
| **A3** | **DONE** | Theme JS | Helpers present on home. |
| **A4** | **DONE** | Protected four-block checkout header | GTM/Stape loader, Meta matching, UTM capture and identity capture MATCH; inject_header **true**. |
| **Home** | **DONE** | Home body | No banned "Weekly Live Coaching" / "24/7 support". |
| **About** | **DONE** | About Sally | H1 "Hi, I'm Sally"; former paediatric nurse; `/snooze-library` present. |
| **Method** | **DONE** | The Snooze Method | H1 "The Snooze Methodology". |

**No live write is authorised by this status board.** P5 is complete. Every future write requires a
fresh preflight, preimage, exact mutation approval, rollback and cache-busted verification.

| Page | Canonical file | Kajabi target | Release state |
|---|---|---|---|
| Homepage | [`pages/website/home/home-page.html`](./pages/website/home/home-page.html) | Existing homepage full-page custom-code block | Live; verify against repo before proposing any future revision |
| Snooze Membership | [`pages/website/snooze-membership/snooze-membership-page.html`](./pages/website/snooze-membership/snooze-membership-page.html) | Existing Website Page at `/snooze-membership`, one full-width flush custom-code block | Live; member-facing revisions remain approval-gated |

The trial confirmation page and lifecycle email paste targets are documented in [`pages/checkout/7-day-trial-membership/README.md`](./pages/checkout/7-day-trial-membership/README.md) and its [`emails/README.md`](./pages/checkout/7-day-trial-membership/emails/README.md). They are member-facing drafts and require approval before activation.

---

## A. Site-wide fields (one file each)

| # | Kajabi location | Admin path | Canonical file | Reaches | Live vs repo | Action |
|---|---|---|---|---|---|---|
| A1 | Settings → Site Details → **Header Page Scripts** | [`Site Details`](https://app.kajabi.com/admin/sites/2148291177/edit/site-details) | [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html) | Website + landing pages | **MATCH, read back August 27, 2026:** SHA-256 `4313067418d8dfdd09ec25d1faa804b50ccce96d6a6ab88a15573626b5ba2de4` | No |
| A2 | Customizer → Theme Custom Code → **CSS** | [website theme `2156873377`](https://app.kajabi.com/admin/themes/2156873377/settings/edit) | [`global/css/theme-custom-code.css`](./global/css/theme-custom-code.css) | Website pages only | **MATCH, read back August 28, 2026:** SHA-256 `85cbf54a401de1f68a3010d6e4ee731c2ee918ffdaaa5c5cdb1f65e29a8a39a4` | No |
| A3 | Customizer → Theme Custom Code → **JS** | [website theme `2156873377`](https://app.kajabi.com/admin/themes/2156873377/settings/edit) | [`global/js/theme-custom-code.js`](./global/js/theme-custom-code.js) | Website pages only | **MATCH, read back August 27, 2026:** SHA-256 `30766a6563fbae2db479832c3ede9df6201af489dd16c1957f8284856e2311d5` | No |
| A4 | Settings → Checkout → **Header tracking code** | [`Checkout Settings`](https://app.kajabi.com/admin/sites/2148291177/edit/checkout-settings) | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | Every checkout (inject_header true) | **MATCH and protected:** loader, Meta matching, UTM capture and identity capture | No |
| A5 | Settings → Checkout → **Footer tracking code** | [`Checkout Settings`](https://app.kajabi.com/admin/sites/2148291177/edit/checkout-settings) | **No paste target.** [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) is historical rollback/test evidence only | Every checkout (inject_footer true) | **CLEARED 2026-08-16**, verified by a cache-busted read: `AUD_OFFER_IDS` absent from the live checkout. Re-verified absent **2026-08-17** | **NEVER.** See the warning below |

### A4 note

Live header is the protected four-block A4 target: GTM/Stape loader, Meta Advanced Matching, UTM
attribution capture and checkout identity capture. It matched the complete repo file on August 27,
2026. **Do not re-paste to sync.** [`meta-advanced-matching.js`](./global/js/meta-advanced-matching.js)
is a historical fragment, not a paste target.

---

## B. Website pages (shared theme 2156873377)

Enter customizer via <https://app.kajabi.com/admin/sites/2148291177/themes> → Customize → page dropdown. Deep links into the customizer 404.

| Page | Live URL | Page settings | Custom Code field | Repo file | Action |
|---|---|---|---|---|---|
| Home | <https://www.joinsnooze.com> | [2154679189](https://app.kajabi.com/admin/website_pages/2154679189/edit) | Section **`1768118757163`** Full Page | [`pages/website/home/home-page.html`](./pages/website/home/home-page.html) | **Live; no current write. Re-verify before an approved future revision** |
| About Sally | <https://www.joinsnooze.com/about-sally> | [2154679198](https://app.kajabi.com/admin/website_pages/2154679198/edit) | Whole-page custom code (confirm H1 before edit) | [`pages/website/about-sally/about-sally.html`](./pages/website/about-sally/about-sally.html) | **DONE** |
| 1:1 Consultations | <https://www.joinsnooze.com/one-on-one-sleep-consultations> | [2155283958](https://app.kajabi.com/admin/website_pages/2155283958/edit) | Section/block **`1765189516514`** only | [`pages/website/consultations/one-on-one-consultations-page.html`](./pages/website/consultations/one-on-one-consultations-page.html) | **DONE** |
| Snooze Library | <https://www.joinsnooze.com/snooze-library> | [2156716053](https://app.kajabi.com/admin/website_pages/2156716053/edit) | That page’s Custom Code block(s) | [`pages/website/library/library-page.html`](./pages/website/library/library-page.html) | **TO DO: confirm logged-in** |
| Store | <https://www.joinsnooze.com/store> | [2154679200](https://app.kajabi.com/admin/website_pages/2154679200/edit) | Custom-code page, wrapper `#store-page-v2` | [`pages/website/StoreV2/store-page-v2.html`](./pages/website/StoreV2/store-page-v2.html) | **DONE** (verified live 2026-08-09) |
| Reviews | <https://www.joinsnooze.com/reviews> | [Website page list](https://app.kajabi.com/admin/sites/2148291177/website_pages); exact page ID unresolved | Section **`1781002775044`**, block **`1781002775044_0`** | [`pages/website/reviews-page/src/reviews-page.html`](./pages/website/reviews-page/src/reviews-page.html) | **Live wrapper and 164-review schema verified 2026-08-29. Local-only Organization `@id` correction remains gated; capture the exact full-field preimage and approval before any write** |
| Newborn Sleep Guide | <https://www.joinsnooze.com/newborn-sleep-guide> | [Website page list](https://app.kajabi.com/admin/sites/2148291177/website_pages); exact page ID unresolved | Section **`1765089660523`**, block **`1765056711075_0`** | [`pages/website/product-pages/newborn-guide/newborn-guide-landing-page.html`](./pages/website/product-pages/newborn-guide/newborn-guide-landing-page.html) | **Live footer still links `Your Account` to 404 `/account`; canonical source uses `/library`. Capture the exact full-field preimage and approval before any write** |

Guide / age / product pages under [`pages/website/`](./pages/website/) use the same shared theme CSS/JS (A2/A3). Paste each page’s own custom-code file only when that page’s body changed.

**Correction pass, 2026-08-09 (WS-003).** Two rows in this matrix were wrong and one was missing. Each was re-verified against live before editing, which mattered: the `/store` row was wrong in a *different* way than WS-002 recorded on August 8.

| Row | What this file said | What live actually serves | Evidence |
|---|---|---|---|
| Store | Native builder, no wholesale HTML file | Custom-code page, wrapper `#store-page-v2`, matching [`pages/website/StoreV2/store-page-v2.html`](./pages/website/StoreV2/store-page-v2.html) at **357 of 357 non-blank lines, 0 missing** | Cache-busted `curl` 2026-08-09 |
| Reviews | no row at all | Repo source exists at [`pages/website/reviews-page/src/reviews-page.html`](./pages/website/reviews-page/src/reviews-page.html) | Historical 2026-08-09 correction; superseded by the fresh 2026-08-29 rendered evidence and exact block IDs in the current matrix above |
| P5 Store copy | TO DO | The banned phrase returns 0 live and 0 in the repo source | Cache-busted `curl` 2026-08-09 |

`DEAD-END-REGISTER.md` D5, written 2026-08-09, records live `/store` as wrapper `#store-page` matching `store-live-twin.html` at 98%, and recommends deploying StoreV2. **That deploy has since happened**, so D5's finding and its recommendation are both closed. Neither [`pages/website/store/store-page.html`](./pages/website/store/store-page.html) nor [`pages/website/store/store-live-twin.html`](./pages/website/store/store-live-twin.html) matches live any more (both 138 of ~385 lines, and both still use the dead `#store-page` wrapper, for which the shared theme carries zero rules). Retiring those two files is a WS-001 task, not done here.

The third row WS-002 flagged, the nav "Join Snooze" target, is **not in this file**. It never was. That correction belongs to the "not defects" table in `DEAD-END-REGISTER.md`, which already records it correctly: all 14 navbars point at `/snooze-membership`, and nothing points at `z63s9VaR`. Re-confirmed on the live homepage 2026-08-09: 6 hrefs to `/snooze-membership`, 0 hrefs to `z63s9VaR`.

---

## C. Landing pages (own theme each)

Shape per page under [`pages/landing/<page>/`](./pages/landing/):

```
<page>.html  → that landing page’s custom-code block
<page>.css   → that landing page’s theme CSS field
<page>.js    → that landing page’s theme JS field
```

Pull from live before inventing files. Coverage: [`WS-001 overview`](../../../docs/projects/website-surfaces/00-overview.md).

| Landing | Live URL | Repo HTML | CSS in repo? | JS in repo? | Notes |
|---|---|---|---|---|---|
| `/links` (linktree) | <https://www.joinsnooze.com/links> | [`pages/landing/linktree/linktree-landing-page.html`](./pages/landing/linktree/linktree-landing-page.html) | yes | **NO, see below** | **The "only complete trio" claim is wrong.** `linktree-landing-page.js` is **1 byte**, the single character `l`, committed in ME-005 `e400ad085` and never noticed. Pull the live JS field before touching that page |
| Trial thank-you | Publish at the slug recorded in its metadata | [`pages/landing/7-day-trial-thank-you/thank-you-page.html`](./pages/landing/7-day-trial-thank-you/thank-you-page.html) | yes | yes | Shared redirect destination for both membership trial offers |
| The Snooze Method | <https://www.joinsnooze.com/the-snooze-method> | [`pages/website/snooze-method/the-snooze-method.html`](./pages/website/snooze-method/the-snooze-method.html) | inlined in HTML | n/a | File lives under `pages/website/` but **deploys as a landing page**. **DONE** (H1 Methodology) |
| Camp Snooze | camp landing | [`pages/landing/camp-snooze/`](./pages/landing/camp-snooze/) | partial | partial | Own theme; pull before overwrite |
| Day Pass / paid ads / cold traffic / snooze-access | respective URLs | under [`pages/landing/`](./pages/landing/) | mostly missing | partial | WS-001 WS1 |
| `annual-moment-v1`, `kic-partnership` | — | empty dirs | no | no | Pull from live first |
| **Camp confirm (post-purchase)** | **LIVE and published** at [`/camp-confirm`](https://www.joinsnooze.com/camp-confirm), page [`2152228966`](https://app.kajabi.com/admin/landing_pages/2152228966/edit), theme [`2167276583`](https://app.kajabi.com/admin/themes/2167276583/settings/edit) | [`pages/landing/camp-snooze-confirm/camp-confirm-page.html`](./pages/landing/camp-snooze-confirm/camp-confirm-page.html) | yes | yes | New in PM-006. The post-purchase surface where a Camp Snooze buyer confirms which camp they are in. **Paired change with the six camp offers' `post_purchase` redirect**, see C1 below |

### C1. Camp confirm page, and the paired offer redirect

> **Historical PM-006 execution record, not current write authority.** The state labels below were
> captured August 21–26 and must be freshly reconciled before any proposal. A future change requires
> the named preflight, preimages, exact-mutation approval, paired rollback and live verification.

PM-006 introduced three paste targets and one Kajabi setting change, and verification only passed when
all four were live. Half of that paired release would have left either a page nobody reached or six offers
pointing at nothing.

Source: [`pages/landing/camp-snooze-confirm/`](./pages/landing/camp-snooze-confirm/). One repo file per
field, whole-field overwrite, never composed at paste time.

| # | Kajabi target | Canonical file | State |
|---|---|---|---|
| C1a | The landing page's single full-width, flush custom-code block | [`camp-confirm-page.html`](./pages/landing/camp-snooze-confirm/camp-confirm-page.html) | **UNVERIFIED LOCAL-ONLY CLAIM dated 2026-08-26; no write authorised.** At that time the repo held a camp-component redesign while live held the August 25 version. Reconcile both directions before proposing a paired change |
| C1b | That landing page theme's **Custom CSS** field | [`camp-confirm-page.css`](./pages/landing/camp-snooze-confirm/camp-confirm-page.css) | **UNVERIFIED LOCAL-ONLY CLAIM dated 2026-08-26; no write authorised.** At that time the repo held a palette/component rewrite. Reconcile before proposing a paired change |
| C1c | That landing page theme's **Custom JavaScript** field | [`camp-confirm-page.js`](./pages/landing/camp-snooze-confirm/camp-confirm-page.js) | **IN SYNC, verified live 2026-08-26** by both-direction diff. Unchanged by the 2026-08-26 redesign: every id the script binds to was preserved, and its 53 assertions still pass |
| C1d | `post_purchase.preference` on **six** camp offers, switched from `custom_message` to `landing_page` pointing at this page | Not a repo file. Kajabi setting | **Done.** All six read `preference: landing_page`, `landing_page_id: 2152228966`, verified 2026-08-26. The dormant `body` on all six was also rewritten date-free that day, see C1e |

### C1e. The six offers' dormant post-purchase body, rewritten 2026-08-26

Every one of the six camp offers carried a `post_purchase.body` hardcoding **Camp Snooze #15, Friday 28
August 2026 and Monday 31 August 2026**. Because all six run `preference: landing_page`, that text is
**dormant and never shown to a buyer** — the redirect wins. It was still a trap: anyone flipping the
preference back to the custom message would have shipped a stale camp's dates to every buyer. Rewritten
date-free on all six, pointing at the confirmation email for the camp's own dates.

**The Kajabi offer API strips most tags from this field.** `h2`, `h3`, `ol`, `li` and `strong` were all
removed on the first write and the numbered list collapsed into one run-on paragraph. Only `p` survives,
so the body is now plain paragraphs with manual "1." numbering. Do not reintroduce rich markup here.

Offers: [`2150884129`](https://app.kajabi.com/admin/offers/2150884129/edit) USD,
[`2150946767`](https://app.kajabi.com/admin/offers/2150946767/edit) AUD,
[`2150947919`](https://app.kajabi.com/admin/offers/2150947919/edit) USD member,
[`2151264520`](https://app.kajabi.com/admin/offers/2151264520/edit) AUD member,
[`2151114090`](https://app.kajabi.com/admin/offers/2151114090/edit) multiples,
[`2151134284`](https://app.kajabi.com/admin/offers/2151134284/edit) AUD payment plan.

Page setup, same as the two sibling thank-you pages: section full width, code block flush, all section
padding zero, and hide the landing theme's default header and footer because the page carries its own.
Metadata in [`page-metadata.md`](./pages/landing/camp-snooze-confirm/page-metadata.md); the page is
noindex, nofollow and must not enter navigation or the sitemap.

**Do not paste any of these into an offer's own thank-you code field.** That field has no landing-page CSS
or JavaScript surface, which is the entire reason the design moved to a landing page.

The six offers for C1d, and it is six rather than the four the kickoff named. The product's own offer list
is the evidence:

| Offer | Internal title |
|---|---|
| [`2150884129`](https://app.kajabi.com/admin/offers/2150884129/edit) | `P_CM01_USD - Camp (USD)` |
| [`2150946767`](https://app.kajabi.com/admin/offers/2150946767/edit) | `P_CM01_AUD - Camp (AUD)` |
| [`2150947919`](https://app.kajabi.com/admin/offers/2150947919/edit) | `P_CM02 - Camp (Member Discount)` |
| [`2151264520`](https://app.kajabi.com/admin/offers/2151264520/edit) | `P_CM02_AUD_Camp Member Discount` |
| [`2151114090`](https://app.kajabi.com/admin/offers/2151114090/edit) | `P_CM03_USD - Camp Multiples (USD)` |
| [`2151134284`](https://app.kajabi.com/admin/offers/2151134284/edit) | `P_CM04_AUD - Camp PayPlan (AUD)` |

**Verification, and it passes only when the page is live AND all six offers point at it.** Run all three:

```bash
# 1. The page is live and carries the confirm widget. Cache-busted, desktop UA.
curl -s -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" \
  "https://www.joinsnooze.com/camp-confirm?cb=$(date +%s)" \
  | grep -c 'sn-cc-confirm-button'          # expect 1 or more

# 2. Its JS is on the page, not just its markup. Pick a marker that only this build has.
curl -s -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" \
  "https://www.joinsnooze.com/camp-confirm?cb=$(date +%s)" \
  | grep -c 'currentSiteUser'               # expect 1 or more

# 3. All six offers point at the same landing page id.
#    mcp__kajabi__get_offer on each of the six ids above; every one must return
#    post_purchase.preference == "landing_page" and the SAME landing_page_id.
```

A `grep -c` of `0` on step 1 or 2 means the paste did not land. Before concluding that, confirm the marker
actually exists in the repo file (`grep -c 'sn-cc-confirm-button' <file>`) rather than trusting this row:
a marker inherited from a stale note has produced two false alarms on this repo before.

**Do not verify the CSS by a whole-file line match.** Short declarations match anywhere in a large page and
a stylesheet can score every line "present" while telling you nothing. Use `#sn-cc-page` or a custom
property name unique to this file.

### Why the page needs a checkout setting to work at all

Worth knowing before anybody debugs the confirm button. The page identifies the buyer by reading
`window.Kajabi.currentSiteUser` and requiring `type === "Member"`, because Kajabi's REST API cannot resolve
an email address to a contact (`filter[email]` returns 200 and the newest 25 contacts, ignoring the filter,
tested 2026-08-21). A buyer with no session gets the sign-in state, not the confirm button.

What puts a fresh buyer in a session is **`Require new customers to create password at checkout`** on the
camp offers. **It is ON on all six as of 2026-08-21**, applied on Kade's decision and verified by reloading
each offer's Settings tab and reading `offer_collect_password_checkbox` back. If it is ever switched off, a
brand-new buyer reaches this page with no session and sees the sign-in state rather than the confirm button.
Check it before concluding the page is broken, because the symptom is a sign-in prompt rather than an
error.

### P3 Camp capacity and waitlist rollout record

> **Historical record, closed by the later per-row live evidence. Do not execute the rollout steps
> below.** Every row was marked repo-ahead-of-live on August 18, 2026, then the later rows record the
> paired pastes and read-backs completed August 21–27. Fresh evidence and exact-mutation approval are
> required before any future Camp write.

**CORRECTED 2026-08-21, page ids and source files both moved.** Two things in the original row were
wrong by the time anyone came to paste it.

**How the swap works, per Kade 2026-08-21.** There are two camp landing pages. The **`-WAITLIST` suffix
marks the parked page**; the active page holds the bare slug `camp-snooze-sleep-coaching`. Each page's
title describes the content it holds, so the title and the suffix together tell you what is live.

| Page | Title, describes its content | Slug today | State today |
|---|---|---|---|
| [`2151771543`](https://app.kajabi.com/admin/landing_pages/2151771543/edit) | Welcome to Camp Snooze, the **checkout / primary** content | `camp-snooze-sleep-coaching-WAITLIST` | **Parked** |
| [`2151845416`](https://app.kajabi.com/admin/landing_pages/2151845416/edit) | Join the Camp Snooze Waitlist, the **waitlist** content | `camp-snooze-sleep-coaching` | **Live** |

Verified 2026-08-21 by structure, not by title: curling `/camp-snooze-sleep-coaching` returns
`id="waitlist-section"` and no `id="pricing-section"`, and the `-WAITLIST` slug returns the reverse.

**So the waitlist page is what every paid click lands on today.** That is the funnel's current front door,
and it is why the launch needs both a paste and a swap, not a paste alone.

`STATE CORRECTION: this table paired page 2151771543 with camp-snooze-landing-page-blocks-waitlist.html
-> 2151771543 holds the CHECKOUT content. Pasting the waitlist HTML onto it would have put waitlist
markup on the checkout page and left the actually-live waitlist page untouched. The two rows below pair
each page with the file whose content it holds.`

Kade's ruling on which variant is primary: the **checkout variant is the primary camp page** and the
**waitlist variant is the backup**, kept for reinstating the waitlist later. Both files are maintained in
sync; only the primary is in the launch-critical path.

**The launch swap, concretely, and the order matters.** Kajabi will not hold one slug on two pages, so the
bare slug has to be freed before it can be claimed:

1. Paste the primary content onto page `2151771543` while it is still parked, and verify it on
   `/camp-snooze-sleep-coaching-WAITLIST`. Nothing a buyer sees changes yet.
2. Rename page `2151845416`'s slug to `camp-snooze-sleep-coaching-WAITLIST`. The bare slug is now free
   and, for those few seconds, serving nothing.
3. Rename page `2151771543`'s slug to `camp-snooze-sleep-coaching`.
4. Curl the bare slug and confirm it now returns `id="pricing-section"`.

Every ad URL, UTM and internal link keeps working throughout, because none of them change. Step 1 before
step 2 is what keeps the window between them down to the two renames rather than a paste.

| Row | Status | Kajabi field | Admin link | Whole-field repo source |
|---|---|---|---|---|
| P3-CAMP-LANDING-HTML | **IN SYNC, pasted and verified live 2026-08-25** (hero next-camp date banner; earlier that day, single-intake urgency change) | Primary camp page custom-code block | ["Welcome to Camp Snooze", page `2151771543`](https://app.kajabi.com/admin/landing_pages/2151771543/edit), measured 2026-08-22 on `/camp-snooze-sleep-coaching` | [`camp-snooze-landing-page-blocks.html`](./pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-landing-page-blocks.html) |
| P3-CAMP-WAITLIST-HTML | **IN SYNC, pasted and verified live 2026-08-25** (hero next-camp date banner). Backup surface. Live had drifted: the cohort select read "starts August 31, 2026" and "dates to be confirmed" for camps 16 and 17 | Waitlist variant custom-code block | ["Join the Camp Snooze Waitlist", page `2151845416`](https://app.kajabi.com/admin/landing_pages/2151845416/edit), measured 2026-08-22 on `/camp-snooze-sleep-coaching-WAITLIST` | [`camp-snooze-landing-page-blocks-waitlist.html`](./pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-landing-page-blocks-waitlist.html) |
| P3-CAMP-LANDING-CSS | **IN SYNC, pasted and verified live 2026-08-25** (`.camp-hero-next` styles) on both the landing theme `2164288957` and the waitlist theme `2164775842` | Camp landing theme Custom CSS | [Camp theme `2164288957`](https://app.kajabi.com/admin/themes/2164288957/settings/edit) | [`camp-snooze-v2-luxury.css`](./pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-v2-luxury.css) |
| P3-CAMP-LANDING-JS | **PRIMARY IN SYNC, pasted and read back August 27, 2026:** `website-v1.5.4`, 26,158 chars, SHA-256 `02e75084c92c02f7e06261512142733c7bd9649982828226332b2aa8cacb3d89`. Live Meta-path proof covered no initialisation event, one valid completed currency event and attribution retention on the late-rendered capacity CTA. The parked waitlist theme remains at its separately verified August 25 state and was outside this repair allowlist | Camp landing theme Custom JS | [primary Camp theme `2164288957`](https://app.kajabi.com/admin/themes/2164288957/settings/edit), [parked waitlist theme `2164775842`](https://app.kajabi.com/admin/themes/2164775842/settings/edit) | [`camp-snooze-v2-luxury.js`](./pages/landing/camp-snooze/camp-snooze-v2-luxury/camp-snooze-v2-luxury.js) |
| P3-CAMP-CHECKOUT-HTML | **IN SYNC, re-pasted and verified live 2026-08-25** (Intake Closes row) | Checkout custom-code block below the form | [USD offer `2150884129`](https://app.kajabi.com/admin/offers/2150884129/edit), [AUD offer `2150946767`](https://app.kajabi.com/admin/offers/2150946767/edit) | [`camp-snooze-checkout-blocks.html`](./pages/checkout/camp-snooze-v2-luxury/camp-snooze-checkout-blocks.html) |
| P3-CAMP-MEMBER-CHECKOUT-HTML | **IN SYNC, re-pasted and verified live 2026-08-25** (Intake Closes row) | Member checkout custom-code block below the form | [USD member offer `2150947919`](https://app.kajabi.com/admin/offers/2150947919/edit), [AUD member offer `2151264520`](https://app.kajabi.com/admin/offers/2151264520/edit) | [`camp-snooze-member-checkout-blocks.html`](./pages/checkout/camp-snooze-v2-luxury/camp-snooze-member-checkout-blocks.html) |
| P3-CAMP-CHECKOUT-CSS | **IN SYNC, read back 2026-08-21** | Each offer theme Custom CSS | [USD `2150884129`](https://app.kajabi.com/admin/offers/2150884129/edit), [AUD `2150946767`](https://app.kajabi.com/admin/offers/2150946767/edit), [USD member `2150947919`](https://app.kajabi.com/admin/offers/2150947919/edit), [AUD member `2151264520`](https://app.kajabi.com/admin/offers/2151264520/edit) | [`camp-snooze-v2-checkout.css`](./pages/checkout/camp-snooze-v2-luxury/camp-snooze-v2-checkout.css) |
| P3-CAMP-CHECKOUT-JS | **IN SYNC, re-pasted on all four offers and verified live 2026-08-25** | Each offer theme Custom JS | [USD `2150884129`](https://app.kajabi.com/admin/offers/2150884129/edit), [AUD `2150946767`](https://app.kajabi.com/admin/offers/2150946767/edit), [USD member `2150947919`](https://app.kajabi.com/admin/offers/2150947919/edit), [AUD member `2151264520`](https://app.kajabi.com/admin/offers/2151264520/edit) | [`camp-snooze-v2-checkout.js`](./pages/checkout/camp-snooze-v2-luxury/camp-snooze-v2-checkout.js) |

#### Single-intake urgency pass, 2026-08-25

All seven camp rows above were pasted and read back on 2026-08-25. Every field was diffed live against
the repo before it was overwritten, with comments removed from both sides, and only the waitlist page
carried real drift (recorded in its row). Theme ids used: landing `2164288957`, waitlist `2164775842`,
checkout `2164289025` (USD), `2164667756` (AUD), `2164675367` (USD member), `2166737611` (AUD member).

Paste targets now ship comment-free (Kade's rule, same day). Comments live in
`notes/<filename>.NOTES.md` beside each file. `node scripts/kajabi/extract-comments.mjs --check <file>`
is the gate, wired to a pre-commit hook and a PreToolUse hook, so a re-paste from the repo is already
comment-free and no manual stripping step is needed.

Verify commands, run 2026-08-25, all six surfaces:

```bash
# Landing and waitlist: one card, with the deadline on it.
# Expect: ready cards=1, and an "Intake closes ..." line.
agent-browser open "https://www.joinsnooze.com/camp-snooze-sleep-coaching"
agent-browser eval "document.querySelector('[data-camp-capacity-widget]').textContent"

# All four checkouts: the close row is filled from the feed, not left on its fallback text.
# Expect: "Thursday 27 August at 11:59 pm Melbourne", never "the Thursday before camp".
for slug in K3Y6FEKX 46Bz9tk6 rVuLzkZa ENhg45mj; do
  agent-browser open "https://www.joinsnooze.com/offers/$slug/checkout"
  agent-browser eval "document.querySelector('[data-camp-cohort-close]').textContent"
done
```

#### Correction and open item, 2026-08-22 (PM-008 WS1b)

**The two landing rows had the pages the wrong way round.** They said the selling page was parked on
`/camp-snooze-sleep-coaching-WAITLIST` while the waitlist variant served `/camp-snooze-sleep-coaching`.
A live read on 2026-08-22 shows the opposite, and the right way round:
[`2151771543` Welcome to Camp Snooze](https://app.kajabi.com/admin/landing_pages/2151771543/edit) serves
`camp-snooze-sleep-coaching`, and
[`2151845416` Join the Camp Snooze Waitlist](https://app.kajabi.com/admin/landing_pages/2151845416/edit)
serves `camp-snooze-sleep-coaching-WAITLIST`. Both published, both updated 2026-08-21. The HTML blocks
themselves were not compared, so those rows stay DRIFT on content; only the path claim is corrected.

**P3-CAMP-LANDING-JS, two lines reconciled.** Kade pasted `audCheckoutUrl` with its missing `/checkout`
and `?limit=5` into the camp landing theme on 2026-08-22. Verified live: all five cohort cards render and
every CTA href is `https://www.joinsnooze.com/offers/46Bz9tk6/checkout?cohort=N`. The rest of the field
was not compared, so the row stays DRIFT.

**P3-CAMP-CHECKOUT-JS is now out of sync, and the mismatch is live.** The repo requests `?limit=5`; the
four offer themes still request `?limit=3`. The checkout resolves `?cohort=N` only within the window it
requests, so a cohort outside that window is silently replaced by the soonest camp. Measured live
2026-08-22:

**CLOSED 2026-08-22.** Kade pasted `?limit=5` into all four offer themes. Verified live on every camp
checkout, on every one of the four offers, by loading `?cohort=N` and reading the rendered order summary:

| Offer | Checkout slug | cohort 16 | cohort 19 |
|---|---|---|---|
| [AUD `2150946767`](https://app.kajabi.com/admin/offers/2150946767/edit) | `46Bz9tk6` | Camp Snooze #16 | Camp Snooze #19 |
| [USD `2150884129`](https://app.kajabi.com/admin/offers/2150884129/edit) | `K3Y6FEKX` | Camp Snooze #16 | Camp Snooze #19 |
| [AUD member `2151264520`](https://app.kajabi.com/admin/offers/2151264520/edit) | `ENhg45mj` | Camp Snooze #16 | Camp Snooze #19 |
| [USD member `2150947919`](https://app.kajabi.com/admin/offers/2150947919/edit) | `rVuLzkZa` | Camp Snooze #16 | Camp Snooze #19 |

On the AUD offer all five cohorts were checked and each rendered its own real start date: #15 Monday 31
August 2026, #16 Monday 14 September 2026, #17 Monday 28 September 2026, #18 Monday 12 October 2026, #19
Monday 26 October 2026. Those match `snooze_os.camp_cohorts.start_date` exactly for all five.

Regression cover for the parity rule:
`pages/landing/camp-snooze/camp-snooze-v2-luxury/tests/camp-checkout-url.test.mjs`.

**Not a defect, recorded so it is not chased again.** A "You already purchased Camp Snooze on 15 August
2026" line appears on the checkout with a fixed date. It is Kajabi's own `sage-banner__text` component,
shown only to a signed-in member who already owns the offer. It is not in any repo block and a new buyer
never sees it.

#### Measured live state, 2026-08-18, and how Kade verifies each paste

These seven rows are **not** paper drift. The live surfaces were read in a headed browser on
2026-08-18 and they disagree with the repo on the buyer-facing capacity number, which is the
number decision R6 changed to 15 families.

| Surface | Live said, 2026-08-18 | Repo says | Gap |
|---|---|---|---|
| `/camp-snooze-sleep-coaching` | "maximum 8 families", "Limited to 8 families", "8 spots per intake", and one "6 spots per intake" | "15 families per camp", five times | Live understates capacity by seven seats and carries two different stale numbers |
| AUD checkout `46Bz9tk6` | No capacity block at all. No Camp 15 date, no availability, no waitlist | Capacity block, "15 families per camp", live availability widget | The whole P3 block is absent live |
| USD checkout `K3Y6FEKX` | Same, nothing | Same as AUD | The whole P3 block is absent live |

So until these pastes land, an ad drives a buyer to a page promising 8 families while the seat
governor, the cohort table and the capacity feed all say 15. **This is a launch blocker and it
needs Kade in the Kajabi admin. No agent can paste it.**

**Verification, per row, run after saving.** The landing page is public so a cache-busted curl
works. Checkouts return HTTP 403 to curl, so those two are browser-only.

```bash
# P3-CAMP-LANDING-HTML, P3-CAMP-LANDING-CSS, P3-CAMP-LANDING-JS
# Expect: 15 families present, and every stale number gone.
URL="https://www.joinsnooze.com/camp-snooze-sleep-coaching?cb=$(date +%s)"
curl -s "$URL" | grep -c "15 families"          # expect 5 or more, never 0
curl -s "$URL" | grep -Eo "(maximum|Limited to|only) [0-9]+ families"   # expect no output
curl -s "$URL" | grep -Eo "[0-9]+ spots per intake"                     # expect no output
curl -s "$URL" | grep -c "camp-capacity"        # expect 1 or more, the capacity feed call
```

#### The four Camp checkout themes, pasted and verified 2026-08-21

All four rows above are now **in sync and proven live**. This closes the 2026-08-18 measurement
below, which recorded the whole P3 block as absent from both checkouts; it is present on all four.

Checkout theme per offer, which the admin does not put anywhere obvious. Each is reached from the
offer's edit page by the **"Edit checkout"** link, and the code sits in two places inside it:
the block HTML under `Sections → Checkout → Custom Code`, and the CSS and JS under
`Settings → Custom Code`, as Ace editors 0 and 1 of that panel.

| Offer | Reads | Checkout theme | HTML source |
|---|---|---|---|
| [`2150884129`](https://app.kajabi.com/admin/offers/2150884129/edit) USD, `K3Y6FEKX` | Camp Snooze | [`2164289025`](https://app.kajabi.com/admin/themes/2164289025/settings/edit) | `camp-snooze-checkout-blocks.html` |
| [`2150946767`](https://app.kajabi.com/admin/offers/2150946767/edit) AUD, `46Bz9tk6` | Camp Snooze | [`2164667756`](https://app.kajabi.com/admin/themes/2164667756/settings/edit) | `camp-snooze-checkout-blocks.html` |
| [`2150947919`](https://app.kajabi.com/admin/offers/2150947919/edit) USD member, `rVuLzkZa` | Camp Snooze (Member Discount) | [`2164675367`](https://app.kajabi.com/admin/themes/2164675367/settings/edit) | `camp-snooze-member-checkout-blocks.html` |
| [`2151264520`](https://app.kajabi.com/admin/offers/2151264520/edit) AUD member, `ENhg45mj` | Camp Snooze (Member Discount) AUD | [`2166737611`](https://app.kajabi.com/admin/themes/2166737611/settings/edit) | `camp-snooze-member-checkout-blocks.html` |

Eight pastes, all `ok:true` with `length == expected`. Two distinct HTML checksums, `6fc71e9c219443c2`
non-member and `7900bfee6a5a5f2b` member, and one JS checksum `3dc1adccdd0a0d8f` on all four themes.
CSS was read back at 10,893 characters on every theme, matching the repo, and was not touched.

**Navigation, and this supersedes wall #2 for an authenticated window.** A CDP `Page.navigate` to an
`app.kajabi.com` URL still 406s because it carries no Referer. An **anchor click from the loaded page
does not**: inject `<a href="/admin/...">` into the authenticated document and click it, and Kajabi
serves the page normally. Proven eight times this run with no 406 and no human re-navigation. Helper
kept out of the repo deliberately; it is three lines of `eval`.

**Save still needs attempt two**, exactly as the PM-005 landmine says. Every one of the eight saves
left the button enabled on the first click and greyed on the second. Treat one click as a no-op.

Verified from a logged-out browser on all four public checkouts, cache-busted:

- The order summary, the Key Dates and the capacity card all name the same camp.
- `?cohort=16` renders **Camp Snooze #16, Monday 14 September 2026, Friday 11 September 2026** in all
  three places at once, which is the rollover proven rather than argued.
- Our total still equals Kajabi's own button: `Pay $690.00 USD` and `Pay $878.00 AUD` read beside it.
- `15 families per camp` present on all four. The "15 of 15 places remain" line is gone.

#### Historical cohort rollover re-paste, completed and superseded

Three of those rows changed again on 2026-08-21 and were re-pasted and verified by August 25–27, as
the later evidence rows record. The paired-deploy rule remains valid: checkout HTML, member checkout
HTML and checkout JS form one rollback unit. This paragraph does not authorise a new paste.

What changed and why it cannot wait past 2026-08-30:

- The order summary's camp name and the two Key Dates were static. `get_camp_capacity` drops a camp
  once `start_date` has passed, so on the morning of **2026-08-31** the capacity card would have
  rolled to Camp #16 while the order summary the buyer was paying against still read "Camp Snooze
  #15" with August dates. They now carry `data-camp-cohort-title`, `data-camp-cohort-start` and
  `data-camp-cohort-access`, filled from the same cohort the card resolves.
- `chooseCohort` accepted only `open` and `filling`. The feed also bands `low`, which is 1 to 5
  seats and still a sellable camp, so a camp at 3 seats was skipped and the **next** camp was named
  on the page selling the current one.
- The card printed `seats_remaining + ' of 15 places remain'` in every band, so an untouched camp
  advertised "15 of 15 places remain". It now follows the landing page's ratified band rule: no
  number when open, "Filling fast" when filling, the true count only when low.

The static text left in the HTML is the fallback for a dead feed, so it must stay accurate. It reads
Camp Snooze #15, Monday 31 August 2026, Friday 28 August 2026, in the same `en-AU` shape the
formatter emits. That fallback was time-bound. Its current value must be reconciled against live and
the cohort source before any exact, approval-gated change is proposed.

Regression cover: `pages/checkout/camp-snooze-v2-luxury/tests/camp-checkout-cohort-summary.test.mjs`.

```bash
# P3-CAMP-CHECKOUT-HTML, P3-CAMP-MEMBER-CHECKOUT-HTML, P3-CAMP-CHECKOUT-CSS, P3-CAMP-CHECKOUT-JS
# curl is HTTP 403 on checkouts. Confirm this from a browser on each of the four offers:
#   AUD 46Bz9tk6, USD K3Y6FEKX, AUD member 2151264520, USD member 2150947919
# Expect on each: the text "15 families per camp", a seats-remaining line naming 15,
# and the correct due-now amount unchanged (A$997 AUD, $690 USD).
```

The capacity feed those pastes call is live and answering already, so the widget has real data
to read the moment the block lands:

```bash
curl -s "https://qwwwosoafcsupebpangw.supabase.co/functions/v1/camp-capacity?limit=3" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" -H "apikey: $SUPABASE_ANON_KEY"
# Verified 2026-08-18: Camp 15 open, 15 of 15 seats remaining, no personal data in the payload.
```


---

## D. Checkout layout (not tracking) → [`pages/checkout/`](./pages/checkout/)

Per offer family: html + css + js into **that offer’s** theme Custom Code / CSS / JS. Dual-currency = both twins or neither. Tracking is still A4/A5.

| Family | html | css | js | Action |
|---|---|---|---|---|
| [`1-month-free-membership`](./pages/checkout/1-month-free-membership/) | yes | yes | yes | Only if that family’s files changed |
| [`7-day-trial-membership`](./pages/checkout/7-day-trial-membership/) | yes | yes | yes | **Local/live state requires reconciliation; if a change is approved, USD and AUD twins are one deploy and rollback unit** |
| [`bau-membership-checkout`](./pages/checkout/bau-membership-checkout/) | yes | yes | yes | **DONE (P4)** live cleaned |
| [`camp-snooze-v2-luxury`](./pages/checkout/camp-snooze-v2-luxury/) | yes | yes | yes | Only if changed |
| [`day-pass-offer`](./pages/checkout/day-pass-offer/) | yes | **no** | **no** | **HOLD (P6)** pull css+js first |

---

## D2. Course paywall modals → [`pages/paywall-modals/`](./pages/paywall-modals/)

Product-level surface, **not** a page: the modal a limited-access member hits on paywalled lesson content. One `.html` per modal, pasted into that course's paywall-modal **Text** block via the `<>` source-code button. No shared theme CSS applies; all styling is inline. Full conventions and the offer-must-grant-the-product prerequisite: [`pages/paywall-modals/README.md`](./pages/paywall-modals/README.md).

All five now sell the **7 day trial of the Snooze Membership**, not the single course behind them. The trial is a dual-currency twin pair: [`2150887297` USD](https://app.kajabi.com/admin/offers/2150887297/edit) (`mqQikDM7`) and [`2151254578` AUD](https://app.kajabi.com/admin/offers/2151254578/edit) (`Sr6KzShx`). Author the USD slug in the button; `currency-toggle.js` maps it for Australian visitors.

| Course (paywall sits here) | Product | Repo file | Action |
|---|---|---|---|
| 5–12 Month Sleep Schedules (Free Module) | [`2149308933`](https://app.kajabi.com/admin/products/2149308933) | [`5-12-month-schedules-free-module/`](./pages/paywall-modals/5-12-month-schedules-free-module/) | **DONE, live.** Captured verbatim from live 2026-08-16 |
| 3-4 Month 4hr Feeds (Free Module) | [`2149324660`](https://app.kajabi.com/admin/products/2149324660) | [`3-4-month-4hr-feeds-free-module/`](./pages/paywall-modals/3-4-month-4hr-feeds-free-module/) | **DONE, live** 2026-08-16 |
| Newborn Sleep Guide | [`2149275660`](https://app.kajabi.com/admin/products/2149275660) | [`newborn-sleep-guide/`](./pages/paywall-modals/newborn-sleep-guide/) | **DONE, live** 2026-08-16 |
| 3-4 Month Baby Sleep Course | [`2148571314`](https://app.kajabi.com/admin/products/2148571314) | [`3-4-month-baby-sleep-course/`](./pages/paywall-modals/3-4-month-baby-sleep-course/) | **DONE, live** 2026-08-16. Pull the field before any future overwrite |
| Toddler Toolkit | [`2149259086`](https://app.kajabi.com/admin/products/2149259086) | [`toddler-toolkit/`](./pages/paywall-modals/toddler-toolkit/) | **DONE, live** 2026-08-16. Pull the field before any future overwrite |

**Open:** the twins are not identical. The AUD offer grants [`2149309110`](https://app.kajabi.com/admin/products/2149309110) (5-12 limited access) and the USD offer does not, so AUD trial members see an extra library tile. Twins move together; pick one direction and square them.

Verification: course consumption pages are behind auth, so `curl` cannot reach them. Read the field back after Save, or use Kajabi MCP `get_theme_content` on the course's `active_theme_id`.

---

## E. Not paste files

| File | Role |
|---|---|
| [`global/js/snooze-globals.js`](./global/js/snooze-globals.js) | Stub pointer only |
| [`global/js/currency-toggle.js`](./global/js/currency-toggle.js) | Test extract only |
| [`global/js/gtm-variables.js`](./global/js/gtm-variables.js) | GTM UI variables |
| [`global/js/meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) | Historical fragment/test extract; the protected A4 file already contains the live inline block. Not a paste target |
| [`global/css/snooze-unified-theme.css`](./global/css/snooze-unified-theme.css) | Historical; paste [`theme-custom-code.css`](./global/css/theme-custom-code.css) instead |
| [`global/html/footer.html`](./global/html/footer.html) | Sync source copied inline into page HTML |

---

## F. Verification rules

This table maps canonical sources to surfaces; it does **not** authorise a write. Before any future
paste, require the applicable preflight, a fresh two-way diff, a preimage, exact-mutation approval,
serial save, rollback and cache-busted verification.

| Concern | Edit this file | Paste here |
|---|---|---|
| Site GTM / Stape / schema / currency toggle (site + landing) | [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html) | Settings → Site Details → Header Page Scripts |
| Protected four-block checkout header | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | **No current paste.** If an exact change is approved, Settings → Checkout → Header tracking code is one whole-field overwrite |
| Checkout Meta Advanced Matching | Already inline in [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html); standalone fragment is test/history only | **No current paste.** Verify as part of the protected four-block checkout header |
| Checkout purchase receipt | **None.** The server-side n8n path is authoritative; `global/js/kajabi-checkout-tracking.js` is historical test/reference code only | **Do not paste.** Settings → Checkout → Footer tracking code must remain empty; see row A5 |
| Shared website CSS | [`global/css/theme-custom-code.css`](./global/css/theme-custom-code.css) | Theme Custom Code → CSS |
| Native website Header CTA | [`global/native-header-call-to-action.json`](./global/native-header-call-to-action.json) | Website theme → Header → Call to action; exact field values only, under A6 gates |
| Historical custom navigation | [`global/html/navigation.html`](./global/html/navigation.html) | **No current paste target. Do not deploy; see A7** |
| Home-page JS helpers | [`global/js/theme-custom-code.js`](./global/js/theme-custom-code.js) | Theme Custom Code → JS |
| One landing page look/feel | [`pages/landing/`](./pages/landing/) | That landing page’s own theme fields |
| One checkout layout/copy | [`pages/checkout/`](./pages/checkout/) | That offer’s theme fields |
| One course paywall modal | [`pages/paywall-modals/`](./pages/paywall-modals/) | That course’s paywall modal Text block, via the `<>` source-code button |
| Snooze Membership page body | [`pages/website/snooze-membership/snooze-membership-page.html`](./pages/website/snooze-membership/snooze-membership-page.html) | `/snooze-membership` Website Page custom-code block |

1. Website / landing: cache-busted `curl` of the public URL; every non-blank repo line appears live (or length/sha from `emit_paste_js.py` eval).
2. Checkouts: curl is **HTTP 403**. Verify in a real browser, or read back Settings → Checkout after Save. Offer layout copy: Kajabi MCP `get_theme_content` on the offer theme.
3. Any `.js` paste file must pass `node --check`.
4. `GTM-KNRTH6P` at most once per assembled page type (site from A1; checkouts from A4).
5. Never merge two paste targets into one file; never append a second file into a Kajabi field at paste time.
