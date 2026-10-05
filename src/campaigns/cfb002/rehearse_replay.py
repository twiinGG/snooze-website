#!/usr/bin/env python3
"""Rehearse replay with temporary labelled synthetic media, then remove it."""
from datetime import datetime,timedelta,timezone
import hashlib
import json
from pathlib import Path
import secrets
import subprocess
import tempfile
import threading
from urllib.error import HTTPError
from urllib.request import urlopen
from replay_lifecycle import ReviewedRecording,ReplayLifecycle
from booking_policy import CLOSE
from PIL import Image, ImageDraw


def rehearse():
    now=[datetime.fromisoformat('2026-10-07T09:30:00+00:00')]
    lifecycle=ReplayLifecycle(lambda:now[0])
    with tempfile.TemporaryDirectory(prefix='cfb002-test-replay-') as folder:
        media=Path(folder)/'CFB002-TEST-NOT-WEBINAR.mp4'
        # Ephemeral synthetic test credential. Never the real campaign code.
        fixture_code=secrets.token_hex(4)
        label='CFB-002 TEST RECORDING / NOT THE WEBINAR'
        # This ffmpeg build has no drawtext. Generate the synthetic title card
        # directly, then encode it through the same local ffmpeg rehearsal lane.
        card=Path(folder)/'labelled-test-card.png'
        frame=Image.new('RGB',(640,360),'#22323f');draw=ImageDraw.Draw(frame)
        draw.text((30,110),label,fill='white',font_size=20)
        draw.text((30,170),'Synthetic closing code '+fixture_code,fill='white',font_size=18)
        draw.text((30,230),'Temporary local fixture. Not real teaching.',fill='white',font_size=18)
        frame.save(card)
        result=subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-loop','1','-i',str(card),'-t','2','-r','10','-c:v','libx264','-pix_fmt','yuv420p','-y',str(media)],capture_output=True,text=True)
        if result.returncode: raise RuntimeError('Labelled media generation failed: '+result.stderr[:300])
        recording=ReviewedRecording(media,hashlib.sha256(media.read_bytes()).hexdigest(),True,True,True,True)
        server=lifecycle.loopback_server();thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
        try:
            url=f'http://127.0.0.1:{server.server_port}/media'
            try:urlopen(url,timeout=3);raise AssertionError('Unpublished replay exposed')
            except HTTPError as error:assert error.code==404
            meta=lifecycle.publish(recording,rehearsal=True)
            assert meta['expires_at']=='2026-10-10T09:30:00+00:00'
            with urlopen(url,timeout=3) as response:
                assert response.status==200 and response.headers['Cache-Control']=='no-store, private'
                assert hashlib.sha256(response.read()).hexdigest()==recording.sha256
            now[0]+=timedelta(hours=72)
            try:urlopen(url,timeout=3);raise AssertionError('Expired replay exposed')
            except HTTPError as error:assert error.code==410
            def remove(path):Path(path).unlink();return not Path(path).exists()
            lifecycle.remove_expired(remove)
            assert not media.exists()
            return {'test_only':True,'media_label':label,'unpublished_http_status':404,'published_http_status':200,'expired_http_status':410,'actual_fixture_publication':meta['published_at'],'fixture_expiry':meta['expires_at'],'availability_hours':72,'target_delay_minutes':30,'temporary_media_removed':True,'camp_cutoff_unchanged':CLOSE.isoformat(),'production_replay_verified':False}
        finally:
            server.shutdown();server.server_close();thread.join(timeout=3)


if __name__=='__main__':print(json.dumps(rehearse(),indent=2))
