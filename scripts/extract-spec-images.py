"""
One-off asset generator for the Technical Specifications page.

Crops the product renders (indoor / outdoor / window unit) out of the client's
"Technical Specification sheet.pdf". Every page of that PDF is a single
flattened 1024x1536 raster, so we pull the native bitmap (no re-rasterising,
no upscaling) and crop the render bands from the left "MODEL NAME" card.

Usage:
    python scripts/extract-spec-images.py --pdf project-details/technical-specification-sheet.pdf
    python scripts/extract-spec-images.py --pdf ... --dry-run     # print bands only

Requires: PyMuPDF (fitz), Pillow.

If the client re-exports the PDF with a different template, the band asserts
below will fail loudly rather than silently cropping the wrong region.
"""

from __future__ import annotations

import argparse
import io
import json
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image, ImageOps

PAGE_SIZE = (1024, 1536)

# 1-based PDF page -> (slug, type). Mirrors `page` in data/products/specs.ts.
PAGES: list[tuple[str, str]] = [
    ("12k-3-star-inverter-split", "split"),
    ("17k-3-star-inverter-split", "split"),
    ("17k-5-star-inverter-split", "split"),
    ("18k-3-star-inverter-split", "split"),
    ("18k-5-star-inverter-split", "split"),
    ("22k-3-star-inverter-split", "split"),
    ("18k-3-star-inverter-window", "window"),
    ("22k-5-star-inverter-window", "window"),
]

# Search window inside the left card: inset from the card border (x≈16/340),
# below the model-name strip + feature lines, above the "KEY FEATURES" bar.
SEARCH = (28, 300, 332, 872)  # left, top, right, bottom
NON_WHITE = 240  # luminance threshold
MIN_BAND_HEIGHT = 90  # feature text lines are <= ~50px; renders are >= ~180px
MIN_ROW_COVERAGE = 0.01
PAD = 12


def row_bands(gray: Image.Image) -> list[tuple[int, int]]:
    """Contiguous rows with enough non-white pixels, as (top, bottom) in crop space."""
    w, h = gray.size
    px = gray.load()
    rows = []
    for y in range(h):
        dark = sum(1 for x in range(w) if px[x, y] < NON_WHITE)
        rows.append(dark / w >= MIN_ROW_COVERAGE)

    bands: list[tuple[int, int]] = []
    start = None
    for y, on in enumerate(rows + [False]):
        if on and start is None:
            start = y
        elif not on and start is not None:
            if y - start >= MIN_BAND_HEIGHT:
                bands.append((start, y))
            start = None
    return bands


def tight_bbox(gray: Image.Image) -> tuple[int, int, int, int] | None:
    mask = ImageOps.invert(gray).point(lambda p: 255 if p > (255 - NON_WHITE) else 0)
    return mask.getbbox()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pdf", required=True)
    ap.add_argument("--out", default="public", help="public/ root (default: public)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    doc = fitz.open(args.pdf)
    if len(doc) != len(PAGES):
        print(f"expected {len(PAGES)} pages, got {len(doc)}", file=sys.stderr)
        return 1

    out_dir = Path(args.out) / "images" / "products" / "specs"
    summary = []

    for index, (slug, kind) in enumerate(PAGES):
        page = doc[index]
        images = page.get_images(full=True)
        if len(images) != 1:
            print(f"page {index + 1}: expected 1 embedded image, got {len(images)}", file=sys.stderr)
            return 1

        raw = doc.extract_image(images[0][0])["image"]
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        if im.size != PAGE_SIZE:
            print(f"page {index + 1}: expected {PAGE_SIZE}, got {im.size}", file=sys.stderr)
            return 1

        region = im.crop(SEARCH)
        gray = ImageOps.grayscale(region)
        bands = row_bands(gray)
        expected = 2 if kind == "split" else 1
        names = ["idu", "odu"] if kind == "split" else ["window"]

        if len(bands) != expected:
            print(
                f"page {index + 1} ({slug}): expected {expected} render band(s), found {bands}",
                file=sys.stderr,
            )
            return 1

        files = []
        for name, (top, bottom) in zip(names, bands):
            band = gray.crop((0, top, gray.width, bottom))
            bbox = tight_bbox(band)
            if bbox is None:
                print(f"page {index + 1} ({slug}): empty band for {name}", file=sys.stderr)
                return 1
            # band -> search-region -> page coordinates, padded and clamped
            left = max(SEARCH[0], SEARCH[0] + bbox[0] - PAD)
            upper = max(SEARCH[1], SEARCH[1] + top + bbox[1] - PAD)
            right = min(SEARCH[2], SEARCH[0] + bbox[2] + PAD)
            lower = min(SEARCH[3], SEARCH[1] + top + bbox[3] + PAD)
            crop = im.crop((left, upper, right, lower))

            target = out_dir / f"{slug}-{name}.png"
            files.append(
                {"file": str(target).replace("\\", "/"), "box": [left, upper, right, lower], "size": crop.size}
            )
            if not args.dry_run:
                target.parent.mkdir(parents=True, exist_ok=True)
                crop.save(target, "PNG", optimize=True)

        summary.append({"page": index + 1, "slug": slug, "bands": bands, "files": files})

    print(json.dumps(summary, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
