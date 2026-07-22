"""
One-off asset processing script for the PPC Philton website mock-up.
Resizes and re-compresses source assets from Media/ into assets/images/
at sensible web dimensions. Not part of the shipped site.
"""
import os
from PIL import Image

SRC = r"C:\dev\company-website\Media"
DST = r"C:\dev\company-website\assets\images"

def save_jpg(src_rel, dst_rel, max_w, quality=82):
    src = os.path.join(SRC, src_rel)
    dst = os.path.join(DST, dst_rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(src).convert("RGB")
    if im.width > max_w:
        h = int(im.height * (max_w / im.width))
        im = im.resize((max_w, h), Image.LANCZOS)
    im.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{dst_rel:55s} {im.width}x{im.height}  {os.path.getsize(dst)//1024}KB")

def save_png(src_rel, dst_rel, max_w):
    src = os.path.join(SRC, src_rel)
    dst = os.path.join(DST, dst_rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(src)
    if im.mode not in ("RGBA", "RGB"):
        im = im.convert("RGBA")
    if im.width > max_w:
        h = int(im.height * (max_w / im.width))
        im = im.resize((max_w, h), Image.LANCZOS)
    im.save(dst, "PNG", optimize=True)
    print(f"{dst_rel:55s} {im.width}x{im.height}  {os.path.getsize(dst)//1024}KB")

# --- Logo ---
save_png(r"PPC Logo\PPC Philton Large Logo.png", r"logo\ppc-philton-logo.png", 480)
save_png(r"PPC Logo\PPC logo.png", r"logo\ppc-mark.png", 256)

# --- Hero ---
save_jpg(r"Flexitanks photographs\Flexitank-rail-testing.jpg", r"hero\hero-flexitank-rail.jpg", 2200, 80)

# --- About / Manufacturing ---
save_jpg(r"About us photographs\PPC Philton automated production line - Edited active screen and Green button on.png", r"about\production-line.jpg", 1600)
save_jpg(r"About us photographs\Flexitank tester platform.png", r"about\testing-platform.jpg", 1200)
save_jpg(r"About us photographs\Production circa 1974.jpg", r"about\production-1974.jpg", 900)

# --- Product category cards (homepage) ---
save_png(r"Product CGIs\1 - Backfill - Cr.png", r"products\dry-bulk-container-liners.png", 900)
save_jpg(r"Flexitanks photographs\flexi-1.jpg", r"products\flexitanks.jpg", 900)
save_jpg(r"Industrial packaging photographs\pharmaceutical-bag.jpg", r"products\containment-bags.jpg", 900)
save_jpg(r"Industrial packaging photographs\industrial-cover-for-double-decker-buses.jpg", r"products\industrial-packaging.jpg", 900)
save_png(r"Bladder tanks and agriculture applications CGIs\bladder-tank.png", r"products\bladder-tanks.png", 900)

# --- Certifications ---
save_jpg(r"SGS ISO9001 Logo\SGS ISO 9001 UKAS_TCL_HR.jpg", r"certifications\iso-9001-sgs-ukas.jpg", 700)

# --- Flexitank product page gallery ---
save_jpg(r"Flexitanks photographs\flexi-2.jpg", r"products\flexitank-gallery-1.jpg", 1200)
save_jpg(r"Flexitanks photographs\unloading-of-flexitank.png", r"products\flexitank-gallery-2.jpg", 1200)
save_png(r"Product CGIs\13 - Multi Liner - Cr.png", r"products\flexitank-multi-liner.png", 800)
save_png(r"Product CGIs\14 - Single Liner - Cr.png", r"products\flexitank-single-liner.png", 800)
save_png(r"Product CGIs\10 - Special Design - Cr.png", r"products\flexitank-special-design.png", 800)
save_png(r"Product CGIs\11. Static Storage - Cr.png", r"products\flexitank-static-storage.png", 800)
save_png(r"Product CGIs\9 - Heater Pad 9 KR_Edited_6_Updated (Feb 7th, 2025) - Cr.png", r"products\flexitank-heater-pad.png", 800)
save_jpg(r"Emergency response photographs\Inflated-Flexitank-for-leakage-inspection.jpg", r"products\flexitank-inspection.jpg", 1200)

# --- Industries: chemical page ---
save_png(r"Emergency response photographs\crosspump-with-manufacturer-name-removed.png", r"industries\chemical-cross-pumping.png", 1200)
save_jpg(r"Dry bulk phtographs\dry-bulk-2-rotated.jpg", r"products\dry-bulk-secondary.jpg", 900)

print("\nDone.")
