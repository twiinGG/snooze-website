# Batch 1 Kajabi paste guide (CU-001, tag website-v1.1.0)

Deploy runbook for the copy-uplift Batch 1. Every stage links the repo file (click to open in Cursor), the live page, and the Kajabi admin location. Repo state: main, tag `website-v1.1.0` onward. The dual-currency engine v2 is ALREADY LIVE in Header Page Scripts (2026-07-02); no engine paste needed.

**Ground rules:** git is the source of truth, Kajabi is the rendering surface. One paste cycle per page. Do not edit copy in the Kajabi editor; fix in repo, commit, re-paste. Kajabi MCP pages/themes toolsets deactivate per session; re-run `enable_toolset` if MCP calls fail.

**Recurring admin entry points:**
- Website pages list: <https://app.kajabi.com/admin/sites/2148291177/website_pages>
- Theme customizer (content blocks live here): <https://app.kajabi.com/admin/sites/2148291177/themes> → active site theme 2156873377 → **Customize** → pick the page in the top page dropdown. Deep links into the customizer 404; always enter via this route.
- Offers list: <https://app.kajabi.com/admin/offers>
- Header Page Scripts (site-wide JS): <https://app.kajabi.com/admin/sites/2148291177/edit/site-details>

---

## Stage 0: prerequisites (before any paste)

