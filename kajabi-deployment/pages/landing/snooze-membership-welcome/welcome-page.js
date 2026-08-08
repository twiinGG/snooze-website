(function () {
  'use strict';

  var root = document.getElementById('sn-mw-page');
  if (!root || root.getAttribute('data-sn-bound') === 'true') return;

  var paths = Array.prototype.slice.call(root.querySelectorAll('.sn-mw-path'));
  var result = root.querySelector('#sn-mw-result');
  var title = root.querySelector('#sn-mw-result-title');
  var action = root.querySelector('#sn-mw-result-action');
  var resultLink = root.querySelector('#sn-mw-result-link');
  var villageLinks = Array.prototype.slice.call(root.querySelectorAll('#sn-mw-village-link, #sn-mw-village-card-link'));
  var liveSessionsLink = root.querySelector('#sn-mw-live-sessions-link');
  var appLinks = Array.prototype.slice.call(root.querySelectorAll('[data-app-platform]'));

  if (!paths.length || !result || !title || !action || !resultLink) return;
  root.setAttribute('data-sn-bound', 'true');

  function emit(eventName, details) {
    var payload = Object.assign({ event: eventName, surface: 'membership_welcome' }, details || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }

  function selectPath(path, event) {
    var destination = path.getAttribute('href');
    var ageBand = path.getAttribute('data-age-band');
    var pathTitle = path.getAttribute('data-title');
    var pathAction = path.getAttribute('data-action');

    if (!destination || !ageBand || !pathTitle || !pathAction) return;
    if (event) event.preventDefault();

    paths.forEach(function (item) {
      item.setAttribute('aria-current', item === path ? 'true' : 'false');
    });

    title.textContent = 'Start with the ' + pathTitle;
    action.textContent = pathAction;
    resultLink.href = destination;
    result.hidden = false;

    emit('onboarding_path_selected', {
      age_band: ageBand,
      destination: destination
    });

    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    result.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    title.focus({ preventScroll: true });
  }

  paths.forEach(function (path) {
    path.setAttribute('aria-current', 'false');
    path.addEventListener('click', function (event) {
      selectPath(path, event);
    });
  });

  villageLinks.forEach(function (villageLink) {
    villageLink.addEventListener('click', function () {
      emit('village_cta_click', { placement: 'membership_welcome' });
    });
  });

  if (liveSessionsLink) {
    liveSessionsLink.addEventListener('click', function () {
      emit('live_sessions_cta_click', { placement: 'membership_welcome' });
    });
  }

  appLinks.forEach(function (appLink) {
    appLink.addEventListener('click', function () {
      emit('app_download_click', {
        platform: appLink.getAttribute('data-app-platform'),
        placement: 'membership_welcome'
      });
    });
  });
}());
