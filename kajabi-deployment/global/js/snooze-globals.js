<!-- Snooze LCP Preload -->

<link rel="preload" as="image" href="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2161797115/settings_images/c0d2c2a-05e0-a12f-120-75ab72aff35b_TSC_-_Logo_-_Dk_Navy_-_Web_300.webp" fetchpriority="high">

<!-- Snooze Hybrid Tracking System v3 (Fast Pages) -->

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
  // ---------------------

  // Check if current URL matches any fast page
  var isFastPage = fastPages.some(function(page) { 
    return window.location.href.indexOf(page) > -1; 
  });

  if (isFastPage) {
    // --- MODE A: DELAYED SPEED ---
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
    // Load Stape Server-Side Loader immediately for accuracy.
    console.log('Snooze: Commerce Page - Loading Full Tracking');
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://load.ss.joinsnooze.com/2ostmfzxzts.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','9r2=GhBHPy4rQD89Ji4wTDZLAk5GVElcAgNJABgfHQoFAhoQHR8KHQNDFxwZVBkP');
  }
</script>
<!-- End Snooze Hybrid Tracking -->

<!-- Snooze Global JavaScript Variables -->
<script>
/**
 * Snooze Global JavaScript Variables
 * 
 * Centralized configuration for all Snooze components
 * Update these values to change checkout URLs site-wide
 */

// Primary checkout URL for Snooze Access (currency-aware)
// PRD: docs/projects/paid-media-and-dual-currency-v1/00-prd.md §4.8
// Reads localStorage['snooze_currency_preference'] set by currency-toggle.js.
// AUD offer ID is a placeholder until Stream A1 publishes the new AUD Snooze Access offer.
// Once published, replace <NEW_AUD_ACCESS_OFFER_ID> with the real Kajabi offer ID.
(function() {
  var USD_ACCESS_OFFER_URL = 'https://joinsnooze.com/offers/2150754998/checkout';
  var AUD_ACCESS_OFFER_URL = 'https://joinsnooze.com/offers/<NEW_AUD_ACCESS_OFFER_ID>/checkout';

  function readCurrencyPreference() {
    try {
      var pref = window.localStorage && window.localStorage.getItem('snooze_currency_preference');
      if (pref === 'AUD' || pref === 'USD') return pref;
    } catch (e) {
      // localStorage unavailable, fall through to default
    }
    // Geo fallback when no explicit preference is set
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && tz.indexOf('Australia') !== -1) return 'AUD';
    } catch (e) {
      // Intl unavailable, fall through
    }
    return 'USD';
  }

  window.getSnoozeCheckoutUrl = function() {
    return readCurrencyPreference() === 'AUD' ? AUD_ACCESS_OFFER_URL : USD_ACCESS_OFFER_URL;
  };

  // Backwards compatibility, callers reading window.SNOOZE_CHECKOUT_URL directly still work.
  Object.defineProperty(window, 'SNOOZE_CHECKOUT_URL', {
    configurable: true,
    get: function() { return window.getSnoozeCheckoutUrl(); }
  });
})();

// Library URL
window.SNOOZE_LIBRARY_URL = '/snooze-library';

// Village (Community) URL
window.SNOOZE_VILLAGE_URL = 'https://joinsnooze.com/products/communities/v2/snooze';

// The Snooze Method URL (not yet launched - commented out)
// window.SNOOZE_METHOD_URL = '/the-snooze-method';

// Login URL
window.SNOOZE_LOGIN_URL = '/login';

/**
 * Browser-Side User Detection (Optional)
 * 
 * Attempts to detect user status without Kajabi API
 * Falls back to signposting if detection fails
 */
window.SnoozeUserDetection = {
  /**
   * Attempt to detect user status
   * VERIFIED: DOM-based detection method (December 03, 2025)
   * Returns: 'new-visitor' | 'logged-in-non-member' | 'snooze-member' | 'unknown'
   */
  detectUserStatus: function() {
    try {
      // Method 1: Check for login link (logged out indicator)
      var loginLink = document.querySelector('a[href*="/login"]');
      
      // Method 2: Check for user avatar (logged in indicator)
      var userAvatar = document.querySelector('img[alt*="User Avatar"], img[alt*="avatar"]');
      
      // Method 3: Check for Library link (member indicator)
      var myLibraryLink = document.querySelector('a[href*="/library"]');
      
      // If logged in (no login link AND has avatar/library link)
      if (!loginLink && (userAvatar || myLibraryLink)) {
        // Check if member - Library access is primary indicator
        if (myLibraryLink || window.location.pathname.includes('/library')) {
          return 'snooze-member';
        } else {
          return 'logged-in-non-member';
        }
      }
      
      // Not logged in (has login link or no indicators)
      return 'new-visitor';
      
    } catch (error) {
      console.warn('Snooze: User detection failed, defaulting to new-visitor', error);
      return 'new-visitor'; // Graceful fallback
    }
  },
  
  /**
   * Get user status with fallback to signposting
   */
  getUserStatus: function() {
    var status = this.detectUserStatus();
    // If detection fails, use signposting (show all options)
    if (status === 'unknown') {
      return 'signposting';
    }
    return status;
  }
};
</script>
<!-- End Snooze Global JavaScript Variables -->

