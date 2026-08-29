(function () {
  'use strict';

  function setMenuLinkOrder(dropdown, open) {
    dropdown.querySelectorAll('.dropdown__menu a').forEach(function (link) {
      link.tabIndex = open ? 0 : -1;
    });
  }

  function enhanceDropdown(dropdown) {
    var trigger = dropdown.querySelector('.dropdown__trigger');
    var menu = dropdown.querySelector('.dropdown__menu');
    if (!trigger || !menu) return;

    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.tabIndex = 0;

    function sync() {
      var open = dropdown.classList.contains('dropdown--open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      setMenuLinkOrder(dropdown, open);
    }

    if (!trigger.dataset.snoozeHeaderA11y) {
      trigger.dataset.snoozeHeaderA11y = 'true';
      trigger.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        trigger.click();
      });
      trigger.addEventListener('click', function () {
        window.setTimeout(sync, 0);
      });
      dropdown.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape' || !dropdown.classList.contains('dropdown--open')) return;
        event.preventDefault();
        event.stopPropagation();
        trigger.click();
        trigger.focus();
      });
      dropdown.addEventListener('mouseenter', function () {
        setMenuLinkOrder(dropdown, true);
      });
      dropdown.addEventListener('mouseleave', function () {
        if (!dropdown.classList.contains('dropdown--open')) {
          setMenuLinkOrder(dropdown, false);
        }
      });
      new MutationObserver(sync).observe(dropdown, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
    sync();
  }

  function enhanceHeader() {
    var header = document.querySelector('header.header');
    if (!header) return;

    ['desktop', 'mobile'].forEach(function (scope) {
      header.querySelectorAll('.header__content--' + scope + ' .dropdown').forEach(function (dropdown) {
        enhanceDropdown(dropdown);
      });
    });

    var mobile = header.querySelector('.header__content--mobile');
    var hamburger = header.querySelector('.hamburger');
    if (!mobile || !hamburger) return;

    mobile.id = 'snooze-mobile-navigation';
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-controls', mobile.id);
    hamburger.tabIndex = 0;

    function syncHamburger() {
      var open = window.getComputedStyle(mobile).display !== 'none';
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }

    if (!hamburger.dataset.snoozeHeaderA11y) {
      hamburger.dataset.snoozeHeaderA11y = 'true';
      hamburger.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        hamburger.click();
      });
      hamburger.addEventListener('click', function () {
        window.setTimeout(syncHamburger, 0);
      });
      new MutationObserver(syncHamburger).observe(mobile, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
    if (!header.dataset.snoozeHeaderEscape) {
      header.dataset.snoozeHeaderEscape = 'true';
      header.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape' || window.getComputedStyle(mobile).display === 'none') return;
        event.preventDefault();
        hamburger.click();
        hamburger.focus();
      });
    }
    syncHamburger();

    var startHere = mobile.querySelector('#block-1767079787493');
    var memberLogin = mobile.querySelector('#block-1718599174110');
    if (startHere && memberLogin && (mobile.children[0] !== startHere || mobile.children[1] !== memberLogin)) {
      mobile.insertBefore(startHere, mobile.firstChild);
      mobile.insertBefore(memberLogin, startHere.nextSibling);
    }
    var memberLoginLink = memberLogin && memberLogin.querySelector('a');
    if (memberLoginLink) {
      memberLoginLink.style.minHeight = '44px';
      memberLoginLink.style.display = 'flex';
      memberLoginLink.style.alignItems = 'center';
      memberLoginLink.style.justifyContent = 'center';
    }
  }

  function boot() {
    enhanceHeader();
    var header = document.querySelector('header.header');
    if (header && !header.dataset.snoozeHeaderObserver) {
      header.dataset.snoozeHeaderObserver = 'true';
      new MutationObserver(enhanceHeader).observe(header, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
