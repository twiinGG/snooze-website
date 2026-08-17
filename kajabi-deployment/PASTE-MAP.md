# Kajabi paste map (source of truth)

**Updated:** 2026-08-08
**Last live verify:** **2026-08-17** (ME-010), the two identity-capture paste targets only. Site header
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

Authoritative detail:
- Contract: [`CODE-SURFACE-CONTRACT.md`](../docs/technical/CODE-SURFACE-CONTRACT.md)
- Surface rules: [`KAJABI-SURFACE-CODE-SETUP.md`](../docs/technical/KAJABI-SURFACE-CODE-SETUP.md)
- Checkout tracking how-to: [`KAJABI-CHECKOUT-TRACKING-CODE.md`](../docs/technical/KAJABI-CHECKOUT-TRACKING-CODE.md)
- Older CU-001 stage notes (checkboxes may be stale): [`../docs/BATCH-1-PASTE-GUIDE.md`](../docs/BATCH-1-PASTE-GUIDE.md)

---

## 0. Status board (2026-08-08)

### Membership release changes

| # | Kajabi location | Admin path | Canonical file(s) | Reaches | Live vs repo (2026-07-27) | Re-paste? |
|---|---|---|---|---|---|---|
| A1 | Settings → Site Details → **Header Page Scripts** | `/admin/sites/…/edit/site-details` | [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html) | Website + landing pages | **Drift measured line by line 2026-08-16, 22 of 480 substantive lines:** ME-007's surface, currency and cta_click fixes, and the Cookie Keeper loader. **No membership CTA drift remains** | **Yes, ready now.** The old "with the membership release" gate is retired, see the note below |
| A2 | Customizer → Theme Custom Code → **CSS** | website theme `settings-css-input` | [`global/css/theme-custom-code.css`](./global/css/theme-custom-code.css) | Website pages only | CNG-002 re-pasted 2026-08-08 after dead `#catnapping-guide-ready-page` rules removed (verified MATCH that day: 374,958 chars, 2276 braces, sha256 `441a908ceb452dc3`). Repo also contains `#snooze-membership-page` System Initialization not yet in that live paste | **Yes, before membership page preview** |
| A3 | Customizer → Theme Custom Code → **JS** | website theme `settings-js-input` | [`global/js/theme-custom-code.js`](./global/js/theme-custom-code.js) | Website pages only | **MATCH** (`#home-page` helpers only) | No |
| A4 | Settings → Checkout → **Header tracking code** | `/admin/sites/2148291177/edit/checkout-settings` | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | Every checkout (when inject_header is true) | **The old "MATCH, loader only" note was WRONG, see the warning below.** Repo file rebuilt 2026-08-16 from the live field: loader plus Meta Advanced Matching plus UTM attribution capture. **Checkout identity capture inlined as a fourth block 2026-08-16 (ME-009)**, so the repo file is now AHEAD of live | **Yes.** Read the live field first and diff BOTH directions; the repo file should differ from live by exactly the identity block |
| A5 | Settings → Checkout → **Footer tracking code** | `/admin/sites/2148291177/edit/checkout-settings` | [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) | Every checkout (when inject_footer is true) | **DELIBERATELY CLEARED 2026-08-16 (ME-009), re-verified empty 2026-08-17 (ME-010).** The field is empty on purpose. It previously held the order-bound purchase script, which had never fired. Purchase is now owned by the server-side n8n path | **NEVER.** Pasting it back re-creates a second purchase emitter beside the server-side path and double counts every order. Row **P3** used to contradict this and told a reader there were 90 lines to keep; that row is now closed and points here |
| A6 | Website theme → **Navigation custom-code block** | website theme navigation section | [`global/html/navigation.html`](./global/html/navigation.html) | Website pages | Repo points Membership to `/snooze-membership`, uses the trial checkout and removes the expired launch banner | **Yes, after the membership page is published** |

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

### A1: the "membership release" gate is retired, 2026-08-16

