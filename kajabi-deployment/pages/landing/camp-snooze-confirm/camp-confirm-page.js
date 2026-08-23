const CAMP_CONFIRM_FEED_URL = window.CAMP_CAPACITY_FEED_URL ||
  'https://qwwwosoafcsupebpangw.supabase.co/functions/v1/camp-capacity';

const CAMP_CONFIRM_ANON_KEY = window.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3d3dvc29hZmNzdXBlYnBhbmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzIzODksImV4cCI6MjA2NTkwODM4OX0.YZZoJZ7CZjypFdm5cbUb3UUC1w0bOW2ei2ih8kBTaMQ'; // pragma: allowlist secret

const CONFIRMABLE_STATES = ['open', 'filling', 'low'];

window.CampConfirm = (function () {
  const authHeaders = {
    Accept: 'application/json',
    apikey: CAMP_CONFIRM_ANON_KEY,
    Authorization: 'Bearer ' + CAMP_CONFIRM_ANON_KEY
  };

  function dateLabel(value) {
    if (!value) return 'dates to be confirmed';
    return new Intl.DateTimeFormat('en-AU', {
      weekday: 'long', day: 'numeric', month: 'long'
    }).format(new Date(value + 'T00:00:00+10:00'));
  }

  function shortDate(value) {
    if (!value) return 'TBC';
    return new Intl.DateTimeFormat('en-AU', {
      day: 'numeric', month: 'short'
    }).format(new Date(value + 'T00:00:00+10:00'));
  }

  function pickDefault(cohorts, requested) {
    const open = cohorts.filter((c) => CONFIRMABLE_STATES.indexOf(c.state) !== -1);
    if (!open.length) return null;
    if (requested) {
      const asked = open.find((c) => String(c.cohort_number) === String(requested));
      if (asked) return asked;
    }
    return open[0];
  }

  function queryParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (err) {
      return null;
    }
  }

  function resolveIdentity() {
    if (window.SN_CAMP_CONTACT_ID) {
      return { contactId: String(window.SN_CAMP_CONTACT_ID), source: 'page_override' };
    }

    try {
      const user = window.Kajabi && window.Kajabi.currentSiteUser;
      if (user && user.type === 'Member' && user.contactId) {
        return { contactId: String(user.contactId), source: 'kajabi_site_user' };
      }
      if (user && user.type) {
        return { contactId: null, source: 'kajabi_site_user_' + String(user.type).toLowerCase() };
      }
    } catch (err) {
    }

    const paramContact = queryParam('contact_id') || queryParam('kajabi_contact_id');
    if (paramContact && /^\d{4,}$/.test(paramContact)) {
      return { contactId: paramContact, source: 'url_param' };
    }

    return { contactId: null, source: 'unknown' };
  }

  function show(root, stateName) {
    const states = root.querySelectorAll('.sn-cc-state');
    for (let i = 0; i < states.length; i += 1) states[i].hidden = true;
    const wanted = root.querySelector('#sn-cc-confirm-' + stateName);
    if (wanted) wanted.hidden = false;
    root.setAttribute('data-state', stateName);
  }

  function track(event, payload) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: event, surface: 'camp_confirm_page' }, payload || {}));
    } catch (err) {
    }
  }

  async function loadCohorts() {
    const res = await fetch(CAMP_CONFIRM_FEED_URL + '?limit=10', { headers: authHeaders });
    if (!res.ok) throw new Error('capacity feed ' + res.status);
    const body = await res.json();
    if (!body || !Array.isArray(body.cohorts)) throw new Error('capacity feed shape');
    return body.cohorts;
  }

  async function postConfirm(cohortNumber, identity) {
    const payload = {
      cohort_number: cohortNumber,
      kajabi_contact_id: identity.contactId
    };

    const res = await fetch(CAMP_CONFIRM_FEED_URL + '/confirm', {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, authHeaders),
      body: JSON.stringify(payload)
    });

    let body = null;
    try {
      body = await res.json();
    } catch (err) {
      body = null;
    }
    return { status: res.status, body: body };
  }

  function heldLine(cohort) {
    return 'Your place is held for <strong>' + cohort.title + '</strong>, starting ' +
      dateLabel(cohort.start_date) + '.';
  }

  function renderReady(root, cohorts, chosen, identity) {
    root.querySelector('#sn-cc-held-line').innerHTML = heldLine(chosen);

    const select = root.querySelector('#sn-cc-cohort-select');
    select.innerHTML = '';
    cohorts.filter((c) => CONFIRMABLE_STATES.indexOf(c.state) !== -1).forEach((c) => {
      const option = document.createElement('option');
      option.value = String(c.cohort_number);
      option.textContent = c.title + ', starts ' + shortDate(c.start_date);
      if (c.cohort_number === chosen.cohort_number) option.selected = true;
      select.appendChild(option);
    });

    if (!identity.contactId) {
      root.querySelector('#sn-cc-signin-held').innerHTML = heldLine(chosen);
      show(root, 'signin');
      return;
    }

    show(root, 'ready');
  }

  function renderDone(root, result, cohort) {
    const title = result.title || cohort.title;
    const startDate = result.start_date || cohort.start_date;
    const friday = result.access_friday || cohort.access_friday;

    root.querySelector('#sn-cc-done-title').textContent = result.status === 'holds_other_cohort'
      ? 'You already have a place in ' + title + '.'
      : 'You are in ' + title + '.';

    const openingLine = 'Camp starts ' + dateLabel(startDate) +
      '. Your camp group and the full Snooze library open on <strong>' + dateLabel(friday) + '</strong>.';

    root.querySelector('#sn-cc-done-body').innerHTML = result.status === 'holds_other_cohort'
      ? openingLine + ' To move camps, email <a class="sn-cc-inline-link" ' +
        'href="mailto:support@joinsnooze.com">support@joinsnooze.com</a> and we will move you.'
      : openingLine;

    show(root, 'done');
    const heading = root.querySelector('#sn-cc-done-title');
    if (heading && heading.focus) heading.focus();
  }

  function init(root) {
    if (!root) return;

    const identity = resolveIdentity();
    let cohorts = [];
    let chosen = null;

    show(root, 'loading');

    loadCohorts().then((rows) => {
      cohorts = rows;
      chosen = pickDefault(rows, queryParam('cohort'));
      if (!chosen) {
        root.querySelector('#sn-cc-full-body').textContent =
          'Every camp we have dates for is either full or already running. Email us and we will find you a ' +
          'place in the next one.';
        show(root, 'full');
        track('camp_confirm_no_open_cohort', {});
        return;
      }
      renderReady(root, cohorts, chosen, identity);
      track('camp_confirm_ready', {
        default_cohort: chosen.cohort_number,
        identity_source: identity.source,
        requested_cohort: queryParam('cohort') || null
      });
    }).catch((err) => {
      root.querySelector('#sn-cc-failed-body').textContent =
        'We cannot reach our camp list right now. Your payment is fine and your place is not lost. Email us ' +
        'and we will confirm your camp by hand.';
      show(root, 'failed');
      track('camp_confirm_feed_failed', { detail: String(err && err.message) });
    });

    const button = root.querySelector('#sn-cc-confirm-button');
    const select = root.querySelector('#sn-cc-cohort-select');
    const errorLine = root.querySelector('#sn-cc-confirm-error');

    select.addEventListener('change', () => {
      const next = cohorts.find((c) => String(c.cohort_number) === select.value);
      if (!next) return;
      chosen = next;
      root.querySelector('#sn-cc-held-line').innerHTML = heldLine(next);
    });

    button.addEventListener('click', async () => {
      if (!chosen || !identity.contactId) return;
      errorLine.hidden = true;

      button.disabled = true;
      button.textContent = 'Confirming';

      try {
        const result = await postConfirm(chosen.cohort_number, identity);

        if (result.status === 200 || result.status === 201) {
          renderDone(root, result.body || {}, chosen);
          track('camp_confirm_success', {
            cohort: chosen.cohort_number,
            confirm_status: (result.body && result.body.status) || 'confirmed',
            identity_source: identity.source
          });
          return;
        }

        if (result.status === 409) {
          const reason = (result.body && result.body.status) || 'full';
          root.querySelector('#sn-cc-full-title').textContent = reason === 'closed'
            ? 'That camp has closed'
            : 'That camp has filled';
          root.querySelector('#sn-cc-full-body').textContent = reason === 'closed'
            ? chosen.title + ' closed while you were on this page. Email us and we will put you in the next one.'
            : chosen.title + ' filled while you were on this page. Email us and we will put you in the next ' +
              'one, or hold you for this one if a place comes back.';
          show(root, 'full');
          track('camp_confirm_blocked', { cohort: chosen.cohort_number, reason: reason });
          return;
        }

        if (result.status === 503) {
          root.querySelector('#sn-cc-failed-body').textContent =
            chosen.title + ' is not taking confirmations yet. Your payment is fine and your place is not ' +
            'lost. Email us and we will book you in by hand.';
          show(root, 'failed');
          track('camp_confirm_cohort_not_ready', { cohort: chosen.cohort_number });
          return;
        }

        throw new Error('confirm ' + result.status);
      } catch (err) {
        root.querySelector('#sn-cc-failed-body').textContent =
          'Something went wrong at our end. Your payment is fine and your place is not lost.';
        show(root, 'failed');
        track('camp_confirm_failed', {
          cohort: chosen.cohort_number,
          detail: String(err && err.message)
        });
      } finally {
        button.disabled = false;
        button.textContent = 'Confirm this camp';
      }
    });

    const retry = root.querySelector('#sn-cc-retry');
    if (retry) retry.addEventListener('click', () => { window.location.reload(); });
  }

  return { init: init, resolveIdentity: resolveIdentity, pickDefault: pickDefault };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.CampConfirm.init(document.getElementById('sn-cc-confirm'));
  });
} else {
  window.CampConfirm.init(document.getElementById('sn-cc-confirm'));
}
