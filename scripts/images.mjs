/**
 * Makes the WebP copies the site serves from the JPEGs in public/images (24 November 2026).
 * Run after replacing a photograph: `npm run images`. Widths follow the slots that use
 * them (`globals.css`, `src/lib/photos.ts`).
 */
import sharp from 'sharp';

const JOBS = [
  ['tea-estate.jpg', 'tea-estate-2560.webp', 2560, 72], // home hero, tablet and up
  ['tea-estate.jpg', 'tea-estate-1600.webp', 1600, 70], // home hero, phones
  ['tea-estate.jpg', 'tea-estate-640.webp', 640, 60], // demo page, behind a heavy blur
  ['plantation.jpg', 'plantation.webp', 1366, 74], // every other backdrop
];

for (const [source, out, width, quality] of JOBS) {
  const info = await sharp(`public/images/${source}`)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(`public/images/${out}`);
  console.log(`${out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}
