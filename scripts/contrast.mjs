/** Contrast helper used to pick accessible token values. */
const lin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const backgrounds = ['#fbfaf8', '#ffffff', '#f3f1ec'];
const candidates = process.argv.slice(2);

for (const fg of candidates) {
  const results = backgrounds.map((bg) => `${bg}: ${ratio(fg, bg).toFixed(2)}`);
  const worst = Math.min(...backgrounds.map((bg) => ratio(fg, bg)));
  console.log(`${fg}  ${results.join('  ')}  → worst ${worst.toFixed(2)} ${worst >= 4.5 ? 'PASS' : 'FAIL'}`);
}
