/**
 * SNOOZE DYNAMIC CURRENCY MANAGER
 * Version 2.0 - Merged Implementation (Dec 30, 2025)
 * Combines automated approach with GTM integration
 * 
 * Location: Kajabi Settings > Site Details > Footer Page Scripts
 */

<script>
(function() {
  'use strict';

  // --- CONFIGURATION ---
  // PRD reference: docs/projects/paid-media-and-dual-currency-v1/00-prd.md §4.6, §4.7
  const CONFIG = {
    storageKey: 'snooze_currency_preference',
    defaultCurrency: 'USD',
    // MAP: 'USD_ID' : 'AUD_ID'
    // Active offer mapping. Snooze Access uses a single offer with three
    // variants; variant-level routing is handled by variantMapping below.
    offerMapping: {
      // Snooze Access (Core membership), PRD §4.5
      '2150754998': '<NEW_AUD_ACCESS_OFFER_ID>',
      // Camp Snooze, retained
      '2150884129': '2150946767',
      // Day Pass cold-ads dedicated, filled in Wave 0b
      '<USD_DAYPASS_OFFER>': '<AUD_DAYPASS_OFFER>'
    },
    // Variant-aware checkout routing for Snooze Access (PRD §4.7).
    // MAP: 'USD_VARIANT_ID' : 'AUD_VARIANT_ID'
    variantMapping: {
      '68112': '<AUD_MONTHLY_VARIANT>',   // monthly  ($79 USD to $119 AUD)
      '37262': '<AUD_QUARTERLY_VARIANT>', // quarterly ($197 USD to $299 AUD)
      '37263': '<AUD_YEARLY_VARIANT>'     // yearly    ($657 USD to $997 AUD)
    },
    // AUD Offer IDs for GTM tracking
    audOfferIds: ['2150946767', '<NEW_AUD_ACCESS_OFFER_ID>', '<AUD_DAYPASS_OFFER>']
  };

  // Legacy offer mapping (kept for historical campaign URL parity, PRD §4.6).
  // These IDs map to slug-form Kajabi offers that are no longer the active
  // membership but may still appear in old emails, ads, or backlinks.
  //   '6iRarwak': 'bFxLg2uz', // Membership Launch (superseded by 2150754998)
  //   'igbTdRbk': 'SiiVEJuS'  // Consult Upsell

  // --- UTILITY FUNCTIONS ---
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

  // --- MAIN INIT ---
  function initCurrency() {
    const storage = safeLocalStorage();
    let pref = storage ? storage.getItem(CONFIG.storageKey) : null;

    // Auto-detect if no preference saved
    if (!pref) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        pref = (tz && tz.includes('Australia')) ? 'AUD' : 'USD';
      } catch (e) {
        pref = CONFIG.defaultCurrency;
      }
    }

    // Validate preference
    if (pref !== 'USD' && pref !== 'AUD') {
      pref = CONFIG.defaultCurrency;
    }

    // Apply currency (without saving to storage yet, to keep auto-detect dynamic until manual click)
    setCurrency(pref, false); 
    
    injectToggles();
    handleCheckoutPage();
  }

  // --- CORE FUNCTIONS ---
  window.setCurrency = function(currency, save = true) {
    // Validate currency
    if (currency !== 'USD' && currency !== 'AUD') {
      logWarning('Invalid currency: ' + currency + ', defaulting to USD');
      currency = CONFIG.defaultCurrency;
    }

    // 1. Update Body Class
    document.body.classList.remove('currency-mode-usd', 'currency-mode-aud');
    document.body.classList.add('currency-mode-' + currency.toLowerCase());
    
    // 2. Save Preference
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

    // 3. Update UI
    updatePrices(currency);
    updateLinks(currency);
    updateToggleUI(currency);

    // 4. Show Elements (Prevent FOUC)
    document.body.classList.add('currency-loaded');
    
    // 5. Analytics - Currency Change Event
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
        
        // Handle complex HTML structure vs simple text
        if (el.classList.contains('price')) {
          el.innerHTML = `<span class="dollar-sign">${symbol}</span>${price}<span> ${currency}</span><span>${period}</span>`;
        } else {
          el.textContent = `${symbol}${price}${period}`;
        }
        
        // Store numeric value for GTM (extract number from price)
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

  /**
   * Rewrite a single checkout URL between USD and AUD (PRD §4.7).
   * Handles both offer-id swaps and variant query-param rewrites.
   * Exposed on the closure for unit testing via window.__snoozeCurrencyToggle__.
   */
  function rewriteCheckoutUrl(originalHref, currency) {
    if (!originalHref) return originalHref;

    let newLink = originalHref;
    let changed = false;

    // 1. Offer-id swap
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

    // 2. Variant query-param rewrite. Snooze Access uses ?variant=<id>
    //    against a single offer. Toggle parses and swaps the variant id.
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
        // Store original href if not already stored
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

        // Validate URL before updating
        if (linkChanged) {
          try {
            // Basic URL validation
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

  // --- UI INJECTION ---
  function injectToggles() {
    // Desktop Nav
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
    
    // Mobile Menu
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

  // --- CHECKOUT SPECIFIC ---
  function handleCheckoutPage() {
    if (!window.location.href.includes('/checkout')) return;

    const currentUrl = window.location.href;
    // Find if current page is a known offer
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
        // Inject Switch Link
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

        // Inject AUD Discount Warning
        if (targetCurrency === 'USD') { // Means we are currently on AUD
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

  // Test hook (PRD §4.7). Exposed only when window is present and the
  // toggle is loaded outside a real Kajabi page (e.g. node test harness).
  if (typeof window !== 'undefined') {
    window.__snoozeCurrencyToggle__ = {
      rewriteCheckoutUrl: rewriteCheckoutUrl,
      CONFIG: CONFIG
    };
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCurrency);
  } else {
    initCurrency();
  }

})();
</script>
