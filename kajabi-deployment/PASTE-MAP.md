# Kajabi paste map (source of truth)

**Updated:** 2026-08-08
**Last live verify:** 2026-07-31 (curl + whitespace-normalized CSS match; Kajabi MCP for Store CMS + membership checkouts)
**App:** [`apps/snooze-website/kajabi-deployment/`](./)

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
| A4 | Settings → Checkout → **Header tracking code** | `/admin/sites/2148291177/edit/checkout-settings` | [`global/html/checkout-header-tracking.html`](./global/html/checkout-header-tracking.html) | Every checkout (when inject_header is true) | **The old "MATCH, loader only" note was WRONG, see the warning below.** Repo file rebuilt 2026-08-16 from the live field: loader plus Meta Advanced Matching plus UTM attribution capture | **Yes**, now that the file is complete |
| A5 | Settings → Checkout → **Footer tracking code** | `/admin/sites/2148291177/edit/checkout-settings` | [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) | Every checkout (when inject_footer is true) | Live field **EMPTY** | **Yes, if you want purchase tracking live** (intended, not currently deployed) |
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

### Checkout header compose order (A4)

The live Header field today is **only** the GTM/Stape loader ([`checkout-header-tracking.html`](./global/html/checkout-header-tracking.html)). That matches the repo file. **Do not re-paste A4 just to “sync” it.**

Optional intended upgrade (not live yet): after the loader, append [`global/js/meta-advanced-matching.js`](./global/js/meta-advanced-matching.js) with its comment header stripped, so `fbq` exists when Advanced Matching runs. That would be a deliberate new paste, not a restore.

Short pointer: [`global/checkout-tracking/README.md`](./global/checkout-tracking/README.md).

### TO DO

| # | Status | What to do | Where | Repo / replacement text |
|---|---|---|---|---|
| **P5** | **DONE** (closed 2026-08-09) | Fix banned Store copy | superseded: `/store` is no longer the native-builder page this row described | `Weekly group coaching and replays` returns 0 on live `/store` and 0 in [`pages/website/StoreV2/store-page-v2.html`](./pages/website/StoreV2/store-page-v2.html), verified 2026-08-09. The StoreV2 deploy replaced the text block this row pointed at |
| **P3** | **TO DO (optional)** | Paste purchase tracking if shipping it | **Settings → Checkout** → **Footer tracking code** | [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) · Inject flags are **true** on membership checkouts; footer field was **EMPTY** as of 2026-07-27 (cannot re-read via public curl; Cloudflare 403 on checkouts) |
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
| A5 | Settings → Checkout → **Footer tracking code** | `/admin/sites/2148291177/edit/checkout-settings` | [`global/js/kajabi-checkout-tracking.js`](./global/js/kajabi-checkout-tracking.js) | Every checkout (inject_footer true) | Was **EMPTY** (2026-07-27) | **Deploy only with the coordinated GTM order-bound cutover** |

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
| `/links` (linktree) | <https://www.joinsnooze.com/links> | [`pages/landing/linktree/linktree-landing-page.html`](./pages/landing/linktree/linktree-landing-page.html) | yes | yes | Only complete trio |
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
