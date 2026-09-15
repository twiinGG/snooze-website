/* Inline after either bio page. Existing GTM owns dispatch and consent. */
(function (host, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else if (host.document.readyState === 'loading') {
    host.document.addEventListener('DOMContentLoaded', function () { api.start(host); });
  } else api.start(host);
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';
  var experiment = 'bio_layout_v1';

  /** Queue only allowlisted metadata. Never load tags or bypass consent controls. */
  function start(win) {
    var root = win.document.querySelector('[data-bio-variant]');
    if (!root || root.__snoozeBioTracked) return;
    var params = new URL(win.location.href).searchParams;
    if (params.get('bio_preview') === '1') return;
    var variant = root.getAttribute('data-bio-variant');
    if (variant !== 'control' && variant !== 'simple') return;
    root.__snoozeBioTracked = true;
    var clicked = false;
    var commercialClicked = false;
    function emit(event, details) {
      var payload = {
        event: event,
        experiment_id: experiment,
        variant: variant,
        experiment_enrolled: params.get('bio_experiment') === experiment
      };
      Object.keys(details || {}).forEach(function (name) { payload[name] = details[name]; });
      // Queue for the existing container, including when it loads after this block.
      win.dataLayer = win.dataLayer || [];
      try { win.dataLayer.push(payload); } catch (_) { /* Analytics must never break links. */ }
    }
    emit('bio_experiment_view');
    function click(event) {
      if (event.type === 'auxclick' && event.button !== 1) return;
      var target = event.target;
      var link = target && typeof target.closest === 'function' && target.closest('a[data-bio-link-id]');
      if (!link || !root.contains(link)) return;
      var id = link.getAttribute('data-bio-link-id') || '';
      if (!/^[a-z0-9][a-z0-9_-]{0,63}$/.test(id)) return;
      var commercial = link.getAttribute('data-bio-commercial') === 'true';
      emit('bio_link_click', {
        link_id: id,
        commercial: commercial,
        first_click: !clicked,
        first_commercial_click: commercial && !commercialClicked
      });
      clicked = true;
      if (commercial) commercialClicked = true;
    }
    root.addEventListener('click', click);
    root.addEventListener('auxclick', click);
  }
  return { start: start };
});
