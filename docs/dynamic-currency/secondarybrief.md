This document is a complete execution brief for your development team. It consolidates the strategy, business logic, and code into a single instruction set.

---

# Developer Brief: Dynamic Currency Toggle (USD/AUD)

**Project:** Snooze Platform – Multi-Currency Implementation
**Date:** December 30, 2025
**Priority:** High (Critical for Australian Market CRO)
**Platform:** Kajabi

## 1. Executive Summary
We are implementing a client-side currency toggle to allow users to view pricing in either **USD (Global)** or **AUD (Australia)**.
This involves detecting the user's location via Timezone, persisting their preference in `localStorage`, dynamically swapping price text on the page, and redirecting Checkout buttons to the correct currency-specific Kajabi Offer.

## 2. Business Logic & Behavior

1.  **Default State:**
    *   **Auto-Detect:** If user's browser timezone is `Australia/*`, default to **AUD**.
    *   **Fallback:** All other users default to **USD**.
2.  **Persistence:**
    *   User preference is saved to `localStorage` key: `snooze_currency_preference`.
    *   This setting overrides auto-detection on subsequent visits.
3.  **Sales Pages (Home/Landing):**
    *   Display a toggle switch in the Navigation bar.
    *   Prices update instantly without page reload.
    *   "Join" buttons update their `href` to point to the correct Offer ID.
4.  **Checkout Pages:**
    *   **No Toggle Switch.**
    *   Instead, display a text link: *"Prefer to pay in [Alternate Currency]?"*
    *   Clicking this redirects the user to the alternate Offer URL.
    *   **Discounts:** If AUD is active, show a warning that most discount codes are USD-only.

## 3. Technical Configuration (Offer Mapping)

These IDs are hardcoded in the JavaScript. Ensure these matches your Kajabi backend.

| Product | USD Offer ID | AUD Offer ID |
| :--- | :--- | :--- |
| **Membership (Launch)** | `6iRarwak` | `bFxLg2uz` |
| **Consult Upsell** | `igbTdRbk` | `SiiVEJuS` |

---

## 4. Implementation Steps

### Step 1: Update CSS (Global Styles)
*Location: Settings > Site Details > Header Page Scripts (inside `<style>`) OR Theme Settings > Custom CSS.*

Add this code to handle the toggle UI and prevent "Flash of Unstyled Content" (FOUC) where the wrong price shows briefly.

```css
/* ============================================
   SNOOZE CURRENCY TOGGLE STYLES
   ============================================ */

/* 1. FOUC Prevention: Hide prices until JS determines currency */
.dynamic-price, .dynamic-cta {
  visibility: hidden; 
  opacity: 0;
  transition: opacity 0.2s ease;
}

body.currency-loaded .dynamic-price,
body.currency-loaded .dynamic-cta {
  visibility: visible;
  opacity: 1;
}

/* 2. The Toggle Switch (Desktop & Mobile) */
.currency-toggle-btn {
  background: transparent;
  border: 1px solid var(--color-navy, #1F293B);
  color: var(--color-navy, #1F293B);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  margin-left: 12px;
  font-family: var(--font-body, sans-serif);
}

.currency-toggle-btn:hover {
  background: var(--color-beige, #F2EDEA);
}

.currency-flag {
  font-size: 14px;
  line-height: 1;
}

/* Active State Styling (AUD Mode) */
body.currency-mode-aud .currency-toggle-btn {
  background: rgba(0, 82, 204, 0.1);
  border-color: #0052cc;
  color: #0052cc;
}

/* 3. Checkout Page Specifics */
.checkout-currency-switch {
  display: block;
  text-align: center;
  margin: 15px 0;
  font-size: 14px;
  color: #666;
  font-family: sans-serif;
}

.checkout-currency-switch a {
  color: #1F293B;
  text-decoration: underline;
  font-weight: 600;
  cursor: pointer;
}

.aud-discount-warning {
  background-color: #fff3cd;
  color: #856404;
  padding: 10px;
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 15px;
  text-align: center;
  border: 1px solid #ffeeba;
  font-family: sans-serif;
}
```

### Step 2: Add JavaScript Logic
*Location: Settings > Site Details > Footer Page Scripts.*

