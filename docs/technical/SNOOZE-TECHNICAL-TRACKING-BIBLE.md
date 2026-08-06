# Snooze Technical Architecture: Tracking & Performance

**Version:** 4.0 (ME-006 measurement stack review, every claim re-verified against live APIs)
**Date:** August 6, 2026
**Status:** Live
**Last Updated:** August 6, 2026 - ME-006 read the live state from the Meta, GA4, GTM, Kajabi and Stape
APIs and corrected every claim below that turned out to be configuration belief rather than measured
fact. Four statements in v3.0 were wrong and are marked inline. Full evidence:
`docs/projects/measurement/4_working/2026-08-06-stack-review/`.
**Tech Stack:** Kajabi, Google Tag Manager (Web + Server), Stape.io, Meta CAPI, GA4
**Maintainers:** Sally & Kade

> **How to read this document.** Anything stated here is either measured, with a date and a source, or
> flagged as unverified. The Apr to Jun 2026 outage and the failed June 19 EMQ fix both happened because
> a configuration that looked right was never checked against live data. Configuration evidence is not
> behaviour evidence. If you add to this file, say how you know.

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

### The GTM Containers (GTM account `6058575269`)
*   **Web Container (`GTM-KNRTH6P`):** Acts as the "Scraper." It runs in the user's browser, detects button clicks, scrapes pricing/email data from the DOM, and sends it to the server.
*   **Server Container, Stape (`GTM-PHFGMTQJ`):** The **live** "Broadcaster." It receives data, cleans it, anonymizes IP addresses, and sends it to ad platforms via API. The web container routes to this one (`server_container_url = https://ss.joinsnooze.com`).
*   **Server Container, GCP (`GTM-WGPK9KFP`, numeric `230205471`): RETIRED AND MOVED TO GTM TRASH.**
    Kade confirmed the migration direction on August 6, 2026: production moved from this GCP deployment
    to Stape, not the reverse. The network state matches that decision:

    ```
    dig +short sst.sleepconcierge.com.au   ->  no output, no DNS record
    https://sst.sleepconcierge.com.au/     ->  HTTP 000
    https://ss.joinsnooze.com/healthy      ->  HTTP 200   (Stape, control)
    ```

    No DNS record meant no production event could reach its configured custom domain, so its **seven
    unpaused tags fired zero times**. On August 6, 2026, GTM MCP moved the container to Trash after a
    temporary, authorised permission elevation; the permission was restored immediately afterward.
    Paused Stape tag 32, which held the same obsolete Meta token as GCP tag 19, was removed from the live
    server container in version 9. Live Stape tag 34 remains active and healthy.

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
    '/snooze',
    '/bio',
    '/free-guide' 
  ];
  // Live as of June 2026. The LCP preload (above) must point at the current /links
  // profile image on the active theme (2161797115). Confirm the href against live Kajabi.
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

### ⚠️ KNOWN DEFECT: free claims fire `Purchase`

**There is no order check and no value check anywhere in the purchase chain.** Measured 2026-08-06.

*   Trigger `101` ("purchase datalayer") pushes the `purchase` event on **any** page whose path contains
    `/thank_you/`, for any offer, paid or free.
*   Trigger `121` ("purchase") fires the Meta and GA4 purchase tags on that event, with exactly one
    exclusion: `Page Path` not equal to `/thank_you/N8v8eFEe`. A hardcoded single-path denylist.
*   Variable `181 cJS - Final Purchase Value` returns **0** when nothing is in localStorage rather than
    aborting. A free claim therefore reports a real `Purchase` worth nothing instead of no event.

In the review window `purchase` fires **1:1 with thank-you page views** on every page. The hardcoded
exclusion protects nothing: `/thank_you/N8v8eFEe` recorded **zero page views in all of 2026**. Meanwhile
20 distinct thank-you slugs took traffic this year and Kajabi carries **23 published zero-price offers**
out of 77. Year to date: 245 purchase events across those slugs, 8 of them zero-value.

**The fix is a value condition, not another denylist entry.** Fire `Purchase` only when
`cJS - Final Purchase Value` is greater than zero. An allowlist by economics needs no maintenance when an
offer is added; a denylist by URL breaks silently every time one is.