- [x] **Publish the camp AUD member offer.** DONE (published by Kade). Offer: [Camp Snooze (Member Discount) AUD](https://app.kajabi.com/admin/offers/2151264520/edit) · 2151264520 · $878 AUD · checkout `ENhg45mj` · internal title `P_CM02_AUD`.
- [x] **Registry Sheet rows** — DONE (Claude, 2026-07-03, via the khorus-spellbook service account + gog-adjacent Sheets API). In the [registry workbook](https://docs.google.com/spreadsheets/d/1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg/edit) OFFERS tab: row 20 corrected to the USD member offer P_CM02 ($611, offer 2150947919; it had been mislabelled AUD with the dead `rVuLzkZa` slug); new row P_CM02_AUD ($878 AUD, offer 2151264520) appended; AUD membership row un-marked from "pending publish". The USD membership row already carried all three cadences ($79/$197/$657). Repo markdown [KAJABI-OFFERS-REGISTRY.md](../../../docs/operations/KAJABI-OFFERS-REGISTRY.md) matches.
- [ ] **Create the member 2-Week consult offer at $2,800 USD** (decision 3 = Option B): [new offer](https://app.kajabi.com/admin/offers) against the 2-week consult product, single payment $2,800 USD (AUD twin A$4,228 when created), internal title suggestion `MEMCS02_2-Week-Member`. The consultations and store pages already quote $2,800/A$4,228.
- [ ] **Delete the unwired June-28 AUD draft offers** (ids 2151254356 to 2151254363) in the [offers list](https://app.kajabi.com/admin/offers) so nobody wires a stale twin. The July-02 twin set is canonical.

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
- [ ] [Header Page Scripts](https://app.kajabi.com/admin/sites/2148291177/edit/site-details) still carries the runtime pricing enhancer ([home-pricing-enhance.html](../kajabi-deployment/global/js/home-pricing-enhance.html)). The pasted source is already instrumented; keep the enhancer's toggle-mount + "Prices in" label, retire its price-tagging if the pricing section double-renders.
- [ ] Logged-out incognito on <https://www.joinsnooze.com>: hero "Join Your Baby Sleep Lifeline" (no 24/7); no "Weekly Live Coaching"; camp card $611 (save $79) / $690 incl. bonus month + the 50%-for-life line + "a small group of families per intake" (no number); toggle flips to A$119/A$299/A$997/A$878/A$997 and round-trips; CTAs resolve (z63s9VaR ↔ vYgCNgJz); zero console errors.
- [ ] Link checker + placeholder scan per [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md).

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

- [ ] Verify after paste: opener reads "Structure first, then the flexibility and support to hold it when life gets messy"; TWO FAQs only ("Is Sally a registered nurse?" + merged "What are Sally's qualifications?" with the ACU degree); no "leaving them to cry"; both JSON-LD blocks parse; no em dashes.

### 2b. Snooze Method explainer — NOTE: this website page is currently DRAFT in Kajabi
| | |
|---|---|
| Repo file | [the-snooze-method.html](../kajabi-deployment/pages/website/snooze-method/the-snooze-method.html) · change log: [README](../kajabi-deployment/pages/website/snooze-method/README.md) |
| Live URL (draft, admins only) | <https://www.joinsnooze.com/the-snooze-method> |
| Page settings | <https://app.kajabi.com/admin/website_pages/2156725968/edit> |
| Content block | [customizer](https://app.kajabi.com/admin/sites/2148291177/themes) → page dropdown "The Snooze Method" |

- [ ] Decision 8 = repurpose in place: paste the cleaned page, then PUBLISH it from page settings (it is the philosophy/approach pillar; keep the URL, never 404 it).
- [ ] Verify after paste: H1 "The Snooze Methodology"; no Foundational tier; two cards render; closing CTA names age-based courses; "sleep training wars" line present.

### 2c. Library
| | |
|---|---|
| Repo file | [library-page.html](../kajabi-deployment/pages/website/library/library-page.html) · change log: [README](../kajabi-deployment/pages/website/library/README.md) |
| Live candidates | <https://www.joinsnooze.com/snooze-library> (published website page) · <https://www.joinsnooze.com/library> (system member-area page) |
| Page settings | [snooze-library](https://app.kajabi.com/admin/website_pages/2156716053/edit) · [library (system)](https://app.kajabi.com/admin/website_pages/2154679192/edit) |
| Content block | [customizer](https://app.kajabi.com/admin/sites/2148291177/themes) → page dropdown → whichever of the two pages carries the current library layout (compare live H1 "Your Snooze Library") |

- [ ] Verify after paste: "Age-Based Courses and Guides" heading; Live Sessions card says masterclasses and coaching; "One-on-One Support" card; NO "On-Demand Webinars" coming-soon card; Snooze Bot still Coming Soon; caps perk intact.

---

## Stage 3: Consultations page (MCP block edits, not a single paste)

| | |
|---|---|
| Repo reference file | [one-on-one-consultations-page.html](../kajabi-deployment/pages/website/consultations/one-on-one-consultations-page.html) · [README](../kajabi-deployment/pages/website/consultations/README.md) |
| Live page | <https://www.joinsnooze.com/one-on-one-sleep-consultations> |
| Page settings (SEO) | <https://app.kajabi.com/admin/website_pages/2155283958/edit> |

The live page is section-built (pricing = native offer blocks, invisible to the currency JS; credential text = native TEXT block). Land the repo wording into the live blocks:

- [ ] **Credential fix:** site-theme section `1765189457512` ("Content 2", My Qualifications) via MCP `update_theme_content` → "I'm an internationally certified sleep consultant and a former registered paediatric nurse with over 10 years of childcare experience. I hold a Bachelor of Nursing from Australian Catholic University and I'm currently on a non-practising registration."
- [ ] **7-days email support:** remove every live instance (the repo file previously carried 7: signature feature list, two What to Expect cards, two comparison lists, two FAQ answers). The repo file is the corrected reference.
- [ ] **Member 2-week price:** once the $2,800 offer exists (Stage 0), confirm the live FAQ/comparison copy matches $2,800 (repo already does).
- [ ] **Strip the hidden dead header block** `1765189457505` (dead 6iRarwak CTAs).
- [ ] **Page settings SEO description** → the wording in [README](../kajabi-deployment/pages/website/consultations/README.md) ("internationally certified sleep consultant and former registered paediatric nurse").
- [ ] Verify logged-out on the [live page](https://www.joinsnooze.com/one-on-one-sleep-consultations): zero "email support" hits (Cmd-F), credential correct, prices render from offers.

---

## Stage 4: Store V2 — HOLD (decision 10 = B + C)

Ruling: Store V2 deploys by REPLACING [/store](https://www.joinsnooze.com/store) ([page settings](https://app.kajabi.com/admin/website_pages/2154679200/edit)), with the affiliate content consolidating into [/recommended-products](https://www.joinsnooze.com/recommended-products) ([page settings](https://app.kajabi.com/admin/website_pages/2155085720/edit)) — but only WHEN the brief-8 pricing-presentation redesign lands. Until then Store V2 stays repo-only: [store-page-v2.html](../kajabi-deployment/pages/website/StoreV2/store-page-v2.html).

- [ ] **Do now regardless:** the live /store "Offer Storefront" text block (`1764559895491_0`) still says "Weekly group coaching and replays" (banned language) → replace via customizer with "Live masterclasses and coaching sessions with the Snooze Specialists, plus a full library of catch up recordings."
- [ ] At deploy time: Store V2's `#store-page-v2` wrapper needs a System Initialization block in [snooze-unified-theme.css](../kajabi-deployment/global/css/snooze-unified-theme.css) if not already present (see [AGENTS.md](../AGENTS.md) CSS rule).

---

## Stage 5: admin-only fixes (no repo source exists)

- [ ] **MEMCS01 checkout (`igbTdRbk`):** [offer edit](https://app.kajabi.com/admin/offers) → search `igbTdRbk` / MEMCS01 → Checkout → custom code. Still promises "7 days of email support" twice (benefit card "After your consultation, you'll have 7 days of email support..." and "Implementation Support: Use your 7 days of email support..."). Remove; replace with nothing. Exact live strings captured in [offers_igbTdRbk_checkout.html](../site-audit-2026-06/data/html/offers_igbTdRbk_checkout.html).
- [ ] **Consult email sequences** (bodies unreadable via API): [email sequences](https://app.kajabi.com/admin/email_sequences) → consultation confirmation/follow-up sequences → remove any "7 days email support" promise.
- [ ] **Nap Trapped caps 10% perk** into the community side column (product brief 7): [community admin](https://www.joinsnooze.com/products/communities/v2/snooze) → settings → side column block matching the [library perk](../kajabi-deployment/pages/website/library/library-page.html) (search "NAPTRAPPEDFRIENDS").

---

## Close-out

- [ ] Log the deploy in the deployment log: pages changed, tag, deployer, validator.
- [ ] Update [07-implementation-plan.md](../../../docs/projects/copy-uplift/07-implementation-plan.md) §12 with what shipped and when.
- [ ] GEO re-check after About Sally + consultations land: ask Gemini/ChatGPT "Is Sally Woods a registered nurse?" over the following weeks and confirm the non-practising framing wins.

