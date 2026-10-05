"""CFB-002 presentation only. prepare.py owns resource and release validation.

No template authorises a booking, validates a code or arms an email action.
The canonical footer is read at render time, never maintained as a second copy.
"""

from html import escape
from pathlib import Path
import re
from urllib.parse import urlparse

HERE = Path(__file__).resolve().parent
APP = HERE.parents[3]
PORTRAIT = "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2163331541/settings_images/d2fd0d-c6d4-0e1-01ad-1b846f205d8f_0d8c4d39-2879-4edf-a15a-152aea38e84f.png"


def safe_url(value):
    if not isinstance(value, str):
        raise ValueError("An observed destination is required")
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password:
        raise ValueError("Destination must use HTTPS")
    return escape(value, quote=True)


def link(url, label, secondary=False):
    return f'<a class="btn{" btn-outline" if secondary else ""}" href="{safe_url(url)}">{escape(label)}</a>'


def shell(kind, content):
    wrapper = f"cfb002-{kind}-page"
    css = (HERE / "pages.css").read_text().replace("#CFB_PAGE", f"#{wrapper}")
    theme = (APP / "kajabi-deployment/global/css/theme-custom-code.css").read_text()
    start = theme.index("   .snooze-footer-clean {")
    end = theme.index("\n   footer {", start)
    footer_css = re.sub(r"(?m)^(\s*)(\.sf-[\w-]+|\.snooze-footer-clean)", rf"\1#{wrapper} \2", theme[start:end])
    footer = (APP / "kajabi-deployment/global/html/footer.html").read_text()
    return f'''<style>{css}\n{footer_css}\n/* Scoped accessibility contrast and wrapping overrides. */
#{wrapper} .sf-bottom p {{ color: #b8c3d1; }}
#{wrapper} .sf-heading {{ color: #ff7892 !important; }}
#{wrapper} .sf-grid {{ overflow-wrap: anywhere; }}
</style>
<div id="{wrapper}">
<a class="cfb-skip" href="#cfb-main">Skip to content</a>
<header class="cfb-header"><div class="snooze-container"><a class="cfb-wordmark" href="https://www.joinsnooze.com/" aria-label="Snooze home">snooze.</a><span class="cfb-header-note">With Sally, The Sleep Concierge</span></div></header>
<main id="cfb-main">{content}</main>
{footer}
</div>
<script>(function(){{const root=document.getElementById("{wrapper}");const logo=root.querySelector(".sf-logo a");if(logo)logo.setAttribute("aria-label","Snooze home");root.querySelectorAll(".sf-heading").forEach(function(heading){{heading.setAttribute("aria-level","2");}});}})();</script>'''


def notice(title, message):
    return f'<div class="cfb-notice" role="status"><span class="cfb-status-dot" aria-hidden="true"></span><div><p class="cfb-notice-title"><strong>{escape(title)}</strong></p><p>{escape(message)}</p></div></div>'


def schedule():
    return '''<ol class="steps-grid cfb-schedule">
<li class="step-card"><span class="cfb-step-number">01</span><h3>Webinar code</h3><p>Thursday October 08<br><strong>8 am AEDT (GMT+11)</strong></p><p>Use the code I share at the end of the webinar or in the released recording.</p></li>
<li class="step-card"><span class="cfb-step-number">02</span><h3>Camp waitlist</h3><p>Friday October 09<br><strong>8 am AEDT (GMT+11)</strong></p><p>Booking opens for families already on my Camp waitlist.</p></li>
<li class="step-card"><span class="cfb-step-number">03</span><h3>Public booking</h3><p>Monday October 12<br><strong>8 am AEDT (GMT+11)</strong></p><p>Everyone can book if places remain.</p></li>
</ol><p class="cfb-cutoff">All dates are in 2026. Bookings close Wednesday October 14, 2026 at exactly 11:59 pm AEDT (GMT+11), unless places fill first.</p>'''


