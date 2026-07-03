# Batch 1 Kajabi paste guide (CU-001, tag website-v1.1.0)

Self-contained deploy runbook for the copy-uplift Batch 1. Every step names the exact repo file, the exact Kajabi location, and the verification that gates the next step. Repo state: commit `9566c39e1` on main, tag `website-v1.1.0`. The dual-currency engine v2 is ALREADY LIVE in Header Page Scripts (deployed 2026-07-02), so no engine paste is needed; the price copy in these files renders through it.

**Ground rules:** git is the source of truth, Kajabi is the rendering surface. One paste cycle per page. Do not edit copy in the Kajabi editor; if something is wrong, fix in repo, commit, re-paste. Kajabi MCP pages/themes toolsets deactivate per session; re-run `enable_toolset` if MCP calls fail.

---

## Stage 0: prerequisites (before any paste)

- [ ] **Publish the camp AUD member offer.** Admin → Offers → "Camp Snooze (Member Discount) AUD" (offer 2151264520, $878 AUD, checkout `ENhg45mj`) → set internal title `P_CM02_AUD` if missing → Publish. The home and Store V2 camp cards quote A$878; publishing first means the price is purchasable the moment the copy lands.
- [ ] **Add the two registry Sheet rows** (workbook `1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg`):
  1. `P_CM02_AUD` · Camp Snooze (Member Discount) AUD · offer 2151264520 · checkout ENhg45mj · $878 AUD one-time · published (after the step above).
  2. On the core membership row (`PUBMS01`): record the three cadences per currency: USD $79/mo [variant 68112] · $197/qtr [37262] · $657/yr [37263] on offer 2150754998 (z63s9VaR); AUD $119/mo [161174] · $299/qtr [161175] · $997/yr [161176] on offer 2151256977 (vYgCNgJz). The repo markdown (`docs/operations/KAJABI-OFFERS-REGISTRY.md`) is already synced.
- [ ] **Delete the unwired June-28 AUD draft offers** (2151254356 to 2151254363) in admin, per the July-02 canonical-set note, so nobody wires a stale twin.

---

## Stage 1: Home page (paste-ready, highest value)

