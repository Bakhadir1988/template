/* eslint-disable */
// prettier-ignore

const fs = require('fs');
const path = require('path');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2').default || require('ttf2woff2');

const FONTS_DIR = path.join(__dirname, '..', 'src', 'shared', 'assets', 'fonts');


function convertFont(filePath) {
  const fontBuffer = fs.readFileSync(filePath);

  const woff = ttf2woff(fontBuffer);
  const woff2 = ttf2woff2(fontBuffer); // ← теперь работает

  const outputBase = filePath.replace(/\.ttf$/, '');

  fs.writeFileSync(`${outputBase}.woff`, Buffer.from(woff));
  fs.writeFileSync(`${outputBase}.woff2`, Buffer.from(woff2));

  console.log(`✔ Created: ${outputBase}.woff`);
  console.log(`✔ Created: ${outputBase}.woff2`);
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.ttf')) {
      convertFont(fullPath);
    }
  });
}

walkDir(FONTS_DIR);
