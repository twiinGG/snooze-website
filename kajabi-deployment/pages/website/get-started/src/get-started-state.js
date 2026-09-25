<script>
(function () {
  'use strict';

  var STORAGE_KEY = 'snooze_get_started_v1';
  var DISMISS_KEY = 'snooze_get_started_bar_dismissed';
  var PAGE_PATH = '/get-started';

  function safeStorage() {
    try {
      var testKey = '__snoozeGsTest__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch (e) {
      return null;
    }
  }

  function safeSessionStorage() {
    try {
      var testKey = '__snoozeGsSessTest__';
      window.sessionStorage.setItem(testKey, '1');
      window.sessionStorage.removeItem(testKey);
      return window.sessionStorage;
    } catch (e) {
      return null;
    }
  }

  function readState() {
    var storage = safeStorage();
    if (!storage) return null;
    try {
      var raw = storage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function ctaStatus(state, enabled) {
    if (enabled === false) return 'disabled';
    if (!state) return 'start';
    if (state.completed === true || state.email_captured === true) return 'see_plan';
    if (typeof state.step === 'number' && state.step > 0) return 'in_progress';
    if (state.answers && Object.keys(state.answers).length > 0) return 'in_progress';
    return 'start';
  }

  function labelFor(status, el, copy) {
    var defaults = {
      start: (copy && copy.state && copy.state.start) || 'Get started',
      in_progress: (copy && copy.state && copy.state.continue) || 'Continue where you left off',
      see_plan: (copy && copy.state && copy.state.see_plan) || 'See your plan'
    };
    if (status === 'disabled') {
      return el.getAttribute('data-fallback-label') || defaults.start;
    }
    var attrMap = { start: 'data-label-start', in_progress: 'data-label-progress', see_plan: 'data-label-done' };
    var attr = attrMap[status];
    var custom = attr ? el.getAttribute(attr) : null;
    return custom || defaults[status];
  }

  function applyCta(el, state, enabled, copy) {
    if (!el.getAttribute('data-fallback-label')) {
      el.setAttribute('data-fallback-label', el.textContent || '');
    }
    if (!el.getAttribute('data-fallback-href')) {
      el.setAttribute('data-fallback-href', el.getAttribute('href') || PAGE_PATH);
    }

    var status = ctaStatus(state, enabled);

    if (status === 'disabled') {
      el.textContent = el.getAttribute('data-fallback-label');
      el.setAttribute('href', el.getAttribute('data-fallback-href'));
      return;
    }

    el.textContent = labelFor(status, el, copy);
    el.setAttribute('href', PAGE_PATH);
  }

  function shouldShowWelcomeBar(state, enabled, pathname) {
    if (enabled === false) return false;
    if (pathname === PAGE_PATH) return false;
    if (!state) return false;
    var inProgress = typeof state.step === 'number' && state.step > 0;
    var done = state.completed === true || state.email_captured === true;
    return inProgress || done;
  }

  function isBarDismissed() {
    var storage = safeSessionStorage();
    if (!storage) return false;
    try {
      return storage.getItem(DISMISS_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function dismissBar() {
    var storage = safeSessionStorage();
    if (!storage) return;
    try {
      storage.setItem(DISMISS_KEY, '1');
    } catch (e) {}
  }

  function renderWelcomeBar(copy) {
    if (document.getElementById('sgs-welcome-bar')) return;
    var bar = document.createElement('div');
    bar.id = 'sgs-welcome-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Get started progress');
    bar.style.cssText = [
      'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:9999',
      'background:#FBF7F0', 'border-top:1px solid rgba(0,0,0,0.08)',
      'padding:0.75rem 1rem', 'display:flex', 'align-items:center',
      'justify-content:center', 'gap:1rem', 'font-family:sans-serif',
      'font-size:0.9375rem'
    ].join(';');

    var text = (copy && copy.state && copy.state.welcome_back) || 'Pick up where you left off?';
    var linkText = (copy && copy.state && copy.state.welcome_back_link) || 'Continue';

    var span = document.createElement('span');
    span.textContent = text;

    var link = document.createElement('a');
    link.href = PAGE_PATH;
    link.textContent = linkText;
    link.style.cssText = 'font-weight:600;text-decoration:underline;';

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Dismiss');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:none;border:none;font-size:1.25rem;cursor:pointer;line-height:1;';
    closeBtn.addEventListener('click', function () {
      dismissBar();
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    });

    bar.appendChild(span);
    bar.appendChild(link);
    bar.appendChild(closeBtn);
    document.body.appendChild(bar);
  }

  function init() {
    var enabled = window.SNOOZE_GET_STARTED_ENABLED !== false;
    var copy = (window.SNOOZE_GS_DATA && window.SNOOZE_GS_DATA.copy) || null;
    var state = readState();

    var ctas = document.querySelectorAll('[data-get-started-cta]');
    for (var i = 0; i < ctas.length; i++) {
      applyCta(ctas[i], state, enabled, copy);
    }

    if (shouldShowWelcomeBar(state, enabled, window.location.pathname) && !isBarDismissed()) {
      renderWelcomeBar(copy);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.__snoozeGetStartedState__ = {
    ctaStatus: ctaStatus,
    labelFor: labelFor,
    applyCta: applyCta,
    shouldShowWelcomeBar: shouldShowWelcomeBar,
    readState: readState,
    init: init
  };
}());
</script>
