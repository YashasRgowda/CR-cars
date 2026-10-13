#!/usr/bin/env python3
"""
Traces the dark parts of the home hero photograph into two alpha masks, so
the headline can be printed in ink over the white wall and in paper over
the black brick, switching exactly at the brick's edge.

The words sit on the left of the frame, centred top to bottom, and the
brick line runs straight through that centre. No single colour reads on
both halves, and a glow behind the letters (the earlier fix) showed up as
white fog over the dark half. Instead the copy is drawn twice — once dark,
once light — and each copy is masked to the half of the photograph it can
be read against. Every pixel of every letter is then high contrast.

The masks are applied with mask-size: cover and the same mask-position as
the photo's object-position, on a box the same size as the photo's, so
they land on the photograph exactly at every screen size.

Blurred before thresholding and median-filtered after, so the edge follows
the brick's top course rather than the mortar lines inside it.

Re-run whenever garage-hero.jpg changes:

    python3 scripts/make-hero-mask.py
"""

import os

from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERO = os.path.join(ROOT, 'public', 'images', 'hero')

# Luminance (0-255) below which a patch counts as dark enough for paper
# type. The wall measures 195-225 and the brick 15-35; 115 sits well clear
# of both, so the edge is the brick line itself and not a guess near it.
THRESHOLD = 115

src = Image.open(os.path.join(HERO, 'garage-hero.jpg')).convert('L')
# Half the source resolution is plenty: the mask's edge is drawn at 2x the
# size it is shown on a laptop, and the PNGs stay a few kilobytes.
small = src.resize((src.width // 2, src.height // 2), Image.LANCZOS)
small = small.filter(ImageFilter.GaussianBlur(3))
dark = small.point(lambda v: 255 if v < THRESHOLD else 0).filter(ImageFilter.MedianFilter(9))
light = dark.point(lambda v: 255 - v)

for name, alpha in (('hero-mask-dark.png', dark), ('hero-mask-light.png', light)):
    out = Image.new('RGBA', small.size, (0, 0, 0, 0))
    out.putalpha(alpha)
    out.save(os.path.join(HERO, name), optimize=True)
    print('wrote', name)
