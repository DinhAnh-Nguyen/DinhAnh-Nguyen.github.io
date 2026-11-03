// Text "decode" effect used by the rotating frames.
// Pure functions so they are easy to test: no DOM, no timers.

const GLYPHS = '#%&*+<>=?/\|0123456789ABCDEFXYZ';

// Small deterministic PRNG (mulberry32) so a given seed always gives the same noise.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Plan a decode: for every character, the progress (0..1) at which it settles.
 * Characters further right and lower settle later, like a scan.
 */
export function planDecode(target, seed = 1) {
  const rand = rng(seed);
  const lines = target.split('\n');
  const total = Math.max(lines.length, 1);
  return lines.flatMap((line, row) =>
    Array.from(line, (_, col) => {
      const scan = (row / total) * 0.5 + (col / Math.max(line.length, 1)) * 0.25;
      return Math.min(0.99, scan + rand() * 0.25);
    }).concat([0]) // newline slot
  ).slice(0, target.length);
}

/**
 * The text to show at `progress` (0..1) while decoding to `target`.
 * Whitespace is never scrambled, so the layout of the frame stays still.
 */
export function frameAt(target, plan, progress, tick = 0) {
  if (progress >= 1) return target;
  const rand = rng(tick * 7919 + 13);
  let out = '';
  for (let i = 0; i < target.length; i++) {
    const ch = target[i];
    if (/\s/.test(ch) || progress >= plan[i]) out += ch;
    else out += GLYPHS[Math.floor(rand() * GLYPHS.length)];
  }
  return out;
}
