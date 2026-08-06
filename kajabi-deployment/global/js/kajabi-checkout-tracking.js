<script>
(function () {
  'use strict';

  // All live AUD-priced offers (numeric offer IDs, Kajabi list_offers 2026-07-11).
  // Keep in sync when a new AUD offer is published. USD is the safe fallback.
  var AUD_OFFER_IDS = [
    '2150873956', '2150946767', '2151134284', '2151254578', '2151256977',
    '2151262009', '2151262011', '2151262012', '2151262013', '2151262014',
    '2151262016', '2151262017', '2151262018', '2151264520', '2151265016',
    '2151265179'
  ];

  function detectOrderCurrency(order) {
    var currency = order && order.currency
      ? String(order.currency).toUpperCase()
      : '';
    if (currency === 'AUD' || currency === 'USD') return currency;

    var offerId = String((order && order.offer_id) || '');
    return AUD_OFFER_IDS.indexOf(offerId) > -1 ? 'AUD' : 'USD';
  }

  function numberOrZero(value) {
    var amount = parseFloat(value);
    return isFinite(amount) ? amount : 0;
  }

  if (typeof Kajabi === 'undefined' || !Kajabi.order) return;

  var order = Kajabi.order;
  var orderId = String(order.id || '');
  var amount = numberOrZero(order.amount);
  var currency = detectOrderCurrency(order);
  var offerId = String(order.offer_id || '');
  var offerTitle = String(order.offer_title || 'Snooze order');

  // A missing Kajabi order ID cannot deduplicate or reconcile. Fail closed.
  if (!orderId) return;

  var eventName = amount > 0 ? 'purchase' : 'free_claim';
  var firedKey = 'snooze_' + eventName + '_fired_' + orderId;
  try {
    if (window.localStorage.getItem(firedKey) === '1') return;
  } catch (e) {}

  window.dataLayer = window.dataLayer || [];

  if (amount > 0) {
    // This is the sole browser Purchase source. GTM sends the browser Meta
    // event and GA4 request from this one dataLayer event. Server GTM receives
    // the same event ID for Meta browser/server deduplication.
    window.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: orderId,
        currency: currency,
        value: amount,
        items: [{
          item_name: offerTitle,
          item_id: offerId,
          price: amount,
          quantity: 1
        }]
      },
      measurement_source: 'kajabi_order'
    });
  } else {
    // Free orders are useful lifecycle signals for Contact 360, but they are
    // not revenue. No GTM tag maps this diagnostic event to Purchase.
    window.dataLayer.push({
      event: 'free_claim',
      order_id: orderId,
      offer_id: offerId,
      offer_name: offerTitle,
      value: 0,
      currency: currency,
      measurement_source: 'kajabi_order'
    });
  }

  try { window.localStorage.setItem(firedKey, '1'); } catch (e) {}
})();
</script>
