/**
 * SNOOZE CURRENCY TOGGLE - GTM VARIABLES
 * 
 * These variables must be created in Google Tag Manager
 * Container: GTM-KNRTH6P
 * 
 * IMPORTANT: These variables are CRITICAL for accurate ROAS tracking.
 * Without proper currency codes, Meta/Google will treat AUD $220 as USD $220,
 * artificially inflating revenue by ~35%.
 */

// ============================================
// VARIABLE 1: CJS - User Currency Preference
// ============================================
// Variable Type: Custom JavaScript
// Name: CJS - User Currency Preference
// Description: Detects user's currency preference from localStorage or URL

function() {
  // 1. Check if we are on a specific Kajabi AUD Offer Page (Checkout/Purchase)
  // ACTUAL AUD Offer IDs (update as more are created)
  var audOfferIds = ['bFxLg2uz', 'SiiVEJuS'];
  var currentPath = window.location.pathname;
  
  for (var i = 0; i < audOfferIds.length; i++) {
    if (currentPath.indexOf(audOfferIds[i]) > -1) {
      return 'AUD';
    }
  }

  // 2. If not on a checkout page, check Local Storage (Sales Page Toggle)
  // Use namespaced key to avoid conflicts with existing tracking
  try {
    var storedCurrency = localStorage.getItem('snooze_currency_preference');
    if (storedCurrency === 'AUD' || storedCurrency === 'USD') {
      return storedCurrency;
    }
  } catch (e) {
    // localStorage unavailable (Safari private mode, etc.)
  }

  // 3. Default Fallback
  return 'USD';
}

// ============================================
// VARIABLE 2: CJS - Dynamic Click Value
// ============================================
// Variable Type: Custom JavaScript
// Name: CJS - Dynamic Click Value
// Description: Gets price value from clicked element based on current currency
// 
// NOTE: This supports both data attribute formats:
// - Format 1: data-usd="147" + data-period-usd="/ 3 months"
// - Format 2: data-usd="$147/quarter" (combined)

function() {
  var currency = {{CJS - User Currency Preference}}; // The variable from Step 1
  var element = {{Click Element}}; // Built-in GTM variable
  
  if (!element) {
    return '0.00';
  }
  
  // Try to get price from data attribute
  var priceAttr = element.getAttribute('data-' + currency.toLowerCase());
  
  if (priceAttr) {
    // Extract numeric value (handles "$147", "147", "AUD 220", etc.)
    var numericValue = parseFloat(priceAttr.toString().replace(/[^0-9.]/g, ''));
    if (!isNaN(numericValue)) {
      return numericValue.toFixed(2);
    }
  }
  
  // Fallback: Try data-price-value (set by currency toggle script)
  var priceValue = element.getAttribute('data-price-value');
  if (priceValue) {
    var numericValue = parseFloat(priceValue);
    if (!isNaN(numericValue)) {
      return numericValue.toFixed(2);
    }
  }
  
  // Final fallback
  return '0.00';
}

// ============================================
// USAGE IN GTM TAGS
// ============================================
//
// For GA4 Event (e.g., begin_checkout on button click):
// - Parameter: currency -> Value: {{CJS - User Currency Preference}}
// - Parameter: value -> Value: {{CJS - Dynamic Click Value}}
//
// For Meta Pixel (Custom HTML or Template):
// <script>
//   fbq('track', 'InitiateCheckout', {
//     value: {{CJS - Dynamic Click Value}},
//     currency: '{{CJS - User Currency Preference}}', // This is critical!
//     content_name: 'Snooze Membership'
//   });
// </script>
//
// ============================================
