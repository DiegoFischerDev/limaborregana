/**
 * Botão flutuante e chat que abre conversa no WhatsApp com João (Lima Borregana).
 * Após ~30s mostra mensagem simulada do João; ao responder, redireciona para WhatsApp com o texto.
 */
(function () {
  var WHATSAPP_NUMBER = '351928454397';
  var DELAY_MESSAGE_MS = 30000; // 30 segundos

  // Mesmo caminho da página da equipa: pasta da página atual + assets/img/joao.png
  function getAvatarSrc() {
    var path = window.location.pathname || '';
    var lastSlash = path.lastIndexOf('/');
    var basePath = lastSlash > 0 ? path.slice(0, lastSlash + 1) : '/';
    return basePath + 'assets/img/joao.png';
  }

  var avatarSrc = getAvatarSrc();

  var chatOpen = false;
  var joaoMessageShown = false;
  var timerJoao = null;

  function createWidget() {
    var wrap = document.createElement('div');
    wrap.id = 'chat-widget-wrap';
    wrap.innerHTML =
      '<button type="button" id="chat-widget-btn" class="chat-widget-btn" aria-label="Abrir chat">' +
      '<i class="fab fa-whatsapp"></i>' +
      '</button>' +
      '<div id="chat-widget-panel" class="chat-widget-panel" aria-hidden="true">' +
      '<div class="chat-widget-header">' +
      '<div class="chat-widget-header-avatar-wrap">' +
      '<img src="' + avatarSrc + '" alt="João" class="chat-widget-header-avatar">' +
      '<span class="chat-widget-online" aria-label="Online"></span>' +
      '</div>' +
      '<div class="chat-widget-header-info">' +
      '<span class="chat-widget-header-name">João Borregana</span>' +
      '<span class="chat-widget-header-status">Online</span>' +
      '</div>' +
      '<button type="button" class="chat-widget-close" aria-label="Fechar chat"><i class="fas fa-times"></i></button>' +
      '</div>' +
      '<div class="chat-widget-messages" id="chat-widget-messages"></div>' +
      '<div class="chat-widget-input-wrap">' +
      '<form id="chat-widget-form" class="chat-widget-form">' +
      '<input type="text" id="chat-widget-input" class="chat-widget-input" placeholder="Escreva uma mensagem..." autocomplete="off">' +
      '<button type="submit" class="chat-widget-send" aria-label="Enviar"><i class="fab fa-whatsapp"></i></button>' +
      '</form>' +
      '</div>' +
      '</div>';
    document.body.appendChild(wrap);

    var btn = document.getElementById('chat-widget-btn');
    var panel = document.getElementById('chat-widget-panel');
    var closeBtn = wrap.querySelector('.chat-widget-close');
    var form = document.getElementById('chat-widget-form');
    var input = document.getElementById('chat-widget-input');
    var messagesEl = document.getElementById('chat-widget-messages');

    function openChat() {
      chatOpen = true;
      panel.classList.add('chat-widget-panel--open');
      panel.setAttribute('aria-hidden', 'false');
      input.focus();
    }

    function closeChat() {
      chatOpen = false;
      panel.classList.remove('chat-widget-panel--open');
      panel.setAttribute('aria-hidden', 'true');
    }

    function showJoaoMessage() {
      if (joaoMessageShown) return;
      joaoMessageShown = true;
      if (timerJoao) clearTimeout(timerJoao);
      var now = new Date();
      var timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      var msg = document.createElement('div');
      msg.className = 'chat-widget-msg chat-widget-msg--joao';
      msg.innerHTML =
        '<div class="chat-widget-msg-avatar-wrap">' +
        '<img src="' + avatarSrc + '" alt="João" class="chat-widget-msg-avatar">' +
        '<span class="chat-widget-online chat-widget-online--sm"></span>' +
        '</div>' +
        '<div class="chat-widget-msg-bubble-wrap">' +
        '<span class="chat-widget-msg-name">João</span>' +
        '<div class="chat-widget-msg-bubble">Olá! Precisa de apoio no seu processo internacional? Como especialista, posso ajudar-te.</div>' +
        '<span class="chat-widget-msg-time" aria-label="Enviada às ' + timeStr + '">' + timeStr + '</span>' +
        '</div>';
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    btn.addEventListener('click', function () {
      if (chatOpen) closeChat();
      else openChat();
    });
    closeBtn.addEventListener('click', closeChat);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = (input.value || '').trim();
      if (!text) return;
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
      input.value = '';
    });

    // Após 30 segundos: mostra a mensagem do João e abre o chat automaticamente
    timerJoao = setTimeout(function () {
      showJoaoMessage();
      openChat();
    }, DELAY_MESSAGE_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
