import { test, expect } from "@playwright/test";
import fs from "node:fs";

test("every catalogue category is selectable and filters compose", async ({ page }) => {
  const scenes = JSON.parse(fs.readFileSync("scenes.json", "utf8"));
  const categories = [...new Set(scenes.map((s) => s.category))]
    .sort((a, b) => a.localeCompare(b, "es"));
  await page.goto("/");
  await expect(page.locator(".card")).toHaveCount(scenes.length);
  const values = await page.locator("#category option").evaluateAll(
    (options) => options.map((o) => o.value),
  );
  expect(values).toEqual(["all", ...categories]);
  await page.locator("#category").selectOption("Moa aventuras");
  await expect(page.locator(".card")).toHaveCount(
    scenes.filter((s) => s.category === "Moa aventuras").length,
  );
  await page.locator("#search").fill("B29");
  await expect(page.locator(".card")).toHaveCount(1);
  await page.locator("#pack").selectOption("original");
  await expect(page.locator(".card")).toHaveCount(0);
  await page.locator("#pack").selectOption("all");
  await page.locator("#search").fill("");
  await page.locator("#category").selectOption("all");
  await expect(page.locator(".card")).toHaveCount(scenes.length);
});

test("catalogue loads selectively; search, category and empty state work", async ({
  page,
}) => {
  const png = [];
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (r.url().endsWith(".png")) png.push(r.url());
  });
  await page.goto("/");
  await expect(page).toHaveTitle("Moa · Biblioteca de movimiento");
  await expect(page.locator(".card")).not.toHaveCount(0);
  await expect(page.locator("#sprite img")).toBeVisible();
  expect(png.every((u) => u.endsWith("moa-wave-v2.png"))).toBeTruthy();
  await page.locator("#search").fill("surf");
  await expect(page.locator(".card")).toHaveCount(1);
  await page.locator(".card").click();
  await expect(page.locator("#preview-title")).toHaveText("Surf");
  await page.locator("#category").selectOption("Cuidado");
  await expect(page.locator("#catalog")).toHaveText(
    "No hay escenas que coincidan.",
  );
  expect(errors).toEqual([]);
});
test("real click, repeat same scene, finite completion, keyboard close", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#sprite img")).toBeVisible();
  await page.locator("#stage-play").click({ position: { x: 60, y: 50 } });
  await expect(page.locator("#sprite")).toHaveAttribute(
    "data-state",
    "playing",
  );
  await page.waitForTimeout(500);
  await page.locator("#play").click();
  expect(
    await page
      .locator("#sprite img")
      .evaluate((e) => e.getAnimations()[0].currentTime),
  ).toBeLessThan(250);
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "rest", {
    timeout: 4500,
  });
  await page.locator("#play").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#sprite")).toHaveAttribute(
    "data-state",
    "playing",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "closed");
  await expect(page.locator("#play")).toBeFocused();
});
test("reduced motion stays fixed but finishes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#play").click();
  await expect(page.locator("#sprite")).toHaveAttribute(
    "data-state",
    "playing",
  );
  const before = await page
    .locator("#sprite img")
    .evaluate((e) => getComputedStyle(e).transform);
  await page.waitForTimeout(600);
  expect(
    await page
      .locator("#sprite img")
      .evaluate((e) => getComputedStyle(e).transform),
  ).toBe(before);
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "rest", {
    timeout: 4000,
  });
});
test("hidden-page handler pauses clock and resumes remaining time", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#play").click();
  await expect(page.locator("#sprite")).toHaveAttribute(
    "data-state",
    "playing",
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  const before = await page
    .locator("#sprite img")
    .evaluate((e) => e.getAnimations()[0].currentTime);
  await page.waitForTimeout(350);
  expect(
    await page
      .locator("#sprite img")
      .evaluate((e) => e.getAnimations()[0].currentTime),
  ).toBe(before);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "rest", {
    timeout: 4500,
  });
});
test("failed scene returns to master and failed master remains usable", async ({
  page,
}) => {
  await page.route("**/moa-surf-v2.png", (route) => route.abort());
  await page.goto("/");
  await page.locator("#search").fill("surf");
  await page.locator(".card").click();
  await page.locator("#play").click();
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "rest");
  await expect(page.locator("#sprite img")).toHaveAttribute("src", /wave/);
  await page.route("**/moa-wave-v2.png", (route) => route.abort());
  await page.reload();
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "error");
  await expect(page.locator("#play")).toBeEnabled();
});
test("late image cannot overwrite a newer selection", async ({ page }) => {
  await page.route("**/moa-surf-v2.png", async (route) => {
    await new Promise((r) => setTimeout(r, 700));
    await route.continue();
  });
  await page.goto("/");
  await page.locator("#search").fill("surf");
  await page.locator(".card").click();
  await page.locator("#play").click();
  await page.locator("#rest").click();
  await page.waitForTimeout(900);
  await expect(page.locator("#sprite img")).toHaveAttribute("src", /wave/);
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "rest");
});
test("variable N and explicit holds drive actual browser frames", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { MoaPlayer } = await import("/src/player.js");
    const el = document.createElement("span");
    document.body.append(el);
    const player = new MoaPlayer(el, document.createElement("span"));
    await player.play({
      title: "test",
      frames: 8,
      src: "new-scenes/atlases/moa-thinking-v1.png",
      durations: [200, 800, 300, 300, 300, 300, 300, 500],
      cycles: 1,
      still: 4,
    });
    player.animation.pause();
    player.animation.currentTime = 250;
    await new Promise(requestAnimationFrame);
    const hold = getComputedStyle(el.firstChild).transform;
    player.animation.currentTime = 950;
    await new Promise(requestAnimationFrame);
    const later = getComputedStyle(el.firstChild).transform;
    player.animation.currentTime = 1100;
    await new Promise(requestAnimationFrame);
    const next = getComputedStyle(el.firstChild).transform;
    player.destroy();
    return { hold, later, next };
  });
  expect(result.hold).toBe(result.later);
  expect(result.next).not.toBe(result.hold);
});
test("mobile layout and manual inspection remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("#sprite img")).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.locator("#frame").fill("5");
  await expect(page.locator("#status")).toHaveText("Cuadro 6 de 6");
  await page.locator("#background").selectOption("blue");
  await page.locator("#scale").selectOption("3");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});
