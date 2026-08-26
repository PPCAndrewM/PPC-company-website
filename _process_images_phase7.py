"""
Phase 7 asset processing — Flexitanks page "Trailer & Reefer" card CGI swap.
Same approach as _process_images.py / _process_images_phase2..6.py: resize/
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

# Flexitanks page, "Trailer & Reefer" overview card: swap the old CGI
# (Product CGIs/12. Trailer1 valve - Cr.jpg) for a clearer render showing a
# 40ft reefer trailer with a 2-compartment flexitank loaded. Source is
# 3000x1687 (16:9) — centre-cropped to 2249 wide (4:3) so the card's
# aspect-ratio/object-fit:cover crop keeps both compartments and the truck
# cab in frame, matching the sibling cards' native aspect.
save_jpg(r"Product CGIs\40ft Reefer Frigo with 2 compartments.png",
         r"products\flexitank-trailer-reefer-2compartment.jpg", 800,
         crop_box=(375, 0, 2625, 1687))

print("\nDone.")
