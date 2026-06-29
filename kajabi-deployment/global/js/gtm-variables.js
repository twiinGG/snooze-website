function() {
  var audOfferIds = ['bFxLg2uz', 'SiiVEJuS'];
  var currentPath = window.location.pathname;

  for (var i = 0; i < audOfferIds.length; i++) {
    if (currentPath.indexOf(audOfferIds[i]) > -1) {
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