test("editing controls step frames and change review speed", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#sprite img")).toBeVisible();
  await page.locator("#next").click();
  await expect(page.locator("#status")).toHaveText("Cuadro 2 de 6");
  await page.locator("#previous").click();
  await expect(page.locator("#status")).toHaveText("Cuadro 1 de 6");
  await page.locator("#speed").selectOption("0.5");
  await page.locator("#play").click();
  await expect(page.locator("#sprite")).toHaveAttribute(
    "data-state",
    "playing",
  );
  expect(
    await page
      .locator("#sprite img")
      .evaluate((e) => e.getAnimations()[0].playbackRate),
  ).toBe(0.5);
});

test("abbreviated care vignette context is visible only for its selection", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#search").fill("handwash");
  await page.locator(".card").click();
  await expect(page.locator("#details")).toContainText("no es un protocolo");
  await page.locator("#search").fill("surf");
  await page.locator(".card").click();
  await expect(page.locator("#details")).not.toContainText(
    "no es un protocolo",
  );
});

test("C21 is selectable with its source limitation and finite dance playback", async ({ page }) => {
  await page.goto("/");
  await page.locator("#search").fill("C21 ·");
  await expect(page.locator(".card")).toHaveCount(1);
  await page.locator(".card").click();
  await expect(page.locator("#preview-title")).toContainText("pasito de Leo Rey");
  await expect(page.locator("#details")).toContainText("pies parcialmente ocultos");
  await page.waitForFunction(() => document.querySelector("#sprite img")?.naturalWidth === 12 * 288);
  await page.locator("#frame").fill("11");
  await expect(page.locator("#status")).toHaveText("Cuadro 12 de 12");
  await page.locator("#play").click();
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "playing");
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "rest", { timeout: 6500 });
});


test("C21G preserves the original dance and plays the full-turn addition", async ({ page }) => {
  await page.goto("/");
  await page.locator("#search").fill("C21");
  await expect(page.locator(".card")).toHaveCount(2);
  await page.locator("#search").fill("C21G");
  await expect(page.locator(".card")).toHaveCount(1);
  await page.locator(".card").click();
  await expect(page.locator("#details")).toContainText("giro corporal completo");
  await page.waitForFunction(() => document.querySelector("#sprite img")?.naturalWidth === 18 * 288);
  await page.locator("#frame").fill("10");
  await expect(page.locator("#status")).toHaveText("Cuadro 11 de 18");
  await page.locator("#play").click();
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "playing");
  await expect(page.locator("#sprite")).toHaveAttribute("data-state", "rest", { timeout: 7500 });
});
