"""
Phase 6 asset processing — homepage hero carousel image swap.
Same approach as _process_images.py / _process_images_phase2..5.py: resize/
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

# Homepage hero carousel: swap the "ground storage tank" slide for a newer
# shot of the same tank with a blue PVC curtain visible. Source is 1632x1224
# (native, no upscale, no crop) — same framing as the slide it replaces.
save_jpg(r"Flexitanks photographs\Ground Storage Tank-with blue PVC curtain.png",
         r"hero\hero-ground-storage-tank-blue-curtain.jpg", 1632)

print("\nDone.")
