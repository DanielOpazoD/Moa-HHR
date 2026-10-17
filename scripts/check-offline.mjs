import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";
const allExpected = JSON.parse(await fs.readFile("scenes.json", "utf8")).filter(
  // Presence has a dedicated ten-scene offline viewer, tested in presence.spec.js.
  (s) => s.pack === "new" && !s.id.startsWith("presence-i"),
);
const browser = await chromium.launch({ headless: true });
try {
 const groups = [["moa-scenes.html", "legacy"], ["moa-chile-remix.html", "remix"], ["moa-leo-rey-giro.html", "C21G"], ...allExpected.filter(s => s.frameSize?.[0] === 576 && s.id !== "C21G").map(s => [`moa-${s.id.toLowerCase()}-hd.html`, s.id])];
 for (const [file, group] of groups) {
  const expected = allExpected.filter(s => (s.frameSize?.[0] === 576 ? s.id : s.batch?.startsWith("chile-remix-") ? "remix" : "legacy") === group);
  if (!expected.length) throw Error(`Empty offline collection: ${file}`);
  const selected = group === "legacy" ? expected.find(s => s.id === "B29") : expected.at(-1);
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve("review", file)).href);
  await page.waitForSelector(".card");
  if ((await page.locator(".card").count()) !== expected.length)
    throw Error("Offline catalog is stale");
  const titles = await page.locator(".card strong").allTextContents();
  if (expected.some((s) => !titles.includes(s.title)))
    throw Error("Missing offline scene");
  const categories = ["all", ...[...new Set(expected.map((s) => s.category))]
    .sort((a, b) => a.localeCompare(b, "es"))];
  const options = await page.locator("#category option").evaluateAll(
    (items) => items.map((item) => item.value),
  );
  if (JSON.stringify(options) !== JSON.stringify(categories))
    throw Error("Offline category options are stale");
  await page.locator("#category").selectOption(selected.category);
  if (await page.locator(".card").count() !== expected.filter((s) => s.category === selected.category).length)
    throw Error("Offline category filter lost scenes");
  await page.locator("#category").selectOption("all");
  await page.locator("#search").fill(selected.id);
  await page.locator(".card").click();
  await page.waitForFunction(({frames, width}) => {
    const image = document.querySelector("#sprite img");
    return image?.complete && image.naturalWidth === frames * width &&
      document.querySelector("#status").textContent === `Cuadro 1 de ${frames}`;
  }, {frames: selected.frames, width: selected.frameSize?.[0] || 288});
  await page.locator("#search").fill("");
  await page.locator("#play").click();
  await page.waitForFunction(
    () => document.querySelector("#sprite").dataset.state === "playing",
  );
  await page.waitForFunction(
    () => document.querySelector("#sprite").dataset.state === "rest",
  );
  if (errors.length) throw Error(errors.join("\n"));
  console.log(
    `Offline ${file}: ${expected.length} scenes, playback and rest, no JS errors.`,
  );
  await page.close();
 }
} finally {
  await browser.close();
}
