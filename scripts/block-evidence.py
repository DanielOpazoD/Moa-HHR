"""Compose a named block's reviewed browser stills; no new sprite drawing."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, math, sys

root = Path(__file__).resolve().parents[1]
if len(sys.argv) != 2:
    raise SystemExit("Usage: python3 scripts/block-evidence.py BATCH")
batch = sys.argv[1]
scenes = [
    s
    for s in json.loads((root / "new-scenes/manifest.json").read_text())
    if s.get("batch") == batch
]
if not scenes:
    raise SystemExit("Unknown batch")
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 17)
canvas = Image.new("RGB", (3 * 480, math.ceil(len(scenes) / 3) * 340), "#f5f6f0")
draw = ImageDraw.Draw(canvas)
for i, s in enumerate(scenes):
    image = Image.open(root / f'evidence/{s["id"]}/browser-blue-3x.png').convert("RGB")
    x = i % 3 * 480
    y = i // 3 * 340
    canvas.paste(image, (x, y + 35))
    draw.text(
        (x + 12, y + 8),
        (
            s["title"]
            if "rapanuiOrder" in s
            else f'{s["expansionOrder"]:02} · {s["title"]}'
        ),
        font=font,
        fill="#233a40",
    )
output = root / f"evidence/{batch}-overview.png"
canvas.save(output)
print(output.relative_to(root))
