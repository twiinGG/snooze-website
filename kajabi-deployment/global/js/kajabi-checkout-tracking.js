<script>
/**
 * RETIRED, August 16 2026. NOT A PASTE TARGET.
 *
 * This script cannot fire and never has. The Kajabi Checkout Header and Footer tracking
 * fields inject on /offers/<token>/checkout only. They do NOT inject on the confirmation
 * page joinsnooze.com/thank_you/<token>, and window.Kajabi.order is null there, so the
 * guard on the first executable line returns on every page this can load on. Measured in a
 * real buyer's browser 2026-08-15:
 *   {"footer":false,"header":false,"gtm":true,"kajabi":"object","order":null,"ls":[]}
 * A copy has been live in the Footer field since about 2026-07-11 and has emitted zero
 * events.
 *
 * Its classification rules were correct and now run server-side against the Kajabi
 * payment.succeeded webhook: workflows/n8n/kajabi-order-conversions/classify-order.js.
 * That source also carries the true amount charged and the stated currency, so the
 * AUD_OFFER_IDS fallback below is no longer load bearing anywhere.
 *
 * Kept as the record of what is live in the Kajabi field until that field is cleared.
 * Do not "fix" it, do not extend it, do not paste it.
 * Evidence: docs/projects/measurement/4_working/2026-08-16-order-tracking-consolidation/
 */
(function () {
  'use strict';

  var AUD_OFFER_IDS = [
    '2150873956', '2150946767', '2151134284', '2151254578', '2151256977',
    '2151342068',
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
