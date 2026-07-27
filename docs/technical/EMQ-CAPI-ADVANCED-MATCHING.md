# EMQ Fix: Meta Advanced Matching + CAPI Dedup (Checkout)

**Date:** June 19, 2026
**Dataset (pixel):** TSC Kajabi `449153684613893` on `act_3529815953772612` (AU)
**Status:** Code committed. Kajabi paste + GTM/Stape mapping are HUMAN actions (see below).

## Problem

EMQ on the conversion events is low because the hashed email is missing:

| Event | EMQ | Match keys present |
|-------|-----|--------------------|
| InitiateCheckout | 6.1 | ip 100%, user_agent 100%, fbp 100%, fbc 67.5%, **em 0%** |
| ViewContent | 5.4 | ip 100%, user_agent 100%, fbp 100%, fbc 14.3%, **em 0%** |
| PageView | 5.6 | em 2.8% (logged-in members only), phone 1.2%, fbc 16.7% |
| Purchase | not in web quality | n/a |

The Kajabi checkout already scrapes the buyer email to `localStorage('email')` (the
GTM-TAG-86 price scraper / `meta-advanced-matching` note). Meta never receives it
because the GTM/Stape Meta tags do not read it into `user_data`. CAPI is configured
in the Stape sGTM container (`load.ss.joinsnooze.com`), which is UI-only and not in
this repo.

## Fix (in-repo, browser side)

`kajabi-deployment/global/js/meta-advanced-matching.js` (new)
- Reads `email, phone, full_name, city, zip, country` from the localStorage keys the
  checkout scraper already writes.
- Hashes `em, ph, fn, ln, ct, zp, country` with SHA-256 (lowercased + trimmed; phone
  digits-only; `full_name` split into fn/ln) via Web Crypto.
- Re-inits the Pixel: `fbq('init', '449153684613893', userData)` so the loaded pixel
  carries Advanced Matching, then `fbq('track', name, params, { eventID })`.
- Captures `fbc` (from `_fbc` cookie, else built from `fbclid`) and `fbp` (`_fbp` cookie).
- Generates ONE `event_id` per event, persists it to localStorage
  (`snooze_eventid_initiatecheckout` / `snooze_eventid_purchase`) and pushes it to
  `dataLayer` as `meta_event_id`.

`kajabi-deployment/global/js/kajabi-checkout-tracking.js` (updated)
- Purchase: fires `SnoozeMetaMatch.fire('Purchase', {...})` (was a bare `fbq('track','Purchase')`).
- InitiateCheckout: now fired on the checkout page (1.2s delay so the email field
  populates) via `SnoozeMetaMatch.fire('InitiateCheckout', {...})`.
- GA4 dataLayer `purchase` push unchanged.

## Dedup contract (CRITICAL)

Browser and server must send the SAME `event_id` per event, or Meta will count the
hit twice instead of merging:
- Browser uses `eventID` from `snooze_eventid_<event>` (localStorage), also on
  `dataLayer.meta_event_id`.
- Server-side Stape sGTM Meta CAPI tag MUST map its `event_id` to that same value.
  Create a GTM dataLayer variable `meta_event_id` and bind the CAPI tag's Event ID
  field to it. **This is a GTM/Stape UI change (human).** Until done, the browser
  event still carries hashed `em` and lifts EMQ on its own; the only risk of NOT
  doing it is double-counting, not low EMQ.

## Deploy steps (HUMAN actions)

Confirm field paths in [`../../kajabi-deployment/PASTE-MAP.md`](../../kajabi-deployment/PASTE-MAP.md) A4/A5 first.

1. Settings → Checkout → Header tracking code already has the GTM/Stape loader (`checkout-header-tracking.html`). **Do not replace it unless changing the loader.** Append `meta-advanced-matching.js` (without the comment header) AFTER that existing block so `fbq` exists when it runs.
2. Paste `kajabi-checkout-tracking.js` into Settings → Checkout → **Footer** Tracking Code (live footer was empty as of 2026-07-27).
3. In GTM (`GTM-KNRTH6P`) / Stape: add dataLayer variable `meta_event_id`; bind the
   server CAPI Purchase + InitiateCheckout tags' Event ID to it for dedup. Optional
   but recommended: also map the localStorage `email` into the CAPI tag `user_data.em`
   server-side as a second source.
4. Tag before deploy per AGENTS.md (`website-v{X.Y.Z}`).

## Re-measure

- Verify with Meta Pixel Helper + Events Manager Test Events that InitiateCheckout and
  Purchase now show `em` (and fn/ln/ph/ct/zp) under Matched parameters, and that
  browser + server events share one `event_id` (dedup badge).
- 24-72h after deploy, re-run `ads_get_dataset_quality(449153684613893)` and confirm
  `email` coverage on InitiateCheckout climbs from 0% toward checkout-form completion
  rate, and composite EMQ moves 6.1 -> 8.0+.

## Projected lift rationale

Meta EMQ is driven by the number and coverage of strong match keys. Today the
conversion events carry only ip/ua/fbp (+ partial fbc) = ~6.1. Adding hashed `em`
(the single strongest key) at high coverage typically moves an event from the 5-6
band into the 8-9 band; `fn/ln/ph/ct/zp` add incremental lift. Coverage ceiling is
the checkout email-completion rate (email is entered before InitiateCheckout fires on
Kajabi's embedded checkout), so InitiateCheckout em coverage should approach ~100% of
checkouts where the email field is filled.
