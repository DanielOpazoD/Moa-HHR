import base64
from io import BytesIO
from pathlib import Path
import sys
import tempfile
import unittest
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from offline_assets import image_data, playback_scene


class OfflineAssets(unittest.TestCase):
    def test_lossless_transparency_and_unchanged_source(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "atlas.png"
            image = Image.new("RGBA", (80, 20), (12, 34, 56, 0))
            image.putpixel((3, 4), (200, 100, 50, 127))
            image.putpixel((5, 6), (30, 60, 90, 255))
            image.save(path)
            before = path.read_bytes()
            uri = image_data(path)
            decoded = base64.b64decode(uri.split(",", 1)[1])
            restored = Image.open(BytesIO(decoded)).convert("RGBA")
            self.assertEqual(restored.size, image.size)
            self.assertEqual(restored.tobytes(), image.tobytes())
            self.assertEqual(path.read_bytes(), before)
            self.assertLessEqual(len(decoded), len(before))

    def test_viewer_keeps_playback_and_context_without_mutation(self):
        source = dict(id="test", title="Moa", frames=8, durations=[500]*8,
                      cycles=1, still=7, src="atlas.png", context="Ficción",
                      category="Moa", pack="new", status="approved",
                      frameFiles=["000.png"], rejectedSources=["draft.png"])
        result = playback_scene(source)
        self.assertEqual(result["context"], "Ficción")
        self.assertEqual(result["durations"], source["durations"])
        self.assertEqual(len(result), 11)
        self.assertNotIn("frameFiles", result)
        self.assertIn("frameFiles", source)

    def test_offline_groups_cover_new_scenes_once_without_changing_catalog(self):
        from offline_assets import offline_groups
        catalog = [dict(id='original', pack='original'),
                   dict(id='B29', pack='new', batch='adventures-05'),
                   dict(id='D01', pack='new', batch='chile-remix-01'),
                   dict(id='old', pack='new'), dict(id='C21G', pack='new', frameSize=[576, 336], renderMode='smooth')]
        before = [dict(s) for s in catalog]
        groups = offline_groups(catalog)
        ids = [s['id'] for _, _, scenes, _, _ in groups for s in scenes]
        self.assertEqual(set(ids), {'B29', 'D01', 'old', 'C21G'})
        self.assertEqual(len(ids), len(set(ids)))
        self.assertEqual([s['id'] for s in groups[1][2]], ['D01'])
        self.assertEqual([s["id"] for s in groups[2][2]], ["C21G"])
        self.assertEqual(playback_scene(catalog[-1])["renderMode"], "smooth")
        self.assertEqual(playback_scene(catalog[-1])["frameSize"], [576, 336])
        self.assertEqual(catalog, before)
        self.assertEqual(groups[0][3], groups[1][0])
        self.assertEqual(groups[1][3], groups[0][0])
