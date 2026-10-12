"""Package imagegen raster cells; no drawing, pose duplication or per-frame scaling.
Register rows to a common baseline, then use ONE union crop and scale for the scene.
"""

from PIL import Image
from pathlib import Path
import json, sys, hashlib, io, math

root = Path(__file__).resolve().parents[1]


def validate_metadata(scene):
    n = scene.get("frames")
    durations = scene.get("durations", [])
    cycles = scene.get("cycles")
    still = scene.get("still")
    if type(n) is not int or not 1 <= n <= 24:
        raise ValueError("frames must be an integer from 1 to 24")
    if len(durations) != n or any(
        type(d) not in (int, float) or not math.isfinite(d) or d <= 0 for d in durations
    ):
        raise ValueError("one positive finite duration per frame is required")
    if (
        type(cycles) is not int
        or cycles < 1
        or not 2999.99 <= sum(durations) * cycles <= 6000.01
    ):
        raise ValueError("finite total duration must be 3–6 seconds")
    if type(still) is not int or not 0 <= still < n:
        raise ValueError("still must index a frame")
    if type(scene.get("version")) is not int or scene["version"] < 1:
        raise ValueError("positive version required")
    if (
        not (root / scene["src"])
        .resolve()
        .is_relative_to((root / "new-scenes/atlases").resolve())
    ):
        raise ValueError("atlas output must remain in new-scenes/atlases")
    if scene.get("frameFiles") and len(scene["frameFiles"]) != n:
        raise ValueError("frameFiles order must contain exactly N entries")