**Repo file:** `apps/snooze-website/kajabi-deployment/pages/website/home/home-page.html` (the live 2026-07-02 instrumented capture + every approved Batch-1 edit; change log in that folder's README).

**Live location:** site theme 2156873377, website-pages customizer → Home → section `1768118757163` (one ~50KB Full Page custom-code block).

**Write path (proven 2026-07-02):** headed agent-browser with you logged in →
1. Admin → Website → customizer → select the Home page in the page dropdown → open the Full Page block's code editor (Ace id `settings-sections-1768118757163-blocks-<bid>-settings-code-input`).
2. Load the repo file into the editor programmatically (chunked base64 from disk via `ace.edit(...).setValue()`), then make one real dirty keystroke (`ed.insert(" "); ed.remove("left")`) so Save enables, then a TRUSTED click on Save (agent-browser `click @ref`, not synthetic JS click).
3. Re-read the block via MCP `get_theme_content` and byte-compare against the repo file. Mismatch = re-paste; never hand-fix in the editor.

**Post-paste, same session:**
- [ ] Header Page Scripts still carries `home-pricing-enhance.html` (the runtime pricing enhancer). The pasted source is already instrumented, so review the enhancer: keep its toggle-mount + "Prices in" label, retire its price-tagging if it double-fires (check the pricing section renders once, correctly).
- [ ] Logged-out incognito: hero reads "Join Your Baby Sleep Lifeline" (no 24/7); no "Weekly Live Coaching"; camp card shows $611 (save $79) / $690 incl. bonus month + the 50%-for-life line; toggle flips every price to A$119/A$299/A$997/A$878/A$997 and round-trips; all CTAs resolve (z63s9VaR ↔ vYgCNgJz, camp offer link works); zero console errors.
- [ ] Run the link checker + placeholder scan per `docs/DEPLOYMENT-CHECKLIST.md`.

---

## Stage 2: About Sally, Snooze Method explainer, Library (locate, then paste)

These three are believed to be single custom-code surfaces but the census could not confirm About Sally's live section (its candidate cluster `1764848792000`–`014` is mostly `hidden: true`, code block `1764813703352_0` is only 2.5KB, far too small for the 404-line page).

For each page:
1. Open the website-pages customizer, select the page in the page dropdown, and identify the block(s) that render the live content (compare an H1 or a unique sentence against the live page in incognito).
2. Paste the repo file wholesale into that block using the Stage-1 write path (or MCP `update_theme_content` deep-merge of `blocks.<id>_0.settings.code` for site-theme sections, which persists cleanly for these).
3. Verify per the checklist below.

| Page | Repo file | Verify after paste |
|---|---|---|
| About Sally | `pages/website/about-sally/about-sally.html` | New FAQ "What are Sally's qualifications?" with the ACU degree renders; nurse FAQ answers "non-practising registration"; philosophy card has no "leaving them to cry"; both JSON-LD blocks parse (view-source, paste into a JSON validator); no em dashes |
| Snooze Method explainer | `pages/website/snooze-method/the-snooze-method.html` | H1 "The Snooze Methodology"; no Foundational tier; two cards render side by side; closing CTA names age-based courses; "sleep training wars" line present |
| Library | `pages/website/library/library-page.html` | "Age-Based Courses and Guides" heading; Live Sessions card says masterclasses and coaching; "One-on-One Support" card; NO "On-Demand Webinars" coming-soon card; Snooze Bot still Coming Soon; caps perk intact |

- [ ] If the About Sally hidden cluster turns out NOT to be the live content (page renders from somewhere else), record the real section id in `docs/dynamic-currency/KAJABI-CODE-SURFACE-MAP.md` before pasting.

---

## Stage 3: Consultations page (MCP block edits, not a single paste)

The live consultations page is section-built: pricing uses native Kajabi offer-type blocks (they pull price from Offer records and are invisible to the currency JS), and the credential text lives in a native TEXT block. The repo file is the source of truth for wording; land the wording into the specific live blocks:

- [ ] **Credential fix:** site-theme section `1765189457512` ("Content 2", the My Qualifications text). Replace the "Registered Paediatric Nurse" present-tense sentence with the repo wording: "I'm an internationally certified sleep consultant and a former registered paediatric nurse with over 10 years of childcare experience. I hold a Bachelor of Nursing from Australian Catholic University and I'm currently on a non-practising registration." Use MCP `update_theme_content` (proven for this page).
- [ ] **7-days email support:** find every live block on the page carrying "7 days email support" / "Email support for 7 days" / "7-day email support window" (the repo file previously had 7 instances: signature feature list, What to Expect cards, comparison lists, two FAQ answers) and remove the promise exactly as the repo file now reads (`pages/website/consultations/one-on-one-consultations-page.html` is the reference).
- [ ] **Strip the hidden dead header block** `1765189457505` (dead 6iRarwak CTAs) rather than carrying it forward.
- [ ] **Kajabi page settings SEO description** → repo `pages/website/consultations/README.md` line 12 wording ("internationally certified sleep consultant and former registered paediatric nurse").
- [ ] Verify logged-out: zero "email support" hits on the rendered page (Cmd-F), credential correct, prices render from offers.

---

## Stage 4: Store V2 (decision-gated — do not paste yet)

`StoreV2/store-page-v2.html` has never been deployed; live `/store` is Sally's affiliate page. Decide item 10 in `docs/projects/copy-uplift/09-decision-doc-session-3.md` first. Once decided:
- [ ] Create/repurpose the target page, add a `#store-page-v2` System Initialization block to `snooze-unified-theme.css` if the wrapper is new to the live theme (see `apps/snooze-website/AGENTS.md`, CSS rule), paste the file, verify prices ($79/$657 membership, $611/$878 camp, From $290 consults, From $67 guides) flip currency and every CTA resolves.
- [ ] Regardless of the decision, fix now in admin: the live `/store` "Offer Storefront" text block (`1764559895491_0`) still says "Weekly group coaching and replays" → replace with "Live masterclasses and coaching sessions with the Snooze Specialists, plus a full library of catch up recordings."

---

## Stage 5: admin-only fixes (no repo source exists)

- [ ] **MEMCS01 checkout (`igbTdRbk`, offer per-offer custom code):** the live checkout still promises "7 days of email support" twice ("After your consultation, you'll have 7 days of email support..." benefit card and the "Implementation Support: Use your 7 days of email support..." line). Edit the offer's checkout custom code in admin (checkout code is per-offer; see the June site-audit capture `site-audit-2026-06/data/html/offers_igbTdRbk_checkout.html` for the exact strings). Remove the promise; do not replace it with anything.
- [ ] **Consult email sequences:** Kajabi sequence email bodies are not readable via API. In admin, open the consultation confirmation/follow-up sequences and remove any "7 days email support" promise (decision 17 applies to every 1:1 surface).
- [ ] **Nap Trapped caps 10% perk side-column block** in the community (product brief 7, ship whenever convenient).

---

## Close-out

- [ ] Log the deploy in the deployment log: pages changed, tag `website-v1.1.0`, deployer, validator.
- [ ] Update `docs/projects/copy-uplift/07-implementation-plan.md` §12 with what actually shipped (which stages, dates).
- [ ] Re-run the GEO check after About Sally + consultations land: ask Gemini/ChatGPT "Is Sally Woods a registered nurse?" and confirm the answer picks up the non-practising framing over the following weeks.
