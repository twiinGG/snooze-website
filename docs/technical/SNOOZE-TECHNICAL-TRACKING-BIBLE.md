# Snooze Technical Architecture: Tracking & Performance

**Version:** 2.2 (Final Price Tracking Fix)
**Date:** December 13, 2025
**Status:** Live
**Last Updated:** December 16, 2025 - Fixed final price tracking after discount (tracks actual revenue, not base price)
**Tech Stack:** Kajabi, Google Tag Manager (Web + Server), Stape.io, Meta CAPI, GA4
**Maintainers:** Sally & Kade

---

## 1. Architecture Overview

The Snooze platform utilizes a **Hybrid Server-Side Tracking** architecture. Unlike standard setups that rely solely on the user's browser (Client-Side), we route critical sales data through a secure server to ensure data accuracy and attribution integrity.

### Data Flow Diagram

```mermaid
[User Browser] 
      |
      +--- (Landing Pages) ---> [Google GTM (Lite)] ---> [GA4 / FB Basic Click Tracking]
      |
      +--- (Checkout/Sales) --> [Stape Loader (Heavy)] -> [Web GTM Scraper]
                                          |
                                          v
                                   [Local Storage]
                                          |
                                          v
                                   [Server GTM (Stape.io)]
                                          |
                                          +---> [Meta CAPI (100% Accuracy)]
                                          +---> [Google Ads]
                                          +---> [GA4 Server-Side]
```

### The Two GTM Containers
*   **Web Container (`GTM-KNRTH6P`):** Acts as the "Scraper." It runs in the user's browser, detects button clicks, scrapes pricing/email data from the DOM, and sends it to the server.
*   **Server Container (`GTM-PHFGMTQJ`):** Acts as the "Broadcaster." It receives data, cleans it, anonymizes IP addresses, and sends it to ad platforms via API.

---

## 2. The "Hybrid" Performance Strategy

To achieve a **90+ Mobile Speed Score** on traffic entry points (Link-in-Bio) while maintaining robust tracking on checkouts, we use conditional logic injected into the Kajabi Header.

### The Logic
The script checks the URL slug.
*   **IF** the user is on a "Fast Page" (e.g., `/links`), we **delay** tracking by 1500ms. This allows the visual elements to load instantly (LCP < 2.5s) before heavy scripts execute.
*   **ELSE** (e.g., Checkout), we load tracking **immediately** to ensure we capture every interaction for attribution.

### Implementation: Kajabi Header Script
**Location:** Kajabi > Settings > Site Details > Header Page Scripts

```html
<!-- Snooze LCP Preload -->
<!-- CRITICAL: Update this URL if you change the profile picture on /links -->
<link rel="preload" as="image" href="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156873377/settings_images/80401fc-d...png" fetchpriority="high">

<!-- Snooze Hybrid Tracking System -->
<script>
  // --- CONFIGURATION ---
  var containerId = 'GTM-KNRTH6P';
  
  // Add any URL slug here that needs to load INSTANTLY (Delay tracking)
  var fastPages = [
    '/links', 
    '/waitlist',
    '/bio',
    '/free-guide' 
  ];
  // ---------------------

  // Check if current URL matches any fast page
  var isFastPage = fastPages.some(function(page) { 
    return window.location.href.indexOf(page) > -1; 
  });

  if (isFastPage) {
    // --- MODE A: DELAYED SPEED (Landing Pages) ---
    // Wait 1.5s for visuals to load, THEN load tracking.
    console.log('Snooze: Fast Page Detected - Delaying Tracking');
    
    setTimeout(function() {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer',containerId);
    }, 1500); 

  } else {
    // --- MODE B: INSTANT POWER (Sales/Checkout) ---
    // Load Stape Server-Side Loader immediately for max accuracy.
    console.log('Snooze: Commerce Page - Loading Full Tracking');
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://load.ss.joinsnooze.com/2ostmfzxzts.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','9r2=GhBHPy4rQD89Ji4wTDZLAk5GVElcAgNJABgfHQoFAhoQHR8KHQNDFxwZVBkP');
  }
</script>
```

---

## 3. Data Collection: The Checkout Scraper

