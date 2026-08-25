"""
Phase 5 asset processing — page-hero carousels rolled out to every
interior page. Almost every hero image was already processed in an
earlier phase and is simply reused here; this is the one genuinely new
source photo needed.
Not part of the shipped site.
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

# Industrial Packaging page-hero: real photo of double-decker bus cabs
# shrink-wrapped for transit, a strong match for "bespoke covers".
save_jpg(r"Industrial packaging photographs\industrial-cover-for-double-decker-buses.jpg",
         r"products\indpack-double-decker.jpg", 1800)

print("\nDone.")
