<link rel="preload" as="image" href="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2161797115/settings_images/c0d2c2a-05e0-a12f-120-75ab72aff35b_TSC_-_Logo_-_Dk_Navy_-_Web_300.webp" fetchpriority="high">

<script>
  var containerId = 'GTM-KNRTH6P';

  var fastPages = [
    '/links',
    '/snooze',
    '/bio',
    '/free-guide'
  ];

  var isFastPage = fastPages.some(function(page) {
    return window.location.href.indexOf(page) > -1;
  });

  if (isFastPage) {
    console.log('Snooze: Fast Page Detected - Delaying Tracking');

    setTimeout(function() {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer',containerId);
    }, 1500);

  } else {
    console.log('Snooze: Commerce Page - Loading Full Tracking');
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://load.ss.joinsnooze.com/2ostmfzxzts.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','9r2=GhBHPy4rQD89Ji4wTDZLAk5GVElcAgNJABgfHQoFAhoQHR8KHQNDFxwZVBkP');
  }
</script>

<script>
(function() {
  var USD_ACCESS_OFFER_URL = 'https://joinsnooze.com/offers/z63s9VaR/checkout';
  var AUD_ACCESS_OFFER_URL = 'https://joinsnooze.com/offers/bEsVXFXG/checkout';

  function readCurrencyPreference() {
    try {
      var pref = window.localStorage && window.localStorage.getItem('snooze_currency_preference');
      if (pref === 'AUD' || pref === 'USD') return pref;
    } catch (e) {
    }
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && tz.indexOf('Australia') !== -1) return 'AUD';
    } catch (e) {
    }
    return 'USD';
  }

  window.getSnoozeCheckoutUrl = function() {
    return readCurrencyPreference() === 'AUD' ? AUD_ACCESS_OFFER_URL : USD_ACCESS_OFFER_URL;
  };

  Object.defineProperty(window, 'SNOOZE_CHECKOUT_URL', {
    configurable: true,
    get: function() { return window.getSnoozeCheckoutUrl(); }
  });
})();

window.SNOOZE_LIBRARY_URL = '/snooze-library';

window.SNOOZE_VILLAGE_URL = 'https://joinsnooze.com/products/communities/v2/snooze';

window.SNOOZE_LOGIN_URL = '/login';

window.SnoozeUserDetection = {
  detectUserStatus: function() {
    try {
      var loginLink = document.querySelector('a[href*="/login"]');

      var userAvatar = document.querySelector('img[alt*="User Avatar"], img[alt*="avatar"]');

      var myLibraryLink = document.querySelector('a[href*="/library"]');

      if (!loginLink && (userAvatar || myLibraryLink)) {
        if (myLibraryLink || window.location.pathname.includes('/library')) {
          return 'snooze-member';
        } else {
          return 'logged-in-non-member';
        }
      }

      return 'new-visitor';

    } catch (error) {
      console.warn('Snooze: User detection failed, defaulting to new-visitor', error);
      return 'new-visitor';
    }
  },

  getUserStatus: function() {
    var status = this.detectUserStatus();
    if (status === 'unknown') {
      return 'signposting';
    }
    return status;
  }
};
</script>

