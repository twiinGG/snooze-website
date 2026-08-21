// Camp Snooze post-purchase confirmation.
//
// The buyer has already paid. This page's only job is to record WHICH camp they
// are in, because Kajabi's checkout has no field that can carry that and drops
// `?cohort=` on the way through. Until this page existed, a family's camp was
// displayed to them and never written down anywhere.
//
// The design rule from the spec: a buyer who reads nothing and clicks the one
// button gets the right answer. The soonest open camp is pre-selected, and the
// camp picker is behind a disclosure, because the picker exists for the family
// who bought ahead and not for everybody else to have to think.
//
// Paste target: this landing page theme's Custom JavaScript field. Not the
// offer-level thank-you code field, which has no JS surface.

const CAMP_CONFIRM_FEED_URL = window.CAMP_CAPACITY_FEED_URL ||
  'https://qwwwosoafcsupebpangw.supabase.co/functions/v1/camp-capacity';

// Public Supabase anon key, safe to ship in a pasted page (RLS-scoped, not a service-role secret).
const CAMP_CONFIRM_ANON_KEY = window.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3d3dvc29hZmNzdXBlYnBhbmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzIzODksImV4cCI6MjA2NTkwODM4OX0.YZZoJZ7CZjypFdm5cbUb3UUC1w0bOW2ei2ih8kBTaMQ'; // pragma: allowlist secret

// A camp whose state is one of these can still take a confirmation. `full` and
// `closed` cannot, and the Edge Function rejects them again server side, so a
// stale page cannot book a sixteenth family into a camp of fifteen.
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

  // Which camp to show first. `?cohort=17` wins if it names a camp that is
  // actually confirmable, because that is the camp the buyer chose on the
  // landing page and carried through checkout. Otherwise the soonest one.
  //
  // This is the first time `?cohort=` survives a transaction. It has been
  // appended to checkout URLs and discarded by Kajabi since the picker shipped.
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

  // WHO IS THIS BUYER.
  //
  // `window.Kajabi.currentSiteUser` is emitted on every page of this site by a
  // header script block, shaped `{ id, type, contactId }` where `type` is
  // `Guest`, `User` (Kajabi staff) or `Member`. Only a `Member` carries a real
  // `contactId`. This is the same global and the same test the team already
  // ships on two other landing pages:
  //   pages/landing/toddler-toolkit-sample-ready/toddler-toolkit-sample-ready.html
  //   pages/landing/newborn-guide-preview-ready/newborn-guide-preview-ready.html
  // and it is the rule written down in
  //   docs/technical/LEAD-MAGNET-FORM-PLUS-GRANT.md
  // which also says why NOT to use `SnoozeUserDetection` here: it infers
  // membership from a `/login` link in the site nav, and a landing page carries
  // its own theme with no site nav, so it calls every visitor new.
  //
  // Asking the buyer for their email instead is not an option, and this is
  // worth knowing before anybody adds a field. Kajabi's REST API cannot look a
  // contact up by email: `GET /v1/contacts?filter[email]=<addr>` returns HTTP
  // 200 and the newest 25 contacts, ignoring the filter, while honouring
  // `page[size]` in the same request. Tested 2026-08-21. So an email address
  // cannot be turned into the contact id the tag-add needs, and a typed email
  // would record a seat that never gets its entitlement.
  //
  // What makes the `Member` case reliable is a checkout setting rather than
  // anything on this page: "Require new customers to create password at
  // checkout" on the camp offers, which is what puts a fresh buyer in a session
  // before they arrive here.
  //
  // AS OF 2026-08-21 THAT SETTING IS OFF ON ALL SIX CAMP OFFERS. Read live from
  // each offer's Settings tab (`offer_collect_password_checkbox`). Kade decided
  // to turn it on; nobody has. Until somebody does, a brand-new buyer arrives
  // here with no session and gets the sign-in state rather than the confirm
  // button. The page is correct either way; it just cannot do its job for a new
  // buyer until that setting changes.
  //
  // Two overrides stay ahead of the global. `SN_CAMP_CONTACT_ID` is for the
  // page's own custom-code block, if Kajabi's Liquid context ever turns out to
  // expose the member server-side. The URL parameter is for testing, and it is
  // last-resort rather than first-choice because Kajabi does not put one there:
  // 180 days of GA4 on this site shows every paid confirmation path as a bare
  // path with no query string.
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
        // A real answer, and the answer is "not a member". Carry the type
        // through so the page can say something specific and so the analytics
        // distinguish a logged-out buyer from a broken global.
        return { contactId: null, source: 'kajabi_site_user_' + String(user.type).toLowerCase() };
      }
    } catch (err) {
      // Fall through. A missing global is its own answer.
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
      // Analytics must never break the one action this page exists for.
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

    // No contact id means no session, and there is no way to recover from that
    // on this page: Kajabi cannot resolve an email to a contact over its REST
    // API, so a typed address would book a seat that never gets its access.
    // Send them to sign in rather than offering a button that cannot deliver.
    if (!identity.contactId) {
      root.querySelector('#sn-cc-signin-held').innerHTML = heldLine(chosen);
      show(root, 'signin');
      return;
    }

    show(root, 'ready');
  }

  // Three ways this ends well, and the buyer should be able to tell them apart.
  //
  //   confirmed           the seat was just taken
  //   already_confirmed   they clicked twice, or came back to the page
  //   holds_other_cohort  they already hold a place in a DIFFERENT camp, so the
  //                       page reports the camp they are actually in rather
  //                       than the one they just clicked. One family holds one
  //                       seat, and the database enforces that across cohorts.
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
      // The feed is down. Do not offer a button that cannot work; send them to
      // a person instead. The buyer has paid, so silence is the worst outcome.
      root.querySelector('#sn-cc-failed-body').textContent =
        'We cannot reach our camp list right now. Your payment is fine and your place is not lost. Email us ' +
        'and we will confirm your camp by hand.';
      show(root, 'failed');
      track('camp_confirm_feed_failed', { detail: String(err && err.message) });
    });

    const button = root.querySelector('#sn-cc-confirm-button');
    const select = root.querySelector('#sn-cc-cohort-select');
    const errorLine = root.querySelector('#sn-cc-confirm-error');

    // Keep the held line honest when they change the picker, so the sentence
    // above the button always names the camp the button will actually book.
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

        // 409 is the seat cap or the camp's own dates saying no. The feed said
        // the camp was open when the page loaded, so this is a race, and the
        // buyer needs to know which of the two happened.
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

        // 503 is a camp that exists but has no Kajabi tag behind it yet, so
        // confirming it would record a place with no path to an access grant.
        // The Edge Function refuses and gives the seat back rather than record
        // one it cannot deliver.
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
