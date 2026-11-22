import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

HERE = Path(__file__).resolve().parent
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4328


class Preview(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(HERE), **kwargs)

    def do_GET(self):
        parts = urlsplit(self.path)
        if parts.path in ("/", "/page.html"):
            where = parse_qs(parts.query).get("js", ["foot"])[0]
            script = '<script src="/camp-snooze-coaching.js"></script>'
            head = script if where == "head" else ""
            foot = script if where == "foot" else ""
            page = (
                '<!doctype html><html lang="en-AU"><head><meta charset="utf-8">'
                '<meta name="viewport" content="width=device-width,initial-scale=1">'
                '<link rel="stylesheet" href="/camp-snooze-coaching.css">' + head +
                '</head><body style="margin:0">' + (HERE / "index.html").read_text() + foot + "</body></html>"
            ).encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(page)))
            self.end_headers()
            self.wfile.write(page)
            return
        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    print("Camp page preview: http://127.0.0.1:%d/?js=foot (or js=head)" % PORT, flush=True)
    ThreadingHTTPServer(("127.0.0.1", PORT), Preview).serve_forever()