Note that the scraper comment "including $0 for 100% off coupons" is the deliberate behaviour that feeds
this. Genuine 100%-off coupon orders and free lead-magnet claims are indistinguishable downstream.

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
*   **Tagging URL:** `https://ss.joinsnooze.com`
*   **Custom Loader:** `https://load.ss.joinsnooze.com`
    *   *Purpose:* Hides GTM from Ad Blockers by serving it from our own domain.
*   **Container identifier:** `tmfzxzts` | **Plan:** Pro, USD 20/month, paid and healthy
*   **Power-Ups: BOTH OF THE BELOW ARE OFF.** v3.0 listed Cookie Keeper and Ad Block Bypass as active.
    **Both were wrong.** Corrected and verified through the Stape API 2026-08-06:

    | Setting | The loader is built as though | The container actually says |
    |---|---|---|
    | Cookie Keeper | `codeSettings.useCookieKeeper: false` | `powerUps.cookieKeeper: false` |
    | Ad blocker bypass | `codeSettings.useAdblockBypass: false` | `powerUps.adBlocker: false` |

    Both are included in the Pro plan and simply not switched on. So cookie life is **not** extended,
    and the long-standing question "is the Cookie Life Extender actually on" is answered: no.

    Actually enabled: `customLoader` and `storage`. Everything else is off.
*   **Click ID Restorer:** included in the plan, switched off. Only worth enabling when paid advertising
    resumes, since it restores click IDs and there are currently almost no ad clicks to restore.
*   **Monitoring is NOT available on the Pro plan** (`monitoring: false`, `monitoringLimit: 0`). Logs
    retain **three days** only.
*   **Stape's stored domain is `ss.joinsnooze.com`.** The generated loader correctly uses
    `load.ss.joinsnooze.com`. The full encrypted loader URL returned HTTP 200 after correction.
*   **API access:** the Pro plan has `features.api: false`, so `app.stape.io/api/v2` returns 401 to every
    request regardless of key. This is not a broken credential. The working programmatic lane is the MCP
    server at `https://mcp.stape.ai/mcp`, authenticated with the **account** API key.
*   **Single point of failure:** GA4 and Meta CAPI both broadcast through this one Stape container. If the Stape subscription lapses, GA4 and Meta both go dark together (see the Outage & Recovery section).
*   **GCP usage:** A GCP service account backs GA4/GTM analytics tooling, not the live tag path. The
    retired parallel GCP server container `GTM-WGPK9KFP` was moved to GTM Trash on August 6, 2026. The
    "BigQuery" references in the Stape server container remain dormant legacy settings.

---

## 5. Platform Specifics

### Meta (Facebook)
*   **Pixel ID:** `449153684613893`
*   **Integration:** Browser + Server (CAPI).
*   **Deduplication:** Handled via **Event ID**.
*   **Advanced Matching:** **OFF** in Facebook Settings.
    *   *Reason:* We scrape user data in GTM and send it as advanced matching parameters. Turning it on
        in Facebook as well is redundant.
    *   **Correction to v3.0.** v3.0 said the data is hashed manually in GTM. **It is not.** Tag 125
        (`1.4 FB Purchase`) maps `em` to `{{cJS - Email}}`, the **plain** address. SHA-256 variables
        `109 cJS - Email Hashed`, `110 cJS - Phone Hashed` and `134 cJS - Lead - Email Hashed` exist in
        the container and are **referenced by no tag and no variable**. This is not currently a matching
        problem, because Meta hashes in the browser before transmission and Purchase email coverage
        measures 100%, but the documented rationale was wrong and the unused variables are misleading.

### Event Match Quality, measured 2026-08-06

Dataset `449153684613893` ("TSC Kajabi"), window 2026-07-09 to 2026-08-06.

| Event | EMQ | Match keys and coverage |
|---|---|---|
| Purchase | **6.9** | em 100, ip 100, ua 100, fbp 100, fn 100, ln 100 |
| InitiateCheckout | 6.2 | em 6.1, ip 100, ua 100, fbp 100, zip 6.1, country 6.1, fn 6.1, ct 6.1, fbc 39.4 |
| ViewContent | 6.1 | ip 100, ua 100, fbp 100, fbc 36.2 (no email at all) |
| PageView | 6.0 | em 4.2, ip 100, ua 100, fbp 100, zip 2.8, country 2.8, fn 4.2, ct 2.8, fbc 21.6 |

