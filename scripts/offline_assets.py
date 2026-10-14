"""Compact offline assets without changing editable PNG sources or decoded pixels."""

import base64
from io import BytesIO
from PIL import Image


def image_data(path):
    original = path.read_bytes()
    with Image.open(BytesIO(original)) as source:
        rgba = source.convert("RGBA")
        encoded = BytesIO()
        rgba.save(encoded, format="WEBP", lossless=True, exact=True, method=6)
        compressed = encoded.getvalue()
        with Image.open(BytesIO(compressed)) as restored:
            if restored.convert("RGBA").tobytes() != rgba.tobytes():
                raise ValueError(f"Offline compression changed pixels: {path}")
    mime, data = ("image/webp", compressed) if len(compressed) < len(original) else ("image/png", original)
    return f"data:{mime};base64," + base64.b64encode(data).decode()


def playback_scene(scene):
    """Authoring metadata remains in repository sidecars, not duplicated in the viewer."""
    keys = ("id", "title", "category", "pack", "status", "frames", "durations", "cycles", "still", "src", "context", "frameSize", "renderMode")
    return {key: scene[key] for key in keys if key in scene}


def offline_groups(catalog):
    """Keep each self-contained download bounded while the main catalog stays unified."""
    new = [s for s in catalog if s["pack"] == "new"]
    hd = [s for s in new if s.get("frameSize") == [576, 336]]
    hd_ids = {s["id"] for s in hd}
    remix = [s for s in new if s["id"] not in hd_ids and s.get("batch", "").startswith("chile-remix-")]
    remix_ids = {s["id"] for s in remix}
    legacy = [s for s in new if s["id"] not in remix_ids | hd_ids]
    groups = [
        ("moa-scenes.html", "Colecciones anteriores", legacy, "moa-chile-remix.html", "Chile: memes y encuentros"),
        ("moa-chile-remix.html", "Chile: memes y encuentros", remix, "moa-scenes.html", "Colecciones anteriores"),
    ]

    if hd:
        groups.append(("moa-leo-rey-giro.html", "Alta resolución", hd, "moa-scenes.html", "Colecciones anteriores"))
    return groups
