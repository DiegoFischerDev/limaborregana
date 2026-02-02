/**
 * Banner de aviso sobre cookies/privacidade (RGPD e diretrizes).
 * Mostra no primeiro acesso; ao clicar em "Aceitar", não volta a mostrar.
 */
(function () {
  var STORAGE_KEY = 'lb_cookie_consent';

  if (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) {
    return;
  }

  function getPolicyUrl() {
    var path = window.location.pathname || '';
    var base = path.lastIndexOf('/') > 0 ? path.slice(0, path.lastIndexOf('/') + 1) : '';
    return base + 'politica-privacidade.html';
  }

  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso sobre cookies e privacidade');
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
      '<p class="cookie-banner-text">Este site não utiliza cookies para fins de marketing ou análise. Para mais informações sobre o tratamento de dados, consulte a nossa <a href="' + getPolicyUrl() + '">Política de Privacidade</a>.</p>' +
      '<button type="button" class="cookie-banner-btn" id="cookie-banner-accept" aria-label="Aceitar e fechar">Aceitar</button>' +
      '</div>';
    document.body.appendChild(banner);
  }

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {}
    var el = document.getElementById('cookie-banner');
    if (el) {
      el.classList.add('cookie-banner--hidden');
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }
  }

  function init() {
    createBanner();
    var btn = document.getElementById('cookie-banner-accept');
    if (btn) btn.addEventListener('click', accept);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