**⚠️ CRITICAL SYSTEM**
Kajabi does not provide a native Data Layer for checkouts. We rely on **GTM Tag 86** to "scrape" the DOM for user details and price.

### How Scraper (Tag 86) Works
1.  **Final Price Detection (After Discount):** Prioritizes `#offer-price` element which contains the final price after discount is applied. Falls back to "Due now" section (`.embedded-checkout-price-detail`), then base price if discount not yet applied. **Critical:** Tracks actual revenue (what customer pays), not base price.
2.  **Dynamic Price Updates:** Uses MutationObserver to watch for discount/coupon application and price changes. Also includes periodic checks every 2 seconds to catch slow discount applications.
3.  **Event Listeners:** It attaches `click` listeners to pricing options. If a user switches plans, the code waits 500ms and re-scrapes the new price.
4.  **Local Storage:** It saves scraped data (`email`, `phone`, `value`, `transaction_id`) into the browser's Local Storage. **Note:** `value` now stores final price after discount (including $0 for 100% off coupons).
5.  **Purchase Trigger:** When the "Thank You" page loads, a separate tag reads this storage and sends the purchase event with the correct final price.

### Code: GTM Tag 86 (`0.2 Set - Purchase - UserData`)
*If checkout tracking breaks, check this code first against the Kajabi checkout HTML.*

```javascript
<script>
(function() {
  console.log("Snooze Tracking: Starting Data Scrape...");

  // Helper to safely save to LocalStorage
  function safeSave(key, value) {
    if (value) {
      window.localStorage.setItem(key, value);
    }
  }

  // --- FUNCTION: Update FINAL Price (After Discount) ---
  // CRITICAL: Tracks actual revenue (what customer pays), not base price
  function updateSelectedPrice() {
    try {
      var price = 0;
      var priceText = "";
      var finalPriceFound = false;

      // PRIORITY 1: Get FINAL price after discount (what customer actually pays)
      
      // Strategy A1: Check #offer-price FIRST (most specific element for final price)
      // This element contains the final price after discount is applied
      var finalPriceEl = document.querySelector("#offer-price");
      if (finalPriceEl) {
        var finalPriceText = finalPriceEl.innerText || finalPriceEl.textContent || '';
        var finalPriceMatch = finalPriceText.match(/\$?([\d,]+(?:\.\d{2})?)/);
        if (finalPriceMatch) {
          priceText = finalPriceMatch[1];
          finalPriceFound = true;
        }
      }
      
      // Strategy A2: Check "Due now" section (fallback if #offer-price not found)
      if (!finalPriceFound) {
        var dueNowSection = document.querySelector('.embedded-checkout-price-detail');
        if (dueNowSection) {
          var dueNowText = dueNowSection.innerText || dueNowSection.textContent || '';
          var priceMatches = dueNowText.match(/\$([\d,]+(?:\.\d{2})?)/g);
          if (priceMatches && priceMatches.length > 0) {
            var lastMatch = priceMatches[priceMatches.length - 1];
            var dueNowMatch = lastMatch.match(/\$([\d,]+(?:\.\d{2})?)/);
            if (dueNowMatch) {
              priceText = dueNowMatch[1];
              finalPriceFound = true;
            }
          }
        }
      }
      
      // FALLBACK: If final price not found, use base price (before discount)
      // This handles cases where discount hasn't been applied yet or coupon not entered
      if (!finalPriceFound) {
        var selectedOption = document.querySelector(".embedded-checkout-pricing-option.selected");
        if (selectedOption) {
          var textContent = selectedOption.innerText; 
          var match = textContent.match(/\$([\d,]+(?:\.\d{2})?)/);
          if (match) {
            priceText = match[1];
          }
        }
      }

      // Convert to number and save (including $0 for 100% off coupons)
      if (priceText) {
        price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        if (!isNaN(price) && price >= 0) { // Allow $0 for free purchases
          safeSave("value", price);
          console.log("Snooze Tracking: Updated Price to $" + price + (finalPriceFound ? " (final price after discount)" : " (base price)"));
        }
      }
    } catch(e) { console.error("Snooze Price Error:", e); }
  }

  // Run Price Check Immediately & On Click
  updateSelectedPrice();
  var pricingOptions = document.querySelectorAll(".embedded-checkout-pricing-option");
  pricingOptions.forEach(function(option) {
    option.addEventListener("click", function() {
        setTimeout(updateSelectedPrice, 500); // Wait for UI transition
    });
  });

  // --- FIELD SCRAPING ---
  
  // 1. Product Name
  try {
    var titleEl = document.querySelector("#offer-title");
    if (titleEl) safeSave("product_name", titleEl.innerText);
  } catch(e) {}

  // 2. Email (Shadow DOM)
  try {
    var pdsInput = document.querySelector("pds-input");
    if (pdsInput && pdsInput.shadowRoot) {
      var emailInput = pdsInput.shadowRoot.querySelector("#email");
      if (emailInput) {
        safeSave("email", emailInput.value);
        // Update on change
        emailInput.addEventListener("blur", function() { safeSave("email", emailInput.value); });
      }
    }
  } catch(e) { console.warn("Email input not found via Shadow DOM"); }

  // 3. Standard Fields
  var fields = [
    { id: "#phone", key: "phone" },
    { id: "#name", key: "full_name" },
    { id: "#city-input", key: "city" },
    { id: "#addressZip", key: "zip" },
    { id: "#addressCountry", key: "country" }
  ];

  fields.forEach(function(field) {
    try {
      var el = document.querySelector(field.id);
      if (el) {
          safeSave(field.key, el.value);
          el.addEventListener("blur", function() { safeSave(field.key, el.value); });
      }
    } catch(e) {}
  });

})();
</script>
```

