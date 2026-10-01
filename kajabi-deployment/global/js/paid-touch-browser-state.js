(function (window) {
  'use strict';
  void 'BEGIN GENERATED REDUCER';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
function clean(value) {
  if (value === null || value === undefined) return null;
  const result = String(value).trim();
  return result === '' ? null : result;
}
function timestamp(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)) {
    throw new TypeError('Touch timestamps must be timezone-qualified UTC ISO dates');
  }
  const result = Date.parse(value);
  if (!Number.isFinite(result)) throw new TypeError('Touch timestamps must be timezone-qualified UTC ISO dates');
  return result;
}
function tupleFrom(touch) {
  const tuple = {};
  for (const key of UTM_KEYS) tuple[key] = clean(touch[key]);
  return tuple;
}
function sameTuple(left, right) {
  return UTM_KEYS.every((key) => clean(left && left[key]) === clean(right && right[key]));
}
function currentClickPlatforms(touch) {
  const platforms = [];
  if (clean(touch.fbclid)) platforms.push('meta');
  if (clean(touch.gclid)) platforms.push('google');
  return platforms;
}
function paidClickPlatforms(touch) {
  const platforms = [];
  if (clean(touch.fbclid) || clean(touch.fbc)) platforms.push('meta');
  if (clean(touch.gclid) || clean(touch._gcl_aw)) platforms.push('google');
  return platforms;
}
function isDirect(touch) {
  const source = clean(touch.utm_source);
  const medium = clean(touch.utm_medium);
  return !source || source === '(direct)' || source === 'direct' || medium === '(none)';
}
function externalTouch(touch) {
  const clickPlatforms = currentClickPlatforms(touch);
  if (clickPlatforms.length > 1) return null;
  if (!isDirect(touch)) return { ...tupleFrom(touch), utm_id: clean(touch.utm_id), occurred_at: touch.occurred_at };
  if (clickPlatforms.length !== 1) return null;
  return {
    ...tupleFrom(touch),
    utm_source: clickPlatforms[0],
    utm_medium: 'unresolved_paid_click',
    utm_id: clean(touch.utm_id),
    occurred_at: touch.occurred_at,
  };
}
function exactRegistration(touch, registeredTuples) {
  const tuple = tupleFrom(touch);
  if (UTM_KEYS.some((key) => tuple[key] === null)) return null;
  const matches = registeredTuples.filter((candidate) => (
    candidate.status === 'active'
    && (candidate.platform === 'meta' || candidate.platform === 'google')
    && candidate.utm_source === candidate.platform
    && sameTuple(candidate, tuple)
  ));
  return matches.length === 1 ? matches[0] : null;
}
function requirePolicy(policy) {
  if (!policy || !Number.isFinite(policy.retention_ms) || policy.retention_ms <= 0) {
    throw new TypeError('policy.retention_ms must be supplied from the approved retention policy');
  }
  timestamp(policy.reference_at);
  if (!Array.isArray(policy.registered_tuples)) {
    throw new TypeError('policy.registered_tuples must be an array');
  }
}
function emptyTouchState() {
  return {
    first_touch: null,
    latest_registered_paid_touch: null,
    final_touch: null,
    unresolved_paid_clicks: [],
    prior_paid_touches: [],
  };
}
function applyTouch(state, arrival, policy) {
  requirePolicy(policy);
  const next = {
    ...emptyTouchState(),
    ...state,
    first_touch: retained(state.first_touch, policy),
    latest_registered_paid_touch: retained(state.latest_registered_paid_touch, policy),
    final_touch: retained(state.final_touch, policy),
    unresolved_paid_clicks: [...(state.unresolved_paid_clicks || [])].filter((click) => retained(click, policy)),
    prior_paid_touches: [...(state.prior_paid_touches || [])].filter((touch) => retained(touch, policy)),
  };
  const occurredAt = timestamp(arrival.occurred_at);
  const age = timestamp(policy.reference_at) - occurredAt;
  if (age < 0 || age > policy.retention_ms) return next;
  const external = externalTouch(arrival);
  const currentPlatforms = currentClickPlatforms(arrival);
  const registration = currentPlatforms.length > 1 ? null : exactRegistration(arrival, policy.registered_tuples);
  const clickPlatforms = paidClickPlatforms(arrival);
  const clickOccurredAt = currentPlatforms.length > 0
    ? arrival.occurred_at
    : clean(arrival.click_occurred_at);
  if (external && !next.first_touch) next.first_touch = external;
  if (external && (!next.final_touch || occurredAt > timestamp(next.final_touch.occurred_at))) {
    next.final_touch = external;
  }
  if (registration) {
    const paidTouch = {
      ...tupleFrom(arrival),
      occurred_at: arrival.occurred_at,
      platform: clean(registration.platform) || clean(arrival.utm_source),
      campaign_id: clean(registration.campaign_id),
      utm_id: clean(arrival.utm_id),
      ad_id: clean(arrival.utm_id) || clean(registration.ad_id),
    };
    const current = next.latest_registered_paid_touch;
    if (!current || occurredAt > timestamp(current.occurred_at)) {
      if (current && !next.prior_paid_touches.some((touch) => sameTuple(touch, current))) {
        next.prior_paid_touches.push(current);
      }
      next.latest_registered_paid_touch = paidTouch;
    } else if (
      occurredAt < timestamp(current.occurred_at)
      && !sameTuple(current, paidTouch)
      && !next.prior_paid_touches.some((touch) => sameTuple(touch, paidTouch))
    ) {
      next.prior_paid_touches.push(paidTouch);
    }
  }
  if (clickOccurredAt) {
    const clickTime = timestamp(clickOccurredAt);
    const clickAge = timestamp(policy.reference_at) - clickTime;
    if (clickAge >= 0 && clickAge <= policy.retention_ms) {
      for (const clickPlatform of clickPlatforms) {
        if (registration && clickPlatform === registration.platform) continue;
        if (!next.unresolved_paid_clicks.some((click) => (
          click.platform === clickPlatform && click.occurred_at === clickOccurredAt
        ))) {
          next.unresolved_paid_clicks.push({ platform: clickPlatform, occurred_at: clickOccurredAt });
        }
      }
    }
  }
  return next;
}
function retained(touch, policy) {
  if (!touch) return null;
  const age = timestamp(policy.reference_at) - timestamp(touch.occurred_at);
  return age >= 0 && age <= policy.retention_ms ? touch : null;
}
function attributionVerdict(state, policy) {
  requirePolicy(policy);
  const paid = retained(state.latest_registered_paid_touch, policy);
  const finalTouch = retained(state.final_touch, policy);
  const finalTouchDiffers = Boolean(paid && finalTouch && !sameTuple(paid, finalTouch));
  const assistedPlatforms = new Set([
    ...(state.unresolved_paid_clicks || []).filter((click) => retained(click, policy)).map((click) => click.platform),
    ...(state.prior_paid_touches || []).filter((touch) => retained(touch, policy)).map((touch) => touch.platform),
  ]);
  if (finalTouchDiffers && paid.platform) assistedPlatforms.add(paid.platform);
  return {
    deterministic_paid_credit: paid,
    paid_assist: assistedPlatforms.size > 0,
    paid_assist_platforms: [...assistedPlatforms].sort(),
    final_touch: finalTouch,
  };
}
function qualifyCampCheckout(event, policy) {
  const seen = new Set(policy.seen_event_ids || []);
  const eventId = clean(event.event_id);
  if (event.event_name !== 'camp_checkout_started') {
    return { qualifies: false, reason: 'wrong_event', seen_event_ids: [...seen] };
  }
  if (!Array.isArray(policy.camp_offer_tokens) || !policy.camp_offer_tokens.includes(clean(event.offer_token))) {
    return { qualifies: false, reason: 'non_camp_offer', seen_event_ids: [...seen] };
  }
  if (!eventId) return { qualifies: false, reason: 'missing_event_id', seen_event_ids: [...seen] };
  if (seen.has(eventId)) return { qualifies: false, reason: 'duplicate_event', seen_event_ids: [...seen] };
  seen.add(eventId);
  return { qualifies: true, reason: 'qualified_camp_checkout', seen_event_ids: [...seen] };
}
const paidTouchContract = { UTM_KEYS, sameTuple, exactRegistration };
  void 'END GENERATED REDUCER';
