export function frameAt(durations, elapsed) {
  let end = 0;
  for (let i = 0; i < durations.length; i++) {
    end += durations[i];
    if (elapsed < end) return i;
  }
  return durations.length - 1;
}
export function validateScene(s) {
  if (
    !Number.isInteger(s.frames) ||
    s.frames < 1 ||
    s.frames > 24 ||
    s.durations.length !== s.frames ||
    s.durations.some((x) => !Number.isFinite(x) || x <= 0) ||
    !Number.isInteger(s.cycles) ||
    s.cycles < 1 ||
    !Number.isInteger(s.still) ||
    s.still < 0 ||
    s.still >= s.frames
  )
    throw Error("Invalid scene metadata");
  const duration = s.durations.reduce((a, b) => a + b, 0) * s.cycles;
  if (duration < 2999.99 || duration > 6000.01)
    throw Error("Scene must last 3–6 seconds");
  return duration;
}
export class MoaPlayer {
  constructor(element, status) {
    this.element = element;
    this.status = status;
    this.ticket = 0;
    this.animation = null;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)");
    this.visibility = () => {
      if (this.animation)
        document.hidden ? this.animation.pause() : this.animation.play();
    };
    this.preference = () => this.rest();
    document.addEventListener("visibilitychange", this.visibility);
    this.reduced.addEventListener("change", this.preference);
    this.rest();
  }
  cancel() {
    this.ticket++;
    this.animation?.cancel();
    this.animation = null;
  }
  show(image, scene, frame) {
    image.alt = "";
    image.draggable = false;
    image.style.width = `${scene.frames * 100}%`;
    image.style.transform = `translateX(${(-100 * frame) / scene.frames}%)`;
    this.element.replaceChildren(image);
    this.element.dataset.frame = String(frame);
  }
  async load(scene, frame, ticket) {
    const image = new Image();
    image.src = scene.src;
    await image.decode();
    if (ticket !== this.ticket) return null;
    this.show(image, scene, frame);
    return image;
  }
  async rest(message = "Reposo maestro") {
    this.cancel();
    const ticket = this.ticket;
    this.status.textContent = message;
    this.element.dataset.state = "rest";
    try {
      await this.load(
        { src: "originals/hhr/public/images/moa/moa-wave-v2.png", frames: 6 },
        0,
        ticket,
      );
    } catch {
      if (ticket === this.ticket) {
        this.element.replaceChildren();
        this.status.textContent = "Imagen no disponible. Puedes reintentar.";
        this.element.dataset.state = "error";
      }
    }
  }
  async play(scene, still = false, rate = 1) {
    const total = validateScene(scene);
    this.cancel();
    const ticket = this.ticket;
    this.status.textContent = "Cargando…";
    this.element.dataset.state = "loading";
    try {
      const quiet = still || this.reduced.matches;
      const image = await this.load(scene, quiet ? scene.still : 0, ticket);
      if (!image) return;
      const cycle = scene.durations.reduce((a, b) => a + b, 0);
      let time = 0;
      const transform = (i) => `translateX(${(-100 * i) / scene.frames}%)`;
      const frames = quiet
        ? [
            { transform: transform(scene.still) },
            { transform: transform(scene.still) },
          ]
        : scene.durations.map((d, i) => {
            const f = {
              offset: time / cycle,
              transform: transform(i),
              easing: "steps(1,end)",
            };
            time += d;
            return f;
          });
      if (!quiet)
        frames.push({ offset: 1, transform: transform(scene.frames - 1) });
      const animation = image.animate(frames, {
        duration: quiet ? total : cycle,
        iterations: quiet ? 1 : scene.cycles,
        fill: "forwards",
      });
      animation.playbackRate = Math.min(2, Math.max(0.25, Number(rate) || 1));
      this.animation = animation;
      this.visibility();
      this.element.dataset.state = "playing";
      this.status.textContent = quiet
        ? "Pose quieta; finalización automática"
        : `Reproduciendo ${scene.title}`;
      animation.finished
        .then(() => {
          if (ticket === this.ticket) this.rest();
        })
        .catch(() => {});
    } catch {
      if (ticket === this.ticket)
        this.rest("No se pudo cargar la escena. Reposo maestro.");
    }
  }
  async inspect(scene, frame) {
    this.cancel();
    const ticket = this.ticket;
    try {
      await this.load(scene, frame, ticket);
      if (ticket === this.ticket) {
        this.status.textContent = `Cuadro ${frame + 1} de ${scene.frames}`;
        this.element.dataset.state = "inspection";
      }
    } catch {
      if (ticket === this.ticket) this.rest("No se pudo cargar la escena.");
    }
  }
  close() {
    this.cancel();
    this.element.replaceChildren();
    this.element.dataset.state = "closed";
    this.status.textContent = "Muestra oculta";
  }
  destroy() {
    this.close();
    document.removeEventListener("visibilitychange", this.visibility);
    this.reduced.removeEventListener("change", this.preference);
  }
}