def registration(copy, embed_html=None):
    title = escape(copy["title"])
    title_html = title.replace("Get better baby sleep:", 'Get better<br>baby sleep:<span class="cfb-title-detail">', 1) + ("</span>" if title.startswith("Get better baby sleep:") else "")
    form = embed_html or notice("Registration is not open yet", "I’m getting the joining details ready. Please check back before registering.")
    content = f'''<section class="hero-wrap"><div class="snooze-container hero-grid">
<div><p class="cfb-eyebrow">My free webinar · Babies 4 months plus</p><h1>{title_html}</h1><p class="cfb-lead">I’ve helped thousands of families around the world. Join me for a practical starting point for better baby sleep.</p>
<div class="cfb-date"><span class="cfb-calendar-day" aria-hidden="true">OCT<strong>07</strong></span><p><strong>Wednesday October 07, 2026</strong><br>11 to 11:50 am AEDT (GMT+11)</p></div>
<a class="btn" href="#cfb-register">{"Register for the free webinar" if embed_html else "View registration details"}</a></div>
<figure class="cfb-portrait"><img src="{PORTRAIT}" alt="Sally, The Sleep Concierge" width="600" height="600" fetchpriority="high"><figcaption>Sally <span>The Sleep Concierge</span></figcaption></figure>
</div></section>
<section class="snooze-section bg-white"><div class="snooze-container cfb-two-col"><div><p class="cfb-eyebrow">What I’ll cover</p><h2>A clear plan for<br>the days and nights.</h2><p>I’ll explain how the daytime routine connects to overnight sleep, where sleep training fits and how to approach changes with a clear plan.</p><p>I’ll also introduce Camp Snooze and explain the support available as you put the plan into practice.</p>
<dl class="cfb-agenda"><div><dt>35 min</dt><dd>My teaching</dd></div><div><dt>5 min</dt><dd>Camp Snooze introduction</dd></div><div><dt>10 min</dt><dd>Your questions</dd></div></dl></div>
<div class="cfb-form-panel" id="cfb-register"><p class="cfb-eyebrow">Wednesday October 07</p><h2>{"Save your place" if embed_html else "Your free session"}</h2><p>{"Register below to receive your joining details." if embed_html else "Allow 50 minutes. My webinar is for parents of babies 4 months plus."}</p><div class="cfb-native-form">{form}</div><p class="cfb-small">I’ll introduce Camp Snooze during the session. Camp starts Monday October 19, 2026.</p></div></div></section>
<section class="snooze-section"><div class="snooze-container"><div class="cfb-section-intro"><p class="cfb-eyebrow">If you’d like more support</p><h2>Camp Snooze starts October 19.</h2><p>I’ll share the early booking code at the end of the webinar. You’ll also find it in the recording once I release it.</p></div>{schedule()}</div></section>'''
    return shell("registration", content)


def joining(copy, room_url=None, calendar_url=None, ics_url=None):
    actions = link(room_url, "Join my webinar") if room_url else notice("Your joining link is not ready yet", "I’m getting the room ready. Please return to this page for the joining link.")
    calendar_links = "".join([link(calendar_url, "Add to Google Calendar", True) if calendar_url else "", link(ics_url, "Download calendar event", True) if ics_url else ""])
    content = f'''<section class="hero-wrap"><div class="snooze-container cfb-narrow"><p class="cfb-eyebrow">Your webinar details</p><h1>Join me on Wednesday.</h1><p class="cfb-lead">{escape(copy["title"])}</p><div class="cfb-session-card"><div class="cfb-date"><span class="cfb-calendar-day" aria-hidden="true">OCT<strong>07</strong></span><p><strong>Wednesday October 07, 2026</strong><br>11 to 11:50 am AEDT (GMT+11)</p></div><div class="cfb-actions">{actions}</div>{f'<div class="cfb-actions cfb-calendar-actions">{calendar_links}</div>' if calendar_links else ''}</div></div></section>
<section class="snooze-section bg-white"><div class="snooze-container cfb-two-col"><div><p class="cfb-eyebrow">Set aside 50 minutes</p><h2>Here’s what to expect.</h2><p>I’ll spend 35 minutes teaching, 5 minutes introducing Camp Snooze and 10 minutes answering your questions.</p><p>Keep this page handy so you can find the joining details on the day.</p><a class="cfb-text-link" href="https://www.joinsnooze.com/contact">Get help with joining</a></div><aside class="cfb-soft-card"><p class="cfb-eyebrow">Camp Snooze early booking</p><h2>Keep the code handy.</h2><p>I’ll show the early booking code at the end of the webinar. You’ll also find it in the recording once I release it.</p><p>Use that code from Thursday October 08, 2026 at 8 am AEDT (GMT+11). Camp starts Monday October 19, 2026.</p></aside></div></section>'''
    return shell("thank-you", content)


