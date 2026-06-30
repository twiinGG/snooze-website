# LMCR04 Funnel — Next-Session Kickoff Prompt

> **⚠ HISTORICAL (2026-06-30).** This kickoff was for the original remediation, which is now complete. The funnel was pivoted to sell the membership and built out as an offer ladder. For current state, decisions, and the remaining runbook, read **[LMCR04-OFFER-LADDER-AND-UPSELL-ARCHITECTURE.md](./LMCR04-OFFER-LADDER-AND-UPSELL-ARCHITECTURE.md)** and **[LMCR04-SESSION-2026-06-30-CHANGELOG-AND-DEPLOY.md](./LMCR04-SESSION-2026-06-30-CHANGELOG-AND-DEPLOY.md)**. The IDs below are still valid except the AUD membership (now `vYgCNgJz`/2151256977; the listed `bEsVXFXG`/2151212200 was deleted).

Paste the block below into a new Claude Code session in the Snooze OS repo to resume this work. It assumes the audit + plan docs already exist in the repo.

---

```
We're continuing the LMCR04 "5–12 Month Sleep Schedules (Free Module)" funnel remediation.
Read these first, they hold all context, IDs, and the work list:
- apps/snooze-website/course-free-modules-conversion/docs/LMCR04-FUNNEL-AUDIT-2026-06-29.md
- apps/snooze-website/course-free-modules-conversion/docs/LMCR04-FUNNEL-REMEDIATION-PLAN.md
- apps/snooze-website/course-free-modules-conversion/docs/LMCR04-LIVE-KAJABI-CAPTURE-2026-06-29.md
Also recall memory: kajabi-automations-email-bodies-not-in-api (Automations + email bodies
are ONLY readable via agent-browser admin UI, not MCP/REST).

STEP 0 — finish the admin capture (was blocked at Kajabi 2FA last session):
I will do a ONE-TIME interactive login. Tell me exactly how to log into Kajabi inside
agent-browser's OWN managed browser profile (so the session persists), and I'll complete
the 2FA + tick "remember this device." Use the joinsnooze Cloudflare stealth flags
(real Chrome UA + --disable-blink-features=AutomationControlled). Once I'm logged in,
save the auth state to scratchpad (never the repo) and run the READ-ONLY capture:
  • Sequence 2148765283 — 4 email bodies, every CTA label+URL, currency, exact quotes of
    any "live coaching/weekly/replay/24-7/group coaching" language.
  • Sequence 2148762811 — bodies + enrolment trigger.
  • Automations (app.kajabi.com/admin/automations) — what tags LM_512_schedule on purchase
    of offer 2150914364, and what enrols contacts into sequence 2148765283 and/or 2148762811
    (the double-send deciding fact).
  • Form FMLM01_5-12M-Schedules (2149418596) — post-submit trigger + embed.
Append to the LIVE-KAJABI-CAPTURE doc.

THEN execute the remediation plan in order, pausing for the 3 open decisions where flagged:
  P0-1 mislabeled course upsell (needs course-product-model decision),
  P0-2 strip "live coaching" copy from membership thank-you (offer 2150754998, via
       get_theme_content/update_theme_content) + sweep the live emails if Step 0 finds it,
  P1-4 kill the duplicate sequence (retire 2148762811, keep 2148765283),
  P1-3 AUD path (needs Sally to create AUD membership q/yr variants on bEsVXFXG first),
  P1-5 consolidate the /login dead-end thank-you,
  P2-6 reconnect the Notion Offer OS 512 row (row 38c33898b6c281aabde4fcc767ef5404:
       Category→Lead Magnet, wire Campaign relation to LMCR04 38c33898b6c28136a29cc3674485839c,
       add Products relation), check the nightly sync won't clobber it,
  P2-7 decide form FMLM01 (wire or archive),
  P2-8 write the ManyChat "comment 512" spec + sweep its DM copy for banned language,
  P2-9 fix stale 6iRarwak CTAs in CONNECTED-EXPERIENCE-MVP-PLAN (both copies) → z63s9VaR,
       tick the LMCR04 QA items confirmed live.

Use the Kajabi MCP for offers/products/themes/tags/forms (it CAN write themes). Use
agent-browser only for the admin-UI-only items. Verify each fix (re-read theme, buy-test
as a sandbox contact where relevant). Keep the Kajabi Registry sheet + Notion Offer OS in
sync with any offer/product changes.
```

---

## Quick reference (key IDs)

| Role | ID | Slug | Note |
|---|---|---|---|
| Site | 2148291177 | — | joinsnooze.com |
| Free offer | 2150914364 | `2x92uaLF` | $0 entry |
| Free-module course product | 2149308933 | — | 342 members; holds full curriculum behind paywall wrapper 2159220235 (draft) |
| Course upsell offer (MISLABELED) | 2150914639 | `Ktxk9mvE` | $117; grants 2149308933 not the canonical course |
| Canonical course offer/product | 2150844344 / 2149258846 | — | the "real" standalone 5-12 course |
| Membership USD | 2150754998 | `z63s9VaR` | live-coaching copy to strip |
| Membership AUD | 2151256977 | `vYgCNgJz` | complete A$119/A$299/A$997 (vars 161174/161175/161176); replaced deleted `bEsVXFXG`/2151212200 on 2026-06-30 |
| Live sequence (keep) | 2148765283 | — | EMLM04_5-12m Schedule LM Flow |
| Duplicate sequence (retire) | 2148762811 | — | EMLM04_Course-Sample-Conversion |
| Tag | 2149991548 | — | LM_512_schedule (341 contacts) |
| Thank-you page | 2151810974 | `/thankyou/2x92uaLF` | — |
| In-course bridge lesson | 2194028428 | — | dual CTA |
| Orphaned form | 2149418596 | — | FMLM01_5-12M-Schedules, 0 submissions |
| Notion 512 offer row | 38c33898b6c281aabde4fcc767ef5404 | — | reconnect relations |
| Notion LMCR04 campaign row | 38c33898b6c28136a29cc3674485839c | — | — |
| Registry sheet | 1-pDIlV7CFQ_RlI0e9uFBAwdZwZaaQaLKaKpUhZNmzjg | — | Google Sheet |
