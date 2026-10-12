import { MoaPlayer } from "./player.js";
const q = (id) => document.getElementById(id);
const player = new MoaPlayer(q("sprite"), q("status"));
let scenes = [],
  selected;
function select(scene) {
  selected = scene;
  q("preview-title").textContent = scene.title;
  q("details").textContent =
    `${scene.frames} cuadros · ${((scene.durations.reduce((a, b) => a + b, 0) * scene.cycles) / 1000).toFixed(1)} s · ${scene.pack === "original" ? "Original v2" : scene.status === "approved" ? "Nueva · revisada" : "Nueva · en revisión"}`;
  q("frame").max = scene.frames - 1;
  q("frame").value = 0;
  q("frame-label").textContent = `1 / ${scene.frames}`;
  player.inspect(scene, 0);
}
function filter() {
  const term = q("search").value.toLocaleLowerCase("es");
  const list = scenes.filter(
    (s) =>
      `${s.title} ${s.id} ${s.category}`
        .toLocaleLowerCase("es")
        .includes(term) &&
      (q("category").value === "all" || s.category === q("category").value) &&
      (q("pack").value === "all" || s.pack === q("pack").value),
  );
  q("count").textContent = `${list.length} escenas`;
  q("catalog").replaceChildren(
    ...list.map((s) => {
      const b = document.createElement("button");
      b.className = "card";
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent =
        s.pack === "original"
          ? "ORIGINAL V2"
          : s.status === "approved"
            ? "NUEVA · REVISADA"
            : "NUEVA · EN REVISIÓN";
      const title = document.createElement("strong");
      title.textContent = s.title;
      const detail = document.createElement("small");
      detail.textContent = `${s.category} · ${s.frames} cuadros`;
      b.append(badge, title, detail);
      b.addEventListener("click", () => select(s));
      return b;
    }),
  );
  if (!list.length) q("catalog").textContent = "No hay escenas que coincidan.";
}
q("play").onclick = q("stage-play").onclick = () => {
  if (selected)
    player.play(selected, q("still").checked, Number(q("speed").value));
};
q("rest").onclick = () => player.rest();
q("close").onclick = () => {
  player.close();
  q("play").focus();
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    player.close();
    q("play").focus();
  }
});
q("frame").oninput = () => {
  if (selected) {
    const frame = Number(q("frame").value);
    q("frame-label").textContent = `${frame + 1} / ${selected.frames}`;
    player.inspect(selected, frame);
  }
};
q("background").onchange = () =>
  (q("stage-shell").className = q("background").value);
q("scale").onchange = () =>
  document
    .querySelector(".stage")
    .style.setProperty("--scale", q("scale").value);
q("still").onchange = () => player.rest();
for (const id of ["search", "category", "pack"])
  q(id).addEventListener("input", filter);
try {
  const response = await fetch("scenes.json");
  if (!response.ok) throw Error();
  scenes = await response.json();
  filter();
  select(scenes.find((s) => s.id === "wave") || scenes[0]);
} catch {
  q("status").textContent = "Catálogo no disponible. Recarga para reintentar.";
}

for (const [id, step] of [
  ["previous", -1],
  ["next", 1],
])
  q(id).onclick = () => {
    if (!selected) return;
    q("frame").value = Math.max(
      0,
      Math.min(selected.frames - 1, Number(q("frame").value) + step),
    );
    q("frame").dispatchEvent(new Event("input"));
  };
q("speed").onchange = () => player.rest();
