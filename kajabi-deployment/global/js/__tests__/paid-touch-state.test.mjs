import assert from 'node:assert/strict';
import {
  applyTouch,
  attributionVerdict,
  emptyTouchState,
  qualifyCampCheckout,
} from '../paid-touch-contract.mjs';

const DAY = 24 * 60 * 60 * 1000;
const policy = {
  reference_at: '2026-09-14T12:00:00.000Z',
  retention_ms: 30 * DAY,
  registered_tuples: [
    { status: 'active', platform: 'meta', campaign_id: 'meta-camp', ad_id: 'meta-1', utm_source: 'meta', utm_medium: 'paid_social', utm_campaign: 'camp-direct-2608', utm_content: 'MetaAd', utm_term: 'Camp' },
    { status: 'active', platform: 'google', campaign_id: 'google-camp', ad_id: 'google-1', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'camp-search', utm_content: 'SearchAd', utm_term: 'sleep consultant' },
  ],
};
const meta = { occurred_at: '2026-09-14T08:00:00.000Z', utm_source: 'meta', utm_medium: 'paid_social', utm_campaign: 'camp-direct-2608', utm_content: 'MetaAd', utm_term: 'Camp', fbc: 'fb.1.click' };
const google = { occurred_at: '2026-09-14T09:00:00.000Z', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'camp-search', utm_content: 'SearchAd', utm_term: 'sleep consultant', gclid: 'google-click' };
const instagram = { occurred_at: '2026-09-14T10:00:00.000Z', utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'link-in-bio', utm_content: 'bio', utm_term: 'organic' };
const direct = { occurred_at: '2026-09-14T11:00:00.000Z' };

function journey(...touches) {
  return touches.reduce((state, touch) => applyTouch(state, touch, policy), emptyTouchState());
}

function expectState(label, state, expected) {
  const verdict = attributionVerdict(state, policy);
  assert.equal(state.first_touch && state.first_touch.utm_source, expected.first, `${label}: first touch`);
  assert.equal(state.latest_registered_paid_touch && state.latest_registered_paid_touch.platform, expected.latestPaid, `${label}: latest paid touch`);
  assert.equal(state.final_touch && state.final_touch.utm_source, expected.final, `${label}: final touch`);
  assert.equal(verdict.paid_assist, expected.assist, `${label}: paid assist`);
  assert.equal(Boolean(verdict.deterministic_paid_credit), expected.deterministic, `${label}: deterministic credit`);
}

function expectCampCheckout(label, eventId) {
  const result = qualifyCampCheckout(
    { event_name: 'camp_checkout_started', event_id: eventId, offer_token: 'camp-aud' },
    { camp_offer_tokens: ['camp-aud'], seen_event_ids: [] },
  );
  assert.deepEqual(
    { qualifies: result.qualifies, reason: result.reason },
    { qualifies: true, reason: 'qualified_camp_checkout' },
    `${label}: optimisation event verdict`,
  );
}

expectState('1 Meta registered then direct checkout', journey(meta, direct), { first: 'meta', latestPaid: 'meta', final: 'meta', assist: false, deterministic: true });
expectCampCheckout('1 Meta registered then direct checkout', 'fixture-1');
expectState('2 Meta registered then Instagram', journey(meta, instagram), { first: 'meta', latestPaid: 'meta', final: 'instagram', assist: true, deterministic: true });
expectCampCheckout('2 Meta registered then Instagram', 'fixture-2');
expectState('3 Google registered plus gclid then direct', journey(google, direct), { first: 'google', latestPaid: 'google', final: 'google', assist: false, deterministic: true });
expectCampCheckout('3 Google registered plus gclid then direct', 'fixture-3');
expectState('4 Organic Instagram only', journey(instagram), { first: 'instagram', latestPaid: null, final: 'instagram', assist: false, deterministic: false });
expectCampCheckout('4 Organic Instagram only', 'fixture-4');
expectState('5 Meta click id without UTM', journey({ occurred_at: meta.occurred_at, fbclid: 'current-meta-click' }), { first: 'meta', latestPaid: null, final: 'meta', assist: true, deterministic: false });
expectCampCheckout('5 Meta click id without UTM', 'fixture-5');
expectState('6 Google click id without UTM', journey({ occurred_at: google.occurred_at, gclid: google.gclid }), { first: 'google', latestPaid: null, final: 'google', assist: true, deterministic: false });
expectCampCheckout('6 Google click id without UTM', 'fixture-6');

const crossPaid = journey(meta, google);
expectState('7 Meta then Google registered', crossPaid, { first: 'meta', latestPaid: 'google', final: 'google', assist: true, deterministic: true });
assert.deepEqual(attributionVerdict(crossPaid, policy).paid_assist_platforms, ['meta']);
expectCampCheckout('7 Meta then Google registered', 'fixture-7');

const boundary = applyTouch(emptyTouchState(), { ...meta, occurred_at: '2026-08-15T12:00:00.000Z' }, policy);
expectState('8a Paid touch at exact retention boundary', boundary, { first: 'meta', latestPaid: 'meta', final: 'meta', assist: false, deterministic: true });
const expired = applyTouch(emptyTouchState(), { ...meta, occurred_at: '2026-08-15T11:59:59.999Z' }, policy);
expectState('8 Paid touch outside retention', expired, { first: null, latestPaid: null, final: null, assist: false, deterministic: false });
expectCampCheckout('8 Paid touch outside retention', 'fixture-8');

