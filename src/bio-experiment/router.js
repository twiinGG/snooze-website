/* Inline on /bio only. No dependencies or analytics requests. */
(function (host, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else api.start(host);
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';
  var experiment = 'bio_layout_v1';
  var key = 'snooze:' + experiment;
  var paths = { control: '/links', simple: '/links-simple' };
  function valid(value) { return value === 'control' || value === 'simple'; }

  /** Choose a sticky allocation, or a fresh allocation if browser storage is blocked. */
  function choose(win) {
    var existing;
    try { existing = win.localStorage.getItem(key); } catch (_) { /* Storage is optional. */ }
    if (valid(existing)) return existing;
    var sample;
    try {
      var values = new Uint32Array(1);
      win.crypto.getRandomValues(values);
      sample = values[0] / 4294967296;
    } catch (_) { sample = Math.random(); }
    var variant = sample < 0.5 ? 'control' : 'simple';
    try { win.localStorage.setItem(key, variant); } catch (_) { /* Route still works. */ }
    return variant;
  }

  /** Resolve a same-origin destination while retaining incoming campaign parameters. */
  function destination(win) {
    var url = new URL(win.location.href);
    var preview = url.searchParams.get('bio_preview') === '1';
    var requested = url.searchParams.get('bio_variant');
    var variant = preview ? (valid(requested) ? requested : 'control') : choose(win);
    url.pathname = paths[variant];
    url.searchParams.delete('bio_variant');
    url.searchParams.delete('bio_experiment');
    if (!preview) {
      url.searchParams.delete('bio_preview');
      url.searchParams.set('bio_experiment', experiment);
    }
    return url.href;
  }

  function start(win) {
    if (!win || !/^\/bio\/?$/.test(win.location.pathname)) return;
    win.location.replace(destination(win));
  }
  return { start: start, destination: destination };
});
