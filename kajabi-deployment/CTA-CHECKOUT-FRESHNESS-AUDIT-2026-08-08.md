# CTA checkout freshness audit (August 8, 2026)

**Status:** findings only; no code changes shipped from this audit  
**Handoff for:** Claude Code (or any executor) to remediate after human ruling  
**Checked:** live `joinsnooze.com` + deployable sources under [`pages/`](./pages/), [`global/`](./global/), [`components/`](./components/)  
**Related ruling:** trial-first acquisition + adjacent renewal disclosure: [`docs/projects/catnapping-guide/4_working-cng002/verify/cta-trial-ADJUDICATION.md`](../../../docs/projects/catnapping-guide/4_working-cng002/verify/cta-trial-ADJUDICATION.md)

---

## Verdict

Public CTAs are **not** going to 404s. Almost every offer slug still mounts a real Kajabi embedded checkout.

The real problem is **freshness**. Home and [`/snooze-membership`](./pages/website/snooze-membership/) sell the **7-day trial** (`mqQikDM7`). Age hubs, challenge pages, store, product pages, `/links`, method, about and chooser still send people to **paid membership** (`z63s9VaR`). Those links work; they skip the current acquisition funnel.

| Question | Answer |
|---|---|
| Dead `#` / empty href CTAs on live traffic pages? | **None found** |
| Offer URLs resolving? | **Yes** (embedded `kjb-embedded-checkout` present) |
| Same checkout as current acquisition? | **No** on most pages |
| Gated / login-wall offers in public path? | **No** on live camp/age/challenge pages; alumni + old Camp slug exist in emails/docs only |

---

## Canonical offer tokens (do not invent)

Currency map source: [`global/js/currency-toggle.js`](./global/js/currency-toggle.js) `offerMapping` (also mirrored in [`global/html/site-header-page-scripts.html`](./global/html/site-header-page-scripts.html)).

| Role | USD slug | AUD twin | Live checkout title / signal |
|---|---|---|---|
| **7-day trial (current acquisition)** | `mqQikDM7` | `Sr6KzShx` | Your Access to Snooze, Free for 7 Days |
| Paid membership (BAU / post-trial) | `z63s9VaR` | `vYgCNgJz` | Your Access to the Snooze Membership |
| Camp (current live page) | `K3Y6FEKX` | `46Bz9tk6` | Embedded checkout present |
| Signature consult | `4zHPSRCs` | `wgqokagt` | 1:1 Signature Sleep Consultation |
| Newborn free preview | `zs2zLeUw` | (none in map) | Newborn Sleep Guide preview |
| 3-4 free module | `dk25rdGU` | (none) | LMCR08 |
| 5-12 / early-rising free module | `2x92uaLF` | (none) | LMCR04; thank-you `/thankyou/2x92uaLF` live |
| Nap mini guide | `FwisMwa6` | (none) | 3-to-2 Nap Transition Mini Guide |
| Toddler sample (orphan) | `4HQjFJGC` | (none) | Toddler Toolkit - Sample Access; **not linked** from toddler age page |
| Catnapping PWYW (delinked) | `maowxKB6` | (none) | Still live; challenge page uses form grant instead |

**Author USD slugs in page HTML.** Keep `.dynamic-cta` + `data-checkout` so the currency engine can swap AUD twins.

Trial CTA copy rule (from adjudication): button to trial checkout **plus** adjacent renewal disclosure. Do not ship a bare “Start the 7 day trial” with no day-8 charge note.

---

## Live page matrix (August 8, 2026)

Primary conversion offers only. Nav consult `4zHPSRCs` appears sitewide from theme chrome; ignore for freshness.

