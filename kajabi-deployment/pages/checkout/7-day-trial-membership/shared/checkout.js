(function() {
  'use strict';

  const PLAN_CONFIG = {
    USD: {
      monthly: { variantId: '160544', plan: 'monthly', cadence: 'monthly', amount: 79, disclosure: '$79 monthly' },
      quarterly: { variantId: '64815', plan: 'quarterly', cadence: 'every_3_months', amount: 198, disclosure: '$198 every 3 months' },
      annual: { variantId: '64816', plan: 'annual', cadence: 'yearly', amount: 660, disclosure: '$660 yearly' }
    },
    AUD: {
      monthly: { variantId: '160790', plan: 'monthly', cadence: 'monthly', amount: 119, disclosure: 'A$119 monthly' },
      quarterly: { variantId: '160791', plan: 'quarterly', cadence: 'every_3_months', amount: 297, disclosure: 'A$297 every 3 months' },
      annual: { variantId: '160792', plan: 'annual', cadence: 'yearly', amount: 996, disclosure: 'A$996 yearly' }
    }
  };
  const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
  const OPTION_SELECTOR = '.embedded-checkout-pricing-option, [data-pricing-option-id], [data-variant-id]';
  const SELECTED_SELECTOR = '.embedded-checkout-pricing-option.selected, .embedded-checkout-pricing-option[aria-checked="true"], [data-pricing-option-id].selected, [data-pricing-option-id][aria-checked="true"], [data-variant-id].selected, [data-variant-id][aria-checked="true"]';
  let lastSelectionKey = '';

  function pushEvent(payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }

  function checkoutContext() {
    const wrapper = document.getElementById('snooze-custom-checkout');
    if (!wrapper) return null;
    const currency = String(wrapper.getAttribute('data-currency') || '').toUpperCase();
    if (!PLAN_CONFIG[currency]) return null;
    return {
      wrapper: wrapper,
      currency: currency,
      offerId: String(wrapper.getAttribute('data-offer-id') || '')
    };
  }

  function optionText(option) {
    return String((option && (option.innerText || option.textContent)) || '').toLowerCase();
  }

  function optionVariantId(option) {
    if (!option) return '';
    const attributes = ['data-variant-id', 'data-pricing-option-id', 'data-variant', 'value'];
    for (let index = 0; index < attributes.length; index += 1) {
      const value = option.getAttribute && option.getAttribute(attributes[index]);
      if (value) return String(value);
    }
    const input = option.querySelector && option.querySelector('input[value], option[value]');
    return input && input.value ? String(input.value) : '';
  }

  function planFromOption(option, currency) {
    const plans = PLAN_CONFIG[currency];
    const variantId = optionVariantId(option);
    const keys = Object.keys(plans);
    for (let index = 0; index < keys.length; index += 1) {
      if (plans[keys[index]].variantId === variantId) return plans[keys[index]];
    }
    const text = optionText(option);
    if (text.indexOf('quarter') > -1 || text.indexOf('3 month') > -1) return plans.quarterly;
    if (text.indexOf('annual') > -1 || text.indexOf('year') > -1) return plans.annual;
    if (text.indexOf('month') > -1) return plans.monthly;
    return null;
  }

  function selectedOption() {
    const explicit = document.querySelector(SELECTED_SELECTOR);
    if (explicit) return explicit;
    const checked = document.querySelector('input:checked');
    return checked && checked.closest ? checked.closest(OPTION_SELECTOR) : null;
  }

  function updateDisclosure(context, plan) {
    const disclosure = document.querySelector('[data-selected-plan-disclosure]');
    const copy = disclosure && disclosure.querySelector('[data-selected-plan-copy]');
    if (!copy || !plan) return;
    copy.textContent = 'After your 7-day trial: ' + plan.disclosure + '.';
  }

  function syncSelection(emitEvent) {
    const context = checkoutContext();
    if (!context) return;
    const plan = planFromOption(selectedOption(), context.currency);
    if (!plan) return;
    updateDisclosure(context, plan);
    const selectionKey = context.offerId + ':' + plan.variantId;
    if (emitEvent && lastSelectionKey && selectionKey !== lastSelectionKey) {
      pushEvent({
        event: 'pricing_option_selected',
        offer_id: context.offerId,
        variant_id: plan.variantId,
        plan: plan.plan,
        cadence: plan.cadence,
        amount: plan.amount,
        currency: context.currency,
        surface: 'trial_checkout'
      });
    }
    lastSelectionKey = selectionKey;
  }

  function preserveAttribution(link) {
    if (!link || !link.getAttribute) return;
    try {
      const destination = new URL(link.getAttribute('href'), window.location.origin);
      const current = new URL(window.location.href);
      ATTRIBUTION_KEYS.forEach(function(key) {
        if (!destination.searchParams.has(key) && current.searchParams.has(key)) {
          destination.searchParams.set(key, current.searchParams.get(key));
        }
      });
      link.setAttribute('href', destination.toString());
    } catch (error) {}
  }

  function moveDisclosureNearPayment(context) {
    const disclosure = context.wrapper.querySelector('[data-selected-plan-disclosure]');
    const paymentButton = document.querySelector('button[type="submit"], input[type="submit"], .checkout-submit, [data-checkout-submit]');
    if (disclosure && paymentButton && paymentButton.parentNode) {
      paymentButton.parentNode.insertBefore(disclosure, paymentButton);
    }
  }

  function scrollToCheckout(event) {
    if (event) event.preventDefault();
    const checkout = document.querySelector('.checkout-form, .kajabi-checkout, .checkout-container, [data-checkout], .offer-checkout, .checkout-wrapper, .checkout-form-container, .enhanced-checkout, .checkout-right, .checkout-sidebar, form[action*="checkout"], form[action*="offer"]');
    const target = checkout || document.querySelector('form');
    if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      window.setTimeout(function() {
        const firstInput = target.querySelector && target.querySelector('input, select, textarea, button');
        if (firstInput && firstInput.focus) firstInput.focus();
      }, 500);
    }
  }

  function init() {
    const context = checkoutContext();
    if (!context) return;

    if (!window.__snoozeTrialBeginCheckoutFired) {
      window.__snoozeTrialBeginCheckoutFired = true;
      pushEvent({
        event: 'begin_checkout',
        offer_id: context.offerId,
        currency: context.currency,
        checkout_mode: '7_day_trial',
        surface: 'trial_checkout'
      });
    }

    context.wrapper.querySelectorAll('.scroll-to-checkout, .mobile-scroll-to-checkout').forEach(function(button) {
      button.addEventListener('click', scrollToCheckout);
    });

    const currencyLink = context.wrapper.querySelector('[data-currency-switch]');
    preserveAttribution(currencyLink);
    if (currencyLink) {
      currencyLink.addEventListener('click', function() { preserveAttribution(currencyLink); }, true);
    }

    moveDisclosureNearPayment(context);
    syncSelection(false);

    document.addEventListener('click', function(event) {
      if (event.target && event.target.closest && event.target.closest(OPTION_SELECTOR)) {
        window.setTimeout(function() { syncSelection(true); }, 0);
      }
    }, true);
    document.addEventListener('change', function(event) {
      if (event.target && event.target.closest && event.target.closest(OPTION_SELECTOR)) syncSelection(true);
    }, true);

    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(function() { syncSelection(true); });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'aria-checked', 'checked'], childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
