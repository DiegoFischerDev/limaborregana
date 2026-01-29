/**
 * Página de artigo dinâmico (article.html?slug=xxx ou article.html?id=xxx).
 * Obtém slug ou id da URL, busca o artigo no Sanity e renderiza título, imagem e corpo.
 * SEO: um único h1 (título do artigo), JSON-LD Article, Open Graph dinâmico.
 */
(function () {
  function getParams() {
    var params = new URLSearchParams(window.location.search);
    return { slug: params.get('slug') || '', id: params.get('id') || '' };
  }

  function setArticleSEO(post, titleEscaped) {
    var baseUrl = 'https://limaborregana.com/';
    var articleUrl = baseUrl + 'article.html?' + (post.slug ? 'slug=' + encodeURIComponent(post.slug) : 'id=' + encodeURIComponent(post._id));
    var imgUrl = '';
    var imgParams = 'w=1200&fit=max&fm=webp&q=85';
    if (post.mainImageUrl) imgUrl = post.mainImageUrl + (post.mainImageUrl.indexOf('?') >= 0 ? '&' : '?') + imgParams;
    else if (post.mainImageRef && typeof Sanity !== 'undefined' && Sanity.imageUrl) imgUrl = Sanity.imageUrl(post.mainImageRef, { w: 1200, fit: 'max', fm: 'webp', q: 85 }) || '';
    var headline = post.title || 'Artigo';
    var description = (post.excerpt || '').slice(0, 160);

    function setMeta(name, content) {
      var el = document.querySelector('meta[name="' + name + '"]') || document.querySelector('meta[property="' + name + '"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(name.indexOf('og:') === 0 ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    }
    setMeta('description', description);
    setMeta('og:title', headline + ' | Lima Borregana - Consultoria');
    setMeta('og:description', description);
    setMeta('og:url', articleUrl);
    setMeta('og:type', 'article');
    if (imgUrl) setMeta('og:image', imgUrl);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', headline + ' | Lima Borregana - Consultoria');
    setMeta('twitter:description', description);
    if (imgUrl) setMeta('twitter:image', imgUrl);

    var jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: headline,
      description: description,
      url: articleUrl,
      datePublished: post.publishedAt || null,
      publisher: { '@type': 'Organization', name: 'Lima Borregana', url: baseUrl }
    };
    if (imgUrl) jsonLd.image = imgUrl;
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  function run() {
    var prm = getParams();
    var contentEl = document.getElementById('article-content');

    if (!contentEl) return;

    if (!prm.slug && !prm.id) {
      contentEl.innerHTML = '<p class="page-text">Não foi indicado qual artigo abrir. <a href="noticias.html">Ver todos os artigos</a>.</p>';
      return;
    }

    if (typeof Sanity === 'undefined') {
      contentEl.innerHTML = '<p class="page-text">Configure o Sanity (assets/js/sanity.js) para ver artigos dinâmicos. <a href="noticias.html">Ver notícias</a>.</p>';
      return;
    }

    function tryFetch() {
      if (prm.slug && Sanity.fetchPostBySlug) {
        return Sanity.fetchPostBySlug(prm.slug).then(function (post) {
          if (post) return post;
          if (prm.id && Sanity.fetchPostById) return Sanity.fetchPostById(prm.id);
          return null;
        });
      }
      if (prm.id && Sanity.fetchPostById) return Sanity.fetchPostById(prm.id);
      return Promise.resolve(null);
    }

    tryFetch()
      .then(function (post) {
        if (!post) {
          contentEl.innerHTML = '<p class="page-text">Não existe um artigo com este endereço. <a href="noticias.html">Ver todos os artigos</a>.</p>';
          return;
        }
        var title = (post.title || 'Artigo').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        var imgHtml = '';
        var articleImgParams = 'w=800&fit=max&fm=webp&q=85';
        if (post.mainImageUrl) {
          var imgUrl = post.mainImageUrl + (post.mainImageUrl.indexOf('?') >= 0 ? '&' : '?') + articleImgParams;
          imgHtml = '<figure class="article-post-figure"><img src="' + imgUrl + '" alt="' + title + '" class="article-post-image" decoding="async"/></figure>';
        } else if (post.mainImageRef && Sanity.imageUrl) {
          var refUrl = Sanity.imageUrl(post.mainImageRef, { w: 800, fit: 'max', fm: 'webp', q: 85 });
          if (refUrl) imgHtml = '<figure class="article-post-figure"><img src="' + refUrl + '" alt="' + title + '" class="article-post-image" decoding="async"/></figure>';
        }
        var bodyHtml = '';
        if (post.body && post.body.length && Sanity.portableTextToHtml) {
          bodyHtml = Sanity.portableTextToHtml(post.body);
        } else {
          bodyHtml = (post.excerpt ? '<p class="page-text-large">' + post.excerpt.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>' : '') + '<p class="page-text">Conteúdo em breve.</p>';
        }
        var dateStr = '';
        if (post.publishedAt) {
          try {
            var d = new Date(post.publishedAt);
            if (!isNaN(d.getTime())) {
              dateStr = '<time class="article-post-date" datetime="' + post.publishedAt + '">' + d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + '</time>';
            }
          } catch (e) {}
        }
        contentEl.innerHTML = '<h1 class="article-post-title">' + title + '</h1>' + (dateStr ? dateStr : '') + imgHtml + '<div class="article-post-body">' + bodyHtml + '</div>';
        document.title = (post.title || 'Artigo') + ' | Lima Borregana - Consultoria';
        var desc = document.querySelector('meta[name="description"]');
        if (desc && post.excerpt) desc.setAttribute('content', post.excerpt.slice(0, 160));
        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', 'https://limaborregana.com/article.html?' + (post.slug ? 'slug=' + encodeURIComponent(post.slug) : 'id=' + encodeURIComponent(post._id)));
        setArticleSEO(post, title);
      })
      .catch(function (err) {
        console.error('[article] Erro ao carregar:', err);
        contentEl.innerHTML = '<p class="page-text">Não foi possível carregar o artigo. <a href="noticias.html">Voltar às notícias</a>.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