| Event | Browser | Server | GA4 |
|---|---|---|---|
| PageView | 6,885 | 8,184 | 7,364 |
| ViewContent | 590 | 689 | 610 |
| InitiateCheckout | 622 | 510 | 508 |
| Purchase | 34 | 33 | 33 |
| click_checkout_cta | 232 | 0 | n/a |
| cta_click | 1 | 0 | n/a |

**Three things this settles permanently:**

1.  **Deduplication works.** Purchase pairs 34 browser to 33 server. Any headline figure near 63 to 67 is
    the count *received across both paths* before dedup, not double counting. **Make no dedup change.**
2.  **EMQ 8.0 is not reachable by adding match keys.** Purchase already carries six at 100% and scores
    6.9. The remaining headroom is `fbc`, which requires ad clicks, and `ph`/`ct`/`zp`/`cn`, which the
    Kajabi checkout does not collect. Neither is reachable by GTM configuration.
3.  **`fbc` absence on Purchase is not a defect.** `fbc` only exists when a visitor arrives carrying an
    `fbclid` from a Meta click. **Meta ad spend stopped in April 2026** and only 2 of 33 purchases came
    from Instagram at all. The 0% follows from the traffic mix.

*   **`external_id` contributes nothing and cannot.** Variable `108 External Id` mints a **random UUID per
    browser** and stores it for 365 days. It is never bound to a Kajabi member, an email or any customer
    identity, so it identifies a browser rather than a person. It appears in **no event's** match-key
    feedback despite four tags sending it. To make it useful, bind it to a stable per-person identifier
    at login or purchase.
*   **Stape server tag 34 is in production mode.** Server GTM version 8 removed `TEST3319` and
    `logType: debug`. The tag remains active.
*   **Limited Data Use is off**, `dpoLDU: false` on every Meta tag.

### Paid advertising status

**No Meta ad spend since April 2026.** Monthly: Aug 2025 AU$930, Sep $607, Oct $2,282, Dec $1,448,
Jan 2026 $528, Apr 2026 $81, then nothing. Lifetime AU$7,553 across 348,173 impressions and 9,094 clicks.

This matters for prioritisation: **EMQ work improves ad matching and attribution, so with no ads running
it is preparation rather than payback.** Two campaigns remain at `effective_status: ACTIVE`
(`2604_Camp Snooze`, `2601_Camp Snooze Launch_Direct Sales`) though neither has spent since April.

### Google Analytics 4 (GA4)
*   **Measurement ID:** `G-J4TY43FW1G` | **Property ID:** `401774815`.
*   **Data Retention:** 14 Months (Manually set).
*   **Google Signals:** OFF (To prevent data thresholding).
*   **Server-side routing:** GA4 hits go through the Stape server container, not direct to GA4. The web GA4 config sends to `https://ss.joinsnooze.com` with `send_page_view=false`; the server `GA4 SS Tag` applies the real measurement ID and forwards to GA4.
*   **Client-side `{{GA4 Id}} = G-1111111111` is an intentional dummy.** The real ID is applied server-side. Do not "correct" the web value to `G-J4TY43FW1G`.
*   **Programmatic access:** the official `google-analytics-mcp` server queries GA4 via a service account (`khorus-spellbook@spellbook-459212`, key in `~/.config/snooze/`). Migration target off Khorus is `ga4-mcp@tsc-ga4-analysis`. See the recovery doc.

---

## 5.5 Outage & Recovery (Apr-Jun 2026)

The Stape subscription lapsed around mid-April 2026. Because GA4 and Meta both route through the
one Stape container, both went dark together, and the failure went unnoticed for about seven weeks.

*   **Outage window:** GA4 data healthy through **Apr 17, 2026**, dark **Apr 18 - Jun 7** (only
    negligible 1-session blips), recovering from **Jun 8, 2026** when Stape was reactivated.
