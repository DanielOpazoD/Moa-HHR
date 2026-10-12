// Browser evidence: actual gallery controls, timed frame sampling and finite completion.
import { chromium } from "playwright-core";
import fs from "node:fs/promises";
const scenes = JSON.parse(await fs.readFile("scenes.json", "utf8")).filter(
  (s) => s.pack === "new",
);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://127.0.0.1:4173");
await page.waitForSelector("#sprite img");
const report = [];
for (const scene of scenes) {
  await page.locator("#search").fill(scene.id);
  await page.locator(".card").filter({ hasText: scene.title }).click();
  await page.waitForFunction(
    (src) => document.querySelector("#sprite img")?.getAttribute("src") === src,
    scene.src,
  );
  await page.locator("#play").click();
  await page.waitForFunction(
    () => document.querySelector("#sprite")?.dataset.state === "playing",
  );
  const samples = await page.evaluate(async (s) => {
    const image = document.querySelector("#sprite img");
    const animation = image.getAnimations()[0];
    animation.pause();
    let t = 0;
    const result = [];
    for (let i = 0; i < s.frames; i++) {
      animation.currentTime = t + s.durations[i] / 2;
      await new Promise(requestAnimationFrame);
      const x = new DOMMatrix(getComputedStyle(image).transform).m41;
      result.push({
        frame: i,
        time: animation.currentTime,
        translateX: x,
        expectedX: -144 * i,
        pass: Math.abs(x + 144 * i) < 0.1,
      });
      t += s.durations[i];
    }
    animation.currentTime = t - 40;
    animation.play();
    return result;
  }, scene);
  if (samples.some((x) => !x.pass))
    throw Error(`${scene.id}: frame sampling mismatch`);
  await page.waitForFunction(
    () => document.querySelector("#sprite")?.dataset.state === "rest",
  );
  for (const bg of ["light", "dark", "blue"]) {
    await page.locator("#background").selectOption(bg);
    await page.locator("#frame").fill(String(scene.still));
    await page.waitForFunction(
      () => document.querySelector("#sprite")?.dataset.state === "inspection",
    );
    for (const scale of ["1", "3"]) {
      await page.locator("#scale").selectOption(scale);
      await page
        .locator("#stage-shell")
        .screenshot({
          path: `evidence/${scene.id}/browser-${bg}-${scale}x.png`,
        });
    }
  }
  report.push({
    id: scene.id,
    frames: samples,
    finiteCompletion: true,
    backgrounds: ["light", "dark", "blue"],
    scales: [1, 3],
  });
  console.log(
    `${scene.id}: ${samples.length} timed frames, completion, six browser captures`,
  );
}
await page.locator("#scale").selectOption("1");
await page.locator("#search").fill("");
await page.locator("#rest").click();
await page.screenshot({ path: "evidence/gallery-desktop.png", fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: "evidence/gallery-mobile.png", fullPage: true });
await fs.writeFile(
  "evidence/browser-playback.json",
  JSON.stringify(
    {
      browser: await browser.version(),
      url: "http://127.0.0.1:4173",
      desktop: [1280, 960],
      mobile: [390, 844],
      errors,
      scenes: report,
    },
    null,
    2,
  ) + "\n",
);
await browser.close();
if (errors.length) throw Error(errors.join("\n"));
