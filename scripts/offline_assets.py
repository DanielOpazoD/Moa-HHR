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
    keys = ("id", "title", "category", "pack", "status", "frames", "durations", "cycles", "still", "src", "context")
    return {key: scene[key] for key in keys if key in scene}