*   **Reporting impact:** treat Apr 18 - Jun 7, 2026 as a known GA4/Meta data gap, not a real drop.
*   **Recovery confirmed:** GA4 realtime showed real homepage and `/blog` traffic on Jun 8. Re-verify
    full GA4 volume and Meta server (CAPI) events after the ~24h reporting lag clears.
*   **Prevention is in place outside Stape.** Native Stape monitoring is not available on the Pro plan
    (`monitoring: false`, `monitoringLimit: 0`), so the governed n8n workflow `stape-health-monitor`
    checks the container base, `/healthy` and the deployed custom loader every hour. It writes
    `mcp_health_logs` and sends a Gmail alert on non-healthy results. ME-006 corrected the loader URL on
    August 6, 2026, and all three checks now contribute to the verdict.

Full detail: `docs/operations/TRACKING-RECOVERY-AND-GA4-MCP-2026-06-08.md`.

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

### C2. "A free claim showed up as a purchase"
Expected, until the trigger 121 fix lands. See the known defect in section 3. Do **not** fix it by adding
the new thank-you path to the exclusion filter, which is what was done last time and is why the defect
persists. Add the value condition instead.

### C3. "Meta reports roughly twice as many events as GA4"
Not a defect. Events Manager's headline count reports events received on **both** the browser and server
paths before dedup is applied. Dedup is working, verified by Purchase pairing 34 browser to 33 server.

### D. Microsoft Clarity (Heatmaps)
*   Clarity is **Blocked** on `/links` to save performance.
*   If you *need* heatmaps on that page for a specific test, remove the `Block - Links Page` exception from **Tag 183** in GTM. (Note: Speed score will drop).

---

## 7. Document map: what is canonical and what is superseded

This file is the canonical account of the tracking stack. The contractor-era cluster below was written
between December 2025 and January 2026, before the Apr to Jun 2026 outage and before anything was checked
against live data. **Several of those documents state as fixed things that ME-006 measured as still
broken**, `cta_click` being the clearest case: `CTA-CLICK-TRACKING-FIX.md` is marked "FIXED" and the event
measures 1 browser hit and 0 server hits across a month.

Each file listed as superseded carries a tombstone header pointing here. They are kept for history, not
for guidance.

**Still canonical, use these:**

| Document | Covers |
|---|---|
| `SNOOZE-TECHNICAL-TRACKING-BIBLE.md` | this file, the stack as a whole |
| `CODE-SURFACE-CONTRACT.md` | which code lives in which Kajabi field, verified live |
| `KAJABI-CHECKOUT-TRACKING-CODE.md` | the checkout paste targets |
| `KAJABI-SURFACE-CODE-SETUP.md` | surface setup procedure |
| `EXTERNAL-REPO-SYNC.md` | monorepo to `twiinGG/snooze-website` publish model |
| `URL-REFERENCE.md` | live URL inventory |
| `docs/projects/measurement/4_working/2026-08-06-stack-review/` | ME-006 evidence, gates and change list |

**Superseded, tombstoned:**

`CTA-CLICK-TRACKING-FIX.md`, `FINAL-PRICE-TRACKING-FIX.md`, `PRICE-TRACKING-FIX-GUIDE.md`,
`PRICE-TRACKING-ROOT-CAUSE-FIX.md`, `GTM-TAG-86-CLICK-LISTENER-FIX.md`, `GTM-TAG-86-QUICK-FIX.md`,
`GTM-TAG-86-TRIGGER-FIX.md`, `META-PURCHASE-EVENT-VERIFICATION.md`, `TRACKING-ISSUE-CHECKOUT-PAGE.md`,
`TRACKING-TEST-AFTER-FIX.md`, `TRACKING-TEST-CHECKLIST.md`, `TRACKING-TEST-QUICK-REFERENCE.md`,
`CONVERSION-TRACKING-RECOMMENDATIONS.md`, `META-ADS-TRAFFIC-ANALYSIS.md`, `CLARITY-FUNNEL-ANALYSIS.md`,
`COMBINED-FUNNEL-ANALYSIS.md`, `LANDING-PAGE-ANALYSIS.md`, `EMQ-CAPI-ADVANCED-MATCHING.md`,
`TECHNICAL-ARCHITECTURE-HANDOVER.md`.

---

**End of Documentation**
