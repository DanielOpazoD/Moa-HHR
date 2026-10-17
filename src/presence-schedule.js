// Small, deterministic-with-injected-random policy; never consumes clinical data.
export function choosePresence(previous, random = Math.random) {
  const choices = [[1, 55], [2, 25], [3, 7], [4, 4], [5, 3], [6, 2], [7, 2], [8, 1], [9, 1]]
    .filter(([id]) => id !== previous || id === 1);
  let pick = Math.min(0.999999, Math.max(0, random())) * choices.reduce((n, [, w]) => n + w, 0);
  for (const [id, weight] of choices) { pick -= weight; if (pick < 0) return id; }
  return 1;
}
export function quietDelay(random = Math.random) {
  return 10000 + Math.min(1, Math.max(0, random())) * 12000;
}
