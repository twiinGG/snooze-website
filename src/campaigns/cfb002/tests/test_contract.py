import concurrent.futures
from datetime import datetime,timedelta,timezone
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import threading
import unittest
from urllib.error import HTTPError
from urllib.request import urlopen

HERE=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(HERE))
from booking_policy import BookingPolicy,Held,Offer,TrustedState,CODE_OPEN,WAITLIST_OPEN,PUBLIC_OPEN,CLOSE,COHORT,stage
from audience_policy import ContactState,DraftAudiencePolicy
from replay_lifecycle import ReviewedRecording,ReplayLifecycle
import prepare


class Fixture(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.now=CODE_OPEN;self.purchased=frozenset();self.waitlist=frozenset();self.complete=True;self.cap=15
        # Synthetic credential generated per test. No campaign code in source/artifacts.
        import secrets
        self.code=secrets.token_urlsafe(12)
        self.offers=[Offer('fixture-aud','AUD','recurring',93750,5950,'Monthly automatic renewal; fixture disclosure'),Offer('fixture-usd','USD','recurring',65050,3950,'Monthly automatic renewal; fixture disclosure')]
        self.policy=BookingPolicy(Path(self.temp.name)/'fixture.sqlite',self.offers,hashlib.sha256(self.code.encode()).hexdigest(),self.state,lambda:self.now)
    def state(self): return TrustedState(self.now,self.complete,COHORT,self.purchased,self.waitlist,self.cap,'fixture:verified_ledger')
    def auth(self,contact='fixture-contact',code=None,offer='fixture-aud',request='fixture-request'):
        return self.policy.authorize(contact,offer,self.code if code is None else code,request)
    def begin(self,token,contact='fixture-contact',offer='fixture-aud',attempt='fixture-attempt',code=None):
        return self.policy.begin_payment(token,contact,offer,self.code if code is None else code,attempt)
    def proof(self,attempt):
        return {'verified':True,'contact':'fixture-contact','attempt_id':attempt,'offer_id':'fixture-aud','currency':'AUD','setup_minor':93750,'monthly_minor':5950,'status':'accepted','transaction_id':'fixture-transaction'}
    def contact(self,registered=None,consent=True,sales=True):
        return ContactState('fixture-contact',self.now,True,consent,registered,True,sales)


class BookingTests(Fixture):
    def test_before_and_exact_open(self):
        self.now=CODE_OPEN-timedelta(microseconds=1)
        with self.assertRaises(Held):self.auth()
        self.now=CODE_OPEN;self.assertEqual(self.auth()['currency'],'AUD')
    def test_wrong_missing_code_and_forwarding(self):
        for value in ('', 'fixture-wrong-code'):
            with self.assertRaises(Held):self.auth(code=value)
        result=self.auth(contact='forwarded-code-recipient')
        self.assertIn('token',result)
    def test_client_attendance_and_waitlist_claim_cannot_unlock(self):
        self.now=WAITLIST_OPEN
        with self.assertRaises(Held):self.auth(code='')
        self.waitlist=frozenset({'fixture-contact'});self.assertIn('token',self.auth(code=''))
    def test_friday_before_boundary_and_public_boundary(self):
        self.waitlist=frozenset({'fixture-contact'});self.now=WAITLIST_OPEN-timedelta(microseconds=1)
        with self.assertRaises(Held):self.auth(code='')
        self.now=PUBLIC_OPEN;self.assertIn('token',self.auth(code=''))
    def test_exact_close_no_new_booking(self):
        self.now=CLOSE-timedelta(microseconds=1);self.assertIn('token',self.auth())
        self.now=CLOSE
        with self.assertRaises(Held):self.auth(contact='late',request='late')
        self.assertEqual(stage(CLOSE),'closed')
    def test_stale_tab_payment_after_close_rejected(self):
        self.now=CLOSE-timedelta(minutes=1);token=self.auth()['token'];self.now=CLOSE
        with self.assertRaises(Held):self.begin(token)
    def test_code_rechecked_at_final_payment(self):
        token=self.auth()['token']
        with self.assertRaises(Held):self.begin(token,code='')
        self.assertEqual(self.begin(token)['status'],'in_flight')
    def test_direct_or_wrong_payment_path_rejected(self):
        with self.assertRaises(Held):self.begin('no-authorization')
        for offer in ('one-time','member','multiples','free-grant'):
            with self.assertRaises(Held):self.auth(offer=offer)
        token=self.auth()['token']
        with self.assertRaises(Held):self.begin(token,offer='fixture-usd')
    def test_two_recurring_currencies_full_terms(self):
        for n,offer in enumerate(self.offers):
            result=self.auth(contact=str(n),request=str(n),offer=offer.id)
            self.assertEqual(result['setup_minor'],offer.setup_minor)
            self.assertEqual(result['monthly_minor'],offer.monthly_minor)
            self.assertEqual(result['renewal_terms'],offer.renewal_terms)
    def test_unknown_stale_and_future_state_fail_closed(self):
        self.complete=False
        with self.assertRaises(Held):self.auth()
        self.complete=True
        for delta in (-61,1):
            self.policy.read_state=lambda:TrustedState(self.now+timedelta(seconds=delta),True,COHORT,frozenset(),frozenset(),15,'fixture')
            with self.assertRaises(Held):self.auth()
    def test_last_seat_concurrent_authorization_exactly_one(self):
        self.cap=1
        def attempt(i):
            try:self.auth(contact=f'c{i}',request=f'r{i}');return True
            except Held:return False
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
            self.assertEqual(sum(pool.map(attempt,range(8))),1)
    def test_expired_reservations_release_but_inflight_remains(self):
        self.cap=1;token=self.auth()['token'];self.begin(token)
        self.now+=timedelta(hours=1)
        with self.assertRaises(Held):self.auth(contact='other',request='other')
    def test_expired_authorization_cannot_pay(self):
        token=self.auth()['token'];self.now+=timedelta(minutes=15)
        with self.assertRaises(Held):self.begin(token)
        self.assertIn('token',self.auth(contact='other',request='other'))
    def test_inflight_and_accepted_after_close_preserved(self):
        self.now=CLOSE-timedelta(seconds=1);token=self.auth()['token'];self.begin(token)
        self.now=CLOSE+timedelta(days=1)
        self.complete=False
        self.assertEqual(self.begin(token)['status'],'in_flight')
        self.assertEqual(self.policy.reconcile_payment(token,'fixture-contact','fixture-attempt',self.proof)['status'],'accepted')
        self.assertEqual(self.begin(token)['status'],'accepted')
        self.assertEqual(self.policy.reconcile_payment(token,'fixture-contact','fixture-attempt',lambda _:None)['status'],'accepted')
    def test_provider_outcome_must_match_server_context(self):
        token=self.auth()['token'];self.begin(token)
        for key,value in [('verified',False),('contact','wrong'),('currency','USD'),('offer_id','one-time'),('setup_minor',1),('attempt_id','wrong')]:
            proof=self.proof('fixture-attempt');proof[key]=value
            with self.assertRaises(Held):self.policy.reconcile_payment(token,'fixture-contact','fixture-attempt',lambda _,p=proof:p)
    def test_duplicate_authorization_does_not_double_reserve(self):
        self.auth()
        with self.assertRaises(Held):self.auth()
        with self.policy.transaction() as db:self.assertEqual(db.execute('SELECT COUNT(*) FROM reservations').fetchone()[0],1)
    def test_existing_buyers_not_mutated_or_revoked(self):
        self.purchased=frozenset({'fixture-contact'})
        with self.assertRaises(Held):self.auth()
        self.assertEqual(self.purchased,frozenset({'fixture-contact'}))
    def test_wrong_contact_cannot_use_private_token(self):
        token=self.auth()['token']
        with self.assertRaises(Held):self.begin(token,contact='other')


class AudienceTests(Fixture):
    def setUp(self):super().setUp();self.aud=DraftAudiencePolicy(self.policy)
    def test_purchase_after_snapshot_suppressed_at_evaluation(self):
        old_contact=self.contact(CODE_OPEN-timedelta(days=1))
        self.purchased=frozenset({'fixture-contact'})
        self.assertEqual(self.aud.evaluate('code_opening',old_contact)['reason'],'purchased_or_payment_pending')
    def test_waitlist_opening_requires_actual_waitlist(self):
        self.now=WAITLIST_OPEN
        self.assertEqual(self.aud.evaluate('waitlist_opening',self.contact())['reason'],'not_actual_waitlister')
        self.waitlist=frozenset({'fixture-contact'});self.assertTrue(self.aud.evaluate('waitlist_opening',self.contact())['eligible_for_draft'])
    def test_opening_overlap_deduplicated(self):
        with self.policy.transaction() as db:db.execute('INSERT INTO sent VALUES (?,?,?,?)',('fixture-contact',COHORT,'code_opening',1))
        self.now=PUBLIC_OPEN
        self.assertEqual(self.aud.evaluate('public_opening',self.contact())['reason'],'prior_opening')
    def test_late_registration_skips_elapsed_reminder_one_confirmation(self):
        self.now=datetime.fromisoformat('2026-10-07T00:00:00+00:00')
        contact=self.contact(self.now)
        self.assertEqual(self.aud.evaluate('reminder_tuesday',contact)['reason'],'elapsed_at_registration')
        self.assertTrue(self.aud.evaluate('confirmation',contact)['eligible_for_draft'])
        with self.policy.transaction() as db:db.execute('INSERT INTO sent VALUES (?,?,?,?)',('fixture-contact',COHORT,'confirmation',0))
        self.assertEqual(self.aud.evaluate('confirmation',contact)['reason'],'duplicate')
    def test_no_send_or_ledger_write_can_be_armed(self):
        result=self.aud.evaluate('code_opening',self.contact(CODE_OPEN-timedelta(days=1)))
        self.assertFalse(result['email_actions_enabled']);self.assertIsNone(result['send_at']);self.assertIsNone(result['transport'])
        with self.assertRaises(Held):self.aud.record_delivery()
    def test_stale_consent_fail_closed(self):
        old=self.contact(CODE_OPEN-timedelta(days=1));self.now+=timedelta(seconds=61)
        with self.assertRaises(Held):self.aud.evaluate('code_opening',old)
    def test_sales_consent_and_camp_close(self):
        self.now=PUBLIC_OPEN
        self.assertEqual(self.aud.evaluate('public_opening',self.contact(consent=False))['reason'],'no_sales_consent')
        self.now=CLOSE;self.assertEqual(self.aud.evaluate('final_day',self.contact())['reason'],'booking_closed')


class SourceTests(unittest.TestCase):
    def test_reviewed_email_inventory_and_no_old_attendance(self):
        data=prepare.COPY;self.assertEqual(len(data['emails']),11)
        self.assertEqual(data['title'],'Get better baby sleep: The Sleep Concierge’s successful sleep training method for parents of babies 4 months plus.')
        text=json.dumps(data,ensure_ascii=False)
        for stale in ('verified_session_attendees','How to sleep train your baby','replay alone does not qualify','attendee_sales_url'):self.assertNotIn(stale,text)
        self.assertIn('I’ve helped thousands of families around the world',text)
        self.assertEqual(data['emails'][2]['cta']['label'],'My webinar details')
    def test_all_11_inert_html_drafts_no_fake_links(self):
        with tempfile.TemporaryDirectory() as folder:
            inventory=prepare.write_email_drafts({},Path(folder))
            self.assertEqual(len(inventory),11)
            for item in inventory:
                content=(Path(folder)/Path(item['body_path']).name).read_text()
                self.assertIn('{{first_name}}',content);self.assertNotIn('<style',content);self.assertNotIn('!important',content);self.assertNotIn('href=',content)
                self.assertIn('aria-disabled="true"',content);self.assertFalse(item['enabled']);self.assertIsNone(item['send_at'])
    def test_calendar_timezone_and_october_cutoff(self):
        result=prepare.check_dates();self.assertEqual(result['sales_close'],'2026-10-14T12:59:00+00:00')
        cfg={'room_url':'https://www.joinsnooze.com/verified-fixture-room','room_guest_join_verified':True,'room_guest_privacy_verified':True,'room_observe_only_chat_verified':True}
        cal=prepare.ics(cfg);self.assertIn('DTSTART:20261007T000000Z',cal);self.assertIn('DTEND:20261007T005000Z',cal)
        self.assertTrue(all(len(line.encode())<=75 for line in cal.splitlines()))
    def test_email_render_requires_explicit_draft(self):
        with self.assertRaises(ValueError):prepare.email({},'invitation')
    def test_registration_release_current_bindings_held(self):
        cfg=json.loads((HERE/'resource-bindings.json').read_text())
        with self.assertRaises(ValueError):prepare.check_release(cfg)
    def test_even_real_allocated_url_stays_inert_without_proof(self):
        cfg={'registration_url':'https://www.joinsnooze.com/webinar-2026-10-07'}
        self.assertNotIn('href=',prepare.email(cfg,'invitation',True))

class ReplayTests(Fixture):
    def setUp(self):
        super().setUp();self.life=ReplayLifecycle(lambda:self.now)
        self.media=Path(self.temp.name)/'labelled-fixture.mp4';self.media.write_bytes(b'CFB-002 TEST RECORDING, NOT THE WEBINAR\n'*10)
        self.recording=ReviewedRecording(self.media,hashlib.sha256(self.media.read_bytes()).hexdigest(),True,True,True,True)
    def test_unpublished_empty_or_unreviewed_recording_held(self):
        self.assertFalse(self.life.available())
        with self.assertRaises(Held):self.life.media()
        for recording in (ReviewedRecording(self.media,'incorrect',True,True,True,True),ReviewedRecording(self.media,self.recording.sha256,False,True,True,True),ReviewedRecording(self.media,self.recording.sha256,True,False,True,True)):
            with self.assertRaises(Held):self.life.publish(recording,rehearsal=True)
    def test_test_media_never_published_as_real_webinar(self):
        with self.assertRaises(Held):self.life.publish(self.recording)
    def test_delayed_actual_publication_moves_expiry_not_camp_close(self):
        self.now=datetime.fromisoformat('2026-10-07T12:00:00+00:00')
        self.life.publish(self.recording,rehearsal=True)
        self.assertEqual(self.life.expires_at,self.now+timedelta(hours=72))
        self.assertEqual(CLOSE.isoformat(),'2026-10-14T12:59:00+00:00')
        self.now=self.life.expires_at-timedelta(microseconds=1);self.assertTrue(self.life.available())
        self.now=self.life.expires_at;self.assertFalse(self.life.available())
        with self.assertRaises(Held):self.life.media()
    def test_replay_email_held_before_publication_and_at_expiry(self):
        aud=DraftAudiencePolicy(self.policy);contact=self.contact(CODE_OPEN-timedelta(days=1))
        self.assertEqual(aud.evaluate('replay',contact,self.life)['reason'],'replay_not_available')
        self.life.publish(self.recording,rehearsal=True)
        self.assertTrue(aud.evaluate('replay',contact,self.life)['eligible_for_draft'])
        self.now=self.life.expires_at
        self.assertEqual(aud.evaluate('replay',self.contact(CODE_OPEN-timedelta(days=1)),self.life)['reason'],'replay_not_available')
    def test_expiry_removal_requires_positive_origin_proof(self):
        self.life.publish(self.recording,rehearsal=True);self.now=self.life.expires_at
        with self.assertRaises(Held):self.life.remove_expired(lambda _:False)
        self.assertFalse(self.life.removed)
        def remove(path):path.unlink();return not path.exists()
        self.life.remove_expired(remove);self.assertTrue(self.life.removed)

class OutcomeTests(Fixture):
    def test_verified_failure_releases_capacity_unresolved_keeps_it(self):
        self.cap=1;token=self.auth()['token'];self.begin(token)
        pending=self.proof('fixture-attempt');pending['status']='pending'
        with self.assertRaises(Held):self.policy.reconcile_payment(token,'fixture-contact','fixture-attempt',lambda _:pending)
        with self.assertRaises(Held):self.auth(contact='other',request='other')
        failure=self.proof('fixture-attempt');failure['status']='failed_final'
        self.assertEqual(self.policy.reconcile_payment(token,'fixture-contact','fixture-attempt',lambda _:failure)['status'],'failed')
        self.assertIn('token',self.auth(contact='other',request='other'))
    def test_authorized_reservation_is_not_an_accepted_purchase(self):
        self.auth()
        with self.policy.transaction() as db:
            self.assertEqual(db.execute('SELECT status FROM reservations').fetchone()[0],'authorized')
        self.assertTrue(DraftAudiencePolicy(self.policy).evaluate('code_opening',self.contact(CODE_OPEN-timedelta(days=1)))['eligible_for_draft'])

class FailClosedTypesTests(Fixture):
    def test_trusted_state_rejects_false_like_flags_and_identity_strings(self):
        for flag in ('false',None,0,1):
            self.policy.read_state=lambda f=flag:TrustedState(self.now,f,COHORT,frozenset(),frozenset(),15,'fixture')
            with self.assertRaises(Held):self.auth()
        self.policy.read_state=lambda:TrustedState(self.now,True,COHORT,'not-a-set',frozenset(),15,'fixture')
        with self.assertRaises(Held):self.auth()
    def test_contact_flags_never_accept_false_like_values(self):
        from dataclasses import replace
        aud=DraftAudiencePolicy(self.policy)
        for flag in ('false',None,0,1):
            contact=replace(self.contact(CODE_OPEN-timedelta(days=1)),verified=flag)
            with self.assertRaises(Held):aud.evaluate('code_opening',contact)
            contact=replace(self.contact(CODE_OPEN-timedelta(days=1)),consent=flag)
            self.assertEqual(aud.evaluate('code_opening',contact)['reason'],'no_sales_consent')
    def test_recording_review_flags_require_boolean_true(self):
        from dataclasses import replace
        media=Path(self.temp.name)/'fixture.mp4';media.write_bytes(b'labelled-test-media'*20)
        record=ReviewedRecording(media,hashlib.sha256(media.read_bytes()).hexdigest(),True,True,True,True)
        for field in ('privacy_reviewed','contains_closing_code','clinical_approved'):
            for flag in ('false',None,0,1):
                life=ReplayLifecycle(lambda:self.now)
                with self.assertRaises(Held):life.publish(replace(record,**{field:flag}),rehearsal=True)
    def test_provider_verified_integer_is_not_true(self):
        token=self.auth()['token'];self.begin(token);proof=self.proof('fixture-attempt');proof['verified']=1
        with self.assertRaises(Held):self.policy.reconcile_payment(token,'fixture-contact','fixture-attempt',lambda _:proof)
    def test_renderer_stage_uses_before_open_and_exact_close(self):
        self.assertEqual(stage(CODE_OPEN-timedelta(microseconds=1)),'upcoming')
        self.assertEqual(stage(CODE_OPEN),'code')
        self.assertEqual(stage(WAITLIST_OPEN),'waitlist_and_code')
        self.assertEqual(stage(PUBLIC_OPEN),'public')
        self.assertEqual(stage(CLOSE),'closed')
