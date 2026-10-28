"""Key out the green background of the hand artwork, crop, save transparent WebP + PNG,
and measure fingertip / wrist anchor points as percentages of the cropped image.
Usage: python3 -I hands.py <left.jpeg> <right.jpeg> <out_dir>
"""
import json, sys
import numpy as np
from PIL import Image

HAND = np.array([0xF5, 0xF3, 0xEE], dtype=np.float32)


def key(path):
    im = np.asarray(Image.open(path).convert("RGB")).astype(np.float32)
    lum = im @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    h, w = lum.shape
    corners = np.concatenate([lum[:40, :40].ravel(), lum[:40, -40:].ravel(), lum[-40:, :40].ravel(), lum[-40:, -40:].ravel()])
    l_bg = float(np.median(corners))
    l_hand = float(HAND @ np.array([0.299, 0.587, 0.114]))
    lo, hi = l_bg + 18, l_hand - 22          # margins swallow JPEG noise on both sides
    a = np.clip((lum - lo) / (hi - lo), 0, 1)
    return a, l_bg


def crop(alpha):
    ys, xs = np.where(alpha > 0.02)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def save(alpha, box, out_base):
    x0, y0, x1, y1 = box
    a = alpha[y0:y1, x0:x1]
    rgba = np.zeros((*a.shape, 4), dtype=np.uint8)
    rgba[..., :3] = HAND.astype(np.uint8)
    rgba[..., 3] = (a * 255).round().astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    img.save(out_base + ".webp", quality=92, method=6)
    img.save(out_base + ".png", optimize=True)
    return a


def column_span(a, x):
    ys = np.where(a[:, x] > 0.5)[0]
    return ys.min(), ys.max()


def anchors(a, side, wrist_x_frac):
    h, w = a.shape
    solid = a > 0.5
    cols = np.where(solid.any(axis=0))[0]
    tip_x = cols.max() if side == "left" else cols.min()
    tip_y = np.where(solid[:, tip_x])[0].mean()
    wx = int(w * wrist_x_frac)
    top, bot = column_span(a, wx)
    return {
        "fingertip": {"x": round(tip_x / w * 100, 2), "y": round(tip_y / h * 100, 2)},
        "wrist": {"x": round(wx / w * 100, 2), "y": round((top + bot) / 2 / h * 100, 2)},
        "wristThickness": round((bot - top) / h * 100, 2),   # % of image height
        "size": {"w": int(w), "h": int(h)},
    }


left_path, right_path, out = sys.argv[1], sys.argv[2], sys.argv[3]
res = {}
for side, path, wrist_frac in (("left", left_path, 0.33), ("right", right_path, 0.66)):
    alpha, l_bg = key(path)
    box = crop(alpha)
    a = save(alpha, box, f"{out}/{side}-hand")
    res[side] = anchors(a, side, wrist_frac)
    res[side]["crop"] = [int(v) for v in box]
    res[side]["bgLum"] = round(l_bg, 1)
print(json.dumps(res, indent=1))