const firstCheckout = qualifyCampCheckout({ event_name: 'camp_checkout_started', event_id: 'checkout-1', offer_token: 'camp-aud' }, { camp_offer_tokens: ['camp-aud'], seen_event_ids: [] });
assert.deepEqual({ qualifies: firstCheckout.qualifies, reason: firstCheckout.reason }, { qualifies: true, reason: 'qualified_camp_checkout' }, '9 first Camp checkout qualifies');
const reload = qualifyCampCheckout({ event_name: 'camp_checkout_started', event_id: 'checkout-1', offer_token: 'camp-aud' }, { camp_offer_tokens: ['camp-aud'], seen_event_ids: firstCheckout.seen_event_ids });
assert.deepEqual({ qualifies: reload.qualifies, reason: reload.reason }, { qualifies: false, reason: 'duplicate_event' }, '9 reload does not qualify twice');

const membership = qualifyCampCheckout({ event_name: 'camp_checkout_started', event_id: 'checkout-2', offer_token: 'membership' }, { camp_offer_tokens: ['camp-aud'], seen_event_ids: [] });
assert.deepEqual({ qualifies: membership.qualifies, reason: membership.reason }, { qualifies: false, reason: 'non_camp_offer' }, '10 Membership checkout cannot enter Camp metric');

const outOfOrder = journey(google, meta);
expectState('11 Older event arriving late', outOfOrder, { first: 'google', latestPaid: 'google', final: 'google', assist: true, deterministic: true });
assert.deepEqual(attributionVerdict(outOfOrder, policy).paid_assist_platforms, ['meta']);
expectCampCheckout('11 Older event arriving late', 'fixture-11');

const replayed = applyTouch(journey(meta), meta, policy);
assert.equal(attributionVerdict(replayed, policy).paid_assist, false, 'equal-timestamp replay does not create an assist');

const organicThenCookie = journey(instagram, { occurred_at: '2026-09-14T11:00:00.000Z', fbc: 'persisted-cookie-without-current-click' });
expectState('Persisted fbc on direct reload', organicThenCookie, { first: 'instagram', latestPaid: null, final: 'instagram', assist: false, deterministic: false });

const timedCookie = journey(instagram, { occurred_at: '2026-09-14T11:00:00.000Z', fbc: 'persisted-cookie', click_occurred_at: '2026-09-13T11:00:00.000Z' });
expectState('Timed persisted fbc evidence', timedCookie, { first: 'instagram', latestPaid: null, final: 'instagram', assist: true, deterministic: false });

const ambiguousClicks = journey({ occurred_at: '2026-09-14T11:00:00.000Z', fbclid: 'meta-click', gclid: 'google-click' });
expectState('Simultaneous Meta and Google click IDs', ambiguousClicks, { first: null, latestPaid: null, final: null, assist: true, deterministic: false });
assert.deepEqual(attributionVerdict(ambiguousClicks, policy).paid_assist_platforms, ['google', 'meta']);

const nextWindowPolicy = { ...policy, reference_at: '2026-09-15T12:00:00.000Z' };
const firstAfterExpiry = applyTouch(boundary, { ...instagram, occurred_at: '2026-09-15T12:00:00.000Z' }, nextWindowPolicy);
assert.equal(firstAfterExpiry.first_touch.utm_source, 'instagram', 'expired first touch is pruned before a new journey is established');

assert.throws(() => applyTouch(emptyTouchState(), meta, { ...policy, retention_ms: undefined }), /approved retention policy/);
assert.throws(() => attributionVerdict(crossPaid), /approved retention policy/);
assert.throws(() => applyTouch(emptyTouchState(), { ...meta, occurred_at: '2026-09-14T08:00:00' }, policy), /timezone-qualified UTC/);

const advancedPolicy = { ...policy, reference_at: '2026-10-16T12:00:00.000Z' };
assert.deepEqual(
  attributionVerdict(crossPaid, advancedPolicy),
  { deterministic_paid_credit: null, paid_assist: false, paid_assist_platforms: [], final_touch: null },
  'paid credit, final touch and assists expire as the policy reference time advances',
);

for (const badRegistration of [
  { ...policy.registered_tuples[0], status: 'inactive' },
  { ...policy.registered_tuples[0], platform: 'organic', utm_source: 'organic' },
]) {
  const badPolicy = { ...policy, registered_tuples: [badRegistration] };
  assert.equal(
    attributionVerdict(applyTouch(emptyTouchState(), meta, badPolicy), badPolicy).deterministic_paid_credit,
    null,
    'inactive or nonpaid registry entries fail closed',
  );
}
const duplicatePolicy = { ...policy, registered_tuples: [policy.registered_tuples[0], { ...policy.registered_tuples[0], ad_id: 'duplicate' }] };
assert.equal(
  attributionVerdict(applyTouch(emptyTouchState(), meta, duplicatePolicy), duplicatePolicy).deterministic_paid_credit,
  null,
  'duplicate active registry tuples fail closed',
);
console.log('ME-011 paid touch state fixtures passed.');
