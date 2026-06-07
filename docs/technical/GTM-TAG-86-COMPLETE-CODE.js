<script>
(function() {
  console.log("Snooze Tracking: Starting Dynamic Price Scraper...");

  // Helper function to safely save data
  function safeSave(key, value) {
    if (value) {
      window.localStorage.setItem(key, value);
    }
  }

  // Function to find and save the *FINAL* price (after discount)
  function updateSelectedPrice() {
    try {
      var price = 0;
      var priceText = "";
      var finalPriceFound = false;

      // PRIORITY 1: Get FINAL price after discount (what customer actually pays)
      // This is the most important - we want actual revenue, not base price
      
      // Strategy A1: Check #offer-price FIRST (most specific element for final price)
      // Diagnostic shows: span#offer-price.embedded-checkout-price-display__offer-price contains $0.00
      var finalPriceEl = document.querySelector("#offer-price");
      if (finalPriceEl) {
        var finalPriceText = finalPriceEl.innerText || finalPriceEl.textContent || '';
        // Extract price - handles "$0.00", "$147.00", "$490.00", etc.
        // Regex: optional $, then digits (with optional commas), optional decimal, optional cents
        var finalPriceMatch = finalPriceText.match(/\$?([\d,]+(?:\.\d{2})?)/);
        if (finalPriceMatch) {
          priceText = finalPriceMatch[1];
          finalPriceFound = true;
          console.log("Snooze Tracking: Found final price in #offer-price: $" + priceText);
        }
      }
      
      // Strategy A2: Check "Due now" section (fallback if #offer-price not found)
      // Diagnostic shows: .embedded-checkout-price-detail contains "Due now USD $0.00"
      if (!finalPriceFound) {
        var dueNowSection = document.querySelector('.embedded-checkout-price-detail');
        if (dueNowSection) {
          var dueNowText = dueNowSection.innerText || dueNowSection.textContent || '';
          // Look for the LAST price in "Due now" section (after "Due now" text)
          // This ensures we get the final amount, not any intermediate prices
          var priceMatches = dueNowText.match(/\$([\d,]+(?:\.\d{2})?)/g);
          if (priceMatches && priceMatches.length > 0) {
            // Get the last price match (should be the final amount)
            var lastMatch = priceMatches[priceMatches.length - 1];
            var dueNowMatch = lastMatch.match(/\$([\d,]+(?:\.\d{2})?)/);
            if (dueNowMatch) {
              priceText = dueNowMatch[1];
              finalPriceFound = true;
              console.log("Snooze Tracking: Found final price in 'Due now' section: $" + priceText);
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
            console.log("Snooze Tracking: Using base price (discount not applied yet): $" + priceText);
          }
        }
      }

      // Convert to number and save (including $0 for 100% off coupons)
      if (priceText) {
        price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        if (!isNaN(price) && price >= 0) { // Allow $0 for free purchases
          window.localStorage.setItem("value", price);
          console.log("Snooze Tracking: Updated Price to $" + price + (finalPriceFound ? " (final price after discount)" : " (base price)"));
        }
      }

    } catch(e) { 
      console.error("Snooze Price Scrape Error:", e); 
    }
  }

  // IMPROVED: Function to attach click listeners (without breaking UI)
  function attachClickListeners() {
    var pricingOptions = document.querySelectorAll(".embedded-checkout-pricing-option");
    var attached = 0;
    
    pricingOptions.forEach(function(option) {
      // Attach listener directly (don't clone/replace - that breaks Kajabi's UI)
      try {
        // Use capture phase to ensure we catch the event
        option.addEventListener("click", function(e) {
          console.log("Snooze Tracking: Pricing option clicked");
          // Don't prevent default - let Kajabi handle the selection
          setTimeout(function() {
            updateSelectedPrice();
          }, 500);
        }, true); // Use capture phase
        
        attached++;
      } catch(e) {
        console.warn("Snooze Tracking: Could not attach listener to option", e);
      }
    });
    
    if (attached > 0) {
      console.log("Snooze Tracking: Attached listeners to " + attached + " pricing options");
    }
    
    return attached;
  }

  // 1. Run immediately on load
  updateSelectedPrice();

  // 2. Strategy 1: Try to attach click listeners immediately
  var listenersAttached = attachClickListeners();

  // 3. Strategy 2: Use event delegation (works even if elements load later or get replaced)
  // Use capture phase and don't stop propagation - let Kajabi handle the click
  var container = document.querySelector('.embedded-checkout-pricing-options') || 
                  document.querySelector('[class*="pricing"]') || 
                  document.body;
  
  container.addEventListener('click', function(e) {
    var clickedOption = e.target.closest('.embedded-checkout-pricing-option');
    if (clickedOption) {
      console.log("Snooze Tracking: Pricing option clicked (event delegation)");
      // Don't prevent default or stop propagation - let Kajabi update the UI
      setTimeout(function() {
        updateSelectedPrice();
      }, 500);
    }
  }, true); // Use capture phase

  // 4. Strategy 3: Retry if elements not found initially (for dynamic loading)
  if (listenersAttached === 0) {
    console.log("Snooze Tracking: No pricing options found initially, retrying...");
    setTimeout(function() {
      attachClickListeners();
    }, 1000);
    
    // Also retry after 2 seconds
    setTimeout(function() {
      attachClickListeners();
    }, 2000);
  }

  // 5. Strategy 4: Watch for selection changes using MutationObserver
  try {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Watch for pricing option selection changes
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          var target = mutation.target;
          if (target.classList && 
              target.classList.contains('embedded-checkout-pricing-option') && 
              target.classList.contains('selected')) {
            console.log("Snooze Tracking: Selection changed (MutationObserver)");
            setTimeout(function() {
              updateSelectedPrice();
            }, 100);
          }
        }
        
        // Watch for discount/coupon application (final price changes)
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          var target = mutation.target;
          // Check if mutation is in price-related elements
          if (target.id === 'offer-price' || 
              target.classList && (
                target.classList.contains('embedded-checkout-price-detail') ||
                target.classList.contains('embedded-checkout-coupon__price')
              )) {
            console.log("Snooze Tracking: Price/discount changed (MutationObserver)");
            setTimeout(function() {
              updateSelectedPrice();
            }, 200);
          }
        }
      });
    });

    // Observe pricing options container, price summary, and body
    var pricingContainer = document.querySelector('.embedded-checkout-pricing-options') || 
                           document.querySelector('[class*="pricing"]') ||
                           document.body;
    
    observer.observe(pricingContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
      characterData: true
    });
    
    // Also observe the price summary section for discount changes
    var priceSummary = document.querySelector('.embedded-checkout__summary') ||
                       document.querySelector('.embedded-checkout-price-summary');
    if (priceSummary) {
      observer.observe(priceSummary, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
    
    console.log("Snooze Tracking: MutationObserver set up to watch for selection and discount changes");
  } catch(e) {
    console.warn("Snooze Tracking: MutationObserver not supported or failed", e);
  }
  
  // 6. Strategy 5: Periodic check for final price (handles slow discount application)
  // Some coupons might take a moment to apply, so check periodically
  var priceCheckInterval = setInterval(function() {
    var currentValue = parseFloat(localStorage.getItem('value')) || 0;
    updateSelectedPrice();
    var newValue = parseFloat(localStorage.getItem('value')) || 0;
    if (newValue !== currentValue) {
      console.log("Snooze Tracking: Price updated via periodic check: $" + currentValue + " → $" + newValue);
    }
  }, 2000); // Check every 2 seconds
  
  // Stop checking after 30 seconds (page should be fully loaded by then)
  setTimeout(function() {
    clearInterval(priceCheckInterval);
    console.log("Snooze Tracking: Stopped periodic price checks");
  }, 30000);

  // --- FIELD SCRAPING (Email, Phone, etc.) ---
  
  // Scrape PRODUCT NAME
  try {
    var titleEl = document.querySelector("#offer-title");
    if (titleEl) {
      safeSave("product_name", titleEl.innerText);
    }
  } catch(e) {}

  // Scrape EMAIL (Complex Shadow DOM)
  try {
    var pdsInput = document.querySelector("pds-input");
    if (pdsInput && pdsInput.shadowRoot) {
      var emailInput = pdsInput.shadowRoot.querySelector("#email");
      if (emailInput) {
        safeSave("email", emailInput.value);
        // Add listener for changes
        emailInput.addEventListener("blur", function() {
          safeSave("email", emailInput.value);
        });
      }
    }
  } catch(e) { }

  // Scrape STANDARD FIELDS
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
        el.addEventListener("blur", function() { 
          safeSave(field.key, el.value); 
        });
      }
    } catch(e) {}
  });

})();
</script>
