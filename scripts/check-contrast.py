#!/usr/bin/env python3
"""
Checks that text on this site is actually readable, and re-derives the
scrim values the hero and page headers use.

Every foreground token is checked against every ground it can land on,
including the ivory band and the inside of a well — which is where small
print normally fails and where nobody thinks to look.

There is deliberately no check for type over photographs, because there
is no type over photographs. Earlier versions put the headline on the
hero image and needed a scrim to make it readable; the hero is now a
picture with no words in it, and every word on the site sits on a flat
paper ground. That is not a simplification of this script so much as the
reason it got shorter.

    python3 scripts/check-contrast.py

Needs numpy:  pip install numpy
"""

import sys

try:
    import numpy as np
except ImportError:
    sys.exit("needs numpy:  pip install numpy")

AA = 4.5  # WCAG AA, normal text

# ----------------------------------------------------------------- palette

GROUNDS = {
    "paper-100 (page)": "#faf8f3",
    "paper-200 (band)": "#f3efe6",
    "paper-300 (well)": "#e9e3d6",
    "white": "#ffffff",
}
FOREGROUNDS = {
    "ink-900 (body)": "#171614",
    "muted (small print)": "#635d55",
    "brass.ink (readable)": "#7a5f1e",
    "danger.ink": "#933425",
}
# Documented as fills / placeholders, never as text. Reported, not failed.
NON_TEXT = {
    "brass DEFAULT (fill only)": "#d4a94a",
    # Only ever the ScrollProgress gradient — a 2px decorative bar. It
    # clears AA on white but not on the ivory band, so if it is ever
    # reached for as a text colour, move it back up into FOREGROUNDS and
    # this will start failing, which is the point.
    "brass.deep (strokes only)": "#8a6a22",
    "placeholder (fields only)": "#948d84",
}


def _lin(c):
    c = np.asarray(c, dtype=float) / 255.0
    return np.where(c <= 0.03928, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def _lum_rgb(r, g, b):
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)


def lum_hex(h):
    h = h.lstrip("#")
    return float(_lum_rgb(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)))


def ratio(l1, l2):
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def check_palette():
    print("PALETTE")
    failures = 0
    width = max(len(n) for n in {**FOREGROUNDS, **NON_TEXT})
    header = " " * (width + 2) + "".join(f"{g:>20}" for g in GROUNDS)
    print(header)
    for name, hexv in FOREGROUNDS.items():
        row = f"  {name:<{width}}"
        for gname, ghex in GROUNDS.items():
            r = ratio(lum_hex(hexv), lum_hex(ghex))
            ok = r >= AA
            failures += 0 if ok else 1
            row += f"{r:>14.2f} {'AA' if ok else 'FAIL':<5}"
        print(row)
    for name, hexv in NON_TEXT.items():
        row = f"  {name:<{width}}"
        for gname, ghex in GROUNDS.items():
            row += f"{ratio(lum_hex(hexv), lum_hex(ghex)):>14.2f} {'—':<5}"
        print(row)
    print()
    return failures


def main():
    failures = check_palette()
    if failures:
        print(f"{failures} contrast failure(s).")
        return 1
    print("All text clears WCAG AA on every ground it can land on.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
