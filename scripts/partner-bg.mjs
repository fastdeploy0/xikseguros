/**
 * Remove solid backgrounds from the latest partner logo batch.
 *
 * Reversible workflow:
 *   1. Originals live in `src/assets/partners/_backup-with-bg/` (never overwritten by apply)
 *   2. Apply always reads from backup and writes to `src/assets/partners/`
 *   3. Restore copies backup → live (instant rollback)
 *
 * Usage:
 *   node scripts/partner-bg.mjs --apply
 *   node scripts/partner-bg.mjs --restore
 *   node scripts/partner-bg.mjs --apply --threshold=42
 *   node scripts/partner-bg.mjs --apply --only=aza-seguros,hapvida-plano-saude
 *   node scripts/partner-bg.mjs --list
 */
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PARTNERS_DIR = path.resolve('src/assets/partners');
const BACKUP_DIR = path.join(PARTNERS_DIR, '_backup-with-bg');

/**
 * Logos whose light shapes must stay light (brand discs / marks on colored plates).
 * Adjust this set instead of re-tuning global thresholds.
 */
const SKIP_LIGHT_TO_DARK = new Set(['darwin-seguros.webp']);

/** Filenames of the last partner batch (with baked backgrounds). */
const BATCH = [
  'aliro-seguro.webp',
  'aza-seguros.webp',
  'chubb-seguros.webp',
  'darwin-seguros.webp',
  'ezze-seguros.webp',
  'justos-seguros.webp',
  'mag-seguros.webp',
  'mapfre-seguros.webp',
  'mitsui-sumitomo-seguros.webp',
  'nova-seguros.webp',
  'suhai-seguros.webp',
  'usebens-seguros.webp',
  'yelum-seguros.webp',
  'youse-seguros.webp',
  'aurora-saude.webp',
  'hapvida-plano-saude.webp',
  'porto-seguro-odontologico.webp',
  'select-planos-saude.webp',
  'usi-saude.webp',
  'bradesco-dental.webp',
];

function parseArgs(argv) {
  const flags = new Set();
  const opts = { threshold: 38, feather: 12, only: null };
  for (const raw of argv) {
    if (raw.startsWith('--threshold=')) {
      opts.threshold = Number(raw.slice('--threshold='.length));
    } else if (raw.startsWith('--feather=')) {
      opts.feather = Number(raw.slice('--feather='.length));
    } else if (raw.startsWith('--only=')) {
      opts.only = raw
        .slice('--only='.length)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => (s.endsWith('.webp') ? s : `${s}.webp`));
    } else if (raw.startsWith('--')) {
      flags.add(raw.slice(2));
    }
  }
  return { flags, opts };
}

function colorDistance(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Average RGB of the four corner pixels (3×3 samples each). */
function sampleBackground(data, width, height) {
  const samples = [];
  const take = (cx, cy) => {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const x = Math.min(width - 1, Math.max(0, cx + dx));
        const y = Math.min(height - 1, Math.max(0, cy + dy));
        const i = (y * width + x) * 4;
        samples.push([data[i], data[i + 1], data[i + 2]]);
      }
    }
  };
  take(1, 1);
  take(width - 2, 1);
  take(1, height - 2);
  take(width - 2, height - 2);

  const sum = samples.reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0]);
  const n = samples.length;
  return [Math.round(sum[0] / n), Math.round(sum[1] / n), Math.round(sum[2] / n)];
}

/**
 * Make pixels close to the sampled background transparent.
 * Soft-edge via feather. If the mark is light-on-dark (white logo),
 * darken remaining near-white pixels so they stay visible on light plates.
 */
