"""
Phase 9 asset processing — new Services section (Flexitank Inspection,
Emergency Cross-pumping, Installation Services, Dry Bulk Emergency Response).
Same approach as _process_images.py / _process_images_phase2..8.py: resize/
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
    print(f"{dst_rel:46s} {im.width}x{im.height}  {os.path.getsize(dst)//1024}KB")

# ---- Flexitank Inspection ----
save_jpg(r"Flexitank inspection\Inflation testing - Cr.jpg",
         r"services\flexitank-inspection-inflation-test.jpg", 1600)
save_jpg(r"Flexitank inspection\Inspection-02 - Cr.png",
         r"services\flexitank-inspection-workers.jpg", 1600)
# Replaces the inflation-test slide as the service page's lead hero image --
# shows a technician cutting open a leaking Flexitank to inspect the damage.
save_jpg(r"Flexitank inspection\cutting-leaking-flexi.jpg",
         r"services\flexitank-inspection-cutting-open.jpg", 1600)

# ---- Emergency Cross-pumping ----
save_jpg(r"Emergency cross-pumping\Cross-pumping - Cr.jpg",
         r"services\cross-pumping-containers.jpg", 1600)
save_jpg(r"Emergency cross-pumping\Pumping kit - Cr.jpeg",
         r"services\cross-pumping-coupling.jpg", 1600)

# ---- Installation Services ----
save_jpg(r"Installations photographs\flexitank-installation-2.jpg",
         r"services\installation-bulkhead.jpg", 1600)
save_jpg(r"Installations photographs\installation-of-liner.jpg",
         r"services\installation-liner-fit.jpg", 1600)
save_jpg(r"Installations photographs\PHOTO-2020-01-23-14-39-10-16-002.jpg",
         r"services\installation-liner-unfold.jpg", 1600)

# ---- Dry Bulk Emergency Response ----
save_jpg(r"Dry bulk Emergency response\damaged-dry-bulk-liner - Cr.png",
         r"services\dry-bulk-damaged-liner.jpg", 1600)
# Sourced from the general Emergency response photographs folder (no
# marketing-graphic overlay, unlike the two files in the dedicated
# "Dry bulk Emergency response" folder, which have Before/After banners
# baked into the image and don't match the rest of the site's plain-photo
# style).
save_jpg(r"Emergency response photographs\IBC-Emergency-response.jpg",
         r"services\dry-bulk-ibc-repack.jpg", 1600)

print("\nDone.")
