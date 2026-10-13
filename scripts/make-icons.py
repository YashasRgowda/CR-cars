#!/usr/bin/env python3
"""
Renders the CR Cars roundel to the PNG and ICO sizes a browser asks for.

The mark itself lives in components/brand/Logo.tsx as SVG; this redraws the
same geometry in Pillow rather than rasterising that file, for one reason:
a favicon is looked at at 16 pixels, and an SVG shrunk to 16px by a browser
loses the inner ring and fills the counters of the letters. Drawing it here
means the small sizes can be tuned — the hairline ring is dropped below
48px, and the letters are set tighter — while the large sizes stay faithful
to the SVG.

Supersampled 8x and downsampled with LANCZOS, because the ring is a 1.5px
stroke and anything less than that turns it into a dashed grey smear.

    python3 scripts/make-icons.py
"""

import os
import sys
import urllib.request

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
BRAND = os.path.join(PUBLIC, "brand")
FONT_PATH = os.path.join(BRAND, "InstrumentSerif-Regular.ttf")
FONT_URL = (
    "https://fonts.gstatic.com/s/instrumentserif/v5/"
    "jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf"
)

FIELD = (23, 22, 20)
BRASS = (212, 169, 74)
BRASS_SOFT = (227, 196, 126)
SS = 8  # supersample factor


def ensure_font():
    os.makedirs(BRAND, exist_ok=True)
    if os.path.exists(FONT_PATH) and os.path.getsize(FONT_PATH) > 10_000:
        return
    req = urllib.request.Request(FONT_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r, open(FONT_PATH, "wb") as f:
        f.write(r.read())
    print(f"  fetched {os.path.relpath(FONT_PATH, ROOT)}")


def render(size: int) -> Image.Image:
    s = size * SS
    im = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)

    pad = 0.5 * SS
    d.ellipse([pad, pad, s - pad, s - pad], fill=FIELD)

    # The hairline is sub-pixel below 48 and only muddies the edge there.
    if size >= 48:
        d.ellipse(
            [pad, pad, s - pad, s - pad],
            outline=(212, 169, 74, 140),
            width=max(1, int(0.75 * SS * size / 64)),
        )

    # Below ~20px the inner ring and the letters collide into one grey
    # blob: there are not enough pixels for a stroke, a gap, and two
    # counters. So the smallest icon drops the ring and spends every pixel
    # it has on the letters, which are the only part anyone can identify
    # at that size. The field stays a dark circle, so it still reads as
    # the same badge in a row of tabs.
    draw_inner_ring = size >= 24
    if draw_inner_ring:
        inner = (32 - 27) / 64 * s
        d.ellipse(
            [inner, inner, s - inner, s - inner],
            outline=BRASS,
            width=max(SS // 2, int(1.5 * SS * size / 64)),
        )

    # With the ring gone the letters can have the room it was using.
    ratio = 0.56 if not draw_inner_ring else (0.40 if size <= 32 else 0.42)
    font = ImageFont.truetype(FONT_PATH, int(s * ratio))
    text = "CR"
    box = d.textbbox((0, 0), text, font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text(
        ((s - w) / 2 - box[0], (s - h) / 2 - box[1]),
        text,
        font=font,
        fill=BRASS_SOFT,
    )

    return im.resize((size, size), Image.LANCZOS)


def main():
    ensure_font()
    os.makedirs(BRAND, exist_ok=True)

    targets = [
        (512, os.path.join(BRAND, "icon-512.png")),
        (192, os.path.join(BRAND, "icon-192.png")),
        (180, os.path.join(PUBLIC, "apple-touch-icon.png")),
        (48, os.path.join(PUBLIC, "favicon-48.png")),
        (32, os.path.join(PUBLIC, "favicon.png")),
        (16, os.path.join(PUBLIC, "favicon-16.png")),
    ]
    for size, path in targets:
        render(size).save(path)
        print(f"  {os.path.relpath(path, ROOT)}  {size}x{size}")

    # One .ico carrying all three classic sizes.
    ico = os.path.join(PUBLIC, "favicon.ico")
    render(48).save(ico, sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"  {os.path.relpath(ico, ROOT)}  16/32/48")
    return 0


if __name__ == "__main__":
    sys.exit(main())
