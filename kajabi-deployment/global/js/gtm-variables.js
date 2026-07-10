function() {
  // AUD checkout slugs (live, Kajabi 2026-07-11). Keep in sync with
  // kajabi-checkout-tracking.js AUD_OFFER_SLUGS. Old bFxLg2uz/SiiVEJuS retired.
  var audOfferSlugs = ['vYgCNgJz', 'Sr6KzShx', '46Bz9tk6', 'ENhg45mj', 'FkZfbT25',
    '8SL8r5sC', 'azdqxZuK', 'JfeoXoKn', 'xGVQ2zfC', 'wgqokagt', 'd5HsPDpJ', 'ZYWF7eY8'];
  var currentPath = window.location.pathname;

  for (var i = 0; i < audOfferSlugs.length; i++) {
    if (currentPath.indexOf(audOfferSlugs[i]) > -1) {
      return 'AUD';
    }
  }

  try {
    var storedCurrency = localStorage.getItem('snooze_currency_preference');
    if (storedCurrency === 'AUD' || storedCurrency === 'USD') {
      return storedCurrency;
    }
  } catch (e) {
  }

  return 'USD';
}

function() {
  var currency = {{CJS - User Currency Preference}};
  var element = {{Click Element}};

  if (!element) {
    return '0.00';
  }

  var priceAttr = element.getAttribute('data-' + currency.toLowerCase());

  if (priceAttr) {
    var numericValue = parseFloat(priceAttr.toString().replace(/[^0-9.]/g, ''));
    if (!isNaN(numericValue)) {
      return numericValue.toFixed(2);
    }
  }

  var priceValue = element.getAttribute('data-price-value');
  if (priceValue) {
    var numericValue = parseFloat(priceValue);
    if (!isNaN(numericValue)) {
      return numericValue.toFixed(2);
    }
  }

  return '0.00';
}
