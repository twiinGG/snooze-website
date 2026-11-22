"""Local-only review server. Existing media stays in the external media library."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

ROOT = Path(__file__).resolve().parent
BUILT = ROOT.parents[1] / 'kajabi-deployment/pages/landing/camp-snooze-coaching'
MEDIA = Path.home() / 'Documents/Projects/The Sleep Concierge/snooze-OS-media-library/meta-ads/2026-10-18/creative-proposals/videos'
FILES = {
    '/camp-vsl-media/how-camp.mp4': MEDIA / 'how-camp-4x5.mp4',
    '/camp-vsl-media/poster.jpg': MEDIA / 'how-camp-4x5-poster.jpg',
}

class Preview(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parts = urlsplit(self.path)
        if parts.path == '/built.html':
            where = parse_qs(parts.query).get('js', ['head'])[0]
            markup = (BUILT / 'index.html').read_text()
            script = '<script src="/built/camp-snooze-coaching.js"></script>'
            head = script if where == 'head' else ''
            foot = script if where == 'foot' else ''
            page = ('<!doctype html><html lang="en-AU"><head><meta charset="utf-8">'
                    '<meta name="viewport" content="width=device-width,initial-scale=1">'
                    '<link rel="stylesheet" href="/built/camp-snooze-coaching.css">' + head +
                    '</head><body style="margin:0">' + markup + foot + '</body></html>').encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(page)))
            self.end_headers()
            self.wfile.write(page)
            return
        super().do_GET()

    def translate_path(self, path):
        clean = urlsplit(path).path
        if clean.startswith('/built/'):
            return str(BUILT / clean[len('/built/'):])
        if clean in FILES:
            return str(FILES[clean])
        return super().translate_path(path)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    for file in FILES.values():
        if not file.is_file():
            raise FileNotFoundError(file)
    print('Camp Snooze draft: http://127.0.0.1:4327', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 4327), Preview).serve_forever()
