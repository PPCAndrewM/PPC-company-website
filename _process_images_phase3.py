"""
Phase 3 asset processing — homepage hero carousel.
Same approach as _process_images.py / _process_images_phase2.py: resize/
recompress source assets from Media/ into assets/images/. Not part of the
shipped site.
"""
import os
from PIL import Image

SRC = r"C:\dev\PPC-company-website\Media"
DST = r"C:\dev\PPC-company-website\assets\images"

def save_jpg(src_rel, dst_rel, max_w, quality=82, crop_box=None):
    src = os.path.join(SRC, src_rel)
    dst = os.path.join(DST, dst_rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(src).convert("RGB")
    if crop_box:
        im = im.crop(crop_box)
    if im.width > max_w:
        h = int(im.height * (max_w / im.width))
        im = im.resize((max_w, h), Image.LANCZOS)
    im.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{dst_rel:40s} {im.width}x{im.height}  {os.path.getsize(dst)//1024}KB")

# ---- Homepage hero carousel (existing slide 1 is hero/hero-flexitank-rail.jpg,
#      processed back in Phase 1) ----

# Slide 2: an inflated flexitank in open storage — well-framed landscape
# shot, no crop needed. Source is 1632x1224 (native, no upscale).
save_jpg(r"Flexitanks photographs\Ground Storage Tank.JPG", r"hero\hero-ground-storage-tank.jpg", 1632)

# Slide 3: high-res, well framed already — just downsized to match the other slides.
save_jpg(r"Dry bulk phtographs\Dry Bulk End fill liner 009.jpg", r"hero\hero-endfill-liner.jpg", 2200)

# Slide 4: source is portrait (1536x2048) — cropped to a 16:9 landscape band
# (rows 550-1414) centred on the container/hose/tanker connection, trimming
# the sky above and the coiled-hose foreground below.
save_jpg(r"Flexitanks photographs\Flexitank-unloading-trailer.jpg", r"hero\hero-flexitank-unloading.jpg", 1536,
         crop_box=(0, 550, 1536, 1414))

print("\nDone.")