(function (root) {
  'use strict';
  var STATE_KEY = 'snooze_paid_touch_state_v1';
  var LEGACY_KEYS = ['snooze_utm_attribution', 'snooze_attribution_first_touch', 'snooze_attribution_current_touch'];
  var TOUCH_KEYS = UTM_KEYS.concat(['utm_id', 'fbclid', 'fbc', 'gclid', '_gcl_aw', 'occurred_at', 'click_occurred_at', 'platform', 'campaign_id', 'ad_id']);
  var RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
  function store() { try { return root.localStorage; } catch (e) { return null; } }
  function read(key) {
    try {
      var raw = store() && store().getItem(key);
      var value = raw ? JSON.parse(raw) : null;
      return value && typeof value === 'object' ? value : null;
    } catch (e) { return null; }
  }
  function write(value) {
    try { if (store()) store().setItem(STATE_KEY, JSON.stringify(value)); } catch (e) {}
  }
  function validUtc(value) {
    return typeof value === 'string'
      && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)
      && Number.isFinite(Date.parse(value)) ? value : null;
  }
  function normalizedTouch(value) {
    if (!value || typeof value !== 'object') return null;
    var occurred = validUtc(value.occurred_at) || validUtc(value.captured_at);
    if (!occurred) return null;
    var result = { occurred_at: occurred };
    TOUCH_KEYS.forEach(function (key) {
      if (key === 'occurred_at') return;
      if (key === 'click_occurred_at') {
        var click = validUtc(value[key]);
        if (click) result[key] = click;
      } else if (value[key] !== null && value[key] !== undefined && String(value[key]).trim() !== '') {
        result[key] = String(value[key]).trim();
      }
    });
    return result;
  }
  function normalizedAssist(value) {
    if (!value || typeof value !== 'object' || !validUtc(value.occurred_at)) return null;
    var result = { platform: String(value.platform || '').trim(), occurred_at: value.occurred_at };
    return result.platform ? result : null;
  }
  function normalizedState(value) {
    var result = emptyTouchState();
    if (!value || typeof value !== 'object') return result;
    result.first_touch = normalizedTouch(value.first_touch);
    result.latest_registered_paid_touch = normalizedTouch(value.latest_registered_paid_touch);
    result.final_touch = normalizedTouch(value.final_touch);
    result.unresolved_paid_clicks = Array.isArray(value.unresolved_paid_clicks)
      ? value.unresolved_paid_clicks.map(normalizedAssist).filter(Boolean) : [];
    result.prior_paid_touches = Array.isArray(value.prior_paid_touches)
      ? value.prior_paid_touches.map(normalizedTouch).filter(Boolean) : [];
    return result;
  }
  function legacyInputs() {
    return LEGACY_KEYS.map(read).map(normalizedTouch).filter(Boolean)
      .sort(function (left, right) { return Date.parse(left.occurred_at) - Date.parse(right.occurred_at); });
  }
  function registryProvided() { return Array.isArray(root.SnoozePaidTouchRegistry); }
  function policy(referenceAt) {
    return {
      retention_ms: RETENTION_MS,
      reference_at: referenceAt,
      registered_tuples: registryProvided() ? root.SnoozePaidTouchRegistry : []
    };
  }
  function incoming(referenceAt) {
    var result = { occurred_at: referenceAt };
    var found = false;
    try {
      var params = new URLSearchParams(root.location && root.location.search || '');
      UTM_KEYS.concat(['utm_id', 'fbclid', 'gclid']).forEach(function (key) {
        var value = params.get(key);
        if (value !== null && value !== '') { result[key] = value; found = true; }
      });
    } catch (e) {}
    return found ? result : null;
  }
  function serialize(state, registryStatus) {
    return {
      version: 1,
      first_touch: normalizedTouch(state.first_touch),
      latest_registered_paid_touch: normalizedTouch(state.latest_registered_paid_touch),
      final_touch: normalizedTouch(state.final_touch),
      unresolved_paid_clicks: (state.unresolved_paid_clicks || []).map(normalizedAssist).filter(Boolean),
      prior_paid_touches: (state.prior_paid_touches || []).map(normalizedTouch).filter(Boolean),
      registry_status: registryStatus
    };
  }
  function capture() {
    var referenceAt = new Date().toISOString();
    var rules = policy(referenceAt);
    var state = normalizedState(read(STATE_KEY));
    state = applyTouch(state, { occurred_at: referenceAt }, rules);
    legacyInputs().forEach(function (touch) { state = applyTouch(state, touch, rules); });
    var arrival = incoming(referenceAt);
    if (arrival) state = applyTouch(state, arrival, rules);
    var result = serialize(state, registryProvided() ? 'provided' : 'pending_live_registry');
    write(result);
    return result;
  }
  root.SnoozePaidTouchBrowser = {
    capture: capture,
    read: function () {
      var rules = policy(new Date().toISOString());
      var state = normalizedState(read(STATE_KEY));
      state = applyTouch(state, { occurred_at: rules.reference_at }, rules);
      return serialize(state, registryProvided() ? 'provided' : 'pending_live_registry');
    },
    stateKey: STATE_KEY,
    legacyKeys: LEGACY_KEYS
  };
}(window));
}(window));
