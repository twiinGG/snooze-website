"""Local replay publication/expiry rehearsal, including guarded media origin.

This loopback server proves local behavior only. Production hosting must prevent
alternate raw media URLs and invoke its supported removal operation at expiry.
"""
from dataclasses import dataclass
from datetime import timedelta
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import RLock
import hashlib
from booking_policy import Held, instant


@dataclass(frozen=True)
class ReviewedRecording:
    path: Path
    sha256: str
    privacy_reviewed: bool
    contains_closing_code: bool
    clinical_approved: bool
    test_only: bool


class ReplayLifecycle:
    def __init__(self,clock):
        self.clock=clock;self.recording=None;self.published_at=None;self.expires_at=None
        self.lock=RLock();self.removed=False

    def publish(self,recording,*,rehearsal=False):
        with self.lock:
            if not isinstance(recording,ReviewedRecording) or any(flag is not True for flag in (recording.privacy_reviewed,recording.contains_closing_code,recording.clinical_approved)):
                raise Held('Reviewed recording containing closing code required')
            if recording.test_only is not rehearsal:
                raise Held('Test media cannot be published as the real webinar')
            path=Path(recording.path)
            if not path.is_file() or path.stat().st_size<100 or hashlib.sha256(path.read_bytes()).hexdigest()!=recording.sha256:
                raise Held('Reviewed nonempty recording identity mismatch')
            if self.recording is not None: raise Held('Replay publication already recorded')
            self.recording=recording
            self.published_at=instant(self.clock())
            self.expires_at=self.published_at+timedelta(hours=72)
            return self.metadata()

    def metadata(self):
        return {'published_at':self.published_at.isoformat() if self.published_at else None,'expires_at':self.expires_at.isoformat() if self.expires_at else None,'test_only':self.recording.test_only if self.recording else False,'removed':self.removed}

    def available(self,now=None):
        with self.lock:
            now=instant(now if now is not None else self.clock())
            return self.recording is not None and not self.removed and self.published_at<=now<self.expires_at

    def media(self):
        with self.lock:
            if not self.available(): raise Held('Replay unavailable')
            return Path(self.recording.path).read_bytes()

    def remove_expired(self,remover):
        with self.lock:
            if self.recording and instant(self.clock())>=self.expires_at and not self.removed:
                # Callback must revoke the origin URL, not only hide the page player.
                if remover(self.recording.path) is not True: raise Held('Media removal failed')
                self.removed=True
            return self.metadata()

    def loopback_server(self,port=0):
        lifecycle=self
        class Handler(BaseHTTPRequestHandler):
            def do_GET(self):
                if self.path!='/media':
                    self.send_response(404);self.end_headers();return
                try: content=lifecycle.media()
                except Held:
                    self.send_response(410 if lifecycle.published_at else 404)
                    self.send_header('Cache-Control','no-store');self.end_headers();return
                self.send_response(200)
                self.send_header('Content-Type','video/mp4')
                self.send_header('Cache-Control','no-store, private')
                self.send_header('Content-Length',str(len(content)))
                self.end_headers();self.wfile.write(content)
            def log_message(self,*args): pass
        return ThreadingHTTPServer(('127.0.0.1',port),Handler)
