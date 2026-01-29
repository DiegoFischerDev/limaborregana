/**
 * Gera versões WebP das imagens estáticas (JPG/PNG) em assets/img.
 * Reduz tamanho sem precisar de subir ficheiros manualmente.
 *
 * Uso: na pasta limaborregana, instalar dependência e correr:
 *   npm install
 *   npm run optimize-images
 *
 * Cria ficheiros .webp no mesmo diretório (ex: hero-home.jpg -> hero-home.webp).
 * Depois, o HTML/CSS já está preparado para usar WebP quando existir.
 */

const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '..', 'assets', 'img');
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const WEBP_QUALITY = 85;

function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('Erro: instala a dependência "sharp" primeiro:');
    console.error('  cd limaborregana && npm install');
    process.exit(1);
  }

  if (!fs.existsSync(IMG_DIR)) {
    console.error('Pasta não encontrada:', IMG_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(IMG_DIR);
  const toProcess = files.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return EXTENSIONS.includes(ext);
  });

  if (toProcess.length === 0) {
    console.log('Nenhuma imagem JPG/PNG em assets/img.');
    return;
  }

  console.log('A gerar WebP para', toProcess.length, 'imagem(ns)...\n');

  Promise.all(
    toProcess.map((file) => {
      const srcPath = path.join(IMG_DIR, file);
      const base = path.basename(file, path.extname(file));
      const destPath = path.join(IMG_DIR, base + '.webp');

      return sharp(srcPath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(destPath)
        .then((info) => {
          const srcStat = fs.statSync(srcPath);
          const saved = Math.round((1 - info.size / srcStat.size) * 100);
          console.log('  OK', file, '->', base + '.webp', '(' + (saved > 0 ? '-' + saved + '%' : 'novo') + ')');
          return info;
        })
        .catch((err) => {
          console.error('  ERRO', file, err.message);
        });
    })
  ).then(() => {
    console.log('\nConcluído. Podes usar as versões .webp no site (picture/CSS já preparados).');
  });
}

main();
