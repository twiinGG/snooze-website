"""Send-time eligibility for inert drafts. No transport and no delivery ledger writes."""
from dataclasses import dataclass
from datetime import datetime, timedelta
from booking_policy import COHORT, CLOSE, Held, instant, require_state

REMINDERS={
    'reminder_tuesday':datetime.fromisoformat('2026-10-06T00:00:00+00:00'),
    'reminder_one_hour':datetime.fromisoformat('2026-10-06T23:00:00+00:00'),
    'reminder_start':datetime.fromisoformat('2026-10-07T00:00:00+00:00'),
}
OPENINGS={'code_opening','waitlist_opening','public_opening'}
SALES=OPENINGS|{'practical_followup','final_day'}
SCHEDULES={
    **REMINDERS,
    'code_opening':datetime.fromisoformat('2026-10-07T21:00:00+00:00'),
    'waitlist_opening':datetime.fromisoformat('2026-10-08T21:00:00+00:00'),
    'public_opening':datetime.fromisoformat('2026-10-11T21:00:00+00:00'),
    'practical_followup':datetime.fromisoformat('2026-10-13T00:00:00+00:00'),
    'final_day':datetime.fromisoformat('2026-10-14T08:00:00+00:00'),
}


@dataclass(frozen=True)
class ContactState:
    contact: str
    observed_at: datetime
    verified: bool
    consent: bool
    registered_at: datetime | None
    teaching_audience: bool
    sales_audience: bool


class DraftAudiencePolicy:
    def __init__(self,booking): self.booking=booking

    def evaluate(self,email_key,contact_state,replay=None):
        now=instant(self.booking.clock())
        contact=contact_state.contact
        age=now-instant(contact_state.observed_at)
        if contact_state.verified is not True or not contact or age<timedelta(0) or age>timedelta(seconds=60):
            raise Held('Verified current consent and contact state required')
        # Read at evaluation time, never reuse an earlier recipient snapshot.
        state=self.booking.read_state();require_state(state,now)
        with self.booking.transaction() as db:
            sent=db.execute('SELECT email_key,opening FROM sent WHERE contact=? AND campaign=?',(contact,COHORT)).fetchall()
            already={r['email_key'] for r in sent}
            pending=db.execute("SELECT 1 FROM reservations WHERE contact=? AND status IN ('in_flight','accepted')",(contact,)).fetchone()
            reason=None
            if email_key in already: reason='duplicate'
            elif email_key in SALES and (contact in state.purchased_contacts or pending): reason='purchased_or_payment_pending'
            elif email_key in SALES and now>=CLOSE: reason='booking_closed'
            elif email_key in OPENINGS and any(r['opening'] for r in sent): reason='prior_opening'
            elif email_key in SCHEDULES and now<SCHEDULES[email_key]: reason='before_absolute_schedule'
            elif email_key in REMINDERS and (contact_state.registered_at is None or instant(contact_state.registered_at)>=SCHEDULES[email_key]): reason='elapsed_at_registration'
            elif email_key=='waitlist_opening' and contact not in state.waitlist_contacts: reason='not_actual_waitlister'
            elif email_key in {'confirmation','replay','code_opening',*REMINDERS} and contact_state.registered_at is None: reason='not_registered'
            elif email_key in SALES and contact_state.consent is not True: reason='no_sales_consent'
            elif email_key in {'public_opening','practical_followup','final_day'} and contact_state.sales_audience is not True: reason='not_sales_audience'
            elif email_key=='invitation' and (contact_state.consent is not True or contact_state.teaching_audience is not True): reason='not_consented_teaching_audience'
            elif email_key=='replay' and (replay is None or not replay.available(now)): reason='replay_not_available'
            elif email_key not in SALES|set(REMINDERS)|{'invitation','confirmation','replay'}: reason='unknown_email'
        return {'eligible_for_draft':reason is None,'reason':reason,'email_actions_enabled':False,'send_at':None,'transport':None}

    def record_delivery(self,*args,**kwargs):
        raise Held('Email delivery and delivery-ledger writes disabled for CFB-002')
