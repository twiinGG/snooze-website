# Batch 1 Kajabi paste guide (CU-001, tag website-v1.1.0)

Deploy runbook for the copy-uplift Batch 1. Every stage links the repo file (click to open in Cursor), the live page, and the Kajabi admin location. Repo state: main, tag `website-v1.1.0` onward. The dual-currency engine v2 is ALREADY LIVE in Header Page Scripts (2026-07-02); no engine paste needed.

**Ground rules:** git is the source of truth, Kajabi is the rendering surface. One paste cycle per page. Do not edit copy in the Kajabi editor; fix in repo, commit, re-paste. Kajabi MCP pages/themes toolsets deactivate per session; re-run `enable_toolset` if MCP calls fail.

**Recurring admin entry points:**
- Website pages list: <https://app.kajabi.com/admin/sites/2148291177/website_pages>
- Theme customizer (content blocks live here): <https://app.kajabi.com/admin/sites/2148291177/themes> → active site theme 2156873377 → **Customize** → pick the page in the top page dropdown. Deep links into the customizer 404; always enter via this route.
- Offers list: <https://app.kajabi.com/admin/sites/2148291177/offers>
- Header Page Scripts (site-wide JS): <https://app.kajabi.com/admin/sites/2148291177/edit/site-details>

---

## Stage 0: prerequisites (before any paste)

