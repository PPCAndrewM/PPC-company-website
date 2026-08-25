"""
Phase 4 asset processing — Flexitank product page CGI cards (mirroring the
Dry Bulk Container Liners page format) + replacing CGI renders with real
photographs in both product pages' Gallery sections.
Same approach as previous phase scripts. Not part of the shipped site.
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
    print(f"{dst_rel:40s} {im.width}x{im.height}  {os.path.getsize(dst)//1024}KB")

# ---- Flexitank Overview: 6th format CGI (the other 5 were already
#      processed in Phase 1 — multi-liner, single-liner, special-design,
#      static-storage, heater-pad) ----
save_jpg(r"Product CGIs\12. Trailer1 valve - Cr.jpg", r"products\flexitank-trailer-reefer.jpg", 800)

# ---- Dry Bulk gallery: 2 real photos to replace the 2 CGI renders ----
save_jpg(r"Dry bulk phtographs\DSC_2650 klein.jpg", r"products\dbl-gallery-5.jpg", 968)
save_jpg(r"Dry bulk phtographs\dry-bulk-advert-2-pic-2.jpg", r"products\dbl-gallery-6.jpg", 514)

# ---- Flexitank gallery: 2 more real photos (flexi-2.jpg was already
#      processed in Phase 1 as flexitank-gallery-1.jpg but never used on
#      the page) to replace the 3 CGI renders ----
save_jpg(r"Flexitanks photographs\flexi-1.jpg", r"products\flexitank-gallery-3.jpg", 561)
save_jpg(r"Flexitanks photographs\recirculation-system.jpg", r"products\flexitank-gallery-4.jpg", 1400)

print("\nDone.")
