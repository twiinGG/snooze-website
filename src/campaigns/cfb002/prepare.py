#!/usr/bin/env python3
"""Render local CFB-002 assets only after required observed resources are supplied."""

import argparse
import html
import json
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlencode, urlparse
from zoneinfo import ZoneInfo

HERE = Path(__file__).resolve().parent
APP = HERE.parents[2]
LOCAL = ZoneInfo("Australia/Melbourne")
DATES = {
    "webinar_start": "2026-10-07T11:00:00+11:00",
    "webinar_end": "2026-10-07T11:50:00+11:00",
    "attendee_open": "2026-10-08T08:00:00+11:00",
    "waitlist_open": "2026-10-09T08:00:00+11:00",
    "public_open": "2026-10-12T08:00:00+11:00",
    "sales_close": "2026-10-14T23:59:00+11:00",
    "planned_replay_publish": "2026-10-07T20:00:00+11:00",
    "planned_replay_expiry": "2026-10-10T20:00:00+11:00",
}
COPY = json.loads((HERE / "campaign-copy.json").read_text())
RELEASE = json.loads((HERE / "preparation-manifest.json").read_text())


def check_dates():
    parsed = {key: datetime.fromisoformat(value) for key, value in DATES.items()}
    for key, value in parsed.items():
        assert value.astimezone(LOCAL).isoformat() == DATES[key], key
        assert value.utcoffset() == timedelta(hours=11), key
    assert parsed["webinar_end"] - parsed["webinar_start"] == timedelta(minutes=50)
    assert parsed["webinar_start"] < parsed["webinar_end"] < parsed["attendee_open"]
    assert parsed["attendee_open"] < parsed["waitlist_open"] < parsed["public_open"] < parsed["sales_close"]
    assert parsed["sales_close"].astimezone(timezone.utc).isoformat() == "2026-10-14T12:59:00+00:00"
    assert parsed["planned_replay_expiry"] - parsed["planned_replay_publish"] == timedelta(hours=72)
    assert datetime(2026, 10, 19, tzinfo=LOCAL).weekday() == 0
    return {key: value.astimezone(timezone.utc).isoformat() for key, value in parsed.items()}


def resource(config, key):
    value = config.get(key)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"Missing observed resource: {key}")
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.netloc or parsed.username or parsed.password:
        raise ValueError(f"Resource must be a real HTTPS URL: {key}")
    if re.search(r"placeholder|example\.(com|org|net)|localhost|YOUR_|[<>]", value, re.I):
        raise ValueError(f"Unresolved resource: {key}")
    return value


def check_release(config):
    missing = [key for key in RELEASE["registration_release_required_proofs"] if config.get(key) is not True]
    if missing:
        raise ValueError("Registration release proof is missing: " + ", ".join(missing))
    for key in ["registration_url", "thank_you_url", "room_url"]:
        resource(config, key)
    calendar(config)
    registration(config)
    return {"source_state": "prepared", "registration_release_gate": "passed_declared_proofs", "live_state": "see_root_resource_map_and_qa"}


def style(wrapper):
    # Landing pages own their theme. Include the complete initialization before page rules.
    reference = APP / "kajabi-deployment/pages/landing/masterclass-replay/masterclass-replay.css"
    initial = reference.read_text().split("/* ---------------------------------------------------------------------------\n   Page rules", 1)[0]
    initial = initial.replace("#masterclass-replay-page", f"#{wrapper}")
    initial = initial.replace(f"#{wrapper} .snooze-footer", f"#{wrapper} .snooze-footer-clean")
    initial += f"\n#{wrapper} .hero-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 30px; align-items: center; }}\n"
    theme = (APP / "kajabi-deployment/global/css/theme-custom-code.css").read_text()
    footer_start = theme.index("   .snooze-footer-clean {")
    footer_end = theme.index("\n   footer {", footer_start)
    footer_css = theme[footer_start:footer_end]
    # Scope the canonical footer CSS within this independent landing page.
    footer_css = re.sub(r"(?m)^(\s*)(\.sf-[\w-]+|\.snooze-footer-clean)", rf"\1#{wrapper} \2", footer_css)
    page = f"""
#{wrapper} .cfb-lead {{ font-size: 1.15rem; max-width: 720px; margin: 20px auto; }}
#{wrapper} .cfb-meta {{ color: var(--c-coral); font-weight: 600; }}
#{wrapper} .cfb-content {{ max-width: 760px; }}
#{wrapper} .cfb-content p {{ margin: 0 0 20px; }}
#{wrapper} .cfb-player {{ width: 100%; aspect-ratio: 16 / 9; border: 0; }}
#{wrapper} .snooze-footer-clean h4 {{ color: var(--c-coral); }}
#{wrapper} .snooze-footer-clean a {{ color: var(--sn-text-light); }}
#{wrapper} .snooze-footer-clean a:hover {{ color: var(--sn-coral); }}
"""
    return "<style>\n/* System Initialization */\n" + initial + footer_css + "\n/* Page-specific styles */\n" + page + "</style>\n"


