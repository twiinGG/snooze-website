"""Local executable policy contract. Not wired to Kajabi or deployed payment enforcement.

Only a registered server adapter may call this with authenticated contact identity,
verified commerce/waitlist state, server time and provider-verified outcomes. SQLite
is a fixture transaction adapter; no canonical schema or production writes here.
"""
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
import hashlib
import hmac
import secrets
import sqlite3

UTC=timezone.utc
CODE_OPEN=datetime(2026,10,7,21,tzinfo=UTC)
WAITLIST_OPEN=datetime(2026,10,8,21,tzinfo=UTC)
PUBLIC_OPEN=datetime(2026,10,11,21,tzinfo=UTC)
CLOSE=datetime(2026,10,14,12,59,tzinfo=UTC)
COHORT='2026-10-19'


class Held(ValueError):
    """Fail closed. Do not reveal whether the contact or code exists."""


@dataclass(frozen=True)
class TrustedState:
    observed_at: datetime
    complete: bool
    cohort: str
    purchased_contacts: frozenset
    waitlist_contacts: frozenset
    seat_cap: int
    source: str


@dataclass(frozen=True)
class Offer:
    id: str
    currency: str
    payment_type: str
    setup_minor: int
    monthly_minor: int
    renewal_terms: str


def instant(now):
    if not isinstance(now,datetime) or now.tzinfo is None:
        raise Held('Offset-aware server time required')
    return now.astimezone(UTC)


def require_state(state,now):
    if not isinstance(state,TrustedState) or state.complete is not True or state.cohort!=COHORT or not state.source:
        raise Held('Verified complete cohort state unavailable')
    age=instant(now)-instant(state.observed_at)
    if age < timedelta(0) or age > timedelta(seconds=60):
        raise Held('Cohort state is stale')
    if type(state.purchased_contacts) is not frozenset or type(state.waitlist_contacts) is not frozenset or any(not isinstance(c,str) or not c for c in state.purchased_contacts|state.waitlist_contacts):
        raise Held('Typed complete cohort identities required')
    if type(state.seat_cap) is not int or state.seat_cap<1:
        raise Held('Confirmed capacity unavailable')


def stage(now):
    now=instant(now)
    if now<CODE_OPEN: return 'upcoming'
    if now>=CLOSE: return 'closed'
    if now>=PUBLIC_OPEN: return 'public'
    if now>=WAITLIST_OPEN: return 'waitlist_and_code'
    return 'code'


