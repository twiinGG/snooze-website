#!/usr/bin/env python3
"""Prepare CFB-002 source. No sends, schedules, API calls or canonical writes."""
import argparse
import html
import importlib.util
import json
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlencode, urlparse
from zoneinfo import ZoneInfo

HERE = Path(__file__).resolve().parent
LOCAL = ZoneInfo('Australia/Melbourne')
DATES = {
    'webinar_start': '2026-10-07T11:00:00+11:00',
    'webinar_end': '2026-10-07T11:50:00+11:00',
    'code_open': '2026-10-08T08:00:00+11:00',
    'waitlist_open': '2026-10-09T08:00:00+11:00',
    'public_open': '2026-10-12T08:00:00+11:00',
    'sales_close': '2026-10-14T23:59:00+11:00',
    'planned_replay_publish': '2026-10-07T20:00:00+11:00',
}
COPY = json.loads((HERE / 'campaign-copy.json').read_text())
RELEASE = json.loads((HERE / 'preparation-manifest.json').read_text())


def check_dates():
    parsed = {k: datetime.fromisoformat(v) for k, v in DATES.items()}
    for key, value in parsed.items():
        assert value.astimezone(LOCAL).isoformat() == DATES[key], key
        assert value.utcoffset() == timedelta(hours=11), key
    assert parsed['webinar_end'] - parsed['webinar_start'] == timedelta(minutes=50)
    assert parsed['webinar_start'] < parsed['webinar_end'] < parsed['code_open']
    assert parsed['code_open'] < parsed['waitlist_open'] < parsed['public_open'] < parsed['sales_close']
    assert parsed['sales_close'].astimezone(timezone.utc).isoformat() == '2026-10-14T12:59:00+00:00'
    return {k: v.astimezone(timezone.utc).isoformat() for k, v in parsed.items()}


def resource(config, key):
    value = config.get(key)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f'Missing observed resource: {key}')
    parsed = urlparse(value)
    if parsed.scheme != 'https' or not parsed.netloc or parsed.username or parsed.password:
        raise ValueError(f'Resource must be a real HTTPS URL: {key}')
    if re.search(r'placeholder|example\.(com|org|net)|localhost|YOUR_|[<>]', value, re.I):
        raise ValueError(f'Unresolved resource: {key}')
    return value


def proofs(config, keys):
    missing = [k for k in keys if config.get(k) is not True]
    if missing:
        raise ValueError('Missing behavior proof: ' + ', '.join(missing))


def check_release(config):
    if config.get('email_actions_enabled') is not False or config.get('email_sends_allowed') is not False:
        raise ValueError('All campaign email actions must remain disabled')
    proofs(config, RELEASE['registration_release_required_proofs'])
    for key in ('registration_url', 'thank_you_url', 'room_url'):
        resource(config, key)
    calendar(config)
    native_form(config)
    return {'source_state':'prepared','gate':'passed_declared_proofs','platform_evidence':'required separately','email_actions_enabled':False}


