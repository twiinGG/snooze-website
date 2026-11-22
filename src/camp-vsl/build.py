"""Build the Kajabi paste targets from the reviewed Camp page.

Emits three files into kajabi-deployment/pages/landing/camp-snooze-coaching/:
camp-snooze-coaching.css (theme Custom CSS), camp-snooze-coaching.js (theme Custom JS)
and index.html (markup-only code block). theme-payload.json carries all three.
"""
from pathlib import Path
import json
import re

SOURCE = Path(__file__).resolve().parent
ROOT = SOURCE.parents[3]
OUT = ROOT / "apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-coaching"
NAME = "camp-snooze-coaching"

READY = (
    "const ready=fn=>{const id='camp-vsl-page';const attempt=()=>{if(document.getElementById(id)){fn();return true}return false};"
    "const afterLoad=()=>{if(attempt())return;if(typeof MutationObserver!=='function')return;"
    "const obs=new MutationObserver(()=>{if(attempt())obs.disconnect()});obs.observe(document.documentElement,{childList:true,subtree:true})};"
    "if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',afterLoad);else afterLoad()};\n"
)


def build():
    html = (SOURCE / "index.html").read_text()
    manifest = json.loads((SOURCE / "media-manifest.json").read_text())
    assets = manifest if isinstance(manifest, list) else manifest["assets"]
    urls = [a["url"] for a in assets]
    html = html[html.index('<link rel="preconnect"'):]
    html = re.sub(r"</head>\s*<body[^>]*>", "", html)
    html = html.replace("</body></html>", "")
    html = html.replace("/camp-vsl-media/how-camp.mp4", next(u for u in urls if u.endswith(".mp4")))
    html = html.replace("/camp-vsl-media/poster.jpg", next(u for u in urls if u.endswith(".jpg")))
    html = html.replace('src="captions.vtt"', 'data-camp-captions="true"')
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)

    styles = re.findall(r"<style>(.*?)</style>", html, flags=re.S)
    css = "\n".join(block.strip() for block in styles) + "\n"
    html = re.sub(r"<style>.*?</style>\s*", "", html, flags=re.S)

    inline = re.findall(r"<script>(.*?)</script>", html, flags=re.S)
    assert len(inline) == 1, "expected one inline page script"
    fit = inline[0].strip()
    html = re.sub(r"<script>.*?</script>\s*", "", html, flags=re.S)
    html = re.sub(r'<script src="pricing/pricing.js"></script>\s*', "", html)
    assert "<style" not in html and "<script" not in html

    captions = json.dumps((SOURCE / "captions.vtt").read_text()).replace("<", "\\u003c")
    init = "if(!root||root.dataset.campReady)return;root.dataset.campReady='true';const track=root.querySelector('[data-camp-captions]');if(track){track.src=URL.createObjectURL(new Blob([" + captions + "],{type:'text/vtt'}));}"
    assert fit.startswith("(()=>{") and fit.endswith("})();")
    assert fit.count("if(!root)return;") == 1
    fit = fit.replace("if(!root)return;", init)
    fit = "const startFit=()=>{" + fit[len("(()=>{"):-len("})();")] + "};"
    pricing = (SOURCE / "pricing/pricing.js").read_text().strip()
    js = (
        "(function(){\n" + READY + fit + "\n" + pricing + "\n"
        "ready(startFit);\nready(()=>{if(window.CampPricing&&window.CampPricing.boot)window.CampPricing.boot()});\n})();\n"
    )

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "index.html").write_text(html)
    (OUT / (NAME + ".css")).write_text(css)
    (OUT / (NAME + ".js")).write_text(js)

    zero = dict.fromkeys(['top', 'right', 'bottom', 'left'], '0')
    s = {'name': 'Camp Snooze landing page', 'type': 'section', 'settings': {'full_width': True, 'padding_desktop': zero, 'padding_mobile': zero, 'background_color': '#faf8f2', 'hide_on_desktop': False, 'hide_on_mobile': False}, 'blocks': {'camp-code': {'name': 'Camp markup', 'type': 'code', 'settings': {'code': html, 'width': 'fill', 'mobile_width': 'fill', 'padding_desktop': zero, 'padding_mobile': zero}}}, 'block_order': ['camp-code']}
    payload = {'content_for_index': ['camp-vsl-1792800000'], 'sections': {'camp-vsl-1792800000': s, **{k: {'hidden': True} for k in ['header', 'footer', 'modals']}}, 'custom_css': css, 'custom_js': js}
    (OUT / 'theme-payload.json').write_text(json.dumps(payload, indent=2) + '\n')
    print(OUT / "index.html")


if __name__ == "__main__":
    build()
