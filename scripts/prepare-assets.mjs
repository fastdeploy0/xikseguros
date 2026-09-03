/**
 * Asset pipeline: takes the official XIK SEGUROS wordmark
 * (`assets-source/xik-logo-oficial.webp`, transparent, gold + white SEGUROS)
 * and emits:
 * - `xik-lockup.webp`: on-dark (gold + white)
 * - `xik-mark.webp`: on-light (gold + navy SEGUROS for contrast)
 * - favicons
 * Also optimises marketing/hero sources into `src/assets/`.
 * Run with: npm run assets
 */
import { mkdir, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('assets-source');
const BRAND = path.resolve('src/assets/brand');
const FAVICON = path.resolve('public/favicon');
const HERO_SRC = path.resolve('source_assets/hero.webp');
const HERO_OUT = path.resolve('src/assets/hero');
const WORKING_SRC = path.resolve('source_assets/como-a-xik-trabalha.webp');
const WORKING_OUT = path.resolve('src/assets/marketing');

await mkdir(BRAND, { recursive: true });
await mkdir(FAVICON, { recursive: true });
await mkdir(HERO_OUT, { recursive: true });
await mkdir(WORKING_OUT, { recursive: true });

const files = await readdir(SRC);
const pick = (needle) => files.find((f) => f.toLowerCase().includes(needle));

const official = pick('xik-logo-oficial');
if (!official) {
  throw new Error(`Missing official logo in ${SRC}: expected xik-logo-oficial.webp`);
}

const officialPath = path.join(SRC, official);
const navy = [0x15, 0x33, 0x58];

const isGold = (r, g, b) => r > 100 && r - b > 30 && r >= g - 8;
const isWhiteGlyph = (r, g, b, a) => {
  if (a < 20 || isGold(r, g, b)) return false;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 170;
};

// On-dark: official art (gold XIK + white SEGUROS, transparent).
const onDark = await sharp(officialPath)
  .ensureAlpha()
  .trim({ threshold: 4 })
  .webp({ quality: 94, alphaQuality: 100, effort: 6 })
  .toBuffer();

await sharp(onDark).toFile(path.join(BRAND, 'xik-lockup.webp'));
await sharp(onDark).png({ compressionLevel: 9 }).toFile(path.join(BRAND, 'xik-lockup.png'));

// On-light: same art with SEGUROS recolored to navy for clear contrast.
const decoded = await sharp(onDark).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const onLightRaw = Buffer.from(decoded.data);
for (let i = 0; i < onLightRaw.length; i += 4) {
  const r = onLightRaw[i];
  const g = onLightRaw[i + 1];
  const b = onLightRaw[i + 2];
  const a = onLightRaw[i + 3];
  if (!isWhiteGlyph(r, g, b, a)) continue;
  onLightRaw[i] = navy[0];
  onLightRaw[i + 1] = navy[1];
  onLightRaw[i + 2] = navy[2];
}

const onLight = await sharp(onLightRaw, {
  raw: { width: decoded.info.width, height: decoded.info.height, channels: 4 },
})
  .webp({ quality: 94, alphaQuality: 100, effort: 6 })
  .toBuffer();

await sharp(onLight).toFile(path.join(BRAND, 'xik-mark.webp'));
await sharp(onLight).png({ compressionLevel: 9 }).toFile(path.join(BRAND, 'xik-mark.png'));

for (const size of [32, 48, 180, 192, 512]) {
  await sharp(path.join(BRAND, 'xik-lockup.webp'))
    .resize({ width: size, height: size, fit: 'contain', background: { r: 21, g: 51, b: 88, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(FAVICON, `icon-${size}.png`));
}

try {
  await access(HERO_SRC);
  await sharp(HERO_SRC)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(HERO_OUT, 'hero.webp'));
  await sharp(HERO_SRC)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(path.join(HERO_OUT, 'hero-sm.webp'));
  console.log('Hero plate written to src/assets/hero');
} catch {
  console.warn('source_assets/hero.webp not found: skipping hero plate');
}

try {
  await access(WORKING_SRC);
  await sharp(WORKING_SRC)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 100, effort: 6 })
    .toFile(path.join(WORKING_OUT, 'como-a-xik-trabalha.webp'));
  await sharp(WORKING_SRC)
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 78, alphaQuality: 100, effort: 6 })
    .toFile(path.join(WORKING_OUT, 'como-a-xik-trabalha-sm.webp'));
  console.log('Working visual written to src/assets/marketing');
} catch {
  console.warn('source_assets/como-a-xik-trabalha.webp not found: skipping');
}

const ABOUT_HERO_SRC = path.resolve('source_assets/hero-sobre-xik.webp');
try {
  await access(ABOUT_HERO_SRC);
  await sharp(ABOUT_HERO_SRC)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(WORKING_OUT, 'hero-sobre-xik.webp'));
  await sharp(ABOUT_HERO_SRC)
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(path.join(WORKING_OUT, 'hero-sobre-xik-sm.webp'));
  console.log('About hero written to src/assets/marketing');
} catch {
  console.warn('source_assets/hero-sobre-xik.webp not found: skipping');
}

const CEO_SRC = path.resolve('source_assets/foto-institucinal-ceo.webp');
try {
  await access(CEO_SRC);
  await sharp(CEO_SRC)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(WORKING_OUT, 'foto-institucinal-ceo.webp'));
  await sharp(CEO_SRC)
    .resize({ width: 560, withoutEnlargement: true })
    .webp({ quality: 74, effort: 6 })
    .toFile(path.join(WORKING_OUT, 'foto-institucinal-ceo-sm.webp'));
  console.log('CEO portrait written to src/assets/marketing');
} catch {
  console.warn('source_assets/foto-institucinal-ceo.webp not found: skipping');
}

const PLANOS_HERO_SRC = path.resolve('source_assets/xik-hero-planos.webp');
try {
  await access(PLANOS_HERO_SRC);
  await sharp(PLANOS_HERO_SRC)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(WORKING_OUT, 'xik-hero-planos-sm.webp'));
  console.log('Planos hero written to src/assets/marketing');
} catch {
  console.warn('source_assets/xik-hero-planos.webp not found: skipping');
}

const PLANO_INDIVIDUAL_HERO_SRC = path.resolve('source_assets/xik-hero-plano-individual.webp');
try {
  await access(PLANO_INDIVIDUAL_HERO_SRC);
  await sharp(PLANO_INDIVIDUAL_HERO_SRC)
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(WORKING_OUT, 'xik-hero-plano-individual.webp'));
  console.log('Plano individual hero written to src/assets/marketing');
} catch {
  console.warn('source_assets/xik-hero-plano-individual.webp not found: skipping');
}

for (const [label, file] of [
  ['empresarial', 'xik-hero-plano-empresarial.webp'],
  ['adesao', 'xik-hero-plano-adesao.webp'],
  ['odonto', 'xik-hero-plano-odonto.webp'],
]) {
  const src = path.resolve('source_assets', file);
  try {
    await access(src);
    await sharp(src)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(WORKING_OUT, file));
    console.log(`Plano ${label} hero written to src/assets/marketing`);
  } catch {
    console.warn(`source_assets/${file} not found: skipping`);
  }
}

console.log('Brand assets written to src/assets/brand and public/favicon');
