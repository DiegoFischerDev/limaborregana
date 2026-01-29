# Lima Borregana - Consultoria Internacional

Site institucional da **Lima Borregana**, consultoria internacional especializada em vistos, residência, investimentos e estudos (Europa, América do Sul e América do Norte).

---

## Tecnologias

- HTML5, CSS3, JavaScript (vanilla)
- Site estático, sem dependências de build
- **Sanity CMS** para o blog (artigos editados no Sanity Studio, exibidos dinamicamente)

---

## Blog (Sanity)

O conteúdo do blog é gerido no **Sanity**. A listagem em Notícias e os 3 artigos na homepage vêm da API do Sanity; cada artigo abre em `article.html?slug=xxx`. Instruções completas em **`SANITY_SETUP.md`**.

Resumo: criar projeto em [sanity.io](https://www.sanity.io), configurar `SANITY_PROJECT_ID` em `assets/js/sanity.js` e, na pasta `sanity-studio/`, definir o Project ID em `.env` e correr `npm run dev` para editar artigos em http://localhost:3333.

---

## Estrutura do projeto

```
limaborregana/
├── index.html              # Homepage (secção artigos = 3 últimos do Sanity)
├── vistos-europa.html      # Vistos
├── estudantes.html         # Estudantes
├── investimentos.html     # Investimentos
├── equipe.html            # Equipe
├── noticias.html          # Listagem de notícias (artigos do Sanity)
├── article.html           # Artigo dinâmico (?slug=xxx)
├── politica-privacidade.html
├── sanity-studio/         # Sanity Studio (npm install + npm run dev)
├── favicon.ico             # Favicon (aba do navegador)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png    # Ícone ao adicionar ao ecrã (iOS)
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── site.webmanifest        # PWA / ícone em pesquisas e abas
├── robots.txt              # Instruções para motores de busca
├── sitemap.xml             # Mapa do site para SEO
├── assets/
│   ├── css/                # main.css, components.css
│   ├── js/                 # main.js, form.js, sanity.js, blog-list.js, article.js, webp-detect.js
│   └── img/                # Logos, imagens, tamb.png (preview redes sociais); .webp gerados por npm run optimize-images
├── scripts/
│   └── optimize-static-images.js   # Gera versões WebP das imagens (JPG/PNG) para carregamento mais rápido
├── WEB3FORMS_SETUP.md      # Configuração do formulário de contacto
├── SANITY_SETUP.md         # Configuração do Sanity CMS
└── README.md
```

---

## Otimização de imagens estáticas

O site usa **WebP** quando o navegador suporta (menor tamanho, carregamento mais rápido). As imagens JPG/PNG em `assets/img/` podem ser convertidas para WebP localmente:

1. Na pasta **limaborregana**: `npm install` (instala `sharp`)
2. Correr: `npm run optimize-images`

Isto gera ficheiros `.webp` em `assets/img/` (ex.: `hero-home.webp`, `LogoLB_Dark.webp`). O HTML e o CSS já estão preparados: logos e heroes usam `<picture>` ou a classe `.webp` no `<html>` para servir WebP quando existir. Não é obrigatório subir novos ficheiros manualmente; basta correr o script e fazer commit dos `.webp` gerados (ou ignorá-los e manter só JPG/PNG).

---

## SEO e favicon

- **Favicon:** Todas as páginas incluem `favicon.ico`, PNG 16×16 e 32×32, `apple-touch-icon` e `site.webmanifest`. Os ficheiros de ícone devem ficar na **raiz** do site (junto ao `index.html`). Se o favicon não aparecer, confirme que o servidor entrega `favicon.ico` com tipo MIME `image/x-icon` (ou `image/vnd.microsoft.icon`).
- **Web manifest:** `site.webmanifest` define nome, ícones 192×192 e 512×512 e cores para abas/mobile. Caminhos dos ícones são relativos à raiz.
- **Open Graph e Twitter Card:** A homepage (e onde existir) tem meta `og:` e `twitter:` para preview em WhatsApp, Facebook e Twitter. Imagem de preview: `assets/img/tamb.png` (recomendado 1200×630 px).
- **Sitemap:** `sitemap.xml` lista todas as páginas públicas. URL no `robots.txt`.
- **Robots:** `robots.txt` permite rastreio e aponta para o sitemap.
- **Canonical:** A homepage tem `<link rel="canonical">` para evitar conteúdo duplicado.
- **Títulos e descrições:** Cada página tem `<title>` e `<meta name="description">` únicos.

---

## Formulário de contacto

O formulário envia por **Web3Forms**. Ver instruções em `WEB3FORMS_SETUP.md`.

---

## Licença e créditos

© 2026 Lima Borregana. Todos os direitos reservados.  
Developed with ❤️ in Portugal.
