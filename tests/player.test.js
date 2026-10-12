import { test } from "node:test";
import assert from "node:assert/strict";
import { frameAt, validateScene } from "../src/player.js";
test("holds advance only at explicit frame boundaries", () => {
  const d = [100, 500, 100, 300];
  assert.equal(frameAt(d, 99), 0);
  assert.equal(frameAt(d, 100), 1);
  assert.equal(frameAt(d, 599), 1);
  assert.equal(frameAt(d, 600), 2);
  assert.equal(frameAt(d, 999), 3);
});
test("variable N, finite cycles and still frame validated", () => {
  for (const n of [6, 8, 12, 24])
    assert.ok(
      Math.abs(
        validateScene({
          frames: n,
          durations: Array(n).fill(4000 / n),
          cycles: 1,
          still: n - 1,
        }) - 4000,
      ) < 0.001,
    );
  assert.throws(() =>
    validateScene({ frames: 12, durations: [4000], cycles: 1, still: 0 }),
  );
  assert.throws(() =>
    validateScene({ frames: 1, durations: [7000], cycles: 1, still: 0 }),
  );
  assert.throws(() =>
    validateScene({ frames: 1, durations: [4000], cycles: Infinity, still: 0 }),
  );
});
