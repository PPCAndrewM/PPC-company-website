"""
Phase 2 asset processing — same approach as _process_images.py (Phase 1):
resize/recompress source assets from Media/ into assets/images/ at sensible
web dimensions. Not part of the shipped site.
"""
import os
from PIL import Image

SRC = r"C:\dev\PPC-company-website\Media"
DST = r"C:\dev\PPC-company-website\assets\images"

def save_jpg(src_rel, dst_rel, max_w, quality=82):
    src = os.path.join(SRC, src_rel)
    dst = os.path.join(DST, dst_rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(src).convert("RGB")
    if im.width > max_w:
        h = int(im.height * (max_w / im.width))
        im = im.resize((max_w, h), Image.LANCZOS)
    im.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{dst_rel:60s} {im.width}x{im.height}  {os.path.getsize(dst)//1024}KB")

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
    print(f"{dst_rel:60s} {im.width}x{im.height}  {os.path.getsize(dst)//1024}KB")

# ---- Dry Bulk Container Liners: 8 sub-types + gallery ----
save_png(r"Product CGIs\8 - Top Fill - Cr.png", r"products\dbl-top-fill.png", 800)
save_png(r"Product CGIs\6. Open Ended - Cr.png", r"products\dbl-open-ended.png", 800)
save_png(r"Product CGIs\5. Foil Liner - Cr.png", r"products\dbl-foil-liner.png", 800)
save_png(r"Product CGIs\2 - Barless Liner - Cr.png", r"products\dbl-barless-liner.png", 800)
save_png(r"Product CGIs\4. Fluidising Liner - Cr.png", r"products\dbl-fluidising-liner.png", 800)
save_png(r"Product CGIs\7.Thermal Liner - Cr.png", r"products\dbl-thermal-liner.png", 800)
save_png(r"Product CGIs\3 - Bulkhead Sheet - Cr.png", r"products\dbl-bulkhead-sheet.png", 800)
save_jpg(r"Dry bulk phtographs\IMG_2128.jpg", r"products\dbl-gallery-1.jpg", 1200)
save_jpg(r"Dry bulk phtographs\IMG_3713.jpg", r"products\dbl-gallery-2.jpg", 1200)
save_jpg(r"Dry bulk phtographs\drip-tray-1-rotated.jpg", r"products\dbl-gallery-3.jpg", 1200)
save_jpg(r"Dry bulk phtographs\thermal-liner-1.jpg", r"products\dbl-gallery-4.jpg", 1200)

# ---- Containment Bags ----
save_jpg(r"Industrial packaging photographs\containment-enclosure.jpg", r"products\containment-hero.jpg", 1600)
save_png(r"Product CGIs\27. Containment Enclosure - Cr.png", r"products\containment-cubicle.png", 800)
save_jpg(r"Industrial packaging photographs\inner-liner-for-seafood-for-Guernsey-Sea-Farms.jpg", r"products\containment-seafood-liner.jpg", 1200)
save_jpg(r"Industrial packaging photographs\octobins (1).jpg", r"products\containment-octobins.jpg", 1200)

# ---- Industrial Packaging ----
save_jpg(r"Industrial packaging photographs\cover-building.jpg", r"products\indpack-hero.jpg", 1600)
save_jpg(r"Industrial packaging photographs\marine-cargo-cover.jpg", r"products\indpack-marine-cover.jpg", 1200)
save_png(r"Product CGIs\20. Lorry Cab - Cr.png", r"products\indpack-lorry-cab.png", 800)
save_png(r"Product CGIs\21. Circular based liner - Cr.png", r"products\indpack-circular-liner.png", 800)
save_png(r"Product CGIs\22.Truck Liner - Cr.png", r"products\indpack-truck-liner.png", 800)
save_png(r"Product CGIs\23. Various Shaped Bags - Cr.png", r"products\indpack-shaped-bags.png", 800)
save_png(r"Product CGIs\24. Square - Cr.png", r"products\indpack-square-liner.png", 800)
save_png(r"Product CGIs\16. Shrink Wrap - Cr.png", r"products\indpack-shrink-wrap.png", 800)
save_png(r"Product CGIs\17. Polythene Films - Cr.png", r"products\indpack-films.png", 800)
save_png(r"Product CGIs\15. Box Liner - Cr.png", r"products\indpack-box-liner.png", 800)

# ---- Bladder Tanks & Agriculture ----
save_png(r"Bladder tanks and agriculture applications CGIs\Open-silo-bag.png", r"products\bladder-open-silo-bag.png", 800)
save_png(r"Bladder tanks and agriculture applications CGIs\fertiliser-storage.png", r"products\bladder-fertiliser-storage.png", 800)
save_png(r"Bladder tanks and agriculture applications CGIs\fire-protection.png", r"products\bladder-fire-protection.png", 800)
save_png(r"Bladder tanks and agriculture applications CGIs\flood-barrier.png", r"products\bladder-flood-barrier.png", 800)
save_png(r"Bladder tanks and agriculture applications CGIs\rain-collection.png", r"products\bladder-rain-collection.png", 800)
save_png(r"Bladder tanks and agriculture applications CGIs\silo-bag.png", r"products\bladder-silo-bag.png", 800)
save_png(r"Bladder tanks and agriculture applications CGIs\warehouse.png", r"products\bladder-warehouse.png", 800)
save_png(r"Bladder tanks and agriculture applications CGIs\field-with-sheeps.png", r"products\bladder-field-sheep.png", 900)
save_png(r"Bladder tanks and agriculture applications CGIs\house-garden.png", r"products\bladder-house-garden.png", 800)

print("\nDone.")
