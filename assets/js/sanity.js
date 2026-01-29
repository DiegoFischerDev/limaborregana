/**
 * Cliente Sanity para o site Lima Borregana.
 * Substitui PROJECT_ID e DATASET pelos valores do teu projeto (ver SANITY_SETUP.md).
 */
(function (global) {
  const SANITY_PROJECT_ID = '4wahsjzw';
  const SANITY_DATASET = 'production';
  const API_VERSION = '2024-01-01';
  const BASE = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${SANITY_DATASET}`;
  const CDN_IMG = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}`;

  function query(groq, params) {
    var q = encodeURIComponent(groq);
    var search = 'query=' + q;
    if (params && Object.keys(params).length) {
      var sp = new URLSearchParams();
      Object.keys(params).forEach(function (k) {
        var key = k.indexOf('$') === 0 ? k : '$' + k;
        var val = params[k];
        if (typeof val === 'string') val = JSON.stringify(val);
        sp.set(key, val);
      });
      search += '&' + sp.toString();
    }
    var url = BASE + '?' + search;
    return fetch(url).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) {
          var msg = (data && data.error && data.error.description) ? data.error.description : 'Sanity: ' + res.status;
          throw new Error(msg);
        }
        if (data.error) throw new Error(data.error.description || 'Sanity error');
        return data.result;
      });
    });
  }

  /**
   * Lista de artigos (para notícias e homepage).
   * @param {number} limit - Máximo de artigos (default: 20).
   * @returns {Promise<Array>}
   */
  function fetchPosts(limit) {
    const limitNum = limit == null ? 20 : Math.max(1, parseInt(limit, 10));
    const groq = `*[_type == "post"] | order(featured desc, publishedAt desc) [0...${limitNum}] {
      _id,
      "slug": slug.current,
      title,
      excerpt,
      "mainImageUrl": mainImage.asset->url,
      "mainImageRef": mainImage.asset._ref,
      publishedAt,
      featured
    }`;
    return query(groq);
  }

  /**
   * Um artigo por slug (para a página do artigo).
   * @param {string} slug
   * @returns {Promise<object|null>}
   */
  function fetchPostBySlug(slug) {
    if (!slug || !slug.trim()) return Promise.resolve(null);
    const groq = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      "slug": slug.current,
      title,
      excerpt,
      "mainImageUrl": mainImage.asset->url,
      "mainImageRef": mainImage.asset._ref,
      publishedAt,
      body
    }`;
    return query(groq, { slug: slug.trim() });
  }

  /**
   * Um artigo por _id (quando não tem slug).
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  function fetchPostById(id) {
    if (!id || !id.trim()) return Promise.resolve(null);
    const groq = `*[_type == "post" && _id == $id][0] {
      _id,
      "slug": slug.current,
      title,
      excerpt,
      "mainImageUrl": mainImage.asset->url,
      "mainImageRef": mainImage.asset._ref,
      publishedAt,
      body
    }`;
    return query(groq, { id: id.trim() });
  }

  /**
   * Constrói URL da imagem no CDN Sanity (suporta WebP e qualidade para carregamento mais rápido).
   * @param {string} ref - mainImage.asset._ref (ex: "image-xxx-400x300-jpg")
   * @param {object} opts - { w, h, fit, fm, q } opcionais (fm=webp, q=1-100)
   * @returns {string}
   */
  function imageUrl(ref, opts) {
    if (!ref || typeof ref !== 'string') return '';
    var part = ref.replace(/^image-/, '');
    var lastDash = part.lastIndexOf('-');
    var ext = lastDash > 0 ? part.slice(lastDash + 1).replace('jpg', 'jpeg') : 'jpg';
    var rest = lastDash > 0 ? part.slice(0, lastDash) : part;
    var base = CDN_IMG + '/' + rest + '.' + ext;
    if (opts) {
      var params = [];
      if (opts.w) params.push('w=' + opts.w);
      if (opts.h) params.push('h=' + opts.h);
      if (opts.fit) params.push('fit=' + opts.fit);
      if (opts.fm) params.push('fm=' + opts.fm);
      if (opts.q != null) params.push('q=' + opts.q);
      if (params.length) base += '?' + params.join('&');
    }
    return base;
  }

  /**
   * Converte Portable Text (body) para HTML.
   * @param {Array} blocks
   * @returns {string}
   */
  function spanToHtml(children) {
    if (!children || !children.length) return '';
    return children.map(function (span) {
      var t = escapeHtml(span.text || '');
      if (span.marks && span.marks.length) {
        span.marks.forEach(function (m) {
          if (m === 'strong') t = '<strong>' + t + '</strong>';
          else if (m === 'em') t = '<em>' + t + '</em>';
          else if (m === 'code') t = '<code>' + t + '</code>';
        });
      }
      return t;
    }).join('');
  }

  function portableTextToHtml(blocks) {
    if (!Array.isArray(blocks) || blocks.length === 0) return '';
    var html = [];
    var i = 0;
    while (i < blocks.length) {
      var block = blocks[i];
      if (block._type === 'block' && block.children) {
        var style = block.style;
        if (style === 'bullet' || style === 'number') {
          var listTag = style === 'number' ? 'ol' : 'ul';
          var listItems = [];
          while (i < blocks.length && blocks[i]._type === 'block' && (blocks[i].style === 'bullet' || blocks[i].style === 'number') && listTag === (blocks[i].style === 'number' ? 'ol' : 'ul')) {
            listItems.push('<li class="page-text">' + spanToHtml(blocks[i].children) + '</li>');
            i++;
          }
          html.push('<' + listTag + ' class="page-text" style="margin-left: 1.5rem; margin-bottom: 1rem;">' + listItems.join('') + '</' + listTag + '>');
          continue;
        }
        var tag = 'p';
        if (style === 'h1') tag = 'h1';
        else if (style === 'h2') tag = 'h2';
        else if (style === 'h3') tag = 'h3';
        else if (style === 'h4') tag = 'h4';
        else if (style === 'blockquote') tag = 'blockquote';
        html.push('<' + tag + ' class="page-text">' + spanToHtml(block.children) + '</' + tag + '>');
      } else if (block._type === 'image' && block.asset) {
        var imgRef = block.asset._ref;
        var src = imageUrl(imgRef, { w: 800, fm: 'webp', q: 85 });
        html.push('<figure class="page-figure"><img src="' + src + '" alt="" class="page-img" loading="lazy" decoding="async"/></figure>');
      }
      i++;
    }
    return html.join('\n');
  }

  function escapeHtml(s) {
    var div = { innerHTML: '' };
    if (typeof document !== 'undefined') {
      div = document.createElement('div');
      div.textContent = s;
      return div.innerHTML;
    }
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  global.Sanity = {
    fetchPosts: fetchPosts,
    fetchPostBySlug: fetchPostBySlug,
    fetchPostById: fetchPostById,
    imageUrl: imageUrl,
    portableTextToHtml: portableTextToHtml,
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
  };
})(typeof window !== 'undefined' ? window : this);
