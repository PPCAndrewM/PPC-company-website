"""
Phase 10 asset processing — About page heritage photos.
Same approach as _process_images.py / _process_images_phase2..9.py: resize/
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

# About page, "Hands-on from day one" archive gallery.
save_jpg(r"About us photographs\old-opening-container.JPG",
         r"about\old-opening-container.jpg", 1200)
save_jpg(r"About us photographs\old-installation.JPEG",
         r"about\old-installation.jpg", 1200)

print("\nDone.")