| Live URL | Trial `mqQikDM7` | Paid mem `z63s9VaR` | Other conversion | Freshness |
|---|---|---|---|---|
| `/` | yes (text CTAs) | yes (nav Join Snooze) | consult | Trial primary; paid leftover in nav |
| `/snooze-membership` | yes (primary) | yes (secondary/nav) | consult | **CURRENT** |
| `/store` | no | yes (Join Snooze) | consult | Paid only |
| `/newborn-baby-sleep-help` | no | yes | LM `zs2zLeUw` | Paid not trial |
| `/3-4-month-baby-sleep-help` | no | yes | LM `dk25rdGU` | Paid not trial |
| `/5-12-month-baby-sleep-help` | no | yes | LM `2x92uaLF` | Paid not trial |
| `/toddler-sleep-help` | no | yes | (no LM) | Paid not trial; sample offer orphan |
| `/catnapping` | no | yes | Form `2148526865` | Paid not trial; form OK |
| `/early-rising` | no | yes | LM `2x92uaLF` | Paid not trial |
| `/nap-transitions` | no | yes | LM `FwisMwa6` | Paid not trial |
| `/sleep-regressions` | no | yes | Form → `/3-4-month-masterclass-replay` | Paid not trial; form OK |
| `/bedtime-battles` | no | yes | (membership only) | Paid not trial |
| `/night-wakings` | no | yes | (membership only) | Paid not trial |
| `/which-is-right-for-us` | no | yes | consult | Paid not trial |
| `/the-snooze-method` | no | yes | consult | Paid not trial |
| `/about-sally` | no | yes | consult | Paid not trial |
| `/links` | no | yes (primary) | - | Paid not trial |
| `/camp-snooze-sleep-coaching` | no | no | `K3Y6FEKX` | Camp OK |
| `/one-on-one-sleep-consultations` | no | yes | consult offers | Consult path OK |

Lead magnets and forms were complete (embedded checkout or live form/replay). No broken offer destinations on those paths.

---

## Repo sources to change (if trial-first is ruled)

Swap **primary membership conversion CTAs** from paid `z63s9VaR` → trial `mqQikDM7/checkout` where the intent is acquisition. Do **not** blindly replace every `z63s9VaR` (BAU checkout pages, upgrade emails, post-trial upgrade paths stay on paid).

### High priority (live website conversion)

| File | Current membership CTA | Proposed |
|---|---|---|
| [`pages/website/age-pages/newborn-page-complete.html`](./pages/website/age-pages/newborn-page-complete.html) | `z63s9VaR/checkout` “Access with the Snooze Membership” | Trial + disclosure (or `/snooze-membership` explore + trial) |
| [`pages/website/age-pages/3-4-month-page-complete.html`](./pages/website/age-pages/3-4-month-page-complete.html) | same | same |
| [`pages/website/age-pages/5-12-month-page-complete.html`](./pages/website/age-pages/5-12-month-page-complete.html) | same | same |
| [`pages/website/age-pages/toddler-page-complete.html`](./pages/website/age-pages/toddler-page-complete.html) | same | same; optional wire `4HQjFJGC` free sample |
| [`pages/website/catnapping/catnapping-page-complete.html`](./pages/website/catnapping/catnapping-page-complete.html) | bare `/offers/z63s9VaR` | Trial or `/snooze-membership` |
| [`pages/website/early-rising/early-rising-page-complete.html`](./pages/website/early-rising/early-rising-page-complete.html) | bare `z63s9VaR` | same |
| [`pages/website/nap-transitions/nap-transitions-page-complete.html`](./pages/website/nap-transitions/nap-transitions-page-complete.html) | bare `z63s9VaR` | same |
| [`pages/website/sleep-regressions/sleep-regressions-page-complete.html`](./pages/website/sleep-regressions/sleep-regressions-page-complete.html) | bare `z63s9VaR` | same |
| [`pages/website/bedtime-battles/bedtime-battles-page-complete.html`](./pages/website/bedtime-battles/bedtime-battles-page-complete.html) | bare `z63s9VaR` | same |
| [`pages/website/night-wakings/night-wakings-page-complete.html`](./pages/website/night-wakings/night-wakings-page-complete.html) | bare `z63s9VaR` | same |
| [`pages/website/store/store-page.html`](./pages/website/store/store-page.html) | `z63s9VaR/checkout` Join Snooze | Trial if acquisition; else leave paid |
| [`pages/website/product-pages/*/`](./pages/website/product-pages/) Join Snooze buttons | `z63s9VaR/checkout` | same decision |
| [`pages/landing/linktree/linktree-landing-page.html`](./pages/landing/linktree/linktree-landing-page.html) | `z63s9VaR/checkout` | Trial (bios → `/links`) |
| [`pages/website/snooze-method/the-snooze-method.html`](./pages/website/snooze-method/the-snooze-method.html) | `z63s9VaR/checkout` | Trial or membership sales page |
| [`pages/website/chooser/which-is-right-for-us-page-complete.html`](./pages/website/chooser/which-is-right-for-us-page-complete.html) | membership handoff | Align with trial-first |

Challenge pages still carry the parked comment “when a dedicated membership sales page ships, repoint”. That page is [`pages/website/snooze-membership/snooze-membership-page.html`](./pages/website/snooze-membership/snooze-membership-page.html). Prefer either:

