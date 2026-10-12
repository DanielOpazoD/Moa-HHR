from pathlib import Path
import json, re

root = Path(__file__).resolve().parents[1]
source = (root / "originals/hhr/src/components/layout/MoaSequence.tsx").read_text()
titles = {
    "drink": ("Tomando una bebida", "Cotidiano"),
    "juggle": ("Malabares", "Movimiento"),
    "care": ("Cuidando a una mascota", "Cuidado"),
    "sleep": ("Descanso", "Cotidiano"),
    "yawn": ("Bostezo", "Expresión"),
    "pushups": ("Flexiones", "Movimiento"),
    "roll": ("Voltereta", "Movimiento"),
    "jump": ("Salto", "Movimiento"),
    "run": ("Carrera", "Movimiento"),
    "wink": ("Guiño", "Expresión"),
    "love": ("Enamorado", "Expresión"),
    "angry": ("Enojo", "Expresión"),
    "mother": ("Recuerdo de mamá", "Expresión"),
    "surf": ("Surf", "Movimiento"),
    "wave": ("Saludo", "Expresión"),
    "curious": ("Curiosidad", "Expresión"),
    "stroll": ("Paseo", "Movimiento"),
    "happy": ("Alegría", "Expresión"),
}
scenes = []
for id, seconds, cycles, still in re.findall(
    r"  (\w+): \[([\d.]+), (\d+), (\d+)\]", source
):
    title, category = titles[id]
    scenes.append(
        dict(
            id=id,
            title=title,
            category=category,
            pack="original",
            status="preserved",
            frames=6,
            durations=[float(seconds) * 1000 / 6] * 6,
            cycles=int(cycles),
            still=int(still),
            src=f"originals/hhr/public/images/moa/moa-{id}-v2.png",
        )
    )
new = sorted(
    [json.loads(p.read_text()) for p in (root / "new-scenes/scenes").glob("*.json")],
    key=lambda s: s["order"],
)
(root / "new-scenes/manifest.json").write_text(
    json.dumps(new, ensure_ascii=False, indent=2) + "\n"
)
scenes += [
    {k: v for k, v in s.items() if k not in ["packaging"]}
    for s in new
    if s.get("src") and (root / s["src"]).exists()
]
(root / "scenes.json").write_text(
    json.dumps(scenes, ensure_ascii=False, indent=2) + "\n"
)
