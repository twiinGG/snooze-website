import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
PAYLOAD = HERE / "theme-payload.json"
SECTION = "camp-vsl-1792800000"
BLOCK = "camp-code"


def build():
    payload = json.loads(PAYLOAD.read_text())
    payload["custom_css"] = (HERE / "camp-snooze-coaching.css").read_text()
    payload["custom_js"] = (HERE / "camp-snooze-coaching.js").read_text()
    block = payload["sections"][SECTION]["blocks"][BLOCK]
    block["name"] = "Camp markup"
    block["settings"]["code"] = (HERE / "index.html").read_text()
    return json.dumps(payload, indent=2) + "\n"


if __name__ == "__main__":
    text = build()
    if "--check" in sys.argv:
        if PAYLOAD.read_text() != text:
            sys.exit("theme-payload.json is out of date; run make_payload.py")
        print("theme-payload.json matches the three files")
    else:
        PAYLOAD.write_text(text)
        print("wrote", PAYLOAD)
