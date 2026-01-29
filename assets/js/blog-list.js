/**
 * Preenche a grelha de artigos (noticias.html e index.html) com dados do Sanity.
 * Uso: colocar um elemento com id "blog-grid" (e opcionalmente data-limit="3" para homepage).
 */
(function () {
  function formatDate(iso) {
    if (!iso) return '';
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ''; }
  }

  function renderCard(post, baseUrl, isFirst) {
    var slug = post.slug || '';
    var id = post._id || '';
    var href = baseUrl + 'noticias.html';
    if (slug) href = baseUrl + 'article.html?slug=' + encodeURIComponent(slug);
    else if (id) href = baseUrl + 'article.html?id=' + encodeURIComponent(id);
    var title = (post.title || 'Artigo').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var excerpt = (post.excerpt || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var dateStr = formatDate(post.publishedAt);
    var imgSrc = 'assets/img/hero-vistos-europa.jpg';
    var sanityParams = 'w=600&fit=max&fm=webp&q=85';
    if (post.mainImageUrl) {
      imgSrc = post.mainImageUrl + (post.mainImageUrl.indexOf('?') >= 0 ? '&' : '?') + sanityParams;
    } else if (post.mainImageRef && typeof Sanity !== 'undefined' && Sanity.imageUrl) {
      imgSrc = Sanity.imageUrl(post.mainImageRef, { w: 600, fit: 'max', fm: 'webp', q: 85 }) || imgSrc;
    }
    var imgAlt = title;
    var isFeatured = post.featured === true;
    var cardClass = 'blog-card' + (isFeatured ? ' blog-card--featured' : '');
    var starBadge = isFeatured ? '<span class="blog-card-badge" aria-hidden="true"><i class="fas fa-star"></i></span>' : '';
    var loadingAttr = isFirst ? 'eager' : 'lazy';
    var fetchPriority = isFirst ? ' fetchpriority="high"' : '';
    return (
      '<a href="' + href + '" class="' + cardClass + '">' +
      starBadge +
      '<img src="' + imgSrc + '" alt="' + imgAlt + '" class="blog-card-image" width="600" height="200" loading="' + loadingAttr + '" decoding="async"' + fetchPriority + '>' +
      '<div class="blog-card-body">' +
      (dateStr ? '<time class="blog-card-date" datetime="' + (post.publishedAt || '') + '">' + dateStr + '</time>' : '') +
      '<h3 class="blog-card-title">' + title + '</h3>' +
      '<p class="blog-card-excerpt">' + excerpt + '</p>' +
      '<span class="blog-card-link">Ler mais <i class="fas fa-arrow-right"></i></span>' +
      '</div></a>'
    );
  }

  function emptyState() {
    return '<p class="blog-grid-empty">Nenhum artigo publicado ainda. Os artigos são geridos no Sanity e aparecem aqui quando publicados.</p>';
  }

  function run() {
    var grid = document.getElementById('blog-grid');
    if (!grid) return;
    var limitAttr = grid.getAttribute('data-limit');
    var limit = limitAttr != null ? parseInt(limitAttr, 10) : null;
    var baseUrl = (grid.getAttribute('data-base-url') || '').replace(/\s/g, '');
    if (!baseUrl) {
      var path = window.location.pathname || '';
      var lastSlash = path.lastIndexOf('/');
      baseUrl = lastSlash > 0 ? path.slice(0, lastSlash + 1) : '';
    }

    if (typeof Sanity === 'undefined' || !Sanity.fetchPosts) {
      console.warn('[blog-list] Sanity não carregado (sanity.js em falta ou erro).');
      grid.innerHTML = emptyState();
      return;
    }

    Sanity.fetchPosts(limit != null ? limit : 20)
      .then(function (posts) {
        if (posts && posts.length > 0) {
          grid.innerHTML = posts.map(function (p, i) { return renderCard(p, baseUrl, i === 0); }).join('');
        } else {
          console.warn('[blog-list] Sanity devolveu 0 artigos.');
          grid.innerHTML = emptyState();
        }
      })
      .catch(function (err) {
        console.error('[blog-list] Erro ao buscar Sanity:', err);
        grid.innerHTML = emptyState();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
