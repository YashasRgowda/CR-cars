#!/usr/bin/env python3
"""
Turns the CR Cars logo artwork into every file the site uses.

Source: brand/logo-source.webp — the engraved car-and-mechanic lockup on a
plain white ground, 1600x800, with "CR Cars Service Center" and
"SERVICE · MODIFY · WASH" set beneath the drawing.

Outputs, all from that one image:

    public/brand/logo-full.png      the whole lockup, transparent
    public/brand/logo-mark.png      the drawing alone, transparent
    public/brand/icon-512.png       square app / schema.org logo
    public/brand/icon-192.png
    public/apple-touch-icon.png     180, on paper (iOS fills transparency black)

Not the browser-tab icons. An engraving shrunk to 16-48px is a grey
smudge, so the tab keeps the CR roundel from scripts/make-icons.py, the
small-size mark of the identity. Run that script FIRST — it writes the
large sizes too — then this one, which replaces those with the drawing:

    python3 scripts/make-icons.py && python3 scripts/make-logo.py

The white ground is removed by un-blending rather than by a threshold:
every pixel is treated as ink laid over the ground at some opacity, and
both are recovered. A threshold would leave a white fringe round every
pen line and turn the brass spanner into a flat sticker; un-blending keeps
the anti-aliasing and the brass's true colour, so the logo sits on any of
the site's paper tones as if it had been printed on them.

This is a raster logo. For signage and print it should be redrawn as a
vector; until then, these files are what the website needs.
"""

import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
BRAND = os.path.join(PUBLIC, "brand")
SOURCE = os.path.join(ROOT, "brand", "logo-source.webp")

# The page colour of the icons — the site's paper-100.
PAPER = (250, 248, 243)

# Measured on the source: the drawing occupies rows 56-555, the type
# 563-729. The cut sits in the 7px gap between them.
DRAWING_BOTTOM = 559


def unblend(img: Image.Image) -> Image.Image:
    """White-ground artwork to RGBA, keeping anti-aliasing and colour."""
    src = img.convert("RGB")
    bg = src.getpixel((4, 4))
    out = []
    pixels = src.get_flattened_data() if hasattr(src, "get_flattened_data") else src.getdata()
    for r, g, b in pixels:
        # The least opacity that explains this pixel over the ground.
        a = max(
            (bg[0] - r) / bg[0] if r < bg[0] else 0,
            (bg[1] - g) / bg[1] if g < bg[1] else 0,
            (bg[2] - b) / bg[2] if b < bg[2] else 0,
        )
        if a < 0.02:
            out.append((0, 0, 0, 0))
            continue
        a = min(a, 1.0)
        rr = round((r - (1 - a) * bg[0]) / a)
        gg = round((g - (1 - a) * bg[1]) / a)
        bb = round((b - (1 - a) * bg[2]) / a)
        out.append(
            (max(0, min(255, rr)), max(0, min(255, gg)), max(0, min(255, bb)), round(a * 255))
        )
    rgba = Image.new("RGBA", src.size)
    rgba.putdata(out)
    return rgba


def trim(img: Image.Image, pad: int = 0) -> Image.Image:
    box = img.getbbox()
    l, t, r, b = box
    return img.crop((max(0, l - pad), max(0, t - pad), min(img.width, r + pad), min(img.height, b + pad)))


def square_icon(mark: Image.Image, size: int, *, paper: bool, inset: float) -> Image.Image:
    """The drawing centred in a square, `inset` of the side left as margin."""
    canvas = Image.new("RGBA", (size, size), PAPER + (255,) if paper else (0, 0, 0, 0))
    room = round(size * (1 - 2 * inset))
    m = mark.copy()
    m.thumbnail((room, room), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


def main() -> None:
    os.makedirs(BRAND, exist_ok=True)
    art = unblend(Image.open(SOURCE))

    full = trim(art, pad=8)
    full.save(os.path.join(BRAND, "logo-full.png"), optimize=True)
    print("  public/brand/logo-full.png", full.size)

    mark = trim(art.crop((0, 0, art.width, DRAWING_BOTTOM)), pad=6)
    mark.save(os.path.join(BRAND, "logo-mark.png"), optimize=True)
    print("  public/brand/logo-mark.png", mark.size)

    # Big icons: the drawing with breathing room, on paper so they read as
    # a tile on a home screen or in a search result rather than floating.
    for size, path in (
        (512, os.path.join(BRAND, "icon-512.png")),
        (192, os.path.join(BRAND, "icon-192.png")),
        (180, os.path.join(PUBLIC, "apple-touch-icon.png")),
    ):
        square_icon(mark, size, paper=True, inset=0.08).convert("RGB").save(path, optimize=True)
        print(f"  {os.path.relpath(path, ROOT)}  {size}")

    # The link preview — what WhatsApp, Instagram and Google show when the
    # site is shared, which for this shop is most first impressions. The
    # lockup centred on paper at 1200x630, the size every platform crops to.
    og = Image.new("RGBA", (1200, 630), PAPER + (255,))
    lock = full.copy()
    lock.thumbnail((820, 470), Image.LANCZOS)
    og.alpha_composite(lock, ((1200 - lock.width) // 2, (630 - lock.height) // 2))
    og_path = os.path.join(BRAND, "og-image.png")
    og.convert("RGB").save(og_path, optimize=True)
    print(f"  {os.path.relpath(og_path, ROOT)}  1200x630")


if __name__ == "__main__":
    main()
