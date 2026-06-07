/**
 * SNOOZE CURRENCY TOGGLE - KAJABI CHECKOUT TRACKING
 * 
 * Location: Kajabi Settings > Checkout Settings > Page Tracking Code
 * 
 * This script pushes purchase events to GTM dataLayer with correct currency codes.
 * CRITICAL: Without this, purchase events will not include currency information,
 * causing inaccurate ROAS data in Meta Ads and Google Ads.
 */

<script>
// Detect if this is a Purchase (Kajabi specific object)
if (typeof Kajabi !== 'undefined' && Kajabi.order) {
  
  // Determine currency based on the Offer ID
  // ACTUAL AUD Offer IDs (update as more are created)
  var audOffers = ['bFxLg2uz', 'SiiVEJuS'];
  var offerId = String(Kajabi.order.offer_id || ''); // Ensure string comparison
  var orderCurrency = audOffers.indexOf(offerId) > -1 ? 'AUD' : 'USD';

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];
  
  // Push purchase event with currency information
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
  
  // Also push to Meta Pixel if available
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Purchase', {
      value: Kajabi.order.amount,
      currency: orderCurrency,
      content_name: Kajabi.order.offer_title,
      content_ids: [Kajabi.order.offer_id]
    });
  }
}
</script>
