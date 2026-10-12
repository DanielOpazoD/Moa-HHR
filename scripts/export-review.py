"""Export the existing gallery as one offline review file; no new art or runtime dependency."""

from pathlib import Path
import base64, json, subprocess

root = Path(__file__).resolve().parents[1]


def png_data(path):
    return (
        "data:image/png;base64," + base64.b64encode((root / path).read_bytes()).decode()
    )


scenes = [
    s for s in json.loads((root / "scenes.json").read_text()) if s["pack"] == "new"
]
for scene in scenes:
    scene["src"] = png_data(scene["src"])
player = (
    (root / "src/player.js")
    .read_text()
    .replace("export function", "function")
    .replace("export class", "class")
    .replace(
        "originals/hhr/public/images/moa/moa-wave-v2.png",
        png_data("originals/hhr/public/images/moa/moa-wave-v2.png"),
    )
)
app = (
    (root / "src/app.js")
    .read_text()
    .replace('import { MoaPlayer } from "./player.js";', "")
)
start = app.index("  const response = await fetch(")
end = app.index("  filter();", start)
app = (
    app[:start]
    + "  scenes = "
    + json.dumps(scenes, ensure_ascii=False)
    + ";\n"
    + app[end:]
)
html = (
    (root / "index.html")
    .read_text()
    .replace(
        '<link rel="stylesheet" href="src/style.css" />',
        "<style>" + (root / "src/style.css").read_text() + "</style>",
    )
    .replace(
        '<script type="module" src="src/app.js"></script>',
        '<script type="module">' + player + "\n" + app + "</script>",
    )
)
revision = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=root, text=True).strip()
base = f"https://github.com/DanielOpazoD/Moa-HHR/blob/{revision}/"
for path in [
    "docs/SCENES.md",
    "docs/inventory.json",
    "references/identity-guide-v0.html",
]:
    html = html.replace('href="' + path + '"', 'href="' + base + path + '"')
html = html.replace(
    "<title>Moa · Biblioteca de movimiento</title>",
    f"<title>Moa · Revisión de {len(scenes)} escenas</title>",
).replace(
    "Atlas originales preservados y nuevas escenas en revisión.",
    f"{len(scenes)} escenas nuevas; fuentes y cuadros editables conservados en el repositorio.",
)
output = root / "review/moa-scenes.html"
output.parent.mkdir(exist_ok=True)
output.write_text(html)
print(output.relative_to(root))
