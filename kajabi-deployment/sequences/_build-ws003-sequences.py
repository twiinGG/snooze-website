#!/usr/bin/env python3
"""Build repo twins for the three WS-003 lead-magnet sequences.

Mirrors apps/snooze-website/kajabi-deployment/sequences/2148414612-*/ :
one directory per sequence, a README with ids and editor URLs, and a
numbered twin per email. These three are classic-HTML-editor emails, not
theme-builder emails, so each also ships a paste-ready .html body.
"""
import re
from pathlib import Path

ROOT = Path("/Users/kadegreenland/Snooze-OS/apps/snooze-website/kajabi-deployment/sequences")

TRIAL = "https://www.joinsnooze.com/offers/mqQikDM7/checkout"
DISCLOSURE = ("The first 7 days are free. Your plan starts on day 8 unless you cancel "
              "inside the trial.")

WRAP_OPEN = ('<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.8; '
             'color: #333333; max-width: 600px; margin: 0 auto; padding: 20px;">')
BTN = ('<p style="text-align: center; margin: 28px 0;"><a href="%s" style="display: '
       'inline-block; padding: 1rem 2rem; background: #F43357; color: #ffffff; '
       'text-decoration: none; border-radius: 8px; font-weight: 600;">%s</a></p>')
BTN_TIGHT = ('<p style="text-align: center; margin: 28px 0 12px;"><a href="%s" style="display: '
             'inline-block; padding: 1rem 2rem; background: #F43357; color: #ffffff; '
             'text-decoration: none; border-radius: 8px; font-weight: 600;">%s</a></p>')
NOTE = ('<p style="text-align: center; font-size: 14px; color: #64748B; margin: 0 0 28px;">%s</p>')
UL = '<ul style="color: #1f293b; line-height: 2; margin-top: 0;">%s</ul>'


def p(t):
    return "<p>%s</p>" % t


