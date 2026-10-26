"""Build image-only theme patches from private persisted-state snapshots."""
from pathlib import Path
import argparse
import json

HERE = Path(__file__).parent

def build(snapshot):
    data = json.loads(Path(snapshot).read_text())
    original = data['settings']
    urls = {a['person']: a['url'] for a in json.loads((HERE/'assets.json').read_text())}
    replacements = {
        'f702b6a-ea62-2788-5b0-313783348b3_Camp_Snooze_Sally.webp': urls['Sally'],
        '3ea4276-026f-1eff-af-6c65224d2ae_Camp_Snooze_Bec.webp': urls['Bec'],
    }
    text = json.dumps(original)
    prefix = 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/'
    for old, new in replacements.items():
        relative = 'file-uploads/themes/2164288957/settings_images/'+old
        text = text.replace(prefix+relative, new).replace(relative, new)
    text = text.replace('width: 16rem; height: 12rem; object-fit: cover;', 'width: 16rem; height: 20rem; object-fit: cover;')
    updated = json.loads(text)
    gallery = updated['sections'].get('1767353754187', {}).get('blocks', {})
    for who, bid in [('Sally', '1767353754187_1'), ('Bec', '1767353754187_2')]:
        if bid in gallery:
            gallery[bid]['settings']['image'] = urls[who]
    changed = {k:v for k,v in updated['sections'].items() if v != original['sections'][k]}
    assert changed, 'No expected old portrait references found'
    return {'sections':changed, 'content_for_index':original['content_for_index']}

if __name__ == '__main__':
    p=argparse.ArgumentParser(); p.add_argument('snapshot'); p.add_argument('output'); args=p.parse_args()
    Path(args.output).write_text(json.dumps(build(args.snapshot),indent=2)+'\n')
