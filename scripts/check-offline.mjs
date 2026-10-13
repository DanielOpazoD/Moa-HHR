import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";
const expected = JSON.parse(await fs.readFile("scenes.json", "utf8")).filter(
  (s) => s.pack === "new",
);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve("review/moa-scenes.html")).href);
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
  await page.locator("#category").selectOption("Moa aventuras");
  if (await page.locator(".card").count() !== expected.filter((s) => s.category === "Moa aventuras").length)
    throw Error("Offline category filter lost scenes");
  await page.locator("#category").selectOption("all");
  await page.locator("#search").fill("B29");
  await page.locator(".card").click();
  await page.waitForFunction(() => {
    const image = document.querySelector("#sprite img");
    return image?.complete && image.naturalWidth === 12 * 288 &&
      document.querySelector("#status").textContent === "Cuadro 1 de 12";
  });
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
    `Offline HTML: ${expected.length} scenes, playback and rest, no JS errors.`,
  );
} finally {
  await browser.close();
}