This script handles detection, toggling, and link swapping.

```javascript
<script>
/**
 * SNOOZE DYNAMIC CURRENCY MANAGER
 * Version 1.0 - Dec 30 2025
 */
(function() {
  'use strict';

  // --- CONFIGURATION ---
  const CONFIG = {
    storageKey: 'snooze_currency_preference',
    defaultCurrency: 'USD',
    // MAP: 'USD_ID' : 'AUD_ID'
    offerMapping: {
      '6iRarwak': 'bFxLg2uz', // Membership Launch
      'igbTdRbk': 'SiiVEJuS'  // Consult Upsell
    }
  };

  // --- MAIN INIT ---
  function initCurrency() {
    let pref = localStorage.getItem(CONFIG.storageKey);

    // Auto-detect if no preference saved
    if (!pref) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        pref = (tz && tz.includes('Australia')) ? 'AUD' : 'USD';
      } catch (e) {
        pref = 'USD';
      }
    }

    // Apply currency (without saving to storage yet, to keep auto-detect dynamic until manual click)
    setCurrency(pref, false); 
    
    injectToggles();
    handleCheckoutPage();
  }

  // --- CORE FUNCTIONS ---
  window.setCurrency = function(currency, save = true) {
    // 1. Update Body Class
    document.body.classList.remove('currency-mode-usd', 'currency-mode-aud');
    document.body.classList.add('currency-mode-' + currency.toLowerCase());
    
    // 2. Save Preference
    if (save) {
      localStorage.setItem(CONFIG.storageKey, currency);
    }

    // 3. Update UI
    updatePrices(currency);
    updateLinks(currency);
    updateToggleUI(currency);

    // 4. Show Elements (Prevent FOUC)
    document.body.classList.add('currency-loaded');
    
    // 5. Analytics
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'currency_change',
        'currency_preference': currency
      });
    }
  };

  function updatePrices(currency) {
    const elements = document.querySelectorAll('.dynamic-price');
    elements.forEach(el => {
      const price = el.getAttribute(`data-${currency.toLowerCase()}`);
      const period = el.getAttribute(`data-period-${currency.toLowerCase()}`) || '';
      
      if (price) {
        const symbol = currency === 'AUD' ? 'A$' : '$';
        
        // Handle complex HTML structure vs simple text
        if (el.classList.contains('price')) {
          el.innerHTML = `<span class="dollar-sign">${symbol}</span>${price}<span> ${currency}</span><span>${period}</span>`;
        } else {
          el.textContent = `${symbol}${price} ${period}`;
        }
      }
    });
  }

  function updateLinks(currency) {
    const buttons = document.querySelectorAll('.dynamic-cta, [data-checkout], .pricing-card a, .hero-cta');
    
    buttons.forEach(btn => {
      // Store original href if not already stored
      let originalHref = btn.getAttribute('data-original-href');
      if (!originalHref) {
        originalHref = btn.getAttribute('href');
        btn.setAttribute('data-original-href', originalHref);
      }
      
      if(!originalHref) return;

      // Swap logic
      let newLink = originalHref;
      for (const [usdId, audId] of Object.entries(CONFIG.offerMapping)) {
        if (currency === 'AUD' && originalHref.includes(usdId)) {
          newLink = originalHref.replace(usdId, audId);
        } else if (currency === 'USD' && originalHref.includes(audId)) {
          newLink = originalHref.replace(audId, usdId);
        }
      }
      btn.setAttribute('href', newLink);
    });
  }

  // --- UI INJECTION ---
  function injectToggles() {
    // Desktop Nav
    const navActions = document.querySelector('.navbar .sn-actions, .navbar nav');
    if (navActions && !document.querySelector('.nav-currency-toggle')) {
      const toggle = createToggleButton('nav-currency-toggle');
      navActions.appendChild(toggle);
    }
    
    // Mobile Menu
    const mobileMenu = document.querySelector('.sn-mobile-inner');
    if (mobileMenu && !document.querySelector('.mobile-currency-toggle')) {
      const toggle = createToggleButton('mobile-currency-toggle');
      toggle.style.marginTop = '20px';
      toggle.style.width = '100%';
      toggle.style.justifyContent = 'center';
      mobileMenu.appendChild(toggle);
    }
  }

  function createToggleButton(className) {
    const btn = document.createElement('button');
    btn.className = `currency-toggle-btn ${className}`;
    btn.onclick = () => {
      const current = document.body.classList.contains('currency-mode-aud') ? 'AUD' : 'USD';
      setCurrency(current === 'AUD' ? 'USD' : 'AUD', true);
    };
    return btn;
  }

  function updateToggleUI(currency) {
    const toggles = document.querySelectorAll('.currency-toggle-btn');
    const flag = currency === 'AUD' ? '🇦🇺' : '🇺🇸'; 
    const label = currency === 'AUD' ? 'AUD' : 'USD';
    
    toggles.forEach(t => {
      t.innerHTML = `<span class="currency-flag">${flag}</span> ${label}`;
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
        currentOfferId = usdId; targetOfferId = audId; targetCurrency = 'AUD';
      } else if (currentUrl.includes(audId)) {
        currentOfferId = audId; targetOfferId = usdId; targetCurrency = 'USD';
      }
    }

    if (targetOfferId) {
      // Inject Switch Link
      const container = document.querySelector('.checkout-panel-header, .panel-heading') || document.body;
      const switchDiv = document.createElement('div');
      switchDiv.className = 'checkout-currency-switch';
      switchDiv.innerHTML = `Prefer to pay in ${targetCurrency}? <a href="#" id="currency-switch-link">Switch to ${targetCurrency}</a>`;
      
      if(container.nextSibling) container.parentNode.insertBefore(switchDiv, container.nextSibling);
      else container.appendChild(switchDiv);

      document.getElementById('currency-switch-link').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem(CONFIG.storageKey, targetCurrency);
        window.location.href = currentUrl.replace(currentOfferId, targetOfferId);
      });

      // Inject AUD Discount Warning
      if (targetCurrency === 'USD') { // Means we are currently on AUD
        const couponArea = document.querySelector('.checkout-coupon-panel, #coupon-panel');
        if (couponArea) {
          const warning = document.createElement('div');
          warning.className = 'aud-discount-warning';
          warning.innerText = 'Note: Most discount codes are valid for USD pricing only.';
          couponArea.parentNode.insertBefore(warning, couponArea);
        }
      }
    }
  }

  // Start
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCurrency);
  else initCurrency();

})();
</script>
```