---

## 4. Server Infrastructure (Stape.io)

*   **Server Location:** AU East (Australia)
*   **Tagging URL:** `https://ss.joinsnooze.com` (Updated Dec 13, 2025 - migrated from `ss.joinsnooze.com`)
*   **Custom Loader:** `https://load.ss.joinsnooze.com` (Updated Dec 13, 2025 - migrated from `load.ss.joinsnooze.com`)
    *   *Purpose:* Hides GTM from Ad Blockers by serving it from our own domain.
*   **Power-Ups:**
    *   **Cookie Keeper:** Extends cookie life (fbp/fbc) from 7 days to 2 years on Safari.
    *   **GA4 Ad Block Bypass:** Active.
*   **Note:** References to "BigQuery" in the Server Container are dormant/legacy and can be ignored. We do not use Google Cloud Platform (GCP).

---

## 5. Platform Specifics

### Meta (Facebook)
*   **Pixel ID:** `449153684613893`
*   **Integration:** Browser + Server (CAPI).
*   **Deduplication:** Handled via **Event ID**.
*   **Advanced Matching:** **OFF** in Facebook Settings.
    *   *Reason:* We scrape and hash user data manually in GTM (Server-Side) for higher accuracy and security. Turning it on in Facebook is redundant and wastes browser CPU.

### Google Analytics 4 (GA4)
*   **Measurement ID:** `G-J4TY43FW1G`
*   **Data Retention:** 14 Months (Manually set).
*   **Google Signals:** OFF (To prevent data thresholding).

---

## 6. Maintenance & Troubleshooting

### A. Launching a New Landing Page
If you create a new page (e.g., `/webinar`) and want it to load instantly:
1.  Go to Kajabi Header Scripts.
2.  Add `'/webinar'` to the `fastPages` array.
3.  This will disable heatmaps/heavy tracking on load for that page.

### B. "Purchase Value is Wrong/Zero"
1.  Kajabi likely changed the checkout HTML ID.
2.  Inspect the checkout page. Check if `#offer-price` or `.embedded-checkout-pricing-option` classes still exist.
3.  Update **GTM Tag 86** with the new selectors.

### C. "Double Counting Revenue"
1.  Ensure **GTM Tag 179** (`0.2 Set - Membership Price`) remains **PAUSED**.
2.  This tag was for the old $7/month setup and conflicts with the new multi-price logic.

### D. Microsoft Clarity (Heatmaps)
*   Clarity is **Blocked** on `/links` to save performance.
*   If you *need* heatmaps on that page for a specific test, remove the `Block - Links Page` exception from **Tag 183** in GTM. (Note: Speed score will drop).

---

**End of Documentation**