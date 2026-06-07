/*
 * Snooze Day Pass - Canonical Landing Page Submit Logic
 *
 * Standalone copy of the inline script in index.html. The version that
 * ships into Kajabi is the inline copy in index.html; this file exists
 * for diffing against future updates and for unit testing.
 *
 * Source: docs/projects/day-pass/09-landing-page-implementation.md section 3.
 * Related: docs/projects/paid-media-and-dual-currency-v1/00-prd.md §5.3.
 *
 * Pre-paste replacements:
 *   {{MEMORY_API_HOST}} - base URL of services/memory-api, no trailing slash
 *   {{N8N_WEBHOOK_URL}} - full n8n webhook URL for day-pass-signup
 */

(function () {
  // --- Replace these two values before publishing ---
  var MEMORY_API_HOST = '{{MEMORY_API_HOST}}';
  var N8N_WEBHOOK_URL = '{{N8N_WEBHOOK_URL}}';

  // Per-anchor thank-you page slugs; matches section 6 of the canonical pack.
  // The form redirect picks the slug that matches the event_anchor hidden field.
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

    // Honeypot check
    if (honeypot) {
      return;
    }

    if (!email || !firstName) {
      showError('Please fill in your email and first name before continuing.');
      return;
    }

    setLoading(true);

    try {
      // Step 1: eligibility check
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

      // Step 2: submit to n8n webhook with the exact body shape the workflow expects
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

      // Step 3: redirect to the per-anchor thank-you page
      var thankYouSlug = THANKYOU_SLUGS[eventAnchor] || '/day-pass/thanks';
      window.location.href = thankYouSlug;

    } catch (err) {
      // Do not retry automatically. Re-enable the button and show a friendly message.
      setLoading(false);
      showError('Something went wrong on our end. Please wait a moment and try again. If it keeps happening, email us and we\'ll sort it.');
    }
  });
}());
