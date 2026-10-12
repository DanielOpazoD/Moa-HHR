import unittest, tempfile, sys, json, copy
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import pack
from PIL import Image


class EditablePack(unittest.TestCase):
    def test_non_multiple_n_and_round_trip(self):
        realroot = pack.root
        template = json.loads((realroot / "new-scenes/manifest.json").read_text())[0]
        sources = [
            realroot / p
            for s in json.loads((realroot / "new-scenes/manifest.json").read_text())[:2]
            for p in s["frameFiles"]
        ]
        try:
            with tempfile.TemporaryDirectory() as tmp:
                pack.root = Path(tmp)
                for n in [9, 13]:
                    s = copy.deepcopy(template)
                    s.update(
                        id=f"edit-{n}",
                        frames=n,
                        still=n - 1,
                        durations=[4000 / n] * n,
                        src=f"new-scenes/atlases/edit-{n}-v1.png",
                        frameFiles=[],
                    )
                    # Test fixture uses crops from available raster inputs; not published art.
                    for i in range(n):
                        target = pack.root / f"new-scenes/frames/test-{n}/{i:03}.png"
                        target.parent.mkdir(parents=True, exist_ok=True)
                        data = sources[i % len(sources)].read_bytes()
                        target.write_bytes(data)
                        s["frameFiles"].append(str(target.relative_to(pack.root)))
                    original = [(pack.root / p).read_bytes() for p in s["frameFiles"]]
                    pack.pack(s, from_frames=True)
                    first = (pack.root / s["src"]).read_bytes()
                    pack.pack(s, from_frames=True)
                    self.assertEqual(first, (pack.root / s["src"]).read_bytes())
                    with Image.open(pack.root / s["src"]) as atlas:
                        self.assertEqual(atlas.size, (288 * n, 168))
                    self.assertEqual(
                        original,
                        [(pack.root / p).read_bytes() for p in s["frameFiles"]],
                    )
                    # Source extraction also accepts a partial last grid row.
                    raw = Image.new("RGBA", (4 * 288, ((n + 3) // 4) * 168))
                    for i, name in enumerate(s["frameFiles"]):
                        raw.paste(
                            Image.open(pack.root / name).convert("RGBA"),
                            ((i % 4) * 288, (i // 4) * 168),
                        )
                    source = pack.root / f"new-scenes/source-{n}.png"
                    raw.save(source)
                    extracted = copy.deepcopy(s)
                    extracted.update(
                        id=f"extract-{n}",
                        version=2,
                        src=f"new-scenes/atlases/extract-{n}-v2.png",
                        source=str(source.relative_to(pack.root)),
                        sourceGridColumns=4,
                    )
                    extracted.pop("frameFiles")
                    pack.pack(extracted)
                    self.assertEqual(len(extracted["frameFiles"]), n)
                    # A destructive overwrite is refused; a new version is required.
                    f = Image.open(pack.root / s["frameFiles"][0]).convert("RGBA")
                    f.putpixel((144, 100), (255, 0, 0, 255))
                    f.save(pack.root / s["frameFiles"][0])
                    with self.assertRaisesRegex(ValueError, "new version"):
                        pack.pack(s, from_frames=True)
        finally:
            pack.root = realroot

    def test_invalid_metadata(self):
        base = dict(
            frames=8,
            durations=[500] * 8,
            cycles=1,
            still=3,
            version=1,
            src="new-scenes/atlases/test-v1.png",
        )
        for change in [
            dict(frames=0),
            dict(frames=25),
            dict(durations=[500]),
            dict(durations=[float("nan")] * 8),
            dict(cycles=0),
            dict(still=8),
            dict(version=0),
            dict(src="originals/hhr/x.png"),
        ]:
            with self.subTest(change=change), self.assertRaises(ValueError):
                pack.validate_metadata(base | change)


if __name__ == "__main__":
    unittest.main()