def design():
    path = HERE / 'design/templates.py'
    spec = importlib.util.spec_from_file_location('cfb002_design', path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def native_form(config):
    if not config.get('registration_form_embed_path') or not config.get('registration_form_id'):
        raise ValueError('Native form embed and observed form identity required')
    embed = Path(config['registration_form_embed_path']).expanduser().read_text()
    if str(config['registration_form_id']) not in embed or not re.search(r'<form\b|<script\b|<iframe\b', embed):
        raise ValueError('Native embed must contain the observed form identity')
    if re.search(r'YOUR_|placeholder|example\.com', embed, re.I):
        raise ValueError('Native form embed is unresolved')
    return embed


def registration(config):
    check_release(config)
    return design().registration(COPY, native_form(config))


def calendar(config):
    room = resource(config, 'room_url')
    proofs(config, ['room_guest_join_verified','room_guest_privacy_verified','room_observe_only_chat_verified'])
    description = 'Free webinar with me, Sally. 35 minutes teaching, 5 minutes about Camp Snooze and 10 minutes questions. AEDT (GMT+11).'
    params = {'action':'TEMPLATE','text':COPY['title'],'dates':'20261007T000000Z/20261007T005000Z','ctz':'Australia/Melbourne','details':description+'\n'+room,'location':room}
    return 'https://calendar.google.com/calendar/render?' + urlencode(params)


def thank_you(config):
    return design().joining(COPY, resource(config,'room_url'), calendar(config), config.get('ics_url'))


def replay(config):
    media = resource(config, 'replay_media_url')
    proofs(config, ['replay_publication_reviewed','replay_contains_code_verified','replay_access_removal_verified'])
    published = datetime.fromisoformat(config['replay_published_at'])
    expiry = datetime.fromisoformat(config['replay_expires_at'])
    if published.tzinfo is None or expiry.tzinfo is None or expiry-published != timedelta(hours=72):
        raise ValueError('Replay expiry must be 72 hours after actual offset-aware publication')
    now = datetime.now(timezone.utc)
    if published > now or expiry <= now:
        raise ValueError('Replay is not currently published and available')
    label = expiry.astimezone(LOCAL).strftime('%A %B %d, %Y at %I:%M %p AEDT (GMT+11)').replace(' 0',' ').replace('AM','am').replace('PM','pm')
    return design().replay(COPY, media, label, config.get('code_sales_url'), 'available')


def booking(config):
    proofs(config, RELEASE['sales_release_required_proofs'])
    url = resource(config,'booking_authorization_url')
    offers = config.get('recurring_offer_terms')
    if not isinstance(offers,list) or {o.get('currency') for o in offers} != {'AUD','USD'} or len(offers)!=2:
        raise ValueError('Verified AUD and USD recurring terms required')
    for offer in offers:
        if offer.get('payment_type') != 'recurring' or not offer.get('renewal_terms'):
            raise ValueError('Recurring payment and renewal disclosures required')
        if offer.get('checkout_url') != url:
            raise ValueError('Booking destinations must use verified server authorization route')
    # Server-rendered gate supplied by the supported adapter, never a local JS code comparison.
    from booking_policy import stage
    current = stage(datetime.now(timezone.utc))
    return design().camp_booking(COPY, 'waitlist' if current == 'waitlist_and_code' else current, offers, None)


def email(config, key, draft=False):
    item = next((e for e in COPY['emails'] if e['key']==key),None)
    if item is None:
        raise ValueError(f'Unknown email: {key}')
    if not draft:
        raise ValueError('Email output is allowed only as an inert draft; pass --draft')
    bound = config.get(item['cta']['resource'])
    verified = config.get(item['cta']['resource']+'_verified') is True
    url = resource(config,item['cta']['resource']) if bound and verified else None
    # Missing dependencies are recorded in the sidecar, never guessed in an href.
    attrs = 'font-family:Arial,Helvetica,sans-serif;line-height:1.7;color:#1f293b;max-width:600px;margin:0 auto;padding:20px;'
    paragraph_style = 'margin:0;font-family:Arial,Helvetica,sans-serif;'
    paragraphs = ''.join(f'<p style="{paragraph_style}">{html.escape(t)}</p><br />' for t in item['paragraphs'])
    label=html.escape(item['cta']['label'])
    if url:
        cta=f'<a href="{html.escape(url,quote=True)}" style="display:inline-block;padding:14px 24px;background:#f43357;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">{label}</a>'
    else:
        cta=f'<span aria-disabled="true" style="display:inline-block;padding:14px 24px;background:#e5e7eb;color:#374151;border-radius:8px;font-weight:600;">{label}</span>'
    return f'<div style="{attrs}"><p style="{paragraph_style}">Hi {{{{first_name}}}},</p><br />'+paragraphs+cta+f'<br /><br /><p style="{paragraph_style}">Sally<br />The Sleep Concierge</p></div>\n'


def write_email_drafts(config, output):
    output.mkdir(parents=True,exist_ok=True)
    inventory=[]
    for item in COPY['emails']:
        (output/(item['key']+'.html')).write_text(email(config,item['key'],True))
        verified=config.get(item['cta']['resource']+'_verified') is True
        inventory.append({'key':item['key'],'subject':item['subject'],'preview_text':item['preview'],'body_path':str(Path('copy')/(item['key']+'.html')),'intended_schedule':item['schedule'],'schedule_note':item['schedule_note'],'audience':item['audience'],'enabled':False,'publication_status':'draft','send_at':None,'trigger_armed':False,'cta_resource':item['cta']['resource'],'cta_state':'verified_bound' if verified and config.get(item['cta']['resource']) else 'inert_dependency','recipient_snapshot':None,'send_time_evaluation_required':True,'delivery_verified':False})
    (output/'draft-inventory.json').write_text(json.dumps({'email_sends_allowed':False,'body_path_base':'campaign_source_directory','emails':inventory},ensure_ascii=False,indent=2)+'\n')
    return inventory


def ics(config):
    calendar(config)
    room=resource(config,'room_url')
    def escape(v):
        return v.replace('\\','\\\\').replace('\n','\\n').replace(';','\\;').replace(',','\\,')
    lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Snooze//CFB-002//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:cfb002-webinar-20261007@joinsnooze.com','DTSTAMP:20261005T000000Z','DTSTART:20261007T000000Z','DTEND:20261007T005000Z','SUMMARY:'+escape(COPY['title']),'DESCRIPTION:'+escape('Wednesday October 07, 2026 at 11 am AEDT (GMT+11). Allow 50 minutes. '+room),'LOCATION:'+escape(room),'URL:'+room,'END:VEVENT','END:VCALENDAR']
    folded=[]
    for line in lines:
        while len(line.encode())>75:
            cut=75
            while len(line[:cut].encode())>75: cut-=1
            folded.append(line[:cut]); line=' '+line[cut:]
        folded.append(line)
    return '\r\n'.join(folded)+'\r\n'


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check-dates',action='store_true')
    parser.add_argument('--check-release',action='store_true')
    parser.add_argument('--render-email-drafts',action='store_true')
    parser.add_argument('--draft',action='store_true')
    parser.add_argument('--resources',type=Path,default=HERE/'resource-bindings.json')
    parser.add_argument('--asset')
    parser.add_argument('--output',type=Path)
    args=parser.parse_args()
    try:
        if args.check_dates: print(json.dumps(check_dates(),indent=2));return
        config=json.loads(args.resources.read_text())
        if args.check_release: print(json.dumps(check_release(config),indent=2));return
        if args.render_email_drafts:
            inventory=write_email_drafts(config,args.output or HERE/'copy')
            print(f'Prepared {len(inventory)} inert drafts. No send schedule or delivery claim.');return
        if not args.asset or not args.output: parser.error('--asset and --output required')
        if args.asset.startswith('email:'): rendered=email(config,args.asset.split(':',1)[1],args.draft)
        else:
            renderer={'registration':registration,'thank-you':thank_you,'replay':replay,'calendar':ics,'booking':booking}.get(args.asset)
            if not renderer: raise ValueError('Unknown asset')
            rendered=renderer(config)
        args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_text(rendered)
        print(f'Prepared {args.output}. Platform publication and verification remain separate.')
    except (ValueError,KeyError,OSError) as error:
        parser.exit(1,f'Release held: {error}\n')


if __name__=='__main__': main()
