/**
 * Detecta suporte a WebP e adiciona a classe "webp" ao <html> para o CSS servir imagens .webp.
 * Deve ser carregado no <head> sem defer/async para aplicar antes do primeiro paint.
 */
(function () {
  try {
    var canvas = document.createElement('canvas');
    if (!canvas.getContext || !canvas.getContext('2d')) return;
    canvas.width = 1;
    canvas.height = 1;
    var ctx = canvas.getContext('2d');
    var imgData = ctx.getImageData(0, 0, 1, 1);
    if (!imgData) return;
    ctx.putImageData(imgData, 0, 0);
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      document.documentElement.classList.add('webp');
    }
  } catch (e) {}
})();