SEQUENCES = [
    dict(
        seq_id=2148871322,
        title="EMLM09_Toddler-Toolkit-Sample Lead Gen Email Sequence",
        slug="emlm09-toddler-toolkit-sample-lead-gen-email-sequence",
        offer="4HQjFJGC", offer_id=2150846925,
        asset="https://www.joinsnooze.com/products/88d5fab2-212c-4d84-8fcd-8aa5c4d9ce0c",
        asset_label="Open your sample",
        note=("The inline email on the Published automation **Toddler Toolkit Sample - "
              "Post-purchase** is retired in favour of this sequence. What was wrong with "
              "it is recorded in "
              "[`../../pages/landing/toddler-toolkit-sample-ready/EMAIL-SEQUENCE.md`]"
              "(../../pages/landing/toddler-toolkit-sample-ready/EMAIL-SEQUENCE.md).\n\n"
              "Emails 1 and 2 were rewritten on 2026-08-09 against a `get_course` read of "
              "course `2149259086`. The sample is the intro lesson plus Module 1 "
              "\"The 2&#8211;1 Nap Drop\", 7 lessons, 8 above the paywall."),
        emails=[
            dict(pos=1, eid=2151354566, day=0,
                 internal="Toddler Sample Email 1 (Welcome + Access)",
                 subject="Your Toddler Toolkit sample is ready",
                 preview="It is already in your library, nothing else to claim",
                 blocks=[
                     ("p", "Hi {{ first_name }},<br /><br />"),
                     ("p", "Your Toddler Toolkit sample is in your library, ready when you are."),
                     ("p", "You have the welcome lesson and all seven lessons of <strong>Module 1: The 2&#8211;1 Nap Drop</strong>, which is the transition that catches most families out between 13 and 18 months."),
                     ("btn", None),
                     ("p", "<strong>What is in it</strong>"),
                     ("ul", ["What is actually going on in the 2&#8211;1 drop",
                             "The transitional short and long schedule, and how to use it",
                             "How to know it is genuinely time for one nap",
                             "Making the drop, and troubleshooting when it goes sideways",
                             "Your role through the transition"]),
                     ("p", "Start at 1.1 and read straight through before you change anything. It is short, and knowing the whole shape first saves you guessing at 2am."),
                     ("p", "Then hold whatever you change for 48 hours. Toddlers push back before they settle, so two days tells you far more than two hours."),
                     ("sig", None),
                 ]),
            dict(pos=2, eid=2151354567, day=2,
                 internal="Toddler Sample Email 2 (Transition takes time) - 2 days later",
                 subject="The 2–1 nap drop takes longer than you think",
                 preview="One bad day of two naps is not a signal",
                 blocks=[
                     ("p", "Hi {{ first_name }},<br /><br />"),
                     ("p", "The most common mistake in the 2&#8211;1 nap drop is treating it as a switch rather than a stretch."),
                     ("p", "One bad day of two naps does not mean they are ready for one. Most toddlers spend weeks somewhere in between, which is exactly why Module 1 gives you a transitional schedule instead of a date to circle."),
                     ("p", "Two things worth knowing while you are in it. An earlier bedtime carries you through the gap far better than a longer day does. And a toddler mid-transition will often take a great one-nap day, then fall apart the next. That is normal and it is not a signal to go back."),
                     ("btn", None),
                     ("p", "Lesson 1.6 is the one to reread if this week has been messy."),
                     ("sig", None),
                 ]),
            dict(pos=3, eid=2151354568, day=6,
                 internal="Toddler Sample Email 3 (Trial) - 6 days later",
                 subject="When a sample is not enough",
                 preview="What sits behind the paywall, and the cheapest way in",
                 blocks=[
                     ("p", "Hi {{ first_name }},<br /><br />"),
                     ("p", "Module 1 gives you the 2&#8211;1 nap drop end to end. It is deliberately one transition."),
                     ("p", "Behind it sit seven more modules: the 18 month regression, the two year regression, toddler early rising, the big bed transition, dropping the last nap, a break-glass plan for when everything falls apart, and the full toddler schedules."),
                     ("p", "The 7 day trial opens all of it, plus every other Snooze course from the newborn weeks up, and my coaching when your toddler does something no module predicted."),
                     ("trial", None),
                     ("p", "If the sample was enough on its own, that is a good outcome and it stays yours either way."),
                     ("sig", None),
                 ]),
        ]),
    dict(
        seq_id=2148871323,
        title="EMLM10_Newborn-Guide-Preview Lead Gen Email Sequence",
        slug="emlm10-newborn-guide-preview-lead-gen-email-sequence",
        offer="zs2zLeUw", offer_id=2150851932,
        asset="https://www.joinsnooze.com/products/e54a281b-c3cd-45e6-a18c-3bfff7cc54e2",
        asset_label="Open your preview",
        note=("**Not yet verified against the live product.** The toddler sequence had to be "
              "rewritten once its course structure was read. This one describes the preview in "
              "general terms only, and makes no claim about module or lesson counts, precisely "
              "so it cannot be wrong the same way. Tighten it once someone reads the product.\n\n"
              "**Check first:** whether an automation already sends a post-purchase email for "
              "`zs2zLeUw`. The automations MCP toolset is disabled, so this cannot be read from "
              "the repo side."),
        emails=[
            dict(pos=1, eid=2151354569, day=0,
                 internal="Newborn Preview Email 1 (Welcome + Access)",
                 subject="Your Newborn Sleep Guide preview is ready",
                 preview="It is already in your library, nothing else to claim",
                 blocks=[
                     ("p", "Hi {{ first_name }},<br /><br />"),
                     ("p", "Your Newborn Sleep Guide preview is in your library, ready when you are."),
                     ("btn", None),
                     ("p", "Start with wake windows. Newborn sleep follows the awake time before it, not the clock on the wall, and getting that one thing closer to right settles more than any routine will at this age."),
                     ("p", "Then change one thing at a time. Newborn days move fast enough that two changes at once tell you nothing about either."),
                     ("sig", None),
                 ]),
            dict(pos=2, eid=2151354570, day=2,
                 internal="Newborn Preview Email 2 (Overtired) - 2 days later",
                 subject="Overtired looks exactly like not tired",
                 preview="Wide eyes and arching are the tell",
                 blocks=[
                     ("p", "Hi {{ first_name }},<br /><br />"),
                     ("p", "The thing that catches almost every new parent out is that an overtired newborn does not look tired. They look wired. Wide eyes, arching, fighting the cot, feeding in short bursts and unsettling the moment you put them down."),
                     ("p", "So the natural read is that they are not ready for sleep, and the awake window stretches further, and the next sleep is worse than the last one."),
                     ("p", "Watching the clock rather than the baby is what breaks that loop at this age. Not rigidly, just closely enough to catch them before the window closes."),
                     ("btn", None),
                     ("sig", None),
                 ]),
            dict(pos=3, eid=2151354571, day=6,
                 internal="Newborn Preview Email 3 (Trial) - 6 days later",
                 subject="What comes after the newborn weeks",
                 preview="The four month regression is the one that undoes it",
                 blocks=[
                     ("p", "Hi {{ first_name }},<br /><br />"),
                     ("p", "The preview shows you how the Newborn Sleep Guide is built and where your weeks sit inside it."),
                     ("p", "What it cannot do is follow you. Newborn sleep is the first of several versions of this you will go through, and the four month regression is the one that undoes what worked. Parents who plan only for now tend to start from scratch each time."),
                     ("p", "The 7 day trial opens the full newborn guide and every stage after it, through to toddler bedtimes, plus my coaching when your baby does something no guide predicted."),
                     ("trial", None),
                     ("p", "The preview stays yours either way."),
                     ("sig", None),
                 ]),
        ]),
    dict(
        seq_id=2148871324,
        title="EMLM11_Nap-Transition-Mini-Guide Lead Gen Email Sequence",
        slug="emlm11-nap-transition-mini-guide-lead-gen-email-sequence",
        offer="FwisMwa6", offer_id=2151272119,
        asset="https://www.joinsnooze.com/products/e78214b0-16a4-45a1-bf3d-c77b8f19839c",
        asset_label="Open your guide",
        note=("**Open question for Kade.** `FwisMwa6` grants product `2148990031`, which is the "
              "same product paid offers `2150311631` and `2151262014` sell and which the Snooze "
              "Membership includes. The free mini guide and the paid Roadmap are the same "
              "entitlement. Confirm that is intended before this flow carries volume.\n\n"
              "**Check first:** whether an automation already sends a post-purchase email for "
              "`FwisMwa6`."),
        emails=[
            dict(pos=1, eid=2151354572, day=0,
                 internal="Nap Transition Email 1 (Welcome + Access)",
                 subject="Your 3-to-2 nap transition guide is ready",
                 preview="Find your baby's age first, then cap before you drop",
                 blocks=[
                     ("p", "Hi {{ first_name }},<br /><br />"),
                     ("p", "Your 3-to-2 nap transition guide is in your library, ready when you are."),
                     ("btn", None),
                     ("p", "Find your baby's age first. The guide runs 6 to 9 months, so start on the schedule closest to where you actually are rather than where you are heading."),
                     ("p", "One thing before you start: cap before you drop. Shortening that third nap usually buys you a few more weeks of it, and those weeks matter."),
                     ("sig", None),
                 ]),
            dict(pos=2, eid=2151354573, day=2,
                 internal="Nap Transition Email 2 (Early waking is normal) - 2 days later",
                 subject="Early waking during a nap transition is normal",
                 preview="It looks like a mistake in week one",
                 blocks=[
                     ("p", "Hi {{ first_name }},<br /><br />"),
                     ("p", "If you have started the transition, this is usually the week it looks like a mistake. Early morning waking, a shorter second nap, and a baby who falls apart before dinner."),
                     ("p", "That is the transition, not a sign you got it wrong. Two naps have to stretch across a day that three naps used to cover, and the gap shows up at the ends first."),
                     ("p", "The fix is almost always an earlier bedtime while they adjust, not a longer day to tire them out. Push the day and the early waking gets worse."),
                     ("btn", None),
                     ("p", "Give it a fortnight before you decide it is not working."),
                     ("sig", None),
                 ]),
            dict(pos=3, eid=2151354574, day=6,
                 internal="Nap Transition Email 3 (Trial) - 6 days later",
                 subject="This is not the last transition",
                 preview="Two to one catches people out, one to none catches everyone",
                 blocks=[
                     ("p", "Hi {{ first_name }},<br /><br />"),
                     ("p", "Three naps to two is the one people plan for. Two to one catches them out, and one to none catches out almost everybody."),
                     ("p", "Each transition has the same shape: a stretch of days where it looks like it is failing, then it settles. Knowing that in advance is most of what makes it bearable."),
                     ("p", "The 7 day trial opens every transition from the newborn weeks through to dropping the last nap, the full courses, and my coaching for the weeks a guide cannot predict."),
                     ("trial", None),
                     ("p", "The guide is yours to keep either way."),
                     ("sig", None),
                 ]),
        ]),
]