function knockOutBackground(data, width, height, { threshold, feather, allowLightToDark = true }) {
  const bg = sampleBackground(data, width, height);
  const bgLum = luminance(...bg);
  const out = Buffer.from(data);
  const hard = threshold;
  const soft = threshold + feather;

  let kept = 0;
  let keptLum = 0;
  let lightKept = 0;

  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const a = out[i + 3];
    if (a === 0) continue;

    const dist = colorDistance([r, g, b], bg);
    if (dist <= hard) {
      out[i + 3] = 0;
      continue;
    }
    if (dist < soft) {
      const t = (dist - hard) / (soft - hard);
      out[i + 3] = Math.round(a * t);
    }

    if (out[i + 3] > 16) {
      kept += 1;
      const lum = luminance(r, g, b);
      keptLum += lum;
      if (lum > 180) lightKept += 1;
    }
  }

  const meanKeptLum = kept > 0 ? keptLum / kept : 0;
  const lightKeptRatio = kept > 0 ? lightKept / kept : 0;
  // White / near-white marks on dark plates disappear on `bg-surface`.
  const lightOnDark =
    allowLightToDark && bgLum < 100 && (meanKeptLum > 150 || lightKeptRatio > 0.35);

  if (lightOnDark) {
    // Recolor near-white marks to near-black so they read on `bg-surface` plates.
    for (let i = 0; i < out.length; i += 4) {
      if (out[i + 3] < 16) continue;
      const lum = luminance(out[i], out[i + 1], out[i + 2]);
      if (lum < 160) continue;
      // Preserve saturated accents (e.g. AXA red slash): only recolor low-chroma whites.
      const max = Math.max(out[i], out[i + 1], out[i + 2]);
      const min = Math.min(out[i], out[i + 1], out[i + 2]);
      if (max - min > 40) continue;
      const factor = 0.18;
      out[i] = Math.round(out[i] * factor);
      out[i + 1] = Math.round(out[i + 1] * factor);
      out[i + 2] = Math.round(out[i + 2] * factor);
    }
  }

  return { buffer: out, bg, bgLum, lightOnDark, kept };
}

async function ensureBackupExists(files) {
  await mkdir(BACKUP_DIR, { recursive: true });
  const existing = new Set(await readdir(BACKUP_DIR));
  for (const file of files) {
    if (existing.has(file)) continue;
    await copyFile(path.join(PARTNERS_DIR, file), path.join(BACKUP_DIR, file));
    console.log(`backed up ${file}`);
  }
}

async function apply(files, opts) {
  await ensureBackupExists(files);

  for (const file of files) {
    const input = path.join(BACKUP_DIR, file);
    const output = path.join(PARTNERS_DIR, file);
    const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { buffer, bg, bgLum, lightOnDark, kept } = knockOutBackground(data, info.width, info.height, {
      ...opts,
      allowLightToDark: !SKIP_LIGHT_TO_DARK.has(file),
    });

    await sharp(buffer, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(output);

    console.log(
      `ok ${file}  bg=rgb(${bg.join(',')}) lum=${bgLum.toFixed(0)} kept=${kept}${lightOnDark ? ' [light→dark]' : ''}`
    );
  }
}

async function restore(files) {
  for (const file of files) {
    const src = path.join(BACKUP_DIR, file);
    const dest = path.join(PARTNERS_DIR, file);
    await copyFile(src, dest);
    console.log(`restored ${file}`);
  }
}

const { flags, opts } = parseArgs(process.argv.slice(2));
const selected = opts.only?.length ? BATCH.filter((f) => opts.only.includes(f)) : BATCH;

if (flags.has('list')) {
  console.log(`Backup dir: ${BACKUP_DIR}`);
  console.log(`Batch (${BATCH.length}):`);
  for (const f of BATCH) console.log(`  - ${f}`);
  process.exit(0);
}

if (flags.has('restore')) {
  await restore(selected);
  console.log(`\nRestored ${selected.length} logo(s) from _backup-with-bg.`);
  process.exit(0);
}

if (flags.has('apply')) {
  if (!Number.isFinite(opts.threshold) || opts.threshold < 0) {
    console.error('Invalid --threshold');
    process.exit(1);
  }
  await apply(selected, opts);
  console.log(`\nApplied to ${selected.length} logo(s). Rollback: node scripts/partner-bg.mjs --restore`);
  process.exit(0);
}

console.log(`Usage:
  node scripts/partner-bg.mjs --apply
  node scripts/partner-bg.mjs --restore
  node scripts/partner-bg.mjs --apply --threshold=42
  node scripts/partner-bg.mjs --apply --only=aza-seguros,hapvida-plano-saude
  node scripts/partner-bg.mjs --list`);
process.exit(1);
