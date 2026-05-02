import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

const sizes = [192, 512];

for (const size of sizes) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6A5CFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B26BFF;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${Math.round(size * 0.22)}"/>
  <text x="50%" y="55%" font-family="system-ui, sans-serif" font-size="${Math.round(size * 0.35)}" font-weight="700" fill="white" text-anchor="middle" dominant-baseline="middle">F</text>
</svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(publicDir, `icon-${size}.png`));

  console.log(`Created icon-${size}.png`);
}

console.log('Done!');