class BookingPolicy:
    def __init__(self,database,offers,code_digest,state_reader,clock=lambda:datetime.now(UTC)):
        if len(offers)!=2 or {o.currency for o in offers}!={'AUD','USD'} or any(o.payment_type!='recurring' or not isinstance(o.id,str) or not o.id or type(o.setup_minor) is not int or type(o.monthly_minor) is not int or o.setup_minor<=0 or o.monthly_minor<=0 or not isinstance(o.renewal_terms,str) or not o.renewal_terms for o in offers):
            raise Held('Exactly two verified recurring offers and full disclosures required')
        if len({o.id for o in offers})!=2:
            raise Held('Unique offer identities required')
        if not isinstance(code_digest,str) or len(code_digest)!=64:
            raise Held('Private shared-code digest required')
        self.database=str(database);self.offers={o.id:o for o in offers}
        self.code_digest=code_digest;self.read_state=state_reader;self.clock=clock
        with self.transaction() as db:
            db.execute('CREATE TABLE IF NOT EXISTS reservations (token_hash TEXT PRIMARY KEY, contact TEXT NOT NULL, request_key TEXT NOT NULL UNIQUE, offer_id TEXT NOT NULL, currency TEXT NOT NULL, setup INTEGER NOT NULL, monthly INTEGER NOT NULL, terms TEXT NOT NULL, authorized_at TEXT NOT NULL, expires_at TEXT NOT NULL, status TEXT NOT NULL, attempt TEXT UNIQUE, accepted_transaction TEXT UNIQUE)')
            db.execute('CREATE TABLE IF NOT EXISTS sent (contact TEXT NOT NULL, campaign TEXT NOT NULL, email_key TEXT NOT NULL, opening INTEGER NOT NULL, PRIMARY KEY(contact,campaign,email_key))')

    @contextmanager
    def transaction(self):
        db=sqlite3.connect(self.database,timeout=10,isolation_level=None)
        db.row_factory=sqlite3.Row
        try:
            db.execute('BEGIN IMMEDIATE')
            yield db
            db.execute('COMMIT')
        except BaseException:
            db.execute('ROLLBACK');raise
        finally: db.close()

    def eligible(self,contact,code,state,now):
        require_state(state,now)
        if not isinstance(contact,str) or not contact:
            raise Held('Authenticated contact required')
        current=stage(now)
        if current in ('upcoming','closed'): raise Held('Booking unavailable')
        if contact in state.purchased_contacts: raise Held('Existing purchase protected')
        valid_code=isinstance(code,str) and hmac.compare_digest(hashlib.sha256(code.encode()).hexdigest(),self.code_digest)
        if current=='public': return
        if valid_code: return  # Forwarding accepted. Code carries no attendance/identity claim.
        if current=='waitlist_and_code' and contact in state.waitlist_contacts: return
        raise Held('Booking unavailable')

    def authorize(self,contact,offer_id,code,request_key):
        now=instant(self.clock());state=self.read_state()
        self.eligible(contact,code,state,now)
        if offer_id not in self.offers: raise Held('Campaign payment path unavailable')
        if not isinstance(request_key,str) or not request_key: raise Held('Idempotency key required')
        offer=self.offers[offer_id]
        with self.transaction() as db:
            db.execute("UPDATE reservations SET status='expired' WHERE status='authorized' AND expires_at<=?",(now.isoformat(),))
            prior=db.execute('SELECT * FROM reservations WHERE request_key=?',(request_key,)).fetchone()
            if prior: raise Held('Repeated authorization: use existing private token')
            active=db.execute("SELECT contact FROM reservations WHERE status IN ('authorized','in_flight','accepted')").fetchall()
            contacts=state.purchased_contacts|frozenset(r['contact'] for r in active)
            if contact in contacts: raise Held('Existing or pending purchase protected')
            if len(contacts)>=state.seat_cap: raise Held('Cohort full')
            token=secrets.token_urlsafe(32)
            db.execute('INSERT INTO reservations VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',(hashlib.sha256(token.encode()).hexdigest(),contact,request_key,offer.id,offer.currency,offer.setup_minor,offer.monthly_minor,offer.renewal_terms,now.isoformat(),(now+timedelta(minutes=15)).isoformat(),'authorized',None,None))
        return {'token':token,'currency':offer.currency,'setup_minor':offer.setup_minor,'monthly_minor':offer.monthly_minor,'renewal_terms':offer.renewal_terms,'expires_at':(now+timedelta(minutes=15)).isoformat()}

    def reservation(self,db,token,contact):
        if not isinstance(token,str): raise Held('Authorization required')
        row=db.execute('SELECT * FROM reservations WHERE token_hash=?',(hashlib.sha256(token.encode()).hexdigest(),)).fetchone()
        if not row or row['contact']!=contact: raise Held('Authorization required')
        return row

    def begin_payment(self,token,contact,offer_id,code,attempt_id):
        """Must run at the irreversible provider payment boundary, not only page load."""
        now=instant(self.clock())
        if offer_id not in self.offers or not attempt_id: raise Held('Payment context unavailable')
        with self.transaction() as db:
            row=self.reservation(db,token,contact)
            if row['offer_id']!=offer_id: raise Held('Payment path mismatch')
            if row['status'] in ('in_flight','accepted') and row['attempt']==attempt_id:
                return {'status':row['status'],'attempt_id':attempt_id,'offer_id':offer_id}
            state=self.read_state()
            self.eligible(contact,code,state,now)
            if row['status']!='authorized' or datetime.fromisoformat(row['expires_at'])<=now or row['offer_id']!=offer_id:
                raise Held('Payment authorization expired or mismatched')
            offer=self.offers[offer_id]
            if (row['setup'],row['monthly'],row['currency'],row['terms'])!=(offer.setup_minor,offer.monthly_minor,offer.currency,offer.renewal_terms):
                raise Held('Payment terms changed; new consent required')
            other=db.execute("SELECT contact FROM reservations WHERE status IN ('in_flight','accepted')").fetchall()
            if len(state.purchased_contacts|frozenset(r['contact'] for r in other))>=state.seat_cap:
                raise Held('Cohort full')
            db.execute("UPDATE reservations SET status='in_flight',attempt=? WHERE token_hash=?",(attempt_id,row['token_hash']))
            return {'status':'in_flight','attempt_id':attempt_id,'offer_id':offer_id,'currency':row['currency'],'setup_minor':row['setup'],'monthly_minor':row['monthly']}

    def reconcile_payment(self,token,contact,attempt_id,provider_reader):
        """Fetch back via adapter. Never trust a client success flag/webhook alone.

        Already in-flight payments retain their capacity slot after close. A verified
        final failure releases it. Ambiguous results remain held for reconciliation.
        """
        with self.transaction() as db:
            row=self.reservation(db,token,contact)
            if row['attempt']!=attempt_id: raise Held('Payment attempt mismatch')
            if row['status']=='accepted': return {'status':'accepted','transaction_id':row['accepted_transaction']}
            if row['status']!='in_flight': raise Held('Payment was not initiated')
            proof=provider_reader(attempt_id)
            expected={'verified':True,'contact':contact,'attempt_id':attempt_id,'offer_id':row['offer_id'],'currency':row['currency'],'setup_minor':row['setup'],'monthly_minor':row['monthly']}
            if not isinstance(proof,dict) or proof.get('verified') is not True or any(proof.get(k)!=v for k,v in expected.items()):
                raise Held('Verified payment outcome unavailable')
            if proof.get('status')=='accepted' and proof.get('transaction_id'):
                db.execute("UPDATE reservations SET status='accepted',accepted_transaction=? WHERE token_hash=?",(proof['transaction_id'],row['token_hash']))
                return {'status':'accepted','transaction_id':proof['transaction_id']}
            if proof.get('status')=='failed_final':
                db.execute("UPDATE reservations SET status='failed' WHERE token_hash=?",(row['token_hash'],));return {'status':'failed'}
            raise Held('Payment outcome pending; reservation protected')
