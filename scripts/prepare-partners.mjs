/**
 * Copies partner logos from `source_assets/` into `src/assets/partners/` as
 * WebP only (185×106 source art: no PNG, no upscale). Run:
 *   node scripts/prepare-partners.mjs
 */
import { mkdir, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('source_assets');
const OUT = path.resolve('src/assets/partners');

/** Source filenames that need a stable asset id for `partners.ts` imports. */
const ID_ALIASES = {
  alianz: 'allianz',
  odonto: 'odontoprev',
  'good-life': 'goodlife',
  sulamerica: 'sul-america',
  'sul-america': 'sul-america',
};

await mkdir(OUT, { recursive: true });

const allFiles = (await readdir(SRC)).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));

/** Prefer WebP when the same brand exists as PNG + WebP. */
const filesById = new Map();
for (const file of allFiles) {
  const id = path.basename(file, path.extname(file)).toLowerCase();
  const outId = ID_ALIASES[id] ?? id;
  const ext = path.extname(file).toLowerCase();
  const prev = filesById.get(outId);
  if (!prev || (ext === '.webp' && path.extname(prev).toLowerCase() !== '.webp')) {
    filesById.set(outId, file);
  }
}

const files = [...filesById.values()];

for (const file of files) {
  const id = path.basename(file, path.extname(file)).toLowerCase();
  const outId = ID_ALIASES[id] ?? id;

  const input = path.join(SRC, file);
  const image = sharp(input).resize({
    width: 185,
    height: 106,
    fit: 'inside',
    withoutEnlargement: true,
  });

  await image.webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(path.join(OUT, `${outId}.webp`));

  // Drop legacy PNG duplicates: home partners load WebP only.
  try {
    await unlink(path.join(OUT, `${outId}.png`));
  } catch {
    /* absent */
  }

  console.log(`ok ${file} → ${outId}.webp`);
}

console.log(`\n${files.length} logos written to ${OUT}`);
