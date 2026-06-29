(function () {
  var MEMORY_API_HOST = '{{MEMORY_API_HOST}}';
  var N8N_WEBHOOK_URL = '{{N8N_WEBHOOK_URL}}';

  var THANKYOU_SLUGS = {
    'sally_bec_sleep_detectives': '/day-pass/sleep-detectives/thanks',
    'betsy_webinar':               '/day-pass/betsy/thanks',
    'merry_month_motherhood':      '/day-pass/merry-month/thanks'
  };

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

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    hideError();

    var email       = form.querySelector('[name="email"]').value.trim();
    var firstName   = form.querySelector('[name="first_name"]').value.trim();
    var childAge    = form.querySelector('[name="child_age"]').value;
    var eventAnchor = form.querySelector('[name="event_anchor"]').value;
    var source      = form.querySelector('[name="source"]').value;
    var honeypot    = form.querySelector('[name="hp_name"]').value;

    if (honeypot) {
      return;
    }

    if (!email || !firstName) {
      showError('Please fill in your email and first name before continuing.');
      return;
    }

    setLoading(true);

    try {
      var eligRes = await fetch(MEMORY_API_HOST + '/api/day-pass/check-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
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
        body: JSON.stringify({
          email: email,
          first_name: firstName,
          child_age: childAge,
          event_anchor: eventAnchor,
          source: source
        })
      });

      if (!webhookRes.ok) {
        throw new Error('webhook_failed');
      }

      var thankYouSlug = THANKYOU_SLUGS[eventAnchor] || '/day-pass/thanks';
      window.location.href = thankYouSlug;

    } catch (err) {
      setLoading(false);
      showError('Something went wrong on our end. Please wait a moment and try again. If it keeps happening, email us and we\'ll sort it.');
    }
  });
}());
