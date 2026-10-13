import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";
const allExpected = JSON.parse(await fs.readFile("scenes.json", "utf8")).filter(
  (s) => s.pack === "new",
);
const browser = await chromium.launch({ headless: true });
try {
 for (const [file, isRemix] of [["moa-scenes.html", false], ["moa-chile-remix.html", true]]) {
  const expected = allExpected.filter(s => Boolean(s.batch?.startsWith("chile-remix-")) === isRemix);
  if (!expected.length) throw Error(`Empty offline collection: ${file}`);
  const selected = isRemix ? expected.at(-1) : expected.find(s => s.id === "B29");
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
  await page.waitForFunction((frames) => {
    const image = document.querySelector("#sprite img");
    return image?.complete && image.naturalWidth === frames * 288 &&
      document.querySelector("#status").textContent === `Cuadro 1 de ${frames}`;
  }, selected.frames);
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
