/**
 * SNOOZE CURRENCY TOGGLE - KAJABI CHECKOUT TRACKING
 *
 * Location: Kajabi > Settings > Checkout Tracking Code > Footer Tracking Code
 * (must load AFTER the GTM/Stape header loader and AFTER meta-advanced-matching.js
 *  so window.fbq and window.SnoozeMetaMatch exist).
 *
 * This script:
 *  1. Pushes the GA4 purchase event to dataLayer with the correct currency.
 *  2. Fires the Meta Pixel Purchase event WITH hashed Advanced Matching (em, etc.)
 *     and a shared event_id so the browser event deduplicates with the server-side
 *     (Stape sGTM) CAPI Purchase event.
 *  3. Fires InitiateCheckout (with the same Advanced Matching) when the checkout
 *     loads, so InitiateCheckout EMQ stops sitting at 6.1 with em 0%.
 *
 * EMQ context (dataset 449153684613893, June 2026): em was 0% on
 * InitiateCheckout/Purchase. The GTM-TAG-86 price scraper already writes the
 * buyer email to localStorage('email'); SnoozeMetaMatch hashes it (SHA-256,
 * lowercased+trimmed) and attaches it via fbq Advanced Matching.
 *
 * Dedup contract: event_id is generated once per event by SnoozeMetaMatch and
 * persisted in localStorage (snooze_eventid_purchase /
 * snooze_eventid_initiatecheckout) and pushed to dataLayer as meta_event_id. The
 * server CAPI Purchase/InitiateCheckout event MUST send the identical event_id.
 */

<script>
(function () {
  function fireMeta(eventName, params) {
    if (window.SnoozeMetaMatch && typeof window.SnoozeMetaMatch.fire === 'function') {
      window.SnoozeMetaMatch.fire(eventName, params);
    } else if (typeof fbq !== 'undefined') {
      // Fallback if the advanced-matching module did not load: still fire, but
      // without hashed em (EMQ will not lift). Logged so the gap is visible.
      console.warn('Snooze: SnoozeMetaMatch missing - firing ' + eventName + ' without Advanced Matching');
      fbq('track', eventName, params || {});
    }
  }

  // --- PURCHASE (only on the Kajabi confirmation, where Kajabi.order exists) ---
  if (typeof Kajabi !== 'undefined' && Kajabi.order) {
    // ACTUAL AUD Offer IDs (update as more are created).
    var audOffers = ['bFxLg2uz', 'SiiVEJuS'];
    var offerId = String(Kajabi.order.offer_id || '');
    var orderCurrency = audOffers.indexOf(offerId) > -1 ? 'AUD' : 'USD';

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'purchase',
      'ecommerce': {
        'currency': orderCurrency,
        'value': Kajabi.order.amount,
        'transaction_id': Kajabi.order.id,
        'items': [{
          'item_name': Kajabi.order.offer_title,
          'item_id': Kajabi.order.offer_id,
          'price': Kajabi.order.amount,
          'quantity': 1
        }]
      }
    });

    fireMeta('Purchase', {
      value: Kajabi.order.amount,
      currency: orderCurrency,
      content_name: Kajabi.order.offer_title,
      content_ids: [Kajabi.order.offer_id],
      content_type: 'product'
    });
  } else {
    // --- INITIATECHECKOUT (checkout page, before purchase) -------------------
    // value/currency from the localStorage written by the GTM-TAG-86 scraper.
    var icValue = parseFloat(window.localStorage.getItem('value')) || undefined;
    var icCurrency = (window.location.pathname.indexOf('bFxLg2uz') > -1 ||
                      window.location.pathname.indexOf('SiiVEJuS') > -1) ? 'AUD' : 'USD';
    var icName = window.localStorage.getItem('product_name') || 'Snooze Membership';

    // Wait briefly so the email field has a chance to populate before we hash it.
    setTimeout(function () {
      fireMeta('InitiateCheckout', {
        value: icValue,
        currency: icCurrency,
        content_name: icName
      });
    }, 1200);
  }
})();
</script>