SIG_HTML = "<p>Sally<br />The Sleep Concierge</p>"


def render_html(email, seq):
    out = [WRAP_OPEN]
    for kind, val in email["blocks"]:
        if kind == "p":
            out.append(p(val))
        elif kind == "ul":
            out.append(UL % "".join("<li>%s</li>" % i for i in val))
        elif kind == "btn":
            out.append(BTN % (seq["asset"], seq["asset_label"]))
        elif kind == "trial":
            out.append(BTN_TIGHT % (TRIAL, "Start the 7 day trial"))
            out.append(NOTE % DISCLOSURE)
        elif kind == "sig":
            out.append(SIG_HTML)
    out.append("</div>")
    return "\n".join(out) + "\n"


def strip_tags(s):
    s = s.replace("<br />", "\n").replace("&#8211;", "–").replace("&amp;", "&")
    s = re.sub(r"<[^>]+>", "", s)
    return s.strip()


def render_twin(email, seq):
    send = "Immediately" if email["day"] == 0 else "day %d at 11:00 Melbourne" % email["day"]
    head = [
        "Internal title: " + email["internal"],
        "Email ID: %d" % email["eid"],
        "Send: " + send,
        "Subject: " + email["subject"],
        "Preview text: " + email["preview"],
        "Written: 2026-08-09 (WS-003). NOT yet pasted live.",
        "", "---", "",
    ]
    body = []
    for kind, val in email["blocks"]:
        if kind == "p":
            body.append(strip_tags(val))
        elif kind == "ul":
            body.extend("- " + strip_tags(i) for i in val)
        elif kind == "btn":
            body.append("[%s](%s)" % (seq["asset_label"], seq["asset"]))
        elif kind == "trial":
            body.append("[Start the 7 day trial](%s)" % TRIAL)
            body.append(DISCLOSURE)
        elif kind == "sig":
            body.append("Sally\nThe Sleep Concierge")
    return "\n".join(head + [b for b in body if b]) + "\n"


