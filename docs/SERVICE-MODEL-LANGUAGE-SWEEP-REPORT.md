# Service-model language sweep, report (2026-06-29)

Branch: `chore/service-model-language-sweep`. Companion to `SERVICE-MODEL-LANGUAGE-SWEEP-KICKOFF.md`.

## Ruling applied (from Kade, this pass)

Live sessions with the Snooze Specialists are real (Live Sleep Detectives Q&A + masterclasses) and stay as a genuine benefit. Removed the false **hard expectations**: no "weekly" cadence, no "24/7"/"around the clock", no "replay vault/library" (no guaranteed replay archive), no "never miss a session". Reframed toward a self-serve + coaching model, not on-demand consulting (paid 1:1 consults remain the consulting path). Canonical replacement: "Weekly live coaching with Sally + replay vault" then becomes "Live sessions with the Snooze Specialists"; "24/7 community support" becomes "Daily support inside the Snooze community". Note: Bec is named only in Camp Snooze (co-lead), Nap Trapped (co-host), and her paid 1:1 consults; membership benefit copy uses "the Snooze Specialists" instead.

## What changed (120 files modified, 30 new READMEs)

### Tier 1, website copy + code (full rewrite + comment strip)
- Components: `value-comparison.html`, `whats-in-snooze.html` (+ comment strip across components incl. `understanding-section`, `age-cross-linking`, `context-aware-cta`, `messenger-chat-widget`, `hero-sections/*`).
- Checkout: `1-month-free-membership` (blocks, thank-you, README), `bau-membership-checkout` (blocks, README), `7-day-trial-membership/thank-you-page.html`, `day-pass-offer/checkout-page.html`.
- Emails: 1-month-free AUD x6 and USD x6, 7-day-trial x4. AUD/USD twins verified at parity (copy identical except currency).
- Camp bundle checkouts x4: surgical fix of the membership-benefit block only ("Weekly live coaching with Sally" + "24/7 community support"); all genuine Camp Snooze lines untouched.
- Landing: `cold-traffic-landing-page`, `founding-member`, `day-pass-paidads` (kept "Live Sleep Detectives" name, dropped "weekly").
- Website: age-pages x4, product-pages x5, `snooze-method/the-snooze-method.html`, `StoreV2` (page + Copy.md), `store/store-page.html`, `about-sally`, `blog-index`, `library`.

### Tier 2, instructional / SOP / brief (rewrite)
`KAJABI-PRODUCTS-REGISTRY.md` (MS-FULL description), ManyChat IG sequence, SalesSOP-v1/v2, home-page-v2 copy + briefs, landing-page + technical briefs, store briefs, Day Pass docs, SERVICE-MODEL-FOUNDATION, DAY-PASS-TASTE-TIER-COPY (dropped "weekly" before Live Sleep Detectives).

### Tier 3, strategy (dated note only, not rewritten)
`SNOOZE-BRAND-SNAPSHOT`, `SNOOZE-GTM-PLAYBOOK`, `SNOOZE-HARD-SWITCH-STRATEGY`, `SNOOZE-FUNNEL-OPTIMIZATION-PLAN`, `SNOOZE-SERVICE-MODEL-INTEGRATION`, `SNOOZE-LEARNING-DESIGN`, `SNOOZE-MASTER-STRATEGY`, `SNOOZE-PRICING-STRATEGY`, `Snooze-Meta-Ads-Bible-v2-Andromeda`, `AI-ready-refactor/SNOOZE-SERVICE-MODEL-INTEGRATION-V3`.

### Comment strip (objective 2)
Touched deployable files + global bundle (`snooze-unified-theme.css` 342 comments, `snooze-globals.js`, `currency-toggle.js`, `gtm-variables.js`) + all components are comment-free; genuine instructions (offer IDs, deploy location, PRD refs, design-system notes) relocated to per-folder `README.md` files. Markdown docs left as-is (not pasted to Kajabi).

## Ambiguous, left for human decision
- Generic "Coaching" nav label ("Library, Village, and Coaching") on product pages, kept as a real Kajabi area name.
- `founding-member` testimonial referencing "weekly coaching calls", left as authentic member wording.
- `library-page.html` "Live Coaching & Replays" section reworded to "Live Sessions"; it links a real community `.../coaching` access group, so a factual reference to recordings already inside the community was kept, the "replay vault/library" promise framing was dropped.
- `02-kajabi-automation-audit-checklist.md` "Coaching replay vault access group", verify/rename the Kajabi access group.

## Confirmed legitimate, NOT touched
Camp Snooze copy (real paid cohort: daily calls, 10-11am AEDT, two-week intensive, incl. `KAJABI-PRODUCTS-REGISTRY` L509, `STORE-PAGE-DESIGN-BRIEF`/`STORE-PAGE-STRUCTURE` Camp cards); paid 1:1 consults; `library-page.html` Snoozebot "Coming Soon, 24/7"; competitor analysis (laurel-portie); `day-pass/index.html` real paid session + replay; `DAY-PASS-TASTE-TIER-COPY`/`SALLY-DECISIONS` correct exclusion positioning; podcast "live audience Q&A"; parent pain-point "24/7"; external reviewer feedback (`ExternalReview.md`).

## Kajabi-side flag list (repo edits do NOT reach live Kajabi, manual CMS update needed)
1. **USD trial offer `2150887297`** post-purchase body promises "weekly live coaching... replay vault", update post-purchase message in Kajabi.
2. **MS-FULL membership product description** (corrected in `KAJABI-PRODUCTS-REGISTRY.md`), also update the offers Google Sheet (workbook `1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg`) and the live Kajabi product description.
3. **All corrected page/checkout/email HTML** must be re-pasted into Kajabi custom-code blocks to go live.
4. **Offer descriptions, post-purchase / thank-you messages, broadcasts, email automations** across membership offers, audit for the same "weekly live coaching / replay vault / 24/7" language.
5. **ManyChat** instagram-new-follower-sequence is a live automation, update there.
6. **"Coaching replay vault" Kajabi access group**, verify it exists / rename to avoid implying a replay archive.
7. **Meta Ads Bible** ad-copy templates contain "live coaching ... monthly / 24/7" claims, correct before those ads run.
8. Component README flags a retired offer slug `6iRarwak` (separate dual-currency slug reconciliation, out of scope here).

## Deferred (out of this pass's scope)
- ~50 deployable files NOT touched this pass still carry comments (consultations, ask-sally, quiz, snooze-access-paidads, recommended-products, contact, library section files, day-pass landing, snooze-academy, Camp landing/emails, `*-complete.html` variants). Scope was "touched files + global bundle + components"; a follow-up can strip the rest.
- Internal library `DEPLOYMENT-GUIDE.md` / `INDEX.md` still label the section "Live Coaching & Replays" (the live page section was reworded to "Live Sessions"); minor internal-doc relabel.

## Verification
- Deployable HTML/CSS/JS in touched scope: zero false service-model copy; zero comments.
- AUD/USD 1-month email twins: parity confirmed on all 6 pairs.
- No em dashes in edited deployable files or generated READMEs.
- Paid 1:1 consult language preserved ("member pricing on consults", consult pricing).
- HTML structure / selectors / JS logic preserved (comment + copy changes only).
