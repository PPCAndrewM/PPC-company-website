"""
Phase 8 asset processing — homepage hero carousel image swap.
Same approach as _process_images.py / _process_images_phase2..7.py: resize/
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

# Homepage hero carousel, slide 4: swap the flexitank-unloading shot for an
# edited version showing the blue shipping container. Source is the same
# 1536x2048 portrait framing as the original, so the same crop band
# (rows 550-1414, centred on the container/hose/tanker connection) applies.
save_jpg(r"Flexitanks photographs\Flexitank-unloading-trailer-edited-blue-container.png",
         r"hero\hero-flexitank-unloading-blue-container.jpg", 1536,
         crop_box=(0, 550, 1536, 1414))

print("\nDone.")
