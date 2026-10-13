#!/usr/bin/env python3
"""
Downloads every photograph the site uses into public/images/.

The photographs are NOT committed as a judgement call about taste — they are
placeholders standing in for CR Cars' own work, and the owner is expected to
replace them. Keeping the list in images.json rather than scattered through
the components means a swap is one file edit and one re-run, and means anyone
can see at a glance exactly which pictures the site depends on.

Source: Unsplash. The Unsplash License permits commercial use with no
attribution and no permission needed, which is why nothing here comes from a
general image search — a client site must never carry a photo somebody can
send a bill for.

    python3 scripts/fetch-images.py          # skip files already present
    python3 scripts/fetch-images.py --force  # re-download everything
"""

import json
import os
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "images")
MANIFEST = os.path.join(ROOT, "scripts", "images.json")

FORCE = "--force" in sys.argv
HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}


def fetch(entry):
    out = os.path.join(OUT_DIR, entry["out"])
    os.makedirs(os.path.dirname(out), exist_ok=True)

    if not FORCE and os.path.exists(out) and os.path.getsize(out) > 10_000:
        return ("skip", entry["out"], os.path.getsize(out))

    # fm=jpg because Unsplash otherwise negotiates AVIF for some clients, and
    # a .jpg on disk that is secretly AVIF confuses every tool downstream.
    url = (
        f"https://images.unsplash.com/{entry['id']}"
        f"?w={entry['w']}&h={entry['h']}&fit=crop&q=78&fm=jpg&auto=format"
    )
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=90) as r:
            data = r.read()
        if len(data) < 10_000:
            return ("fail", entry["out"], "response too small")
        with open(out, "wb") as f:
            f.write(data)
        return ("ok", entry["out"], len(data))
    except Exception as e:
        return ("fail", entry["out"], str(e))


def main():
    images = json.load(open(MANIFEST))["images"]
    with ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(fetch, images))

    ok = [r for r in results if r[0] == "ok"]
    skipped = [r for r in results if r[0] == "skip"]
    failed = [r for r in results if r[0] == "fail"]

    for status, name, info in results:
        if status == "fail":
            print(f"  FAIL  {name}  — {info}")

    total = sum(r[2] for r in results if isinstance(r[2], int))
    print(
        f"\n{len(ok)} downloaded, {len(skipped)} already present, "
        f"{len(failed)} failed — {total / 1_048_576:.1f} MB on disk"
    )
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
