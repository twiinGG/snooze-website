<script>
(function () {
  'use strict';

  var AUD_OFFER_IDS = [
    '2150873956', '2150946767', '2151134284', '2151254578', '2151256977',
    '2151262009', '2151262011', '2151262012', '2151262013', '2151262014',
    '2151262016', '2151262017', '2151262018', '2151264520', '2151265016',
    '2151265179'
  ];
  var TRIAL_OFFER_IDS = ['2150887297', '2151254578'];
  var TRIAL_VARIANTS = {
    '160544': { plan: 'monthly', cadence: 'monthly' },
    '64815': { plan: 'quarterly', cadence: 'every_3_months' },
    '64816': { plan: 'annual', cadence: 'yearly' },
    '160790': { plan: 'monthly', cadence: 'monthly' },
    '160791': { plan: 'quarterly', cadence: 'every_3_months' },
    '160792': { plan: 'annual', cadence: 'yearly' }
  };

  function detectOrderCurrency(order) {
    var currency = order && order.currency
      ? String(order.currency).toUpperCase()
      : '';
    if (currency === 'AUD' || currency === 'USD') return currency;

    var offerId = String((order && order.offer_id) || '');
    return AUD_OFFER_IDS.indexOf(offerId) > -1 ? 'AUD' : 'USD';
  }

  function numberOrNull(value) {
    if (value === null || typeof value === 'undefined' || value === '') return null;
    var amount = parseFloat(value);
    return isFinite(amount) && amount >= 0 ? amount : null;
  }

  if (typeof Kajabi === 'undefined' || !Kajabi.order) return;

  var order = Kajabi.order;
  var orderId = String(order.id || '');
  var amount = numberOrNull(order.amount);
  var currency = detectOrderCurrency(order);
  var offerId = String(order.offer_id || '');
  var offerTitle = String(order.offer_title || 'Snooze order');
  var variantId = String(order.variant_id || order.pricing_option_id || order.offer_price_id || '');
  var trialPlan = TRIAL_VARIANTS[variantId] || { plan: 'unknown', cadence: 'unknown' };

  if (!orderId || amount === null) return;

  var isTrialStart = amount === 0 && TRIAL_OFFER_IDS.indexOf(offerId) > -1;
  var eventName = amount > 0 ? 'purchase' : (isTrialStart ? 'trial_started' : 'free_claim');
  var firedKey = 'snooze_' + eventName + '_fired_' + orderId;
  try {
    if (window.localStorage.getItem(firedKey) === '1') return;
  } catch (e) {}

  window.dataLayer = window.dataLayer || [];

  if (amount > 0) {
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
  } else if (isTrialStart) {
    window.dataLayer.push({
      event: 'trial_started',
      order_id: orderId,
      offer_id: offerId,
      variant_id: variantId,
      plan: trialPlan.plan,
      cadence: trialPlan.cadence,
      value: 0,
      currency: currency,
      measurement_source: 'kajabi_order'
    });
  } else {
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
