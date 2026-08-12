#!/usr/bin/env python3
"""Emit JavaScript that sets a Kajabi editor's value to a file's exact contents.

Token-safe paste helper: file bytes flow disk -> this script -> shell arg ->
agent-browser eval -> page. No model context ever carries the content.

Usage (always via shell substitution inside agent-browser eval):

  # Ace editor (theme custom code, page custom-code blocks):
  agent-browser --session phase5 eval "$(python3 apps/snooze-website/scripts/emit_paste_js.py FILE --target ace)"

  # Specific Ace editor when several exist (0-based index on the page):
  ... emit_paste_js.py FILE --target ace --index 1

  # Plain textarea (e.g. site page scripts field), CSS selector required:
  ... emit_paste_js.py FILE --target textarea --selector 'textarea[name="site[page_scripts_header]"]'

The emitted JS returns a JSON string {ok, length, sha256prefix, editors} so the
caller can verify length matches the file without reading content back.
After a successful eval, click the editor once and Save as usual (the script
already performs the dirty-keystroke so Kajabi registers the change).
"""
import argparse
import hashlib
import json
import sys

parser = argparse.ArgumentParser()
parser.add_argument("file")
parser.add_argument("--target", choices=["ace", "textarea"], default="ace")
parser.add_argument("--index", type=int, default=0, help="ace editor index on page (0-based)")
parser.add_argument("--selector", default="", help="CSS selector (textarea target)")
args = parser.parse_args()

content = open(args.file, encoding="utf-8").read()
payload = json.dumps(content)  # safe JS string literal
sha = hashlib.sha256(content.encode()).hexdigest()[:16]

# JS String.length counts UTF-16 code units, so every astral character (emoji,
# rare CJK) is 2 there and 1 to Python. Comparing Python's len() against the
# editor's .length reports a false mismatch on any file containing one.
expected = len(content.encode("utf-16-le")) // 2

if args.target == "ace":
    js = f"""
(() => {{
  const els = document.querySelectorAll('.ace_editor');
  if (!els.length) return JSON.stringify({{ok:false, error:'no ace editors found'}});
  const idx = {args.index};
  if (idx >= els.length) return JSON.stringify({{ok:false, error:'index out of range', editors: els.length}});
  const ed = window.ace.edit(els[idx]);
  ed.setValue({payload}, -1);
  ed.clearSelection();
  ed.moveCursorTo(0, 0);
  ed.insert(' ');
  ed.remove('left');
  const v = ed.getValue();
  return JSON.stringify({{ok: v.length === {expected}, length: v.length, expected: {expected}, sha256prefix: '{sha}', editors: els.length}});
}})()
"""
else:
    if not args.selector:
        sys.exit("--selector is required for textarea target")
    sel = json.dumps(args.selector)
    js = f"""
(() => {{
  const el = document.querySelector({sel});
  if (!el) return JSON.stringify({{ok:false, error:'selector not found'}});
  const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
  setter.call(el, {payload});
  el.dispatchEvent(new Event('input', {{bubbles:true}}));
  el.dispatchEvent(new Event('change', {{bubbles:true}}));
  return JSON.stringify({{ok: el.value.length === {expected}, length: el.value.length, expected: {expected}, sha256prefix: '{sha}'}});
}})()
"""
sys.stdout.write(js)