Rows A1 carried "Yes, with the membership release" from 2026-07-27. **That gate is stale and has
been removed.** `https://www.joinsnooze.com/snooze-membership` returns HTTP 200 and appears in the
live navigation, so the membership release shipped, around 2026-08-08.

The gate was not retired on that reasoning alone. Every substantive line of the repo file was
compared against the live page on 2026-08-16: 480 lines of 45 characters or more, of which 22 are
absent from live. All 22 are ME-007's currency, surface and `cta_click` fixes plus the Cookie
Keeper loader. **Not one line of membership CTA drift remains.**

Re-run the check before pasting, because it costs nothing and this note will age too.

### A2: two things that will waste your time if you do not know them

Both learned first-hand on 2026-08-07, after three saves were silently lost.

**1. "Save greys out" does NOT mean it saved.** The Customizer sends an `updated_at` optimistic-concurrency token with `PUT /admin/themes/<id>/settings`. An editor that has been sitting open on a stale token gets **HTTP 409 Conflict**, and the UI swallows it completely: no toast, no modal, and the Save button greys to `disabled` exactly as if the save had succeeded.

> **Reload the theme settings page immediately before pasting**, and **verify on the live site**, never on the Save button.

Verification that actually proves it, on any live website page:

```bash
curl -sS "https://www.joinsnooze.com/catnapping?cb=$RANDOM" \
  | python3 -c "import sys,re; h=sys.stdin.read(); i=h.find('Custom CSS Added Via Theme Settings'); s=h.rfind('<style',0,i); e=h.find('</style>',i); b=h[s:e]; print('chars',len(b),'braces',b.count('{'),b.count('}'))"
```

Kajabi wraps the pasted file in `/* Custom CSS Added Via Theme Settings */`, so the served block is the repo file **plus 48 chars**. For the current file expect roughly **374,958 chars and 2276 balanced braces**.

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

**That claim was wrong and is corrected here.** The repo file holds four script blocks as of 2026-08-16: the GTM/Stape loader, Meta Advanced Matching (`window.SnoozeMetaMatch`), the UTM attribution capture, and the checkout identity capture (`window.SnoozeCheckoutIdentity`). The first three were rebuilt from a live read; the fourth is new and is not live yet. **Read the live field and diff both directions before any overwrite.** Checking that repo lines appear in live detects additions only and is blind to deletions, which on 2026-08-16 nearly deleted two live blocks.

