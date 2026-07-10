<script>
(function () {
  function fireMeta(eventName, params) {
    if (window.SnoozeMetaMatch && typeof window.SnoozeMetaMatch.fire === 'function') {
      window.SnoozeMetaMatch.fire(eventName, params);
    } else if (typeof fbq !== 'undefined') {
      console.warn('Snooze: SnoozeMetaMatch missing - firing ' + eventName + ' without Advanced Matching');
      fbq('track', eventName, params || {});
    }
  }

  // All live AUD-priced offers (numeric offer IDs, Kajabi list_offers 2026-07-11).
  // Keep in sync when new AUD offers are published. USD is the default.
  var AUD_OFFER_IDS = [
    '2150873956', '2150946767', '2151134284', '2151254578', '2151256977',
    '2151262009', '2151262011', '2151262012', '2151262013', '2151262014',
    '2151262016', '2151262017', '2151262018', '2151264520', '2151265016',
    '2151265179'
  ];
  // AUD checkout slugs (for URL-path detection where only the slug is known).
  var AUD_OFFER_SLUGS = [
    'vYgCNgJz', 'Sr6KzShx', '46Bz9tk6', 'ENhg45mj', 'FkZfbT25', '8SL8r5sC',
    'azdqxZuK', 'JfeoXoKn', 'xGVQ2zfC', 'wgqokagt', 'd5HsPDpJ', 'ZYWF7eY8'
  ];

  // Trust an explicit order currency field if present and valid; otherwise
  // fall back to the AUD offer-ID allow-list; otherwise default USD.
  function detectOrderCurrency(order) {
    var c = order && order.currency ? String(order.currency).toUpperCase() : '';
    if (c === 'AUD' || c === 'USD') return c;
    var oid = String((order && order.offer_id) || '');
    return AUD_OFFER_IDS.indexOf(oid) > -1 ? 'AUD' : 'USD';
  }

  if (typeof Kajabi !== 'undefined' && Kajabi.order) {
    var orderId = String(Kajabi.order.id || '');
    // Once-only guard: don't double-fire purchase on reload / duplicate execution.
    var firedKey = 'snooze_purchase_fired_' + orderId;
    var alreadyFired = false;
    try { alreadyFired = orderId && window.localStorage.getItem(firedKey) === '1'; } catch (e) {}
    if (alreadyFired) return;
    try { if (orderId) window.localStorage.setItem(firedKey, '1'); } catch (e) {}

    var orderCurrency = detectOrderCurrency(Kajabi.order);

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
    var icValue = parseFloat(window.localStorage.getItem('value')) || undefined;
    var path = window.location.pathname;
    var icCurrency = 'USD';
    for (var i = 0; i < AUD_OFFER_SLUGS.length; i++) {
      if (path.indexOf(AUD_OFFER_SLUGS[i]) > -1) { icCurrency = 'AUD'; break; }
    }
    // Respect an explicit currency toggle if the shopper set one.
    try {
      var pref = window.localStorage.getItem('snooze_currency_preference');
      if (pref === 'AUD' || pref === 'USD') icCurrency = pref;
    } catch (e) {}
    var icName = window.localStorage.getItem('product_name') || 'Snooze Membership';

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