### Step 3: Content Markup (HTML Updates)
You must update the HTML in Kajabi Page Builder to use the `dynamic-price` class and data attributes.

**1. Main Pricing Section:**
```html
<!-- Quarterly -->
<p class="price dynamic-price" 
   data-usd="147" 
   data-aud="220" 
   data-period-usd="/ 3 months" 
   data-period-aud="/ 3 months">
   <span class="dollar-sign">$</span>147<span> USD</span><span>/ 3 months</span>
</p>

<!-- Annual -->
<p class="price dynamic-price" 
   data-usd="490" 
   data-aud="695" 
   data-period-usd="/ year" 
   data-period-aud="/ year">
   <span class="dollar-sign">$</span>490<span> USD</span><span>/ year</span>
</p>
```

**2. Value Comparison Table:**
```html
<div class="col price dynamic-price" data-usd="468" data-aud="700">$468</div>
```

**3. Call to Action Buttons:**
Add the class `dynamic-cta` to ensure smooth fading (links update automatically via script).
```html
<a href="https://joinsnooze.com/offers/6iRarwak/checkout" class="cta-btn primary dynamic-cta">Join Now</a>
```

---

## 5. QA Checklist

*   [ ] **Auto-Detection:** Use a VPN set to Australia. Does the toggle default to AUD?
*   [ ] **Switching:** Click the toggle. Do prices change? Do button URLs change?
*   [ ] **Persistence:** Refresh the page. Does your selection stay?
*   [ ] **Checkout:** Click "Join" in AUD mode. Do you land on the AUD checkout page?
*   [ ] **Checkout Switch:** On the checkout page, does the "Switch to USD" link appear and work?
*   [ ] **Mobile:** Check the mobile menu. Is the toggle visible and functional?
*   [ ] **FOUC:** Load the page on a slow connection (Network throttling). Do you see the wrong price flash, or does it fade in correctly?