- [x] **Publish the camp AUD member offer.** DONE (published by Kade). Offer: [Camp Snooze (Member Discount) AUD](https://app.kajabi.com/admin/offers/2151264520/edit) · 2151264520 · $878 AUD · checkout `ENhg45mj` · internal title `P_CM02_AUD`.
- [x] **Registry Sheet rows** — DONE (Claude, 2026-07-03, via the khorus-spellbook service account + gog-adjacent Sheets API). In the [registry workbook](https://docs.google.com/spreadsheets/d/1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg/edit) OFFERS tab: row 20 corrected to the USD member offer P_CM02 ($611, offer 2150947919; it had been mislabelled AUD with the dead `rVuLzkZa` slug); new row P_CM02_AUD ($878 AUD, offer 2151264520) appended; AUD membership row un-marked from "pending publish". The USD membership row already carried all three cadences ($79/$197/$657). Repo markdown [KAJABI-OFFERS-REGISTRY.md](../../../docs/operations/KAJABI-OFFERS-REGISTRY.md) matches.
- [x] **Create the member 2-Week consult offer** (decision 3 = Option B) — DONE as DRAFTS via MCP `create_offer` (2026-07-04, product 2148761857). USD $2,800 = offer **2151265178** ([edit](https://app.kajabi.com/admin/offers/2151265178/edit)); AUD $3,970 = offer **2151265179** ([edit](https://app.kajabi.com/admin/offers/2151265179/edit)). Both DRAFT. **Kade to do:** publish both in admin, then record the checkout tokens in [KAJABI-OFFERS-REGISTRY.md](../../../docs/operations/KAJABI-OFFERS-REGISTRY.md) (MEMCS02 entry) and wire the AUD token into the currency-engine `offerMapping`. Consultations page already quotes $2,800/A$3,970 (`data-usd`/`data-aud`).
- [ ] **Delete the unwired June-28 AUD draft offers** (ids 2151254356 to 2151254363) in the [offers list](https://app.kajabi.com/admin/offers) so nobody wires a stale twin. The July-02 twin set is canonical. (Admin-UI action; no MCP delete endpoint. Kade to do.)

---

## Stage 1: Home page (paste-ready, highest value)

| | |
|---|---|
| Repo file (open in Cursor) | [home-page.html](../kajabi-deployment/pages/website/home/home-page.html) · change log: [README](../kajabi-deployment/pages/website/home/README.md) |
| Live page | <https://www.joinsnooze.com> |
| Page settings (SEO) | <https://app.kajabi.com/admin/website_pages/2154679189/edit> |
| Content block | [customizer](https://app.kajabi.com/admin/sites/2148291177/themes) → Customize → page dropdown "Home" → section `1768118757163` (one ~50KB Full Page custom-code block) |

**Write path (proven 2026-07-02):** headed agent-browser with you logged in →
1. Open the Full Page block's code editor (Ace id `settings-sections-1768118757163-blocks-<bid>-settings-code-input`).
2. Load [home-page.html](../kajabi-deployment/pages/website/home/home-page.html) programmatically (chunked base64 from disk via `ace.edit(...).setValue()`), one real dirty keystroke (`ed.insert(" "); ed.remove("left")`) so Save enables, then a TRUSTED click on Save (agent-browser `click @ref`, not synthetic).
3. Re-read via MCP `get_theme_content` and byte-compare against the repo file. Mismatch = re-paste; never hand-fix in the editor.

**Post-paste, same session:**
- [x] [Header Page Scripts](https://app.kajabi.com/admin/sites/2148291177/edit/site-details) still carries the runtime pricing enhancer ([home-pricing-enhance.html](../kajabi-deployment/global/js/home-pricing-enhance.html)). The pasted source is already instrumented; keep the enhancer's toggle-mount + "Prices in" label, retire its price-tagging if the pricing section double-renders.
- [x] Logged-out incognito on <https://www.joinsnooze.com>: hero "Join Your Baby Sleep Lifeline" (no 24/7); no "Weekly Live Coaching"; camp card $611 (save $79) / $690 incl. bonus month + the 50%-for-life line + "a small group of families per intake" (no number); toggle flips to A$119/A$299/A$997/A$878/A$997 and round-trips; CTAs resolve (z63s9VaR ↔ vYgCNgJz); zero console errors.
- [x] Link checker + placeholder scan per [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md).

---

## Stage 2: About Sally, Snooze Method explainer, Library (locate block, then paste)

Use the Stage-1 write path (or MCP `update_theme_content` deep-merge of `blocks.<id>_0.settings.code`, which persists cleanly for site-theme sections). The census could not confirm About Sally's live section (candidate cluster `1764848792000`–`014` is mostly hidden; its code block is 2.5KB, too small for the page) — confirm which block renders live by matching an H1 before pasting, and record the real section id in [KAJABI-CODE-SURFACE-MAP.md](./dynamic-currency/KAJABI-CODE-SURFACE-MAP.md). 

### 2a. About Sally
| | |
|---|---|
| Repo file | [about-sally.html](../kajabi-deployment/pages/website/about-sally/about-sally.html) · change log: [README](../kajabi-deployment/pages/website/about-sally/README.md) |
| Live page | <https://www.joinsnooze.com/about-sally> |
| Page settings | <https://app.kajabi.com/admin/website_pages/2154679198/edit> |
| Content block | [customizer](https://app.kajabi.com/admin/sites/2148291177/themes) → page dropdown "About" → locate the rendering block (candidate `1764848792000` cluster, UNCONFIRMED) |

- [x] Verify after paste: opener reads "Structure first, then the flexibility and support to hold it when life gets messy"; TWO FAQs only ("Is Sally a registered nurse?" + merged "What are Sally's qualifications?" with the ACU degree); no "leaving them to cry"; both JSON-LD blocks parse; no em dashes.

### 2b. Snooze Method explainer — LANDING PAGE, now fully self-contained
| | |
|---|---|
| Repo file | [the-snooze-method.html](../kajabi-deployment/pages/website/snooze-method/the-snooze-method.html) · change log: [README](../kajabi-deployment/pages/website/snooze-method/README.md) |
| Live URL (draft, admins only) | <https://www.joinsnooze.com/the-snooze-method> |
| Landing pages list | <https://app.kajabi.com/admin/sites/2148291177/landing_pages> (a same-slug DRAFT website page also exists at [2156725968](https://app.kajabi.com/admin/website_pages/2156725968/edit); deploy to ONE surface and leave the other draft/deleted so the slug is unambiguous) |

The page is a landing page, so it does NOT load `snooze-unified-theme.css`. The repo file is now SELF-CONTAINED: its own font/icon links plus a scoped `<style>` block (brand tokens, cream hero, card grids, navy CTA band, responsive). No page JS needed; site-wide Header Page Scripts still run on landing pages and drive the checkout CTA (`dynamic-cta` → z63s9VaR ↔ vYgCNgJz; the old dead `#pricing` anchor is gone).

- [ ] Paste the whole file into the landing page's custom code block, then PUBLISH (decision 8: philosophy/approach pillar; keep the URL, never 404 it). _Repo verified paste-ready 2026-07-04: self-contained (own fonts/FA/scoped CSS), H1 "The Snooze Methodology", two tiers (no Foundational), `dynamic-cta`→z63s9VaR (no dead #pricing), tier CTAs repointed `/library`→`/snooze-library`, no em dashes/banned phrases._
- [ ] Verify logged-out: styled cream hero, three-card row, two tier cards side by side (stacked on mobile), navy closing band; H1 "The Snooze Methodology"; no Foundational tier; "sleep training wars" line present; Join Snooze CTA opens the membership checkout and flips currency with the toggle; Font Awesome icons render.

### 2c. Library — two-surface architecture RESOLVED (Kade ratified, 2026-07-04)

**Ratified model:** curated `/snooze-library` = the canonical "Snooze Library" (paste target for [library-page.html](../kajabi-deployment/pages/website/library/library-page.html)); the system `/library` stays as the auto-product utility surface and is never NAMED "the Snooze Library" in member copy; in-product member links may legitimately stay on the community library `/products/communities/v2/snooze/library`.

**Link audit done + repo made to match (2026-07-04, all grep-verified):** public-marketing links repointed to `/snooze-library` — snooze-method tier CTAs (2), four product-page "Sleep Library" links, About Sally's `SNOOZE_LIBRARY_URL` JS global (was deviating to the community library). The two 1-month-free welcome emails' odd `/library` links were repointed to the community library to match the 7-day sibling flow. Nav/footer/globals/glossary/thank-you/checkin already correct — left as-is. Full audit: session scratchpad `agent-library-audit.md`.

**About Sally re-paste needed:** the JS-global fix (+ two banned-word `unlock`→`get`/`member` fixes found in the same file) change the already-live About Sally page; it needs a re-paste in the next paste session. Product-page and email edits paste whenever those surfaces next deploy (not Batch-1 stages).

**Resolved (PRD-CLOSEOUT hygiene tail, 2026-07-05):** `library-page-complete.html` archived to `kajabi-deployment/_retired/library-page-complete/` (grep-confirmed no live surface referenced it). `library/DEPLOYMENT-GUIDE.md` and `INDEX.md` marked superseded with a correction pointing to the ratified `/snooze-library` target; `kajabi-deployment/README.md` tree and paths updated to the current `pages/website/library/` layout. `HEADER-REMOVAL-SUMMARY.md` left as-is: it is a dated historical changelog of a completed Dec 2025 action, not a live spec, so its old paths were left intact rather than rewritten.

| | |
|---|---|
| Repo file | [library-page.html](../kajabi-deployment/pages/website/library/library-page.html) · change log: [README](../kajabi-deployment/pages/website/library/README.md) |
| Curated candidate | <https://www.joinsnooze.com/snooze-library> · [page settings](https://app.kajabi.com/admin/website_pages/2156716053/edit) |
| System auto-products page | <https://www.joinsnooze.com/library> · [page settings](https://app.kajabi.com/admin/website_pages/2154679192/edit) |

- [ ] Resolve the two-surface model (next session), then paste into the chosen surface.
- [ ] Verify after paste: "Age-Based Courses and Guides" heading; Live Sessions card says masterclasses and coaching; "One-on-One Support" card; NO "On-Demand Webinars" coming-soon card; Snooze Bot still Coming Soon; caps perk intact.

---

## Stage 3: Consultations page (single-block paste; the census misread this page)

**Corrected by Kade's deploy inspection (2026-07-03): the live page is ONE custom code block for the whole page, plus two custom code blocks for the header and footer.** The June census's "native offer blocks + Content 2 text block" read was wrong (or described a since-replaced build). That makes this a normal Stage-1-style paste, and it means the currency JS CAN drive the page's prices (the repo file is fully dynamic-price instrumented).

| | |
|---|---|
| Repo file (paste wholesale) | [one-on-one-consultations-page.html](../kajabi-deployment/pages/website/consultations/one-on-one-consultations-page.html) · [README](../kajabi-deployment/pages/website/consultations/README.md) |
| Live page | <https://www.joinsnooze.com/one-on-one-sleep-consultations> |
| Page settings (SEO) | <https://app.kajabi.com/admin/website_pages/2155283958/edit> |
| Content block | [customizer](https://app.kajabi.com/admin/sites/2148291177/themes) → page dropdown "1:1 Baby Sleep Consultations" → the single whole-page custom code block (leave the header/footer blocks alone) |

- [ ] Paste the repo file into the whole-page block (Stage-1 write path). The file already carries: credential standard incl. the ACU degree, zero email-support promises, member 2-week $2,800/A$3,970, camp/consult prices per registry. _Repo verified paste-ready 2026-07-04: zero email-support hits, "former registered paediatric nurse" + Bachelor of Nursing (ACU) + non-practising, all prices `dynamic-price` USD/AUD, div balance 91/91, banned word "unlock" removed (3 spots), no em dashes._
- [ ] **Page settings SEO description** → the wording in [README](../kajabi-deployment/pages/website/consultations/README.md) ("internationally certified sleep consultant and former registered paediatric nurse").
- [ ] Verify logged-out on the [live page](https://www.joinsnooze.com/one-on-one-sleep-consultations): zero "email support" hits (Cmd-F); "My Qualifications" reads former registered paediatric nurse + Bachelor of Nursing (ACU) + non-practising; prices flip with the currency toggle; member 2-week shows $2,800.

---

## Stage 4: Store V2 — HOLD (decision 10 = B + C)

Ruling: Store V2 deploys by REPLACING [/store](https://www.joinsnooze.com/store) ([page settings](https://app.kajabi.com/admin/website_pages/2154679200/edit)), with the affiliate content consolidating into [/recommended-products](https://www.joinsnooze.com/recommended-products) ([page settings](https://app.kajabi.com/admin/website_pages/2155085720/edit)) — but only WHEN the brief-8 pricing-presentation redesign lands. Until then Store V2 stays repo-only: [store-page-v2.html](../kajabi-deployment/pages/website/StoreV2/store-page-v2.html).

- [ ] **Do now regardless:** the live /store "Offer Storefront" text block (`1764559895491_0`) still says "Weekly group coaching and replays" (banned language) → replace via customizer with "Live masterclasses and coaching sessions with the Snooze Specialists, plus a full library of catch up recordings."
- [ ] At deploy time: Store V2's `#store-page-v2` wrapper needs a System Initialization block in [snooze-unified-theme.css](../kajabi-deployment/global/css/snooze-unified-theme.css) if not already present (see [AGENTS.md](../AGENTS.md) CSS rule).

---

## Stage 5: admin-only fixes (no repo source exists)

- [x] **MEMCS01 checkout (`igbTdRbk`): RESOLVED, nothing to do.** Kade inspected 2026-07-03: the checkout carries NO custom code today. The June site-audit capture (which showed two "7 days of email support" promises) is stale; the code has since been removed. No action.
- [ ] **Consult email sequences** (bodies unreadable via API): [email sequences](https://app.kajabi.com/admin/email_sequences) → consultation confirmation/follow-up sequences → remove any "7 days email support" promise.
- [ ] **Nap Trapped caps 10% perk** into the community side column (product brief 7): [community admin](https://www.joinsnooze.com/products/communities/v2/snooze) → settings → side column block matching the [library perk](../kajabi-deployment/pages/website/library/library-page.html) (search "NAPTRAPPEDFRIENDS").

---

## Close-out

- [ ] Log the deploy in the deployment log: pages changed, tag, deployer, validator.
- [ ] Update [07-implementation-plan.md](../../../docs/projects/copy-uplift/07-implementation-plan.md) §12 with what shipped and when.
- [ ] GEO re-check after About Sally + consultations land: ask Gemini/ChatGPT "Is Sally Woods a registered nurse?" over the following weeks and confirm the non-practising framing wins.