<!-- Snooze Landing Page JavaScript -->
<script>
/* ============================================
   SNOOZE LANDING PAGE - IMPROVED JAVASCRIPT
   Version 2.40 - Mobile-First H1 First + Native App Feel
   Date: 2025-11-06
   
   Recent changes:
   - Mobile-first hero: H1 and subheading appear FIRST on mobile (before image) for engagement
   - Native app feel: Card-based designs, touch-friendly interactions, app-like animations
   - Enhanced sticky CTA with localStorage persistence (remembers dismissal)
   - Mobile breakpoint updated to 768px for consistency
   - Improved scroll handling with 80% hero threshold
   - Added analytics tracking for sticky CTA interactions
   - Mobile-only display (hidden on desktop >1024px)
   - Body padding adjustment when sticky CTA is visible
   - Note: Microsoft Clarity already installed via GTM (no code needed here)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  
  // ============================================
  // 1. TESTIMONIAL CAROUSEL - SMOOTH INFINITE SCROLL
  // ============================================
  const carousel = document.querySelector('.carousel-inner');
  const carouselContainer = document.querySelector('.carousel-track');
  
  if (carousel && carouselContainer) {
    const cards = Array.from(carousel.querySelectorAll('.card'));
    const isDesktop = window.innerWidth > 768;
    
    // Desktop: Smooth infinite scroll with proper hover pause
    if (isDesktop && cards.length > 0) {
      // Clone cards for seamless infinite loop
      const clone = carousel.innerHTML;
      carousel.insertAdjacentHTML('beforeend', clone);
      
      let scrollPosition = 0;
      const scrollSpeed = 0.3; // Much slower, smoother scroll speed
      let animationFrameId;
      let isPaused = false;
      let lastScrollTime = performance.now();
      
      const autoScroll = (currentTime) => {
        if (!isPaused) {
          const deltaTime = currentTime - lastScrollTime;
          lastScrollTime = currentTime;
          
          // Smooth continuous scrolling
          scrollPosition += scrollSpeed * (deltaTime / 16); // Normalize to 60fps
          carousel.scrollLeft = scrollPosition;
          
          // Reset when we've scrolled through first set (seamless loop)
          const firstSetWidth = carousel.scrollWidth / 2;
          if (scrollPosition >= firstSetWidth) {
            scrollPosition = scrollPosition - firstSetWidth;
            carousel.scrollLeft = scrollPosition;
          }
        }
        
        animationFrameId = requestAnimationFrame(autoScroll);
      };
      
      // Start auto-scroll
      lastScrollTime = performance.now();
      autoScroll(lastScrollTime);
      
      // Smooth pause on hover (don't stop immediately, let it decelerate)
      let pauseRequested = false;
      let pauseTimeout;
      
      carousel.addEventListener('mouseenter', () => {
        pauseRequested = true;
        // Small delay before pausing to avoid jerky movement
        pauseTimeout = setTimeout(() => {
          if (pauseRequested) {
            isPaused = true;
          }
        }, 50);
      });
      
      carousel.addEventListener('mouseleave', () => {
        pauseRequested = false;
        if (pauseTimeout) clearTimeout(pauseTimeout);
        // Resume smoothly
        isPaused = false;
        lastScrollTime = performance.now();
      });
      
      // Pause on focus (accessibility)
      carousel.addEventListener('focusin', () => {
        isPaused = true;
      });
      
      carousel.addEventListener('focusout', () => {
        isPaused = false;
        lastScrollTime = performance.now();
      });
      
      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      });
    }
    
    // Mobile: Swipe navigation + auto-advance every 2 seconds
    if (!isDesktop && cards.length > 0) {
      const dotsContainer = document.querySelector('.carousel-dots');
      
      if (dotsContainer) {
        // Create dots
        cards.forEach((_, index) => {
          const dot = document.createElement('span');
          dot.setAttribute('role', 'button');
          dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
          dot.setAttribute('tabindex', '0');
          
          dotsContainer.appendChild(dot);
        });
        
        const dots = Array.from(dotsContainer.querySelectorAll('span'));
        let currentIndex = 0;
        let autoScrollInterval;
        
        // Touch/swipe variables
        let touchStartX = 0;
        let touchEndX = 0;
        let isSwipeActive = false;
        
        // Update active dot
        const updateDots = (index) => {
          dots.forEach((dot, i) => {
            const isActive = i === index;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
          });
        };
        
        // Scroll to specific card with improved calculation
        const scrollToCard = (index) => {
          if (index < 0 || index >= cards.length) return;
          
          currentIndex = index;
          const card = cards[index];
          
          if (card) {
            // Calculate scroll position accounting for gap
            const containerPadding = parseInt(getComputedStyle(carousel).paddingLeft) || 0;
            const gap = parseInt(getComputedStyle(carousel).gap) || 24;
            const cardWidth = card.offsetWidth;
            
            // Center the card in the viewport
            const containerWidth = carousel.offsetWidth;
            const scrollLeft = card.offsetLeft - containerPadding - (containerWidth - cardWidth) / 2;
            
            carousel.scrollTo({
              left: Math.max(0, scrollLeft),
              behavior: 'smooth'
            });
          }
          
          updateDots(index);
        };
        
        // Auto-advance function
        const autoAdvance = () => {
          if (!isSwipeActive) {
            currentIndex = (currentIndex + 1) % cards.length;
            scrollToCard(currentIndex);
          }
        };
        
        // Start auto-scroll (2 seconds as requested)
        const startAutoScroll = () => {
          stopAutoScroll();
          autoScrollInterval = setInterval(autoAdvance, 2000); // Changed to 2 seconds
        };
        
        const stopAutoScroll = () => {
          if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
          }
        };
        
        // Swipe detection
        carousel.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
          isSwipeActive = true;
          stopAutoScroll();
        }, { passive: true });
        
        carousel.addEventListener('touchmove', (e) => {
          // Allow native scrolling during swipe
          isSwipeActive = true;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
          
          // Restart auto-scroll after a delay
          setTimeout(() => {
            isSwipeActive = false;
            startAutoScroll();
          }, 3000); // Wait 3 seconds after swipe before auto-advancing
        }, { passive: true });
        
        const handleSwipe = () => {
          const swipeThreshold = 50; // Minimum distance for swipe
          const diff = touchStartX - touchEndX;
          
          if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
              // Swiped left - next card
              currentIndex = (currentIndex + 1) % cards.length;
            } else {
              // Swiped right - previous card
              currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            }
            scrollToCard(currentIndex);
          }
        };
        
        // Dot click handlers
        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            stopAutoScroll();
            scrollToCard(index);
            setTimeout(() => startAutoScroll(), 2000);
          });
          
          dot.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              stopAutoScroll();
              scrollToCard(index);
              setTimeout(() => startAutoScroll(), 2000);
            }
          });
        });
        
        // Update dots on manual scroll (with debounce)
        let scrollTimeout;
        carousel.addEventListener('scroll', () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            // Find which card is most visible
            const scrollLeft = carousel.scrollLeft;
            const containerWidth = carousel.offsetWidth;
            const centerPosition = scrollLeft + containerWidth / 2;
            
            let closestIndex = 0;
            let closestDistance = Infinity;
            
            cards.forEach((card, index) => {
              const cardCenter = card.offsetLeft + card.offsetWidth / 2;
              const distance = Math.abs(centerPosition - cardCenter);
              
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
              }
            });
            
            if (closestIndex !== currentIndex) {
              currentIndex = closestIndex;
              updateDots(closestIndex);
            }
          }, 100);
        }, { passive: true });
        
        // Initialize
        updateDots(0);
        scrollToCard(0);
        startAutoScroll();
        
        // Pause on focus (accessibility)
        carousel.addEventListener('focusin', () => {
          stopAutoScroll();
        });
        
        carousel.addEventListener('focusout', () => {
          setTimeout(() => startAutoScroll(), 2000);
        });
      }
    }
  }
  
  // ============================================
  // 2. FAQ ACCORDION - DYNAMIC HEIGHT CALCULATION
  // ============================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const answer = item.querySelector('.faq-answer');
    const question = item.querySelector('.faq-question');
    
    if (checkbox && answer && question) {
      // Calculate and set dynamic height
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          // Get actual content height
          const contentHeight = answer.scrollHeight;
          answer.style.maxHeight = contentHeight + 'px';
        } else {
          answer.style.maxHeight = '0px';
        }
      });
      
      // Make label keyboard accessible
      question.setAttribute('tabindex', '0');
      question.setAttribute('role', 'button');
      question.setAttribute('aria-expanded', 'false');
      
      question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
          question.setAttribute('aria-expanded', checkbox.checked ? 'true' : 'false');
        }
      });
      
      // Update aria on click
      question.addEventListener('click', () => {
        setTimeout(() => {
          question.setAttribute('aria-expanded', checkbox.checked ? 'true' : 'false');
        }, 0);
      });
    }
  });
  
  // ============================================
  // 3. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip empty or placeholder anchors
      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }
      
      // Only process if href is actually an anchor (starts with #)
      // Skip if it's a full URL (might have been changed by checkout normalization)
      if (!href.startsWith('#')) {
        return; // Let the link navigate normally
      }
      
      // Validate that href is a valid CSS selector before using querySelector
      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Get navbar height for offset
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Set focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      } catch (error) {
        // If querySelector fails (invalid selector), let the link navigate normally
        console.warn('Smooth scroll failed for href:', href, error);
      }
    });
  });
  
  // ============================================
  // 4. INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe sections for animation
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
  
  // ============================================
  // 5. PRICING CARD ENHANCEMENTS
  // ============================================
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    // Subtle scale on hover (already in CSS, this is for analytics)
    card.addEventListener('click', (e) => {
      // Only if clicking the card itself, not a button
      if (e.target === card || e.target.closest('.pricing-card') === card) {
        const button = card.querySelector('.cta-btn');
        if (button && !e.target.closest('.cta-btn')) {
          button.click();
        }
      }
    });
  });
  
  // ============================================
  // 6. LAZY LOADING IMAGES (Optional Enhancement)
  // ============================================
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  // ============================================
  // 7. ANALYTICS TRACKING (GTM Server-Side Compatible)
  // ============================================
  const trackEvent = (category, action, label, value) => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Push to dataLayer for GTM server-side tracking (PRIMARY METHOD)
    window.dataLayer.push({
      'event': action,
      'event_category': category,
      'event_label': label,
      'value': value,
      'page_path': window.location.pathname,
      'page_title': document.title
    });
    
    // Also send via gtag for direct GA4 (fallback)
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
      });
    }
    
    // Facebook Pixel (for browser-side tracking)
    if (typeof fbq !== 'undefined') {
      fbq('track', action, {
        content_name: label,
        value: value,
        currency: 'USD'
      });
    }
    
    // Console log for development
    console.log('Event tracked:', { category, action, label, value });
  };
  
  // Track CTA clicks - Comprehensive checkout link detection
  // Uses event delegation to catch all links, including dynamically added ones
  
  // Helper function to check if a link points to any Kajabi offer checkout
  const isCheckoutLink = (href) => {
    if (!href) return false;
    
    try {
      // Normalize href (handle relative paths)
      const normalizedHref = href.startsWith('http') ? href : new URL(href, window.location.origin).href;
      const url = new URL(normalizedHref);
      
      // Check if it matches Kajabi offer checkout pattern: /offers/[offer-id]/checkout or /offers/[offer-id]
      // Kajabi offer IDs are typically 8-10 alphanumeric characters
      const offerPattern = /\/offers\/[a-zA-Z0-9]{6,12}(\/checkout)?(\?|$)/;
      
      // Check if pathname matches offer pattern
      if (offerPattern.test(url.pathname)) {
        return true;
      }
      
      // Also check against global checkout URL if set (for primary offer)
      const checkoutUrl = (window && window.SNOOZE_CHECKOUT_URL);
      if (checkoutUrl) {
        const normalizedCheckout = checkoutUrl.startsWith('http') ? checkoutUrl : new URL(checkoutUrl, window.location.origin).href;
        if (normalizedHref === normalizedCheckout || normalizedHref.startsWith(normalizedCheckout.split('?')[0])) {
          return true;
        }
      }
      
      // Fallback: Check if URL contains "offers" and "checkout" (covers edge cases)
      if (normalizedHref.includes('/offers/') && normalizedHref.includes('checkout')) {
        return true;
      }
      
      return false;
    } catch (e) {
      // If URL parsing fails, do simple string check
      return href.includes('/offers/') && (href.includes('/checkout') || href.match(/\/offers\/[a-zA-Z0-9]{6,12}(\?|$)/));
    }
  };
  
  // Event delegation - catches all clicks on links, including dynamically added ones
  document.addEventListener('click', function(e) {
    // Find the closest link element (handles nested elements)
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.href || link.getAttribute('href') || '';
    const buttonText = link.textContent.trim() || link.innerText.trim() || 'Checkout Link';
    const isCheckout = isCheckoutLink(href);
    const isAnnual = buttonText.toLowerCase().includes('annual') || buttonText.toLowerCase().includes('yearly');
    const value = isAnnual ? 490 : 147; // Updated to match current pricing
    
    // Track generic CTA click for buttons/primary CTAs
    if (link.classList.contains('btn-primary') || 
        link.classList.contains('cta-btn') || 
        link.classList.contains('primary') ||
        link.closest('.btn-primary') ||
        link.closest('.cta-btn')) {
      trackEvent('engagement', 'cta_click', buttonText, value);
    }
    
    // If it's a checkout link, track specifically (regardless of class)
    if (isCheckout) {
      trackEvent('conversion', 'click_checkout_cta', buttonText + ' → Checkout', value);
      
      // Add UTM parameters to track source (only if not already present)
      if (href && !href.includes('utm_source')) {
        try {
          const url = new URL(href, window.location.origin);
          url.searchParams.set('utm_source', 'landing-page');
          url.searchParams.set('utm_medium', 'cta');
          url.searchParams.set('utm_campaign', window.location.pathname.replace('/', '') || 'unknown');
          
          // Update the href
          link.href = url.toString();
          link.setAttribute('href', url.toString());
        } catch (err) {
          console.warn('Snooze Tracking: Could not add UTM parameters to link:', err);
        }
      }
    }
  }, true); // Use capture phase to catch all clicks
  
  // Track FAQ interactions
  faqItems.forEach((item, index) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const question = item.querySelector('.faq-question');
    
    if (checkbox && question) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          const questionText = question.textContent.trim();
          trackEvent('engagement', 'faq_opened', questionText, index + 1);
        }
      });
    }
  });
  
  // ============================================
  // 8. FORM VALIDATION (If forms added later)
  // ============================================
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      const emailInput = form.querySelector('input[type="email"]');
      
      if (emailInput && !validateEmail(emailInput.value)) {
        e.preventDefault();
        
        // Show error message
        const errorMsg = form.querySelector('.error-message') || document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Please enter a valid email address.';
        errorMsg.style.color = 'var(--color-coral)';
        errorMsg.style.marginTop = '0.5rem';
        
        if (!form.querySelector('.error-message')) {
          emailInput.parentNode.appendChild(errorMsg);
        }
        
        emailInput.focus();
        emailInput.setAttribute('aria-invalid', 'true');
      }
    });
  });
  
  // ============================================
  // 9. PERFORMANCE MONITORING
  // ============================================
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log('Page load time:', pageLoadTime + 'ms');
        
        // Track to analytics if needed
        if (pageLoadTime > 3000) {
          console.warn('Page load time is slow:', pageLoadTime + 'ms');
        }
      }, 0);
    });
  }
  
  // ============================================
  // 10. ACCESSIBILITY ENHANCEMENTS
  // ============================================
  
  // Skip to main content link
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const mainContent = document.querySelector('main') || document.querySelector('.hero-container');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
      }
    });
  }
  
  // Keyboard trap prevention for modals (if added later)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any open modals
      const openModal = document.querySelector('.modal.open');
      if (openModal) {
        openModal.classList.remove('open');
      }
    }
  });
  
  // ============================================
  // 11. WINDOW RESIZE HANDLER (Debounced)
  // ============================================
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalculate carousel if needed
      const newIsDesktop = window.innerWidth > 768;
      
      // Could trigger carousel reinitialization if viewport changes significantly
      console.log('Window resized. New viewport:', window.innerWidth + 'x' + window.innerHeight);
    }, 250);
  });
  
  // ============================================
  // 12. AGE STAGES TOGGLE FUNCTIONALITY
  // ============================================
  const ageToggles = document.querySelectorAll('.age-toggle');
  const ageFeatures = document.querySelectorAll('.age-features');
  const featureBoxesGrid = document.querySelector('.feature-boxes-grid');
  
  if (ageToggles.length > 0 && ageFeatures.length > 0) {
    ageToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const targetAge = toggle.getAttribute('data-age');
        
        // Remove active class from all toggles
        ageToggles.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked toggle
        toggle.classList.add('active');
        
        // Find the target feature set
        const targetFeatures = document.querySelector(`.age-features[data-age="${targetAge}"]`);
        const currentActive = document.querySelector('.age-features.active');
        
        // If clicking the same age, do nothing
        if (currentActive === targetFeatures) {
          return;
        }
        
        // Prevent layout collapse: show new one first, then hide old one
        if (targetFeatures) {
          // Add active class immediately to prevent layout collapse
          targetFeatures.classList.add('active');
          
          // Hide the old one after a brief delay to allow smooth transition
          if (currentActive) {
            // Use requestAnimationFrame to ensure the new one is rendered first
            requestAnimationFrame(() => {
              currentActive.classList.remove('active');
            });
          }
        }
        
        // Track age stage selection
        if (typeof trackEvent !== 'undefined') {
          trackEvent('engagement', 'age_stage_selected', targetAge, 0);
        }
      });
      
      // Make keyboard accessible
      toggle.setAttribute('role', 'button');
      toggle.setAttribute('tabindex', '0');
      
      toggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle.click();
        }
      });
    });
  }
  
  // ============================================
  // 13. STICKY CTA BAR (Mobile-First)
  // ============================================
  const stickyCtaBar = document.getElementById('sticky-cta-bar');
  const stickyCtaClose = document.getElementById('sticky-cta-close');
  const heroSection = document.querySelector('.hero');
  
  if (stickyCtaBar && heroSection) {
    // Check if user has dismissed the sticky CTA
    const isDismissed = localStorage.getItem('stickyCtaDismissed') === 'true';
    
    // Hero section height threshold
    let heroHeight = heroSection.offsetHeight;
    let heroHeightThreshold = heroHeight * 0.8; // Show after 80% of hero
    
    // Update hero height on resize
    const updateHeroHeight = () => {
      heroHeight = heroSection.offsetHeight;
      heroHeightThreshold = heroHeight * 0.8;
    };
    
    // Show/hide sticky CTA based on scroll position
    const handleScroll = throttle(() => {
      if (isDismissed) return;
      
      const scrollY = window.scrollY || window.pageYOffset;
      const isMobile = window.innerWidth <= 768; // Match CSS breakpoint
      
      // Only show on mobile
      if (!isMobile) {
        stickyCtaBar.classList.remove('visible');
        document.body.classList.remove('sticky-cta-visible');
        return;
      }
      
      // Show after scrolling past hero threshold
      if (scrollY > heroHeightThreshold) {
        stickyCtaBar.classList.add('visible');
        stickyCtaBar.classList.remove('hidden');
        document.body.classList.add('sticky-cta-visible');
      } else {
        stickyCtaBar.classList.remove('visible');
        stickyCtaBar.classList.add('hidden');
        document.body.classList.remove('sticky-cta-visible');
      }
    }, 100);
    
    // Close button handler
    if (stickyCtaClose) {
      stickyCtaClose.addEventListener('click', () => {
        stickyCtaBar.classList.remove('visible');
        stickyCtaBar.classList.add('hidden');
        document.body.classList.remove('sticky-cta-visible');
        localStorage.setItem('stickyCtaDismissed', 'true');
        
        // Track dismissal
        if (typeof trackEvent !== 'undefined') {
          trackEvent('engagement', 'sticky_cta_dismissed', 'Sticky CTA Bar', 0);
        }
      });
    }
    
    // Initialize on page load
    if (!isDismissed) {
      handleScroll();
    }
    
    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Update on resize
    window.addEventListener('resize', () => {
      updateHeroHeight();
      handleScroll();
    }, { passive: true });
    
    // Track CTA clicks in sticky bar
    const stickyCtaBtn = stickyCtaBar.querySelector('.sticky-cta-btn');
    if (stickyCtaBtn) {
      stickyCtaBtn.addEventListener('click', () => {
        if (typeof trackEvent !== 'undefined') {
          trackEvent('engagement', 'sticky_cta_click', 'Sticky CTA Bar', 0);
        }
      });
    }
  }
  
  // ============================================
  // 14. MICROSOFT CLARITY HEATMAP TRACKING
  // ============================================
  // NOTE: Clarity is already installed via GTM (Google Tag Manager)
  // No additional code needed here - tracking is handled through GTM
  
  // ============================================
  // INITIALIZATION COMPLETE
  // ============================================
  console.log('✨ Snooze Landing Page initialized successfully!');
  console.log('📱 Viewport:', window.innerWidth + 'x' + window.innerHeight);
  console.log('🎨 Carousel:', carousel ? 'Active' : 'Not found');
  console.log('❓ FAQ items:', faqItems.length);

  // ============================================
  // 15. CHECKOUT LINK NORMALIZATION
  // ============================================
  // Ensure all CTAs and clickable cards route directly to checkout when available
  try {
    const globalCheckoutUrl = (window && window.SNOOZE_CHECKOUT_URL) || document.body?.dataset?.checkoutUrl || null;
    const fallbackUrl = '#pricing'; // Fallback if checkout URL not yet set
    const targets = document.querySelectorAll('[data-checkout]');
    targets.forEach((el) => {
      const href = globalCheckoutUrl || fallbackUrl;
      if (el.tagName.toLowerCase() === 'a') {
        el.setAttribute('href', href);
      }
      // Make entire card clickable if it's not an anchor
      if (el.classList.contains('feature-box') && el.tagName.toLowerCase() !== 'a') {
        el.addEventListener('click', () => {
          window.location.href = href;
        });
        el.style.cursor = 'pointer';
      }
    });
  } catch (e) {
    console.warn('Checkout URL normalization failed:', e);
  }
  
  // Note: Hero checklist positioning is now handled entirely by CSS flexbox ordering
  // No JavaScript needed - simpler and more reliable!
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

// ============================================
// HERO BADGE ICONS - Fix for Kajabi stripping icon tags
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const reviewStars = document.querySelector('.review-stars');
  const guaranteeIcon = document.querySelector('.guarantee-icon');
  
  // Inject review stars if missing
  if (reviewStars && !reviewStars.querySelector('i')) {
    reviewStars.innerHTML = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>';
  }
  
  // Inject guarantee shield icon if missing
  if (guaranteeIcon && !guaranteeIcon.querySelector('i')) {
    guaranteeIcon.innerHTML = '<i class="fa-solid fa-shield-check"></i>';
  }
  
  // Fix review badge if Kajabi stripped the <a> tag
  const badgesContainer = document.querySelector('.hero-badges-container');
  const reviewBadge = document.querySelector('.hero-reviews-badge');
  
  // If reviewBadge exists but has wrong structure, fix it
  if (reviewBadge && !reviewBadge.querySelector('.review-stars')) {
    // The link exists but has wrong content - find the actual content
    const actualStars = document.querySelector('.review-stars');
    const actualText = document.querySelector('.review-text');
    
    if (actualStars && actualText) {
      // Remove everything inside the link
      reviewBadge.innerHTML = '';
      
      // Add the actual content
      reviewBadge.appendChild(actualStars);
      reviewBadge.appendChild(actualText);
    }
  } else if (badgesContainer && !reviewBadge && reviewStars) {
    // No link at all - create one
    const reviewTextDiv = reviewStars.nextElementSibling;
    
    if (reviewTextDiv?.classList.contains('review-text')) {
      // Wrap both in an <a> tag
      const linkWrapper = document.createElement('a');
      linkWrapper.href = '#reviews';
      linkWrapper.className = 'hero-reviews-badge';
      
      // Insert the link wrapper before the stars
      badgesContainer.insertBefore(linkWrapper, reviewStars);
      
      // Move the stars and text into the link
      linkWrapper.appendChild(reviewStars);
      linkWrapper.appendChild(reviewTextDiv);
    }
  }
});

// ============================================
// COURSE MODULE ACCORDION - Product Pages
// ============================================
// Make function globally available for inline onclick handlers
// Define immediately so it's available when HTML is parsed
window.toggleCourseModule = function(header) {
  if (!header) return;
  
  const module = header.closest('.course-module-item');
  if (!module) return;
  
  const content = module.querySelector('.course-module-content');
  const toggle = header.querySelector('.course-module-toggle');
  
  if (!content) return;
  
  // Toggle expanded class
  const isExpanded = content.classList.contains('expanded');
  
  if (isExpanded) {
    content.classList.remove('expanded');
    module.classList.remove('expanded');
    if (toggle) toggle.textContent = '+';
  } else {
    content.classList.add('expanded');
    module.classList.add('expanded');
    if (toggle) toggle.textContent = '−';
  }
};

// Initialize accordion when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Expand first module by default
  const firstModule = document.querySelector('.course-module-header');
  if (firstModule) {
    setTimeout(function() {
      window.toggleCourseModule(firstModule);
    }, 300);
  }
  
});

// ============================================
// NAVIGATION DROPDOWN FUNCTIONALITY
// ============================================
(function() {
  'use strict';
  
  // Function to position dropdown menu
  function positionDropdown(dropdown, menu) {
    if (!dropdown || !menu) return;
    
    var toggle = dropdown.querySelector('.sn-dropdown-toggle, .nav-dropdown-toggle');
    if (!toggle) return;
    
    var toggleRect = toggle.getBoundingClientRect();
    var menuRect = menu.getBoundingClientRect();
    
    // Calculate position: center horizontally, below toggle
    var left = toggleRect.left + (toggleRect.width / 2) - (menuRect.width / 2);
    var top = toggleRect.bottom + 8;
    
    // Ensure menu doesn't go off screen
    if (left < 8) left = 8;
    if (left + menuRect.width > window.innerWidth - 8) {
      left = window.innerWidth - menuRect.width - 8;
    }
    
    menu.style.left = left + 'px';
    menu.style.top = top + 'px';
  }
  
  // Initialize dropdowns when DOM is ready
  function initDropdowns() {
    // Desktop dropdowns (hover + click for accessibility)
    var desktopDropdowns = document.querySelectorAll('.sn-dropdown, .nav-dropdown');
    
    desktopDropdowns.forEach(function(dropdown) {
      var toggle = dropdown.querySelector('.sn-dropdown-toggle, .nav-dropdown-toggle');
      var menu = dropdown.querySelector('.sn-dropdown-menu, .nav-dropdown-menu');
      
      if (toggle && menu) {
        var closeTimer = null;
        var isHovering = false;
        
        // Function to show dropdown
        var showDropdown = function() {
          if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
          }
          positionDropdown(dropdown, menu);
          dropdown.classList.add('hover-active');
        };
        
        // Function to hide dropdown with delay
        var hideDropdown = function() {
          if (closeTimer) {
            clearTimeout(closeTimer);
          }
          closeTimer = setTimeout(function() {
            if (!dropdown.classList.contains('active') && !isHovering) {
              dropdown.classList.remove('hover-active');
              menu.style.left = '';
              menu.style.top = '';
            }
          }, 150); // Small delay to allow mouse movement
        };
        
        // Position dropdown on hover
        dropdown.addEventListener('mouseenter', function() {
          isHovering = true;
          showDropdown();
        });
        
        dropdown.addEventListener('mouseleave', function(e) {
          isHovering = false;
          // Check if mouse is moving to the menu
          var relatedTarget = e.relatedTarget;
          if (relatedTarget && (menu.contains(relatedTarget) || menu === relatedTarget)) {
            return; // Don't hide if moving to menu
          }
          hideDropdown();
        });
        
        // Keep dropdown open when hovering over menu
        menu.addEventListener('mouseenter', function() {
          isHovering = true;
          showDropdown();
        });
        
        menu.addEventListener('mouseleave', function() {
          isHovering = false;
          hideDropdown();
        });
        
        // Click handler for accessibility and mobile-like behavior
        toggle.addEventListener('click', function(e) {
          // Only prevent default on mobile or if dropdown is already active
          if (window.innerWidth < 992 || dropdown.classList.contains('active')) {
            e.preventDefault();
          }
          
          // Toggle active state
          var isActive = dropdown.classList.contains('active');
          
          // Close all other dropdowns
          desktopDropdowns.forEach(function(other) {
            if (other !== dropdown) {
              other.classList.remove('active');
              other.classList.remove('hover-active');
              var otherMenu = other.querySelector('.sn-dropdown-menu, .nav-dropdown-menu');
              if (otherMenu) {
                otherMenu.style.left = '';
                otherMenu.style.top = '';
              }
            }
          });
          
          // Toggle current dropdown
          if (isActive) {
            dropdown.classList.remove('active');
            dropdown.classList.remove('hover-active');
            menu.style.left = '';
            menu.style.top = '';
          } else {
            dropdown.classList.add('active');
            dropdown.classList.add('hover-active');
            positionDropdown(dropdown, menu);
          }
        });
        
        // Reposition on scroll/resize
        window.addEventListener('scroll', function() {
          if (dropdown.classList.contains('active') || dropdown.classList.contains('hover-active')) {
            positionDropdown(dropdown, menu);
          }
        }, true);
        
        window.addEventListener('resize', function() {
          if (dropdown.classList.contains('active') || dropdown.classList.contains('hover-active')) {
            positionDropdown(dropdown, menu);
          }
        });
      }
    });
    
    // Mobile dropdowns (click only)
    var mobileDropdowns = document.querySelectorAll('.sn-mobile-dropdown');
    
    mobileDropdowns.forEach(function(dropdown) {
      var toggle = dropdown.querySelector('.sn-mobile-dropdown-toggle');
      
      if (toggle) {
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          
          var isActive = dropdown.classList.contains('active');
          
          // Close all other mobile dropdowns
          mobileDropdowns.forEach(function(other) {
            if (other !== dropdown) {
              other.classList.remove('active');
            }
          });
          
          // Toggle current dropdown
          if (isActive) {
            dropdown.classList.remove('active');
          } else {
            dropdown.classList.add('active');
          }
        });
      }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      var clickedInside = false;
      
      desktopDropdowns.forEach(function(dropdown) {
        if (dropdown.contains(e.target)) {
          clickedInside = true;
        }
      });
      
      mobileDropdowns.forEach(function(dropdown) {
        if (dropdown.contains(e.target)) {
          clickedInside = true;
        }
      });
      
      if (!clickedInside) {
        desktopDropdowns.forEach(function(dropdown) {
          dropdown.classList.remove('active');
          dropdown.classList.remove('hover-active');
          var menu = dropdown.querySelector('.sn-dropdown-menu, .nav-dropdown-menu');
          if (menu) {
            menu.style.left = '';
            menu.style.top = '';
          }
        });
        mobileDropdowns.forEach(function(dropdown) {
          dropdown.classList.remove('active');
        });
      }
    });
    
    // Close dropdowns on window resize (mobile to desktop transition)
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth >= 992) {
          desktopDropdowns.forEach(function(dropdown) {
            dropdown.classList.remove('active');
            dropdown.classList.remove('hover-active');
            var menu = dropdown.querySelector('.sn-dropdown-menu, .nav-dropdown-menu');
            if (menu) {
              menu.style.left = '';
              menu.style.top = '';
            }
          });
        }
      }, 250);
    });
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }
})();

// ============================================
// LAUNCH OFFER BANNER FUNCTIONALITY
// ============================================
(function() {
  'use strict';
  
  // Launch Banner Close Function - Make globally available
  window.closeLaunchBanner = function() {
    var banner = document.getElementById('sn-launch-banner');
    if (banner) {
      banner.classList.add('hidden');
      document.body.classList.remove('sn-banner-visible');
      
      // Reset nav position when banner is closed
      var customNav = document.getElementById('snooze-nav-clean') || document.querySelector('nav.snooze-nav-clean');
      if (customNav) {
        customNav.style.top = '0px';
      }
      
      // Save preference to localStorage (expires in 24 hours)
      var expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('sn-launch-banner-closed', expiry.toString());
    }
  };

  // Initialize banner visibility and positioning on page load
  function initLaunchBanner() {
    var banner = document.getElementById('sn-launch-banner');
    if (!banner) return;
    
    // Banner is always at top: 0, fixed position
    banner.style.top = '0px';
    
    // Check if banner should be visible based on localStorage
    var closedUntil = localStorage.getItem('sn-launch-banner-closed');
    var isHidden = false;
    
    if (closedUntil) {
      var now = new Date().getTime();
      if (now < parseInt(closedUntil)) {
        banner.classList.add('hidden');
        document.body.classList.remove('sn-banner-visible');
        isHidden = true;
      } else {
        // Expired, remove from localStorage
        localStorage.removeItem('sn-launch-banner-closed');
      }
    }
    
    // If banner is visible, add class to body for CSS adjustments
    if (!isHidden && !banner.classList.contains('hidden')) {
      document.body.classList.add('sn-banner-visible');
      
      // Calculate banner height for nav positioning
      var bannerHeight = banner.offsetHeight || 50;
      
      // Update nav sticky position if nav exists
      var customNav = document.getElementById('snooze-nav-clean') || document.querySelector('nav.snooze-nav-clean');
      if (customNav) {
        customNav.style.top = bannerHeight + 'px';
      }
    } else {
      // Banner hidden - reset nav position
      var customNav = document.getElementById('snooze-nav-clean') || document.querySelector('nav.snooze-nav-clean');
      if (customNav) {
        customNav.style.top = '0px';
      }
    }
  }
  
  // Recalculate on window resize
  window.addEventListener('resize', function() {
    var banner = document.getElementById('sn-launch-banner');
    if (banner && !banner.classList.contains('hidden')) {
      var bannerHeight = banner.offsetHeight || 50;
      var customNav = document.getElementById('snooze-nav-clean') || document.querySelector('nav.snooze-nav-clean');
      if (customNav) {
        customNav.style.top = bannerHeight + 'px';
      }
    }
  });
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLaunchBanner);
  } else {
    initLaunchBanner();
  }
})();

</script>
<!-- End Snooze Landing Page JavaScript -->

<!-- ============================================
     GLOBAL UTILITY FUNCTIONS
     ============================================ -->

<script>
// ============================================
// TOGGLE SNOOZE MENU (Mobile Navigation)
// ============================================
window.toggleSnoozeMenu = function() {
  var nav = document.getElementById('snooze-nav-clean');
  var menu = document.getElementById('sn-mobile-menu');
  
  if (!nav || !menu) return;

  var isOpen = nav.classList.toggle('is-open');
  
  if (isOpen) {
    menu.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
  } else {
    menu.style.display = 'none';
    document.body.style.overflow = 'auto'; 
    
    // Close all dropdowns when closing mobile menu
    var mobileDropdowns = menu.querySelectorAll('.sn-mobile-dropdown');
    mobileDropdowns.forEach(function(dropdown) {
      dropdown.classList.remove('active');
    });
  }
};

// ============================================
// CLOSE SNOOZE MENU (Helper function)
// ============================================
window.closeSnoozeMenu = function() {
  var nav = document.getElementById('snooze-nav-clean');
  var menu = document.getElementById('sn-mobile-menu');
  
  if (!nav || !menu) return;
  
  // Only close if menu is actually open
  if (nav.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    menu.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Close all dropdowns
    var mobileDropdowns = menu.querySelectorAll('.sn-mobile-dropdown');
    mobileDropdowns.forEach(function(dropdown) {
      dropdown.classList.remove('active');
    });
  }
};

// ============================================
// INITIALIZE EVENT LISTENERS (Replace onclick handlers)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Replace onclick handlers with event listeners for course modules
  var courseModuleHeaders = document.querySelectorAll('.course-module-header');
  courseModuleHeaders.forEach(function(header) {
    // Remove onclick attribute if present
    if (header.hasAttribute('onclick')) {
      header.removeAttribute('onclick');
    }
    // Add event listener
    header.addEventListener('click', function() {
      window.toggleCourseModule(this);
    });
  });
  
  // Replace onclick handlers for mobile menu toggle
  var mobileToggleButtons = document.querySelectorAll('.sn-mobile-toggle');
  mobileToggleButtons.forEach(function(button) {
    // Remove onclick attribute if present
    if (button.hasAttribute('onclick')) {
      button.removeAttribute('onclick');
    }
    // Add event listener
    button.addEventListener('click', function(e) {
      e.preventDefault();
      window.toggleSnoozeMenu();
    });
  });
  
  // FIX: Close mobile menu when a link is clicked inside the menu
  // Exclude dropdown toggles (they should open/close dropdowns, not close the menu)
  var mobileLinks = document.querySelectorAll('.sn-mobile-link:not(.sn-mobile-dropdown-toggle), .sn-mobile-btn');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var nav = document.getElementById('snooze-nav-clean');
      // Only close if the menu is actually open
      if (nav && nav.classList.contains('is-open')) {
        var href = link.getAttribute('href');
        // For anchor links (#), add small delay to allow smooth scrolling
        if (href && href.startsWith('#')) {
          setTimeout(function() {
            window.closeSnoozeMenu();
          }, 150); // 150ms delay for smooth scroll
        } else {
          // For external links, close immediately
          window.closeSnoozeMenu();
        }
      }
    });
  });
  
});
</script>

