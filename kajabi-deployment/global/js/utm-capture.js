/**
 * NOT A PASTE TARGET.
 * Fragment only. Inline into global/html/checkout-header-tracking.html
 * (its own <script> tag, alongside the GTM/Stape loader and the Meta
 * Advanced Matching fragment). See PASTE-MAP.md §C.
 *
 * WHY THIS EXISTS (PM-002 WS3b, August 14 2026)
 * utm_content == ad_name is the attribution join the whole creative-testing
 * harness rests on (docs/strategy/paid-scaling/creative-testing-harness.md
 * §5), and nothing in the deployed stack captures it. kajabi-checkout-
 * tracking.js (read-only per ME-007) has no UTM handling; its dedupe key is
 * localStorage-based order-id tracking only. paid_media.lead_attribution_
 * capture exists but is fed only by the paid-ads landing/quiz pages and is
 * 0 rows for anyone who lands straight on a checkout link. This fragment
 * closes that gap for the direct-to-checkout path (a paid click landing on
 * /offers/.../checkout with ?utm_content=... in the URL) without touching
 * any read-only or out-of-boundary file.
 *
 * WHY OPTION 3 (dataLayer), NOT A HIDDEN FORM FIELD OR A KAJABI CONTACT
 * CUSTOM FIELD
 * The checkout-blocks.html custom-code block (e.g. pages/checkout/
 * 7-day-trial-membership/usd/checkout-blocks.html) is marketing copy ABOVE
 * Kajabi's own native checkout widget; it contains no <form> and no payment
 * fields the custom-code block controls, so there is no hidden input to add
 * a UTM value to. A Kajabi contact custom field would need an authenticated
 * write to the Kajabi API, which unauthenticated checkout-page JS cannot
 * make, and no such write path exists anywhere in this repo. GTM is
 * already the site's only GA4/Meta dispatcher and already reads dataLayer,
 * so this fragment pushes into it instead. GTM's Data Layer Variables
 * resolve to the LATEST value set for a given key across every push made on
 * the page, not only the push that carries the triggering event, so a GA4
 * or Meta tag firing on the `purchase` / `trial_started` event (pushed
 * later, by the footer script, on the same order-confirmation page load)
 * can read the utm_content value this fragment pushes earlier from the
 * header field, with zero change to kajabi-checkout-tracking.js. The GTM
 * variable + tag wiring itself is WS1/WS4 territory (ME-007), not this
 * fragment; this fragment only guarantees the value is present in
 * dataLayer before the purchase-adjacent tags would fire.
 *
 * SCOPE LIMIT, STATED PLAINLY: this fragment only runs on pages where
 * checkout-header-tracking.html is injected, which per PASTE-MAP.md A4 is
 * every Kajabi checkout page (inject_header_tracking_code true), including
 * the order-confirmation step where Kajabi.order becomes available. It does
 * NOT run on the website or landing pages (site-header-page-scripts.html is
 * out of this task's write boundary), so a visitor who clicks a paid ad to
 * a LANDING page, browses, and only later clicks through to checkout is
 * covered only if that landing page's own "Join"/CTA links forward the UTM
 * query string into the checkout URL (checkout.js's existing
 * `preserveAttribution` already does this for the currency-switch link;
 * whether every entry link does needs a separate check outside this file).
 * A paid click that lands directly on a checkout URL, the normal shape for
 * a Meta/TikTok ad pointed straight at an offer, is fully covered.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'snooze_utm_attribution';
  // First-touch-wins window: 30 days. Reasoning: long enough to cover a
  // parent who sees a paid ad, researches for a week or two, then starts a
  // 7-day trial without re-clicking the ad (the considered-purchase case
  // this funnel expects); short enough that a genuinely new visit long
  // after the original click is treated as a fresh journey rather than
  // permanently pinned to a stale campaign. Matches the common GA4/Meta
  // lookback-window order of magnitude rather than inventing a new one.
  var WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  function ls(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function setLs(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) {}
  }

  function readStored() {
    var raw = ls(STORAGE_KEY);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  function isStale(stored) {
    if (!stored || !stored.captured_at) return true;
    var capturedAt = Date.parse(stored.captured_at);
    if (!isFinite(capturedAt)) return true;
    return (Date.now() - capturedAt) > WINDOW_MS;
  }

  function captureFromUrl() {
    var params;
    try {
      params = new URLSearchParams(window.location.search);
    } catch (e) {
      return;
    }

    var incoming = {};
    var hasAny = false;
    UTM_KEYS.forEach(function (key) {
      // utm_content (and every other key here) is read and stored verbatim,
      // no trim, no case change, no truncation: it carries ad_name
      // character for character and any normalisation breaks the
      // utm_content == ad_name attribution join.
      var value = params.get(key);
      if (value !== null && value !== '') {
        incoming[key] = value;
        hasAny = true;
      }
    });
    var fbclid = params.get('fbclid');
    if (fbclid) {
      incoming.fbclid = fbclid;
      hasAny = true;
    }

    if (!hasAny) return;

    var stored = readStored();
    // First touch wins within the window: only overwrite when there is
    // nothing stored yet, or what is stored has aged past WINDOW_MS. A
    // later organic visit never carries UTM params at all, so it can never
    // reach this branch and never overwrites a paid first touch.
    if (stored && !isStale(stored)) return;

    incoming.captured_at = new Date().toISOString();
    setLs(STORAGE_KEY, JSON.stringify(incoming));
  }

  function pushToDataLayer() {
    var stored = readStored();
    if (!stored) return;

    var payload = { event: 'utm_attribution_present' };
    var hasAny = false;
    UTM_KEYS.concat(['fbclid']).forEach(function (key) {
      if (stored[key]) {
        payload[key] = stored[key];
        hasAny = true;
      }
    });
    if (!hasAny) return;

    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    } catch (e) {}
  }

  captureFromUrl();
  pushToDataLayer();
})();
