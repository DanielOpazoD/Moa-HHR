"""Prove atlas round-trip and guard against destructive rebuilds."""

import json, tempfile, hashlib
from pathlib import Path
from pack import root, pack

scenes = json.loads((root / "new-scenes/manifest.json").read_text())
for scene in scenes:
    if not scene.get("frameFiles"):
        continue
    before = (root / scene["src"]).read_bytes()
    source = (root / scene["source"]).read_bytes()
    pack(scene, from_frames=True)
    assert before == (root / scene["src"]).read_bytes(), scene["id"]
    assert source == (root / scene["source"]).read_bytes()
assert all(len(s["frameFiles"]) == s["frames"] for s in scenes if s.get("frameFiles"))
print("Editable PNG → atlas round-trip identical; generated source sheets unchanged.")
