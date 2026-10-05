#!/usr/bin/env python3
"""Render honest local readiness previews and the review diagram. No external writes."""
import argparse
from html import escape
import json
from pathlib import Path
import textwrap
import templates

HERE = Path(__file__).resolve().parent
MEDIA = Path('/Users/kadegreenland/Documents/Projects/The Sleep Concierge/snooze-OS-media-library/cfb002-build-20261005')


def diagram(path):
    svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="2160" height="1530" viewBox="0 0 2160 1530" role="img" aria-labelledby="title desc">', '<title id="title">October webinar to Camp Snooze: build and release flow</title><desc id="desc">Prepared pages and inert email drafts. Live room, registration and governed booking controls require verification. Shared code comes from the webinar or released replay.</desc>', '<defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="#687087"/></marker></defs>', '<rect width="2160" height="1530" fill="#f8f3e7"/>']
    def text(x, y, value, size=22, serif=False, weight='400', color='#1f2948'):
        svg.append(f'<text x="{x}" y="{y}" fill="{color}" font-family="{ "Georgia" if serif else "Arial"}" font-size="{size}" font-weight="{weight}">{escape(value)}</text>')
    text(60,70,'THE SLEEP CONCIERGE · OCTOBER 2026',20,weight='700')
    text(60,135,'Webinar to Camp Snooze',58,True)
    text(60,180,'October 07 webinar · October 19 Camp · All campaign emails remain inert',25)
    text(60,224,'Built page templates are reviewable. Live behaviour requires receiving-system proof.',22)
    colors={'page':'#e7dffc','email':'#caecfa','state':'#d0efdf','offer':'#1f2948'}
    for i,(label,color) in enumerate(colors.items()):
        x=1240+i*208
        svg.append(f'<rect x="{x}" y="58" width="22" height="22" rx="5" fill="{color}"/>')
        text(x+32,77,label.title(),19)
    cards=[
      ('page','01 · REGISTRATION','Free webinar','First-person Sally invitation. Native name/email form and consent. Joining route only after the real room and no-email flow pass.','Prepared design; live proof required'),
      ('page','02 · JOINING','Keep your details','Wednesday October 07, 2026. 11 to 11:50 am AEDT (GMT+11). Verified room link, Google Calendar and UTC calendar event.','Room and guest rehearsal required'),
      ('state','03 · LIVE SESSION','Teach, introduce, answer','35 minutes teaching, 5 minutes Camp introduction, 10 minutes questions. Observe-only guests, hidden names and working chat.','Sally teaching approval required'),
      ('page','04 · REPLAY','72 hours to watch','Target: October 07 at 8 pm AEDT. Start the viewing window at actual publication. Review privacy and retain the closing access code.','Real recording is a future input'),
      ('offer','05 · CODE OPENING','Thursday October 08','8 am AEDT (GMT+11). Shared code shown at the end of the webinar and retained in the released replay. No attendance check.','Payment-boundary gate required'),
      ('offer','06 · WAITLIST','Friday October 09','8 am AEDT (GMT+11). Actual waitlisters gain booking access. Code holders retain access. Registration alone is not waitlist status.','Test eligible and ineligible users'),
      ('offer','07 · PUBLIC','Monday October 12','8 am AEDT (GMT+11). Public booking opens while places remain. Campaign purchases use AUD or USD recurring payments only.','Keep fees and renewal terms visible'),
      ('state','08 · CLOSE','Wednesday October 14','Close exactly 11:59 pm AEDT, or earlier if full. 2026-10-14T12:59:00Z. Block direct and stale-tab new payments.','Protect accepted and in-flight payments'),
    ]
    for i,(kind,eyebrow,title,body,foot) in enumerate(cards):
        col=i%4; row=i//4; x=60+col*525; y=290+row*420
        dark=kind=='offer'; fg='#fffdf8' if dark else '#1f2948'
        svg.append(f'<rect x="{x}" y="{y}" width="465" height="365" rx="21" fill="{colors[kind]}" stroke="#a4aabb" stroke-width="1.3"/>')
        text(x+26,y+39,eyebrow,16,weight='700',color=fg)
        text(x+26,y+91,title,30,True,color=fg)
        for j,line in enumerate(textwrap.wrap(body,36)):
            text(x+26,y+134+j*29,line,21,color=fg)
        for j,line in enumerate(textwrap.wrap(foot,40)):
            text(x+26,y+314+j*24,line,17,weight='700',color=fg)
        if col<3:
            svg.append(f'<path d="M{x+471} {y+176} H{x+518}" stroke="#687087" stroke-width="2" marker-end="url(#arrow)"/>')
    svg.append('<rect x="60" y="1170" width="995" height="240" rx="21" fill="#caecfa" stroke="#a4aabb"/>')
    text(86,1212,'EMAIL DRAFTS · NO SENDS OR SCHEDULES',18,weight='700')
    text(86,1256,'Confirmation, reminders and staged sales',29,True)
    text(86,1299,'All 11 reviewed emails remain inert. Late registrants skip elapsed reminders.',21)
    text(86,1336,'A valid Camp purchase suppresses later sales follow up at send time.',21)
    text(86,1373,'Activation needs a later instruction and the matching live release checks.',21)
    svg.append('<rect x="1110" y="1170" width="990" height="240" rx="21" fill="#d0efdf" stroke="#a4aabb"/>')
    text(1136,1212,'FULFILMENT · EXISTING CUSTOMER OBLIGATIONS PROTECTED',18,weight='700')
    text(1136,1256,'Prepare October 15. Camp starts October 19.',29,True)
    text(1136,1299,'Verify October 16 access release and the actual account timezone.',21)
    text(1136,1336,'Check recurring cohort assignment, intake and full recurring access.',21)
    text(1136,1373,'Governed offer, contact and cohort writes need the approved route.',21)
    text(60,1470,'Design/build review · October 05, 2026 · No code appears in page source or opening email.',22)
    svg.append('</svg>')
    path.write_text('\n'.join(svg))


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',type=Path,default=HERE/'preview')
    args=parser.parse_args()
    copy=json.loads((HERE.parent/'campaign-copy.json').read_text())
    # Review previews use no live credentials, forms, payment route or media.
    pages={
      'registration':templates.registration(copy),
      'joining':templates.joining(copy),
      'replay':templates.replay(copy),
      'camp-booking':templates.camp_booking(copy),
      'camp-closed':templates.camp_booking(copy,stage='closed'),
      'replay-expired':templates.replay(copy,state='expired'),
    }
    args.output.mkdir(parents=True,exist_ok=True)
    for name,fragment in pages.items():
        (args.output/f'{name}.html').write_text(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CFB-002 review: {name}</title><style>body{{margin:0}}</style></head><body>{fragment}</body></html>')
    MEDIA.mkdir(parents=True,exist_ok=True)
    diagram(MEDIA/'CFB-002-build-flow.svg')
    print(json.dumps({'preview_directory':str(args.output),'diagram':str(MEDIA/'CFB-002-build-flow.svg'),'state':'readiness_only_no_live_form_room_or_checkout'},indent=2))


if __name__=='__main__':
    main()
