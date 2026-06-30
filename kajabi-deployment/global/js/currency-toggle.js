<script>
(function() {
  'use strict';

  const CONFIG = {
    storageKey: 'snooze_currency_preference',
    defaultCurrency: 'USD',
    offerMapping: {
      // Core Snooze Membership (USD offer 2150754998 / z63s9VaR -> AUD offer 2151256977 / vYgCNgJz).
      // UPDATED 2026-06-30: repointed from the old monthly-only bEsVXFXG/2151212200 to the
      // complete AUD core offer vYgCNgJz/2151256977 (A$119/A$299/A$997). bEsVXFXG/2151212200 is
      // SUPERSEDED and should be retired/unpublished in the admin UI.
      '2150754998': '2151256977',
      'z63s9VaR': 'vYgCNgJz',
      '2150887297': '2151254578',
      'mqQikDM7': 'Sr6KzShx',
      '2150884129': '2150946767',
      'K3Y6FEKX': '46Bz9tk6'
    },
    variantMapping: {
      // Core Snooze Membership variants (USD offer 2150754998 -> AUD offer 2151256977 / vYgCNgJz).
      // RESOLVED 2026-06-30: AUD core offer created with all three tiers; placeholders filled.
      '68112': '161174', // monthly:   USD $79  -> AUD $119
      '37262': '161175', // quarterly: USD $197 -> AUD $299
      '37263': '161176', // yearly:    USD $657 -> AUD $997
      // 7-Day Trial variants (USD offer 2150887297 -> AUD offer 2151254578 / Sr6KzShx).
      '160544': '160790', // monthly:   USD $79  -> AUD $119
      '64815': '160791',  // quarterly: USD $197 -> AUD $299
      '64816': '160792'   // yearly:    USD $657 -> AUD $997
    },
    audOfferIds: ['2150946767', '2151256977', '2151254578']
  };

  function safeLocalStorage() {
    try {
      return localStorage;
    } catch (e) {
      return null;
    }
  }

  function logWarning(message) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('Snooze Currency Toggle: ' + message);
    }
  }

  function logError(message, error) {
    if (typeof console !== 'undefined' && console.error) {
      console.error('Snooze Currency Toggle: ' + message, error);
    }
  }

  function initCurrency() {
    const storage = safeLocalStorage();
    let pref = storage ? storage.getItem(CONFIG.storageKey) : null;

    if (!pref) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        pref = (tz && tz.includes('Australia')) ? 'AUD' : 'USD';
      } catch (e) {
        pref = CONFIG.defaultCurrency;
      }
    }

    if (pref !== 'USD' && pref !== 'AUD') {
      pref = CONFIG.defaultCurrency;
    }

    setCurrency(pref, false);

    injectToggles();
    handleCheckoutPage();
  }

  window.setCurrency = function(currency, save = true) {
    if (currency !== 'USD' && currency !== 'AUD') {
      logWarning('Invalid currency: ' + currency + ', defaulting to USD');
      currency = CONFIG.defaultCurrency;
    }

    document.body.classList.remove('currency-mode-usd', 'currency-mode-aud');
    document.body.classList.add('currency-mode-' + currency.toLowerCase());

    if (save) {
      const storage = safeLocalStorage();
      if (storage) {
        try {
          storage.setItem(CONFIG.storageKey, currency);
        } catch (e) {
          logError('Failed to save currency preference', e);
        }
      } else {
        logWarning('localStorage unavailable, preference not saved');
      }
    }

    updatePrices(currency);
    updateLinks(currency);
    updateToggleUI(currency);

    document.body.classList.add('currency-loaded');

    if (window.dataLayer) {
      try {
        window.dataLayer.push({
          'event': 'currency_change',
          'currency_preference': currency
        });
      } catch (e) {
        logError('Failed to push currency_change event', e);
      }
    }
  };

  function updatePrices(currency) {
    const elements = document.querySelectorAll('.dynamic-price');
    let updatedCount = 0;
    let missingCount = 0;

    elements.forEach(el => {
      const price = el.getAttribute(`data-${currency.toLowerCase()}`);
      const period = el.getAttribute(`data-period-${currency.toLowerCase()}`) || '';

      if (!price) {
        missingCount++;
        logWarning('Missing data-' + currency.toLowerCase() + ' attribute on element', el);
        return;
      }

      try {
        const symbol = currency === 'AUD' ? 'A$' : '$';

        if (el.classList.contains('price')) {
          el.innerHTML = `<span class="dollar-sign">${symbol}</span>${price}<span> ${currency}</span><span>${period}</span>`;
        } else {
          el.textContent = `${symbol}${price}${period}`;
        }

        const numericValue = parseFloat(price.toString().replace(/[^0-9.]/g, ''));
        if (!isNaN(numericValue)) {
          el.setAttribute('data-price-value', numericValue);
        }

        updatedCount++;
      } catch (e) {
        logError('Failed to update price element', e);
      }
    });

    if (missingCount > 0) {
      logWarning(missingCount + ' price elements missing required data attributes');
    }
  }

  function rewriteCheckoutUrl(originalHref, currency) {
    if (!originalHref) return originalHref;

    let newLink = originalHref;
    let changed = false;

    for (const [usdId, audId] of Object.entries(CONFIG.offerMapping)) {
      if (currency === 'AUD' && newLink.includes(usdId)) {
        newLink = newLink.replace(usdId, audId);
        changed = true;
        break;
      } else if (currency === 'USD' && newLink.includes(audId)) {
        newLink = newLink.replace(audId, usdId);
        changed = true;
        break;
      }
    }

    const variantMatch = newLink.match(/([?&]variant=)([^&#]+)/);
    if (variantMatch) {
      const currentVariant = variantMatch[2];
      let targetVariant = null;
      for (const [usdVar, audVar] of Object.entries(CONFIG.variantMapping)) {
        if (currency === 'AUD' && currentVariant === usdVar) {
          targetVariant = audVar;
          break;
        } else if (currency === 'USD' && currentVariant === audVar) {
          targetVariant = usdVar;
          break;
        }
      }
      if (targetVariant && targetVariant !== currentVariant) {
        newLink = newLink.replace(
          /([?&]variant=)([^&#]+)/,
          '$1' + targetVariant
        );
        changed = true;
      }
    }

    return changed ? newLink : originalHref;
  }

  function updateLinks(currency) {
    const buttons = document.querySelectorAll('.dynamic-cta, [data-checkout], .pricing-card a, .hero-cta');
    let updatedCount = 0;
    let errorCount = 0;

    buttons.forEach(btn => {
      try {
        let originalHref = btn.getAttribute('data-original-href');
        if (!originalHref) {
          originalHref = btn.getAttribute('href');
          if (originalHref) {
            btn.setAttribute('data-original-href', originalHref);
          }
        }

        if (!originalHref) {
          return;
        }

        const newLink = rewriteCheckoutUrl(originalHref, currency);
        const linkChanged = newLink !== originalHref;

        if (linkChanged) {
          try {
            if (newLink.indexOf('http') === 0 || newLink.indexOf('/') === 0) {
              btn.setAttribute('href', newLink);
              updatedCount++;
            } else {
              logWarning('Invalid URL generated: ' + newLink);
              errorCount++;
            }
          } catch (e) {
            logError('Failed to update link', e);
            errorCount++;
          }
        }
      } catch (e) {
        logError('Error processing button', e);
        errorCount++;
      }
    });

    if (errorCount > 0) {
      logWarning(errorCount + ' links failed to update');
    }
  }

  function injectToggles() {
    const navSelectors = [
      '.navbar .sn-actions',
      '.navbar nav',
      '.sn-nav-actions',
      '[class*="nav-actions"]'
    ];

    let navActions = null;
    for (let i = 0; i < navSelectors.length; i++) {
      navActions = document.querySelector(navSelectors[i]);
      if (navActions) break;
    }

    if (navActions && !document.querySelector('.nav-currency-toggle')) {
      try {
        const toggle = createToggleButton('nav-currency-toggle');
        navActions.appendChild(toggle);
      } catch (e) {
        logError('Failed to inject desktop toggle', e);
      }
    }

    const mobileSelectors = [
      '.sn-mobile-inner',
      '.mobile-menu',
      '[class*="mobile-menu"]'
    ];

    let mobileMenu = null;
    for (let i = 0; i < mobileSelectors.length; i++) {
      mobileMenu = document.querySelector(mobileSelectors[i]);
      if (mobileMenu) break;
    }

    if (mobileMenu && !document.querySelector('.mobile-currency-toggle')) {
      try {
        const toggle = createToggleButton('mobile-currency-toggle');
        toggle.style.marginTop = '20px';
        toggle.style.width = '100%';
        toggle.style.justifyContent = 'center';
        mobileMenu.appendChild(toggle);
      } catch (e) {
        logError('Failed to inject mobile toggle', e);
      }
    }
  }

  function createToggleButton(className) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `currency-toggle-btn ${className}`;
    btn.setAttribute('aria-label', 'Toggle currency');
    btn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const current = document.body.classList.contains('currency-mode-aud') ? 'AUD' : 'USD';
        setCurrency(current === 'AUD' ? 'USD' : 'AUD', true);
      } catch (e) {
        logError('Toggle click failed', e);
      }
    };
    return btn;
  }

  function updateToggleUI(currency) {
    const toggles = document.querySelectorAll('.currency-toggle-btn');
    const flag = currency === 'AUD' ? '🇦🇺' : '🇺🇸';
    const label = currency === 'AUD' ? 'AUD' : 'USD';

    toggles.forEach(t => {
      try {
        t.innerHTML = `<span class="currency-flag">${flag}</span> ${label}`;
        t.setAttribute('aria-pressed', currency === 'AUD' ? 'true' : 'false');
      } catch (e) {
        logError('Failed to update toggle UI', e);
      }
    });
  }

  function handleCheckoutPage() {
    if (!window.location.href.includes('/checkout')) return;

    const currentUrl = window.location.href;
    let currentOfferId = null;
    let targetOfferId = null;
    let targetCurrency = 'USD';

    for (const [usdId, audId] of Object.entries(CONFIG.offerMapping)) {
      if (currentUrl.includes(usdId)) {
        currentOfferId = usdId;
        targetOfferId = audId;
        targetCurrency = 'AUD';
        break;
      } else if (currentUrl.includes(audId)) {
        currentOfferId = audId;
        targetOfferId = usdId;
        targetCurrency = 'USD';
        break;
      }
    }

    if (targetOfferId) {
      try {
        const containerSelectors = [
          '.checkout-panel-header',
          '.panel-heading',
          '.checkout-header',
          '[class*="checkout-header"]'
        ];

        let container = null;
        for (let i = 0; i < containerSelectors.length; i++) {
          container = document.querySelector(containerSelectors[i]);
          if (container) break;
        }

        if (!container) {
          container = document.body;
        }

        const switchDiv = document.createElement('div');
        switchDiv.className = 'checkout-currency-switch';
        switchDiv.innerHTML = `Prefer to pay in ${targetCurrency}? <a href="#" id="currency-switch-link">Switch to ${targetCurrency}</a>`;

        if (container.nextSibling) {
          container.parentNode.insertBefore(switchDiv, container.nextSibling);
        } else {
          container.appendChild(switchDiv);
        }

        const switchLink = document.getElementById('currency-switch-link');
        if (switchLink) {
          switchLink.addEventListener('click', function(e) {
            e.preventDefault();
            try {
              const storage = safeLocalStorage();
              if (storage) {
                storage.setItem(CONFIG.storageKey, targetCurrency);
              }
              window.location.href = currentUrl.replace(currentOfferId, targetOfferId);
            } catch (err) {
              logError('Failed to switch currency on checkout', err);
            }
          });
        }

        if (targetCurrency === 'USD') {
          const couponSelectors = [
            '.checkout-coupon-panel',
            '#coupon-panel',
            '[class*="coupon"]',
            '[id*="coupon"]'
          ];

          let couponArea = null;
          for (let i = 0; i < couponSelectors.length; i++) {
            couponArea = document.querySelector(couponSelectors[i]);
            if (couponArea) break;
          }

          if (couponArea) {
            const warning = document.createElement('div');
            warning.className = 'aud-discount-warning';
            warning.innerText = 'Note: Most discount codes are valid for USD pricing only.';
            couponArea.parentNode.insertBefore(warning, couponArea);
          }
        }
      } catch (e) {
        logError('Failed to handle checkout page', e);
      }
    }
  }

  if (typeof window !== 'undefined') {
    window.__snoozeCurrencyToggle__ = {
      rewriteCheckoutUrl: rewriteCheckoutUrl,
      CONFIG: CONFIG
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCurrency);
  } else {
    initCurrency();
  }

})();
</script>