def button(url, label, extra=""):
    return f'<a class="btn" href="{html.escape(url, quote=True)}" {extra}>{html.escape(label)}</a>'


def page(wrapper, eyebrow, title, body):
    footer = (APP / "kajabi-deployment/global/html/footer.html").read_text()
    return style(wrapper) + f'''<div id="{wrapper}">
<section class="hero-wrap"><div class="snooze-container text-center max-800">
<p class="cfb-meta">{html.escape(eyebrow)}</p><h1>{html.escape(title)}</h1>
</div></section>
<section class="snooze-section bg-white"><div class="snooze-container cfb-content">
{body}
</div></section>
{footer}
</div>
'''


def registration(config):
    embed_path = config.get("registration_form_embed_path")
    form_id = config.get("registration_form_id")
    if not embed_path or not form_id:
        raise ValueError("Registration needs observed registration_form_id and registration_form_embed_path")
    embed = Path(embed_path).expanduser().read_text()
    if str(form_id) not in embed or not re.search(r"<form\b|<script\b|<iframe\b", embed):
        raise ValueError("Native form embed must contain the observed form identity")
    if re.search(r"YOUR_|placeholder|example\.com", embed, re.I):
        raise ValueError("Native form embed is unresolved")
    body = '''<p class="cfb-meta">Free webinar. Wednesday October 07, 2026 at 11 am Melbourne time.</p>
<p class="cfb-lead">Join Sally for a practical starting point for parents of babies 4 months plus. Allow 50 minutes.</p>
<p>Sally is an internationally certified sleep consultant and former paediatric nurse.</p>
<p>We'll spend 35 minutes on teaching, 5 minutes introducing Camp Snooze and 10 minutes on questions. Camp Snooze starts Monday October 19.</p>
<h2>Register for this session</h2>
<p>Use the email address you'll join with. Your confirmation will include joining and calendar details.</p>
''' + embed + '''
<p>People who attend the live session can book Camp from Thursday October 08 at 8 am Melbourne time. Waitlisters can book from Friday October 09 at 8 am. Public booking opens Monday October 12 at 8 am.</p>
<p>Registering or watching the replay alone does not qualify for Thursday access. Camp bookings close Wednesday October 14 at 11:59 pm Melbourne time, unless places fill first.</p>'''
    return page("cfb002-registration-page", "Free webinar with Sally", COPY["title"], body)


def calendar(config):
    room = resource(config, "room_url")
    if config.get("room_guest_join_verified") is not True:
        raise ValueError("Room guest joining must be verified before rendering a calendar or joining page")
    description = "Free webinar with Sally. 35 minutes teaching, 5 minutes about Camp Snooze and 10 minutes questions. Join using your registration email."
    params = {"action": "TEMPLATE", "text": COPY["title"], "dates": "20261007T000000Z/20261007T005000Z", "ctz": "Australia/Melbourne", "details": description + "\n" + room, "location": room}
    return "https://calendar.google.com/calendar/render?" + urlencode(params)


def thank_you(config):
    room = resource(config, "room_url")
    calendar_url = calendar(config)
    body = '''<p class="cfb-lead">You're registered for Wednesday October 07, 2026 at 11 am Melbourne time. We'll finish at 11:50 am.</p>
<p>Your confirmation email has your joining details. If your form asks you to confirm your email, please complete that step.</p>
''' + button(calendar_url, "Add to Google Calendar", 'target="_blank" rel="noopener"') + "<br /><br />" + button(room, "Join the webinar", 'target="_blank" rel="noopener"') + '''
<h2>Joining the session</h2>
<p>Use the email address you registered with. If your meeting account uses a different email, contact us so we can reconcile your attendance.</p>
<p>Allow 50 minutes for teaching, a short introduction to Camp Snooze and questions.</p>
<p>People who attend this session can book Camp from Thursday October 08 at 8 am Melbourne time. Registering or watching the replay alone does not qualify for that early access.</p>
<p>Camp starts Monday October 19. Bookings close Wednesday October 14 at 11:59 pm Melbourne time, unless places fill first.</p>
<p><a href="/contact">Contact us about joining or attendance</a></p>'''
    return page("cfb002-thank-you-page", "Your registration is confirmed", "Your webinar joining details", body)


