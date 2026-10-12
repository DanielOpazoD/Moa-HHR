from pathlib import Path
from PIL import Image
import json, hashlib

root = Path(__file__).resolve().parents[1]
inventory = json.loads((root / "docs/inventory.json").read_text())
original = 0
for item in inventory["files"]:
    p = root / item["path"]
    assert p.stat().st_size == item["bytes"]
    assert hashlib.sha256(p.read_bytes()).hexdigest() == item["sha256"], p
    if p.suffix == ".png":
        original += item["bytes"]
assert original < 4194304
assert len([s for s in inventory["files"] if s["path"].endswith(".png")]) == 18
scenes = json.loads((root / "scenes.json").read_text())
ids = set()
totalnew = 0
for s in scenes:
    assert s["id"] not in ids
    ids.add(s["id"])
    n = s["frames"]
    assert 1 <= n <= 24
    assert len(s["durations"]) == n and all(d > 0 for d in s["durations"])
    assert 2999.99 <= sum(s["durations"]) * s["cycles"] <= 6000.01
    assert 0 <= s["still"] < n
    path = root / s["src"]
    assert path.stat().st_size < 300000, (s["id"], path.stat().st_size)
    im = Image.open(path).convert("RGBA")
    assert im.size == (n * 288, 168)
    hashes = set()
    for i in range(n):
        f = im.crop((i * 288, 0, (i + 1) * 288, 168))
        a = f.getchannel("A")
        assert a.getextrema()[0] == 0 and a.getextrema()[1] > 200
        hashes.add(hashlib.sha256(f.tobytes()).hexdigest())
        if s["pack"] == "new":
            assert a.crop((240, 0, 288, 48)).getbbox() is None, (
                s["id"],
                i,
                "X overlap",
            )
            for box, label in [
                ((0, 0, 288, 3), "top"),
                ((0, 165, 288, 168), "bottom"),
                ((0, 0, 3, 168), "left"),
                ((285, 0, 288, 168), "right"),
            ]:
                assert a.crop(box).getbbox() is None, (s["id"], i, label + " margin")
    assert len(hashes) == n, (s["id"], "duplicate frames")
    if s["pack"] == "new":
        totalnew += path.stat().st_size
        assert hashlib.sha256(path.read_bytes()).hexdigest() == s["sha256"]
print(
    f"{len(scenes)} scenes validated; original={original:,} / 4,194,304 bytes; separate new package={totalnew:,} bytes. Every atlas <300,000 bytes."
)
# Sidecars are authoritative; generated indexes must match and editable sources remain verifiable.
sidecars = sorted(
    [json.loads(p.read_text()) for p in (root / "new-scenes/scenes").glob("*.json")],
    key=lambda s: s["order"],
)
assert sidecars == json.loads(
    (root / "new-scenes/manifest.json").read_text()
), "run scripts/catalog.py after editing sidecars"
for s in sidecars:
    assert (
        hashlib.sha256((root / s["source"]).read_bytes()).hexdigest()
        == s["sourceSha256"]
    ), (s["id"] + " source changed")
    assert len(s["frameFiles"]) == s["frames"] == len(s["frameSha256"])
    for name, digest in zip(s["frameFiles"], s["frameSha256"]):
        p = root / name
        assert Image.open(p).size == (288, 168)
        assert hashlib.sha256(p.read_bytes()).hexdigest() == digest, name
print(
    f'{len(sidecars)} per-scene manifests and {sum(s["frames"] for s in sidecars)} editable PNGs verified.'
)