Optional intended upgrade (not live yet): after the loader, append [`global/js/meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) with its comment header stripped, so `fbq` exists when Advanced Matching runs. That would be a deliberate new paste, not a restore.

Short pointer: [`global/checkout-tracking/README.md`](./global/checkout-tracking/README.md).

### TO DO

| # | Status | What to do | Where | Repo / replacement text |
|---|---|---|---|---|
| **P5** | **DONE** (closed 2026-08-09) | Fix banned Store copy | superseded: `/store` is no longer the native-builder page this row described | `Weekly group coaching and replays` returns 0 on live `/store` and 0 in [`pages/website/StoreV2/store-page-v2.html`](./pages/website/StoreV2/store-page-v2.html), verified 2026-08-09. The StoreV2 deploy replaced the text block this row pointed at |
| **P3** | **CLOSED, NEVER PASTE** (2026-08-16, re-verified 2026-08-17) | Nothing. The field stays empty | **Settings → Checkout** → **Footer tracking code** | See **row A5** and the warning below it. [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) is **NOT a paste target**. ME-009 cleared this field on purpose because it held an order-bound purchase emitter that had never fired, and purchase is now owned by the server-side n8n path. Pasting it back creates a second purchase emitter and double counts every order. Verified empty by a cache-busted read of a live checkout on **2026-08-17**: `AUD_OFFER_IDS` absent |
| **LIB** | **TO DO (confirm first)** | Logged-in compare before any paste | <https://www.joinsnooze.com/snooze-library> · page **2156716053** (`authenticated_only`) | [`pages/website/library/library-page.html`](./pages/website/library/library-page.html) · Public verify blocked (403) |
| **P6** | **HOLD** | Pull day-pass theme css+js from live before editing | Day-pass offer theme CSS + JS fields | Missing under [`pages/checkout/day-pass-offer/`](./pages/checkout/day-pass-offer/) |
| **P7** | **HOLD** | Advanced Matching not shipping | **Settings → Checkout** → **Header tracking code** | Inline [`meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) into [`checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) in git first; then one overwrite. Do not append a second file. |

### DONE (live MATCH; do not re-paste)

| # | Status | Surface | Evidence (2026-07-31) |
|---|---|---|---|
| **P1** | **RE-CHECKED 2026-08-13 (WS-006)** | Theme CSS (A2) | The `.snooze-faq` and `#catnapping-page .snooze-form-embed` blocks named in the 2026-07-31 note **did ship** with the `/catnapping` deploy. Re-measured 2026-08-13 by extracting the live inline style block from the rendered `/catnapping` page and diffing against the repo after comment and whitespace normalization: **11247 non-blank repo lines, 15 missing from live**, and all 15 are the WS-006 widening of the form-embed selector from `#catnapping-page` to an `:is()` list covering the five capture pages. A2 is otherwise in sync. Re-paste with the WS-006 age-page deploy. |
| **P2** | **DONE** | Consultations | Book CTAs have **no** `data-checkout` (membership "Join" links still correctly use it). Credentials/prices present. |
| **P4** | **DONE** | Membership checkouts USD/AUD | MCP themes `2163485833` / `2166694709` block `1767316681231`: cleaned benefits; no "Weekly live group coaching" / "24/7"; USD says USD; AUD says AUD. |
| **A1** | **DONE** | Header Page Scripts | `keepOfferUrl` / `isPlaceholderHref` live on home; `GTM-KNRTH6P` ×1. |
| **A3** | **DONE** | Theme JS | Helpers present on home. |
| **A4** | **DONE** | Checkout header loader | GTM/Stape loader MATCH; inject_header **true**. |
| **Home** | **DONE** | Home body | No banned "Weekly Live Coaching" / "24/7 support". |
| **About** | **DONE** | About Sally | H1 "Hi, I'm Sally"; former paediatric nurse; `/snooze-library` present. |
| **Method** | **DONE** | The Snooze Method | H1 "The Snooze Methodology". |

**Only mandatory live write right now:** P5 Store text.

| Page | Canonical file | Kajabi target | Release state |
|---|---|---|---|
| Homepage | [`pages/website/home/home-page.html`](./pages/website/home/home-page.html) | Existing homepage full-page custom-code block | Repo update, paste after membership page publication |
| Snooze Membership | [`pages/website/snooze-membership/snooze-membership-page.html`](./pages/website/snooze-membership/snooze-membership-page.html) | New Website Page at `/snooze-membership`, one full-width flush custom-code block | New draft page |

The trial confirmation page and lifecycle email paste targets are documented in [`pages/checkout/7-day-trial-membership/README.md`](./pages/checkout/7-day-trial-membership/README.md) and its [`emails/README.md`](./pages/checkout/7-day-trial-membership/emails/README.md). They are member-facing drafts and require approval before activation.

---

## A. Site-wide fields (one file each)

| # | Kajabi location | Admin path | Canonical file | Reaches | Live vs repo | Action |
|---|---|---|---|---|---|---|
| A1 | Settings → Site Details → **Header Page Scripts** | `/admin/sites/2148291177/edit/site-details` | [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html) | Website + landing pages | **DRIFT, measured 2026-08-16:** ME-007's three header-script fixes and the Cookie Keeper loader only. The membership CTA work is already live | **Yes, ready now** |
| A2 | Customizer → Theme Custom Code → **CSS** | website theme `settings-css-input` | [`global/css/theme-custom-code.css`](./global/css/theme-custom-code.css) | Website pages only | CNG-002 re-pasted 2026-08-08 after dead `#catnapping-guide-ready-page` rules removed (verified MATCH that day: 374,958 chars, 2276 braces, sha256 `441a908ceb452dc3`). Repo also contains `#snooze-membership-page` System Initialization not yet in that live paste | **Yes, before membership page preview** |
| A3 | Customizer → Theme Custom Code → **JS** | website theme `settings-js-input` | [`global/js/theme-custom-code.js`](./global/js/theme-custom-code.js) | Website pages only | **DONE** | No |
| A4 | Settings → Checkout → **Header tracking code** | `/admin/sites/2148291177/edit/checkout-settings` | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | Every checkout (inject_header true) | **DRIFT 2026-08-16:** Cookie Keeper loader in repo, not live. Repo file also rebuilt to hold the full live field | **Yes** (see P7 for AM) |
| A5 | Settings → Checkout → **Footer tracking code** | `/admin/sites/2148291177/edit/checkout-settings` | [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) | Every checkout (inject_footer true) | **CLEARED 2026-08-16**, verified by a cache-busted read: `AUD_OFFER_IDS` absent from the live checkout. Re-verified absent **2026-08-17** | **NEVER.** See the warning below |

### A4 note

Live header = GTM/Stape loader only. **Do not re-paste to sync.**
Meta Advanced Matching: inline the fragment into [`checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) in git, then overwrite A4 once. [`meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) is **not** a paste target.

---

## B. Website pages (shared theme 2156873377)

Enter customizer via <https://app.kajabi.com/admin/sites/2148291177/themes> → Customize → page dropdown. Deep links into the customizer 404.

| Page | Live URL | Page settings | Custom Code field | Repo file | Action |
|---|---|---|---|---|---|
| Home | <https://www.joinsnooze.com> | [2154679189](https://app.kajabi.com/admin/website_pages/2154679189/edit) | Section **`1768118757163`** Full Page | [`pages/website/home/home-page.html`](./pages/website/home/home-page.html) | **Repo update; paste after membership page publication** |
| About Sally | <https://www.joinsnooze.com/about-sally> | [2154679198](https://app.kajabi.com/admin/website_pages/2154679198/edit) | Whole-page custom code (confirm H1 before edit) | [`pages/website/about-sally/about-sally.html`](./pages/website/about-sally/about-sally.html) | **DONE** |
| 1:1 Consultations | <https://www.joinsnooze.com/one-on-one-sleep-consultations> | [2155283958](https://app.kajabi.com/admin/website_pages/2155283958/edit) | Section/block **`1765189516514`** only | [`pages/website/consultations/one-on-one-consultations-page.html`](./pages/website/consultations/one-on-one-consultations-page.html) | **DONE** |
| Snooze Library | <https://www.joinsnooze.com/snooze-library> | [2156716053](https://app.kajabi.com/admin/website_pages/2156716053/edit) | That page’s Custom Code block(s) | [`pages/website/library/library-page.html`](./pages/website/library/library-page.html) | **TO DO: confirm logged-in** |
| Store | <https://www.joinsnooze.com/store> | [2154679200](https://app.kajabi.com/admin/website_pages/2154679200/edit) | Custom-code page, wrapper `#store-page-v2` | [`pages/website/StoreV2/store-page-v2.html`](./pages/website/StoreV2/store-page-v2.html) | **DONE** (verified live 2026-08-09) |
| Reviews | <https://www.joinsnooze.com/reviews> | see page settings | That page's Custom Code block | [`pages/website/reviews-page/src/reviews-page.html`](./pages/website/reviews-page/src/reviews-page.html) | row added 2026-08-09; live state not re-verified |

Guide / age / product pages under [`pages/website/`](./pages/website/) use the same shared theme CSS/JS (A2/A3). Paste each page’s own custom-code file only when that page’s body changed.

**Correction pass, 2026-08-09 (WS-003).** Two rows in this matrix were wrong and one was missing. Each was re-verified against live before editing, which mattered: the `/store` row was wrong in a *different* way than WS-002 recorded on August 8.

| Row | What this file said | What live actually serves | Evidence |
|---|---|---|---|
| Store | Native builder, no wholesale HTML file | Custom-code page, wrapper `#store-page-v2`, matching [`pages/website/StoreV2/store-page-v2.html`](./pages/website/StoreV2/store-page-v2.html) at **357 of 357 non-blank lines, 0 missing** | Cache-busted `curl` 2026-08-09 |
| Reviews | no row at all | Repo source exists at [`pages/website/reviews-page/src/reviews-page.html`](./pages/website/reviews-page/src/reviews-page.html) | Repo read; live state not re-verified, so the row says so |
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

---

## D. Checkout layout (not tracking) → [`pages/checkout/`](./pages/checkout/)

Per offer family: html + css + js into **that offer’s** theme Custom Code / CSS / JS. Dual-currency = both twins or neither. Tracking is still A4/A5.

| Family | html | css | js | Action |
|---|---|---|---|---|
| [`1-month-free-membership`](./pages/checkout/1-month-free-membership/) | yes | yes | yes | Only if that family’s files changed |
| [`7-day-trial-membership`](./pages/checkout/7-day-trial-membership/) | yes | yes | yes | **Repo changed; deploy USD and AUD twins together** |
| [`bau-membership-checkout`](./pages/checkout/bau-membership-checkout/) | yes | yes | yes | **DONE (P4)** live cleaned |
| [`camp-snooze-v2-luxury`](./pages/checkout/camp-snooze-v2-luxury/) | yes | yes | yes | Only if changed |
| [`day-pass-offer`](./pages/checkout/day-pass-offer/) | yes | **no** | **no** | **HOLD (P6)** pull css+js first |

---

## E. Not paste files

| File | Role |
|---|---|
| [`global/js/snooze-globals.js`](./global/js/snooze-globals.js) | Stub pointer only |
| [`global/js/currency-toggle.js`](./global/js/currency-toggle.js) | Test extract only |
| [`global/js/gtm-variables.js`](./global/js/gtm-variables.js) | GTM UI variables |
| [`global/js/meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) | Fragment; inline into checkout-header HTML before shipping |
| [`global/css/snooze-unified-theme.css`](./global/css/snooze-unified-theme.css) | Historical; paste [`theme-custom-code.css`](./global/css/theme-custom-code.css) instead |
| [`global/html/footer.html`](./global/html/footer.html) | Sync source copied inline into page HTML |

---

## F. Verification rules

| Concern | Edit this file | Paste here |
|---|---|---|
| Site GTM / Stape / schema / currency toggle (site + landing) | [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html) | Settings → Site Details → Header Page Scripts |
| Checkout GTM / Stape loader | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | Settings → Checkout → Header tracking code |
| Checkout Meta Advanced Matching | Inline [`global/js/meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) into [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) in git first | Settings → Checkout → Header tracking code, as one whole-field overwrite |
| Checkout purchase / InitiateCheckout dataLayer | [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) | Settings → Checkout → Footer tracking code |
| Shared website CSS | [`global/css/theme-custom-code.css`](./global/css/theme-custom-code.css) | Theme Custom Code → CSS |
| Website navigation | [`global/html/navigation.html`](./global/html/navigation.html) | Website theme navigation custom-code block |
| Home-page JS helpers | [`global/js/theme-custom-code.js`](./global/js/theme-custom-code.js) | Theme Custom Code → JS |
| One landing page look/feel | [`pages/landing/`](./pages/landing/) | That landing page’s own theme fields |
| One checkout layout/copy | [`pages/checkout/`](./pages/checkout/) | That offer’s theme fields |
| Snooze Membership page body | [`pages/website/snooze-membership/snooze-membership-page.html`](./pages/website/snooze-membership/snooze-membership-page.html) | `/snooze-membership` Website Page custom-code block |

1. Website / landing: cache-busted `curl` of the public URL; every non-blank repo line appears live (or length/sha from `emit_paste_js.py` eval).
2. Checkouts: curl is **HTTP 403**. Verify in a real browser, or read back Settings → Checkout after Save. Offer layout copy: Kajabi MCP `get_theme_content` on the offer theme.
3. Any `.js` paste file must pass `node --check`.
4. `GTM-KNRTH6P` at most once per assembled page type (site from A1; checkouts from A4).
5. Never merge two paste targets into one file; never append a second file into a Kajabi field at paste time.
