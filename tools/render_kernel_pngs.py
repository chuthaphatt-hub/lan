"""Render the supplied single-band Kernel Density GeoTIFFs as transparent map overlays."""
from pathlib import Path

import numpy as np
from PIL import Image


DATA = Path(__file__).parents[1] / "public" / "data"
FILES = ("kn_all", "kn_kl", "kn_kom", "kn_t")
LOW = np.array([35, 123, 112], dtype=float)
MID = np.array([212, 151, 38], dtype=float)
HIGH = np.array([150, 56, 46], dtype=float)

for name in FILES:
    values = np.asarray(Image.open(DATA / f"{name}.tif"), dtype=float)
    maximum = np.nanmax(values)
    intensity = np.clip(values / maximum, 0, 1)
    lower = intensity[..., None] < 0.5
    color = np.where(
        lower,
        LOW + (MID - LOW) * (intensity[..., None] * 2),
        MID + (HIGH - MID) * ((intensity[..., None] - 0.5) * 2),
    )
    alpha = np.where(values > 0, 35 + intensity * 185, 0)
    rgba = np.dstack((color, alpha)).astype(np.uint8)
    Image.fromarray(rgba, "RGBA").save(DATA / f"{name}.png", optimize=True)
