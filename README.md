# Lima Borregana - Consultoria Internacional

Site institucional da **Lima Borregana**, consultoria internacional especializada em vistos, residência, investimentos e estudos (Europa, América do Sul e América do Norte).

---

## Tecnologias

- HTML5, CSS3, JavaScript (vanilla)
- Site estático, sem dependências de build

---

## Estrutura do projeto

```
limaborregana/
├── index.html              # Homepage
├── vistos-europa.html      # Vistos
├── estudantes.html         # Estudantes
├── investimentos.html     # Investimentos
├── equipe.html            # Equipe
├── noticias.html          # Listagem de notícias
├── politica-privacidade.html
├── artigo-*.html           # Artigos (6)
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
│   ├── js/                 # main.js, form.js
│   └── img/                # Logos, imagens, tamb.png (preview redes sociais)
├── WEB3FORMS_SETUP.md      # Configuração do formulário de contacto
└── README.md
```

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
