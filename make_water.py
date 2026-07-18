"""Generate a seamless looping 'moving water' mp4 from the ocean still.

Applies a time-varying sinusoidal displacement (ripple) plus a subtle caustic
brightness shimmer. All time terms are integer harmonics of the loop period, so
the first and last frames match and the clip loops seamlessly.
"""
import numpy as np
from PIL import Image
import imageio.v2 as imageio

SRC = "assets/bg-ocean.png"
OUT = "assets/water.mp4"
FPS = 18
DURATION = 9.0            # seconds per loop
N = int(FPS * DURATION)
MAXW = 1152

img = Image.open(SRC).convert("RGB")
w, h = img.size
if w > MAXW:
    h = int(h * MAXW / w)
    w = MAXW
w -= w % 2
h -= h % 2
img = img.resize((w, h), Image.LANCZOS)
base = np.asarray(img, dtype=np.float32)

yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
TWO_PI = 2.0 * np.pi

# spatial frequencies
ky = TWO_PI * 3.0 / h
kx = TWO_PI * 4.0 / w
ky2 = TWO_PI * 5.0 / h
kx2 = TWO_PI * 2.0 / w

writer = imageio.get_writer(
    OUT, fps=FPS, codec="libx264", macro_block_size=2,
    output_params=["-crf", "30", "-preset", "slower", "-pix_fmt", "yuv420p"],
)

for i in range(N):
    ph = TWO_PI * i / N            # one full turn over the loop => seamless
    # horizontal + vertical ripple (integer harmonics of ph)
    dx = 7.0 * np.sin(ky * yy + ph) + 4.0 * np.sin(kx2 * xx - 2 * ph)
    dy = 6.0 * np.sin(kx * xx + ph) + 3.0 * np.sin(ky2 * yy + 2 * ph)

    sx = np.clip(xx + dx, 0, w - 1).astype(np.int32)
    sy = np.clip(yy + dy, 0, h - 1).astype(np.int32)
    frame = base[sy, sx]

    # subtle caustic shimmer
    shimmer = 1.0 + 0.05 * np.sin(kx * xx + ky * yy + ph)
    frame = np.clip(frame * shimmer[..., None], 0, 255).astype(np.uint8)

    writer.append_data(frame)

writer.close()
print(f"wrote {OUT} ({w}x{h}, {N} frames @ {FPS}fps)")
