(function () {
  var MEMORY_API_HOST = '{{MEMORY_API_HOST}}';
  var N8N_WEBHOOK_URL = '{{N8N_WEBHOOK_URL}}';

  var form    = document.getElementById('day-pass-form');
  var btn     = document.getElementById('dp-submit');
  var errBox  = document.getElementById('dp-error');

  function showError(msg) {
    errBox.textContent = msg;
    errBox.style.display = 'block';
    errBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideError() {
    errBox.style.display = 'none';
    errBox.textContent = '';
  }

  function setLoading(loading) {
    btn.disabled = loading;
    btn.textContent = loading ? 'Checking...' : 'Send my Day Pass';
  }

  function detectCurrency() {
    try {
      var lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      var region = '';
      if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
        var resolved = Intl.DateTimeFormat().resolvedOptions();
        region = (resolved.locale || '').toLowerCase();
      }
      if (lang.indexOf('-au') !== -1 || region.indexOf('-au') !== -1) {
        return 'aud';
      }
      return 'usd';
    } catch (e) {
      return 'usd';
    }
  }

  function hydrateUtms() {
    var params = new URLSearchParams(window.location.search);
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    for (var i = 0; i < keys.length; i++) {
      var v = params.get(keys[i]);
      if (v) {
        var el = form.querySelector('[name="' + keys[i] + '"]');
        if (el) {
          el.value = v;
        }
      }
    }
  }

  form.querySelector('[name="currency_preference"]').value = detectCurrency();
  hydrateUtms();

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    hideError();

    var payload = {
      email:               form.querySelector('[name="email"]').value.trim(),
      first_name:          form.querySelector('[name="first_name"]').value.trim(),
      child_age:           form.querySelector('[name="child_age"]').value,
      event_anchor:        form.querySelector('[name="event_anchor"]').value,
      source:              form.querySelector('[name="source"]').value,
      currency_preference: form.querySelector('[name="currency_preference"]').value,
      utm_source:          form.querySelector('[name="utm_source"]').value,
      utm_medium:          form.querySelector('[name="utm_medium"]').value,
      utm_campaign:        form.querySelector('[name="utm_campaign"]').value,
      utm_content:         form.querySelector('[name="utm_content"]').value,
      utm_term:            form.querySelector('[name="utm_term"]').value
    };
    var honeypot = form.querySelector('[name="hp_name"]').value;

    if (honeypot) {
      return;
    }

    if (!payload.email || !payload.first_name) {
      showError('Please fill in your email and first name before continuing.');
      return;
    }

    setLoading(true);

    try {
      var eligRes = await fetch(MEMORY_API_HOST + '/api/day-pass/check-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: payload.email })
      });

      if (!eligRes.ok) {
        throw new Error('eligibility_check_failed');
      }

      var eligData = await eligRes.json();

      if (eligData.eligible === false && eligData.reason === 'existing_member') {
        window.location.href = '/already-a-member';
        return;
      }

      if (eligData.eligible === false && eligData.reason === 'prior_free_pass') {
        window.location.href = '/day-pass/already-used';
        return;
      }

      var webhookRes = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!webhookRes.ok) {
        throw new Error('webhook_failed');
      }

      window.location.href = '/day-pass/thanks';

    } catch (err) {
      setLoading(false);
      showError('Something went wrong on our end. Please wait a moment and try again. If it keeps happening, email us and we\'ll sort it.');
    }
  });
}());
