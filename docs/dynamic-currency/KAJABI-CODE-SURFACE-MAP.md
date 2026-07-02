# Kajabi Code-Surface Map — Phase 1b Census (2026-07-02)

> Read-only census of every custom-code surface across the money pages + 4 checkouts, run against the shared Encore site theme (2156873377), 3 standalone landing-page themes, and 4 offer-checkout themes. No writes, no publishes, no clicks beyond navigation were performed. Produced per `PER-PAGE-EXECUTION-SPEC.md` §2. This doubles as the drift register for CMS-only code that must be preserved in every future merge.
>
> Method: four parallel read-only passes (site-theme website pages split two ways, landing pages + Consultations, checkout offer themes), each using Kajabi MCP (`get_website_page` / `get_landing_page` / `get_offer` / `get_theme_content` with `section_filter`) as the primary tool, cross-referenced against repo source files and the 2026-07-02 logged-out live sweep. Several pages could not be located in the theme's 142-section index within this pass's budget — these are marked UNKNOWN below rather than guessed, and are the top priority for a follow-up pass (see §4).

## 0. WRITE-PATH UPDATE (2026-07-02, evening session) — customizer block Ace DOES persist

The July 1 "customizer block Ace does NOT persist" blocker is OVERTURNED. Proven on the
homepage 50KB block (site theme 2156873377, section 1768118757163): load content into the
block's Ace editor (`ace.edit("settings-sections-<sid>-blocks-<bid>-settings-code-input")
.setValue()` via chunked base64 from disk), then a REAL DIRTY KEYSTROKE (`ed.insert(" ");
ed.remove("left")`), then a TRUSTED click on the enabled Save button (agent-browser click
@ref, not JS .click()). MCP re-read byte-matched all 51,132 bytes. This gives the page wave
a zero-transcription disk-to-browser write path for ANY site-theme section block, and the
customizer's page dropdown enumerates every website page's sections (solves the census
follow-up lookups too). The July 1 failure lacked the dirty-keystroke step.

## 1. Summary table

| Page | Surface | Method proven to write it | Status |
|---|---|---|---|
| Home | Site-theme section `1768118757163` (Full Page, 49,928 B) | MCP full-block PROVEN (read round-trips cleanly); write is high-risk at this size, hardened protocol required | Runtime-enhancer-patched, not source-instrumented |
| Newborn age page | Not located in theme index | UNKNOWN | Needs follow-up — see §4 |
| 3-4 Month age page | Site-theme cluster `1764879337945`–`1764879599933` ("SECTION 0-7") | UNKNOWN — fragmented multi-section structure, MCP write untested; may not even be the block that renders live | **DIVERGED / unresolved** — abandoned in-progress rebuild, needs owner triage before Phase 3 touches this page |
| 5-12 Month age page | Not located in theme index | UNKNOWN | Needs follow-up — see §4 |
| Toddler age page | Not located in theme index | UNKNOWN | Needs follow-up — see §4 |
| 3-4 Month Course | Native Encore builder blocks (Hero/Text/Image/Video), no code block | N/A — not a custom-code page | **Model mismatch**: repo's fully-instrumented HTML file has no CMS target to land in |
| 5-12 Month Course | Not located (likely also native builder, unconfirmed) | UNKNOWN | Needs follow-up — see §4 |
| Newborn Sleep Guide | Not located (likely also native builder, unconfirmed) | UNKNOWN | Needs follow-up — see §4 |
| Toddler Toolkit | Not located (likely also native builder, unconfirmed) | UNKNOWN | Needs follow-up — see §4 |
| Store | Native Encore builder blocks (Hero/Text/Custom Section cards) + separate "Offer Storefront" text block | Builder-Ace (native section blocks) | **Model mismatch + wrong page identified**: live `/store` is Sally's personal affiliate-product page, not the membership storefront in either repo file |
| About Sally | Cluster `1764848792000`–`014`, code block `1764813703352_0` (2,525 B) | UNKNOWN — most sections in this cluster are `hidden: true`; unconfirmed this is what renders live | Needs a browser check to confirm live vs. draft |
| Consultations | Site-theme sections `1765189457505` (hidden, dead), `1765189457511` (170 B, Elfsight widget), `1765189457512` ("Content 2", credential text), `1765189457519` (footer) | MCP full-block PROVEN | **DIVERGED** — credential fix not landed anywhere (CMS or repo); pricing uses native `offer`-type blocks, architecturally invisible to the currency JS engine |
| Snooze Access (landing) | Own theme 2166700952, block `paidads_code`/`c1` (16,715 B) | Builder-Ace PROVEN pattern, or MCP full-block | CMS-ONLY — no repo source for this page's own body; `page_title`/`page_description` both null (confirmed) |
| Camp Snooze (landing) | Own theme 2164775842, section `1767342511785` "Full Page" (43,601 B) | MCP full-block PROVEN (large — byte-verify mandatory) | **DIVERGED**, not "format-align only" — live CMS runs a WAITLIST-mode variant with a different price set than the repo file |
| `/snooze` draft (landing) | Own theme 2163331541 (20 sections, verified) | N/A | **Out of scope — confirmed dead, do not touch** |
| Checkout z63s9VaR (USD core) | Own theme 2163485833, section `1744906803654`/`1767316681231` (3,729 B) | MCP full-block PROVEN | **DIVERGED** — live copy still "Weekly live group coaching" + "24/7 support" (banned language); repo's newer file not deployed |
| Checkout vYgCNgJz (AUD core) | Own theme 2166694709, byte-identical block to z63s9VaR (3,729 B) | MCP full-block PROVEN | **DIVERGED + live bug**: AUD checkout displays "all prices are in USD"; no toggle/twin-link live |
| Checkout mqQikDM7 (USD trial) | Own theme 2164307125, block (4,183 B) | MCP full-block PROVEN | **MATCH** — byte-identical to repo, twin-link correct |
| Checkout Sr6KzShx (AUD trial) | Own theme 2166681818, block (4,191 B) | MCP full-block PROVEN | **MATCH** — byte-identical to repo, twin-link correct |

## 2. Per-page detail

### Home
- Website page id 2154679189, path `""`, shared site theme 2156873377.
- One section, `1768118757163` ("Full Page"), single Custom Code block `1768118757163_0`, 49,928 bytes — matches the spec's ~50KB claim exactly. First line: `<!-- PERFORMANCE: Resource Hints -->`.
- SEO: `page_title` is a bare placeholder ("Home"), `page_description` is **null**. This is the *only* page in the full census where the SEO-null assumption from the spec actually holds for a website page — every age page checked came back with real, populated title/description.
- Content verdict: MATCH to the runtime-enhancer story — zero `data-aud`/`dynamic-price` in the source block, confirming the homepage really is served via `home-pricing-enhance.html` bolted on top rather than source-instrumented. `24/7` x1, `Weekly Live Coaching` x1, `z63s9VaR` x3 present in source.
- Write path: MCP full-block read round-trips cleanly. A write is technically PROVEN but high-risk given size and the single-block-no-draft-layer nature of this page — follow the hardened protocol (pre-image, byte-verify) exactly, no shortcuts.

### Newborn / 5-12 Month / Toddler age pages
- Website page ids 2155115786 / 2155116068 / 2155116170. SEO metadata **is populated** for all three (title + description both non-null, well-written) — this corrects the spec's assumption that "several are currently null."
- **Body source not located.** None of the 142 site-theme sections could be matched to these three pages by content (H1/hero text, `data-age` attributes). The live-rendered HTML for these pages is static per the sweep (9/1/7 dp/daud/cta — the shared-header-script baseline only), which is consistent with either (a) a `page_content`-type record (`1600450646561`, name "Page") that this pass didn't fetch, or (b) native Encore builder blocks like 3-4 Month Course and Store turned out to be, rather than a single custom-code block.
- **Action before Phase 3**: fetch `section_filter: "1600450646561"` on the site theme, and if that doesn't resolve it, do a direct browser check via `agent-browser` on each page's admin edit URL (`/admin/website_pages/<id>/edit`) rather than more MCP name-matching — this is faster than continuing to guess from 142 generically-named sections.

### 3-4 Month age page
- The one age page with a positively-identified section cluster: `1764879337945`–`1764879599933` ("SECTION 0: NAVIGATION" through "SECTION 7: FOOTER"), confirmed by H1 "Turn the four-month regression into an opportunity" and `data-age="3-4-month"`.
- This cluster is internally inconsistent: block `1764879396597_0` ("SECTION 1: HERO SECTION") is actually a full standalone HTML document (~14KB, own `<!DOCTYPE>`/`<title>`), and sections 2–7 hold overlapping duplicate content rather than genuinely separate section bodies. The hidden Section 0 nav block still points at the legacy `6iRarwak` checkout on `sleepconcierge.com.au` — a plausible explanation for the live sweep's "6iRarwak x3" finding on this page, but not confirmed, because `content_for_index` (the array that would say which block actually renders) requires a `full_settings` pull that exceeds the 200KB response cap.
- Zero `data-aud`/`dynamic-price` markers in this cluster — it doesn't match the repo file's claimed 7/7/8/8 instrumentation either. This looks like an abandoned in-progress rebuild, separate from both the current repo source and the live render. **Needs owner triage before any edit** — touching the wrong copy here would waste the "touch each page once" principle.

### 3-4 Month Course (and likely the other 3 course/guide pages)
- Website page id 2156731407. This page is built from **native Encore builder blocks** (Hero/Text/Image/Video), not a custom-code HTML page — there is no single field to overwrite with the repo's fully-instrumented HTML file.
- Confirmed ancillary blocks: `[DESK] Hero`/`[MOB] Hero` code blocks are just an Elfsight review-widget embed (130 B each, `<script src="...elfsight.com/platform/platform.js">`), and "Course Sample" is a YouTube iframe embed — neither is a currency surface.
- 5-12 Month Course, Newborn Sleep Guide, and Toddler Toolkit were **not** located in the theme index by content; given 3-4 Month Course's structure, they are likely also native builder pages rather than custom-HTML, but this is unconfirmed — flagged for the same follow-up as the age pages.
- **This is the single biggest structural finding of the census**: the deploy model in `PER-PAGE-EXECUTION-SPEC.md` (paste a Custom Code block, byte-verify, done) assumes a page shape that doesn't exist for this page (and probably 3 more). Landing a dual-currency instrumented HTML file here requires either adding a new Custom Code section via `update_theme_content` with an explicit `content_for` insert, or rebuilding the page as native sections — not a drop-in block replacement.

### Store
- Website page id 2154679200. **Wrong page identified in the original target list**: live `/store` is Sally's personal affiliate-product recommendation page (Kippins, Cubo Ai, Glow Dreaming, ECO by Naty, Ergobaby, Growbright, Snoo referral links) built from native text/card blocks — not the membership/currency storefront that either `store-page.html` or `StoreV2/store-page-v2.html` in the repo describe.
- A separate "Offer Storefront" text block (`1764559895491_0`, 572 B) does pitch Snooze membership on the same page, and its live copy reads "Join Snooze for the FULL ACCESS experience... **Weekly group coaching and replays**" — a live hit against the no-live-coaching banned-language rule, independent of the dual-currency work.
- `page_title`/`page_description` are both effectively empty (title is a bare "Store" placeholder, description null).
- **Store vs. StoreV2 verdict**: neither repo file matches what's live. StoreV2's 16KB dual-currency-instrumented HTML is CMS-ONLY in reverse — it exists only in the repo, never pasted anywhere. The census question "which is the live target" resolves to: **neither** — the live page needs its own audit and possibly its own instrumentation pass, distinct from both repo files.

### About Sally
- Website page id 2154679198. Best candidate cluster is `1764848792000`–`014` ("SNOOZE CLEAN NAVIGATION" / "Founder Feature" / "Promise and Testimonial" / FAQ), timestamp-correlated with the page's `updated_at`. One code block there, `1764813703352_0` (2,525 B), contains a `6iRarwak` hit.
- **Not confirmed as live**: most sections in this cluster are marked `hidden: true`, which could mean they're disabled drafts rather than the actual rendering content. This needs a direct browser check (open the admin edit URL, read-only) before treating this cluster as the page's real content.

### Consultations
- Website page id 2155283958, shared site theme. Four surfaces identified:
  - `1765189457505` "SNOOZE HEADER" — **hidden**, contains two dead `6iRarwak` CTA buttons pointing at `sleepconcierge.com.au`. Safe today (doesn't render) but a landmine if ever unhidden; strip regardless.
  - `1765189457511` "Custom Section" — 170 B, an Elfsight review-widget script only.
  - `1765189457512` "Content 2" — native text block (not code), containing the "My Qualifications" paragraph with **"Registered Paediatric Nurse"** (banned framing per Sally-positioning). This is where the credential fix actually needs to land in the CMS.
  - `1765189457519` "SNOOZE CLEAN FOOTER" — 15,383 B, matches the shared footer, clean.
- **Structural finding**: the "zero prices wired to the currency engine" issue on this page isn't a gap in instrumentation effort — the pricing section (`1765189457508` "Offer Storefront") uses three native Kajabi `offer`-type blocks that pull price directly from linked Offer records. These are architecturally invisible to the `data-aud`/`dynamic-price` JS engine. Dual-currency here requires real AUD-priced Offer objects, not more HTML instrumentation.
- **Credential fix status**: "Registered Paediatric Nurse" appears in the CMS "My Qualifications" block AND still appears in the repo's `one-on-one-consultations-page.html` (x2) — the fix has landed **nowhere** yet, CMS or repo. Fix both when this page is touched.

### Snooze Access (landing page)
- Landing page id 2152134250, own theme 2166700952 (confirmed — separate from the shared site theme). Single custom-code block `paidads_code`/`c1`, 16,715 B, no header comment.
- `page_title` and `page_description` are confirmed **both null**, exactly as the spec assumed.
- **No repo source exists for this page's own body.** `grep -rl "snooze-access"` across the repo only surfaces the `pages/landing/snooze-access-paidads/quiz/` and `.../thanks/` funnel-step files, not the main opt-in page — this page's content is CMS-only with nothing to diff against in the repo.
- Content already carries `z63s9VaR`/`vYgCNgJz` correctly (1 each), no legacy slugs, but zero `data-aud`/`dynamic-price` literal markers.

### Camp Snooze (landing page)
- Landing page id 2151845416, own theme 2164775842. Single "Full Page" section `1767342511785`, 43,601 B.
- **This is DIVERGED, not "format-align only" as the spec assumed.** The block's own header comment reads `<!-- Camp Snooze - WAITLIST mode... -->` and references `camp-snooze-v2-luxury.css/.js` externally. Its live price set ($3,500/$79/-$2,989/$690, data-aud=4) doesn't match the repo's `camp-snooze-landing-page-blocks.html` (data-aud=8, includes $828/$2,889, no "WAITLIST" string anywhere) — these are two different documents right now, not a formatting delta.
- Toggle-UI presence and exact price format (A$ prefix vs. AUD suffix) could not be confirmed from the theme block alone — the actual display logic lives in the externally-referenced `camp-snooze-v2-luxury.js`, outside this MCP path's reach. Defer to the live sweep's independently-observed `$X AUD` suffix format as ground truth; get a live browser check before making any format-align edit.

### `/snooze` draft (landing page)
- Landing page id 2151633113, own theme 2163331541 — confirmed 20 content sections plus header/footer/exit_pop/two_step (matches prior notes, independently re-verified via MCP this pass rather than trusted blind).
- Contrary to the spec's "n/a" SEO note, this draft actually has **populated** `page_title`/`page_description` — they just never render live since the page is unpublished and the public 404 uses Kajabi's generic not-found template. One sampled code block ("SNOOZE CHECKOUT URL VARIABLE") still carries a dead `6iRarwak` reference.
- **Confirmed out of scope. Do not touch, do not deploy to, per the standing project decision.**

### Checkout z63s9VaR (USD core)
- Offer id 2150754998, own theme 2163485833. Checkout code block 3,729 B, first line a generic "Hero Section" comment (pre-dual-currency copy).
- **DIVERGED**: live checkout still reads "Weekly live group coaching with Sally + replay vault" and "24/7 support" — both explicitly banned by the no-live-coaching-language rule. The repo's newer `bau-membership-checkout-blocks.html` (3,209 B, already-updated copy) has not been deployed here.
- No twin-link to vYgCNgJz present in the live checkout at all; no toggle markup either.

### Checkout vYgCNgJz (AUD core)
- Offer id 2151256977, own theme 2166694709. Checkout code block is **byte-identical** (3,729 B) to z63s9VaR's — meaning the AUD-native offer's checkout literally displays "all prices are in USD," a live bug independent of the dual-currency copy work.
- The repo's `currency-toggle.js` does correctly map `z63s9VaR ↔ vYgCNgJz` (in-file comment: "RESOLVED 2026-06-30: AUD core offer created with all three tiers") but per repo memory this engine is staged in the repo, not yet pasted into Kajabi — consistent with what this census found live (no toggle, no twin-link on either core checkout).
- Pricing confirmed correct at the offer-record level regardless of the stale checkout copy: USD core variants $79/mo, $197/qtr, $657/yr; AUD core variants (161174/161175/161176) $119/$299/$997 AUD — matches the canonical pairing in repo memory exactly.

### Checkout mqQikDM7 (USD trial) and Sr6KzShx (AUD trial)
- Offer ids 2150887297 (theme 2164307125) and 2151254578 (theme 2166681818). Both checkout code blocks are **byte-identical to their repo counterparts** (`7-day-trial-membership/usd/checkout-blocks.html` and `.../aud/checkout-blocks.html`) — these two are the only surfaces in the entire census that are cleanly deployed and matching.
- Both carry a correct static twin-link to the paired offer slug, and the swap-verify question from the spec is resolved definitively: **no swap** — mqQikDM7 is USD ($79/$197/$657), Sr6KzShx is AUD ($119/$299/$997), exactly matching the repo's own file/folder naming and README.

## 3. Drift register — CMS-only code that must be preserved in every future merge

- **Consultations hidden header block** (`1765189457505`) — dead `6iRarwak` CTAs, hidden, safe but should be stripped at the next touch rather than carried forward silently.
- **3-4 Month age page's "SECTION 0-7" cluster** — an abandoned in-progress rebuild with its own price set, its own `6iRarwak` reference in the hidden nav, and no relationship to either the current repo file or the live render. Needs an explicit decision (keep, delete, or reconcile) before Phase 3, not a silent overwrite.
- **Snooze Access's entire body** — CMS-only, no repo source exists. Any future edit here starts from a CMS pull, not a repo file.
- **Camp Snooze's live "WAITLIST mode" block** — a materially different document from the repo file, not a formatting variant. Treat the repo file as stale until reconciled; don't assume the repo is ahead here the way it is everywhere else.
- **About Sally's hidden section cluster** — unconfirmed whether it's even the live content; needs a browser check before anyone edits based on this census's read of it.
- **Store's affiliate-product content and the separate "Offer Storefront" banned-copy block** — both CMS-only, no relationship to either `store-page.html` or `StoreV2`. The "Weekly group coaching and replays" phrase here is a live banned-language hit that exists independently of the dual-currency project.
- **Checkout z63s9VaR / vYgCNgJz stale copy** — both still run pre-dual-currency, pre-language-cleanup HTML; vYgCNgJz additionally has the "all prices are in USD" live bug on an AUD-native offer.

## 4. Follow-up required before Phase 3 can proceed on the unresolved pages

1. Locate the body source for Newborn, 5-12 Month, and Toddler age pages, and for 5-12 Month Course, Newborn Sleep Guide, and Toddler Toolkit. Try `section_filter: "1600450646561"` (the `page_content` typed-anchor entry) first; if that doesn't resolve it, use `agent-browser` on each page's admin edit URL directly rather than continuing to pattern-match against the 142-entry site-theme index.
2. Confirm via `content_for_index` (or a direct browser check) which of the 3-4 Month age page's duplicate "SECTION 0-7" blocks, if any, is the one that actually renders live — the current read cannot distinguish an active block from an orphaned draft at this page.
3. Confirm About Sally's hidden-section cluster is genuinely the live content, not a disabled draft, via a direct browser check.
4. Decide an instrumentation strategy for pages that turn out to be native-builder pages (3-4 Month Course confirmed, Store confirmed, others suspected) rather than single custom-code blocks — the "paste a Custom Code block" deploy model does not apply to these pages as currently built.
