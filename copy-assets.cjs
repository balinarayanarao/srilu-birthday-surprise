const fs = require('fs');
const path = require('path');

const srcAssets = path.join(__dirname, 'src', 'assets');
const publicAssets = path.join(__dirname, 'public', 'assets');

[srcAssets, publicAssets].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const fileMap = [
  { src: 'Photo1.png', names: ['photo1.png', 'photo1.jpg', 'Photo1.png'] },
  { src: 'photo2.jpeg', names: ['photo2.jpeg', 'photo2.jpg', 'Photo2.jpeg'] },
  { src: 'Photo3.jpeg', names: ['photo3.jpeg', 'photo3.jpg', 'Photo3.jpeg'] },
  { src: 'Photo4.jpeg', names: ['photo4.jpeg', 'photo4.jpg', 'Photo4.jpeg'] },
  { src: 'Photo5.jpeg', names: ['photo5.jpeg', 'photo5.jpg', 'Photo5.jpeg'] },
  { src: 'Photo6.jpg', names: ['photo6.jpg', 'Photo6.jpg'] },
  { src: 'Photo7.jpg', names: ['photo7.jpg', 'Photo7.jpg'] },
  { src: 'Photo8.jpg', names: ['photo8.jpg', 'Photo8.jpg'] },
];

fileMap.forEach(item => {
  const srcPath = path.join(__dirname, item.src);
  if (fs.existsSync(srcPath)) {
    const data = fs.readFileSync(srcPath);
    item.names.forEach(destName => {
      fs.writeFileSync(path.join(srcAssets, destName), data);
      fs.writeFileSync(path.join(publicAssets, destName), data);
    });
    console.log(`Copied ${item.src} to assets`);
  } else {
    console.error(`Missing source: ${item.src}`);
  }
});

console.log('Assets setup completed successfully.');