README = """# {title}

- Kajabi sequence ID: {seq_id}
- Created: 2026-08-09 (WS-003)
- Bound to offer: `{offer}` ({offer_id})
- Send hour: 11:00 Melbourne
- Builder: **theme builder**, one `section_text` carrying the whole body

## Body structure: one section, self-contained HTML

Kade's ruling was a blank email with a single code block. **The Encore Email theme has no code
section.** Its addable catalog is `section_text`, `section_image`, `section_cta`, `section_logo`,
`section_video`, `section_countdown`, `section_social_icons`, `section_divider`,
`section_announcement`, three split types and the Amplify ad, and the theme skill states plainly
that Encore Email sections have no blocks at all.

The closest available shape, and what these use, is **one `section_text` whose `body` rich-text
field holds the entire email**, including the CTA as a styled inline `<a>`. Verified working on a
probe email: the HTML round-trips through `update_theme_content` and `get_theme_content` byte for
byte.

That differs from the catnapping sequence, which composes `section_text` x3 plus a native
`section_cta`. The native button emits table-based markup that survives Outlook on Windows, where
an inline `<a>` with `border-radius` loses its rounded corners. The trade is deliberate: one block
that matches the repo file exactly, against a button that renders square in one client.

**The `.html` file beside each twin is the body**, and it goes into that single section's rich
text, not into a classic HTML editor.

There is no MCP tool to update or delete a sequence email, only `add_sequence_email`, and Kajabi
rejects a second email on a day and time that is already taken. Writing a body therefore needs the
email's `active_theme_id`, which only `add_sequence_email` returns and no read tool exposes.

{note}

## Emails

{rows}
## House rules these bodies follow

- Single wrapper `div`, all styling inline, no `!important`. Email pattern, not the course-lesson pattern.
- `<br />` for spacing rather than margin-bottom.
- `{{{{ first_name }}}}` merge tag, spaced the way this site already writes it.
- No em dashes, no Oxford comma, no LLM fingerprint phrases.
- Sally writes in first person and signs off. Never described as a current or registered nurse.
- Every trial CTA carries the approved renewal disclosure directly beneath the button, per
  `docs/projects/catnapping-guide/4_working-cng002/verify/cta-trial-ADJUDICATION.md`. No price.
- No claim about module or lesson counts that a live read does not support.

Kajabi appends its own unsubscribe and address footer to a classic-builder email, so the bodies
here carry no footer chrome of their own.

## Drift

The bodies live in Kajabi once pasted. If you edit one in the admin, update the `.html` and the
twin `.txt` in the same change or the two drift.
"""