1. **Explore:** `/snooze-membership` (sales page, trial CTA there), or  
2. **Start trial:** `https://www.joinsnooze.com/offers/mqQikDM7/checkout` + disclosure  

Home contract (already correct for trial text links): [`pages/website/home/README.md`](./pages/website/home/README.md).

### Do not change without a separate ruling

| Surface | Why |
|---|---|
| [`pages/checkout/bau-membership-checkout/`](./pages/checkout/bau-membership-checkout/) | This **is** the paid offer checkout |
| BAU / trial upgrade emails pointing at `z63s9VaR` | Post-trial / upgrade intent |
| Alumni emails `ppb7mdjf` / `pRcRVDD2` | Gated by design (login wall for anonymous is expected) |
| Catnapping form capture (not `maowxKB6`) | Intentional; see [`pages/website/catnapping/CAPTURE-SETUP.md`](./pages/website/catnapping/CAPTURE-SETUP.md) |
| Camp live page `K3Y6FEKX` | Already current |

### Docs / mockup cleanup (low)

| Slug | Visitor sees | Where |
|---|---|---|
| `muRW6ug5` | Login For Access | Old Camp standalone; still in Camp READMEs / mockups. Live camp page uses `K3Y6FEKX`. |
| `ppb7mdjf` / `pRcRVDD2` | Login For Access | Alumni emails only; OK if unlisted |

---

## Human rulings needed before paste

1. **Trial-first on age + challenge pages?** Yes / no. If yes, require adjacent renewal disclosure per adjudication.  
2. **Membership CTA shape:** deep-link trial checkout vs send to `/snooze-membership` then trial?  
3. **Store / product “Join Snooze”:** trial or paid?  
4. **Wire toddler `4HQjFJGC` free sample** on [`toddler-page-complete.html`](./pages/website/age-pages/toddler-page-complete.html)? Phase-5 left it unwired on purpose.  
5. **Nav “Join Snooze” → `z63s9VaR`:** leave as paid BAU entry, or retarget?

Default assumption if no reply and executor is told to ship trial-first: age + challenge + links + method primary CTAs → `mqQikDM7/checkout` with disclosure; store/product wait for ruling (3).

---

## Suggested executor done-tests

```bash
# After edits: age + challenge membership CTAs should prefer trial or /snooze-membership
rg -n 'offers/z63s9VaR' \
  apps/snooze-website/kajabi-deployment/pages/website/age-pages \
  apps/snooze-website/kajabi-deployment/pages/website/{catnapping,early-rising,nap-transitions,sleep-regressions,bedtime-battles,night-wakings}

# Trial present where ruled
rg -n 'offers/mqQikDM7/checkout' \
  apps/snooze-website/kajabi-deployment/pages/website/age-pages \
  apps/snooze-website/kajabi-deployment/pages/website/{catnapping,early-rising,nap-transitions,sleep-regressions,bedtime-battles,night-wakings}

# Live smoke (post-deploy)
curl -sS -o /dev/null -w '%{http_code}\n' \
  'https://www.joinsnooze.com/offers/mqQikDM7/checkout' \
  'https://www.joinsnooze.com/offers/z63s9VaR/checkout'
```

Paste via [`PASTE-MAP.md`](./PASTE-MAP.md) and the surface rules in [`../docs/technical/KAJABI-SURFACE-CODE-SETUP.md`](../docs/technical/KAJABI-SURFACE-CODE-SETUP.md). Use `scripts/emit_paste_js.py` for Kajabi pastes; do not hand-transcribe.

---

## Method notes

- Live HTTP checks for `kjb-embedded-checkout` / React checkout mount (Kajabi loads products client-side).  
- Offer inventory from deployable HTML/JS under `kajabi-deployment/` (excluded `_live-preimages`, `_retired`, `_archive`).  
- Kajabi MCP was `needsAuth` during the audit session; product-grant line items were not re-verified in admin.  
- Cursor canvases (session artefacts, not repo): `age-challenge-cta-offer-audit`, `cta-checkout-freshness-audit`.

---

## Out of scope for this doc

- Copy rewrite beyond CTA href + required trial disclosure  
- Registry markdown sync for LDGD02 / LMCR tokens in [`docs/operations/KAJABI-OFFERS-REGISTRY.md`](../../../docs/operations/KAJABI-OFFERS-REGISTRY.md) (tokens verified live; registry rows still sparse)  
- Nav theme chrome outside page custom-code blocks (Kajabi native header “Join Snooze”)
