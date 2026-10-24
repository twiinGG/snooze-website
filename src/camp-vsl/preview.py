"""Local-only review server. Existing media stays in the external media library."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
MEDIA = Path.home() / 'Documents/Projects/The Sleep Concierge/snooze-OS-media-library/meta-ads/2026-10-18/creative-proposals/videos'
FILES = {
    '/camp-vsl-media/how-camp.mp4': MEDIA / 'how-camp-4x5.mp4',
    '/camp-vsl-media/poster.jpg': MEDIA / 'how-camp-4x5-poster.jpg',
}

class Preview(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path):
        clean = urlsplit(path).path
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
