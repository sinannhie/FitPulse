const fs = require('fs');
const path = require('path');

const sizes = [192, 512];

const generateSVG = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6A5CFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B26BFF;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${Math.round(size * 0.22)}"/>
  <text x="50%" y="55%" font-family="system-ui, sans-serif" font-size="${Math.round(size * 0.35)}" font-weight="700" fill="white" text-anchor="middle" dominant-baseline="middle">F</text>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');

sizes.forEach(size => {
  const svg = generateSVG(size);
  const filename = `icon-${size}.svg`;
  fs.writeFileSync(path.join(publicDir, filename), svg);
  console.log(`Created ${filename}`);
});

console.log('\\nSVG icons created. To convert to PNG:');
console.log('1. Open each SVG in a browser');
console.log('2. Take a screenshot or use an online converter');
console.log('3. Or install sharp: npm install sharp -D');
console.log('   Then run the PNG conversion script');
