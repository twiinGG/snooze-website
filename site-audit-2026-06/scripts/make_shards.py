#!/usr/bin/env python3
"""Split data/url-list.json into N contiguous shards under data/shards/."""
import json, sys
from pathlib import Path
import audit_common as ac

AUDIT = ac.REPO_ROOT / "apps/snooze-website/site-audit-2026-06"

def main(n=6):
    urls = json.loads((AUDIT / "data/url-list.json").read_text())
    shards_dir = AUDIT / "data/shards"
    shards_dir.mkdir(exist_ok=True)
    for f in shards_dir.glob("shard-*.json"):
        f.unlink()
    # round-robin so each shard mixes page types (balances load + politeness)
    buckets = [[] for _ in range(n)]
    for i, u in enumerate(urls):
        buckets[i % n].append(u)
    for i, b in enumerate(buckets):
        (shards_dir / f"shard-{i:02d}.json").write_text(json.dumps(b, indent=2))
        print(f"shard-{i:02d}: {len(b)} urls")
    print(f"Total {len(urls)} urls in {n} shards")

if __name__ == "__main__":
    main(int(sys.argv[1]) if len(sys.argv) > 1 else 6)