<script>
document.addEventListener("DOMContentLoaded", () => {

  const carousel = document.querySelector('.carousel-inner');
  const carouselContainer = document.querySelector('.carousel-track');

  if (carousel && carouselContainer) {
    const cards = Array.from(carousel.querySelectorAll('.card'));
    const isDesktop = window.innerWidth > 768;

    if (isDesktop && cards.length > 0) {
      const clone = carousel.innerHTML;
      carousel.insertAdjacentHTML('beforeend', clone);

      let scrollPosition = 0;
      const scrollSpeed = 0.3;
      let animationFrameId;
      let isPaused = false;
      let lastScrollTime = performance.now();

      const autoScroll = (currentTime) => {
        if (!isPaused) {
          const deltaTime = currentTime - lastScrollTime;
          lastScrollTime = currentTime;

          scrollPosition += scrollSpeed * (deltaTime / 16);
          carousel.scrollLeft = scrollPosition;

          const firstSetWidth = carousel.scrollWidth / 2;
          if (scrollPosition >= firstSetWidth) {
            scrollPosition = scrollPosition - firstSetWidth;
            carousel.scrollLeft = scrollPosition;
          }
        }

        animationFrameId = requestAnimationFrame(autoScroll);
      };

      lastScrollTime = performance.now();
      autoScroll(lastScrollTime);

      let pauseRequested = false;
      let pauseTimeout;

      carousel.addEventListener('mouseenter', () => {
        pauseRequested = true;
        pauseTimeout = setTimeout(() => {
          if (pauseRequested) {
            isPaused = true;
          }
        }, 50);
      });

      carousel.addEventListener('mouseleave', () => {
        pauseRequested = false;
        if (pauseTimeout) clearTimeout(pauseTimeout);
        isPaused = false;
        lastScrollTime = performance.now();
      });

      carousel.addEventListener('focusin', () => {
        isPaused = true;
      });

      carousel.addEventListener('focusout', () => {
        isPaused = false;
        lastScrollTime = performance.now();
      });

      window.addEventListener('beforeunload', () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      });
    }

    if (!isDesktop && cards.length > 0) {
      const dotsContainer = document.querySelector('.carousel-dots');

      if (dotsContainer) {
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

        let touchStartX = 0;
        let touchEndX = 0;
        let isSwipeActive = false;

        const updateDots = (index) => {
          dots.forEach((dot, i) => {
            const isActive = i === index;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
          });
        };

        const scrollToCard = (index) => {
          if (index < 0 || index >= cards.length) return;

          currentIndex = index;
          const card = cards[index];

          if (card) {
            const containerPadding = parseInt(getComputedStyle(carousel).paddingLeft) || 0;
            const gap = parseInt(getComputedStyle(carousel).gap) || 24;
            const cardWidth = card.offsetWidth;

            const containerWidth = carousel.offsetWidth;
            const scrollLeft = card.offsetLeft - containerPadding - (containerWidth - cardWidth) / 2;

            carousel.scrollTo({
              left: Math.max(0, scrollLeft),
              behavior: 'smooth'
            });
          }

          updateDots(index);
        };

        const autoAdvance = () => {
          if (!isSwipeActive) {
            currentIndex = (currentIndex + 1) % cards.length;
            scrollToCard(currentIndex);
          }
        };

        const startAutoScroll = () => {
          stopAutoScroll();
          autoScrollInterval = setInterval(autoAdvance, 2000);
        };

        const stopAutoScroll = () => {
          if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
          }
        };

        carousel.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
          isSwipeActive = true;
          stopAutoScroll();
        }, { passive: true });

        carousel.addEventListener('touchmove', (e) => {
          isSwipeActive = true;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();

          setTimeout(() => {
            isSwipeActive = false;
            startAutoScroll();
          }, 3000);
        }, { passive: true });

        const handleSwipe = () => {
          const swipeThreshold = 50;
          const diff = touchStartX - touchEndX;

          if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
              currentIndex = (currentIndex + 1) % cards.length;
            } else {
              currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            }
            scrollToCard(currentIndex);
          }
        };

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

        let scrollTimeout;
        carousel.addEventListener('scroll', () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
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

        updateDots(0);
        scrollToCard(0);
        startAutoScroll();

        carousel.addEventListener('focusin', () => {
          stopAutoScroll();
        });

        carousel.addEventListener('focusout', () => {
          setTimeout(() => startAutoScroll(), 2000);
        });
      }
    }
  }

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const answer = item.querySelector('.faq-answer');
    const question = item.querySelector('.faq-question');

    if (checkbox && answer && question) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          const contentHeight = answer.scrollHeight;
          answer.style.maxHeight = contentHeight + 'px';
        } else {
          answer.style.maxHeight = '0px';
        }
      });

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

      question.addEventListener('click', () => {
        setTimeout(() => {
          question.setAttribute('aria-expanded', checkbox.checked ? 'true' : 'false');
        }, 0);
      });
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }

      if (!href.startsWith('#')) {
        return;
      }

      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;

          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      } catch (error) {
        console.warn('Smooth scroll failed for href:', href, error);
      }
    });
  });

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

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  const pricingCards = document.querySelectorAll('.pricing-card');

  pricingCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target === card || e.target.closest('.pricing-card') === card) {
        const button = card.querySelector('.cta-btn');
        if (button && !e.target.closest('.cta-btn')) {
          button.click();
        }
      }
    });
  });

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

  const trackEvent = (category, action, label, value) => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      'event': action,
      'event_category': category,
      'event_label': label,
      'value': value,
      'page_path': window.location.pathname,
      'page_title': document.title
    });

    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
      });
    }

    if (typeof fbq !== 'undefined') {
      fbq('track', action, {
        content_name: label,
        value: value,
        currency: 'USD'
      });
    }

    console.log('Event tracked:', { category, action, label, value });
  };

  const isCheckoutLink = (href) => {
    if (!href) return false;

    try {
      const normalizedHref = href.startsWith('http') ? href : new URL(href, window.location.origin).href;
      const url = new URL(normalizedHref);

      const offerPattern = /\/offers\/[a-zA-Z0-9]{6,12}(\/checkout)?(\?|$)/;

      if (offerPattern.test(url.pathname)) {
        return true;
      }

      const checkoutUrl = (window && window.SNOOZE_CHECKOUT_URL);
      if (checkoutUrl) {
        const normalizedCheckout = checkoutUrl.startsWith('http') ? checkoutUrl : new URL(checkoutUrl, window.location.origin).href;
        if (normalizedHref === normalizedCheckout || normalizedHref.startsWith(normalizedCheckout.split('?')[0])) {
          return true;
        }
      }

      if (normalizedHref.includes('/offers/') && normalizedHref.includes('checkout')) {
        return true;
      }

      return false;
    } catch (e) {
      return href.includes('/offers/') && (href.includes('/checkout') || href.match(/\/offers\/[a-zA-Z0-9]{6,12}(\?|$)/));
    }
  };

  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.href || link.getAttribute('href') || '';
    const buttonText = link.textContent.trim() || link.innerText.trim() || 'Checkout Link';
    const isCheckout = isCheckoutLink(href);
    const isAnnual = buttonText.toLowerCase().includes('annual') || buttonText.toLowerCase().includes('yearly');
    const value = isAnnual ? 490 : 147;

    if (link.classList.contains('btn-primary') ||
        link.classList.contains('cta-btn') ||
        link.classList.contains('primary') ||
        link.closest('.btn-primary') ||
        link.closest('.cta-btn')) {
      trackEvent('engagement', 'cta_click', buttonText, value);
    }

    if (isCheckout) {
      trackEvent('conversion', 'click_checkout_cta', buttonText + ' → Checkout', value);

      if (href && !href.includes('utm_source')) {
        try {
          const url = new URL(href, window.location.origin);
          url.searchParams.set('utm_source', 'landing-page');
          url.searchParams.set('utm_medium', 'cta');
          url.searchParams.set('utm_campaign', window.location.pathname.replace('/', '') || 'unknown');

          link.href = url.toString();
          link.setAttribute('href', url.toString());
        } catch (err) {
          console.warn('Snooze Tracking: Could not add UTM parameters to link:', err);
        }
      }
    }
  }, true);

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      const emailInput = form.querySelector('input[type="email"]');

      if (emailInput && !validateEmail(emailInput.value)) {
        e.preventDefault();

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

  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        console.log('Page load time:', pageLoadTime + 'ms');

        if (pageLoadTime > 3000) {
          console.warn('Page load time is slow:', pageLoadTime + 'ms');
        }
      }, 0);
    });
  }

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal.open');
      if (openModal) {
        openModal.classList.remove('open');
      }
    }
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newIsDesktop = window.innerWidth > 768;

      console.log('Window resized. New viewport:', window.innerWidth + 'x' + window.innerHeight);
    }, 250);
  });

  const ageToggles = document.querySelectorAll('.age-toggle');
  const ageFeatures = document.querySelectorAll('.age-features');
  const featureBoxesGrid = document.querySelector('.feature-boxes-grid');

  if (ageToggles.length > 0 && ageFeatures.length > 0) {
    ageToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const targetAge = toggle.getAttribute('data-age');

        ageToggles.forEach(t => t.classList.remove('active'));

        toggle.classList.add('active');

        const targetFeatures = document.querySelector(`.age-features[data-age="${targetAge}"]`);
        const currentActive = document.querySelector('.age-features.active');

        if (currentActive === targetFeatures) {
          return;
        }

        if (targetFeatures) {
          targetFeatures.classList.add('active');

          if (currentActive) {
            requestAnimationFrame(() => {
              currentActive.classList.remove('active');
            });
          }
        }

        if (typeof trackEvent !== 'undefined') {
          trackEvent('engagement', 'age_stage_selected', targetAge, 0);
        }
      });

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

  const stickyCtaBar = document.getElementById('sticky-cta-bar');
  const stickyCtaClose = document.getElementById('sticky-cta-close');
  const heroSection = document.querySelector('.hero');

  if (stickyCtaBar && heroSection) {
    const isDismissed = localStorage.getItem('stickyCtaDismissed') === 'true';

    let heroHeight = heroSection.offsetHeight;
    let heroHeightThreshold = heroHeight * 0.8;

    const updateHeroHeight = () => {
      heroHeight = heroSection.offsetHeight;
      heroHeightThreshold = heroHeight * 0.8;
    };

    const handleScroll = throttle(() => {
      if (isDismissed) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const isMobile = window.innerWidth <= 768;

      if (!isMobile) {
        stickyCtaBar.classList.remove('visible');
        document.body.classList.remove('sticky-cta-visible');
        return;
      }

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

    if (stickyCtaClose) {
      stickyCtaClose.addEventListener('click', () => {
        stickyCtaBar.classList.remove('visible');
        stickyCtaBar.classList.add('hidden');
        document.body.classList.remove('sticky-cta-visible');
        localStorage.setItem('stickyCtaDismissed', 'true');

        if (typeof trackEvent !== 'undefined') {
          trackEvent('engagement', 'sticky_cta_dismissed', 'Sticky CTA Bar', 0);
        }
      });
    }

    if (!isDismissed) {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    window.addEventListener('resize', () => {
      updateHeroHeight();
      handleScroll();
    }, { passive: true });

    const stickyCtaBtn = stickyCtaBar.querySelector('.sticky-cta-btn');
    if (stickyCtaBtn) {
      stickyCtaBtn.addEventListener('click', () => {
        if (typeof trackEvent !== 'undefined') {
          trackEvent('engagement', 'sticky_cta_click', 'Sticky CTA Bar', 0);
        }
      });
    }
  }

  console.log('✨ Snooze Landing Page initialized successfully!');
  console.log('📱 Viewport:', window.innerWidth + 'x' + window.innerHeight);
  console.log('🎨 Carousel:', carousel ? 'Active' : 'Not found');
  console.log('❓ FAQ items:', faqItems.length);

  try {
    const globalCheckoutUrl = (window && window.SNOOZE_CHECKOUT_URL) || document.body?.dataset?.checkoutUrl || null;
    const fallbackUrl = '#pricing';
    const targets = document.querySelectorAll('[data-checkout]');
    targets.forEach((el) => {
      const href = globalCheckoutUrl || fallbackUrl;
      if (el.tagName.toLowerCase() === 'a') {
        el.setAttribute('href', href);
      }
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

});

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

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

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

document.addEventListener("DOMContentLoaded", () => {
  const reviewStars = document.querySelector('.review-stars');
  const guaranteeIcon = document.querySelector('.guarantee-icon');

  if (reviewStars && !reviewStars.querySelector('i')) {
    reviewStars.innerHTML = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>';
  }

  if (guaranteeIcon && !guaranteeIcon.querySelector('i')) {
    guaranteeIcon.innerHTML = '<i class="fa-solid fa-shield-check"></i>';
  }

  const badgesContainer = document.querySelector('.hero-badges-container');
  const reviewBadge = document.querySelector('.hero-reviews-badge');

  if (reviewBadge && !reviewBadge.querySelector('.review-stars')) {
    const actualStars = document.querySelector('.review-stars');
    const actualText = document.querySelector('.review-text');

    if (actualStars && actualText) {
      reviewBadge.innerHTML = '';

      reviewBadge.appendChild(actualStars);
      reviewBadge.appendChild(actualText);
    }
  } else if (badgesContainer && !reviewBadge && reviewStars) {
    const reviewTextDiv = reviewStars.nextElementSibling;

    if (reviewTextDiv?.classList.contains('review-text')) {
      const linkWrapper = document.createElement('a');
      linkWrapper.href = '#reviews';
      linkWrapper.className = 'hero-reviews-badge';

      badgesContainer.insertBefore(linkWrapper, reviewStars);

      linkWrapper.appendChild(reviewStars);
      linkWrapper.appendChild(reviewTextDiv);
    }
  }
});

window.toggleCourseModule = function(header) {
  if (!header) return;

  const module = header.closest('.course-module-item');
  if (!module) return;

  const content = module.querySelector('.course-module-content');
  const toggle = header.querySelector('.course-module-toggle');

  if (!content) return;

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

document.addEventListener('DOMContentLoaded', function() {
  const firstModule = document.querySelector('.course-module-header');
  if (firstModule) {
    setTimeout(function() {
      window.toggleCourseModule(firstModule);
    }, 300);
  }

});

(function() {
  'use strict';

  function positionDropdown(dropdown, menu) {
    if (!dropdown || !menu) return;

    var toggle = dropdown.querySelector('.sn-dropdown-toggle, .nav-dropdown-toggle');
    if (!toggle) return;

    var toggleRect = toggle.getBoundingClientRect();
    var menuRect = menu.getBoundingClientRect();

    var left = toggleRect.left + (toggleRect.width / 2) - (menuRect.width / 2);
    var top = toggleRect.bottom + 8;

    if (left < 8) left = 8;
    if (left + menuRect.width > window.innerWidth - 8) {
      left = window.innerWidth - menuRect.width - 8;
    }

    menu.style.left = left + 'px';
    menu.style.top = top + 'px';
  }

  function initDropdowns() {
    var desktopDropdowns = document.querySelectorAll('.sn-dropdown, .nav-dropdown');

    desktopDropdowns.forEach(function(dropdown) {
      var toggle = dropdown.querySelector('.sn-dropdown-toggle, .nav-dropdown-toggle');
      var menu = dropdown.querySelector('.sn-dropdown-menu, .nav-dropdown-menu');

      if (toggle && menu) {
        var closeTimer = null;
        var isHovering = false;

        var showDropdown = function() {
          if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
          }
          positionDropdown(dropdown, menu);
          dropdown.classList.add('hover-active');
        };

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
          }, 150);
        };

        dropdown.addEventListener('mouseenter', function() {
          isHovering = true;
          showDropdown();
        });

        dropdown.addEventListener('mouseleave', function(e) {
          isHovering = false;
          var relatedTarget = e.relatedTarget;
          if (relatedTarget && (menu.contains(relatedTarget) || menu === relatedTarget)) {
            return;
          }
          hideDropdown();
        });

        menu.addEventListener('mouseenter', function() {
          isHovering = true;
          showDropdown();
        });

        menu.addEventListener('mouseleave', function() {
          isHovering = false;
          hideDropdown();
        });

        toggle.addEventListener('click', function(e) {
          if (window.innerWidth < 992 || dropdown.classList.contains('active')) {
            e.preventDefault();
          }

          var isActive = dropdown.classList.contains('active');

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

    var mobileDropdowns = document.querySelectorAll('.sn-mobile-dropdown');

    mobileDropdowns.forEach(function(dropdown) {
      var toggle = dropdown.querySelector('.sn-mobile-dropdown-toggle');

      if (toggle) {
        toggle.addEventListener('click', function(e) {
          e.preventDefault();

          var isActive = dropdown.classList.contains('active');

          mobileDropdowns.forEach(function(other) {
            if (other !== dropdown) {
              other.classList.remove('active');
            }
          });

          if (isActive) {
            dropdown.classList.remove('active');
          } else {
            dropdown.classList.add('active');
          }
        });
      }
    });

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }
})();

(function() {
  'use strict';

  window.closeLaunchBanner = function() {
    var banner = document.getElementById('sn-launch-banner');
    if (banner) {
      banner.classList.add('hidden');
      document.body.classList.remove('sn-banner-visible');

      var customNav = document.getElementById('snooze-nav-clean') || document.querySelector('nav.snooze-nav-clean');
      if (customNav) {
        customNav.style.top = '0px';
      }

      var expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('sn-launch-banner-closed', expiry.toString());
    }
  };

  function initLaunchBanner() {
    var banner = document.getElementById('sn-launch-banner');
    if (!banner) return;

    banner.style.top = '0px';

    var closedUntil = localStorage.getItem('sn-launch-banner-closed');
    var isHidden = false;

    if (closedUntil) {
      var now = new Date().getTime();
      if (now < parseInt(closedUntil)) {
        banner.classList.add('hidden');
        document.body.classList.remove('sn-banner-visible');
        isHidden = true;
      } else {
        localStorage.removeItem('sn-launch-banner-closed');
      }
    }

    if (!isHidden && !banner.classList.contains('hidden')) {
      document.body.classList.add('sn-banner-visible');

      var bannerHeight = banner.offsetHeight || 50;

      var customNav = document.getElementById('snooze-nav-clean') || document.querySelector('nav.snooze-nav-clean');
      if (customNav) {
        customNav.style.top = bannerHeight + 'px';
      }
    } else {
      var customNav = document.getElementById('snooze-nav-clean') || document.querySelector('nav.snooze-nav-clean');
      if (customNav) {
        customNav.style.top = '0px';
      }
    }
  }

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLaunchBanner);
  } else {
    initLaunchBanner();
  }
})();

</script>

<script>
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

    var mobileDropdowns = menu.querySelectorAll('.sn-mobile-dropdown');
    mobileDropdowns.forEach(function(dropdown) {
      dropdown.classList.remove('active');
    });
  }
};

window.closeSnoozeMenu = function() {
  var nav = document.getElementById('snooze-nav-clean');
  var menu = document.getElementById('sn-mobile-menu');

  if (!nav || !menu) return;

  if (nav.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    menu.style.display = 'none';
    document.body.style.overflow = 'auto';

    var mobileDropdowns = menu.querySelectorAll('.sn-mobile-dropdown');
    mobileDropdowns.forEach(function(dropdown) {
      dropdown.classList.remove('active');
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var courseModuleHeaders = document.querySelectorAll('.course-module-header');
  courseModuleHeaders.forEach(function(header) {
    if (header.hasAttribute('onclick')) {
      header.removeAttribute('onclick');
    }
    header.addEventListener('click', function() {
      window.toggleCourseModule(this);
    });
  });

  var mobileToggleButtons = document.querySelectorAll('.sn-mobile-toggle');
  mobileToggleButtons.forEach(function(button) {
    if (button.hasAttribute('onclick')) {
      button.removeAttribute('onclick');
    }
    button.addEventListener('click', function(e) {
      e.preventDefault();
      window.toggleSnoozeMenu();
    });
  });

  var mobileLinks = document.querySelectorAll('.sn-mobile-link:not(.sn-mobile-dropdown-toggle), .sn-mobile-btn');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var nav = document.getElementById('snooze-nav-clean');
      if (nav && nav.classList.contains('is-open')) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          setTimeout(function() {
            window.closeSnoozeMenu();
          }, 150);
        } else {
          window.closeSnoozeMenu();
        }
      }
    });
  });

});
</script>
