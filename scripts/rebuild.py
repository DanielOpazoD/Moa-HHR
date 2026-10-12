"""Rebuild one editable scene JSON from its ordered individual PNGs."""

import json, sys
from pathlib import Path
from pack import pack, root

if len(sys.argv) != 2:
    raise SystemExit("Usage: python3 scripts/rebuild.py new-scenes/scenes/SCENE.json")
p = Path(sys.argv[1])
scene = json.loads(p.read_text())
pack(scene, from_frames=True)
p.write_text(json.dumps(scene, ensure_ascii=False, indent=2) + "\n")
