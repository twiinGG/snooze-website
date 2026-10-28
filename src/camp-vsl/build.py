"""Build the self-contained Kajabi code block from the reviewed Camp page."""
from pathlib import Path
import json
import re

SOURCE = Path(__file__).resolve().parent
ROOT = SOURCE.parents[3]
OUT = ROOT / "apps/snooze-website/kajabi-deployment/pages/landing/camp-snooze-coaching"

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
    captions = json.dumps((SOURCE / "captions.vtt").read_text()).replace("<", "\\u003c")
    init = "if(!root||root.dataset.campReady)return;root.dataset.campReady='true';const track=root.querySelector('[data-camp-captions]');if(track){track.src=URL.createObjectURL(new Blob([" + captions + "],{type:'text/vtt'}));}"
    html = html.replace("if(!root)return;", init)
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "index.html").write_text(html)
    zero=dict.fromkeys(['top','right','bottom','left'],'0')
    s={'name':'Camp Snooze landing page','type':'section','settings':{'full_width':True,'padding_desktop':zero,'padding_mobile':zero,'background_color':'#faf8f2','hide_on_desktop':False,'hide_on_mobile':False},'blocks':{'camp-code':{'name':'Camp HTML, CSS and JavaScript','type':'code','settings':{'code':(OUT/'index.html').read_text(),'width':'fill','mobile_width':'fill','padding_desktop':zero,'padding_mobile':zero}}},'block_order':['camp-code']}
    payload={'content_for_index':['camp-vsl-1792800000'],'sections':{'camp-vsl-1792800000':s,**{k:{'hidden':True} for k in ['header','footer','modals']}},'custom_css':'','custom_js':''}
    (OUT/'theme-payload.json').write_text(json.dumps(payload,indent=2)+'\n')
    print(OUT / "index.html")

if __name__ == "__main__":
    build()