ROW = """- Position {pos} | Email ID {eid}
  - Subject: {subject}
  - Send: {send}
  - Body to paste: `{n}-{eid}.html`
  - Readable twin: `{n}-{eid}.txt`
  - Editor URL: https://app.kajabi.com/admin/email_sequence_emails/{eid}/edit
  - Status: **draft, body mangled, needs the paste above**
"""

for seq in SEQUENCES:
    d = ROOT / ("%d-%s" % (seq["seq_id"], seq["slug"]))
    d.mkdir(parents=True, exist_ok=True)
    rows = ""
    for e in seq["emails"]:
        html = render_html(e, seq)
        twin = render_twin(e, seq)
        assert "—" not in html and "&mdash;" not in html, "em dash in %d" % e["eid"]
        assert html.count("<div") == html.count("</div>"), "unbalanced div in %d" % e["eid"]
        assert len(re.findall(r"<p\b", html)) == html.count("</p>"), \
            "unbalanced p in %d" % e["eid"]
        assert len(re.findall(r"<a\b", html)) == html.count("</a>"), \
            "unbalanced a in %d" % e["eid"]
        assert len(re.findall(r"<li\b", html)) == html.count("</li>"), \
            "unbalanced li in %d" % e["eid"]
        if any(k == "trial" for k, _ in e["blocks"]):
            assert html.count(DISCLOSURE) == html.count(TRIAL), "disclosure mismatch %d" % e["eid"]
        (d / ("%d-%d.html" % (e["pos"], e["eid"]))).write_text(html)
        (d / ("%d-%d.txt" % (e["pos"], e["eid"]))).write_text(twin)
        rows += ROW.format(pos=e["pos"], eid=e["eid"], subject=e["subject"], n=e["pos"],
                           send="Immediately" if e["day"] == 0
                           else "day %d at 11:00 Melbourne" % e["day"])
    (d / "README.md").write_text(README.format(rows=rows, **seq))
    print("%-60s %d emails" % (d.name, len(seq["emails"])))