def replay(copy, media_url=None, expiry_label=None, sales_url=None, state="waiting"):
    if state == "available" and media_url and expiry_label:
        player = f'<div class="cfb-player-wrap"><iframe class="cfb-player" src="{safe_url(media_url)}" title="My baby sleep webinar replay" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div><p class="cfb-expiry">Available until {escape(expiry_label)}.</p>'
        heading = "Watch my baby sleep webinar."
    elif state == "expired":
        player = notice("The replay has closed", "The 72-hour viewing window has ended. Thank you for joining me.")
        heading = "Thanks for watching."
    else:
        player = notice("The recording is not available yet", "I’m aiming to release it on Wednesday October 07, 2026 at 8 pm AEDT (GMT+11). You’ll have 72 hours to watch from the time I publish it.")
        heading = "Your webinar replay."
    cta = link(sales_url, "View Camp Snooze booking options") if sales_url else ""
    content = f'''<section class="hero-wrap"><div class="snooze-container cfb-narrow"><p class="cfb-eyebrow">Get better baby sleep</p><h1>{heading}</h1><p class="cfb-lead">{escape(copy["title"])}</p></div><div class="snooze-container cfb-player-container">{player}</div></section>
<section class="snooze-section bg-white"><div class="snooze-container"><div class="cfb-section-intro"><p class="cfb-eyebrow">Support for your next step</p><h2>Put your plan into practice.</h2><p>My next Camp Snooze starts Monday October 19, 2026. I share the early booking code at the end of the recording. Use it once booking has opened.</p><p>The booking page explains the setup fee and ongoing monthly payments.</p>{cta}</div>{schedule()}</div></section>'''
    return shell("replay", content)


def camp_booking(copy, stage="upcoming", offers=None, gate_html=None):
    stages = {
        "upcoming": ("Booking opens soon", "Early booking opens Thursday October 08, 2026 at 8 am AEDT (GMT+11) with the code from my webinar or released recording."),
        "held": ("Booking is not available yet", "Please check back for booking access."),
        "code": ("Use your webinar code", "Enter the code I share at the end of my webinar or released recording to check your booking access."),
        "waitlist": ("Booking access for my waitlist", "Use your waitlist booking route to check your access. Webinar code holders can also book while places remain."),
        "public": ("Book your place in Camp Snooze", "Choose your currency below to continue with your booking."),
        "closed": ("Bookings have closed", "New bookings for Camp starting Monday October 19, 2026 have closed."),
        "full": ("This Camp is full", "All available places for Camp starting Monday October 19, 2026 have been booked."),
    }
    if stage not in stages:
        raise ValueError("Unknown Camp booking stage")
    heading, message = stages[stage]
    gate = gate_html if stage in {"code", "waitlist"} and gate_html else notice(heading, message)
    cards = []
    for offer in offers or []:
        if offer["currency"] not in {"AUD", "USD"}:
            raise ValueError("CFB-002 only supports AUD and USD recurring offers")
        if not offer.get("renewal_terms"):
            raise ValueError("Verified recurring terms are required")
        action = link(offer["checkout_url"], f'Continue in {offer["currency"]}') if stage in {"code", "waitlist", "public"} and offer.get("checkout_url") else ""
        cards.append(f'<article class="cfb-price-card"><p class="cfb-eyebrow">{escape(offer["currency"])} · Recurring payments</p><h3>{escape(str(offer["setup"]))}<span> setup fee</span></h3><p class="cfb-monthly">Plus {escape(str(offer["monthly"]))} per month</p><p class="cfb-small">{escape(offer["renewal_terms"])}</p>{action}</article>')
    pricing = '<div class="cfb-price-grid">' + ''.join(cards) + '</div>' if cards else '<p class="cfb-small">The setup fee and ongoing monthly payment will be shown here when booking is available. This Camp offers recurring payments in AUD and USD.</p>'
    content = f'''<section class="hero-wrap"><div class="snooze-container cfb-narrow"><p class="cfb-eyebrow">Camp Snooze · Starts Monday October 19, 2026</p><h1>Let’s put your sleep<br>plan into practice.</h1><p class="cfb-lead">Join me in Camp Snooze for support as you work through your baby’s sleep plan.</p></div></section><section class="snooze-section bg-white"><div class="snooze-container"><div class="cfb-section-intro"><p class="cfb-eyebrow">Your booking details</p><h2>{escape(heading)}</h2>{gate}</div>{pricing}<p class="cfb-cutoff">Bookings close Wednesday October 14, 2026 at exactly 11:59 pm AEDT (GMT+11), unless places fill first.</p></div></section><section class="snooze-section"><div class="snooze-container"><div class="cfb-section-intro"><p class="cfb-eyebrow">October 2026</p><h2>When you can book.</h2></div>{schedule()}</div></section>'''
    return shell("camp-booking", content)
