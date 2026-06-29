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

  if (typeof Kajabi !== 'undefined' && Kajabi.order) {
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
    var icValue = parseFloat(window.localStorage.getItem('value')) || undefined;
    var icCurrency = (window.location.pathname.indexOf('bFxLg2uz') > -1 ||
                      window.location.pathname.indexOf('SiiVEJuS') > -1) ? 'AUD' : 'USD';
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