def replay(config):
    replay_url = resource(config, "replay_media_url")
    if config.get("replay_publication_reviewed") is not True:
        raise ValueError("Replay needs recording/privacy review before rendering")
    if not isinstance(config.get("replay_published_at"), str) or not isinstance(config.get("replay_expires_at"), str):
        raise ValueError("Replay needs actual publication and expiry timestamps")
    published = datetime.fromisoformat(config["replay_published_at"])
    expiry = datetime.fromisoformat(config["replay_expires_at"])
    if published.tzinfo is None or expiry.tzinfo is None or expiry - published != timedelta(hours=72):
        raise ValueError("Replay expiry must be exactly 72 hours after actual offset-aware publication")
    local_expiry = expiry.astimezone(LOCAL)
    expiry_label = local_expiry.strftime("%A %B %d, %Y at %I:%M %p").replace(" 0", " ").replace("AM", "am").replace("PM", "pm")
    body = '<p class="cfb-lead">Watch Sally\'s webinar for parents of babies 4 months plus.</p>'
    body += f'<p>Available until {html.escape(expiry_label)} Melbourne time.</p>'
    body += f'<iframe class="cfb-player" src="{html.escape(replay_url, quote=True)}" title="Sally\'s baby sleep webinar replay" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>'
    body += '''<h2>Camp Snooze starts Monday October 19</h2>
<p>People who attended the live session can book from Thursday October 08 at 8 am Melbourne time. Waitlisters can book from Friday October 09 at 8 am. Public booking opens Monday October 12 at 8 am.</p>
<p>Watching the replay alone does not qualify for Thursday access. Your email will provide the right booking route when your access opens.</p>
<p>Bookings close Wednesday October 14 at 11:59 pm Melbourne time, unless places fill first.</p>'''
    return page("cfb002-replay-page", "Your webinar replay", COPY["title"], body)


def email(config, key):
    item = next((item for item in COPY["emails"] if item["key"] == key), None)
    if item is None:
        raise ValueError(f"Unknown email: {key}")
    url = resource(config, item["cta"]["resource"])
    if item["cta"]["resource"] in {"room_url", "thank_you_url"}:
        calendar(config)
    if key == "replay":
        replay(config)
    paragraphs = ''.join(f'<p>{html.escape(text)}</p>' for text in item["paragraphs"])
    cta = f'<p><a href="{html.escape(url, quote=True)}" style="display:inline-block;padding:14px 24px;background:#f43357;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">{html.escape(item["cta"]["label"])}</a></p>'
    return '<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.7;color:#1f293b;max-width:600px;margin:0 auto;padding:20px;"><p>Hi {{first_name}},</p>' + paragraphs + '<br />' + cta + '<br /><p>Sally<br />The Sleep Concierge</p></div>\n'


def ics(config):
    calendar(config)
    room = resource(config, "room_url")
    def escape(value):
        return value.replace("\\", "\\\\").replace("\n", "\\n").replace(";", "\\;").replace(",", "\\,")
    lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Snooze//CFB-002//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", "UID:cfb002-webinar-20261007@joinsnooze.com", "DTSTAMP:20261005T000000Z", "DTSTART:20261007T000000Z", "DTEND:20261007T005000Z", "SUMMARY:" + escape(COPY["title"]), "DESCRIPTION:" + escape("Wednesday October 07 at 11 am Melbourne time. Allow 50 minutes. Join using your registration email. " + room), "LOCATION:" + escape(room), "URL:" + room, "END:VEVENT", "END:VCALENDAR"]
    folded = []
    for line in lines:
        while len(line.encode("utf-8")) > 75:
            cut = 75
            while len(line[:cut].encode("utf-8")) > 75:
                cut -= 1
            folded.append(line[:cut])
            line = " " + line[cut:]
        folded.append(line)
    return "\r\n".join(folded) + "\r\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check-dates", action="store_true")
    parser.add_argument("--check-release", action="store_true", help="Check declared registration release proofs; does not perform live checks")
    parser.add_argument("--resources", type=Path)
    parser.add_argument("--asset", help="registration, thank-you, replay, calendar or email:<key>")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    checks = check_dates()
    if args.check_dates:
        print(json.dumps({"timezone": "Australia/Melbourne", "utc": checks}, indent=2))
        return
    if args.check_release:
        if not args.resources:
            parser.error("--resources is required for --check-release")
        try:
            print(json.dumps(check_release(json.loads(args.resources.read_text())), indent=2))
        except (ValueError, KeyError, OSError) as error:
            parser.exit(1, f"Release held: {error}\n")
        return
    if not args.resources or not args.asset or not args.output:
        parser.error("--resources, --asset and --output are required to render")
    config = json.loads(args.resources.read_text())
    try:
        if args.asset.startswith("email:"):
            rendered = email(config, args.asset.split(":", 1)[1])
        else:
            renderer = {"registration": registration, "thank-you": thank_you, "replay": replay, "calendar": ics}.get(args.asset)
            if renderer is None:
                raise ValueError("Unknown asset")
            rendered = renderer(config)
    except (ValueError, KeyError, OSError) as error:
        parser.exit(1, f"Preparation stopped: {error}\nNo asset was written.\n")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(rendered)
    print(f"Prepared {args.output}. Publication, scheduling and delivery remain separate checks.")


if __name__ == "__main__":
    main()