def pack(scene, from_frames=False):
    validate_metadata(scene)
    rows = (scene["frames"] + 3) // 4
    if from_frames:
        frames = [
            Image.open(root / name).convert("RGBA") for name in scene["frameFiles"]
        ]
        if len(frames) != scene["frames"] or any(f.size != (288, 168) for f in frames):
            raise ValueError("Frame count or canvas mismatch")
    else:
        source = root / scene["source"]
        im = Image.open(source).convert("RGBA")
        cols = scene.get("sourceGridColumns", 4)
        if type(cols) is not int or not 1 <= cols <= 8:
            raise ValueError("sourceGridColumns must be 1–8")
        rows = math.ceil(scene["frames"] / cols)
        alpha = im.getchannel("A")
        mask = alpha.point(lambda a: 255 if a >= 64 else 0)
        occupied = [
            y for y in range(im.height) if mask.crop((0, y, im.width, y + 1)).getbbox()
        ]
        runs = []
        for y in occupied:
            if not runs or y > runs[-1][-1] + 1:
                runs.append([y])
            else:
                runs[-1].append(y)
        runs = [r for r in runs if len(r) > 20]
        if len(runs) != rows and "sourceRows" not in scene:
            raise ValueError(
                f'{scene["id"]}: expected {rows} visible rows, got {[(r[0],r[-1]) for r in runs]}'
            )
        cuts = scene.get("sourceRows") or [0] + [
            (runs[i][-1] + runs[i + 1][0]) // 2 for i in range(rows - 1)
        ] + [im.height]
        column_cuts = scene.get(
            "sourceColumns", [i * (im.width // cols) for i in range(cols + 1)]
        )
        for values, count, limit in [
            (cuts, rows, im.height),
            (column_cuts, cols, im.width),
        ]:
            if (
                len(values) != count + 1
                or any(type(v) is not int for v in values)
                or values[0] < 0
                or values[-1] > limit
                or any(a >= b for a, b in zip(values, values[1:]))
            ):
                raise ValueError("invalid source grid boundaries")
        widths = [column_cuts[i + 1] - column_cuts[i] for i in range(cols)]
        cellw = max(widths)
        cellh = max(cuts[i + 1] - cuts[i] for i in range(rows)) + 30
        registered = []
        offsets = []
        for row in range(rows):
            baseline = (
                scene["sourceRowBaselines"][row]
                if "sourceRowBaselines" in scene
                else cuts[row]
                + mask.crop((0, cuts[row], im.width, cuts[row + 1])).getbbox()[3]
            )
            for col in range(cols):
                if row * cols + col >= scene["frames"]:
                    break
                cell = im.crop(
                    (column_cuts[col], cuts[row], column_cuts[col + 1], cuts[row + 1])
                )
                edge = cell.getchannel("A").point(lambda a: 255 if a >= 64 else 0)
                if (
                    edge.crop((0, 0, 2, cell.height)).getbbox()
                    or edge.crop((cell.width - 2, 0, cell.width, cell.height)).getbbox()
                ):
                    raise ValueError(
                        f'{scene["id"]}: source column cuts cross artwork; specify sourceColumns'
                    )
                canvas = Image.new("RGBA", (cellw, cellh))
                offset = cellh - 8 - (baseline - cuts[row])
                canvas.paste(cell, ((cellw - widths[col]) // 2, offset))
                registered.append(canvas)
                offsets.append([(cellw - widths[col]) // 2, offset])
        boxes = [
            f.getchannel("A").point(lambda a: 255 if a >= 8 else 0).getbbox()
            for f in registered
        ]
        if any(b is None for b in boxes):
            raise ValueError("Empty frame")
        union = (
            max(0, min(b[0] for b in boxes) - 3),
            max(0, min(b[1] for b in boxes) - 3),
            min(cellw, max(b[2] for b in boxes) + 3),
            min(cellh, max(b[3] for b in boxes) + 3),
        )
        w, h = union[2] - union[0], union[3] - union[1]
        scale = min(228 / w, 150 / h)
        size = (round(w * scale), round(h * scale))
        frames = []
        for f in registered:
            frame = Image.new("RGBA", (288, 168))
            tile = f.crop(union).resize(size, Image.Resampling.NEAREST)
            frame.paste(tile, (120 - size[0] // 2, 162 - size[1]))
            frames.append(frame)
        scene["packaging"] = {
            "sourceSize": im.size,
            "rowCuts": cuts,
            "columnCuts": column_cuts,
            "rowBaselineRegistration": offsets,
            "unionCrop": union,
            "sharedScale": scale,
            "frameSize": [288, 168],
            "origin": [0, 0],
            "trajectory": [[0, 0], [0, 0]],
        }
        folder = root / "new-scenes/frames" / f"{scene['id']}-v{scene['version']}"
        folder.mkdir(parents=True, exist_ok=True)
        scene["frameFiles"] = []
        for i, f in enumerate(frames):
            path = folder / f"{i:03}.png"
            if (
                path.exists()
                and Image.open(path).convert("RGBA").tobytes() != f.tobytes()
            ):
                raise ValueError(
                    f"{path}: preserve edits; use a new version or rebuild from frames"
                )
            if not path.exists():
                f.save(path, optimize=True)
            scene["frameFiles"].append(str(path.relative_to(root)))
    atlas = Image.new("RGBA", (288 * len(frames), 168))
    for i, f in enumerate(frames):
        atlas.paste(f, (288 * i, 0))
    out = root / scene["src"]
    out.parent.mkdir(parents=True, exist_ok=True)
    buffer = io.BytesIO()
    atlas.quantize(
        colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE
    ).save(buffer, format="PNG", optimize=True)
    output = buffer.getvalue()
    if out.exists() and out.read_bytes() != output:
        raise ValueError(
            f"{out}: published/versioned atlas differs; choose a new version and output path"
        )
    out.write_bytes(output)
    # Review the exact delivered palette/alpha, not the pre-optimization canvas.
    delivered = Image.open(out).convert("RGBA")
    frames = [
        delivered.crop((i * 288, 0, (i + 1) * 288, 168)) for i in range(scene["frames"])
    ]
    scene["sourceSha256"] = (
        hashlib.sha256((root / scene["source"]).read_bytes()).hexdigest()
        if (root / scene["source"]).exists()
        else scene.get("sourceSha256")
    )
    scene["frameSha256"] = [
        hashlib.sha256((root / name).read_bytes()).hexdigest()
        for name in scene["frameFiles"]
    ]
    scene["bytes"] = out.stat().st_size
    scene["sha256"] = hashlib.sha256(out.read_bytes()).hexdigest()
    # Visual review artifacts retain all frames, no invented inbetweens.
    rows = math.ceil(scene["frames"] / 4)
    review = root / "evidence" / scene["id"]
    review.mkdir(parents=True, exist_ok=True)
    for bg, color in [("light", "#f5f6f0"), ("dark", "#18282d"), ("blue", "#174f7d")]:
        sheet = Image.new("RGB", (4 * 288, rows * 168), color)
        for i, f in enumerate(frames):
            sheet.paste(f, (i % 4 * 288, i // 4 * 168), f)
        sheet.save(review / f"{bg}-frames.png")
        anim = []
        for f in frames:
            rgb = Image.new("RGB", f.size, color)
            rgb.paste(f, (0, 0), f)
            anim.append(rgb.resize((144, 84), Image.Resampling.NEAREST))
        # GIF is review evidence only; PNG atlas is production, finite player controls motion.
        anim[0].save(
            review / f"{bg}-preview.gif",
            save_all=True,
            append_images=anim[1:],
            duration=scene["durations"],
        )
    panels = [
        Image.open(review / f"{bg}-frames.png").resize(
            (576, rows * 84), Image.Resampling.NEAREST
        )
        for bg in ["light", "dark", "blue"]
    ]
    panel = Image.new("RGB", (576, rows * 84 * 3))
    for i, part in enumerate(panels):
        panel.paste(part, (0, i * rows * 84))
    panel.save(review / "review-real-size.png")
    print(scene["id"], len(frames), "frames", scene["bytes"], "bytes")


if __name__ == "__main__":
    files = sorted((root / "new-scenes/scenes").glob("*.json"))
    for path in files:
        scene = json.loads(path.read_text())
        if not sys.argv[1:] or scene["id"] in sys.argv[1:]:
            pack(scene)
            path.write_text(json.dumps(scene, ensure_ascii=False, indent=2) + "\n")
